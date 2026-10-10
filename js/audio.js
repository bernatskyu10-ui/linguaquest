/* ==========================================================================
   LinguaQuest - звук
   Sound  - короткие звуковые эффекты, синтезируются через Web Audio API
            (никаких аудиофайлов, всё работает офлайн)
   Speech - озвучка английских слов и фраз через Web Speech API
   ========================================================================== */

const Sound = (() => {
  let ctx = null;
  let enabled = true;

  // Контекст создаётся лениво, после первого действия пользователя (требование браузеров)
  function ac() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  // Один тон с плавной огибающей
  function tone({ freq = 440, type = "sine", start = 0, dur = 0.15, vol = 0.18, slideTo = null }) {
    const c = ac();
    if (!c) return;
    const t0 = c.currentTime + start;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain).connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  const fx = {
    // Правильный ответ: два восходящих "колокольчика"
    correct() {
      tone({ freq: 784, type: "triangle", dur: 0.14, vol: 0.2 });
      tone({ freq: 1175, type: "triangle", start: 0.09, dur: 0.24, vol: 0.18 });
      tone({ freq: 2350, type: "sine", start: 0.09, dur: 0.18, vol: 0.04 });
    },
    // Ошибка: мягкий нисходящий "бум"
    wrong() {
      tone({ freq: 220, type: "square", dur: 0.18, vol: 0.06, slideTo: 140 });
      tone({ freq: 160, type: "sawtooth", start: 0.12, dur: 0.22, vol: 0.05, slideTo: 90 });
    },
    // Клик по варианту
    tap() { tone({ freq: 520, type: "sine", dur: 0.05, vol: 0.06 }); },
    // Пара найдена
    match() { tone({ freq: 988, type: "triangle", dur: 0.1, vol: 0.12 }); },
    // Урок завершён: короткая фанфара
    complete() {
      const notes = [523, 659, 784, 1047];
      notes.forEach((f, i) => tone({ freq: f, type: "triangle", start: i * 0.11, dur: 0.22, vol: 0.18 }));
      tone({ freq: 1568, type: "sine", start: 0.44, dur: 0.5, vol: 0.08 });
      tone({ freq: 784, type: "triangle", start: 0.44, dur: 0.5, vol: 0.12 });
    },
    // Достижение
    achievement() {
      [880, 1109, 1319, 1760].forEach((f, i) => tone({ freq: f, type: "sine", start: i * 0.07, dur: 0.3, vol: 0.12 }));
    },
    // Покупка
    coin() {
      tone({ freq: 1319, type: "square", dur: 0.06, vol: 0.05 });
      tone({ freq: 1760, type: "square", start: 0.06, dur: 0.16, vol: 0.05 });
    }
  };

  function play(name) {
    if (!enabled) return;
    try { fx[name] && fx[name](); } catch (e) { /* звук не критичен */ }
  }

  return {
    play,
    setEnabled(v) { enabled = !!v; },
    unlock() { ac(); }
  };
})();

