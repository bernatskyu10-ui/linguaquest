/* Пошаговые объяснения и практика: уроки 37-45 */
(function () {
  const P = (window.GRAMMAR_PLUS = window.GRAMMAR_PLUS || {});
  const S = (h, t, ex) => ({ h, t, ex: ex || [] });
  const O = (q, words, a, why) => ({ k: "order", q, words, a, why });
  const Ch = (q, o, a, why) => ({ k: "choice", q, o, a, why });
  const I = (q, a, why) => ({ k: "input", q, a, why });
  const F = (q, a, why) => ({ k: "fix", q, a, why });

  P[37] = {
    steps: [
      S("Шаг 1. Слово = корень + кусочки", "Как и в русском, из одного корня получается много слов. Приставка спереди меняет смысл, суффикс сзади меняет часть речи. Выучив пару десятков таких кусочков, вы начнёте понимать сотни новых слов без словаря.", [["happy → unhappy → happiness", "счастливый → несчастный → счастье"], ["use → useful → useless", "польза → полезный → бесполезный"]]),
      S("Шаг 2. «Не-»: un-, in-, im-, dis-", "Самая частая приставка «не» - un- (unhappy). Есть и in- (incorrect, independent). Перед p и m обычно im- (impossible), перед l - il- (illegal), перед r - ir- (irregular). С глаголами чаще dis- (agree → disagree). Точного правила для всех слов нет, поэтому новое слово лучше проверить в словаре.", [["This task is impossible.", "Это задание невыполнимо."], ["I disagree with you.", "Я с тобой не согласен."], ["He looked unhappy.", "Он выглядел несчастным."]]),
      S("Шаг 3. re-, mis-, over-, under-, out-, de-", "re- = снова, как русское «пере-» (rewrite = переписать). mis- = неправильно (misunderstand). over- = слишком, under- = недо- (oversleep = проспать, underestimate = недооценить). out- = превзойти (outrun = обогнать). de- = убрать, отменить (deactivate).", [["I overslept and missed the bus.", "Я проспал и опоздал на автобус."], ["Sorry, I misunderstood you.", "Извини, я тебя неправильно понял."], ["Please rewrite this sentence.", "Пожалуйста, перепиши это предложение."]]),
      S("Шаг 4. Человек и существительное: -er, -or, -ist, -tion, -ment, -ness, -ity", "-er / -or / -ist обозначают человека: teacher, actor, economist. -tion, -ment, -ness, -ity делают из глагола или прилагательного существительное: educate → education, develop → development, kind → kindness, possible → possibility. Частая ошибка: ставить прилагательное там, где нужно существительное (не «happy is important», а happiness is important).", [["My sister wants to be an economist.", "Моя сестра хочет стать экономистом."], ["Education is very important.", "Образование очень важно."], ["Thank you for your kindness.", "Спасибо за вашу доброту."]]),
      S("Шаг 5. Прилагательные: -ful, -less, -able / -ible", "-ful = «с чем-то, полный» (useful = полезный), -less = «без» (useless = бесполезный, homeless = бездомный). -able / -ible = «можно сделать» (drinkable = пригодный для питья, readable = читаемый).", [["This app is really useful.", "Это приложение очень полезное."], ["My phone is useless without the internet.", "Без интернета мой телефон бесполезен."], ["Is this water drinkable?", "Эту воду можно пить?"]]),
      S("Шаг 6. Наречие «как?»: -ly", "Прилагательное отвечает на вопрос «какой?», наречие на вопрос «как?». Обычно добавляем -ly: quick → quickly, careful → carefully, happy → happily (y меняется на i). Русские часто пишут «drive careful», а нужно carefully. Исключения: good → well, fast → fast, hard → hard.", [["Drive carefully!", "Езжай осторожно!"], ["She speaks English well.", "Она хорошо говорит по-английски."]])
    ],
    tasks: [
      Ch("Противоположное к possible:", ["unpossible", "impossible", "dispossible"], 1, "Перед p ставим im-: impossible."),
      Ch("I ___ with you. (не согласен)", ["unagree", "misagree", "disagree"], 2, "С глаголом agree «не» - это dis-: disagree."),
      Ch("Drive ___! The road is wet.", ["careful", "carefully", "carefulness"], 1, "Как ехать? Нужно наречие: careful + -ly."),
      Ch("Sorry, I ___ the question.", ["misunderstood", "ununderstood", "disunderstood"], 0, "mis- = неправильно: misunderstand, в прошлом misunderstood."),
      I("This knife is ___ . It can't cut anything. (use + суффикс «без»)", ["useless"], "-less = без: useless = бесполезный."),
      I("Money can't buy ___ . (happy → существительное)", ["happiness"], "-ness делает существительное, а y меняется на i: happiness."),
      O("Соберите: Я проспал сегодня утром.", ["I", "overslept", "this", "morning"], "I overslept this morning", "over- = слишком: overslept = спал слишком долго, проспал."),
      O("Соберите: Мой брат хочет стать актёром.", ["My", "brother", "wants", "to", "be", "an", "actor"], "My brother wants to be an actor", "-or = человек: actor. Перед гласным звуком an."),
      O("Соберите: Пожалуйста, перепиши своё эссе.", ["Please", "rewrite", "your", "essay"], "Please rewrite your essay", "re- = снова, пере-: rewrite = переписать."),
      F("Исправьте: She sings beautiful.", ["She sings beautifully"], "Как поёт? Нужно наречие с -ly: beautifully.")
    ]
  };

  P[38] = {
    steps: [
      S("Шаг 1. say или tell: есть ли «кому»?", "Say = сказать слова, после него сразу то, что сказали: say hello, say sorry, He said that... Tell = сказать КОМУ-ТО, и человек идёт сразу после tell, без to: tell me, tell her. Самая частая ошибка русских: «He said me». Правильно: He told me или He said to me.", [["He said that he was tired.", "Он сказал, что устал."], ["He told me that he was tired.", "Он сказал мне, что устал."], ["Say sorry to your sister.", "Извинись перед сестрой."]]),
      S("Шаг 2. Устойчивые выражения с tell", "Эти пары учим целиком: tell the truth (говорить правду), tell a lie (врать), tell a story (рассказывать историю), tell a joke (рассказывать анекдот), tell a secret (рассказать секрет).", [["Always tell the truth.", "Всегда говори правду."], ["My grandpa tells great stories.", "Мой дедушка рассказывает отличные истории."]]),
      S("Шаг 3. speak и talk", "Speak = говорить на языке, говорить вообще (громко, медленно), выступать официально: speak English, speak slowly. Talk = беседовать, разговаривать: talk to someone, talk about something, talk on the phone.", [["Do you speak English?", "Вы говорите по-английски?"], ["We talked about the film for an hour.", "Мы целый час говорили о фильме."], ["Can I talk to you?", "Можно с тобой поговорить?"]]),
      S("Шаг 4. do или make", "По-русски оба «делать», поэтому путаница. Do = работа, занятия, задания, процесс: do homework, do the dishes, do sport, do your best. Make = создать что-то, получить результат: make a cake, make a decision, make a mistake, make money, make friends. Ошибка: «do a mistake», правильно make a mistake.", [["I do my homework after dinner.", "Я делаю домашку после ужина."], ["I made a mistake.", "Я ошибся."], ["She made a cake.", "Она испекла торт."]]),
      S("Шаг 5. take: там, где по-русски другой глагол", "Take = брать, но ещё он входит во много выражений, где в русском свой глагол: take a shower (принять душ), take a photo (сфотографировать), take a taxi (поехать на такси), take a break (сделать перерыв), take notes (записывать), take a risk (рискнуть).", [["Let's take a break.", "Давай сделаем перерыв."], ["Can you take a photo of us?", "Можешь нас сфотографировать?"]]),
      S("Шаг 6. get = получить, стать, добраться", "Get + существительное = получить (get a job, get a message). Get + прилагательное = стать, становиться (get tired, get cold, get better). Get + место = добраться (get home, get to school).", [["It's getting cold.", "Становится холодно."], ["What time did you get home?", "Во сколько ты добрался до дома?"], ["She got a new job.", "Она получила новую работу."]])
    ],
    tasks: [
      Ch("Can you ___ me the truth?", ["say", "tell", "speak"], 1, "tell the truth, и человек (me) сразу после tell."),
      Ch("She ___ three languages.", ["speaks", "tells", "says"], 0, "Про языки говорим speak."),
      Ch("I need to ___ a decision.", ["do", "make", "get"], 1, "Решение - это результат: make a decision."),
      Ch("Let's ___ a taxi.", ["take", "make", "do"], 0, "Поехать на такси: take a taxi."),
      I("Who ___ the dishes yesterday? (do в прошлом)", ["did"], "do the dishes = мыть посуду, в прошлом did."),
      I("It's ___ dark. Let's go home. (становится)", ["getting"], "get + прилагательное = становиться: It's getting dark."),
      O("Соберите: Он сказал мне, что устал.", ["He", "told", "me", "that", "he", "was", "tired"], "He told me that he was tired", "Есть «кому» (мне), поэтому told me."),
      O("Соберите: Мне нужно поговорить с тобой.", ["I", "need", "to", "talk", "to", "you"], "I need to talk to you", "Беседовать с кем-то: talk to."),
      O("Соберите: Я сделал ошибку.", ["I", "made", "a", "mistake"], "I made a mistake", "Ошибку не do, а make."),
      F("Исправьте: She said me the news.", ["She told me the news"], "Есть «кому», значит нужен tell: told me.")
    ]
  };

  P[39] = {
    steps: [
      S("Шаг 1. Вспомним два обычных «если бы»", "Про настоящее: If + Past, would + глагол (If I had money, I would buy it). Про прошлое: If + had + 3-я форма, would have + 3-я форма (If I had studied, I would have passed). В русском оба случая звучат одинаково, «если бы», а в английском время показывает, о каком моменте речь.", [["If I had more time, I would travel.", "Если бы у меня было больше времени, я бы путешествовал."], ["If I had left earlier, I would have caught the train.", "Если бы я вышел раньше, я бы успел на поезд."]]),
      S("Шаг 2. Смешанное условие: прошлое влияет на сейчас", "Причина в прошлом, а результат сейчас. Берём первую половину от прошлого (If + had + 3-я форма), а вторую от настоящего (would + глагол). Часто рядом стоит now. Бывает и наоборот: черта, которая есть всегда, повлияла на прошлое: If I spoke French, I would have understood him.", [["If I had studied harder, I would be at Harvard now.", "Если бы я лучше учился, я бы сейчас был в Гарварде."], ["If I hadn't eaten so much, I wouldn't feel sick now.", "Если бы я не съел так много, мне бы сейчас не было плохо."], ["If I spoke French, I would have understood him.", "Если бы я знал французский, я бы его понял (тогда)."]]),
      S("Шаг 3. wish + Past: жаль, что сейчас не так", "I wish = «жаль, что...», «хотел бы я...». Про настоящее глагол сдвигаем на шаг назад, в Past. Внимание: по-русски «жаль, что у меня НЕТ», а по-английски без not: I wish I had (= хотел бы иметь). С be часто ставят were для всех: I wish I were taller. Вместо can ставим could.", [["I wish I had more free time.", "Жаль, что у меня мало свободного времени."], ["I wish I were taller.", "Хотел бы я быть выше."], ["I wish I could swim.", "Жаль, что я не умею плавать."]]),
      S("Шаг 4. wish + Past Perfect: жаль, что тогда так вышло", "Про прошлое сдвигаем ещё дальше: wish + had + 3-я форма. Не путайте: I wish I knew (сейчас не знаю) и I wish I had known (тогда не знал).", [["I wish I had studied more.", "Жаль, что я мало учился."], ["I wish I hadn't said that.", "Зря я это сказал."]]),
      S("Шаг 5. wish + would: раздражает чужое поведение", "I wish you would + глагол = «ну хоть бы ты...», когда нас раздражает, что кто-то что-то делает или не делает. Про себя так не говорят: не «I wish I would», а I wish I could.", [["I wish you would stop talking.", "Хоть бы ты перестал болтать."], ["I wish it would stop raining.", "Скорее бы кончился дождь."]]),
      S("Шаг 6. If only = то же, что wish, но сильнее", "If only строится точно так же, как wish, только звучит эмоциональнее: «ах, если бы...».", [["If only I knew the answer!", "Если бы я только знал ответ!"], ["If only I had listened to you!", "Ах, если бы я тебя послушал!"]])
    ],
    tasks: [
      Ch("I wish I ___ the answer. (сейчас)", ["know", "knew", "had known"], 1, "Про сейчас: wish + Past."),
      Ch("I wish I ___ to the party last night.", ["went", "had gone", "would go"], 1, "Про прошлое (last night): wish + had + 3-я форма."),
      Ch("If I had taken that job, I ___ rich now.", ["would be", "would have been", "will be"], 0, "Причина в прошлом, результат сейчас (now): would + глагол."),
      Ch("I wish you ___ shouting at me!", ["would stop", "will stop", "stops"], 0, "Раздражает чужое поведение: wish + would."),
      I("I wish I ___ (can) speak French.", ["could"], "can сдвигаем в прошлое: could. I wish I could = жаль, что не могу."),
      I("If I hadn't missed the bus, I ___ (be) at school now.", ["would be"], "Прошлое повлияло на сейчас: would be."),
      O("Соберите: Жаль, что у меня нет собаки.", ["I", "wish", "I", "had", "a", "dog"], "I wish I had a dog", "Про сейчас: wish + Past, и без not."),
      O("Соберите: Если бы только я знал!", ["If", "only", "I", "knew"], "If only I knew", "If only строится как wish: + Past."),
      O("Соберите: Жаль, что я мало учился.", ["I", "wish", "I", "had", "studied", "more"], "I wish I had studied more", "Про прошлое: wish + had + 3-я форма."),
      F("Исправьте: I wish I have more money.", ["I wish I had more money"], "После wish про настоящее время сдвигается назад: had.")
    ]
  };

  P[40] = {
    steps: [
      S("Шаг 1. Модальный глагол + have + 3-я форма = про прошлое", "Should, could, might, must нельзя поставить в прошедшее время, как обычный глагол. Чтобы говорить о прошлом, добавляем have + 3-ю форму. Have здесь никогда не меняется на has или had.", [["You should have told me.", "Тебе надо было мне сказать."], ["She must have forgotten.", "Она, должно быть, забыла."]]),
      S("Шаг 2. should have: надо было (но не сделали)", "Сожаление или упрёк: правильно было бы сделать, но не сделали. Shouldn't have = не надо было, а сделали.", [["I should have gone to bed earlier.", "Надо было раньше лечь спать."], ["You shouldn't have eaten so much.", "Не надо было тебе столько есть."]]),
      S("Шаг 3. could have: мог бы (но не сделал)", "Возможность была, но её не использовали. Часто звучит как упрёк: You could have called!", [["You could have called me!", "Мог бы и позвонить!"], ["We could have won.", "Мы могли бы выиграть."]]),
      S("Шаг 4. might have / may have: возможно, сделал", "Мы не знаем точно и просто предполагаем. Might и may здесь почти одинаковы.", [["She might have missed the bus.", "Возможно, она опоздала на автобус."], ["He may have lost your number.", "Может быть, он потерял твой номер."]]),
      S("Шаг 5. must have и can't have: почти уверены", "Must have = «должно быть, наверняка», мы почти уверены, что это было. Can't have = «не может быть», мы уверены, что этого не было. Ошибка: в этом смысле не говорят «mustn't have», нужно can't have.", [["The streets are wet. It must have rained.", "Улицы мокрые. Наверное, был дождь."], ["She can't have seen it. She was at home.", "Она не могла это видеть. Она была дома."]]),
      S("Шаг 6. Не пишите of вместо have", "В быстрой речи should have сокращается до should've и звучит почти как «should of». Носители иногда так и пишут по ошибке, но это неправильно: всегда have.", [["I should've known. = I should have known.", "Мне следовало догадаться."]])
    ],
    tasks: [
      Ch("I failed the test. I ___ studied more.", ["should have", "must have", "can't have"], 0, "Надо было, но не сделал: should have."),
      Ch("The ground is wet. It ___ rained at night.", ["should have", "must have", "can't have"], 1, "Почти уверены, что был дождь: must have."),
      Ch("She ___ seen me. I was in another city.", ["must have", "might have", "can't have"], 2, "Точно не могла: can't have."),
      Ch("Why didn't you ask me? I ___ helped you!", ["could have", "must have", "can't have"], 0, "Мог бы, но не помог: could have."),
      I("He isn't here yet. He ___ missed the train. (возможно, два слова)", ["might have", "may have", "could have"], "Возможно, сделал: might have / may have."),
      I("I feel sick. I ___ eaten so much. (не надо было)", ["shouldn't have", "should not have"], "Не надо было, а сделал: shouldn't have."),
      O("Соберите: Тебе надо было мне сказать.", ["You", "should", "have", "told", "me"], "You should have told me", "should + have + 3-я форма."),
      O("Соберите: Она, должно быть, забыла.", ["She", "must", "have", "forgotten"], "She must have forgotten", "Почти уверены: must have + 3-я форма."),
      O("Соберите: Возможно, он потерял телефон.", ["He", "might", "have", "lost", "his", "phone"], "He might have lost his phone", "Возможно: might have + 3-я форма."),
      F("Исправьте: You should of called me.", ["You should have called me"], "Пишем have, а не of.")
    ]
  };

  P[41] = {
    steps: [
      S("Шаг 1. Делаю сам или мне делают?", "По-русски «Я подстригся» звучит так, будто вы стригли себя сами. В английском это различают: I cut my hair = сам; I had my hair cut = меня подстригли в парикмахерской.", [["I cut my hair.", "Я сам подстригся."], ["I had my hair cut.", "Я подстригся (в парикмахерской)."]]),
      S("Шаг 2. Формула: have + предмет + 3-я форма", "Порядок очень важен: сначала предмет, потом 3-я форма. Если переставить (I had cut my hair), получится Past Perfect, то есть «я сам подстриг».", [["I have my car washed every month.", "Мне моют машину каждый месяц."], ["She had her nails done.", "Она сделала маникюр."]]),
      S("Шаг 3. have меняется по временам", "Have здесь обычный глагол: had, will have, am having, have had. Вопрос и отрицание строим через do / does / did.", [["We are having our kitchen painted.", "Нам сейчас красят кухню."], ["Did you have your phone repaired?", "Ты отдавал телефон в ремонт?"], ["I'll have it delivered tomorrow.", "Мне это доставят завтра."]]),
      S("Шаг 4. get вместо have", "Get + предмет + 3-я форма значит то же самое, только звучит чуть разговорнее. В речи get встречается очень часто.", [["I'm going to get my phone repaired.", "Я отдам телефон в ремонт."], ["I need to get my hair cut.", "Мне надо подстричься."]]),
      S("Шаг 5. Когда с вами случилось что-то плохое", "Та же конструкция говорит о неприятностях, которые кто-то сделал с вашей вещью: He had his bike stolen = у него украли велосипед.", [["He had his bike stolen.", "У него украли велосипед."], ["She got her bag stolen on the bus.", "У неё в автобусе украли сумку."]])
    ],
    tasks: [
      Ch("Yesterday I ___ . (меня подстригли)", ["cut my hair", "had my hair cut", "had cut my hair"], 1, "Стригли в парикмахерской: had + my hair + cut."),
      Ch("We are ___ our house painted.", ["having", "have", "had"], 0, "Процесс идёт сейчас: are having."),
      Ch("Where do you usually get your car ___?", ["wash", "washing", "washed"], 2, "После предмета ставим 3-ю форму: washed."),
      Ch("He ___ his phone stolen last week.", ["had", "has", "have"], 0, "Прошлое (last week): had."),
      I("I ___ my car ___ (repair) yesterday. Впишите два слова через пробел.", ["had repaired", "got repaired"], "had + предмет + repaired."),
      I("Переведите: Мне надо подстричься.", ["I need to have my hair cut", "I need to get my hair cut", "I need a haircut", "I have to get my hair cut", "I have to have my hair cut", "I need to get a haircut", "I have to get a haircut"], "have / get my hair cut."),
      O("Соберите: Я отдам телефон в ремонт.", ["I'm", "going", "to", "get", "my", "phone", "repaired"], "I'm going to get my phone repaired", "get + предмет + 3-я форма."),
      O("Соберите: Она сделала маникюр.", ["She", "had", "her", "nails", "done"], "She had her nails done", "Маникюр делали ей: had + her nails + done."),
      O("Соберите: У него украли велосипед.", ["He", "had", "his", "bike", "stolen"], "He had his bike stolen", "Неприятность тоже через have + предмет + 3-я форма."),
      F("Исправьте: I had repaired my bike at the shop.", ["I had my bike repaired at the shop", "I got my bike repaired at the shop"], "Ремонтировал мастер, значит сначала предмет, потом 3-я форма: had my bike repaired.")
    ]
  };

  P[42] = {
    steps: [
      S("Шаг 1. «Говорят, что...»: It is said that", "По-русски «говорят» обходится без подлежащего. По-английски ставим безличное It is said that + обычное предложение. Так же работают It is believed / thought / known / expected that.", [["It is said that he is very rich.", "Говорят, он очень богат."], ["It is expected that prices will rise.", "Ожидается, что цены вырастут."]]),
      S("Шаг 2. Короче: He is said to be", "Человека можно вынести вперёд: He is said to + глагол. Смысл тот же. Ошибка: «He is said that he is rich», так нельзя. Либо It is said that he..., либо He is said to....", [["He is said to be very rich.", "Говорят, он очень богат."], ["She is believed to live in Paris.", "Считается, что она живёт в Париже."]]),
      S("Шаг 3. Если случилось раньше: to have + 3-я форма", "Говорят сейчас, а событие было в прошлом. Тогда после to ставим have + 3-ю форму.", [["He is thought to have left the country.", "Считается, что он уехал из страны."], ["She is said to have won a lot of money.", "Говорят, она выиграла кучу денег."]]),
      S("Шаг 4. Пассив после глаголов: being done и to be done", "Если после глагола обычно идёт -ing (hate, like, enjoy), пассив будет being + 3-я форма. Если идёт to (want, hope, expect), пассив будет to be + 3-я форма. По-русски это часто «когда меня...» или «чтобы меня...».", [["I hate being told what to do.", "Ненавижу, когда мне указывают, что делать."], ["She wants to be invited.", "Она хочет, чтобы её пригласили."], ["Nobody likes being laughed at.", "Никто не любит, когда над ним смеются."]]),
      S("Шаг 5. Пересказ: глаголы с to", "Вместо скучного said используйте точный глагол. После advise someone, refuse, promise, agree ставим to + глагол. Ошибка: «He suggested me to go». После suggest нужен -ing (He suggested going) или that (He suggested that I go).", [["He advised me to study more.", "Он посоветовал мне больше заниматься."], ["She refused to help.", "Она отказалась помочь."], ["She promised to call.", "Она пообещала позвонить."]]),
      S("Шаг 6. Пересказ: глаголы с -ing", "После suggest, admit (признаться), deny (отрицать) ставим глагол с -ing.", [["They suggested going to the cinema.", "Они предложили пойти в кино."], ["He admitted stealing the money.", "Он признался, что украл деньги."], ["He denied breaking the window.", "Он отрицал, что разбил окно."]])
    ],
    tasks: [
      Ch("People say he is a genius. → He is said ___ a genius.", ["being", "to be", "that he is"], 1, "He is said + to + глагол."),
      Ch("It ___ that the shop will close.", ["is believed", "believes", "is believing"], 0, "Безличный пассив: It is believed that."),
      Ch("I hate ___ what to do.", ["telling", "being told", "to tell"], 1, "Мне указывают (пассив), а после hate нужен -ing: being told."),
      Ch("He suggested ___ to the cinema.", ["going", "to go", "me to go"], 0, "После suggest глагол с -ing."),
      I("She refused ___ (help) me.", ["to help"], "refuse + to + глагол."),
      I("People think he left the country. → He is thought ___ the country. (три слова)", ["to have left"], "Событие в прошлом: to have + 3-я форма."),
      O("Соберите: Говорят, что она богата.", ["It", "is", "said", "that", "she", "is", "rich"], "It is said that she is rich", "It is said that + обычное предложение."),
      O("Соберите: Он посоветовал мне больше заниматься.", ["He", "advised", "me", "to", "study", "more"], "He advised me to study more", "advise + кого + to + глагол."),
      O("Соберите: Она хочет, чтобы её пригласили.", ["She", "wants", "to", "be", "invited"], "She wants to be invited", "Пассив после want: to be + 3-я форма."),
      F("Исправьте: He is said that he is rich.", ["He is said to be rich", "It is said that he is rich", "It is said he is rich"], "Либо It is said that he is..., либо He is said to be....")
    ]
  };

  P[43] = {
    steps: [
      S("Шаг 1. Что такое инверсия", "Обычно порядок такой: кто + глагол. Но если предложение начинается с «отрицательного» слова (never, rarely, not only, hardly, no sooner), порядок становится как в вопросе: вспомогательный глагол перед «кто». Это звучит сильнее и книжнее. В разговоре обычный порядок тоже правильный.", [["I have never seen such a thing. → Never have I seen such a thing.", "Никогда я такого не видел."], ["Never have I been so happy.", "Никогда я не был так счастлив."]]),
      S("Шаг 2. Какой вспомогательный глагол поставить", "Если в предложении есть have, is, can, will, выносим его вперёд. Если его нет (Present или Past Simple), добавляем do / does / did, а глагол ставим в обычную форму, как в вопросе.", [["Rarely does he complain.", "Он редко жалуется."], ["Never will I forget that day.", "Никогда не забуду тот день."], ["Rarely is he late.", "Он редко опаздывает."]]),
      S("Шаг 3. Not only... but also и Hardly... when", "Not only + инверсия, потом but also: Not only did he win, but he also... Hardly / No sooner значат «едва..., как»: Hardly had I arrived when..., No sooner had I arrived than.... Обратите внимание: после hardly идёт when, после no sooner идёт than.", [["Not only did he win, but he also broke the record.", "Он не только победил, но и побил рекорд."], ["Hardly had I arrived when it started to rain.", "Едва я приехал, как пошёл дождь."]]),
      S("Шаг 4. Причастный оборот с -ing вместо целого придаточного", "Вместо Because I felt tired или When I opened the door можно сказать короче: Feeling tired, ... Похоже на русское деепричастие («почувствовав», «открыв»). Главное: у обеих частей должен быть один и тот же «кто». Ошибка: «Walking home, the rain started», будто дождь шёл домой.", [["Feeling tired, I went to bed.", "Почувствовав усталость, я лёг спать."], ["Opening the door, she saw a cat.", "Открыв дверь, она увидела кошку."]]),
      S("Шаг 5. Having + 3-я форма: сначала одно, потом другое", "Having finished = «закончив», первое действие закончилось до второго. Подходит, когда важно показать порядок событий.", [["Having finished work, she went home.", "Закончив работу, она пошла домой."], ["Having lost the key, I couldn't get in.", "Потеряв ключ, я не мог войти."]]),
      S("Шаг 6. Причастие после существительного", "Вместо who is sitting или which was made можно поставить одно причастие: the man sitting there, the car made in Germany. Правило: -ing, если предмет сам делает; 3-я форма, если с ним что-то сделали.", [["The man sitting there is my boss.", "Мужчина, который сидит там, мой начальник."], ["Cars made in Germany are expensive.", "Машины, сделанные в Германии, дорогие."]])
    ],
    tasks: [
      Ch("Never ___ such a beautiful city.", ["I have seen", "have I seen", "I saw"], 1, "Never в начале: have + I + seen."),
      Ch("Rarely ___ late.", ["he is", "does he be", "is he"], 2, "Есть is, его и выносим вперёд."),
      Ch("Not only ___ the match, but he also broke the record.", ["he won", "did he win", "won he"], 1, "Past Simple: добавляем did, глагол в обычной форме."),
      Ch("The girl ___ next to me is my cousin.", ["sitting", "is sitting", "sits"], 0, "Сама сидит: причастие на -ing без is."),
      I("___ (finish) my homework, I went out. (закончив, два слова)", ["Having finished", "After finishing"], "Сначала одно, потом другое: Having + 3-я форма. Можно и After finishing."),
      I("The phone ___ (make) in China was cheap. (сделанный)", ["made"], "С телефоном сделали: 3-я форма made."),
      O("Соберите: Едва я пришёл домой, как зазвонил телефон.", ["Hardly", "had", "I", "got", "home", "when", "the", "phone", "rang"], "Hardly had I got home when the phone rang", "Hardly + had + I + 3-я форма, потом when."),
      O("Соберите: Почувствовав усталость, я лёг спать.", ["Feeling", "tired,", "I", "went", "to", "bed"], "Feeling tired, I went to bed", "Feeling tired = Because I felt tired, «кто» в обеих частях один: I."),
      O("Соберите: Никогда я не видел ничего подобного.", ["Never", "have", "I", "seen", "anything", "like", "this"], "Never have I seen anything like this", "После Never в начале have выходит перед I."),
      F("Исправьте: Never I have been so happy.", ["Never have I been so happy", "I have never been so happy"], "После Never в начале нужен порядок как в вопросе: have I.")
    ]
  };

  P[44] = {
    steps: [
      S("Шаг 1. Subjunctive: глагол «как в словаре» после «советую, требую, важно»", "После suggest, recommend, insist, demand + that, а также после It is important / essential that глагол ставится без -s, без to и без времени: he study, she be. Это особенно типично для американского и официального английского. В британском часто добавляют should: I suggest that he should study.", [["I suggest that he study more.", "Я предлагаю, чтобы он больше занимался."], ["It's important that she be on time.", "Важно, чтобы она пришла вовремя."], ["The doctor insisted that he stay in bed.", "Врач настоял, чтобы он лежал в постели."]]),
      S("Шаг 2. If I were you", "В «если бы» про настоящее для всех лиц можно ставить were, и в правильной письменной речи так и делают. If I were you = «на твоём месте».", [["If I were you, I'd apologise.", "На твоём месте я бы извинился."], ["If she were here, she would help.", "Если бы она была здесь, она бы помогла."]]),
      S("Шаг 3. It's time... и I'd rather...: прошедшее про настоящее", "После It's time и I'd rather + другой человек ставим Past, хотя говорим о сейчас. It's time we went = нам пора идти. I'd rather you stayed = я бы предпочёл, чтобы ты остался.", [["It's time we went home.", "Нам пора домой."], ["I'd rather you stayed.", "Я бы предпочёл, чтобы ты остался."]]),
      S("Шаг 4. the в особых случаях", "the + прилагательное = все такие люди: the rich (богатые), the poor, the young. Также с the: десятилетия (the 1990s), океаны и реки (the Atlantic, the Volga), горные цепи (the Alps), страны во множественном числе или со словами «штаты, королевство» (the Netherlands, the USA, the UK).", [["The rich should pay more taxes.", "Богатые должны платить больше налогов."], ["My parents grew up in the 1990s.", "Мои родители выросли в 1990-е."], ["We flew over the Atlantic.", "Мы пролетели над Атлантикой."]]),
      S("Шаг 5. Без артикля: озёра, вершины, by email, in hospital", "Одно озеро или одна гора с названием идут без артикля: Lake Baikal, Mount Everest. Без артикля и устойчивые выражения: by email, by bus, go to prison, in hospital (брит.: «лежит в больнице»). Если идём в здание не по его назначению, артикль нужен: go to the hospital to visit a friend.", [["Lake Baikal is very deep.", "Байкал очень глубокий."], ["I'll send it by email.", "Я пришлю это по электронной почте."], ["My grandma is in hospital.", "Бабушка лежит в больнице."]]),
      S("Шаг 6. a / an перед профессией", "В русском «Она экономист», без всего. В английском перед профессией обязательно a / an. Русские часто его забывают.", [["She is an economist.", "Она экономист."], ["I want to be a lawyer.", "Я хочу стать юристом."]])
    ],
    tasks: [
      Ch("I recommend that he ___ a doctor.", ["seeing", "see", "to see"], 1, "После recommend that глагол «как в словаре», без -s и без to: see."),
      Ch("It's important that she ___ on time.", ["is being", "be", "to be"], 1, "It's important that + глагол «как в словаре»: be."),
      Ch("It's time we ___ home.", ["go", "went", "going"], 1, "После It's time ставим Past: went."),
      Ch("___ rich don't always live happily.", ["The", "A", "-"], 0, "the + прилагательное = все богатые люди."),
      I("If I ___ (be) you, I would say sorry.", ["were"], "If I were you: were для всех лиц."),
      I("Переведите: Она экономист.", ["She is an economist", "She's an economist"], "Перед профессией a / an, перед гласным звуком an."),
      O("Соберите: Я бы предпочёл, чтобы ты остался.", ["I'd", "rather", "you", "stayed"], "I'd rather you stayed", "I'd rather + другой человек + Past."),
      O("Соберите: Мои родители выросли в 1990-е.", ["My", "parents", "grew", "up", "in", "the", "1990s"], "My parents grew up in the 1990s", "Десятилетия с the: the 1990s."),
      O("Соберите: Врач настоял, чтобы он остался дома.", ["The", "doctor", "insisted", "that", "he", "stay", "at", "home"], "The doctor insisted that he stay at home", "insist that + глагол без -s: stay."),
      F("Исправьте: I want to see the Lake Baikal.", ["I want to see Lake Baikal", "I want to see Baikal"], "Lake + название идёт без артикля.")
    ]
  };

  P[45] = {
    steps: [
      S("Шаг 1. Cleft sentences: выделяем главное", "По-русски главное выделяем интонацией или словом «именно». По-английски перестраиваем предложение: What I need is time. It was Tom who called.", [["What I need is time.", "Что мне нужно, так это время."], ["It was Tom who called, not Mike.", "Звонил именно Том, а не Майк."], ["What annoys me is his attitude.", "Меня раздражает именно его отношение."]]),
      S("Шаг 2. Усиление: do / did и very", "В утвердительном предложении do / does / did перед глаголом значит «правда, действительно, всё-таки». Глагол после них в обычной форме. Very перед существительным значит «тот самый, самый»: the very first time.", [["I do like your new haircut!", "Мне правда нравится твоя новая стрижка!"], ["She did call, but you were out.", "Она же звонила, но тебя не было."], ["This is the very first time I've been here.", "Я здесь в самый первый раз."]]),
      S("Шаг 3. Ellipsis: не повторяем лишнее", "В ответах повтор опускаем, но оставляем «хвостик»: to, вспомогательный глагол или модальный. По-русски можно сказать просто «Хотелось бы», а по-английски нужно I'd like to, без to нельзя.", [["- Are you coming? - I'd like to.", "- Ты идёшь? - Хотелось бы."], ["She can swim, but I can't.", "Она умеет плавать, а я нет."]]),
      S("Шаг 4. Академический стиль: nominalisation и hedging", "В научных текстах глагол часто превращают в существительное: Prices increased → The increase in prices... И говорят осторожно, без 100%: It seems that..., This may suggest..., To some extent..., It could be argued that....", [["The increase in prices led to protests.", "Рост цен привёл к протестам."], ["This may suggest that the method works.", "Это может говорить о том, что метод работает."], ["To some extent, he is right.", "В какой-то мере он прав."]]),
      S("Шаг 5. Сложные связки", "Given that = учитывая, что; whereas = тогда как; consequently = следовательно; notwithstanding = несмотря на; insofar as = в той мере, в какой. Они делают текст связным и взрослым.", [["Given that it's late, we should go.", "Учитывая, что уже поздно, нам пора идти."], ["Some students love maths, whereas others hate it.", "Одни ученики любят математику, тогда как другие её ненавидят."], ["He didn't study. Consequently, he failed.", "Он не занимался. Как следствие, он провалил экзамен."]]),
      S("Шаг 6. Книжная инверсия и предлог перед which / whom", "Should you need = If you need, Had I known = If I had known: if убираем, а глагол ставим вперёд. В официальном стиле предлог ставят перед which / whom: the person to whom I spoke. В разговоре проще: the person I spoke to.", [["Should you need help, call me.", "Если понадобится помощь, звоните."], ["Had I known, I would have come.", "Если бы я знал, я бы пришёл."], ["The person to whom I spoke was very polite.", "Человек, с которым я говорил, был очень вежлив."]])
    ],
    tasks: [
      Ch("___ I need is a good rest.", ["That", "What", "Which"], 1, "Cleft sentence: What I need is..."),
      Ch("It was my sister ___ broke the vase.", ["who", "what", "whom"], 0, "It was + человек + who."),
      Ch("___ you need any help, please call me.", ["Should", "Would", "Had"], 0, "Should you need = If you need."),
      Ch("Some people love winter, ___ others hate it.", ["whereas", "consequently", "given that"], 0, "Противопоставление: whereas = тогда как."),
      I("___ I known, I would have come. (одно слово)", ["Had"], "Had I known = If I had known."),
      I("Prices increased. → The ___ in prices was huge. (существительное)", ["increase", "rise"], "Nominalisation: глагол increase → существительное the increase."),
      O("Соберите: Что мне нужно, так это время.", ["What", "I", "need", "is", "time"], "What I need is time", "Cleft: What + кто + глагол + is + главное."),
      O("Соберите: Мне правда нравится этот фильм.", ["I", "do", "like", "this", "film"], "I do like this film", "do перед глаголом усиливает: правда нравится."),
      O("Соберите: Звонил именно Том.", ["It", "was", "Tom", "who", "called"], "It was Tom who called", "It was + главное + who + остальное."),
      F("Исправьте: She did called me yesterday.", ["She did call me yesterday"], "После did глагол в обычной форме: did call.")
    ]
  };

  const T = (window.TRAINER = window.TRAINER || {});

  T[37] = [
    ["Это невозможно.", "It is impossible|It's impossible|This is impossible|That is impossible", "im- + possible"],
    ["Я не согласен.", "I disagree|I do not agree|I don't agree", "dis- + agree"],
    ["Извини, я тебя неправильно понял.", "Sorry, I misunderstood you|I'm sorry, I misunderstood you|I am sorry, I misunderstood you|Sorry, I misunderstood", "mis- = неправильно"],
    ["Я сегодня проспал.", "I overslept today|Today I overslept|I overslept this morning","over- = слишком"],
    ["Моя сестра хочет стать экономистом.", "My sister wants to be an economist|My sister wants to become an economist", "econom + ist"],
    ["Этот телефон бесполезен.", "This phone is useless", "-less = без"],
    ["Это приложение очень полезное.", "This app is very useful|This app is really useful|This application is very useful|This is a very useful app|It is a very useful app", "-ful = с"],
    ["Говори медленно, пожалуйста.", "Speak slowly, please|Please speak slowly|Please talk slowly|Talk slowly, please", "slow + ly"],
    ["Образование очень важно.", "Education is very important", "-tion"],
    ["Деньги не приносят счастья.", "Money does not bring happiness|Money doesn't bring happiness|Money can't buy happiness|Money cannot buy happiness", "-ness"],
    ["Он недооценил проблему.", "He underestimated the problem", "under- = недо-"],
    ["Мне нужно переделать домашнее задание.", "I need to redo my homework|I have to redo my homework|I need to do my homework again|I have to do my homework again", "re- = снова"]
  ];

  T[38] = [
    ["Скажи мне правду.", "Tell me the truth", "tell + кому"],
    ["Он сказал «привет».", "He said hello|He said hi", "say + слова"],
    ["Ты говоришь по-английски?", "Do you speak English|Can you speak English", "язык: speak"],
    ["Нам нужно поговорить.", "We need to talk|We have to talk", "talk = беседовать"],
    ["Я делаю домашнее задание.", "I'm doing my homework|I am doing my homework|I do my homework", "do homework"],
    ["Не бойся делать ошибки.", "Don't be afraid to make mistakes|Do not be afraid to make mistakes|Don't be afraid of making mistakes|Do not be afraid of making mistakes", "make a mistake"],
    ["Я сфотографировал закат.", "I took a photo of the sunset|I took a picture of the sunset|I took a photograph of the sunset", "take a photo"],
    ["Я быстро устаю.", "I get tired quickly|I get tired fast|I quickly get tired", "get + прилагательное"],
    ["Во сколько ты вернулся домой?", "What time did you get home|When did you get home|What time did you come home|When did you come home|What time did you get back home|When did you get back home", "get home"],
    ["Он заработал много денег.", "He made a lot of money|He made lots of money|He earned a lot of money|He earned lots of money", "make money"],
    ["Она рассказала смешной анекдот.", "She told a funny joke", "tell a joke"],
    ["Я принимаю душ каждое утро.", "I take a shower every morning|I have a shower every morning", "take a shower"]
  ];

  T[39] = [
    ["Жаль, что я не умею плавать.", "I wish I could swim|If only I could swim", "wish + could"],
    ["Жаль, что у меня нет машины.", "I wish I had a car|If only I had a car", "wish + Past"],
    ["Хотел бы я быть выше.", "I wish I were taller|I wish I was taller|If only I were taller|If only I was taller", "wish + were"],
    ["Жаль, что я не пошёл на вечеринку.", "I wish I had gone to the party|If only I had gone to the party", "wish + had + 3-я ф."],
    ["Зря я это сказал.", "I wish I had not said that|I wish I hadn't said that|If only I had not said that|If only I hadn't said that|I should not have said that|I shouldn't have said that|I wish I had not said it|I wish I hadn't said it", "wish + had not"],
    ["Скорее бы кончился дождь.", "I wish it would stop raining|If only it would stop raining", "wish + would"],
    ["Хоть бы ты наконец меня послушал!","I wish you would listen to me|If only you would listen to me", "wish + would"],
    ["Жаль, что я не знаю его номер.", "I wish I knew his number|I wish I knew his phone number|If only I knew his number|If only I knew his phone number", "wish + knew"],
    ["Ах, если бы я тебя послушал!", "If only I had listened to you|I wish I had listened to you", "If only + had"],
    ["Если бы я лучше учился, я бы сейчас был в хорошем университете.", "If I had studied harder, I would be at a good university now|If I had studied harder, I would be in a good university now|If I had studied better, I would be at a good university now|If I had studied better, I would be in a good university now|If I had studied harder, I would now be at a good university|If I had studied harder, I would now be in a good university|Had I studied harder, I would be at a good university now|Had I studied harder, I would be in a good university now", "прошлое → сейчас"],
    ["Если бы я не потерял ключи, я бы сейчас был дома.", "If I had not lost my keys, I would be at home now|If I hadn't lost my keys, I would be at home now|If I had not lost my keys, I would be home now|If I hadn't lost my keys, I would be home now|If I had not lost the keys, I would be at home now|If I had not lost the keys, I would be home now|If I had not lost my keys, I would now be at home|If I had not lost my keys, I would now be home|Had I not lost my keys, I would be at home now|Had I not lost my keys, I would be home now", "had not + would be"],
    ["Если бы я вчера не лёг так поздно, я бы сейчас не был таким уставшим.", "If I had not gone to bed so late yesterday, I would not be so tired now|If I hadn't gone to bed so late yesterday, I wouldn't be so tired now|If I had not gone to bed so late last night, I would not be so tired now|If I hadn't gone to bed so late last night, I wouldn't be so tired now|If I had not gone to bed so late yesterday, I would not be this tired now|If I had not gone to bed so late last night, I would not be this tired now|Had I not gone to bed so late yesterday, I would not be so tired now|Had I not gone to bed so late last night, I would not be so tired now", "прошлое → сейчас"]
  ];

  T[40] = [
    ["Тебе надо было мне сказать.", "You should have told me", "should have"],
    ["Мне не надо было столько есть.", "I shouldn't have eaten so much|I should not have eaten so much", "shouldn't have"],
    ["Ты мог бы позвонить!", "You could have called|You could have called me|You could have phoned|You could have phoned me", "could have"],
    ["Она, должно быть, забыла.", "She must have forgotten|She must have forgotten it|She must have forgotten about it", "must have"],
    ["Возможно, он опоздал на автобус.", "He might have missed the bus|He may have missed the bus|He could have missed the bus", "might have"],
    ["Он не мог это сказать.", "He can't have said that|He cannot have said that|He couldn't have said that|He could not have said that|He can't have said it|He cannot have said it|He couldn't have said it|He could not have said it", "can't have"],
    ["Мне надо было раньше лечь спать.", "I should have gone to bed earlier", "should have"],
    ["Мы могли бы выиграть тот матч.", "We could have won that match|We could have won that game|We could have won the match|We could have won the game", "could have"],
    ["Наверное, был дождь.", "It must have rained|It must have been raining", "must have"],
    ["Может быть, она потеряла твой номер.", "She might have lost your number|She may have lost your number|She could have lost your number", "may have"],
    ["Тебе не надо было ему говорить.", "You shouldn't have told him|You should not have told him", "shouldn't have"],
    ["Ты, должно быть, оставил ключи в школе.", "You must have left your keys at school|You must have left the keys at school|You must have left your keys in school|You must have left the keys in school", "must have"]
  ];

  T[41] = [
    ["Я вчера подстригся (в парикмахерской).", "I had my hair cut yesterday|I got my hair cut yesterday|Yesterday I had my hair cut|Yesterday I got my hair cut|I had a haircut yesterday|I got a haircut yesterday", "had my hair cut"],
    ["Мне нужно отдать телефон в ремонт.", "I need to have my phone repaired|I need to get my phone repaired|I need to have my phone fixed|I need to get my phone fixed|I have to get my phone repaired|I have to have my phone repaired|I have to get my phone fixed", "get + phone + repaired"],
    ["Нам сейчас красят кухню.", "We are having our kitchen painted|We're having our kitchen painted|We are getting our kitchen painted|We're getting our kitchen painted|We are having our kitchen painted now|We are getting our kitchen painted now", "are having ... painted"],
    ["Где ты стрижёшься?", "Where do you have your hair cut|Where do you get your hair cut|Where do you get a haircut|Where do you have a haircut", "do you get ... cut"],
    ["У неё украли сумку.", "She had her bag stolen|She got her bag stolen|Her bag was stolen|Someone stole her bag", "had ... stolen"],
    ["Мне помыли машину.", "I had my car washed|I got my car washed|I have had my car washed|I've had my car washed", "had ... washed"],
    ["Ты отдавал ноутбук в ремонт?", "Did you have your laptop repaired|Did you get your laptop repaired|Did you have your laptop fixed|Did you get your laptop fixed|Have you had your laptop repaired|Have you had your laptop fixed", "Did you get ... repaired"],
    ["Давай закажем пиццу с доставкой.", "Let's have a pizza delivered|Let's get a pizza delivered|Let's have pizza delivered|Let's get pizza delivered|Let us have a pizza delivered|Let us get a pizza delivered|Let us have pizza delivered|Let us get pizza delivered|Let's order a pizza|Let's order pizza|Let us order a pizza|Let us order pizza", "have ... delivered"],
    ["Мне проверили зрение.", "I had my eyes tested|I got my eyes tested|I had my eyes checked|I got my eyes checked|I had my eyesight tested|I had my eyesight checked|I got my eyesight tested|I got my eyesight checked","had ... tested"],
    ["Я хочу проколоть уши (в салоне).", "I want to have my ears pierced|I want to get my ears pierced", "get ... pierced"],
    ["Ему починили часы.", "He had his watch repaired|He got his watch repaired|He had his watch fixed|He got his watch fixed", "had ... repaired"],
    ["Тебе стоит подстричься.", "You should have your hair cut|You should get your hair cut|You should get a haircut|You should have a haircut", "should get ... cut"]
  ];

  T[42] = [
    ["Говорят, он очень богат.", "He is said to be very rich|It is said that he is very rich|It is said he is very rich|People say that he is very rich|People say he is very rich|They say that he is very rich|They say he is very rich", "is said to be"],
    ["Считается, что она живёт в Лондоне.", "She is believed to live in London|She is thought to live in London|It is believed that she lives in London|It is thought that she lives in London|It is believed she lives in London|It is thought she lives in London", "is believed to"],
    ["Ожидается, что завтра будет дождь.", "It is expected to rain tomorrow|It is expected that it will rain tomorrow|It is expected that there will be rain tomorrow|Rain is expected tomorrow", "It is expected"],
    ["Говорят, он уехал из страны.", "He is said to have left the country|It is said that he left the country|It is said that he has left the country|It is said he left the country|It is said he has left the country|People say that he left the country|People say he left the country|People say he has left the country|They say he left the country|They say he has left the country", "to have left"],
    ["Я ненавижу, когда мне указывают, что делать.", "I hate being told what to do|I hate to be told what to do", "being told"],
    ["Она хочет, чтобы её пригласили.", "She wants to be invited", "to be invited"],
    ["Он посоветовал мне больше заниматься.", "He advised me to study more|He advised me to study harder", "advise + to"],
    ["Она отказалась помочь.", "She refused to help|She refused to help me|She refused to help us", "refuse + to"],
    ["Он предложил пойти в кино.", "He suggested going to the cinema|He suggested going to the movies|He suggested that we go to the cinema|He suggested that we go to the movies|He suggested we go to the cinema|He suggested we go to the movies|He suggested that we should go to the cinema|He suggested we should go to the cinema|He suggested that we should go to the movies", "suggest + -ing"],
    ["Он признался, что разбил окно.", "He admitted breaking the window|He admitted to breaking the window|He admitted having broken the window|He admitted that he broke the window|He admitted he broke the window|He admitted that he had broken the window|He admitted he had broken the window", "admit + -ing"],
    ["Она пообещала позвонить.", "She promised to call|She promised to call me|She promised to phone|She promised to phone me|She promised to ring|She promised to call us", "promise + to"],
    ["Никто не любит, когда над ним смеются.", "Nobody likes being laughed at|No one likes being laughed at|Nobody likes to be laughed at|No one likes to be laughed at", "being laughed at"]
  ];

  T[43] = [
    ["Никогда я не видел такого красивого города.", "Never have I seen such a beautiful city|Never have I seen a more beautiful city|Never have I seen a city so beautiful|I have never seen such a beautiful city|I have never seen a more beautiful city", "Never have I"],
    ["Он не только победил, но и побил рекорд.", "Not only did he win, but he also broke the record|Not only did he win, he also broke the record|Not only did he win, but he broke the record too|He not only won, but also broke the record|He not only won, but he also broke the record", "Not only did he"],
    ["Едва я приехал, как пошёл дождь.", "Hardly had I arrived when it started to rain|Hardly had I arrived when it started raining|Hardly had I arrived when it began to rain|Hardly had I arrived when it began raining|No sooner had I arrived than it started to rain|No sooner had I arrived than it started raining|No sooner had I arrived than it began to rain|No sooner had I arrived than it began raining|Scarcely had I arrived when it started to rain|Scarcely had I arrived when it began to rain|I had hardly arrived when it started to rain|I had hardly arrived when it started raining|I had hardly arrived when it began to rain", "Hardly had I"],
    ["Я никогда этого не забуду.", "Never will I forget this|Never will I forget it|Never will I forget that|I will never forget this|I will never forget it|I will never forget that", "Never will I"],
    ["Он редко опаздывает.", "Rarely is he late|Seldom is he late|He is rarely late|He is seldom late", "Rarely is he"],
    ["Почувствовав усталость, я лёг спать.", "Feeling tired, I went to bed|Because I felt tired, I went to bed|As I felt tired, I went to bed|I felt tired, so I went to bed", "Feeling tired"],
    ["Закончив работу, она пошла домой.", "Having finished work, she went home|Having finished her work, she went home|After finishing work, she went home|After finishing her work, she went home|After she had finished work, she went home|After she had finished her work, she went home|After she finished work, she went home|After she finished her work, she went home", "Having finished"],
    ["Мужчина, который сидит там, мой начальник.", "The man sitting there is my boss|The man sitting over there is my boss|The man who is sitting there is my boss|The man who is sitting over there is my boss|The man that is sitting there is my boss", "The man sitting"],
    ["Машины, сделанные в Германии, дорогие.", "Cars made in Germany are expensive|The cars made in Germany are expensive|Cars which are made in Germany are expensive|Cars that are made in Germany are expensive", "made in"],
    ["Открыв дверь, она увидела кошку.", "Opening the door, she saw a cat|Opening the door, she saw the cat|Having opened the door, she saw a cat|Having opened the door, she saw the cat|When she opened the door, she saw a cat|When she opened the door, she saw the cat", "Opening the door"],
    ["Потеряв ключи, я не мог войти.", "Having lost my keys, I could not get in|Having lost my keys, I couldn't get in|Having lost the keys, I could not get in|Having lost my keys, I could not get inside|Having lost the keys, I could not get inside|Having lost my keys, I was not able to get in|Because I had lost my keys, I could not get in|As I had lost my keys, I could not get in", "Having lost"],
    ["Девушка, которая говорит по телефону, моя сестра.", "The girl talking on the phone is my sister|The girl speaking on the phone is my sister|The girl who is talking on the phone is my sister|The girl who is speaking on the phone is my sister|The girl that is talking on the phone is my sister", "The girl talking"]
  ];

  T[44] = [
    ["Я предлагаю, чтобы он больше занимался.", "I suggest that he study more|I suggest he study more|I suggest that he should study more|I suggest he should study more|I suggest that he studies more|I suggest he studies more", "suggest that he study"],
    ["Важно, чтобы ты пришёл вовремя.", "It is important that you be on time|It is important that you are on time|It is important that you should be on time|It is important that you come on time|It is important that you arrive on time|It is important for you to be on time|It is important for you to come on time", "important that + be"],
    ["На твоём месте я бы извинился.", "If I were you, I would apologise|If I were you, I would apologize|If I were you, I would say sorry|I would apologise if I were you|I would apologize if I were you|If I was you, I would apologise|If I was you, I would apologize", "If I were you"],
    ["Нам пора домой.", "It is time we went home|It is time for us to go home|It is time to go home", "It's time + Past"],
    ["Я бы предпочёл, чтобы ты остался.", "I would rather you stayed|I would rather you stay|I would prefer you to stay|I would prefer it if you stayed|I would prefer that you stay|I would prefer that you stayed", "I'd rather + Past"],
    ["Врач настоял, чтобы он лежал в постели.", "The doctor insisted that he stay in bed|The doctor insisted he stay in bed|The doctor insisted that he should stay in bed|The doctor insisted he should stay in bed|The doctor insisted that he stayed in bed|The doctor insisted on him staying in bed|The doctor insisted on his staying in bed", "insisted that he stay"],
    ["Богатые не всегда счастливы.", "The rich are not always happy|The rich aren't always happy|Rich people are not always happy|Rich people aren't always happy", "the rich"],
    ["Мои родители выросли в 1990-х.", "My parents grew up in the 1990s|My parents grew up in the 1990's|My parents grew up in the nineties|My parents grew up in the 90s|My parents grew up in the 90's", "the 1990s"],
    ["Он хочет увидеть Байкал.", "He wants to see Lake Baikal|He wants to see Baikal", "Lake без the"],
    ["Мы ездили в Альпы.", "We went to the Alps|We have been to the Alps|We travelled to the Alps|We traveled to the Alps", "the Alps"],
    ["Я отправлю это по электронной почте.", "I will send it by email|I'll send it by email|I will send it by e-mail|I will send this by email|I will email it|I will email it to you|I will send it to you by email|I will send it to you by e-mail", "by email"],
    ["Моя сестра экономист.", "My sister is an economist", "an + профессия"]
  ];

  T[45] = [
    ["Что мне нужно, так это отдых.", "What I need is a rest|What I need is rest|What I need is a break", "What I need is"],
    ["Звонил именно Том.", "It was Tom who called|It was Tom that called|It was Tom who phoned|It was Tom that phoned", "It was ... who"],
    ["Мне правда нравится твоя идея!", "I do like your idea|I really do like your idea|I really like your idea", "do + глагол"],
    ["Она же звонила тебе!", "She did call you|She did phone you", "did + глагол"],
    ["Хотелось бы (в ответ на «Ты пойдёшь?»).", "I would like to|I'd like to|I would love to|I'd love to", "не забудьте to"],
    ["Если вам понадобится помощь, позвоните мне.", "Should you need help, call me|Should you need any help, call me|Should you need help, please call me|Should you need any help, please call me|If you need help, call me|If you need any help, call me|If you need help, please call me|If you need any help, please call me", "Should you need"],
    ["Если бы я знал, я бы пришёл.", "Had I known, I would have come|If I had known, I would have come", "Had I known"],
    ["Учитывая, что уже поздно, нам пора идти.", "Given that it is late, we should go|Given that it is late, we should leave|Given that it is already late, we should go|Given that it is already late, we should leave|Given that it is late, it is time to go|Given that it is already late, it is time to go|Given that it is late, we must go|Given that it is late, we have to go|Given that it is late, it is time for us to go", "Given that"],
    ["Рост цен удивил всех.", "The increase in prices surprised everyone|The increase in prices surprised everybody|The rise in prices surprised everyone|The rise in prices surprised everybody|The price increase surprised everyone|The price rise surprised everyone", "The increase in"],
    ["Похоже, что он прав.", "It seems that he is right|It seems he is right|He seems to be right|It appears that he is right|It appears he is right|It looks like he is right", "It seems that"],
    ["Человек, с которым я говорил, был очень вежлив.", "The person to whom I spoke was very polite|The person I spoke to was very polite|The person whom I spoke to was very polite|The person who I spoke to was very polite|The person that I spoke to was very polite|The person I talked to was very polite|The person to whom I talked was very polite|The person with whom I spoke was very polite|The person I spoke with was very polite", "to whom"],
    ["Одни любят зиму, тогда как другие её ненавидят.", "Some people love winter, whereas others hate it|Some love winter, whereas others hate it|Some people love winter, while others hate it|Some love winter, while others hate it", "whereas"]
  ];
})();
