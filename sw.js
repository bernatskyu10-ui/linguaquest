/* ==========================================================================
   LinguaQuest - service worker
   Сохраняет приложение в кэш, чтобы после установки (на телефон или ПК)
   оно открывалось и работало без интернета. Работает только когда сайт
   открыт по адресу http(s), при открытии файла с диска не используется.
   Стратегия "сначала сеть": обновления видны сразу, кэш нужен для офлайна.
   ========================================================================== */
const VERSION = "lq-v4";

importScripts("js/audio-manifest.js");

const CORE = [
  "./", "index.html", "manifest.webmanifest",
  "css/styles.css", "css/fonts.css",
  "js/data.js", "js/grammar.js", "js/reference.js", "js/svg.js", "js/storage.js", "js/sync.js", "js/audio-manifest.js", "js/audio.js",
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
    await Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)));
    self.clients.claim();
  })());
});

// Сначала сеть (чтобы обновления приходили сразу), без интернета - из кэша
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  event.respondWith((async () => {
    try {
      const res = await fetch(req);
      if (res.ok) (await caches.open(VERSION)).put(req, res.clone());
      return res;
    } catch (e) {
      const cached = await caches.match(req, { ignoreSearch: true });
      return cached || (await caches.match("index.html")) || Response.error();
    }
  })());
});