/* Новые темы C1-C2: 66-74 */
(function () {
  const C = window.GRAMMAR_COURSE;
  const P = (window.GRAMMAR_PLUS = window.GRAMMAR_PLUS || {});
  const T = (window.TRAINER = window.TRAINER || {});
  const S = (h, t, ex) => ({ h, t, ex: ex || [] });
  const O = (q, words, a, why) => ({ k: "order", q, words, a, why });
  const Ch = (q, o, a, why) => ({ k: "choice", q, o, a, why });
  const I = (q, a, why) => ({ k: "input", q, a, why });
  const F = (q, a, why) => ({ k: "fix", q, a, why });
  const add = (id, lvl, t, body) => C.lessons.push({ id, lvl, t, body, tasks: [] });
  // Варианты ответа: {a/b/} раскрывается во все сочетания (пустой вариант = слово можно опустить)
  const ex = (s) => {
    const m = s.match(/\{([^{}]*)\}/);
    if (!m) return [s.replace(/\s+/g, " ").trim()];
    return m[1].split("/").flatMap((o) => ex(s.replace(m[0], o)));
  };
  const XA = (...ps) => [...new Set(ps.flatMap(ex))];
  const X = (...ps) => XA(...ps).join("|");

  /* ---------- 66. Cleft sentences ---------- */
  add(66, "C1", "Cleft sentences: It was... that, What I need is", `<p><b>Cleft sentence</b> - «расщеплённое» предложение: одну часть выносим в рамку, чтобы выделить главное. По-русски мы делаем это интонацией или словом «именно».</p>
<div class="formula">It is / was + ГЛАВНОЕ + that / who + остальное</div>
<p><i>Tom broke the window. → <b>It was Tom who</b> broke the window.</i> - Окно разбил именно Том.<br>
<i><b>It was</b> yesterday <b>that</b> I saw her.</i> - Видел я её именно вчера.</p>
<div class="formula">What + кто + глагол + is / was + ГЛАВНОЕ</div>
<table class="t"><tr><th>Схема</th><th>Пример</th><th>Перевод</th></tr>
<tr><td>What I need is…</td><td><i><b>What I need is</b> a break.</i></td><td>Что мне нужно, так это перерыв.</td></tr>
<tr><td>What happened was…</td><td><i><b>What happened was</b> (that) we got lost.</i></td><td>Случилось вот что: мы заблудились.</td></tr>
<tr><td>All I want is…</td><td><i><b>All I want is</b> some sleep.</i></td><td>Всё, чего я хочу, это поспать.</td></tr>
<tr><td>The thing is…</td><td><i><b>The thing is</b>, I don't have time.</i></td><td>Дело в том, что у меня нет времени.</td></tr>
<tr><td>The reason why… is that…</td><td><i><b>The reason why</b> I came <b>is that</b> I missed you.</i></td><td>Я пришёл потому, что скучал.</td></tr></table>
<p>Если выделяем действие, после What ставим <b>do / did</b>: <i>What I did <b>was call</b> the police.</i> - Я сделал вот что: вызвал полицию.</p>
<div class="err">❌ It was Tom which called. → ✅ It was Tom who called. &nbsp; ❌ What I need it is time. → ✅ What I need is time. &nbsp; ❌ All what I want… → ✅ All I want…</div>`);

  P[66] = {
    steps: [
      S("Шаг 1. Зачем «расщеплять» предложение", "По-русски главное слово выделяют интонацией или словом «именно». В английском порядок слов жёсткий, поэтому главное выносят в отдельную рамку It was ... that. Так говорят и в разговоре, и в эссе.", [["It was my sister who called.", "Звонила именно моя сестра."], ["It is English that I need, not French.", "Мне нужен именно английский, а не французский."]]),
      S("Шаг 2. It is / was + главное + that / who", "Время берём по смыслу: о прошлом was, о настоящем is. Про человека можно who или that, про всё остальное that. Остаток предложения идёт в обычном порядке.", [["It was in Paris that they met.", "Познакомились они именно в Париже."], ["It is Max who makes the decisions.", "Решения принимает именно Макс."], ["It was last year that I started running.", "Бегать я начал именно в прошлом году."]]),
      S("Шаг 3. What + кто + глагол + is / was", "Начинаем с «то, что мне нужно...», а главное ставим в конец, после is. Получается пауза и интрига: слушатель ждёт ответа.", [["What I need is more practice.", "Что мне нужно, так это больше практики."], ["What she said was true.", "То, что она сказала, было правдой."]]),
      S("Шаг 4. Выделяем действие: What I did was...", "Если в центре внимания действие, после What ставим do / did, а после is / was идёт глагол в простой форме (можно с to).", [["What I did was call my dad.", "Я сделал вот что: позвонил папе."], ["What you should do is apologise.", "Тебе нужно сделать вот что: извиниться."]]),
      S("Шаг 5. All I want is, The thing is", "All I want is = «всё, чего я хочу». All what так не говорят. The thing is = «дело в том, что»: очень частая фраза в разговоре.", [["All I want is a quiet evening.", "Всё, чего я хочу, это тихий вечер."], ["The thing is, I've lost my passport.", "Дело в том, что я потерял паспорт."]]),
      S("Шаг 6. В эссе: The reason why... is that...", "В академическом письме удобны схемы The reason why X is that... и What matters most is... Они сразу показывают читателю главную мысль.", [["The reason why students fail is that they do not revise.", "Студенты проваливаются потому, что не повторяют материал."], ["What matters most is motivation.", "Важнее всего мотивация."]])
    ],
    tasks: [
      O("Соберите: Окно разбил именно Том.", ["It", "was", "Tom", "who", "broke", "the window"], "It was Tom who broke the window", "It was + главное + who + остальное."),
      O("Соберите: Что мне нужно, так это перерыв.", ["What", "I", "need", "is", "a break"], "What I need is a break", "What + I need + is + главное в конце."),
      O("Соберите: Всё, чего я хочу, это поспать.", ["All", "I", "want", "is", "to sleep"], "All I want is to sleep", "All I want is... без what."),
      Ch("It was my brother ___ told me the news.", ["which", "who", "what"], 1, "Про человека: who (или that)."),
      Ch("___ I need is more time.", ["That", "What", "Which"], 1, "What I need is... = «то, что мне нужно»."),
      Ch("All ___ want is some peace.", ["what I", "I", "that what I"], 1, "После all сразу кто + глагол, what не нужен."),
      Ch("What I did ___ call the police.", ["was", "did", "is that"], 0, "Речь о прошлом: What I did was + глагол."),
      I("It ___ in 2020 that we moved to Kazan. (вставьте одно слово)", ["was"], "Прошлое: It was ... that."),
      I("Переведите: Дело в том, что я устал.", XA("The thing is {that /}I am tired", "The thing is {that /}I'm tired"), "The thing is = дело в том, что."),
      F("Исправьте: What I need it is your help.", ["What I need is your help"], "После What-части лишнее it не ставим.")
    ]
  };

  T[66] = [
    ["Звонила именно моя мама.", X("It was my {mom/mother} who called", "It was my {mom/mother} that called"), "It was ... who"],
    ["Познакомились мы именно в Лондоне.", X("It was in London that we met", "It was in London where we met", "It was London where we met"), "It was ... that"],
    ["Что мне нужно, так это время.", X("What I need is time", "What I need is more time"), "What I need is"],
    ["Всё, чего я хочу, это спать.", X("All I want is to sleep", "All I want is sleep", "All I want to do is sleep", "All I want to do is to sleep"), "All I want is"],
    ["Дело в том, что у меня нет денег.", X("The thing is {that /}I have no money", "The thing is {that /}I don't have any money", "The thing is {that /}I don't have money"), "The thing is"],
    ["Что меня удивило, так это его ответ.", X("What surprised me was his {answer/reply/response}"), "What ... was"],
    ["Я сделал вот что: позвонил другу.", X("What I did was {call/to call} {my/a} friend"), "What I did was"],
    ["Решения принимает именно учитель.", X("It is the teacher {who/that} makes the decisions", "It is the teacher {who/that} decides", "It's the teacher {who/that} makes the decisions", "It's the teacher {who/that} decides"), "It is ... who"],
    ["Важнее всего мотивация.", X("What matters most is motivation", "What is most important is motivation", "The most important thing is motivation"), "What matters most is"],
    ["Я понял это только вчера.", X("It was only yesterday that I {realized/realised/understood} it", "It was only yesterday that I {realized/realised/understood} this", "It was yesterday that I {realized/realised/understood} it"), "It was only ... that"],
    ["Я учу английский потому, что хочу учиться в США.", X("The reason {why /}I {learn/am learning/study} English is that I want to study in the {USA/US/States}"), "The reason why ... is that"],
    ["Тебе нужно сделать вот что: извиниться.", X("What you need to do is {apologize/apologise/to apologize/to apologise}", "What you should do is {apologize/apologise}", "What you have to do is {apologize/apologise}"), "What you need to do is"]
  ];

  /* ---------- 67. Эмфаза ---------- */
  add(67, "C1", "Эмфаза: do / did, the very, at all", `<p>Как сказать «правда», «действительно», «именно», «вообще» не словами, а грамматикой.</p>
<div class="formula">do / does / did + глагол (под ударением)</div>
<p><i>I <b>do</b> like your idea!</i> - Мне правда нравится твоя идея!<br>
<i>She <b>did</b> call, I promise.</i> - Она действительно звонила, честно.<br>
<i><b>Do</b> sit down.</i> - Да садитесь же.</p>
<table class="t"><tr><th>Средство</th><th>Значение</th><th>Пример</th></tr>
<tr><td>the very + сущ.</td><td>тот самый, самый</td><td><i>This is <b>the very</b> book I needed. At <b>the very</b> end.</i></td></tr>
<tr><td>at all</td><td>вообще, совсем (в «−» и «?»)</td><td><i>I don't like it <b>at all</b>. Do you know him <b>at all</b>?</i></td></tr>
<tr><td>no + сущ. + whatsoever</td><td>абсолютно никакой</td><td><i>I have <b>no</b> idea <b>whatsoever</b>.</i></td></tr>
<tr><td>whatever / whoever / wherever</td><td>что бы ни, кто бы ни; удивление в вопросе</td><td><i><b>Whatever</b> happens, stay calm. <b>Whoever</b> told you that?</i></td></tr>
<tr><td>by far + превосх. ст.</td><td>безусловно, намного</td><td><i>She is <b>by far</b> the best student.</i></td></tr>
<tr><td>-self</td><td>сам, лично</td><td><i>I made it <b>myself</b>. The director <b>himself</b> came.</i></td></tr></table>
<div class="err">❌ I do likes it. → ✅ I do like it. &nbsp; ❌ She did called. → ✅ She did call. &nbsp; ❌ I like it at all. → ✅ I don't like it at all. &nbsp; ❌ He is by far tall. → ✅ He is by far the tallest.</div>`);

  P[67] = {
    steps: [
      S("Шаг 1. Do / does / did перед глаголом", "В обычном утверждении do не нужен. Но если хотим сказать «правда», «действительно», «всё-таки», добавляем do / does / did и произносим его с ударением. Глагол после него в простой форме.", [["I do love this song!", "Я правда обожаю эту песню!"], ["He does work hard.", "Он действительно много работает."], ["I did lock the door!", "Я же закрыл дверь!"]]),
      S("Шаг 2. Когда спорят и приглашают", "Чаще всего такой do звучит в споре, когда исправляем собеседника: «Ты не сделал!» - «Сделал!». В повелительном наклонении Do come in звучит тепло и настойчиво.", [["You didn't do your homework. - I did do it!", "Ты не сделал домашку. - Да сделал я её!"], ["Do come in!", "Да заходите же!"]]),
      S("Шаг 3. The very + существительное", "The very = «тот самый», «именно этот». С beginning, end, top, first значит «самый»: the very beginning = самое начало.", [["That's the very thing I was looking for.", "Это именно то, что я искал."], ["at the very end of the film", "в самом конце фильма"]]),
      S("Шаг 4. At all и whatsoever", "At all усиливает отрицание и вопрос: «вообще», «совсем». Ставим в конец. No + существительное + whatsoever звучит ещё сильнее: «абсолютно никакой».", [["I didn't sleep at all.", "Я вообще не спал."], ["Do you know him at all?", "Ты его вообще знаешь?"], ["There is no evidence whatsoever.", "Нет абсолютно никаких доказательств."]]),
      S("Шаг 5. Whatever, whoever, by far", "Whatever / whoever / wherever = «что бы ни», «кто бы ни», «где бы ни». В вопросе выражают удивление. By far + превосходная степень = «безусловно самый».", [["Whatever you do, don't panic.", "Что бы ты ни делал, не паникуй."], ["Whoever told you that?", "И кто же тебе такое сказал?"], ["It is by far the best option.", "Это безусловно лучший вариант."]]),
      S("Шаг 6. Myself, himself для выделения", "-self после существительного или в конце предложения = «сам», «лично». Это не возвратное действие, а акцент.", [["I built this website myself.", "Я сам сделал этот сайт."], ["The president himself answered.", "Ответил сам президент."]])
    ],
    tasks: [
      O("Соберите: Я правда люблю этот город.", ["I", "do", "love", "this city"], "I do love this city", "do + глагол в простой форме = «правда»."),
      O("Соберите: Я вообще не понимаю.", ["I", "don't", "understand", "at all"], "I don't understand at all", "at all в конце усиливает отрицание."),
      O("Соберите: Это безусловно лучший фильм года.", ["It", "is", "by far", "the best", "film", "of the year"], "It is by far the best film of the year", "by far + превосходная степень."),
      Ch("She ___ call you yesterday, I saw it!", ["did", "does", "was"], 0, "Прошлое: did + глагол."),
      Ch("He ___ know a lot about history.", ["do", "does", "did knows"], 1, "He: does + know (без -s)."),
      Ch("This is ___ moment I was waiting for.", ["the very", "very the", "a very"], 0, "the very + сущ. = тот самый."),
      Ch("I made this cake ___ .", ["by me", "myself", "me"], 1, "-self = сам, лично."),
      I("___ happens, I will help you. (что бы ни, одно слово)", ["Whatever"], "Whatever = что бы ни."),
      I("Переведите: Я вообще не устал.", XA("I am not tired at all", "I am not at all tired"), "not ... at all."),
      F("Исправьте: I do likes pizza.", ["I do like pizza"], "После do глагол без -s.")
    ]
  };

  T[67] = [
    ["Я правда люблю тебя.", X("I do love you", "I really do love you"), "do + глагол"],
    ["Она действительно звонила!", X("She did call", "She really did call", "She did really call"), "did + глагол"],
    ["Он правда много работает.", X("He {does/really does} work {hard/a lot}"), "does + work"],
    ["Я вообще не спал.", X("I {didn't/did not} sleep at all", "I {haven't/have not} slept at all"), "at all"],
    ["Ты его вообще знаешь?", X("Do you know him at all", "Do you even know him"), "at all в вопросе"],
    ["Это именно та книга, которая мне нужна.", X("{This/That/It} is the very book {that /which /}I need"), "the very"],
    ["Что бы ни случилось, не сдавайся.", X("Whatever happens {don't/do not} give up", "No matter what happens {don't/do not} give up"), "whatever"],
    ["Он безусловно лучший игрок в команде.", X("He is by far the best player {in/on} the team", "He is by far the best player of the team"), "by far"],
    ["Я сам приготовил ужин.", X("I {cooked/made} {dinner/the dinner} myself", "I myself {cooked/made} {dinner/the dinner}"), "myself"],
    ["У меня нет абсолютно никакого опыта.", X("I have no experience whatsoever", "I have no experience at all", "I {don't/do not} have any experience {at all/whatsoever}"), "no ... whatsoever"],
    ["Да садитесь же!", X("Do sit down", "Please do sit down", "Do sit down please", "Do take a seat"), "Do + глагол"],
    ["Мы дошли до самого конца.", X("We {got/went/walked/came} to the very end", "We reached the very end"), "the very"]
  ];

  /* ---------- 68. Эллипсис и замена ---------- */
  add(68, "C1", "Эллипсис и замена: so, not, one, do so", `<p>В живой речи англичане не повторяют то, что уже сказано. Вместо повтора ставят короткое слово-заместитель или просто опускают часть фразы.</p>
<div class="formula">so / not · one / ones · помощник · to · do so</div>
<table class="t"><tr><th>Заместитель</th><th>Что заменяет</th><th>Пример</th></tr>
<tr><td>so / not</td><td>целое предложение после think, hope, guess, suppose, be afraid</td><td><i>Will it rain? - I <b>think so</b>. / I <b>hope not</b>.</i></td></tr>
<tr><td>one / ones</td><td>исчисляемое существительное</td><td><i>I don't like the red shirt. I'll take the blue <b>one</b>.</i></td></tr>
<tr><td>помощник</td><td>сказуемое</td><td><i>Can you swim? - Yes, I <b>can</b>. She likes jazz, and so <b>do</b> I.</i></td></tr>
<tr><td>to</td><td>глагол после want, would like, love, try, mean</td><td><i>Come with us! - I'd love <b>to</b>.</i></td></tr>
<tr><td>do so</td><td>действие (книжно)</td><td><i>He promised to help, and he <b>did so</b>.</i></td></tr></table>
<p><b>Отрицание:</b> с think, believe, expect обычно <i>I <b>don't</b> think so</i>. С hope и be afraid только <i>I hope <b>not</b>, I'm afraid <b>not</b></i>.</p>
<div class="err">❌ I think yes. → ✅ I think so. &nbsp; ❌ I don't hope so. → ✅ I hope not. &nbsp; ❌ I'd like. → ✅ I'd like to. &nbsp; ❌ I want the red. → ✅ I want the red one.</div>`);

  P[68] = {
    steps: [
      S("Шаг 1. Не повторяйте, а заменяйте", "По-русски мы говорим «думаю, да». По-английски yes тут не подходит, нужно so. So заменяет целое предложение после think, hope, guess, suppose, expect.", [["Is he coming? - I think so.", "Он придёт? - Думаю, да."], ["Are we late? - I hope not.", "Мы опаздываем? - Надеюсь, нет."]]),
      S("Шаг 2. Отрицание: don't think so или hope not", "С think, believe, expect отрицание ставим к глаголу: I don't think so. С hope и be afraid только not в конце: I hope not, I'm afraid not.", [["Will she pass? - I don't think so.", "Она сдаст? - Думаю, нет."], ["Is there any cake left? - I'm afraid not.", "Торт ещё остался? - Боюсь, что нет."]]),
      S("Шаг 3. One и ones вместо существительного", "Чтобы не повторять исчисляемое существительное, ставим one (если один предмет) или ones (если много). Особенно после прилагательных и this, that, which.", [["My phone is old. I need a new one.", "Мой телефон старый. Мне нужен новый."], ["Which shoes? - The black ones.", "Какие туфли? - Чёрные."]]),
      S("Шаг 4. Короткий ответ помощником", "Вместо повтора глагола оставляем только помощник: do, can, have, will, am. Так же устроены so do I и neither can I.", [["Have you finished? - Yes, I have.", "Ты закончил? - Да."], ["I can't swim. - Neither can I.", "Я не умею плавать. - Я тоже."], ["She loves sushi, and so does her brother.", "Она любит суши, и её брат тоже."]]),
      S("Шаг 5. Оставляем только to", "После want, would like, love, try, mean, have to глагол можно выбросить, но частица to остаётся. Без to фраза звучит обрубленно.", [["Do you want to come? - I'd love to.", "Хочешь пойти? - С удовольствием."], ["I didn't call him, but I meant to.", "Я ему не позвонил, хотя собирался."]]),
      S("Шаг 6. Do so в эссе", "Do so = «сделать это». Звучит официально и подходит для письма. В разговоре чаще просто do it или помощник.", [["Students may leave early if they wish to do so.", "Студенты могут уйти раньше, если захотят."], ["The government promised to cut taxes but failed to do so.", "Правительство обещало снизить налоги, но не сделало этого."]])
    ],
    tasks: [
      O("Соберите: Мне нужен новый (телефон).", ["I", "need", "a new", "one"], "I need a new one", "one заменяет phone."),
      O("Соберите: Думаю, нет.", ["I", "don't", "think", "so"], "I don't think so", "С think отрицание при глаголе: don't think so."),
      O("Соберите: С удовольствием (я бы хотел).", ["I'd", "love", "to"], "I'd love to", "После love глагол опускаем, to оставляем."),
      Ch("Will it be cold tomorrow? - I hope ___ .", ["not", "don't", "no"], 0, "hope + not."),
      Ch("I don't like this jacket. Can I see the green ___ ?", ["it", "one", "ones"], 1, "Куртка одна: one."),
      Ch("I love horror films. - So ___ I.", ["am", "do", "have"], 1, "love в Present Simple, помощник do."),
      Ch("Did you lock the door? - Yes, I ___ .", ["locked", "did", "do"], 1, "Короткий ответ: помощник прошлого did."),
      I("Do you want to dance? - I'd like ___ . (одно слово)", ["to"], "После like глагол опущен, to остаётся."),
      I("Переведите: Боюсь, что нет.", ["I am afraid not", "I'm afraid not"], "be afraid + not."),
      F("Исправьте: Is he at home? - I think yes.", ["I think so"], "«Думаю, да» = I think so.")
    ]
  };

  T[68] = [
    ["Думаю, да.", X("I think so", "I guess so", "I believe so"), "think so"],
    ["Надеюсь, нет.", "I hope not", "hope not"],
    ["Думаю, нет.", X("I {don't/do not} think so", "I {don't/do not} believe so"), "don't think so"],
    ["Боюсь, что да.", X("I am afraid so", "I'm afraid so"), "afraid so"],
    ["Мне не нравится эта рубашка. Покажите синюю.", X("I {don't/do not} like this shirt. {Show/Can you show/Could you show} me the blue one{ please/}"), "one"],
    ["Я возьму красные (яблоки).", X("I'll take the red ones", "I will take the red ones"), "ones"],
    ["Я не умею готовить. - Я тоже.", X("I can't cook. {Neither/Nor} can I", "I cannot cook. {Neither/Nor} can I", "I can't cook. Me neither", "I cannot cook. Me neither"), "neither can I"],
    ["Она любит джаз, и я тоже.", X("She {likes/loves} jazz and so do I", "She {likes/loves} jazz and I do too", "She {likes/loves} jazz and I do as well"), "so do I"],
    ["Я не позвонил ему, хотя собирался.", X("I {didn't/did not} call him {although/though/but} I {meant/wanted/was going} to"), "оставляем to"],
    ["С удовольствием! (ответ на приглашение)", X("I'd love to", "I would love to", "I'd be happy to", "I would be happy to", "I'd be glad to"), "love to"],
    ["Он обещал помочь и сделал это.", X("He promised to help and he did so", "He promised to help and he did", "He promised to help and he did it", "He promised to help and did so"), "do so"],
    ["Ты сделал домашнее задание? - Да.", X("Have you done your homework? Yes I have", "Did you do your homework? Yes I did"), "ответ помощником"]
  ];

  /* ---------- 69. Продвинутая инверсия ---------- */
  add(69, "C1", "Продвинутая инверсия: Never have I, Not only, Hardly... when", `<p><b>Инверсия</b> - вопросительный порядок слов в утверждении. После отрицательного или ограничительного слова в начале ставим <b>помощник перед подлежащим</b>. Стиль книжный и эффектный: эссе, речи, литература.</p>
<div class="formula">Never / Rarely / Not only / Only then… + помощник + кто + глагол</div>
<table class="t"><tr><th>Начало</th><th>Пример</th><th>Перевод</th></tr>
<tr><td>Never (before)</td><td><i><b>Never have I seen</b> such a crowd.</i></td><td>Никогда я не видел такой толпы.</td></tr>
<tr><td>Rarely / Seldom</td><td><i><b>Rarely does he</b> complain.</i></td><td>Он редко жалуется.</td></tr>
<tr><td>Not only… but also</td><td><i><b>Not only is she</b> smart, <b>but</b> she is <b>also</b> kind.</i></td><td>Она не только умна, но и добра.</td></tr>
<tr><td>Hardly / Scarcely… when</td><td><i><b>Hardly had we</b> arrived <b>when</b> it started to rain.</i></td><td>Едва мы приехали, как пошёл дождь.</td></tr>
<tr><td>No sooner… than</td><td><i><b>No sooner had I</b> sat down <b>than</b> the phone rang.</i></td><td>Не успел я сесть, как зазвонил телефон.</td></tr>
<tr><td>Only then / Only when…</td><td><i><b>Only then did I</b> understand.</i></td><td>Только тогда я понял.</td></tr>
<tr><td>Little</td><td><i><b>Little did I know</b> what would happen.</i></td><td>Я и не подозревал, что случится.</td></tr>
<tr><td>Under no circumstances</td><td><i><b>Under no circumstances should you</b> open it.</i></td><td>Ни в коем случае не открывай это.</td></tr></table>
<p><b>Условие без if:</b> <i><b>Had I known</b> = If I had known. <b>Should you need</b> help = If you need help. <b>Were I</b> you = If I were you.</i></p>
<div class="err">❌ Never I have seen… → ✅ Never have I seen… &nbsp; ❌ Little I knew… → ✅ Little did I know… &nbsp; ❌ No sooner had I left when… → ✅ No sooner had I left than… &nbsp; ❌ If had I known… → ✅ Had I known…</div>`);

  P[69] = {
    steps: [
      S("Шаг 1. Что такое инверсия", "Это порядок слов как в вопросе, но в обычном утверждении. Включается, когда предложение начинается с отрицательного или «ограничивающего» слова. Звучит торжественно, поэтому её любят в эссе и речах.", [["I have never seen such a view. → Never have I seen such a view.", "Никогда я не видел такого вида."]]),
      S("Шаг 2. Нужен помощник", "Если помощник уже есть (have, is, can, will), просто ставим его перед подлежащим. Если нет, берём do / does / did, а глагол возвращаем в простую форму.", [["Rarely do we eat out.", "Мы редко едим вне дома."], ["Only then did she realise the truth.", "Только тогда она поняла правду."], ["Seldom is he late.", "Он редко опаздывает."]]),
      S("Шаг 3. Not only... but also", "После Not only инверсия только в первой половине. Вторая часть (but ... also) идёт в обычном порядке.", [["Not only did he win, but he also broke the record.", "Он не только победил, но и побил рекорд."], ["Not only is it cheap, but it is also fast.", "Это не только дёшево, но и быстро."]]),
      S("Шаг 4. «Едва..., как»: Hardly... when, No sooner... than", "Обе схемы про два быстрых события подряд. Первое в Past Perfect с инверсией, второе в Past Simple. Пары фиксированные: hardly / scarcely + when, no sooner + than.", [["Hardly had I closed my eyes when the alarm went off.", "Едва я закрыл глаза, как зазвонил будильник."], ["No sooner had she left than it began to snow.", "Не успела она уйти, как пошёл снег."]]),
      S("Шаг 5. Little did I know, Only when, Under no circumstances", "Little did I know = «я и не подозревал». После Only when / Only after инверсия во второй части. Under no circumstances = «ни в коем случае».", [["Little did we know that he was lying.", "Мы и не подозревали, что он лжёт."], ["Only when I moved abroad did I appreciate my family.", "Только переехав за границу, я оценил свою семью."], ["Under no circumstances should you share your password.", "Ни в коем случае не сообщайте никому свой пароль."]]),
      S("Шаг 6. Условие без if: Had I, Should you, Were I", "If можно убрать, а помощник вынести вперёд: Had I known = If I had known, Should you need = If you need, Were I you = If I were you. Очень вежливо и официально, часто в письмах.", [["Had I known, I would have helped.", "Если бы я знал, я бы помог."], ["Should you have any questions, please contact us.", "Если у вас возникнут вопросы, свяжитесь с нами."], ["Were I in your place, I would accept the offer.", "Будь я на вашем месте, я бы принял предложение."]])
    ],
    tasks: [
      O("Соберите: Никогда я не видел такой бури.", ["Never", "have I", "seen", "such a storm"], "Never have I seen such a storm", "Never + have + I + 3-я форма."),
      O("Соберите: Я и не подозревал, что он прав.", ["Little", "did", "I", "know", "that", "he", "was", "right"], "Little did I know that he was right", "Little + did + I + know."),
      O("Соберите: Если бы я знал, я бы пришёл.", ["Had", "I", "known", "I", "would", "have", "come"], "Had I known I would have come", "Had I known = If I had known."),
      Ch("Rarely ___ such a good film.", ["I have seen", "have I seen", "I saw"], 1, "После Rarely помощник перед I."),
      Ch("No sooner had we started ___ the lights went out.", ["when", "than", "then"], 1, "Пара no sooner ... than."),
      Ch("Hardly had I sat down ___ the phone rang.", ["than", "when", "that"], 1, "Пара hardly ... when."),
      Ch("___ you need help, call me.", ["Should", "Would", "Had"], 0, "Should you need = If you need."),
      I("Only then ___ I understand the problem. (одно слово)", ["did"], "Only then + did + I + глагол."),
      I("Переведите с инверсией: Будь я тобой, я бы извинился.", XA("Were I you I would {apologize/apologise}", "Were I in your place I would {apologize/apologise}", "Were I you I would say sorry"), "Were I you = If I were you."),
      F("Исправьте: Not only he is clever, but he is also funny.", XA("Not only is he clever but he is also funny", "Not only is he clever but also funny"), "После Not only помощник is перед he.")
    ]
  };

  T[69] = [
    ["Никогда я не был так счастлив.", X("Never have I been so happy", "Never before have I been so happy", "Never have I been this happy", "Never had I been so happy"), "Never have I"],
    ["Он редко опаздывает.", X("Rarely is he late", "Seldom is he late", "Rarely does he come late", "Seldom does he come late"), "Rarely is he"],
    ["Она не только поёт, но и танцует.", X("Not only does she sing but she also dances", "Not only does she sing but she dances too", "Not only does she sing but also dances"), "Not only does"],
    ["Едва мы приехали, как начался дождь.", X("{Hardly/Scarcely} had we arrived when it {started/began} {to rain/raining}", "No sooner had we arrived than it {started/began} {to rain/raining}"), "Hardly had we"],
    ["Не успел я лечь, как зазвонил телефон.", X("No sooner had I {gone to bed/lain down/gone to sleep} than the phone rang", "{Hardly/Scarcely} had I {gone to bed/lain down/gone to sleep} when the phone rang"), "No sooner had I"],
    ["Только тогда я понял правду.", X("Only then did I {understand/realize/realise/see} the truth"), "Only then did I"],
    ["Я и не подозревал, что она уезжает.", X("Little did I know {that /}she was leaving"), "Little did I know"],
    ["Ни в коем случае не открывай эту дверь.", X("Under no circumstances should you open {this/that} door", "On no account should you open {this/that} door"), "Under no circumstances"],
    ["Если бы я знал, я бы помог.", X("Had I known I would have helped{ you/}"), "Had I known"],
    ["Если у вас возникнут вопросы, позвоните нам.", X("Should you have any questions {please /}{call us/give us a call/contact us}"), "Should you"],
    ["Будь я на твоём месте, я бы согласился.", X("Were I {in your place/you/in your shoes} I would {agree/accept}"), "Were I"],
    ["Только когда я переехал, я понял, как люблю свой город.", X("Only {when/after} I moved did I {understand/realize/realise} how much I {love/loved} my {city/town/hometown}"), "Only when ... did I"]
  ];

  /* ---------- 70. Be to, be about to, be due to ---------- */
  add(70, "C1", "Be to, be about to, be due to", `<div class="formula">am / is / are / was / were + to + глагол</div>
<table class="t"><tr><th>Форма</th><th>Значение</th><th>Пример</th></tr>
<tr><td>be to</td><td>официальный план</td><td><i>The president <b>is to visit</b> China next week.</i> - Президент посетит Китай на следующей неделе.</td></tr>
<tr><td>be to</td><td>приказ, инструкция</td><td><i>You <b>are to stay</b> here until I return.</i> - Ты должен оставаться здесь, пока я не вернусь.</td></tr>
<tr><td>be not to</td><td>запрет</td><td><i>Students <b>are not to use</b> phones during the exam.</i></td></tr>
<tr><td>be about to</td><td>вот-вот</td><td><i>Hurry! The train <b>is about to leave</b>.</i> - Поезд вот-вот уйдёт.</td></tr>
<tr><td>be due to</td><td>по графику, ожидается</td><td><i>The plane <b>is due to land</b> at 6.</i> - Самолёт должен сесть в 6.</td></tr>
<tr><td>was to</td><td>судьба (так и случилось)</td><td><i>He <b>was to become</b> a famous writer.</i> - Ему суждено было стать известным писателем.</td></tr>
<tr><td>was to have done</td><td>планировалось, но не вышло</td><td><i>We <b>were to have met</b> at 5, but she was ill.</i></td></tr></table>
<p><b>If + be to</b> = «если мы хотим, чтобы»: <i>If we <b>are to win</b>, we must train harder.</i><br>
Не путайте: <b>due to + сущ.</b> = «из-за»: <i>The flight was cancelled <b>due to</b> fog.</i></p>
<div class="err">❌ The match is to starting at 7. → ✅ The match is to start at 7. &nbsp; ❌ I am about leave. → ✅ I am about to leave. &nbsp; ❌ The train due to arrive at 6. → ✅ The train is due to arrive at 6.</div>`);

  P[70] = {
    steps: [
      S("Шаг 1. Be to = официальный план", "Be to + глагол звучит как новости или расписание: всё решено официально. По-русски это просто будущее время или «предстоит». Чаще всего встречается в новостях и официальных письмах.", [["The new bridge is to open in May.", "Новый мост откроют в мае."], ["The ministers are to meet tomorrow.", "Министры встретятся завтра."]]),
      S("Шаг 2. Be to = приказ и инструкция", "Так говорят родители, учителя, начальники: «ты должен», «тебе велено». Отрицание be not to = строгий запрет.", [["You are to be home by ten.", "Ты должен быть дома к десяти."], ["Visitors are not to feed the animals.", "Посетителям запрещено кормить животных."]]),
      S("Шаг 3. Be about to = вот-вот", "Действие случится через секунду. Часто с when: «я как раз собирался..., когда».", [["The film is about to start.", "Фильм вот-вот начнётся."], ["I was about to call you when you came in.", "Я как раз собирался тебе позвонить, когда ты вошёл."]]),
      S("Шаг 4. Be due to = по графику", "Be due to + глагол = «должен по расписанию, ожидается»: поезда, самолёты, сроки сдачи. Be due без глагола тоже бывает. Не путайте с due to + существительное = «из-за».", [["The essay is due to be submitted on Friday.", "Эссе нужно сдать в пятницу."], ["Their baby is due in June.", "Ребёнок у них должен родиться в июне."], ["The flight was cancelled due to fog.", "Рейс отменили из-за тумана."]]),
      S("Шаг 5. Was to и was to have done", "Was to + глагол рассказывает о судьбе: «ему суждено было». Was to have + 3-я форма = «должно было случиться, но не случилось».", [["She was to become the first woman in space.", "Ей было суждено стать первой женщиной в космосе."], ["The concert was to have taken place yesterday, but it was cancelled.", "Концерт должен был пройти вчера, но его отменили."]]),
      S("Шаг 6. If + be to в эссе", "If we are to... = «если мы хотим..., то нужно». Сильная фраза для аргументации: сначала цель, потом условие её достижения.", [["If we are to stop climate change, we must act now.", "Если мы хотим остановить изменение климата, действовать надо сейчас."], ["If you are to get into Harvard, you need excellent grades.", "Чтобы поступить в Гарвард, нужны отличные оценки."]])
    ],
    tasks: [
      O("Соберите: Поезд вот-вот отправится.", ["The train", "is", "about", "to", "leave"], "The train is about to leave", "be about to + глагол = вот-вот."),
      O("Соберите: Ты должен остаться здесь.", ["You", "are", "to", "stay", "here"], "You are to stay here", "be to = приказ."),
      O("Соберите: Самолёт должен приземлиться в восемь.", ["The plane", "is", "due", "to", "land", "at eight"], "The plane is due to land at eight", "be due to = по расписанию."),
      Ch("Hurry up! The shop is ___ close.", ["about to", "due", "to about"], 0, "Вот-вот: is about to."),
      Ch("The prime minister ___ visit Japan next month.", ["is to", "is about", "to be"], 0, "Официальный план: is to."),
      Ch("We were to ___ at six, but he never came.", ["meet", "have met", "meeting"], 1, "План сорвался: were to have met."),
      Ch("If we ___ win, we must train every day.", ["are to", "will", "are about to"], 0, "If + be to = если хотим."),
      I("I was about ___ go to bed when you called. (одно слово)", ["to"], "be about to + глагол."),
      I("Переведите: Ты не должен никому говорить. (be to)", XA("You are not to tell {anyone/anybody}", "You aren't to tell {anyone/anybody}", "You are to tell {no one/nobody}"), "be not to = запрет."),
      F("Исправьте: The meeting is to starting at nine.", ["The meeting is to start at nine"], "После be to глагол в простой форме.")
    ]
  };

  T[70] = [
    ["Президент посетит Москву в мае.", X("The president is to visit Moscow in May", "The president is due to visit Moscow in May"), "is to + глагол"],
    ["Ты должен быть дома к девяти.", X("You are to be {home/at home} by nine"), "are to"],
    ["Фильм вот-вот начнётся.", X("The {film/movie} is {about/just about} to {start/begin}"), "is about to"],
    ["Я как раз собирался уходить, когда ты позвонил.", X("I was {about/just about} to {leave/go out/go} when you {called/rang}"), "was about to"],
    ["Поезд должен прибыть в шесть.", X("The train is due to arrive at six", "The train is due at six", "The train is due to arrive at six o'clock"), "is due to"],
    ["Студентам запрещено пользоваться телефонами.", X("Students are not to use {their phones/phones/mobile phones}"), "are not to"],
    ["Эссе нужно сдать в понедельник.", X("The essay is due on Monday", "The essay is due to be {handed in/submitted} on Monday", "The essay is to be {handed in/submitted} on Monday"), "is due"],
    ["Ему суждено было стать великим учёным.", X("He was to become a great scientist", "He was destined to become a great scientist"), "was to"],
    ["Мы должны были встретиться вчера, но я заболел.", X("We were to have met yesterday but I {got ill/fell ill/was ill/got sick}", "We were supposed to meet yesterday but I {got ill/fell ill/was ill/got sick}"), "were to have met"],
    ["Если мы хотим победить, нам нужно больше тренироваться.", X("If we are to win we {need to/have to/must} train {more/harder}"), "If we are to"],
    ["Встреча должна состояться в пятницу.", X("The meeting is {to/due to} {take place/be held} on Friday"), "is to + глагол"],
    ["Мы вот-вот закончим.", X("We are {about/just about} to finish", "We are about to be done"), "are about to"]
  ];

  /* ---------- 71. Смягчение (hedging) ---------- */
  add(71, "C1", "Смягчение и осторожность: tend to, it would seem, appear", `<p><b>Hedging</b> - «смягчение». В академическом английском не принято утверждать на 100%: <i>Social media destroys teenagers</i> звучит наивно. Осторожная версия звучит научно и честно: <i>Social media <b>may</b> have a negative effect on <b>some</b> teenagers.</i></p>
<div class="formula">may / might / could · tend to · seem / appear to · it would seem that · arguably · to some extent</div>
<table class="t"><tr><th>Средство</th><th>Пример</th><th>Перевод</th></tr>
<tr><td>may / might / could</td><td><i>This <b>may</b> explain the result.</i></td><td>Возможно, это объясняет результат.</td></tr>
<tr><td>tend to</td><td><i>Teenagers <b>tend to</b> sleep late.</i></td><td>Подростки, как правило, поздно ложатся.</td></tr>
<tr><td>seem / appear to</td><td><i>The method <b>appears to</b> work.</i></td><td>Метод, по-видимому, работает.</td></tr>
<tr><td>it would seem / appear that</td><td><i><b>It would seem that</b> prices will rise.</i></td><td>Судя по всему, цены вырастут.</td></tr>
<tr><td>arguably</td><td><i>He is <b>arguably</b> the best writer of his time.</i></td><td>Пожалуй, он лучший писатель своего времени.</td></tr>
<tr><td>to some extent</td><td><i>I agree <b>to some extent</b>.</i></td><td>Отчасти я согласен.</td></tr>
<tr><td>be likely / unlikely to</td><td><i>It <b>is likely to</b> rain. He <b>is unlikely to</b> come.</i></td><td>Вероятно, будет дождь. Вряд ли он придёт.</td></tr></table>
<p>Ещё: <i>the data <b>suggest</b> that…, <b>it could be argued that</b>…, possibly, generally, in most cases.</i></p>
<div class="err">❌ He seems be tired. → ✅ He seems to be tired. &nbsp; ❌ People tend to buying… → ✅ People tend to buy… &nbsp; ❌ It is likely that he to come. → ✅ He is likely to come.</div>`);

  P[71] = {
    steps: [
      S("Шаг 1. Зачем смягчать", "В американском эссе категоричность выглядит как ошибка: нельзя доказать, что «все» или «всегда». Мягкие слова показывают, что вы думаете осторожно и честно. В разговоре они тоже звучат вежливее.", [["Video games make children violent. → Video games may make some children more aggressive.", "Игры делают детей жестокими. → Игры могут делать некоторых детей агрессивнее."]]),
      S("Шаг 2. May, might, could", "Самый простой способ: модальный глагол перед основным. May чуть увереннее, might и could осторожнее.", [["This may be the reason.", "Возможно, в этом причина."], ["The results might be different in other countries.", "В других странах результаты могут быть иными."]]),
      S("Шаг 3. Tend to = «как правило»", "Tend to + глагол говорит о тенденции, а не о законе. Удобно для обобщений про людей, страны, поколения.", [["Older people tend to trust TV more.", "Пожилые люди, как правило, больше доверяют телевидению."], ["Prices tend to rise in winter.", "Зимой цены обычно растут."]]),
      S("Шаг 4. Seem / appear to и it would seem that", "Seem to / appear to = «похоже, по-видимому». Appear чуть официальнее, чем seem. С would звучит ещё мягче: It would seem that.", [["She seems to know the answer.", "Похоже, она знает ответ."], ["The policy appears to have failed.", "Похоже, эта политика провалилась."], ["It would appear that the data are incomplete.", "По-видимому, данные неполные."]]),
      S("Шаг 5. Arguably, to some extent, likely", "Arguably = «пожалуй, можно утверждать». To some extent = «до некоторой степени, отчасти». Be likely / unlikely to = «вероятно» / «вряд ли».", [["This is arguably the most important invention.", "Это, пожалуй, самое важное изобретение."], ["To some extent, schools are responsible.", "Отчасти за это отвечают школы."], ["He is unlikely to agree.", "Вряд ли он согласится."]]),
      S("Шаг 6. Не переборщите", "Одного смягчения на мысль достаточно: may possibly perhaps seem звучит неуверенно. Главную позицию эссе (thesis) формулируйте ясно, а смягчайте спорные факты и обобщения.", [["It could be argued that homework is useful to some extent.", "Можно утверждать, что домашние задания отчасти полезны."]])
    ],
    tasks: [
      O("Соберите: Подростки, как правило, поздно ложатся спать.", ["Teenagers", "tend", "to", "go to bed", "late"], "Teenagers tend to go to bed late", "tend to + глагол = как правило."),
      O("Соберите: Похоже, он устал.", ["He", "seems", "to", "be", "tired"], "He seems to be tired", "seem + to + глагол."),
      O("Соберите: Вряд ли она придёт.", ["She", "is", "unlikely", "to", "come"], "She is unlikely to come", "be unlikely to = вряд ли."),
      Ch("The new law ___ to have reduced crime.", ["appears", "appear", "is appearing"], 0, "law = оно: appears to."),
      Ch("Какое предложение звучит академичнее?", ["Phones destroy our brains.", "Phones may affect our concentration.", "Phones are 100% bad."], 1, "may + осторожное утверждение."),
      Ch("I agree with this view ___ .", ["to some extent", "at some extent", "in some extend"], 0, "Устойчиво: to some extent."),
      Ch("___ , Shakespeare is the greatest English writer.", ["Arguably", "Arguing", "Argue"], 0, "Arguably = пожалуй, можно утверждать."),
      I("People ___ to spend more money in December. (как правило, одно слово)", ["tend"], "tend to = как правило."),
      I("Переведите: По-видимому, проблема решена. (It would appear)", XA("It would appear {that /}the problem {is solved/has been solved}"), "It would appear that..."),
      F("Исправьте: She seems know everything.", ["She seems to know everything"], "После seem нужно to.")
    ]
  };

  T[71] = [
    ["Это может объяснить результаты.", X("{This/That} {may/might/could} explain the results"), "may"],
    ["Люди, как правило, верят рекламе.", X("People tend to {believe/trust} {advertising/adverts/ads/advertisements}"), "tend to"],
    ["Похоже, она знает ответ.", X("She {seems/appears} to know the answer", "It seems {that /}she knows the answer"), "seem to"],
    ["Похоже, план провалился.", X("The plan {seems/appears} to have failed", "It seems {that /}the plan {has failed/failed}"), "seem to have"],
    ["Судя по всему, цены вырастут.", X("It would {seem/appear} {that /}prices will {rise/go up/increase}", "Prices are likely to {rise/go up/increase}"), "It would seem that"],
    ["Пожалуй, это лучшая книга года.", X("{This/It} is arguably the best book of the year", "Arguably {this/it} is the best book of the year"), "arguably"],
    ["Отчасти я согласен.", X("I agree to {some/a certain} extent", "To {some/a certain} extent I agree", "I partly agree"), "to some extent"],
    ["Вряд ли он согласится.", X("He is unlikely to agree", "It is unlikely that he will agree", "He probably {won't/will not} agree"), "is unlikely to"],
    ["Вероятно, завтра будет дождь.", X("It is likely to rain tomorrow", "It is likely that it will rain tomorrow", "It will probably rain tomorrow"), "is likely to"],
    ["Можно утверждать, что школьная форма полезна.", X("It {could/can} be argued that school {uniforms are/uniform is} {useful/beneficial/good}"), "It could be argued that"],
    ["Подростки, как правило, проводят много времени в телефонах.", X("{Teenagers/Teens} tend to spend a lot of time {on their phones/on phones/with their phones}"), "tend to"],
    ["Данные указывают на то, что проблема серьёзная.", X("The data {suggest/suggests/indicate/indicates} {that /}the problem is serious"), "the data suggest"]
  ];

  /* ---------- 72. Нереальное прошлое ---------- */
  add(72, "C1", "Нереальное прошлое: as if, suppose, would rather + past", `<p>После некоторых слов прошедшее время означает <b>не прошлое, а нереальность</b>, как русское «бы». Вы уже видели это в <i>I wish I knew</i> и <i>If I were you</i>.</p>
<div class="formula">as if · suppose · would rather · if only · it's time + Past (про сейчас) / Past Perfect (про раньше)</div>
<table class="t"><tr><th>Конструкция</th><th>Пример</th><th>Перевод</th></tr>
<tr><td>as if / as though + Past</td><td><i>He talks <b>as if</b> he <b>knew</b> everything.</i></td><td>Он говорит так, будто всё знает.</td></tr>
<tr><td>as if + Past Perfect</td><td><i>She looked <b>as though</b> she <b>had seen</b> a ghost.</i></td><td>Она выглядела так, будто увидела привидение.</td></tr>
<tr><td>suppose / supposing + Past</td><td><i><b>Suppose</b> you <b>lost</b> your job. What would you do?</i></td><td>Допустим, ты потерял работу. Что бы ты делал?</td></tr>
<tr><td>would rather + кто + Past</td><td><i>I'd <b>rather</b> you <b>didn't</b> smoke here.</i></td><td>Я бы предпочёл, чтобы ты здесь не курил.</td></tr>
<tr><td>would rather + кто + Past Perfect</td><td><i>I'd rather you <b>had told</b> me earlier.</i></td><td>Лучше бы ты сказал мне раньше.</td></tr>
<tr><td>if only + would</td><td><i><b>If only</b> it <b>would</b> stop raining!</i></td><td>Вот бы дождь перестал!</td></tr>
<tr><td>it's (high) time + Past</td><td><i><b>It's time</b> we <b>left</b>.</i></td><td>Нам пора уходить.</td></tr></table>
<p><b>Сравните:</b> <i>I'd rather <b>go</b></i> (я сам: глагол без to) и <i>I'd rather <b>you went</b></i> (другой человек: Past). С be в книжном стиле <b>were</b>: <i>as if he <b>were</b> the boss</i>.</p>
<div class="err">❌ I'd rather you don't come. → ✅ I'd rather you didn't come. &nbsp; ❌ It's time we go. → ✅ It's time we went. &nbsp; ❌ Suppose you win a million, what would you buy? → ✅ Suppose you won a million…</div>`);

  P[72] = {
    steps: [
      S("Шаг 1. Прошедшее время = «бы»", "В английском нереальность показывают сдвигом времени назад: про настоящее говорим Past, про прошлое Past Perfect. Вы уже знаете это по If I were you и I wish I knew.", [["I wish I knew the answer.", "Жаль, что я не знаю ответа."], ["If I were you, I would wait.", "На твоём месте я бы подождал."]]),
      S("Шаг 2. As if / as though = «как будто»", "Если сравнение нереальное, после as if ставим Past (про сейчас) или Past Perfect (про то, что было раньше). As though значит то же самое, чуть книжнее.", [["He spends money as if he were a millionaire.", "Он тратит деньги, будто миллионер."], ["You look as if you hadn't slept for days.", "Ты выглядишь так, будто не спал несколько дней."]]),
      S("Шаг 3. Suppose / supposing = «допустим, а что если»", "Предлагаем представить ситуацию. Нереальная версия идёт с Past, а дальше would. Для прошлого: Past Perfect и would have.", [["Suppose you could live anywhere. Where would you go?", "Допустим, ты мог бы жить где угодно. Куда бы ты поехал?"], ["Supposing he had refused, what would we have done?", "А если бы он отказался, что бы мы делали?"]]),
      S("Шаг 4. Would rather: я сам или кто-то другой", "Про себя: would rather + глагол без to (I'd rather stay). Про другого человека: would rather + кто + Past (I'd rather you stayed). Сожаление о прошлом: Past Perfect.", [["I'd rather walk.", "Я лучше пройдусь."], ["I'd rather you didn't tell anyone.", "Я бы предпочёл, чтобы ты никому не говорил."], ["I'd rather you had asked me first.", "Лучше бы ты сначала спросил меня."]]),
      S("Шаг 5. If only + would и It's time + Past", "If only + would = «вот бы»: про чужое поведение или то, что раздражает. It's (high) time we went = «нам давно пора», хотя речь о настоящем.", [["If only he would listen to me!", "Если бы он только меня послушал!"], ["It's high time you found a job.", "Тебе давно пора найти работу."]])
    ],
    tasks: [
      O("Соберите: Он ведёт себя так, будто он здесь главный.", ["He", "behaves", "as if", "he", "were", "the boss"], "He behaves as if he were the boss", "as if + Past (were) = как будто."),
      O("Соберите: Я бы предпочёл, чтобы ты остался.", ["I'd", "rather", "you", "stayed"], "I'd rather you stayed", "would rather + кто + Past."),
      O("Соберите: Нам пора идти.", ["It's", "time", "we", "went"], "It's time we went", "It's time + Past."),
      Ch("She looked as if she ___ a ghost.", ["sees", "had seen", "has seen"], 1, "Раньше, чем «выглядела»: Past Perfect."),
      Ch("I'd rather you ___ smoke in the car.", ["don't", "didn't", "won't"], 1, "Про другого человека: Past (didn't)."),
      Ch("Suppose you ___ a million dollars. What would you buy?", ["have", "had", "will have"], 1, "Нереальная ситуация: Past."),
      Ch("If only it ___ stop raining!", ["will", "would", "is"], 1, "If only + would = вот бы."),
      I("He talks as though he ___ (know) everything. (одно слово)", ["knew"], "as though + Past."),
      I("Переведите: Лучше бы ты сказал мне раньше. (would rather)", XA("I would rather you had told me {earlier/before/sooner}", "I'd rather you'd told me {earlier/before/sooner}"), "would rather + Past Perfect."),
      F("Исправьте: It's time we go home.", XA("It's {high /}time we went home", "It is {high /}time we went home"), "It's time + Past.")
    ]
  };

  T[72] = [
    ["Он говорит так, будто всё знает.", X("He {talks/speaks} as {if/though} he knew everything"), "as if + Past"],
    ["Ты выглядишь так, будто не спал.", X("You look as {if/though} you {hadn't/had not/haven't} slept"), "as if + Past Perfect"],
    ["Он ведёт себя так, будто он король.", X("He {behaves/acts} as {if/though} he {were/was} {a/the} king"), "as if + were"],
    ["Допустим, ты выиграл в лотерею. Что бы ты сделал?", X("{Suppose/Supposing/Imagine} you won the lottery. What would you do"), "Suppose + Past"],
    ["Я лучше пройдусь пешком.", X("I'd rather walk", "I would rather walk", "I'd rather go on foot", "I would rather go on foot"), "would rather + глагол"],
    ["Я бы предпочёл, чтобы ты не курил здесь.", X("{I would/I'd} rather you {didn't/did not} smoke here"), "would rather + Past"],
    ["Лучше бы ты спросил меня сначала.", X("{I would/I'd} rather you had asked me first", "I'd rather you'd asked me first"), "would rather + Past Perfect"],
    ["Вот бы он перестал жаловаться!", X("If only he would stop complaining", "I wish he would stop complaining"), "If only + would"],
    ["Тебе давно пора найти работу.", X("{It's/It is} high time you {found/got} a job", "{It's/It is} time you {found/got} a job"), "It's high time + Past"],
    ["Нам пора домой.", X("{It's/It is} time we went home", "{It's/It is} time for us to go home"), "It's time we + Past"],
    ["А что, если бы он тогда отказался?", X("{Supposing/Suppose/What if} he had refused"), "Supposing + Past Perfect"],
    ["Она смотрела на меня так, будто не знала меня.", X("She looked at me as {if/though} she {didn't/did not} know me", "She looked at me as {if/though} she had never met me"), "as if + Past"]
  ];

  /* ---------- 73. Fronting ---------- */
  add(73, "C1", "Fronting: вынос в начало для стиля", `<p><b>Fronting</b> - выносим в начало то, что обычно стоит в конце: дополнение, прилагательное, обстоятельство. Так мы связываем мысль с предыдущей фразой или усиливаем её. Стиль книжный: эссе, литература, речи.</p>
<div class="formula">ВЫНЕСЕННАЯ ЧАСТЬ + кто + глагол &nbsp;или&nbsp; ВЫНЕСЕННАЯ ЧАСТЬ + глагол + кто</div>
<table class="t"><tr><th>Схема</th><th>Пример</th><th>Перевод</th></tr>
<tr><td>дополнение вперёд</td><td><i><b>This question</b> I cannot answer.</i></td><td>На этот вопрос я ответить не могу.</td></tr>
<tr><td>прил. + as + кто + глагол</td><td><i><b>Strange as it may seem</b>, I like rain.</i></td><td>Как ни странно, я люблю дождь.</td></tr>
<tr><td>Much as + кто + глагол</td><td><i><b>Much as I like</b> him, I can't trust him.</i></td><td>Как бы он мне ни нравился, доверять ему не могу.</td></tr>
<tr><td>место + глагол + кто</td><td><i><b>Into the room came</b> a tall man.</i></td><td>В комнату вошёл высокий мужчина.</td></tr>
<tr><td>Such + be + кто</td><td><i><b>Such was</b> his anger that he couldn't speak.</i></td><td>Он так разозлился, что не мог говорить.</td></tr>
<tr><td>So + прил. + be + кто</td><td><i><b>So tired was I</b> that I fell asleep.</i></td><td>Я так устал, что уснул.</td></tr></table>
<p>Инверсия после места (<i>Here comes the bus. On the hill stood a castle.</i>) бывает с глаголами движения и положения и только с существительным. С местоимением порядок обычный: <i>Here it comes.</i></p>
<div class="err">❌ Strange as may it seem… → ✅ Strange as it may seem… &nbsp; ❌ Here comes it. → ✅ Here it comes. &nbsp; ❌ So tired I was that… → ✅ So tired was I that…</div>`);

  P[73] = {
    steps: [
      S("Шаг 1. Что выносим и зачем", "В русском порядок слов свободный, а в английском нет. Поэтому вынос в начало сразу заметен: читатель понимает, что это важно или связано с предыдущей фразой.", [["I love jazz. Rock I can't stand.", "Джаз я люблю. А рок терпеть не могу."], ["This I did not expect.", "Этого я не ожидал."]]),
      S("Шаг 2. Прилагательное + as: «как ни»", "Strange as it may seem = «как ни странно». Схема: прилагательное или наречие + as + кто + глагол. Значит «хотя». Порядок кто + глагол обычный.", [["Strange as it may seem, he never uses a phone.", "Как ни странно, он никогда не пользуется телефоном."], ["Tired as she was, she finished the essay.", "Хоть она и устала, но дописала эссе."]]),
      S("Шаг 3. Much as I like...", "Much as = «как бы ни, хотя и очень». Сначала признаём одно, потом говорим главное. Отлично подходит для эссе с контраргументом.", [["Much as I love my city, I want to study abroad.", "Как бы я ни любил свой город, я хочу учиться за границей."], ["Much as I respect his opinion, I disagree.", "При всём уважении к его мнению, я не согласен."]]),
      S("Шаг 4. Место в начале: Into the room came...", "Если в начале место или направление, а глагол про движение или положение (come, stand, lie, sit), глагол может встать перед подлежащим. Так пишут в рассказах. Here comes и There goes есть и в разговоре.", [["Into the room came a strange old woman.", "В комнату вошла странная старушка."], ["On the table lay a letter.", "На столе лежало письмо."], ["Here comes the bus!", "А вот и автобус!"]]),
      S("Шаг 5. Such was..., So + прилагательное + was...", "Такой вынос делает фразу драматичной: «так велико было..., что». После Such и So + прилагательное идёт инверсия, а дальше that.", [["Such was the noise that we couldn't sleep.", "Шум был такой, что мы не могли уснуть."], ["So beautiful was the view that we stopped the car.", "Вид был настолько красив, что мы остановили машину."]])
    ],
    tasks: [
      O("Соберите: Как ни странно, мне нравится зима.", ["Strange", "as", "it", "may", "seem", "I", "like", "winter"], "Strange as it may seem I like winter", "Прилагательное + as + it may seem."),
      O("Соберите: На столе лежало письмо.", ["On the table", "lay", "a letter"], "On the table lay a letter", "Место + глагол + кто."),
      O("Соберите: Вот и автобус.", ["Here", "comes", "the bus"], "Here comes the bus", "Here + глагол + существительное."),
      Ch("___ as I like him, I can't agree with him.", ["Much", "Very", "So"], 0, "Much as = как бы ни."),
      Ch("Strange as it ___ , she never watches TV.", ["may seem", "seems may", "may seems"], 0, "Обычный порядок: it may seem."),
      Ch("Here ___ !", ["comes he", "he comes", "come he"], 1, "С местоимением инверсии нет: Here he comes."),
      Ch("___ was his surprise that he couldn't say a word.", ["Such", "So", "How"], 0, "Such was + существительное."),
      I("So tired ___ I that I fell asleep at once. (одно слово)", ["was"], "So + прил. + was + I."),
      I("Переведите: Хоть он и устал, он продолжал работать. (Tired as...)", XA("Tired as he was he {kept working/kept on working/continued working/continued to work/went on working}"), "Tired as he was..."),
      F("Исправьте: So hungry I was that I ate everything.", ["So hungry was I that I ate everything"], "После So + прил. инверсия: was I.")
    ]
  };

  T[73] = [
    ["Как ни странно, он не любит пиццу.", X("Strange {as/though} it {may/might} seem he {doesn't/does not} like pizza"), "Strange as it may seem"],
    ["Как бы я ни любил свой город, я хочу уехать учиться.", X("Much as I love my {city/town/hometown} I want to {study abroad/go away to study/leave to study}"), "Much as I"],
    ["Хоть она и устала, она дописала эссе.", X("Tired {as/though} she was she finished {the/her} essay"), "Tired as she was"],
    ["В комнату вошёл высокий мужчина.", X("Into the room {came/walked} a tall man", "A tall man {came/walked} into the room"), "Into the room came"],
    ["На холме стоял замок.", X("On {the/a} hill stood a castle", "On top of the hill stood a castle"), "On the hill stood"],
    ["Вот и автобус!", X("Here comes the bus", "Here's the bus"), "Here comes"],
    ["Вот он идёт!", X("Here he comes"), "Here he comes"],
    ["Шум был такой, что мы не могли уснуть.", X("Such was the noise that we {couldn't/could not/were unable to} sleep", "So loud was the noise that we {couldn't/could not} sleep"), "Such was"],
    ["Я так устал, что сразу уснул.", X("So tired was I that I fell asleep {at once/immediately/right away/straight away}"), "So tired was I"],
    ["Этого я не ожидал.", X("{This/That} I {didn't/did not/never} expect", "{This/That} I never expected"), "This I didn't"],
    ["Как бы он мне ни нравился, я ему не доверяю.", X("Much as I like him I {don't/do not/can't/cannot} trust him"), "Much as I like"],
    ["Вид был настолько красив, что мы остановились.", X("So beautiful was the view that we stopped{ the car/}", "Such was the beauty of the view that we stopped{ the car/}"), "So beautiful was"]
  ];

  /* ---------- 74. Номинализация и сложные связки ---------- */
  add(74, "C1", "Номинализация и сложные связки: whereas, provided that, notwithstanding", `<p><b>Номинализация</b> - превращаем глагол или прилагательное в существительное. Текст становится короче, объективнее и «научнее». Это главный признак академического английского.</p>
<div class="formula">глагол → существительное + in / of / to / on</div>
<table class="t"><tr><th>Разговорно</th><th>Академично</th></tr>
<tr><td>Prices <b>increased</b> quickly.</td><td><i><b>The rapid increase in</b> prices…</i></td></tr>
<tr><td>The city <b>grew</b>.</td><td><i><b>The growth of</b> the city…</i></td></tr>
<tr><td>They <b>decided</b> to close the school.</td><td><i><b>The decision to</b> close the school…</i></td></tr>
<tr><td>Phones <b>affect</b> sleep.</td><td><i><b>The effect of</b> phones <b>on</b> sleep…</i></td></tr>
<tr><td>People <b>are</b> not <b>aware</b> of the risks.</td><td><i><b>The lack of awareness of</b> the risks…</i></td></tr></table>
<table class="t"><tr><th>Связка</th><th>Значение</th><th>Пример</th></tr>
<tr><td>whereas</td><td>тогда как (контраст)</td><td><i>I prefer tea, <b>whereas</b> my sister drinks coffee.</i></td></tr>
<tr><td>provided (that) / providing</td><td>при условии, что</td><td><i>You can go <b>provided that</b> you finish your work.</i></td></tr>
<tr><td>given (that)</td><td>учитывая (что)</td><td><i><b>Given that</b> he is 15, he did well.</i></td></tr>
<tr><td>notwithstanding</td><td>несмотря на (официально)</td><td><i><b>Notwithstanding</b> the cost, the project was approved.</i></td></tr>
<tr><td>insofar as</td><td>в той мере, в какой</td><td><i>It is useful <b>insofar as</b> it saves time.</i></td></tr>
<tr><td>albeit</td><td>хотя и (+ прил. / наречие)</td><td><i>He agreed, <b>albeit</b> reluctantly.</i></td></tr></table>
<div class="err">❌ The increase of prices → ✅ The increase in prices &nbsp; ❌ Provided that you will study… → ✅ Provided that you study… &nbsp; ❌ Albeit it was late, we went. → ✅ Although it was late, we went. (после albeit нет «кто + глагол»)</div>`);

  P[74] = {
    steps: [
      S("Шаг 1. Глагол → существительное", "В разговоре главное слово обычно глагол (prices rose). В академическом тексте его превращают в существительное (the rise in prices). Так в одно предложение помещается больше информации.", [["Prices rose. → The rise in prices…", "Цены выросли. → Рост цен…"], ["They analysed the data. → The analysis of the data…", "Они проанализировали данные. → Анализ данных…"]]),
      S("Шаг 2. Правильный предлог", "Каждое такое существительное дружит со своим предлогом: increase / rise / fall in, growth / development of, decision / attempt to, effect / impact on, reason for.", [["the impact of social media on teenagers", "влияние соцсетей на подростков"], ["the reason for the decline", "причина спада"], ["the decision to raise taxes", "решение повысить налоги"]]),
      S("Шаг 3. Whereas и given that", "Whereas = «тогда как, а»: сравниваем две стороны. Given (that) = «учитывая (что)»: берём факт как основу для вывода.", [["Some students prefer online classes, whereas others need a teacher in the room.", "Одни студенты предпочитают онлайн-занятия, а другим нужен учитель в классе."], ["Given that the test is tomorrow, we should revise tonight.", "Учитывая, что тест завтра, повторять надо сегодня."]]),
      S("Шаг 4. Provided (that) = «при условии, что»", "Строже, чем if: условие обязательно. После provided, как и после if, будущее время не ставим.", [["You can borrow my laptop provided that you return it tomorrow.", "Можешь взять мой ноутбук при условии, что вернёшь его завтра."], ["Providing the weather is good, we'll go hiking.", "Если погода будет хорошей, пойдём в поход."]]),
      S("Шаг 5. Notwithstanding, insofar as, albeit", "Notwithstanding + существительное = «несмотря на» (очень официально, как in spite of). Insofar as = «в той мере, в какой». Albeit = «хотя и», после него только прилагательное, наречие или фраза без глагола.", [["Notwithstanding these problems, the project was a success.", "Несмотря на эти проблемы, проект был успешным."], ["The theory is correct insofar as it explains the data.", "Теория верна в той мере, в какой объясняет данные."], ["He accepted the offer, albeit reluctantly.", "Он принял предложение, хотя и неохотно."]]),
      S("Шаг 6. Собираем академическое предложение", "Номинализация плюс сложная связка дают типичную фразу из эссе. Но не превращайте все глаголы в существительные: текст станет тяжёлым. Одной-двух на предложение достаточно.", [["Given the rapid growth of cities, the lack of housing is a serious problem.", "Учитывая быстрый рост городов, нехватка жилья является серьёзной проблемой."]])
    ],
    tasks: [
      O("Соберите: Рост цен беспокоит людей.", ["The increase", "in", "prices", "worries", "people"], "The increase in prices worries people", "increase + in."),
      O("Соберите: Можешь пойти при условии, что вернёшься к десяти.", ["You", "can go", "provided that", "you", "come back", "by ten"], "You can go provided that you come back by ten", "provided that + настоящее время."),
      O("Соберите: Он согласился, хотя и неохотно.", ["He", "agreed", "albeit", "reluctantly"], "He agreed albeit reluctantly", "albeit + наречие."),
      Ch("The ___ of the city has been very fast.", ["grow", "growth", "growing"], 1, "Существительное: growth."),
      Ch("There has been a sharp increase ___ unemployment.", ["of", "in", "on"], 1, "increase in."),
      Ch("I like maths, ___ my brother prefers art.", ["whereas", "provided", "albeit"], 0, "Контраст: whereas."),
      Ch("___ the bad weather, the match went ahead.", ["Notwithstanding", "Whereas", "Insofar as"], 0, "Notwithstanding + сущ. = несмотря на."),
      I("___ that he is only 15, his English is excellent. (учитывая, одно слово)", ["Given"], "Given that = учитывая, что."),
      I("They decided to close the factory. → The ___ to close the factory was unpopular. (одно слово)", ["decision"], "decide → decision."),
      F("Исправьте: You can go out provided that you will finish your homework.", XA("You can go out provided {that /}you finish your homework", "You can go out provided {that /}you have finished your homework"), "После provided будущее не ставим.")
    ]
  };

  T[74] = [
    ["Рост цен беспокоит всех.", X("The {rise/increase} in prices worries {everyone/everybody}", "Rising prices worry {everyone/everybody}"), "the rise in"],
    ["Решение закрыть школу было ошибкой.", X("The decision to close the school was a mistake"), "the decision to"],
    ["Влияние соцсетей на подростков огромно.", X("The {influence/impact/effect} of social media on {teenagers/teens} is {huge/enormous/immense}"), "the impact of ... on"],
    ["Я люблю чай, тогда как мой брат пьёт кофе.", X("I {like/love} tea {whereas/while} my brother drinks coffee"), "whereas"],
    ["Ты можешь взять мою машину при условии, что вернёшь её завтра.", X("You can {take/borrow} my car {provided/providing} {that /}you {return it/bring it back} tomorrow", "You can {take/borrow} my car as long as you {return it/bring it back} tomorrow"), "provided that"],
    ["Учитывая, что ему всего 15, он играет очень хорошо.", X("Given {that /}he is only 15 he plays very well"), "given that"],
    ["Несмотря на эти проблемы, проект был успешным.", X("{Notwithstanding/Despite/In spite of} these problems the project was {successful/a success}", "These problems notwithstanding the project was {successful/a success}"), "notwithstanding"],
    ["Он согласился, хотя и неохотно.", X("He agreed albeit {reluctantly/unwillingly}"), "albeit"],
    ["Это полезно в той мере, в какой это экономит время.", X("{It/This} is useful {insofar/in so far} as it saves time"), "insofar as"],
    ["Отсутствие опыта может быть проблемой.", X("{The lack/A lack/Lack} of experience {can/may/could} be a problem"), "the lack of"],
    ["Причина спада неясна.", X("The reason for the {decline/decrease/fall/drop} is {unclear/not clear}"), "the reason for"],
    ["Анализ данных показал рост продаж.", X("{The analysis of the data/Analysis of the data/The data analysis} showed {an increase/a rise/growth} in sales"), "the analysis of"]
  ];
})();
