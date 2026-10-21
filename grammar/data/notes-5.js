/* Конспекты для тетради и подробный разбор: темы B2 (60, 61, 64, 39, 62, 40, 63, 41, 42, 65, 37, 43) */
(function () {
  const N = (window.GRAMMAR_NOTES = window.GRAMMAR_NOTES || {});

  N[60] = {
    note: {
      name: "Future Continuous и Future Perfect",
      idea: "Future Continuous: буду в процессе в точный момент будущего. Future Perfect: уже будет сделано к моменту в будущем.",
      forms: [
        ["FC +", "I will be + глагол-ing"],
        ["FP +", "I will have + 3-я форма"],
        ["-", "won't be doing / won't have done"],
        ["?", "Will you be doing? / Will you have done?"]
      ],
      when: [
        "FC, процесс в момент: This time tomorrow I'll be flying.",
        "FC, фон для другого действия: When you come, I'll be cooking.",
        "FC, вежливый вопрос о планах: Will you be using the laptop?",
        "FP, готово к сроку: By June I'll have finished school."
      ],
      signals: ["this time tomorrow", "at 5 tomorrow", "all evening", "by Friday", "by the time", "by then"],
      examples: [
        ["At 8 pm I'll be doing my homework.", "В 8 вечера я буду делать уроки."],
        ["By 2030 I will have graduated from university.", "К 2030 году я уже окончу университет."],
        ["Will you be using your bike tomorrow?", "Ты завтра будешь пользоваться велосипедом?"]
      ],
      mistakes: [
        ["By Friday I will finish it. (уже к пятнице)", "By Friday I will have finished it."],
        ["By the time you will come", "By the time you come"],
        ["When you call, I will drive.", "When you call, I will be driving."]
      ],
      remember: "AT - я в процессе (be + -ing), BY - уже готово (have + 3-я форма)."
    },
    deep: {
      why: [
        "Оба времени смотрят на одну точку в будущем, но с разных сторон. Представь, что ты делаешь фото завтрашнего дня в 10 утра. Если на фото действие идёт полным ходом (я сижу в самолёте, я пишу контрольную), это Future Continuous: will be + -ing. Если на фото уже виден готовый результат (эссе дописано и лежит на столе), это Future Perfect: will have + 3-я форма.",
        "В русском оба смысла часто передаются одним «буду / сделаю», и мы добавляем слова «уже», «как раз», «к тому времени». В английском разницу несёт сама форма глагола. Поэтому нельзя просто перевести «к пятнице я закончу» как I will finish: если смысл «к пятнице уже будет готово», англичанин ждёт will have finished.",
        "Future Continuous ещё умеет звучать мягко. Will you be using the car tonight? не просит машину напрямую, а просто узнаёт твои планы, чтобы не давить. Сравни: Will you lend me the car? это уже просьба. Это удобная вежливая форма.",
        "Важное общее правило: после when, if, before, after, until, as soon as, by the time будущее не ставим, там Present Simple. Будущее (will) стоит только в главной части: By the time you come, we'll have eaten."
      ],
      algo: [
        "Шаг 1. Найди в предложении точку в будущем: время (at 6, this time tomorrow) или событие (when you come, by Monday).",
        "Шаг 2. Спроси себя: в этот момент действие ещё идёт? Тогда will be + -ing.",
        "Шаг 3. Или к этому моменту оно уже закончено? Слово by (к) почти всегда подсказывает это. Тогда will have + 3-я форма.",
        "Шаг 4. Если нет точки, а просто факт, решение или обещание, бери обычное will + глагол.",
        "Шаг 5. Проверь придаточное с when / if / by the time: там Present Simple, а не will.",
        "Шаг 6. Отрицание: won't be doing / won't have done. Вопрос: Will + кто + be doing / have done?"
      ],
      cases: [
        {
          h: "At 7 или by 7: одна буква меняет время",
          t: "At 7 значит «ровно в 7», и мы видим процесс. By 7 значит «не позже 7», и мы видим результат. Часто одно и то же действие описывают обоими временами.",
          ex: [
            ["At 7 I'll be cooking dinner.", "В 7 я буду готовить ужин."],
            ["By 7 I'll have cooked dinner.", "К 7 я уже приготовлю ужин."]
          ]
        },
        {
          h: "Future Continuous: «это и так случится»",
          t: "Future Continuous может описывать то, что произойдёт само собой, по расписанию или обычному ходу дел, без нашего решения. Это звучит нейтрально и спокойно.",
          ex: [
            ["I'll be seeing Tom at school tomorrow, so I can give him the book.", "Я завтра всё равно увижу Тома в школе, так что передам ему книгу."]
          ]
        },
        {
          h: "Future Perfect с for: сколько всего к моменту",
          t: "С for Future Perfect подсчитывает итог к точке в будущем: сколько лет, сколько раз.",
          ex: [
            ["Next year we will have lived here for ten years.", "В следующем году мы проживём здесь уже десять лет."],
            ["By the end of the day I'll have answered 50 emails.", "К концу дня я отвечу уже на 50 писем."]
          ]
        },
        {
          h: "Глаголы состояния без -ing",
          t: "Know, like, want, need, believe, own обычно не ставят в Continuous. Даже в будущем говорим will know, а не will be knowing.",
          ex: [
            ["This time next year I'll know English much better.", "Через год в это время я буду знать английский намного лучше."]
          ]
        }
      ],
      faq: [
        ["А почему нельзя просто сказать I will finish by Friday?", "Можно, если это просто обещание или решение. Но если ты подчёркиваешь, что к пятнице работа будет уже готова, носители скажут will have finished. В тестах с by почти всегда ждут Future Perfect."],
        ["Чем Future Continuous отличается от be going to?", "Be going to говорит о намерении: я решил и собираюсь. Future Continuous говорит о процессе в конкретный момент: в 10 утра я буду лететь. Одно про план, другое про картинку в моменте."],
        ["Почему By the time you come, а не will come?", "Это общее правило английского: после слов времени и условия (when, if, by the time, until) будущее показывают настоящим временем. Will уже стоит в главной части, второй раз его не повторяют."],
        ["Future Perfect часто встречается в речи?", "Реже, чем Present Perfect, но в учёбе, планах и экзаменах он нужен постоянно: by the end of the year, by the time I'm 30. Знать его обязательно для B2."],
        ["Как сокращать?", "I'll be doing, I'll have done, won't be doing, won't have done. В речи will have часто сливается в will've («уилэв»)."]
      ]
    }
  };

  N[61] = {
    note: {
      name: "Past Perfect Continuous",
      idea: "Действие длилось какое-то время до момента в прошлом. Это Present Perfect Continuous, сдвинутый назад.",
      forms: [
        ["+", "I had been + глагол-ing"],
        ["-", "I hadn't been + глагол-ing"],
        ["?", "Had you been + глагол-ing?"],
        ["How long", "How long had you been + -ing?"]
      ],
      when: [
        "Долго длилось до момента: I had been waiting an hour when she came.",
        "Объясняем видимый след: She was tired. She had been running.",
        "Сколько времени: They had been living there for 5 years."
      ],
      signals: ["for", "since", "all day", "how long", "when", "before"],
      examples: [
        ["I had been waiting for an hour when she came.", "Я ждал уже час, когда она пришла."],
        ["His eyes were red. He had been crying.", "У него были красные глаза. Он плакал."],
        ["We had been walking for three hours before we found a café.", "Мы шли уже три часа, прежде чем нашли кафе."]
      ],
      mistakes: [
        ["I was waiting for an hour when she came.", "I had been waiting for an hour when she came."],
        ["I had been knowing him for years.", "I had known him for years."]
      ],
      remember: "Тогда уже долго шло: had been + -ing."
    },
    deep: {
      why: [
        "Представь две точки в прошлом. Вторая точка: она пришла. Первая: я начал ждать час назад. Past Perfect Continuous рисует всю полосу между ними: процесс начался раньше и тянулся до второй точки. В русском мы говорим просто «я ждал уже час, когда она пришла», и слово «уже» делает всю работу. В английском эту работу делает форма had been + -ing.",
        "Это то же самое, что Present Perfect Continuous (I have been waiting for an hour), только точка отсчёта не «сейчас», а момент в прошлом. Поэтому have превращается в had. Если ты понимаешь have been doing, ты уже понимаешь had been doing.",
        "Второе частое значение: объяснить, почему что-то выглядело так в прошлом. Земля была мокрая, потому что шёл дождь. Он был уставший, потому что работал весь день. Действие могло уже закончиться, но его след был виден.",
        "Разница с Past Continuous (was waiting): was waiting показывает процесс в один момент, без истории. Had been waiting for an hour показывает, сколько процесс длился до момента. Как только есть for, since, how long и момент в прошлом, нужен Perfect Continuous."
      ],
      algo: [
        "Шаг 1. Убедись, что весь рассказ в прошлом и есть момент-ориентир (when she came, before we found, by then).",
        "Шаг 2. Есть ли действие, которое началось раньше этого момента и продолжалось до него? Если да, это кандидат на had been + -ing.",
        "Шаг 3. Важна длительность или процесс (for an hour, all day, how long)? Бери had been + -ing.",
        "Шаг 4. Важен результат или количество (three pages, twice)? Бери обычный Past Perfect: had + 3-я форма.",
        "Шаг 5. Проверь глагол: know, like, want, own, believe в -ing не ставим, только had known, had wanted."
      ],
      cases: [
        {
          h: "Процесс или результат",
          t: "Had been reading отвечает на вопрос «как долго?», had read отвечает на «сколько сделано?». Одно действие, два разных взгляда.",
          ex: [
            ["I had been reading for two hours.", "Я читал уже два часа."],
            ["I had read two chapters.", "Я прочитал (к тому моменту) две главы."]
          ]
        },
        {
          h: "Past Continuous и Past Perfect Continuous",
          t: "Was working: просто процесс в момент. Had been working for years: процесс со стажем до момента. Без указания длительности чаще хватает Past Continuous.",
          ex: [
            ["When I called, she was working.", "Когда я позвонил, она работала."],
            ["She had been working there for ten years when she got promoted.", "Она работала там уже десять лет, когда её повысили."]
          ]
        },
        {
          h: "Видимый след в прошлом",
          t: "Без for и since время всё равно уместно, если мы объясняем вид, запах, состояние.",
          ex: [
            ["The kitchen smelled of smoke. Someone had been cooking.", "На кухне пахло дымом. Кто-то готовил."]
          ]
        }
      ],
      faq: [
        ["А можно просто сказать I waited for an hour?", "Можно, если это отдельный факт: Я ждал час (и всё). Но если есть второй момент «когда она пришла», и ожидание тянулось до него, правильнее had been waiting."],
        ["Чем отличается от Present Perfect Continuous?", "Только точкой отсчёта. Have been doing: длится до сейчас. Had been doing: длилось до момента в прошлом."],
        ["Как сократить?", "I'd been, she'd been, they'd been. Отрицание hadn't been. Осторожно: 'd бывает и would, но перед been это всегда had."],
        ["Почему нельзя had been knowing?", "Know, like, want, believe, own описывают состояние, а не процесс. Состояния в -ing не ставят, поэтому had known him for years."]
      ]
    }
  };

  N[64] = {
    note: {
      name: "Будущее в прошлом: would, was going to",
      idea: "Когда рассказываем о прошлом, будущее тоже сдвигается назад: will → would, am going to → was going to.",
      forms: [
        ["1", "knew / said / thought + would + глагол"],
        ["2", "was / were going to + глагол = собирался"],
        ["3", "was / were about to + глагол = вот-вот"],
        ["-", "wouldn't / wasn't going to"]
      ],
      when: [
        "Мысль или слова из прошлого: I knew he would win.",
        "План в прошлом, часто несбывшийся: I was going to call, but I forgot.",
        "Чуть не случилось: I was about to leave when he called."
      ],
      signals: ["knew", "thought", "said", "promised", "hoped", "was sure", "but"],
      examples: [
        ["I thought it would be easy.", "Я думал, что будет легко."],
        ["We were going to go to the beach, but it rained.", "Мы собирались на пляж, но пошёл дождь."],
        ["He promised he wouldn't be late.", "Он обещал, что не опоздает."]
      ],
      mistakes: [
        ["I knew he will win.", "I knew he would win."],
        ["I was going to call, but I forget.", "I was going to call, but I forgot."],
        ["I thought it will be easy.", "I thought it would be easy."]
      ],
      remember: "Прошлое тянет будущее назад: will → would, am going to → was going to."
    },
    deep: {
      why: [
        "В русском время в придаточном считается от момента внутри самой истории: «Я знал, что он победит». «Победит» стоит в будущем, хотя победа давно позади. Английский считает по-другому: если главный глагол в прошлом (knew, said, thought), то всё будущее внутри сдвигается назад вместе с ним. Will превращается в would, am going to в was going to.",
        "Would здесь не значит «бы». Это просто прошедшая форма от will, будущее, увиденное из прошлого. I knew he would win = Я знал, что он победит. Никакого условия нет.",
        "Was going to почти всегда несёт оттенок «собирался, но...». Когда мы говорим о плане в прошлом, слушатель сразу ждёт продолжения: но не сделал, но передумал, но помешали. Поэтому так часто после него идёт but + Past Simple.",
        "Was about to описывает момент «вот-вот, уже почти». Действие стояло на пороге, и тут его прервали: I was about to leave when he called."
      ],
      algo: [
        "Шаг 1. Посмотри на главный глагол: он в прошлом (said, knew, thought, promised, hoped)?",
        "Шаг 2. Если в придаточном по-русски будущее («победит», «позвонит»), по-английски ставь would + глагол.",
        "Шаг 3. Если речь о собственном плане в прошлом («собирался»), бери was / were going to + глагол.",
        "Шаг 4. Если план не сбылся, продолжи but + Past Simple: but I forgot, but it rained.",
        "Шаг 5. Если «вот-вот, уже почти», бери was about to + глагол, часто с when."
      ],
      cases: [
        {
          h: "Would или was going to",
          t: "Would чаще стоит после глаголов мысли и речи (knew, said, thought). Was going to описывает намерение человека. Иногда оба возможны, но would в одиночку (без knew, said) в этом смысле звучит книжно.",
          ex: [
            ["She said she would help.", "Она сказала, что поможет."],
            ["I was going to help, but I was too busy.", "Я собирался помочь, но был слишком занят."]
          ]
        },
        {
          h: "Я не думал, что...",
          t: "Русское «я не думал, что будет так трудно» по-английски строится через отрицание в главной части: I didn't think it would be so hard.",
          ex: [
            ["I didn't think it would be so hard.", "Я не думал, что будет так трудно."]
          ]
        },
        {
          h: "was going to без «но»",
          t: "Иногда план сбывается, и это просто рассказ о том, что человек намеревался сделать. Контекст покажет.",
          ex: [
            ["She knew she was going to be a doctor.", "Она знала, что станет врачом."]
          ]
        }
      ],
      faq: [
        ["А почему не will? Ведь «победит» в будущем.", "В английском время в придаточном подстраивается под главный глагол. Главный в прошлом (knew), значит will тоже уходит в прошлое: would."],
        ["Would ведь значит «бы»?", "Не всегда. В этой теме would просто «будущее из прошлого». «Бы» у него появляется в условных предложениях, это другое значение."],
        ["Можно ли сказать I was going to call, but I didn't?", "Да, это нормально: Я собирался позвонить, но не позвонил. Главное, после but прошедшее время."],
        ["Чем was about to отличается от was going to?", "Was going to: был план. Was about to: момент совсем близко, буквально через секунду."]
      ]
    }
  };

  N[39] = {
    note: {
      name: "Смешанные условия, wish, if only",
      idea: "Mixed conditional: прошлое влияет на сейчас. Wish и if only выражают сожаление «жаль, что...».",
      forms: [
        ["mix", "If + had + 3-я ф., would + глагол (now)"],
        ["сейчас", "I wish + Past: I wish I had..."],
        ["прошлое", "I wish + had + 3-я форма"],
        ["другой", "I wish you would + глагол"]
      ],
      when: [
        "Прошлое → сейчас: If I had studied, I would be at Harvard now.",
        "Жаль, что сейчас не так: I wish I had more time.",
        "Жаль, что тогда так вышло: I wish I hadn't said that.",
        "Раздражает чужое: I wish you would stop talking."
      ],
      signals: ["now", "I wish", "if only"],
      examples: [
        ["If I hadn't eaten so much, I wouldn't feel sick now.", "Если бы я не съел так много, мне бы сейчас не было плохо."],
        ["I wish I could swim.", "Жаль, что я не умею плавать."],
        ["If only I had listened to you!", "Ах, если бы я тебя послушал!"]
      ],
      mistakes: [
        ["I wish I have more time.", "I wish I had more time."],
        ["I wish I didn't say that. (про прошлое)", "I wish I hadn't said that."],
        ["I wish I would be taller.", "I wish I were taller."]
      ],
      remember: "Wish всегда шагает назад: сейчас → Past, тогда → Past Perfect."
    },
    deep: {
      why: [
        "В русском «если бы» и «жаль, что» одинаковы для любого времени, а уточняют всё словами «сейчас», «тогда». В английском время показывает форма глагола, и правило простое: нереальное отодвигаем на шаг назад. Нереальное настоящее (у меня нет денег) ставим в Past: if I had, I wish I had. Нереальное прошлое (тогда не учился) ставим в Past Perfect: if I had studied, I wish I had studied.",
        "Смешанное условие просто склеивает две половины разных условных. Причина в прошлом, значит первая часть от третьего типа: If I had studied harder. Результат сейчас, значит вторая часть от второго типа: I would be at Harvard now. Часто рядом стоит now, это лучшая подсказка. Бывает и наоборот: постоянная черта (знаю французский) повлияла на прошлое: If I spoke French, I would have understood him.",
        "Wish переводится «жаль, что» или «хотел бы я». Ловушка для русских: по-русски «жаль, что у меня НЕТ», а по-английски I wish I HAD, без not. Ты говоришь не о том, что есть, а о том, чего хотелось бы. Отрицание появляется, только когда тебе жаль, что что-то ЕСТЬ: I wish I didn't have so much homework.",
        "Wish + would нужен для раздражения или нетерпения: хоть бы ты перестал, скорее бы кончился дождь. Это жалоба на то, что от нас не зависит. Про себя так не говорят: вместо I wish I would используй I wish I could или I wish I were. If only строится так же, как wish, но звучит эмоциональнее."
      ],
      algo: [
        "Шаг 1. Определи, о каком времени сожаление или условие: сейчас или тогда (в прошлом).",
        "Шаг 2. Сейчас: сдвинь на шаг назад в Past (have → had, can → could, am → were).",
        "Шаг 3. Тогда: сдвинь в Past Perfect (had + 3-я форма).",
        "Шаг 4. Если в одном «если бы» причина тогда, а результат сейчас: If + had + 3-я форма, would + глагол (now).",
        "Шаг 5. Если раздражает поведение другого человека или погоды: I wish + кто + would + глагол.",
        "Шаг 6. Переведи русское «жаль, что не...» без not: «жаль, что не знаю» = I wish I knew."
      ],
      cases: [
        {
          h: "I wish I knew или I wish I had known",
          t: "Knew: сейчас не знаю. Had known: тогда не знал. Одно слово переносит сожаление во времени.",
          ex: [
            ["I wish I knew her number.", "Жаль, что я не знаю её номер."],
            ["I wish I had known about the party.", "Жаль, что я не знал про вечеринку."]
          ]
        },
        {
          h: "Were для всех лиц",
          t: "После wish и if с be часто ставят were даже с I, he, she. Was в разговоре тоже встречается, но were считается правильнее и в экзаменах надёжнее.",
          ex: [
            ["I wish I were taller.", "Хотел бы я быть выше."],
            ["If only she were here!", "Если бы только она была здесь!"]
          ]
        },
        {
          h: "Смешанное условие в обратную сторону",
          t: "Постоянная черта сейчас объясняет прошлое: If + Past, would have + 3-я форма.",
          ex: [
            ["If I weren't so shy, I would have asked her out.", "Если бы я не был таким стеснительным, я бы пригласил её на свидание."]
          ]
        }
      ],
      faq: [
        ["Почему I wish I had, если у меня этого нет?", "Wish говорит о желаемой картинке. Ты хочешь, чтобы было «имею», поэтому had. Past здесь значит не прошлое, а нереальность."],
        ["Можно ли I wish + will?", "Нет. После wish не бывает will. Для будущего или чужого поведения используй would: I wish it would stop raining."],
        ["Чем if only отличается от wish?", "По грамматике ничем, только эмоциональнее. If only I knew! = Эх, знать бы!"],
        ["А I hope тоже так работает?", "Нет. Hope про реальные надежды и идёт с обычными временами: I hope you pass. Wish про нереальное: I wish I were rich."],
        ["Как понять, что нужен смешанный тип?", "Посмотри на слова времени. Если в части с if «тогда, вчера, в детстве», а в другой «сейчас, now», это смешанный."]
      ]
    }
  };

  N[62] = {
    note: {
      name: "Would rather, had better, it's time",
      idea: "Would rather: я бы лучше. Had better: лучше сделай, а то будет плохо. It's time: пора.",
      forms: [
        ["rather", "I'd rather + глагол (без to)"],
        ["rather 2", "I'd rather + кто + Past"],
        ["better", "You'd better (not) + глагол"],
        ["time", "It's time to + глагол / It's time + кто + Past"]
      ],
      when: [
        "Что предпочитаю: I'd rather stay at home than go out.",
        "Хочу, чтобы другой: I'd rather you didn't tell Mom.",
        "Совет с предупреждением: You'd better hurry, or you'll be late.",
        "Пора (давно): It's time you went to bed."
      ],
      signals: ["than", "or", "otherwise", "high time"],
      examples: [
        ["I'd rather not talk about it.", "Я бы не хотел об этом говорить."],
        ["We'd better not be late.", "Нам лучше не опаздывать."],
        ["It's high time we cleaned the room.", "Нам давно пора убрать комнату."]
      ],
      mistakes: [
        ["I'd rather to stay.", "I'd rather stay."],
        ["You'd better don't come.", "You'd better not come."],
        ["It's time you go to bed.", "It's time you went to bed."]
      ],
      remember: "После rather и better нет to, а not стоит сразу за ними."
    },
    deep: {
      why: [
        "Would rather и had better ведут себя как модальные глаголы (помощники вроде can, must): после них идёт голый глагол, без to, и not ставится прямо за ними. It's time устроен иначе: It's time to go, с to. Поэтому I'd rather not go и You'd better not be late, без всяких don't.",
        "Сокращение 'd здесь коварное. В I'd rather это would, в You'd better это had. Но для смысла это неважно: оба выражения говорят о настоящем и будущем, хотя had выглядит как прошлое. Had better не значит «лучше было»; это «лучше сделай сейчас, а то будут проблемы». Звучит сильнее и строже, чем should.",
        "Когда предпочтение касается другого человека, включается та же логика нереальности, что и в wish: I'd rather you didn't tell anyone. Глагол в прошедшем, хотя речь о будущем, потому что это пока только желаемая картинка. Так же с It's time + кто + Past: It's time you went to bed значит «уже давно пора, а ты всё ещё не спишь».",
        "It's time to go нейтрально: пора идти. It's time we went звучит с упрёком или нетерпением: вообще-то давно пора. Слово high усиливает: It's high time."
      ],
      algo: [
        "Шаг 1. Что ты хочешь сказать: предпочтение («лучше бы я»), совет-предупреждение («лучше сделай, а то») или «пора»?",
        "Шаг 2. Предпочтение о себе: I'd rather + глагол. Сравнение двух вариантов через than.",
        "Шаг 3. Предпочтение о другом: I'd rather + кто + Past (you didn't, he came).",
        "Шаг 4. Совет с угрозой последствий: You'd better + глагол, часто дальше or / otherwise.",
        "Шаг 5. «Пора»: It's time to + глагол. С упрёком «давно пора»: It's (high) time + кто + Past.",
        "Шаг 6. Отрицание: not сразу после rather / better, без don't."
      ],
      cases: [
        {
          h: "had better и should",
          t: "Should: общий совет, мягко. Had better: конкретная ситуация, и есть риск. Родитель скажет You'd better be home by ten, это почти приказ.",
          ex: [
            ["You should read more.", "Тебе стоит больше читать."],
            ["You'd better take an umbrella, or you'll get wet.", "Возьми-ка зонт, а то промокнешь."]
          ]
        },
        {
          h: "would rather и prefer",
          t: "Prefer требует to или -ing: I prefer to walk, I prefer walking. Would rather берёт голый глагол и than: I'd rather walk than drive. Не смешивай их конструкции.",
          ex: [
            ["I prefer walking to driving.", "Я предпочитаю ходить пешком, а не ездить на машине."],
            ["I'd rather walk than drive.", "Я лучше пройдусь, чем поеду."]
          ]
        },
        {
          h: "Вопрос с would rather",
          t: "Выносим would вперёд: Would you rather ...? Удобно для выбора из двух вариантов.",
          ex: [
            ["Would you rather have tea or coffee?", "Ты бы предпочёл чай или кофе?"]
          ]
        }
      ],
      faq: [
        ["Почему had, если речь о будущем?", "Это застывшее выражение. Had better всегда смотрит в настоящее и будущее, прошлого смысла в нём нет."],
        ["Можно ли сказать You had better to go?", "Нет. После had better и would rather to никогда не ставится."],
        ["Почему It's time you went, а не go?", "Это конструкция нереальности, как wish: ты ещё не лёг, а надо бы. Нереальное показываем прошедшим временем."],
        ["Не грубо ли You'd better?", "Может звучать строго, как предупреждение. С друзьями нормально, а с учителем или незнакомым человеком лучше You should или Maybe you could."]
      ]
    }
  };

  N[40] = {
    note: {
      name: "Perfect modals: should have, could have, must have",
      idea: "Модальный глагол + have + 3-я форма говорит о прошлом: сожаление, упрёк или догадка о том, что было.",
      forms: [
        ["should", "should have + 3-я ф. = надо было"],
        ["could", "could have + 3-я ф. = мог бы (но не)"],
        ["might", "might / may have + 3-я ф. = возможно"],
        ["must", "must have = наверняка; can't have = не может быть"]
      ],
      when: [
        "Сожаление или упрёк: You should have told me.",
        "Была возможность: We could have won.",
        "Догадка: She might have missed the bus.",
        "Уверенный вывод: It must have rained. She can't have seen it."
      ],
      signals: [],
      examples: [
        ["I shouldn't have eaten so much.", "Не надо было мне столько есть."],
        ["The streets are wet. It must have rained.", "Улицы мокрые. Наверное, был дождь."],
        ["He may have lost your number.", "Может быть, он потерял твой номер."]
      ],
      mistakes: [
        ["You should told me.", "You should have told me."],
        ["She mustn't have seen it.", "She can't have seen it."],
        ["I should of known.", "I should have known."]
      ],
      remember: "Модальный + have + 3-я форма = машина времени в прошлое."
    },
    deep: {
      why: [
        "Модальные глаголы (should, could, might, must) особенные: у них нет нормального прошедшего времени. Нельзя сказать should-ed. Поэтому, чтобы перенести их смысл в прошлое, английский добавляет после них have + 3-ю форму. Have тут всегда have, никогда has или had, потому что после модального глагола идёт только базовая форма.",
        "Эти формы делятся на две семьи. Первая: оценка того, что сделали или не сделали (should have, could have). Это сожаление и упрёк: надо было, мог бы. Подразумевается, что на самом деле было наоборот: You should have told me = ты мне не сказал, а надо было.",
        "Вторая семья: догадка о прошлом по уликам (must have, might have, may have, can't have). Как детектив: улицы мокрые, значит must have rained (почти 100%). Не знаю точно: might have (возможно, 50%). Уверен, что нет: can't have (почти 0%).",
        "В русском это передаётся словами «надо было», «наверное», «не может быть, чтобы», а глагол просто в прошедшем. В английском вся информация сидит в модальном глаголе, а have + 3-я форма только переносит её в прошлое."
      ],
      algo: [
        "Шаг 1. Убедись, что речь о прошлом событии.",
        "Шаг 2. Это оценка (правильно или нет было поступить)? Надо было → should have, не надо было → shouldn't have, мог бы → could have.",
        "Шаг 3. Это догадка? Оцени уверенность: почти точно было → must have; может быть → might / may have; точно не было → can't / couldn't have.",
        "Шаг 4. Построй: модальный + have + 3-я форма глагола (told, gone, seen).",
        "Шаг 5. На письме проверь, что написал have, а не of."
      ],
      cases: [
        {
          h: "must have и can't have: почему не mustn't have",
          t: "Mustn't значит «нельзя», это запрет, а не догадка. Для уверенного «не могло быть» берём can't have или couldn't have.",
          ex: [
            ["He must have forgotten.", "Он, должно быть, забыл."],
            ["She can't have seen it. She was at home.", "Она не могла это видеть. Она была дома."]
          ]
        },
        {
          h: "could have: две роли",
          t: "Упрёк или упущенная возможность (You could have called!) и догадка, почти как might (It could have been Tom). Смысл показывает контекст.",
          ex: [
            ["You could have called me!", "Мог бы и позвонить!"],
            ["Who took it? It could have been Tom.", "Кто взял? Это мог быть Том."]
          ]
        },
        {
          h: "Сравни с настоящим",
          t: "Без have речь о сейчас, с have о прошлом. He must be tired (сейчас устал) и He must have been tired (тогда устал).",
          ex: [
            ["He must be at home now.", "Он, наверное, сейчас дома."],
            ["He must have been at home yesterday.", "Он, наверное, вчера был дома."]
          ]
        }
      ],
      faq: [
        ["Почему have, а не had, если это прошлое?", "После модальных глаголов всегда базовая форма. Прошлое показывает вся связка have + 3-я форма, а не сам have."],
        ["Чем might have отличается от may have?", "Почти ничем, оба значат «возможно». Might чуть менее уверенно."],
        ["Почему носители пишут should of?", "Should've на слух звучит как «шудэв», и некоторые ошибочно пишут of. Это ошибка, правильно всегда have."],
        ["Как сказать «зря ты это сделал»?", "You shouldn't have done that. Буквально «не надо было тебе этого делать»."]
      ]
    }
  };

  N[63] = {
    note: {
      name: "Want someone to do, make / let someone do",
      idea: "«Хочу, чтобы ты...» = want + кого + to + глагол. После make (заставить) и let (разрешить) глагол без to.",
      forms: [
        ["1", "want / ask / tell / expect + кого + to + глагол"],
        ["-", "told us not to + глагол"],
        ["2", "make / let + кого + глагол (без to)"],
        ["пассив", "was made to do / was allowed to do"]
      ],
      when: [
        "Хочу, чтобы другой: I want you to come.",
        "Просьба, приказ: Mom asked me to buy bread.",
        "Заставить: My dad makes me do my homework.",
        "Разрешить: They let me stay up late."
      ],
      signals: ["want", "would like", "ask", "tell", "expect", "make", "let"],
      examples: [
        ["The teacher told us not to use phones.", "Учитель сказал нам не пользоваться телефонами."],
        ["Nobody expected him to win.", "Никто не ожидал, что он победит."],
        ["We were made to wait for an hour.", "Нас заставили ждать час."]
      ],
      mistakes: [
        ["I want that you come.", "I want you to come."],
        ["She wants I help her.", "She wants me to help her."],
        ["He made me to cry.", "He made me cry."]
      ],
      remember: "Want кого TO, а make и let без TO."
    },
    deep: {
      why: [
        "Русская фраза «я хочу, чтобы ты пришёл» строится через «чтобы» и целое придаточное предложение. Английский идёт короче: want + кого + to + глагол. Нет ни that, ни will, ни «чтобы». Человек, который должен сделать действие, стоит в форме «кого»: me, you, him, her, us, them.",
        "Ту же схему используют глаголы, которые выражают желание или давление на другого: would like, ask (попросить), tell (велеть), expect (ожидать), advise (советовать), allow (разрешать), remind (напомнить), teach (научить). Отрицание ставим перед to: told us not to talk.",
        "Make и let исключения: после них глагол идёт сразу, без to. Make = заставлять (My parents make me do my homework), let = разрешать (They let me go). Это нужно просто запомнить. Help можно и так и так: help me carry и help me to carry.",
        "В пассиве у make to возвращается: I was made to wait. А у let пассива нет совсем, вместо него используют be allowed to: I wasn't allowed to go out."
      ],
      algo: [
        "Шаг 1. Найди в русской фразе «чтобы кто-то сделал» после хочу, прошу, жду, советую.",
        "Шаг 2. Поставь глагол желания: want, would like, ask, tell, expect, advise.",
        "Шаг 3. Поставь человека в форме «кого»: me, you, him, her, us, them или имя.",
        "Шаг 4. Добавь to + глагол. Если «чтобы не», то not to + глагол.",
        "Шаг 5. Если «заставить» или «разрешить», бери make / let и глагол без to.",
        "Шаг 6. В пассиве: was made to + глагол, а вместо let: was allowed to + глагол."
      ],
      cases: [
        {
          h: "Let me и let's",
          t: "Let me + глагол = давай я, позволь мне. Let's = давайте (мы вместе). Это то же let, просто в повседневных фразах.",
          ex: [
            ["Let me help you.", "Давай я тебе помогу."],
            ["Let's go to the cinema.", "Давай пойдём в кино."]
          ]
        },
        {
          h: "Suggest не работает по этой схеме",
          t: "Нельзя сказать He suggested me to go. После suggest идёт -ing или that: He suggested going / He suggested that I go.",
          ex: [
            ["He suggested that I go to the doctor.", "Он предложил мне сходить к врачу."]
          ]
        },
        {
          h: "make: актив и пассив",
          t: "Активный и пассивный варианты выглядят по-разному: make без to, made to с to.",
          ex: [
            ["They made me wait.", "Меня заставили ждать."],
            ["I was made to wait.", "Меня заставили ждать."]
          ]
        }
      ],
      faq: [
        ["Почему нельзя I want that you come?", "В английском после want придаточного с that не бывает. Только want + кого + to."],
        ["Почему me, а не I?", "После глагола человек становится объектом, а объекты по-английски me, him, her, us, them."],
        ["Чем make отличается от let?", "Make: заставляю, даже если человек не хочет. Let: разрешаю, потому что человек сам хочет."],
        ["Можно ли сказать I'd like you to?", "Да, это вежливее, чем want: I'd like you to meet my friend."]
      ]
    }
  };

  N[41] = {
    note: {
      name: "Causative: have / get something done",
      idea: "Сделать что-то не самому, а руками другого человека (мастера, сервиса). Ещё так говорят о неприятности: у меня что-то украли.",
      forms: [
        ["+", "have + предмет + 3-я форма"],
        ["get", "get + предмет + 3-я форма (разговорно)"],
        ["-", "I didn't have my hair cut"],
        ["?", "Did you have your phone repaired?"]
      ],
      when: [
        "Услуга: I had my hair cut.",
        "Планы: I'm going to get my phone repaired.",
        "Неприятность: He had his bike stolen."
      ],
      signals: [],
      examples: [
        ["She had her nails done.", "Она сделала маникюр."],
        ["We are having our kitchen painted.", "Нам сейчас красят кухню."],
        ["I need to get my hair cut.", "Мне надо подстричься."]
      ],
      mistakes: [
        ["I cut my hair. (в парикмахерской)", "I had my hair cut."],
        ["I had cut my hair. (сделали мне)", "I had my hair cut."],
        ["I repaired my phone. (в сервисе)", "I had my phone repaired."]
      ],
      remember: "Have + ЧТО + сделано: сначала предмет, потом 3-я форма."
    },
    deep: {
      why: [
        "В русском «я подстригся» и «я покрасил машину» не говорят, сделал ты это сам или тебе сделали в парикмахерской или сервисе. В английском разница обязательна. I cut my hair значит «я сам себя подстриг», и если ты был в парикмахерской, носитель тебя неправильно поймёт. Чтобы сказать, что работу сделал другой человек, используют have / get + предмет + 3-я форма.",
        "Логика порядка такая: have (имею, получаю) + предмет + в каком состоянии (3-я форма = «сделанный»). I had my hair cut = я получил свои волосы подстриженными. Если переставить слова, I had cut my hair, получится Past Perfect (я сам подстриг), то есть совсем другой смысл.",
        "Have здесь обычный глагол, поэтому он меняется по временам: had, will have, am having, have had. Вопрос и отрицание строятся через do / does / did, как у любого обычного глагола.",
        "Та же конструкция описывает неприятные события, где ты пострадавший: He had his bike stolen = у него украли велосипед. Никто не заказывал кражу, просто с вещью что-то сделали."
      ],
      algo: [
        "Шаг 1. Спроси себя: я делаю это своими руками или это делает мастер, сервис, другой человек?",
        "Шаг 2. Если другой, выбери have (нейтрально) или get (разговорно).",
        "Шаг 3. Поставь have / get в нужное время: had, will have, am having, need to get.",
        "Шаг 4. Добавь предмет: my hair, my car, the kitchen.",
        "Шаг 5. В конце 3-я форма глагола: cut, repaired, painted, delivered."
      ],
      cases: [
        {
          h: "Сам или мне сделали",
          t: "Одна разница в порядке и форме меняет всю картину.",
          ex: [
            ["I washed my car.", "Я помыл машину (сам)."],
            ["I had my car washed.", "Мне помыли машину (на мойке)."]
          ]
        },
        {
          h: "Неприятные события",
          t: "Кражи, поломки, повреждения: have / get + вещь + 3-я форма.",
          ex: [
            ["She got her bag stolen on the bus.", "У неё в автобусе украли сумку."],
            ["We had our window broken.", "Нам разбили окно."]
          ]
        },
        {
          h: "Have в разных временах",
          t: "Конструкция работает в любом времени: меняется только have.",
          ex: [
            ["I'll have it delivered tomorrow.", "Мне это доставят завтра."],
            ["Have you had your eyes tested?", "Ты проверял зрение?"]
          ]
        }
      ],
      faq: [
        ["Чем have отличается от get?", "По смыслу почти ничем. Get разговорнее и иногда подчёркивает, что пришлось постараться, чтобы это сделали."],
        ["Можно ли сказать, кто сделал?", "Можно добавить by: I had my car repaired by my uncle. Но обычно мастер неважен."],
        ["Почему вопрос через did?", "Have здесь не вспомогательный, а обычный глагол, поэтому вопрос строим как с любым обычным глаголом: Did you have...?"],
        ["Это пассив?", "Похоже: 3-я форма показывает, что с предметом что-то сделали. Но подлежащее тут ты, а не предмет, это отдельная конструкция."]
      ]
    }
  };

  N[42] = {
    note: {
      name: "Продвинутый пассив и глаголы пересказа",
      idea: "«Говорят, что...» = It is said that... или He is said to... А в пересказе вместо said берём точный глагол: advised, refused, admitted.",
      forms: [
        ["1", "It is said / believed / thought that + предложение"],
        ["2", "He is said to + глагол"],
        ["2 прошлое", "He is said to have + 3-я форма"],
        ["пассив", "being done (после -ing) / to be done (после to)"]
      ],
      when: [
        "Слухи, мнения: It is said that he is rich.",
        "Короче: He is said to be rich.",
        "Событие раньше: He is thought to have left the country.",
        "Пересказ точно: He advised me to study. He admitted stealing it."
      ],
      signals: ["it is said", "is believed", "is thought", "is expected", "is known"],
      examples: [
        ["She is believed to live in Paris.", "Считается, что она живёт в Париже."],
        ["I hate being told what to do.", "Ненавижу, когда мне указывают, что делать."],
        ["He denied breaking the window.", "Он отрицал, что разбил окно."]
      ],
      mistakes: [
        ["He is said that he is rich.", "He is said to be rich."],
        ["He suggested me to go.", "He suggested that I go. / He suggested going."],
        ["I hate be told what to do.", "I hate being told what to do."]
      ],
      remember: "It is said THAT он..., но He is said TO..."
    },
    deep: {
      why: [
        "В русском «говорят», «считается», «ожидается» обходятся без подлежащего. В английском подлежащее обязательно, поэтому ставят пустое It: It is said that he is rich. It здесь ничего не значит, это просто держатель места. Так же работают is believed, is thought, is known, is expected, is reported.",
        "Есть второй, более изящный вариант: вынести человека вперёд. He is said to be rich. Смысл тот же, но фраза короче и звучит как в новостях. Главное не смешивать: либо It is said that he..., либо He is said to... Вариант He is said that невозможен.",
        "Если говорят сейчас, а событие было раньше, после to ставим have + 3-я форма: He is thought to have left = Считается, что он уехал. Have + 3-я форма тут просто сдвигает действие в прошлое относительно «считается».",
        "Пассив после других глаголов подчиняется тому, что обычно идёт после глагола. После hate, like, enjoy, avoid идёт -ing, значит пассив being + 3-я форма. После want, hope, expect, need идёт to, значит пассив to be + 3-я форма. А в пересказе вместо скучного said лучше брать точные глаголы, и у каждого своя схема: advise / refuse / promise + to, suggest / admit / deny + -ing."
      ],
      algo: [
        "Шаг 1. Видишь «говорят, считается, ожидается»: выбери It is said that + предложение или Кто + is said to + глагол.",
        "Шаг 2. Если событие происходит сейчас или всегда: to + глагол (to be, to live).",
        "Шаг 3. Если событие было раньше: to have + 3-я форма (to have left).",
        "Шаг 4. Пассив после глагола: узнай, что после него идёт (-ing или to), и добавь being / to be + 3-я форма.",
        "Шаг 5. В пересказе выбери точный глагол и его схему: advise кого to, refuse to, promise to, suggest -ing, admit -ing, deny -ing."
      ],
      cases: [
        {
          h: "Два способа сказать одно и то же",
          t: "Обе версии правильны, вторая короче и типична для новостей.",
          ex: [
            ["It is expected that prices will rise.", "Ожидается, что цены вырастут."],
            ["Prices are expected to rise.", "Ожидается, что цены вырастут."]
          ]
        },
        {
          h: "being done и to be done",
          t: "Выбор зависит от первого глагола, а не от смысла.",
          ex: [
            ["Nobody likes being laughed at.", "Никто не любит, когда над ним смеются."],
            ["She wants to be invited.", "Она хочет, чтобы её пригласили."]
          ]
        },
        {
          h: "Suggest: ловушка",
          t: "По-русски «он предложил мне пойти», и хочется сказать suggested me to go. Так нельзя. Правильно: suggested going или suggested that I go.",
          ex: [
            ["They suggested going to the cinema.", "Они предложили пойти в кино."],
            ["He suggested that I should rest.", "Он предложил мне отдохнуть."]
          ]
        }
      ],
      faq: [
        ["Зачем It, если оно ничего не значит?", "В английском предложении всегда должно быть подлежащее. It просто занимает его место."],
        ["Когда to have done, а когда to do?", "To do: событие сейчас или всегда. To have done: событие случилось раньше, чем «говорят»."],
        ["Это часто встречается?", "В новостях и статьях постоянно: is reported to, is believed to. Для чтения и эссе на B2 обязательно."],
        ["После admit можно to + глагол?", "Нет: не admit to steal. Правильно admit stealing или admit that I stole. Вариант admit to stealing тоже встречается, но admit stealing проще и надёжнее."]
      ]
    }
  };

  N[65] = {
    note: {
      name: "So и such: усиление",
      idea: "So ставим перед прилагательным или наречием, such перед существительным (с прилагательным или без).",
      forms: [
        ["so", "so + прилагательное / наречие"],
        ["such a", "such a / an + (прил.) + сущ. ед. ч."],
        ["such", "such + (прил.) + мн. ч. / неисчисл."],
        ["много", "so much + неисчисл., so many + мн. ч."],
        ["that", "so ... that / such ... that = так ..., что"]
      ],
      when: [
        "Без существительного: It's so cold!",
        "С существительным: It's such a nice day!",
        "Результат: The film was so boring that I fell asleep."
      ],
      signals: ["really", "quite", "rather", "too"],
      examples: [
        ["He is such an interesting person.", "Он такой интересный человек."],
        ["We had such bad weather.", "У нас была такая плохая погода."],
        ["There were so many people!", "Там было так много людей!"]
      ],
      mistakes: [
        ["It was so nice day.", "It was such a nice day."],
        ["such a bad weather", "such bad weather"],
        ["so much people", "so many people"]
      ],
      remember: "So - для слов-признаков, such - когда есть предмет."
    },
    deep: {
      why: [
        "В русском одно слово «такой» подходит везде: такой холодный, такой день. В английском два слова, и выбирает их то, что идёт дальше. Если дальше только прилагательное или наречие (cold, fast), ставим so. Если дальше существительное (day, people), ставим such, и прилагательное прячется между ними: such a nice day.",
        "Such перед существительным в единственном числе требует a / an, и порядок именно такой: such a, а не a such. С множественным числом и неисчисляемыми (weather, advice, news, music, homework) артикля нет: such nice people, such bad weather.",
        "So much и so many подчиняются той же логике, что much и many: much для неисчисляемого (homework, time), many для исчисляемого во множественном (people, friends).",
        "С that обе конструкции показывают результат: так ..., что. That в разговоре часто опускают. Другие усилители: really (очень, правда), quite (довольно; порядок quite a good film), rather (довольно, чаще о неприятном), too (слишком, мешает: too cold to swim)."
      ],
      algo: [
        "Шаг 1. Посмотри, что идёт после «такой / так»: есть ли существительное?",
        "Шаг 2. Нет существительного: so + прилагательное / наречие.",
        "Шаг 3. Есть существительное в единственном числе: such a / an + (прилагательное) + существительное.",
        "Шаг 4. Множественное или неисчисляемое: such + (прилагательное) + существительное, без a.",
        "Шаг 5. «Так много»: so much (неисчисляемое) / so many (мн. ч.).",
        "Шаг 6. Хочешь показать результат: добавь that + следствие."
      ],
      cases: [
        {
          h: "Одна мысль, две конструкции",
          t: "So + прилагательное и such + существительное можно менять местами, если перестроить фразу.",
          ex: [
            ["The film was so boring that I fell asleep.", "Фильм был такой скучный, что я уснул."],
            ["It was such a boring film that I fell asleep.", "Это был такой скучный фильм, что я уснул."]
          ]
        },
        {
          h: "So и too",
          t: "So усиливает эмоцию, too означает «слишком, и это мешает». It's so hot = Как жарко! It's too hot to go out = Слишком жарко, чтобы выходить.",
          ex: [
            ["It's too cold to swim.", "Слишком холодно, чтобы купаться."]
          ]
        },
        {
          h: "Quite a",
          t: "Quite ставится перед a, а не после: quite a long way. Это исключение из обычного порядка артикля.",
          ex: [
            ["It's quite a long way.", "Это довольно далеко."]
          ]
        }
      ],
      faq: [
        ["Чем so отличается от very?", "Very просто «очень». So эмоциональнее и часто подразумевает результат или восклицание: It's so cold!"],
        ["Почему such a bad weather неправильно?", "Weather неисчисляемое, перед ним не ставят a. Поэтому such bad weather."],
        ["Можно ли опустить that?", "Да, в разговоре: I was so tired I went to bed at 9."],
        ["А so much с глаголом?", "Да: I love you so much. Тут so much усиливает глагол, а не существительное."]
      ]
    }
  };

  N[37] = {
    note: {
      name: "Словообразование: приставки и суффиксы",
      idea: "Приставка спереди меняет смысл слова, суффикс сзади меняет часть речи. Зная их, понимаешь новые слова без словаря.",
      forms: [
        ["не-", "un-, in-, im-, il-, ir-, dis-"],
        ["смысл", "re- снова, mis- неправильно, over- слишком, under- недо-"],
        ["кто", "-er, -or, -ist"],
        ["сущ.", "-tion, -ment, -ness, -ity"],
        ["прил./нар.", "-ful, -less, -able, -ible; -ly = как?"]
      ],
      when: [
        "Противоположность: happy → unhappy, possible → impossible.",
        "Нужен человек: teach → teacher, economy → economist.",
        "Нужно существительное: kind → kindness, educate → education.",
        "Отвечает на «как?»: careful → carefully."
      ],
      signals: [],
      examples: [
        ["I overslept and missed the bus.", "Я проспал и опоздал на автобус."],
        ["Thank you for your kindness.", "Спасибо за вашу доброту."],
        ["My phone is useless without the internet.", "Без интернета мой телефон бесполезен."]
      ],
      mistakes: [
        ["Happy is important.", "Happiness is important."],
        ["Drive careful!", "Drive carefully!"],
        ["unpossible", "impossible"]
      ],
      remember: "Начало меняет смысл, конец меняет роль слова."
    },
    deep: {
      why: [
        "Английские слова собираются как конструктор, почти как русские: корень + приставка + суффикс. Приставка (кусочек в начале) меняет смысл: happy → unhappy. Суффикс (кусочек в конце) меняет часть речи, то есть роль слова в предложении: happy (какой?) → happiness (что?) → happily (как?).",
        "Часть речи в английском особенно важна, потому что окончаний мало и роль слова видна по суффиксу. В роли подлежащего или дополнения нужно существительное (happiness), перед существительным и после be прилагательное (happy), при обычном глаголе наречие (happily). Русские часто ставят прилагательное вместо наречия: drive careful вместо carefully.",
        "Отрицательные приставки выбираются отчасти по звуку: перед p и m обычно im- (impossible), перед l il- (illegal), перед r ir- (irregular). Un- самая частая, dis- типична для глаголов (agree → disagree). Точного правила для всех слов нет, поэтому новое слово лучше проверить в словаре.",
        "Суффиксы прилагательных несут смысл: -ful = полный чего-то (useful), -less = без (useless, homeless), -able / -ible = можно сделать (readable, drinkable). Если знать около 20 таких кусочков, можно угадывать значение сотен незнакомых слов при чтении."
      ],
      algo: [
        "Шаг 1. Определи, какое место в предложении: кто? что? какой? как?",
        "Шаг 2. Нужен человек: добавь -er / -or / -ist.",
        "Шаг 3. Нужно существительное («что?»): -tion, -ment, -ness, -ity.",
        "Шаг 4. Нужно прилагательное: -ful (с), -less (без), -able / -ible (можно).",
        "Шаг 5. Нужно наречие («как?»): прилагательное + -ly (y → i: happy → happily).",
        "Шаг 6. Нужен противоположный смысл: un-, in-, im-, il-, ir-, dis-. Сомневаешься, проверь в словаре."
      ],
      cases: [
        {
          h: "Наречия-исключения",
          t: "Не все наречия на -ly. Good → well, fast → fast, hard → hard. А hardly значит совсем другое: «едва».",
          ex: [
            ["She speaks English well.", "Она хорошо говорит по-английски."],
            ["He works hard.", "Он много работает."]
          ]
        },
        {
          h: "Одно слово, вся семья",
          t: "Из одного корня можно получить пять-шесть слов разных частей речи.",
          ex: [
            ["use → useful → useless → usefulness", "польза → полезный → бесполезный → полезность"],
            ["possible → impossible → possibility", "возможный → невозможный → возможность"]
          ]
        },
        {
          h: "over- и under-",
          t: "Over- = слишком (oversleep = проспать), under- = недо- (underestimate = недооценить).",
          ex: [
            ["Don't underestimate him.", "Не недооценивай его."]
          ]
        }
      ],
      faq: [
        ["Как узнать, un- или in-?", "Для части слов это подсказывает звук (im- перед p и m, il- перед l, ir- перед r), а в остальном проверяй словарь и запоминай слова целиком."],
        ["Почему нужно учить суффиксы, а не просто слова?", "Они дают ключ к сотням слов: увидел -less, понял «без», увидел -tion, понял «существительное»."],
        ["Это нужно на экзамене?", "Да. В ОГЭ, ЕГЭ и международных экзаменах есть задания, где надо превратить слово в другую часть речи."],
        ["Можно добавлять суффиксы к любому слову?", "Нет, только к тем, где такое слово реально существует. Новое сочетание проверяй в словаре."]
      ]
    }
  };

  N[43] = {
    note: {
      name: "Инверсия и причастные обороты",
      idea: "Инверсия: после отрицательных слов в начале порядок как в вопросе. Причастный оборот: короткая замена придаточного.",
      forms: [
        ["инверсия", "Never / Rarely + have / did + кто + глагол"],
        ["not only", "Not only did he ..., but he also ..."],
        ["hardly", "Hardly had I ... when ... / No sooner had I ... than ..."],
        ["-ing", "Feeling tired, I ... (= Because I felt)"],
        ["having", "Having finished, she ... (= After she had finished)"]
      ],
      when: [
        "Сильно, книжно: Never have I seen such a thing.",
        "Едва..., как: Hardly had I arrived when it rained.",
        "Короче придаточного: Feeling tired, I went to bed.",
        "После сущ.: The man sitting there is my boss."
      ],
      signals: ["never", "rarely", "seldom", "not only", "hardly", "no sooner"],
      examples: [
        ["Rarely does he complain.", "Он редко жалуется."],
        ["Having finished work, she went home.", "Закончив работу, она пошла домой."],
        ["Cars made in Germany are expensive.", "Машины, сделанные в Германии, дорогие."]
      ],
      mistakes: [
        ["Never I have seen such a thing.", "Never have I seen such a thing."],
        ["Rarely he complains.", "Rarely does he complain."],
        ["Walking home, the rain started.", "Walking home, I got caught in the rain."]
      ],
      remember: "Отрицание в начале - порядок как в вопросе."
    },
    deep: {
      why: [
        "Обычный английский порядок жёсткий: кто + глагол. Инверсия (обратный порядок) ломает его специально, чтобы выделить мысль. Когда фраза начинается с отрицательного или ограничивающего слова (never, rarely, seldom, not only, hardly, no sooner), дальше идёт порядок вопроса: вспомогательный глагол (помощник: have, is, can, will, do) стоит перед подлежащим. Never have I seen... звучит сильно и книжно, как в речи или в статье.",
        "Если помощника в предложении нет (Present или Past Simple), его добавляют, как в вопросе: does / did + глагол в базовой форме. Rarely does he complain, Not only did he win. Это главная трудность, и именно её проверяют на экзаменах.",
        "Причастный оборот это сжатое придаточное, похожее на русское деепричастие: «почувствовав усталость, я лёг». Feeling tired = Because I felt tired. Having finished = After I had finished, первое действие точно закончилось до второго. Правило: у оборота и основной части должен быть один и тот же «кто». Walking home, the rain started звучит так, будто дождь шёл домой.",
        "После существительного причастие заменяет who / which: the man sitting there = the man who is sitting there. Выбор формы: -ing, если предмет делает сам (sitting); 3-я форма, если с ним что-то сделали (made in Germany)."
      ],
      algo: [
        "Шаг 1. Хочешь подчеркнуть мысль с never, rarely, not only, hardly? Вынеси это слово в начало.",
        "Шаг 2. Найди помощника (have, is, can, will) и поставь его перед подлежащим.",
        "Шаг 3. Нет помощника? Добавь do / does / did, а глагол верни в базовую форму.",
        "Шаг 4. Для причастного оборота проверь, что «кто» у обеих частей одинаковый.",
        "Шаг 5. Одновременно или причина: -ing (Feeling tired). Сначала одно, потом другое: Having + 3-я форма.",
        "Шаг 6. После существительного: -ing (сам делает) или 3-я форма (с ним сделали)."
      ],
      cases: [
        {
          h: "Hardly ... when и No sooner ... than",
          t: "Обе значат «едва..., как», обычно с Past Perfect. Пары слов фиксированные: hardly идёт с when, no sooner с than.",
          ex: [
            ["Hardly had I arrived when it started to rain.", "Едва я приехал, как пошёл дождь."],
            ["No sooner had we left than the phone rang.", "Едва мы вышли, как зазвонил телефон."]
          ]
        },
        {
          h: "Инверсия не обязательна",
          t: "Обычный порядок (I have never seen) всегда правильный, инверсия нужна для стиля. Но если уж вынес отрицательное слово в начало, инверсия обязательна.",
          ex: [
            ["I have never seen such a thing.", "Я никогда такого не видел."],
            ["Never have I seen such a thing.", "Никогда я такого не видел."]
          ]
        },
        {
          h: "Висящее причастие",
          t: "Если «кто» в обороте и в основной части разные, фраза становится нелепой. Исправь подлежащее.",
          ex: [
            ["Opening the door, she saw a cat.", "Открыв дверь, она увидела кошку."]
          ]
        }
      ],
      faq: [
        ["Зачем инверсия, если можно сказать обычно?", "Для силы и стиля: в эссе, речах и литературе. В разговоре редка, но на экзаменах B2 и C1 её проверяют."],
        ["Почему did, если в обычной фразе его нет?", "Инверсия строится как вопрос, а в вопросе Past Simple всегда нужен did: Did he win? → Not only did he win."],
        ["Чем Feeling отличается от Having felt?", "Feeling: одновременно или причина. Having + 3-я форма подчёркивает, что одно закончилось раньше другого."],
        ["Можно ли начать с Never в обычном разговоре?", "Можно для эмоции: Never again! Но целое предложение с инверсией в разговоре звучит торжественно."]
      ]
    }
  };
})();
