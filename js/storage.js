/* ==========================================================================
   LinguaQuest - локальное хранилище
   Аккаунты, пароли и весь прогресс хранятся в localStorage этого браузера.
   ВАЖНО: это локальная защита "от случайного входа в чужой профиль",
   а не настоящая безопасность. Пароль не хранится в открытом виде:
   сохраняется только хеш с солью (PBKDF2, если браузер поддерживает WebCrypto).
   ========================================================================== */

const Store = (() => {
  const USERS_KEY = "lq_users_v1";
  const SESSION_KEY = "lq_session_v1";
  const DEVICE_KEY = "lq_device_v1"; // настройки устройства (тема до входа)

  const AVATAR_COLORS = ["#2fd18b", "#3bb7f6", "#9b7bff", "#ff6b81", "#ff9a3d", "#2dd4bf", "#ff7ac8"];

  /* ---------- Безопасная работа с localStorage ---------- */
  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn("Не удалось сохранить данные", e);
      return false;
    }
  }

  /* ---------- Даты ---------- */
  // Ключ дня в локальном времени: "2026-10-10"
  function dayKey(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  function daysBetween(a, b) {
    const da = new Date(a + "T00:00:00");
    const db = new Date(b + "T00:00:00");
    return Math.round((db - da) / 86400000);
  }
  function shiftDay(key, delta) {
    const d = new Date(key + "T00:00:00");
    d.setDate(d.getDate() + delta);
    return dayKey(d);
  }

  /* ---------- Хеширование пароля ---------- */
  function randomSalt() {
    const arr = new Uint8Array(16);
    (window.crypto || {}).getRandomValues ? crypto.getRandomValues(arr) : arr.forEach((_, i) => (arr[i] = Math.random() * 256));
    return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
  }

  // Запасной хеш (cyrb53), если WebCrypto недоступен (например, очень старый браузер)
  function cyrb53(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0; i < str.length; i++) {
      const ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
  }

  async function hashPassword(password, salt) {
    try {
      if (window.crypto && crypto.subtle) {
        const enc = new TextEncoder();
        const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
        const bits = await crypto.subtle.deriveBits(
          { name: "PBKDF2", salt: enc.encode(salt), iterations: 60000, hash: "SHA-256" },
          key,
          256
        );
        return "pbkdf2$" + Array.from(new Uint8Array(bits), (b) => b.toString(16).padStart(2, "0")).join("");
      }
    } catch (e) { /* переходим к запасному варианту */ }
    let h = password + salt;
    for (let i = 0; i < 2000; i++) h = cyrb53(h, i);
    return "cyrb$" + h;
  }

  /* ---------- Пользователи ---------- */
  function allUsers() { return readJSON(USERS_KEY, {}); }
  function saveAllUsers(users) { return writeJSON(USERS_KEY, users); }

  // Начальное состояние прогресса нового пользователя
  function freshData() {
    return {
      xp: 0,
      gems: 50,             // монеты; стартовый подарок
      gemsEarned: 0,
      streak: 0,
      bestStreak: 0,
      lastActiveDay: null,
      freezes: 0,
      completed: {},        // { lessonId: { times, perfect } }
      perfectCount: 0,
      words: [],            // выученные английские слова
      xpByDay: {},          // { "2026-10-10": 35 }
      dailyGoal: 20,
      achievements: {},     // { id: timestamp }
      owned: [],            // купленные наряды
      hat: null,
      flags: { night: 0, morning: 0 },
      // Интервальное повторение: { "apple": { lvl, due, wrong, seen } }
      wordStats: {},
      // Счётчики для заданий дня (сбрасываются каждый день)
      daily: { day: null, lessons: 0, correct: 0, reviews: 0, perfect: 0, claimed: [] },
      reviewsTotal: 0,
      // Синхронизация между устройствами: { code, lastSync }
      sync: null,
      // Свои слова пользователя [{ en, ru }] и отметка о пройденном тесте уровня
      customWords: [],
      placementDone: false,
      // Рекорды мини-игр и точность ответов по дням
      records: { speed: 0, pairs: 0, sounds: 0 },
      accByDay: {},
      totalAnswers: 0,
      correctAnswers: 0,
      minutes: 0,
      // voice - выбранный голос озвучки, rate - скорость, autoSpeak - озвучивать слова автоматически
      settings: { theme: "dark", sound: true, speech: true, autoSpeak: true, voice: null, rate: 0.9 }
    };
  }

  // Дополняет старые сохранения новыми полями (если структура расширялась)
  function migrate(data) {
    const base = freshData();
    for (const k of Object.keys(base)) {
      if (data[k] === undefined) data[k] = base[k];
    }
    data.settings = Object.assign(base.settings, data.settings || {});
    data.flags = Object.assign(base.flags, data.flags || {});
    data.daily = Object.assign(base.daily, data.daily || {});
    data.records = Object.assign(base.records, data.records || {});
    return data;
  }

  function normalizeName(name) { return String(name || "").trim(); }
  function userKey(name) { return normalizeName(name).toLowerCase(); }

  let currentKey = null;
  let current = null; // ссылка на данные текущего пользователя

  // Опыт за последние 7 дней по таблице xpByDay
  function sumWeek(byDay) {
    let sum = 0;
    for (let i = 0; i < 7; i++) sum += (byDay || {})[shiftDay(dayKey(), -i)] || 0;
    return sum;
  }

  function listUsers() {
    const users = allUsers();
    return Object.values(users)
      .map((u) => ({ username: u.username, color: u.color, xp: u.data.xp, streak: u.data.streak, lastLogin: u.lastLogin || 0, weekXP: sumWeek(u.data.xpByDay) }))
      .sort((a, b) => b.lastLogin - a.lastLogin);
  }

  async function register(username, password) {
    const name = normalizeName(username);
    if (name.length < 2) throw new Error("Имя должно быть не короче 2 символов");
    if (name.length > 20) throw new Error("Имя должно быть не длиннее 20 символов");
    if (!/^[\p{L}\p{N}_ .-]+$/u.test(name)) throw new Error("Используйте буквы, цифры, пробел, точку, дефис или _");
    if (String(password).length < 4) throw new Error("Пароль должен быть не короче 4 символов");
    const users = allUsers();
    const key = userKey(name);
    if (users[key]) throw new Error("Такой профиль уже есть на этом устройстве");
    const salt = randomSalt();
    const hash = await hashPassword(password, salt);
    const count = Object.keys(users).length;
    users[key] = {
      username: name,
      salt,
      hash,
      color: AVATAR_COLORS[count % AVATAR_COLORS.length],
      createdAt: Date.now(),
      lastLogin: Date.now(),
      data: freshData()
    };
    // Новый профиль наследует выбранную на устройстве тему
    users[key].data.settings.theme = device().theme || "dark";
    if (!saveAllUsers(users)) throw new Error("Хранилище браузера недоступно или переполнено");
    startSession(key, users[key]);
    return users[key];
  }

  async function login(username, password) {
    const users = allUsers();
    const key = userKey(username);
    const user = users[key];
    if (!user) throw new Error("Профиль не найден. Зарегистрируйтесь");
    const hash = await hashPassword(password, user.salt);
    if (hash !== user.hash) throw new Error("Неверный пароль");
    user.lastLogin = Date.now();
    saveAllUsers(users);
    startSession(key, user);
    return user;
  }

  function startSession(key, user) {
    currentKey = key;
    current = migrate(user.data);
    try { sessionStorage.setItem(SESSION_KEY, key); } catch (e) {}
    writeJSON(SESSION_KEY, key);
  }

  // Восстановление сессии после перезагрузки страницы
  function restore() {
    const key = readJSON(SESSION_KEY, null);
    if (!key) return null;
    const users = allUsers();
    if (!users[key]) return null;
    currentKey = key;
    current = migrate(users[key].data);
    return users[key];
  }

  function logout() {
    save();
    currentKey = null;
    current = null;
    try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
  }

  function deleteCurrent() {
    const users = allUsers();
    delete users[currentKey];
    saveAllUsers(users);
    currentKey = null;
    current = null;
    try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
  }

  const saveListeners = [];
  function save({ silent = false } = {}) {
    if (!currentKey || !current) return;
    const users = allUsers();
    if (!users[currentKey]) return;
    // Метка времени нужна синхронизации, чтобы понять, какие данные новее
    current.savedAt = Date.now();
    users[currentKey].data = current;
    saveAllUsers(users);
    if (!silent) saveListeners.forEach((fn) => fn());
  }
  function onSave(fn) { saveListeners.push(fn); }
  // Полная замена прогресса (после синхронизации)
  function setData(data) {
    current = migrate(data);
    save({ silent: true });
  }

  function user() {
    if (!currentKey) return null;
    const u = allUsers()[currentKey];
    return u ? { username: u.username, color: u.color, createdAt: u.createdAt } : null;
  }

  function data() { return current; }

  /* ---------- Резервная копия ---------- */
  // Экспорт прогресса текущего профиля (без пароля)
  function exportData() {
    const u = user();
    return { app: "LinguaQuest", version: 1, exportedAt: new Date().toISOString(), username: u ? u.username : "", data: current };
  }
  // Импорт: заменяет прогресс текущего профиля данными из файла
  function importData(obj) {
    if (!obj || obj.app !== "LinguaQuest" || typeof obj.data !== "object" || obj.data === null) {
      throw new Error("Это не файл резервной копии LinguaQuest");
    }
    current = migrate(JSON.parse(JSON.stringify(obj.data)));
    save();
  }

  /* ---------- Настройки устройства (до входа в профиль) ---------- */
  function device() { return readJSON(DEVICE_KEY, { theme: "dark" }); }
  function setDevice(patch) { writeJSON(DEVICE_KEY, Object.assign(device(), patch)); }

  /* ---------- Серия дней ---------- */
  // Проверка серии при входе: пропущенные дни сжигают заморозки или обнуляют серию
  function checkStreak() {
    const d = current;
    const today = dayKey();
    const result = { usedFreezes: 0, lost: false };
    if (!d.lastActiveDay || d.streak === 0) return result;
    const diff = daysBetween(d.lastActiveDay, today);
    if (diff >= 2) {
      const missed = diff - 1;
      if (d.freezes >= missed) {
        d.freezes -= missed;
        d.lastActiveDay = shiftDay(today, -1);
        result.usedFreezes = missed;
      } else {
        result.lost = d.streak;
        d.streak = 0;
      }
      save();
    }
    return result;
  }

  // Отметка активности дня после завершения урока
  function markActive() {
    const d = current;
    const today = dayKey();
    let increased = false;
    if (d.lastActiveDay !== today) {
      if (d.lastActiveDay && daysBetween(d.lastActiveDay, today) === 1) d.streak += 1;
      else d.streak = 1;
      d.lastActiveDay = today;
      d.bestStreak = Math.max(d.bestStreak, d.streak);
      increased = true;
    }
    return increased;
  }

  function addXP(amount) {
    const d = current;
    const k = dayKey();
    d.xp += amount;
    d.xpByDay[k] = (d.xpByDay[k] || 0) + amount;
  }

  function todayXP() { return current ? current.xpByDay[dayKey()] || 0 : 0; }

  // Опыт за последние 7 дней (для графика)
  function weekXP() {
    const out = [];
    const today = dayKey();
    for (let i = 6; i >= 0; i--) {
      const k = shiftDay(today, -i);
      out.push({ key: k, xp: (current && current.xpByDay[k]) || 0, date: new Date(k + "T00:00:00") });
    }
    return out;
  }

  return {
    listUsers, register, login, logout, restore, save, user, data, deleteCurrent,
    device, setDevice, checkStreak, markActive, exportData, importData, shiftDay, onSave, setData,
    addXP, todayXP, weekXP, dayKey
  };
})();
