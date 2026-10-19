/* ==========================================================================
   LinguaQuest - курс «Грамматика с нуля»
   Маршруты: #/ - главная, #/lesson/N - урок. Прогресс хранится в браузере.
   ========================================================================== */
(() => {
  const C = GRAMMAR_COURSE;
  const L = C.lessons;
  const $main = document.getElementById("main");
  const $side = document.getElementById("sidebar");
  const $scrim = document.querySelector("[data-scrim]");
  const $menu = document.querySelector("[data-menu]");
  const $toast = document.querySelector("[data-toast]");
  const LEVEL_NAMES = { A1: "A1 · основа", A2: "A2 · расширяем базу", B1: "B1 · свободная речь", B2: "B2 · продвинутый", C1: "C1-C2 · высший уровень" };
  const PASS = 0.6; // урок пройден, если верно 60% заданий

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const icon = (n) => (typeof SVG === "object" ? SVG.icon(n) : "");

  /* ---------- Прогресс ---------- */
  const KEY = "lq-grammar-v1";
  let state = { done: {}, last: 0, answers: {} };
  try { state = Object.assign(state, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) { /* приватный режим */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* нет места */ } };
  const doneCount = () => L.filter((l) => state.done[l.id] !== undefined).length;

  /* ---------- Тема ---------- */
  const THEME_KEY = "lq-grammar-theme";
  const sysDark = matchMedia("(prefers-color-scheme: dark)");
  function applyTheme() {
    let t = null;
    try { t = localStorage.getItem(THEME_KEY); } catch (e) { /* */ }
    const theme = t || (sysDark.matches ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
    const btn = document.querySelector("[data-theme-toggle]");
    btn.innerHTML = icon(theme === "dark" ? "sun" : "moon");
    btn.setAttribute("aria-label", theme === "dark" ? "Светлая тема" : "Тёмная тема");
  }
  document.querySelector("[data-theme-toggle]").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* */ }
    applyTheme();
  });
  sysDark.addEventListener("change", applyTheme);
  applyTheme();

  /* ---------- Меню на телефоне ---------- */
  function setMenu(open) {
    $side.classList.toggle("is-open", open);
    $scrim.hidden = !open;
    $menu.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open && innerWidth < 1080 ? "hidden" : "";
  }
  $menu.addEventListener("click", () => setMenu(!$side.classList.contains("is-open")));
  $scrim.addEventListener("click", () => setMenu(false));
  addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  function toast(text) {
    $toast.textContent = text;
    $toast.classList.add("is-on");
    clearTimeout(toast.t);
    toast.t = setTimeout(() => $toast.classList.remove("is-on"), 2400);
  }

  /* ---------- Озвучка английских примеров ---------- */
  let voice = null;
  function pickVoice() {
    const vs = speechSynthesis.getVoices().filter((v) => /^en[-_]/i.test(v.lang));
    voice = vs.find((v) => /en[-_]US/i.test(v.lang) && /Google|Natural|Samantha|Aria|Jenny/i.test(v.name)) || vs.find((v) => /en[-_]US/i.test(v.lang)) || vs[0] || null;
  }
  if ("speechSynthesis" in window) { pickVoice(); speechSynthesis.addEventListener("voiceschanged", pickVoice); }
  function say(text, el) {
    if (!("speechSynthesis" in window) || !voice) { toast("На этом устройстве нет английского голоса"); return; }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/[❌✅→]/g, " "));
    u.voice = voice; u.lang = voice.lang; u.rate = 0.92;
    if (el) { el.classList.add("is-playing"); u.onend = u.onerror = () => el.classList.remove("is-playing"); }
    speechSynthesis.speak(u);
  }

  /* ---------- Проверка ответа ---------- */
  const CONTR = { "it's": "it is", "i'm": "i am", "you're": "you are", "he's": "he is", "she's": "she is", "we're": "we are", "they're": "they are", "don't": "do not", "doesn't": "does not", "didn't": "did not", "isn't": "is not", "aren't": "are not", "wasn't": "was not", "weren't": "were not", "can't": "cannot", "won't": "will not", "i'll": "i will", "i'd": "i would", "i've": "i have", "haven't": "have not", "hasn't": "has not", "wouldn't": "would not", "shouldn't": "should not", "mustn't": "must not", "she'll": "she will", "he'll": "he will", "we'll": "we will", "they'll": "they will", "there's": "there is", "what's": "what is" };
  // Числа цифрами и словами считаем одинаково: 7 = seven
  const NUMS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
  function norm(s) {
    return String(s).toLowerCase().replace(/[’`´‘]/g, "'").replace(/…|\.\.\./g, " ")
      .replace(/\b(\d{1,2})\b/g, (m, d) => NUMS[Number(d)] || m)
      .replace(/[a-z]+'[a-z]+/g, (w) => CONTR[w] || w).replace(/\bcan not\b/g, "cannot")
      .replace(/[.,!?;:«»"()]/g, " ").replace(/\s+/g, " ").trim();
  }
  const NONE = ["-", "нет", "0", "без", "ничего", "не нужен", "не нужно", "x", "no"];
  function accepted(task) {
    const out = [];
    for (const v of task.a.split(" / ")) {
      if (/^без /.test(v)) out.push(...NONE.map(norm), norm(v));
      out.push(norm(v));
      // Ответ целым предложением: подставляем ответ вместо пропусков
      if (task.q.includes("___")) {
        const parts = v.split("…").map((p) => p.trim());
        let k = 0;
        const full = task.q.replace(/^[^:]*:\s*/, "").replace(/\s*\([^)]*\)/g, "").replace(/___/g, () => parts[Math.min(k++, parts.length - 1)] || "");
        out.push(norm(full));
      }
    }
    return [...new Set(out)];
  }
  const isRight = (task, input) => !!norm(input) && accepted(task).includes(norm(input));

  /* ---------- Боковое меню ---------- */
  function renderSide(current) {
    const groups = {};
    L.forEach((l) => (groups[l.lvl] = groups[l.lvl] || []).push(l));
    $side.innerHTML = `
      <div class="side-head"><a href="#/">Все уроки</a><span class="lvl" style="--c:var(--accent)">${doneCount()} / ${L.length}</span></div>
      <a class="side-link side-app" href="index.html"><span class="num">${icon("navLearn")}</span><span>Вернуться в LinguaQuest</span></a>
      ${Object.entries(groups).map(([lvl, ls]) => `
        <div class="side-group">
          <div class="side-group__title"><span class="lvl" style="--c:var(--${lvl})">${lvl === "C1" ? "C1-C2" : lvl}</span><span class="count">${ls.filter((l) => state.done[l.id] !== undefined).length}/${ls.length}</span></div>
          ${ls.map((l) => `<a class="side-link ${state.done[l.id] !== undefined ? "is-done" : ""}" href="#/lesson/${l.id}" ${l.id === current ? 'aria-current="page"' : ""}>
            <span class="num">${state.done[l.id] !== undefined ? icon("check") : l.id}</span><span>${esc(l.t)}</span></a>`).join("")}
        </div>`).join("")}`;
    const cur = $side.querySelector('[aria-current="page"]');
    if (cur) cur.scrollIntoView({ block: "nearest" });
  }

  function renderTotals() {
    const n = doneCount();
    document.querySelector("[data-total-bar]").style.width = `${(n / L.length) * 100}%`;
    document.querySelector("[data-total-text]").textContent = `${n} из ${L.length}`;
  }

  /* ---------- Главная ---------- */
  function renderHome() {
    const n = doneCount();
    const next = L.find((l) => state.done[l.id] === undefined) || L[0];
    const lastL = state.last ? L.find((l) => l.id === state.last) : null;
    const resume = lastL && state.done[lastL.id] === undefined ? lastL : next;
    const tasksDone = Object.values(state.done).reduce((s, v) => s + (v || 0), 0);
    const groups = {};
    L.forEach((l) => (groups[l.lvl] = groups[l.lvl] || []).push(l));
    $main.innerHTML = `
      <div class="view-enter">
        <section class="hero">
          <div>
            <h1>Грамматика английского с нуля</h1>
            <p>45 уроков: от первого предложения до уровня C1. Правило простыми словами, примеры и задания с проверкой.</p>
            <div class="hero__actions">
              <a class="btn btn--primary" href="#/lesson/${resume.id}">${icon("play")}${n ? `Продолжить: урок ${resume.id}` : "Начать с урока 1"}</a>
              ${n ? "" : `<a class="btn btn--ghost" href="#levels">Все уроки</a>`}
            </div>
          </div>
          <div class="hero__fox"><img src="assets/mascot/${n ? "fox-cheer" : "fox-read"}.webp" alt="Лисёнок Лингви с книгой" width="240" height="240"></div>
        </section>
        <section class="stats" aria-label="Прогресс">
          <div class="stat"><b>${n}</b><span>уроков пройдено</span></div>
          <div class="stat"><b>${L.length - n}</b><span>осталось</span></div>
          <div class="stat"><b>${tasksDone}</b><span>верных ответов</span></div>
        </section>
        <div id="levels">
        ${Object.entries(groups).map(([lvl, ls]) => {
          const d = ls.filter((l) => state.done[l.id] !== undefined).length;
          return `<section class="level">
            <div class="level__head"><span class="lvl" style="--c:var(--${lvl})">${lvl === "C1" ? "C1-C2" : lvl}</span><h2>${esc(LEVEL_NAMES[lvl].split(" · ")[1])}</h2>
              <div class="bar"><div class="bar__fill" style="width:${(d / ls.length) * 100}%;background:var(--${lvl})"></div></div><small>${d} / ${ls.length}</small></div>
            <div class="lesson-grid stagger">${ls.map((l, i) => {
              const sc = state.done[l.id];
              return `<a class="lesson-card ${sc !== undefined ? "is-done" : ""}" href="#/lesson/${l.id}" style="--i:${i}">
                <span class="num">${sc !== undefined ? icon("check") : l.id}</span><span class="title">${esc(l.t)}</span>
                ${sc !== undefined && l.tasks.length ? `<span class="score">${sc}/${l.tasks.length}</span>` : ""}</a>`;
            }).join("")}</div></section>`;
        }).join("")}
        </div>
        <details class="levels-info">
          <summary>Что нужно уметь на каждом уровне</summary>
          <div class="lv-rows">${C.levels.map((v) => `
            <div class="lv-row"><div><span class="lvl" style="--c:var(--${v.l === "C2" ? "C1" : v.l})">${v.l}</span> <b>${esc(v.name)}</b></div>
              <dl><dt>Грамматика</dt><dd>${esc(v.g)}</dd><dt>Темы слов</dt><dd>${esc(v.v)}</dd><dt>Говорение</dt><dd>${esc(v.s)}</dd><dt>Слушание</dt><dd>${esc(v.li)}</dd><dt>Чтение</dt><dd>${esc(v.r)}</dd><dt>Письмо</dt><dd>${esc(v.w)}</dd></dl></div>`).join("")}</div>
        </details>
      </div>`;
    document.title = "Грамматика с нуля · LinguaQuest";
  }

  /* ---------- Урок ---------- */
  function renderLesson(id) {
    const l = L.find((x) => x.id === id);
    if (!l) { location.hash = "#/"; return; }
    state.last = id;
    save();
    const prev = L.find((x) => x.id === id - 1);
    const next = L.find((x) => x.id === id + 1);
    const saved = state.answers[id] || {};
    $main.innerHTML = `
      <article class="view-enter">
        <div class="crumbs"><a href="#/">Все уроки</a><span aria-hidden="true">/</span><span class="lvl" style="--c:var(--${l.lvl})">${l.lvl === "C1" ? "C1-C2" : l.lvl}</span><span>Урок ${l.id}</span></div>
        <h1 class="lesson-title">${esc(l.t)}</h1>
        <div class="hint">${icon("speaker")}Нажмите на английский пример, чтобы его послушать</div>
        <div class="lesson-body">${l.body}</div>
        ${l.tasks.length ? `
        <section class="practice" aria-labelledby="ph">
          <div class="practice__head"><h2 id="ph">Задания</h2><span class="practice__score" data-score></span></div>
          <form data-form novalidate>
            ${l.tasks.map((t, i) => `
              <div class="task" data-task="${i}">
                <label for="t${i}"><span class="n">${i + 1}.</span>${esc(t.q)}</label>
                <div class="task__row">
                  <input id="t${i}" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Ваш ответ" value="${esc(saved[i] || "")}">
                  <button class="task__check" type="button" data-check="${i}" aria-label="Проверить задание ${i + 1}">${icon("check")}</button>
                </div>
                <div class="task__fb" aria-live="polite"></div>
              </div>`).join("")}
            <div class="practice__actions">
              <button class="btn btn--primary" type="submit">${icon("check")}Проверить всё</button>
              <button class="btn btn--ghost" type="button" data-reset>Начать заново</button>
            </div>
          </form>
          <div data-done></div>
        </section>` : `
        <section class="practice"><p style="margin:0 0 14px">В этом уроке нет заданий: это обзор на будущее. Прочитайте примеры вслух и отметьте урок.</p>
          <button class="btn btn--primary" type="button" data-mark>${icon("check")}${state.done[id] !== undefined ? "Пройден" : "Отметить как пройденный"}</button></section>`}
        <nav class="pager" aria-label="Соседние уроки">
          ${prev ? `<a href="#/lesson/${prev.id}"><small>Назад</small><span>${prev.id}. ${esc(prev.t)}</span></a>` : ""}
          ${next ? `<a class="next" href="#/lesson/${next.id}"><small>Дальше</small><span>${next.id}. ${esc(next.t)}</span></a>` : ""}
        </nav>
      </article>`;
    document.title = `${l.id}. ${l.t} · Грамматика`;

    // Таблицы прокручиваются по горизонтали на узком экране
    $main.querySelectorAll(".lesson-body table").forEach((t) => { const w = document.createElement("div"); w.className = "table-wrap"; t.replaceWith(w); w.appendChild(t); });
    // Английские курсивные примеры можно послушать
    $main.querySelectorAll(".lesson-body i").forEach((el) => {
      if (!/[a-z]/i.test(el.textContent) || /[а-яё]/i.test(el.textContent)) return;
      el.classList.add("say");
      el.tabIndex = 0;
      el.setAttribute("role", "button");
      const go = () => say(el.textContent, el);
      el.addEventListener("click", go);
      el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    });

    const mark = $main.querySelector("[data-mark]");
    if (mark) mark.addEventListener("click", () => { state.done[id] = 0; save(); refreshChrome(id); mark.innerHTML = icon("check") + "Пройден"; toast("Урок отмечен"); });

    const form = $main.querySelector("[data-form]");
    if (!form) return;
    const results = {};
    const check = (i, quiet) => {
      const box = form.querySelector(`[data-task="${i}"]`);
      const input = box.querySelector("input");
      const fb = box.querySelector(".task__fb");
      const t = l.tasks[i];
      state.answers[id] = Object.assign(state.answers[id] || {}, { [i]: input.value });
      if (!input.value.trim()) { if (!quiet) input.focus(); return; }
      const ok = isRight(t, input.value);
      results[i] = ok;
      box.classList.remove("is-ok", "is-bad");
      void box.offsetWidth;
      box.classList.add(ok ? "is-ok" : "is-bad");
      fb.innerHTML = ok ? `${icon("check")} Верно` : `Правильно: <span class="right">${esc(t.a)}</span><button type="button" data-accept="${i}">Мой ответ тоже верный</button>`;
      if (!quiet && navigator.vibrate && !ok) navigator.vibrate(12);
      updateScore();
    };
    const updateScore = () => {
      const keys = Object.keys(results);
      const ok = keys.filter((k) => results[k]).length;
      form.closest(".practice").querySelector("[data-score]").textContent = keys.length ? `Верно ${ok} из ${l.tasks.length}` : "";
      save();
      if (keys.length === l.tasks.length) finish(ok);
    };
    const finish = (ok) => {
      const passed = ok / l.tasks.length >= PASS;
      const box = form.closest(".practice").querySelector("[data-done]");
      if (passed) {
        const firstTime = state.done[id] === undefined;
        state.done[id] = Math.max(state.done[id] || 0, ok);
        save();
        refreshChrome(id);
        box.innerHTML = `<div class="done-banner"><img src="assets/mascot/fox-party.webp" alt=""><div>Урок пройден! ${ok} из ${l.tasks.length}.${next ? ` <a href="#/lesson/${next.id}">Следующий урок</a>` : " Вы прошли весь курс!"}</div></div>`;
        if (firstTime) toast(`Урок ${id} пройден`);
      } else {
        box.innerHTML = `<div class="done-banner" style="background:var(--bad-soft)"><img src="assets/mascot/fox-think.webp" alt=""><div>Пока ${ok} из ${l.tasks.length}. Перечитайте правило и красный блок с ошибками, потом нажмите «Начать заново».</div></div>`;
      }
    };
    form.addEventListener("submit", (e) => { e.preventDefault(); l.tasks.forEach((_, i) => check(i, true)); const first = form.querySelector("input:placeholder-shown"); if (first) first.focus(); });
    form.addEventListener("click", (e) => {
      const c = e.target.closest("[data-check]");
      if (c) check(Number(c.dataset.check));
      const a = e.target.closest("[data-accept]");
      if (a) {
        const i = Number(a.dataset.accept);
        results[i] = true;
        const box = form.querySelector(`[data-task="${i}"]`);
        box.classList.remove("is-bad"); box.classList.add("is-ok");
        box.querySelector(".task__fb").innerHTML = `${icon("check")} Засчитано`;
        updateScore();
      }
    });
    form.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" || e.target.tagName !== "INPUT") return;
      e.preventDefault();
      const i = Number(e.target.closest("[data-task]").dataset.task);
      check(i);
      const nextInput = form.querySelector(`#t${i + 1}`);
      if (nextInput && e.target.value.trim()) nextInput.focus();
    });
    form.querySelector("[data-reset]").addEventListener("click", () => {
      delete state.answers[id];
      save();
      renderLesson(id);
      $main.querySelector("#t0").focus();
    });
    // Сохранённые ответы проверяем сразу, чтобы был виден результат
    l.tasks.forEach((_, i) => { if (saved[i]) check(i, true); });
  }

  function refreshChrome(id) { renderSide(id); renderTotals(); }

  /* ---------- Маршрутизация ---------- */
  function route() {
    const m = location.hash.match(/^#\/lesson\/(\d+)/);
    const id = m ? Number(m[1]) : 0;
    if (location.hash === "#levels") { renderHome(); document.getElementById("levels").scrollIntoView(); }
    else if (id) renderLesson(id);
    else renderHome();
    renderSide(id);
    renderTotals();
    setMenu(false);
    if (location.hash !== "#levels") scrollTo({ top: 0 });
    $main.focus({ preventScroll: true });
  }
  addEventListener("hashchange", route);
  route();
})();
