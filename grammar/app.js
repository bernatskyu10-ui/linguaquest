/* ==========================================================================
   Грамматика по шагам: маршруты, объяснение, разминка, тренажёр перевода
   #/            главная
   #/topics      все темы
   #/how         как учиться
   #/t/N/learn   объяснение, #/t/N/warm разминка, #/t/N/tr перевод
   ========================================================================== */
(() => {
  const C = window.GRAMMAR_COURSE;
  const PLUS = window.GRAMMAR_PLUS || {};
  const TR = window.TRAINER || {};
  const LEVELS = ["A1", "A2", "B1", "B2", "C1"];
  // Порядок и уровни берём из data/order.js; темы вне списка идут в конец своего уровня
  const ORDER = window.GRAMMAR_ORDER || {};
  const byId = new Map(C.lessons.map((l) => [l.id, l]));
  const listed = new Set(Object.values(ORDER).flat());
  const L = LEVELS.flatMap((lv) => (ORDER[lv] || []).filter((id) => byId.has(id)).map((id) => Object.assign(byId.get(id), { lvl: lv }))
    .concat(C.lessons.filter((l) => !listed.has(l.id) && l.lvl === lv)));
  L.forEach((l, i) => { l.n = i + 1; });
  const FX = window.FX;
  const $main = document.getElementById("main");
  const $toast = document.querySelector("[data-toast]");
  const LV_NAME = { A1: "A1", A2: "A2", B1: "B1", B2: "B2", C1: "C1-C2" };

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const clean = (s) => String(s).replace(/ — /g, " - ").replace(/[—–]/g, "-");
  const SPEAKER = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9.5h4l5-4.5v14l-5-4.5H3z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';
  const SUN = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></svg>';
  const MOON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z"/></svg>';

  /* ---------- Хранилище ---------- */
  const KEY = "gps-progress-v1";
  let P = { t: {}, last: 0 };
  try { P = Object.assign(P, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) { /* приватный режим */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(P)); } catch (e) { /* */ } };
  const rec = (id) => (P.t[id] = P.t[id] || { learn: false, warm: null, tr: null });

  // Задания разминки: новые (с объяснением) или из базового урока
  function warmTasks(l) {
    if (PLUS[l.id]) return PLUS[l.id].tasks;
    return l.tasks.map((t) => ({ k: "input", q: t.q, a: t.a.split(" / "), why: "" }));
  }
  const trList = (l) => (TR[l.id] || []).map(([ru, en, hint]) => ({ ru, en: en.split("|"), hint }));
  function progress(l) {
    const r = P.t[l.id] || {};
    const parts = [r.learn ? 1 : 0, r.warm != null ? 1 : 0];
    if (TR[l.id]) parts.push(r.tr != null ? 1 : 0);
    return Math.round((parts.reduce((a, b) => a + b, 0) / parts.length) * 100);
  }

  const plural = (n, one, few, many) => `${n} ${n % 10 === 1 && n % 100 !== 11 ? one : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? few : many}`;
  const doneCount = () => L.filter((l) => progress(l) === 100).length;

  /* ---------- Тема ---------- */
  const THEME = "gps-theme";
  function applyTheme() {
    let t = null;
    try { t = localStorage.getItem(THEME); } catch (e) { /* */ }
    const theme = t || "light";
    document.documentElement.dataset.theme = theme;
    const b = document.querySelector("[data-theme-btn]");
    b.innerHTML = theme === "dark" ? SUN : MOON;
    b.setAttribute("aria-label", theme === "dark" ? "Светлая тема" : "Тёмная тема");
  }
  document.querySelector("[data-theme-btn]").addEventListener("click", () => {
    try { localStorage.setItem(THEME, document.documentElement.dataset.theme === "dark" ? "light" : "dark"); } catch (e) { /* */ }
    applyTheme();
    FX.icon(document.querySelector("[data-theme-btn] svg"));
  });
  applyTheme();

  function toast(text) {
    $toast.textContent = text;
    $toast.classList.add("is-on");
    clearTimeout(toast.t);
    toast.t = setTimeout(() => $toast.classList.remove("is-on"), 2300);
  }

  /* ---------- Озвучка ---------- */
  let voice = null;
  const pickVoice = () => {
    const vs = speechSynthesis.getVoices().filter((v) => /^en[-_]/i.test(v.lang));
    voice = vs.find((v) => /en[-_]US/i.test(v.lang) && /Google|Natural|Samantha|Aria|Jenny/i.test(v.name)) || vs.find((v) => /en[-_]US/i.test(v.lang)) || vs[0] || null;
  };
  if ("speechSynthesis" in window) { pickVoice(); speechSynthesis.addEventListener("voiceschanged", pickVoice); }
  // Озвучка для видео-разбора: фразы встают в очередь, а не перебивают друг друга
  function speak(text, rate) {
    if (!("speechSynthesis" in window) || !voice) return;
    const u = new SpeechSynthesisUtterance(text);
    u.voice = voice; u.lang = voice.lang; u.rate = rate || 0.92;
    speechSynthesis.speak(u);
  }
  function say(text, btn) {
    if (!("speechSynthesis" in window) || !voice) { toast("На этом устройстве нет английского голоса"); return; }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.voice = voice; u.lang = voice.lang; u.rate = 0.92;
    if (btn) { btn.classList.add("is-playing"); u.onend = u.onerror = () => btn.classList.remove("is-playing"); }
    speechSynthesis.speak(u);
  }

  /* ---------- Сравнение ответов ---------- */
  const CONTR = { "it's": "it is", "i'm": "i am", "you're": "you are", "he's": "he is", "she's": "she is", "we're": "we are", "they're": "they are", "don't": "do not", "doesn't": "does not", "didn't": "did not", "isn't": "is not", "aren't": "are not", "wasn't": "was not", "weren't": "were not", "can't": "cannot", "won't": "will not", "i'll": "i will", "you'll": "you will", "he'll": "he will", "she'll": "she will", "we'll": "we will", "they'll": "they will", "it'll": "it will", "i'd": "i would", "i've": "i have", "you've": "you have", "we've": "we have", "they've": "they have", "haven't": "have not", "hasn't": "has not", "there's": "there is", "what's": "what is", "who's": "who is", "let's": "let us", "friend's": "friend has", "he'd": "he would", "she'd": "she would", "we'd": "we would", "you'd": "you would", "they'd": "they would", "it'd": "it would", "there'd": "there would", "wouldn't": "would not", "couldn't": "could not", "shouldn't": "should not", "mustn't": "must not", "needn't": "need not", "hadn't": "had not", "mightn't": "might not", "he'll": "he will", "that's": "that is", "where's": "where is", "how's": "how is", "here's": "here is" };
  const NUMS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
  function norm(s) {
    return String(s).toLowerCase().replace(/[’`´‘]/g, "'").replace(/…|\.\.\./g, " ")
      .replace(/\b(\d{1,2})\b/g, (m, d) => NUMS[Number(d)] || m).replace(/\btwenty five\b/g, "twenty-five")
      .replace(/[a-z]+'[a-z]+/g, (w) => CONTR[w] || w).replace(/\bcan not\b/g, "cannot")
      .replace(/\b(mum|mom)\b/g, "mom").replace(/\bmaths\b/g, "math")
      .replace(/[.,!?;:«»"()]/g, " ").replace(/\s+/g, " ").trim();
  }
  const NONE = ["-", "нет", "0", "без", "ничего", "не нужен", "без артикля", "без предлога", "no"];
  const variants = (a) => [...new Set((Array.isArray(a) ? a : [a]).flatMap((v) => (/^без /.test(v) || v === "-" ? NONE : [v])).map(norm))];
  function lev(a, b) {
    const m = a.length, n = b.length, d = Array.from({ length: m + 1 }, (_, i) => [i]);
    for (let j = 1; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[m][n];
  }
  // Верно? Точное совпадение или одна опечатка в длинном слове
  // «I'd» бывает и «I would», и «I had»; «he's» бывает и «he is», и «he has»: проверяем оба прочтения
  const readings = (s) => {
    const re = /\b([a-z]+)['’]d\b/gi;
    const n = (s.match(re) || []).length;
    let outs = [s];
    // Каждое «'d» отдельно: would или had (до 4 штук в фразе)
    if (n && n <= 4) {
      outs = [];
      for (let m = 0; m < 1 << n; m++) { let k = 0; outs.push(s.replace(re, (w, x) => ((m >> k++) & 1 ? `${x} had` : w))); }
    }
    const has = (x) => x.replace(/\b(he|she|it|who|what|there|that)['’]s\b/gi, "$1 has");
    return [...new Set(outs.flatMap((x) => [x, has(x)]))];
  };
  function judge(input, answers) {
    const ni = norm(input);
    if (!ni) return { ok: false, empty: true };
    const vs = variants(answers);
    const alts = readings(input).map(norm);
    if (alts.some((x) => vs.includes(x))) return { ok: true };
    for (const v of vs) {
      const a = ni.split(" "), b = v.split(" ");
      if (a.length !== b.length) continue;
      let typos = 0, bad = false;
      for (let i = 0; i < a.length; i++) {
        if (a[i] === b[i]) continue;
        if (b[i].length >= 5 && lev(a[i], b[i]) === 1) typos++;
        else { bad = true; break; }
      }
      if (!bad && typos <= 1) return { ok: true, typo: true };
    }
    return { ok: false };
  }
  // Подсветка слов: что лишнее и чего не хватает, по ближайшему варианту
  function diffHTML(input, answers) {
    const a = norm(input).split(" ").filter(Boolean);
    let best = null;
    for (const v of (Array.isArray(answers) ? answers : [answers])) {
      const b = norm(v).split(" ");
      const d = lev(a, b);
      if (!best || d < best.d) best = { d, b, raw: v };
    }
    const b = best.b;
    const m = a.length, n = b.length, T = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) T[i][j] = a[i] === b[j] ? T[i + 1][j + 1] + 1 : Math.max(T[i + 1][j], T[i][j + 1]);
    const out = [];
    let i = 0, j = 0;
    while (i < m || j < n) {
      if (i < m && j < n && a[i] === b[j]) { out.push(`<span class="w-ok">${esc(a[i])}</span>`); i++; j++; }
      else if (j < n && (i >= m || T[i][j + 1] >= T[i + 1][j])) { out.push(`<span class="w-miss">${esc(b[j])}</span>`); j++; }
      else { out.push(`<span class="w-bad">${esc(a[i])}</span>`); i++; }
    }
    return { html: out.join(" "), best: best.raw };
  }

  /* ---------- Главная ---------- */
  function home() {
    const next = L.find((l) => progress(l) < 100) || L[0];
    const started = Object.keys(P.t).length > 0;
    $main.innerHTML = `
      <div class="enter">
        <section class="hero">
          <div>
            <h1>Английская грамматика, которую можно понять</h1>
            <p>Каждая тема по шагам: объяснение на русском, разминка и тренажёр перевода с проверкой каждого слова.</p>
            <div class="hero__actions">
              <a class="btn btn--primary" href="#/t/${next.id}/learn">${started ? `Продолжить: тема ${next.n}` : "Начать с первой темы"}</a>
              <a class="btn btn--ghost" href="#/topics">Все темы</a>
            </div>
            <dl class="stats"><div><dt>Тем</dt><dd>${L.length}</dd></div><div><dt>Фраз в тренажёре</dt><dd>${Object.values(TR).reduce((n, a) => n + a.length, 0)}</dd></div><div><dt>Пройдено</dt><dd>${doneCount()} из ${L.length}</dd></div></dl>
          </div>
          <div class="hero__art" aria-hidden="true">
            <img src="https://bernatskyu10-ui.github.io/linguaquest/assets/mascot/fox-read.webp" alt="" width="300" height="300">
            <span class="chip chip--a">am / is / are</span><span class="chip chip--b">did + V</span><span class="chip chip--c">have done</span>
            <div class="hero__note"><b>Я люблю музыку.</b><s>Music I like.</s> <span class="hero__fix">→ I like music.</span></div>
          </div>
        </section>
        <section class="how" aria-label="Как устроена тема">
          <div class="how__item"><span class="how__n">1</span><div><b>Объяснение</b><span>Правило по шагам на простых примерах</span></div></div>
          <div class="how__item"><span class="how__n">2</span><div><b>Разминка</b><span>10 коротких заданий с разбором ошибок</span></div></div>
          <div class="how__item"><span class="how__n">3</span><div><b>Перевод</b><span>Пишете фразу по-английски, сайт проверяет каждое слово</span></div></div>
        </section>
        ${topicsBlock("A1")}
      </div>`;
    bindTopics();
    FX.home($main);
  }

  function topicsBlock(level) {
    const d = doneCount();
    return `<section aria-labelledby="tt"><div class="section-head"><h2 class="section-title" id="tt">Темы по уровням</h2>
      <div class="overall" aria-label="Пройдено тем: ${d} из ${L.length}"><span>Пройдено <b>${d}</b> из ${L.length}</span><span class="overall__bar"><i style="transform:translateX(${(d / L.length - 1) * 100}%)"></i></span></div></div>
      <div class="tabs" role="tablist">${LEVELS.map((lv) => {
        const n = L.filter((l) => l.lvl === lv).length;
        return `<button class="tab ${lv === level ? "is-on" : ""}" role="tab" aria-selected="${lv === level}" data-lv="${lv}">${LV_NAME[lv]}<small>${n}</small></button>`;
      }).join("")}</div>
      <div class="topics enter-list" data-topics>${topicCards(level)}</div></section>`;
  }
  function topicCards(level) {
    return L.filter((l) => l.lvl === level).map((l, i) => {
      const p = progress(l);
      const tr = TR[l.id];
      return `<a class="topic" href="#/t/${l.id}/learn" style="--i:${i}">
        <span class="ring ${p === 100 ? "is-full" : ""}" style="--p:${p}"><span>${p === 100 ? "✓" : l.n}</span></span>
        <span class="topic__body"><span class="topic__title">${esc(l.t)}</span>
          <span class="topic__meta">${tr ? `<span class="badge">Перевод: ${tr.length} фраз</span>` : `<span class="badge badge--muted">Разминка</span>`}${p ? `<span>${p}%</span>` : ""}</span></span><svg class="topic__go" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></a>`;
    }).join("");
  }
  function bindTopics() {
    const wrap = $main.querySelector(".tabs");
    FX.tabs(wrap);
    FX.cards($main.querySelector("[data-topics]"));
    $main.querySelectorAll("[data-lv]").forEach((b) => b.addEventListener("click", () => {
      $main.querySelectorAll("[data-lv]").forEach((x) => { x.classList.toggle("is-on", x === b); x.setAttribute("aria-selected", String(x === b)); });
      const box = $main.querySelector("[data-topics]");
      box.innerHTML = topicCards(b.dataset.lv);
      box.classList.remove("enter-list"); void box.offsetWidth; box.classList.add("enter-list");
      FX.tabMove(wrap);
      FX.cards(box);
    }));
  }

  function topicsPage() {
    const lastL = L.find((l) => l.id === P.last);
    $main.innerHTML = `<div class="enter">${topicsBlock(lastL ? lastL.lvl : "A1")}</div>`;
    bindTopics();
    FX.rise($main.querySelector(".section-title"), { y: 8 });
  }

  function howPage() {
    $main.innerHTML = `<article class="guide enter">
      <h1>Как учиться на этом сайте</h1>
      <p>Одна тема в день. Идите по порядку: темы A1 строят основу, без них дальше будет трудно.</p>
      <h2>1. Объяснение</h2><p>Прочитайте шаги и скажите примеры вслух (кнопка с динамиком озвучивает фразу). В конце есть шпаргалка с таблицами.</p>
      <h2>2. Разминка</h2><p>10 заданий: выбрать вариант, вписать слово, собрать предложение, исправить ошибку. После каждого ответа видно, почему так.</p>
      <h2>3. Перевод</h2><p>Главная часть. Вы видите фразу на русском и пишете её по-английски. Сайт подсвечивает слова: <b style="color:var(--ok)">зелёные</b> верные, <b style="color:var(--bad)">зачёркнутые</b> лишние, <b>выделенные</b> пропущены. В конце можно перепройти только ошибки.</p>
      <h2>Совет</h2><p>Не подсматривайте сразу. Сначала попробуйте сами, даже с ошибкой: так запоминается в 2-3 раза лучше. Если не помните слово, нажмите «Подсказка».</p>
      <div class="next-row"><a class="btn btn--primary" href="#/t/1/learn">Начать с темы 1</a></div>
    </article>`;
    FX.rise($main.querySelector(".guide").children, { y: 8, gap: 0.03 });
  }

  /* ---------- Страница темы ---------- */
  function topic(id, part) {
    const l = L.find((x) => x.id === id);
    if (!l) { location.hash = "#/"; return; }
    P.last = id; save();
    const hasTr = !!TR[id];
    const r = rec(id);
    const parts = [["learn", "Объяснение", r.learn], ["warm", "Разминка", r.warm != null]].concat(hasTr ? [["tr", "Перевод", r.tr != null]] : []);
    $main.innerHTML = `
      <a class="crumb" href="#/topics">← Все темы</a>
      <div class="topic-head"><div><span class="badge">${LV_NAME[l.lvl]}</span> <span class="badge badge--muted">Тема ${l.n}</span></div><h1>${esc(l.t)}</h1></div>
      <div class="steps-nav" style="--n:${parts.length}" role="tablist">${parts.map(([k, name, done], i) => `<button role="tab" aria-selected="${k === part}" class="${k === part ? "is-on" : ""} ${done ? "is-done" : ""}" data-go="${k}"><i>${done ? "✓" : i + 1}</i><span>${name}</span></button>`).join("")}</div>
      <div data-part class="enter"></div>`;
    $main.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => (location.hash = `#/t/${id}/${b.dataset.go}`)));
    const box = $main.querySelector("[data-part]");
    // Шапку темы анимируем только при входе в тему, не при переключении частей
    if (topic.cur !== id) FX.rise($main.querySelectorAll(".crumb, .topic-head, .steps-nav"), { y: 8, gap: 0.05 });
    topic.cur = id;
    if (part === "warm") drill(box, l, "warm");
    else if (part === "tr" && hasTr) drill(box, l, "tr");
    else learn(box, l, hasTr);
    document.title = `${l.t} · Грамматика по шагам`;
  }

  function learn(box, l, hasTr) {
    const plus = PLUS[l.id];
    const r = rec(l.id);
    const exRow = ([en, ru]) => `<div class="ex__row"><button class="say" type="button" data-say="${esc(en.split(" → ").pop())}" aria-label="Послушать">${SPEAKER}</button><div><b>${esc(en)}</b><span>${esc(ru)}</span></div></div>`;
    const nTasks = warmTasks(l).length, nTr = (TR[l.id] || []).length;
    const aside = `<aside class="side" aria-label="План темы"><div class="side__card">
      <div class="side__title">План темы</div>
      <ol class="side__list"><li class="is-on"><b>Объяснение</b><span>${plus ? plural(plus.steps.length, "шаг", "шага", "шагов") + " и шпаргалка" : "Правило и таблицы"}</span></li>
        <li><b>Разминка</b><span>${plural(nTasks, "задание", "задания", "заданий")} с разбором</span></li>${nTr ? `<li><b>Перевод</b><span>${plural(nTr, "фраза", "фразы", "фраз")} с проверкой слов</span></li>` : ""}</ol>
      <a class="btn btn--primary" href="#/t/${l.id}/warm" data-learned>К разминке</a></div></aside>`;
    const watch = `<button class="watch" type="button" data-watch><span class="watch__play"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5v14l12-7z"/></svg></span><span><b>Разбор за минуту</b><small>Анимированное объяснение с озвучкой</small><span class="watch__chips" aria-hidden="true"><span>Смысл</span><span>Строим</span><span>Ошибка</span></span></span></button>`;
    box.innerHTML = `<div class="learn-grid"><div class="reading">${watch}
      ${plus ? plus.steps.map((s, i) => `<section class="step" style="--i:${i}"><span class="step__n">${i + 1}</span><h3>${esc(s.h.replace(/^Шаг \d+\.\s*/, ""))}</h3>${s.t ? `<p>${esc(s.t)}</p>` : ""}${s.ex.length ? `<div class="ex">${s.ex.map(exRow).join("")}</div>` : ""}</section>`).join("") : ""}
      <details class="cheat" ${plus ? "" : "open"}><summary>${plus ? "Шпаргалка: правило и таблицы" : "Правило"}</summary><div class="cheat__body">${clean(l.body)}</div></details>
      <div class="next-row"><a class="btn btn--primary" href="#/t/${l.id}/warm" data-learned>Понятно, к разминке</a>${hasTr ? `<a class="btn btn--ghost" href="#/t/${l.id}/tr" data-learned>Сразу к переводу</a>` : ""}</div></div>${aside}</div>`;
    box.querySelectorAll(".cheat__body table").forEach((t) => { const w = document.createElement("div"); w.className = "tw"; t.replaceWith(w); w.appendChild(t); });
    box.querySelectorAll("[data-say]").forEach((b) => b.addEventListener("click", () => say(b.dataset.say, b)));
    box.querySelector("[data-watch]").addEventListener("click", (e) => {
      const btn = e.currentTarget;
      window.PLAYER.play(l, plus, l.n, { speak, hush: () => "speechSynthesis" in window && speechSynthesis.cancel(), onClose: () => btn.focus({ preventScroll: true }) });
    });
    box.querySelectorAll("[data-learned]").forEach((a) => a.addEventListener("click", () => { r.learn = true; save(); }));
    FX.rise(box.querySelectorAll(".step, .cheat, .next-row"), { y: 10, gap: 0.05, delay: 0.08, d: 0.3 });
  }

  /* ---------- Разминка и перевод: одна карточка за раз ---------- */
  function drill(box, l, mode, only) {
    const all = mode === "warm" ? warmTasks(l) : trList(l);
    const list = only ? only.map((i) => all[i]) : all;
    const idxs = only || all.map((_, i) => i);
    let pos = 0, score = 0;
    const mistakes = [];

    function show() {
      if (pos >= list.length) return finish();
      const t = list[pos];
      const kind = mode === "tr" ? "Переведите на английский" : { choice: "Выберите вариант", input: "Впишите ответ", fix: "Исправьте ошибку", order: "Соберите предложение" }[t.k];
      box.innerHTML = `<div class="drill">
        <div class="drill__top"><div class="drill__bar"><i style="transform:translateX(${(pos / list.length - 1) * 100}%)"></i></div><span class="drill__count">${pos + 1} / ${list.length}</span></div>
        <div class="card enter"><div class="card__kind">${kind}</div>
          ${mode === "tr" ? `<div class="card__ru">${esc(t.ru)}</div>` : `<div class="card__q">${esc(t.q)}</div>`}
          <div data-ui></div>
          <div class="card__actions">
            <button class="btn btn--primary" type="button" data-check>Проверить</button>
            ${mode === "tr" ? `<button class="btn btn--ghost btn--sm" type="button" data-hint>Подсказка</button>` : ""}
            <span class="spacer"></span><button class="link-btn" type="button" data-skip>Не знаю</button>
          </div>
          <div data-fb></div></div></div>`;
      FX.card(box.querySelector(".card"), pos === 0);
      const ui = box.querySelector("[data-ui]");
      let answer = () => "";
      if (mode === "warm" && t.k === "choice") {
        let pick = -1;
        ui.innerHTML = `<div class="opts">${t.o.map((o, i) => `<button class="opt" type="button" data-o="${i}"><kbd>${i + 1}</kbd>${esc(o)}</button>`).join("")}</div>`;
        ui.querySelectorAll("[data-o]").forEach((b) => b.addEventListener("click", () => {
          if (box.querySelector("[data-check]").dataset.done) return;
          pick = Number(b.dataset.o);
          ui.querySelectorAll("[data-o]").forEach((x) => x.classList.toggle("is-pick", x === b));
        }));
        answer = () => pick;
      } else if (mode === "warm" && t.k === "order") {
        const bank = shuffle(t.words.map((w, i) => ({ w, i })));
        const built = [];
        ui.innerHTML = `<div class="tiles" data-built aria-label="Ваше предложение"></div><div class="tiles tiles--bank" data-bank>${bank.map((b) => `<button class="tile" type="button" data-t="${b.i}">${esc(b.w)}</button>`).join("")}</div>`;
        const $built = ui.querySelector("[data-built]");
        const redraw = () => { $built.innerHTML = built.map((i) => `<button class="tile" type="button" data-u="${i}">${esc(t.words[i])}</button>`).join(""); };
        ui.addEventListener("click", (e) => {
          if (box.querySelector("[data-check]").dataset.done) return;
          const add = e.target.closest("[data-t]");
          const rem = e.target.closest("[data-u]");
          if (add && !add.classList.contains("is-used")) { built.push(Number(add.dataset.t)); add.classList.add("is-used"); redraw(); FX.tile($built.lastElementChild); }
          if (rem) { const i = Number(rem.dataset.u); built.splice(built.indexOf(i), 1); const back = ui.querySelector(`[data-t="${i}"]`); back.classList.remove("is-used"); redraw(); FX.tile(back); }
        });
        answer = () => built.map((i) => t.words[i]).join(" ");
      } else {
        const ta = mode === "tr" || t.k === "fix";
        ui.innerHTML = ta ? `<textarea class="field" rows="2" placeholder="Напишите по-английски" autocomplete="off" autocapitalize="sentences" spellcheck="false"></textarea>`
          : `<input class="field" type="text" placeholder="Ваш ответ" autocomplete="off" autocapitalize="off" spellcheck="false">`;
        const f = ui.querySelector(".field");
        if (t.k === "fix") f.value = t.q.replace(/^Исправьте:\s*/, "");
        f.focus({ preventScroll: true });
        f.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); box.querySelector("[data-check]").click(); } });
        answer = () => f.value;
      }

      const $check = box.querySelector("[data-check]");
      const $fb = box.querySelector("[data-fb]");
      const hintBtn = box.querySelector("[data-hint]");
      if (hintBtn) hintBtn.addEventListener("click", () => {
        const words = t.en[0].split(" ");
        $fb.innerHTML = `<div class="hint-box">${esc(t.hint)}. Начало: <b>${esc(words.slice(0, Math.ceil(words.length / 3)).join(" "))} ...</b></div>`;
      });
      const resolve = (ok, typo, given) => {
        $check.dataset.done = "1";
        if (ok) score++;
        else mistakes.push(idxs[pos]);
        let body = "";
        if (mode === "tr") {
          const d = diffHTML(given || "", t.en);
          body = ok ? `<div class="fb__title">${typo ? "Верно, только опечатка" : "Верно!"}</div>${typo || norm(given) !== norm(t.en[0]) ? `<div>Можно и так: <span class="fb__answer">${esc(t.en[0])}</span></div>` : ""}`
            : `<div class="fb__title">${given ? "Не совсем" : "Правильный ответ"}</div>${given ? `<div class="diff">${d.html}</div>` : ""}<div>Правильно: <span class="fb__answer">${esc(d.best)}</span></div><div class="fb__why">${esc(t.hint)}</div>`;
        } else {
          const right = t.k === "choice" ? t.o[t.a] : (Array.isArray(t.a) ? t.a[0] : t.a);
          body = `<div class="fb__title">${ok ? (typo ? "Верно, только опечатка" : "Верно!") : "Ошибка"}</div>${ok && !typo ? "" : `<div>Правильно: <span class="fb__answer">${esc(right)}</span></div>`}${t.why ? `<div class="fb__why">${esc(t.why)}</div>` : ""}`;
        }
        $fb.innerHTML = `<div class="fb ${ok ? "fb--ok" : "fb--bad"} enter"><span class="fb__icon" aria-hidden="true">${ok ? "✓" : "✕"}</span><div>${body}</div></div>`;
        FX.fb($fb.firstElementChild, ok);
        box.querySelector(".drill__bar i").style.transform = `translateX(${((pos + 1) / list.length - 1) * 100}%)`;
        $check.textContent = pos + 1 < list.length ? "Дальше" : "Результат";
        box.querySelector("[data-skip]").hidden = true;
        if (hintBtn) hintBtn.hidden = true;
        const f = ui.querySelector(".field");
        if (f) { f.classList.add(ok ? "is-ok" : "is-bad"); f.readOnly = true; }
        if (t.k === "choice") ui.querySelectorAll("[data-o]").forEach((b) => { const i = Number(b.dataset.o); if (i === t.a) { b.classList.add("is-ok"); if (ok) FX.pop(b); } else if (b.classList.contains("is-pick")) b.classList.add("is-bad"); });
        if (!ok && navigator.vibrate) navigator.vibrate(12);
        $check.focus({ preventScroll: true });
      };
      $check.addEventListener("click", () => {
        if ($check.dataset.done) { pos++; show(); return; }
        const given = answer();
        if (mode === "warm" && t.k === "choice") {
          if (given < 0) { toast("Выберите вариант"); return; }
          return resolve(given === t.a, false);
        }
        const res = judge(given, mode === "tr" ? t.en : (Array.isArray(t.a) ? t.a : [t.a]));
        if (res.empty) { toast(t.k === "order" ? "Нажмите на слова по порядку" : "Сначала напишите ответ"); return; }
        resolve(res.ok, res.typo, given);
      });
      box.querySelector("[data-skip]").addEventListener("click", () => resolve(false, false, ""));
    }

    function finish() {
      const r = rec(l.id);
      if (!only) { r[mode] = Math.max(r[mode] || 0, score); save(); }
      const total = list.length;
      const good = score / total >= 0.7;
      const next = L[L.indexOf(l) + 1];
      const nextHref = mode === "warm" && TR[l.id] ? `#/t/${l.id}/tr` : next ? `#/t/${next.id}/learn` : "#/topics";
      const nextText = mode === "warm" && TR[l.id] ? "К переводу" : next ? "Следующая тема" : "Все темы";
      box.innerHTML = `<div class="drill"><div class="card result enter">
        <div class="result__score">${score} / ${total}</div>
        <p class="result__text">${good ? "Отлично, тема усвоена." : "Стоит повторить. Перечитайте объяснение и пройдите ошибки ещё раз."}</p>
        <div class="next-row">
          ${mistakes.length ? `<button class="btn ${good ? "btn--ghost" : "btn--primary"}" type="button" data-again>Повторить ошибки (${mistakes.length})</button>` : ""}
          <a class="btn ${good || !mistakes.length ? "btn--primary" : "btn--ghost"}" href="${nextHref}">${nextText}</a>
        </div>
        ${mistakes.length ? `<div class="mist">${mistakes.map((i) => { const t = all[i]; return `<div><b>${esc(mode === "tr" ? t.ru : t.q)}</b>${esc(mode === "tr" ? t.en[0] : t.k === "choice" ? t.o[t.a] : (Array.isArray(t.a) ? t.a[0] : t.a))}</div>`; }).join("")}</div>` : ""}
      </div></div>`;
      FX.result(box.querySelector(".result"), score, total, good && !only);
      const again = box.querySelector("[data-again]");
      if (again) again.addEventListener("click", () => drill(box, l, mode, mistakes.slice()));
      // Обновляем отметки в переключателе частей
      const btn = $main.querySelector(`[data-go="${mode}"]`);
      if (btn && !only) { btn.classList.add("is-done"); btn.querySelector("i").textContent = "✓"; FX.pop(btn.querySelector("i")); }
    }
    show();
  }

  function shuffle(a) {
    const r = a.slice();
    for (let i = r.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [r[i], r[j]] = [r[j], r[i]]; }
    if (r.length > 1 && r.every((x, i) => x.i === i)) [r[0], r[1]] = [r[1], r[0]];
    return r;
  }

  /* ---------- Маршруты ---------- */
  function route() {
    const h = location.hash;
    const m = h.match(/^#\/t\/(\d+)(?:\/(learn|warm|tr))?/);
    document.querySelectorAll(".nav a").forEach((a) => a.classList.toggle("is-on", h.startsWith(a.getAttribute("href"))));
    if (!m) topic.cur = null;
    if (m) topic(Number(m[1]), m[2] || "learn");
    else if (h === "#/topics") topicsPage();
    else if (h === "#/how") howPage();
    else home();
    if (!m || !m[2] || m[2] === "learn") document.title = m ? document.title : "Грамматика по шагам";
    scrollTo({ top: 0 });
    $main.focus({ preventScroll: true });
  }
  addEventListener("hashchange", route);
  route();
})();
