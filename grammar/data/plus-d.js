/* Пошаговые объяснения и практика: уроки 28-36 */
(function () {
  const P = (window.GRAMMAR_PLUS = window.GRAMMAR_PLUS || {});
  const S = (h, t, ex) => ({ h, t, ex: ex || [] });
  const O = (q, words, a, why) => ({ k: "order", q, words, a, why });
  const Ch = (q, o, a, why) => ({ k: "choice", q, o, a, why });
  const I = (q, a, why) => ({ k: "input", q, a, why });
  const F = (q, a, why) => ({ k: "fix", q, a, why });

  P[28] = {
    steps: [
      S("Шаг 1. Когда нужен пассив", "Пассив нужен, когда важно не КТО сделал, а ЧТО сделано. По-русски мы говорим «Здесь говорят по-английски», «Дом построили в 1990». По-английски главным становится предмет: дом, язык, телефон.", [["They make iPhones in China. → iPhones are made in China.", "В Китае делают айфоны. → Айфоны делают в Китае."], ["English is spoken here.", "Здесь говорят по-английски."]]),
      S("Шаг 2. Формула: be + 3-я форма", "Всегда два кусочка: be (am / is / are) и 3-я форма глагола (made, written, built, done). Частая ошибка: забыть be и сказать «The house built».", [["Cars are made in Japan.", "Машины делают в Японии."], ["The room is cleaned every day.", "Комнату убирают каждый день."]]),
      S("Шаг 3. Прошлое: was / were + 3-я форма", "Один предмет: was. Много: were. «Я родился» по-английски тоже пассив: I was born.", [["The house was built in 1990.", "Дом построили в 1990 году."], ["These photos were taken in Sochi.", "Эти фото сделаны в Сочи."], ["I was born in 2010.", "Я родился в 2010 году."]]),
      S("Шаг 4. Другие времена: меняется только be", "Уже случилось: has / have been + 3-я форма. Будущее: will be + 3-я форма. После must, can, should: be + 3-я форма.", [["My bike has been stolen.", "Мой велосипед украли."], ["The results will be announced tomorrow.", "Результаты объявят завтра."], ["It must be done today.", "Это нужно сделать сегодня."]]),
      S("Шаг 5. Кем сделано: by", "Если важно, кто автор, добавляем by. Не from и не with. Если и так понятно или неважно, by не нужен.", [["The book was written by Tolstoy.", "Книга написана Толстым."], ["This song was sung by Adele.", "Эту песню спела Адель."]]),
      S("Шаг 6. Отрицание и вопрос", "Not ставим после be. В вопросе be выходит вперёд, 3-я форма остаётся на месте.", [["The window wasn't broken.", "Окно не было разбито."], ["Where was this film made?", "Где снимали этот фильм?"], ["Were you invited?", "Тебя пригласили?"]])
    ],
    tasks: [
      O("Соберите: Здесь говорят по-английски.", ["English", "is", "spoken", "here"], "English is spoken here", "Что (English) + is + 3-я форма (spoken)."),
      O("Соберите: Этот дом построили в 1990 году.", ["This", "house", "was", "built", "in", "1990"], "This house was built in 1990", "Прошлое: was + built."),
      O("Соберите: Мой велосипед украли.", ["My", "bike", "has", "been", "stolen"], "My bike has been stolen", "Только что случилось: has been + stolen."),
      Ch("Paper ___ from wood.", ["makes", "is made", "is make"], 1, "Бумагу делают: is + 3-я форма made."),
      Ch("War and Peace was written ___ Tolstoy.", ["from", "by", "with"], 1, "Кем сделано: by."),
      Ch("The homework must ___ today.", ["be done", "done", "be do"], 0, "После must: be + 3-я форма."),
      I("The results ___ tomorrow. (announce, будущее)", ["will be announced"], "Будущее в пассиве: will be + announced."),
      I("Переведите: Я родился в Москве.", ["I was born in Moscow"], "«Родился» по-английски: was born."),
      F("Исправьте: The house built in 1990.", ["The house was built in 1990"], "Не хватает be: was built."),
      F("Исправьте: This film was make in 2010.", ["This film was made in 2010"], "Нужна 3-я форма: made.")
    ]
  };

  P[29] = {
    steps: [
      S("Шаг 1. Пересказ: said (that) ...", "Когда пересказываем чужие слова в прошлом, время сдвигается на шаг назад. По-русски время не меняется («Он сказал, что устал»), поэтому русские часто забывают про сдвиг. Слово that можно не ставить.", [["\"I am tired.\" → He said (that) he was tired.", "«Я устал». → Он сказал, что устал."], ["\"I like it.\" → She said she liked it.", "«Мне нравится». → Она сказала, что ей нравится."]]),
      S("Шаг 2. Шаг назад: как меняются времена", "am / is → was, like → liked, will → would, can → could, saw → had seen.", [["\"I will call.\" → He said he would call.", "«Я позвоню». → Он сказал, что позвонит."], ["\"I can swim.\" → She said she could swim.", "«Я умею плавать». → Она сказала, что умеет плавать."], ["\"I saw him.\" → She said she had seen him.", "«Я видела его». → Она сказала, что видела его."]]),
      S("Шаг 3. Меняйте и местоимения", "I, my, your меняем по смыслу, как и в русском: кто теперь говорит и о ком.", [["\"I like your idea.\" → She said she liked my idea.", "«Мне нравится твоя идея». → Она сказала, что ей нравится моя идея."]]),
      S("Шаг 4. say или tell", "say без «кому»: He said that... tell всегда с «кому»: He told me that... Нельзя сказать «He said me».", [["He said that he was busy.", "Он сказал, что занят."], ["He told me that he was busy.", "Он сказал мне, что занят."]]),
      S("Шаг 5. Пересказ вопроса: asked if / asked where", "Вопрос «да / нет» пересказываем через if. С вопросительным словом порядок как в обычном предложении: сначала кто, потом глагол, без do / did.", [["\"Can you help?\" → He asked if I could help.", "«Можешь помочь?» → Он спросил, могу ли я помочь."], ["\"Where do you live?\" → She asked where I lived.", "«Где ты живёшь?» → Она спросила, где я живу."]]),
      S("Шаг 6. Вежливый вопрос: Do you know where ... is?", "После Do you know / Can you tell me порядок тоже прямой: where the station is, а не where is the station.", [["Do you know where the station is?", "Вы не знаете, где вокзал?"], ["Can you tell me what time it is?", "Не подскажете, который час?"]])
    ],
    tasks: [
      O("Соберите: Он сказал, что устал.", ["He", "said", "that", "he", "was", "tired"], "He said that he was tired", "said + that + время на шаг назад: was."),
      O("Соберите: Она спросила, где я живу.", ["She", "asked", "where", "I", "lived"], "She asked where I lived", "В пересказе вопроса порядок прямой: I lived."),
      O("Соберите: Вы не знаете, где вокзал?", ["Do", "you", "know", "where", "the", "station", "is"], "Do you know where the station is", "После Do you know: где + кто + is."),
      Ch("\"I will call.\" → He said he ___ call.", ["will", "would", "wills"], 1, "will сдвигается в would."),
      Ch("She ___ me that she was busy.", ["said", "told", "say"], 1, "Есть «кому» (me): нужен told."),
      Ch("\"Can you help me?\" → He asked ___ I could help him.", ["if", "that", "do"], 0, "Вопрос «да / нет» пересказываем через if."),
      I("\"I like pizza.\" → She said she ___ pizza. (like)", ["liked"], "Сдвиг на шаг назад: like → liked."),
      I("Переведите: Он сказал мне, что он занят.", ["He told me that he was busy", "He told me he was busy"], "Сказал мне: told me. Занят: was busy."),
      F("Исправьте: Can you tell me where is the bank?", ["Can you tell me where the bank is"], "В косвенном вопросе прямой порядок: the bank is."),
      F("Исправьте: He said me that he was ill.", ["He told me that he was ill", "He told me he was ill", "He said that he was ill", "He said he was ill"], "С «кому» нужен tell: told me. Или убираем me.")
    ]
  };

  P[30] = {
    steps: [
      S("Шаг 1. who: о людях", "Слово «который» соединяет два предложения в одно и уточняет, о ком речь. Если речь о человеке, ставим who.", [["The man who lives next door is a doctor.", "Мужчина, который живёт по соседству, врач."], ["I know a girl who speaks French.", "Я знаю девочку, которая говорит по-французски."]]),
      S("Шаг 2. which: о вещах и животных", "Для предметов и животных ставим which. Частая ошибка: сказать what вместо which («the phone what I bought»).", [["The phone which I bought is great.", "Телефон, который я купил, отличный."], ["I have a dog which loves water.", "У меня собака, которая любит воду."]]),
      S("Шаг 3. that: и люди, и вещи", "В разговоре вместо who и which часто говорят that. Если сразу после «который» идёт новый «кто» (I, we, my mom), that можно вообще убрать.", [["The film that we watched was boring.", "Фильм, который мы смотрели, был скучным."], ["The film we watched was boring.", "То же самое без that."]]),
      S("Шаг 4. whose = чей, where = где", "whose ставим вместо his / her / their: «девочка, чей папа пилот». where ставим после места: город, кафе, школа.", [["The girl whose dad is a pilot is my friend.", "Девочка, чей папа пилот, моя подруга."], ["This is the city where I was born.", "Это город, где я родился."]]),
      S("Шаг 5. С запятыми и без", "Без запятых: без этой части непонятно, о ком речь. С запятыми: просто добавляем информацию, человек и так понятен. С запятыми that нельзя, только who или which.", [["The students who passed got a prize.", "Ученики, которые сдали, получили приз. (только они)"], ["My brother, who lives in Kazan, is a doctor.", "Мой брат, который живёт в Казани, врач."]])
    ],
    tasks: [
      O("Соберите: Это мальчик, который живёт по соседству.", ["This", "is", "the", "boy", "who", "lives", "next", "door"], "This is the boy who lives next door", "О человеке: who."),
      O("Соберите: Это город, где я родился.", ["This", "is", "the", "city", "where", "I", "was", "born"], "This is the city where I was born", "О месте: where."),
      O("Соберите: У меня есть друг, чей папа пилот.", ["I", "have", "a", "friend", "whose", "dad", "is", "a", "pilot"], "I have a friend whose dad is a pilot", "Чей: whose."),
      Ch("The woman ___ teaches us English is very kind.", ["which", "who", "where"], 1, "Женщина = человек: who."),
      Ch("I lost the book ___ you gave me.", ["who", "which", "whose"], 1, "Книга = вещь: which."),
      Ch("My sister, ___ lives in Kazan, is a doctor.", ["that", "who", "which"], 1, "С запятыми that нельзя, о человеке: who."),
      Ch("The girl ___ bag was stolen called the police.", ["who", "whose", "which"], 1, "Чья сумка: whose."),
      I("That's the shop ___ I buy bread. (где)", ["where"], "О месте: where."),
      I("Переведите: Мне понравился фильм, который мы смотрели.", ["I liked the film that we watched", "I liked the film which we watched", "I liked the film we watched", "I liked the movie that we watched", "I liked the movie which we watched", "I liked the movie we watched", "I liked the film that we saw", "I liked the film we saw", "I liked the movie we saw"], "Фильм = вещь: that или which, а можно и без них."),
      F("Исправьте: The phone what I bought is great.", ["The phone that I bought is great", "The phone which I bought is great", "The phone I bought is great"], "Не what, а which или that.")
    ]
  };

  P[31] = {
    steps: [
      S("Шаг 1. must be = наверняка", "Здесь must значит не «должен», а «наверняка, должно быть». Это вывод: мы почти уверены (около 95%).", [["He worked all day. He must be tired.", "Он работал весь день. Он, наверное, устал."], ["You must be hungry.", "Ты, должно быть, голоден."]]),
      S("Шаг 2. might / may / could be = может быть", "Если не уверены (примерно 50 на 50), берём might, may или could. По смыслу почти одно и то же.", [["She might be at home.", "Она, может быть, дома."], ["It could be his phone.", "Возможно, это его телефон."]]),
      S("Шаг 3. can't be = не может быть", "Если уверены, что НЕТ, говорим can't be. Частая ошибка: сказать mustn't be. Mustn't значит «нельзя», а не «точно нет».", [["It can't be true!", "Это не может быть правдой!"], ["He can't be at home. His car isn't here.", "Он не может быть дома. Его машины нет."]]),
      S("Шаг 4. Что происходит сейчас: be + -ing", "Если догадываемся о действии в эту минуту, после must / might / can't ставим be + глагол-ing.", [["He isn't answering. He must be sleeping.", "Он не отвечает. Наверное, спит."], ["They might be watching TV.", "Может, они смотрят телевизор."]]),
      S("Шаг 5. О прошлом: have + 3-я форма", "Догадка о прошлом: must / might / can't + have + 3-я форма. Вместо be ставим have been.", [["He must have been tired.", "Он, наверное, устал (тогда)."], ["She might have forgotten.", "Она, возможно, забыла."], ["He can't have done it.", "Он не мог этого сделать."]]),
      S("Шаг 6. should have = надо было", "should have + 3-я форма = «надо было, а ты не сделал». Это упрёк или сожаление.", [["You should have studied.", "Тебе надо было учиться."], ["I should have called you.", "Мне надо было тебе позвонить."]])
    ],
    tasks: [
      O("Соберите: Он, наверное, устал.", ["He", "must", "be", "tired"], "He must be tired", "Наверняка: must be."),
      O("Соберите: Она, возможно, дома.", ["She", "might", "be", "at", "home"], "She might be at home", "Может быть: might be."),
      O("Соберите: Тебе надо было учиться.", ["You", "should", "have", "studied"], "You should have studied", "Надо было: should have + 3-я форма."),
      Ch("He worked for 12 hours. He ___ be tired.", ["must", "can't", "mustn't"], 0, "Мы почти уверены: must be."),
      Ch("It ___ be true! (не может быть)", ["mustn't", "can't", "might"], 1, "Точно нет: can't be."),
      Ch("I can't find my keys. I ___ have left them at school. (возможно)", ["might", "can't", "should"], 0, "Возможно, в прошлом: might have + 3-я форма."),
      Ch("He was with me all evening. He ___ done it.", ["can't have", "must have", "should have"], 0, "Точно не мог в прошлом: can't have done."),
      I("She isn't answering. She ___ asleep. (наверняка, 2 слова)", ["must be"], "Наверняка: must be."),
      I("Переведите: Это не может быть правдой.", ["It can't be true", "It cannot be true", "That can't be true", "That cannot be true", "This can't be true", "This cannot be true"], "Точно нет: can't be."),
      F("Исправьте: He mustn't be at home, his car isn't here.", ["He can't be at home, his car isn't here", "He cannot be at home, his car isn't here"], "«Точно нет» это can't be, а mustn't значит «нельзя».")
    ]
  };

  P[32] = {
    steps: [
      S("Шаг 1. Второй глагол: -ing или to", "По-русски после «люблю», «хочу», «закончил» всегда идёт инфинитив. В английском второй глагол бывает с -ing или с to. Какой выбрать, зависит от первого глагола, поэтому учите их парами.", [["I enjoy reading.", "Мне нравится читать."], ["I want to read.", "Я хочу читать."]]),
      S("Шаг 2. После этих глаголов: -ing", "enjoy, finish, stop, avoid, mind, keep, practise, suggest, spend time. Частая ошибка: «I finished to do».", [["Stop talking!", "Перестань разговаривать!"], ["I finished doing my homework.", "Я закончил делать уроки."], ["Do you mind opening the window?", "Не против открыть окно?"]]),
      S("Шаг 3. После этих глаголов: to + глагол", "want, need, decide, plan, hope, learn, agree, promise, would like.", [["I decided to go.", "Я решил пойти."], ["She hopes to see you.", "Она надеется увидеть тебя."], ["I'd like to go to the cinema.", "Я бы хотел сходить в кино."]]),
      S("Шаг 4. После предлогов всегда -ing", "at, for, in, about, before, after, without: после них глагол только с -ing.", [["I'm good at drawing.", "Я хорошо рисую."], ["Thank you for helping me.", "Спасибо, что помог мне."], ["Before leaving, turn off the light.", "Перед уходом выключи свет."]]),
      S("Шаг 5. После прилагательных: to, после can / must / let: без to", "easy, hard, nice + to. А после can, must, should, will, let, make глагол идёт голый.", [["It's easy to learn.", "Это легко выучить."], ["Nice to meet you.", "Приятно познакомиться."], ["Let me help you.", "Давай я помогу."]]),
      S("Шаг 6. like, love, hate: можно и так, и так", "После like, love, hate подходит и -ing, и to. Но would like только с to.", [["I like swimming. = I like to swim.", "Я люблю плавать."], ["I would like to swim.", "Я бы хотел поплавать."]])
    ],
    tasks: [
      O("Соберите: Я решил пойти домой.", ["I", "decided", "to", "go", "home"], "I decided to go home", "После decide: to + глагол."),
      O("Соберите: Перестань разговаривать!", ["Stop", "talking"], "Stop talking", "После stop: -ing."),
      O("Соберите: Спасибо, что помог мне.", ["Thank", "you", "for", "helping", "me"], "Thank you for helping me", "После предлога for: -ing."),
      Ch("I enjoy ___ films.", ["to watch", "watching", "watch"], 1, "После enjoy: -ing."),
      Ch("She wants ___ a doctor.", ["being", "to be", "be"], 1, "После want: to + глагол."),
      Ch("I'm good at ___.", ["to draw", "draw", "drawing"], 2, "После предлога at: -ing."),
      Ch("Let me ___ you.", ["to help", "help", "helping"], 1, "После let глагол без to."),
      I("I hope ___ you soon. (see)", ["to see"], "После hope: to + глагол."),
      I("Переведите: Мне нравится плавать.", ["I like swimming", "I like to swim", "I love swimming", "I love to swim", "I enjoy swimming"], "После like можно и -ing, и to."),
      F("Исправьте: I finished to do my homework.", ["I finished doing my homework"], "После finish: -ing.")
    ]
  };

  P[33] = {
    steps: [
      S("Шаг 1. Что такое хвостик", "В конце фразы англичане часто добавляют короткий вопрос: «да?», «правда?», «не так ли?». Правило: если фраза с плюсом, хвостик с минусом.", [["It's cold, isn't it?", "Холодно, правда?"], ["You're tired, aren't you?", "Ты устал, да?"]]),
      S("Шаг 2. Берите помощника из предложения", "Если в предложении есть is, are, was, can, will, have, этот же глагол идёт в хвостик. Хвостик собираем так: помощник + not + местоимение.", [["She can swim, can't she?", "Она умеет плавать, правда?"], ["You will come, won't you?", "Ты придёшь, да?"]]),
      S("Шаг 3. Нет помощника: do / does / did", "Если глагол обычный (like, play, went), в хвостике ставим do, does или did, как в вопросе.", [["You like pizza, don't you?", "Ты любишь пиццу, да?"], ["He plays football, doesn't he?", "Он играет в футбол, да?"], ["They went home, didn't they?", "Они ушли домой, да?"]]),
      S("Шаг 4. Минус в предложении: хвостик с плюсом", "Если фраза уже с not, хвостик без not. Два минуса подряд нельзя.", [["They didn't come, did they?", "Они не пришли, да?"], ["She isn't here, is she?", "Её здесь нет, да?"]]),
      S("Шаг 5. В хвостике только местоимение", "Не повторяем имя: Anna → she, my parents → they, the film → it.", [["Your mom is a teacher, isn't she?", "Твоя мама учитель, да?"], ["The film was good, wasn't it?", "Фильм был хороший, правда?"]]),
      S("Шаг 6. Исключения", "I am → aren't I (а не amn't I). Let's → shall we.", [["I'm right, aren't I?", "Я прав, не так ли?"], ["Let's go, shall we?", "Пойдём, ладно?"]])
    ],
    tasks: [
      O("Соберите: Холодно, правда?", ["It's", "cold,", "isn't", "it"], "It's cold, isn't it", "Плюс в предложении (is), минус в хвостике (isn't)."),
      O("Соберите: Ты любишь пиццу, да?", ["You", "like", "pizza,", "don't", "you"], "You like pizza, don't you", "Нет помощника, поэтому don't."),
      O("Соберите: Они не пришли, да?", ["They", "didn't", "come,", "did", "they"], "They didn't come, did they", "Минус в предложении, плюс в хвостике."),
      Ch("She can swim, ___?", ["can't she", "doesn't she", "isn't she"], 0, "Помощник can: хвостик can't she."),
      Ch("You are tired, ___?", ["don't you", "aren't you", "are you"], 1, "Помощник are: хвостик aren't you."),
      Ch("He played well, ___?", ["didn't he", "wasn't he", "doesn't he"], 0, "Прошлое без помощника: didn't he."),
      Ch("I'm right, ___?", ["am not I", "aren't I", "isn't I"], 1, "Исключение: I am → aren't I."),
      I("She isn't at home, ___? (2 слова)", ["is she"], "Минус в предложении, хвостик с плюсом: is she."),
      I("Your brother lives in Kazan, ___? (2 слова)", ["doesn't he", "does not he"], "lives = he, нет помощника: doesn't he."),
      F("Исправьте: You will come, won't he?", ["You will come, won't you", "You'll come, won't you"], "В хвостике то же местоимение: you.")
    ]
  };

  P[34] = {
    steps: [
      S("Шаг 1. every и each + одно", "every и each = «каждый». После них существительное в единственном числе, а глагол как с he: has, knows. Частая ошибка: «every students». each of + them / us = «каждый из них».", [["Every student has a book.", "У каждого ученика есть книга."], ["Each of them got a prize.", "Каждый из них получил приз."]]),
      S("Шаг 2. all = все", "all + множественное число. Можно all my friends или all of my friends. С местоимением только с of: all of us, all of them.", [["All my friends came.", "Все мои друзья пришли."], ["All of us are ready.", "Мы все готовы."]]),
      S("Шаг 3. both = оба", "both только про двоих. Глагол во множественном числе.", [["Both my parents work.", "Оба моих родителя работают."], ["Both of them speak English.", "Они оба говорят по-английски."]]),
      S("Шаг 4. either и neither: из двух", "either = любой из двух. neither = ни один из двух, после него существительное в единственном числе. Ещё either = «тоже» в отрицании: I don't like it either (не too!).", [["You can take either bus.", "Можешь сесть на любой из двух автобусов."], ["Neither answer is correct.", "Ни один из двух ответов не верный."], ["I don't like coffee either.", "Я тоже не люблю кофе."]]),
      S("Шаг 5. none = ни один", "none of = ни один из многих. В русском два отрицания («никто не позвонил»), а в английском одно: none уже значит «нет», второе not не нужно.", [["None of them called.", "Никто из них не позвонил."], ["None of my friends play chess.", "Никто из моих друзей не играет в шахматы."]]),
      S("Шаг 6. a few / few, a little / little", "a few = несколько (это хорошо), few = мало (это плохо). С неисчисляемыми (time, money, water) то же самое с a little / little.", [["I have a few friends here.", "У меня тут есть несколько друзей."], ["Few people came.", "Пришло мало людей."], ["We have a little time.", "У нас есть немного времени."]])
    ],
    tasks: [
      O("Соберите: Оба моих родителя работают.", ["Both", "my", "parents", "work"], "Both my parents work", "Оба: both."),
      O("Соберите: Никто из них не позвонил.", ["None", "of", "them", "called"], "None of them called", "None уже отрицание, not не нужен."),
      O("Соберите: У каждого ученика есть книга.", ["Every", "student", "has", "a", "book"], "Every student has a book", "every + одно + has."),
      Ch("Every student ___ a phone.", ["have", "has", "having"], 1, "После every глагол как с he: has."),
      Ch("I don't like coffee. My sister doesn't like it ___.", ["too", "either", "neither"], 1, "«Тоже» в отрицании: either."),
      Ch("___ answer is correct. Both are wrong.", ["Neither", "Either", "Both"], 0, "Ни один из двух: neither."),
      Ch("We have ___ time, let's have a coffee.", ["a few", "a little", "few"], 1, "Time неисчисляемое, есть немного: a little."),
      I("___ my friends came to the party. (все)", ["All", "All of"], "Все: all или all of."),
      I("Переведите: Пришло мало людей.", ["Few people came", "Not many people came", "Very few people came"], "Мало (плохо): few."),
      F("Исправьте: None of them didn't come.", ["None of them came"], "None уже значит «ни один», второе отрицание лишнее.")
    ]
  };

  P[35] = {
    steps: [
      S("Шаг 1. Своё мнение", "I think, in my opinion, I believe, personally. Частые ошибки: «on my opinion» (правильно in) и «In my opinion, I think» (два раза одно и то же).", [["In my opinion, school uniform is useful.", "По-моему, школьная форма полезна."], ["Personally, I prefer books to films.", "Лично я предпочитаю книги фильмам."]]),
      S("Шаг 2. Добавить мысль", "also, moreover, in addition, furthermore, what's more. Moreover и In addition ставим в начало предложения, после них запятая.", [["Sport is healthy. Moreover, it is fun.", "Спорт полезен. Кроме того, это весело."], ["In addition, it is cheap.", "К тому же это дёшево."]]),
      S("Шаг 3. Противопоставить", "but в середине. However в начале нового предложения, с запятой. although / even though + целое предложение (кто + глагол). whereas = тогда как.", [["I like the city. However, it is very expensive.", "Мне нравится город. Однако он очень дорогой."], ["Although it was raining, we went out.", "Хотя шёл дождь, мы вышли гулять."], ["I love tea, whereas my sister loves coffee.", "Я люблю чай, тогда как сестра любит кофе."]]),
      S("Шаг 4. despite / in spite of + существительное", "После despite и in spite of идёт существительное или -ing, но не целое предложение. Ошибка: «despite of». Правильно despite или in spite of.", [["Despite the rain, we went out.", "Несмотря на дождь, мы вышли гулять."], ["In spite of being tired, he finished the work.", "Несмотря на усталость, он закончил работу."]]),
      S("Шаг 5. Причина и следствие", "Причина: because + предложение, because of / due to + существительное, since / as. Следствие: so, therefore, as a result, that's why.", [["We stayed at home because of the rain.", "Мы остались дома из-за дождя."], ["I studied a lot, so I passed the exam.", "Я много учился, поэтому сдал экзамен."], ["As a result, we were late.", "В результате мы опоздали."]]),
      S("Шаг 6. Пример и итог", "Пример: for example, for instance, such as. Итог в конце эссе: in conclusion, to sum up, overall.", [["I like sports such as tennis and football.", "Я люблю такие виды спорта, как теннис и футбол."], ["To sum up, the internet is very useful.", "Подводя итог, интернет очень полезен."]])
    ],
    tasks: [
      O("Соберите: По-моему, это хорошая идея.", ["In", "my", "opinion,", "this", "is", "a", "good", "idea"], "In my opinion, this is a good idea", "По-моему: in my opinion (с in, не on)."),
      O("Соберите: Несмотря на дождь, мы пошли гулять.", ["Despite", "the", "rain,", "we", "went", "for", "a", "walk"], "Despite the rain, we went for a walk", "despite + существительное (the rain)."),
      O("Соберите: Матч отменили из-за снега.", ["The", "match", "was", "cancelled", "because", "of", "the", "snow"], "The match was cancelled because of the snow", "Из-за + существительное: because of."),
      Ch("___ it was cold, we went swimming.", ["Despite", "Although", "However"], 1, "Дальше целое предложение (it was cold): although."),
      Ch("I like the city. ___, it is very expensive.", ["However", "Although", "Because"], 0, "Начало нового предложения с запятой: however."),
      Ch("We stayed at home ___ the rain.", ["because", "because of", "so"], 1, "Дальше существительное: because of."),
      Ch("Some people love big cities, ___ others hate them.", ["whereas", "despite", "moreover"], 0, "Противопоставляем две группы: whereas."),
      I("___, social networks have pros and cons. (в заключение)", ["In conclusion", "To sum up"], "Итог: in conclusion или to sum up."),
      I("Переведите: Мне нравится спорт, например, футбол и теннис.", ["I like sports such as football and tennis", "I like sport such as football and tennis", "I like sports for example football and tennis", "I like sport for example football and tennis", "I like sports for instance football and tennis", "I like sports like football and tennis", "I like sport like football and tennis"], "Пример: such as или for example."),
      F("Исправьте: Despite of the rain, we went out.", ["Despite the rain, we went out", "In spite of the rain, we went out"], "despite без of, или in spite of.")
    ]
  };

  P[36] = {
    steps: [
      S("Шаг 1. Глагол + маленькое слово = новый смысл", "get = получать, а get up = вставать. Маленькие слова up, off, out, on, back полностью меняют смысл. Переводить по частям бесполезно, учите целиком, с примером.", [["I get up at seven.", "Я встаю в семь."], ["Come back soon!", "Возвращайся скорее!"]]),
      S("Шаг 2. Каждый день", "get up (вставать), put on (надеть), take off (снять; взлететь), turn on / off (включить / выключить), come back (вернуться).", [["Put on your jacket.", "Надень куртку."], ["Take off your shoes.", "Сними обувь."], ["Turn off the light.", "Выключи свет."]]),
      S("Шаг 3. Искать и узнавать", "look for (искать), look after (заботиться), find out (узнать), figure out (разобраться).", [["I'm looking for my keys.", "Я ищу свои ключи."], ["She looks after her little brother.", "Она присматривает за младшим братом."], ["I want to find out the truth.", "Я хочу узнать правду."]]),
      S("Шаг 4. Начать, бросить, отложить", "take up (начать заниматься), give up (бросить, сдаться), put off (откладывать), set up (основать, настроить).", [["I took up swimming last year.", "Я начал заниматься плаванием в прошлом году."], ["Don't give up!", "Не сдавайся!"], ["Don't put it off until tomorrow.", "Не откладывай это на завтра."]]),
      S("Шаг 5. Где ставить it и them", "Если вместо предмета it или them, оно встаёт в середину: turn it off, put it on. «Turn off it» нельзя. Но у look for и look after it идёт в конце: look for it.", [["Turn it off!", "Выключи его!"], ["Put them on.", "Надень их."], ["I'm looking for it.", "Я его ищу."]]),
      S("Шаг 6. Ещё полезные", "run out of (закончиться), work out (тренироваться; получиться), get over (оправиться), give out (раздавать), carry out (проводить, выполнять).", [["We've run out of milk.", "У нас закончилось молоко."], ["I work out three times a week.", "Я тренируюсь три раза в неделю."], ["He got over the flu.", "Он оправился от гриппа."]])
    ],
    tasks: [
      O("Соберите: Я встаю в семь.", ["I", "get", "up", "at", "seven"], "I get up at seven", "Вставать: get up."),
      O("Соберите: Выключи его!", ["Turn", "it", "off"], "Turn it off", "it встаёт между turn и off."),
      O("Соберите: Я ищу свои ключи.", ["I", "am", "looking", "for", "my", "keys"], "I am looking for my keys", "Искать: look for."),
      Ch("He ___ football last year. (бросил)", ["gave up", "gave in", "gave out"], 0, "Бросить: give up."),
      Ch("Can you ___ my cat while I'm away? (присмотреть)", ["look for", "look after", "look out"], 1, "Заботиться, присматривать: look after."),
      Ch("We have ___ milk. (закончилось)", ["run out of", "run out", "got over"], 0, "Закончилось что-то: run out of."),
      Ch("It's cold. ___ your jacket.", ["Put on", "Take off", "Put off"], 0, "Надеть: put on."),
      I("I want to ___ what happened. (узнать, 2 слова)", ["find out"], "Узнать: find out."),
      I("Переведите: Не откладывай это на завтра.", ["Don't put it off until tomorrow", "Don't put it off till tomorrow", "Don't put this off until tomorrow", "Don't put this off till tomorrow"], "Откладывать: put off, it в середину."),
      F("Исправьте: Please turn off it.", ["Please turn it off"], "it ставим между turn и off.")
    ]
  };

  const T = (window.TRAINER = window.TRAINER || {});

  T[28] = [
    ["Здесь говорят по-английски.", "English is spoken here", "is + spoken"],
    ["Этот дом построили в 1990 году.", "This house was built in 1990|The house was built in 1990", "was + built"],
    ["Мой телефон украли.", "My phone has been stolen|My phone was stolen", "has been stolen"],
    ["Я родился в 2010 году.", "I was born in 2010", "was born"],
    ["Эти машины делают в Японии.", "These cars are made in Japan", "are + made"],
    ["Книга была написана Толстым.", "The book was written by Tolstoy", "Кем: by"],
    ["Результаты объявят завтра.", "The results will be announced tomorrow", "will be + 3-я форма"],
    ["Это нужно сделать сегодня.", "It must be done today|This must be done today|It has to be done today|This has to be done today|It needs to be done today|This needs to be done today", "must be done"],
    ["Окно разбили вчера.", "The window was broken yesterday", "was + broken"],
    ["Меня пригласили на вечеринку.", "I was invited to the party|I was invited to a party|I have been invited to the party|I have been invited to a party", "was invited"],
    ["Комнату убирают каждый день.", "The room is cleaned every day", "is + cleaned"],
    ["Где снимали этот фильм?", "Where was this film made|Where was this movie made|Where was this film shot|Where was this movie shot|Where was the film made|Where was the movie made", "Where was ... made"]
  ];

  T[29] = [
    ["Он сказал, что устал.", "He said that he was tired|He said he was tired", "am → was"],
    ["Она сказала, что любит кошек.", "She said that she liked cats|She said she liked cats|She said that she loved cats|She said she loved cats", "like → liked"],
    ["Он сказал, что позвонит.", "He said that he would call|He said he would call|He said he would phone|He said that he would phone", "will → would"],
    ["Она сказала мне, что занята.", "She told me that she was busy|She told me she was busy", "told me"],
    ["Он спросил, могу ли я помочь.", "He asked if I could help|He asked whether I could help|He asked if I could help him|He asked whether I could help him|He asked me if I could help|He asked me if I could help him", "asked if"],
    ["Она спросила, где я живу.", "She asked where I lived|She asked me where I lived", "Прямой порядок"],
    ["Вы не знаете, где вокзал?", "Do you know where the station is|Do you know where the railway station is|Do you know where the train station is", "where the station is"],
    ["Не подскажете, который час?", "Can you tell me what time it is|Could you tell me what time it is", "what time it is"],
    ["Он сказал, что видел этот фильм.", "He said that he had seen this film|He said he had seen this film|He said that he had seen the film|He said he had seen the film|He said that he had seen this movie|He said he had seen this movie|He said he had seen the movie", "saw → had seen"],
    ["Я спросил его, сколько ему лет.", "I asked him how old he was", "how old he was"],
    ["Она сказала, что не может прийти.", "She said that she couldn't come|She said she couldn't come|She said that she could not come|She said she could not come", "can → could"],
    ["Я не знаю, где он работает.", "I don't know where he works|I do not know where he works", "where he works"]
  ];

  T[30] = [
    ["Мужчина, который живёт по соседству, врач.", "The man who lives next door is a doctor|The man that lives next door is a doctor", "who о людях"],
    ["Телефон, который я купил, отличный.", "The phone which I bought is great|The phone that I bought is great|The phone I bought is great", "which о вещах"],
    ["Это город, где я родился.", "This is the city where I was born|This is the town where I was born", "where о месте"],
    ["У меня есть друг, чей папа пилот.", "I have a friend whose dad is a pilot|I have a friend whose father is a pilot|I've got a friend whose dad is a pilot|I have got a friend whose dad is a pilot", "чей: whose"],
    ["Фильм, который мы смотрели, был скучным.", "The film that we watched was boring|The film which we watched was boring|The film we watched was boring|The movie that we watched was boring|The movie which we watched was boring|The movie we watched was boring", "that можно убрать"],
    ["Я знаю девочку, которая говорит по-французски.", "I know a girl who speaks French|I know a girl that speaks French|I know the girl who speaks French|I know the girl that speaks French", "who о людях"],
    ["Это книга, которую мне дала мама.", "This is the book that my mom gave me|This is the book which my mom gave me|This is the book my mom gave me|This is the book that my mother gave me|This is the book which my mother gave me|This is the book my mother gave me", "that / which"],
    ["Мой брат, который живёт в Казани, учитель.", "My brother, who lives in Kazan, is a teacher", "С запятыми: who"],
    ["Это кафе, где мы познакомились.", "This is the cafe where we met|This is the café where we met", "where о месте"],
    ["Учитель, который нам помог, очень добрый.", "The teacher who helped us is very kind|The teacher that helped us is very kind", "who о людях"],
    ["Это мальчик, чей велосипед украли.", "This is the boy whose bike was stolen|This is the boy whose bicycle was stolen|This is the boy whose bike has been stolen", "whose"],
    ["Мне нравятся люди, которые много читают.", "I like people who read a lot|I like people that read a lot", "who о людях"]
  ];

  T[31] = [
    ["Он, наверное, устал.", "He must be tired", "must be"],
    ["Она, может быть, дома.", "She might be at home|She may be at home|She could be at home|She might be home|She may be home|She could be home|Maybe she is at home|Maybe she is home", "might be"],
    ["Это не может быть правдой.", "It can't be true|It cannot be true|That can't be true|That cannot be true|This can't be true|This cannot be true", "can't be"],
    ["Ты, должно быть, голоден.", "You must be hungry", "must be"],
    ["Он, наверное, спит.", "He must be sleeping|He must be asleep", "must be + -ing"],
    ["Она, возможно, забыла.", "She might have forgotten|She may have forgotten|She could have forgotten|Maybe she forgot|Maybe she has forgotten", "might have + 3-я форма"],
    ["Он не мог этого сделать.", "He can't have done it|He cannot have done it|He couldn't have done it|He could not have done it|He can't have done that|He cannot have done that|He couldn't have done that|He could not have done that", "can't have done"],
    ["Тебе надо было учиться.", "You should have studied", "should have + 3-я форма"],
    ["Они, наверное, уже дома.", "They must be at home already|They must be home already|They must already be at home|They must already be home", "must be"],
    ["Возможно, это его телефон.", "It might be his phone|It may be his phone|It could be his phone|This might be his phone|This may be his phone|This could be his phone|Maybe it is his phone|Maybe this is his phone", "might be"],
    ["Она, наверное, была очень рада.", "She must have been very happy|She must have been very glad|She must have been really happy", "must have been"],
    ["Мне надо было позвонить тебе.", "I should have called you|I should have phoned you", "should have called"]
  ];

  T[32] = [
    ["Я люблю читать.", "I like reading|I like to read|I love reading|I love to read|I enjoy reading", "like + -ing / to"],
    ["Я хочу учиться в США.", "I want to study in the USA|I want to study in the US|I want to study in America|I want to study in the United States", "want to"],
    ["Перестань разговаривать!", "Stop talking", "stop + -ing"],
    ["Он решил остаться дома.", "He decided to stay at home|He decided to stay home", "decide to"],
    ["Я закончил делать уроки.", "I finished doing my homework|I have finished doing my homework", "finish + -ing"],
    ["Спасибо, что помог мне.", "Thank you for helping me|Thanks for helping me", "for + -ing"],
    ["Я хорошо рисую.", "I'm good at drawing|I am good at drawing|I draw well|I can draw well", "good at + -ing"],
    ["Английский легко учить.", "English is easy to learn|It is easy to learn English|It's easy to learn English", "easy to"],
    ["Я бы хотел пойти в кино.", "I would like to go to the cinema|I'd like to go to the cinema|I would like to go to the movies|I'd like to go to the movies", "would like to"],
    ["Мама разрешила мне пойти.", "Mom let me go|My mom let me go|My mother let me go|Mom allowed me to go|My mom allowed me to go|My mother allowed me to go", "let + без to"],
    ["Ты не против открыть окно?", "Do you mind opening the window|Would you mind opening the window", "mind + -ing"],
    ["Мы планируем поехать в Сочи.", "We plan to go to Sochi|We are planning to go to Sochi|We plan to travel to Sochi|We are planning to travel to Sochi", "plan to"]
  ];

  T[33] = [
    ["Холодно, правда?", "It's cold, isn't it|It is cold, isn't it", "isn't it"],
    ["Ты любишь пиццу, да?", "You like pizza, don't you|You love pizza, don't you", "don't you"],
    ["Она умеет плавать, правда?", "She can swim, can't she", "can't she"],
    ["Они не пришли, да?", "They didn't come, did they|They did not come, did they|They haven't come, have they", "did they"],
    ["Я прав, не так ли?", "I'm right, aren't I|I am right, aren't I", "aren't I"],
    ["Ты устал, да?", "You are tired, aren't you|You're tired, aren't you", "aren't you"],
    ["Он не говорит по-английски, да?", "He doesn't speak English, does he|He does not speak English, does he", "does he"],
    ["Мы опаздываем, да?", "We are late, aren't we|We're late, aren't we", "aren't we"],
    ["Ты мне позвонишь, да?", "You will call me, won't you|You'll call me, won't you|You will phone me, won't you|You'll phone me, won't you", "won't you"],
    ["Фильм был хороший, правда?", "The film was good, wasn't it|The movie was good, wasn't it|The film was great, wasn't it|The movie was great, wasn't it", "wasn't it"],
    ["Твоей сестры нет дома, да?", "Your sister isn't at home, is she|Your sister is not at home, is she|Your sister isn't home, is she|Your sister is not home, is she", "is she"],
    ["Пойдём гулять, ладно?", "Let's go for a walk, shall we|Let's go out, shall we", "shall we"]
  ];

  T[34] = [
    ["Каждый ученик знает правило.", "Every student knows the rule|Each student knows the rule|Every pupil knows the rule|Each pupil knows the rule", "every + knows"],
    ["Оба моих брата живут в Москве.", "Both my brothers live in Moscow|Both of my brothers live in Moscow", "both"],
    ["Все мои друзья пришли.", "All my friends came|All of my friends came", "all (of)"],
    ["Никто из них не позвонил.", "None of them called|None of them phoned", "none of"],
    ["Я тоже не люблю кофе.", "I don't like coffee either|I do not like coffee either", "either"],
    ["Ни один из двух ответов не верный.", "Neither answer is correct|Neither answer is right|Neither of the answers is correct|Neither of the answers is right|Neither of the two answers is correct", "neither"],
    ["Можешь взять любую из двух книг.", "You can take either book|You can take either of the books|You can take either of the two books", "either"],
    ["Пришло мало людей.", "Few people came|Not many people came|Very few people came", "few"],
    ["У меня есть несколько друзей в Лондоне.", "I have a few friends in London|I've got a few friends in London|I have got a few friends in London|I have some friends in London", "a few"],
    ["Каждый из них получил приз.", "Each of them got a prize|Each of them received a prize|Each of them won a prize", "each of"],
    ["У нас мало времени.", "We have little time|We don't have much time|We do not have much time|We haven't got much time|We have not got much time", "little"],
    ["Обе сестры говорят по-английски.", "Both sisters speak English|Both of the sisters speak English|Both the sisters speak English", "both"]
  ];

  T[35] = [
    ["По-моему, это хорошая идея.", "In my opinion it is a good idea|In my opinion this is a good idea|In my opinion it's a good idea|I think it is a good idea|I think this is a good idea|I think it's a good idea", "in my opinion"],
    ["Несмотря на дождь, мы пошли гулять.", "Despite the rain we went for a walk|In spite of the rain we went for a walk|Despite the rain we went out|In spite of the rain we went out", "despite + сущ."],
    ["Хотя было холодно, мы пошли купаться.", "Although it was cold we went swimming|Though it was cold we went swimming|Even though it was cold we went swimming", "although"],
    ["Кроме того, это дёшево.", "Moreover it is cheap|In addition it is cheap|Furthermore it is cheap|What's more it is cheap|Besides it is cheap|Also it is cheap", "moreover"],
    ["Однако это очень дорого.", "However it is very expensive|However this is very expensive", "however"],
    ["Мы остались дома из-за дождя.", "We stayed at home because of the rain|We stayed home because of the rain|We stayed at home due to the rain|We stayed home due to the rain", "because of"],
    ["Я много учился, поэтому сдал экзамен.", "I studied a lot so I passed the exam|I studied hard so I passed the exam|I studied a lot therefore I passed the exam|I studied hard therefore I passed the exam|I studied a lot that's why I passed the exam|I studied hard that's why I passed the exam", "so / therefore"],
    ["Например, я люблю читать.", "For example I like reading|For instance I like reading|For example I like to read|For instance I like to read|For example I love reading|For example I love to read", "for example"],
    ["В заключение, интернет очень полезен.", "In conclusion the internet is very useful|To sum up the internet is very useful", "in conclusion"],
    ["Лично я считаю, что спорт важен.", "Personally I think that sport is important|Personally I think sport is important|Personally I believe that sport is important|Personally I believe sport is important|Personally I think sports are important|Personally I think that sports are important", "personally"],
    ["Мой брат любит футбол, тогда как я люблю теннис.", "My brother likes football whereas I like tennis|My brother loves football whereas I love tennis|My brother likes football while I like tennis|My brother loves football while I love tennis", "whereas"],
    ["В результате мы опоздали.", "As a result we were late", "as a result"]
  ];

  T[36] = [
    ["Я встаю в семь.", "I get up at seven|I get up at seven o'clock", "get up"],
    ["Надень куртку.", "Put on your jacket|Put your jacket on|Put on a jacket|Put a jacket on", "put on"],
    ["Выключи свет.", "Turn off the light|Turn the light off|Switch off the light|Switch the light off", "turn off"],
    ["Я ищу свой телефон.", "I am looking for my phone|I'm looking for my phone", "look for"],
    ["Она присматривает за младшим братом.", "She looks after her little brother|She looks after her younger brother|She is looking after her little brother|She is looking after her younger brother|She takes care of her little brother|She takes care of her younger brother", "look after"],
    ["Я хочу узнать правду.", "I want to find out the truth|I want to know the truth", "find out"],
    ["Не сдавайся!", "Don't give up|Do not give up", "give up"],
    ["Он вернулся домой поздно.", "He came back home late|He came home late|He got back home late|He got home late|He came back late", "come back"],
    ["У нас закончился хлеб.", "We have run out of bread|We've run out of bread|We ran out of bread|We are out of bread", "run out of"],
    ["Я начал заниматься плаванием.", "I took up swimming|I have taken up swimming|I started swimming|I have started swimming", "take up"],
    ["Сними обувь.", "Take off your shoes|Take your shoes off", "take off"],
    ["Я тренируюсь три раза в неделю.", "I work out three times a week|I train three times a week", "work out"]
  ];
})();
