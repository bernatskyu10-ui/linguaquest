/* ==========================================================================
   LinguaQuest - service worker
   Сохраняет приложение в кэш, чтобы после установки (на телефон или ПК)
   оно открывалось и работало без интернета. Работает только когда сайт
   открыт по адресу http(s), при открытии файла с диска не используется.
   Стратегия "сначала сеть": обновления видны сразу, кэш нужен для офлайна.
   ========================================================================== */
const VERSION = "lq-v7";

importScripts("js/audio-manifest.js");

const CORE = [
  "./", "index.html", "manifest.webmanifest",
  "css/styles.css", "css/fonts.css",
  "js/data.js", "js/stories.js", "js/grammar.js", "js/reference.js", "js/svg.js", "js/storage.js", "js/sync.js", "js/audio-manifest.js", "js/audio.js",
  "js/effects.js", "js/exercises.js", "js/app.js",
  "assets/mascot/fox-main.webp", "assets/mascot/fox-wink.webp", "assets/mascot/fox-read.webp",
  "assets/mascot/fox-laugh.webp", "assets/mascot/fox-determined.webp", "assets/mascot/fox-back.webp",
  "assets/mascot/fox-sleep.webp", "assets/mascot/fox-face.webp",
  "assets/mascot/fox-cheer.webp", "assets/mascot/fox-cry.webp", "assets/mascot/fox-surprised.webp", "assets/mascot/fox-think.webp",
  "assets/mascot/fox-party.webp", "assets/mascot/fox-readlaugh.webp", "assets/mascot/fox-cool.webp", "assets/mascot/fox-angry.webp",
  "assets/mascot/fox-love.webp", "assets/mascot/fox-sleepy.webp", "assets/mascot/fox-hello.webp", "assets/mascot/fox-worried.webp",
  "assets/mascot/icon-192.png", "assets/mascot/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    await cache.addAll(CORE);
    // Озвучку и шрифты докачиваем по возможности: сбой одного файла не ломает установку
    const manifest = typeof AUDIO_MANIFEST !== "undefined" ? AUDIO_MANIFEST : {};
    const extra = Object.values(manifest).map((f) => "assets/audio/" + f);
    await Promise.allSettled(extra.map((u) => cache.add(u)));
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== VERSION && k !== "lq-remind").map((k) => caches.delete(k)));
    self.clients.claim();
  })());
});

// Сначала сеть (чтобы обновления приходили сразу), без интернета - из кэша
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  event.respondWith((async () => {
    try {
      // Файлы приложения всегда сверяем с сервером (иначе браузер может отдать старую версию
      // из своего HTTP-кэша); озвучка не меняется, её берём как обычно
      const isAudio = new URL(req.url).pathname.includes("/assets/audio/");
      const res = await fetch(req, isAudio ? undefined : { cache: "no-cache" });
      // Частичные ответы (206, перемотка аудио) кэшировать нельзя
      if (res.status === 200) caches.open(VERSION).then((c) => c.put(req, res.clone())).catch(() => {});
      return res;
    } catch (e) {
      const cached = await caches.match(req, { ignoreSearch: true });
      return cached || (await caches.match("index.html")) || Response.error();
    }
  })());
});
/* ---------- Напоминание о занятии ----------
   Приложение кладёт в кэш "lq-remind" состояние: включено ли напоминание,
   время и день последнего занятия. Браузер иногда будит service worker
   (periodic background sync, установленное приложение в Chrome), и если
   время прошло, а сегодня занятий не было, показываем уведомление. */
function dayKey(date = new Date()) {
  return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
}

async function checkRemind() {
  const cache = await caches.open("lq-remind");
  const url = (name) => new URL("__remind/" + name, self.registration.scope).href;
  const r = await cache.match(url("state"));
  if (!r) return;
  const state = await r.json().catch(() => null);
  if (!state || !state.on) return;
  const now = new Date();
  const today = dayKey(now);
  const hhmm = String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0");
  if (hhmm < state.at || state.active === today) return;
  const n = await cache.match(url("notified"));
  if (n && (await n.text()) === today) return;
  await cache.put(url("notified"), new Response(today));
  await self.registration.showNotification("Время английского", {
    body: "Лиса ждёт: один короткий урок, и цель дня ближе",
    icon: "assets/mascot/icon-192.png",
    badge: "assets/mascot/icon-192.png",
    tag: "lq-remind"
  });
}

self.addEventListener("periodicsync", (event) => {
  if (event.tag === "lq-remind") event.waitUntil(checkRemind());
});

// Нажатие на уведомление открывает приложение
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil((async () => {
    const wins = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const w of wins) if ("focus" in w) return w.focus();
    return self.clients.openWindow(self.registration.scope);
  })());
});
