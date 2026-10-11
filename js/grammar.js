/* ==========================================================================
   LinguaQuest - объяснения грамматики к урокам
   --------------------------------------------------------------------------
   Ключ - id урока из data.js. Карточка показывается перед первым
   прохождением урока и по кнопке "Подсказка" во время урока.
     title    - заголовок правила
     points[] - 2-4 коротких пункта (можно <b>выделение</b>)
     table    - необязательная таблица { head: [...], rows: [[...], ...] }
     examples - пары [английский, русский]
   ========================================================================== */

const GRAMMAR = {
  "abc-1": {
    title: "Как читаются буквы",
    points: [
      "В английском <b>26 букв</b>. Название буквы и её звук в словах часто различаются.",
      "Например, буква <b>A</b> называется «эй», а в слове <b>cat</b> звучит как короткое [æ].",
      "Нажимайте на динамик, чтобы слушать: произношение лучше запоминается на слух."
    ],
    examples: [["A, B, C", "эй, би, си"], ["cat, bed, dog", "кошка, кровать, собака"]]
  },
  "greet-3": {
    title: "Как представиться",
    points: [
      "<b>My name is ...</b> значит «Меня зовут ...», дословно «Моё имя ...».",
      "<b>I am from ...</b> значит «Я из ...».",
      "На «How are you?» обычно отвечают коротко: <b>I am fine, thank you</b>."
    ],
    examples: [["My name is Anna", "Меня зовут Анна"], ["I am from Russia", "Я из России"]]
  },
  "pron-1": {
    title: "Личные местоимения",
    points: [
      "<b>I</b> (я) всегда пишется с большой буквы, даже в середине предложения.",
      "<b>you</b> значит и «ты», и «вы».",
      "В английском местоимение почти всегда нужно: нельзя сказать просто «Am happy»."
    ],
    table: { head: ["Английский", "Русский"], rows: [["I", "я"], ["you", "ты, вы"], ["he / she / it", "он / она / оно"], ["we", "мы"], ["they", "они"]] },
    examples: [["We are friends", "Мы друзья"]]
  },
  "pron-2": {
    title: "He, she и it",
    points: [
      "<b>he</b> говорим о мужчине или мальчике, <b>she</b> о женщине или девочке.",
      "<b>it</b> говорим о предмете, животном или явлении: «это», «оно».",
      "Перед профессией или предметом в единственном числе ставим <b>a</b>: He is <b>a</b> doctor."
    ],
    examples: [["She is a girl", "Она девочка"], ["It is a cat", "Это кошка"]]
  },
  "pron-3": {
    title: "Чей? Притяжательные местоимения",
    points: [
      "Притяжательное слово стоит <b>перед</b> существительным: <b>my</b> book.",
      "Оно не меняется по родам: my book, my house, my sister."
    ],
    table: { head: ["Кто", "Чей"], rows: [["I", "my (мой)"], ["you", "your (твой, ваш)"], ["he", "his (его)"], ["she", "her (её)"], ["we", "our (наш)"], ["they", "their (их)"]] },
    examples: [["Her name is Kate", "Её зовут Кейт"]]
  },
  "be-1": {
    title: "Глагол to be: am, is, are",
    points: [
      "В русском «я студент» глагол не нужен, а в английском нужен: <b>I am</b> a student.",
      "Форма зависит от местоимения: смотрите таблицу.",
      "В речи часто сокращают: I'm, he's, they're."
    ],
    table: { head: ["Кто", "Форма"], rows: [["I", "am"], ["he / she / it", "is"], ["you / we / they", "are"]] },
    examples: [["I am happy", "Я счастлив"], ["They are tired", "Они устали"]]
  },
  "be-2": {
    title: "Отрицание с to be",
    points: [
      "Чтобы сказать «не», ставим <b>not</b> после am / is / are.",
      "Сокращения: is not = <b>isn't</b>, are not = <b>aren't</b>. Для am сокращения нет: I'm not."
    ],
    examples: [["I am not a teacher", "Я не учитель"], ["He isn't hungry", "Он не голоден"]]
  },
  "be-3": {
    title: "Вопросы с to be",
    points: [
      "В вопросе am / is / are ставим <b>в начало</b>: You are ready → <b>Are you</b> ready?",
      "Со словами where, what, who: <b>Where is</b> the school?"
    ],
    examples: [["Is she at home?", "Она дома?"], ["Where are they?", "Где они?"]]
  },
  "num-1": {
    title: "Много предметов: окончание -s",
    points: [
      "Если предметов больше одного, к слову обычно добавляем <b>-s</b>: cat → cats.",
      "После -s, -sh, -ch, -x добавляем <b>-es</b>: box → boxes."
    ],
    examples: [["one apple, two apples", "одно яблоко, два яблока"], ["I have two cats", "У меня две кошки"]]
  },
  "col-1": {
    title: "Где стоит прилагательное",
    points: [
      "Прилагательное (какой?) стоит <b>перед</b> существительным: a <b>red</b> car.",
      "Прилагательные не меняются по родам и числам: red car, red cars."
    ],
    examples: [["a red ball", "красный мяч"], ["The sky is blue", "Небо голубое"]]
  },
  "fam-2": {
    title: "У меня есть: have и has",
    points: [
      "«У меня есть» по-английски <b>I have</b>, дословно «я имею».",
      "С he / she / it используем <b>has</b>: She <b>has</b> a brother."
    ],
    table: { head: ["Кто", "Форма"], rows: [["I / you / we / they", "have"], ["he / she / it", "has"]] },
    examples: [["I have a sister", "У меня есть сестра"], ["He has two sons", "У него два сына"]]
  },
  "food-1": {
    title: "Артикли a и an",
    points: [
      "<b>a</b> ставим перед одним предметом, когда говорим о нём впервые: <b>a</b> cake.",
      "Если слово начинается с гласного звука, пишем <b>an</b>: <b>an</b> apple, <b>an</b> egg.",
      "С неисчисляемыми (bread, milk, water) a / an не ставим."
    ],
    examples: [["I eat an apple", "Я ем яблоко"], ["a cake and an egg", "торт и яйцо"]]
  },
  "time-1": {
    title: "Дни недели",
    points: [
      "Дни недели пишутся <b>с большой буквы</b>: Monday, Friday.",
      "«В понедельник» по-английски <b>on</b> Monday."
    ],
    examples: [["I work on Friday", "Я работаю в пятницу"]]
  },
  "time-3": {
    title: "Который час",
    points: [
      "Ровное время: число + <b>o'clock</b>: three o'clock.",
      "«В три часа» по-английски <b>at</b> three o'clock.",
      "Спросить время: <b>What time is it?</b>"
    ],
    examples: [["It is five o'clock", "Пять часов"], ["at seven o'clock", "в семь часов"]]
  },
  "verb-1": {
    title: "Present Simple: обычные действия",
    points: [
      "Present Simple говорит о том, что происходит <b>обычно, регулярно</b>.",
      "С I / you / we / they глагол без изменений: I <b>read</b> books."
    ],
    examples: [["We play football", "Мы играем в футбол"], ["They work every day", "Они работают каждый день"]]
  },
  "verb-2": {
    title: "He, she, it: окончание -s",
    points: [
      "С <b>he / she / it</b> к глаголу добавляем <b>-s</b>: she speak<b>s</b>.",
      "После -s, -ss, -sh, -ch, -x, -o добавляем <b>-es</b>: watch → watches, go → goes. Согласная + y → <b>-ies</b>: study → studies.",
      "Это самая частая ошибка новичков, обращайте внимание!"
    ],
    table: { head: ["Кто", "Глагол"], rows: [["I / you / we / they", "live"], ["he / she / it", "lives"]] },
    examples: [["She speaks English", "Она говорит по-английски"], ["He watches TV", "Он смотрит телевизор"]]
  },
  "verb-3": {
    title: "Отрицание: don't и doesn't",
    points: [
      "«Не делаю»: <b>don't</b> + глагол: I don't like coffee.",
      "С he / she / it: <b>doesn't</b> + глагол <b>без -s</b>: She doesn't like milk."
    ],
    table: { head: ["Кто", "Отрицание"], rows: [["I / you / we / they", "don't + глагол"], ["he / she / it", "doesn't + глагол"]] },
    examples: [["I don't eat meat", "Я не ем мясо"], ["He doesn't play sport", "Он не занимается спортом"]]
  },
  "q-1": {
    title: "Вопросительные слова",
    points: [
      "Вопросительное слово ставим <b>в начало</b> вопроса.",
      "What - что, who - кто, where - где, when - когда, why - почему, how - как."
    ],
    examples: [["What is your name?", "Как тебя зовут?"], ["Why are you sad?", "Почему ты грустный?"]]
  },
  "q-2": {
    title: "Вопросы с do и does",
    points: [
      "Чтобы задать вопрос в Present Simple, ставим в начало <b>Do</b> или <b>Does</b>.",
      "После <b>Does</b> глагол без -s: Does she <b>live</b> here?"
    ],
    table: { head: ["Кто", "Вопрос"], rows: [["I / you / we / they", "Do ... ?"], ["he / she / it", "Does ... ?"]] },
    examples: [["Do you speak English?", "Ты говоришь по-английски?"], ["Does he like tea?", "Он любит чай?"]]
  },
  "q-3": {
    title: "Короткие ответы",
    points: [
      "На вопрос с do / does отвечают коротко: <b>Yes, I do</b> / <b>No, I don't</b>.",
      "На вопрос с is / are: <b>Yes, he is</b> / <b>No, he isn't</b>.",
      "Отвечаем тем же глаголом, с которого начинался вопрос."
    ],
    examples: [["Do you like cats? Yes, I do", "Ты любишь кошек? Да"], ["Is he a doctor? No, he isn't", "Он врач? Нет"]]
  },
  "cont-1": {
    title: "Present Continuous: прямо сейчас",
    points: [
      "Говорим о том, что происходит <b>в этот момент</b>.",
      "Формула: am / is / are + глагол с окончанием <b>-ing</b>."
    ],
    table: { head: ["Кто", "Форма"], rows: [["I", "am reading"], ["he / she / it", "is reading"], ["you / we / they", "are reading"]] },
    examples: [["I am reading now", "Я сейчас читаю"], ["She is cooking dinner", "Она готовит ужин"]]
  },
  "cont-2": {
    title: "Вопросы в Present Continuous",
    points: [
      "Am / is / are выносим <b>вперёд</b>: <b>Are you</b> waiting?",
      "С вопросительным словом: <b>What are you</b> doing?"
    ],
    examples: [["What are you doing?", "Что ты делаешь?"], ["Is it raining?", "Идёт дождь?"]]
  },
  "cont-3": {
    title: "Обычно или сейчас?",
    points: [
      "<b>usually, always, every day</b> → Present Simple: I usually drink tea.",
      "<b>now, right now, look!</b> → Present Continuous: I am drinking coffee now."
    ],
    examples: [["He always walks to work", "Он всегда ходит на работу пешком"], ["Look! The baby is sleeping", "Смотри! Малыш спит"]]
  },
  "past-1": {
    title: "Был, были: was и were",
    points: [
      "Прошедшее время от to be: <b>was</b> и <b>were</b>.",
      "Отрицание: wasn't, weren't. Вопрос: Were you at home?"
    ],
    table: { head: ["Кто", "Форма"], rows: [["I / he / she / it", "was"], ["you / we / they", "were"]] },
    examples: [["I was at home yesterday", "Вчера я был дома"], ["They were busy", "Они были заняты"]]
  },
  "past-2": {
    title: "Past Simple: окончание -ed",
    points: [
      "Прошедшее время большинства глаголов образуется с <b>-ed</b>: play → played.",
      "Форма одна для всех лиц: I played, she played, they played."
    ],
    examples: [["I watched a film", "Я посмотрел фильм"], ["She cooked dinner", "Она приготовила ужин"]]
  },
  "past-3": {
    title: "Неправильные глаголы",
    points: [
      "У части глаголов прошедшее время нужно просто запомнить: go → <b>went</b>, see → <b>saw</b>.",
      "Вопрос и отрицание в прошлом делаем с <b>did</b>, а глагол возвращаем в начальную форму: <b>Did</b> you <b>see</b> it?"
    ],
    table: { head: ["Глагол", "Прошедшее"], rows: [["go", "went"], ["see", "saw"], ["eat", "ate"], ["have", "had"], ["buy", "bought"], ["do", "did"]] },
    examples: [["We went to London", "Мы поехали в Лондон"], ["Did you eat breakfast?", "Ты завтракал?"]]
  },
  "ph-1": {
    title: "Вежливая просьба",
    points: [
      "<b>Can I have ...?</b> значит «Можно мне ...?».",
      "<b>I would like ...</b> (I'd like) значит «Я бы хотел ...». Это вежливее, чем I want."
    ],
    examples: [["I would like a coffee", "Я бы хотел кофе"], ["Can I have the menu?", "Можно мне меню?"]]
  },
  "fut-1": {
    title: "Будущее: will",
    points: [
      "<b>will</b> + глагол: решения прямо сейчас, обещания, прогнозы.",
      "Отрицание: <b>won't</b> (will not). Форма одна для всех лиц."
    ],
    examples: [["I will call you later", "Я позвоню тебе позже"], ["She won't come", "Она не придёт"]]
  },
  "fut-2": {
    title: "Планы: going to",
    points: [
      "<b>am / is / are going to</b> + глагол: заранее принятые планы и намерения.",
      "I am going to learn English значит «Я собираюсь учить английский»."
    ],
    examples: [["We are going to travel", "Мы собираемся путешествовать"], ["What are you going to do?", "Что ты собираешься делать?"]]
  },
  "wea-1": {
    title: "Погода: It is ...",
    points: [
      "О погоде говорим через <b>It is</b>: It is sunny, It is cold.",
      "Идёт дождь (прямо сейчас): <b>It is raining</b>."
    ],
    examples: [["It is sunny today", "Сегодня солнечно"], ["It is snowing", "Идёт снег"]]
  },
  "body-2": {
    title: "Особые формы множественного числа",
    points: [
      "Обычно добавляем -s: hand → hands, leg → legs.",
      "Но есть исключения: foot → <b>feet</b>, tooth → <b>teeth</b>, man → <b>men</b>, child → <b>children</b>."
    ],
    examples: [["two hands", "две руки"], ["My feet hurt", "У меня болят ноги"]]
  },
  "clo-2": {
    title: "Wear: носить или надеть",
    points: [
      "<b>wear</b> значит «быть одетым во что-то»: I am wearing a shirt.",
      "<b>put on</b> значит «надеть» (действие): Put on your jacket.",
      "<b>take off</b> значит «снять»."
    ],
    examples: [["She is wearing a red dress", "На ней красное платье"]]
  },
  "home-2": {
    title: "There is и there are",
    points: [
      "Говорим, что что-то <b>где-то есть</b>: There is a lamp on the table.",
      "Один предмет: <b>there is</b>. Несколько: <b>there are</b>.",
      "Вопрос: <b>Is there</b> a shop near here?"
    ],
    table: { head: ["Сколько", "Форма"], rows: [["один", "There is a chair"], ["много", "There are two chairs"]] },
    examples: [["There is a bed in the room", "В комнате есть кровать"]]
  },
  "home-3": {
    title: "Предлоги места",
    points: [
      "<b>on</b> на (поверхности), <b>in</b> в (внутри), <b>under</b> под.",
      "<b>next to</b> рядом с, <b>behind</b> за, <b>between</b> между."
    ],
    examples: [["The cat is under the bed", "Кошка под кроватью"], ["My bag is on the chair", "Моя сумка на стуле"]]
  },
  "job-2": {
    title: "Умею: can",
    points: [
      "<b>can</b> + глагол: умею, могу. Форма одна для всех: she can swim (без -s!).",
      "Отрицание: <b>can't</b>. Вопрос: <b>Can</b> you sing?"
    ],
    examples: [["I can swim", "Я умею плавать"], ["She can't drive", "Она не умеет водить"]]
  },
  "cmp-1": {
    title: "Сравнение: -er и than",
    points: [
      "Короткие прилагательные получают <b>-er</b>: big → bigger, fast → faster.",
      "«Чем» по-английски <b>than</b>: taller <b>than</b> me.",
      "Удвоение согласной: big → bi<b>gg</b>er, hot → ho<b>tt</b>er."
    ],
    examples: [["A car is faster than a bike", "Машина быстрее велосипеда"]]
  },
  "cmp-2": {
    title: "Длинные слова: more",
    points: [
      "У длинных прилагательных -er не добавляем, а ставим <b>more</b> перед словом: more interesting.",
      "«Менее»: <b>less</b>: less difficult."
    ],
    examples: [["This book is more interesting", "Эта книга интереснее"]]
  },
  "cmp-3": {
    title: "Самый: the -est и the most",
    points: [
      "Короткие слова: <b>the</b> + -est: the biggest, the fastest.",
      "Длинные: <b>the most</b> + слово: the most beautiful.",
      "Исключения: good → better → <b>the best</b>, bad → worse → <b>the worst</b>."
    ],
    examples: [["This is the best day", "Это лучший день"]]
  },
  "mod-1": {
    title: "Must и mustn't",
    points: [
      "<b>must</b> + глагол: должен, обязан (правило, сильная необходимость).",
      "<b>mustn't</b>: нельзя, запрещено. Не путайте с «не обязан»!"
    ],
    examples: [["You must be quiet", "Ты должен вести себя тихо"], ["You mustn't smoke here", "Здесь нельзя курить"]]
  },
  "mod-2": {
    title: "Have to: приходится",
    points: [
      "<b>have to / has to</b>: приходится из-за обстоятельств.",
      "<b>don't have to</b>: не нужно, не обязательно (но можно)."
    ],
    examples: [["I have to get up early", "Мне приходится рано вставать"], ["You don't have to pay", "Тебе не нужно платить"]]
  },
  "mod-3": {
    title: "Should: совет",
    points: [
      "<b>should</b> + глагол: следует, стоит. Так дают советы.",
      "<b>shouldn't</b>: не стоит."
    ],
    examples: [["You should see a doctor", "Тебе стоит сходить к врачу"]]
  },
  "pc-1": {
    title: "Past Continuous: делал в тот момент",
    points: [
      "Процесс в определённый момент прошлого: <b>was / were + -ing</b>.",
      "At 5 o'clock I <b>was reading</b> значит «В 5 часов я читал (был в процессе)»."
    ],
    table: { head: ["Кто", "Форма"], rows: [["I / he / she / it", "was reading"], ["you / we / they", "were reading"]] },
    examples: [["They were playing football", "Они играли в футбол"]]
  },
  "pc-2": {
    title: "Длинное и короткое действие",
    points: [
      "Длинное действие (фон): Past Continuous. Короткое, которое его прервало: Past Simple.",
      "I <b>was walking</b> when it <b>started</b> to rain."
    ],
    examples: [["The phone rang while I was sleeping", "Телефон зазвонил, пока я спал"]]
  },
  "pp-1": {
    title: "Present Perfect: уже сделал",
    points: [
      "<b>have / has + 3-я форма</b> глагола: результат важен сейчас.",
      "Часто с <b>already</b> (уже) и <b>just</b> (только что).",
      "3-я форма: для правильных -ed, для неправильных запоминаем: lose → lost, find → found."
    ],
    examples: [["I have lost my keys", "Я потерял ключи (и сейчас их нет)"], ["She has just finished", "Она только что закончила"]]
  },
  "pp-2": {
    title: "Опыт: ever и never",
    points: [
      "Спросить про опыт в жизни: <b>Have you ever ...?</b>",
      "Ответить «никогда»: I have <b>never</b> ...",
      "<b>been to</b> значит «бывал в»: I have been to Paris."
    ],
    examples: [["Have you ever been to London?", "Ты бывал в Лондоне?"], ["I have never seen snow", "Я никогда не видел снег"]]
  },
  "pp-3": {
    title: "Yet, for и since",
    points: [
      "<b>yet</b> в вопросах и отрицаниях: «уже?» / «ещё не».",
      "<b>for</b> + период: for ten years. <b>since</b> + момент начала: since 2020.",
      "По-русски «я живу здесь 5 лет», а по-английски I <b>have lived</b> here for 5 years."
    ],
    examples: [["I haven't finished yet", "Я ещё не закончил"], ["We have lived here since 2020", "Мы живём здесь с 2020 года"]]
  },
  "if-1": {
    title: "Реальное условие",
    points: [
      "<b>If + настоящее время, will + глагол</b>: реальная ситуация в будущем.",
      "После if <b>не ставим will</b>: If it <b>rains</b> (не will rain).",
      "<b>unless</b> значит «если не»."
    ],
    examples: [["If it rains, I will stay at home", "Если пойдёт дождь, я останусь дома"]]
  },
  "if-2": {
    title: "Нереальное условие: бы",
    points: [
      "<b>If + прошедшее время, would + глагол</b>: воображаемая ситуация.",
      "С to be лучше <b>were</b> для всех: If I <b>were</b> you ...",
      "Сочетание <b>would</b> + глагол по-русски передаётся частицей «бы»."
    ],
    examples: [["If I were rich, I would travel", "Если бы я был богат, я бы путешествовал"]]
  },
  "if-3": {
    title: "I wish: жаль, что",
    points: [
      "<b>I wish + прошедшее время</b>: сожаление о настоящем.",
      "I wish I had more time значит «Жаль, что у меня мало времени», дословно «хотел бы, чтобы было больше»."
    ],
    examples: [["I wish I knew the answer", "Жаль, что я не знаю ответа"]]
  },
  "pas-1": {
    title: "Страдательный залог: настоящее",
    points: [
      "Важно действие, а не кто его делает: <b>is / are + 3-я форма</b>.",
      "Glass <b>is made</b> from sand значит «Стекло делают из песка»."
    ],
    examples: [["English is spoken everywhere", "На английском говорят везде"]]
  },
  "pas-2": {
    title: "Страдательный залог: прошлое",
    points: [
      "<b>was / were + 3-я форма</b>: The bridge <b>was built</b> in 1890.",
      "Кто сделал, указываем через <b>by</b>: written <b>by</b> a girl."
    ],
    examples: [["The book was written by a young girl", "Книгу написала молодая девушка"]]
  },
  "pas-3": {
    title: "Будет сделано, уже сделано",
    points: [
      "Будущее: <b>will be + 3-я форма</b>: will be delivered.",
      "Уже сделано: <b>has / have been + 3-я форма</b>: has been repaired."
    ],
    examples: [["Your package will be delivered tomorrow", "Ваша посылка будет доставлена завтра"]]
  },
  "rep-1": {
    title: "Косвенная речь: said и told",
    points: [
      "<b>said</b> без указания кому: She said that ... <b>told</b> + кому: He told <b>me</b> that ...",
      "Время сдвигается назад: «I am tired» → She said she <b>was</b> tired."
    ],
    examples: [["She said that she was tired", "Она сказала, что устала"]]
  },
  "rep-2": {
    title: "Косвенный вопрос",
    points: [
      "Вопрос «да / нет» передаём через <b>if</b> (ли): She asked <b>if</b> I was hungry.",
      "В косвенном вопросе <b>прямой порядок слов</b>: He asked where I <b>lived</b> (не where did I live)."
    ],
    examples: [["He asked where I lived", "Он спросил, где я живу"]]
  },
  "rep-3": {
    title: "Просьбы и обещания",
    points: [
      "Просьба: asked / told + кому + <b>to</b> + глагол: She asked me <b>to</b> help.",
      "will в косвенной речи превращается в <b>would</b>: He said he <b>would</b> call."
    ],
    examples: [["My boss told me to come early", "Начальник велел мне прийти пораньше"]]
  },
  "phr-1": {
    title: "Фразовые глаголы",
    points: [
      "Глагол + маленькое слово (up, on, off, out) дают новый смысл.",
      "get = получать, но <b>get up</b> = вставать. turn = поворачивать, но <b>turn on</b> = включать.",
      "Учите их целиком, как отдельные слова."
    ],
    examples: [["I get up at seven", "Я встаю в семь"], ["Turn off the light", "Выключи свет"]]
  },
  "phr-2": {
    title: "Фразовые глаголы: поиск",
    points: [
      "<b>look for</b> искать, <b>find out</b> выяснять, <b>look after</b> присматривать.",
      "Частица может стоять после дополнения, а с местоимением только так: pick me <b>up</b>, give it <b>back</b>."
    ],
    examples: [["I am looking for my keys", "Я ищу ключи"]]
  },
  "phr-3": {
    title: "Фразовые глаголы: характер",
    points: [
      "<b>give up</b> сдаться, <b>carry on</b> продолжать, <b>run out of</b> закончиться.",
      "<b>get on with</b> ладить с кем-то."
    ],
    examples: [["Never give up", "Никогда не сдавайся"], ["We have run out of milk", "У нас закончилось молоко"]]
  },
  "nar-1": {
    title: "Past Perfect: что было раньше",
    points: [
      "<b>had + 3-я форма</b>: действие, которое случилось <b>раньше</b> другого действия в прошлом.",
      "When I arrived, the train <b>had left</b>: сначала ушёл поезд, потом я пришёл.",
      "Часто с <b>by the time</b>, <b>before</b>, <b>already</b>."
    ],
    examples: [["She had finished before lunch", "Она закончила до обеда"]]
  },
  "nar-2": {
    title: "Used to: привычки прошлого",
    points: [
      "<b>used to + глагол</b>: так было раньше, а теперь нет. I used to live in a village.",
      "Отрицание и вопрос с did: <b>didn't use to</b>, <b>Did you use to</b>...?",
      "Не путайте: <b>be used to + -ing</b> значит «привык», <b>get used to + -ing</b> значит «привыкать»."
    ],
    table: { head: ["Фраза", "Смысл"], rows: [["used to do", "раньше делал"], ["be used to doing", "привык делать"], ["get used to doing", "привыкаю делать"]] },
    examples: [["I am used to getting up early", "Я привык рано вставать"]]
  },
  "ded-1": {
    title: "Догадки о настоящем",
    points: [
      "<b>must be</b>: уверен, что да (почти 100%).",
      "<b>might / may / could be</b>: возможно (около 50%).",
      "<b>can't be</b>: уверен, что нет. Не используйте здесь mustn't!"
    ],
    examples: [["He must be at work", "Он, должно быть, на работе"], ["That can't be true", "Это не может быть правдой"]]
  },
  "ded-2": {
    title: "Догадки о прошлом",
    points: [
      "Модальный глагол + <b>have + 3-я форма</b>: must have done, might have done, can't have done.",
      "<b>should have done</b>: следовало сделать, но не сделали (упрёк, сожаление)."
    ],
    examples: [["She must have forgotten", "Она, должно быть, забыла"], ["You should have told me", "Тебе следовало мне сказать"]]
  },
  "rel-1": {
    title: "Который: who, which, that",
    points: [
      "<b>who</b> о людях, <b>which</b> о предметах и животных, <b>that</b> подходит для обоих.",
      "Если «который» стоит не в роли подлежащего, его можно опустить: the book (that) I read."
    ],
    examples: [["The woman who lives next door is a doctor", "Женщина, которая живёт рядом, врач"]]
  },
  "rel-2": {
    title: "Where, whose, when",
    points: [
      "<b>where</b> о месте (в котором), <b>when</b> о времени (в который), <b>whose</b> значит «чей», «у которого»."
    ],
    examples: [["This is the town where I grew up", "Это город, где я вырос"], ["He is the man whose car was stolen", "Это человек, у которого угнали машину"]]
  },
  "rel-3": {
    title: "Дополнительная информация в запятых",
    points: [
      "Если информация просто дополняет, её выделяют <b>запятыми</b>.",
      "В таких предложениях нельзя использовать <b>that</b>, только who / which."
    ],
    examples: [["Paris, which is the capital of France, is beautiful", "Париж, который является столицей Франции, прекрасен"]]
  },
  "ger-1": {
    title: "Глаголы, после которых -ing",
    points: [
      "После <b>enjoy, avoid, mind, finish, suggest, keep</b> используем глагол с <b>-ing</b>.",
      "Также -ing после предлогов: interested <b>in learning</b>, good <b>at drawing</b>."
    ],
    examples: [["I enjoy reading", "Я люблю читать"], ["She suggested going to the cinema", "Она предложила пойти в кино"]]
  },
  "ger-2": {
    title: "Глаголы, после которых to",
    points: [
      "После <b>decide, hope, plan, refuse, afford, manage, want</b> используем <b>to + глагол</b>."
    ],
    examples: [["We decided to stay", "Мы решили остаться"], ["She managed to finish", "Ей удалось закончить"]]
  },
  "ger-3": {
    title: "Когда смысл меняется",
    points: [
      "<b>remember to do</b> значит «не забыть сделать», а <b>remember doing</b> значит «помнить, что сделал».",
      "<b>stop doing</b> значит «перестать», а <b>stop to do</b> значит «остановиться, чтобы сделать».",
      "<b>try to do</b> значит «пытаться», а <b>try doing</b> значит «попробовать как способ»."
    ],
    examples: [["He stopped smoking", "Он бросил курить"], ["We stopped to have a coffee", "Мы остановились выпить кофе"]]
  },
  "reg-1": {
    title: "Третий тип: нереальное прошлое",
    points: [
      "<b>If + had + 3-я форма, would have + 3-я форма</b>: прошлое, которое уже не изменить.",
      "If I <b>had known</b>, I <b>would have come</b> значит «Если бы я знал (но я не знал), я бы пришёл»."
    ],
    examples: [["If we had left on time, we wouldn't have missed the flight", "Если бы мы вышли вовремя, мы бы не опоздали"]]
  },
  "reg-2": {
    title: "Сожаления о прошлом",
    points: [
      "<b>I wish + had + 3-я форма</b>: жаль, что сделал или не сделал.",
      "<b>If only</b> значит то же, но эмоциональнее.",
      "<b>regret + -ing</b>: жалеть о сделанном."
    ],
    examples: [["I wish I had studied harder", "Жаль, что я мало учился"]]
  },
  "reg-3": {
    title: "Смешанные условия",
    points: [
      "Прошлое влияет на настоящее: <b>If + had done, would + глагол</b>.",
      "If I <b>had taken</b> that job, I <b>would be</b> rich <b>now</b>."
    ],
    examples: [["My life would be different if I hadn't met you", "Моя жизнь была бы другой, если бы я тебя не встретил"]]
  },
  "emp-1": {
    title: "Инверсия для выразительности",
    points: [
      "После <b>never, rarely, hardly, not only, under no circumstances</b> в начале фразы порядок как в вопросе.",
      "<b>Never have I seen</b> ... (вместо I have never seen ...).",
      "Это книжный, торжественный стиль."
    ],
    examples: [["Rarely do we see such talent", "Редко встретишь такой талант"]]
  },
  "emp-2": {
    title: "Выделение главного",
    points: [
      "<b>What I need is ...</b>: «что мне нужно, так это ...».",
      "<b>It was Tom who ...</b>: «именно Том ...».",
      "<b>do / does / did</b> перед глаголом усиливает: I <b>do</b> like it значит «мне правда нравится»."
    ],
    examples: [["It was Tom who broke the window", "Именно Том разбил окно"]]
  },
  "emp-3": {
    title: "Although, despite, however",
    points: [
      "<b>although</b> + целое предложение: although it was raining.",
      "<b>despite / in spite of</b> + существительное или -ing: despite the rain, despite being tired.",
      "<b>However</b> начинает новое предложение и отделяется запятой."
    ],
    examples: [["Despite the rain, we went for a walk", "Несмотря на дождь, мы пошли гулять"]]
  },
  "idi-3": {
    title: "Make или do?",
    points: [
      "<b>make</b>: создавать результат: make a decision, make a mistake, make money.",
      "<b>do</b>: выполнять действие, работу: do homework, do your best, do the dishes.",
      "Эти пары лучше запоминать целиком."
    ],
    table: { head: ["make", "do"], rows: [["a decision", "homework"], ["a mistake", "your best"], ["money", "business"]] },
    examples: [["It's time to make a decision", "Пора принять решение"]]
  },
  "frm-3": {
    title: "Официальный и разговорный стиль",
    points: [
      "В деловой речи короткие слова заменяют на более формальные.",
      "buy → <b>purchase</b>, help → <b>assist</b>, need → <b>require</b>, start → <b>commence</b>, about → <b>regarding</b>.",
      "В письмах избегайте сокращений (I'm, don't): пишите I am, do not."
    ],
    examples: [["How may I assist you?", "Чем могу помочь?"]]
  },
  "nu-3": {
    title: "Сильные прилагательные",
    points: [
      "Вместо very + обычное слово носители часто берут сильное: very tired → <b>exhausted</b>.",
      "С сильными прилагательными используют <b>absolutely</b>, а не very: absolutely furious."
    ],
    table: { head: ["very ...", "сильное слово"], rows: [["very tired", "exhausted"], ["very hungry", "starving"], ["very angry", "furious"], ["very cold", "freezing"], ["very happy", "delighted"]] },
    examples: [["I'm absolutely exhausted", "Я совершенно вымотан"]]
  }
};
