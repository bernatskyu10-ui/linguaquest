/* Новые темы B1-B2: 54-65 */
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

  /* ---------- 54. Past Perfect ---------- */
  add(54, "B1", "Past Perfect: «уже сделал до того»", `<div class="formula">had + 3-я форма глагола</div>
<p>Два действия в прошлом. То, что случилось <b>раньше</b>, ставим в Past Perfect, то, что позже, в Past Simple.<br>
<i>When I came, the film <b>had</b> already <b>started</b>.</i> Когда я пришёл, фильм уже начался.<br>
<i>She <b>had left</b> before I called.</i> Она ушла до того, как я позвонил.</p>
<table class="t"><tr><th></th><th>Пример</th></tr>
<tr><td><b>+</b></td><td><i>I <b>had finished</b>.</i> (I'd finished)</td></tr>
<tr><td><b>−</b></td><td><i>I <b>hadn't seen</b> it before.</i></td></tr>
<tr><td><b>?</b></td><td><i><b>Had</b> you ever <b>been</b> there before?</i></td></tr></table>
<p><b>Подсказки:</b> by the time (к тому времени как), before, after, already, just, never ... before, when.<br>
<i><b>By the time</b> we arrived, the party <b>had ended</b>.</i> Когда мы приехали, вечеринка уже закончилась.</p>
<div class="note">Если события идут по порядку (пришёл, поел, лёг), Past Perfect не нужен: <i>I came home, ate and went to bed.</i></div>
<div class="err">❌ When I came, the film already started. → ✅ When I came, the film had already started.<br>❌ I had seen him yesterday. (одно действие) → ✅ I saw him yesterday.</div>`);
  P[54] = {
    steps: [
      S("Шаг 1. Два прошлых: какое раньше?", "По-русски оба действия просто в прошедшем: «пришёл», «ушёл». По-английски, если важно показать, что одно случилось ДО другого, более раннее ставим в Past Perfect.", [["When I got to the station, the train had left.", "Когда я добрался до вокзала, поезд уже ушёл."], ["I didn't know him because I had never met him before.", "Я его не знал, потому что никогда раньше не встречал."]]),
      S("Шаг 2. Формула: had + 3-я форма", "Had одинаковый для всех: I had, she had, they had. Неправильные глаголы берём из 3-й колонки: gone, seen, done. Had сокращается до 'd: I'd, she'd.", [["She had finished her homework.", "Она (уже) сделала уроки."], ["We had already eaten.", "Мы уже поели."]]),
      S("Шаг 3. Отрицание и вопрос", "Отрицание: hadn't + 3-я форма. Вопрос: Had выходит вперёд, перед «кто».", [["I hadn't seen the film before.", "Я раньше не видел этот фильм."], ["Had you ever been to London before that trip?", "Ты бывал в Лондоне до той поездки?"]]),
      S("Шаг 4. Слова-подсказки: by the time, before, after, already", "By the time = к тому времени как. После него Past Simple, а в другой части Past Perfect. Already и just ставим между had и 3-й формой.", [["By the time we arrived, the party had ended.", "К тому времени как мы приехали, вечеринка закончилась."], ["He had already gone when I called.", "Он уже ушёл, когда я позвонил."]]),
      S("Шаг 5. Когда Past Perfect не нужен", "Если рассказываем по порядку, хватает Past Simple. Частая ошибка: ставить had, когда действие одно или просто «давно было». Had нужен только для «раньше другого прошлого».", [["I got up, had breakfast and left.", "Я встал, позавтракал и ушёл."], ["I saw him yesterday.", "Я видел его вчера. (не had seen)"]])
    ],
    tasks: [
      O("Соберите: Когда я пришёл, фильм уже начался.", ["The film", "had", "already", "started", "when I came"], "The film had already started when I came", "Раньше начался фильм: had started. Позже я пришёл: came."),
      O("Соберите: Она ушла до того, как я позвонил.", ["She", "had left", "before", "I", "called"], "She had left before I called", "Сначала она ушла (had left), потом я позвонил (called)."),
      O("Соберите: До той поездки я никогда не видел снег.", ["I", "had never seen", "snow", "before", "that trip"], "I had never seen snow before that trip", "Опыт до момента в прошлом: had never seen."),
      Ch("By the time we arrived, the party ___ .", ["ended", "had ended", "has ended"], 1, "By the time + прошлое: раньше закончилась вечеринка, значит had ended."),
      Ch("I got up, ___ breakfast and went to school.", ["had had", "had", "have had"], 1, "Действия по порядку: просто Past Simple."),
      Ch("___ you ever been abroad before that summer?", ["Have", "Did", "Had"], 2, "Опыт до момента в прошлом: Had you ever been ...?"),
      Ch("When I got home, I ___ that I had lost my keys.", ["realized", "had realized", "have realized"], 0, "Понял позже, чем потерял: realized в Past Simple."),
      I("They ___ (already / eat) when I arrived. Впишите три слова.", ["had already eaten"], "Раньше моего прихода: had + already + eaten."),
      I("Переведите: Когда мы приехали, поезд уже ушёл.", ["When we arrived the train had already left", "The train had already left when we arrived", "When we arrived the train had left", "When we arrived the train had already gone", "The train had already gone when we arrived", "When we came the train had already left", "When we got there the train had already left", "The train had left when we arrived", "The train had already left when we got there"], "Поезд ушёл раньше: had left."),
      F("Исправьте: When I came, the film already started.", ["When I came the film had already started", "The film had already started when I came"], "Фильм начался раньше моего прихода: had already started.")
    ]
  };
  T[54] = [
    ["Когда я пришёл, фильм уже начался.", "When I came the film had already started|When I arrived the film had already started|The film had already started when I came|The film had already started when I arrived|When I came the film had started|When I arrived the film had started", "had + started"],
    ["Она ушла до того, как я позвонил.", "She had left before I called|She left before I called|She had gone before I called", "had left"],
    ["К тому времени как мы приехали, вечеринка закончилась.", "By the time we arrived the party had ended|By the time we arrived the party had finished|By the time we got there the party had ended|By the time we got there the party had finished|By the time we came the party had ended|By the time we came the party had finished", "By the time + had"],
    ["До той поездки я никогда не был в Лондоне.", "I had never been to London before that trip|Before that trip I had never been to London|I'd never been to London before that trip|Before that trip I'd never been to London", "had never been"],
    ["Я не узнал его, потому что не видел его много лет.", "I didn't recognize him because I hadn't seen him for many years|I didn't recognize him because I hadn't seen him for years|I didn't recognize him because I hadn't seen him in years|I didn't recognize him because I had not seen him for many years", "hadn't seen"],
    ["Мы уже поели, когда папа пришёл домой.", "We had already eaten when Dad came home|We had already eaten when Dad got home|We had already had dinner when Dad came home|We had already had dinner when Dad got home|We'd already eaten when Dad came home|We'd already eaten when Dad got home|We had already eaten when my dad came home|We had already eaten when my dad got home", "had already eaten"],
    ["Ты сделал уроки до того, как пошёл гулять?", "Had you done your homework before you went out|Did you do your homework before you went out|Had you finished your homework before you went out|Did you finish your homework before you went out", "Had you done"],
    ["Я понял, что забыл телефон дома.", "I realized that I had forgotten my phone at home|I realized I had forgotten my phone at home|I realized that I had left my phone at home|I realized I had left my phone at home|I realized I'd forgotten my phone at home|I realized I'd left my phone at home", "had forgotten"],
    ["Когда я проснулся, все уже ушли.", "When I woke up everyone had already left|When I woke up everybody had already left|Everyone had already left when I woke up|Everybody had already left when I woke up|When I woke up everyone had already gone|When I woke up everybody had already gone|When I woke up everyone had left|When I woke up everybody had left", "had already left"],
    ["Она сказала, что уже видела этот фильм.", "She said that she had already seen this film|She said she had already seen this film|She said that she had already seen this movie|She said she had already seen this movie|She said she had already seen the film|She said she had already seen the movie|She said she'd already seen this film|She said she'd already seen this movie", "had already seen"],
    ["После того как он закончил работу, он пошёл домой.", "After he had finished work he went home|After he had finished his work he went home|After he finished work he went home|After he finished his work he went home|He went home after he had finished work|He went home after he had finished his work", "After + had finished"],
    ["Магазин уже закрылся, когда мы туда добрались.", "The shop had already closed when we got there|The store had already closed when we got there|The shop had closed when we got there|The store had closed when we got there|When we got there the shop had already closed|When we got there the store had already closed", "had already closed"]
  ];

  /* ---------- 55. Present Perfect Continuous ---------- */
  add(55, "B1", "Present Perfect Continuous: «делаю уже давно»", `<div class="formula">have / has + been + глагол-ing</div>
<p>Действие началось в прошлом и <b>длится до сих пор</b> (или только что закончилось, и видны следы). По-русски тут обычно настоящее время: «Я жду уже час».<br>
<i>I <b>have been waiting</b> for an hour.</i> Я жду уже час.<br>
<i>She <b>has been learning</b> English since 2020.</i> Она учит английский с 2020 года.<br>
<i><b>How long have</b> you <b>been living</b> here?</i> Сколько ты уже здесь живёшь?</p>
<p><b>for</b> + срок: for two hours, for a week. &nbsp; <b>since</b> + точка начала: since Monday, since 9 o'clock, since I was a child.</p>
<table class="t"><tr><th>Continuous: процесс, «как долго»</th><th>Simple: результат, «сколько сделал»</th></tr>
<tr><td><i>I have been reading this book all day.</i></td><td><i>I have read 50 pages.</i></td></tr>
<tr><td><i>She has been cleaning. (она устала)</i></td><td><i>She has cleaned the room. (комната чистая)</i></td></tr></table>
<div class="err">❌ I wait for an hour. / I am waiting for an hour. → ✅ I have been waiting for an hour.<br>❌ I have been knowing him for years. → ✅ I have known him for years. (know, like, want, have = иметь: без -ing)</div>`);
  P[55] = {
    steps: [
      S("Шаг 1. «Уже давно» = началось и всё ещё идёт", "По-русски «Я учу английский три года» звучит в настоящем. По-английски Present Simple и Present Continuous тут нельзя: время тянется из прошлого в сейчас, поэтому нужно have been + -ing.", [["I have been learning English for three years.", "Я учу английский три года."], ["It has been raining since the morning.", "Дождь идёт с утра."]]),
      S("Шаг 2. Формула: have / has + been + -ing", "Три кусочка, ни один не теряем. Has для he, she, it. Сокращения: I've been, she's been.", [["We have been waiting for 20 minutes.", "Мы ждём уже 20 минут."], ["He has been playing games all evening.", "Он весь вечер играет в игры."]]),
      S("Шаг 3. for или since", "for + сколько длится: for two hours, for a year, for ages. since + с какого момента: since Monday, since 2022, since I was ten.", [["She has been working here for five years.", "Она работает здесь пять лет."], ["She has been working here since 2021.", "Она работает здесь с 2021 года."]]),
      S("Шаг 4. Вопрос How long ...? и отрицание", "Вопрос: How long + have / has + кто + been + -ing? Отрицание: haven't / hasn't been + -ing.", [["How long have you been waiting?", "Сколько ты уже ждёшь?"], ["I haven't been sleeping well lately.", "В последнее время я плохо сплю."]]),
      S("Шаг 5. Процесс или результат", "Continuous: важен процесс и как долго (руки грязные, потому что красил). Present Perfect Simple: важен результат и сколько сделано (покрасил две комнаты).", [["I've been painting the fence. That's why my hands are dirty.", "Я красил забор. Поэтому руки грязные."], ["I've painted two rooms.", "Я покрасил две комнаты."]]),
      S("Шаг 6. Глаголы состояния без -ing", "Know, like, love, want, believe, have (иметь) в Continuous не ставим. С ними обычный Present Perfect: have known, have had.", [["I have known her for five years.", "Я знаю её пять лет."], ["We have had this car since 2019.", "У нас эта машина с 2019 года."]])
    ],
    tasks: [
      O("Соберите: Я жду тебя уже час.", ["I", "have been", "waiting for you", "for an hour"], "I have been waiting for you for an hour", "Длится до сих пор: have been + waiting, срок через for."),
      O("Соберите: Сколько ты уже учишь английский?", ["How long", "have", "you", "been", "learning", "English"], "How long have you been learning English", "How long + have + you + been + -ing."),
      O("Соберите: Дождь идёт с утра.", ["It", "has been", "raining", "since", "the morning"], "It has been raining since the morning", "It = оно, значит has. С какого момента: since."),
      Ch("She has been working here ___ 2021.", ["for", "since", "from"], 1, "2021 = точка начала, значит since."),
      Ch("I ___ him for ten years.", ["have been knowing", "have known", "know"], 1, "Know не ставим в -ing: have known."),
      Ch("I'm tired. I ___ all day.", ["have been studying", "am studying", "study"], 0, "Важен процесс и как долго (весь день): have been studying."),
      Ch("I ___ three chapters of this book.", ["have been reading", "have read", "am reading"], 1, "Сколько сделано (результат): Present Perfect Simple."),
      I("They ___ (play) football for two hours. Впишите три слова.", ["have been playing"], "Длится два часа: have been playing."),
      I("Переведите: Я живу здесь с детства.", ["I have been living here since I was a child", "I have lived here since I was a child", "I have been living here since childhood", "I have lived here since childhood", "I have been living here since I was little", "I have lived here since I was little"], "Живу до сих пор: have been living / have lived + since."),
      F("Исправьте: I am learning English for five years.", ["I have been learning English for five years", "I have been studying English for five years"], "Длится уже пять лет: have been + learning.")
    ]
  };
  T[55] = [
    ["Я жду уже двадцать минут.", "I have been waiting for twenty minutes|I have been waiting twenty minutes", "have been waiting"],
    ["Она учит английский с 2020 года.", "She has been learning English since 2020|She has been studying English since 2020|She's been learning English since 2020|She's been studying English since 2020", "since 2020"],
    ["Сколько ты уже здесь живёшь?", "How long have you been living here|How long have you lived here", "How long have you"],
    ["Дождь идёт с утра.", "It has been raining since morning|It has been raining since the morning|It's been raining since morning|It's been raining since the morning", "since morning"],
    ["Мы играем в эту игру уже три часа.", "We have been playing this game for three hours", "for three hours"],
    ["Я устал, потому что весь день убирался.", "I am tired because I have been cleaning all day|I am tired because I have been cleaning the whole day|I am tired because I have been tidying up all day|I am tired because I have been cleaning up all day", "have been cleaning"],
    ["Он работает в этой компании пять лет.", "He has been working for this company for five years|He has been working at this company for five years|He has worked for this company for five years|He has worked at this company for five years|He's been working for this company for five years|He's been working at this company for five years", "for five years"],
    ["Я знаю её с детства.", "I have known her since I was a child|I have known her since childhood|I have known her since we were children|I have known her since we were kids", "know без -ing"],
    ["Как долго вы ждёте автобус?", "How long have you been waiting for the bus|How long have you been waiting for a bus", "How long + been"],
    ["В последнее время я плохо сплю.", "I haven't been sleeping well lately|I haven't been sleeping well recently|Lately I haven't been sleeping well|I have been sleeping badly lately|I have been sleeping badly recently|Recently I haven't been sleeping well", "lately"],
    ["Мой брат смотрит сериалы с обеда.", "My brother has been watching TV series since lunch|My brother has been watching series since lunch|My brother has been watching shows since lunch|My brother has been watching TV shows since lunch|My brother's been watching TV series since lunch", "since lunch"],
    ["Мы дружим уже десять лет.", "We have been friends for ten years", "be: без -ing"]
  ];

  /* ---------- 56. Вопросы к подлежащему ---------- */
  add(56, "B1", "Вопросы к подлежащему: Who called? и Who did you call?", `<p>Когда спрашиваем <b>о том, кто делает</b> (о подлежащем), do / does / did <b>не нужны</b>. Порядок как в обычном предложении: <b>Who / What + глагол</b>.</p>
<div class="formula">Who / What / Which + глагол (без do / does / did)?</div>
<table class="t"><tr><th>Вопрос к подлежащему</th><th>Вопрос к дополнению</th></tr>
<tr><td><i><b>Who called</b> you?</i> Кто тебе звонил?</td><td><i><b>Who did</b> you <b>call</b>?</i> Кому ты звонил?</td></tr>
<tr><td><i><b>What happened</b>?</i> Что случилось?</td><td><i><b>What did</b> you <b>do</b>?</i> Что ты сделал?</td></tr>
<tr><td><i><b>Who lives</b> here?</i> Кто здесь живёт?</td><td><i><b>Who do</b> you <b>live</b> with?</i> С кем ты живёшь?</td></tr></table>
<p>В настоящем после who / what глагол с <b>-s</b>, как после he: <i>Who <b>wants</b> pizza? Who <b>knows</b> the answer?</i><br>
Which / Whose / How many + существительное тоже бывают подлежащим: <i><b>Which team won</b>? <b>How many people came</b>?</i></p>
<div class="err">❌ Who did call you? → ✅ Who called you?<br>❌ What did happen? → ✅ What happened?<br>❌ Who want pizza? → ✅ Who wants pizza?</div>`);
  P[56] = {
    steps: [
      S("Шаг 1. Кого не знаем?", "Сравните: «Кто позвонил Ане?» (не знаем, кто звонил) и «Кому позвонила Аня?» (Аня звонила, не знаем кому). В английском это два разных вопроса с разным порядком слов.", [["Who called Anya?", "Кто позвонил Ане?"], ["Who did Anya call?", "Кому позвонила Аня?"]]),
      S("Шаг 2. Вопрос к «кто»: без do / does / did", "Если who или what стоят на месте подлежащего, просто ставим их вместо него. Порядок как в утверждении, вспомогательный глагол не нужен.", [["Tom broke the window. → Who broke the window?", "Кто разбил окно?"], ["Something happened. → What happened?", "Что случилось?"]]),
      S("Шаг 3. В настоящем: глагол с -s", "Who и what считаются как «он», поэтому глагол получает -s. Даже если ответ будет «они», в вопросе всё равно -s.", [["Who wants ice cream?", "Кто хочет мороженое?"], ["What makes you happy?", "Что делает тебя счастливым?"]]),
      S("Шаг 4. Вопрос к дополнению: с do / does / did", "Если в вопросе есть свой «кто» (you, she, your mom), а спрашиваем о другом, работает обычная схема: who / what + do / does / did + кто + глагол.", [["Who did you see?", "Кого ты видел?"], ["What does she want?", "Что она хочет?"]]),
      S("Шаг 5. Which, whose, how many + слово", "Если вопросительное слово вместе с существительным стоит на месте подлежащего, тоже без do.", [["Which team won the match?", "Какая команда выиграла матч?"], ["How many students passed the test?", "Сколько учеников сдали тест?"]]),
      S("Шаг 6. С be, can, will ничего не меняется", "Who + is / was / can / will + остальное. Порядок тот же: сначала who, потом глагол.", [["Who can help me?", "Кто может мне помочь?"], ["Who was at the party?", "Кто был на вечеринке?"]])
    ],
    tasks: [
      O("Соберите: Кто разбил окно?", ["Who", "broke", "the window"], "Who broke the window", "Спрашиваем, кто сделал: who + глагол, без did."),
      O("Соберите: Кого ты видел вчера?", ["Who", "did", "you", "see", "yesterday"], "Who did you see yesterday", "Видел ты, спрашиваем о другом: нужен did."),
      O("Соберите: Что случилось с твоим телефоном?", ["What", "happened", "to", "your phone"], "What happened to your phone", "What = подлежащее: без did."),
      Ch("«Кто тебе звонил?»", ["Who did call you?", "Who called you?", "Who you called?"], 1, "Не знаем, кто звонил: who + called."),
      Ch("«Кому ты звонил?»", ["Who did you call?", "Who called you?", "Who you called?"], 0, "Звонил ты, а кому, не знаем: who + did + you + call."),
      Ch("Who ___ the answer?", ["know", "does know", "knows"], 2, "Who как «он»: knows с -s, без does."),
      Ch("Which team ___ the match?", ["did win", "won", "win"], 1, "Which team = подлежащее: просто won."),
      I("Переведите: Кто живёт в этом доме?", ["Who lives in this house"], "Who + lives (с -s)."),
      I("Переведите: Что ты сказал?", ["What did you say"], "Сказал ты: What + did + you + say."),
      F("Исправьте: What did happen yesterday?", ["What happened yesterday"], "What = подлежащее: без did, глагол в прошедшем.")
    ]
  };
  T[56] = [
    ["Кто тебе звонил?", "Who called you|Who rang you|Who phoned you", "без did"],
    ["Кому ты звонил?", "Who did you call|Who did you phone|Whom did you call", "did + you"],
    ["Что случилось?", "What happened|What has happened", "без did"],
    ["Кто хочет пиццу?", "Who wants pizza|Who wants some pizza|Who wants a pizza", "wants с -s"],
    ["Кто знает ответ?", "Who knows the answer", "knows с -s"],
    ["Кто разбил окно?", "Who broke the window|Who has broken the window", "broke"],
    ["Что ты видел?", "What did you see|What have you seen", "did + you"],
    ["Какая команда выиграла?", "Which team won|What team won|Which team has won", "Which team + won"],
    ["Сколько человек пришло на вечеринку?", "How many people came to the party|How many people went to the party", "How many people + came"],
    ["Кто может мне помочь?", "Who can help me", "Who can"],
    ["Что тебя рассмешило?", "What made you laugh", "made you laugh"],
    ["С кем ты живёшь?", "Who do you live with|Who are you living with|With whom do you live|Whom do you live with", "do + you"]
  ];

  /* ---------- 57. Возвратные местоимения ---------- */
  add(57, "B1", "Возвратные местоимения: myself, each other", `<table class="t"><tr><th>Кто</th><th>Сам себя</th></tr>
<tr><td>I</td><td><b>myself</b></td></tr>
<tr><td>you (один)</td><td><b>yourself</b></td></tr>
<tr><td>he / she / it</td><td><b>himself / herself / itself</b></td></tr>
<tr><td>we</td><td><b>ourselves</b></td></tr>
<tr><td>you (много)</td><td><b>yourselves</b></td></tr>
<tr><td>they</td><td><b>themselves</b></td></tr></table>
<p><b>Себя:</b> <i>I cut <b>myself</b>. Look at <b>yourself</b>!</i><br>
<b>Сам (без помощи):</b> <i>I did it <b>myself</b>.</i> &nbsp; <b>by myself</b> = один, в одиночку: <i>She lives <b>by herself</b>.</i><br>
<b>Друг друга:</b> <b>each other</b>: <i>We help <b>each other</b>.</i> (не ourselves)</p>
<p><b>Устойчивые:</b> <i>enjoy yourself</i> (хорошо проведи время), <i>help yourself</i> (угощайся), <i>behave yourself</i> (веди себя хорошо).</p>
<div class="note">Русское «-ся» часто НЕ переводится: умываться = <b>wash</b>, одеваться = <b>get dressed</b>, чувствовать себя = <b>feel</b>, расслабляться = <b>relax</b>, встречаться = <b>meet</b>, волноваться = <b>worry</b>.</div>
<div class="err">❌ I feel myself bad. → ✅ I feel bad.<br>❌ Relax yourself. → ✅ Relax.<br>❌ They love themselves. (если «друг друга») → ✅ They love each other.<br>❌ hisself, theirselves → ✅ himself, themselves</div>`);
  P[57] = {
    steps: [
      S("Шаг 1. Сам себя: myself, yourself ...", "Если человек делает что-то с самим собой, после глагола ставим слово на -self (один) или -selves (много). Форма зависит от того, кто действует.", [["I cut myself.", "Я порезался."], ["She looked at herself in the mirror.", "Она посмотрела на себя в зеркало."]]),
      S("Шаг 2. Выберите правильную форму", "I → myself, you → yourself, he → himself, she → herself, it → itself, we → ourselves, they → themselves. Если «вы» несколько человек: yourselves. Слов hisself и theirselves нет.", [["He taught himself to play the guitar.", "Он сам научился играть на гитаре."], ["Kids, help yourselves!", "Дети, угощайтесь!"]]),
      S("Шаг 3. «Сам» и «в одиночку»", "Myself в конце фразы = сам, без чужой помощи. By myself = один, в одиночку.", [["I made this cake myself.", "Я сам испёк этот торт."], ["My grandma lives by herself.", "Бабушка живёт одна."]]),
      S("Шаг 4. Друг друга: each other", "Если двое делают что-то друг с другом, это each other, а не -selves. They love themselves = каждый любит себя. They love each other = любят друг друга.", [["We have known each other for years.", "Мы знаем друг друга много лет."], ["They looked at each other.", "Они посмотрели друг на друга."]]),
      S("Шаг 5. Русское «-ся» обычно без -self", "Умываться, одеваться, чувствовать себя, расслабляться, волноваться: в английском просто глагол. Wash, feel, relax, worry, meet идут без myself.", [["I feel tired.", "Я чувствую себя уставшим."], ["Relax! Don't worry.", "Расслабься! Не волнуйся."], ["I got dressed and went out.", "Я оделся и вышел."]]),
      S("Шаг 6. Устойчивые фразы", "Enjoy yourself! = Хорошо проведи время! (после enjoy обязательно что-то или кого-то). Help yourself = угощайся. Behave yourself = веди себя хорошо.", [["Did you enjoy yourselves at the party?", "Вам понравилось на вечеринке?"], ["Help yourself to some cake.", "Угощайся тортом."]])
    ],
    tasks: [
      O("Соберите: Я сам это сделал.", ["I", "did", "it", "myself"], "I did it myself", "Сам, без помощи: myself в конце."),
      O("Соберите: Они помогают друг другу.", ["They", "help", "each other"], "They help each other", "Друг другу: each other, а не themselves."),
      O("Соберите: Она живёт одна.", ["She", "lives", "by", "herself"], "She lives by herself", "В одиночку: by herself."),
      Ch("He hurt ___ when he was playing football.", ["him", "himself", "hisself"], 1, "Сам себя, he: himself. Слова hisself нет."),
      Ch("«Я чувствую себя хорошо.»", ["I feel myself good.", "I feel good.", "I feel me good."], 1, "Feel без myself: I feel good."),
      Ch("Anna and Max love ___ . They are going to get married.", ["themselves", "each other", "ourselves"], 1, "Любят друг друга: each other."),
      I("We enjoyed ___ at the party. (вставьте одно слово)", ["ourselves"], "We → ourselves."),
      I("Переведите: Угощайся!", ["Help yourself", "Help yourselves"], "Устойчивое: help yourself."),
      F("Исправьте: Relax yourself and don't worry.", ["Relax and don't worry", "Relax and do not worry"], "Relax без yourself."),
      F("Исправьте: They did it theirselves.", ["They did it themselves"], "Правильно только themselves.")
    ]
  };
  T[57] = [
    ["Я порезался.", "I cut myself", "cut + myself"],
    ["Я сам это сделал.", "I did it myself|I did it by myself|I made it myself", "myself в конце"],
    ["Хорошо проведите время!", "Enjoy yourselves|Enjoy yourself|Have a good time|Have fun", "enjoy + yourselves"],
    ["Угощайся.", "Help yourself", "help yourself"],
    ["Мы знаем друг друга с детства.", "We have known each other since childhood|We have known each other since we were children|We have known each other since we were kids", "each other"],
    ["Я чувствую себя плохо.", "I feel bad|I feel ill|I feel sick|I do not feel well|I am not feeling well|I feel unwell", "feel без myself"],
    ["Он сам научился плавать.", "He taught himself to swim|He learned to swim by himself|He learned to swim himself|He learnt to swim by himself", "taught himself"],
    ["Бабушка живёт одна.", "My grandma lives by herself|Grandma lives by herself|My grandma lives alone|Grandma lives alone|My grandmother lives by herself|My grandmother lives alone|Granny lives by herself|Granny lives alone", "by herself"],
    ["Расслабься, не волнуйся.", "Relax don't worry|Relax and don't worry", "без yourself"],
    ["Посмотри на себя!", "Look at yourself", "yourself"],
    ["Они посмотрели друг на друга.", "They looked at each other|They looked at one another", "each other"],
    ["Я умылся и оделся.", "I washed and got dressed|I washed my face and got dressed|I had a wash and got dressed", "get dressed"]
  ];

  /* ---------- 58. So do I / Neither do I ---------- */
  add(58, "B1", "So do I / Neither do I: «я тоже»", `<p>«Я тоже» по-английски зависит от того, <b>соглашаемся мы с плюсом или с минусом</b>, и от <b>времени</b> фразы собеседника.</p>
<div class="formula">So / Neither + вспомогательный глагол + кто</div>
<table class="t"><tr><th>Собеседник</th><th>Я тоже</th></tr>
<tr><td><i>I like pizza.</i></td><td><b>So do I.</b></td></tr>
<tr><td><i>I don't like fish.</i></td><td><b>Neither do I.</b> / <b>Nor do I.</b></td></tr>
<tr><td><i>I'm tired.</i></td><td><b>So am I.</b></td></tr>
<tr><td><i>I went to the cinema.</i></td><td><b>So did I.</b></td></tr>
<tr><td><i>I can't swim.</i></td><td><b>Neither can I.</b></td></tr>
<tr><td><i>I have been to Rome.</i></td><td><b>So have I.</b></td></tr></table>
<p>Глагол берём из фразы собеседника: am / is / are, was / were, can, will, have. Если там обычный глагол, ставим <b>do / does / did</b>.<br>
Не согласны? <i>I like it. → Oh, <b>I don't</b>.</i> &nbsp; <i>I don't like it. → <b>I do</b>!</i><br>
Разговорно: <b>Me too.</b> (на плюс), <b>Me neither.</b> (на минус).</p>
<div class="err">❌ I don't like fish. Me too. → ✅ Me neither. / Neither do I.<br>❌ So I do. → ✅ So do I.<br>❌ I was tired. So did I. → ✅ So was I.<br>❌ Neither don't I. → ✅ Neither do I.</div>`);
  P[58] = {
    steps: [
      S("Шаг 1. На плюс: So + глагол + I", "Собеседник сказал что-то утвердительное, и у нас так же: So do I. Порядок как в вопросе: сначала глагол, потом I.", [["I love summer. So do I.", "Я люблю лето. Я тоже."], ["My sister plays the piano. So does my brother.", "Моя сестра играет на пианино. Мой брат тоже."]]),
      S("Шаг 2. Глагол берём из фразы собеседника", "Если там am / is / was / can / will / have, повторяем его. Если обычный глагол, ставим do / does / did в том же времени.", [["I'm hungry. So am I.", "Я голоден. Я тоже."], ["I can swim. So can I.", "Я умею плавать. Я тоже."], ["I watched that film. So did I.", "Я смотрел этот фильм. Я тоже."]]),
      S("Шаг 3. На минус: Neither + глагол + I", "Если во фразе есть not (don't, can't, wasn't), отвечаем Neither do I или Nor do I. Сам глагол после neither без not: в английском только одно отрицание.", [["I don't like coffee. Neither do I.", "Я не люблю кофе. Я тоже."], ["I wasn't at school yesterday. Neither was I.", "Меня вчера не было в школе. Меня тоже."]]),
      S("Шаг 4. Разговорно: Me too и Me neither", "С друзьями и в чате можно короче: Me too на плюс, Me neither на минус. Типичная ошибка русских: Me too на отрицание, ведь по-русски «я тоже» подходит к обоим.", [["I'm tired. Me too.", "Я устал. Я тоже."], ["I can't sleep. Me neither.", "Не могу уснуть. Я тоже."]]),
      S("Шаг 5. Если не согласны", "So и neither не нужны: просто I + вспомогательный глагол, с not или без.", [["I like horror films. Oh, I don't.", "Я люблю ужастики. А я нет."], ["I didn't like the book. I did!", "Мне не понравилась книга. А мне понравилась!"]])
    ],
    tasks: [
      O("Соберите ответ на «I love pizza»: Я тоже.", ["So", "do", "I"], "So do I", "Плюс, обычный глагол: So do I."),
      O("Соберите ответ на «I can't swim»: Я тоже.", ["Neither", "can", "I"], "Neither can I", "Минус с can: Neither can I."),
      O("Соберите ответ на «I was tired»: Моя мама тоже.", ["So", "was", "my mom"], "So was my mom", "Повторяем was из фразы: So was my mom."),
      Ch("I'm hungry. ___", ["So do I.", "So am I.", "So I am."], 1, "Во фразе am: So am I."),
      Ch("I don't like rain. ___", ["Me too.", "So do I.", "Neither do I."], 2, "Минус: Neither do I."),
      Ch("I went to the concert yesterday. ___", ["So did I.", "So do I.", "So went I."], 0, "Прошлое, обычный глагол: So did I."),
      Ch("I have never been to Paris. ___", ["Neither have I.", "Neither haven't I.", "So have I."], 0, "Never = минус, глагол have: Neither have I (без not)."),
      I("I can't swim. ___ can I. (вставьте одно слово)", ["Neither", "Nor"], "Минус: Neither или Nor."),
      I("Ответьте «Я тоже» на: I will be at home tonight.", ["So will I", "Me too"], "Во фразе will: So will I."),
      F("Исправьте ответ на «I don't eat meat»: Me too.", ["Me neither", "Neither do I", "Nor do I"], "На минус: Me neither или Neither do I.")
    ]
  };
  T[58] = [
    ["Ответ на «I love cats»: Я тоже.", "So do I|Me too", "So + do + I"],
    ["Ответ на «I don't like coffee»: Я тоже.", "Neither do I|Nor do I|Me neither", "Neither"],
    ["Ответ на «I'm tired»: Я тоже.", "So am I|Me too", "So + am"],
    ["Ответ на «I can't sleep»: Я тоже.", "Neither can I|Nor can I|Me neither", "Neither + can"],
    ["Ответ на «I watched that film»: Я тоже.", "So did I|Me too", "Прошлое: did"],
    ["Ответ на «I wasn't at school yesterday»: Я тоже.", "Neither was I|Nor was I|Me neither", "Neither + was"],
    ["Ответ на «I have been to Spain»: Я тоже.", "So have I|Me too", "So + have"],
    ["Ответ на «I will be late»: Я тоже.", "So will I|Me too", "So + will"],
    ["Ответ на «My mom works in a bank»: Мой папа тоже.", "So does my dad|So does my father", "does + my dad"],
    ["Ответ на «I didn't do my homework»: Я тоже.", "Neither did I|Nor did I|Me neither", "Neither + did"],
    ["Ответ на «I like horror films»: А я нет.", "I don't|Oh I don't|I don't like them", "I + don't"],
    ["Ответ на «I don't like math»: А я люблю!", "I do|Oh I do|I do like it", "I + do"]
  ];

  /* ---------- 59. Be used to / get used to ---------- */
  add(59, "B1", "Be used to / get used to: «привык»", `<table class="t"><tr><th>Форма</th><th>Значение</th><th>Пример</th></tr>
<tr><td><b>used to</b> + глагол</td><td>раньше делал, теперь нет</td><td><i>I <b>used to live</b> in a village.</i></td></tr>
<tr><td><b>be used to</b> + -ing / сущ.</td><td>привык (уже нормально)</td><td><i>I <b>am used to getting up</b> early.</i></td></tr>
<tr><td><b>get used to</b> + -ing / сущ.</td><td>привыкать, привыкнуть</td><td><i>I <b>am getting used to</b> the cold.</i></td></tr></table>
<div class="formula">be / get used to + -ing или существительное</div>
<p>Здесь <b>to</b> работает как русское «к» (привык <b>к</b> чему), поэтому после него <b>-ing</b> или существительное, а не простой глагол.<br>
<b>be</b> меняется по лицам и временам: <i>She <b>is</b> used to it. I <b>was</b> used to it.</i><br>
<b>get</b> тоже: <i>You'<b>ll get used to</b> it. I <b>got used to</b> the noise. I <b>can't get used to</b> it.</i></p>
<div class="err">❌ I am used to get up early. → ✅ I am used to getting up early.<br>❌ I used to getting up early. (нет am) → ✅ I am used to getting up early.<br>❌ I use to the noise. → ✅ I'm used to the noise.</div>`);
  P[59] = {
    steps: [
      S("Шаг 1. Три похожих выражения", "Used to + глагол = раньше делал, теперь нет. Be used to = уже привык. Get used to = привыкаю, привыкну. Разница в маленьком слове перед used: ничего, am / is или get.", [["I used to drink milk.", "Раньше я пил молоко."], ["I'm used to cold weather.", "Я привык к холодной погоде."]]),
      S("Шаг 2. be used to = уже привык", "Это состояние: мне уже нормально, не трудно. Am / is / are меняются по лицам, was / were для прошлого.", [["She is used to living alone.", "Она привыкла жить одна."], ["We were used to the noise.", "Мы привыкли к шуму."]]),
      S("Шаг 3. После to: -ing или существительное", "To здесь как русское «к»: привык к чему? Поэтому дальше -ing (getting up, working) или существительное (the noise, the food). Самая частая ошибка: I'm used to get up.", [["I'm used to getting up at six.", "Я привык вставать в шесть."], ["He isn't used to the food here.", "Он не привык к здешней еде."]]),
      S("Шаг 4. get used to = привыкать, привыкнуть", "Это процесс или его итог: привыкаю сейчас, привык в прошлом, привыкну в будущем. Меняется get: am getting, got, will get.", [["I'm getting used to my new school.", "Я привыкаю к новой школе."], ["Don't worry, you'll get used to it.", "Не волнуйся, ты привыкнешь."], ["It took me a month to get used to the time difference.", "Мне понадобился месяц, чтобы привыкнуть к разнице во времени."]]),
      S("Шаг 5. Отрицание и вопрос", "Отрицание через be: I'm not used to. Вопрос: Are you used to ...? С get: I can't get used to ..., Have you got used to ...?", [["I'm not used to speaking English all day.", "Я не привык весь день говорить по-английски."], ["Are you used to the new teacher?", "Ты привык к новому учителю?"]])
    ],
    tasks: [
      O("Соберите: Я привык рано вставать.", ["I", "am", "used to", "getting up", "early"], "I am used to getting up early", "Привык: am used to + -ing."),
      O("Соберите: Ты к этому привыкнешь.", ["You", "will", "get used to", "it"], "You will get used to it", "Привыкнешь: will get used to."),
      O("Соберите: Раньше я жил в деревне.", ["I", "used to", "live", "in a village"], "I used to live in a village", "Раньше, а теперь нет: used to + глагол."),
      Ch("I'm used to ___ in a big city.", ["live", "living", "lived"], 1, "После be used to: -ing."),
      Ch("Раньше я играл на скрипке: I ___ play the violin.", ["used to", "am used to", "got used to"], 0, "Раньше делал: used to + глагол."),
      Ch("I moved to Canada last month, and I'm still ___ the cold.", ["used to", "getting used to", "use to"], 1, "Процесс, ещё привыкаю: getting used to."),
      I("She isn't used ___ (work) at night. Впишите два слова.", ["to working"], "be used to + -ing: to working."),
      I("Переведите: Я не могу привыкнуть к этой еде.", ["I can't get used to this food", "I cannot get used to this food"], "Не могу привыкнуть: can't get used to."),
      F("Исправьте: I am used to get up at 6.", ["I am used to getting up at 6", "I'm used to getting up at six"], "После be used to нужен -ing."),
      F("Исправьте: He used to the noise now.", ["He is used to the noise now", "He has got used to the noise now", "He has gotten used to the noise now", "He's used to the noise now"], "Привык сейчас: нужен is (is used to).")
    ]
  };
  T[59] = [
    ["Я привык рано вставать.", "I am used to getting up early|I am used to waking up early", "used to + -ing"],
    ["Она привыкла к холоду.", "She is used to the cold|She's used to the cold|She has got used to the cold|She has gotten used to the cold|She got used to the cold", "is used to"],
    ["Ты привыкнешь.", "You will get used to it", "will get used to"],
    ["Я привыкаю к новой школе.", "I am getting used to my new school|I am getting used to the new school", "getting used to"],
    ["Он не привык работать по ночам.", "He is not used to working at night|He isn't used to working at night|He is not used to working at nights|He isn't used to working nights", "not used to + -ing"],
    ["Мы быстро привыкли к шуму.", "We quickly got used to the noise|We got used to the noise quickly|We got used to the noise fast", "got used to"],
    ["Раньше я ходил в музыкальную школу.", "I used to go to music school|I used to go to a music school|I used to attend music school|I used to attend a music school", "used to + глагол"],
    ["Ты привык к новому учителю?", "Are you used to the new teacher|Have you got used to the new teacher|Have you gotten used to the new teacher|Did you get used to the new teacher", "Are you used to"],
    ["Я не могу привыкнуть к этой погоде.", "I can't get used to this weather", "can't get used to"],
    ["Мне трудно привыкнуть к разнице во времени.", "It is hard for me to get used to the time difference|It is difficult for me to get used to the time difference|I find it hard to get used to the time difference|I find it difficult to get used to the time difference", "get used to"],
    ["Я привык говорить по-английски на уроках.", "I am used to speaking English in class|I am used to speaking English in lessons|I am used to speaking English at lessons|I am used to speaking English in classes", "used to speaking"],
    ["Раньше она не любила спорт.", "She didn't use to like sport|She didn't use to like sports|She never used to like sport|She never used to like sports|She used not to like sport|She used not to like sports", "didn't use to"]
  ];

  /* ---------- 60. Future Continuous и Future Perfect ---------- */
  add(60, "B2", "Future Continuous и Future Perfect", `<table class="t"><tr><th>Время</th><th>Формула</th><th>Значение</th></tr>
<tr><td>Future Continuous</td><td><b>will be + -ing</b></td><td>буду в процессе в момент в будущем</td></tr>
<tr><td>Future Perfect</td><td><b>will have + 3-я форма</b></td><td>уже будет сделано к моменту в будущем</td></tr></table>
<p><i>This time tomorrow I <b>will be flying</b> to London.</i> Завтра в это время я буду лететь в Лондон.<br>
<i>At 8 pm I'<b>ll be doing</b> my homework.</i> В 8 вечера я буду делать уроки.<br>
<i>By June I <b>will have finished</b> school.</i> К июню я уже закончу школу.<br>
<i>By the time you come, we'<b>ll have eaten</b>.</i> К твоему приходу мы уже поедим.</p>
<p><b>Подсказки:</b> this time tomorrow, at 5 o'clock tomorrow, all evening → Continuous; <b>by</b> (к), by the time, by then → Perfect.<br>
Вежливо спросить о планах: <i><b>Will</b> you <b>be using</b> the laptop tonight?</i></p>
<div class="err">❌ By Friday I will finish the project. (если «уже закончу к пятнице») → ✅ By Friday I will have finished the project.<br>❌ When you come, I will do my homework. (буду в процессе) → ✅ When you come, I will be doing my homework.<br>❌ By the time you will come → ✅ By the time you come (после when, if, by the time настоящее)</div>`);
  P[60] = {
    steps: [
      S("Шаг 1. Future Continuous: буду в процессе", "Представьте фото из будущего: в этот момент действие идёт. Формула will be + -ing. По-русски «буду делать» в конкретный момент.", [["At 10 tomorrow I will be writing a test.", "Завтра в 10 я буду писать контрольную."], ["This time next week we will be lying on the beach.", "Через неделю в это время мы будем лежать на пляже."]]),
      S("Шаг 2. «Когда ты придёшь, я буду ...»", "Одно действие идёт, второе случается на его фоне. После when, if, by the time будущее не ставим: там Present Simple.", [["When you call, I will be driving.", "Когда позвонишь, я буду за рулём."], ["Don't come at 7. We will be having dinner.", "Не приходи в 7. Мы будем ужинать."]]),
      S("Шаг 3. Вежливый вопрос о планах", "Will you be + -ing? звучит мягче, чем Will you ...? Мы просто узнаём о планах, а не просим.", [["Will you be using your bike tomorrow?", "Ты завтра будешь пользоваться велосипедом?"], ["Will you be going to the shop later?", "Ты потом пойдёшь в магазин?"]]),
      S("Шаг 4. Future Perfect: уже сделаю к моменту", "Действие закончится до какой-то точки в будущем. Формула will have + 3-я форма. Главная подсказка: by = к (by Monday, by 2030).", [["By Monday I will have finished the essay.", "К понедельнику я уже закончу эссе."], ["By 2030 I will have graduated from university.", "К 2030 году я уже окончу университет."]]),
      S("Шаг 5. Отрицание и вопрос", "Not после will: won't be doing, won't have done. Вопрос: Will + кто + be doing / have done?", [["I won't have finished by then.", "К тому времени я ещё не закончу."], ["Will you have done it by Friday?", "Ты сделаешь это к пятнице?"]]),
      S("Шаг 6. Как выбрать", "В процессе в момент (at 5 o'clock, this time tomorrow): will be + -ing. Уже готово к моменту (by 5 o'clock, by the time): will have + 3-я форма. Просто факт или решение: обычное will.", [["At 6 I'll be cooking. By 7 I'll have cooked dinner.", "В 6 я буду готовить. К 7 я уже приготовлю ужин."]])
    ],
    tasks: [
      O("Соберите: Завтра в это время я буду лететь в Лондон.", ["This time tomorrow", "I", "will be", "flying", "to London"], "This time tomorrow I will be flying to London", "В процессе в момент: will be + -ing."),
      O("Соберите: К июню я уже закончу школу.", ["By June", "I", "will have", "finished", "school"], "By June I will have finished school", "Готово к моменту (by): will have + 3-я форма."),
      O("Соберите: Ты будешь пользоваться ноутбуком вечером?", ["Will", "you", "be using", "the laptop", "tonight"], "Will you be using the laptop tonight", "Вежливый вопрос о планах: Will you be + -ing?"),
      Ch("Don't call me at 8. I ___ my homework.", ["will do", "will be doing", "will have done"], 1, "В 8 буду в процессе: will be doing."),
      Ch("By the end of the year, she ___ 20 books.", ["will be reading", "will read", "will have read"], 2, "К концу года уже прочитает: will have read."),
      Ch("By the time you ___ , we will have eaten.", ["will come", "come", "will have come"], 1, "После by the time настоящее: come."),
      Ch("This time next week I ___ on the beach.", ["will lie", "will be lying", "will have lain"], 1, "В этот момент в процессе: will be lying."),
      I("At 5 tomorrow we ___ (play) football. Впишите три слова.", ["will be playing"], "В 5 будем в процессе: will be playing."),
      I("Переведите: К пятнице я закончу проект.", ["By Friday I will have finished the project", "I will have finished the project by Friday", "By Friday I will have finished my project", "I will have finished my project by Friday"], "К моменту: will have finished."),
      F("Исправьте: By 2030 I will finish university.", ["By 2030 I will have finished university", "I will have finished university by 2030", "By 2030 I will have graduated from university", "I will have graduated from university by 2030"], "By 2030 = к моменту: will have + 3-я форма.")
    ]
  };
  T[60] = [
    ["Завтра в это время я буду лететь в Лондон.", "This time tomorrow I will be flying to London|I will be flying to London this time tomorrow|At this time tomorrow I will be flying to London", "will be flying"],
    ["В 8 вечера я буду делать уроки.", "At 8 pm I will be doing my homework|I will be doing my homework at 8 pm|At 8 I will be doing my homework|I will be doing my homework at 8|At 8 in the evening I will be doing my homework|I will be doing my homework at 8 in the evening", "will be doing"],
    ["Не звони в семь, мы будем ужинать.", "Don't call at seven we will be having dinner|Don't call me at seven we will be having dinner|Don't call at seven we will be eating dinner|Don't call me at seven we will be eating dinner|Don't call at seven we will be having supper|Don't call me at seven we will be having supper", "will be having"],
    ["Ты будешь пользоваться велосипедом завтра?", "Will you be using your bike tomorrow|Will you be using the bike tomorrow|Will you be using your bicycle tomorrow|Will you be using the bicycle tomorrow", "Will you be using"],
    ["К понедельнику я закончу эссе.", "By Monday I will have finished the essay|I will have finished the essay by Monday|By Monday I will have finished my essay|I will have finished my essay by Monday|By Monday I will have written the essay|I will have written the essay by Monday", "will have finished"],
    ["К тому времени, как ты придёшь, мы уже поедим.", "By the time you come we will have eaten|By the time you come we will have already eaten|By the time you arrive we will have eaten|By the time you arrive we will have already eaten|We will have eaten by the time you come|We will have eaten by the time you arrive", "By the time you come"],
    ["Через неделю в это время мы будем лежать на пляже.", "This time next week we will be lying on the beach|We will be lying on the beach this time next week|At this time next week we will be lying on the beach", "will be lying"],
    ["К 2030 году я окончу университет.", "By 2030 I will have graduated from university|I will have graduated from university by 2030|By 2030 I will have finished university|I will have finished university by 2030", "By 2030 + will have"],
    ["Когда ты позвонишь, я буду за рулём.", "When you call I will be driving|I will be driving when you call", "will be driving"],
    ["К вечеру она уже уедет.", "By the evening she will have left|She will have left by the evening|By evening she will have left|She will have left by evening|By tonight she will have left|She will have left by tonight", "will have left"],
    ["Завтра в это время я буду писать контрольную.", "This time tomorrow I will be writing a test|This time tomorrow I will be taking a test|I will be writing a test this time tomorrow|I will be taking a test this time tomorrow|At this time tomorrow I will be writing a test|At this time tomorrow I will be taking a test", "will be writing"],
    ["К пятнице я ещё не закончу.", "I won't have finished by Friday|By Friday I won't have finished", "won't have finished"]
  ];

  /* ---------- 61. Past Perfect Continuous ---------- */
  add(61, "B2", "Past Perfect Continuous: «делал уже долго до того»", `<div class="formula">had been + глагол-ing</div>
<p>Действие <b>длилось какое-то время до момента в прошлом</b>. Это Present Perfect Continuous, только сдвинутый в прошлое.<br>
<i>I <b>had been waiting</b> for an hour when she finally came.</i> Я ждал уже час, когда она наконец пришла.<br>
<i>She was tired because she <b>had been working</b> all day.</i> Она устала, потому что весь день работала.<br>
<i>The ground was wet. It <b>had been raining</b>.</i> Земля была мокрой: шёл дождь.</p>
<table class="t"><tr><th>Сейчас</th><th>В прошлом</th></tr>
<tr><td><i>I have been waiting for an hour.</i></td><td><i>I had been waiting for an hour (when he came).</i></td></tr>
<tr><td><i>How long have you been living here?</i></td><td><i>How long had you been living there (before you moved)?</i></td></tr></table>
<p><b>Процесс или результат:</b> <i>I <b>had been reading</b> for two hours</i> (сколько длилось) / <i>I <b>had read</b> two chapters</i> (сколько сделано).</p>
<div class="err">❌ I was waiting for an hour when she came. → ✅ I had been waiting for an hour when she came.<br>❌ I had been knowing him for years. → ✅ I had known him for years.</div>`);
  P[61] = {
    steps: [
      S("Шаг 1. Длилось до момента в прошлом", "По-русски «Я ждал уже час, когда она пришла»: ожидание началось раньше и продолжалось до её прихода. По-английски для этого had been + -ing.", [["I had been waiting for an hour when she came.", "Я ждал уже час, когда она пришла."], ["We had been walking for three hours before we found a café.", "Мы шли уже три часа, прежде чем нашли кафе."]]),
      S("Шаг 2. Формула: had been + -ing", "Had одинаковый для всех. Сокращение 'd: I'd been, they'd been. Вопрос: Had you been ...? Отрицание: hadn't been.", [["They had been living in Spain for five years.", "Они уже пять лет жили в Испании (к тому моменту)."], ["How long had you been learning English before the trip?", "Сколько ты учил английский до поездки?"]]),
      S("Шаг 3. Объясняем, почему так было", "Часто это время объясняет, что было видно потом: устал, потому что бегал; глаза красные, потому что плакал.", [["She was tired because she had been running.", "Она устала, потому что бегала."], ["His eyes were red. He had been crying.", "У него были красные глаза. Он плакал."]]),
      S("Шаг 4. С for, since, all day, how long", "Подсказки те же, что у Present Perfect Continuous, только вся история в прошлом.", [["He had been playing games all night, so he overslept.", "Он всю ночь играл, поэтому проспал."], ["She had been working there since 2015 when she got promoted.", "Она работала там с 2015 года, когда её повысили."]]),
      S("Шаг 5. Continuous или обычный Past Perfect", "Had been + -ing: важен процесс и как долго. Had + 3-я форма: важен результат и сколько сделано. Глаголы know, like, want, have (иметь) без -ing.", [["I had been writing for hours.", "Я писал уже несколько часов."], ["I had written three pages.", "Я (к тому моменту) написал три страницы."], ["I had known him for ages.", "Я знал его целую вечность."]])
    ],
    tasks: [
      O("Соберите: Я ждал уже час, когда она пришла.", ["I", "had been", "waiting", "for an hour", "when she came"], "I had been waiting for an hour when she came", "Длилось до момента в прошлом: had been + -ing."),
      O("Соберите: Она устала, потому что весь день работала.", ["She", "was tired", "because", "she had been", "working all day"], "She was tired because she had been working all day", "Причина усталости: had been working."),
      O("Соберите: Сколько ты учил английский до переезда?", ["How long", "had you", "been learning", "English", "before you moved"], "How long had you been learning English before you moved", "How long + had + you + been + -ing."),
      Ch("The ground was wet. It ___ .", ["had been raining", "has been raining", "is raining"], 0, "Всё в прошлом, следы дождя: had been raining."),
      Ch("By the time he arrived, I ___ for two hours.", ["was waiting", "had been waiting", "have been waiting"], 1, "Длилось два часа до его прихода: had been waiting."),
      Ch("I ___ him for years before we became friends.", ["had been knowing", "had known", "was knowing"], 1, "Know без -ing: had known."),
      Ch("When I finished, I ___ five pages.", ["had been writing", "had written", "was writing"], 1, "Сколько сделано: had + 3-я форма."),
      I("His eyes were red. He ___ (cry). Впишите три слова.", ["had been crying"], "Объясняем, почему глаза красные: had been crying."),
      I("Переведите: Мы шли уже три часа, когда пошёл дождь.", ["We had been walking for three hours when it started to rain", "We had been walking for three hours when it started raining", "We had been walking for three hours when it began to rain", "We had been walking for three hours when it began raining"], "Шли до момента дождя: had been walking."),
      F("Исправьте: I was tired because I have been running.", ["I was tired because I had been running"], "История в прошлом: had been, а не have been.")
    ]
  };
  T[61] = [
    ["Я ждал уже час, когда она пришла.", "I had been waiting for an hour when she came|I had been waiting for an hour when she arrived|I'd been waiting for an hour when she came|I'd been waiting for an hour when she arrived", "had been waiting"],
    ["Она устала, потому что бегала.", "She was tired because she had been running|She was tired because she'd been running", "had been running"],
    ["Земля была мокрой: шёл дождь.", "The ground was wet it had been raining|The ground was wet because it had been raining|The ground was wet as it had been raining", "had been raining"],
    ["Они прожили в Испании пять лет, прежде чем переехали в Москву.", "They had been living in Spain for five years before they moved to Moscow|They had lived in Spain for five years before they moved to Moscow|They had been living in Spain for five years before moving to Moscow|They had lived in Spain for five years before moving to Moscow", "had been living"],
    ["У него были красные глаза: он плакал.", "His eyes were red he had been crying|His eyes were red because he had been crying", "had been crying"],
    ["Он всю ночь играл в игры, поэтому проспал.", "He had been playing games all night so he overslept|He had been playing games all night and overslept|He overslept because he had been playing games all night|He had been playing video games all night so he overslept|He had been playing computer games all night so he overslept", "had been playing"],
    ["Сколько ты ждал, прежде чем пришёл автобус?", "How long had you been waiting before the bus came|How long had you been waiting before the bus arrived|How long had you been waiting when the bus came|How long had you been waiting when the bus arrived", "How long had you been"],
    ["Мы шли уже два часа, когда нашли кафе.", "We had been walking for two hours when we found a cafe|We had been walking for two hours when we found a café|We had been walking for two hours before we found a cafe|We had been walking for two hours before we found a café", "had been walking"],
    ["Я учил английский три года до поездки в Лондон.", "I had been learning English for three years before the trip to London|I had been learning English for three years before my trip to London|I had been studying English for three years before the trip to London|I had been studying English for three years before my trip to London|I had been learning English for three years before I went to London|I had been studying English for three years before I went to London", "had been learning"],
    ["У неё были грязные руки, потому что она красила забор.", "Her hands were dirty because she had been painting the fence|She had dirty hands because she had been painting the fence", "had been painting"],
    ["Он работал там десять лет, когда его повысили.", "He had been working there for ten years when he was promoted|He had been working there for ten years when he got promoted|He had worked there for ten years when he was promoted|He had worked there for ten years when he got promoted", "had been working"],
    ["Я долго искал ключи и наконец нашёл их.", "I had been looking for my keys for a long time and finally found them|I had been looking for the keys for a long time and finally found them|I had been looking for my keys for a long time and finally I found them|I had been looking for my keys for a long time before I finally found them|I had been looking for the keys for a long time before I finally found them", "had been looking for"]
  ];

  /* ---------- 62. Would rather, had better, it's time ---------- */
  add(62, "B2", "Would rather, had better, it's time", `<table class="t"><tr><th>Выражение</th><th>Значение</th><th>Пример</th></tr>
<tr><td><b>would rather</b> + глагол</td><td>я бы лучше, предпочёл бы</td><td><i>I'<b>d rather stay</b> at home.</i></td></tr>
<tr><td><b>would rather</b> + кто + прошедшее</td><td>я бы хотел, чтобы другой ...</td><td><i>I'<b>d rather you didn't tell</b> anyone.</i></td></tr>
<tr><td><b>had better</b> + глагол</td><td>лучше бы (а то будет плохо)</td><td><i>You'<b>d better hurry</b>.</i></td></tr>
<tr><td><b>It's time</b> + to + глагол</td><td>пора (сделать)</td><td><i><b>It's time to go</b>.</i></td></tr>
<tr><td><b>It's time</b> + кто + прошедшее</td><td>пора бы уже (давно)</td><td><i><b>It's time you went</b> to bed.</i></td></tr></table>
<p><b>Отрицание:</b> <i>I'd rather <b>not</b> go. You'd better <b>not</b> be late.</i> (not сразу после rather / better)<br>
<b>Сравнение:</b> <i>I'd rather walk <b>than</b> take the bus.</i><br>
<b>'d</b> в <i>I'd rather</i> = would, а в <i>You'd better</i> = had.</p>
<div class="err">❌ I'd rather to stay. → ✅ I'd rather stay.<br>❌ You'd better to go. → ✅ You'd better go.<br>❌ You'd better don't come. → ✅ You'd better not come.<br>❌ It's time you go to bed. → ✅ It's time you went to bed.</div>`);
  P[62] = {
    steps: [
      S("Шаг 1. would rather = я бы лучше", "Так говорим, что предпочитаем. После would rather глагол без to. Сокращение: I'd rather. Сравнить два варианта помогает than.", [["I'd rather stay at home tonight.", "Я бы лучше остался сегодня дома."], ["I'd rather walk than take the bus.", "Я лучше пройдусь, чем поеду на автобусе."]]),
      S("Шаг 2. Отрицание и вопрос", "Not ставим сразу после rather, без don't: I'd rather not. Вопрос: Would you rather ...?", [["I'd rather not talk about it.", "Я бы не хотел об этом говорить."], ["Would you rather have tea or coffee?", "Ты бы предпочёл чай или кофе?"]]),
      S("Шаг 3. Хочу, чтобы ДРУГОЙ: would rather + кто + прошедшее", "Если предпочтение о другом человеке, после него ставим прошедшее время, хотя речь о сейчас или будущем (как в «если бы»).", [["I'd rather you didn't tell Mom.", "Я бы предпочёл, чтобы ты не говорил маме."], ["I'd rather you came tomorrow.", "Мне бы хотелось, чтобы ты пришёл завтра."]]),
      S("Шаг 4. had better = лучше бы, а то ...", "Это совет с предупреждением: не сделаешь, будут проблемы. Звучит сильнее, чем should. Форма had, но речь о сейчас и будущем. Дальше глагол без to, отрицание: had better not.", [["You'd better hurry, or you'll miss the bus.", "Тебе лучше поторопиться, а то опоздаешь на автобус."], ["We'd better not be late.", "Нам лучше не опаздывать."]]),
      S("Шаг 5. It's time: пора", "It's time to + глагол = пора что-то сделать. It's time + кто + прошедшее = пора бы уже, с оттенком «давно надо было». Слово high усиливает: It's high time.", [["It's time to go.", "Пора идти."], ["It's time you went to bed.", "Тебе давно пора спать."], ["It's high time we cleaned the room.", "Нам давно пора убрать комнату."]])
    ],
    tasks: [
      O("Соберите: Я бы лучше остался дома.", ["I would", "rather", "stay", "at home"], "I would rather stay at home", "would rather + глагол без to."),
      O("Соберите: Тебе лучше не опаздывать.", ["You", "had better", "not", "be late"], "You had better not be late", "Отрицание: not сразу после better."),
      O("Соберите: Пора идти.", ["It is", "time", "to", "go"], "It is time to go", "Пора сделать: It is time to + глагол."),
      Ch("I'd rather ___ a film at home.", ["to watch", "watch", "watching"], 1, "После would rather глагол без to."),
      Ch("You'd better ___ your mom.", ["call", "to call", "calling"], 0, "После had better глагол без to."),
      Ch("It's time you ___ to bed.", ["go", "went", "will go"], 1, "It's time + кто + прошедшее: went."),
      Ch("I'd rather you ___ anyone about it.", ["didn't tell", "don't tell", "not tell"], 0, "О другом человеке: прошедшее, didn't tell."),
      I("I'd rather walk ___ take the bus. (вставьте одно слово)", ["than"], "Сравнение: rather ... than."),
      I("Переведите: Я бы не хотел об этом говорить.", ["I would rather not talk about it", "I would rather not speak about it"], "would rather not + глагол."),
      F("Исправьте: You'd better don't tell him.", ["You'd better not tell him", "You had better not tell him"], "Отрицание: had better not, без don't.")
    ]
  };
  T[62] = [
    ["Я бы лучше остался дома.", "I would rather stay at home|I would rather stay home", "would rather + глагол"],
    ["Тебе лучше поторопиться.", "You had better hurry|You'd better hurry|You had better hurry up|You'd better hurry up", "had better"],
    ["Пора идти.", "It is time to go|It is time to leave", "It's time to"],
    ["Тебе давно пора спать.", "It is time you went to bed|It is high time you went to bed|It is time for you to go to bed|It is high time you went to sleep|It is time you went to sleep", "time + went"],
    ["Я лучше пройдусь, чем поеду на автобусе.", "I would rather walk than take the bus|I would rather walk than go by bus|I would rather go on foot than take the bus", "rather ... than"],
    ["Нам лучше не опаздывать.", "We had better not be late|We'd better not be late", "had better not"],
    ["Я бы предпочёл, чтобы ты не говорил маме.", "I would rather you didn't tell Mom|I would rather you didn't tell your mom|I would rather you didn't tell our mom", "rather + you + didn't"],
    ["Ты бы предпочёл чай или кофе?", "Would you rather have tea or coffee|Would you prefer tea or coffee|Would you rather drink tea or coffee", "Would you rather"],
    ["Тебе лучше взять зонт.", "You had better take an umbrella|You'd better take an umbrella|You had better take your umbrella|You'd better take your umbrella", "had better take"],
    ["Нам давно пора убрать комнату.", "It is high time we cleaned the room|It is time we cleaned the room|It is high time we cleaned our room|It is time we cleaned our room|It is high time we tidied the room|It is high time we tidied our room", "time + cleaned"],
    ["Я бы не хотел об этом говорить.", "I would rather not talk about it|I would rather not speak about it", "rather not"],
    ["Пора начинать урок.", "It is time to start the lesson|It is time to begin the lesson", "time to start"]
  ];

  /* ---------- 63. Want someone to do, make / let ---------- */
  add(63, "B2", "Want someone to do, make / let someone do", `<div class="formula">want / ask / tell / expect + кого + to + глагол</div>
<p>«Я хочу, <b>чтобы ты пришёл</b>» = <i>I want <b>you to come</b>.</i> Никакого that и никакого will.<br>
<i>My mom <b>asked me to buy</b> bread.</i> Мама попросила меня купить хлеб.<br>
<i>The teacher <b>told us not to talk</b>.</i> Учитель сказал нам не разговаривать.<br>
Так же: <b>would like</b>, <b>expect</b>, <b>advise</b>, <b>allow</b>, <b>remind</b>, <b>teach</b>.</p>
<div class="formula">make / let + кого + глагол (без to)</div>
<p><b>make</b> = заставлять: <i>My parents <b>make me do</b> my homework.</i><br>
<b>let</b> = разрешать, позволять: <i>They <b>let me stay</b> up late.</i> &nbsp; <i><b>Let me help</b> you.</i><br>
<b>help</b> можно и так и так: <i>help me (to) carry</i>.</p>
<p><b>В пассиве to возвращается:</b> <i>I <b>was made to wait</b>.</i> Меня заставили ждать. У let пассива нет: <i>I <b>was allowed to</b> go.</i></p>
<div class="err">❌ I want that you come. → ✅ I want you to come.<br>❌ She wants I help her. → ✅ She wants me to help her.<br>❌ He made me to cry. → ✅ He made me cry.<br>❌ Let me to go. → ✅ Let me go.</div>`);
  P[63] = {
    steps: [
      S("Шаг 1. «Хочу, чтобы ты ...»: want + кого + to", "По-русски «хочу, чтобы ты пришёл». По-английски «чтобы» и that не нужны: want + кого (me, you, him) + to + глагол.", [["I want you to come to my party.", "Я хочу, чтобы ты пришёл на мою вечеринку."], ["Mom wants me to clean my room.", "Мама хочет, чтобы я убрал комнату."]]),
      S("Шаг 2. Кого, а не кто: me, him, us", "После want ставим me, him, her, us, them, а не I, he, she. Частая ошибка: She wants I help her.", [["She wants me to help her.", "Она хочет, чтобы я ей помог."], ["Do you want us to wait?", "Хочешь, чтобы мы подождали?"]]),
      S("Шаг 3. Та же схема: ask, tell, expect, would like", "Попросить, велеть, ожидать от кого-то: глагол + кого + to. Отрицание: not перед to.", [["The teacher told us not to use phones.", "Учитель сказал нам не пользоваться телефонами."], ["I'd like you to meet my friend.", "Я бы хотел познакомить тебя с моим другом."], ["Nobody expected him to win.", "Никто не ожидал, что он победит."]]),
      S("Шаг 4. make = заставлять, let = разрешать (без to)", "После make и let глагол идёт сразу, без to. Это исключение, его просто запоминаем.", [["My dad makes me do my homework first.", "Папа заставляет меня сначала делать уроки."], ["My parents let me stay up late on Fridays.", "По пятницам родители разрешают мне поздно ложиться."]]),
      S("Шаг 5. Let me ...: давай я", "Let me + глагол = давай я, позволь мне. Let's = давайте (мы вместе).", [["Let me help you.", "Давай я тебе помогу."], ["Let me think.", "Дай подумать."]]),
      S("Шаг 6. Пассив: was made to, was allowed to", "В пассиве после made снова нужен to. У let пассива нет: вместо него be allowed to.", [["We were made to wait for an hour.", "Нас заставили ждать час."], ["I wasn't allowed to go out.", "Мне не разрешили выйти."]])
    ],
    tasks: [
      O("Соберите: Я хочу, чтобы ты пришёл.", ["I", "want", "you", "to come"], "I want you to come", "want + кого + to + глагол."),
      O("Соберите: Мама попросила меня купить хлеб.", ["Mom", "asked", "me", "to buy", "bread"], "Mom asked me to buy bread", "ask + кого + to + глагол."),
      O("Соберите: Родители разрешают мне поздно ложиться.", ["My parents", "let", "me", "stay up", "late"], "My parents let me stay up late", "let + кого + глагол без to."),
      Ch("She wants ___ her with math.", ["that I help", "me to help", "me help"], 1, "want + me + to help."),
      Ch("The film made me ___ .", ["cry", "to cry", "crying"], 0, "После make глагол без to."),
      Ch("The teacher told us ___ phones.", ["don't use", "not to use", "to not using"], 1, "Отрицание: not to + глагол."),
      I("Let me ___ (help) you. (вставьте одно слово)", ["help"], "После let глагол без to."),
      I("Переведите: Нас заставили ждать.", ["We were made to wait", "They made us wait"], "Пассив: were made to wait."),
      F("Исправьте: I want that you call me.", ["I want you to call me"], "Без that: want + you + to call."),
      F("Исправьте: My dad made me to clean the car.", ["My dad made me clean the car"], "После make без to.")
    ]
  };
  T[63] = [
    ["Я хочу, чтобы ты пришёл на мою вечеринку.", "I want you to come to my party", "want you to"],
    ["Мама хочет, чтобы я убрал комнату.", "Mom wants me to clean my room|Mom wants me to tidy my room|My mom wants me to clean my room|My mom wants me to tidy my room|Mom wants me to clean up my room|My mom wants me to clean up my room|My mother wants me to clean my room", "wants me to"],
    ["Учитель попросил нас не шуметь.", "The teacher asked us not to make noise|The teacher asked us to be quiet|The teacher asked us not to be noisy|The teacher asked us not to make any noise|The teacher asked us not to make a noise", "asked us not to"],
    ["Папа заставляет меня делать уроки.", "Dad makes me do my homework|My dad makes me do my homework|My father makes me do my homework", "make + без to"],
    ["Родители не разрешают мне играть допоздна.", "My parents don't let me play late|My parents don't let me play until late|My parents don't let me play late at night|My parents don't allow me to play late|My parents don't allow me to play late at night", "let me + глагол"],
    ["Давай я тебе помогу.", "Let me help you", "Let me"],
    ["Я бы хотел, чтобы ты познакомился с моим другом.", "I would like you to meet my friend", "would like you to"],
    ["Никто не ожидал, что он победит.", "Nobody expected him to win|No one expected him to win", "expected him to"],
    ["Она сказала мне закрыть дверь.", "She told me to close the door|She told me to shut the door", "told me to"],
    ["Этот фильм заставил меня плакать.", "This film made me cry|This movie made me cry|The film made me cry|The movie made me cry", "made me cry"],
    ["Нас заставили ждать час.", "We were made to wait for an hour|We were made to wait an hour|They made us wait for an hour|They made us wait an hour", "were made to"],
    ["Мне не разрешили выйти на улицу.", "I wasn't allowed to go out|I wasn't allowed to go outside|They didn't let me go out|They didn't let me go outside", "wasn't allowed to"]
  ];

  /* ---------- 64. Будущее в прошлом ---------- */
  add(64, "B2", "Будущее в прошлом: was going to, would", `<p>Когда мы рассказываем о прошлом, «будущее» тоже сдвигается назад: <b>will → would</b>, <b>am going to → was going to</b>.</p>
<table class="t"><tr><th>Тогда думали</th><th>Рассказываем сейчас</th></tr>
<tr><td><i>He <b>will</b> win.</i></td><td><i>I knew he <b>would</b> win.</i> Я знал, что он победит.</td></tr>
<tr><td><i>I <b>am going to</b> call.</i></td><td><i>I <b>was going to</b> call.</i> Я собирался позвонить.</td></tr>
<tr><td><i>It <b>will</b> rain.</i></td><td><i>They said it <b>would</b> rain.</i> Сказали, что будет дождь.</td></tr></table>
<div class="formula">was / were going to + глагол = собирался (часто «но не сделал»)</div>
<p><i>I <b>was going to</b> call you, <b>but</b> I forgot.</i> Я собирался тебе позвонить, но забыл.<br>
<b>would</b> после know, think, hope, promise, be sure, say: <i>She <b>promised</b> she <b>would</b> help.</i> &nbsp; <i>I <b>didn't think</b> it <b>would</b> be so hard.</i><br>
<b>was about to</b> = вот-вот собирался: <i>I <b>was about to</b> leave when he called.</i></p>
<div class="err">❌ I knew he will win. → ✅ I knew he would win.<br>❌ I thought it will be easy. → ✅ I thought it would be easy.<br>❌ I was going to call you, but I forget. → ✅ ... but I forgot.</div>`);
  P[64] = {
    steps: [
      S("Шаг 1. Будущее, увиденное из прошлого", "По-русски «Я знал, что он победит»: «победит» стоит в будущем, и это нормально. По-английски после глагола в прошлом (knew, said, thought) will превращается в would.", [["I knew he would win.", "Я знал, что он победит."], ["She said she would call.", "Она сказала, что позвонит."]]),
      S("Шаг 2. Особенно после think, hope, promise, be sure", "Мысли, надежды и обещания из прошлого: would + глагол. Отрицание: wouldn't.", [["I thought it would be easy.", "Я думал, что будет легко."], ["He promised he wouldn't be late.", "Он обещал, что не опоздает."], ["We were sure they would come.", "Мы были уверены, что они придут."]]),
      S("Шаг 3. was going to = собирался", "План в прошлом: was / were going to + глагол. Часто план не случился, и дальше идёт but.", [["I was going to call you, but I forgot.", "Я собирался тебе позвонить, но забыл."], ["We were going to go to the beach, but it rained.", "Мы собирались на пляж, но пошёл дождь."]]),
      S("Шаг 4. Что случилось на самом деле: Past Simple", "После but рассказываем, как вышло: forgot, rained, changed my mind. Частая ошибка: but I forget.", [["She was going to buy the dress, but she changed her mind.", "Она собиралась купить платье, но передумала."], ["I was going to study, but my friends called.", "Я собирался заниматься, но позвонили друзья."]]),
      S("Шаг 5. was about to = вот-вот, уже почти", "Действие должно было случиться прямо сейчас, но его прервали или оно только начиналось.", [["I was about to leave when he called.", "Я уже собирался уходить, когда он позвонил."], ["The film was about to start.", "Фильм вот-вот должен был начаться."]])
    ],
    tasks: [
      O("Соберите: Я знал, что он победит.", ["I", "knew", "he", "would", "win"], "I knew he would win", "После knew: would вместо will."),
      O("Соберите: Я собирался тебе позвонить, но забыл.", ["I", "was going to", "call you", "but", "I forgot"], "I was going to call you but I forgot", "План в прошлом: was going to. Что вышло: forgot."),
      O("Соберите: Она обещала, что поможет.", ["She", "promised", "she", "would", "help"], "She promised she would help", "После promised: would."),
      Ch("I thought the test ___ easy.", ["will be", "would be", "is"], 1, "После thought: would be."),
      Ch("We ___ go to the beach, but it rained.", ["are going to", "were going to", "will"], 1, "План в прошлом: were going to."),
      Ch("I was going to buy it, but I ___ my mind.", ["change", "changed", "will change"], 1, "Что случилось на самом деле: Past Simple."),
      Ch("I ___ leave when the phone rang.", ["was about to", "am about to", "would about to"], 0, "Вот-вот, но прервали: was about to."),
      I("He said he ___ call me later. (вставьте одно слово)", ["would"], "После said: would."),
      I("Переведите: Я не думал, что будет так трудно.", ["I didn't think it would be so hard", "I didn't think it would be so difficult", "I didn't think that it would be so hard", "I didn't think that it would be so difficult"], "После didn't think: would be."),
      F("Исправьте: I knew you will like it.", ["I knew you would like it", "I knew that you would like it"], "После knew: would, а не will.")
    ]
  };
  T[64] = [
    ["Я знал, что он победит.", "I knew he would win|I knew that he would win|I knew he'd win|I knew that he'd win", "knew + would"],
    ["Она сказала, что позвонит.", "She said she would call|She said that she would call|She said she'd call|She said that she'd call|She said she would phone|She said she would ring", "said + would"],
    ["Я собирался тебе позвонить, но забыл.", "I was going to call you but I forgot|I was going to phone you but I forgot|I was going to call you but forgot", "was going to"],
    ["Мы собирались на пляж, но пошёл дождь.", "We were going to go to the beach but it rained|We were going to go to the beach but it started raining|We were going to go to the beach but it started to rain|We were going to the beach but it rained|We were going to the beach but it started raining", "were going to"],
    ["Я думал, что будет легко.", "I thought it would be easy|I thought that it would be easy|I thought it'd be easy", "thought + would"],
    ["Он обещал, что не опоздает.", "He promised he wouldn't be late|He promised that he wouldn't be late|He promised he would not be late|He promised that he would not be late|He promised not to be late", "wouldn't"],
    ["Мы были уверены, что они придут.", "We were sure they would come|We were sure that they would come|We were sure they'd come|We were sure that they'd come", "sure + would"],
    ["Она собиралась купить платье, но передумала.", "She was going to buy the dress but she changed her mind|She was going to buy the dress but changed her mind|She was going to buy a dress but she changed her mind|She was going to buy a dress but changed her mind", "changed her mind"],
    ["Я уже собирался уходить, когда он позвонил.", "I was about to leave when he called|I was going to leave when he called|I was about to go when he called|I was about to leave when he phoned", "was about to"],
    ["Я не думал, что ты придёшь.", "I didn't think you would come|I didn't think that you would come|I didn't think you'd come|I didn't think that you'd come", "didn't think + would"],
    ["Синоптики сказали, что будет дождь.", "The forecast said it would rain|The weather forecast said it would rain|The forecasters said it would rain|Forecasters said it would rain|They said it would rain|The weathermen said it would rain", "said + would rain"],
    ["Ты собирался мне что-то сказать?", "Were you going to tell me something|Were you going to say something to me|Were you going to tell me anything", "Were you going to"]
  ];

  /* ---------- 65. So и such ---------- */
  add(65, "B2", "So и such: усиление", `<table class="t"><tr><th>Слово</th><th>После него</th><th>Пример</th></tr>
<tr><td><b>so</b></td><td>прилагательное / наречие</td><td><i>It's <b>so cold</b>. He runs <b>so fast</b>.</i></td></tr>
<tr><td><b>such a / an</b></td><td>(прил.) + сущ. в ед. ч.</td><td><i>It's <b>such a nice day</b>.</i></td></tr>
<tr><td><b>such</b></td><td>(прил.) + мн. ч. / неисчисл.</td><td><i><b>such nice people</b>, <b>such bad weather</b></i></td></tr>
<tr><td><b>so much / so many</b></td><td>сущ.</td><td><i><b>so much</b> homework, <b>so many</b> people</i></td></tr></table>
<div class="formula">so + прил. + that ... = such (a) + прил. + сущ. + that ...</div>
<p><i>The film was <b>so</b> boring <b>that</b> I fell asleep.</i> = <i>It was <b>such a</b> boring film <b>that</b> I fell asleep.</i><br>
That можно опустить: <i>I was so tired I went to bed at 9.</i></p>
<p><b>Другие усилители:</b> <b>really</b> (очень, правда: <i>really good</i>), <b>quite</b> (довольно: <i>quite good</i>, <i>quite a good film</i>), <b>rather</b> (довольно, часто о неприятном: <i>rather cold</i>), <b>too</b> (слишком, мешает: <i>too cold to swim</i>).</p>
<div class="err">❌ It was so nice day. → ✅ It was such a nice day.<br>❌ She is such kind. → ✅ She is so kind.<br>❌ such a bad weather → ✅ such bad weather (weather неисчисляемое)<br>❌ so much people → ✅ so many people</div>`);
  P[65] = {
    steps: [
      S("Шаг 1. So + прилагательное", "«Так», «такой» перед прилагательным без существительного: so. Это сильнее, чем very, и звучит эмоционально.", [["It's so cold today!", "Сегодня так холодно!"], ["You speak so fast.", "Ты говоришь так быстро."]]),
      S("Шаг 2. Such + (прилагательное) + существительное", "Если дальше есть существительное, нужен such. Перед одним предметом не забудьте a / an: such a nice day. По-русски «такой» одно слово, поэтому русские часто говорят so nice day, а так нельзя.", [["It's such a nice day!", "Такой хороший день!"], ["He is such an interesting person.", "Он такой интересный человек."]]),
      S("Шаг 3. Без a: множественное и неисчисляемое", "С множественным числом и неисчисляемыми (weather, advice, news, music) артикля a нет.", [["They are such nice people.", "Они такие милые люди."], ["We had such bad weather.", "У нас была такая плохая погода."]]),
      S("Шаг 4. So much, so many: так много", "So much + неисчисляемое (time, homework, money). So many + исчисляемое во множественном (people, friends, questions).", [["I have so much homework.", "У меня так много домашки."], ["There were so many people!", "Там было так много людей!"]]),
      S("Шаг 5. «Так ..., что ...»: so ... that, such ... that", "Показываем результат: так скучно, что я уснул. That после so / such в разговоре можно опустить.", [["The film was so boring that I fell asleep.", "Фильм был такой скучный, что я уснул."], ["It was such a good book that I read it in one day.", "Книга была такая хорошая, что я прочитал её за день."]]),
      S("Шаг 6. really, quite, rather", "Really = очень, правда (ставим как very). Quite = довольно; с существительным порядок quite a: quite a good film. Rather = довольно, чаще о неприятном: rather cold.", [["The test was quite easy.", "Тест был довольно лёгким."], ["It's quite a long way.", "Это довольно далеко."], ["It's rather cold in here.", "Тут довольно холодно."]])
    ],
    tasks: [
      O("Соберите: Сегодня такой хороший день!", ["It is", "such", "a nice", "day", "today"], "It is such a nice day today", "Есть существительное day: such a + прил. + сущ."),
      O("Соберите: У меня так много домашки.", ["I", "have", "so much", "homework"], "I have so much homework", "Homework неисчисляемое: so much."),
      O("Соберите: Фильм был такой скучный, что я уснул.", ["The film", "was", "so boring", "that", "I fell asleep"], "The film was so boring that I fell asleep", "Прилагательное без существительного: so ... that."),
      Ch("She is ___ kind.", ["such", "so", "such a"], 1, "Только прилагательное: so."),
      Ch("It was ___ interesting book.", ["so", "such an", "such"], 1, "Прил. + сущ. в ед. ч., interesting на гласную: such an."),
      Ch("We had ___ bad weather on holiday.", ["such", "such a", "so"], 0, "Weather неисчисляемое: such без a."),
      Ch("There were ___ people at the concert!", ["so much", "so many", "such"], 1, "People исчисляемые: so many."),
      I("They are ___ nice people. (вставьте одно слово)", ["such"], "Множественное число: such без a."),
      I("Переведите: Ты говоришь так быстро!", ["You speak so fast", "You talk so fast", "You speak so quickly", "You talk so quickly", "You are speaking so fast", "You are talking so fast"], "Наречие fast: so fast."),
      F("Исправьте: It was so nice day.", ["It was such a nice day"], "Есть существительное: such a nice day.")
    ]
  };
  T[65] = [
    ["Сегодня так холодно!", "It is so cold today|Today it is so cold", "so + cold"],
    ["Такой хороший день!", "It is such a nice day|Such a nice day|It is such a good day|Such a good day|What a nice day|It is such a beautiful day|Such a beautiful day|It is such a lovely day|Such a lovely day", "such a + nice day"],
    ["Он такой интересный человек.", "He is such an interesting person|He is such an interesting man", "such an"],
    ["У меня так много домашки.", "I have so much homework|I have got so much homework|I've got so much homework", "so much"],
    ["Там было так много людей!", "There were so many people|There were so many people there", "so many"],
    ["Они такие милые люди.", "They are such nice people|They are such kind people|They are such lovely people|They are such sweet people", "such + people"],
    ["У нас была такая плохая погода.", "We had such bad weather|We had such terrible weather|We had such awful weather|The weather was so bad", "such без a"],
    ["Фильм был такой скучный, что я уснул.", "The film was so boring that I fell asleep|The film was so boring I fell asleep|The movie was so boring that I fell asleep|The movie was so boring I fell asleep|It was such a boring film that I fell asleep|It was such a boring film I fell asleep|It was such a boring movie that I fell asleep|It was such a boring movie I fell asleep", "so ... that"],
    ["Книга была такой интересной, что я прочитал её за день.", "The book was so interesting that I read it in one day|The book was so interesting that I read it in a day|The book was so interesting I read it in one day|The book was so interesting I read it in a day|It was such an interesting book that I read it in one day|It was such an interesting book that I read it in a day|It was such an interesting book I read it in one day|It was such an interesting book I read it in a day", "so interesting that"],
    ["Я так устал, что сразу лёг спать.", "I was so tired that I went to bed at once|I was so tired I went to bed at once|I was so tired that I went to bed right away|I was so tired I went to bed right away|I was so tired that I went straight to bed|I was so tired I went straight to bed|I was so tired that I went to bed immediately|I was so tired I went to bed immediately", "so tired that"],
    ["Тест был довольно лёгким.", "The test was quite easy|The test was rather easy|The test was pretty easy|The test was fairly easy", "quite easy"],
    ["Это был довольно длинный фильм.", "It was quite a long film|It was quite a long movie|It was a rather long film|It was a rather long movie|It was rather a long film|It was a fairly long film|It was a fairly long movie|It was a pretty long film|It was a pretty long movie", "quite a long film"]
  ];
})();
