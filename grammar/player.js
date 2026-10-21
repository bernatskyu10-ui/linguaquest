/* ==========================================================================
   Видео-разбор темы «за минуту»: сцены собираются из объяснения урока
   (шаги, формула, типичные ошибки). Таймер-кольцо, главы, печать перевода,
   озвучка английских фраз, пауза, скорость, перемотка по сценам.
   ========================================================================== */
(() => {
  const M = window.Motion;
  const EASE = [0.23, 1, 0.32, 1];
  const calm = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const clean = (s) => String(s).replace(/\s*[—–]\s*/g, " - ");
  const CHAPS = { mean: "Смысл", build: "Строим", ex: "Примеры", err: "Ошибка", go: "Твой ход" };
  const SPEEDS = [1, 1.25, 1.5, 0.75];

  /* ---------- Разбор данных урока ---------- */
  const latin = (s) => (String(s).match(/-?[A-Za-z][A-Za-z']*/g) || []).map((w) => w.toLowerCase());
  // Подсветка: слова из заголовка шага или формулы; «-s», «-ing» подсвечивают окончания
  function hl(text, keys) {
    if (!keys.length) return esc(text);
    const set = new Set(keys.filter((k) => k[0] !== "-"));
    const suf = keys.filter((k) => k[0] === "-" && k.length > 1).map((k) => k.slice(1));
    return String(text).split(/(\s+)/).map((tok) => {
      const w = tok.toLowerCase().replace(/[^a-z']/g, "");
      if (!w) return esc(tok);
      if (set.has(w)) return `<em>${esc(tok)}</em>`;
      const s = suf.find((x) => w.length > x.length + 2 && w.endsWith(x));
      if (s) { const cut = tok.toLowerCase().lastIndexOf(s); return esc(tok.slice(0, cut)) + `<em>${esc(tok.slice(cut, cut + s.length))}</em>` + esc(tok.slice(cut + s.length)); }
      return esc(tok);
    }).join("");
  }
  // В правильном варианте подсвечиваем то, чего не было в ошибочном
  function hlDiff(right, wrong) {
    const was = new Set(latin(wrong));
    return String(right).split(/(\s+)/).map((tok) => {
      const w = tok.toLowerCase().replace(/[^a-z']/g, "");
      return w && !was.has(w) ? `<em>${esc(tok)}</em>` : esc(tok);
    }).join("");
  }
  const firstSentence = (t) => {
    const s = clean(t || "");
    const m = s.match(/^.{20,150}?[.!?](\s|$)/);
    return (m ? m[0] : s.length > 150 ? s.slice(0, 147) + "..." : s).trim();
  };

  function parseBody(body) {
    const d = document.createElement("div");
    d.innerHTML = body || "";
    const strip = (h) => { const t = document.createElement("div"); t.innerHTML = h; return clean(t.textContent).replace(/\s+/g, " ").trim(); };
    // Формула: строки внутри блока (через <br>) или пункты через «|» и «·»
    const formulas = [...d.querySelectorAll(".formula")].map((e) => e.innerHTML.split(/<br\s*\/?>|\s\|\s|\s·\s/i).map(strip).filter(Boolean)).filter((x) => x.length);
    const errs = [...d.querySelectorAll(".err")].flatMap((e) => e.textContent.split("❌").slice(1)
      .map((p) => p.split(/→\s*✅/).map((s) => s.replace(/ /g, " ").trim()))
      .filter((x) => x.length === 2 && x[0] && x[1]));
    return { formulas, errs };
  }

  /* ---------- Сцены ---------- */
  // Элемент сцены: {at: мс от начала сцены, html, cls, type: русский текст для печати, say: английский для озвучки}
  const readMs = (s) => 900 + String(s).length * 42;
  const typeMs = (s) => 300 + String(s).length * 32;

  function exItems(ex, keys, start) {
    const out = [];
    let t = start;
    for (const [en, ru] of ex.slice(0, 2)) {
      const phrase = en.split(" → ").pop();
      out.push({ at: t, cls: "pl-en", html: hl(clean(en), keys), say: phrase });
      out.push({ at: t + 550, cls: "pl-ru", type: "= " + clean(ru) });
      t += 550 + Math.max(readMs(en), typeMs(ru)) + 250;
    }
    return { items: out, end: t };
  }

  function build(lesson, plus, num) {
    const { formulas, errs } = parseBody(lesson.body);
    const steps = plus ? plus.steps : [];
    // Нет формулы в шпаргалке: ищем «... + ...» в заголовках и текстах шагов
    if (!formulas.length) {
      // Сначала заголовки, потом тексты; формула должна содержать английское слово или «глагол»
      const pool = steps.map((st) => st.h.replace(/^Шаг \d+\.\s*/, "")).concat(steps.map((st) => st.t || ""));
      for (const x of pool) {
        const m = clean(x).match(/([^.:;!?«»(),]{2,}\s\+\s[^.:;!?«»(),]+)/);
        const f = m && m[1].split(/\s[=→]\s/)[0].replace(/^(Формула|берём|Схема)\s+/i, "").trim();
        if (f && f.length <= 60 && /[A-Za-z]{2,}|глагол|форм/i.test(f)) { formulas.push([f]); break; }
      }
    }
    // Нет блока ошибок: берём задания «Исправьте» из разминки
    if (!errs.length && plus) {
      plus.tasks.filter((t) => t.k === "fix").forEach((t) => {
        const right = Array.isArray(t.a) ? t.a[0] : t.a;
        errs.push([clean(t.q.replace(/^Исправьте:\s*/, "")), /[.!?]$/.test(right) ? right : right + "."]);
      });
    }
    const fKeys = formulas.length ? latin(formulas[0].join(" ")) : [];
    const scenes = [];

    // 1. Заставка
    scenes.push({ chap: "mean", hold: 1300, items: [
      { at: 0, cls: "pl-tag", html: `${esc(lesson.lvl === "C1" ? "C1-C2" : lesson.lvl)} · тема ${num}` },
      { at: 200, cls: "pl-title", html: hl(clean(lesson.t), latin(lesson.t)) },
      { at: 750, cls: "pl-sub", html: "разбор за минуту" },
    ] });

    // 2. Смысл: первый шаг
    const stepScene = (s, chap) => {
      const keys = latin(s.h).length ? latin(s.h) : fKeys;
      const head = clean(s.h.replace(/^Шаг \d+\.\s*/, ""));
      const items = [{ at: 0, cls: "pl-head", html: hl(head, keys) }];
      let t = 450;
      const txt = firstSentence(s.t);
      if (txt) { items.push({ at: t, cls: "pl-text", html: esc(txt) }); t += readMs(txt) * 0.6; }
      const ex = exItems(s.ex || [], keys, t);
      return { chap, hold: 1500, items: items.concat(ex.items) };
    };
    if (steps[0]) scenes.push(stepScene(steps[0], "mean"));

    // 3. Строим: формула блоками через «+» (или «→»), а список вариантов - столбиком
    if (formulas.length) {
      const lines = formulas[0].slice(0, 4);
      const items = [{ at: 0, cls: "pl-head", html: "Как строится" }];
      let t = 400;
      if (lines.length > 1) {
        lines.forEach((ln, i) => { items.push({ at: t, cls: `pl-block pl-block--line pl-block--${i % 3}`, html: hl(ln, latin(ln)), pop: true }); t += 650 + ln.length * 18; });
      } else {
        const ln = lines[0];
        const sep = /\s\+\s/.test(ln) ? "+" : /\s→\s/.test(ln) ? "→" : "";
        const parts = sep ? ln.split(sep === "+" ? /\s\+\s/ : /\s→\s/).map((p) => p.trim()).filter(Boolean) : [ln];
        parts.forEach((p, i) => {
          if (i) { items.push({ at: t, cls: "pl-plus", html: sep }); t += 220; }
          items.push({ at: t, cls: `pl-block pl-block--${i % 3}`, html: hl(p, latin(p)), pop: true });
          t += 480;
        });
      }
      const src = (steps[1] && steps[1].ex[0]) || (steps[0] && steps[0].ex[0]);
      if (src) items.push(...exItems([src], fKeys, t + 200).items);
      scenes.push({ chap: "build", hold: 1700, items, stack: true });
    }

    // 4. Остальные шаги
    steps.slice(1).forEach((s) => scenes.push(stepScene(s, "ex")));

    // 5. Ошибки
    if (errs.length) {
      const items = [{ at: 0, cls: "pl-head pl-head--bad", html: "Главная ошибка" }];
      let t = 500;
      errs.slice(0, 2).forEach(([bad, good]) => {
        items.push({ at: t, cls: "pl-wrong", html: `<i>✕</i><span>${esc(bad)}</span>` });
        items.push({ at: t + 700, cls: "pl-right", html: `<i>✓</i><span>${hlDiff(good, bad)}</span>`, say: good });
        t += 700 + readMs(good) + 400;
      });
      scenes.push({ chap: "err", hold: 1600, items });
    }

    // 6. Финал
    scenes.push({ chap: "go", hold: Infinity, final: true, items: [
      { at: 0, cls: "pl-title", html: "Теперь <em>сам</em>" },
      { at: 350, cls: "pl-sub", html: "Разминка и перевод закрепят правило" },
      { at: 700, cls: "pl-actions", html: `<a class="pl-btn pl-btn--main" href="#/t/${lesson.id}/warm" data-pl-go>Разминка</a><button class="pl-btn" type="button" data-pl-again>Ещё раз</button>` },
    ] });

    scenes.forEach((s) => {
      const last = s.items[s.items.length - 1];
      const lastLen = last.type ? typeMs(last.type) : last.say ? readMs(last.say) : 700;
      s.dur = s.final ? Infinity : Math.max(...s.items.map((it) => it.at)) + lastLen + s.hold;
    });
    return scenes;
  }

  /* ---------- Плеер ---------- */
  const ICON = {
    close: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    play: '<svg viewBox="0 0 24 24"><path d="M8 5.5v13l10.5-6.5z" class="f"/></svg>',
    pause: '<svg viewBox="0 0 24 24"><path d="M8 5v14M16 5v14"/></svg>',
    prev: '<svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>',
    next: '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
    sound: '<svg viewBox="0 0 24 24"><path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z" class="f"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg>',
    mute: '<svg viewBox="0 0 24 24"><path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z" class="f"/><path d="M16 10l4 4M20 10l-4 4"/></svg>',
  };
  const GRID = `<svg class="pl-grid" aria-hidden="true" preserveAspectRatio="none"><defs>
    <filter id="pl-wobble"><feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="9"/></filter>
    <pattern id="pl-cells" width="88" height="96" patternUnits="userSpaceOnUse"><path d="M88 0V96M0 96H88" fill="none" stroke="currentColor" stroke-width="1.8"/></pattern></defs>
    <rect x="-20" y="-20" width="110%" height="110%" fill="url(#pl-cells)" filter="url(#pl-wobble)"/></svg>`;

  let open = null;

  function play(lesson, plus, num, opts = {}) {
    if (open) open.close();
    const scenes = build(lesson, plus, num);
    const chapKeys = [...new Set(scenes.map((s) => s.chap))];
    const finite = scenes.filter((s) => isFinite(s.dur));
    const total = finite.reduce((a, s) => a + s.dur, 0);
    const startOf = scenes.map((_, i) => scenes.slice(0, i).reduce((a, s) => a + (isFinite(s.dur) ? s.dur : 0), 0));

    const root = document.createElement("div");
    root.className = "pl";
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-label", `Разбор темы: ${lesson.t}`);
    root.innerHTML = `${GRID}
      <div class="pl-top">
        <div class="pl-ring"><svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="28" class="pl-ring__bg"/><circle cx="32" cy="32" r="28" class="pl-ring__fg"/></svg><b data-pl-sec></b></div>
        <div class="pl-chaps">${chapKeys.map((k) => `<span data-chap="${k}">${CHAPS[k]}</span>`).join("")}</div>
      </div>
      <div class="pl-stage" data-pl-stage aria-live="polite"></div>
      <div class="pl-bottom">
        <div class="pl-bar"><i data-pl-bar></i></div>
        <div class="pl-ctrl">
          <button class="pl-ic" type="button" data-pl-close aria-label="Закрыть">${ICON.close}</button>
          <span class="pl-sp"></span>
          <button class="pl-ic" type="button" data-pl-prev aria-label="Предыдущий слайд">${ICON.prev}</button>
          <button class="pl-ic pl-ic--big" type="button" data-pl-play aria-label="Пауза">${ICON.pause}</button>
          <button class="pl-ic" type="button" data-pl-next aria-label="Следующий слайд">${ICON.next}</button>
          <span class="pl-sp"></span>
          <button class="pl-ic" type="button" data-pl-sound aria-label="Звук">${ICON.sound}</button>
          <button class="pl-speed" type="button" data-pl-speed aria-label="Скорость">1×</button>
        </div>
      </div>`;
    document.body.appendChild(root);
    document.documentElement.classList.add("pl-lock");
    const $ = (s) => root.querySelector(s);
    const stage = $("[data-pl-stage]"), fg = $(".pl-ring__fg"), sec = $("[data-pl-sec]"), bar = $("[data-pl-bar]");
    const C = 2 * Math.PI * 28;
    fg.style.strokeDasharray = C;

    let idx = 0, el = 0, playing = true, speed = 1, sound = opts.sound !== false, raf = 0, last = 0, shown = [];
    const speak = (t) => { if (sound && opts.speak) opts.speak(t, Math.min(1.4, 0.9 * speed)); };
    const hush = () => { if (opts.hush) opts.hush(); };

    function renderScene(i) {
      idx = i; el = 0; shown = [];
      hush();
      const s = scenes[i];
      stage.innerHTML = `<div class="pl-scene ${s.stack ? "pl-scene--stack" : ""}">${s.items.map((it, k) => `<div class="pl-it ${it.cls}" data-k="${k}">${it.type ? `<span class="pl-type"></span><span class="pl-caret"></span>` : it.html}</div>`).join("")}</div>`;
      root.querySelectorAll("[data-chap]").forEach((c) => {
        const ci = chapKeys.indexOf(c.dataset.chap), cur = chapKeys.indexOf(s.chap);
        c.className = ci < cur ? "is-done" : ci === cur ? "is-on" : "";
      });
      const go = stage.querySelector("[data-pl-go]");
      if (go) go.addEventListener("click", () => close());
      const again = stage.querySelector("[data-pl-again]");
      if (again) again.addEventListener("click", () => { renderScene(0); setPlaying(true); });
      tick(0);
    }

    function reveal(node, it) {
      node.classList.add("is-in");
      if (it.say) speak(it.say);
      if (!M || calm()) return;
      const kf = it.pop
        ? { opacity: [0, 1], transform: ["scale(0.86)", "scale(1)"] }
        : { opacity: [0, 1], transform: ["translateY(14px)", "translateY(0px)"] };
      const o = it.pop ? { type: "spring", duration: 0.45, bounce: 0.35 } : { duration: 0.35, ease: EASE };
      M.animate(node, kf, o);
    }

    function tick(dt) {
      const s = scenes[idx];
      el += dt * speed;
      s.items.forEach((it, k) => {
        const node = stage.querySelector(`[data-k="${k}"]`);
        if (!node) return;
        if (!shown[k] && el >= it.at) { shown[k] = true; reveal(node, it); }
        if (it.type && shown[k]) {
          const n = Math.min(it.type.length, Math.floor((el - it.at) / 32));
          const t = node.querySelector(".pl-type");
          if (t.textContent.length !== n) t.textContent = it.type.slice(0, n);
          node.classList.toggle("is-typing", n < it.type.length);
        }
      });
      const done = startOf[idx] + Math.min(el, isFinite(s.dur) ? s.dur : 0);
      const left = s.final ? 0 : Math.max(0, total - done);
      sec.textContent = Math.ceil(left / 1000);
      fg.style.strokeDashoffset = String(C * (1 - left / total));
      bar.style.transform = `scaleX(${s.final ? 1 : done / total})`;
      if (isFinite(s.dur) && el >= s.dur) renderScene(idx + 1);
      // Финальный слайд: дорисовали кнопки и остановились
      else if (s.final && playing && shown.length === s.items.length && shown.every(Boolean)) setPlaying(false, true);
    }

    function loop(now) {
      const dt = last ? Math.min(100, now - last) : 0;
      last = now;
      if (playing) tick(dt);
      raf = requestAnimationFrame(loop);
    }

    function setPlaying(p, quiet) {
      playing = p;
      const b = $("[data-pl-play]");
      b.innerHTML = p ? ICON.pause : ICON.play;
      b.setAttribute("aria-label", p ? "Пауза" : "Смотреть");
      root.classList.toggle("is-paused", !p && !quiet);
      if ("speechSynthesis" in window) p ? speechSynthesis.resume() : speechSynthesis.pause();
    }

    function close() {
      cancelAnimationFrame(raf);
      hush();
      if ("speechSynthesis" in window) speechSynthesis.resume();
      removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", onVis);
      document.documentElement.classList.remove("pl-lock");
      const node = root;
      open = null;
      if (M && !calm()) M.animate(node, { opacity: [1, 0] }, { duration: 0.18 }).then(() => node.remove());
      else node.remove();
      if (opts.onClose) opts.onClose();
    }

    const prev = () => renderScene(el > 1500 || idx === 0 ? idx : idx - 1);
    const next = () => { if (idx < scenes.length - 1) renderScene(idx + 1); };
    function onKey(e) {
      if (e.key === "Escape") close();
      else if (e.key === " " || e.key === "k") { e.preventDefault(); setPlaying(!playing); }
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    }
    const onVis = () => { if (document.hidden && playing) setPlaying(false); };

    $("[data-pl-close]").addEventListener("click", close);
    $("[data-pl-play]").addEventListener("click", () => {
      if (scenes[idx].final) { renderScene(0); setPlaying(true); return; }
      setPlaying(!playing);
    });
    $("[data-pl-prev]").addEventListener("click", prev);
    $("[data-pl-next]").addEventListener("click", next);
    $("[data-pl-speed]").addEventListener("click", (e) => {
      speed = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length];
      e.currentTarget.textContent = `${speed}×`;
    });
    $("[data-pl-sound]").addEventListener("click", (e) => {
      sound = !sound;
      if (!sound) hush();
      e.currentTarget.innerHTML = sound ? ICON.sound : ICON.mute;
      e.currentTarget.setAttribute("aria-label", sound ? "Выключить звук" : "Включить звук");
    });
    // Нажатие на сам слайд: пауза / продолжить
    stage.addEventListener("click", (e) => { if (!e.target.closest("a, button") && !scenes[idx].final) setPlaying(!playing); });
    addEventListener("keydown", onKey);
    document.addEventListener("visibilitychange", onVis);

    if (M && !calm()) M.animate(root, { opacity: [0, 1] }, { duration: 0.22 });
    renderScene(0);
    raf = requestAnimationFrame(loop);
    $("[data-pl-play]").focus({ preventScroll: true });
    open = { close };
  }

  window.PLAYER = { play, build };
})();
