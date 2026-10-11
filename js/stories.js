/* ==========================================================================
   LinguaQuest - тексты для чтения уровней B1-C2
   Каждый текст добавляется к последнему уроку главы и тренирует её грамматику.
   Формат: { en, ru, questions: [{ q, options, answer }] }
   ========================================================================== */
const STORIES = {
  /* ---------- B1 ---------- */
  "pas-3": {
    en: "The old bridge in our town was built in 1890. Last year it was closed because it was damaged by a storm. The repairs were paid for by the city. Now the bridge is used by thousands of people every day.",
    ru: "Старый мост в нашем городе был построен в 1890 году. В прошлом году его закрыли, потому что он был повреждён бурей. Ремонт оплатил город. Теперь мостом каждый день пользуются тысячи людей.",
    questions: [
      { q: "Когда был построен мост?", options: ["В 1890 году", "В прошлом году", "Сто лет назад, в 1990"], answer: "В 1890 году" },
      { q: "Почему мост закрыли?", options: ["Его повредила буря", "Он был слишком старым", "Его продали"], answer: "Его повредила буря" },
      { q: "Кто заплатил за ремонт?", options: ["Город", "Жители", "Строительная компания"], answer: "Город" }
    ]
  },
  "rep-3": {
    en: "Yesterday my sister called me. She said that she had found a new job. She told me that she would start next Monday. I asked her if she was nervous. She said she was a little nervous but very happy.",
    ru: "Вчера мне позвонила сестра. Она сказала, что нашла новую работу. Она сказала, что начнёт в следующий понедельник. Я спросил, волнуется ли она. Она сказала, что немного волнуется, но очень рада.",
    questions: [
      { q: "Что сказала сестра?", options: ["Что нашла новую работу", "Что переезжает", "Что заболела"], answer: "Что нашла новую работу" },
      { q: "Когда она начнёт работать?", options: ["В следующий понедельник", "Завтра", "Через месяц"], answer: "В следующий понедельник" },
      { q: "Как она себя чувствует?", options: ["Немного волнуется, но рада", "Очень грустит", "Совсем не волнуется"], answer: "Немного волнуется, но рада" }
    ]
  },
  "phr-3": {
    en: "Tom wanted to give up smoking. At first it was hard and he almost gave in. His friends helped him to keep going. He took up running instead. Now he gets up early and runs every morning.",
    ru: "Том хотел бросить курить. Сначала было тяжело, и он почти сдался. Друзья помогли ему не останавливаться. Вместо курения он начал бегать. Теперь он рано встаёт и бегает каждое утро.",
    questions: [
      { q: "Что хотел сделать Том?", options: ["Бросить курить", "Найти работу", "Переехать"], answer: "Бросить курить" },
      { q: "Чем он занялся вместо этого?", options: ["Бегом", "Плаванием", "Рисованием"], answer: "Бегом" },
      { q: "Кто ему помог?", options: ["Друзья", "Врач", "Тренер"], answer: "Друзья" }
    ]
  },

  /* ---------- B2 ---------- */
  "ded-3": {
    en: "The lights are off and nobody answers the door. Anna must be away. Her car isn't here, so she can't be at home. She might be visiting her parents. She may have told us, but we must have forgotten.",
    ru: "Свет выключен, и никто не открывает дверь. Анна, должно быть, уехала. Её машины нет, значит, она не может быть дома. Возможно, она у родителей. Может быть, она нам говорила, но мы, должно быть, забыли.",
    questions: [
      { q: "Почему Анна не может быть дома?", options: ["Её машины нет", "Дверь сломана", "Она переехала"], answer: "Её машины нет" },
      { q: "Где она, возможно, сейчас?", options: ["У родителей", "На работе", "В больнице"], answer: "У родителей" },
      { q: "Что, вероятно, случилось с рассказчиками?", options: ["Они забыли", "Они опоздали", "Они потеряли ключи"], answer: "Они забыли" }
    ]
  },
  "rel-3": {
    en: "Marta is the woman who opened the café on our street. The café, which is very small, is always full. The cakes that she bakes are famous in the whole city. People who come once always come back.",
    ru: "Марта - та женщина, которая открыла кафе на нашей улице. Кафе, которое очень маленькое, всегда полное. Торты, которые она печёт, знамениты на весь город. Люди, которые приходят один раз, всегда возвращаются.",
    questions: [
      { q: "Кто такая Марта?", options: ["Женщина, которая открыла кафе", "Повар в ресторане", "Соседка рассказчика"], answer: "Женщина, которая открыла кафе" },
      { q: "Какое это кафе?", options: ["Маленькое и всегда полное", "Большое и пустое", "Новое и дорогое"], answer: "Маленькое и всегда полное" },
      { q: "Чем знаменита Марта?", options: ["Своими тортами", "Своим кофе", "Своей музыкой"], answer: "Своими тортами" }
    ]
  },
  "ger-3": {
    en: "I enjoy learning languages, but I hate doing grammar exercises. My teacher suggested watching films in English. I decided to try it. Now I look forward to watching a new film every weekend, and I have stopped worrying about mistakes.",
    ru: "Мне нравится учить языки, но я терпеть не могу делать упражнения по грамматике. Учитель предложил смотреть фильмы на английском. Я решил попробовать. Теперь я с нетерпением жду нового фильма каждые выходные и перестал волноваться из-за ошибок.",
    questions: [
      { q: "Что не любит рассказчик?", options: ["Упражнения по грамматике", "Смотреть фильмы", "Учить языки"], answer: "Упражнения по грамматике" },
      { q: "Что предложил учитель?", options: ["Смотреть фильмы на английском", "Читать книги", "Ехать за границу"], answer: "Смотреть фильмы на английском" },
      { q: "Что изменилось?", options: ["Он перестал волноваться из-за ошибок", "Он бросил учить язык", "Он сменил учителя"], answer: "Он перестал волноваться из-за ошибок" }
    ]
  },
  "soc-3": {
    en: "More and more people work from home. On the one hand, they save time and money on travel. On the other hand, many of them feel lonely. Some companies now offer a mix of office and home work. This seems to be a fair compromise.",
    ru: "Всё больше людей работают из дома. С одной стороны, они экономят время и деньги на дорогу. С другой стороны, многие из них чувствуют себя одиноко. Некоторые компании теперь предлагают совмещать работу в офисе и дома. Похоже, это разумный компромисс.",
    questions: [
      { q: "Какой плюс у работы из дома?", options: ["Экономия времени и денег", "Больше общения", "Выше зарплата"], answer: "Экономия времени и денег" },
      { q: "Какой минус?", options: ["Одиночество", "Долгая дорога", "Шумный офис"], answer: "Одиночество" },
      { q: "Что предлагают некоторые компании?", options: ["Совмещать офис и дом", "Работать только в офисе", "Работать по выходным"], answer: "Совмещать офис и дом" }
    ]
  },

  /* ---------- C1 ---------- */
  "reg-3": {
    en: "If I had studied harder at school, I would have gone to a better university. I wish I had listened to my teachers. But if I hadn't failed that exam, I wouldn't have met my best friend. So maybe I shouldn't regret it at all.",
    ru: "Если бы я лучше учился в школе, я бы поступил в университет получше. Жаль, что я не слушал учителей. Но если бы я не провалил тот экзамен, я бы не встретил своего лучшего друга. Так что, может быть, мне вообще не стоит об этом жалеть.",
    questions: [
      { q: "О чём жалеет рассказчик?", options: ["Что плохо учился в школе", "Что переехал", "Что поссорился с другом"], answer: "Что плохо учился в школе" },
      { q: "Что хорошего случилось после проваленного экзамена?", options: ["Он встретил лучшего друга", "Он нашёл работу", "Он выиграл приз"], answer: "Он встретил лучшего друга" },
      { q: "К какому выводу он приходит?", options: ["Возможно, жалеть не стоит", "Нужно всё изменить", "Учителя были неправы"], answer: "Возможно, жалеть не стоит" }
    ]
  },
  "emp-3": {
    en: "It was not the price that surprised me, but the quality. Never have I seen such beautiful handmade shoes. What I liked most was the leather. Only after wearing them for a month did I realise how comfortable they really were.",
    ru: "Удивила меня не цена, а качество. Никогда я не видел такой красивой обуви ручной работы. Больше всего мне понравилась кожа. Только проносив её месяц, я понял, насколько она на самом деле удобная.",
    questions: [
      { q: "Что удивило рассказчика?", options: ["Качество", "Цена", "Цвет"], answer: "Качество" },
      { q: "Что ему понравилось больше всего?", options: ["Кожа", "Подошва", "Коробка"], answer: "Кожа" },
      { q: "Когда он понял, что обувь удобная?", options: ["Через месяц носки", "Сразу в магазине", "Через год"], answer: "Через месяц носки" }
    ]
  },
  "idi-3": {
    en: "When Sam started his business, it was not a piece of cake. He had to work around the clock. Many people said he was barking up the wrong tree. But he kept his chin up, and in the end his idea became a hit.",
    ru: "Когда Сэм открыл свой бизнес, это было совсем не просто. Ему приходилось работать круглые сутки. Многие говорили, что он идёт по ложному пути. Но он не падал духом, и в итоге его идея стала хитом.",
    questions: [
      { q: "Каким было начало бизнеса?", options: ["Трудным", "Очень лёгким", "Скучным"], answer: "Трудным" },
      { q: "Что значит work around the clock?", options: ["Работать круглые сутки", "Работать с часами", "Работать по графику"], answer: "Работать круглые сутки" },
      { q: "Чем всё закончилось?", options: ["Идея стала хитом", "Сэм закрыл бизнес", "Сэм сменил работу"], answer: "Идея стала хитом" }
    ]
  },
  "frm-3": {
    en: "Dear Ms Taylor, I am writing to enquire about the position advertised on your website. I would be grateful if you could send me further details. Please find my CV attached. I look forward to hearing from you. Yours sincerely, Daniel Brown.",
    ru: "Уважаемая г-жа Тейлор, пишу вам, чтобы узнать о вакансии, опубликованной на вашем сайте. Буду признателен, если вы пришлёте мне подробности. Моё резюме во вложении. С нетерпением жду вашего ответа. С уважением, Дэниел Браун.",
    questions: [
      { q: "Зачем Дэниел пишет письмо?", options: ["Узнать о вакансии", "Пожаловаться", "Отменить заказ"], answer: "Узнать о вакансии" },
      { q: "Что он приложил к письму?", options: ["Резюме", "Фотографию", "Счёт"], answer: "Резюме" },
      { q: "Где была опубликована вакансия?", options: ["На сайте", "В газете", "По радио"], answer: "На сайте" }
    ]
  },

  /* ---------- C2 ---------- */
  "nu-3": {
    en: "The new manager is not exactly unfriendly, but she is rather reserved. She hardly ever praises anyone, yet people seem to respect her. Admittedly, her meetings are a bit long. Still, the team has arguably never worked better.",
    ru: "Новую начальницу нельзя назвать недружелюбной, но она довольно сдержанная. Она почти никого не хвалит, и всё же люди, похоже, её уважают. Надо признать, её совещания немного затянуты. И всё же команда, пожалуй, никогда не работала лучше.",
    questions: [
      { q: "Какая новая начальница?", options: ["Сдержанная", "Очень весёлая", "Грубая"], answer: "Сдержанная" },
      { q: "Как к ней относятся люди?", options: ["Уважают", "Боятся", "Не замечают"], answer: "Уважают" },
      { q: "Какой недостаток упомянут?", options: ["Длинные совещания", "Низкая зарплата", "Шумный офис"], answer: "Длинные совещания" }
    ]
  },
  "aca-1": {
    en: "Recent studies suggest that sleep plays a key role in memory. Participants who slept after learning remembered significantly more words. However, the sample was relatively small. Therefore, further research is needed before firm conclusions can be drawn.",
    ru: "Недавние исследования показывают, что сон играет ключевую роль в памяти. Участники, которые спали после обучения, запомнили значительно больше слов. Однако выборка была сравнительно небольшой. Поэтому, прежде чем делать твёрдые выводы, нужны дальнейшие исследования.",
    questions: [
      { q: "Что, по данным исследований, влияет на память?", options: ["Сон", "Спорт", "Еда"], answer: "Сон" },
      { q: "В чём слабость исследования?", options: ["Маленькая выборка", "Старые данные", "Нет участников"], answer: "Маленькая выборка" },
      { q: "Какой вывод делают авторы?", options: ["Нужны дальнейшие исследования", "Вопрос полностью решён", "Сон не важен"], answer: "Нужны дальнейшие исследования" }
    ]
  }
};

// Добавляем тексты к урокам, где их ещё нет
COURSE.units.forEach((u) => u.lessons.forEach((l) => { if (STORIES[l.id] && !l.story) l.story = STORIES[l.id]; }));