const Speech = (() => {
  /* Озвучка работает в два слоя:
     1. Записанные заранее mp3 (assets/audio, голос Ava Neural) - основной вариант,
        одинаково звучит на любом устройстве и без интернета.
     2. Синтез речи браузера - запасной, только для фраз без файла
        и только английским голосом (русский голос с акцентом не используем). */
  const files = typeof AUDIO_MANIFEST === "object" ? AUDIO_MANIFEST : {};
  const AUDIO_DIR = "assets/audio/";
  const synthSupported = "speechSynthesis" in window;
  let voices = [];
  let voice = null;
  let preferredURI = null;
  let rate = 0.9;            // 0.75 медленно, 0.9 обычно, 1.05 быстро
  let enabled = true;
  let current = null;        // проигрываемый сейчас Audio
  const listeners = [];

  const keyOf = (t) => String(t || "").trim().toLowerCase();
  const hasFile = (t) => !!files[keyOf(t)];

  function score(v) {
    const n = v.name;
    let s = 0;
    if (/Natural|Neural|Online/i.test(n)) s += 100;
    if (/Premium|Enhanced|Siri/i.test(n)) s += 80;
    if (/Google/i.test(n)) s += 60;
    if (/Aria|Jenny|Ava|Emma|Andrew|Brian|Guy|Samantha|Libby|Sonia|Ryan/i.test(n)) s += 20;
    if (/en-US/i.test(v.lang)) s += 10;
    else if (/en-GB/i.test(v.lang)) s += 8;
    if (/David|Zira|Mark|Hazel|George|Susan/i.test(n) && !/Natural|Online/i.test(n)) s -= 30;
    return s;
  }

  function loadVoices() {
    if (!synthSupported) return;
    voices = speechSynthesis.getVoices().filter((v) => /^en[-_]/i.test(v.lang)).sort((a, b) => score(b) - score(a));
    voice = voices.find((v) => v.voiceURI === preferredURI) || voices[0] || null;
    listeners.forEach((fn) => fn(voices));
  }
  if (synthSupported) {
    loadVoices();
    speechSynthesis.addEventListener ? speechSynthesis.addEventListener("voiceschanged", loadVoices) : (speechSynthesis.onvoiceschanged = loadVoices);
  }

  function stop() {
    if (current) { current.pause(); current = null; }
    if (synthSupported) speechSynthesis.cancel();
  }

  function playFile(text, slow) {
    return new Promise((resolve) => {
      const a = new Audio(AUDIO_DIR + files[keyOf(text)]);
      a.playbackRate = slow ? Math.max(0.5, rate * 0.72) : rate / 0.9;
      // Сохраняем высоту голоса при замедлении (иначе звучит "басом")
      a.preservesPitch = true;
      a.mozPreservesPitch = true;
      a.webkitPreservesPitch = true;
      a.onended = resolve;
      a.onerror = () => { synth(text, slow).then(resolve); };
      current = a;
      a.play().catch(() => resolve());
    });
  }

  function synth(text, slow) {
    if (!synthSupported || !voice) return Promise.resolve();
    return new Promise((resolve) => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = voice.lang;
      u.voice = voice;
      u.rate = slow ? Math.max(0.5, rate * 0.65) : rate;
      u.onend = resolve;
      u.onerror = resolve;
      speechSynthesis.speak(u);
    });
  }

  function speak(text, { slow = false } = {}) {
    if (!enabled || !text) return Promise.resolve();
    stop();
    return hasFile(text) ? playFile(text, slow) : synth(text, slow);
  }

  return {
    speak,
    stop,
    supported: true,
    // Можно ли что-то озвучить: записанные файлы есть почти всегда
    isEnabled() { return enabled && (Object.keys(files).length > 0 || (!!voice && synthSupported)); },
    canSay(text) { return enabled && (hasFile(text) || (!!voice && synthSupported)); },
    hasRecorded() { return Object.keys(files).length > 0; },
    hasEnglish() { return voices.length > 0; },
    setEnabled(v) { enabled = !!v; if (!v) stop(); },
    setVoice(uri) { preferredURI = uri || null; voice = voices.find((v) => v.voiceURI === preferredURI) || voices[0] || null; },
    setRate(r) { rate = Math.min(1.2, Math.max(0.6, Number(r) || 0.9)); },
    getVoices() { return voices; },
    currentVoice() { return voice; },
    onVoices(fn) { listeners.push(fn); }
  };
})();

/* Распознавание речи для заданий на говорение (Chrome, Edge; нужен интернет) */
const SpeechRec = (() => {
  const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
  const supported = !!Rec;
  const ERRORS = {
    "not-allowed": "Нет доступа к микрофону. Разрешите его в настройках браузера",
    "service-not-allowed": "Нет доступа к микрофону. Разрешите его в настройках браузера",
    "no-speech": "Ничего не слышно. Попробуйте ещё раз",
    "audio-capture": "Микрофон не найден",
    "network": "Для распознавания речи нужен интернет"
  };
  function listen() {
    return new Promise((resolve, reject) => {
      if (!supported) return reject(new Error("Браузер не умеет распознавать речь"));
      const r = new Rec();
      r.lang = "en-US";
      r.interimResults = false;
      r.maxAlternatives = 5;
      let done = false;
      r.onresult = (e) => {
        done = true;
        resolve([...e.results[0]].map((a) => a.transcript));
      };
      r.onerror = (e) => { done = true; reject(new Error(ERRORS[e.error] || "Не получилось распознать речь")); };
      r.onend = () => { if (!done) reject(new Error(ERRORS["no-speech"])); };
      try { r.start(); } catch (e) { reject(new Error("Не получилось включить микрофон")); }
    });
  }
  return { supported, listen };
})();