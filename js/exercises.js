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
    "how's": "how is", "there's": "there is", "i've": "i have", "i'd": "i would"
  };

  function norm(s) {
    let t = String(s || "").toLowerCase().replace(/[’`´]/g, "'").replace(/\s+/g, " ").trim();
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

  /* ---------- Генератор ---------- */
  function isLetterLesson(lesson) {
    return lesson.words.every((w) => w.en.length === 1);
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

    // Отвлекающие варианты, не совпадающие с правильным ни по en, ни по ru
    const distractors = (word, n, from = pool) =>
      sample(from.filter((w) => w.en !== word.en && w.ru !== word.ru), n);

    const out = [];
    const ws = shuffle(words);

    // 0. Объяснение грамматики перед первым прохождением урока
    if (!isReplay && typeof GRAMMAR === "object" && GRAMMAR[lesson.id]) {
      out.push({ type: "grammar", g: GRAMMAR[lesson.id] });
    }

    // 1. Карточки новых слов (только при первом прохождении)
    if (!isReplay) {
      ws.slice(0, letters ? 3 : 2).forEach((w) => out.push({ type: "teach", word: w, letters }));
    }

    const body = [];

    // 2. Выбор перевода en -> ru
    ws.slice(0, 2).forEach((w) => {
      body.push({ type: "choose", dir: "en-ru", word: w, letters, options: shuffle([w, ...distractors(w, 3)]) });
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
    if (words.length >= 4) {
      body.push({ type: "match", pairs: sample(words, Math.min(5, words.length)) });
    }

    // 6. Аудирование: выбор услышанного
    const listenWord = ws[3] || ws[0];
    if (listenWord) {
      body.push({ type: "listen", target: listenWord.en, ru: listenWord.ru, options: shuffle([listenWord.en, ...distractors(listenWord, 3).map((w) => w.en)]) });
    }

    // 7. Ввод перевода с клавиатуры
    const typeWord = ws[4] || ws[1];
    if (typeWord) body.push({ type: "type", word: typeWord, letters });

    // 8. Составление предложений
    sample(sentences, 3).forEach((s) => {
      const tokens = tokenize(s.en);
      const lower = new Set(tokens.map((t) => t.toLowerCase()));
      const extra = uniqBy(
        shuffle(unitSentences.concat(sentences).flatMap((x) => tokenize(x.en)).concat(words.map((w) => w.en).filter((e) => !e.includes(" ")))),
        (t) => t.toLowerCase()
      ).filter((t) => !lower.has(t.toLowerCase())).slice(0, Math.min(4, Math.max(2, 7 - tokens.length)));
      body.push({ type: "build", sentence: s, tiles: shuffle(tokens.concat(extra).map((t, i) => ({ t, i }))) });
    });

    // 9. Пропуски с формой глагола
    sample(gaps, 3).forEach((g) => body.push({ type: "gap", gap: g, options: shuffle(g.options) }));

    // 10. Аудирование предложения или диктант слова
    if (sentences.length) {
      const s = sentences[(Math.random() * sentences.length) | 0];
      if (Math.random() < 0.5) {
        const others = sample(uniqBy(unitSentences.concat(courseSentences).filter((x) => x.en !== s.en), (x) => x.en), 3).map((x) => x.en);
        body.push({ type: "listen", target: s.en, ru: s.ru, options: shuffle([s.en, ...others]) });
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
    grammar(ex, root, ctx) {
      root.innerHTML = `<div class="ex-head"><span class="ex-kicker">Как это работает</span><h2 class="ex-title">${esc(ex.g.title)}</h2></div>
        <div class="rule-wrap">${grammarCard(ex.g)}<div class="rule__fox">${SVG.mascot({ mood: "readlaugh", hat: ctx.hat })}</div></div>`;
      bindSpeak(root, ctx);
      ctx.onReady(true);
      return { check: () => ({ correct: true, silent: true }) };
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
          <div class="teach__tr">${esc(w.ru)}</div>
          ${w.tip ? `<div class="teach__tip">${esc(w.tip)}</div>` : ""}
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
      const prompt = enRu ? `${speakBtn(w.en)}<span>${esc(w.en)}</span>` : `<span>${esc(w.ru)}</span>`;
      const items = ex.options.map((o) => ({ label: enRu ? o.ru : o.en, en: o.en }));
      root.innerHTML = `<h2 class="ex-title">${title}</h2>${mascotBubble(prompt, ctx)}${optionsList(items)}`;
      bindSpeak(root, ctx);
      if (enRu) ctx.auto(w.en);
      const sel = bindSingleSelect(root, ctx);
      const correctIdx = ex.options.findIndex((o) => o.en === w.en);
      return {
        select: sel.select,
        check() {
          sel.mark(correctIdx);
          return { correct: sel.selected === correctIdx, solution: enRu ? w.ru : w.en };
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
      root.innerHTML = `<h2 class="ex-title">Найдите пары</h2>
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
        ${mascotBubble(`<span>${esc(w.ru)}</span>`, ctx)}
        <textarea class="type-area" rows="3" placeholder="Введите ответ по-английски" aria-label="Ваш ответ" autocomplete="off" autocapitalize="off" spellcheck="false"></textarea>
        <p class="type-hint">Нажмите Enter, чтобы проверить</p>`;
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
      root.innerHTML = `<h2 class="ex-title">Что вы услышали?</h2>
        <div class="listen-row">${speakBtn(ex.target, "speak-btn--xl")}${speakBtn(ex.target, "speak-btn--slow", true)}</div>
        ${optionsList(ex.options.map((o) => ({ label: o })))}`;
      bindSpeak(root, ctx);
      setTimeout(() => ctx.speak(ex.target), 250);
      const sel = bindSingleSelect(root, ctx);
      const correctIdx = ex.options.indexOf(ex.target);
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
        for (const s of sentences) { if (!root.isConnected) break; await ctx.speak(s); }
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
      root.innerHTML = `<h2 class="ex-title">Скажите вслух</h2>
        ${mascotBubble(`${speakBtn(ex.target)}<span>${esc(ex.target)}</span>`, ctx)}
        <p class="type-hint">${esc(ex.ru)}</p>
        <div class="listen-row"><button class="mic-btn" type="button" aria-label="Говорить">${SVG.icon("mic")}</button></div>
        <p class="speak-status" aria-live="polite">Нажмите на микрофон и произнесите фразу</p>
        <div class="speak-words" hidden></div>`;
      bindSpeak(root, ctx);
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

  function render(ex, root, ctx) {
    root.classList.remove("ex-enter");
    void root.offsetWidth;
    root.classList.add("ex-enter");
    return renderers[ex.type](ex, root, ctx);
  }

  return { build, buildReview, buildTest, render, norm, matchText, esc, shuffle, grammarCard, bindSpeak, errorItem, errorList };
})();
