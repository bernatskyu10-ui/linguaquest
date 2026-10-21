/* Конспекты для тетради и подробный разбор: темы B1 (25, 55, 54, 26, 59, 27, 28, 29, 30, 56) */
(function () {
  const N = (window.GRAMMAR_NOTES = window.GRAMMAR_NOTES || {});

  N[25] = {
    note: {
      name: "Present Perfect или Past Simple",
      idea: "Past Simple: есть «когда» или история закончена. Present Perfect: «когда» неважно, важен результат сейчас или опыт.",
      forms: [
        ["PS", "I + 2-я форма (went, saw, lost)"],
        ["PP", "I have / she has + 3-я форма (gone, seen, lost)"],
        ["?", "When did you...? → всегда Past Simple"]
      ],
      when: [
        "Названо время → PS: I lost my keys yesterday.",
        "Результат виден сейчас → PP: I have lost my keys (их нет).",
        "Опыт в жизни → PP: I have been to Paris twice.",
        "Период ещё идёт → PP: I have seen him today."
      ],
      signals: ["PS: yesterday, ago, last, in 2020", "PP: ever, never, already, yet, just, since"],
      examples: [
        ["I have broken my phone, so I can't call you.", "Я разбил телефон, поэтому не могу тебе позвонить."],
        ["I broke my phone last week.", "Я разбил телефон на прошлой неделе."],
        ["Have you ever eaten sushi? - Yes, I ate it in May.", "Ты когда-нибудь ел суши? - Да, ел в мае."]
      ],
      mistakes: [
        ["I have seen him yesterday.", "I saw him yesterday."],
        ["When have you arrived?", "When did you arrive?"],
        ["I am here since Monday.", "I have been here since Monday."]
      ],
      remember: "Есть «когда» → Past Simple. Нет «когда», но есть «сейчас» → Present Perfect."
    },
    deep: {
      why: [
        "В русском одно прошедшее время: «я потерял ключи» может значить и «вчера потерял», и «потерял, и их сейчас нет». Английский эти два смысла разводит. Past Simple смотрит на событие как на точку в прошлом, которая уже отрезана от сегодняшнего дня. Present Perfect смотрит из «сейчас» назад: что у меня есть сейчас благодаря тому, что случилось раньше.",
        "Название подсказывает: Present Perfect это всё-таки настоящее время (Present). Поэтому в нём вспомогательный глагол (помощник) have / has стоит в настоящем. Буквально I have lost my keys = «я имею потерянные ключи», то есть состояние сейчас. А Past Simple чисто прошлое: было и было, к сегодняшнему дню отношения не имеет.",
        "Отсюда главное правило: если в предложении названо законченное время в прошлом (yesterday, last week, in 2019, two days ago), то фраза уже привязана к прошлому, и Present Perfect невозможен. Англичанин скажет I saw him yesterday, а I have seen him yesterday режет ему слух, как нам «я завтра ходил».",
        "Ещё один случай: период времени. This week, today, this year ещё не закончились, поэтому про них можно говорить в Present Perfect: I have drunk three coffees today. А если день уже закончился (yesterday) или период остался в прошлом (last year), то только Past Simple."
      ],
      algo: [
        "Шаг 1. Есть ли в предложении точное прошлое время (yesterday, ago, last..., in 2020, when, what time)? Да → Past Simple. Дальше не думаем.",
        "Шаг 2. Нет времени? Спроси себя: я говорю о результате сейчас (ключей нет, нога сломана) или о жизненном опыте (ever, never, twice)? Да → Present Perfect.",
        "Шаг 3. Есть for или since, и это продолжается до сих пор? → Present Perfect (или Present Perfect Continuous для действий).",
        "Шаг 4. Рассказываешь историю по порядку (пошёл, увидел, купил)? → Past Simple.",
        "Шаг 5. Строим: PS = 2-я форма (вопрос и отрицание через did + 1-я форма). PP = have / has + 3-я форма (вопрос: Have you...? отрицание: haven't)."
      ],
      cases: [
        {
          h: "Опыт, потом подробности",
          t: "Разговор часто начинается в Present Perfect (вообще было ли), а как только появляются детали (когда, где, с кем), переходит в Past Simple. Это нормально и правильно.",
          ex: [["I've been to London. I went there with my dad in 2022.", "Я был в Лондоне. Я ездил туда с папой в 2022 году."]]
        },
        {
          h: "Человек жив или нет, период закончился или нет",
          t: "Shakespeare wrote many plays (его уже нет, период закончен). J. K. Rowling has written many books (она жива и может написать ещё). То же с местами: She lived in London for two years значит «теперь не живёт».",
          ex: [["She has lived in London since 2019.", "Она живёт в Лондоне с 2019 года (и сейчас)."], ["She lived in London for two years.", "Она жила в Лондоне два года (больше не живёт)."]]
        },
        {
          h: "been или gone",
          t: "He has been to Spain = он бывал в Испании и вернулся. He has gone to Spain = он уехал в Испанию и сейчас там.",
          ex: [["Where's Tom? - He has gone to the shop.", "Где Том? - Он ушёл в магазин (и ещё там)."]]
        },
        {
          h: "just: в британском и американском",
          t: "В британском английском I've just eaten. В американском часто говорят I just ate. Оба варианта понятны, но в тестах (британский стандарт) выбирай Present Perfect.",
          ex: [["I've just finished my homework.", "Я только что сделал домашку."]]
        }
      ],
      faq: [
        ["А почему нельзя I have seen him yesterday, если результат важен?", "Потому что yesterday привязывает действие к законченному прошлому, а Present Perfect про связь с «сейчас». Эти два сигнала противоречат друг другу, и время побеждает: только Past Simple."],
        ["Как перевести «Я тут живу с 2020 года»?", "Не Present Simple, а Present Perfect: I have lived here since 2020. По-русски настоящее, по-английски «тянется из прошлого в сейчас»."],
        ["Можно ли Present Perfect с ago?", "Нет. Ago всегда с Past Simple: I came two hours ago. А с since и for можно: I have been here for two hours."],
        ["А с already и yet что?", "В британском стандарте это слова Present Perfect: Have you done it yet? I've already done it. Если рядом есть точное время, всё равно Past Simple."]
      ]
    }
  };

  N[55] = {
    note: {
      name: "Present Perfect Continuous",
      idea: "Действие началось в прошлом и идёт до сих пор (или только что закончилось, и видны следы). По-русски обычно настоящее: «жду уже час».",
      forms: [
        ["+", "I have / she has + been + глагол-ing"],
        ["-", "I haven't / she hasn't + been + -ing"],
        ["?", "How long have you been + -ing?"]
      ],
      when: [
        "Длится до сих пор: I have been waiting for an hour.",
        "Только что закончилось, видны следы: I'm tired because I've been running.",
        "Вопрос «как долго»: How long have you been learning English?"
      ],
      signals: ["for", "since", "how long", "all day", "lately", "recently"],
      examples: [
        ["I have been learning English for three years.", "Я учу английский три года."],
        ["It has been raining since the morning.", "Дождь идёт с утра."],
        ["How long have you been living here?", "Сколько ты уже здесь живёшь?"]
      ],
      mistakes: [
        ["I am waiting for an hour.", "I have been waiting for an hour."],
        ["I have been knowing him for years.", "I have known him for years."],
        ["She has been work here since 2021.", "She has been working here since 2021."]
      ],
      remember: "Началось раньше, идёт до сих пор: have / has been + -ing."
    },
    deep: {
      why: [
        "Русский язык говорит «Я жду уже час» в настоящем времени, потому что я и сейчас жду. Английскому этого мало: он хочет показать сразу две вещи. Первая: действие началось в прошлом (час назад). Вторая: оно до сих пор идёт. Present Continuous (I am waiting) показывает только «сейчас», без начала. Поэтому для «уже час» английский берёт отдельное время.",
        "Это время собрано из двух знакомых: Present Perfect (have + 3-я форма, связь прошлого с настоящим) и Continuous (be + -ing, процесс). 3-я форма от be это been, поэтому получается have been + -ing. Каждый кусочек нужен: have показывает «до сейчас», been + -ing показывает «процесс».",
        "Второе значение: действие только что закончилось, но видны его следы. Ты пришёл весь мокрый, потому что бежал под дождём: I've been running. Здесь важно не то, что сделано, а то, что ты был занят этим процессом какое-то время.",
        "Отличие от Present Perfect Simple: Continuous про процесс и длительность («как долго»), Simple про результат и количество («сколько сделал»). I've been reading this book all day (процесс), I've read 50 pages (результат)."
      ],
      algo: [
        "Шаг 1. Слышишь «уже + срок» (уже час, уже три года) или «с + момент» (с утра, с 2020)? Действие идёт до сих пор? Значит, нужен Perfect, а не Present Simple или Present Continuous.",
        "Шаг 2. Глагол про действие (wait, learn, work, play)? → Present Perfect Continuous. Глагол состояния (know, like, want, have = иметь, be)? → обычный Present Perfect: have known.",
        "Шаг 3. Выбери for или since: for + сколько (for two hours), since + с какого момента (since Monday, since I was ten).",
        "Шаг 4. Строим: have / has + been + глагол-ing. Has для he, she, it. Проверь, что на месте все три части.",
        "Шаг 5. Если важно количество (сколько страниц, сколько раз), бери Present Perfect Simple: I've written three emails."
      ],
      cases: [
        {
          h: "Процесс или результат",
          t: "Continuous: чем был занят и как долго (следы, усталость). Simple: что получилось и сколько. С числами и количеством (three, two rooms, 50 pages) обычно Simple.",
          ex: [["I've been painting the fence. That's why my hands are dirty.", "Я красил забор. Поэтому руки грязные."], ["I've painted two rooms.", "Я покрасил две комнаты."]]
        },
        {
          h: "Глаголы состояния",
          t: "Know, like, love, hate, want, believe, understand, have (иметь), be обычно не ставят в Continuous. С ними для «уже давно» берём Present Perfect Simple.",
          ex: [["I have known her for five years.", "Я знаю её пять лет."], ["We have had this car since 2019.", "У нас эта машина с 2019 года."]]
        },
        {
          h: "live и work: можно оба",
          t: "С live, work, study разница почти незаметна: I've lived here for ten years и I've been living here for ten years оба правильны. Continuous чуть больше подчёркивает процесс или временность.",
          ex: [["I've been working here since May.", "Я работаю здесь с мая."]]
        }
      ],
      faq: [
        ["Почему нельзя просто I am learning English for three years?", "Present Continuous говорит только «сейчас» и не умеет показывать начало в прошлом. Для «уже три года» нужен have been."],
        ["for или since: как не перепутать?", "Задай вопрос. «Сколько?» (два часа, неделю) → for. «С какого момента?» (с понедельника, с 9 утра, с детства) → since."],
        ["Можно ли спросить «Сколько ты ждёшь?» как How long are you waiting?", "Нет, это ошибка. Правильно: How long have you been waiting?"],
        ["Чем отличается от Past Perfect Continuous?", "Past Perfect Continuous (had been + -ing) то же самое, но до момента в прошлом: I had been waiting for an hour when he came. Это следующий уровень, сейчас достаточно have been."]
      ]
    }
  };

  N[54] = {
    note: {
      name: "Past Perfect",
      idea: "Два действия в прошлом: то, что было раньше, ставим в Past Perfect, более позднее в Past Simple.",
      forms: [
        ["+", "I / she / they + had + 3-я форма (I'd finished)"],
        ["-", "I hadn't + 3-я форма"],
        ["?", "Had you + 3-я форма...?"]
      ],
      when: [
        "Раньше другого прошлого: When I came, the film had started.",
        "By the time + PS, ... had + 3-я ф.: the party had ended.",
        "Причина, которая случилась раньше: I knew him because I had met him before."
      ],
      signals: ["by the time", "before", "after", "already", "just", "never ... before"],
      examples: [
        ["When I got to the station, the train had left.", "Когда я добрался до вокзала, поезд уже ушёл."],
        ["She had finished her homework before dinner.", "Она сделала уроки до ужина."],
        ["I hadn't seen the film before.", "Я раньше не видел этот фильм."]
      ],
      mistakes: [
        ["When I came, the film already started.", "When I came, the film had already started."],
        ["I had seen him yesterday.", "I saw him yesterday."]
      ],
      remember: "Прошлое до прошлого: had + 3-я форма."
    },
    deep: {
      why: [
        "Представь линию времени. Past Simple ставит точку в прошлом: «Я пришёл». Past Perfect ставит точку ещё левее, раньше той точки: «фильм уже начался (до моего прихода)». Это «прошлое в прошлом», «предпрошедшее».",
        "В русском для этого есть только слово «уже» и порядок слов: «Когда я пришёл, фильм уже начался». Глагол стоит в обычном прошедшем, и смысл держится на «уже». В английском эту работу делает сама форма глагола: had started. Без неё фраза When I came, the film started означает другое: я пришёл, и фильм начался после этого.",
        "Сравни: When I arrived, she left (я пришёл, и тогда она ушла, мы встретились). When I arrived, she had left (она ушла раньше, мы не встретились). Одно слово had меняет весь сюжет.",
        "Важно: Past Perfect не значит «очень давно». Он нужен только тогда, когда есть другое прошлое событие, относительно которого мы смотрим назад. Если действие одно, хватает Past Simple, даже если это было сто лет назад."
      ],
      algo: [
        "Шаг 1. В предложении (или в рассказе) два события в прошлом? Если одно, бери Past Simple.",
        "Шаг 2. Они идут по порядку, как в рассказе (встал, поел, ушёл)? Тогда тоже только Past Simple.",
        "Шаг 3. Порядок нарушен: сначала называешь позднее событие, а потом более раннее? Раннее → had + 3-я форма.",
        "Шаг 4. Ищи подсказки: by the time, before, after, already, just, never ... before. После by the time обычно Past Simple, в другой части Past Perfect.",
        "Шаг 5. Строим: had (для всех лиц) + 3-я форма. Already и just ставим между had и глаголом: had already gone."
      ],
      cases: [
        {
          h: "Когда had не нужен: after и before уже показывают порядок",
          t: "С after и before порядок понятен и так, поэтому Past Perfect часто можно не ставить. Оба варианта правильны.",
          ex: [["After I (had) finished my homework, I went out.", "Когда я сделал уроки, я пошёл гулять."]]
        },
        {
          h: "Опыт до момента в прошлом",
          t: "Как Present Perfect говорит об опыте до сейчас, так Past Perfect говорит об опыте до момента в прошлом. Часто с never ... before, ever, before that.",
          ex: [["I had never flown before that trip.", "До той поездки я никогда не летал."], ["Had you ever been to London before?", "Ты раньше бывал в Лондоне?"]]
        },
        {
          h: "Сокращение 'd: had или would?",
          t: "I'd может быть и I had, и I would. Смотри, что дальше: 3-я форма (I'd finished) → had. Простой глагол (I'd go) → would.",
          ex: [["I'd seen it before.", "Я видел это раньше. (had)"], ["I'd go if I could.", "Я бы пошёл, если бы мог. (would)"]]
        }
      ],
      faq: [
        ["Почему нельзя I had seen him yesterday?", "Здесь только одно событие, и сравнивать не с чем. Past Perfect нужен лишь тогда, когда есть другое, более позднее прошлое. Поэтому I saw him yesterday."],
        ["Had меняется для he, she?", "Нет. Had один для всех: I had, she had, they had."],
        ["Как понять, что русское «уже» нужно переводить через had?", "Если «уже» стоит в рассказе о прошлом и значит «к тому моменту»: «Когда мы пришли, все уже ушли» → everyone had left. Если «уже» про сейчас («я уже поел»), это Present Perfect: I've already eaten."],
        ["Обязательно ли ставить Past Perfect в каждом длинном рассказе?", "Нет. Носители рассказывают в Past Simple и включают Past Perfect только там, где прыгают назад во времени."]
      ]
    }
  };

  N[26] = {
    note: {
      name: "Used to / would",
      idea: "Used to + глагол = раньше так было (обычно делал), а теперь нет. Would = повторялось в прошлом, только для действий.",
      forms: [
        ["+", "I used to + глагол"],
        ["-", "I didn't use to + глагол"],
        ["?", "Did you use to + глагол?"],
        ["would", "we would + глагол (только действия)"]
      ],
      when: [
        "Привычка раньше: I used to play games every day.",
        "Состояние раньше: I used to have long hair.",
        "Повтор в рассказе: Every summer we would go to the sea."
      ],
      signals: ["раньше", "when I was a child", "every summer", "any more", "now"],
      examples: [
        ["I used to play computer games every day.", "Раньше я каждый день играл в компьютерные игры."],
        ["There used to be a shop here.", "Раньше здесь был магазин."],
        ["My grandpa would tell us stories.", "Дедушка часто рассказывал нам истории."]
      ],
      mistakes: [
        ["I use to play football. (о прошлом)", "I used to play football."],
        ["I didn't used to like it.", "I didn't use to like it."],
        ["I would have long hair.", "I used to have long hair."]
      ],
      remember: "Used to: было, да сплыло."
    },
    deep: {
      why: [
        "По-русски мы говорим «раньше я играл» и словом «раньше» показываем контраст с сегодня. Английский Past Simple (I played) такого контраста сам по себе не даёт: просто «играл». А used to сразу говорит: это была привычка или состояние в прошлом, и сейчас этого больше нет.",
        "Used to работает только для прошлого. Для настоящего «обычно» англичане говорят usually + Present Simple: I usually walk to school. Формы I use to (в значении «обычно делаю сейчас») не существует.",
        "Would в этом значении похож на русское «бывало»: «бывало, дед рассказывал нам истории». Его используют в воспоминаниях и рассказах, когда картинка уже задана. Но would умеет описывать только повторяющиеся действия. Состояния (have, be, like, live, know) с would нельзя: I would have long hair звучит как «у меня были бы длинные волосы».",
        "Почему в отрицании и вопросе use без d? Тот же принцип, что с любым глаголом: прошлое уже показал did, второй раз не нужно. Как didn't go, а не didn't went."
      ],
      algo: [
        "Шаг 1. Говоришь о прошлом, которое изменилось («раньше ..., а теперь нет»)? Тогда used to.",
        "Шаг 2. Это действие, которое повторялось (играл, ездил, ходил)? Можно used to или would (would лучше в рассказе, когда время уже понятно).",
        "Шаг 3. Это состояние (был, имел, любил, жил)? Только used to.",
        "Шаг 4. Строим: + used to + глагол; - didn't use to + глагол; ? Did ... use to + глагол?",
        "Шаг 5. Если действие было один раз или точно известно сколько раз (I went there three times), это Past Simple, не used to."
      ],
      cases: [
        {
          h: "used to и Past Simple",
          t: "Past Simple годится всегда, used to добавляет «привычка, а теперь нет». Если событие было один раз или указано, сколько раз, used to нельзя.",
          ex: [["I went to Paris in 2019.", "Я ездил в Париж в 2019 году. (один раз)"], ["I used to go to the gym, but now I don't.", "Раньше я ходил в спортзал, а теперь нет."]]
        },
        {
          h: "There used to be",
          t: "Удобная конструкция про места: что раньше было, а теперь нет.",
          ex: [["There used to be a park near my house.", "Раньше возле моего дома был парк."]]
        },
        {
          h: "used to и be used to",
          t: "Похожи только внешне. Used to + глагол = раньше делал. Be used to + -ing = привык (тема «Be used to»).",
          ex: [["I used to get up early.", "Раньше я вставал рано."], ["I'm used to getting up early.", "Я привык рано вставать."]]
        }
      ],
      faq: [
        ["Как сказать «Я обычно хожу в школу пешком»?", "I usually walk to school. Used to только о прошлом."],
        ["А never used to можно?", "Да: I never used to like coffee. Это то же, что I didn't use to like coffee, но чуть эмоциональнее."],
        ["Чем would отличается от used to?", "Would только для повторяющихся действий и обычно в рассказе. Used to и для действий, и для состояний. Если сомневаешься, бери used to, он подходит почти всегда."],
        ["Как произносится used to?", "Слитно, как «юста» [ˈjuːstə], с глухим «с». Так же и в didn't use to."]
      ]
    }
  };

  N[59] = {
    note: {
      name: "Be used to / get used to",
      idea: "Be used to + -ing / сущ. = уже привык. Get used to = привыкать, привыкнуть.",
      forms: [
        ["1", "used to + глагол = раньше делал"],
        ["2", "be used to + -ing / сущ. = привык"],
        ["3", "get used to + -ing / сущ. = привыкаю"]
      ],
      when: [
        "Уже нормально: I'm used to getting up early.",
        "Процесс привыкания: I'm getting used to my new school.",
        "Обещание: Don't worry, you'll get used to it."
      ],
      signals: [],
      examples: [
        ["I'm used to cold weather.", "Я привык к холодной погоде."],
        ["He isn't used to the food here.", "Он не привык к здешней еде."],
        ["It took me a month to get used to the noise.", "Мне понадобился месяц, чтобы привыкнуть к шуму."]
      ],
      mistakes: [
        ["I am used to get up early.", "I am used to getting up early."],
        ["I used to getting up early.", "I am used to getting up early."],
        ["I use to the noise.", "I'm used to the noise."]
      ],
      remember: "Привык К чему? To = «к», а после «к» идёт -ing или слово."
    },
    deep: {
      why: [
        "Здесь used это не глагол «использовал», а прилагательное «привыкший». Поэтому be used to буквально «быть привыкшим к». Как be tired (быть уставшим) или be afraid of (бояться).",
        "Главная ловушка: маленькое to. В used to + глагол (раньше делал) to это частица перед глаголом, как в to go. А в be used to это предлог «к», как в русском «привык к». После предлога глагол не может стоять голым, ему нужно окончание -ing (это называется герундий, глагол в роли существительного). Поэтому I'm used to getting up, а не to get up.",
        "Be и get делят работу так же, как в русском «привык» и «привыкаю». Be used to = состояние: уже привык, мне нормально. Get used to = процесс или его итог: привыкаю, привык (со временем), привыкну. Get даже в других выражениях значит «становиться»: get tired (устать), get dark (стемнеть).",
        "Be и get меняются по временам как обычно, а used to остаётся неизменным: I was used to it, I'll get used to it, I got used to it, I'm getting used to it."
      ],
      algo: [
        "Шаг 1. Смысл «раньше делал, теперь нет»? → used to + глагол (I used to swim). Дальше не думаем.",
        "Шаг 2. Смысл «привык, мне уже нормально»? → be (am / is / are / was) + used to.",
        "Шаг 3. Смысл «привыкаю / привыкну / привык со временем»? → get (am getting / got / will get) + used to.",
        "Шаг 4. После to: если дальше действие, добавь -ing (getting up, living); если предмет, просто слово (the noise, the food, it).",
        "Шаг 5. Отрицание: I'm not used to, I can't get used to. Вопрос: Are you used to...? Have you got used to...?"
      ],
      cases: [
        {
          h: "Три выражения рядом",
          t: "Разница только в слове перед used: ничего, be или get. Сравни:",
          ex: [["I used to live alone.", "Раньше я жил один."], ["I'm used to living alone.", "Я привык жить один."], ["I'm getting used to living alone.", "Я привыкаю жить один."]]
        },
        {
          h: "Привыкнуть в прошлом: was used to или got used to",
          t: "I was used to it = в тот момент я уже был привыкшим. I got used to it = со временем я привык (процесс завершился).",
          ex: [["At first it was hard, but I got used to it.", "Сначала было трудно, но я привык."]]
        },
        {
          h: "Другие выражения с предлогом to",
          t: "Тот же принцип (to = предлог, дальше -ing) в look forward to, be close to: I'm looking forward to seeing you.",
          ex: [["I look forward to hearing from you.", "Жду вашего ответа."]]
        }
      ],
      faq: [
        ["Почему не I'm used to get up, ведь после to обычно глагол?", "После to-частицы да (I want to go). Но здесь to предлог, как «к». После предлогов в английском глагол всегда с -ing: good at swimming, interested in reading, used to getting up."],
        ["Можно ли сказать I used to it?", "Нет, пропал be. Нужно I'm used to it (привык) или I got used to it (привык со временем)."],
        ["Как сказать «Я никак не могу привыкнуть к ...»?", "I can't get used to ...: I can't get used to the time difference."],
        ["Чем «I'm used to» отличается от «I usually»?", "Usually = обычно так делаю. Be used to = мне это привычно, не трудно. I usually get up at 6 (факт), I'm used to getting up at 6 (мне не тяжело)."]
      ]
    }
  };

  N[27] = {
    note: {
      name: "Условные предложения 0, 1, 2, 3",
      idea: "Если-предложения. Тип выбираем по смыслу: факт, реальное будущее, нереальное сейчас, нереальное прошлое.",
      forms: [
        ["0", "If + Present, Present (всегда так)"],
        ["1", "If + Present, will + глагол (реально)"],
        ["2", "If + Past, would + глагол (нереально сейчас)"],
        ["3", "If + had + 3-я ф., would have + 3-я ф. (прошлое)"]
      ],
      when: [
        "0: факт. If you heat ice, it melts.",
        "1: реально в будущем. If it rains, I will stay home.",
        "2: мечта сейчас. If I had money, I would buy a car.",
        "3: жалею о прошлом. If I had studied, I would have passed."
      ],
      signals: ["if", "unless", "when", "If I were you"],
      examples: [
        ["If you study, you will pass.", "Если будешь заниматься, сдашь."],
        ["If I were you, I would apply.", "На твоём месте я бы подал документы."],
        ["If we had left earlier, we wouldn't have missed the bus.", "Если бы мы вышли раньше, мы бы не опоздали на автобус."]
      ],
      mistakes: [
        ["If it will rain, I'll stay home.", "If it rains, I'll stay home."],
        ["If I would have money, I would buy it.", "If I had money, I would buy it."],
        ["If I studied yesterday, I would pass.", "If I had studied, I would have passed."]
      ],
      remember: "После if не ставим will и would: они живут в другой части."
    },
    deep: {
      why: [
        "Все условные предложения из двух частей: условие (if-часть) и результат. Тип выбираем, задавая два вопроса: это реально или нереально? И о каком времени речь: всегда, будущее, сейчас или прошлое?",
        "Тип 0 и 1 про реальное. Тип 0: так бывает всегда, как закон (нагреешь лёд, он тает). Тип 1: может случиться в будущем. По-русски «если пойдёт дождь» звучит в будущем, но английский после if ставит Present: if it rains. Логика такая: условие лишь «предполагается», будущее уже показано в другой части словом will.",
        "Тип 2 и 3 про нереальное, это русское «бы». Здесь английский «отодвигает» глагол на шаг в прошлое, чтобы показать, что это не реальность, а воображение. Тип 2: If I had money (форма прошедшая, но говорим о сейчас: денег нет). Тип 3: ещё шаг назад, If I had studied (прошлое, которое уже не изменить). Русское «бы» в результате превращается в would (тип 2) или would have + 3-я форма (тип 3).",
        "В русском одно «бы» на все случаи: «если бы я учил, я бы сдал» может быть и про сейчас, и про вчера. В английском нужно решить: о сейчас (тип 2) или о прошлом (тип 3). Подсказка в контексте: «вчера», «тогда», «в прошлом году» → тип 3."
      ],
      algo: [
        "Шаг 1. В русском есть «бы»? Нет → тип 0 или 1. Да → тип 2 или 3.",
        "Шаг 2. Без «бы»: это всегда так (факт, привычка)? → тип 0 (Present + Present). Это конкретная ситуация в будущем? → тип 1 (If + Present, will + глагол).",
        "Шаг 3. С «бы»: о сейчас или вообще (а на самом деле не так)? → тип 2 (If + Past, would + глагол). О прошлом, которое уже случилось? → тип 3 (If + had + 3-я ф., would have + 3-я ф.).",
        "Шаг 4. Проверь if-часть: в ней никогда нет will и would.",
        "Шаг 5. Запятая: если if в начале, ставим запятую между частями. Если if в середине, запятая не нужна: I'll call you if I have time."
      ],
      cases: [
        {
          h: "If I were you",
          t: "Во 2-м типе после if для всех лиц можно ставить were, даже для I, he, she. If I were you, I would... = «на твоём месте я бы...», классический совет. If I was тоже встречается в разговоре, но в тестах лучше were.",
          ex: [["If I were you, I would talk to her.", "На твоём месте я бы поговорил с ней."], ["If she were here, she would help us.", "Если бы она была здесь, она бы нам помогла."]]
        },
        {
          h: "Тип 1 или тип 2: насколько реально",
          t: "Один и тот же план можно сказать двумя способами. Тип 1: это вполне может случиться. Тип 2: я считаю, что вряд ли.",
          ex: [["If I win the competition, I'll buy a laptop.", "Если я выиграю конкурс, куплю ноутбук. (верю, что могу)"], ["If I won the lottery, I would travel the world.", "Если бы я выиграл в лотерею, я бы объехал мир. (мечта)"]]
        },
        {
          h: "unless = if not",
          t: "Unless значит «если не», и после него глагол без not.",
          ex: [["You won't pass unless you study.", "Ты не сдашь, если не будешь заниматься."]]
        },
        {
          h: "when и if в типе 1",
          t: "If = может случиться, а может и нет. When = точно случится, вопрос только в моменте. После when тоже Present, а не will.",
          ex: [["When I get home, I'll call you.", "Когда приду домой, позвоню тебе."]]
        }
      ],
      faq: [
        ["Почему If it rains, а не If it will rain, если это будущее?", "Будущее показывает will в другой части. В if-части английский ставит Present, так устроены все придаточные условия и времени (if, when, before, after, as soon as)."],
        ["Почему в типе 2 прошедшее время, если речь о сейчас?", "Прошедшая форма тут не про время, а про «нереальность». Английский отодвигает глагол назад, чтобы показать: это воображение, а не факт."],
        ["Можно ли переставить части?", "Да: I would buy a car if I had money. Смысл тот же, только запятая не нужна."],
        ["Как отличить would have от had в типе 3?", "Had + 3-я форма всегда в if-части (условие). Would have + 3-я форма всегда в результате. If I had known, I would have come."],
        ["А смешанные типы бывают?", "Бывают (прошлое условие и результат сейчас), это уровень B2. Пока освой четыре основных."]
      ]
    }
  };

  N[28] = {
    note: {
      name: "Пассивный залог (Passive)",
      idea: "Важно не кто сделал, а что сделано или с чем это случилось. Главным в предложении становится предмет.",
      forms: [
        ["+", "be (в нужном времени) + 3-я форма"],
        ["-", "be + not + 3-я форма (wasn't made)"],
        ["?", "Be + предмет + 3-я форма? (Was it made...?)"],
        ["by", "... by + кто сделал"]
      ],
      when: [
        "Неважно, кто сделал: English is spoken here.",
        "Исполнитель неизвестен: My bike has been stolen.",
        "Важен предмет, а автор после by: The book was written by Tolstoy."
      ],
      signals: ["by", "was born", "is made", "has been"],
      examples: [
        ["iPhones are made in China.", "Айфоны делают в Китае."],
        ["The house was built in 1990.", "Дом построили в 1990 году."],
        ["The results will be announced tomorrow.", "Результаты объявят завтра."]
      ],
      mistakes: [
        ["The house built in 1990.", "The house was built in 1990."],
        ["I born in 2010.", "I was born in 2010."],
        ["The book was written from Tolstoy.", "The book was written by Tolstoy."]
      ],
      remember: "Be + 3-я форма: не я сделал, со мной сделали."
    },
    deep: {
      why: [
        "В английском почти каждое предложение начинается с подлежащего (того, кто или что главное). В активном залоге главный тот, кто действует: They make iPhones in China. Но часто исполнитель неважен или неизвестен. Тогда английский ставит на первое место предмет, а глагол переводит в пассив: iPhones are made in China.",
        "В русском мы решаем эту задачу по-другому: «В Китае делают айфоны», «Дом построили в 1990» (без «кто»). Английский так не умеет: ему обязательно нужно подлежащее. Поэтому там, где русский говорит «делают», «построили», «украли», английский часто использует пассив.",
        "Формула всегда из двух частей: be + 3-я форма. Значение «со мной что-то делают» несёт 3-я форма (made, built, stolen). А be отвечает за время: is made (сейчас), was made (в прошлом), will be made (в будущем), has been made (уже сделано). Поэтому, зная времена be, ты знаешь все времена пассива.",
        "Самый частый пример, который русские не замечают: «я родился». В английском это пассив: I was born (меня родили). Без was это ошибка."
      ],
      algo: [
        "Шаг 1. Кто главный в твоей фразе: тот, кто делает, или то, что сделано? Если второе, или исполнитель неизвестен, нужен пассив.",
        "Шаг 2. Поставь на первое место предмет: The house..., My bike..., English...",
        "Шаг 3. Определи время и поставь be в этом времени: is / are, was / were, will be, has / have been, после модальных must / can / should + be.",
        "Шаг 4. Добавь 3-ю форму глагола: built, made, written, stolen.",
        "Шаг 5. Если важно, кто сделал, добавь by + исполнитель. Если неважно или понятно, by не нужен."
      ],
      cases: [
        {
          h: "Один предмет или много: was или were",
          t: "Be согласуется с подлежащим, то есть с предметом: The photo was taken, the photos were taken.",
          ex: [["These photos were taken in Sochi.", "Эти фото сделаны в Сочи."]]
        },
        {
          h: "by или with",
          t: "By = кто сделал (человек, автор). With = чем сделали (инструмент).",
          ex: [["The window was broken by a boy.", "Окно разбил мальчик."], ["The window was broken with a stone.", "Окно разбили камнем."]]
        },
        {
          h: "Пассив с модальными глаголами",
          t: "После must, can, should, have to глагол be стоит в простой форме, затем 3-я форма.",
          ex: [["It must be done today.", "Это нужно сделать сегодня."], ["Phones can't be used during the test.", "Телефонами нельзя пользоваться во время теста."]]
        },
        {
          h: "Глаголы, у которых нет пассива",
          t: "Если у глагола нет дополнения (кого, что), пассив невозможен: happen, arrive, die, sleep. Не говорят It was happened, только It happened.",
          ex: [["What happened?", "Что случилось?"]]
        }
      ],
      faq: [
        ["Почему не The house built in 1990?", "Без be получается «Дом построил...», как будто дом сам строил. Be обязателен, он показывает, что дом объект действия."],
        ["Как задать вопрос в пассиве?", "Be выходит вперёд: Was the house built in 1990? Where was this film made? 3-я форма остаётся на месте."],
        ["Обязательно ли говорить by?", "Нет, чаще всего by не ставят: исполнитель неизвестен или неважен. By добавляют, когда это новая или важная информация."],
        ["Чем пассив в Present Perfect отличается от Past?", "Как в активе: has been stolen (украли, и его сейчас нет, важен результат), was stolen yesterday (есть время, просто факт прошлого)."]
      ]
    }
  };

  N[29] = {
    note: {
      name: "Косвенная речь",
      idea: "Пересказываем чужие слова после said / told / asked: время сдвигается на шаг назад, местоимения меняются по смыслу.",
      forms: [
        ["1", "am / is → was, like → liked, will → would, can → could"],
        ["2", "saw / have seen → had seen"],
        ["?", "asked if + кто + глагол (вопрос да / нет)"],
        ["wh", "asked where + кто + глагол (прямой порядок)"]
      ],
      when: [
        "Пересказ: He said (that) he was tired.",
        "Кому сказал: He told me (that) he was busy.",
        "Пересказ вопроса: She asked where I lived.",
        "Вежливый вопрос: Do you know where the station is?"
      ],
      signals: ["said", "told", "asked", "wanted to know", "Do you know", "Can you tell me"],
      examples: [
        ["\"I will call.\" → He said he would call.", "«Я позвоню». → Он сказал, что позвонит."],
        ["\"Can you help?\" → He asked if I could help.", "«Можешь помочь?» → Он спросил, могу ли я помочь."],
        ["Can you tell me what time it is?", "Не подскажете, который час?"]
      ],
      mistakes: [
        ["He said me that he was busy.", "He told me that he was busy."],
        ["She asked where did I live.", "She asked where I lived."],
        ["Do you know where is the station?", "Do you know where the station is?"]
      ],
      remember: "Said в прошлом: время шаг назад. Вопрос пересказал: порядок как в рассказе."
    },
    deep: {
      why: [
        "В русском при пересказе время не меняется: «Он сказал, что устал», «Она сказала, что ей нравится». А в английском главный глагол said уже в прошлом, и всё, что зависит от него, тоже «уезжает» в прошлое на одну ступеньку. Это называется согласование времён. Русские часто забывают про сдвиг, потому что в родном языке его нет.",
        "Таблица шагов простая: Present → Past (am → was, like → liked), Past и Present Perfect → Past Perfect (saw → had seen), will → would, can → could. Логика: то, что человек сказал тогда, было «его настоящим», а для нас сейчас это уже прошлое.",
        "Пересказанный вопрос перестаёт быть вопросом. Это просто часть повествовательного предложения, поэтому порядок слов прямой: сначала кто, потом глагол, без do / does / did и без знака вопроса. Where do you live? → She asked where I lived. Для вопросов «да / нет» вместо вопросительного слова ставим if (ли): He asked if I could help.",
        "То же правило прямого порядка работает в вежливых вопросах: Do you know where the station is? Can you tell me what time it is? Вопрос уже задан первой частью (Do you know), а вторая часть идёт как обычное утверждение."
      ],
      algo: [
        "Шаг 1. Выбери глагол: said (без «кому»), told + кому (told me, told her), asked (для вопросов).",
        "Шаг 2. Если said / told / asked в прошлом, сдвинь время на шаг назад: is → was, do → did, did → had done, will → would, can → could.",
        "Шаг 3. Поменяй местоимения по смыслу: «Я устал» (говорит он) → he was tired. «Твоя идея» (мне) → my idea.",
        "Шаг 4. Если это вопрос: с вопросительным словом → asked where / what / why + кто + глагол; без него → asked if + кто + глагол. Без do / did, без вопроса в конце.",
        "Шаг 5. Проверь слова времени по смыслу: tomorrow → the next day, yesterday → the day before, here → there (если пересказываешь позже и в другом месте)."
      ],
      cases: [
        {
          h: "say или tell",
          t: "Say что-то (без человека): He said that... Tell кому-то: He told me that... Нельзя He said me, и нельзя He told that (без кому). Если очень надо сказать «кому» после say, нужен to: He said to me.",
          ex: [["He said that he was busy.", "Он сказал, что занят."], ["He told me that he was busy.", "Он сказал мне, что занят."]]
        },
        {
          h: "Когда сдвиг не нужен",
          t: "Если главный глагол в настоящем (He says), время не меняется. Если сказанное всё ещё правда, сдвиг тоже можно не делать.",
          ex: [["He says he is tired.", "Он говорит, что устал."], ["She said Moscow is the capital of Russia.", "Она сказала, что Москва столица России."]]
        },
        {
          h: "Просьбы и приказы: told / asked + to + глагол",
          t: "Если пересказываем просьбу или приказ, используем told / asked + кому + to + глагол. Отрицание: not to.",
          ex: [["\"Close the door.\" → She told me to close the door.", "«Закрой дверь». → Она сказала мне закрыть дверь."], ["\"Don't be late.\" → He asked us not to be late.", "«Не опаздывайте». → Он попросил нас не опаздывать."]]
        }
      ],
      faq: [
        ["That обязательно?", "Нет. He said he was tired и He said that he was tired оба правильны. В разговоре that часто опускают."],
        ["Почему в «asked where I lived» нет did?", "Did нужен только в настоящем вопросе. Пересказанный вопрос уже не вопрос, а часть рассказа, поэтому порядок как в утверждении: I lived."],
        ["Как сказать «спросил, хочу ли я»?", "Русское «ли» = if (или whether): He asked if I wanted some tea."],
        ["А если сказали прямо сейчас, сдвигать надо?", "Если пересказываешь сразу, и глагол says (настоящее), то не надо: She says she's coming. Сдвиг включает именно прошедшее said."]
      ]
    }
  };

  N[30] = {
    note: {
      name: "Придаточные: who, which, that, whose, where",
      idea: "Слово «который» соединяет два предложения: уточняет, о ком или о чём речь, или добавляет информацию.",
      forms: [
        ["who", "о людях: the man who lives next door"],
        ["which", "о вещах и животных: the phone which I bought"],
        ["that", "люди и вещи, без запятых: the film that we watched"],
        ["whose", "чей: the girl whose dad is a pilot"],
        ["where", "где: the city where I was born"]
      ],
      when: [
        "Без запятых: без этой части непонятно, о ком речь.",
        "С запятыми: просто доп. информация, that нельзя.",
        "Если после «который» идёт новый «кто», that можно убрать."
      ],
      signals: [],
      examples: [
        ["I know a girl who speaks French.", "Я знаю девочку, которая говорит по-французски."],
        ["The film we watched was boring.", "Фильм, который мы смотрели, был скучным."],
        ["My brother, who lives in Kazan, is a doctor.", "Мой брат, который живёт в Казани, врач."]
      ],
      mistakes: [
        ["The phone what I bought is great.", "The phone which / that I bought is great."],
        ["The man which lives here is a doctor.", "The man who lives here is a doctor."],
        ["The film that we watched it was boring.", "The film that we watched was boring."]
      ],
      remember: "Who - люди, which - вещи, that - всем, но не после запятой."
    },
    deep: {
      why: [
        "Русское «который» одно на всех, а английский делит его по тому, о ком речь: who для людей, which для вещей и животных, that универсальный. Плюс отдельные слова whose (чей) и where (где). Это похоже на то, как в русском мы говорим «человек, который» и «место, где».",
        "Слово-связка заменяет одно из слов второго предложения. The man lives next door. He is a doctor. → The man who lives next door is a doctor. Who встало на место he. Поэтому второй раз he, it или them повторять нельзя: the film that we watched (не watched it).",
        "Есть два вида таких придаточных. Уточняющие (без запятых): без них непонятно, о ком речь. The students who passed got a prize: приз получили только те, кто сдал. Дополнительные (с запятыми): человек и так понятен, мы просто добавляем факт. My brother, who lives in Kazan, is a doctor: брат у меня один, Казань просто доп. инфо. В таких с запятыми that нельзя.",
        "В уточняющих придаточных связку часто вообще выбрасывают, если после неё стоит свой «кто» (подлежащее): The film (that) we watched. Но если связка сама «кто» (The man who lives here), убирать её нельзя, иначе предложение развалится."
      ],
      algo: [
        "Шаг 1. О ком или о чём «который»? Человек → who (или that). Вещь, животное → which (или that). «Чей» → whose. Место «где» → where.",
        "Шаг 2. Нужна ли эта часть, чтобы понять, о ком речь? Да → без запятых, можно that. Нет (доп. инфо) → запятые с двух сторон, только who / which.",
        "Шаг 3. Сразу после связки идёт новый «кто» (I, we, my mom)? Тогда в уточняющем придаточном связку можно убрать: the book I read.",
        "Шаг 4. Проверь, что не повторил he / it / them после связки: связка уже их заменила.",
        "Шаг 5. Если «который» с предлогом («с которым», «в котором»), в разговоре предлог ставят в конец: the girl I talked to."
      ],
      cases: [
        {
          h: "what вместо which: частая ошибка",
          t: "Русские часто говорят the phone what I bought. What как связка после существительного не работает. Правильно which или that.",
          ex: [["The phone that I bought is great.", "Телефон, который я купил, отличный."]]
        },
        {
          h: "where или which",
          t: "Where = «в котором, где», после него полное предложение. Which = «который», и предлог остаётся. Оба правильны, просто построение разное.",
          ex: [["This is the city where I was born.", "Это город, где я родился."], ["This is the city which I was born in.", "Это город, в котором я родился."]]
        },
        {
          h: "Запятые меняют смысл",
          t: "Без запятых: были и другие (уточняем, какие). С запятыми: речь обо всех (добавляем инфо).",
          ex: [["My sister who lives in Paris is a designer.", "Моя сестра, та, что живёт в Париже, дизайнер. (есть и другие сёстры)"], ["My sister, who lives in Paris, is a designer.", "Моя сестра (единственная) живёт в Париже, она дизайнер."]]
        }
      ],
      faq: [
        ["Можно ли всегда говорить that?", "В уточняющих придаточных (без запятых) почти всегда да. После запятой нельзя, там только who или which."],
        ["Когда можно выкинуть that?", "Когда после него идёт свой «кто»: the film (that) we watched. Нельзя, если связка сама «кто»: the man who lives here (без who не получится)."],
        ["Для животных who или which?", "Обычно which (или that). Но про своего питомца с именем часто говорят who: my dog Rex, who loves water."],
        ["Чем whose отличается от who's?", "Whose = чей (the girl whose dad...). Who's = who is (Who's there?). Звучат одинаково, пишутся по-разному."]
      ]
    }
  };

  N[56] = {
    note: {
      name: "Вопросы к подлежащему",
      idea: "Если спрашиваем, кто или что делает, do / does / did не нужны: Who + глагол, порядок как в утверждении.",
      forms: [
        ["1", "Who / What + глагол? (Who called you?)"],
        ["2", "Who / What + did + кто + глагол? (Who did you call?)"],
        ["3", "Which / How many + сущ. + глагол? (Which team won?)"]
      ],
      when: [
        "Не знаем, кто делает: Who broke the window?",
        "Не знаем, что случилось: What happened?",
        "В настоящем глагол с -s: Who wants pizza?"
      ],
      signals: ["who", "what", "which", "whose", "how many"],
      examples: [
        ["Who called Anya?", "Кто позвонил Ане?"],
        ["Who did Anya call?", "Кому позвонила Аня?"],
        ["How many students passed the test?", "Сколько учеников сдали тест?"]
      ],
      mistakes: [
        ["Who did call you?", "Who called you?"],
        ["What did happen?", "What happened?"],
        ["Who want pizza?", "Who wants pizza?"]
      ],
      remember: "Спрашиваю «кто?» - do не зову."
    },
    deep: {
      why: [
        "В обычном вопросе (Where do you live?) вспомогательный глагол (помощник) do / does / did выходит вперёд и становится перед «кто»: do you. Но что если мы не знаем как раз этого «кто»? Тогда вопросительное слово само становится на место подлежащего, и переставлять нечего.",
        "Сравни: Tom broke the window. Спрашиваем о Томе: убираем Tom, ставим Who → Who broke the window? Всё остальное остаётся как было, даже форма broke. А если спрашиваем об окне (что разбил Том), Том остаётся в предложении, и работает обычная схема с did: What did Tom break?",
        "В русском разницу показывают падежи: «Кто позвонил Ане?» и «Кому позвонила Аня?». В английском who не меняется (в разговоре), поэтому разницу показывает только did и порядок слов. Who called Anya? (кто звонил) и Who did Anya call? (кому звонила) отличаются именно этим.",
        "В настоящем времени who и what считаются как «он», поэтому глагол получает -s: Who wants ice cream? Даже если ответ будет «мы все», в вопросе всё равно wants."
      ],
      algo: [
        "Шаг 1. Что я не знаю: того, кто делает (подлежащее), или того, с кем / с чем делают (дополнение)?",
        "Шаг 2. Не знаю, кто делает → Who / What + глагол в нужном времени + остальное: Who lives here? What happened?",
        "Шаг 3. Знаю, кто делает, а спрашиваю о другом → Who / What + do / does / did + кто + глагол: Who do you live with?",
        "Шаг 4. В настоящем в вопросе к подлежащему добавь -s: Who knows? What makes you happy?",
        "Шаг 5. С be, can, will ничего особенного: Who is there? Who can help me? Who will come?"
      ],
      cases: [
        {
          h: "Which, whose, how many + существительное",
          t: "Если вопросительное слово стоит вместе с существительным, и вся эта группа подлежащее, тоже без do.",
          ex: [["Which team won the match?", "Какая команда выиграла матч?"], ["Whose phone is ringing?", "Чей телефон звонит?"]]
        },
        {
          h: "What happened и похожие",
          t: "Happen, go on, go wrong почти всегда в вопросе к подлежащему, поэтому без did.",
          ex: [["What happened to your phone?", "Что случилось с твоим телефоном?"], ["What went wrong?", "Что пошло не так?"]]
        },
        {
          h: "Who с предлогом: кому, с кем, о ком",
          t: "Вопрос к дополнению с предлогом строим с do / did, а предлог ставим в конец.",
          ex: [["Who are you talking to?", "С кем ты разговариваешь?"], ["Who did you go with?", "С кем ты ходил?"]]
        }
      ],
      faq: [
        ["Почему не Who did call you?", "Did нужен, чтобы выйти перед подлежащим. Здесь подлежащее и есть who, перед ним вставать некуда. Who did call you звучит только с особым ударением («так кто же всё-таки звонил?»), в обычной речи это ошибка."],
        ["Почему Who wants, а не Who want, если ответ «мы»?", "Who по правилам считается единственным числом, как he. Поэтому в вопросе всегда -s."],
        ["Как понять по русскому вопросу, какой нужен?", "«Кто?» и «Что?» в именительном падеже (кто сделал, что случилось) → без do. «Кого? Кому? С кем? Что (сделал он)?» → с do / did."],
        ["А в вопросе Who are you? тоже подлежащее?", "Здесь подлежащее you, а who часть сказуемого. Но с be do не нужен в любом случае, поэтому порядок обычный для be."]
      ]
    }
  };
})();
