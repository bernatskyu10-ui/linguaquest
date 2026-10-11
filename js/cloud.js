/* ==========================================================================
   LinguaQuest - облачные аккаунты (Supabase)
   --------------------------------------------------------------------------
   Аккаунт = имя + пароль. Имя уникально (без учёта регистра), поэтому
   второй человек не сможет занять то же имя. Войти можно с любого
   устройства, прогресс хранится в таблице profiles и виден только владельцу
   (правила доступа Row Level Security на сервере).

   Почты у пользователя нет: для сервиса входа имя превращается в служебный
   адрес вида u<хеш имени>@linguaquest.app. Письма на него не отправляются
   (подтверждение почты в проекте выключено).
   Ключ ниже публичный (publishable): он и так виден в коде любого сайта,
   а доступ к данным ограничивают правила на сервере.
   ========================================================================== */
const Cloud = (() => {
  const BASE = "https://zfsymlgishikjkeuqxyh.supabase.co";
  const KEY = "sb_publishable_ojSRMiw3JyB1Xt2pZqmX0g_EiUb6DWI";
  const TIMEOUT = 15000;

  const MESSAGES = {
    invalid_credentials: "Неверное имя или пароль",
    user_already_exists: "Это имя уже занято, выберите другое",
    weak_password: "Пароль должен быть не короче 6 символов",
    over_request_rate_limit: "Слишком много попыток. Подождите минуту и попробуйте снова",
    over_email_send_rate_limit: "Слишком много попыток. Подождите минуту и попробуйте снова",
    signup_disabled: "Регистрация новых аккаунтов сейчас выключена"
  };

  class CloudError extends Error {
    constructor(message, code, status) { super(message); this.code = code; this.status = status; }
  }

  async function sha256hex(text) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  const cleanName = (name) => String(name || "").trim().replace(/\s+/g, " ");
  async function emailFor(name) {
    return "u" + (await sha256hex(cleanName(name).toLowerCase())).slice(0, 40) + "@linguaquest.app";
  }

  // Запрос к серверу с ограничением по времени и понятными ошибками
  async function req(path, { method = "GET", body, token, prefer } = {}) {
    if (!navigator.onLine) throw new CloudError("Нет интернета", "offline", 0);
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT);
    const headers = { apikey: KEY, "Content-Type": "application/json" };
    if (token) headers.Authorization = "Bearer " + token;
    if (prefer) headers.Prefer = prefer;
    let res;
    try {
      res = await fetch(BASE + path, { method, headers, body: body === undefined ? undefined : JSON.stringify(body), signal: ctrl.signal, cache: "no-store" });
    } catch (e) {
      throw new CloudError(e.name === "AbortError" ? "Сервер долго не отвечает. Попробуйте ещё раз" : "Не удалось связаться с сервером", "network", 0);
    } finally {
      clearTimeout(timer);
    }
    const text = await res.text();
    let json = null;
    try { json = text ? JSON.parse(text) : null; } catch (e) { /* не JSON */ }
    if (!res.ok) {
      const code = (json && (json.error_code || json.code)) || String(res.status);
      // 23505 - нарушение уникальности имени в таблице
      const msg = code === "23505" ? MESSAGES.user_already_exists : MESSAGES[code] || (json && (json.msg || json.message)) || "Ошибка сервера " + res.status;
      throw new CloudError(msg, code, res.status);
    }
    return json;
  }

  // Сессия из ответа сервиса входа
  function toSession(j, prev) {
    return Object.assign({}, prev || {}, {
      uid: j.user && j.user.id,
      access: j.access_token,
      refresh: j.refresh_token,
      exp: (Number(j.expires_at) || Math.floor(Date.now() / 1000) + Number(j.expires_in || 3600)) * 1000
    });
  }

  /* ---------- Аккаунт ---------- */
  async function available(name) {
    return (await req("/rest/v1/rpc/username_available", { method: "POST", body: { name: cleanName(name) } })) === true;
  }

  async function signUp(name, password) {
    const j = await req("/auth/v1/signup", { method: "POST", body: { email: await emailFor(name), password } });
    if (!j || !j.access_token) throw new CloudError("Не удалось создать аккаунт. Попробуйте ещё раз", "no_session", 0);
    return toSession(j);
  }

  async function signIn(name, password) {
    return toSession(await req("/auth/v1/token?grant_type=password", { method: "POST", body: { email: await emailFor(name), password } }));
  }

  // Свежая сессия: токен живёт час, заранее обновляем его
  async function fresh(s) {
    if (!s || !s.refresh) throw new CloudError("Нужно войти заново", "no_session", 401);
    if (s.access && s.exp - Date.now() > 60000) return s;
    try {
      return toSession(await req("/auth/v1/token?grant_type=refresh_token", { method: "POST", body: { refresh_token: s.refresh } }), s);
    } catch (e) {
      if (e.status === 400 || e.status === 401) throw new CloudError("Нужно войти заново", "no_session", 401);
      throw e;
    }
  }

  /* ---------- Прогресс ---------- */
  async function createProfile(s, username, data) {
    await req("/rest/v1/profiles", { method: "POST", token: s.access, prefer: "return=minimal", body: { id: s.uid, username: cleanName(username), data: data || {} } });
  }

  async function load(s) {
    const rows = await req(`/rest/v1/profiles?select=username,data,updated_at&id=eq.${encodeURIComponent(s.uid)}`, { token: s.access });
    return Array.isArray(rows) && rows.length ? rows[0] : null;
  }

  async function save(s, data) {
    await req(`/rest/v1/profiles?id=eq.${encodeURIComponent(s.uid)}`, { method: "PATCH", token: s.access, prefer: "return=minimal", body: { data, updated_at: new Date().toISOString() } });
  }

  return { available, signUp, signIn, fresh, createProfile, load, save, CloudError };
})();
