/* Пошаговые объяснения и практика: уроки 19-27 */
(function () {
  const P = (window.GRAMMAR_PLUS = window.GRAMMAR_PLUS || {});
  const S = (h, t, ex) => ({ h, t, ex: ex || [] });
  const O = (q, words, a, why) => ({ k: "order", q, words, a, why });
  const Ch = (q, o, a, why) => ({ k: "choice", q, o, a, why });
  const I = (q, a, why) => ({ k: "input", q, a, why });
  const F = (q, a, why) => ({ k: "fix", q, a, why });

  P[19] = {
    steps: [
      S("Шаг 1. Формула: am / is / are + going to + глагол", "Going to = «собираюсь», план уже есть. Нужны все три кусочка: am / is / are, потом going to, потом глагол. Русские часто теряют am: «I going to» так нельзя.", [["I'm going to study economics.", "Я собираюсь изучать экономику."], ["She is going to buy a new phone.", "Она собирается купить новый телефон."]]),
      S("Шаг 2. После going to глагол в простой форме", "Глагол после going to без -ing, без -s и без to (to уже есть в going to).", [["We're going to watch a film tonight.", "Сегодня вечером мы будем смотреть фильм."], ["He's going to visit his grandma.", "Он собирается навестить бабушку."]]),
      S("Шаг 3. Отрицание: not после am / is / are", "Как в Present Continuous: I'm not, he isn't, they aren't + going to.", [["I'm not going to tell him.", "Я не собираюсь ему говорить."], ["They aren't going to come.", "Они не собираются приходить."]]),
      S("Шаг 4. Вопрос: am / is / are вперёд", "Ставим am / is / are перед «кто». Вопросительное слово (what, when, where) ещё раньше.", [["Are you going to call her?", "Ты собираешься ей позвонить?"], ["What are you going to do this weekend?", "Что ты собираешься делать в выходные?"]]),
      S("Шаг 5. Видно по признакам: сейчас случится", "Если мы видим, что сейчас будет (тучи, человек падает), тоже говорим going to.", [["Look at the clouds! It's going to rain.", "Посмотри на тучи! Будет дождь."], ["Be careful! You're going to fall.", "Осторожно! Ты сейчас упадёшь."]]),
      S("Шаг 6. going to или will?", "Решил заранее, есть план: going to. Решил прямо сейчас, в момент разговора: will. «Думаю, будет» тоже обычно will.", [["The phone is ringing. - I'll answer it.", "Телефон звонит. - Я отвечу."], ["I'm going to visit my grandma on Sunday.", "В воскресенье я поеду к бабушке (уже решил)."], ["I think he will win.", "Думаю, он победит."]])
    ],
    tasks: [
      O("Соберите: Я собираюсь изучать экономику.", ["I'm", "going to", "study", "economics"], "I'm going to study economics", "I'm + going to + глагол."),
      O("Соберите: Что ты собираешься делать завтра?", ["What", "are", "you", "going to", "do", "tomorrow"], "What are you going to do tomorrow", "What + are + you + going to + глагол."),
      O("Соберите: Она не собирается продавать свою машину.", ["She", "isn't", "going to", "sell", "her car"], "She isn't going to sell her car", "Отрицание: isn't + going to."),
      Ch("Look at the sky! It ___ rain.", ["will", "is going to", "going to"], 1, "Видим тучи, это признак: is going to."),
      Ch("I ___ visit my grandma on Sunday. (план уже есть)", ["am going to", "going to", "am going"], 0, "План: am going to + глагол. Без am нельзя."),
      Ch("The phone is ringing. - I ___ answer it.", ["am going to", "'ll", "going to"], 1, "Решил прямо сейчас: will (I'll)."),
      Ch("We are going to ___ a cake.", ["making", "make", "makes"], 1, "После going to простая форма: make."),
      I("They ___ play tennis. (собираются)", ["are going to", "'re going to"], "They: are going to."),
      I("Переведите: Я не собираюсь ему звонить.", ["I'm not going to call him", "I am not going to call him"], "I'm not + going to + call."),
      F("Исправьте: I going to study.", ["I'm going to study", "I am going to study"], "Не хватает am.")
    ]
  };

  P[20] = {
    steps: [
      S("Шаг 1. Формула: have / has + 3-я форма глагола", "I, you, we, they: have. He, she, it: has. 3-я форма: у правильных глаголов + ed (worked), у неправильных берём третью колонку таблицы (seen, done, been).", [["I have finished.", "Я закончил."], ["She has done her homework.", "Она сделала домашнее задание."]]),
      S("Шаг 2. Когда: важен результат сейчас", "По-русски мы говорим «потерял» в прошедшем, но англичане смотрят на результат: ключей нет сейчас. Если же сказано, когда именно (yesterday, last week), нужен Past Simple.", [["I have lost my keys.", "Я потерял ключи (и сейчас их нет)."], ["He has broken his phone.", "Он разбил телефон (телефон сломан)."]]),
      S("Шаг 3. Отрицание и вопрос", "Отрицание: haven't / hasn't + 3-я форма. Вопрос: Have / Has ставим вперёд.", [["I haven't seen this film.", "Я не видел этот фильм."], ["Has she called you?", "Она тебе звонила?"]]),
      S("Шаг 4. Опыт в жизни: ever, never, been to", "Ever = когда-нибудь (в вопросе), never = никогда (уже с отрицанием, второе not не нужно). Been to = бывал где-то.", [["Have you ever seen snow?", "Ты когда-нибудь видел снег?"], ["I have never been to London.", "Я никогда не был в Лондоне."], ["She has been to the USA twice.", "Она была в США два раза."]]),
      S("Шаг 5. already, just, yet", "Already (уже) и just (только что) ставим между have и глаголом. Yet ставим в конец: в вопросе это «уже?», в отрицании «ещё не».", [["I've just eaten.", "Я только что поел."], ["Have you finished yet?", "Ты уже закончил?"], ["I haven't finished yet.", "Я ещё не закончил."]]),
      S("Шаг 6. for и since: «и до сих пор»", "По-русски «я живу здесь 5 лет» в настоящем времени, а по-английски нужен Present Perfect. For + срок (5 years), since + начало (2020, Monday).", [["I have lived here for 5 years.", "Я живу здесь 5 лет."], ["We have known each other since 2020.", "Мы знаем друг друга с 2020 года."]])
    ],
    tasks: [
      O("Соберите: Я никогда не видел снег.", ["I", "have", "never", "seen", "snow"], "I have never seen snow", "have + never + 3-я форма."),
      O("Соберите: Ты уже сделал домашнее задание?", ["Have", "you", "done", "your homework", "yet"], "Have you done your homework yet", "В вопросе «уже» = yet в конце."),
      O("Соберите: Она только что ушла.", ["She", "has", "just", "left"], "She has just left", "just между has и глаголом."),
      Ch("She ___ to London twice.", ["has been", "have been", "was been"], 0, "She: has. Бывала: been to."),
      Ch("I ___ him yesterday.", ["have seen", "saw", "have saw"], 1, "Есть yesterday: Past Simple."),
      Ch("We have lived here ___ 2020.", ["for", "since", "from"], 1, "С какого момента: since."),
      Ch("Have you finished ___ ?", ["already", "yet", "just"], 1, "В вопросе в конце: yet."),
      I("He ___ his keys. (lose, и сейчас их нет)", ["has lost", "'s lost"], "He: has + lost."),
      I("Переведите: Ты когда-нибудь был в Лондоне?", ["Have you ever been to London"], "Have you ever been to ...?"),
      F("Исправьте: I live here for 5 years.", ["I have lived here for 5 years", "I've lived here for 5 years", "I have been living here for 5 years"], "До сих пор + for: Present Perfect.")
    ]
  };

  P[21] = {
    steps: [
      S("Шаг 1. Формула: was / were + глагол-ing", "Это прошлое для процесса: «делал, был занят этим». I, he, she, it: was. You, we, they: were. Нужны обе части: и was / were, и -ing.", [["I was reading.", "Я читал."], ["They were playing football.", "Они играли в футбол."]]),
      S("Шаг 2. Процесс в точный момент прошлого", "Подсказки: at 8 pm yesterday, at that moment, this time last year. Действие шло в этот момент, не важно, когда началось и кончилось.", [["At 8 pm yesterday I was watching TV.", "Вчера в 8 вечера я смотрел телевизор."], ["This time last year we were living in Moscow.", "В это время год назад мы жили в Москве."]]),
      S("Шаг 3. Отрицание и вопрос", "Отрицание: wasn't / weren't + -ing. Вопрос: Was / Were ставим вперёд.", [["I wasn't sleeping.", "Я не спал."], ["What were you doing at 6?", "Что ты делал в 6?"]]),
      S("Шаг 4. Длинное действие прервали коротким", "Длинное (процесс) ставим в Past Continuous, короткое (случилось раз) в Past Simple. После when обычно короткое действие.", [["I was sleeping when the phone rang.", "Я спал, когда зазвонил телефон."], ["When I came home, my sister was cooking.", "Когда я пришёл домой, сестра готовила."]]),
      S("Шаг 5. Два процесса одновременно: while", "While = пока, в то время как. Если оба действия шли параллельно, оба в Past Continuous.", [["While I was cooking, she was reading.", "Пока я готовил, она читала."], ["I was doing my homework while my brother was playing games.", "Я делал уроки, пока брат играл в игры."]]),
      S("Шаг 6. Частые ошибки", "Без -ing нельзя: не «I was watch». Глаголы know, like, want, need с -ing почти не бывают. Короткое событие не ставим в Continuous: не «when the phone was ringing».", [["I wanted to sleep.", "Я хотел спать. (не was wanting)"], ["When the phone rang, I was sleeping.", "Когда зазвонил телефон, я спал."]])
    ],
    tasks: [
      O("Соберите: Я шёл домой, когда начался дождь.", ["I", "was walking", "home", "when", "it", "started", "to rain"], "I was walking home when it started to rain", "Длинное: was walking, короткое: started."),
      O("Соберите: Пока я готовил, она читала.", ["While", "I", "was cooking", "she", "was reading"], "While I was cooking she was reading", "Два процесса: оба was + -ing."),
      O("Соберите: Мы не спали в полночь.", ["We", "weren't", "sleeping", "at midnight"], "We weren't sleeping at midnight", "We: weren't + -ing."),
      Ch("At 9 pm yesterday I ___ TV.", ["watched", "was watching", "were watching"], 1, "Процесс в момент: I was watching."),
      Ch("They ___ football when it started to rain.", ["was playing", "were playing", "played"], 1, "They: were + playing."),
      Ch("I was sleeping when the phone ___ .", ["rang", "was ringing", "rings"], 0, "Короткое событие: Past Simple (rang)."),
      I("She ___ dinner at 7 pm. (cook, процесс)", ["was cooking"], "She: was + cooking."),
      I("Переведите: Что ты делал вчера в 6 вечера?", ["What were you doing at 6 pm yesterday", "What were you doing yesterday at 6 pm", "What were you doing at 6 yesterday", "What were you doing yesterday at 6", "What were you doing at 6 yesterday evening", "What were you doing yesterday at 6 in the evening", "What were you doing at 6 in the evening yesterday"], "What + were + you + doing?"),
      F("Исправьте: I was watch TV.", ["I was watching TV"], "Нужно -ing: watching."),
      F("Исправьте: When the phone was ringing, I slept.", ["When the phone rang I was sleeping", "When the phone rang, I was sleeping", "I was sleeping when the phone rang"], "Короткое: rang. Длинное: was sleeping.")
    ]
  };

  P[22] = {
    steps: [
      S("Шаг 1. Короткие слова: + er и than", "Чтобы сказать «выше, дешевле», к короткому слову добавляем -er. «Чем» = than. Частая ошибка: then (это «потом»).", [["My brother is taller than me.", "Мой брат выше меня."], ["This bag is cheaper than that one.", "Эта сумка дешевле той."]]),
      S("Шаг 2. Самый: the + est", "«Самый» у коротких слов: the + слово + est. The нужен всегда.", [["He is the tallest in the class.", "Он самый высокий в классе."], ["This is the cheapest phone.", "Это самый дешёвый телефон."]]),
      S("Шаг 3. Как писать: big, nice, happy", "Одна гласная + одна согласная на конце: согласную удваиваем (big → bigger). Слово на -e: только -r (nice → nicer). На -y: y меняем на i (happy → happier, easy → the easiest).", [["English is easier than Chinese.", "Английский легче китайского."], ["Today is the hottest day of the year.", "Сегодня самый жаркий день в году."]]),
      S("Шаг 4. Длинные слова: more и the most", "У длинных слов (expensive, interesting, beautiful) -er не добавляем, а ставим more (более) или the most (самый). Нельзя сразу и more, и -er.", [["This phone is more expensive.", "Этот телефон дороже."], ["It's the most interesting book.", "Это самая интересная книга."]]),
      S("Шаг 5. Исключения: учим наизусть", "good → better → the best, bad → worse → the worst, far → further → the furthest, many / much → more → the most, little → less → the least.", [["My English is better now.", "Мой английский теперь лучше."], ["This is the worst film.", "Это худший фильм."]]),
      S("Шаг 6. Такой же, как: as ... as", "as + слово + as = такой же, как. not as ... as = не такой, как. Слово стоит в обычной форме, без -er.", [["She is as tall as me.", "Она такая же высокая, как я."], ["Tea is not as expensive as coffee.", "Чай не такой дорогой, как кофе."]])
    ],
    tasks: [
      O("Соберите: Москва больше, чем Казань.", ["Moscow", "is", "bigger", "than", "Kazan"], "Moscow is bigger than Kazan", "big → bigger + than."),
      O("Соберите: Она такая же высокая, как я.", ["She", "is", "as tall", "as", "me"], "She is as tall as me", "as + tall + as."),
      O("Соберите: Это самая интересная книга.", ["This", "is", "the most", "interesting", "book"], "This is the most interesting book", "Длинное слово: the most."),
      Ch("My brother is ___ than me.", ["older", "more old", "oldest"], 0, "Короткое слово: old → older."),
      Ch("This is ___ film of the year.", ["the better", "the best", "the most good"], 1, "good → the best."),
      Ch("He is taller ___ me.", ["then", "than", "as"], 1, "«Чем» = than."),
      Ch("This phone is ___ in the shop.", ["the most expensive", "the expensivest", "more expensive"], 0, "Длинное слово + самый: the most."),
      I("English is ___ than Chinese. (easy)", ["easier"], "easy → easier (y → i)."),
      I("Today is ___ day of the year. (hot, самый)", ["the hottest"], "hot → the hottest (удваиваем t)."),
      F("Исправьте: This book is more better.", ["This book is better"], "better уже значит «лучше», more не нужно.")
    ]
  };

  P[23] = {
    steps: [
      S("Шаг 1. После модальных: глагол без to и без -s", "Must, should, may, might, can одинаковые для всех: без -s у he / she. И глагол после них без to.", [["She must go.", "Она должна идти."], ["He should study more.", "Ему стоит больше заниматься."]]),
      S("Шаг 2. must и mustn't", "Must = должен (я сам так считаю, или это правило). Mustn't = нельзя, запрещено.", [["I must study more.", "Я должен больше заниматься."], ["You must wear a seat belt.", "Нужно пристёгиваться."], ["You mustn't smoke here.", "Здесь нельзя курить."]]),
      S("Шаг 3. have to = приходится", "Have to: так сложились обстоятельства (школа, работа, расписание). Здесь to нужен! He / she: has to. Прошлое: had to.", [["I have to get up at 6.", "Мне приходится вставать в 6."], ["She has to work on Saturdays.", "Ей приходится работать по субботам."], ["Do you have to wear a uniform?", "Тебе нужно носить форму?"]]),
      S("Шаг 4. don't have to = не обязательно", "Главная ловушка: mustn't (нельзя) и don't have to (можно не делать) совсем разные.", [["You don't have to come.", "Можешь не приходить."], ["You mustn't be late.", "Опаздывать нельзя."]]),
      S("Шаг 5. should = стоит, советую", "Should для совета: «тебе стоит, лучше бы». Shouldn't = не стоит.", [["You should see a doctor.", "Тебе стоит сходить к врачу."], ["You shouldn't eat so much sugar.", "Тебе не стоит есть так много сахара."]]),
      S("Шаг 6. may и might: возможно, можно", "May / might = может быть, возможно (might чуть менее уверенно). May I ...? = можно мне ...? (вежливо).", [["It might rain.", "Может пойти дождь."], ["I may be late.", "Я, возможно, опоздаю."], ["May I come in?", "Можно войти?"]])
    ],
    tasks: [
      O("Соберите: Мне приходится вставать в 6.", ["I", "have to", "get up", "at 6"], "I have to get up at 6", "Приходится: have to + глагол."),
      O("Соберите: Можно мне войти?", ["May", "I", "come", "in"], "May I come in", "Вежливая просьба: May I ...?"),
      O("Соберите: Я, может быть, опоздаю.", ["I", "might", "be", "late"], "I might be late", "Возможно: might + глагол."),
      Ch("You ___ see a doctor. (совет)", ["should", "must to", "have"], 0, "Совет: should."),
      Ch("You ___ use phones in the exam. (нельзя)", ["don't have to", "mustn't", "shouldn't to"], 1, "Нельзя: mustn't."),
      Ch("Tomorrow is Sunday. You ___ get up early. (не обязательно)", ["mustn't", "don't have to", "must"], 1, "Не обязательно: don't have to."),
      Ch("She ___ work on Saturdays. (приходится)", ["have to", "has to", "must to"], 1, "She: has to."),
      I("It ___ snow tomorrow. (возможно)", ["might", "may"], "Возможно: might или may."),
      I("Переведите: Тебе стоит больше спать.", ["You should sleep more", "You should get more sleep"], "Совет: should."),
      F("Исправьте: You must to go.", ["You must go"], "После must без to.")
    ]
  };

  P[24] = {
    steps: [
      S("Шаг 1. Время = когда + какое", "Когда: настоящее, прошлое или будущее. Какое: Simple (факт, обычно), Continuous (процесс), Perfect (результат к моменту), Perfect Continuous (процесс, который длится до момента). Получается 12 времён, но строятся они по одной логике.", [["I work.", "Я работаю (обычно)."], ["I am working.", "Я работаю (сейчас)."], ["I have worked.", "Я поработал (есть результат)."]]),
      S("Шаг 2. Simple и Continuous вы уже знаете", "Simple: факт или обычное действие. Continuous: be + -ing, процесс в какой-то момент. В прошлом и будущем всё так же.", [["I went to school yesterday.", "Вчера я ходил в школу."], ["At 8 I was having breakfast.", "В 8 я завтракал."], ["I will call you tomorrow.", "Я позвоню тебе завтра."]]),
      S("Шаг 3. Present Perfect Continuous: делаю уже ... и всё ещё", "Have / has been + -ing. По-русски тут настоящее время («учусь уже 3 часа»), поэтому русские часто ошибаются и пишут «I am studying for 3 hours».", [["I've been studying for 3 hours.", "Я занимаюсь уже 3 часа."], ["She has been waiting since 5.", "Она ждёт с пяти часов."]]),
      S("Шаг 4. Past Perfect: одно прошлое раньше другого", "Had + 3-я форма. Показывает, что одно действие в прошлом случилось ещё раньше другого.", [["When I arrived, the film had already started.", "Когда я пришёл, фильм уже начался."], ["She had left before I called.", "Она ушла до того, как я позвонил."]]),
      S("Шаг 5. Future Continuous: буду в процессе", "Will be + -ing. В какой-то момент будущего я буду занят этим делом.", [["At 10 tomorrow I'll be flying to Paris.", "Завтра в 10 я буду лететь в Париж."], ["This time tomorrow I'll be lying on the beach.", "Завтра в это время я буду лежать на пляже."]]),
      S("Шаг 6. Future Perfect: к моменту уже сделаю", "Will have + 3-я форма. Подсказка: by = к (by June, by 2028).", [["By 2028 I will have finished school.", "К 2028 году я закончу школу."], ["By June I will have learned 1000 words.", "К июню я выучу 1000 слов."]])
    ],
    tasks: [
      O("Соберите: Когда я пришёл, фильм уже начался.", ["When", "I", "arrived", "the film", "had", "already", "started"], "When I arrived the film had already started", "Раньше другого прошлого: had + 3-я форма."),
      O("Соберите: Завтра в 10 я буду лететь в Париж.", ["At 10", "tomorrow", "I", "will be", "flying", "to Paris"], "At 10 tomorrow I will be flying to Paris", "Процесс в будущем: will be + -ing."),
      O("Соберите: Я занимаюсь уже три часа.", ["I", "have been", "studying", "for", "three hours"], "I have been studying for three hours", "Длится до сих пор: have been + -ing."),
      Ch("When we arrived, the train ___ .", ["has already left", "had already left", "already leaves"], 1, "Ушёл раньше, чем мы пришли: had left."),
      Ch("I ___ for you for an hour! (и всё ещё жду)", ["am waiting", "have been waiting", "was waiting"], 1, "Процесс до сих пор: have been waiting."),
      Ch("This time tomorrow I ___ on the beach.", ["will lie", "will be lying", "am lying"], 1, "Процесс в будущем: will be lying."),
      Ch("Look! The baby ___ .", ["sleeps", "is sleeping", "has slept"], 1, "Прямо сейчас: Present Continuous."),
      I("By June I ___ 1000 words. (learn, к моменту)", ["will have learned", "will have learnt", "'ll have learned", "'ll have learnt"], "К моменту: will have + 3-я форма."),
      I("She ___ English for 3 years. (study, и всё ещё учит)", ["has been studying", "'s been studying", "has studied"], "Длится до сих пор: has been studying."),
      F("Исправьте: I am waiting for you for an hour.", ["I have been waiting for you for an hour", "I've been waiting for you for an hour"], "С for an hour: have been + -ing.")
    ]
  };

  P[25] = {
    steps: [
      S("Шаг 1. Есть «когда»: Past Simple", "Если сказано, когда именно (yesterday, last week, two days ago, in 2020), берём Past Simple. С такими словами Present Perfect нельзя.", [["I lost my keys yesterday.", "Я потерял ключи вчера."], ["I visited Paris in 2019.", "Я был в Париже в 2019 году."]]),
      S("Шаг 2. «Когда» неважно, важен результат: Present Perfect", "Если важно, что сейчас (ключей нет, нога сломана), а время не названо, берём have / has + 3-я форма.", [["I have lost my keys.", "Я потерял ключи (их сейчас нет)."], ["She has broken her leg.", "Она сломала ногу."]]),
      S("Шаг 3. Опыт: Present Perfect, подробности: Past Simple", "Сначала говорим об опыте вообще (Present Perfect). Как только рассказываем, когда и как это было, переходим на Past Simple.", [["I have been to Paris. I went there in 2019.", "Я был в Париже. Я ездил туда в 2019 году."], ["Have you ever eaten sushi? - Yes, I ate it last month.", "Ты когда-нибудь ел суши? - Да, ел в прошлом месяце."]]),
      S("Шаг 4. Период ещё идёт или закончился?", "Если период ещё идёт (today, this week, since, for и до сих пор), берём Present Perfect. Если всё закончилось, Past Simple.", [["She has lived in London since 2019.", "Она живёт в Лондоне с 2019 года (и сейчас)."], ["She lived in London for two years.", "Она жила в Лондоне два года (теперь не живёт)."]]),
      S("Шаг 5. Вопрос с When: всегда Past Simple", "When спрашивает о точном времени, а с точным временем Present Perfect не дружит. Так же с What time.", [["When did you arrive?", "Когда ты приехал? (не When have you arrived)"], ["What time did you get up?", "Во сколько ты встал?"]])
    ],
    tasks: [
      O("Соберите: Ты когда-нибудь ел суши?", ["Have", "you", "ever", "eaten", "sushi"], "Have you ever eaten sushi", "Опыт: Have you ever + 3-я форма."),
      O("Соберите: Я потерял ключи вчера.", ["I", "lost", "my keys", "yesterday"], "I lost my keys yesterday", "Есть yesterday: Past Simple."),
      O("Соберите: Когда ты приехал?", ["When", "did", "you", "arrive"], "When did you arrive", "When: Past Simple."),
      Ch("I ___ this film last week.", ["have seen", "saw", "have saw"], 1, "Last week: Past Simple."),
      Ch("___ you ever been to London?", ["Did", "Have", "Were"], 1, "Опыт с ever: Have you ever been."),
      Ch("She ___ in London since 2019. (и сейчас живёт)", ["lived", "has lived", "lives"], 1, "since и до сих пор: has lived."),
      I("I ___ snow. (never / see)", ["have never seen", "'ve never seen"], "Опыт: have never seen."),
      I("We ___ to the sea two years ago. (go)", ["went"], "Ago: Past Simple, go → went."),
      F("Исправьте: I have seen him yesterday.", ["I saw him yesterday"], "Есть yesterday: Past Simple."),
      F("Исправьте: When have you come home?", ["When did you come home", "When did you get home"], "Вопрос с When: Past Simple.")
    ]
  };

  P[26] = {
    steps: [
      S("Шаг 1. used to + глагол = раньше делал, а теперь нет", "По-русски говорим «раньше» + прошедшее время. По-английски: used to + обычный глагол. Форма одна для всех.", [["I used to play computer games every day.", "Раньше я каждый день играл в компьютерные игры."], ["She used to live in a village.", "Раньше она жила в деревне."]]),
      S("Шаг 2. Состояния тоже: have, be, like", "Used to подходит и для того, что было раньше, но изменилось: волосы, привычки, места.", [["I used to have long hair.", "Раньше у меня были длинные волосы."], ["There used to be a shop here.", "Раньше здесь был магазин."]]),
      S("Шаг 3. Отрицание: didn't use to", "Пишем use без d, потому что прошлое уже показано в didn't (как didn't go, а не didn't went).", [["I didn't use to like vegetables.", "Раньше я не любил овощи."], ["He didn't use to wear glasses.", "Раньше он не носил очки."]]),
      S("Шаг 4. Вопрос: Did + кто + use to", "Здесь тоже use без d, потому что есть did.", [["Did you use to live here?", "Ты раньше жил здесь?"], ["What did you use to do after school?", "Что ты раньше делал после школы?"]]),
      S("Шаг 5. would: повторялось в прошлом (в рассказах)", "Would тоже значит «бывало, обычно делали», но только для действий. Для состояний (have, be, like) would нельзя: только used to.", [["Every summer we would go to the sea.", "Каждое лето мы ездили на море."], ["My grandpa would tell us stories.", "Дедушка часто рассказывал нам истории."]]),
      S("Шаг 6. Не путайте с be used to и с настоящим", "Be used to + -ing = привык (I'm used to ...). А про настоящее used to не говорят: «обычно» сейчас = usually + Present Simple.", [["I'm used to getting up early.", "Я привык рано вставать."], ["I usually walk to school.", "Я обычно хожу в школу пешком. (не I use to walk)"]])
    ],
    tasks: [
      O("Соберите: Раньше я не любил овощи.", ["I", "didn't", "use to", "like", "vegetables"], "I didn't use to like vegetables", "После didn't: use to без d."),
      O("Соберите: Раньше здесь был магазин.", ["There", "used to", "be", "a shop", "here"], "There used to be a shop here", "Раньше было: there used to be."),
      O("Соберите: Каждое лето мы ездили к бабушке.", ["Every summer", "we", "would", "visit", "our grandma"], "Every summer we would visit our grandma", "Повторялось в прошлом: would + глагол."),
      Ch("I ___ live in a village. Now I live in Moscow.", ["use to", "used to", "was used to"], 1, "Раньше, а теперь нет: used to."),
      Ch("She ___ like coffee, but now she loves it.", ["didn't used to", "didn't use to", "not used to"], 1, "После didn't: use без d."),
      Ch("___ you use to play football?", ["Did", "Were", "Do"], 0, "Вопрос о прошлом: Did."),
      Ch("When I was a child, I ___ long hair.", ["would have", "used to have", "use to have"], 1, "Состояние: только used to."),
      I("My dad ___ smoke, but he stopped. (раньше)", ["used to"], "Раньше, а теперь нет: used to."),
      I("Переведите: Раньше я каждый день играл в компьютерные игры.", ["I used to play computer games every day", "Every day I used to play computer games", "I used to play video games every day"], "used to + play."),
      F("Исправьте: I use to play tennis when I was young.", ["I used to play tennis when I was young", "When I was young I used to play tennis", "When I was young, I used to play tennis"], "О прошлом: used to (с d).")
    ]
  };

  P[27] = {
    steps: [
      S("Шаг 1. Тип 0: так бывает всегда", "Факты и законы природы. В обеих частях Present Simple.", [["If you heat ice, it melts.", "Если нагреть лёд, он тает."], ["If I drink coffee at night, I can't sleep.", "Если я пью кофе на ночь, я не могу уснуть."]]),
      S("Шаг 2. Тип 1: реально в будущем", "If + Present, will + глагол. Главная ловушка: по-русски «если пойдёт», а по-английски после if will не ставим.", [["If it rains, I will stay home.", "Если пойдёт дождь, я останусь дома."], ["If you study, you will pass.", "Если будешь заниматься, сдашь."]]),
      S("Шаг 3. Тип 2: нереально сейчас («бы»)", "If + прошедшее время, would + глагол. Форма прошедшая, но говорим о сейчас: «если бы у меня были деньги (а их нет)».", [["If I had money, I would buy a car.", "Если бы у меня были деньги, я бы купил машину."], ["If I lived by the sea, I would swim every day.", "Если бы я жил у моря, я бы плавал каждый день."]]),
      S("Шаг 4. If I were you: на твоём месте", "Во 2-м типе после if для всех можно ставить were, даже для I и he. If I were you, I would ... = на твоём месте я бы ...", [["If I were you, I would apply to UPenn.", "На твоём месте я бы подал документы в UPenn."], ["If she were here, she would help us.", "Если бы она была здесь, она бы нам помогла."]]),
      S("Шаг 5. Тип 3: о прошлом, уже не изменить", "If + had + 3-я форма, would have + 3-я форма. Жалеем о том, что уже случилось.", [["If I had studied, I would have passed.", "Если бы я тогда позанимался, я бы сдал."], ["If we had left earlier, we wouldn't have missed the bus.", "Если бы мы вышли раньше, мы бы не опоздали на автобус."]]),
      S("Шаг 6. Как выбрать тип и порядок", "Есть «бы» и речь о сейчас: тип 2, о прошлом: тип 3. Без «бы» про будущее: тип 1. Части можно поменять местами: если if в середине, запятая не нужна.", [["I would buy a car if I had money.", "Я бы купил машину, если бы у меня были деньги."], ["I'll call you if I have time.", "Я позвоню, если будет время."]])
    ],
    tasks: [
      O("Соберите: Если будешь заниматься, ты сдашь экзамен.", ["If", "you", "study", "you", "will", "pass", "the exam"], "If you study you will pass the exam", "Тип 1: if + Present, will + глагол."),
      O("Соберите: Если бы я жил у моря, я бы плавал каждый день.", ["If", "I", "lived", "by the sea", "I", "would", "swim", "every day"], "If I lived by the sea I would swim every day", "Тип 2: if + Past, would + глагол."),
      O("Соберите: На твоём месте я бы сходил к врачу.", ["If", "I", "were", "you", "I", "would", "see", "a doctor"], "If I were you I would see a doctor", "If I were you, I would ..."),
      Ch("If you heat ice, it ___ .", ["melts", "melted", "would have melted"], 0, "Тип 0, факт: Present."),
      Ch("If it ___ tomorrow, we will stay home.", ["will rain", "rains", "rained"], 1, "После if без will: rains."),
      Ch("If I ___ money, I would buy a car.", ["have", "had", "would have"], 1, "Тип 2: if + Past (had)."),
      Ch("If I had studied, I ___ the test.", ["would pass", "will pass", "would have passed"], 2, "Тип 3: would have + 3-я форма."),
      I("If I ___ you, I would apply to UPenn. (be)", ["were"], "If I were you."),
      I("If she had left earlier, she ___ the bus. (not / miss)", ["wouldn't have missed", "would not have missed"], "Тип 3: wouldn't have + missed."),
      F("Исправьте: If I would have money, I would travel.", ["If I had money I would travel", "If I had money, I would travel", "If I had money, I'd travel", "If I had money I'd travel"], "После if не ставим would: had.")
    ]
  };

  const T = (window.TRAINER = window.TRAINER || {});

  T[19] = [
    ["Я собираюсь изучать экономику.", "I am going to study economics|I'm going to study economics", "am + going to"],
    ["Мы собираемся купить машину.", "We are going to buy a car|We're going to buy a car", "are going to"],
    ["Она собирается навестить бабушку в воскресенье.", "She is going to visit her grandma on Sunday|She is going to visit her grandmother on Sunday|On Sunday she is going to visit her grandma|On Sunday she is going to visit her grandmother", "is going to"],
    ["Посмотри на тучи! Будет дождь.", "Look at the clouds it is going to rain|Look at the clouds it's going to rain", "Признаки: going to"],
    ["Я не собираюсь ему звонить.", "I am not going to call him|I'm not going to call him", "am not going to"],
    ["Ты собираешься пойти на вечеринку?", "Are you going to go to the party|Are you going to the party", "Are в начало"],
    ["Что ты собираешься делать в выходные?", "What are you going to do at the weekend|What are you going to do on the weekend|What are you going to do this weekend", "What are you going to"],
    ["Сегодня вечером они собираются смотреть фильм.", "They are going to watch a film tonight|They are going to watch a movie tonight|They are going to watch a film this evening|They are going to watch a movie this evening|Tonight they are going to watch a film|Tonight they are going to watch a movie", "are going to watch"],
    ["Осторожно! Ты сейчас упадёшь.", "Be careful you are going to fall|Careful you are going to fall", "Видно: going to"],
    ["Он не собирается продавать свой телефон.", "He is not going to sell his phone|He isn't going to sell his phone", "isn't going to"],
    ["Телефон звонит. Я отвечу.", "The phone is ringing I will answer it|The phone is ringing I will get it|The phone is ringing I will answer", "Решил сейчас: will"],
    ["Когда ты собираешься начать?", "When are you going to start|When are you going to begin", "When are you going to"]
  ];

  T[20] = [
    ["Я потерял ключи.", "I have lost my keys|I've lost my keys", "have + lost"],
    ["Она бывала в Лондоне.", "She has been to London|She's been to London", "has been to"],
    ["Ты когда-нибудь видел снег?", "Have you ever seen snow", "Have you ever"],
    ["Я никогда не ел суши.", "I have never eaten sushi|I have never tried sushi", "have never + 3-я форма"],
    ["Я уже сделал домашнее задание.", "I have already done my homework|I have done my homework already|I have already finished my homework|I have finished my homework already", "already"],
    ["Он только что пришёл.", "He has just come|He has just arrived|He has just come in|He has just come home", "has just"],
    ["Я ещё не закончил.", "I have not finished yet|I haven't finished yet", "yet в конце"],
    ["Ты уже купил билеты?", "Have you bought the tickets yet|Have you already bought the tickets|Have you bought tickets yet|Have you bought the tickets already", "Have you ... yet"],
    ["Я живу здесь пять лет.", "I have lived here for five years|I have been living here for five years", "for + срок"],
    ["Мы знаем друг друга с 2020 года.", "We have known each other since 2020|We've known each other since 2020", "since + начало"],
    ["Она никогда не была в Америке.", "She has never been to America|She has never been to the USA|She has never been to the US", "has never been to"],
    ["Мама только что приготовила ужин.", "Mom has just cooked dinner|Mom has just made dinner|My mom has just cooked dinner|My mom has just made dinner|My mother has just cooked dinner|My mother has just made dinner", "has just"]
  ];

  T[21] = [
    ["Вчера в 8 вечера я смотрел телевизор.", "I was watching TV at 8 pm yesterday|At 8 pm yesterday I was watching TV|Yesterday at 8 pm I was watching TV|I was watching TV yesterday at 8 pm|I was watching TV at 8 yesterday evening|At 8 yesterday evening I was watching TV|Yesterday at 8 in the evening I was watching TV", "was + watching"],
    ["Мы играли в футбол, когда начался дождь.", "We were playing football when it started to rain|We were playing football when it started raining|We were playing football when it began to rain|We were playing football when it began raining", "were playing + started"],
    ["Я спал, когда зазвонил телефон.", "I was sleeping when the phone rang|When the phone rang I was sleeping", "was sleeping + rang"],
    ["Что ты делал в 6 вечера?", "What were you doing at 6 pm|What were you doing at 6 in the evening|What were you doing at 6", "What were you doing"],
    ["Она читала, пока я готовил.", "She was reading while I was cooking|While I was cooking she was reading", "while + оба -ing"],
    ["Они не спали в полночь.", "They were not sleeping at midnight|They weren't sleeping at midnight|They were not asleep at midnight", "weren't + -ing"],
    ["Ты делал домашнее задание в 7?", "Were you doing your homework at 7|Were you doing homework at 7|Were you doing your homework at 7 pm", "Were в начало"],
    ["Когда я пришёл домой, мама готовила ужин.", "When I came home my mom was cooking dinner|When I got home my mom was cooking dinner|When I came home mom was cooking dinner|When I got home mom was cooking dinner|My mom was cooking dinner when I came home|My mom was cooking dinner when I got home|When I came home my mom was making dinner|When I got home my mom was making dinner|When I came home my mother was cooking dinner|When I got home my mother was cooking dinner", "came + was cooking"],
    ["Шёл дождь, и дул ветер.", "It was raining and the wind was blowing|It was raining and it was windy", "was raining"],
    ["Я шёл в школу, когда увидел его.", "I was walking to school when I saw him|I was going to school when I saw him|When I was walking to school I saw him", "was walking + saw"],
    ["Дети играли в парке.", "The children were playing in the park|The kids were playing in the park|Children were playing in the park|Kids were playing in the park", "were playing"],
    ["Он не слушал учителя.", "He was not listening to the teacher|He wasn't listening to the teacher", "wasn't listening to"]
  ];

  T[22] = [
    ["Мой брат старше меня.", "My brother is older than me|My brother is older than I am|My brother is older than I", "older than"],
    ["Это лучший фильм года.", "This is the best film of the year|This is the best movie of the year|It is the best film of the year|It is the best movie of the year", "good → the best"],
    ["Английский легче, чем китайский.", "English is easier than Chinese", "easy → easier"],
    ["Этот телефон дороже.", "This phone is more expensive", "more + длинное"],
    ["Сегодня самый жаркий день.", "Today is the hottest day|It is the hottest day today", "the hottest"],
    ["Она самая умная в классе.", "She is the smartest in the class|She is the cleverest in the class|She is the smartest in our class|She is the cleverest in our class|She is the smartest in class|She is the smartest girl in the class|She is the cleverest girl in the class", "the + est"],
    ["Моя комната меньше твоей.", "My room is smaller than yours|My room is smaller than your room", "smaller than"],
    ["Сегодня погода хуже, чем вчера.", "The weather is worse today than yesterday|Today the weather is worse than yesterday|The weather today is worse than yesterday|The weather is worse today than it was yesterday|Today the weather is worse than it was yesterday", "bad → worse"],
    ["Он такой же высокий, как его папа.", "He is as tall as his dad|He is as tall as his father", "as ... as"],
    ["Чай не такой дорогой, как кофе.", "Tea is not as expensive as coffee|Tea isn't as expensive as coffee|Tea is not so expensive as coffee", "not as ... as"],
    ["Это самая интересная книга.", "This is the most interesting book|It is the most interesting book", "the most"],
    ["Мой английский теперь лучше.", "My English is better now|Now my English is better", "good → better"]
  ];

  T[23] = [
    ["Нужно пристёгиваться ремнём безопасности.", "You must wear a seat belt|You have to wear a seat belt|You must wear a seatbelt|You have to wear a seatbelt", "must + глагол"],
    ["Здесь нельзя курить.", "You must not smoke here|You mustn't smoke here|You cannot smoke here|You can not smoke here", "нельзя: mustn't"],
    ["Мне приходится вставать в 6.", "I have to get up at 6|I have to wake up at 6", "have to"],
    ["Ей приходится работать по субботам.", "She has to work on Saturdays", "she: has to"],
    ["Тебе не обязательно приходить.", "You do not have to come|You don't have to come|You do not need to come|You need not come", "don't have to"],
    ["Тебе стоит сходить к врачу.", "You should see a doctor|You should go to the doctor|You should go to a doctor|You should visit a doctor|You should go and see a doctor", "совет: should"],
    ["Тебе не стоит есть так много сахара.", "You should not eat so much sugar|You shouldn't eat so much sugar|You should not eat that much sugar", "shouldn't"],
    ["Завтра, возможно, пойдёт снег.", "It might snow tomorrow|It may snow tomorrow|Tomorrow it might snow|Tomorrow it may snow", "might / may"],
    ["Я, может быть, опоздаю.", "I might be late|I may be late", "might + be"],
    ["Можно мне войти?", "May I come in|Can I come in", "May I"],
    ["Я должен больше заниматься.", "I must study more|I have to study more|I must study harder|I have to study harder", "must + глагол"],
    ["Тебе нужно носить школьную форму?", "Do you have to wear a uniform|Do you have to wear a school uniform", "Do you have to"]
  ];

  T[24] = [
    ["Я обычно встаю в 7.", "I usually get up at 7|I usually wake up at 7", "обычно: Simple"],
    ["Сейчас я читаю книгу.", "I am reading a book now|Now I am reading a book|I am reading a book right now|Right now I am reading a book", "сейчас: Continuous"],
    ["Вчера я ходил в кино.", "I went to the cinema yesterday|Yesterday I went to the cinema|I went to the movies yesterday|Yesterday I went to the movies", "go → went"],
    ["Я уже сделал уроки.", "I have already done my homework|I have done my homework already|I have already finished my homework|I have finished my homework already", "have + done"],
    ["Я жду тебя уже час.", "I have been waiting for you for an hour|I have been waiting for you for one hour", "have been + -ing"],
    ["Она учит английский три года.", "She has been learning English for three years|She has been studying English for three years|She has learned English for three years|She has studied English for three years", "has been + -ing"],
    ["Когда я пришёл, фильм уже начался.", "When I arrived the film had already started|When I came the film had already started|When I got there the film had already started|The film had already started when I arrived|The film had already started when I came|When I arrived the movie had already started|The movie had already started when I arrived", "had + started"],
    ["Она ушла до того, как я позвонил.", "She had left before I called|She left before I called|She had gone before I called|She had left before I phoned", "had + left"],
    ["Завтра в 10 я буду лететь в Париж.", "At 10 tomorrow I will be flying to Paris|Tomorrow at 10 I will be flying to Paris|I will be flying to Paris at 10 tomorrow|I will be flying to Paris tomorrow at 10", "will be + -ing"],
    ["К 2028 году я закончу школу.", "By 2028 I will have finished school|I will have finished school by 2028", "will have + 3-я форма"],
    ["Вчера в 8 я ужинал.", "At 8 yesterday I was having dinner|Yesterday at 8 I was having dinner|I was having dinner at 8 yesterday|I was having dinner yesterday at 8|At 8 yesterday I was eating dinner|I was eating dinner at 8 yesterday", "was + -ing"],
    ["Я позвоню тебе завтра.", "I will call you tomorrow|I will phone you tomorrow|Tomorrow I will call you", "will + глагол"]
  ];

  T[25] = [
    ["Я видел его вчера.", "I saw him yesterday|Yesterday I saw him", "yesterday: Past Simple"],
    ["Ой, я потерял ключи!", "Oh I have lost my keys|Oh no I have lost my keys|I have lost my keys", "результат сейчас"],
    ["Я был в Париже два раза.", "I have been to Paris twice|I have been to Paris two times|I have visited Paris twice|I have visited Paris two times", "опыт: have been"],
    ["Я ездил в Париж в 2019 году.", "I went to Paris in 2019|I visited Paris in 2019|In 2019 I went to Paris|In 2019 I visited Paris", "in 2019: Past Simple"],
    ["Когда ты приехал?", "When did you arrive|When did you come", "When: Past Simple"],
    ["Ты когда-нибудь был за границей?", "Have you ever been abroad", "Have you ever"],
    ["Она живёт в Лондоне с 2019 года.", "She has lived in London since 2019|She has been living in London since 2019", "since: Present Perfect"],
    ["В детстве она жила в Лондоне.", "She lived in London when she was a child|When she was a child she lived in London|She lived in London as a child|As a child she lived in London", "закончилось: Past Simple"],
    ["Я никогда не видел снег.", "I have never seen snow", "have never seen"],
    ["Мы ходили в кино в прошлую субботу.", "We went to the cinema last Saturday|Last Saturday we went to the cinema|We went to the movies last Saturday|Last Saturday we went to the movies", "last: Past Simple"],
    ["Я уже поел.", "I have already eaten|I have eaten already|I have already had lunch|I have already had dinner", "already: Present Perfect"],
    ["Во сколько ты встал сегодня утром?", "What time did you get up this morning|What time did you wake up this morning|When did you get up this morning|When did you wake up this morning", "What time: Past Simple"]
  ];

  T[26] = [
    ["Раньше я жил в деревне.", "I used to live in a village", "used to + глагол"],
    ["Раньше у меня были длинные волосы.", "I used to have long hair", "состояние: used to"],
    ["Раньше я не любил овощи.", "I did not use to like vegetables|I didn't use to like vegetables|I never used to like vegetables", "didn't use to"],
    ["Ты раньше жил здесь?", "Did you use to live here", "Did you use to"],
    ["Раньше мой папа курил.", "My dad used to smoke|My father used to smoke", "used to"],
    ["Раньше здесь был парк.", "There used to be a park here", "there used to be"],
    ["Каждое лето мы ездили на море.", "Every summer we would go to the sea|Every summer we used to go to the sea|We would go to the sea every summer|We used to go to the sea every summer|Every summer we went to the sea|We went to the sea every summer", "would / used to"],
    ["Раньше я играл в футбол каждый день.", "I used to play football every day|Every day I used to play football", "used to + play"],
    ["Раньше он не носил очки.", "He did not use to wear glasses|He didn't use to wear glasses|He never used to wear glasses", "didn't use to"],
    ["Что ты раньше делал после школы?", "What did you use to do after school", "What did you use to"],
    ["Я привык рано вставать.", "I am used to getting up early|I am used to waking up early|I got used to getting up early|I have got used to getting up early", "be used to + -ing"],
    ["Бабушка часто рассказывала нам сказки.", "My grandma would often tell us stories|My grandma would tell us stories|My grandma used to tell us stories|My grandma often told us stories|Grandma would often tell us stories|Grandma used to tell us stories|My grandmother would often tell us stories|My grandmother used to tell us stories|My grandma would often tell us fairy tales|My grandma used to tell us fairy tales", "would + глагол"]
  ];

  T[27] = [
    ["Если нагреть лёд, он тает.", "If you heat ice it melts|If you heat ice it will melt|Ice melts if you heat it", "тип 0: Present"],
    ["Если пойдёт дождь, я останусь дома.", "If it rains I will stay home|If it rains I will stay at home|I will stay home if it rains|I will stay at home if it rains", "if + rains"],
    ["Если будешь заниматься, ты сдашь экзамен.", "If you study you will pass the exam|You will pass the exam if you study|If you study you will pass the test|You will pass the test if you study", "тип 1"],
    ["Если у меня будет время, я тебе позвоню.", "If I have time I will call you|I will call you if I have time|If I have time I will phone you|I will phone you if I have time|If I have time I will give you a call", "if + have"],
    ["Если бы у меня были деньги, я бы купил машину.", "If I had money I would buy a car|I would buy a car if I had money|If I had the money I would buy a car", "тип 2: had + would"],
    ["На твоём месте я бы сходил к врачу.", "If I were you I would see a doctor|If I were you I would go to the doctor|If I were you I would go to a doctor|I would see a doctor if I were you|I would go to the doctor if I were you|If I were you I would visit a doctor", "If I were you"],
    ["Если бы я жил у моря, я бы плавал каждый день.", "If I lived by the sea I would swim every day|If I lived near the sea I would swim every day|I would swim every day if I lived by the sea|I would swim every day if I lived near the sea|If I lived at the seaside I would swim every day", "тип 2"],
    ["Если бы я знал ответ, я бы тебе сказал.", "If I knew the answer I would tell you|I would tell you if I knew the answer|If I had known the answer I would have told you|I would have told you if I had known the answer", "бы → would"],
    ["Если бы я вчера позанимался, я бы сдал экзамен.", "If I had studied yesterday I would have passed the exam|I would have passed the exam if I had studied yesterday|If I had studied yesterday I would have passed the test|I would have passed the test if I had studied yesterday", "тип 3: had + would have"],
    ["Если бы мы вчера вышли раньше, мы бы не опоздали на автобус.", "If we had left earlier yesterday we would not have missed the bus|We would not have missed the bus yesterday if we had left earlier|We would not have missed the bus if we had left earlier yesterday|If we had left earlier yesterday we wouldn't have missed the bus", "тип 3"],
    ["Если пить кофе вечером, плохо спишь.", "If you drink coffee in the evening you sleep badly|If you drink coffee in the evening you do not sleep well|If you drink coffee at night you sleep badly|If you drink coffee at night you do not sleep well", "тип 0: Present"],
    ["Я позвоню тебе, если опоздаю.", "I will call you if I am late|I will phone you if I am late|If I am late I will call you|If I am late I will phone you|I will call you if I am going to be late", "if + am late"]
  ];
})();
