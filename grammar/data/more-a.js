/* Новые темы A2: 46-53 */
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

  /* ---------- 46. Наречия частотности ---------- */
  add(46, "A2", "Наречия частотности: always, usually, never", `<p>Слова «как часто» отвечают на вопрос <b>How often?</b> и стоят в строго определённом месте.</p>
<div class="formula">кто → always / usually / often / sometimes / never → глагол<br>кто → am / is / are → always / usually / never</div>
<table class="t"><tr><th>Слово</th><th>Перевод</th><th>Как часто</th></tr>
<tr><td><b>always</b></td><td>всегда</td><td>100%</td></tr>
<tr><td><b>usually</b></td><td>обычно</td><td>90%</td></tr>
<tr><td><b>often</b></td><td>часто</td><td>70%</td></tr>
<tr><td><b>sometimes</b></td><td>иногда</td><td>50%</td></tr>
<tr><td><b>rarely</b> / <b>seldom</b></td><td>редко</td><td>10%</td></tr>
<tr><td><b>never</b></td><td>никогда</td><td>0%</td></tr></table>
<p><i>I <b>usually</b> get up at 7.</i> - Я обычно встаю в 7.<br>
<i>She <b>is always</b> late.</i> - Она всегда опаздывает. (с to be: после is)<br>
<i>Do you <b>often</b> go to the cinema?</i> - Ты часто ходишь в кино?<br>
<i><b>Sometimes</b> we play chess.</i> - Иногда мы играем в шахматы. (sometimes можно в начало)</p>
<p><b>Never</b> уже значит «не»: <i>I <b>never</b> eat fish.</i> Второе not не нужно.</p>
<div class="err">❌ I go always to school by bus. → ✅ I always go to school by bus.<br>❌ She always is late. → ✅ She is always late.<br>❌ I don't never eat meat. → ✅ I never eat meat.</div>`);

  P[46] = {
    steps: [
      S("Шаг 1. Шкала от always до never", "Эти слова показывают, как часто что-то бывает: always (всегда), usually (обычно), often (часто), sometimes (иногда), rarely (редко), never (никогда).", [["I always do my homework.", "Я всегда делаю домашнее задание."], ["We sometimes eat pizza.", "Мы иногда едим пиццу."]]),
      S("Шаг 2. Место: перед главным глаголом", "Как в русском «я всегда хожу»: слово частоты стоит между «кто» и глаголом. После глагола его ставить нельзя: не «I go always».", [["I usually walk to school.", "Я обычно хожу в школу пешком."], ["He often plays tennis.", "Он часто играет в теннис."]]),
      S("Шаг 3. С to be: после am / is / are", "Если глагола действия нет, а есть am, is, are, слово частоты встаёт после них. Это главное отличие от русского.", [["She is always late.", "Она всегда опаздывает."], ["We are usually at home on Sundays.", "По воскресеньям мы обычно дома."]]),
      S("Шаг 4. Never: одно отрицание", "По-русски «никогда не ем» с двумя «не». По-английски never уже отрицание, поэтому don't не добавляем, а глагол стоит в обычной форме.", [["I never drink coffee.", "Я никогда не пью кофе."], ["He never gets up early.", "Он никогда не встаёт рано."]]),
      S("Шаг 5. Вопрос и отрицание", "В вопросе слово частоты идёт после «кто»: Do you often ...? В отрицании после don't / doesn't. Спросить «как часто» можно через How often ...?", [["Do you often watch TV?", "Ты часто смотришь телевизор?"], ["I don't usually eat meat.", "Я обычно не ем мясо."], ["How often do you play football? - Twice a week.", "Как часто ты играешь в футбол? - Два раза в неделю."]]),
      S("Шаг 6. Sometimes и usually можно в начало", "Sometimes и usually иногда ставят в самое начало, чтобы выделить. Always и never туда не ставим.", [["Sometimes I go to bed very late.", "Иногда я ложусь спать очень поздно."], ["Usually we have dinner at 7.", "Обычно мы ужинаем в 7."]])
    ],
    tasks: [
      O("Соберите: Я обычно встаю в 7.", ["I", "usually", "get up", "at 7"], "I usually get up at 7", "Кто + usually + глагол."),
      O("Соберите: Она всегда опаздывает.", ["She", "is", "always", "late"], "She is always late", "С to be слово частоты идёт после is."),
      O("Соберите: Как часто ты ходишь в кино?", ["How often", "do", "you", "go", "to the cinema"], "How often do you go to the cinema", "How often + do + you + глагол."),
      Ch("He ___ breakfast.", ["eats never", "never eats", "never eat"], 1, "Never перед глаголом, а he требует -s: never eats."),
      Ch("My dad ___ tired after work.", ["often is", "is often", "does often"], 1, "С to be: is + often."),
      Ch("Где правильно?", ["I don't never watch TV.", "I never watch TV.", "I watch never TV."], 1, "Never уже отрицание, don't не нужен."),
      I("We ___ go to the park on Sundays. (обычно)", ["usually"], "Обычно = usually, перед глаголом go."),
      I("Переведите: Я никогда не ем рыбу.", ["I never eat fish"], "Never + eat, без don't."),
      F("Исправьте: She goes always to school by bus.", ["She always goes to school by bus"], "Always ставим перед глаголом, а не после."),
      F("Исправьте: They always are happy.", ["They are always happy"], "С to be слово частоты после are.")
    ]
  };

  T[46] = [
    ["Я всегда завтракаю.", "I always have breakfast|I always eat breakfast", "always перед глаголом"],
    ["Она обычно ходит в школу пешком.", "She usually walks to school|She usually goes to school on foot", "usually + walks"],
    ["Он часто играет в компьютерные игры.", "He often plays computer games|He often plays video games", "often + plays"],
    ["Иногда мы смотрим фильмы.", "Sometimes we watch films|Sometimes we watch movies|We sometimes watch films|We sometimes watch movies|We watch films sometimes|We watch movies sometimes", "sometimes можно в начало"],
    ["Я никогда не пью кофе.", "I never drink coffee", "never без don't"],
    ["Мой брат всегда опаздывает.", "My brother is always late", "is + always"],
    ["Вечером мы обычно дома.", "We are usually at home in the evening|We are usually at home in the evenings|In the evening we are usually at home|In the evenings we are usually at home|We are usually home in the evening|We are usually home in the evenings", "are + usually"],
    ["Ты часто ходишь в кино?", "Do you often go to the cinema|Do you often go to the movies", "Do you often"],
    ["Как часто ты читаешь книги?", "How often do you read books", "How often"],
    ["Она редко мне звонит.", "She rarely calls me|She seldom calls me|She rarely phones me|She seldom phones me", "rarely перед глаголом"],
    ["Я обычно не ем мясо.", "I don't usually eat meat|I usually don't eat meat", "don't usually"],
    ["Он никогда не устаёт.", "He is never tired|He never gets tired", "is + never или never + gets"]
  ];

  /* ---------- 47. Прилагательное или наречие ---------- */
  add(47, "A2", "Прилагательное или наречие: quick / quickly, good / well", `<p>По-русски «быстрый» и «быстро» звучат по-разному. По-английски тоже: <b>прилагательное</b> отвечает «какой?», <b>наречие</b> отвечает «как?».</p>
<div class="formula">какой? прилагательное + существительное: a quick runner<br>как? глагол + наречие (прилагательное + ly): he runs quickly</div>
<table class="t"><tr><th>Прилагательное (какой?)</th><th>Наречие (как?)</th></tr>
<tr><td>quick, slow, careful</td><td>quick<b>ly</b>, slow<b>ly</b>, careful<b>ly</b></td></tr>
<tr><td>easy, happy (y → i)</td><td>eas<b>ily</b>, happ<b>ily</b></td></tr>
<tr><td><b>good</b></td><td><b>well</b></td></tr>
<tr><td>fast, hard, late, early</td><td><b>fast</b>, <b>hard</b>, <b>late</b>, <b>early</b> (без -ly)</td></tr></table>
<p><i>She is a <b>good</b> singer. She sings <b>well</b>.</i> - Она хорошая певица. Она хорошо поёт.<br>
<i>He works <b>hard</b>.</i> - Он усердно работает. (hardly = «почти не», это другое слово!)</p>
<div class="note">После <b>be, look, feel, seem, sound, taste, smell</b> ставим прилагательное: <i>You look <b>tired</b>. It sounds <b>good</b>. The soup tastes <b>great</b>.</i></div>
<div class="err">❌ He speaks English very good. → ✅ He speaks English very well.<br>❌ She drives careful. → ✅ She drives carefully. &nbsp; ❌ He runs fastly. → ✅ He runs fast.<br>❌ You look sadly. → ✅ You look sad.</div>`);

  P[47] = {
    steps: [
      S("Шаг 1. Какой? или Как?", "Прилагательное описывает предмет или человека: какой он. Наречие описывает действие: как его делают. Как в русском: быстрый бегун, но бегает быстро.", [["He is a quick runner.", "Он быстрый бегун."], ["He runs quickly.", "Он быстро бегает."]]),
      S("Шаг 2. Наречие = прилагательное + ly", "Чаще всего просто добавляем -ly. Если слово кончается на согласную + y, y меняется на i: easy → easily.", [["Please speak slowly.", "Пожалуйста, говорите медленно."], ["I did it easily.", "Я сделал это легко."], ["Drive carefully!", "Езжай осторожно!"]]),
      S("Шаг 3. Где стоит наречие", "Наречие обычно ставим после глагола, а если у глагола есть дополнение (что? кого?), то после дополнения. Между глаголом и дополнением его не вставляем: не «speaks well English».", [["She speaks English well.", "Она хорошо говорит по-английски."], ["He closed the door quietly.", "Он тихо закрыл дверь."]]),
      S("Шаг 4. Исключения: well, fast, hard, late, early", "Good → well. А fast, hard, late, early не меняются. «Fastly» не бывает. Осторожно: hardly значит «почти не», lately значит «в последнее время».", [["You play the guitar well.", "Ты хорошо играешь на гитаре."], ["My brother runs fast.", "Мой брат быстро бегает."], ["We work hard.", "Мы усердно работаем."]]),
      S("Шаг 5. Look, feel, sound, taste: прилагательное", "Эти глаголы описывают, какой кто-то или что-то, поэтому после них прилагательное. По-русски «выглядишь устало», а по-английски tired, без -ly.", [["You look tired.", "Ты выглядишь усталым."], ["This cake tastes good.", "Этот торт вкусный."], ["That sounds great!", "Звучит здорово!"]])
    ],
    tasks: [
      O("Соберите: Она очень хорошо говорит по-английски.", ["She", "speaks", "English", "very", "well"], "She speaks English very well", "Как говорит? well, и оно стоит после English."),
      O("Соберите: Мой брат быстро бегает.", ["My brother", "runs", "fast"], "My brother runs fast", "Fast не меняется: без -ly."),
      O("Соберите: Ты выглядишь усталым.", ["You", "look", "tired"], "You look tired", "После look прилагательное."),
      Ch("He is a ___ driver.", ["careful", "carefully", "carefuly"], 0, "Какой водитель? Прилагательное careful."),
      Ch("He drives ___.", ["careful", "carefully", "good"], 1, "Как водит? Наречие carefully."),
      Ch("She sings very ___.", ["good", "well", "goodly"], 1, "Наречие от good: well."),
      I("The test was easy. I did it ___. (easy → как?)", ["easily"], "easy → easily: y меняется на i."),
      I("Переведите: Он усердно работает.", ["He works hard", "He works very hard"], "Hard не меняется: works hard."),
      F("Исправьте: He runs very fastly.", ["He runs very fast"], "Fastly не бывает, только fast."),
      F("Исправьте: You look sadly.", ["You look sad"], "После look ставим прилагательное.")
    ]
  };

  T[47] = [
    ["Он быстро бегает.", "He runs fast|He runs quickly", "fast без -ly"],
    ["Она хорошо поёт.", "She sings well", "good → well"],
    ["Ты хорошо говоришь по-английски.", "You speak English well|You speak good English", "well после English"],
    ["Говори медленно, пожалуйста.", "Speak slowly please|Please speak slowly|Speak slowly", "slow + ly"],
    ["Он осторожный водитель.", "He is a careful driver", "Какой? careful"],
    ["Он водит осторожно.", "He drives carefully", "Как? carefully"],
    ["Мы усердно работаем.", "We work hard", "hard без -ly"],
    ["Ты выглядишь счастливым.", "You look happy", "look + прилагательное"],
    ["Эта пицца вкусно пахнет.", "This pizza smells good|This pizza smells nice|This pizza smells delicious|This pizza smells great", "smell + прилагательное"],
    ["Я легко сделал это задание.", "I did this task easily|I did the task easily|I did this exercise easily|I easily did this task|I easily did the task", "easy → easily"],
    ["Она пришла поздно.", "She came late|She arrived late", "late без -ly"],
    ["Он плохо играет в теннис.", "He plays tennis badly|He plays tennis poorly|He is bad at tennis", "bad → badly"]
  ];

  /* ---------- 48. 's и whose ---------- */
  add(48, "A2", "Чьё: 's и whose", `<p>По-русски «машина папы»: сначала вещь, потом хозяин. По-английски наоборот: <b>хозяин + 's + вещь</b>.</p>
<div class="formula">хозяин + 's + вещь: my dad's car = машина моего папы</div>
<table class="t"><tr><th>Кто хозяин</th><th>Как пишем</th><th>Пример</th></tr>
<tr><td>один: Tom, my sister</td><td><b>'s</b></td><td>Tom<b>'s</b> bike, my sister<b>'s</b> room</td></tr>
<tr><td>много, слово на -s: parents, friends</td><td>только <b>'</b></td><td>my parents<b>'</b> car</td></tr>
<tr><td>много без -s: children, men, people</td><td><b>'s</b></td><td>the children<b>'s</b> toys</td></tr>
<tr><td>двое вместе</td><td>'s у второго</td><td>Tom and Anna<b>'s</b> house</td></tr></table>
<p><b>У вещей</b> обычно <b>of</b>: <i>the end <b>of</b> the film</i> - конец фильма, <i>the name <b>of</b> the street</i> - название улицы.</p>
<p><b>Whose?</b> = чей? <i><b>Whose</b> phone is this? - It's Tom's.</i> - Чей это телефон? - Тома.</p>
<div class="err">❌ the car of my dad → ✅ my dad's car &nbsp; ❌ my parents's house → ✅ my parents' house<br>❌ Who's bag is this? → ✅ Whose bag is this? &nbsp; ❌ Toms bike → ✅ Tom's bike</div>`);

  P[48] = {
    steps: [
      S("Шаг 1. Хозяин + 's + вещь", "Вместо русского «машина папы» говорим «папина машина»: сначала хозяин, к нему 's, потом вещь. Конструкцию «the car of my dad» для людей не используем.", [["This is my dad's car.", "Это машина моего папы."], ["Kate's room is big.", "Комната Кейт большая."]]),
      S("Шаг 2. Много хозяев на -s: только апостроф", "Если слово уже во множественном числе и кончается на -s, второе s не пишем, ставим только ' в конце. Звучит так же.", [["my parents' house", "дом моих родителей"], ["my friends' bikes", "велосипеды моих друзей"]]),
      S("Шаг 3. Children, men, people и двое хозяев", "Особое множественное число без -s получает обычное 's. Если хозяев двое и вещь общая, 's ставим только у второго.", [["the children's books", "детские книги, книги детей"], ["Tom and Anna's house", "дом Тома и Анны"]]),
      S("Шаг 4. У вещей: of", "Когда «хозяин» не человек, а предмет, обычно говорим через of: конец чего, название чего, верх чего.", [["the end of the film", "конец фильма"], ["the name of the song", "название песни"], ["the top of the page", "верх страницы"]]),
      S("Шаг 5. Можно без вещи", "Если и так понятно, о чём речь, вещь не повторяем. А at my grandma's значит «у бабушки дома».", [["It isn't my pen. It's Anna's.", "Это не моя ручка. Это Анны."], ["I was at my grandma's.", "Я был у бабушки."]]),
      S("Шаг 6. Чей? Whose", "Whose ставим в начало, сразу за ним вещь. Не путайте с who's: это who is, «кто есть», звучит так же, но значит другое.", [["Whose phone is this?", "Чей это телефон?"], ["Whose keys are these?", "Чьи это ключи?"]])
    ],
    tasks: [
      O("Соберите: Это телефон моего брата.", ["This", "is", "my brother's", "phone"], "This is my brother's phone", "Хозяин + 's + вещь."),
      O("Соберите: Чья это сумка?", ["Whose", "bag", "is", "this"], "Whose bag is this", "Whose + вещь + is + this."),
      O("Соберите: Мне понравился конец фильма.", ["I", "liked", "the end", "of", "the film"], "I liked the end of the film", "У вещей через of: the end of the film."),
      Ch("This is my ___ house. (родителей)", ["parent's", "parents'", "parents's"], 1, "Parents на -s: только апостроф."),
      Ch("Where are the ___ toys? (детей)", ["childrens'", "children's", "childs'"], 1, "Children без -s, поэтому 's."),
      Ch("___ jacket is this? - It's Anna's.", ["Who's", "Whose", "Who"], 1, "Чей? = Whose. Who's = who is."),
      I("This is ___ room. (комната Кейт: Kate)", ["Kate's"], "Kate + 's."),
      I("Переведите: Это машина моего папы.", ["This is my dad's car", "It is my dad's car", "This is my father's car", "It is my father's car"], "my dad + 's + car."),
      F("Исправьте: This is the bike of Tom.", ["This is Tom's bike"], "У людей: Tom's bike."),
      F("Исправьте: Who's book is this?", ["Whose book is this"], "Чей = whose, а who's = who is.")
    ]
  };

  T[48] = [
    ["Это велосипед Тома.", "This is Tom's bike|This is Tom's bicycle|It is Tom's bike|It's Tom's bike", "Tom + 's"],
    ["Комната моей сестры большая.", "My sister's room is big|My sister's room is large", "sister's room"],
    ["Машина моих родителей новая.", "My parents' car is new", "parents' без s"],
    ["Чей это телефон?", "Whose phone is this|Whose phone is it|Whose is this phone", "Whose + phone"],
    ["Чьи это ключи?", "Whose keys are these|Whose keys are they|Whose keys are those", "Whose keys are"],
    ["Это не моя ручка, это ручка Анны.", "This is not my pen it is Anna's|It is not my pen it is Anna's|This is not my pen it is Anna's pen|It is not my pen it is Anna's pen|This is not my pen this is Anna's pen|This is not my pen this is Anna's", "Anna's"],
    ["Мне нравится конец этой песни.", "I like the end of this song", "the end of"],
    ["Игрушки детей на полу.", "The children's toys are on the floor|The kids' toys are on the floor", "children's"],
    ["Я не помню название фильма.", "I don't remember the name of the film|I don't remember the name of the movie|I can't remember the name of the film|I can't remember the name of the movie", "the name of"],
    ["Я был у бабушки.", "I was at my grandma's|I was at my grandmother's|I was at grandma's|I was at my granny's", "at my grandma's"],
    ["Это дом Тома и Анны.", "This is Tom and Anna's house|It is Tom and Anna's house|This is Tom and Anna's home", "Tom and Anna's"],
    ["Это сумка учителя.", "This is the teacher's bag|It is the teacher's bag|This is my teacher's bag|This is our teacher's bag", "teacher's"]
  ];

  /* ---------- 49. Something, anyone, nobody, everywhere ---------- */
  add(49, "A2", "Something, anyone, nobody, everywhere", `<p>Эти слова собираются как конструктор: <b>начало</b> (some, any, no, every) + <b>конец</b> (thing = вещь, body / one = человек, where = место).</p>
<table class="t"><tr><th></th><th>-thing (что)</th><th>-body / -one (кто)</th><th>-where (где, куда)</th></tr>
<tr><td><b>some-</b> «+»</td><td>something - что-то</td><td>somebody - кто-то</td><td>somewhere - где-то</td></tr>
<tr><td><b>any-</b> «?» и после not</td><td>anything - что-нибудь</td><td>anybody - кто-нибудь</td><td>anywhere - где-нибудь</td></tr>
<tr><td><b>no-</b></td><td>nothing - ничего</td><td>nobody / no one - никто</td><td>nowhere - нигде</td></tr>
<tr><td><b>every-</b></td><td>everything - всё</td><td>everybody - все</td><td>everywhere - везде</td></tr></table>
<div class="formula">Одно отрицание: I don't know anything. = I know nothing.</div>
<p><i><b>Nobody</b> knows.</i> - Никто не знает. <i><b>Everybody</b> likes pizza.</i> - Все любят пиццу. (глагол как с he: knows, likes, is)</p>
<p>В просьбах и предложениях тоже some-: <i>Would you like <b>something</b> to drink?</i></p>
<div class="err">❌ I don't know nothing. → ✅ I don't know anything. / I know nothing.<br>❌ Everybody are here. → ✅ Everybody is here. &nbsp; ❌ Nobody don't know. → ✅ Nobody knows.</div>`);

  P[49] = {
    steps: [
      S("Шаг 1. Собираем из двух частей", "Начало: some (какой-то), any (какой-нибудь), no (никакой), every (каждый). Конец: thing (вещь), body или one (человек), where (место). Somebody и someone значат одно и то же.", [["something", "что-то"], ["nobody", "никто"], ["everywhere", "везде"]]),
      S("Шаг 2. Some- в обычных предложениях", "В утверждении берём some-: что-то, кто-то, где-то. Также в просьбах и когда что-то предлагаем.", [["Somebody took my pen.", "Кто-то взял мою ручку."], ["I want something to eat.", "Я хочу что-нибудь поесть."], ["Would you like something to drink?", "Хочешь что-нибудь выпить?"]]),
      S("Шаг 3. Any- в вопросах и после not", "В вопросе и после don't, can't, didn't берём any-: что-нибудь, кто-нибудь, где-нибудь.", [["Is anybody at home?", "Кто-нибудь дома?"], ["I can't see anything.", "Я ничего не вижу."]]),
      S("Шаг 4. Только одно «не»", "По-русски «я никого не видел» с двумя отрицаниями. По-английски отрицание одно: либо not + any-, либо no- без not.", [["I didn't see anybody.", "Я никого не видел."], ["I saw nobody.", "Я никого не видел."], ["I don't know anything. = I know nothing.", "Я ничего не знаю."]]),
      S("Шаг 5. No- в начале и в коротких ответах", "Если «никто» или «ничего» стоит в начале, берём nobody, nothing. Глагол тогда без not. Так же в коротком ответе.", [["Nobody knows the answer.", "Никто не знает ответ."], ["What did you buy? - Nothing.", "Что ты купил? - Ничего."]]),
      S("Шаг 6. Every-: все, всё, везде", "По-русски «все любят» во множественном числе, но everybody и everything по-английски требуют глагол как с he: is, likes, knows.", [["Everybody likes music.", "Все любят музыку."], ["Everything is OK.", "Всё в порядке."], ["I looked everywhere.", "Я искал везде."]])
    ],
    tasks: [
      O("Соберите: Я ничего не знаю.", ["I", "don't", "know", "anything"], "I don't know anything", "После don't берём any-: anything."),
      O("Соберите: Все любят пиццу.", ["Everybody", "likes", "pizza"], "Everybody likes pizza", "Everybody как he: likes."),
      O("Соберите: Ты что-нибудь видишь?", ["Can", "you", "see", "anything"], "Can you see anything", "В вопросе any-: anything."),
      Ch("I didn't buy ___. (ничего)", ["nothing", "anything", "something"], 1, "«Ничего» при didn't: anything. Nothing дало бы двойное отрицание."),
      Ch("___ knows the answer. (никто)", ["Nobody", "Anybody", "Somebody"], 0, "Никто в начале: Nobody."),
      Ch("I can't find my keys ___.", ["nowhere", "anywhere", "everywhere"], 1, "После can't берём any-: anywhere."),
      Ch("Everybody ___ happy.", ["are", "is", "be"], 1, "Everybody как he: is."),
      I("There is ___ in the box. It's empty. (ничего)", ["nothing"], "Нет not, поэтому nothing."),
      I("Переведите: Я никого здесь не знаю.", ["I don't know anybody here", "I don't know anyone here", "I know nobody here", "I know no one here"], "not + anybody или nobody без not."),
      F("Исправьте: I don't see nobody.", ["I don't see anybody", "I don't see anyone", "I see nobody", "I see no one"], "Только одно отрицание.")
    ]
  };

  T[49] = [
    ["Я ничего не знаю.", "I don't know anything|I know nothing", "not + anything"],
    ["Кто-то взял мою ручку.", "Someone took my pen|Somebody took my pen", "someone"],
    ["Я хочу что-нибудь поесть.", "I want something to eat|I want to eat something", "Утверждение: some-"],
    ["Ты что-нибудь видишь?", "Do you see anything|Can you see anything", "Вопрос: any-"],
    ["Никто не знает ответ.", "Nobody knows the answer|No one knows the answer", "Nobody + knows"],
    ["Все любят пиццу.", "Everybody likes pizza|Everyone likes pizza|Everybody loves pizza|Everyone loves pizza", "Everybody + likes"],
    ["Я везде искал свой телефон.", "I looked for my phone everywhere|I looked everywhere for my phone|I searched everywhere for my phone|I searched for my phone everywhere", "everywhere"],
    ["Я никого не видел.", "I didn't see anybody|I didn't see anyone|I saw nobody|I saw no one", "Одно отрицание"],
    ["Летом я хочу поехать куда-нибудь.", "I want to go somewhere in summer|I want to go somewhere in the summer|In summer I want to go somewhere|In the summer I want to go somewhere|I want to travel somewhere in summer|I want to travel somewhere in the summer", "somewhere"],
    ["Всё хорошо.", "Everything is OK|Everything is okay|Everything is fine|Everything is good|Everything is all right|Everything is alright", "Everything + is"],
    ["Мне нечего делать.", "I have nothing to do|I don't have anything to do|I haven't got anything to do", "nothing to do"],
    ["Здесь кто-нибудь есть?", "Is anybody here|Is anyone here|Is anybody there|Is anyone there", "Is anybody"]
  ];

  /* ---------- 50. Too и enough ---------- */
  add(50, "A2", "Too и enough", `<div class="formula">too + прилагательное = слишком: too hot<br>прилагательное + enough = достаточно: old enough<br>enough + существительное = достаточно: enough money</div>
<table class="t"><tr><th>Схема</th><th>Пример</th></tr>
<tr><td><b>too</b> + прилагательное</td><td>The tea is <b>too</b> hot. - Чай слишком горячий.</td></tr>
<tr><td>прилагательное + <b>enough</b></td><td>He isn't tall <b>enough</b>. - Он недостаточно высокий.</td></tr>
<tr><td><b>enough</b> + существительное</td><td>We have <b>enough</b> time. - У нас достаточно времени.</td></tr>
<tr><td><b>too much</b> + не считаем</td><td><b>too much</b> sugar - слишком много сахара</td></tr>
<tr><td><b>too many</b> + считаем</td><td><b>too many</b> people - слишком много людей</td></tr>
<tr><td>+ <b>to</b> + глагол</td><td>too young <b>to drive</b>, old enough <b>to watch</b> it, enough money <b>to buy</b> it</td></tr></table>
<p><b>Very</b> = очень (просто факт), <b>too</b> = слишком (это мешает): <i>It's very hot, but I like it. It's too hot, I can't sleep.</i></p>
<div class="note">Too в конце предложения значит «тоже»: <i>Me too.</i> Это другое значение.</div>
<div class="err">❌ enough old → ✅ old enough &nbsp; ❌ too much hot → ✅ too hot<br>❌ too many money → ✅ too much money &nbsp; ❌ too cold for swim → ✅ too cold to swim</div>`);

  P[50] = {
    steps: [
      S("Шаг 1. Too = слишком", "Too ставим перед прилагательным. Обычно оно значит, что это плохо, мешает. Very просто «очень», без жалобы.", [["The tea is too hot.", "Чай слишком горячий."], ["This jacket is too big for me.", "Эта куртка мне слишком большая."]]),
      S("Шаг 2. Enough после прилагательного", "По-русски «достаточно большой», а по-английски наоборот: big enough. Enough встаёт после прилагательного.", [["The room is big enough.", "Комната достаточно большая."], ["Is the water warm enough?", "Вода достаточно тёплая?"]]),
      S("Шаг 3. Enough перед существительным", "С существительным enough стоит впереди, как по-русски: достаточно денег, достаточно времени.", [["We have enough time.", "У нас достаточно времени."], ["There aren't enough chairs.", "Не хватает стульев."]]),
      S("Шаг 4. Too much и too many", "Если после «слишком много» идёт существительное, берём too much для того, что не считаем (water, money, sugar), и too many для того, что считаем (people, books).", [["There is too much salt in the soup.", "В супе слишком много соли."], ["There are too many people here.", "Здесь слишком много людей."]]),
      S("Шаг 5. Чтобы сделать: + to + глагол", "Слово «чтобы» переводим через to: too young to drive (слишком молод, чтобы водить). Не «for drive».", [["He is too young to drive.", "Он слишком молод, чтобы водить машину."], ["She is old enough to understand.", "Она достаточно взрослая, чтобы понять."], ["I don't have enough money to buy it.", "У меня недостаточно денег, чтобы это купить."]]),
      S("Шаг 6. Not ... enough = недостаточно", "Not + прилагательное + enough почти то же, что too + противоположное слово.", [["It isn't warm enough. = It's too cold.", "Недостаточно тепло. = Слишком холодно."], ["I'm not tall enough.", "Я недостаточно высокий."]])
    ],
    tasks: [
      O("Соберите: Чай слишком горячий.", ["The tea", "is", "too", "hot"], "The tea is too hot", "Too перед прилагательным."),
      O("Соберите: Я недостаточно высокий.", ["I'm", "not", "tall", "enough"], "I'm not tall enough", "Enough после прилагательного."),
      O("Соберите: У нас достаточно времени.", ["We", "have", "enough", "time"], "We have enough time", "Enough перед существительным."),
      Ch("He is 15. He is ___ to drive.", ["too young", "young enough", "enough young"], 0, "В 15 водить нельзя: слишком молод, too young."),
      Ch("There are ___ people here.", ["too much", "too many", "too"], 1, "People считаем: too many."),
      Ch("This bag is not big ___.", ["too", "enough", "very"], 1, "Недостаточно большая: big enough."),
      Ch("There is ___ sugar in my tea. (слишком много)", ["too many", "too much", "enough much"], 1, "Sugar не считаем: too much."),
      I("Is it warm ___ to swim? (достаточно)", ["enough"], "warm + enough."),
      I("Переведите: У меня недостаточно денег.", ["I don't have enough money", "I haven't got enough money"], "don't have + enough money."),
      F("Исправьте: She is enough old to drive.", ["She is old enough to drive"], "Enough ставим после прилагательного.")
    ]
  };

  T[50] = [
    ["Слишком холодно.", "It is too cold|It's too cold", "too + cold"],
    ["Эта куртка слишком большая.", "This jacket is too big|This jacket is too large", "too big"],
    ["Я слишком устал.", "I am too tired|I'm too tired", "too tired"],
    ["Он недостаточно высокий.", "He is not tall enough|He isn't tall enough", "tall enough"],
    ["У нас достаточно времени.", "We have enough time|We have got enough time", "enough + time"],
    ["У меня недостаточно денег.", "I don't have enough money|I haven't got enough money", "not enough money"],
    ["Здесь слишком много людей.", "There are too many people here|There are too many people", "too many"],
    ["Не клади слишком много соли.", "Don't put too much salt|Don't add too much salt|Don't use too much salt", "too much + salt"],
    ["Ты достаточно взрослый, чтобы понять.", "You are old enough to understand", "old enough to"],
    ["Он слишком молод, чтобы водить машину.", "He is too young to drive|He is too young to drive a car", "too young to"],
    ["Вода достаточно тёплая?", "Is the water warm enough", "warm enough"],
    ["Я ем слишком много сладкого.", "I eat too many sweets|I eat too much sugar|I eat too much sweet food|I eat too many sweet things|I eat too much candy", "too much / too many"]
  ];

  /* ---------- 51. Would like и вежливые просьбы ---------- */
  add(51, "A2", "Would like и вежливые просьбы: could you, can I", `<p><i>I want</i> в кафе или в магазине звучит резко, как «Дай!». Вежливо: <b>I'd like</b> = I would like = «я бы хотел».</p>
<div class="formula">I'd like + вещь: I'd like a coffee.<br>I'd like + to + глагол: I'd like to go home.</div>
<table class="t"><tr><th>Что нужно</th><th>Как сказать</th></tr>
<tr><td>Хочу (вежливо)</td><td><b>I'd like</b> a glass of water. <b>I'd like to</b> order.</td></tr>
<tr><td>Предложить</td><td><b>Would you like</b> some tea? <b>Would you like to</b> come?</td></tr>
<tr><td>Можно мне?</td><td><b>Can I</b> ...? <b>Could I</b> ...? (вежливее) <b>May I</b> ...?</td></tr>
<tr><td>Сделай, пожалуйста</td><td><b>Can you</b> ...? <b>Could you</b> ...? (вежливее)</td></tr>
<tr><td>Вы не против?</td><td><b>Do you mind if I</b> open the window? <b>Do you mind</b> opening the window?</td></tr></table>
<p>Ответы: <i>Yes, please. / No, thank you. / Sure. / Of course.</i> На <b>Do you mind ...?</b> «можно» = <i>No, not at all.</i> (= не возражаю)</p>
<div class="err">❌ Do you like some tea? (= любишь ли) → ✅ Would you like some tea?<br>❌ Would you like go? → ✅ Would you like to go? &nbsp; ❌ Could you to help me? → ✅ Could you help me?</div>`);

  P[51] = {
    steps: [
      S("Шаг 1. I want звучит резко", "По-русски «Я хочу кофе» нормально. По-английски I want в просьбе звучит грубовато. Вежливо: I'd like (I would like), «я бы хотел».", [["I'd like a coffee, please.", "Мне кофе, пожалуйста."], ["I'd like a glass of water.", "Я бы хотел стакан воды."]]),
      S("Шаг 2. I'd like + вещь или + to + глагол", "После like ставим вещь. Если дальше действие, нужен to.", [["I'd like a pizza.", "Я бы хотел пиццу."], ["I'd like to go home.", "Я бы хотел пойти домой."]]),
      S("Шаг 3. Предложить: Would you like ...?", "Would you like ...? значит «Хочешь? Не хотите ли?». Не путайте с Do you like ...? = «Тебе вообще нравится?». Отвечаем Yes, please или No, thank you.", [["Would you like some tea? - Yes, please.", "Хочешь чаю? - Да, пожалуйста."], ["Would you like to come with us?", "Хочешь пойти с нами?"]]),
      S("Шаг 4. Можно мне? Can I / Could I", "Can I + глагол = «можно мне?». Could I звучит мягче, May I ещё официальнее. Глагол без to.", [["Can I open the window?", "Можно открыть окно?"], ["Could I have some water?", "Можно мне воды?"]]),
      S("Шаг 5. Попросить кого-то: Could you ...?", "Could you + глагол = «не могли бы вы». Please ставим в конец или после you.", [["Could you help me, please?", "Не могли бы вы мне помочь?"], ["Could you please speak more slowly?", "Не могли бы вы говорить медленнее?"]]),
      S("Шаг 6. Do you mind ...? Ловушка в ответе", "Do you mind if I ...? = «Вы не против, если я ...?». Do you mind + -ing = «Вам не трудно ...?». Mind значит «возражать», поэтому разрешение звучит как No, not at all.", [["Do you mind if I sit here? - No, not at all.", "Вы не против, если я сяду здесь? - Нет, садитесь."], ["Do you mind opening the window?", "Вам не трудно открыть окно?"]])
    ],
    tasks: [
      O("Соберите: Я бы хотел стакан воды.", ["I'd", "like", "a glass", "of", "water"], "I'd like a glass of water", "Вежливо: I'd like + вещь."),
      O("Соберите: Не могли бы вы открыть окно?", ["Could", "you", "open", "the window"], "Could you open the window", "Could you + глагол без to."),
      O("Соберите: Хочешь пойти в кино?", ["Would", "you", "like", "to go", "to the cinema"], "Would you like to go to the cinema", "Would you like + to + глагол."),
      Ch("___ some tea? - Yes, please.", ["Do you like", "Would you like", "You would like"], 1, "Предлагаем: Would you like."),
      Ch("I'd like ___ a pizza.", ["order", "to order", "ordering"], 1, "После like действие с to."),
      Ch("Could you ___ me, please?", ["help", "to help", "helping"], 0, "После could глагол без to."),
      Ch("Do you mind if I open the window? - ___ (открывай, я не против)", ["Yes, I do.", "No, not at all.", "Yes, please mind."], 1, "Mind = возражать. «Нет, не возражаю» = можно."),
      I("___ I use your phone? (можно мне)", ["Could", "Can", "May"], "Можно мне? = Could I / Can I / May I."),
      I("Переведите: Я бы хотел чашку чая.", ["I'd like a cup of tea", "I would like a cup of tea"], "I'd like + a cup of tea."),
      F("Исправьте: Would you like go for a walk?", ["Would you like to go for a walk"], "После like нужен to: to go.")
    ]
  };

  T[51] = [
    ["Я бы хотел кофе.", "I would like a coffee|I would like some coffee|I would like coffee", "I'd like"],
    ["Я бы хотел пойти домой.", "I would like to go home", "like + to"],
    ["Хочешь чаю?", "Would you like some tea|Would you like tea|Would you like a cup of tea|Do you want some tea|Do you want tea", "Would you like"],
    ["Хочешь пойти с нами?", "Would you like to come with us|Would you like to go with us|Do you want to come with us|Do you want to go with us", "Would you like to"],
    ["Можно мне воды?", "Can I have some water|Could I have some water|May I have some water|Can I have water|Could I have water|Can I have some water please|Could I have some water please", "Can I have"],
    ["Можно открыть окно?", "Can I open the window|Could I open the window|May I open the window", "Can I"],
    ["Не могли бы вы мне помочь?", "Could you help me|Can you help me|Could you help me please|Could you please help me|Can you help me please|Can you please help me", "Could you"],
    ["Не могли бы вы говорить медленнее?", "Could you speak more slowly|Could you speak slower|Can you speak more slowly|Can you speak slower|Could you speak more slowly please|Could you please speak more slowly", "Could you + speak"],
    ["Можно мне посмотреть?", "Can I have a look|Could I have a look|May I have a look|Can I see|Could I see|May I see|Can I see it|Could I see it|Can I look|Could I look", "Can I"],
    ["Мы бы хотели заказать пиццу.", "We would like to order a pizza|We would like to order pizza|We'd like to order a pizza|We'd like to order pizza", "would like to order"],
    ["Вы не против, если я сяду здесь?", "Do you mind if I sit here|Do you mind if I sit down here", "Do you mind if"],
    ["Не могли бы вы закрыть дверь, пожалуйста?", "Could you close the door please|Could you please close the door|Could you shut the door please|Could you please shut the door|Can you close the door please|Can you please close the door", "Could you please"]
  ];

  /* ---------- 52. Будущее: will, going to, Present Continuous ---------- */
  add(52, "A2", "Будущее: will, going to или Present Continuous", `<p>По-русски будущее одно, а по-английски выбираем форму по ситуации. Спросите себя: <b>когда я это решил?</b></p>
<div class="formula">решил сейчас → will &nbsp;|&nbsp; план есть → going to &nbsp;|&nbsp; договорились, есть время и место → am / is / are + -ing</div>
<table class="t"><tr><th>Ситуация</th><th>Форма</th><th>Пример</th></tr>
<tr><td>Решил прямо сейчас, обещание, помощь</td><td><b>will</b></td><td>The phone is ringing. - I<b>'ll</b> answer it.</td></tr>
<tr><td>Мнение, догадка: I think, probably, I'm sure</td><td><b>will</b></td><td>I think it <b>will</b> rain tomorrow.</td></tr>
<tr><td>План, решил раньше</td><td><b>going to</b></td><td>I<b>'m going to</b> learn Spanish.</td></tr>
<tr><td>Видно по признакам</td><td><b>going to</b></td><td>Look at the clouds! It<b>'s going to</b> rain.</td></tr>
<tr><td>Договорённость: время, место, билеты</td><td><b>Present Continuous</b></td><td>I<b>'m meeting</b> Tom at 6. We<b>'re flying</b> to Sochi on Friday.</td></tr></table>
<p><b>Не думаю, что</b>: <i>I <b>don't think</b> he will come.</i> (так естественнее и мягче, чем «I think he won't come»)</p>
<div class="err">❌ Wait, I help you. → ✅ Wait, I'll help you.<br>❌ Look at the clouds! It will rain. → ✅ It's going to rain.<br>❌ I will to call you. → ✅ I will call you.</div>`);

  P[52] = {
    steps: [
      S("Шаг 1. Три способа сказать о будущем", "По-русски «завтра я встречаюсь», «я помогу», «я собираюсь» всё про будущее. По-английски форма зависит от того, когда и как вы это решили.", [["I'll help you.", "Я помогу тебе. (решил сейчас)"], ["I'm going to help my dad on Saturday.", "Я собираюсь помочь папе в субботу. (план)"], ["I'm meeting Tom at 6.", "Я встречаюсь с Томом в 6. (договорились)"]]),
      S("Шаг 2. Will: решил прямо сейчас", "Если решение пришло в момент разговора, вы что-то обещаете или предлагаете помощь, берём will. После will глагол без to.", [["The phone is ringing. - I'll answer it.", "Телефон звонит. - Я отвечу."], ["I'm cold. - I'll close the window.", "Мне холодно. - Я закрою окно."], ["I promise I'll call you.", "Обещаю, я позвоню тебе."]]),
      S("Шаг 3. Will: мнение и догадки", "Когда мы просто думаем, что так будет: I think, I'm sure, probably. «Не думаю, что» = I don't think ... will.", [["I think it will be sunny tomorrow.", "Думаю, завтра будет солнечно."], ["I'm sure you will pass the exam.", "Я уверен, ты сдашь экзамен."], ["I don't think he will come.", "Не думаю, что он придёт."]]),
      S("Шаг 4. Going to: план уже есть", "Решили заранее, но точное время и место могут быть ещё не назначены: am / is / are + going to + глагол.", [["I'm going to learn Spanish.", "Я собираюсь учить испанский."], ["We're going to buy a new car.", "Мы собираемся купить новую машину."]]),
      S("Шаг 5. Going to: видно по признакам", "Если мы видим, что сейчас что-то случится, тоже going to, а не will.", [["Look at the clouds! It's going to rain.", "Посмотри на тучи! Будет дождь."], ["Be careful! You're going to fall.", "Осторожно! Ты сейчас упадёшь."]]),
      S("Шаг 6. Present Continuous: договорились", "Если есть точное время, место, билеты, запись к врачу, другие люди в курсе, берём am / is / are + -ing. Часто с tonight, tomorrow, on Friday.", [["I'm meeting Anna on Saturday.", "В субботу я встречаюсь с Анной."], ["We're flying to Sochi on Friday.", "В пятницу мы летим в Сочи."], ["What are you doing tonight?", "Что ты делаешь сегодня вечером?"]])
    ],
    tasks: [
      O("Соберите: Я встречаюсь с Томом в 6.", ["I'm", "meeting", "Tom", "at 6"], "I'm meeting Tom at 6", "Договорились на время: am + -ing."),
      O("Соберите: Думаю, завтра будет солнечно.", ["I think", "it", "will", "be", "sunny", "tomorrow"], "I think it will be sunny tomorrow", "Мнение: I think + will."),
      O("Соберите: Мы собираемся купить новую машину.", ["We", "are", "going to", "buy", "a new car"], "We are going to buy a new car", "План: are going to + глагол."),
      Ch("The phone is ringing. - I ___ answer it.", ["will", "am going to", "am answering"], 0, "Решил прямо сейчас: will."),
      Ch("Look at those clouds! It ___ rain.", ["will", "is going to", "is raining"], 1, "Видно по признакам: is going to."),
      Ch("I ___ my grandma on Saturday. We already have the train tickets.", ["will visit", "am visiting", "visit"], 1, "Билеты куплены, это договорённость: am visiting."),
      Ch("I'm sure you ___ the exam.", ["will pass", "are passing", "pass"], 0, "I'm sure = мнение: will pass."),
      I("I'm hungry. - I ___ make you a sandwich. (решил сейчас)", ["will", "'ll"], "Решение в момент разговора: will."),
      I("Переведите: Что ты делаешь сегодня вечером?", ["What are you doing tonight", "What are you doing this evening", "What are you going to do tonight", "What are you going to do this evening"], "Планы на вечер: What are you doing tonight?"),
      F("Исправьте: Look! The boy will fall!", ["Look! The boy is going to fall!", "Look, the boy is going to fall"], "Видно, что сейчас упадёт: is going to.")
    ]
  };

  T[52] = [
    ["Я помогу тебе.", "I will help you", "Решил сейчас: will"],
    ["Думаю, завтра будет дождь.", "I think it will rain tomorrow|I think it is going to rain tomorrow", "Мнение: will"],
    ["Я собираюсь учить испанский.", "I am going to learn Spanish|I am going to study Spanish", "План: going to"],
    ["Посмотри на небо! Будет дождь.", "Look at the sky it is going to rain", "Признаки: going to"],
    ["В субботу я встречаюсь с Анной.", "I am meeting Anna on Saturday|On Saturday I am meeting Anna|I am going to meet Anna on Saturday|On Saturday I am going to meet Anna", "Договорились: -ing"],
    ["Что ты делаешь завтра вечером?", "What are you doing tomorrow evening|What are you doing tomorrow night|What are you going to do tomorrow evening|What are you going to do tomorrow night", "are you doing"],
    ["В пятницу мы летим в Сочи.", "We are flying to Sochi on Friday|On Friday we are flying to Sochi|We are going to fly to Sochi on Friday|On Friday we are going to fly to Sochi", "Билеты есть: -ing"],
    ["Не думаю, что он придёт.", "I don't think he will come|I don't think he is going to come", "I don't think + will"],
    ["Обещаю, я позвоню тебе.", "I promise I will call you|I promise I will phone you|I promise to call you", "Обещание: will"],
    ["Осторожно! Ты сейчас упадёшь.", "Be careful you are going to fall|Careful you are going to fall", "Видно: going to"],
    ["Я возьму суп.", "I will have the soup|I will take the soup|I will have soup|I will take soup|I will get the soup", "Решил сейчас: will"],
    ["Он, наверное, опоздает.", "He will probably be late|Probably he will be late|He is probably going to be late", "probably + will"]
  ];

  /* ---------- 53. Повелительное наклонение и let's ---------- */
  add(53, "A2", "Повелительное наклонение и let's", `<p>Чтобы попросить или приказать, берём <b>глагол из словаря</b> и ставим его в начало. Без you, без -s. Одна форма и для «ты», и для «вы».</p>
<div class="formula">Глагол ...! → Open the door.<br>Don't + глагол ...! → Don't open the door.<br>Let's + глагол → Let's go. &nbsp; Let's not + глагол → Let's not argue.</div>
<table class="t"><tr><th>Что хотим</th><th>Пример</th></tr>
<tr><td>Сделай(те)</td><td><b>Sit</b> down. <b>Close</b> the window. - Сядь. Закрой окно.</td></tr>
<tr><td>Не делай(те)</td><td><b>Don't touch</b> it. - Не трогай это.</td></tr>
<tr><td>С прилагательным: be</td><td><b>Be</b> quiet! <b>Be</b> careful! <b>Don't be</b> late! - Не опаздывай!</td></tr>
<tr><td>Вежливо</td><td><b>Please</b> sit down. / Sit down, <b>please</b>.</td></tr>
<tr><td>Давай(те)</td><td><b>Let's</b> play football. - Давай поиграем в футбол.</td></tr>
<tr><td>Давай не будем</td><td><b>Let's not</b> argue. - Давай не будем спорить.</td></tr></table>
<div class="err">❌ Not open the door. → ✅ Don't open the door. &nbsp; ❌ Don't late! → ✅ Don't be late!<br>❌ Let's to go. → ✅ Let's go. &nbsp; ❌ Let's don't argue. → ✅ Let's not argue.</div>`);

  P[53] = {
    steps: [
      S("Шаг 1. Просто глагол в начале", "Берём глагол из словаря и ставим первым. You не нужен, -s не нужен. В русском «открой» и «откройте» разные, а в английском одно слово.", [["Open the window.", "Открой окно. / Откройте окно."], ["Sit down.", "Садись. / Садитесь."]]),
      S("Шаг 2. Запрет: Don't + глагол", "«Не делай» = Don't + глагол. Просто Not или No в начале не ставим.", [["Don't touch it!", "Не трогай это!"], ["Don't worry.", "Не волнуйся."]]),
      S("Шаг 3. Если нет глагола, нужен be", "Quiet, careful, late это не действия, а «какой». Поэтому впереди be: Be quiet. И в запрете: Don't be late. По-русски «Не опаздывай» звучит как глагол, но по-английски late прилагательное.", [["Be careful!", "Будь осторожен!"], ["Don't be late!", "Не опаздывай!"], ["Don't be sad.", "Не грусти."]]),
      S("Шаг 4. Вежливо: please", "Голый приказ звучит строго. Добавляем please в начало или в конец. Ещё вежливее: Could you ...?", [["Please close the door.", "Закрой, пожалуйста, дверь."], ["Sit down, please.", "Садитесь, пожалуйста."]]),
      S("Шаг 5. Давай(те): Let's + глагол", "Let's = let us. После него глагол без to. Ответ: Yes, let's! или OK!", [["Let's go!", "Пойдём! / Давай пойдём!"], ["Let's watch a film.", "Давай посмотрим фильм."]]),
      S("Шаг 6. Давай не будем: Let's not", "Not ставим сразу после let's. «Let's don't» говорить не надо.", [["Let's not argue.", "Давай не будем спорить."], ["Let's not go there.", "Давай не пойдём туда."]])
    ],
    tasks: [
      O("Соберите: Не открывай окно.", ["Don't", "open", "the window"], "Don't open the window", "Запрет: Don't + глагол."),
      O("Соберите: Давай посмотрим фильм.", ["Let's", "watch", "a film"], "Let's watch a film", "Let's + глагол без to."),
      O("Соберите: Пожалуйста, не опаздывай.", ["Please", "don't", "be", "late"], "Please don't be late", "Late это прилагательное, поэтому don't be."),
      Ch("___ quiet, please!", ["Be", "Are", "Don't"], 0, "Quiet это «какой», нужен Be."),
      Ch("___ touch the cat! It bites.", ["Not", "No", "Don't"], 2, "Запрет: Don't + глагол."),
      Ch("Let's ___ to the park.", ["go", "to go", "going"], 0, "После let's глагол без to."),
      Ch("Давай не будем спорить.", ["Let's don't argue.", "Let's not argue.", "Don't let's to argue."], 1, "Let's not + глагол."),
      I("___ careful! The floor is wet. (будь)", ["Be"], "Careful это прилагательное: Be careful."),
      I("Переведите: Давайте начнём.", ["Let's start", "Let's begin"], "Let's + start."),
      F("Исправьте: Don't late for school!", ["Don't be late for school!"], "Нет глагола: нужно don't be.")
    ]
  };

  T[53] = [
    ["Открой окно, пожалуйста.", "Open the window please|Please open the window", "Глагол в начало"],
    ["Не трогай это!", "Don't touch it|Don't touch this|Don't touch that", "Don't + глагол"],
    ["Садитесь, пожалуйста.", "Sit down please|Please sit down|Please take a seat|Take a seat please|Have a seat please|Please have a seat", "Sit down"],
    ["Будь осторожен!", "Be careful", "Be + прилагательное"],
    ["Не опаздывай!", "Don't be late", "Don't be + late"],
    ["Не шумите!", "Don't make noise|Don't make a noise|Don't be noisy|Be quiet", "Don't make noise"],
    ["Давай пойдём домой.", "Let's go home", "Let's + глагол"],
    ["Давайте поиграем в футбол.", "Let's play football", "Let's play"],
    ["Давай не будем спорить.", "Let's not argue|Let's not fight", "Let's not"],
    ["Не волнуйся.", "Don't worry", "Don't worry"],
    ["Послушай меня!", "Listen to me", "listen to"],
    ["Давай не пойдём туда.", "Let's not go there", "Let's not + go"]
  ];
})();
