/* Пошаговые объяснения и практика: уроки 1-9 */
(function () {
  const P = (window.GRAMMAR_PLUS = window.GRAMMAR_PLUS || {});
  const S = (h, t, ex) => ({ h, t, ex: ex || [] });
  const O = (q, words, a, why) => ({ k: "order", q, words, a, why });
  const Ch = (q, o, a, why) => ({ k: "choice", q, o, a, why });
  const I = (q, a, why) => ({ k: "input", q, a, why });
  const F = (q, a, why) => ({ k: "fix", q, a, why });

  P[1] = {
    steps: [
      S("Шаг 1. Найдите, КТО делает", "В обычном английском предложении сначала называем того, кто действует: I, you, my brother, the dog. Пропускать это слово нельзя (кроме просьб и команд: Sit down! Help me!).", [["I ...", "Я ..."], ["My mom ...", "Моя мама ..."]]),
      S("Шаг 2. Сразу после него ставьте ДЕЙСТВИЕ", "Глагол идёт сразу за «кто». Между ними могут встать только помощник (don't) и короткие слова частоты: always, usually, often, never (I usually walk). Остальное, например every day, туда не ставим.", [["I play ...", "Я играю ..."], ["My mom works ...", "Моя мама работает ..."]]),
      S("Шаг 3. Потом ЧТО или КОГО", "Третьим идёт предмет действия: во что играю, что люблю, кого вижу.", [["I play football.", "Я играю в футбол."], ["I like music.", "Я люблю музыку."]]),
      S("Шаг 4. В конце ГДЕ и КОГДА", "Место, потом время. Время можно поставить и в самое начало.", [["I play football in the park on Sundays.", "Я играю в футбол в парке по воскресеньям."], ["Yesterday we watched a film.", "Вчера мы смотрели фильм."]]),
      S("Шаг 5. Если «кто» нет, ставьте it", "По-русски «Холодно», «Идёт дождь» без подлежащего. По-английски так нельзя: ставим пустое it.", [["It is cold.", "Холодно."], ["It is late.", "Поздно."]])
    ],
    tasks: [
      O("Соберите: Я люблю музыку.", ["music", "I", "like"], "I like music", "Кто (I) + делает (like) + что (music)."),
      O("Соберите: Мы живём в Москве.", ["Moscow", "live", "in", "we"], "We live in Moscow", "Кто (we) + делает (live) + где (in Moscow)."),
      O("Соберите: Они играют в футбол по воскресеньям.", ["on Sundays", "play", "they", "football"], "They play football on Sundays", "Кто, делает, что, а время в конце."),
      Ch("Как правильно?", ["Football I like.", "I like football.", "I football like."], 1, "Сначала кто, сразу за ним действие, потом что."),
      Ch("Как сказать «Холодно»?", ["Is cold.", "Cold.", "It is cold."], 2, "В английском всегда есть «кто». Если его нет, ставим it."),
      Ch("Где правильный порядок?", ["I go to school every day.", "I every day go to school.", "Every day go I to school."], 0, "Время (every day) ставим в конец или в самое начало, но не между «кто» и глаголом."),
      F("Исправьте: My dad in a bank works.", ["My dad works in a bank"], "Глагол (works) идёт сразу после «кто» (my dad), а место в конце."),
      F("Исправьте: Is late.", ["It is late", "It's late"], "Нет «кто»: добавляем it."),
      I("Переведите: Я люблю пиццу.", ["I like pizza", "I love pizza"], "I + like + pizza."),
      I("Переведите: Сегодня тепло.", ["It is warm today", "It's warm today", "Today it is warm", "Today it's warm"], "Нет «кто», поэтому it. Время today в конце или в начале.")
    ]
  };

  P[2] = {
    steps: [
      S("Шаг 1. Есть ли в предложении действие?", "Если человек что-то делает (играет, работает, идёт), to be НЕ нужен. Если действия нет, а мы говорим, кто он, какой он или где он, нужен to be.", [["I am a student.", "Я студент. (действия нет)"], ["I study.", "Я учусь. (действие есть, am не нужен)"]]),
      S("Шаг 2. Выберите am, is или are", "I всегда с am. He, she, it и один человек или предмет с is. You, we, they и много людей с are.", [["I am tired.", "Я устал."], ["My sister is 12.", "Моей сестре 12."], ["They are at home.", "Они дома."]]),
      S("Шаг 3. Отрицание: добавьте not", "Not ставим сразу после am / is / are. Сокращения: isn't, aren't.", [["I am not hungry.", "Я не голоден."], ["She isn't at school.", "Её нет в школе."]]),
      S("Шаг 4. Вопрос: поменяйте местами", "Am / is / are выходит вперёд, перед «кто».", [["You are tired. → Are you tired?", "Ты устал?"], ["She is at home. → Is she at home?", "Она дома?"]]),
      S("Шаг 5. Прошлое: was и were", "I, he, she, it: was. You, we, they: were.", [["I was at home yesterday.", "Вчера я был дома."], ["We were friends.", "Мы были друзьями."]])
    ],
    tasks: [
      Ch("I ___ a student.", ["am", "is", "are"], 0, "С I всегда am."),
      Ch("My parents ___ at work.", ["is", "am", "are"], 2, "My parents = они, значит are."),
      Ch("It ___ cold today.", ["are", "is", "am"], 1, "It (оно) идёт с is."),
      I("She ___ my sister. (вставьте одно слово)", ["is"], "She = она, значит is."),
      I("We ___ not tired. (вставьте одно слово)", ["are"], "We = мы, значит are."),
      F("Исправьте: She is go to school.", ["She goes to school", "She is going to school", "She's going to school"], "Есть действие go, значит is не нужен. С she глагол получает -s: goes. (She is going to school тоже верно, но это уже другое время: «идёт сейчас».)"),
      F("Исправьте: I student.", ["I am a student", "I'm a student"], "Действия нет, значит нужен am. И перед профессией или ролью ставим a."),
      I("Сделайте вопрос: They are at school.", ["Are they at school"], "Are выходит вперёд: Are they ...?"),
      I("Переведите: Он был дома вчера.", ["He was at home yesterday", "Yesterday he was at home"], "Прошлое от is: was. «Дома» = at home."),
      Ch("Где ошибка?", ["You are my friend.", "They is happy.", "I am 16."], 1, "They = они, нужно are: They are happy.")
    ]
  };

  P[3] = {
    steps: [
      S("Шаг 1. Когда это время?", "Present Simple говорит о том, что бывает обычно, регулярно, всегда. Слова-подсказки: every day, usually, often, always, never, on Sundays.", [["I play football every Sunday.", "Я играю в футбол каждое воскресенье."]]),
      S("Шаг 2. Глагол как в словаре", "Для I, you, we, they и многих людей глагол без изменений.", [["I work.", "Я работаю."], ["My parents live in Moscow.", "Мои родители живут в Москве."]]),
      S("Шаг 3. Он, она, оно: добавьте -s", "Если делает he, she, it или один человек, предмет, животное, глагол получает -s. После s, sh, ch, x, o: -es. Согласная + y: -ies. have → has.", [["She works.", "Она работает."], ["He watches TV.", "Он смотрит ТВ."], ["She studies.", "Она учится."]]),
      S("Шаг 4. Отрицание: don't / doesn't + глагол без -s", "I, you, we, they: don't. He, she, it: doesn't, и тогда -s у глагола пропадает.", [["I don't like fish.", "Я не люблю рыбу."], ["She doesn't like fish.", "Она не любит рыбу."]]),
      S("Шаг 5. Вопрос: Do / Does в начале", "Do или Does ставим перед «кто». После Does глагол без -s.", [["Do you play football?", "Ты играешь в футбол?"], ["Does she work?", "Она работает?"]])
    ],
    tasks: [
      Ch("My brother ___ football.", ["play", "plays", "playing"], 1, "My brother = он, добавляем -s."),
      Ch("They ___ in London.", ["live", "lives", "living"], 0, "They = они, глагол без изменений."),
      I("She ___ (study) English every day.", ["studies"], "Согласная + y: study → studies."),
      I("He ___ (watch) TV in the evening.", ["watches"], "После ch добавляем -es."),
      I("I ___ (not / like) coffee.", ["don't like", "do not like"], "I + don't + глагол."),
      I("My mom ___ (not / work) on Sundays.", ["doesn't work", "does not work"], "My mom = она: doesn't + work без -s."),
      Ch("___ you speak English?", ["Do", "Does", "Are"], 0, "Вопрос с you: Do."),
      F("Исправьте: She doesn't works.", ["She doesn't work", "She does not work"], "После doesn't глагол без -s."),
      F("Исправьте: My parents works in a bank.", ["My parents work in a bank"], "My parents = они, поэтому без -s."),
      I("Переведите: Он обычно встаёт в 7.", ["He usually gets up at 7", "He usually gets up at seven"], "He: get → gets. Usually ставим перед глаголом.")
    ]
  };

  P[4] = {
    steps: [
      S("Шаг 1. Возьмите обычное предложение", "Например: You live in Moscow. Вопрос делаем из него.", [["You live in Moscow.", "Ты живёшь в Москве."]]),
      S("Шаг 2. Поставьте помощника в начало", "Настоящее (обычно, регулярно): do / does. Прошлое: did. Если в предложении am / is / are или can, они сами выходят вперёд.", [["Do you live in Moscow?", "Ты живёшь в Москве?"], ["Is she at home?", "Она дома?"]]),
      S("Шаг 3. Нужен вопрос с «где, когда, что»?", "Вопросительное слово ставим самым первым, перед помощником.", [["Where do you live?", "Где ты живёшь?"], ["What does she like?", "Что ей нравится?"], ["When did they come?", "Когда они пришли?"]]),
      S("Шаг 4. Запомните главные вопросительные слова", "who кто, what что, where где / куда, when когда, why почему, how как, which который, whose чей, how old сколько лет, how many сколько (штук), how much сколько (денег, воды).", [["How old are you?", "Сколько тебе лет?"], ["How much is it?", "Сколько это стоит?"]])
    ],
    tasks: [
      Ch("___ do you live? (где)", ["What", "Where", "When"], 1, "Где = where."),
      Ch("___ is your sister? (сколько лет)", ["How many", "How old", "How much"], 1, "Возраст: how old."),
      O("Соберите: Где ты живёшь?", ["live", "you", "do", "where"], "Where do you live", "Вопросительное слово, помощник do, кто, глагол."),
      O("Соберите: Что ей нравится?", ["does", "like", "what", "she"], "What does she like", "Она: помощник does, глагол like без -s."),
      I("Переведите: Где он работает?", ["Where does he work"], "He: does. После does глагол без -s."),
      I("Переведите: Что ты делал вчера?", ["What did you do yesterday", "What were you doing yesterday"], "Прошлое: did, глагол в обычной форме do."),
      F("Исправьте: Where you live?", ["Where do you live"], "Не хватает помощника do."),
      F("Исправьте: What she likes?", ["What does she like"], "Нужен does, и у глагола пропадает -s."),
      Ch("Как спросить «Почему ты грустный?»", ["Why you are sad?", "Why are you sad?", "Why do you sad?"], 1, "С to be помощник не нужен: are выходит вперёд."),
      I("Переведите: Сколько стоит этот телефон?", ["How much is this phone", "How much does this phone cost"], "Цена: how much. Is this phone или does this phone cost.")
    ]
  };

  P[5] = {
    steps: [
      S("Шаг 1. Один предмет, впервые: a / an", "Когда говорим о чём-то одном и не важно, о каком именно. An ставим перед гласным ЗВУКОМ, а не буквой: an apple, an hour (h не читается), но a university (звучит [ju]).", [["I have a dog.", "У меня есть собака."], ["an apple, an hour", "яблоко, час"]]),
      S("Шаг 2. Тот самый, понятно какой: the", "Уже говорили о нём, или он один такой в мире, или понятно из ситуации.", [["The dog is black.", "Эта собака чёрная. (та, о которой говорили)"], ["the sun, the world", "солнце, мир"]]),
      S("Шаг 3. Когда артикль не нужен", "Много штук вообще, вещества (water, money), имена, города, большинство стран (но the USA, the UK), языки, спорт, школьные предметы, еда вообще.", [["I like cats.", "Я люблю кошек."], ["I play football.", "Я играю в футбол."], ["I speak English.", "Я говорю по-английски."]]),
      S("Шаг 4. Кто вы и кем работаете: a / an", "Профессия или роль одного человека всегда с a / an.", [["I am a student.", "Я ученик."], ["She is an engineer.", "Она инженер."]])
    ],
    tasks: [
      Ch("I have ___ brother.", ["a", "an", "the"], 0, "Один, впервые упоминаем: a."),
      Ch("She eats ___ apple every day.", ["a", "an", "-"], 1, "Apple начинается с гласного звука: an."),
      Ch("___ sun is hot.", ["A", "The", "-"], 1, "Солнце одно в мире: the."),
      Ch("I play ___ football.", ["the", "a", "без артикля"], 2, "Спорт без артикля."),
      Ch("I like ___ music.", ["a", "the", "без артикля"], 2, "Музыка вообще: без артикля."),
      I("My dad is ___ doctor. (вставьте артикль)", ["a"], "Профессия одного человека: a."),
      I("I need ___ hour. (вставьте артикль)", ["an"], "Hour звучит [ауэр], с гласного звука: an."),
      F("Исправьте: I am student.", ["I am a student", "I'm a student"], "Роль одного человека: a student."),
      F("Исправьте: I speak the English.", ["I speak English"], "Языки без артикля."),
      I("Переведите: У меня есть кошка. Кошка белая.", ["I have a cat. The cat is white", "I have got a cat. The cat is white"], "Впервые: a cat. Потом это уже та самая кошка: the cat.")
    ]
  };

  P[6] = {
    steps: [
      S("Шаг 1. Кто делает: I, you, he, she, it, we, they", "Эти слова стоят в начале, перед глаголом.", [["I love music.", "Я люблю музыку."], ["They live here.", "Они живут здесь."]]),
      S("Шаг 2. Кого, кому: me, you, him, her, it, us, them", "После глагола или предлога: help me, with us, for them.", [["Help me!", "Помоги мне!"], ["I know him.", "Я знаю его."]]),
      S("Шаг 3. Чей (+ слово): my, your, his, her, its, our, their", "Ставим перед предметом.", [["my phone", "мой телефон"], ["their house", "их дом"]]),
      S("Шаг 4. Чей (без слова): mine, yours, his, hers, ours, theirs", "Когда предмет уже назван, слово после не нужно.", [["This phone is mine.", "Этот телефон мой."], ["Is this bag yours?", "Эта сумка твоя?"]]),
      S("Шаг 5. Этот / тот", "this (этот, рядом), these (эти); that (тот, далеко), those (те).", [["This book is good.", "Эта книга хорошая."], ["Those people are tourists.", "Те люди туристы."]])
    ],
    tasks: [
      Ch("___ like football.", ["Me", "I", "My"], 1, "Кто делает: I."),
      Ch("Can you help ___?", ["I", "my", "me"], 2, "Кому помочь: me."),
      Ch("This is ___ bag. (её)", ["her", "she", "hers"], 0, "Чей + слово (bag): her."),
      Ch("The bag is ___. (её)", ["her", "hers", "she"], 1, "Чей без слова: hers."),
      I("I know ___. (их)", ["them"], "Кого: them."),
      I("These books are ___. (наши, без слова после)", ["ours"], "Без слова после: ours."),
      I("We love ___ dog. (наш)", ["our"], "Чей + слово: our."),
      F("Исправьте: Me like it.", ["I like it"], "Кто делает: I, а не me."),
      F("Исправьте: This is my.", ["This is mine"], "Без слова после: mine."),
      Ch("___ shoes are new. (эти)", ["This", "These", "That"], 1, "Много предметов рядом: these.")
    ]
  };

  P[7] = {
    steps: [
      S("Шаг 1. Много штук: добавьте -s", "book → books. После s, sh, ch, x: -es (box → boxes). Согласная + y: -ies (city → cities).", [["two books", "две книги"], ["three cities", "три города"]]),
      S("Шаг 2. Выучите особые слова", "man → men, woman → women, child → children, person → people, foot → feet, tooth → teeth.", [["two children", "двое детей"], ["many people", "много людей"]]),
      S("Шаг 3. Что нельзя посчитать", "water, milk, money, bread, music, information, advice, homework, news. У них нет -s и нет a.", [["I need money.", "Мне нужны деньги."], ["I have homework.", "У меня есть домашка."]]),
      S("Шаг 4. Много: many или much", "Считаем (books): many. Не считаем (water): much. Much обычно бывает в вопросах и с not. В утверждении проще сказать a lot of: он подходит и к тем, и к другим.", [["How many books?", "Сколько книг?"], ["How much water?", "Сколько воды?"]]),
      S("Шаг 5. some и any", "some в утверждении, any в отрицании и вопросе. Но в просьбах и предложениях тоже some: Can I have some water? Would you like some tea?", [["I have some money.", "У меня есть немного денег."], ["Do you have any questions?", "У вас есть вопросы?"]])
    ],
    tasks: [
      I("three ___ (person)", ["people"], "person → people."),
      I("two ___ (child)", ["children"], "child → children."),
      I("five ___ (box)", ["boxes"], "После x добавляем -es."),
      Ch("How ___ money do you have?", ["many", "much"], 1, "Деньги не считаем: much."),
      Ch("How ___ friends do you have?", ["many", "much"], 0, "Друзей считаем: many."),
      Ch("I don't have ___ questions.", ["some", "any"], 1, "Отрицание: any."),
      Ch("I'd like ___ water, please.", ["some", "any"], 0, "Утверждение, просьба: some."),
      F("Исправьте: I need a money.", ["I need money", "I need some money"], "Money не считается: без a."),
      F("Исправьте: two childs", ["two children"], "Особое слово: children."),
      I("Переведите: У меня много домашки.", ["I have a lot of homework", "I have lots of homework"], "Homework не считается: a lot of homework (much в утверждении звучит неестественно).")
    ]
  };

  P[8] = {
    steps: [
      S("Шаг 1. Когда нужно there is / there are", "Когда говорим, что где-то что-то ЕСТЬ, находится. По-русски начинаем с места, а по-английски с there is.", [["There is a cat in the room.", "В комнате есть кошка."]]),
      S("Шаг 2. Одна вещь: is, много: are", "Смотрим на первое существительное после there.", [["There is a bank near here.", "Рядом есть банк."], ["There are two cats in the garden.", "В саду две кошки."]]),
      S("Шаг 3. Место в конец", "Сначала there is / are, потом что, а где в конце.", [["There are 25 students in my class.", "В моём классе 25 учеников."]]),
      S("Шаг 4. Нет и есть ли?", "Отрицание: there isn't / there aren't. Вопрос: Is there ...? / Are there ...?", [["There isn't a shop here.", "Здесь нет магазина."], ["Is there a pharmacy near here?", "Здесь рядом есть аптека?"]]),
      S("Шаг 5. Было: there was / there were", "Одна вещь: there was. Много: there were.", [["There was a party yesterday.", "Вчера была вечеринка."]])
    ],
    tasks: [
      Ch("___ a supermarket near my house.", ["There is", "There are", "It is"], 0, "Один магазин: there is."),
      Ch("___ 25 students in my class.", ["There is", "There are"], 1, "Много учеников: there are."),
      O("Соберите: В комнате есть кошка.", ["a cat", "there is", "in the room"], "There is a cat in the room", "There is + что + где."),
      I("Переведите: Здесь есть аптека? (pharmacy)", ["Is there a pharmacy here", "Is there a pharmacy near here", "Is there a pharmacy around here"], "Вопрос: Is there ...?"),
      I("Переведите: На столе две книги.", ["There are two books on the table"], "Много книг: there are. На столе: on the table."),
      F("Исправьте: In the room is a cat.", ["There is a cat in the room"], "Начинаем с there is, место в конец."),
      F("Исправьте: There is many people here.", ["There are many people here", "There are a lot of people here"], "People = много людей: there are."),
      Ch("___ a party yesterday.", ["There is", "There was", "There were"], 1, "Прошлое, одна вечеринка: there was."),
      I("Здесь нет магазинов: There ___ any shops here.", ["aren't", "are not"], "Много, отрицание: there aren't."),
      Ch("Как сказать «В Москве много парков»?", ["Moscow has many parks.", "There are many parks in Moscow.", "Оба варианта верны"], 2, "Можно и через there are, и через has.")
    ]
  };

  P[9] = {
    steps: [
      S("Шаг 1. «У меня есть» = «я имею»", "По-английски не «у меня», а «я имею»: I have. Можно и I have got (I've got), это больше британский вариант.", [["I have a sister.", "У меня есть сестра."], ["We have a car.", "У нас есть машина."]]),
      S("Шаг 2. He, she, it: has", "Как в Present Simple: он, она, оно получают особую форму has.", [["She has a dog.", "У неё есть собака."], ["My friend has a new phone.", "У моего друга новый телефон."]]),
      S("Шаг 3. Нет: don't have / doesn't have", "После doesn't снова have, не has.", [["I don't have a laptop.", "У меня нет ноутбука."], ["He doesn't have a car.", "У него нет машины."]]),
      S("Шаг 4. Вопрос: Do / Does ... have?", "", [["Do you have any brothers?", "У тебя есть братья?"], ["Does she have a cat?", "У неё есть кошка?"]]),
      S("Шаг 5. have = действие", "have breakfast (завтракать), have a shower (принять душ), have fun (веселиться).", [["I have breakfast at 8.", "Я завтракаю в 8."]])
    ],
    tasks: [
      Ch("My friend ___ a new phone.", ["have", "has"], 1, "My friend = он: has."),
      Ch("I ___ two brothers.", ["have", "has"], 0, "I: have."),
      I("I ___ have a laptop. (не)", ["don't", "do not"], "I: don't have."),
      I("She ___ have a car. (не)", ["doesn't", "does not"], "She: doesn't have."),
      Ch("___ you have any pets?", ["Do", "Does", "Are"], 0, "You: Do."),
      F("Исправьте: She have a dog.", ["She has a dog", "She has got a dog"], "She: has."),
      F("Исправьте: He doesn't has a car.", ["He doesn't have a car", "He does not have a car", "He hasn't got a car"], "После doesn't: have."),
      I("Переведите: У неё есть кошка.", ["She has a cat", "She has got a cat"], "У неё = она имеет: she has."),
      I("Переведите: У нас нет машины.", ["We don't have a car", "We do not have a car", "We haven't got a car"], "We: don't have."),
      Ch("Что значит «I have breakfast at 8»?", ["У меня есть завтрак в 8", "Я завтракаю в 8", "Я готовлю завтрак в 8"], 1, "have breakfast = завтракать.")
    ]
  };
})();
