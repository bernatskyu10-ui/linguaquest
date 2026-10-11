/* ==========================================================================
   LinguaQuest - синхронизация прогресса между устройствами (телефон и ПК)
   --------------------------------------------------------------------------
   Без регистрации: прогресс хранится на бесплатном сервисе textdb.dev
   под случайным "кодом синхронизации" (16 символов). Кто знает код,
   тот видит прогресс, поэтому код показываем только владельцу.
   Пароль профиля никогда не отправляется.

   Как это работает:
   - на первом устройстве создаётся код, прогресс отправляется в облако;
   - на втором устройстве вводится тот же код, прогресс объединяется;
   - дальше после каждого сохранения изменения отправляются (с задержкой),
     а при открытии приложения забираются свежие данные с другого устройства.
   Сервис принимает только формат формы, поэтому JSON передаём в base64url.
   ========================================================================== */

const Sync = (() => {
  const BASE = "https://textdb.dev/api/data/";
  const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // без похожих 0/O и 1/I

  /* ---------- Кодирование ---------- */
  function toB64(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = "";
    for (let i = 0; i < bytes.length; i += 8192) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 8192));
    return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  function fromB64(text) {
    const t = text.trim().replace(/=+$/, "").replace(/-/g, "+").replace(/_/g, "/");
    const bin = atob(t);
    return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
  }

  /* ---------- Код синхронизации ---------- */
  function makeCode() {
    const rnd = new Uint8Array(16);
    crypto.getRandomValues(rnd);
    const chars = Array.from(rnd, (b) => ALPHABET[b % ALPHABET.length]).join("");
    return chars.match(/.{4}/g).join("-");
  }
  const clean = (code) => String(code || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  const isValid = (code) => clean(code).length === 16 && [...clean(code)].every((c) => ALPHABET.includes(c));
  const pretty = (code) => clean(code).match(/.{1,4}/g).join("-");
  const urlOf = (code) => BASE + "lq-" + clean(code).toLowerCase();

  /* ---------- Сеть ---------- */
  async function upload(code, data, username) {
    const payload = { app: "LinguaQuest", v: 1, savedAt: data.savedAt || Date.now(), username: username || "", data };
    const res = await fetch(urlOf(code), {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: toB64(JSON.stringify(payload))
    });
    if (!res.ok) throw new Error("Сервер синхронизации ответил ошибкой " + res.status);
  }

  async function download(code) {
    const res = await fetch(urlOf(code), { cache: "no-store" });
    if (!res.ok) throw new Error("Сервер синхронизации ответил ошибкой " + res.status);
    const text = (await res.text()).trim();
    if (!text) return null;
    let obj;
    try { obj = JSON.parse(fromB64(text)); } catch (e) { throw new Error("Данные по этому коду повреждены"); }
    if (!obj || obj.app !== "LinguaQuest" || !obj.data || typeof obj.data !== "object") throw new Error("По этому коду хранятся чужие данные");
    // Приводим данные к правильной форме до объединения
    obj.data = Store.migrateData(obj.data);
    obj.username = typeof obj.username === "string" ? obj.username : "";
    return obj;
  }

  /* ---------- Объединение прогресса двух устройств ----------
     Берём за основу более свежие данные и добавляем из других всё,
     чего в них нет: пройденные уроки, награды, слова, опыт по дням. */
  function merge(a, b) {
    const newer = (a.savedAt || 0) >= (b.savedAt || 0) ? a : b;
    const older = newer === a ? b : a;
    const m = JSON.parse(JSON.stringify(newer));
    const o = older;
    m.completed = Object.assign({}, o.completed || {}, m.completed || {});
    m.achievements = Object.assign({}, o.achievements || {}, m.achievements || {});
    m.words = [...new Set([...(m.words || []), ...(o.words || [])])];
    m.owned = [...new Set([...(m.owned || []), ...(o.owned || [])])];
    // Свои слова: объединяем по английскому написанию
    const cw = new Map();
    [...(o.customWords || []), ...(m.customWords || [])].forEach((w) => cw.set(w.en.toLowerCase(), w));
    m.customWords = [...cw.values()];
    m.placementDone = !!(m.placementDone || o.placementDone);
    m.wordStats = Object.assign({}, m.wordStats || {});
    for (const [k, s] of Object.entries(o.wordStats || {})) {
      if (!m.wordStats[k] || (s.seen || 0) > (m.wordStats[k].seen || 0)) m.wordStats[k] = s;
    }
    m.xpByDay = Object.assign({}, m.xpByDay || {});
    for (const [k, v] of Object.entries(o.xpByDay || {})) m.xpByDay[k] = Math.max(m.xpByDay[k] || 0, v);
    m.dayLog = Object.assign({}, m.dayLog || {});
    for (const [k, v] of Object.entries(o.dayLog || {})) {
      const cur = m.dayLog[k] || { w: [], l: [] };
      m.dayLog[k] = { w: [...new Set([...cur.w, ...(v.w || [])])], l: [...new Set([...cur.l, ...(v.l || [])])] };
    }
    m.accByDay = Object.assign({}, m.accByDay || {});
    for (const [k, v] of Object.entries(o.accByDay || {})) if (!m.accByDay[k] || v.t > m.accByDay[k].t) m.accByDay[k] = v;
    m.xp = Math.max(m.xp || 0, o.xp || 0);
    m.bestStreak = Math.max(m.bestStreak || 0, o.bestStreak || 0);
    m.perfectCount = Math.max(m.perfectCount || 0, o.perfectCount || 0);
    m.gemsEarned = Math.max(m.gemsEarned || 0, o.gemsEarned || 0);
    // Монеты и заморозки берём по максимуму, чтобы заработанное на другом устройстве не пропало
    m.gems = Math.max(Number(m.gems) || 0, Number(o.gems) || 0);
    m.freezes = Math.max(Number(m.freezes) || 0, Number(o.freezes) || 0);
    const r1 = m.records || {}, r2 = o.records || {};
    m.records = {
      speed: Math.max(r1.speed || 0, r2.speed || 0),
      sounds: Math.max(r1.sounds || 0, r2.sounds || 0),
      pairs: Math.min(r1.pairs || Infinity, r2.pairs || Infinity) === Infinity ? 0 : Math.min(r1.pairs || Infinity, r2.pairs || Infinity)
    };
    m.savedAt = Math.max(a.savedAt || 0, b.savedAt || 0);
    return m;
  }

  // Есть ли в b что-то новое по сравнению с a (чтобы не дёргать интерфейс зря)
  function differs(a, b) {
    return (b.savedAt || 0) > (a.savedAt || 0) &&
      (b.xp !== a.xp || Object.keys(b.completed || {}).length !== Object.keys(a.completed || {}).length || b.gems !== a.gems || Object.keys(b.wordStats || {}).length !== Object.keys(a.wordStats || {}).length);
  }

  return { makeCode, isValid, pretty, clean, upload, download, merge, differs };
})();
