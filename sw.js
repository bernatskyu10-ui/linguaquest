/* ==========================================================================
   LinguaQuest - service worker
   Сохраняет приложение в кэш, чтобы после установки (на телефон или ПК)
   оно открывалось и работало без интернета. Работает только когда сайт
   открыт по адресу http(s), при открытии файла с диска не используется.
   Стратегия "сначала сеть": обновления видны сразу, кэш нужен для офлайна.
   ========================================================================== */
const VERSION = "lq-v21";
// Озвучка лежит в отдельном кэше: при обновлении приложения её не нужно качать заново
const AUDIO_CACHE = "lq-audio-v1";

importScripts("js/audio-manifest.js");

const CORE = [
  "./", "index.html", "russian.html", "manifest.webmanifest",
  "css/styles.css", "css/fonts.css",
  "js/data.js", "js/stories.js", "js/grammar.js", "js/explain.js", "js/ipa.js", "js/levels-data.js", "js/reference.js", "js/svg.js", "js/storage.js", "js/sync.js", "js/cloud.js", "js/audio-manifest.js", "js/audio.js",
  "js/effects.js", "js/exercises.js", "js/app.js",
  "assets/mascot/fox-main.webp", "assets/mascot/fox-wink.webp", "assets/mascot/fox-read.webp",
  "assets/mascot/fox-laugh.webp", "assets/mascot/fox-determined.webp", "assets/mascot/fox-back.webp",
  "assets/mascot/fox-sleep.webp", "assets/mascot/logo.webp", "assets/mascot/favicon-64.png", "assets/mascot/apple-touch-icon.png",
  "assets/mascot/fox-cheer.webp", "assets/mascot/fox-cry.webp", "assets/mascot/fox-surprised.webp", "assets/mascot/fox-think.webp",
  "assets/mascot/fox-party.webp", "assets/mascot/fox-readlaugh.webp", "assets/mascot/fox-cool.webp", "assets/mascot/fox-angry.webp",
  "assets/mascot/fox-love.webp", "assets/mascot/fox-sleepy.webp", "assets/mascot/fox-hello.webp", "assets/mascot/fox-worried.webp",
  "assets/mascot/icon-192.png", "assets/mascot/icon-512.png",
  // Шрифты: без них офлайн текст был бы системным шрифтом
  "assets/fonts/manrope-500-cyrillic-ext.woff2", "assets/fonts/manrope-500-cyrillic.woff2", "assets/fonts/manrope-500-latin-ext.woff2",
  "assets/fonts/manrope-500-latin.woff2", "assets/fonts/manrope-600-cyrillic-ext.woff2", "assets/fonts/manrope-600-cyrillic.woff2",
  "assets/fonts/manrope-600-latin-ext.woff2", "assets/fonts/manrope-600-latin.woff2", "assets/fonts/manrope-700-cyrillic-ext.woff2",
  "assets/fonts/manrope-700-cyrillic.woff2", "assets/fonts/manrope-700-latin-ext.woff2", "assets/fonts/manrope-700-latin.woff2",
  "assets/fonts/manrope-800-cyrillic-ext.woff2", "assets/fonts/manrope-800-cyrillic.woff2", "assets/fonts/manrope-800-latin-ext.woff2",
  "assets/fonts/manrope-800-latin.woff2", "assets/fonts/unbounded-500-cyrillic-ext.woff2", "assets/fonts/unbounded-500-cyrillic.woff2",
  "assets/fonts/unbounded-500-latin-ext.woff2", "assets/fonts/unbounded-500-latin.woff2", "assets/fonts/unbounded-700-cyrillic-ext.woff2",
  "assets/fonts/unbounded-700-cyrillic.woff2", "assets/fonts/unbounded-700-latin-ext.woff2", "assets/fonts/unbounded-700-latin.woff2"
];

// Установка: только сам интерфейс (около 1,5 МБ), чтобы приложение заработало сразу
self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    await cache.addAll(CORE);
    self.skipWaiting();
  })());
});

// Озвучку (около 18 МБ) докачиваем в фоне небольшими порциями. В режиме экономии
// трафика не качаем заранее: файлы сохранятся по мере прослушивания.
async function precacheAudio() {
  if (self.navigator && self.navigator.connection && self.navigator.connection.saveData) return;
  const manifest = typeof AUDIO_MANIFEST !== "undefined" ? AUDIO_MANIFEST : {};
  const cache = await caches.open(AUDIO_CACHE);
  const urls = Object.values(manifest).map((f) => new URL("assets/audio/" + f, self.registration.scope).href);
  for (let i = 0; i < urls.length; i += 6) {
    await Promise.allSettled(urls.slice(i, i + 6).map(async (u) => {
      if (await cache.match(u)) return;
      const res = await fetch(u);
      if (res.status === 200) await cache.put(u, res);
    }));
  }
}

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== VERSION && k !== AUDIO_CACHE && k !== "lq-remind").map((k) => caches.delete(k)));
    await self.clients.claim();
    precacheAudio().catch(() => {});
  })());
});

// Сначала сеть (чтобы обновления приходили сразу), без интернета - из кэша
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  event.respondWith((async () => {
    const isAudio = new URL(req.url).pathname.includes("/assets/audio/");
    // Озвучка не меняется: если файл уже есть, не тратим трафик
    if (isAudio) {
      const hit = await caches.match(req, { ignoreSearch: true });
      if (hit) return hit;
    }
    try {
      // Файлы приложения всегда сверяем с сервером (иначе браузер может отдать старую версию из своего HTTP-кэша)
      const res = await fetch(req, isAudio ? undefined : { cache: "no-cache" });
      // Частичные ответы (206, перемотка аудио) кэшировать нельзя
      if (res.status === 200) caches.open(isAudio ? AUDIO_CACHE : VERSION).then((c) => c.put(req, res.clone())).catch(() => {});
      return res;
    } catch (e) {
      const cached = await caches.match(req, { ignoreSearch: true });
      if (cached) return cached;
      // Страницу без интернета отдаём из кэша, а для картинок, звуков и шрифтов - честная ошибка
      if (req.mode === "navigate") return (await caches.match("index.html")) || Response.error();
      return Response.error();
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
