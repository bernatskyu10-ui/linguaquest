/* ==========================================================================
   Анимации. Motion: появления, пружины, наклон лисы.
   Anime.js: кольца прогресса, счёт на итоге, конфетти.
   Если библиотеки не загрузились, все функции пустые и работает CSS-запасной вариант.
   ========================================================================== */
(() => {
  const M = window.Motion, A = window.anime;
  const noop = () => {};
  const API = ["home", "rise", "tabs", "tabMove", "cards", "card", "fb", "pop", "tile", "result", "icon"];
  if (!(M && M.animate && M.stagger && A && A.animate)) { window.FX = Object.fromEntries(API.map((k) => [k, noop])); return; }
  document.documentElement.classList.add("fx");

  const calm = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = () => matchMedia("(hover: hover) and (pointer: fine)").matches;
  const EASE = [0.23, 1, 0.32, 1];
  const T = (x = 0, y = 0, s = 1) => `translate(${x}px, ${y}px) scale(${s})`;
  const list = (els) => (els == null ? [] : els.nodeType ? [els] : Array.from(els)).filter(Boolean);
  // После анимации убираем инлайн-стили, чтобы снова работали :hover и :active из CSS
  const clear = (els) => els.forEach((e) => { e.style.transform = ""; e.style.opacity = ""; });
  const done = (c, fn) => { const p = c && (c.finished || c); if (p && p.then) p.then(fn, fn); };

  // Появление: прозрачность и небольшой сдвиг; при «меньше движения» только прозрачность
  function rise(els, { x = 0, y = 10, s = 1, d = 0.26, gap = 0.04, delay = 0 } = {}) {
    els = list(els);
    if (!els.length) return;
    const kf = calm() ? { opacity: [0, 1] } : { opacity: [0, 1], transform: [T(x, y, s), T()] };
    done(M.animate(els, kf, { duration: calm() ? 0.15 : d, ease: EASE, delay: M.stagger(gap, { startDelay: delay }) }), () => clear(els));
  }

  /* ---------- Главная ---------- */
  function home(root) {
    const hero = root.querySelector(".hero");
    if (hero) {
      // Заголовок появляется по словам
      const h1 = hero.querySelector("h1");
      h1.innerHTML = h1.textContent.split(" ").map((w) => `<span class="w">${w}</span>`).join(" ");
      rise(h1.children, { y: 14, d: 0.5, gap: 0.045 });
      rise(hero.querySelectorAll("p, .hero__actions"), { y: 10, d: 0.45, gap: 0.07, delay: 0.25 });
      const art = hero.querySelector(".hero__art");
      const img = art.querySelector("img");
      const note = art.querySelector(".hero__note");
      if (calm()) { rise([art], { d: 0.2 }); note.classList.add("is-struck"); }
      else {
        done(M.animate(art, { opacity: [0, 1], transform: ["translateY(18px) scale(0.96)", "translateY(0px) scale(1)"] }, { type: "spring", duration: 0.7, bounce: 0.2, delay: 0.1 }), () => clear([art]));
        rise(note, { y: 12, d: 0.4, delay: 0.5 });
        // Сначала зачёркиваем неправильный порядок слов, потом показываем правильный
        setTimeout(() => note.classList.add("is-struck"), 850);
        if (fine()) {
          const tilt = (rx, ry) => M.animate(img, { transform: `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)` }, { type: "spring", duration: 0.5, bounce: 0.15 });
          art.addEventListener("pointermove", (e) => {
            const r = art.getBoundingClientRect();
            tilt(-((e.clientY - r.top) / r.height - 0.5) * 12, ((e.clientX - r.left) / r.width - 0.5) * 12);
          });
          art.addEventListener("pointerleave", () => tilt(0, 0));
        }
      }
    }
    rise(root.querySelectorAll(".how__item"), { y: 10, gap: 0.06, delay: 0.35, d: 0.3 });
    rise(root.querySelector(".section-title"), { y: 8, delay: 0.45 });
  }

  /* ---------- Уровни: подсветка переезжает за счёт clip-path копии ---------- */
  function tabs(wrap) {
    if (!wrap || wrap._place) return;
    const copy = document.createElement("div");
    copy.className = "tabs__copy";
    copy.setAttribute("aria-hidden", "true");
    copy.innerHTML = Array.from(wrap.querySelectorAll("[data-lv]")).map((b) => `<button class="tab" type="button" tabindex="-1">${b.innerHTML}</button>`).join("");
    wrap.appendChild(copy);
    wrap._place = (instant) => {
      const on = wrap.querySelector("[data-lv].is-on");
      if (!on) return;
      const last = wrap.querySelector("[data-lv]:last-of-type");
      const W = last.offsetLeft + last.offsetWidth;
      copy.style.width = W + "px";
      if (instant) copy.style.transition = "none";
      copy.style.clipPath = `inset(0 ${W - on.offsetLeft - on.offsetWidth}px 0 ${on.offsetLeft}px round 99px)`;
      if (instant) { void copy.offsetWidth; copy.style.transition = ""; }
    };
    wrap._place(true);
    addEventListener("resize", () => wrap.isConnected && wrap._place(true));
  }
  const tabMove = (wrap) => wrap && wrap._place && wrap._place();

  // Карточки тем: появление лесенкой и заполнение колец
  function cards(box) {
    rise(box.children, { y: 8, s: 0.985, d: 0.28, gap: 0.03 });
    if (calm()) return;
    box.querySelectorAll(".ring").forEach((r, i) => {
      const p = Number(r.style.getPropertyValue("--p")) || 0;
      if (!p) return;
      // Через WAAPI (--p зарегистрирована в CSS): идёт вне главного потока и не зависнет на нуле в фоне
      A.waapi.animate(r, { "--p": [0, p], duration: 800, delay: 150 + i * 30, ease: "out(4)" });
    });
  }

  /* ---------- Задания ---------- */
  // Новая карточка: первая поднимается, следующие въезжают справа
  const card = (el, first) => rise(el, first ? { y: 10, d: 0.28 } : { x: 18, y: 0, d: 0.24 });

  function fb(el, ok) {
    if (!el) return;
    if (ok && !calm()) done(M.animate(el, { opacity: [0, 1], transform: ["scale(0.96)", "scale(1)"] }, { type: "spring", duration: 0.4, bounce: 0.3 }), () => clear([el]));
    else rise(el, { y: 6, d: 0.22 });
    // Слова в разборе ошибок проявляются по одному: видно, где именно ошибка
    rise(el.querySelectorAll(".diff span"), { y: 4, d: 0.2, gap: 0.035, delay: 0.1 });
  }
  function pop(el) {
    if (!el || calm()) return;
    done(M.animate(el, { transform: ["scale(0.8)", "scale(1)"] }, { type: "spring", duration: 0.35, bounce: 0.4 }), () => clear([el]));
  }
  function tile(el) {
    if (!el) return;
    done(M.animate(el, calm() ? { opacity: [0, 1] } : { opacity: [0, 1], transform: ["scale(0.92)", "scale(1)"] }, { duration: 0.16, ease: EASE }), () => clear([el]));
  }

  /* ---------- Итог ---------- */
  function result(el, score, total, party) {
    rise(el, { y: 12, s: 0.98, d: 0.32 });
    rise(el.querySelectorAll(".result__text, .next-row, .mist > div"), { y: 8, d: 0.28, gap: 0.05, delay: 0.25 });
    if (calm()) return;
    const n = el.querySelector(".result__score");
    const o = { v: 0 };
    A.animate(o, { v: [0, score], duration: 900, delay: 150, ease: "outExpo", onUpdate: () => { n.textContent = `${Math.round(o.v)} / ${total}`; } });
    if (party) setTimeout(() => confetti(el), 350);
  }
  function confetti(host) {
    const layer = document.createElement("div");
    layer.className = "confetti";
    layer.setAttribute("aria-hidden", "true");
    const colors = ["var(--accent)", "var(--ok)", "#ffc83d", "#5b7cfa", "#ff7ab6"];
    const bits = Array.from({ length: 34 }, (_, i) => {
      const b = document.createElement("i");
      b.style.background = colors[i % colors.length];
      if (i % 3 === 0) b.style.borderRadius = "50%";
      layer.appendChild(b);
      return b;
    });
    host.appendChild(layer);
    const R = A.utils.random;
    A.animate(bits, {
      x: () => R(-190, 190),
      y: [{ to: () => R(-150, -60), duration: 450, ease: "outQuad" }, { to: () => R(60, 170), duration: 850, ease: "inQuad" }],
      rotate: () => R(-320, 320),
      opacity: [{ to: 1, duration: 50 }, { to: 0, duration: 450, delay: 800 }],
      duration: 1300,
      ease: "outCubic",
      delay: A.stagger(6),
      onComplete: () => layer.remove(),
    });
  }

  // Смена иконки темы
  function icon(el) {
    if (!el || calm()) return;
    M.animate(el, { opacity: [0, 1], transform: ["rotate(-70deg) scale(0.8)", "rotate(0deg) scale(1)"] }, { duration: 0.24, ease: EASE });
  }

  window.FX = { home, rise, tabs, tabMove, cards, card, fb, pop, tile, result, icon };
})();
