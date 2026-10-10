/* ==========================================================================
   LinguaQuest - визуальные эффекты
   - Confetti: конфетти на canvas (правильные ответы и завершение урока)
   - Background: плавающие фигуры фона с лёгким параллаксом за курсором
   - Reveal: появление элементов при прокрутке (IntersectionObserver)
   - Toast: всплывающие уведомления
   ========================================================================== */

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Confetti = (() => {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  const COLORS = ["#ff6b4a", "#ffb547", "#5b8cff", "#8f7bff", "#2ec4a6", "#ff8f6b", "#ffffff"];
  let parts = [];
  let raf = null;
  let dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
  }
  resize();
  window.addEventListener("resize", resize);

  // Создаёт частицы. x, y - точка вылета в долях экрана
  function burst({ x = 0.5, y = 0.6, count = 80, spread = 70, power = 13 } = {}) {
    if (reducedMotion()) return;
    for (let i = 0; i < count; i++) {
      const angle = (-90 + (Math.random() - 0.5) * spread * 2) * (Math.PI / 180);
      const speed = power * (0.45 + Math.random() * 0.75);
      parts.push({
        x: x * innerWidth,
        y: y * innerHeight,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        w: 6 + Math.random() * 7,
        h: 8 + Math.random() * 10,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.35,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        shape: Math.random() < 0.3 ? "circle" : "rect",
        life: 0,
        ttl: 110 + Math.random() * 60
      });
    }
    if (!raf) raf = requestAnimationFrame(tick);
  }

  // Большой праздничный залп с двух сторон
  function celebrate() {
    burst({ x: 0.15, y: 0.75, count: 90, spread: 35, power: 18 });
    burst({ x: 0.85, y: 0.75, count: 90, spread: 35, power: 18 });
    setTimeout(() => burst({ x: 0.5, y: 0.5, count: 70, spread: 180, power: 10 }), 280);
  }

  function tick() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    parts = parts.filter((p) => p.life < p.ttl && p.y < innerHeight + 40);
    for (const p of parts) {
      p.life++;
      p.vy += 0.32;          // гравитация
      p.vx *= 0.985;         // сопротивление воздуха
      p.vy *= 0.985;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      const fade = p.life > p.ttl - 30 ? (p.ttl - p.life) / 30 : 1;
      ctx.save();
      ctx.globalAlpha = Math.max(0, fade);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.shape === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // "Переворот" ленточки создаёт эффект кружения
        ctx.fillRect(-p.w / 2, -p.h / 2 * Math.abs(Math.cos(p.life / 8)), p.w, p.h * Math.abs(Math.cos(p.life / 8)) + 1);
      }
      ctx.restore();
    }
    if (parts.length) raf = requestAnimationFrame(tick);
    else {
      raf = null;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
    }
  }

  return { burst, celebrate };
})();

const Background = (() => {
  const scene = document.getElementById("bgScene");
  // Расположение и вид фигур фона (в процентах экрана)
  const SHAPES = [
    { type: "ring", c: ["#8f7bff", "#5b8cff"], x: 4, y: 14, size: 120, depth: 18, delay: 0 },
    { type: "star", c: ["#ffb547", "#ff6b4a"], x: 84, y: 8, size: 60, depth: 28, delay: -4 },
    { type: "plus", c: ["#5b8cff", "#8f7bff"], x: 92, y: 60, size: 40, depth: 40, delay: -8 },
    { type: "squiggle", c: ["#ff6b4a", "#ffb547"], x: 3, y: 72, size: 110, depth: 24, delay: -2 },
    { type: "ring", c: ["#2ec4a6", "#5b8cff"], x: 72, y: 86, size: 70, depth: 34, delay: -6 },
    { type: "star", c: ["#8f7bff", "#ff8f6b"], x: 40, y: 22, size: 30, depth: 46, delay: -10 },
    { type: "plus", c: ["#ffb547", "#ff6b4a"], x: 50, y: 94, size: 36, depth: 20, delay: -12 }
  ];
  let els = [];
  let target = { x: 0, y: 0 };
  let pos = { x: 0, y: 0 };
  let raf = null;

  function init() {
    scene.innerHTML = "";
    els = SHAPES.map((s) => {
      const wrap = document.createElement("div");
      wrap.style.cssText = `position:absolute;left:${s.x}%;top:${s.y}%;width:${s.size}px;height:${s.size}px;will-change:transform;`;
      const inner = document.createElement("div");
      inner.className = "bg-shape";
      inner.style.cssText = `position:absolute;inset:0;animation-delay:${s.delay}s;`;
      inner.innerHTML = SVG.bgShape(s.type, s.c[0], s.c[1]);
      wrap.appendChild(inner);
      scene.appendChild(wrap);
      return { el: wrap, depth: s.depth };
    });

    // Параллакс за указателем (только на устройствах с мышью и без reduced-motion)
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reducedMotion()) {
      window.addEventListener("pointermove", (e) => {
        target.x = e.clientX / innerWidth - 0.5;
        target.y = e.clientY / innerHeight - 0.5;
        if (!raf) raf = requestAnimationFrame(step);
      }, { passive: true });
    }
  }

  // Плавно догоняем курсор (интерполяция), чтобы движение было мягким
  function step() {
    pos.x += (target.x - pos.x) * 0.06;
    pos.y += (target.y - pos.y) * 0.06;
    for (const s of els) {
      s.el.style.transform = `translate3d(${-pos.x * s.depth}px, ${-pos.y * s.depth}px, 0)`;
    }
    if (Math.abs(target.x - pos.x) > 0.001 || Math.abs(target.y - pos.y) > 0.001) raf = requestAnimationFrame(step);
    else raf = null;
  }

  return { init };
})();

const Reveal = (() => {
  let io = null;
  function observe(root = document) {
    const items = root.querySelectorAll(".reveal:not(.is-visible)");
    if (!("IntersectionObserver" in window) || reducedMotion()) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    if (!io) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        });
      }, { rootMargin: "0px 0px -40px 0px", threshold: 0.08 });
    }
    items.forEach((el) => io.observe(el));
  }
  return { observe };
})();

const Toast = (() => {
  const root = document.getElementById("toasts");
  function show({ title, text = "", icon = "", duration = 3200 }) {
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = `${icon}<div><div>${title}</div>${text ? `<small>${text}</small>` : ""}</div>`;
    root.appendChild(el);
    setTimeout(() => {
      el.classList.add("is-leaving");
      setTimeout(() => el.remove(), 240);
    }, duration);
  }
  return { show };
})();
