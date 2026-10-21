/* Конспекты для тетради и подробный разбор: темы B1 (57, 58, 31, 32, 33, 34, 35, 36, 38, 24) */
(function () {
  const N = (window.GRAMMAR_NOTES = window.GRAMMAR_NOTES || {});

  N[57] = {
    note: {
      name: "Возвратные местоимения: myself, each other",
      idea: "Слова на -self / -selves значат «себя» или «сам». Each other значит «друг друга».",
      forms: [
        ["1 чел.", "I → myself, you → yourself"],
        ["он/она/оно", "himself, herself, itself"],
        ["много", "ourselves, yourselves, themselves"],
        ["друг друга", "each other"]
      ],
      when: [
        "Действие направлено на себя: I cut myself.",
        "Сам, без помощи (в конце фразы): I did it myself.",
        "Один, в одиночку: She lives by herself.",
        "Двое делают друг с другом: We help each other."
      ],
      signals: ["by myself", "each other", "enjoy yourself", "help yourself", "behave yourself"],
      examples: [
        ["He taught himself to play the guitar.", "Он сам научился играть на гитаре."],
        ["My grandma lives by herself.", "Бабушка живёт одна."],
        ["They looked at each other.", "Они посмотрели друг на друга."]
      ],
      mistakes: [
        ["I feel myself bad.", "I feel bad."],
        ["Relax yourself.", "Relax."],
        ["hisself, theirselves", "himself, themselves"]
      ],
      remember: "Себя = -self, друг друга = each other, а «-ся» чаще всего просто глагол."
    },
    deep: {
      why: [
        "Возвратное местоимение (слово, которое «возвращает» действие к тому, кто его делает) нужно, когда подлежащее и объект совпадают. В I cut myself тот, кто резал, и тот, кого порезали, один и тот же человек. Если сказать I cut me, англичанин не поймёт: me в такой позиции звучит как будто это кто-то другой.",
        "В русском для этого есть два средства: слово «себя» и частица «-ся» (умываться, одеваться). В английском частицы «-ся» нет, и многие такие глаголы просто стоят без всего: wash, dress, relax, worry, meet, feel. Английский считает, что и так понятно, кого ты моешь утром. Поэтому -self ставят только там, где без него смысл не ясен или его хочется подчеркнуть.",
        "Второе значение -self: «сам, лично, без помощи». I made this cake myself = я испёк сам, никто не помогал. Здесь myself можно убрать, и фраза останется правильной, просто без акцента. А by myself значит «один, в одиночку»: I live by myself = я живу один.",
        "Each other описывает взаимное действие: каждый делает что-то с другим. They love themselves = каждый любит себя (звучит как самовлюблённость). They love each other = любят друг друга. Русское «любить друг друга» и «любить себя» тоже разные, просто русские иногда ошибаются по привычке и ставят -selves на «мы, они»."
      ],
      algo: [
        "Шаг 1. Спроси себя: тот, кто действует, и тот, на кого направлено действие, один и тот же? Если да, нужен -self.",
        "Шаг 2. Если двое или больше делают что-то ДРУГ С ДРУГОМ, ставь each other, а не -selves.",
        "Шаг 3. Выбери форму по подлежащему: I → myself, she → herself, they → themselves. Много «вы» → yourselves.",
        "Шаг 4. Если в русском глагол на «-ся» (умываться, волноваться, встречаться), проверь: по-английски он скорее всего идёт без -self (wash, worry, meet).",
        "Шаг 5. Хочешь сказать «сам, без помощи», поставь -self в конце фразы. «Один, в одиночку» = by + -self."
      ],
      cases: [
        {
          h: "Себя после предлога места",
          t: "После предлогов места английский обычно ставит обычное местоимение, а не -self, потому что и так понятно, о ком речь. Сравни с look at herself, где -self нужен.",
          ex: [["She put the bag next to her.", "Она поставила сумку рядом с собой."], ["She looked at herself in the mirror.", "Она посмотрела на себя в зеркало."]]
        },
        {
          h: "Enjoy всегда с объектом",
          t: "Глагол enjoy не может стоять один: нужно сказать, чем наслаждаешься. Если «хорошо провести время» без объекта, ставим yourself / ourselves.",
          ex: [["Did you enjoy yourselves at the party?", "Вам понравилось на вечеринке?"], ["I enjoyed the film.", "Мне понравился фильм."]]
        },
        {
          h: "Each other или one another",
          t: "One another значит то же самое, просто чуть официальнее. Для школы и разговора хватит each other.",
          ex: [["We have known each other for years.", "Мы знаем друг друга много лет."]]
        },
        {
          h: "Одеваться и чувствовать себя",
          t: "«Одеваться» чаще всего get dressed, «чувствовать себя» просто feel + прилагательное. Никакого myself.",
          ex: [["I got dressed and went out.", "Я оделся и вышел."], ["I feel tired.", "Я чувствую себя уставшим."]]
        }
      ],
      faq: [
        ["Почему в «я чувствую себя плохо» нет myself?", "Потому что feel в английском означает именно состояние: I feel bad = мне плохо. Слово «себя» тут русская привычка, а английскому оно не нужно."],
        ["Почему himself, а не hisself, если herself?", "Так сложилось исторически: himself и themselves строятся от him и them. Hisself и theirselves встречаются только в неграмотной речи, писать так нельзя."],
        ["Можно ли сказать We help ourselves?", "Можно, но смысл другой: «мы помогаем себе сами» или «угощаемся». Если «помогаем друг другу», только We help each other."],
        ["Чем by myself отличается от myself?", "Myself = сам, без помощи (I did it myself). By myself = один, без компании (I went to the cinema by myself). Часто оба подходят, но by myself подчёркивает одиночество."]
      ]
    }
  };

  N[58] = {
    note: {
      name: "So do I / Neither do I",
      idea: "Так говорят «я тоже». So на утверждение, Neither на отрицание; глагол берём из фразы собеседника.",
      forms: [
        ["+", "So + помощник + I: So do I."],
        ["-", "Neither / Nor + помощник + I: Neither do I."],
        ["разг.", "Me too (+) / Me neither (-)"],
        ["не согласен", "I don't. / I do!"]
      ],
      when: [
        "Согласие с плюсом: I'm tired. So am I.",
        "Согласие с минусом: I can't swim. Neither can I.",
        "Обычный глагол → do/does/did: I went there. So did I.",
        "Несогласие: I like it. Oh, I don't."
      ],
      signals: ["so", "neither", "nor", "me too", "me neither"],
      examples: [
        ["I love summer. So do I.", "Я люблю лето. Я тоже."],
        ["I wasn't at school yesterday. Neither was I.", "Меня вчера не было в школе. Меня тоже."],
        ["My sister plays the piano. So does my brother.", "Сестра играет на пианино. Брат тоже."]
      ],
      mistakes: [
        ["I don't like fish. Me too.", "Me neither. / Neither do I."],
        ["So I do.", "So do I."],
        ["Neither don't I.", "Neither do I."]
      ],
      remember: "Плюс → So, минус → Neither; глагол как у него, I в самом конце."
    },
    deep: {
      why: [
        "Английский не любит повторять всю фразу. Вместо «Я тоже люблю пиццу» он берёт только вспомогательный глагол (помощник: do, am, can, have и т.д.) и как бы говорит: «Так же делаю и я». Помощник заменяет весь глагол с хвостом.",
        "Порядок слов в So do I как в вопросе: сначала глагол, потом I. Это не вопрос, просто после so и neither в начале фразы английский переставляет слова. Поэтому So I do звучит совсем иначе (это «и правда, так и есть»), а не «я тоже».",
        "В русском «я тоже» подходит и к «люблю», и к «не люблю». В английском нужно выбрать: на утверждение So, на отрицание Neither. При этом neither уже содержит «не», а в английском в одной фразе бывает только одно отрицание. Поэтому Neither do I, без not.",
        "Помощник должен совпадать по времени и типу с фразой собеседника. Сказал am, отвечаешь am; сказал can't, отвечаешь can; сказал went (прошедшее, обычный глагол), отвечаешь did. Ты как будто зеркалишь его глагол."
      ],
      algo: [
        "Шаг 1. Послушай фразу: в ней есть not (don't, can't, wasn't)? Нет → So. Да → Neither (или Nor).",
        "Шаг 2. Найди помощника: am / is / are, was / were, can, will, have, should. Если есть, бери его без not.",
        "Шаг 3. Если глагол обычный (like, play, went), ставь do / does / did в том же времени.",
        "Шаг 4. Собери: So / Neither + помощник + кто (I, my brother, we).",
        "Шаг 5. Если ты НЕ согласен, не нужны ни so, ни neither: просто I + помощник (I don't. / I do!)."
      ],
      cases: [
        {
          h: "Не только I",
          t: "После so и neither может стоять любой человек, и помощник подстраивается под него: does для he / she.",
          ex: [["Tom likes chess. So does Anna.", "Том любит шахматы. Анна тоже."], ["We can't come. Neither can they.", "Мы не можем прийти. Они тоже."]]
        },
        {
          h: "Have в Present Perfect",
          t: "Если собеседник сказал have been / has seen, это помощник have, его и повторяем.",
          ex: [["I have been to Rome. So have I.", "Я был в Риме. Я тоже."]]
        },
        {
          h: "Never и hardly: это тоже минус",
          t: "В слове never спрятано отрицание, хотя not нет. Поэтому отвечаем через Neither.",
          ex: [["I never eat meat. Neither do I.", "Я никогда не ем мясо. Я тоже."]]
        },
        {
          h: "Несогласие",
          t: "Если у тебя наоборот, ставь противоположный знак: на плюс отвечаешь с not, на минус без not.",
          ex: [["I didn't like the book. I did!", "Мне не понравилась книга. А мне понравилась!"], ["I like horror films. Oh, I don't.", "Люблю ужастики. А я нет."]]
        }
      ],
      faq: [
        ["Почему нельзя Me too на I don't like it?", "Me too значит «у меня тоже плюс». На отрицание англичанин ждёт Me neither. Me too на минус звучит так, будто ты как раз любишь."],
        ["Чем Neither отличается от Nor?", "По смыслу ничем. Nor do I чуть короче и немного книжнее, Neither do I встречается чаще."],
        ["Почему I was tired → So was I, а не So did I?", "Did ставим только вместо обычного глагола. Was сам по себе помощник, поэтому его и повторяем."],
        ["Можно ли просто сказать I too?", "Нет, I too звучит очень книжно и в разговоре почти не встречается. Говори So do I или Me too."]
      ]
    }
  };

  N[31] = {
    note: {
      name: "Модальные догадки: must be, might be, can't be",
      idea: "Must, might, can't выражают, насколько мы уверены в догадке. О прошлом: модальный + have + 3-я форма.",
      forms: [
        ["95% да", "must be / must have been"],
        ["50%", "might / may / could be; might have done"],
        ["95% нет", "can't be / can't have done"],
        ["упрёк", "should have + 3-я форма"]
      ],
      when: [
        "Уверенный вывод: He worked all day. He must be tired.",
        "Может быть: She might be at home.",
        "Точно нет: It can't be true!",
        "Догадка о прошлом: She might have forgotten."
      ],
      signals: ["probably", "perhaps", "maybe", "I'm sure", "I bet"],
      examples: [
        ["He isn't answering. He must be sleeping.", "Он не отвечает. Наверное, спит."],
        ["He can't be at home. His car isn't here.", "Он не может быть дома. Машины нет."],
        ["You should have studied.", "Тебе надо было учиться."]
      ],
      mistakes: [
        ["It mustn't be true.", "It can't be true."],
        ["He must be tired yesterday.", "He must have been tired yesterday."],
        ["She might forgot.", "She might have forgotten."]
      ],
      remember: "Must = точно да, might = может, can't = точно нет; прошлое = + have + V3."
    },
    deep: {
      why: [
        "Модальные глаголы (must, might, can, should) обычно говорят о долге или умении. Но у них есть второе значение: насколько мы уверены. He must be tired не значит «он обязан устать», а значит «я сделал вывод, что он устал». Это как русское «должно быть, наверняка».",
        "Представь шкалу уверенности. Наверху must (почти 100% да), внизу can't (почти 100% нет), посередине might / may / could (может быть). Обрати внимание: противоположность must здесь can't, а не mustn't. Mustn't остаётся «нельзя, запрещено», к догадкам он не подходит.",
        "Модальный глагол не имеет прошедшего времени в этом значении. Поэтому чтобы перенести догадку в прошлое, после него ставим have + 3-я форма (причастие, done, been, forgotten). Must have been = наверняка был. Время показывает не must, а have + V3.",
        "Should have + 3-я форма стоит рядом, но это не догадка, а сожаление или упрёк: «надо было, а не сделал». You should have called me = тебе надо было позвонить (а ты не позвонил)."
      ],
      algo: [
        "Шаг 1. Пойми, это факт или догадка. Если ты знаешь точно, модальный не нужен: He is tired.",
        "Шаг 2. Оцени уверенность: почти уверен «да» → must; не знаю → might / may / could; уверен «нет» → can't.",
        "Шаг 3. Определи время догадки. Сейчас → модальный + be (или be + -ing для процесса). Прошлое → модальный + have + 3-я форма.",
        "Шаг 4. Если речь о том, что «надо было сделать, но не сделали», бери should have + 3-я форма.",
        "Шаг 5. Проверь, что после модального нет to и нет -s: He must be, а не He musts be / must to be."
      ],
      cases: [
        {
          h: "Догадка о процессе сейчас",
          t: "Если думаешь, что человек прямо сейчас что-то делает, после модального ставь be + -ing.",
          ex: [["They might be watching TV.", "Может, они смотрят телевизор."], ["She must be working late.", "Наверное, она работает допоздна."]]
        },
        {
          h: "must: долг или вывод?",
          t: "Смысл видно по контексту. Если есть причина-улика (работал весь день), это вывод. Если правило, это долг.",
          ex: [["You must wear a helmet.", "Ты обязан носить шлем."], ["You've been running. You must be thirsty.", "Ты бегал. Ты, наверное, хочешь пить."]]
        },
        {
          h: "can't have done: не мог сделать",
          t: "Уверенное «нет» о прошлом. Это не про умение, а про логику: этого не было.",
          ex: [["He can't have done it. He was with me.", "Он не мог этого сделать. Он был со мной."]]
        }
      ],
      faq: [
        ["Почему нельзя сказать mustn't be для «не может быть»?", "Mustn't значит «запрещено». It mustn't be true прозвучит как «этому запрещено быть правдой». Для уверенного «нет» есть can't be."],
        ["Есть ли разница между might, may и could?", "В догадках почти нет. May чуть официальнее, might и could чаще в разговоре. Все три примерно 50 на 50."],
        ["Почему после must have идёт been, а не was?", "После have всегда 3-я форма глагола (причастие). У be это been. Так же, как в Present Perfect: I have been."],
        ["Чем should have отличается от must have?", "Must have = догадка («наверняка сделал»). Should have = сожаление («надо было сделать, но не сделал»)."]
      ]
    }
  };

  N[32] = {
    note: {
      name: "Gerund (-ing) или infinitive (to + глагол)",
      idea: "Второй глагол идёт с -ing или с to, и выбор зависит от первого слова. После предлогов всегда -ing.",
      forms: [
        ["-ing", "enjoy, finish, stop, avoid, mind, keep, suggest + -ing"],
        ["to", "want, need, decide, plan, hope, learn, agree, promise + to"],
        ["предлог", "at, for, before, after, without + -ing"],
        ["без to", "can, must, should, will, let, make + глагол"]
      ],
      when: [
        "После «любимых» -ing глаголов: I enjoy reading.",
        "После планов и желаний: I decided to go.",
        "После предлога: Thank you for helping me.",
        "После прилагательного: It's easy to learn."
      ],
      signals: ["enjoy", "finish", "want", "decide", "good at", "let"],
      examples: [
        ["I finished doing my homework.", "Я закончил делать уроки."],
        ["She hopes to see you.", "Она надеется увидеть тебя."],
        ["Before leaving, turn off the light.", "Перед уходом выключи свет."]
      ],
      mistakes: [
        ["I finished to do it.", "I finished doing it."],
        ["I'm good at draw.", "I'm good at drawing."],
        ["Let me to help.", "Let me help."]
      ],
      remember: "Хочу, решил, надеюсь → to; люблю делать, закончил, перестал → -ing; предлог → всегда -ing."
    },
    deep: {
      why: [
        "По-русски после «люблю, хочу, закончил» всегда идёт инфинитив (неопределённая форма: читать, делать). В английском у второго глагола две формы: герундий (gerund, глагол с -ing, который работает как существительное: reading = чтение) и инфинитив с to (to read).",
        "Есть полезная подсказка. To часто смотрит вперёд, в будущее: want to, plan to, hope to, decide to, promise to. Ты ещё не сделал, только собираешься. А -ing часто описывает само занятие, процесс, который уже есть или был: enjoy reading, finish reading, stop talking, avoid meeting. Это не железный закон, но помогает угадать.",
        "Предлог (at, for, in, about, before, after, without) в английском всегда требует после себя существительное. Глагол может стать существительным только с -ing. Поэтому после любого предлога глагол всегда с -ing: good at drawing, thank you for helping. В русском здесь часто другая конструкция («спасибо, что помог»), и это сбивает.",
        "Модальные глаголы (can, must, should, will) и глаголы let, make ставят после себя голый глагол, без to. Так устроены модальные: они уже сами помощники и не любят лишних слов."
      ],
      algo: [
        "Шаг 1. Найди слово перед вторым глаголом. Это предлог? Тогда сразу -ing.",
        "Шаг 2. Это can, must, should, will, let, make? Тогда глагол без to: let me go.",
        "Шаг 3. Это прилагательное (easy, hard, nice, happy)? Обычно to: nice to meet you.",
        "Шаг 4. Это обычный глагол? Вспомни списки: enjoy / finish / stop / avoid / mind / keep → -ing; want / need / decide / plan / hope / learn / agree / promise / would like → to.",
        "Шаг 5. Если не помнишь, спроси себя: это план на будущее (→ to) или само занятие (→ -ing)?",
        "Шаг 6. Сомневаешься в like / love / hate? Подходит и то, и другое. Но would like только с to."
      ],
      cases: [
        {
          h: "like и would like",
          t: "Like = люблю вообще, можно с -ing или to. Would like = хотел бы сейчас, только to.",
          ex: [["I like swimming. = I like to swim.", "Я люблю плавать."], ["I would like to swim.", "Я бы хотел поплавать."]]
        },
        {
          h: "Stop + -ing и stop + to",
          t: "Stop doing = перестать делать. Stop to do = остановиться, чтобы что-то сделать. Смысл совсем разный.",
          ex: [["He stopped smoking.", "Он бросил курить."], ["He stopped to smoke.", "Он остановился, чтобы покурить."]]
        },
        {
          h: "-ing в начале фразы",
          t: "Если действие стоит в роли подлежащего (то, о чём говорим), берём -ing. Это как русское «Плавание полезно».",
          ex: [["Swimming is good for you.", "Плавать полезно."]]
        },
        {
          h: "Look forward to + -ing",
          t: "Здесь to это предлог, а не часть инфинитива, поэтому после него -ing. Ловушка для всех.",
          ex: [["I'm looking forward to seeing you.", "Жду встречи с тобой."]]
        }
      ],
      faq: [
        ["Почему нельзя I finished to do?", "Finish всегда требует -ing, это свойство глагола. Его нужно просто запомнить, как в русском «бояться чего», а не «бояться что»."],
        ["Как не путать, если списков много?", "Учи глаголы сразу парой со вторым словом: enjoy doing, decide to do. В тетради запиши два столбца и добавляй новые."],
        ["Почему Let me help без to, если по-русски «дай мне помочь»?", "Let и make работают как модальные: после них голый глагол. Make me laugh, let him go."],
        ["Mind это «против»?", "Да, mind в вопросах = «возражать». Do you mind opening the window? = Не против открыть окно? После mind всегда -ing."]
      ]
    }
  };

  N[33] = {
    note: {
      name: "Разделительные вопросы: ..., isn't it?",
      idea: "Короткий хвостик в конце фразы значит «да? правда?». Плюс в фразе → минус в хвостике, и наоборот.",
      forms: [
        ["+ / -", "It's cold, isn't it?"],
        ["- / +", "They didn't come, did they?"],
        ["нет помощника", "You like pizza, don't you?"],
        ["исключения", "I'm right, aren't I? / Let's go, shall we?"]
      ],
      when: [
        "Ждём согласия: The film was good, wasn't it?",
        "Уточняем: You will come, won't you?",
        "Обычный глагол → do/does/did: He plays, doesn't he?",
        "В хвосте только местоимение: Your mom..., isn't she?"
      ],
      signals: [],
      examples: [
        ["She can swim, can't she?", "Она умеет плавать, правда?"],
        ["She isn't here, is she?", "Её здесь нет, да?"],
        ["They went home, didn't they?", "Они ушли домой, да?"]
      ],
      mistakes: [
        ["You like pizza, isn't it?", "You like pizza, don't you?"],
        ["They didn't come, didn't they?", "They didn't come, did they?"],
        ["Anna is nice, isn't Anna?", "Anna is nice, isn't she?"]
      ],
      remember: "Плюс-минус, минус-плюс; помощник тот же, в хвосте местоимение."
    },
    deep: {
      why: [
        "Разделительный вопрос (tag question, вопрос-хвостик) похож на русское «да?», «правда?», «не так ли?». Но русское «да?» одно на все случаи, а английский хвостик каждый раз собирается из самой фразы. Поэтому isn't it на всё подряд не подходит.",
        "Хвостик повторяет вспомогательный глагол (помощник) из предложения и местоимение подлежащего. Если в предложении is, в хвостике is; если can, то can; если обычный глагол без помощника (like, went), появляется do / does / did, как при построении вопроса.",
        "Знак хвостика противоположный. Фраза с плюсом, хвостик с минусом (It's cold, isn't it?). Фраза с not, хвостик без not (She isn't here, is she?). Английский не любит два отрицания рядом, и хвостик как бы проверяет: «ведь правда наоборот не так?».",
        "Интонация меняет смысл. Если голос в хвостике идёт вниз, ты почти уверен и ждёшь согласия. Если вверх, ты правда спрашиваешь и не уверен."
      ],
      algo: [
        "Шаг 1. Посмотри на фразу: есть ли в ней not (или never)? Есть → хвостик без not. Нет → хвостик с n't.",
        "Шаг 2. Найди помощника: am / is / are, was / were, can, will, have, should. Его и бери.",
        "Шаг 3. Помощника нет (I like, he plays, they went)? Ставь do / does / did по времени и лицу.",
        "Шаг 4. Замени подлежащее местоимением: Anna → she, my parents → they, the film → it.",
        "Шаг 5. Собери: помощник (+ n't) + местоимение + знак вопроса. Проверь исключения: I am → aren't I, Let's → shall we."
      ],
      cases: [
        {
          h: "I am → aren't I",
          t: "Формы amn't в современном английском нет, поэтому берём aren't I. Это просто нужно запомнить.",
          ex: [["I'm right, aren't I?", "Я прав, не так ли?"]]
        },
        {
          h: "Let's → shall we",
          t: "Если фраза предлагает что-то сделать вместе, хвостик всегда shall we.",
          ex: [["Let's go, shall we?", "Пойдём, ладно?"]]
        },
        {
          h: "Never и nobody: фраза уже с минусом",
          t: "Слова never, nobody, nothing делают фразу отрицательной, поэтому хвостик с плюсом.",
          ex: [["You never call me, do you?", "Ты мне никогда не звонишь, да?"]]
        },
        {
          h: "Have в Present Perfect",
          t: "Если в фразе have / has + 3-я форма, в хвостике haven't / hasn't.",
          ex: [["You've seen this film, haven't you?", "Ты видел этот фильм, да?"]]
        }
      ],
      faq: [
        ["Почему нельзя всегда говорить isn't it, как «не так ли»?", "Isn't it подходит только к фразам с it is. В английском хвостик зеркалит глагол и подлежащее, поэтому к You like pizza нужен don't you."],
        ["Можно ли вместо хвостика сказать right?", "Да, в разговоре часто говорят ..., right? Это проще и правильно. Но в тестах и экзаменах проверяют именно хвостики."],
        ["Почему She isn't here, is she, а не isn't she?", "Во фразе уже есть not. Два минуса подряд английский не ставит, поэтому хвостик с плюсом."],
        ["Как ответить на такой вопрос?", "Отвечай по факту: Yes, she is или No, she isn't. Не по хвостику, а по правде."]
      ]
    }
  };

  N[34] = {
    note: {
      name: "Количество: each, every, both, either, neither, all, none",
      idea: "Слова для «каждый, оба, любой из двух, ни один, все, никто». Важно: из двух или из многих, и какое число дальше.",
      forms: [
        ["каждый", "every / each + ед. ч.: Every student has..."],
        ["двое", "both (оба), either (любой), neither (ни один)"],
        ["много", "all (все), none of (ни один)"],
        ["мало", "a few / few (+ мн.), a little / little (+ неисч.)"]
      ],
      when: [
        "Каждый из группы: Every student has a book.",
        "Про двоих: Both my parents work.",
        "Ни один из многих: None of them called.",
        "Мало, и это плохо: Few people came."
      ],
      signals: ["of them", "of us", "two", "both"],
      examples: [
        ["Each of them got a prize.", "Каждый из них получил приз."],
        ["You can take either bus.", "Можешь сесть на любой из двух автобусов."],
        ["I have a few friends here.", "У меня тут есть несколько друзей."]
      ],
      mistakes: [
        ["Every students have a book.", "Every student has a book."],
        ["None of them didn't call.", "None of them called."],
        ["I don't like it too.", "I don't like it either."]
      ],
      remember: "Двое: both, either, neither. Много: all, none. Every и each: одно и has."
    },
    deep: {
      why: [
        "Английский делит количество по двум вопросам: сколько всего предметов (два или много) и смотрим на них по одному или вместе. Every и each смотрят на каждого по отдельности, поэтому после них единственное число и глагол как с he: Every student has. All смотрит на всех вместе, поэтому all students have.",
        "Для двух предметов есть свои слова: both (оба), either (любой из двух), neither (ни один из двух). Для трёх и больше: all (все), any (любой), none (ни один). Если сказать both про троих, будет ошибка, как сказать «оба» про пятерых.",
        "В русском двойное отрицание нормально: «никто не позвонил». В английском разрешено только одно. None уже значит «ни один», поэтому None of them called, без not. То же с neither: Neither answer is correct.",
        "Few и little говорят «мало», с чувством, что этого не хватает. A few и a little говорят «немного, несколько», и это уже что-то. Маленький артикль a превращает «мало» в «есть немного». Few и a few с исчисляемыми (friends, people), little и a little с неисчисляемыми (time, money, water)."
      ],
      algo: [
        "Шаг 1. Сколько всего вариантов: два или больше? Два → both / either / neither. Больше → all / none / every / each.",
        "Шаг 2. Смотришь на всех вместе (all, both) → множественное число глагола. По одному (every, each, either, neither) → единственное: has, is.",
        "Шаг 3. Если потом идёт местоимение (us, them), ставь of: all of us, each of them, none of them, both of them.",
        "Шаг 4. Отрицание: none и neither уже со смыслом «нет», второе not не добавляй.",
        "Шаг 5. Для «мало / немного» реши: исчисляемое (few) или нет (little), и хорошо это (a few, a little) или плохо (few, little)."
      ],
      cases: [
        {
          h: "Every или each",
          t: "Every = все без исключения, как группа. Each = каждый по отдельности, особенно когда их немного. Each of можно, а every of нельзя.",
          ex: [["Every child loves sweets.", "Все дети любят сладкое."], ["Each of the students answered a question.", "Каждый из учеников ответил на вопрос."]]
        },
        {
          h: "Either = «тоже» в отрицании",
          t: "На плюс говорим too, на минус either в конце фразы.",
          ex: [["I don't like coffee either.", "Я тоже не люблю кофе."]]
        },
        {
          h: "All с местоимением",
          t: "Перед существительным of можно опустить: all my friends = all of my friends. Перед us, them нужен of.",
          ex: [["All of us are ready.", "Мы все готовы."]]
        }
      ],
      faq: [
        ["Почему Every student HAS, ведь студентов много?", "Every заставляет смотреть на каждого по одному: «каждый ученик имеет». Поэтому глагол как с he: has."],
        ["Чем none отличается от no one?", "None of = ни один из определённой группы (none of my friends). No one / nobody = никто вообще, без «из»."],
        ["Почему Few people came звучит грустно?", "Few без a значит «мало, меньше, чем ждали». Если сказать A few people came, смысл «пришло несколько человек», без печали."],
        ["Можно ли сказать both of my friends, если их три?", "Нет, both только про двух. Про троих и больше говори all."]
      ]
    }
  };

  N[35] = {
    note: {
      name: "Связки для мнения и эссе",
      idea: "Связки (linking words) соединяют мысли и показывают логику текста: добавить, противопоставить, причина, итог.",
      forms: [
        ["мнение", "I think, in my opinion, personally"],
        ["добавить", "also, moreover, in addition"],
        ["против", "but, however, although, despite"],
        ["причина/итог", "because (of), so, therefore, in conclusion"]
      ],
      when: [
        "Высказать мнение: In my opinion, uniform is useful.",
        "Добавить: Moreover, it is fun.",
        "Противопоставить: However, it is very expensive.",
        "Подвести итог: To sum up, the internet is useful."
      ],
      signals: ["however", "moreover", "although", "despite", "therefore", "in conclusion"],
      examples: [
        ["Although it was raining, we went out.", "Хотя шёл дождь, мы вышли гулять."],
        ["Despite the rain, we went out.", "Несмотря на дождь, мы вышли гулять."],
        ["We stayed at home because of the rain.", "Мы остались дома из-за дождя."]
      ],
      mistakes: [
        ["On my opinion", "In my opinion"],
        ["Despite of the rain", "Despite the rain / In spite of the rain"],
        ["Despite it was raining", "Although it was raining"]
      ],
      remember: "Although + предложение, despite + существительное; however с запятой в начале."
    },
    deep: {
      why: [
        "Связки (linking words) это дорожные знаки для читателя. Они заранее говорят, что будет дальше: ещё один довод (moreover), поворот (however), причина (because) или вывод (therefore). Без них эссе превращается в список фраз, и экзаменатор снижает балл за связность.",
        "Главная ловушка в том, что связки с похожим смыслом требуют разной грамматики. Although и because стоят перед целым предложением (кто + глагол): although it was raining. Despite и because of стоят перед существительным или -ing: despite the rain, because of the rain. По-русски «хотя» и «несмотря на» тоже разные, так что опирайся на это.",
        "Позиция тоже важна. But и so соединяют две части внутри одного предложения. However, moreover, therefore, in addition обычно начинают новое предложение и отделяются запятой. Это слова для письменной, более официальной речи.",
        "Не перегружай текст. Одна связка на предложение достаточно. In my opinion, I think повторяет одно и то же дважды, выбери что-то одно."
      ],
      algo: [
        "Шаг 1. Пойми, какая связь между двумя мыслями: добавление, противопоставление, причина, следствие, пример или итог.",
        "Шаг 2. Выбери связку из нужной группы. Для письменной речи бери более официальные: moreover, however, therefore.",
        "Шаг 3. Посмотри, что идёт после: целое предложение (although, because, since) или существительное / -ing (despite, in spite of, because of, due to).",
        "Шаг 4. Поставь знаки: however, moreover, in addition в начале предложения и с запятой после.",
        "Шаг 5. Перечитай: нет ли двух связок с одним смыслом подряд (In my opinion, I think...)."
      ],
      cases: [
        {
          h: "although или despite",
          t: "Один смысл, разная грамматика. Although + подлежащее + глагол. Despite / in spite of + существительное или -ing. Despite of не бывает.",
          ex: [["Although he was tired, he finished the work.", "Хотя он устал, он закончил работу."], ["In spite of being tired, he finished the work.", "Несмотря на усталость, он закончил работу."]]
        },
        {
          h: "because или because of",
          t: "Because + предложение, because of / due to + существительное.",
          ex: [["We were late because the bus broke down.", "Мы опоздали, потому что сломался автобус."], ["We were late because of the bus.", "Мы опоздали из-за автобуса."]]
        },
        {
          h: "whereas: сравнение двух сторон",
          t: "Whereas = «тогда как». Показывает, что два факта противоположны, но оба верны.",
          ex: [["I love tea, whereas my sister loves coffee.", "Я люблю чай, тогда как сестра любит кофе."]]
        },
        {
          h: "such as или for example",
          t: "Such as стоит прямо перед примерами внутри фразы. For example чаще начинает новое предложение или стоит с запятыми.",
          ex: [["I like sports such as tennis and football.", "Я люблю такие виды спорта, как теннис и футбол."]]
        }
      ],
      faq: [
        ["Можно ли начинать предложение с But?", "В разговоре и в личных письмах можно. В эссе лучше However, с запятой."],
        ["Чем however отличается от but?", "Смысл тот же, но but соединяет внутри одного предложения, а however начинает новое и звучит официальнее."],
        ["Почему нельзя despite it was raining?", "После despite не может идти целое предложение. Либо Although it was raining, либо Despite the rain."],
        ["Since это только «с тех пор»?", "Нет, в эссе since и as часто значат «так как»: Since it was late, we went home."]
      ]
    }
  };

  N[36] = {
    note: {
      name: "Фразовые глаголы",
      idea: "Глагол + маленькое слово (up, off, out, on) = новый смысл. Учи целиком, с примером.",
      forms: [
        ["1", "глагол + частица: get up, give up"],
        ["2", "с предметом: turn off the light = turn the light off"],
        ["it / them", "turn it off (не turn off it)"],
        ["look for / after", "look for it (it в конце)"]
      ],
      when: [
        "Каждый день: get up, put on, take off, turn on / off.",
        "Искать и узнавать: look for, find out, figure out.",
        "Начать и бросить: take up, give up, put off.",
        "Закончиться: We've run out of milk."
      ],
      signals: ["up", "off", "out", "on", "back", "over"],
      examples: [
        ["I took up swimming last year.", "Я начал заниматься плаванием в прошлом году."],
        ["She looks after her little brother.", "Она присматривает за младшим братом."],
        ["Turn it off!", "Выключи его!"]
      ],
      mistakes: [
        ["Turn off it.", "Turn it off."],
        ["I'm looking it for.", "I'm looking for it."],
        ["We've run out milk.", "We've run out of milk."]
      ],
      remember: "Маленькое слово меняет всё: it и them прячь в середину."
    },
    deep: {
      why: [
        "Фразовый глагол (phrasal verb) это глагол плюс маленькое слово: частица (up, off, out) или предлог (for, after). Вместе они дают новое значение, которое часто нельзя угадать по частям. Get = получать, а get up = вставать. Give = давать, а give up = бросить, сдаться.",
        "Иногда частица подсказывает смысл. Up часто значит «до конца, полностью» или «вверх» (eat up, get up). Off часто значит «отделиться, выключить» (take off, turn off). Out часто «наружу, до результата» (find out, get out). Но это только подсказки: учи каждый глагол с примером.",
        "В русском похожую работу делают приставки: «писать» и «списать», «дать» и «сдаться». Так что идея знакомая. Разница в том, что в английском «приставка» стоит после глагола и может отрываться от него.",
        "Большинство фразовых глаголов с частицей разделяемые: предмет можно поставить после частицы или между. Turn off the light = turn the light off. Но если предмет it или them, он всегда идёт в середину: turn it off. У глаголов с предлогом (look for, look after) предмет всегда в конце: look for it."
      ],
      algo: [
        "Шаг 1. Увидел глагол + up / off / out / on / for / after? Не переводи по частям, вспомни выражение целиком.",
        "Шаг 2. Если не знаешь значение, посмотри в словаре именно фразовый глагол, а не отдельные слова.",
        "Шаг 3. Ставишь предмет? Если это существительное, можно до или после частицы: put on your jacket / put your jacket on.",
        "Шаг 4. Если предмет it или them, ставь его в середину: put it on, take them off.",
        "Шаг 5. У look for, look after, get over предмет всегда в конце: look after them.",
        "Шаг 6. Записывай в тетрадь не просто «give up = бросить», а с примером: I gave up sweets."
      ],
      cases: [
        {
          h: "Один глагол, два смысла",
          t: "Take off = снять одежду и взлететь. Work out = тренироваться и получиться, разобраться. Смысл понятен по контексту.",
          ex: [["The plane took off at six.", "Самолёт взлетел в шесть."], ["I work out three times a week.", "Я тренируюсь три раза в неделю."]]
        },
        {
          h: "run out of: с of перед предметом",
          t: "Если говоришь, чего не хватает, нужен of. Без предмета просто run out.",
          ex: [["We've run out of milk.", "У нас закончилось молоко."], ["Time is running out.", "Время заканчивается."]]
        },
        {
          h: "give up + -ing",
          t: "После фразового глагола тоже может идти глагол, и он с -ing.",
          ex: [["I gave up smoking.", "Я бросил курить."]]
        }
      ],
      faq: [
        ["Зачем учить фразовые глаголы, если есть обычные слова?", "Носители говорят ими постоянно. Find out звучит живо, а discover в бытовой речи книжно. Без фразовых глаголов трудно понимать фильмы и разговоры."],
        ["Почему turn off it нельзя?", "Так устроены разделяемые фразовые глаголы: короткое местоимение не может стоять после частицы. Только turn it off."],
        ["Как понять, можно ли разделять глагол?", "Если маленькое слово это for, after, at, into, предмет идёт после него (look for it). Если up, off, out, on, обычно разделять можно. Словарь показывает это значком sth в середине."],
        ["Сколько их всего?", "Тысячи, но для B1 хватит 50-100 самых частых. Учи по темам: одежда, техника, решения."]
      ]
    }
  };

  N[38] = {
    note: {
      name: "Say, tell, speak, talk; do, make, take, get",
      idea: "Русские «сказать» и «делать» в английском делятся на несколько глаголов. Выбор зависит от смысла и устойчивых пар.",
      forms: [
        ["say / tell", "say + слова; tell + кому (tell me)"],
        ["speak / talk", "speak English; talk to / about"],
        ["do / make", "do = работа, задание; make = создать результат"],
        ["take / get", "take a shower; get tired / get home"]
      ],
      when: [
        "Есть «кому» без to → tell: He told me the news.",
        "Язык или речь → speak: Do you speak English?",
        "Создаём результат → make: make a decision.",
        "Стать или добраться → get: get tired, get home."
      ],
      signals: ["to me", "about", "homework", "a mistake", "a photo", "a break"],
      examples: [
        ["He told me that he was tired.", "Он сказал мне, что устал."],
        ["I made a mistake.", "Я ошибся."],
        ["Let's take a break.", "Давай сделаем перерыв."]
      ],
      mistakes: [
        ["He said me", "He told me / He said to me"],
        ["do a mistake", "make a mistake"],
        ["make homework", "do homework"]
      ],
      remember: "Tell кому, say что; do дело, make результат."
    },
    deep: {
      why: [
        "Русские «сказать» и «делать» очень широкие. Английский раскладывает их на несколько глаголов, и у каждого свой угол. Ошибка тут не грамматическая, а в выборе слова, поэтому лучше учить устойчивые пары (collocations, слова, которые «живут вместе»).",
        "Say и tell. Say смотрит на сами слова: что сказал (say hello, say no, He said that...). Tell смотрит на слушателя: кому сказал, и человек идёт сразу после tell без to (tell me, tell her). Поэтому He said me неправильно: у say нет места для слушателя без to. Ещё tell = рассказывать: tell a story, tell a joke, tell the truth, tell a lie.",
        "Speak и talk. Speak это говорить вообще: язык, громкость, выступление (speak English, speak slowly, speak at a meeting). Talk это беседа с кем-то: talk to someone, talk about something. Talk предполагает разговор двух сторон.",
        "Do и make. Do = выполнять работу, заниматься делом, процесс (do homework, do the dishes, do sport). Make = создать что-то, получить результат, которого раньше не было (make a cake, make a decision, make money, make friends). Take и get в английском входят в десятки выражений, где в русском свой глагол: take a shower (принять душ), get tired (устать)."
      ],
      algo: [
        "Шаг 1. Для «сказать»: есть слушатель сразу после глагола? Да → tell + человек. Нет, важны сами слова → say.",
        "Шаг 2. Речь о языке или манере говорить → speak. О разговоре, беседе с кем-то → talk to / about.",
        "Шаг 3. Для «делать»: это работа, задание, обязанность → do. Появляется новый предмет или результат → make.",
        "Шаг 4. Если в русском «принять, сделать, поехать» (душ, фото, такси, перерыв), проверь take.",
        "Шаг 5. «Стать, становиться, добраться, получить» → get: get cold, get home, get a job.",
        "Шаг 6. Сомневаешься? Вспомни готовую пару из тетради, а не переводи слово по слову."
      ],
      cases: [
        {
          h: "say to me тоже можно",
          t: "Если очень хочется сказать слушателя после say, нужен to. Но обычно проще tell me.",
          ex: [["He said to me, «Hi».", "Он сказал мне: «Привет»."], ["He told me the news.", "Он сообщил мне новость."]]
        },
        {
          h: "do или make: исключения",
          t: "Некоторые пары надо просто запомнить: do business, do your best, но make a phone call, make a promise, make a plan.",
          ex: [["Do your best!", "Постарайся изо всех сил!"], ["I made a promise.", "Я дал обещание."]]
        },
        {
          h: "get: три смысла",
          t: "Get + существительное = получить, get + прилагательное = стать, get + место = добраться.",
          ex: [["She got a new job.", "Она получила новую работу."], ["It's getting cold.", "Становится холодно."]]
        }
      ],
      faq: [
        ["Почему He said me неправильно?", "После say сразу идут слова, а не человек. Если хочешь указать слушателя, бери tell me или say to me."],
        ["Как запомнить do и make?", "Make = «из ничего появилось что-то» (торт, решение, деньги, ошибка). Do = «выполняю какое-то дело» (уроки, посуду, спорт)."],
        ["Speak to и talk to это одно и то же?", "Почти. Speak to чуть официальнее (Can I speak to the manager?), talk to дружелюбнее (Can I talk to you?)."],
        ["Почему take a photo, а не make a photo?", "Так сложилось в английском, это устойчивая пара. Make a photo носитель поймёт, но звучит как ошибка."]
      ]
    }
  };

  N[24] = {
    note: {
      name: "Все времена на одной странице",
      idea: "Время = когда (настоящее, прошлое, будущее) + какое (Simple, Continuous, Perfect, Perfect Continuous). 12 времён по одной логике.",
      forms: [
        ["Simple", "work / worked / will work"],
        ["Continuous", "am working / was working / will be working"],
        ["Perfect", "have worked / had worked / will have worked"],
        ["Perf. Cont.", "have been working / had been working"]
      ],
      when: [
        "Факт, привычка: I work every day.",
        "Процесс в момент: At 8 I was having breakfast.",
        "Результат к моменту: By 2028 I will have finished school.",
        "Длится до момента: I've been studying for 3 hours."
      ],
      signals: ["usually", "now", "already", "for / since", "by (June)", "at this time tomorrow"],
      examples: [
        ["When I arrived, the film had already started.", "Когда я пришёл, фильм уже начался."],
        ["At 10 tomorrow I'll be flying to Paris.", "Завтра в 10 я буду лететь в Париж."],
        ["She has been waiting since 5.", "Она ждёт с пяти часов."]
      ],
      mistakes: [
        ["I am studying for 3 hours.", "I have been studying for 3 hours."],
        ["When I came, the film already started.", "When I came, the film had already started."],
        ["By June I will learn 1000 words.", "By June I will have learned 1000 words."]
      ],
      remember: "Когда + какое: be + -ing = процесс, have + V3 = результат, have been + -ing = процесс до момента."
    },
    deep: {
      why: [
        "Двенадцать времён кажутся страшными, но это таблица 3 на 4. Первый вопрос: когда (Present, Past, Future). Второй: как мы смотрим на действие. Simple = просто факт или привычка. Continuous = процесс, в середине действия. Perfect = результат к какому-то моменту. Perfect Continuous = процесс, который шёл до какого-то момента (и может ещё идти).",
        "Каждый вид собирается из своих «деталей». Continuous всегда be + -ing. Perfect всегда have + 3-я форма. Perfect Continuous всегда have been + -ing. Меняется только форма первого помощника: am / was / will be, have / had / will have. Если поймёшь детали, любое время соберёшь сам.",
        "В русском всего три времени, а вид (сделал / делал) передаёт часть смысла. Поэтому русские чаще всего ошибаются в двух местах. «Я учусь уже 3 часа» по-русски настоящее, а по-английски Present Perfect Continuous: I've been studying for 3 hours, потому что действие началось в прошлом и тянется до сейчас. И «когда я пришёл, фильм уже начался»: в английском нужен Past Perfect, чтобы показать, что начался он раньше.",
        "Future Continuous и Future Perfect нужны реже. Future Continuous рисует картинку: в этот момент я буду в процессе (at 10 tomorrow I'll be flying). Future Perfect говорит: к этому моменту уже будет сделано (by June I will have learned). Подсказка для него: by = к такому-то сроку."
      ],
      algo: [
        "Шаг 1. Определи «когда»: сейчас / вообще, прошлое или будущее.",
        "Шаг 2. Определи «как»: просто факт → Simple; процесс в конкретный момент → Continuous; уже сделано к моменту → Perfect; длится до момента (for, since) → Perfect Continuous.",
        "Шаг 3. Возьми детали: be + -ing, have + 3-я форма или have been + -ing.",
        "Шаг 4. Поставь первый помощник в нужное время: am/is/are, was/were, will be; have/has, had, will have.",
        "Шаг 5. Проверь по словам-подсказкам: since / for → Perfect (Continuous); by + срок → Future Perfect; at this time tomorrow → Future Continuous; already раньше другого прошлого → Past Perfect."
      ],
      cases: [
        {
          h: "Past Simple или Past Perfect",
          t: "Если события идут по порядку, хватит Past Simple. Past Perfect нужен, когда надо подчеркнуть, что одно случилось раньше другого.",
          ex: [["I came home and had dinner.", "Я пришёл домой и поужинал."], ["She had left before I called.", "Она ушла до того, как я позвонил."]]
        },
        {
          h: "Present Perfect или Present Perfect Continuous",
          t: "Perfect считает результат (сколько сделано). Perfect Continuous показывает длительность процесса (как долго).",
          ex: [["I have read three books.", "Я прочитал три книги."], ["I have been reading all day.", "Я читаю весь день."]]
        },
        {
          h: "Future Continuous: картинка в будущем",
          t: "Это не «буду делать вообще», а «буду в процессе в определённую минуту».",
          ex: [["This time tomorrow I'll be lying on the beach.", "Завтра в это время я буду лежать на пляже."]]
        },
        {
          h: "Глаголы состояния без -ing",
          t: "Know, like, want, believe обычно не ставят в Continuous, даже в длинных временах. Вместо I've been knowing говорят I've known.",
          ex: [["I have known him for years.", "Я знаю его много лет."]]
        }
      ],
      faq: [
        ["Нужно ли учить все 12 времён сразу?", "Нет. Самые нужные: Present Simple, Present Continuous, Past Simple, Present Perfect, will. Остальные понимай по таблице и подключай постепенно."],
        ["Почему «я жду с пяти» это has been waiting, а не am waiting?", "Am waiting = жду прямо сейчас, без истории. Has been waiting показывает, что ожидание началось в прошлом (с пяти) и тянется до сих пор."],
        ["Чем Future Perfect отличается от простого will?", "Will finish = закончу (когда-то). Will have finished = к определённому сроку уже будет закончено. Ключ: by + срок."],
        ["Как не путаться в таблице?", "Запомни три детали: be + -ing = процесс, have + V3 = результат, have been + -ing = процесс до момента. Всё остальное это просто время первого помощника."]
      ]
    }
  };
})();
