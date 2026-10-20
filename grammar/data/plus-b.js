/* Пошаговые объяснения и практика: уроки 10-18 */
(function () {
  const P = (window.GRAMMAR_PLUS = window.GRAMMAR_PLUS || {});
  const S = (h, t, ex) => ({ h, t, ex: ex || [] });
  const O = (q, words, a, why) => ({ k: "order", q, words, a, why });
  const Ch = (q, o, a, why) => ({ k: "choice", q, o, a, why });
  const I = (q, a, why) => ({ k: "input", q, a, why });
  const F = (q, a, why) => ({ k: "fix", q, a, why });

  P[10] = {
    steps: [
      S("Шаг 1. can + глагол = могу, умею", "После can глагол в обычной форме: без to и без -s. Can одинаковый для всех.", [["I can swim.", "Я умею плавать."], ["She can speak English.", "Она говорит по-английски."]]),
      S("Шаг 2. Не могу: can't", "can't = cannot.", [["I can't drive.", "Я не умею водить."]]),
      S("Шаг 3. Вопрос: Can в начало", "", [["Can you help me?", "Можешь помочь?"], ["Can I open the window?", "Можно открыть окно?"]]),
      S("Шаг 4. Прошлое и вежливость: could", "Could = мог, умел. Could you ...? = Не могли бы вы ...?", [["I could swim at 5.", "Я умел плавать в 5 лет."], ["Could you help me?", "Не могли бы вы помочь?"]])
    ],
    tasks: [
      Ch("She ___ dance.", ["cans", "can", "can to"], 1, "Can не меняется и без to."),
      I("My dad ___ cook. (умеет)", ["can"], "Умеет: can."),
      I("I ___ come today. (не могу)", ["can't", "cannot", "can not"], "Не могу: can't."),
      O("Соберите: Ты можешь мне помочь?", ["help", "can", "me", "you"], "Can you help me", "Can вперёд, потом кто, потом глагол."),
      F("Исправьте: I can to swim.", ["I can swim"], "После can без to."),
      F("Исправьте: He cans play the guitar.", ["He can play the guitar"], "Can без -s."),
      Ch("Вежливая просьба:", ["Can you to open the door?", "Could you open the door?", "You could open the door?"], 1, "Could you + глагол = вежливо."),
      I("Переведите: Ты умеешь водить машину?", ["Can you drive", "Can you drive a car"], "Can you drive?"),
      I("Переведите: Я не умею плавать.", ["I can't swim", "I cannot swim"], "I can't swim."),
      Ch("«Можно войти?»", ["Can I come in?", "I can come in?", "Can come I in?"], 0, "Can I ...? = можно мне?")
    ]
  };

  P[11] = {
    steps: [
      S("Шаг 1. Когда: прямо сейчас", "Present Continuous: действие идёт в этот момент. Подсказки: now, at the moment, look!, listen!", [["I am reading now.", "Я сейчас читаю."]]),
      S("Шаг 2. Формула: am / is / are + глагол-ing", "Обязательно оба кусочка: и am / is / are, и -ing.", [["She is sleeping.", "Она спит."], ["They are playing football.", "Они играют в футбол."]]),
      S("Шаг 3. Как добавить -ing", "make → making (e убираем), swim → swimming, run → running, sit → sitting (удваиваем букву).", [["I'm making dinner.", "Я готовлю ужин."]]),
      S("Шаг 4. Отрицание и вопрос", "not после am / is / are. В вопросе am / is / are вперёд.", [["I'm not working.", "Я не работаю (сейчас)."], ["What are you doing?", "Что ты делаешь?"]]),
      S("Шаг 5. Обычно или сейчас?", "Обычно, каждый день: Present Simple. Сейчас: Continuous. Глаголы know, like, want, need, love в Continuous почти не бывают.", [["I usually walk. Today I'm taking a taxi.", "Обычно хожу пешком. Сегодня еду на такси."]])
    ],
    tasks: [
      I("Look! It ___ (rain).", ["is raining", "'s raining"], "Сейчас: is + raining."),
      I("What ___ you ___ (do) now? Впишите два слова через пробел.", ["are doing"], "are + doing."),
      Ch("She usually ___ to school.", ["walks", "is walking"], 0, "Usually = обычно: Present Simple."),
      Ch("Listen! Someone ___ .", ["sings", "is singing"], 1, "Listen! = сейчас: is singing."),
      I("I ___ (swim) now.", ["am swimming", "'m swimming"], "swim → swimming."),
      F("Исправьте: I reading now.", ["I am reading now", "I'm reading now"], "Не хватает am."),
      F("Исправьте: She is play tennis.", ["She is playing tennis", "She's playing tennis"], "Нужно -ing: playing."),
      F("Исправьте: I am knowing the answer.", ["I know the answer"], "Know не используется с -ing."),
      I("Переведите: Я сейчас не работаю.", ["I'm not working now", "I am not working now", "I'm not working at the moment"], "I'm not + working."),
      I("Переведите: Что ты делаешь?", ["What are you doing"], "What + are + you + doing?")
    ]
  };

  P[12] = {
    steps: [
      S("Шаг 1. Когда: было и закончилось", "Подсказки: yesterday, last week, ago, in 2020, when I was a child.", [["I worked yesterday.", "Я работал вчера."]]),
      S("Шаг 2. Правильные глаголы: + ed", "Одна форма для всех: I, she, they. play → played, study → studied, like → liked.", [["She watched a film.", "Она смотрела фильм."]]),
      S("Шаг 3. Неправильные: 2-я форма", "go → went, see → saw, buy → bought, have → had. Их учат наизусть (файл «Неправильные глаголы»).", [["I went to school.", "Я ходил в школу."], ["We bought a car.", "Мы купили машину."]]),
      S("Шаг 4. Отрицание: didn't + обычный глагол", "Прошлое уже в didn't, поэтому глагол обычный.", [["I didn't go.", "Я не ходил."], ["She didn't see him.", "Она его не видела."]]),
      S("Шаг 5. Вопрос: Did + кто + обычный глагол", "", [["Did you go?", "Ты ходил?"], ["What did you buy?", "Что ты купил?"]]),
      S("Шаг 6. to be в прошлом", "I / he / she / it: was. You / we / they: were.", [["I was tired.", "Я устал."], ["They were at home.", "Они были дома."]])
    ],
    tasks: [
      I("Yesterday I ___ (buy) a phone.", ["bought"], "buy → bought."),
      I("We ___ (play) football last week.", ["played"], "play → played."),
      I("She ___ (study) all night.", ["studied"], "study → studied."),
      I("We ___ (not / see) him.", ["didn't see", "did not see"], "didn't + see."),
      O("Соберите: Ты ходил в школу вчера?", ["go", "you", "did", "to school", "yesterday"], "Did you go to school yesterday", "Did + кто + обычный глагол."),
      F("Исправьте: I didn't went.", ["I didn't go", "I did not go"], "После didn't обычная форма: go."),
      F("Исправьте: Did you saw the film?", ["Did you see the film"], "После did: see."),
      Ch("They ___ at home last night.", ["was", "were"], 1, "They: were."),
      I("Переведите: Я купил хлеб.", ["I bought bread", "I bought some bread"], "buy → bought."),
      I("Переведите: Что ты делал вчера?", ["What did you do yesterday"], "What did you do?")
    ]
  };

  P[13] = {
    steps: [
      S("Шаг 1. will + глагол = буду, сделаю", "Одинаково для всех, глагол без to.", [["I will call you.", "Я тебе позвоню."], ["It will rain.", "Будет дождь."]]),
      S("Шаг 2. Сокращение и отрицание", "I will = I'll. will not = won't.", [["I'll help you.", "Я тебе помогу."], ["I won't be late.", "Я не опоздаю."]]),
      S("Шаг 3. Вопрос: Will в начало", "", [["Will you come?", "Ты придёшь?"]]),
      S("Шаг 4. Когда will", "Решил прямо сейчас, обещание, «думаю, будет», просьба. Если план уже был, лучше going to (урок 19).", [["I think he will win.", "Думаю, он победит."]]),
      S("Шаг 5. После if и when будущее не пишут", "If it rains (а не will rain), I'll stay home.", [["When I get home, I'll call you.", "Когда приду домой, позвоню."]])
    ],
    tasks: [
      I("I ___ you tomorrow. (позвоню)", ["will call", "'ll call"], "will + call."),
      I("She ___ be late. (не будет)", ["won't", "will not"], "won't."),
      Ch("___ you help me?", ["Do", "Will", "Are"], 1, "Просьба о будущем: Will you ...?"),
      F("Исправьте: I will to go.", ["I will go", "I'll go"], "После will без to."),
      F("Исправьте: If it will rain, I'll stay home.", ["If it rains I'll stay home", "If it rains, I'll stay home", "If it rains I will stay home"], "После if настоящее: rains."),
      O("Соберите: Я думаю, он победит.", ["win", "will", "he", "I think"], "I think he will win", "I think + he will win."),
      I("Переведите: Я тебе помогу.", ["I will help you", "I'll help you"], "I'll help you."),
      I("Переведите: Будет холодно.", ["It will be cold", "It'll be cold"], "Нет «кто»: it will be."),
      Ch("Когда я приду домой, я позвоню: When I ___ home, I'll call.", ["will come", "come", "came"], 1, "После when настоящее."),
      I("Переведите: Ты придёшь?", ["Will you come"], "Will you come?")
    ]
  };

  P[14] = {
    steps: [
      S("Шаг 1. AT: точка во времени", "Часы, ночь, полдень, обед.", [["at 7 o'clock", "в 7 часов"], ["at night", "ночью"]]),
      S("Шаг 2. ON: день и дата", "Дни недели, даты, праздники, день рождения.", [["on Monday", "в понедельник"], ["on my birthday", "в мой день рождения"]]),
      S("Шаг 3. IN: длинный период", "Месяц, год, сезон, части дня.", [["in May", "в мае"], ["in 2025", "в 2025 году"], ["in the morning", "утром"]]),
      S("Шаг 4. Без предлога", "today, tomorrow, yesterday, tonight, last ..., next ..., this ..., every ...", [["next week", "на следующей неделе"], ["every day", "каждый день"]]),
      S("Шаг 5. for, since, ago, in", "for 2 hours (в течение), since 2020 (с), 2 days ago (назад), in 5 minutes (через).", [["I'll be back in 5 minutes.", "Вернусь через 5 минут."]])
    ],
    tasks: [
      Ch("___ Sunday", ["at", "on", "in"], 1, "День недели: on."),
      Ch("___ 7 o'clock", ["at", "on", "in"], 0, "Точное время: at."),
      Ch("___ July", ["at", "on", "in"], 2, "Месяц: in."),
      Ch("___ the evening", ["at", "on", "in"], 2, "Часть дня: in the evening."),
      Ch("___ night", ["at", "on", "in"], 0, "Исключение: at night."),
      Ch("I'll see you ___ next week.", ["in", "on", "без предлога"], 2, "С next предлог не нужен."),
      I("My birthday is ___ May 9th.", ["on"], "Дата: on."),
      I("I was born ___ 2010.", ["in"], "Год: in."),
      F("Исправьте: See you in Monday.", ["See you on Monday"], "День недели: on."),
      I("Переведите: Я встаю в 7 утра.", ["I get up at 7 am", "I get up at seven in the morning", "I get up at 7 in the morning", "I get up at seven am"], "Время: at 7.")
    ]
  };

  P[15] = {
    steps: [
      S("Шаг 1. AT: точка, место-событие", "at home, at work, at school, at the bus stop, at the party.", [["She is at work.", "Она на работе."]]),
      S("Шаг 2. IN: внутри", "in the room, in the box, in the car, in Moscow, in Russia.", [["I live in Moscow.", "Я живу в Москве."]]),
      S("Шаг 3. ON: на поверхности и в транспорте", "on the table, on the wall, on the bus, on the train, on the phone, on TV.", [["The phone is on the table.", "Телефон на столе."], ["I'm on the bus.", "Я в автобусе."]]),
      S("Шаг 4. Куда: to, а иногда без него", "go to school, come to Moscow. Но go home, go there, go abroad без to.", [["I go to school by bus.", "Я езжу в школу на автобусе."], ["I go home.", "Я иду домой."]]),
      S("Шаг 5. Другие места", "under (под), next to (рядом с), between (между), behind (за), in front of (перед), opposite (напротив).", [["The cat is under the bed.", "Кошка под кроватью."]])
    ],
    tasks: [
      Ch("My phone is ___ the table.", ["in", "on", "at"], 1, "На поверхности: on."),
      Ch("She is ___ work now.", ["in", "on", "at"], 2, "at work."),
      Ch("I live ___ Moscow.", ["in", "on", "at"], 0, "Город: in."),
      Ch("I'm sitting ___ the bus.", ["in", "on", "at"], 1, "Автобус: on the bus."),
      Ch("Let's go ___.", ["to home", "home", "at home"], 1, "go home без to."),
      I("We go ___ school by bus.", ["to"], "Куда: to."),
      F("Исправьте: I'm in home.", ["I'm at home", "I am at home"], "Дома: at home."),
      F("Исправьте: I go to home.", ["I go home"], "go home без to."),
      I("Переведите: Кошка под столом.", ["The cat is under the table"], "Под: under."),
      I("Переведите: Аптека рядом с банком.", ["The pharmacy is next to the bank"], "Рядом с: next to.")
    ]
  };

  P[16] = {
    steps: [
      S("with и without", "with = с (вместе, чем), without = без.", [["I live with my parents.", "Я живу с родителями."], ["Tea without sugar.", "Чай без сахара."]]),
      S("for и about", "for = для, в течение. about = о, про.", [["This is for you.", "Это для тебя."], ["Tell me about your family.", "Расскажи о своей семье."]]),
      S("of = родительный падеж", "Когда по-русски «чего / кого».", [["a cup of tea", "чашка чая"], ["one of my friends", "один из моих друзей"]]),
      S("by, to, from", "by bus (на автобусе, но on foot пешком), to (к, кому), from (из, от).", [["I go by car.", "Я езжу на машине."], ["I'm from Russia.", "Я из России."]])
    ],
    tasks: [
      Ch("I go to school ___ bus.", ["on", "by", "with"], 1, "Транспорт: by bus."),
      Ch("I go to school ___ foot.", ["by", "on", "with"], 1, "Пешком: on foot."),
      Ch("Tell me ___ your hobby.", ["about", "for", "of"], 0, "Рассказать о: about."),
      Ch("This present is ___ you.", ["to", "for", "of"], 1, "Для тебя: for."),
      I("a glass ___ water", ["of"], "Чего: of."),
      I("I live ___ my parents.", ["with"], "С кем: with."),
      I("I'm ___ Russia.", ["from"], "Откуда: from."),
      F("Исправьте: a cup tea", ["a cup of tea"], "Нужен of."),
      I("Переведите: Кофе без сахара, пожалуйста.", ["Coffee without sugar please", "Coffee without sugar, please"], "без: without."),
      I("Переведите: Один из моих друзей живёт в Лондоне.", ["One of my friends lives in London"], "один из = one of. Один друг: lives.")
    ]
  };

  P[17] = {
    steps: [
      S("Шаг 1. Почему это важно", "В русском и английском предлоги часто разные. Эти пары нужно учить целиком, как одно слово.", []),
      S("Шаг 2. Самые частые", "listen to, look at, wait for, look for (искать), think about, talk to, ask for, pay for, agree with, depend on.", [["I'm listening to music.", "Я слушаю музыку."], ["I'm waiting for the bus.", "Я жду автобус."]]),
      S("Шаг 3. С прилагательными", "be good at, be interested in, be afraid of, be proud of, be angry with.", [["I'm interested in economics.", "Я интересуюсь экономикой."]]),
      S("Шаг 4. А здесь предлог НЕ нужен", "call someone, answer the question, enter the room, discuss the plan.", [["Call me.", "Позвони мне."]])
    ],
    tasks: [
      Ch("I'm listening ___ a podcast.", ["-", "to", "at"], 1, "listen to."),
      Ch("Look ___ this photo!", ["on", "at", "to"], 1, "look at."),
      Ch("We're waiting ___ you.", ["-", "for", "to"], 1, "wait for."),
      Ch("She's good ___ maths.", ["in", "at", "on"], 1, "good at."),
      Ch("I'm interested ___ economics.", ["in", "of", "at"], 0, "interested in."),
      Ch("Call ___ tonight.", ["to me", "me", "for me"], 1, "call без предлога."),
      I("I'm afraid ___ dogs.", ["of"], "afraid of."),
      F("Исправьте: I listen music.", ["I listen to music"], "listen to."),
      F("Исправьте: I'm looking my keys.", ["I'm looking for my keys", "I am looking for my keys"], "Искать: look for."),
      I("Переведите: Я согласен с тобой.", ["I agree with you"], "agree with. Без am!")
    ]
  };

  P[18] = {
    steps: [
      S("Шаг 1. Соединяем два предложения", "Короткие предложения склеиваем союзами: and (и), but (но), or (или).", [["I like tea, but I don't like coffee.", "Я люблю чай, но не люблю кофе."]]),
      S("Шаг 2. Причина и следствие", "because = потому что (причина). so = поэтому (следствие).", [["I stayed home because I was ill.", "Я остался дома, потому что болел."], ["I was ill, so I stayed home.", "Я болел, поэтому остался дома."]]),
      S("Шаг 3. Время и условие", "when (когда), if (если), before / after (до / после того как), until (пока не), while (пока).", [["When I was a child, I lived in a village.", "В детстве я жил в деревне."]]),
      S("Шаг 4. Главная ловушка", "После when, if, before, after, until про будущее пишем настоящее время.", [["I'll call you when I get home.", "Я позвоню, когда приду домой."]]),
      S("Шаг 5. Мнение: that и although", "I think (that) ... = я думаю, что ... although = хотя.", [["I think that he is right.", "Я думаю, что он прав."], ["Although it was late, we went out.", "Хотя было поздно, мы пошли гулять."]])
    ],
    tasks: [
      Ch("I was hungry, ___ I ate a sandwich.", ["because", "so", "but"], 1, "Следствие: so."),
      Ch("I like football ___ I don't like basketball.", ["and", "so", "but"], 2, "Противопоставление: but."),
      Ch("She's happy ___ she passed the test.", ["so", "because", "or"], 1, "Причина: because."),
      Ch("I'll call you when I ___ home.", ["will get", "get", "got"], 1, "После when настоящее."),
      I("Tea ___ coffee? (или)", ["or"], "Или: or."),
      I("Wash your hands ___ you eat. (перед тем как)", ["before"], "before."),
      F("Исправьте: If it will rain, we'll stay home.", ["If it rains we'll stay home", "If it rains, we'll stay home", "If it rains we will stay home"], "После if настоящее."),
      O("Соберите: Я думаю, что ты прав.", ["right", "I think", "you are", "that"], "I think that you are right", "I think + that + you are right."),
      I("Переведите: Я устал, поэтому лёг спать.", ["I was tired so I went to bed", "I was tired, so I went to bed"], "so = поэтому. went to bed."),
      I("Переведите: Хотя было холодно, мы пошли гулять.", ["Although it was cold we went for a walk", "Although it was cold, we went for a walk", "Although it was cold we went out", "Although it was cold, we went out"], "although = хотя. Гулять: go for a walk / go out.")
    ]
  };
})();
