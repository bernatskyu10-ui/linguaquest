/* ==========================================================================
   LinguaQuest - графика
   Талисман Лингви - спрайты из assets/mascot (поверх рисуются шапки).
   Всё остальное рисуется кодом в SVG: иконки интерфейса, иконки глав,
   медали достижений, картинки к словам и фоновые фигуры.
   Каждая функция возвращает строку с разметкой.
   ========================================================================== */

const SVG = (() => {
  // Счётчик для уникальных id градиентов (иначе градиенты разных SVG конфликтуют)
  let uid = 0;
  const id = (p) => `${p}${++uid}`;

  /* ------------------------------------------------------------------
     Талисман Лингви: лисёнок в синем худи. Позы - готовые спрайты
     с прозрачным фоном из папки assets/mascot.
     mood: "idle" | "happy" | "wave" | "sad" | "wink" | "determined" | "sleep"
     hat: null | "cap" | "party" | "crown" - наряд из магазина поверх спрайта
     ------------------------------------------------------------------ */
  const MASCOT_DIR = "assets/mascot/";

  // Для каждой позы: файл, тип (бюст обрезан снизу и плавно растворяется)
  // и точка на макушке для шапки: cx, top и ширина шапки в процентах картинки
  const POSES = {
    idle:       { file: "fox-read.webp",       bust: true,  hat: { cx: 50, top: 17, w: 44 } },
    happy:      { file: "fox-laugh.webp",      bust: true,  hat: { cx: 49, top: 18, w: 44 } },
    wave:       { file: "fox-main.webp",       bust: false, hat: { cx: 56, top: 13, w: 40 } },
    wink:       { file: "fox-wink.webp",       bust: true,  hat: { cx: 53, top: 16, w: 42 } },
    determined: { file: "fox-determined.webp", bust: true,  hat: { cx: 45, top: 17, w: 44 } },
    sad:        { file: "fox-back.webp",       bust: false, hat: { cx: 47, top: 15, w: 46 } },
    sleep:      { file: "fox-sleep.webp",      bust: false, hat: null },
    // Эмоции (второй лист): радость, слёзы, удивление, раздумье и другие
    cheer:      { file: "fox-cheer.webp",      bust: true,  hat: { cx: 44, top: 15, w: 40 } },
    cry:        { file: "fox-cry.webp",        bust: true,  hat: null },
    surprised:  { file: "fox-surprised.webp",  bust: true,  hat: { cx: 47, top: 15, w: 42 } },
    think:      { file: "fox-think.webp",      bust: true,  hat: { cx: 45, top: 15, w: 42 } },
    party:      { file: "fox-party.webp",      bust: true,  hat: null },
    readlaugh:  { file: "fox-readlaugh.webp",  bust: true,  hat: { cx: 50, top: 16, w: 44 } },
    cool:       { file: "fox-cool.webp",       bust: true,  hat: { cx: 47, top: 15, w: 42 } },
    angry:      { file: "fox-angry.webp",      bust: true,  hat: { cx: 53, top: 15, w: 44 } },
    love:       { file: "fox-love.webp",       bust: true,  hat: { cx: 52, top: 15, w: 44 } },
    sleepy:     { file: "fox-sleepy.webp",     bust: false, hat: null },
    hello:      { file: "fox-hello.webp",      bust: true,  hat: { cx: 45, top: 15, w: 42 } },
    worried:    { file: "fox-worried.webp",    bust: true,  hat: { cx: 50, top: 16, w: 46 } }
  };

  // Шапки нарисованы отдельно, viewBox 100x64, низ шапки ложится на макушку
  const HATS = {
    cap: `<path d="M12 60 Q14 8 50 6 Q86 8 88 60 Z" fill="#5b8cff"/>
      <path d="M50 6 Q72 9 82 30" stroke="#3a62d6" stroke-width="4" fill="none"/>
      <path d="M68 52 Q104 44 116 56 Q96 66 68 62 Z" fill="#3a62d6"/>
      <path d="M12 60 Q50 50 88 60 L88 64 Q50 56 12 64 Z" fill="#2f50b8"/>
      <circle cx="50" cy="8" r="5" fill="#ffb547"/>`,
    party: `<path d="M26 62 L50 0 L74 62 Z" fill="#8f7bff"/>
      <path d="M36 36 L64 36 L68 46 L32 46 Z M42 18 L58 18 L61 26 L39 26 Z" fill="#ffb547"/>
      <path d="M22 62 Q50 70 78 62" stroke="#6a55e0" stroke-width="6" fill="none" stroke-linecap="round"/>
      <circle cx="50" cy="2" r="8" fill="#ff6b4a"/>`,
    crown: `<path d="M14 62 L8 18 L32 36 L50 6 L68 36 L92 18 L86 62 Z" fill="#ffc94d" stroke="#e39b16" stroke-width="3" stroke-linejoin="round"/>
      <rect x="14" y="52" width="72" height="11" rx="4" fill="#e39b16"/>
      <circle cx="50" cy="40" r="6" fill="#ff4d6d"/>
      <circle cx="28" cy="46" r="4.5" fill="#5b8cff"/>
      <circle cx="72" cy="46" r="4.5" fill="#2ec4a6"/>
      <path d="M22 30 L26 52" stroke="#fff" stroke-width="3" opacity=".5" stroke-linecap="round"/>`
  };

  function mascot({ mood = "idle", hat = null, cls = "" } = {}) {
    const pose = POSES[mood] || POSES.idle;
    const hatSvg = hat && HATS[hat] && pose.hat
      ? `<svg class="mascot__hat" viewBox="0 0 100 64" style="left:${pose.hat.cx}%;top:${pose.hat.top}%;width:${pose.hat.w}%" aria-hidden="true">${HATS[hat]}</svg>`
      : "";
    return `<span class="mascot mascot--${mood} ${pose.bust ? "mascot--bust" : ""} ${cls}" role="img" aria-label="Лисёнок Лингви">
      <img src="${MASCOT_DIR}${pose.file}" alt="" draggable="false" decoding="async">${hatSvg}
    </span>`;
  }

  /* Логотип: мордочка лисёнка */
  function logo() {
    return `<img class="logo-img" src="${MASCOT_DIR}fox-face.webp" alt="" draggable="false">`;
  }

  /* ------------------------------------------------------------------
     Иконки интерфейса (24x24). Цветные, в духе игровых приложений.
     ------------------------------------------------------------------ */
  const ICONS = {
    /* Монохромные иконки меню (цвет берётся из текста) */
    navLearn: `<path d="M9 4 3 6.5v13L9 17l6 3 6-2.5v-13L15 7z" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/><path d="M9 4v13M15 7v13" stroke="currentColor" stroke-width="2"/>`,
    navAwards: `<circle cx="12" cy="9" r="6" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8.5 14 7 21l5-2.5 5 2.5-1.5-7" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/><path d="m12 6.2.9 1.8 2 .3-1.4 1.4.3 2-1.8-1-1.8 1 .3-2L9 8.3l2-.3z" fill="currentColor"/>`,
    navShop: `<path d="M5 8h14l-1 12H6z" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8" stroke="currentColor" stroke-width="2" fill="none"/>`,
    navProfile: `<circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2" fill="none"/><path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>`,
    navSettings: `<path d="M4 7h10M18 7h2M4 17h2M10 17h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="16" cy="7" r="2.4" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="8" cy="17" r="2.4" stroke="currentColor" stroke-width="2" fill="none"/>`,
    mic: `<rect x="8.5" y="2.5" width="7" height="12" rx="3.5" fill="currentColor"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3.5M8.5 21.5h7" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round"/>`,
    navGames: `<rect x="2.5" y="7" width="19" height="11" rx="5.5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M7.5 10.5v4M5.5 12.5h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="15.5" cy="11.5" r="1.2" fill="currentColor"/><circle cx="17.5" cy="13.8" r="1.2" fill="currentColor"/>`,
    navWords: `<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M9 8h7M9 12h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
    repeat: `<path d="M4 12a8 8 0 0 1 13.7-5.7L20 8.5M20 4v4.5h-4.5M20 12a8 8 0 0 1-13.7 5.7L4 15.5M4 20v-4.5h4.5" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    quest: `<rect x="4" y="3" width="16" height="18" rx="3" fill="#8f7bff"/><path d="M8 8.5l1.5 1.5 3-3M8 14.5l1.5 1.5 3-3" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.5 9h2.5M14.5 15h2.5" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".7"/>`,
    download: `<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    upload: `<path d="M12 16V5M7 9.5l5-5 5 5M5 20h14" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    search: `<circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="2.2" fill="none"/><path d="m16 16 4.5 4.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`,
    /* Монета - внутренняя валюта */
    coin: `<circle cx="12" cy="12" r="9.5" fill="#ffb547"/><circle cx="12" cy="12" r="7" fill="#ffc96e" stroke="#e39b16" stroke-width="1.4"/><path d="M12 8.2l1.2 2.5 2.7.4-2 1.9.5 2.7-2.4-1.3-2.4 1.3.5-2.7-2-1.9 2.7-.4z" fill="#e39b16"/>`,
    /* Серия дней: звезда-искра */
    streak: `<path d="M12 2.5c.6 4.2 2.6 6.4 7.5 7-4.9.8-6.9 3.1-7.5 7.5-.6-4.4-2.6-6.7-7.5-7.5 4.9-.6 6.9-2.8 7.5-7z" fill="#ff6b4a"/><path d="M18.5 15.5c.3 1.8 1 2.6 3 3-2 .4-2.7 1.2-3 3-.3-1.8-1-2.6-3-3 2-.4 2.7-1.2 3-3z" fill="#ffb547"/>`,
    streakOff: `<path d="M12 2.5c.6 4.2 2.6 6.4 7.5 7-4.9.8-6.9 3.1-7.5 7.5-.6-4.4-2.6-6.7-7.5-7.5 4.9-.6 6.9-2.8 7.5-7z" fill="#8b90b0"/>`,
    calendar: `<rect x="3" y="5" width="18" height="16" rx="3" fill="#5b8cff"/><path d="M3 10h18" stroke="#fff" stroke-width="1.6" opacity=".7"/><path d="M8 3v4M16 3v4" stroke="#3a62d6" stroke-width="2.2" stroke-linecap="round"/><path d="m8.5 15 2.2 2.2 4.8-4.7" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    learn: `<path d="M3 11.5 12 4l9 7.5V20a1.5 1.5 0 0 1-1.5 1.5H15v-6H9v6H4.5A1.5 1.5 0 0 1 3 20z" fill="#ff9a3d"/><path d="M1.5 12 12 3.2 22.5 12" stroke="#ff6b81" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="9" y="15.5" width="6" height="6" rx="1" fill="#ffd9a8"/>`,
    trophy: `<path d="M7 3h10v6a5 5 0 0 1-10 0z" fill="#ffc83d"/><path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3" stroke="#d99a0b" stroke-width="2" fill="none"/><rect x="10.5" y="13" width="3" height="4" fill="#d99a0b"/><rect x="7" y="17" width="10" height="4" rx="1.5" fill="#ff9a3d"/><path d="M10 6.5l1 2 2 .3-1.5 1.4.4 2L10 11l-1.9 1.2.4-2L7 8.8l2-.3z" fill="#fff" opacity=".7" transform="translate(2 -1)"/>`,
    profile: `<circle cx="12" cy="8" r="4.5" fill="#9b7bff"/><path d="M3.5 21a8.5 8.5 0 0 1 17 0z" fill="#3bb7f6"/><circle cx="10.4" cy="7" r="1.3" fill="#fff" opacity=".6"/>`,
    shop: `<path d="M4 9h16l-1.2 11a1.5 1.5 0 0 1-1.5 1.3H6.7a1.5 1.5 0 0 1-1.5-1.3z" fill="#ff6b81"/><path d="M8 9V7a4 4 0 0 1 8 0v2" stroke="#d63c57" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M8.5 14h7" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".7"/>`,
    settings: `<path d="M12 2.5l2 2.2 3-.5.8 2.9 2.8 1.2-.9 2.8 1.6 2.6-2.4 1.8.1 3-3 .2-1.5 2.6L12 20l-2.5 1.3L8 18.7l-3-.2.1-3-2.4-1.8L4.3 11l-.9-2.8 2.8-1.2.8-2.9 3 .5z" fill="#8d98c7"/><circle cx="12" cy="11.5" r="3.6" fill="#fff"/>`,
    flame: `<path d="M12 2c.8 3.6 5.5 5.6 5.5 11.2A5.5 5.5 0 0 1 6.5 13.2c0-2.5 1.2-4.2 2.4-5.3.1 2.2 1 3.4 2.2 3.6C11 8.6 10.4 5.4 12 2z" fill="#ff9a3d"/><path d="M12 11c.5 2 2.8 3 2.8 5.6a2.8 2.8 0 0 1-5.6 0c0-1.4.6-2.3 1.3-2.9.1 1 .5 1.5 1 1.6-.1-1.6-.2-3 .5-4.3z" fill="#ffd36e"/>`,
    flameOff: `<path d="M12 2c.8 3.6 5.5 5.6 5.5 11.2A5.5 5.5 0 0 1 6.5 13.2c0-2.5 1.2-4.2 2.4-5.3.1 2.2 1 3.4 2.2 3.6C11 8.6 10.4 5.4 12 2z" fill="#8d98c7"/>`,
    gem: `<path d="M6.5 3h11L22 9l-10 12.5L2 9z" fill="#3bb7f6"/><path d="M2 9h20L12 21.5z" fill="#1b86c9"/><path d="M6.5 3 9 9h6l2.5-6" fill="#8fdcff"/><path d="M9 9l3 12.5L15 9" fill="#5cc8ff"/>`,
    bolt: `<path d="M13.5 2 4 13.5h7L9.5 22 20 9.5h-7z" fill="#ffc83d"/><path d="M13.5 2 11 9.5h2L20 9.5h-7z" fill="#ffe08a"/>`,
    speaker: `<path d="M3 9.5h4l5-4.5v14l-5-4.5H3z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round"/>`,
    turtle: `<ellipse cx="11" cy="13" rx="7" ry="5" fill="currentColor"/><circle cx="19.5" cy="12" r="2.6" fill="currentColor"/><rect x="5" y="16" width="3" height="3.5" rx="1.2" fill="currentColor"/><rect x="13" y="16" width="3" height="3.5" rx="1.2" fill="currentColor"/><path d="M7 12.5h8M11 8.5v8" stroke="#fff" stroke-width="1.3" opacity=".5"/>`,
    close: `<path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/>`,
    check: `<path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    lock: `<rect x="5" y="10.5" width="14" height="10.5" rx="2.5" fill="currentColor"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="currentColor" stroke-width="2.4" fill="none"/>`,
    star: `<path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5-4.9-4.5 6.6-.8z" fill="currentColor"/>`,
    logout: `<path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M10 8l-4 4 4 4M6 12h10" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    sun: `<circle cx="12" cy="12" r="4.5" fill="currentColor"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
    moon: `<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" fill="currentColor"/>`,
    monitor: `<rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" stroke-width="2.2" fill="none"/><path d="M8 20h8M12 16v4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`,
    book: `<path d="M3 5.5C5.5 4 9 4 12 6c3-2 6.5-2 9-.5V19c-2.5-1.5-6-1.5-9 .5-3-2-6.5-2-9-.5z" fill="#3bb7f6"/><path d="M12 6v13.5" stroke="#1b86c9" stroke-width="1.6"/>`,
    target: `<circle cx="12" cy="12" r="9.5" fill="#ff6b81"/><circle cx="12" cy="12" r="6.5" fill="#fff"/><circle cx="12" cy="12" r="3.5" fill="#ff6b81"/>`,
    clock: `<circle cx="12" cy="12" r="9.5" fill="#9b7bff"/><path d="M12 6.5V12l3.5 2.5" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round"/>`,
    words: `<rect x="2.5" y="4" width="13" height="10" rx="3" fill="#2fd18b"/><path d="M5 14v4l4-4" fill="#2fd18b"/><rect x="9" y="9" width="12.5" height="9" rx="3" fill="#3bb7f6"/><path d="M19 18v3.5l-3.5-3.5" fill="#3bb7f6"/>`,
    plus: `<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/>`,
    freeze: `<path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7" stroke="#3bb7f6" stroke-width="2.4" stroke-linecap="round"/><path d="M9.5 3.5 12 6l2.5-2.5M9.5 20.5 12 18l2.5 2.5" stroke="#3bb7f6" stroke-width="2" fill="none" stroke-linecap="round"/>`
  };

  function icon(name, cls = "") {
    return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ""}</svg>`;
  }

  /* ------------------------------------------------------------------
     Иконки глав (64x64): объёмные, с градиентами и мягкими тенями.
     ID- в строках заменяется на уникальный префикс при каждой отрисовке,
     чтобы градиенты разных иконок не конфликтовали.
     ------------------------------------------------------------------ */
  const UNIT_DEFS = `
    <linearGradient id="ID-w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e3e7fb"/></linearGradient>
    <linearGradient id="ID-y" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe08a"/><stop offset="1" stop-color="#ffaa33"/></linearGradient>
    <linearGradient id="ID-c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffab94"/><stop offset="1" stop-color="#ff5a3a"/></linearGradient>
    <linearGradient id="ID-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9c4ff"/><stop offset="1" stop-color="#4f7cf5"/></linearGradient>
    <linearGradient id="ID-t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7ff0d6"/><stop offset="1" stop-color="#1fae92"/></linearGradient>
    <linearGradient id="ID-v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c3b6ff"/><stop offset="1" stop-color="#7a63f0"/></linearGradient>`;

  const UNIT_ICONS = {
    alphabet: `
      <g opacity=".18" fill="#1a1440"><rect x="5" y="27" width="25" height="25" rx="6"/><rect x="33" y="14" width="25" height="25" rx="6"/><rect x="31" y="37" width="25" height="25" rx="6"/></g>
      <rect x="4" y="24" width="25" height="25" rx="6" fill="#d2d8f5"/><rect x="4" y="22" width="25" height="24" rx="6" fill="url(#ID-w)"/>
      <text x="16.5" y="40" text-anchor="middle" font-family="Unbounded,Manrope,sans-serif" font-weight="700" font-size="15" fill="#4f7cf5">A</text>
      <g transform="rotate(10 45 25)"><rect x="32" y="12" width="25" height="25" rx="6" fill="#e39b16"/><rect x="32" y="10" width="25" height="24" rx="6" fill="url(#ID-y)"/>
      <text x="44.5" y="28" text-anchor="middle" font-family="Unbounded,Manrope,sans-serif" font-weight="700" font-size="14" fill="#8a5300">B</text></g>
      <g transform="rotate(-8 43 48)"><rect x="30" y="36" width="25" height="25" rx="6" fill="#d94a2a"/><rect x="30" y="34" width="25" height="24" rx="6" fill="url(#ID-c)"/>
      <text x="42.5" y="51" text-anchor="middle" font-family="Unbounded,Manrope,sans-serif" font-weight="700" font-size="14" fill="#fff">C</text></g>`,
    greetings: `
      <path d="M9 12h32a7 7 0 0 1 7 7v13a7 7 0 0 1-7 7H23l-9 8v-8H9a7 7 0 0 1-7-7V19a7 7 0 0 1 7-7z" fill="#1a1440" opacity=".16" transform="translate(1 3)"/>
      <path d="M9 10h32a7 7 0 0 1 7 7v13a7 7 0 0 1-7 7H23l-9 8v-8H9a7 7 0 0 1-7-7V17a7 7 0 0 1 7-7z" fill="url(#ID-w)"/>
      <text x="25" y="29" text-anchor="middle" font-family="Unbounded,Manrope,sans-serif" font-weight="700" font-size="11" fill="#4f7cf5">Hi!</text>
      <path d="M38 30h17a6 6 0 0 1 6 6v10a6 6 0 0 1-6 6h-2v7l-8-7h-7a6 6 0 0 1-6-6V36a6 6 0 0 1 6-6z" fill="url(#ID-y)"/>
      <circle cx="40" cy="41" r="2.4" fill="#8a5300"/><circle cx="46.5" cy="41" r="2.4" fill="#8a5300"/><circle cx="53" cy="41" r="2.4" fill="#8a5300"/>
      <path d="M12 14h12" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".8"/>`,
    pronouns: `
      <ellipse cx="32" cy="58" rx="26" ry="3.5" fill="#1a1440" opacity=".18"/>
      <circle cx="44" cy="22" r="8" fill="url(#ID-y)"/><path d="M31 54a13 13 0 0 1 26 0z" fill="url(#ID-y)"/>
      <circle cx="21" cy="21" r="10" fill="url(#ID-w)"/><path d="M5 56a16 16 0 0 1 32 0z" fill="url(#ID-w)"/>
      <circle cx="17.5" cy="20" r="1.8" fill="#4b3aa8"/><circle cx="24.5" cy="20" r="1.8" fill="#4b3aa8"/><path d="M18 25q3 2.5 6 0" stroke="#4b3aa8" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <circle cx="41.5" cy="21.5" r="1.5" fill="#8a5300"/><circle cx="46.5" cy="21.5" r="1.5" fill="#8a5300"/>
      <circle cx="17" cy="16" r="2.5" fill="#fff" opacity=".9"/>`,
    tobe: `
      <g opacity=".16" fill="#1a1440"><rect x="5" y="17" width="23" height="36" rx="7"/><rect x="37" y="17" width="23" height="36" rx="7"/></g>
      <rect x="4" y="13" width="23" height="36" rx="7" fill="url(#ID-w)"/>
      <rect x="37" y="13" width="23" height="36" rx="7" fill="url(#ID-y)"/>
      <rect x="28" y="24" width="8" height="4.5" rx="2.2" fill="#fff"/><rect x="28" y="33" width="8" height="4.5" rx="2.2" fill="#fff"/>
      <text x="15.5" y="36" text-anchor="middle" font-family="Unbounded,Manrope,sans-serif" font-weight="700" font-size="13" fill="#d94a2a">I</text>
      <text x="48.5" y="35.5" text-anchor="middle" font-family="Unbounded,Manrope,sans-serif" font-weight="700" font-size="10" fill="#8a5300">am</text>
      <path d="M9 18h9" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`,
    numbers: `
      <g transform="rotate(-12 21 36)"><rect x="7" y="24" width="28" height="28" rx="7" fill="#1a1440" opacity=".16" transform="translate(1 3)"/>
      <rect x="7" y="22" width="28" height="28" rx="7" fill="url(#ID-w)"/>
      <circle cx="14" cy="29" r="2.8" fill="#ff5a3a"/><circle cx="21" cy="36" r="2.8" fill="#ff5a3a"/><circle cx="28" cy="43" r="2.8" fill="#ff5a3a"/><circle cx="28" cy="29" r="2.8" fill="#ff5a3a"/><circle cx="14" cy="43" r="2.8" fill="#ff5a3a"/></g>
      <g transform="rotate(12 45 24)"><rect x="32" y="11" width="26" height="26" rx="7" fill="#e39b16"/><rect x="32" y="9" width="26" height="25" rx="7" fill="url(#ID-y)"/>
      <text x="45" y="28" text-anchor="middle" font-family="Unbounded,Manrope,sans-serif" font-weight="700" font-size="15" fill="#8a5300">7</text></g>
      <circle cx="50" cy="52" r="7" fill="url(#ID-b)"/><text x="50" y="55.5" text-anchor="middle" font-family="Unbounded,Manrope,sans-serif" font-weight="700" font-size="9" fill="#fff">3</text>`,
    colors: `
      <path d="M32 7C16 7 5 18 5 31c0 12 9 21 20 21 5 0 6-3 5-6s1-6 5-6h7c9 0 17-5 17-14C59 15 47 7 32 7z" fill="#1a1440" opacity=".16" transform="translate(1 3)"/>
      <path d="M32 6C16 6 5 17 5 30c0 12 9 21 20 21 5 0 6-3 5-6s1-6 5-6h7c9 0 17-5 17-14C59 14 47 6 32 6z" fill="url(#ID-w)"/>
      <circle cx="19" cy="25" r="5.5" fill="url(#ID-c)"/><circle cx="31" cy="16" r="5.5" fill="url(#ID-y)"/><circle cx="45" cy="20" r="5.5" fill="url(#ID-t)"/><circle cx="17" cy="38" r="5.5" fill="url(#ID-b)"/>
      <path d="M44 62l14-22 4 3-12 23z" fill="#8a5a2b"/><path d="M58 40l4 3 2-6z" fill="url(#ID-v)"/>`,
    family: `
      <ellipse cx="32" cy="59" rx="26" ry="3.5" fill="#1a1440" opacity=".18"/>
      <rect x="42" y="10" width="7" height="14" rx="1.5" fill="#d94a2a"/>
      <path d="M10 28v28h44V28L32 10z" fill="url(#ID-w)"/>
      <path d="M32 6 5 28l4 4 23-19 23 19 4-4z" fill="url(#ID-c)"/>
      <path d="M32 47s-10-6-10-13a5.5 5.5 0 0 1 10-3 5.5 5.5 0 0 1 10 3c0 7-10 13-10 13z" fill="url(#ID-c)"/>
      <circle cx="28" cy="33" r="1.6" fill="#fff" opacity=".8"/>`,
    food: `
      <ellipse cx="30" cy="59" rx="24" ry="3.5" fill="#1a1440" opacity=".18"/>
      <path d="M28 20c-8-6-22-2-22 12 0 12 9 23 17 23 3 0 4-2 7-2s4 2 7 2c8 0 17-11 17-23 0-14-14-18-22-12z" fill="url(#ID-c)"/>
      <path d="M30 20c0-6 2-10 6-13" stroke="#7a4a20" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M34 12c4-6 12-6 15-3-4 5-10 6-15 3z" fill="url(#ID-t)"/>
      <ellipse cx="17" cy="31" rx="3.5" ry="7" fill="#fff" opacity=".5" transform="rotate(20 17 31)"/>
      <rect x="44" y="34" width="16" height="20" rx="4" fill="url(#ID-w)"/><path d="M60 39h2a3 3 0 0 1 0 8h-2" stroke="#fff" stroke-width="2.4" fill="none"/>
      <rect x="44" y="34" width="16" height="6" rx="3" fill="#a8693a"/>`,
    time: `
      <ellipse cx="32" cy="60" rx="20" ry="3" fill="#1a1440" opacity=".18"/>
      <path d="M12 16a8 8 0 0 1 12-6M52 16a8 8 0 0 0-12-6" stroke="url(#ID-y)" stroke-width="6" stroke-linecap="round" fill="none"/>
      <path d="M17 52l-4 6M47 52l4 6" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      <circle cx="32" cy="34" r="22" fill="url(#ID-w)"/>
      <circle cx="32" cy="34" r="17" fill="none" stroke="#d3daf8" stroke-width="2"/>
      <g fill="#a8b4e8"><circle cx="32" cy="19.5" r="1.8"/><circle cx="46.5" cy="34" r="1.8"/><circle cx="32" cy="48.5" r="1.8"/><circle cx="17.5" cy="34" r="1.8"/></g>
      <path d="M32 23v11l8 5" stroke="#4f7cf5" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="32" cy="34" r="3" fill="#ff5a3a"/>`,
    verbs: `
      <ellipse cx="34" cy="56" rx="26" ry="3.5" fill="#1a1440" opacity=".18"/>
      <path d="M8 46c0-4 3-6 7-6h6l9-14 9 3 4 6 12 3c5 1 7 4 7 8v3H8z" fill="url(#ID-w)"/>
      <path d="M8 46h54v4a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3z" fill="url(#ID-c)"/>
      <path d="M30 26l-3 6M35 28l-3 6M40 30l-3 6" stroke="#4f7cf5" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M4 22h12M2 30h9M8 14h10" stroke="url(#ID-y)" stroke-width="4" stroke-linecap="round"/>`,
    questions: `
      <ellipse cx="30" cy="60" rx="20" ry="3" fill="#1a1440" opacity=".18"/>
      <circle cx="30" cy="30" r="24" fill="url(#ID-w)"/>
      <path d="M22 24a8 8 0 1 1 11 7.4c-2 1-3 2.4-3 4.6v2" stroke="#e39b16" stroke-width="6" fill="none" stroke-linecap="round"/>
      <circle cx="30" cy="46" r="3.6" fill="#e39b16"/>
      <circle cx="51" cy="14" r="9" fill="url(#ID-c)"/><text x="51" y="18.5" text-anchor="middle" font-family="Unbounded,Manrope,sans-serif" font-weight="700" font-size="12" fill="#fff">?</text>
      <ellipse cx="20" cy="16" rx="5" ry="3" fill="#fff" transform="rotate(-30 20 16)"/>`,
    continuous: `
      <ellipse cx="32" cy="60" rx="20" ry="3" fill="#1a1440" opacity=".18"/>
      <path d="M50 22A21 21 0 1 0 53 38" stroke="url(#ID-w)" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M42 12l12 8-12 7z" fill="#fff"/>
      <circle cx="32" cy="33" r="11" fill="url(#ID-y)"/>
      <text x="32" y="36.5" text-anchor="middle" font-family="Unbounded,Manrope,sans-serif" font-weight="700" font-size="8" fill="#8a5300">ing</text>`,
    past: `
      <ellipse cx="32" cy="61" rx="18" ry="2.5" fill="#1a1440" opacity=".18"/>
      <rect x="13" y="4" width="38" height="6" rx="3" fill="url(#ID-c)"/><rect x="13" y="54" width="38" height="6" rx="3" fill="url(#ID-c)"/>
      <path d="M18 10c0 12 12 15 12 22S18 42 18 54h28c0-12-12-15-12-22S46 22 46 10z" fill="url(#ID-w)"/>
      <path d="M24 52c2-6 6-8 8-12 2 4 6 6 8 12z" fill="url(#ID-y)"/>
      <path d="M23 16h18c-2 4-7 6-9 9-2-3-7-5-9-9z" fill="url(#ID-y)"/>
      <path d="M21 12v8" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`,
    phrases: `
      <ellipse cx="32" cy="60" rx="26" ry="3" fill="#1a1440" opacity=".18"/>
      <path d="M23 18v-5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v5" stroke="#fff" stroke-width="5" fill="none"/>
      <rect x="6" y="18" width="52" height="38" rx="8" fill="url(#ID-w)"/>
      <rect x="6" y="31" width="52" height="6" fill="url(#ID-y)"/>
      <rect x="27" y="27" width="10" height="14" rx="3" fill="url(#ID-c)"/>
      <circle cx="16" cy="47" r="5" fill="url(#ID-b)"/><path d="M14 47h4M16 45v4" stroke="#fff" stroke-width="1.6"/>
      <rect x="40" y="43" width="12" height="7" rx="2" fill="url(#ID-t)" transform="rotate(-10 46 46)"/>`,
    weather: `
      <ellipse cx="32" cy="60" rx="22" ry="3" fill="#1a1440" opacity=".18"/>
      <circle cx="22" cy="22" r="12" fill="url(#ID-y)"/>
      <g stroke="#ffe08a" stroke-width="3" stroke-linecap="round"><path d="M22 3v4M5 22h4M9 9l3 3M35 9l-3 3"/></g>
      <path d="M18 44a11 11 0 0 1 2-21.8A14 14 0 0 1 46 26a10 10 0 0 1 2 19.8z" fill="url(#ID-w)"/>
      <path d="M22 50l-3 6M32 50l-3 6M42 50l-3 6" stroke="url(#ID-b)" stroke-width="4" stroke-linecap="round"/>`,
    body: `
      <ellipse cx="32" cy="60" rx="18" ry="3" fill="#1a1440" opacity=".18"/>
      <path d="M32 54s-20-11-20-26a11 11 0 0 1 20-6.4A11 11 0 0 1 52 28c0 15-20 26-20 26z" fill="url(#ID-w)"/>
      <path d="M16 32h9l4-8 6 16 4-8h9" stroke="url(#ID-c)" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="44" y="6" width="14" height="14" rx="4" fill="url(#ID-t)"/><path d="M51 9v8M47 13h8" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>`,
    clothes: `
      <ellipse cx="32" cy="60" rx="24" ry="3" fill="#1a1440" opacity=".18"/>
      <path d="M22 8l-14 8 5 11 6-3v32h26V24l6 3 5-11-14-8c-2 5-6 8-10 8s-8-3-10-8z" fill="url(#ID-w)"/>
      <path d="M22 8c2 5 6 8 10 8s8-3 10-8" stroke="url(#ID-c)" stroke-width="3" fill="none"/>
      <rect x="25" y="30" width="14" height="10" rx="3" fill="url(#ID-y)"/>`,
    home: `
      <ellipse cx="32" cy="60" rx="24" ry="3" fill="#1a1440" opacity=".18"/>
      <rect x="6" y="38" width="52" height="14" rx="5" fill="url(#ID-w)"/>
      <rect x="10" y="26" width="44" height="16" rx="6" fill="url(#ID-y)"/>
      <rect x="6" y="34" width="9" height="18" rx="4" fill="#fff"/><rect x="49" y="34" width="9" height="18" rx="4" fill="#fff"/>
      <path d="M10 52v5M54 52v5" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      <path d="M44 6h12l-3 10h-6z" fill="url(#ID-c)"/><path d="M50 16v10" stroke="#fff" stroke-width="2.4"/>`,
    skills: `
      <ellipse cx="32" cy="60" rx="24" ry="3" fill="#1a1440" opacity=".18"/>
      <rect x="6" y="20" width="52" height="34" rx="7" fill="url(#ID-w)"/>
      <path d="M24 20v-5a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v5" stroke="#fff" stroke-width="5" fill="none"/>
      <path d="M6 34h52" stroke="#d3daf8" stroke-width="2"/>
      <circle cx="44" cy="44" r="9" fill="url(#ID-y)"/><path d="M44 39l1.6 3.3 3.6.5-2.6 2.5.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.5 3.6-.5z" fill="#fff"/>
      <rect x="27" y="30" width="10" height="8" rx="2" fill="url(#ID-c)"/>`,
    compare: `
      <ellipse cx="32" cy="60" rx="26" ry="3" fill="#1a1440" opacity=".18"/>
      <rect x="6" y="38" width="14" height="18" rx="4" fill="url(#ID-w)"/>
      <rect x="25" y="26" width="14" height="30" rx="4" fill="url(#ID-y)"/>
      <rect x="44" y="12" width="14" height="44" rx="4" fill="url(#ID-c)"/>
      <path d="M51 4l2 4 4.5.6-3.2 3 .8 4.4-4.1-2.2-4.1 2.2.8-4.4-3.2-3 4.5-.6z" fill="#fff"/>`,
    modals: `
      <ellipse cx="32" cy="60" rx="20" ry="3" fill="#1a1440" opacity=".18"/>
      <path d="M32 4 52 12v16c0 14-9 24-20 28C21 52 12 42 12 28V12z" fill="url(#ID-w)"/>
      <path d="M32 10 46 16v12c0 10-6 18-14 21-8-3-14-11-14-21V16z" fill="url(#ID-v)"/>
      <path d="M24 30l6 6 11-12" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    pastcont: `
      <ellipse cx="32" cy="60" rx="22" ry="3" fill="#1a1440" opacity=".18"/>
      <rect x="8" y="8" width="48" height="48" rx="10" fill="url(#ID-w)"/>
      <rect x="8" y="8" width="48" height="12" rx="6" fill="url(#ID-t)"/>
      <path d="M18 4v8M46 4v8" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      <path d="M18 32h28M18 42h18" stroke="#d3daf8" stroke-width="4" stroke-linecap="round"/>
      <circle cx="46" cy="44" r="8" fill="url(#ID-y)"/><path d="M46 40v4l3 2" stroke="#8a5300" stroke-width="2" fill="none" stroke-linecap="round"/>`,
    perfect: `
      <ellipse cx="32" cy="60" rx="20" ry="3" fill="#1a1440" opacity=".18"/>
      <circle cx="32" cy="30" r="24" fill="url(#ID-w)"/>
      <circle cx="32" cy="30" r="17" fill="url(#ID-c)"/>
      <path d="M23 30l6 6 12-13" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M48 8l2 4 4 .5-3 3 .7 4-3.7-2-3.7 2 .7-4-3-3 4-.5z" fill="url(#ID-y)"/>`,
    travel: `
      <ellipse cx="32" cy="60" rx="24" ry="3" fill="#1a1440" opacity=".18"/>
      <path d="M6 34 58 12l-10 40-14-12-8 10-2-14z" fill="url(#ID-w)"/>
      <path d="M24 36 58 12 34 40z" fill="#d3daf8"/>
      <path d="M26 50l8-10" stroke="url(#ID-b)" stroke-width="3"/>
      <circle cx="14" cy="14" r="7" fill="url(#ID-y)"/>`,
    talk: `
      <ellipse cx="32" cy="60" rx="22" ry="3" fill="#1a1440" opacity=".18"/>
      <rect x="18" y="4" width="28" height="52" rx="7" fill="url(#ID-w)"/>
      <rect x="22" y="10" width="20" height="36" rx="3" fill="url(#ID-b)"/>
      <circle cx="32" cy="51" r="2.5" fill="#a8b4e8"/>
      <path d="M50 14a10 10 0 0 1 0 16M55 9a17 17 0 0 1 0 26" stroke="url(#ID-y)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M27 20h10M27 27h7" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>`,
    future: `
      <path d="M22 46c-7 2-12 9-14 14 5-2 12-7 14-14z" fill="url(#ID-y)"/>
      <path d="M44 6c7 0 14 3 14 3s3 7 3 14c0 11-14 25-14 25L31 32S33 6 44 6z" fill="url(#ID-w)"/>
      <circle cx="45" cy="20" r="6" fill="url(#ID-b)"/><circle cx="43.5" cy="18.5" r="2" fill="#fff" opacity=".8"/>
      <path d="M31 32l-11 2-8 9 11 2zM47 48l-2 11-9 8-2-11z" fill="url(#ID-c)" transform="translate(0 -6)"/>
      <path d="M58 9s-3-1-6-1c2 2 4 5 5 8 1-3 1-7 1-7z" fill="url(#ID-c)"/>`
  };

  // Иконки глав старших уровней: карточка с ключевым словом темы
  const TEXT_ICONS = {
    cond: "if", passive: "-ed", reported: "said", phrasal: "up", career: "CV",
    narrative: "had", deduction: "?!", relative: "who", gerund: "-ing", society: "eco",
    regrets: "if...", emphasis: "!!", idioms: "aha", formal: "Dear", nuance: "Aa", academic: "A+"
  };
  function textIcon(label) {
    const fs = label.length <= 2 ? 22 : label.length <= 3 ? 17 : label.length <= 4 ? 14 : 12;
    return `
      <ellipse cx="32" cy="60" rx="22" ry="3" fill="#1a1440" opacity=".18"/>
      <g transform="rotate(-8 32 32)">
        <rect x="9" y="12" width="46" height="40" rx="10" fill="#1a1440" opacity=".16" transform="translate(1 3)"/>
        <rect x="9" y="10" width="46" height="40" rx="10" fill="url(#ID-w)"/>
        <text x="32" y="${30 + fs * 0.36}" text-anchor="middle" font-family="Unbounded,Manrope,sans-serif" font-weight="700" font-size="${fs}" fill="#3a2a8a">${label}</text>
      </g>
      <circle cx="52" cy="12" r="7" fill="url(#ID-y)"/>
      <path d="M49 12l2 2 4-4" stroke="#8a5300" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  }

  function unitIcon(key, cls = "unit-banner__icon") {
    const p = id("ui");
    const body = UNIT_ICONS[key] || (TEXT_ICONS[key] ? textIcon(TEXT_ICONS[key]) : UNIT_ICONS.alphabet);
    return `<svg class="${cls}" viewBox="0 0 64 64" aria-hidden="true"><defs>${UNIT_DEFS}</defs>${body}</svg>`.replace(/ID-/g, `${p}-`);
  }

  /* Иконки внутри кружков-уроков на тропинке */
  const NODE_GLYPHS = {
    star: ICONS.star,
    book: `<path d="M3 5.5C5.5 4 9 4 12 6c3-2 6.5-2 9-.5V19c-2.5-1.5-6-1.5-9 .5-3-2-6.5-2-9-.5z" fill="currentColor"/>`,
    chat: `<path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill="currentColor"/>`,
    dumbbell: `<rect x="2" y="9" width="3" height="6" rx="1" fill="currentColor"/><rect x="5" y="6.5" width="3.5" height="11" rx="1.2" fill="currentColor"/><rect x="8.5" y="10.8" width="7" height="2.4" fill="currentColor"/><rect x="15.5" y="6.5" width="3.5" height="11" rx="1.2" fill="currentColor"/><rect x="19" y="9" width="3" height="6" rx="1" fill="currentColor"/>`,
    trophy: `<path d="M7 3h10v6a5 5 0 0 1-10 0z" fill="currentColor"/><path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3" stroke="currentColor" stroke-width="2" fill="none"/><rect x="10.5" y="13" width="3" height="4" fill="currentColor"/><rect x="7" y="17" width="10" height="4" rx="1.5" fill="currentColor"/>`,
    check: `<path d="M4.5 12.5l5 5L19.5 7" stroke="currentColor" stroke-width="3.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    lock: ICONS.lock
  };
  function nodeGlyph(name) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${NODE_GLYPHS[name] || NODE_GLYPHS.star}</svg>`;
  }

  /* ------------------------------------------------------------------
     Значки достижений: шестиугольный щит с градиентом и белым символом
     ------------------------------------------------------------------ */
  const BADGE_GLYPHS = {
    star: `<path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5-4.9-4.5 6.6-.8z"/>`,
    book: `<path d="M3 5.5C5.5 4 9 4 12 6c3-2 6.5-2 9-.5V19c-2.5-1.5-6-1.5-9 .5-3-2-6.5-2-9-.5z"/>`,
    cap: `<path d="M12 4 1 9.5 12 15l9-4.5V17h2V9.5zM5.5 13v3.6L12 20l6.5-3.4V13L12 16.4z"/>`,
    trophy: `<path d="M7 3h10v6a5 5 0 0 1-10 0zM10.5 13h3v4h-3zM7 17h10v4H7zM4 5h3v2H4zM17 5h3v2h-3z"/><path d="M4 6v1a3 3 0 0 0 3 3M20 6v1a3 3 0 0 1-3 3" stroke="#fff" stroke-width="2" fill="none"/>`,
    flag: `<path d="M5 2h2.2v20H5zM8.5 3H20l-2.6 4.2L20 11.4H8.5z"/>`,
    flame: `<path d="M12 2c.8 3.6 5.5 5.6 5.5 11.2A5.5 5.5 0 0 1 6.5 13.2c0-2.5 1.2-4.2 2.4-5.3.1 2.2 1 3.4 2.2 3.6C11 8.6 10.4 5.4 12 2z"/>`,
    bolt: `<path d="M13.5 2 4 13.5h7L9.5 22 20 9.5h-7z"/>`,
    spark: `<path d="M12 1.5c.7 5 3 7.6 9 8.5-6 .9-8.3 3.6-9 8.8-.7-5.2-3-7.9-9-8.8 6-.9 8.3-3.5 9-8.5z"/><path d="M19 16c.3 2 1 3 3 3.3-2 .4-2.7 1.3-3 3.2-.3-1.9-1-2.8-3-3.2 2-.3 2.7-1.3 3-3.3z"/>`,
    coin: `<path fill-rule="evenodd" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 4.5 1.6 3.4 3.7.5-2.7 2.6.7 3.7L12 14.9l-3.3 1.8.7-3.7-2.7-2.6 3.7-.5z"/>`,
    target: `<path fill-rule="evenodd" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 3.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm0 3a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z"/>`,
    chat: `<path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>`,
    globe: `<path fill-rule="evenodd" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm-1.4 2.2C8.9 6.3 8 9 7.9 11h4.6V4.1zm2.8 0V11h3.7c-.1-2-.9-4.7-2.6-6.8zM4.1 11h1.8c.1-2.2.8-4.4 1.8-6A8 8 0 0 0 4.1 11zm14 0h1.8a8 8 0 0 0-3.6-6c1 1.6 1.7 3.8 1.8 6zM4.1 13a8 8 0 0 0 3.6 6c-1-1.6-1.7-3.8-1.8-6zm3.8 0c.1 2 1 4.7 2.7 6.8V13zm4.6 0v6.8c1.7-2.1 2.5-4.8 2.6-6.8zm5.6 0c-.1 2.2-.8 4.4-1.8 6a8 8 0 0 0 3.6-6z"/>`,
    gem: `<path d="M6.5 3h11L22 9l-10 12.5L2 9z"/>`,
    moon: `<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/>`,
    sun: `<circle cx="12" cy="12" r="5"/><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>`
  };

  /* Медаль: ленты, зубчатый край, внутренний диск с бликом и белый символ */
  function badge(glyph, colors = ["#ff8f6b", "#ff6b4a"]) {
    const g = id("bg"), s = id("bs"), r = id("br");
    // Зубчатый край медали из 20 лучей
    let rim = "";
    for (let i = 0; i < 40; i++) {
      const a = (Math.PI * 2 * i) / 40 - Math.PI / 2;
      const rad = i % 2 ? 37 : 41;
      rim += `${i ? "L" : "M"}${(50 + Math.cos(a) * rad).toFixed(1)} ${(44 + Math.sin(a) * rad).toFixed(1)}`;
    }
    return `<svg viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${colors[0]}"/><stop offset="1" stop-color="${colors[1]}"/></linearGradient>
        <radialGradient id="${s}" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="0.5" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
        <linearGradient id="${r}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${colors[1]}"/><stop offset="1" stop-color="${colors[0]}"/></linearGradient>
      </defs>
      <path d="M34 64 26 96l10-6 7 9 7-30z" fill="url(#${r})"/>
      <path d="M66 64l8 32-10-6-7 9-7-30z" fill="url(#${r})"/>
      <path d="M34 64 26 96l10-6 7 9 7-30z M66 64l8 32-10-6-7 9-7-30z" fill="#000" opacity=".15"/>
      <ellipse cx="50" cy="88" rx="22" ry="3" fill="#000" opacity=".12"/>
      <path d="${rim}Z" fill="${colors[1]}" transform="translate(0 2.5)"/>
      <path d="${rim}Z" fill="url(#${g})"/>
      <circle cx="50" cy="44" r="29" fill="${colors[1]}" opacity=".55"/>
      <circle cx="50" cy="44" r="27" fill="url(#${g})" stroke="#fff" stroke-opacity=".45" stroke-width="2"/>
      <circle cx="50" cy="44" r="27" fill="url(#${s})"/>
      <g transform="translate(31 25) scale(1.58)" fill="#000" opacity=".15"><g transform="translate(0.6 1)">${BADGE_GLYPHS[glyph] || BADGE_GLYPHS.star}</g></g>
      <g transform="translate(31 25) scale(1.58)" fill="#fff">${BADGE_GLYPHS[glyph] || BADGE_GLYPHS.star}</g>
    </svg>`;
  }

  /* ------------------------------------------------------------------
     Человечки для слов о семье и людях
     ------------------------------------------------------------------ */
  function person({ x = 50, y = 0, s = 1, skin = "#f5c69a", hair = "#5a3a22", style = "short", shirt = "#3bb7f6", beard = false, glasses = false, bow = false }) {
    let hairSvg = "";
    if (style === "short") hairSvg = `<path d="M-17 -4 Q-18 -24 0 -24 Q18 -24 17 -4 Q12 -14 0 -14 Q-12 -14 -17 -4Z" fill="${hair}"/>`;
    if (style === "long") hairSvg = `<path d="M-19 14 Q-22 -24 0 -24 Q22 -24 19 14 Q16 0 15 -8 Q8 -14 0 -14 Q-8 -14 -15 -8 Q-16 0 -19 14Z" fill="${hair}"/>`;
    if (style === "bun") hairSvg = `<circle cx="0" cy="-26" r="8" fill="${hair}"/><path d="M-17 -2 Q-18 -22 0 -22 Q18 -22 17 -2 Q10 -12 0 -12 Q-10 -12 -17 -2Z" fill="${hair}"/>`;
    if (style === "bald") hairSvg = `<path d="M-17 -2 Q-19 -10 -14 -12 M17 -2 Q19 -10 14 -12" stroke="${hair}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    if (style === "tuft") hairSvg = `<path d="M-4 -20 Q0 -30 6 -22" stroke="${hair}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    const beardSvg = beard ? `<path d="M-13 4 Q0 22 13 4 Q8 10 0 10 Q-8 10 -13 4Z" fill="${hair}"/>` : "";
    const glassesSvg = glasses ? `<circle cx="-7" cy="-3" r="5" fill="none" stroke="#1b2347" stroke-width="2"/><circle cx="7" cy="-3" r="5" fill="none" stroke="#1b2347" stroke-width="2"/><path d="M-2 -3h4" stroke="#1b2347" stroke-width="2"/>` : "";
    const bowSvg = bow ? `<path d="M10 -22 l10 -6 v12z M10 -22 l-2 -8 l8 2z" fill="#ff6b81"/>` : "";
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-26 62 Q-26 26 0 26 Q26 26 26 62 Z" fill="${shirt}"/>
      <rect x="-6" y="16" width="12" height="12" fill="${skin}"/>
      <circle cx="0" cy="0" r="18" fill="${skin}"/>
      ${hairSvg}
      <circle cx="-6.5" cy="-2" r="2.4" fill="#1b2347"/><circle cx="6.5" cy="-2" r="2.4" fill="#1b2347"/>
      <path d="M-5 7 Q0 11 5 7" stroke="#1b2347" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="-11" cy="5" r="3" fill="#ff7aa0" opacity=".4"/><circle cx="11" cy="5" r="3" fill="#ff7aa0" opacity=".4"/>
      ${beardSvg}${glassesSvg}${bowSvg}
    </g>`;
  }

  /* ------------------------------------------------------------------
     Картинки к словам (100x100)
     ------------------------------------------------------------------ */
  const PICS = {
    apple: `<path d="M50 30c-10-8-34-6-34 18 0 20 14 38 26 38 4 0 5-3 8-3s4 3 8 3c12 0 26-18 26-38 0-24-24-26-34-18z" fill="#ff5d73"/><path d="M50 30c0-8 3-14 8-18" stroke="#8a5a2b" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M56 20c6-9 18-9 22-4-6 7-15 8-22 4z" fill="#2fd18b"/><ellipse cx="30" cy="46" rx="6" ry="11" fill="#fff" opacity=".4" transform="rotate(20 30 46)"/>`,
    banana: `<path d="M18 30c6 34 34 50 66 38-4 8-16 18-34 16C26 82 10 58 14 30z" fill="#ffc83d"/><path d="M18 30c6 30 30 44 62 36" stroke="#e8a50d" stroke-width="3" fill="none"/><path d="M14 30l-2-8 6 2z" fill="#8a5a2b"/><path d="M84 68l6-2-4 6z" fill="#8a5a2b"/>`,
    bread: `<path d="M14 50c0-18 16-26 36-26s36 8 36 26c0 6-4 8-8 8v20a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4V58c-4 0-8-2-8-8z" fill="#e8a25a"/><path d="M14 50c0-18 16-26 36-26s36 8 36 26c0 6-4 8-8 8H22c-4 0-8-2-8-8z" fill="#c97b33"/><path d="M34 36l-6 10M50 34l-4 12M66 36l-4 10" stroke="#f7d29b" stroke-width="4" stroke-linecap="round"/>`,
    cheese: `<path d="M12 64 70 26l20 20v30H12z" fill="#ffd34e"/><path d="M12 64 70 26l20 20H12z" fill="#ffe58a"/><circle cx="38" cy="66" r="6" fill="#e8b520"/><circle cx="64" cy="70" r="4" fill="#e8b520"/><circle cx="76" cy="58" r="5" fill="#e8b520"/><circle cx="50" cy="54" r="3" fill="#e8b520"/>`,
    egg: `<ellipse cx="50" cy="56" rx="26" ry="32" fill="#fff4e0"/><ellipse cx="50" cy="56" rx="26" ry="32" fill="none" stroke="#e8d3b0" stroke-width="3"/><ellipse cx="40" cy="44" rx="6" ry="10" fill="#fff" transform="rotate(20 40 44)"/>`,
    cake: `<rect x="18" y="46" width="64" height="36" rx="6" fill="#ffb3c8"/><path d="M18 52q8 8 16 0t16 0 16 0 16 0v-6H18z" fill="#fff"/><rect x="18" y="64" width="64" height="5" fill="#ff7aa0"/><rect x="47" y="26" width="6" height="18" rx="2" fill="#3bb7f6"/><path d="M50 14q6 6 0 12q-6-6 0-12z" fill="#ffc83d"/><circle cx="34" cy="44" r="4" fill="#ff5d73"/><circle cx="66" cy="44" r="4" fill="#ff5d73"/>`,
    water: `<path d="M28 18h44l-6 66a4 4 0 0 1-4 4H38a4 4 0 0 1-4-4z" fill="#e3f4ff" stroke="#9fd6f7" stroke-width="3"/><path d="M31 44h38l-4 40a4 4 0 0 1-4 3H39a4 4 0 0 1-4-3z" fill="#3bb7f6"/><path d="M36 54q14 6 28 0" stroke="#8fdcff" stroke-width="3" fill="none"/>`,
    milk: `<path d="M30 30 40 14h20l10 16v54a4 4 0 0 1-4 4H34a4 4 0 0 1-4-4z" fill="#fff"/><path d="M30 30h40v54a4 4 0 0 1-4 4H34a4 4 0 0 1-4-4z" fill="#eaf3ff"/><rect x="30" y="48" width="40" height="22" fill="#3bb7f6"/><text x="50" y="64" text-anchor="middle" font-family="Unbounded,Manrope,sans-serif" font-weight="700" font-size="12" fill="#fff">MILK</text><rect x="40" y="8" width="20" height="8" rx="2" fill="#ff6b81"/>`,
    coffee: `<path d="M20 40h50v24a18 18 0 0 1-18 18H38a18 18 0 0 1-18-18z" fill="#fff"/><path d="M70 46h6a10 10 0 0 1 0 20h-8" stroke="#fff" stroke-width="6" fill="none"/><ellipse cx="45" cy="40" rx="25" ry="6" fill="#8a5a2b"/><path d="M36 30q-4-6 0-12M46 30q-4-6 0-12M56 30q-4-6 0-12" stroke="#c9d6ff" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="45" cy="86" rx="32" ry="5" fill="#c9d6ff"/>`,
    tea: `<path d="M18 44h52v18a16 16 0 0 1-16 16H34a16 16 0 0 1-16-16z" fill="#2fd18b"/><path d="M70 50h4a8 8 0 0 1 0 16h-6" stroke="#2fd18b" stroke-width="6" fill="none"/><ellipse cx="44" cy="44" rx="26" ry="6" fill="#d98a3d"/><path d="M52 44V26" stroke="#8d98c7" stroke-width="2"/><rect x="46" y="16" width="12" height="12" rx="2" fill="#ffc83d"/><ellipse cx="44" cy="84" rx="32" ry="5" fill="#c8f5dd"/>`,
    juice: `<path d="M30 28h40l-5 56a4 4 0 0 1-4 4H39a4 4 0 0 1-4-4z" fill="#ffe0bf"/><path d="M32 40h36l-4 44a4 4 0 0 1-4 3H40a4 4 0 0 1-4-3z" fill="#ff9a3d"/><path d="M56 34 66 8" stroke="#ff6b81" stroke-width="5" stroke-linecap="round"/><circle cx="68" cy="30" r="10" fill="#ffc83d"/><circle cx="68" cy="30" r="6" fill="#ffe08a"/>`,
    fish: `<path d="M14 50c14-22 44-26 62 0-18 26-48 22-62 0z" fill="#3bb7f6"/><path d="M76 50l14-14v28z" fill="#1b86c9"/><circle cx="30" cy="46" r="5" fill="#fff"/><circle cx="31" cy="46" r="2.6" fill="#1b2347"/><path d="M46 38q6 12 0 24M56 38q6 12 0 24" stroke="#8fdcff" stroke-width="3" fill="none"/>`,
    meat: `<path d="M20 44c0-16 22-24 40-20s26 18 22 30-20 22-38 18S20 60 20 44z" fill="#e5525f"/><path d="M28 46c0-10 14-16 28-13s18 12 15 20-14 14-27 11-16-8-16-18z" fill="#ff8a8a"/><circle cx="76" cy="52" r="9" fill="#fff4e0"/><circle cx="76" cy="52" r="4" fill="#e8d3b0"/>`,
    soup: `<path d="M12 46h76a38 34 0 0 1-76 0z" fill="#ff6b81"/><ellipse cx="50" cy="46" rx="38" ry="8" fill="#ffb02e"/><circle cx="38" cy="45" r="3" fill="#2fd18b"/><circle cx="56" cy="47" r="3" fill="#ff5d73"/><circle cx="64" cy="44" r="2.5" fill="#2fd18b"/><path d="M40 30q-4-6 0-12M54 30q-4-6 0-12" stroke="#c9d6ff" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    rice: `<path d="M12 50h76a38 32 0 0 1-76 0z" fill="#3bb7f6"/><path d="M18 50c0-18 64-18 64 0z" fill="#fff"/><circle cx="34" cy="42" r="3" fill="#eef1ff"/><circle cx="50" cy="38" r="3" fill="#eef1ff"/><circle cx="64" cy="42" r="3" fill="#eef1ff"/><path d="M60 30 86 10M66 32 90 16" stroke="#d98a3d" stroke-width="4" stroke-linecap="round"/>`,
    salad: `<path d="M12 52h76a38 30 0 0 1-76 0z" fill="#fff"/><circle cx="34" cy="44" r="12" fill="#2fd18b"/><circle cx="52" cy="40" r="13" fill="#4ee0a3"/><circle cx="68" cy="46" r="11" fill="#13a066"/><circle cx="44" cy="48" r="5" fill="#ff5d73"/><circle cx="62" cy="50" r="4" fill="#ffc83d"/><path d="M12 52h76" stroke="#c9d6ff" stroke-width="3"/>`,
    cat: `<path d="M24 40 20 14l18 14zM76 40l4-26-18 14z" fill="#ff9a3d"/><ellipse cx="50" cy="48" rx="30" ry="26" fill="#ff9a3d"/><ellipse cx="50" cy="84" rx="24" ry="12" fill="#ff9a3d"/><circle cx="39" cy="46" r="5" fill="#1b2347"/><circle cx="61" cy="46" r="5" fill="#1b2347"/><circle cx="40.5" cy="44.5" r="1.6" fill="#fff"/><circle cx="62.5" cy="44.5" r="1.6" fill="#fff"/><path d="M47 56h6l-3 3z" fill="#ff5d73"/><path d="M50 59q-4 4-8 2M50 59q4 4 8 2M28 54h-12M28 58l-11 4M72 54h12M72 58l11 4" stroke="#8a4a10" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M36 30q4 4 0 8M50 26v8M64 30q-4 4 0 8" stroke="#d8701a" stroke-width="3" stroke-linecap="round" fill="none"/>`,
    dog: `<ellipse cx="50" cy="50" rx="26" ry="24" fill="#d9a066"/><path d="M26 34c-10 0-14 20-6 30 6-4 8-16 8-24zM74 34c10 0 14 20 6 30-6-4-8-16-8-24z" fill="#8a5a2b"/><ellipse cx="50" cy="62" rx="14" ry="10" fill="#f3d3b0"/><ellipse cx="50" cy="56" rx="6" ry="4" fill="#1b2347"/><circle cx="40" cy="44" r="4.5" fill="#1b2347"/><circle cx="60" cy="44" r="4.5" fill="#1b2347"/><circle cx="41.4" cy="42.6" r="1.4" fill="#fff"/><circle cx="61.4" cy="42.6" r="1.4" fill="#fff"/><path d="M46 68q4 6 8 0" fill="#ff6b81"/><ellipse cx="50" cy="86" rx="22" ry="8" fill="#d9a066"/>`,
    bird: `<ellipse cx="48" cy="54" rx="28" ry="24" fill="#3bb7f6"/><ellipse cx="44" cy="62" rx="16" ry="12" fill="#8fdcff"/><path d="M42 50q14-10 26 6-12 8-26-6z" fill="#1b86c9"/><circle cx="60" cy="44" r="4" fill="#1b2347"/><path d="M74 46l12 4-12 4z" fill="#ffc83d"/><path d="M40 78v8M52 78v8" stroke="#ff9a3d" stroke-width="3" stroke-linecap="round"/><path d="M22 46l-8-6 2 12z" fill="#1b86c9"/>`,
    sun: `<g stroke="#ffc83d" stroke-width="6" stroke-linecap="round"><path d="M50 8v12M50 80v12M8 50h12M80 50h12M20 20l8 8M72 72l8 8M20 80l8-8M72 28l8-8"/></g><circle cx="50" cy="50" r="22" fill="#ffc83d"/><circle cx="50" cy="50" r="22" fill="#ffe08a" opacity=".5" transform="translate(-4 -4) scale(1.05)"/><circle cx="43" cy="48" r="2.6" fill="#b97a00"/><circle cx="57" cy="48" r="2.6" fill="#b97a00"/><path d="M44 56q6 5 12 0" stroke="#b97a00" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
    house: `<path d="M50 12 10 46h10v40h60V46h10z" fill="#ff9a3d"/><path d="M50 12 6 48l6 6 38-32 38 32 6-6z" fill="#ff6b81"/><rect x="42" y="58" width="16" height="28" rx="2" fill="#8a5a2b"/><rect x="24" y="54" width="12" height="12" rx="2" fill="#8fdcff"/><rect x="64" y="54" width="12" height="12" rx="2" fill="#8fdcff"/><rect x="64" y="20" width="8" height="16" fill="#8a5a2b"/>`,
    book: `<path d="M14 24c12-6 24-6 36 4 12-10 24-10 36-4v56c-12-6-24-6-36 4-12-10-24-10-36-4z" fill="#3bb7f6"/><path d="M18 26c10-4 20-4 30 4v50c-10-8-20-8-30-4z" fill="#fff"/><path d="M52 30c10-8 20-8 30-4v50c-10-4-20-4-30 4z" fill="#eef1ff"/><path d="M24 38h18M24 46h18M24 54h14M58 38h18M58 46h18M58 54h12" stroke="#c9d6ff" stroke-width="3" stroke-linecap="round"/>`,
    ball: `<circle cx="50" cy="50" r="34" fill="#ff6b81"/><path d="M16 50h68" stroke="#fff" stroke-width="7"/><path d="M50 16a50 50 0 0 1 0 68" stroke="#ffc83d" stroke-width="7" fill="none"/><path d="M50 16a50 50 0 0 0 0 68" stroke="#3bb7f6" stroke-width="7" fill="none"/><ellipse cx="36" cy="32" rx="8" ry="5" fill="#fff" opacity=".45" transform="rotate(-30 36 32)"/>`,
    car: `<path d="M10 62v-8c0-6 4-10 10-10l10-14h34l14 14h4c6 0 8 4 8 10v8z" fill="#ff6b81"/><path d="M34 34h12v12H26zM52 34h10l10 12H52z" fill="#8fdcff"/><circle cx="30" cy="66" r="10" fill="#1b2347"/><circle cx="30" cy="66" r="4" fill="#c9d6ff"/><circle cx="74" cy="66" r="10" fill="#1b2347"/><circle cx="74" cy="66" r="4" fill="#c9d6ff"/><rect x="84" y="52" width="6" height="4" rx="2" fill="#ffc83d"/>`,
    flower: `<path d="M50 56v32" stroke="#2fd18b" stroke-width="5" stroke-linecap="round"/><path d="M50 76q14-14 22-6-10 8-22 6z" fill="#2fd18b"/><g fill="#ff7ac8"><circle cx="50" cy="26" r="12"/><circle cx="66" cy="38" r="12"/><circle cx="60" cy="56" r="12"/><circle cx="40" cy="56" r="12"/><circle cx="34" cy="38" r="12"/></g><circle cx="50" cy="42" r="10" fill="#ffc83d"/>`,
    clock3: `<circle cx="50" cy="50" r="38" fill="#fff" stroke="#9b7bff" stroke-width="7"/><path d="M50 50V24M50 50h20" stroke="#1b2347" stroke-width="6" stroke-linecap="round"/><circle cx="50" cy="50" r="4" fill="#ff6b81"/><g fill="#9b7bff"><circle cx="50" cy="18" r="3"/><circle cx="82" cy="50" r="3"/><circle cx="50" cy="82" r="3"/><circle cx="18" cy="50" r="3"/></g>`,
    cloud: `<path d="M26 74a18 18 0 0 1 2-35.8A24 24 0 0 1 74 42a16 16 0 0 1 2 32z" fill="#eef2ff" stroke="#c9d3f5" stroke-width="3"/><ellipse cx="40" cy="48" rx="10" ry="5" fill="#fff"/>`,
    rain: `<path d="M26 58a16 16 0 0 1 2-31.8A22 22 0 0 1 72 30a14 14 0 0 1 2 28z" fill="#a9b6d8"/><path d="M32 66l-5 12M50 66l-5 12M68 66l-5 12M41 78l-4 9M59 78l-4 9" stroke="#5b8cff" stroke-width="5" stroke-linecap="round"/>`,
    snow: `<g stroke="#5bb8ff" stroke-width="5" stroke-linecap="round"><path d="M50 12v76M17 31l66 38M17 69l66-38"/></g><g stroke="#5bb8ff" stroke-width="4" stroke-linecap="round" fill="none"><path d="M41 18l9 8 9-8M41 82l9-8 9 8M18 42l12-2-4-12M82 58l-12 2 4 12M18 58l12 2-4 12M82 42l-12-2 4-12"/></g><circle cx="50" cy="50" r="7" fill="#dff1ff"/>`,
    umbrella: `<path d="M50 50v32a7 7 0 0 1-14 0" stroke="#8a5a2b" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M8 50a42 34 0 0 1 84 0c-5-5-9-5-14 0-5-5-9-5-14 0-5-5-9-5-14 0-5-5-9-5-14 0-5-5-9-5-14 0-5-5-9-5-14 0z" fill="#ff6b4a"/><path d="M50 16c-12 8-14 22-14 34M50 16c12 8 14 22 14 34" stroke="#d94a2a" stroke-width="3" fill="none"/><path d="M50 10v6" stroke="#8a5a2b" stroke-width="4" stroke-linecap="round"/>`,
    tree: `<rect x="44" y="58" width="12" height="30" rx="4" fill="#a9703a"/><circle cx="50" cy="40" r="26" fill="#2ec4a6"/><circle cx="34" cy="50" r="16" fill="#1fae92"/><circle cx="66" cy="50" r="16" fill="#1fae92"/><circle cx="42" cy="30" r="8" fill="#7ff0d6" opacity=".7"/>`,
    eye: `<path d="M8 50c12-20 28-28 42-28s30 8 42 28c-12 20-28 28-42 28S20 70 8 50z" fill="#fff" stroke="#c9d3f5" stroke-width="3"/><circle cx="50" cy="50" r="18" fill="#5b8cff"/><circle cx="50" cy="50" r="9" fill="#1a1d2e"/><circle cx="55" cy="44" r="4" fill="#fff"/>`,
    hand: `<path d="M34 88c-10-6-16-18-16-30V40a5 5 0 0 1 10 0v12V20a5 5 0 0 1 10 0v28V14a5 5 0 0 1 10 0v34V18a5 5 0 0 1 10 0v34l6-10a5 5 0 0 1 9 5L72 70c-4 10-10 18-20 18z" fill="#f5c69a" stroke="#d99a6a" stroke-width="2.5" stroke-linejoin="round"/>`,
    shirt: `<path d="M34 12 12 24l8 16 8-4v50h44V36l8 4 8-16-22-12c-2 8-8 12-16 12s-14-4-16-12z" fill="#5b8cff"/><path d="M34 12c2 8 8 12 16 12s14-4 16-12" stroke="#3a62d6" stroke-width="4" fill="none"/><circle cx="50" cy="40" r="2.5" fill="#fff"/><circle cx="50" cy="52" r="2.5" fill="#fff"/><circle cx="50" cy="64" r="2.5" fill="#fff"/>`,
    dress: `<path d="M38 10h24l-4 18 26 58H16l26-58z" fill="#ff7ac8"/><path d="M38 10h24l-4 18H42z" fill="#e957ad"/><path d="M42 28h16" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="34" cy="70" r="3" fill="#fff"/><circle cx="52" cy="62" r="3" fill="#fff"/><circle cx="66" cy="74" r="3" fill="#fff"/>`,
    shoes: `<path d="M8 66c0-6 4-10 10-10h10l8-14 10 4 6 8 16 4c8 2 12 6 12 12v4H8z" fill="#ff6b4a"/><path d="M8 70h80v6a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3z" fill="#fff"/><path d="M38 48l-4 8M44 50l-4 8M50 52l-4 8" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`,
    hat: `<ellipse cx="50" cy="66" rx="40" ry="10" fill="#8a5a2b"/><path d="M26 64c0-24 8-38 24-38s24 14 24 38z" fill="#a9703a"/><path d="M26 56h48v8H26z" fill="#ff6b4a"/>`,
    bed: `<rect x="10" y="50" width="80" height="20" rx="5" fill="#5b8cff"/><rect x="10" y="30" width="10" height="50" rx="4" fill="#a9703a"/><rect x="80" y="44" width="10" height="36" rx="4" fill="#a9703a"/><rect x="22" y="40" width="22" height="12" rx="5" fill="#fff"/><path d="M44 50h36v12H44z" fill="#8fb0ff"/>`,
    chair: `<rect x="28" y="12" width="44" height="40" rx="8" fill="#ff9a3d"/><rect x="24" y="50" width="52" height="10" rx="4" fill="#d8701a"/><path d="M30 60v28M70 60v28" stroke="#a9703a" stroke-width="6" stroke-linecap="round"/><rect x="36" y="20" width="28" height="6" rx="3" fill="#ffb877"/>`,
    lamp: `<path d="M30 46 38 12h24l8 34z" fill="#ffb547"/><path d="M50 46v34" stroke="#8b90b0" stroke-width="5"/><rect x="32" y="80" width="36" height="8" rx="4" fill="#8b90b0"/><ellipse cx="50" cy="46" rx="20" ry="4" fill="#ffe08a"/><path d="M44 18h10" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>`,
    teacher: person({ y: 40, skin: "#f5c69a", hair: "#5a3a22", style: "bun", shirt: "#8f7bff", glasses: true }) + `<rect x="66" y="58" width="26" height="18" rx="2" fill="#2e7d5b"/><path d="M70 64h10M70 69h16" stroke="#fff" stroke-width="2"/>`,
    doctor: person({ y: 40, skin: "#f5c69a", hair: "#3a2a1a", style: "short", shirt: "#ffffff" }) + `<path d="M40 70q10 14 20 0" stroke="#5b8cff" stroke-width="3" fill="none"/><circle cx="60" cy="70" r="4" fill="#5b8cff"/><rect x="45" y="80" width="10" height="10" rx="2" fill="#ff4d6d"/><path d="M50 82v6M47 85h6" stroke="#fff" stroke-width="2"/>`,
    student: person({ y: 40, skin: "#f8d2b0", hair: "#ffb02e", style: "long", shirt: "#2ec4a6" }) + `<path d="M30 14 50 6l20 8-20 8z" fill="#1a1d2e"/><path d="M68 15v10" stroke="#ffb547" stroke-width="2"/>`,
    nurse: person({ y: 40, skin: "#f8d2b0", hair: "#8a3d22", style: "bun", shirt: "#8fdcff" }) + `<rect x="38" y="14" width="24" height="10" rx="3" fill="#fff"/><path d="M50 15v8M46 19h8" stroke="#ff4d6d" stroke-width="2.5"/>`,
    driver: `<circle cx="50" cy="52" r="34" fill="none" stroke="#3a4060" stroke-width="9"/><circle cx="50" cy="52" r="9" fill="#3a4060"/><path d="M50 61v24M41 52H18M59 52h23" stroke="#3a4060" stroke-width="7"/><circle cx="50" cy="52" r="34" fill="none" stroke="#5b6390" stroke-width="3"/>`,
    cook: `<path d="M28 50c-10 0-14-12-6-18 0-12 14-16 20-8 6-10 22-6 22 6 10-2 16 10 8 18H28z" fill="#fff" stroke="#d3daf8" stroke-width="2"/><rect x="30" y="50" width="40" height="22" rx="3" fill="#fff" stroke="#d3daf8" stroke-width="2"/><path d="M40 56v12M50 56v12M60 56v12" stroke="#e3e7fb" stroke-width="2"/>`,
    engineer: `<path d="M18 62c0-22 14-36 32-36s32 14 32 36z" fill="#ffc94d"/><rect x="12" y="60" width="76" height="10" rx="5" fill="#e39b16"/><rect x="44" y="20" width="12" height="18" rx="4" fill="#ffd970"/><path d="M30 46q20-10 40 0" stroke="#fff" stroke-width="3" fill="none" opacity=".6"/>`,
    artist: `<path d="M50 14C28 14 12 28 12 46c0 16 12 28 28 28 6 0 7-4 6-8s2-8 7-8h9c12 0 24-6 24-18C86 24 70 14 50 14z" fill="#f2d4a8" stroke="#c9a06a" stroke-width="3"/><circle cx="32" cy="38" r="6" fill="#ff4d6d"/><circle cx="46" cy="27" r="6" fill="#ffc94d"/><circle cx="64" cy="30" r="6" fill="#2ec4a6"/><circle cx="30" cy="54" r="6" fill="#5b8cff"/><path d="M62 92l20-34 5 3-18 33z" fill="#8a5a2b"/>`,
    school: `<path d="M50 10 12 30h76z" fill="#ff6b4a"/><rect x="18" y="30" width="64" height="56" fill="#ffd9a8"/><rect x="42" y="60" width="16" height="26" fill="#8a5a2b"/><rect x="24" y="40" width="12" height="12" rx="2" fill="#8fdcff"/><rect x="64" y="40" width="12" height="12" rx="2" fill="#8fdcff"/><circle cx="50" cy="44" r="7" fill="#fff" stroke="#8a5a2b" stroke-width="2"/><path d="M50 40v4l3 2" stroke="#1a1d2e" stroke-width="1.6" fill="none"/>`,
    door: `<rect x="26" y="8" width="48" height="84" rx="4" fill="#a9703a"/><rect x="32" y="16" width="36" height="30" rx="3" fill="#c48a52"/><rect x="32" y="52" width="36" height="32" rx="3" fill="#c48a52"/><circle cx="64" cy="52" r="4" fill="#ffc94d"/>`,
    window: `<rect x="14" y="14" width="72" height="72" rx="6" fill="#fff" stroke="#c9d3f5" stroke-width="4"/><rect x="20" y="20" width="60" height="60" fill="#8fdcff"/><path d="M50 20v60M20 50h60" stroke="#fff" stroke-width="5"/><path d="M26 30l12-6" stroke="#fff" stroke-width="3" opacity=".7"/>`,
    table: `<rect x="10" y="36" width="80" height="10" rx="3" fill="#a9703a"/><path d="M18 46v40M82 46v40" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/><rect x="34" y="24" width="10" height="12" rx="2" fill="#5b8cff"/><circle cx="62" cy="30" r="6" fill="#ff6b4a"/>`,
    sofa: `<rect x="16" y="30" width="68" height="30" rx="10" fill="#8f7bff"/><rect x="8" y="44" width="84" height="26" rx="10" fill="#7a63f0"/><rect x="24" y="48" width="24" height="12" rx="4" fill="#a99aff"/><rect x="52" y="48" width="24" height="12" rx="4" fill="#a99aff"/><path d="M16 70v10M84 70v10" stroke="#5a48c8" stroke-width="5" stroke-linecap="round"/>`,
    kitchen: `<rect x="16" y="30" width="68" height="58" rx="4" fill="#e3e7fb"/><rect x="24" y="52" width="52" height="28" rx="3" fill="#3a4060"/><rect x="28" y="56" width="44" height="6" rx="2" fill="#5b6390"/><circle cx="32" cy="40" r="5" fill="#3a4060"/><circle cx="50" cy="40" r="5" fill="#3a4060"/><circle cx="68" cy="40" r="5" fill="#3a4060"/><path d="M36 22q4-8 0-14M50 22q4-8 0-14" stroke="#c9d3f5" stroke-width="3" fill="none"/>`,
    bathroom: `<path d="M10 46h80v10a22 22 0 0 1-22 22H32a22 22 0 0 1-22-22z" fill="#fff" stroke="#c9d3f5" stroke-width="3"/><path d="M14 46h72" stroke="#8fdcff" stroke-width="6"/><path d="M22 46V20a8 8 0 0 1 16 0" stroke="#9aa1b5" stroke-width="4" fill="none"/><circle cx="56" cy="36" r="5" fill="#bfe8ff"/><circle cx="66" cy="30" r="3.5" fill="#bfe8ff"/><path d="M28 78l-4 10M72 78l4 10" stroke="#9aa1b5" stroke-width="4" stroke-linecap="round"/>`,
    jacket: `<path d="M34 10 14 22l-4 44 12 2v24h56V68l12-2-4-44-20-12-16 10z" fill="#ff6b4a"/><path d="M50 20v72" stroke="#d94a2a" stroke-width="3"/><path d="M34 10l16 10 16-10" stroke="#d94a2a" stroke-width="4" fill="none"/><rect x="28" y="56" width="12" height="8" rx="2" fill="#d94a2a"/><rect x="60" y="56" width="12" height="8" rx="2" fill="#d94a2a"/>`,
    jeans: `<path d="M24 10h52l4 80H58l-8-50-8 50H20z" fill="#3a62d6"/><rect x="24" y="10" width="52" height="8" fill="#2f50b8"/><path d="M50 18v20" stroke="#ffc94d" stroke-width="2" stroke-dasharray="3 3"/><path d="M30 24q8 6 14 0" stroke="#ffc94d" stroke-width="2" fill="none"/>`,
    map: `<path d="M10 22 36 12l28 10 26-10v66L64 88 36 78 10 88z" fill="#fff4d6"/><path d="M36 12v66M64 22v66" stroke="#e8cf96" stroke-width="2"/><path d="M18 60q14-20 24-6t22-18" stroke="#ff6b4a" stroke-width="3" fill="none" stroke-dasharray="5 4"/><path d="M70 30c0 8-6 12-6 12s-6-4-6-12a6 6 0 0 1 12 0z" fill="#ff4d6d"/>`,
    ticket: `<path d="M10 30h80v12a8 8 0 0 0 0 16v12H10V58a8 8 0 0 0 0-16z" fill="#ffc94d"/><path d="M64 30v40" stroke="#e39b16" stroke-width="2" stroke-dasharray="4 3"/><path d="M20 42h34M20 52h24" stroke="#8a5300" stroke-width="3" stroke-linecap="round"/><path d="M76 44l2 4 4 .5-3 3 .7 4-3.7-2-3.7 2 .7-4-3-3 4-.5z" fill="#e39b16"/>`,
    passport: `<rect x="24" y="10" width="52" height="80" rx="6" fill="#283f99"/><circle cx="50" cy="42" r="14" fill="none" stroke="#ffc94d" stroke-width="3"/><path d="M36 42h28M50 28c-6 8-6 20 0 28M50 28c6 8 6 20 0 28" stroke="#ffc94d" stroke-width="2" fill="none"/><path d="M36 70h28M40 77h20" stroke="#ffc94d" stroke-width="3" stroke-linecap="round"/>`,
    airport: `<path d="M14 54 86 30c6-2 8 4 2 6L60 48l-6 26-8 2 2-22-18 6-4 10-6 2 2-14-12 2z" fill="#5b8cff"/><path d="M60 48 86 36" stroke="#3a62d6" stroke-width="2"/>`,
    luggage: `<rect x="22" y="28" width="56" height="58" rx="8" fill="#ff6b4a"/><path d="M38 28v-8a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v8" stroke="#8a5a2b" stroke-width="5" fill="none"/><path d="M38 34v46M62 34v46" stroke="#d94a2a" stroke-width="4"/><circle cx="32" cy="90" r="4" fill="#3a4060"/><circle cx="68" cy="90" r="4" fill="#3a4060"/>`,
    key: `<circle cx="32" cy="50" r="18" fill="none" stroke="#ffc94d" stroke-width="9"/><path d="M50 50h40M78 50v12M88 50v8" stroke="#ffc94d" stroke-width="9" stroke-linecap="round"/><circle cx="32" cy="50" r="18" fill="none" stroke="#e39b16" stroke-width="2"/>`,
    hotel: `<rect x="20" y="16" width="60" height="74" rx="4" fill="#8f7bff"/><rect x="28" y="6" width="44" height="14" rx="3" fill="#ff6b4a"/><text x="50" y="17" text-anchor="middle" font-family="Unbounded,Manrope,sans-serif" font-weight="700" font-size="9" fill="#fff">HOTEL</text><g fill="#ffe08a"><rect x="28" y="26" width="10" height="10" rx="2"/><rect x="45" y="26" width="10" height="10" rx="2"/><rect x="62" y="26" width="10" height="10" rx="2"/><rect x="28" y="44" width="10" height="10" rx="2"/><rect x="45" y="44" width="10" height="10" rx="2"/><rect x="62" y="44" width="10" height="10" rx="2"/></g><rect x="42" y="68" width="16" height="22" fill="#5a48c8"/>`,
    bridge: `<path d="M6 60h88" stroke="#a9703a" stroke-width="8"/><path d="M10 60q40-46 80 0" stroke="#ff6b4a" stroke-width="6" fill="none"/><path d="M26 60V40M40 60V28M50 60V26M60 60V28M74 60V40" stroke="#ff6b4a" stroke-width="3"/><path d="M6 76q11-6 22 0t22 0 22 0 22 0" stroke="#5b8cff" stroke-width="4" fill="none"/>`,
    museum: `<path d="M50 8 10 30h80z" fill="#c9d3f5"/><rect x="12" y="30" width="76" height="8" fill="#e3e7fb"/><g fill="#fff" stroke="#c9d3f5" stroke-width="2"><rect x="18" y="40" width="10" height="38"/><rect x="36" y="40" width="10" height="38"/><rect x="54" y="40" width="10" height="38"/><rect x="72" y="40" width="10" height="38"/></g><rect x="8" y="78" width="84" height="10" fill="#c9d3f5"/>`,
    menu: `<rect x="24" y="8" width="52" height="84" rx="6" fill="#fff" stroke="#d3daf8" stroke-width="3"/><text x="50" y="26" text-anchor="middle" font-family="Unbounded,Manrope,sans-serif" font-weight="700" font-size="10" fill="#ff6b4a">MENU</text><path d="M32 38h36M32 48h28M32 58h36M32 68h22M32 78h30" stroke="#c9d3f5" stroke-width="4" stroke-linecap="round"/>`,
    bill: `<path d="M26 8h48v84l-8-6-8 6-8-6-8 6-8-6-8 6z" fill="#fff" stroke="#d3daf8" stroke-width="3"/><path d="M34 24h32M34 34h24M34 44h28" stroke="#c9d3f5" stroke-width="4" stroke-linecap="round"/><path d="M34 62h32" stroke="#3a4060" stroke-width="2"/><text x="66" y="76" text-anchor="end" font-family="Unbounded,Manrope,sans-serif" font-weight="700" font-size="12" fill="#3a4060">$24</text>`,
    money: `<rect x="8" y="26" width="84" height="48" rx="6" fill="#2ec4a6"/><rect x="14" y="32" width="72" height="36" rx="4" fill="none" stroke="#bff2e6" stroke-width="2"/><circle cx="50" cy="50" r="12" fill="#bff2e6"/><text x="50" y="56" text-anchor="middle" font-family="Unbounded,Manrope,sans-serif" font-weight="700" font-size="16" fill="#16917a">$</text>`,
    price: `<path d="M50 10h34v34L44 84 10 50z" fill="#ffc94d"/><circle cx="72" cy="22" r="5" fill="#fff"/><text x="44" y="58" text-anchor="middle" font-family="Unbounded,Manrope,sans-serif" font-weight="700" font-size="16" fill="#8a5300" transform="rotate(-45 44 54)">$9</text>`,
    photo: `<rect x="10" y="28" width="80" height="56" rx="10" fill="#3a4060"/><rect x="34" y="18" width="28" height="14" rx="4" fill="#3a4060"/><circle cx="50" cy="56" r="18" fill="#5b8cff"/><circle cx="50" cy="56" r="11" fill="#1a1d2e"/><circle cx="46" cy="52" r="3" fill="#fff"/><rect x="72" y="36" width="10" height="6" rx="2" fill="#ffc94d"/>`,
    music: `<path d="M38 70V22l40-10v48" stroke="#8f7bff" stroke-width="7" fill="none" stroke-linejoin="round"/><ellipse cx="30" cy="72" rx="12" ry="9" fill="#8f7bff"/><ellipse cx="70" cy="62" rx="12" ry="9" fill="#8f7bff"/><path d="M38 34l40-10" stroke="#8f7bff" stroke-width="7"/>`,
    medicine: `<rect x="12" y="36" width="76" height="28" rx="14" fill="#ff6b4a" transform="rotate(-30 50 50)"/><path d="M50 36v28" stroke="#fff" stroke-width="3" transform="rotate(-30 50 50)"/><rect x="50" y="36" width="38" height="28" rx="14" fill="#fff" transform="rotate(-30 50 50)" opacity=".85"/>`,
    hospital: `<rect x="16" y="26" width="68" height="64" rx="4" fill="#fff" stroke="#d3daf8" stroke-width="3"/><rect x="38" y="10" width="24" height="24" rx="4" fill="#ff4d6d"/><path d="M50 15v14M43 22h14" stroke="#fff" stroke-width="4"/><g fill="#8fdcff"><rect x="24" y="42" width="12" height="10"/><rect x="64" y="42" width="12" height="10"/><rect x="24" y="60" width="12" height="10"/><rect x="64" y="60" width="12" height="10"/></g><rect x="42" y="66" width="16" height="24" fill="#5b8cff"/>`,
    ear: `<path d="M60 14c-20-4-36 10-36 30 0 12 8 18 8 30 0 10 8 16 16 14 8-2 10-10 10-16 0-8 10-12 14-22 6-16-2-34-12-36z" fill="#f5c69a" stroke="#d99a6a" stroke-width="3"/><path d="M58 30c-10-4-20 4-18 14 1 6 8 6 8 14" stroke="#d99a6a" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    mouth: `<path d="M12 50q38-26 76 0-38 34-76 0z" fill="#ff6b81"/><path d="M12 50q38 8 76 0" stroke="#c93c57" stroke-width="3" fill="none"/><path d="M30 46q20 6 40 0" stroke="#fff" stroke-width="3" opacity=".5" fill="none"/>`,
    wind: `<path d="M10 36h52a10 10 0 1 0-10-10" stroke="#8fb0ff" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M10 54h70a10 10 0 1 1-10 10" stroke="#5b8cff" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M10 72h34" stroke="#8fb0ff" stroke-width="6" stroke-linecap="round"/>`,
    sea: `<rect x="6" y="40" width="88" height="52" rx="6" fill="#3bb7f6"/><path d="M6 48q11-10 22 0t22 0 22 0 22 0" stroke="#bfe8ff" stroke-width="5" fill="none"/><path d="M6 66q11-10 22 0t22 0 22 0 22 0" stroke="#8fdcff" stroke-width="4" fill="none"/><circle cx="74" cy="22" r="10" fill="#ffc94d"/>`,
    spring: `<path d="M50 88V48" stroke="#2ec4a6" stroke-width="5" stroke-linecap="round"/><path d="M50 60c-18 0-26-14-26-24 14 0 26 8 26 24zM50 52c14 0 22-12 22-22-12 0-22 8-22 22z" fill="#2ec4a6"/><ellipse cx="50" cy="88" rx="24" ry="5" fill="#a9703a"/>`,
    summer: `<path d="M8 80q42-20 84 0v12H8z" fill="#ffd970"/><path d="M50 30v52" stroke="#8a5a2b" stroke-width="4"/><path d="M14 34q36-30 72 0z" fill="#ff6b4a"/><path d="M14 34q8-8 18 0 9-8 18 0 9-8 18 0 9-8 18 0" fill="#fff" opacity=".35"/><circle cx="82" cy="14" r="8" fill="#ffc94d"/>`,
    autumn: `<path d="M50 8c4 12 18 10 22 20-6 2-6 8-2 12-8 2-10 10-6 16-8-2-12 4-14 10-2-6-6-12-14-10 4-6 2-14-6-16 4-4 4-10-2-12 4-10 18-8 22-20z" fill="#ff9a3d"/><path d="M50 20v72" stroke="#a9703a" stroke-width="4" stroke-linecap="round"/><path d="M50 40l-12-8M50 52l12-8M50 62l-10-6" stroke="#d8701a" stroke-width="2.5"/>`,
    winter: `<circle cx="50" cy="68" r="22" fill="#fff" stroke="#c9d3f5" stroke-width="3"/><circle cx="50" cy="34" r="15" fill="#fff" stroke="#c9d3f5" stroke-width="3"/><circle cx="45" cy="31" r="2" fill="#1a1d2e"/><circle cx="55" cy="31" r="2" fill="#1a1d2e"/><path d="M50 35l10 3-10 2z" fill="#ff9a3d"/><path d="M36 46q14 8 28 0" stroke="#ff4d6d" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="50" cy="62" r="2.5" fill="#1a1d2e"/><circle cx="50" cy="72" r="2.5" fill="#1a1d2e"/>`,
    sugar: `<g stroke="#d3daf8" stroke-width="2"><rect x="16" y="46" width="26" height="26" rx="4" fill="#fff"/><rect x="44" y="46" width="26" height="26" rx="4" fill="#fff"/><rect x="30" y="22" width="26" height="26" rx="4" fill="#fff"/></g><circle cx="78" cy="72" r="3" fill="#fff" stroke="#d3daf8"/>`,
    dessert: `<path d="M34 50 50 92 66 50z" fill="#e8a25a"/><path d="M38 58l20 6M42 70l14 4" stroke="#c97b33" stroke-width="2"/><circle cx="50" cy="40" r="16" fill="#ff8cc6"/><circle cx="40" cy="48" r="10" fill="#fff4e0"/><circle cx="60" cy="48" r="10" fill="#8a5a2b"/><circle cx="50" cy="22" r="5" fill="#ff4d6d"/>`,
    breakfast: `<ellipse cx="50" cy="60" rx="40" ry="26" fill="#fff" stroke="#d3daf8" stroke-width="3"/><ellipse cx="40" cy="58" rx="16" ry="12" fill="#fff4e0"/><circle cx="40" cy="58" r="7" fill="#ffc94d"/><rect x="58" y="48" width="18" height="10" rx="5" fill="#c97b33"/><rect x="58" y="62" width="18" height="10" rx="5" fill="#c97b33"/>`,
    party: `<path d="M30 70v20M70 66v24" stroke="#9aa1b5" stroke-width="2"/><ellipse cx="30" cy="40" rx="16" ry="20" fill="#ff6b4a"/><ellipse cx="70" cy="36" rx="16" ry="20" fill="#5b8cff"/><ellipse cx="50" cy="28" rx="14" ry="18" fill="#ffc94d"/><path d="M50 46v44" stroke="#9aa1b5" stroke-width="2"/><ellipse cx="24" cy="32" rx="4" ry="7" fill="#fff" opacity=".4"/>`,
    birthday: `<rect x="16" y="40" width="68" height="50" rx="4" fill="#8f7bff"/><rect x="12" y="30" width="76" height="14" rx="3" fill="#a99aff"/><path d="M50 30v60" stroke="#ffc94d" stroke-width="8"/><path d="M50 30c-10-16-26-10-18 0M50 30c10-16 26-10 18 0" stroke="#ffc94d" stroke-width="5" fill="none"/>`,
    glass: `<path d="M30 10h40c0 26-8 40-20 40S30 36 30 10z" fill="#e3f4ff" stroke="#9fd6f7" stroke-width="3"/><path d="M32 26h36c-2 14-8 22-18 22s-16-8-18-22z" fill="#c93c57"/><path d="M50 50v30M34 88h32" stroke="#9fd6f7" stroke-width="4" stroke-linecap="round"/>`,
    package: `<path d="M50 10 88 28v44L50 90 12 72V28z" fill="#e8a25a"/><path d="M12 28l38 18 38-18M50 46v44" stroke="#c97b33" stroke-width="3" fill="none"/><path d="M31 19l38 18v14" stroke="#fff4e0" stroke-width="6" fill="none"/>`,
    email: `<rect x="10" y="24" width="80" height="54" rx="6" fill="#fff" stroke="#d3daf8" stroke-width="3"/><path d="M12 28l38 28 38-28" stroke="#5b8cff" stroke-width="4" fill="none"/><circle cx="82" cy="24" r="10" fill="#ff4d6d"/><text x="82" y="28" text-anchor="middle" font-family="Unbounded,Manrope,sans-serif" font-weight="700" font-size="11" fill="#fff">1</text>`,
    report: `<rect x="20" y="8" width="60" height="84" rx="6" fill="#fff" stroke="#d3daf8" stroke-width="3"/><rect x="30" y="56" width="8" height="24" fill="#5b8cff"/><rect x="44" y="44" width="8" height="36" fill="#2ec4a6"/><rect x="58" y="34" width="8" height="46" fill="#ff6b4a"/><path d="M30 20h40M30 28h28" stroke="#c9d3f5" stroke-width="4" stroke-linecap="round"/>`,
    schedule: `<rect x="12" y="18" width="76" height="70" rx="8" fill="#fff" stroke="#d3daf8" stroke-width="3"/><rect x="12" y="18" width="76" height="18" rx="8" fill="#ff6b4a"/><path d="M30 10v16M70 10v16" stroke="#3a4060" stroke-width="5" stroke-linecap="round"/><g fill="#c9d3f5"><rect x="22" y="44" width="12" height="10" rx="2"/><rect x="44" y="44" width="12" height="10" rx="2"/><rect x="66" y="44" width="12" height="10" rx="2"/><rect x="22" y="62" width="12" height="10" rx="2"/><rect x="66" y="62" width="12" height="10" rx="2"/></g><rect x="44" y="62" width="12" height="10" rx="2" fill="#2ec4a6"/>`,
    village: `<path d="M22 44 8 56h6v28h24V56h6z" fill="#ff9a3d"/><path d="M60 36 42 52h6v32h30V52h6z" fill="#ff6b81"/><rect x="58" y="66" width="10" height="18" fill="#8a5a2b"/><rect x="20" y="66" width="8" height="18" fill="#8a5a2b"/><path d="M4 88h92" stroke="#2ec4a6" stroke-width="6" stroke-linecap="round"/><circle cx="84" cy="22" r="8" fill="#ffc94d"/>`,
    world: `<circle cx="50" cy="50" r="38" fill="#3bb7f6"/><path d="M30 26c10 4 6 14 14 16s4 14-4 18-14 10-12 20c-10-8-16-20-14-34 2-8 8-16 16-20zM62 18c10 4 22 16 24 30-8-2-14 4-18 10-4-10-14-8-14-18s8-16 8-22z" fill="#2ec4a6"/><circle cx="50" cy="50" r="38" fill="none" stroke="#1b86c9" stroke-width="3"/>`,
    sing: `<circle cx="62" cy="30" r="18" fill="#9aa1b5"/><path d="M50 34c4 8 12 14 22 10" stroke="#fff" stroke-width="2" opacity=".5" fill="none"/><path d="M48 42 18 80a6 6 0 0 0 8 8l38-30" fill="#3a4060"/><path d="M84 60q6 6 0 12M90 54q12 12 0 24" stroke="#ff6b4a" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    draw: `<path d="M20 80 70 30l12 12-50 50H20z" fill="#ffc94d"/><path d="M70 30l8-8a6 6 0 0 1 8 0l4 4a6 6 0 0 1 0 8l-8 8z" fill="#ff8cc6"/><path d="M20 80v12h12z" fill="#f2d4a8"/><path d="M20 88v4h4z" fill="#1a1d2e"/><path d="M10 92q20-8 30 0" stroke="#5b8cff" stroke-width="3" fill="none"/>`,
    homework: `<rect x="18" y="12" width="56" height="76" rx="6" fill="#5b8cff"/><rect x="24" y="12" width="50" height="76" rx="4" fill="#fff"/><path d="M32 30h34M32 42h34M32 54h24" stroke="#c9d3f5" stroke-width="3" stroke-linecap="round"/><path d="M62 88 88 40l6 4-24 48z" fill="#ffc94d"/><path d="M62 88l-2 8 8-4z" fill="#3a4060"/>`,
    love: `<path d="M50 86S10 62 10 36a20 20 0 0 1 40-8 20 20 0 0 1 40 8c0 26-40 50-40 50z" fill="#ff4d6d"/><ellipse cx="30" cy="32" rx="6" ry="4" fill="#fff" opacity=".5" transform="rotate(-30 30 32)"/>`,
    call: `<rect x="28" y="6" width="44" height="88" rx="10" fill="#3a4060"/><rect x="32" y="16" width="36" height="64" rx="4" fill="#5b8cff"/><circle cx="50" cy="86" r="3" fill="#9aa1b5"/><path d="M42 40c0 10 8 18 18 18l3-6-6-4-3 3c-3-1-6-4-7-7l3-3-4-6z" fill="#fff"/>`,
    device: `<rect x="24" y="6" width="52" height="88" rx="10" fill="#1a1d2e"/><rect x="28" y="14" width="44" height="70" rx="4" fill="#8f7bff"/><g fill="#fff" opacity=".85"><rect x="33" y="20" width="10" height="10" rx="3"/><rect x="45" y="20" width="10" height="10" rx="3"/><rect x="57" y="20" width="10" height="10" rx="3"/><rect x="33" y="34" width="10" height="10" rx="3"/><rect x="45" y="34" width="10" height="10" rx="3"/></g><rect x="42" y="88" width="16" height="3" rx="1.5" fill="#5b6390"/>`,
    privacy: `<rect x="22" y="44" width="56" height="44" rx="8" fill="#ffc94d"/><path d="M34 44V32a16 16 0 0 1 32 0v12" stroke="#9aa1b5" stroke-width="8" fill="none"/><circle cx="50" cy="62" r="6" fill="#8a5300"/><path d="M50 66v10" stroke="#8a5300" stroke-width="4" stroke-linecap="round"/>`,
    recycle: `<g fill="none" stroke="#2ec4a6" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><path d="M40 20 30 36"/><path d="M62 22l10 16"/><path d="M78 56 70 72H54"/><path d="M36 74H24l-8-14"/></g><path d="M48 12l14 10-16 4zM82 46l-4 18-12-10zM22 86l-6-16 16 2z" fill="#2ec4a6"/>`,
    pollution: `<rect x="12" y="50" width="76" height="40" fill="#9aa1b5"/><rect x="20" y="24" width="12" height="30" fill="#7a8199"/><rect x="40" y="32" width="12" height="22" fill="#7a8199"/><g fill="#c9cfdf"><circle cx="26" cy="16" r="8"/><circle cx="36" cy="10" r="6"/><circle cx="48" cy="22" r="7"/><circle cx="58" cy="16" r="6"/></g><g fill="#ffe08a"><rect x="20" y="62" width="10" height="8"/><rect x="38" y="62" width="10" height="8"/><rect x="56" y="62" width="10" height="8"/></g>`,
    environment: `<circle cx="50" cy="50" r="36" fill="#3bb7f6"/><path d="M36 24c8 4 4 12 10 14s4 10-2 14-10 8-8 16c-8-6-14-16-12-28 2-6 6-12 12-16z" fill="#2ec4a6"/><path d="M60 92c0-24 10-40 30-48-2 24-12 40-30 48z" fill="#2ec4a6"/><path d="M60 92c8-14 16-26 30-48" stroke="#16917a" stroke-width="2" fill="none"/>`,
    evidence: `<circle cx="42" cy="42" r="26" fill="#e3f4ff" stroke="#3a4060" stroke-width="8"/><path d="M62 62l26 26" stroke="#3a4060" stroke-width="12" stroke-linecap="round"/><ellipse cx="34" cy="34" rx="8" ry="5" fill="#fff" transform="rotate(-30 34 34)"/>`,
    company: `<rect x="18" y="10" width="44" height="80" rx="3" fill="#5b8cff"/><rect x="62" y="36" width="24" height="54" rx="3" fill="#3a62d6"/><g fill="#bfe8ff"><rect x="26" y="20" width="10" height="8"/><rect x="44" y="20" width="10" height="8"/><rect x="26" y="36" width="10" height="8"/><rect x="44" y="36" width="10" height="8"/><rect x="26" y="52" width="10" height="8"/><rect x="44" y="52" width="10" height="8"/><rect x="68" y="46" width="12" height="6"/><rect x="68" y="60" width="12" height="6"/></g><rect x="34" y="72" width="12" height="18" fill="#283f99"/>`,
    salary: `<rect x="14" y="40" width="64" height="40" rx="5" fill="#2ec4a6" transform="rotate(-10 46 60)"/><rect x="22" y="34" width="64" height="40" rx="5" fill="#16917a"/><circle cx="54" cy="54" r="10" fill="#bff2e6"/><text x="54" y="59" text-anchor="middle" font-family="Unbounded,Manrope,sans-serif" font-weight="700" font-size="13" fill="#16917a">$</text>`,
    deadline: `<path d="M24 10h52M24 90h52" stroke="#3a4060" stroke-width="6" stroke-linecap="round"/><path d="M28 12c0 20 18 26 18 38S28 68 28 88h44c0-20-18-26-18-38s18-18 18-38z" fill="#fff" stroke="#c9d3f5" stroke-width="3"/><path d="M36 82c4-10 10-12 14-18 4 6 10 8 14 18z" fill="#ff6b4a"/><path d="M38 24h24c-4 6-10 8-12 12-2-4-8-6-12-12z" fill="#ff6b4a"/>`,
    boy: person({ y: 40, skin: "#f5c69a", hair: "#5a3a22", style: "short", shirt: "#3bb7f6" }),
    girl: person({ y: 40, skin: "#f8d2b0", hair: "#ffb02e", style: "long", shirt: "#ff7ac8", bow: true }),
    man: person({ y: 40, skin: "#d9a066", hair: "#2b1d12", style: "short", shirt: "#2fd18b", beard: true }),
    woman: person({ y: 40, skin: "#f5c69a", hair: "#8a3d22", style: "long", shirt: "#9b7bff" }),
    mother: person({ y: 40, skin: "#f8d2b0", hair: "#5a3a22", style: "bun", shirt: "#ff6b81" }),
    father: person({ y: 40, skin: "#f5c69a", hair: "#3a2a1a", style: "short", shirt: "#3bb7f6", glasses: true }),
    grandmother: person({ y: 40, skin: "#f8d2b0", hair: "#c9d6ff", style: "bun", shirt: "#9b7bff", glasses: true }),
    grandfather: person({ y: 40, skin: "#f5c69a", hair: "#c9d6ff", style: "bald", shirt: "#8a5a2b", beard: true }),
    baby: person({ y: 48, s: 0.85, skin: "#ffd9bd", hair: "#ffb02e", style: "tuft", shirt: "#ffe08a" }),
    family:
      person({ x: 28, y: 38, s: 0.75, skin: "#f5c69a", hair: "#3a2a1a", style: "short", shirt: "#3bb7f6" }) +
      person({ x: 72, y: 38, s: 0.75, skin: "#f8d2b0", hair: "#8a3d22", style: "long", shirt: "#ff6b81" }) +
      person({ x: 50, y: 60, s: 0.55, skin: "#ffd9bd", hair: "#ffb02e", style: "short", shirt: "#2fd18b" })
  };

  // Цвета для упражнений по теме "Цвета"
  const COLOR_PICS = {
    "c-red": "#ef3e52", "c-blue": "#2f6bff", "c-green": "#22b04b", "c-yellow": "#ffd21f",
    "c-black": "#1a1d2e", "c-white": "#ffffff", "c-orange": "#ff8a1f", "c-pink": "#ff8cc6",
    "c-purple": "#8b4de8", "c-brown": "#8a5a2b", "c-grey": "#9aa1b5"
  };
  // Цвета плиток для чисел
  const NUM_COLORS = ["#ff6b81", "#3bb7f6", "#2fd18b", "#ffc83d", "#9b7bff", "#ff9a3d"];

  function pic(key, cls = "") {
    let inner = PICS[key];
    if (!inner && COLOR_PICS[key]) {
      const c = COLOR_PICS[key];
      // Клякса краски выбранного цвета
      inner = `<path d="M50 12c14 0 20 10 30 12s14 14 8 24 4 18-6 26-22 4-32 12-24-2-28-12-14-14-10-26 2-20 14-22 10-14 24-14z" fill="${c}" stroke="rgba(27,35,71,.25)" stroke-width="3"/><ellipse cx="38" cy="34" rx="10" ry="6" fill="#fff" opacity=".35" transform="rotate(-25 38 34)"/><circle cx="84" cy="84" r="5" fill="${c}" stroke="rgba(27,35,71,.25)" stroke-width="2"/>`;
    }
    if (!inner && /^n\d+$/.test(key)) {
      const n = key.slice(1);
      const c = NUM_COLORS[Number(n) % NUM_COLORS.length];
      const fs = n.length > 2 ? 34 : n.length > 1 ? 42 : 52;
      const ng = id("ng");
      inner = `<defs><linearGradient id="${ng}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
        <rect x="14" y="14" width="72" height="72" rx="22" fill="#000" opacity=".18"/>
        <rect x="14" y="10" width="72" height="72" rx="22" fill="${c}"/>
        <rect x="14" y="10" width="72" height="36" rx="22" fill="url(#${ng})"/>
        <text x="50" y="${46 + fs * 0.36}" text-anchor="middle" font-family="Unbounded,Manrope,sans-serif" font-weight="700" font-size="${fs * 0.85}" fill="#fff">${n}</text>`;
    }
    if (!inner) return "";
    // Мягкая тень под предметом придаёт картинке объём
    const ground = COLOR_PICS[key] || /^n\d+$/.test(key) ? "" : `<ellipse cx="50" cy="93" rx="30" ry="4" fill="#000" opacity=".13"/>`;
    return `<svg class="${cls}" viewBox="0 0 100 100" aria-hidden="true">${ground}${inner}</svg>`;
  }

  /* Картинки для магазина */
  function shopPic(key) {
    if (key === "freeze") return `<svg class="shop-item__pic" viewBox="0 0 24 24"><rect x="1" y="1" width="22" height="22" rx="6" fill="#dff3ff"/>${ICONS.freeze}</svg>`;
    const hat = key.replace("hat-", "");
    return `<div class="shop-item__pic">${mascot({ hat })}</div>`;
  }

  /* ------------------------------------------------------------------
     Декоративные фигуры фона и украшения возле тропинки
     ------------------------------------------------------------------ */
  function bgShape(type, c1, c2) {
    const g = id("bgs");
    const grad = `<defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>`;
    const shapes = {
      blob: `<path d="M50 6c18 0 30 12 38 26s4 34-10 46-34 16-50 6S2 58 8 38 32 6 50 6z" fill="url(#${g})"/>`,
      ring: `<circle cx="50" cy="50" r="34" fill="none" stroke="url(#${g})" stroke-width="12"/>`,
      star: `<path d="M50 6l11 27 29 3-22 19 7 29-25-15-25 15 7-29-22-19 29-3z" fill="url(#${g})" stroke="url(#${g})" stroke-width="6" stroke-linejoin="round"/>`,
      squiggle: `<path d="M8 60q10-24 21 0t21 0 21 0 21 0" fill="none" stroke="url(#${g})" stroke-width="9" stroke-linecap="round"/>`,
      triangle: `<path d="M50 10 90 82H10z" fill="url(#${g})" stroke="url(#${g})" stroke-width="10" stroke-linejoin="round"/>`,
      plus: `<path d="M50 14v72M14 50h72" stroke="url(#${g})" stroke-width="18" stroke-linecap="round"/>`
    };
    return `<svg viewBox="0 0 100 100">${grad}${shapes[type] || shapes.blob}</svg>`;
  }

  const DECOR = {
    tree: `<ellipse cx="60" cy="112" rx="40" ry="7" fill="#000" opacity=".12"/><rect x="54" y="70" width="12" height="40" rx="4" fill="#a9703a"/><circle cx="60" cy="52" r="32" fill="#2fd18b"/><circle cx="42" cy="62" r="20" fill="#22b87a"/><circle cx="78" cy="62" r="20" fill="#22b87a"/><circle cx="52" cy="40" r="10" fill="#7cf0b4" opacity=".7"/>`,
    cloud: `<path d="M24 82h74a18 18 0 0 0 0-36 26 26 0 0 0-50-6 20 20 0 0 0-24 42z" fill="#fff" opacity=".9"/><path d="M24 82h74a18 18 0 0 0 6-1H30a20 20 0 0 1-6-1z" fill="#c9d6ff"/>`,
    stars: `<path d="M30 20l5 12 13 1-10 8 3 13-11-7-11 7 3-13-10-8 13-1z" fill="#ffc83d"/><path d="M84 54l3 8 9 1-7 5 2 9-7-5-7 5 2-9-7-5 9-1z" fill="#ff9a3d"/><path d="M44 84l2 5 6 1-5 3 2 6-5-3-5 3 2-6-5-3 6-1z" fill="#ff7ac8"/>`,
    chest: `<ellipse cx="60" cy="108" rx="40" ry="7" fill="#000" opacity=".12"/><rect x="22" y="56" width="76" height="48" rx="8" fill="#c97b33"/><path d="M22 64c0-20 16-30 38-30s38 10 38 30z" fill="#e8a25a"/><rect x="22" y="60" width="76" height="8" fill="#ffc83d"/><rect x="52" y="58" width="16" height="20" rx="3" fill="#ffc83d"/><circle cx="60" cy="68" r="3" fill="#8a5a2b"/>`,
    mountain: `<path d="M4 108 46 30l24 40 14-20 32 58z" fill="#9b7bff"/><path d="M46 30l10 18-8-4-6 8-6-6z" fill="#fff"/><path d="M84 50l8 14-6-3-4 5z" fill="#fff"/>`
  };
  function decor(key) {
    return `<svg viewBox="0 0 120 120" aria-hidden="true">${DECOR[key] || ""}</svg>`;
  }

  return { mascot, logo, icon, unitIcon, nodeGlyph, badge, pic, shopPic, bgShape, decor, hasPic: (k) => !!(PICS[k] || COLOR_PICS[k] || /^n\d+$/.test(k || "")) };
})();
