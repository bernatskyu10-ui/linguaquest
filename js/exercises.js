/* ==========================================================================
   LinguaQuest - упражнения
   1. Генератор: собирает набор упражнений урока из words / sentences / gaps
   2. Проверка ответов: нормализация текста, сокращения, допуск опечаток
   3. Рендеры: у каждого типа функция render(ex, root, ctx), возвращающая
      контроллер { check() -> { correct, solution, typo? } }

   Типы упражнений:
   teach        - карточка нового слова (без проверки)
   choose       - выбор перевода (en -> ru или ru -> en)
   picture      - выбор картинки по слову
   match        - сопоставление пар слов
   type         - ввод перевода с клавиатуры
   build        - составление предложения из перемешанных слов
   listen       - аудирование: выбор услышанного варианта
   dictation    - аудирование: напечатать услышанное
   gap          - выбор правильной формы глагола в пропуске
   ========================================================================== */

const Exercises = (() => {
  /* ---------- Утилиты ---------- */
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const sample = (arr, n) => shuffle(arr).slice(0, n);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const uniqBy = (arr, fn) => {
    const seen = new Set();
    return arr.filter((x) => {
      const k = fn(x);
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  };

  /* ---------- Нормализация ответа ---------- */
  const CONTRACTIONS = {
    "i'm": "i am", "you're": "you are", "he's": "he is", "she's": "she is", "it's": "it is",
    "we're": "we are", "they're": "they are", "don't": "do not", "doesn't": "does not",
    "isn't": "is not", "aren't": "are not", "can't": "cannot", "won't": "will not",
    "didn't": "did not", "wasn't": "was not", "weren't": "were not", "what's": "what is",
    "where's": "where is", "that's": "that is", "i'll": "i will", "you'll": "you will",
    "we'll": "we will", "they'll": "they will", "let's": "let us", "who's": "who is",
    "how's": "how is", "there's": "there is", "i've": "i have", "i'd": "i would",
    "wouldn't": "would not", "shouldn't": "should not", "couldn't": "could not", "mustn't": "must not",
    "haven't": "have not", "hasn't": "has not", "hadn't": "had not", "needn't": "need not",
    "he'll": "he will", "she'll": "she will", "it'll": "it will", "you've": "you have",
    "we've": "we have", "they've": "they have", "you'd": "you would", "he'd": "he would",
    "she'd": "she would", "we'd": "we would", "they'd": "they would", "here's": "here is",
    "there're": "there are", "who'd": "who would", "what're": "what are"
  };

  // Распознавание речи пишет числа цифрами: 10 -> ten, 3:00 -> three o'clock
  const ONES = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve",
    "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  function numWord(n) {
    if (n < 20) return ONES[n];
    if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? " " + ONES[n % 10] : "");
    if (n === 100) return "one hundred";
    return String(n);
  }

  function norm(s) {
    let t = String(s || "").toLowerCase().replace(/[’`´]/g, "'").replace(/\s+/g, " ").trim();
    t = t.replace(/\b(\d{1,2}):00\b/g, (m, h) => numWord(Number(h)) + " o'clock");
    t = t.replace(/\b\d{1,3}\b/g, (m) => (Number(m) <= 100 ? numWord(Number(m)) : m));
    t = t.replace(/-/g, " ");
    t = t.replace(/[a-z]+'[a-z]+/g, (w) => CONTRACTIONS[w] || w);
    t = t.replace(/\bcan not\b/g, "cannot");
    t = t.replace(/[^\p{L}\p{N}\s]/gu, "").replace(/\s+/g, " ").trim();
    return t;
  }

  // Расстояние Левенштейна - чтобы прощать одну опечатку в длинных словах
  function lev(a, b) {
    const m = a.length, n = b.length;
    if (Math.abs(m - n) > 2) return 99;
    const dp = Array.from({ length: m + 1 }, (_, i) => [i]);
    for (let j = 1; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
    }
    return dp[m][n];
  }

  // Сравнивает ввод с эталоном и альтернативами
  function matchText(input, answers) {
    const ni = norm(input);
    if (!ni) return { correct: false };
    for (const a of answers) if (norm(a) === ni) return { correct: true };
    for (const a of answers) {
      const na = norm(a);
      const limit = na.length >= 12 ? 2 : na.length >= 5 ? 1 : 0;
      if (limit && lev(ni, na) <= limit) return { correct: true, typo: true };
    }
    return { correct: false };
  }

  // Слова для плиток: убираем знаки препинания по краям
  const tokenize = (s) => s.split(/\s+/).map((w) => w.replace(/^[^\p{L}\p{N}']+|[^\p{L}\p{N}']+$/gu, "")).filter(Boolean);

  /* ---------- Похожие варианты ответа ----------
     Неправильные варианты подбираем так, чтобы ответ нельзя было угадать:
     половина похожа по написанию и звучанию (green: grey, great), половина по смыслу
     (тот же раздел, та же часть речи, похожий перевод: красный - красивый). */
  // Отдельные значения перевода: "есть (с he, she), быть" -> ["есть", "быть"]
  const ruParts = (ru) => String(ru || "").toLowerCase().replace(/\([^)]*\)/g, "").split(/[,;]/).map((x) => x.trim()).filter(Boolean);
  const ruFirst = (ru) => ruParts(ru)[0] || String(ru || "").toLowerCase();
  // Часть речи по русскому переводу: прилагательное, глагол, фраза или остальное
  function ruKind(ru) {
    const f = ruFirst(ru);
    const last = f.split(" ").pop();
    if (/(ый|ий|ой|ая|яя|ое|ее)$/.test(last)) return "adj";
    if (/(ть|ться|ти|чь|тись)$/.test(last)) return "verb";
    return f.includes(" ") ? "phrase" : "other";
  }
  // Насколько слова похожи по написанию: 0 - совсем разные, больше 1 - очень похожи
  function likeness(a, b) {
    a = String(a).toLowerCase();
    b = String(b).toLowerCase();
    if (a === b) return -1;
    const d = lev(a, b);
    let s = d === 99 ? 0 : 1 - d / Math.max(a.length, b.length);
    let p = 0;
    while (p < a.length && p < b.length && a[p] === b[p]) p++;
    s += Math.min(p, 3) * 0.12;
    if (a.length > 2 && a.slice(-2) === b.slice(-2)) s += 0.08;
    return s;
  }
  // Слова уровней A1-B1 (если данные уже загружены): больше похожих слов для вариантов
  let lvPool = null;
  function levelPool() {
    if (lvPool) return lvPool;
    if (typeof LEVEL_DATA !== "object") return [];
    lvPool = ["A1", "A2", "B1"].flatMap((l) => LEVEL_DATA.words[l] || [])
      .filter((w) => !/^\(|^вспомогательн/.test(w[1]) && w[0].split(" ").length <= 2)
      .map((w) => ({ en: w[0], ru: ruParts(w[1]).slice(0, 2).join(", ") || w[1] }));
    return lvPool;
  }

  /**
   * n неправильных вариантов к слову word.
   * pool - слова, из которых выбираем; near - набор en слов той же темы (раздела).
   */
  function similar(word, n, pool, near) {
    const wParts = new Set(ruParts(word.ru));
    const kind = ruKind(word.ru);
    const wf = ruFirst(word.ru);
    const letter = word.en.length === 1;
    const usedEn = new Set([word.en.toLowerCase()]);
    const usedRu = new Set(wParts);
    // Не берём синонимы: если хоть одно значение перевода совпадает, вариант был бы тоже верным
    // и однокоренные переводы (привет - приветы)
    const sameRoot = (p) => [...wParts].some((q) => q.length > 3 && p.length > 3 && (p.startsWith(q) || q.startsWith(p)));
    const okWord = (w) => w && w.ru && (w.en.length === 1) === letter && !usedEn.has(w.en.toLowerCase()) && !ruParts(w.ru).some((p) => usedRu.has(p) || sameRoot(p));
    const cands = uniqBy(pool.concat(letter ? [] : levelPool()), (w) => w.en.toLowerCase()).filter(okWord);
    const scored = cands.map((w) => {
      const sameKind = ruKind(w.ru) === kind ? 0.35 : 0;
      const topic = near && near.has(w.en) ? 0.5 : 0;
      return {
        w,
        spell: likeness(word.en, w.en) + sameKind * 0.5 + Math.random() * 0.1,
        mean: topic + sameKind + likeness(wf, ruFirst(w.ru)) * 0.6 + Math.random() * 0.2
      };
    });
    const out = [];
    const take = (key, k) => {
      const top = scored.filter((x) => !out.includes(x.w)).sort((a, b) => b[key] - a[key]).slice(0, k + 3);
      for (const x of shuffle(top)) {
        if (k <= 0) break;
        if (!okWord(x.w)) continue;
        usedEn.add(x.w.en.toLowerCase());
        ruParts(x.w.ru).forEach((p) => usedRu.add(p));
        out.push(x.w);
        k--;
      }
    };
    take("spell", Math.ceil(n / 2));
    take("mean", n - out.length);
    if (out.length < n) take("spell", n - out.length);
    return out;
  }

  // Похожие предложения: с теми же словами и того же строения
  function similarSentences(s, n, pool) {
    const toks = tokenize(s.en.toLowerCase());
    const set = new Set(toks);
    const ruSet = new Set(s.ru.toLowerCase().split(/\s+/));
    const scored = uniqBy(pool.filter((x) => x.en !== s.en && x.ru !== s.ru), (x) => x.ru).map((x) => {
      const t = tokenize(x.en.toLowerCase());
      const shared = t.filter((w) => set.has(w)).length;
      const ruShared = x.ru.toLowerCase().split(/\s+/).filter((w) => ruSet.has(w)).length;
      return { x, score: shared + ruShared * 0.7 + (t[0] === toks[0] ? 0.8 : 0) - Math.abs(t.length - toks.length) * 0.25 + Math.random() * 0.6 };
    });
    return shuffle(scored.sort((a, b) => b.score - a.score).slice(0, n + 2)).slice(0, n).map((y) => y.x);
  }

  // Лишние плитки в сборке предложения: слова, которые легко перепутать с нужными
  const CONFUSE = {
    is: ["are", "am", "it's"], are: ["is", "am"], am: ["is", "are"], do: ["does", "did"], does: ["do", "is"], did: ["do", "does"],
    a: ["an", "the"], an: ["a", "the"], the: ["a", "an"], he: ["she", "his", "him"], she: ["he", "her"], his: ["he", "her"],
    her: ["she", "his"], i: ["me", "my"], me: ["i", "my"], my: ["me", "i"], in: ["on", "at"], on: ["in", "at"], at: ["in", "on"],
    this: ["these", "that"], that: ["this", "those"], these: ["this", "those"], have: ["has", "had"], has: ["have", "is"],
    was: ["were", "is"], were: ["was", "are"], to: ["too", "for"], you: ["your", "yours"], your: ["you", "you're"],
    they: ["their", "them"], their: ["there", "they"], we: ["our", "us"], it: ["its", "is"], can: ["can't", "could"],
    "don't": ["doesn't", "not"], "doesn't": ["don't", "isn't"], "isn't": ["aren't", "doesn't"], "aren't": ["isn't", "don't"],
    there: ["their", "where"], where: ["were", "there"], what: ["which", "who"], who: ["how", "what"], how: ["who", "what"],
    for: ["four", "from"], from: ["for", "of"], of: ["off", "for"], with: ["without", "which"], go: ["goes", "went"],
    goes: ["go", "going"], like: ["likes", "liked"], likes: ["like", "liking"], will: ["would", "well"], would: ["will", "could"]
  };
  function confusers(tokens, n, extraWords) {
    const lower = new Set(tokens.map((t) => t.toLowerCase()));
    const out = [];
    for (const t of shuffle(tokens)) {
      const alts = (CONFUSE[t.toLowerCase()] || []).filter((x) => !lower.has(x) && !out.some((o) => o.toLowerCase() === x));
      if (alts.length) out.push(alts[(Math.random() * alts.length) | 0]);
    }
    // Похожие по написанию слова из урока: like - lake, cat - cut
    for (const t of tokens) {
      const near = (extraWords || []).filter((w) => !lower.has(w.toLowerCase()) && !out.some((o) => o.toLowerCase() === w.toLowerCase()) && likeness(t, w) > 0.75);
      if (near.length) out.push(near[0]);
    }
    return shuffle(out).slice(0, n);
  }

  // Буквы, которые легко спутать на слух (по названию) и на вид
  const LETTER_LIKE = ["bcdegptvz", "ahjk", "flmnsx", "iy", "quw", "bdpq", "mnw", "uvw", "ijl", "ceo"];
  const letterNear = (l) => new Set(LETTER_LIKE.filter((g) => g.includes(l.toLowerCase())).join("").split(""));

  /* ---------- Генератор ---------- */
  function isLetterLesson(lesson) {
    return lesson.words.every((w) => w.en.length === 1);
  }

  /**
   * Задания для уроков алфавита:
   * название -> буква, заглавная -> строчная, первая буква слова, пары заглавных и строчных, буква на слух.
   */
  function letterBody(words, pool, courseWords) {
    const ws = shuffle(words);
    // Сначала буквы, похожие по названию или виду (b - d - p, m - n), потом остальные
    const others = (w, n) => {
      const near = letterNear(w.en);
      const close = sample(pool.filter((x) => x.en !== w.en && near.has(x.en.toLowerCase())), n);
      return close.concat(sample(pool.filter((x) => x.en !== w.en && !close.includes(x)), n - close.length));
    };
    const opts = (w) => shuffle([w, ...others(w, 3)]);
    const body = [];

    // Название буквы ("би", звучит) -> выбрать букву
    ws.slice(0, 2).forEach((w) => body.push({ type: "choose", dir: "ru-en", word: w, letters: true, options: opts(w) }));

    // Простые слова уровня A1 для заданий: сначала те, у которых картинка изображает само слово
    const a1 = new Set(COURSE.units.filter((u) => u.level === "A1").flatMap((u) => u.lessons.flatMap((l) => l.words.map((w) => w.en))));
    const simple = courseWords.filter((v) => /^[a-z]{3,6}$/i.test(v.en) && a1.has(v.en));
    const ownPic = (v) => v.pic && SVG.hasPic(v.pic) && (v.pic === v.en.toLowerCase() || v.pic === "c-" + v.en.toLowerCase());
    const pickWord = (cand) => {
      if (!cand.length) return null;
      const withPic = cand.filter(ownPic);
      return withPic.length ? sample(withPic, 1)[0] : sample(cand.slice(0, 3), 1)[0];
    };
    const used = new Set();
    // Варианты без букв, которые тоже дают слово (c_t: a - cat, но и u - cut)
    const vocabSet = new Set(courseWords.map((x) => x.en.toLowerCase()));
    const optsIn = (w, v, pos) => {
      const word = v.en.toLowerCase();
      const bad = (x) => vocabSet.has(word.slice(0, pos) + x.en.toLowerCase() + word.slice(pos + 1));
      const near = letterNear(w.en);
      const ok = pool.filter((x) => x.en !== w.en && !bad(x));
      const close = sample(ok.filter((x) => near.has(x.en.toLowerCase())), 2);
      return shuffle([w, ...close, ...sample(ok.filter((x) => !close.includes(x)), 3 - close.length)]);
    };

    // С какой буквы начинается слово: картинка, озвучка, "_og (собака)"
    let added = 0;
    for (const w of ws) {
      if (added >= 2) break;
      const v = pickWord(simple.filter((x) => x.en[0].toLowerCase() === w.en.toLowerCase() && !used.has(x.en)));
      if (!v) continue;
      used.add(v.en);
      body.push({ type: "firstLetter", pos: 0, word: w, vocab: v, options: optsIn(w, v, 0) });
      added++;
    }

    // Какой буквы не хватает внутри слова: "c_t (кошка)" -> a. Учит слышать звук в слове
    added = 0;
    for (const w of shuffle(words)) {
      if (added >= 2) break;
      const l = w.en.toLowerCase();
      const v = pickWord(simple.filter((x) => x.en.slice(1).toLowerCase().includes(l) && !used.has(x.en)));
      if (!v) continue;
      used.add(v.en);
      const positions = [...v.en.toLowerCase()].map((c, i) => (i > 0 && c === l ? i : -1)).filter((i) => i > 0);
      const pos = positions[(Math.random() * positions.length) | 0];
      body.push({ type: "firstLetter", pos, word: w, vocab: v, options: optsIn(w, v, pos) });
      added++;
    }

    // Пары: буква и слово, которое с неё начинается
    const pairs = [];
    for (const w of shuffle(words)) {
      if (pairs.length >= 4) break;
      const v = pickWord(simple.filter((x) => x.en[0].toLowerCase() === w.en.toLowerCase()));
      if (v) pairs.push({ en: w.en, ru: `${v.en.toLowerCase()} (${v.ru})` });
    }
    if (pairs.length >= 3) {
      body.push({ type: "match", title: "Соедините букву и слово, которое с неё начинается", hint: "Послушайте слово в голове: какой звук первый?", pairs });
    }

    // Буква на слух: выбрать и написать
    const lw = ws[4] || ws[0];
    const dw = ws[5] || ws[1];
    if (Speech.isEnabled()) {
      body.push({ type: "listen", target: lw.en, ru: lw.ru, options: shuffle([lw.en, ...others(lw, 3).map((x) => x.en)]) });
      if (dw) body.push({ type: "dictation", target: dw.en, ru: dw.ru, alt: [], letters: true });
    } else {
      body.push({ type: "choose", dir: "ru-en", word: lw, letters: true, options: opts(lw) });
    }

    // Сопоставление не ставим первым
    let mixed = shuffle(body);
    const mi = mixed.findIndex((e) => e.type === "match");
    if (mi === 0 && mixed.length > 2) mixed.splice(2, 0, mixed.shift());
    return mixed;
  }

  /**
   * Собирает упражнения для урока.
   * @param unit - раздел, lesson - урок, opts.isReplay - повторное прохождение
   */
  function build(unit, lesson, { isReplay = false, speaking = false } = {}) {
    const words = lesson.words || [];
    const sentences = lesson.sentences || [];
    const gaps = lesson.gaps || [];
    const letters = isLetterLesson(lesson);

    // Пул для отвлекающих вариантов: слова всего раздела, затем всего курса
    const unitWords = uniqBy(unit.lessons.flatMap((l) => l.words), (w) => w.en);
    const courseWords = uniqBy(COURSE.units.flatMap((u) => u.lessons.flatMap((l) => l.words)), (w) => w.en);
    const pool = letters ? unitWords.filter((w) => w.en.length === 1) : uniqBy(unitWords.concat(courseWords).filter((w) => w.en.length > 1), (w) => w.en);
    const unitSentences = unit.lessons.flatMap((l) => l.sentences || []);
    const courseSentences = COURSE.units.flatMap((u) => u.lessons.flatMap((l) => l.sentences || []));

    // Отвлекающие варианты: похожие по написанию и по смыслу (цвета среди цветов, глаголы среди глаголов),
    // чтобы ответ нельзя было угадать ни по теме, ни на слух
    const unitKeys = new Set(unitWords.map((w) => w.en));
    const distractors = (word, n, from = pool) => similar(word, n, from, unitKeys);

    const out = [];
    const ws = shuffle(words);
    let practiced = null; // задание, уже показанное сразу после правила

    // 0. Объяснение грамматики перед первым прохождением урока
    if (!isReplay && typeof GRAMMAR === "object" && GRAMMAR[lesson.id]) {
      out.push({ type: "grammar", g: GRAMMAR[lesson.id] });
      // Сначала учим, потом проверяем: сразу после правила одно задание на него с объяснением
      if (gaps.length) {
        const first = gaps[(Math.random() * gaps.length) | 0];
        out.push({ type: "gap", gap: first, options: shuffle(first.options), practice: true });
        practiced = first;
      }
    }

    // 1. Карточки новых слов (только при первом прохождении)
    if (!isReplay) {
      ws.slice(0, letters ? 3 : 2).forEach((w) => out.push({ type: "teach", word: w, letters, example: letters ? null : exampleFor(w.en, lesson.id) }));
    }

    // Алфавит: свои задания, которые учат узнавать буквы, а не переписывать название
    if (letters) return out.concat(letterBody(words, pool, courseWords));

    const body = [];

    // 2. Выбор перевода en -> ru
    ws.slice(0, 2).forEach((w) => {
      // В алфавите наоборот: звучит и написано название буквы ("си"), а выбрать нужно саму букву
      body.push({ type: "choose", dir: letters ? "ru-en" : "en-ru", word: w, letters, options: shuffle([w, ...distractors(w, 3)]) });
    });

    // 3. Выбор перевода ru -> en
    ws.slice(2, 3).forEach((w) => {
      body.push({ type: "choose", dir: "ru-en", word: w, letters, options: shuffle([w, ...distractors(w, 3)]) });
    });

    // 4. Картинки (если в уроке есть хотя бы одно слово с картинкой)
    const withPics = words.filter((w) => w.pic && SVG.hasPic(w.pic));
    if (withPics.length) {
      const hasPic = (x) => x.pic && SVG.hasPic(x.pic);
      sample(withPics, withPics.length >= 4 ? 2 : 1).forEach((w) => {
        const ok = (p) => p.pic !== w.pic && p.en !== w.en && p.ru !== w.ru;
        // Сначала отвлекающие картинки из той же темы, затем из всего курса
        const near = sample(uniqBy(unitWords.filter((p) => hasPic(p) && ok(p)), (p) => p.pic), 3);
        const far = sample(uniqBy(courseWords.filter((p) => hasPic(p) && ok(p) && !near.some((n) => n.pic === p.pic)), (p) => p.pic), 3 - near.length);
        const others = near.concat(far);
        body.push({ type: "picture", word: w, options: shuffle([w, ...others]) });
      });
    }

    // 5. Сопоставление пар
    // Слова с одинаковым переводом (sick и ill - "больной") в одни пары не ставим
    const matchable = uniqBy(uniqBy(words, (w) => w.ru.toLowerCase()), (w) => w.en.toLowerCase());
    if (matchable.length >= 4) {
      body.push({ type: "match", pairs: sample(matchable, Math.min(5, matchable.length)) });
    }

    // 6. Аудирование: услышать слово и выбрать, что оно значит (а не то же слово на английском)
    const listenWord = ws[3] || ws[0];
    if (listenWord) {
      body.push({ type: "listen", meaning: true, target: listenWord.en, ru: listenWord.ru, answer: listenWord.ru, options: shuffle([listenWord.ru, ...distractors(listenWord, 3).map((w) => w.ru)]) });
    }

    // 7. Ввод перевода с клавиатуры
    const typeWord = ws[4] || ws[1];
    if (typeWord) body.push({ type: "type", word: typeWord, letters });

    // 8. Составление предложений
    sample(sentences, 3).forEach((s) => {
      const tokens = tokenize(s.en);
      const lower = new Set(tokens.map((t) => t.toLowerCase()));
      const nExtra = Math.min(4, Math.max(2, 7 - tokens.length));
      const lessonTokens = uniqBy(
        shuffle(unitSentences.concat(sentences).flatMap((x) => tokenize(x.en)).concat(words.map((w) => w.en).filter((e) => !e.includes(" ")))),
        (t) => t.toLowerCase()
      ).filter((t) => !lower.has(t.toLowerCase()));
      // Лишние плитки, которые легко перепутать: is/are, in/on, his/her, похожие по написанию
      const tricky = confusers(tokens, nExtra, lessonTokens);
      const extra = tricky.concat(lessonTokens.filter((t) => !tricky.some((x) => x.toLowerCase() === t.toLowerCase()))).slice(0, nExtra);
      body.push({ type: "build", sentence: s, tiles: shuffle(tokens.concat(extra).map((t, i) => ({ t, i }))) });
    });

    // 9. Пропуски с формой глагола
    sample(gaps.filter((g) => g !== practiced), 3).forEach((g) => body.push({ type: "gap", gap: g, options: shuffle(g.options) }));

    // 10. Аудирование предложения или диктант слова
    if (sentences.length) {
      const s = sentences[(Math.random() * sentences.length) | 0];
      if (Math.random() < 0.5) {
        // Услышать фразу и выбрать её перевод
        // Варианты - похожие фразы: те же слова, то же строение
        const others = similarSentences(s, 3, unitSentences.concat(courseSentences)).map((x) => x.ru);
        body.push({ type: "listen", meaning: true, target: s.en, ru: s.ru, answer: s.ru, options: shuffle([s.ru, ...others]) });
      } else {
        body.push({ type: "dictation", target: s.en, ru: s.ru, alt: s.alt || [] });
      }
    } else if (ws[5] || ws[2]) {
      const w = ws[5] || ws[2];
      body.push({ type: "dictation", target: w.en, ru: w.ru, alt: w.alt || [], letters });
    }

    // Если английский голос недоступен (или озвучка выключена), задания на слух
    // заменяем на ввод перевода и выбор слова, чтобы урок оставался полноценным
    if (!Speech.isEnabled()) {
      for (let i = 0; i < body.length; i++) {
        if (body[i].type !== "listen" && body[i].type !== "dictation") continue;
        const w = ws[(i + 1) % ws.length];
        body[i] = i % 2
          ? { type: "type", word: w, letters }
          : { type: "choose", dir: "ru-en", word: w, letters, options: shuffle([w, ...distractors(w, 3)]) };
      }
    }

    // Перемешиваем тело урока, но не ставим сопоставление первым
    let mixed = shuffle(body);
    const mi = mixed.findIndex((e) => e.type === "match");
    if (mi === 0 && mixed.length > 2) mixed.splice(2, 0, mixed.shift());
    mixed = mixed.slice(0, RULES.exercisesPerLesson + 2);

    // Диалоги-сценки: выбрать подходящую реплику в разговоре
    // Ролевой диалог: собеседник говорит реплику, вы отвечаете вслух
    if (speaking && SpeechRec.supported && (lesson.dialogs || []).length) {
      const dg = lesson.dialogs[(Math.random() * lesson.dialogs.length) | 0];
      const turns = dg.lines.map((ln, i) => (ln.me && i > 0 ? i : -1)).filter((i) => i > 0);
      if (turns.length) {
        const i = turns[(Math.random() * turns.length) | 0];
        const partner = dg.lines[i - 1];
        mixed.push({ type: "speak", target: dg.lines[i].en, ru: dg.lines[i].ru, alt: [], role: { title: dg.title, who: partner.who || "Собеседник", en: partner.en, ru: partner.ru } });
      }
    }
    (lesson.dialogs || []).forEach((dg) => {
      const mine = dg.lines.map((ln, i) => (ln.me ? i : -1)).filter((i) => i >= 0);
      sample(mine, Math.min(2, mine.length)).sort((a, b) => a - b).forEach((i) => {
        const line = dg.lines[i];
        mixed.push({ type: "dialog", title: dg.title, context: dg.lines.slice(Math.max(0, i - 3), i), line, options: shuffle([line.en, ...line.wrong]) });
      });
    });
    // Чтение: короткий текст и вопрос по нему
    if (lesson.story) {
      sample(lesson.story.questions, 2).forEach((q) => mixed.push({ type: "story", story: lesson.story, question: q, options: shuffle(q.options) }));
    }

    // Задание на говорение (если браузер умеет распознавать речь)
    if (speaking && SpeechRec.supported && !letters) {
      const src = sentences.length ? sentences[(Math.random() * sentences.length) | 0] : ws[0];
      if (src) mixed.splice(Math.min(mixed.length, 4 + ((Math.random() * 3) | 0)), 0, { type: "speak", target: src.en, ru: src.ru, alt: src.alt || [] });
    }

    return out.concat(mixed);
  }

  /**
   * Повторение: упражнения только по выбранным словам (без карточек и фраз).
   * words - объекты слов из курса.
   */
  function buildReview(words) {
    const fakeLesson = { id: "review", title: "Повторение", words, sentences: [], gaps: [] };
    const fakeUnit = { lessons: [fakeLesson] };
    return build(fakeUnit, fakeLesson, { isReplay: true }).filter((e) => e.type !== "teach");
  }

  /**
   * Проверочный тест главы: смесь заданий из всех её уроков, без повторов.
   */
  function buildTest(unit) {
    const all = unit.lessons.flatMap((l) => build(unit, l, { isReplay: true }));
    const allowed = ["choose", "type", "build", "gap", "picture", "listen"];
    return shuffle(all.filter((e) => allowed.includes(e.type))).slice(0, 12);
  }

  /* ---------- Общие куски разметки ---------- */
  // Кнопка прослушивания (не показываем, если английский голос недоступен)
  const speakBtn = (text, cls = "", slow = false) => !Speech.isEnabled() ? "" :
    `<button class="speak-btn ${cls}" type="button" data-say="${esc(text)}" ${slow ? 'data-slow="1"' : ""} aria-label="${slow ? "Медленно" : "Прослушать"}">${SVG.icon(slow ? "turtle" : "speaker")}</button>`;

  function bindSpeak(root, ctx) {
    root.querySelectorAll("[data-say]").forEach((b) => {
      b.addEventListener("click", () => {
        b.classList.remove("is-playing");
        void b.offsetWidth;
        b.classList.add("is-playing");
        ctx.speak(b.dataset.say, !!b.dataset.slow);
      });
    });
  }

  // Карточка с вопросом: маленький лисёнок и текст задания
  // Что именно было неправильно: пара "английский - перевод" для списка ошибок
  function errorItem(ex, res) {
    if (ex.vocab) return { en: ex.vocab.en, ru: `${ex.vocab.ru}, буква ${ex.word.en.toUpperCase()}` };
    if (ex.word) return { en: ex.word.en, ru: ex.word.ru };
    if (ex.sentence) return { en: ex.sentence.en, ru: ex.sentence.ru };
    if (ex.line) return { en: ex.line.en, ru: ex.line.ru };
    if (ex.target) return { en: ex.target, ru: ex.ru || "" };
    if (ex.gap) return { en: res.solution, ru: ex.gap.ru || "" };
    if (ex.question) return { en: "", ru: `${ex.question.q} ${ex.question.answer}` };
    return { en: "", ru: res.solution || "" };
  }

  function errorList(items) {
    return `<ul class="mistake-list">${items.map((it) => `
      <li class="mistake">
        ${it.en ? speakBtn(it.en) : ""}
        <div><b>${esc(it.en || it.ru)}</b>${it.en && it.ru ? `<small>${esc(it.ru)}</small>` : ""}</div>
      </li>`).join("")}</ul>`;
  }

  function mascotBubble(inner, ctx) {
    return `<div class="prompt">
      <div class="prompt__mascot">${SVG.mascot({ mood: "think", hat: ctx.hat })}</div>
      <div class="prompt__text" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">${inner}</div>
    </div>`;
  }

  // Универсальный список вариантов (кнопки с номерами 1-4)
  function optionsList(items, cls = "") {
    return `<div class="options ${cls}">${items
      .map((it, i) => `<button class="option" type="button" data-i="${i}"><span class="option__key">${i + 1}</span><span>${esc(it.label)}</span></button>`)
      .join("")}</div>`;
  }

  function bindSingleSelect(root, ctx, onSelect) {
    const btns = [...root.querySelectorAll(".option, .pic-card")];
    let selected = -1;
    const select = (i) => {
      if (!btns[i] || btns[i].disabled) return;
      selected = i;
      btns.forEach((b, j) => b.classList.toggle("is-selected", j === i));
      ctx.sfx("tap");
      onSelect && onSelect(i);
      ctx.onReady(true);
    };
    btns.forEach((b, i) => b.addEventListener("click", () => select(i)));
    return {
      get selected() { return selected; },
      select,
      mark(correctIdx) {
        btns.forEach((b, j) => {
          b.disabled = true;
          if (j === correctIdx) b.classList.add("is-correct");
          else if (j === selected) b.classList.add("is-wrong");
          b.classList.remove("is-selected");
        });
      }
    };
  }

  /* ---------- Рендеры ---------- */
  // Карточка правила (используется и в уроке, и в окне "Подсказка")
  function grammarCard(g, withSpeak = true) {
    return `
      <div class="rule">
        <ul class="rule__points">${g.points.map((p) => `<li>${p}</li>`).join("")}</ul>
        ${g.table ? `<table class="rule__table"><thead><tr>${g.table.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>
          <tbody>${g.table.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>` : ""}
        ${g.examples && g.examples.length ? `<div class="rule__examples">${g.examples.map(([en, ru]) => `
          <div class="rule__ex">${withSpeak ? speakBtn(en) : ""}<div><b>${esc(en)}</b><small>${esc(ru)}</small></div></div>`).join("")}</div>` : ""}
      </div>`;
  }

  const renderers = {
    // Правило показываем по шагам: каждый пункт отдельно, таблица и примеры в конце
    grammar(ex, root, ctx) {
      root.innerHTML = `<div class="ex-head"><span class="ex-kicker">Как это работает</span><h2 class="ex-title">${esc(ex.g.title)}</h2></div>
        <div class="rule-wrap">${grammarCard(ex.g)}<div class="rule__fox">${SVG.mascot({ mood: "readlaugh", hat: ctx.hat })}</div></div>
        <p class="rule__steps" aria-live="polite"></p>`;
      bindSpeak(root, ctx);
      const points = [...root.querySelectorAll(".rule__points li")];
      const extras = [...root.querySelectorAll(".rule__table, .rule__examples")];
      const steps = root.querySelector(".rule__steps");
      let shown = points.length > 1 ? 1 : points.length;
      const update = () => {
        points.forEach((p, i) => p.classList.toggle("is-hidden", i >= shown));
        extras.forEach((x) => x.classList.toggle("is-hidden", shown < points.length));
        steps.textContent = points.length > 1 ? (shown < points.length ? `Шаг ${shown} из ${points.length}. Нажмите «Дальше», чтобы продолжить` : "Правило целиком. Дальше - проверим на практике") : "";
        if (points[shown - 1]) points[shown - 1].classList.add("rule__point--new");
      };
      update();
      ctx.onReady(true);
      return {
        check() {
          if (shown < points.length) { shown++; update(); ctx.sfx("tap"); return { pending: true }; }
          return { correct: true, silent: true };
        }
      };
    },

    // Буква в слове: первая ("_og") или пропущенная внутри ("c_t"), с картинкой и озвучкой
    firstLetter(ex, root, ctx) {
      const v = ex.vocab;
      const word = v.en.toLowerCase();
      const pos = ex.pos || 0;
      const pic = v.pic && SVG.hasPic(v.pic) ? SVG.pic(v.pic, "first-letter__pic") : "";
      root.innerHTML = `<h2 class="ex-title">${pos === 0 ? "С какой буквы начинается слово?" : "Какой буквы не хватает?"}</h2>
        <div class="first-letter">
          ${pic}
          <div class="first-letter__word">${speakBtn(v.en)}<span>${esc(word.slice(0, pos))}<b class="first-letter__gap">_</b>${esc(word.slice(pos + 1))}</span></div>
          <div class="first-letter__ru">${esc(v.ru)}</div>
        </div>
        ${optionsList(ex.options.map((o) => ({ label: `${o.en.toUpperCase()} ${o.en.toLowerCase()}` })), "options--letters")}`;
      bindSpeak(root, ctx);
      ctx.auto(v.en);
      const sel = bindSingleSelect(root, ctx);
      const correctIdx = ex.options.findIndex((o) => o.en === ex.word.en);
      return {
        select: sel.select,
        check() {
          sel.mark(correctIdx);
          root.querySelector(".first-letter__gap").textContent = word[pos];
          return { correct: sel.selected === correctIdx, solution: `${v.en} (${v.ru}), буква ${ex.word.en.toUpperCase()}` };
        }
      };
    },

    // Перед повтором ошибок: напоминаем правильные ответы
    notice(ex, root, ctx) {
      const items = ex.errors.slice(0, 6);
      root.innerHTML = `<div class="ex-head"><span class="ex-kicker">Работа над ошибками</span><h2 class="ex-title">Вернёмся к трудным заданиям</h2></div>
        <div class="mistakes-intro">
          <div class="mistakes-intro__fox">${SVG.mascot({ mood: "determined", hat: ctx.hat })}</div>
          <div>
            <p class="mistakes-intro__text">Ещё раз посмотрите на правильные ответы. Сейчас эти задания будут снова.</p>
            ${errorList(items)}
          </div>
        </div>`;
      bindSpeak(root, ctx);
      ctx.onReady(true);
      return { check: () => ({ correct: true, silent: true }) };
    },

    teach(ex, root, ctx) {
      const w = ex.word;
      const picSvg = w.pic ? SVG.pic(w.pic, "teach__pic") : "";
      root.innerHTML = `
        <h2 class="ex-title">${ex.letters ? "Новая буква" : "Новое слово"}</h2>
        <div class="teach">
          ${picSvg || `<div style="width:130px">${SVG.mascot({ mood: "surprised", hat: ctx.hat })}</div>`}
          <div class="teach__word">${esc(w.en)} ${speakBtn(w.en)}</div>
          ${ex.letters ? "" : (() => { const ip = w.ipa ? `/${w.ipa}/` : ipaOf(w.en); return ip ? `<div class="ipa teach__ipa" title="Транскрипция">[${esc(ruPhon(ip))}] ${esc(ip)}</div>` : ""; })()}
          <div class="teach__tr">${esc(w.ru)}</div>
          ${w.tip ? `<div class="teach__tip">${esc(w.tip)}</div>` : ""}
          ${ex.example ? `<div class="teach__example">${speakBtn(ex.example.en)}<div><b>${esc(ex.example.en)}</b><small>${esc(ex.example.ru)}</small></div></div>` : ""}
        </div>`;
      bindSpeak(root, ctx);
      ctx.auto(w.en);
      ctx.onReady(true);
      return { check: () => ({ correct: true, silent: true }) };
    },

    choose(ex, root, ctx) {
      const enRu = ex.dir === "en-ru";
      const w = ex.word;
      let title;
      if (ex.letters) title = enRu ? "Как называется эта буква?" : "Какая буква так называется?";
      else title = enRu ? "Выберите правильный перевод" : "Как это будет по-английски?";
      // Для букв показываем название и даём его послушать
      const prompt = enRu ? `${speakBtn(w.en)}<span>${esc(w.en)}</span>` : ex.letters ? `${speakBtn(w.en)}<span>${esc(w.ru)}</span>` : `<span>${esc(w.ru)}</span>`;
      const items = ex.options.map((o) => ({ label: enRu ? o.ru : o.en, en: o.en }));
      root.innerHTML = `<h2 class="ex-title">${title}</h2>${mascotBubble(prompt, ctx)}${optionsList(items)}`;
      bindSpeak(root, ctx);
      if (enRu || ex.letters) ctx.auto(w.en);
      const sel = bindSingleSelect(root, ctx);
      const correctIdx = ex.options.findIndex((o) => o.en === w.en);
      return {
        select: sel.select,
        check() {
          sel.mark(correctIdx);
          return { correct: sel.selected === correctIdx, solution: ex.letters ? `${w.en} (${w.ru})` : enRu ? w.ru : w.en };
        }
      };
    },

    picture(ex, root, ctx) {
      const w = ex.word;
      root.innerHTML = `<h2 class="ex-title">Выберите «${esc(w.ru)}»</h2>
        <div class="pic-grid">${ex.options
          .map((o, i) => `<button class="pic-card" type="button" data-i="${i}">${SVG.pic(o.pic)}<span>${esc(o.en)}</span></button>`)
          .join("")}</div>`;
      const sel = bindSingleSelect(root, ctx);
      const correctIdx = ex.options.findIndex((o) => o.en === w.en);
      return {
        select: sel.select,
        check() {
          sel.mark(correctIdx);
          return { correct: sel.selected === correctIdx, solution: w.en };
        }
      };
    },

    match(ex, root, ctx) {
      const left = shuffle(ex.pairs);
      const right = shuffle(ex.pairs);
      root.innerHTML = `<h2 class="ex-title">${esc(ex.title || "Найдите пары")}</h2>
        <div class="match">
          <div class="match__col">${left.map((p) => `<button class="option" type="button" data-side="en" data-key="${esc(p.en)}">${esc(p.en)}</button>`).join("")}</div>
          <div class="match__col">${right.map((p) => `<button class="option" type="button" data-side="ru" data-key="${esc(p.en)}">${esc(p.ru)}</button>`).join("")}</div>
        </div>`;
      let picked = { en: null, ru: null };
      let done = 0;
      let mistakes = 0;
      const btns = [...root.querySelectorAll(".option")];
      btns.forEach((b) => {
        b.addEventListener("click", () => {
          const side = b.dataset.side;
          if (picked[side]) picked[side].classList.remove("is-selected");
          picked[side] = b;
          b.classList.add("is-selected");
          if (picked.en && picked.ru) {
            const a = picked.en, c = picked.ru;
            if (a.dataset.key === c.dataset.key) {
              ctx.sfx("match");
              // Сразу блокируем найденную пару, чтобы повторный клик не засчитал её дважды
              [a, c].forEach((x) => { x.classList.remove("is-selected"); x.classList.add("is-matched-flash"); x.disabled = true; });
              setTimeout(() => [a, c].forEach((x) => { x.classList.remove("is-matched-flash"); x.classList.add("is-matched"); x.disabled = true; }), 260);
              done++;
              if (done === ex.pairs.length) ctx.onReady(true);
            } else {
              mistakes++;
              ctx.sfx("wrong");
              [a, c].forEach((x) => { x.classList.remove("is-selected"); x.classList.add("is-wrong"); });
              setTimeout(() => [a, c].forEach((x) => x.classList.remove("is-wrong")), 420);
            }
            picked = { en: null, ru: null };
          } else {
            ctx.sfx("tap");
          }
        });
      });
      // Ошибки в парах ничем не штрафуются, но урок перестаёт быть "без ошибок"
      return { check: () => ({ correct: true, silent: true, mistakes }) };
    },

    type(ex, root, ctx) {
      const w = ex.word;
      const title = ex.letters ? "Напишите букву, которая так читается" : "Напишите по-английски";
      root.innerHTML = `<h2 class="ex-title">${title}</h2>
        ${mascotBubble(ex.letters ? `${speakBtn(w.en)}<span>${esc(w.ru)}</span>` : `<span>${esc(w.ru)}</span>`, ctx)}
        <textarea class="type-area" rows="3" placeholder="${ex.letters ? "Введите букву" : "Введите ответ по-английски"}" aria-label="Ваш ответ" autocomplete="off" autocapitalize="off" spellcheck="false"></textarea>
        <p class="type-hint">Нажмите Enter, чтобы проверить</p>`;
      bindSpeak(root, ctx);
      if (ex.letters) ctx.auto(w.en);
      const ta = root.querySelector("textarea");
      ta.addEventListener("input", () => ctx.onReady(ta.value.trim().length > 0));
      setTimeout(() => ta.focus({ preventScroll: true }), 60);
      return {
        input: ta,
        check() {
          ta.disabled = true;
          const r = matchText(ta.value, [w.en].concat(w.alt || []));
          return { correct: r.correct, typo: r.typo, solution: w.en };
        }
      };
    },

    build(ex, root, ctx) {
      const s = ex.sentence;
      root.innerHTML = `<h2 class="ex-title">Составьте перевод</h2>
        ${mascotBubble(`<span>${esc(s.ru)}</span>`, ctx)}
        <div class="builder">
          <div class="builder__answer" aria-label="Ваш ответ"></div>
          <div class="builder__bank">${ex.tiles.map((t, i) => `<button class="chip" type="button" data-i="${i}">${esc(t.t)}</button>`).join("")}</div>
        </div>`;
      const answerEl = root.querySelector(".builder__answer");
      const bank = [...root.querySelectorAll(".builder__bank .chip")];
      const chosen = []; // индексы плиток в порядке выбора

      const renderAnswer = () => {
        answerEl.innerHTML = chosen.map((i) => `<button class="chip" type="button" data-i="${i}">${esc(ex.tiles[i].t)}</button>`).join("");
        answerEl.querySelectorAll(".chip").forEach((c) => {
          c.addEventListener("click", () => {
            const i = Number(c.dataset.i);
            chosen.splice(chosen.indexOf(i), 1);
            bank[i].classList.remove("is-used");
            ctx.sfx("tap");
            renderAnswer();
          });
        });
        ctx.onReady(chosen.length > 0);
      };
      bank.forEach((b, i) => {
        b.addEventListener("click", () => {
          if (b.classList.contains("is-used")) return;
          b.classList.add("is-used");
          chosen.push(i);
          ctx.sfx("tap");
          renderAnswer();
        });
      });
      return {
        check() {
          root.querySelectorAll(".chip").forEach((c) => (c.disabled = true));
          const text = chosen.map((i) => ex.tiles[i].t).join(" ");
          const r = matchText(text, [s.en].concat(s.alt || []));
          // Для сборки из плиток опечаток быть не может: требуем точного совпадения
          return { correct: r.correct && !r.typo, solution: s.en };
        }
      };
    },

    listen(ex, root, ctx) {
      root.innerHTML = `<h2 class="ex-title">${ex.meaning ? "Что это значит?" : "Что вы услышали?"}</h2>
        ${ex.meaning ? `<p class="type-hint">Послушайте и выберите перевод</p>` : ""}
        <div class="listen-row">${speakBtn(ex.target, "speak-btn--xl")}${speakBtn(ex.target, "speak-btn--slow", true)}</div>
        ${optionsList(ex.options.map((o) => ({ label: o })))}`;
      bindSpeak(root, ctx);
      setTimeout(() => ctx.speak(ex.target), 250);
      const sel = bindSingleSelect(root, ctx);
      const correctIdx = ex.options.indexOf(ex.meaning ? ex.answer : ex.target);
      return {
        select: sel.select,
        check() {
          sel.mark(correctIdx);
          return { correct: sel.selected === correctIdx, solution: `${ex.target} (${ex.ru})` };
        }
      };
    },

    dictation(ex, root, ctx) {
      root.innerHTML = `<h2 class="ex-title">Напишите, что услышали</h2>
        <div class="listen-row">${speakBtn(ex.target, "speak-btn--xl")}${speakBtn(ex.target, "speak-btn--slow", true)}</div>
        <textarea class="type-area" rows="3" placeholder="Печатайте по-английски" aria-label="Ваш ответ" autocomplete="off" autocapitalize="off" spellcheck="false"></textarea>
        ${Speech.isEnabled() ? "" : `<p class="type-hint">Озвучка выключена или недоступна. Подсказка: ${esc(ex.ru)}</p>`}`;
      bindSpeak(root, ctx);
      setTimeout(() => ctx.speak(ex.target), 250);
      const ta = root.querySelector("textarea");
      ta.addEventListener("input", () => ctx.onReady(ta.value.trim().length > 0));
      setTimeout(() => ta.focus({ preventScroll: true }), 60);
      return {
        input: ta,
        check() {
          ta.disabled = true;
          const r = matchText(ta.value, [ex.target].concat(ex.alt || []));
          return { correct: r.correct, typo: r.typo, solution: `${ex.target} (${ex.ru})` };
        }
      };
    },

    gap(ex, root, ctx) {
      const g = ex.gap;
      const parts = g.text.split("___");
      root.innerHTML = `<h2 class="ex-title">Выберите правильную форму</h2>
        <div class="gap-sentence">
          <div>${esc(parts[0])}<span class="gap">&nbsp;</span>${esc(parts[1] || "")}</div>
          <div class="gap-sentence__tr">${esc(g.ru)}</div>
        </div>
        ${optionsList(ex.options.map((o) => ({ label: o })), "options--grid")}`;
      const gapEl = root.querySelector(".gap");
      const sel = bindSingleSelect(root, ctx, (i) => { gapEl.textContent = ex.options[i]; });
      const correctIdx = ex.options.indexOf(g.answer);
      const full = g.text.replace("___", g.answer);
      return {
        select: sel.select,
        check() {
          sel.mark(correctIdx);
          gapEl.textContent = g.answer;
          ctx.auto(full);
          return { correct: sel.selected === correctIdx, solution: full };
        }
      };
    },

    // Диалог: показываем начало разговора, нужно выбрать свою реплику
    dialog(ex, root, ctx) {
      const bubble = (ln) => `
        <div class="chat__msg ${ln.me ? "is-me" : ""}">
          ${ln.me ? "" : `<span class="chat__who">${esc(ln.who)}</span>`}
          <div class="chat__bubble">${speakBtn(ln.en)}<div><div class="chat__en">${esc(ln.en)}</div><div class="chat__ru">${esc(ln.ru)}</div></div></div>
        </div>`;
      root.innerHTML = `<div class="ex-head"><span class="ex-kicker">Сценка: ${esc(ex.title)}</span><h2 class="ex-title">Что вы ответите?</h2></div>
        <div class="chat">${ex.context.map(bubble).join("")}
          <div class="chat__msg is-me is-pending"><div class="chat__bubble">...</div></div>
        </div>
        ${optionsList(ex.options.map((o) => ({ label: o })))}`;
      bindSpeak(root, ctx);
      const last = ex.context[ex.context.length - 1];
      if (last && !last.me) setTimeout(() => ctx.auto(last.en), 200);
      const sel = bindSingleSelect(root, ctx);
      const correctIdx = ex.options.indexOf(ex.line.en);
      return {
        select: sel.select,
        check() {
          sel.mark(correctIdx);
          const pending = root.querySelector(".is-pending .chat__bubble");
          if (pending) pending.innerHTML = `<div><div class="chat__en">${esc(ex.line.en)}</div><div class="chat__ru">${esc(ex.line.ru)}</div></div>`;
          ctx.auto(ex.line.en);
          return { correct: sel.selected === correctIdx, solution: `${ex.line.en} (${ex.line.ru})` };
        }
      };
    },

    // Чтение: текст на английском, вопрос на русском
    story(ex, root, ctx) {
      const sentences = ex.story.en.match(/[^.!?]+[.!?]+/g).map((s) => s.trim());
      root.innerHTML = `<div class="ex-head"><span class="ex-kicker">Чтение</span><h2 class="ex-title">${esc(ex.question.q)}</h2></div>
        <div class="story">
          <div class="story__head">${Speech.isEnabled() ? `<button class="speak-btn" type="button" data-read aria-label="Прослушать текст">${SVG.icon("speaker")}</button>` : ""}<span>Прочитайте текст</span></div>
          <p class="story__text">${esc(ex.story.en)}</p>
          <details class="story__tr"><summary>Показать перевод</summary><p>${esc(ex.story.ru)}</p></details>
        </div>
        ${optionsList(ex.options.map((o) => ({ label: o })))}`;
      const readBtn = root.querySelector("[data-read]");
      let reading = false;
      if (readBtn) readBtn.addEventListener("click", async () => {
        if (reading) return;
        reading = true;
        readBtn.classList.add("is-playing");
        const id = root.dataset.renderId;
        for (const s of sentences) { if (!root.isConnected || root.dataset.renderId !== id) break; await ctx.speak(s); }
        readBtn.classList.remove("is-playing");
        reading = false;
      });
      const sel = bindSingleSelect(root, ctx);
      const correctIdx = ex.options.indexOf(ex.question.answer);
      return {
        select: sel.select,
        check() {
          sel.mark(correctIdx);
          return { correct: sel.selected === correctIdx, solution: ex.question.answer };
        }
      };
    },

    // Говорение: пользователь читает фразу вслух, браузер распознаёт речь
    // После распознавания каждое слово фразы подсвечивается: зелёное расслышано, красное нет
    speak(ex, root, ctx) {
      const role = ex.role;
      root.innerHTML = `<h2 class="ex-title">${role ? "Ответьте собеседнику вслух" : "Скажите вслух"}</h2>
        ${role ? `<div class="role-line"><span class="ex-kicker">${esc(role.title)}</span>
          <div class="chat__msg"><div class="chat__bubble">${speakBtn(role.en)}<div><div class="chat__who">${esc(role.who)}</div><div class="chat__en">${esc(role.en)}</div><div class="chat__ru">${esc(role.ru)}</div></div></div></div>
          <p class="type-hint">Ваш ответ:</p></div>` : ""}
        ${mascotBubble(`${speakBtn(ex.target)}<span>${esc(ex.target)}</span>`, ctx)}
        <p class="type-hint">${esc(ex.ru)}</p>
        <div class="listen-row"><button class="mic-btn" type="button" aria-label="Говорить">${SVG.icon("mic")}</button></div>
        <p class="speak-status" aria-live="polite">Нажмите на микрофон и произнесите фразу</p>
        <div class="speak-words" hidden></div>`;
      bindSpeak(root, ctx);
      // В ролевом диалоге сначала звучит реплика собеседника
      if (role) setTimeout(() => { if (root.isConnected) ctx.speak(role.en); }, 300);
      const btn = root.querySelector(".mic-btn");
      const status = root.querySelector(".speak-status");
      const wordsBox = root.querySelector(".speak-words");
      let heard = [];
      btn.addEventListener("click", () => {
        if (btn.classList.contains("is-listening")) return;
        btn.classList.add("is-listening");
        status.textContent = "Слушаю...";
        SpeechRec.listen()
          .then((alts) => {
            heard = alts;
            const diff = bestWordDiff(ex.target, alts);
            const missed = diff.filter((w) => !w.ok);
            status.innerHTML = `Услышано: <b>${esc(alts[0] || "")}</b>`;
            wordsBox.hidden = false;
            wordsBox.innerHTML = `<div class="speak-words__line">${diff.map((w) => `<span class="sw ${w.ok ? "sw--ok" : "sw--miss"}">${esc(w.word)}</span>`).join(" ")}</div>
              <div class="speak-words__tip">${missed.length
                ? `Не расслышал: ${missed.map((w) => `<button type="button" class="sw-say" data-say="${esc(w.word.replace(/[^\p{L}\p{N}'’-]/gu, ""))}">${esc(w.word.replace(/[^\p{L}\p{N}'’-]/gu, ""))}</button>`).join(" ")}. Нажмите на слово, чтобы послушать, и попробуйте ещё раз`
                : "Все слова расслышаны"}</div>`;
            bindSpeak(wordsBox, ctx);
            ctx.onReady(alts.length > 0);
          })
          .catch((err) => { status.textContent = err.message; })
          .finally(() => btn.classList.remove("is-listening"));
      });
      return {
        check() {
          btn.disabled = true;
          // Распознавание неточное, поэтому прощаем мелкие расхождения
          const answers = [ex.target].concat(ex.alt || []);
          const ok = heard.some((h) => {
            const r = matchText(h, answers);
            if (r.correct) return true;
            const a = norm(answers[0]), b = norm(h);
            return lev(a, b) <= Math.max(2, Math.round(a.length * 0.25));
          });
          return { correct: ok, solution: ex.target };
        }
      };
    }
  };

  /* ---------- Сравнение фразы с распознанной речью по словам ---------- */
  function wordDiff(target, heardText) {
    const heardTokens = norm(heardText).split(" ").filter(Boolean);
    const found = (t) => heardTokens.some((h) => h === t || (t.length >= 5 && lev(h, t) <= 1));
    return target.split(/\s+/).filter(Boolean).map((word) => {
      const parts = norm(word).split(" ").filter(Boolean);
      return { word, ok: !parts.length || parts.every(found) };
    });
  }
  // Берём вариант распознавания, в котором расслышано больше всего слов
  function bestWordDiff(target, alts) {
    let best = wordDiff(target, "");
    for (const a of alts) {
      const d = wordDiff(target, a);
      if (d.filter((w) => w.ok).length > best.filter((w) => w.ok).length) best = d;
    }
    return best;
  }

  /* ---------- Объяснения ошибок ---------- */
  let byRu = null, byEn = null;
  function indexWords() {
    byRu = Object.create(null); byEn = Object.create(null);
    COURSE.units.forEach((u) => u.lessons.forEach((l) => l.words.forEach((w) => {
      if (!byRu[w.ru.toLowerCase()]) byRu[w.ru.toLowerCase()] = w;
      if (!byEn[w.en.toLowerCase()]) byEn[w.en.toLowerCase()] = w;
    })));
  }
  const wordByRu = (ru) => { if (!byRu) indexWords(); return byRu[String(ru).toLowerCase()] || null; };
  const wordByEn = (en) => { if (!byEn) indexWords(); return byEn[String(en).toLowerCase()] || null; };

  // Пример фразы со словом: сначала из того же урока, потом из любого
  function exampleFor(en, lessonId) {
    const key = en.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp("(^|[^a-z'])" + key + "([^a-z']|$)", "i");
    let best = null;
    for (const u of COURSE.units) for (const l of u.lessons) for (const s of l.sentences || []) {
      if (!re.test(s.en) || s.en.toLowerCase() === en.toLowerCase()) continue;
      if (l.id === lessonId) return s;
      if (!best) best = s;
    }
    return best;
  }

  // Произношение русскими буквами с ударением: həˈloʊ -> хэло́у (приблизительно, для начинающих)
  function ruPhon(ipa) {
    if (!ipa) return "";
    const s = String(ipa).replace(/[ˌ.\/]/g, "");
    const MULTI = [["tʃ", "ч"], ["dʒ", "дж"], ["eɪ", "эй"], ["aɪ", "ай"], ["oʊ", "оу"], ["aʊ", "ау"], ["ɔɪ", "ой"], ["ɝ", "ёр"], ["ɚ", "эр"]];
    const ONE = { b: "б", d: "д", f: "ф", g: "г", h: "х", k: "к", l: "л", m: "м", n: "н", p: "п", r: "р", s: "с", t: "т", v: "в", z: "з", θ: "с", ð: "з", ʃ: "ш", ʒ: "ж", w: "у", æ: "э", ɑ: "а", ʌ: "а", ə: "э", ɛ: "э", ɪ: "и", i: "и", ʊ: "у", u: "у", ɔ: "о", " ": " " };
    const VOW = "æɑʌəɛɪiʊuɔ";
    const out = [];
    let stress = false;
    for (let i = 0; i < s.length;) {
      const c = s[i];
      if (c === "ˈ") { stress = true; i++; continue; }
      if (c === "j") {
        const n = s[i + 1], start = i === 0 || s[i - 1] === " " || s[i - 1] === "ˈ";
        const pair = start
          ? { u: "ю", ʊ: "ю", ɛ: "йе", ə: "йе", æ: "йэ", ɑ: "йа", ɔ: "йо", ɪ: "йи", i: "йи" }[n]
          : { æ: "я", ɑ: "я", u: "ю", ʊ: "ю", ɔ: "ё", ɛ: "е", ə: "е", ɪ: "и", i: "и" }[n];
        if (pair) { out.push({ t: pair, v: true, st: stress }); stress = false; i += 2; continue; }
        out.push({ t: "й" }); i++; continue;
      }
      if (c === "ŋ") { out.push({ t: s[i + 1] === "k" || s[i + 1] === "g" ? "н" : "нг" }); i++; continue; }
      const m = MULTI.find(([k]) => s.startsWith(k, i));
      if (m) { const v = m[0] !== "tʃ" && m[0] !== "dʒ"; out.push({ t: m[1], v, st: v && stress }); if (v) stress = false; i += m[0].length; continue; }
      if (ONE[c] !== undefined) { const v = VOW.includes(c); out.push({ t: ONE[c], v, st: v && stress }); if (v) stress = false; i++; continue; }
      i++;
    }
    const many = out.filter((x) => x.v).length > 1;
    // Ударение ставим на первую гласную букву слога (в «йе» - на «е»)
    return out.map((x) => {
      if (!(x.st && many)) return x.t;
      const k = x.t.search(/[аэиоуыеёюя]/);
      return k < 0 ? x.t : x.t.slice(0, k + 1) + "\u0301" + x.t.slice(k + 1);
    }).join("");
  }

  // Транскрипция слова: /ˈæpəl/ (если есть в словаре)
  const ipaOf = (en) => (typeof IPA === "object" && en && IPA[String(en).toLowerCase()] ? `/${IPA[String(en).toLowerCase()]}/` : "");

  const topicOf = (ex) => (ex && ex.gap && typeof GAP_WHY === "object" && GAP_WHY[ex.gap.text] ? GAP_WHY[ex.gap.text][0] : null);

  // Главная тема урока: та, к которой относится больше всего его заданий с пропуском
  function lessonTopic(lessonId) {
    if (typeof GAP_WHY !== "object" || !lessonId) return null;
    const count = {};
    for (const u of COURSE.units) for (const l of u.lessons) if (l.id === lessonId)
      for (const g of l.gaps || []) { const t = GAP_WHY[g.text]; if (t) count[t[0]] = (count[t[0]] || 0) + 1; }
    const best = Object.entries(count).sort((a, b) => b[1] - a[1])[0];
    return best ? best[0] : null;
  }

  // Что объяснить после ответа: почему так, чем отличается выбранный вариант, пример и тема
  function explain(ex, res, lessonId) {
    const out = { why: "", contrast: "", example: null, topic: null, word: null };
    const given = String((res && res.given) || "").trim();
    if (ex.gap) {
      const g = typeof GAP_WHY === "object" ? GAP_WHY[ex.gap.text] : null;
      if (g) { out.topic = g[0]; out.why = g[1]; }
      if (given && given !== ex.gap.answer) out.contrast = `Вы выбрали «${given}»: ${ex.gap.text.replace("___", given)} - так нельзя.`;
      return out;
    }
    if (ex.type === "firstLetter") {
      out.why = `${ex.vocab.en} (${ex.vocab.ru}): нужная буква ${ex.word.en.toUpperCase()}, она называется «${ex.word.ru}».`;
      return out;
    }
    if (ex.letters) {
      const l = ex.word || { en: ex.target, ru: ex.ru };
      out.why = `Буква ${String(l.en).toUpperCase()} называется «${l.ru}».`;
      return out;
    }
    const w = ex.word && ex.word.en.length > 1 ? ex.word
      : (ex.type === "listen" || ex.type === "dictation") && !ex.letters ? wordByEn(ex.target) : null;
    if (w) {
      out.word = w;
      out.why = `${w.en} - ${w.ru}`;
      out.example = exampleFor(w.en, lessonId);
      if (given && given.toLowerCase() !== w.en.toLowerCase() && given.toLowerCase() !== w.ru.toLowerCase()) {
        const o = wordByRu(given) || wordByEn(given);
        if (o && o.en !== w.en) {
          out.contrast = o.ru.toLowerCase() === given.toLowerCase()
            ? `«${given}» - это «${o.en}», а «${w.en}» - это «${w.ru}».`
            : `«${o.en}» означает «${o.ru}», а нужно было «${w.en}» (${w.ru}).`;
        } else if (ex.type === "type" || ex.type === "dictation") {
          out.contrast = `Вы написали: «${given}».`;
        }
      }
      out.topic = lessonTopic(lessonId);
      return out;
    }
    if (ex.type === "dialog") {
      const q = ex.context.length ? ex.context[ex.context.length - 1].en : "";
      out.why = q ? `На реплику «${q}» подходит «${ex.line.en}» (${ex.line.ru}).` : `Подходит «${ex.line.en}» (${ex.line.ru}).`;
      if (given && given !== ex.line.en) out.contrast = `«${given}» не подходит: в нём ошибка или он не отвечает на сказанное.`;
    } else if (ex.type === "story") {
      out.why = `Ответ есть в тексте. Перевод текста: ${ex.story.ru}`;
    } else {
      const s = ex.sentence || (ex.target ? { en: ex.target, ru: ex.ru } : null);
      if (s) out.why = `${s.en} - ${s.ru}`;
      if (given) out.contrast = `Ваш ответ: «${given}».`;
    }
    out.topic = lessonTopic(lessonId);
    return out;
  }

  /* ---------- Ответ пользователя и подсказки для любого задания ---------- */
  function readGiven(root) {
    const sel = root.querySelector(".option.is-selected, .pic-card.is-selected");
    if (sel) {
      const spans = sel.querySelectorAll("span");
      return (spans.length ? spans[spans.length - 1] : sel).textContent.trim();
    }
    const ta = root.querySelector("textarea");
    if (ta) return ta.value.trim();
    const chips = root.querySelectorAll(".builder__answer .chip");
    return chips.length ? [...chips].map((c) => c.textContent.trim()).join(" ") : "";
  }

  // Номер правильного варианта для заданий с выбором
  function correctIndex(ex) {
    switch (ex.type) {
      case "choose": case "picture": case "firstLetter": return ex.options.findIndex((o) => o.en === ex.word.en);
      case "listen": return ex.options.indexOf(ex.meaning ? ex.answer : ex.target);
      case "gap": return ex.options.indexOf(ex.gap.answer);
      case "dialog": return ex.options.indexOf(ex.line.en);
      case "story": return ex.options.indexOf(ex.question.answer);
      default: return -1;
    }
  }

  // Подсказка: убрать неверные варианты, показать правило или начало ответа
  function makeHint(ex, root, ctx) {
    const ci = correctIndex(ex);
    if (ci >= 0) {
      return () => {
        const list = [...root.querySelectorAll(".option, .pic-card")];
        const wrong = list.map((b, i) => i).filter((i) => i !== ci && !list[i].disabled);
        const remove = shuffle(wrong).slice(0, Math.max(1, wrong.length - 1));
        remove.forEach((i) => {
          const b = list[i];
          if (b.classList.contains("is-selected")) { b.classList.remove("is-selected"); ctx.onReady(false); }
          b.disabled = true;
          b.classList.add("is-hinted-out");
        });
        const t = topicOf(ex);
        if (t && TOPICS[t]) return `Правило: ${TOPICS[t].rule}`;
        return remove.length > 1 ? "Убрали неверные варианты, осталось выбрать из двух" : "Убрали один неверный вариант";
      };
    }
    if (ex.type === "type" || ex.type === "dictation") {
      return () => {
        const ans = ex.type === "type" ? ex.word.en : ex.target;
        const k = Math.max(1, Math.ceil(ans.replace(/\s+/g, "").length / 4));
        const words = ans.trim().split(/\s+/).length;
        return `Начинается так: «${ans.slice(0, k)}…». ${words > 1 ? `Слов: ${words}` : `Букв: ${ans.length}`}`;
      };
    }
    if (ex.type === "build") {
      return () => {
        const words = ex.sentence.en.split(/\s+/);
        // Открываем только начало: одно слово в короткой фразе, два в длинной
        const k = words.length >= 6 ? 2 : 1;
        return `Начало фразы: «${words.slice(0, k).join(" ")} …». Всего слов: ${tokenize(ex.sentence.en).length}`;
      };
    }
    return null;
  }

  let renderSeq = 0;
  function render(ex, root, ctx) {
    root.dataset.renderId = String(++renderSeq);
    root.classList.remove("ex-enter");
    void root.offsetWidth;
    root.classList.add("ex-enter");
    const ctrl = renderers[ex.type](ex, root, ctx);
    // Запоминаем ответ пользователя, чтобы объяснить ошибку
    const check = ctrl.check;
    ctrl.check = () => {
      const given = readGiven(root);
      const r = check();
      if (r && !r.silent && !r.pending) r.given = given;
      return r;
    };
    if (!ctrl.hint) ctrl.hint = makeHint(ex, root, ctx);
    return ctrl;
  }

  return { build, buildReview, buildTest, render, norm, matchText, esc, shuffle, grammarCard, bindSpeak, errorItem, errorList, explain, topicOf, exampleFor, ipaOf, ruPhon, similar };
})();
