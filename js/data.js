/* ==========================================================================
   LinguaQuest - база уроков
   --------------------------------------------------------------------------
   Как устроены данные:
   COURSE.units[] - тематические разделы (секции на карте навыков)
     id, title, desc     - название и описание раздела
     colors: [c1,c2,c3]  - цвета раздела (основной, второй для градиента, тень)
     icon                - ключ иконки раздела из svg.js (SVG.unitIcon)
     letters             - true, если раздел про алфавит (меняет формулировки)
     lessons[]           - уроки раздела
       id, title         - уникальный id и название урока
       words[]           - слова: { en, ru, pic?, alt?: [], tip? }
                           pic - ключ картинки из svg.js (для упражнения с картинками)
                           alt - другие допустимые варианты английского ответа
       sentences[]       - фразы: { en, ru, alt?: [] } (для сборки и ввода)
       gaps[]            - пропуски: { text: "She ___ happy.", options: [...], answer, ru }
                           (упражнение "выберите правильную форму глагола")

   Чтобы добавить урок, достаточно дописать объект в массив lessons нужного
   раздела. Упражнения генерируются автоматически из words/sentences/gaps.
   ========================================================================== */

const COURSE = {
  units: [
    /* ------------------------------------------------------------------ */
    {
      id: "alphabet",
      title: "Алфавит и произношение",
      desc: "26 букв и первые слова",
      colors: ["#5b8cff", "#8f7bff", "#3a62d6"],
      icon: "alphabet",
      letters: true,
      lessons: [
        {
          id: "abc-1", title: "Буквы A - H",
          words: [
            { en: "A", ru: "эй", tip: "как в слове apple" },
            { en: "B", ru: "би" },
            { en: "C", ru: "си" },
            { en: "D", ru: "ди" },
            { en: "E", ru: "и" },
            { en: "F", ru: "эф" },
            { en: "G", ru: "джи" },
            { en: "H", ru: "эйч" }
          ]
        },
        {
          id: "abc-2", title: "Буквы I - R",
          words: [
            { en: "I", ru: "ай" },
            { en: "J", ru: "джей" },
            { en: "K", ru: "кей" },
            { en: "L", ru: "эл" },
            { en: "M", ru: "эм" },
            { en: "N", ru: "эн" },
            { en: "O", ru: "оу" },
            { en: "P", ru: "пи" },
            { en: "Q", ru: "кью" },
            { en: "R", ru: "ар" }
          ]
        },
        {
          id: "abc-3", title: "Буквы S - Z",
          words: [
            { en: "S", ru: "эс" },
            { en: "T", ru: "ти" },
            { en: "U", ru: "ю" },
            { en: "V", ru: "ви" },
            { en: "W", ru: "дабл-ю" },
            { en: "X", ru: "экс" },
            { en: "Y", ru: "уай" },
            { en: "Z", ru: "зед" }
          ]
        },
        {
          id: "abc-4", title: "Первые слова",
          words: [
            { en: "cat", ru: "кошка", pic: "cat" },
            { en: "dog", ru: "собака", pic: "dog" },
            { en: "sun", ru: "солнце", pic: "sun" },
            { en: "house", ru: "дом", pic: "house" },
            { en: "book", ru: "книга", pic: "book" },
            { en: "ball", ru: "мяч", pic: "ball" },
            { en: "car", ru: "машина", pic: "car" },
            { en: "bird", ru: "птица", pic: "bird" }
          ],
          sentences: [
            { en: "A cat and a dog", ru: "Кошка и собака" },
            { en: "A big house", ru: "Большой дом" },
            { en: "A red ball", ru: "Красный мяч" }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "greetings",
      title: "Приветствия и знакомство",
      desc: "Здороваемся и представляемся",
      colors: ["#3bb7f6", "#5b8cff", "#1b86c9"],
      icon: "greetings",
      lessons: [
        {
          id: "greet-1", title: "Привет и пока",
          words: [
            { en: "hello", ru: "привет", alt: ["hi"] },
            { en: "goodbye", ru: "до свидания", alt: ["bye", "good bye"] },
            { en: "good morning", ru: "доброе утро" },
            { en: "good evening", ru: "добрый вечер" },
            { en: "good night", ru: "спокойной ночи" },
            { en: "yes", ru: "да" },
            { en: "no", ru: "нет" }
          ],
          sentences: [
            { en: "Hello, Anna!", ru: "Привет, Анна!", alt: ["Hi, Anna!"] },
            { en: "Good morning, Tom!", ru: "Доброе утро, Том!" },
            { en: "Goodbye, Max!", ru: "До свидания, Макс!", alt: ["Bye, Max!"] }
          ]
        },
        {
          id: "greet-2", title: "Вежливые слова",
          words: [
            { en: "please", ru: "пожалуйста" },
            { en: "thank you", ru: "спасибо", alt: ["thanks"] },
            { en: "sorry", ru: "извините" },
            { en: "excuse me", ru: "простите (обращение)" },
            { en: "welcome", ru: "добро пожаловать" },
            { en: "friend", ru: "друг" }
          ],
          sentences: [
            { en: "Thank you very much", ru: "Большое спасибо" },
            { en: "Sorry, I am late", ru: "Извините, я опоздал" },
            { en: "You are welcome", ru: "Не за что" },
            { en: "Water, please", ru: "Воду, пожалуйста" }
          ]
        },
        {
          id: "greet-3", title: "Знакомство",
          words: [
            { en: "name", ru: "имя" },
            { en: "my", ru: "мой" },
            { en: "nice", ru: "приятный" },
            { en: "meet", ru: "встречать" },
            { en: "from", ru: "из" },
            { en: "how", ru: "как" }
          ],
          sentences: [
            { en: "My name is Anna", ru: "Меня зовут Анна" },
            { en: "Nice to meet you", ru: "Приятно познакомиться" },
            { en: "I am from Russia", ru: "Я из России" },
            { en: "How are you?", ru: "Как дела?" },
            { en: "I am fine, thank you", ru: "У меня всё хорошо, спасибо", alt: ["I am fine, thanks"] }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "pronouns",
      title: "Базовые местоимения",
      desc: "Я, ты, он, она и другие",
      colors: ["#9b7bff", "#c06cff", "#6c4ee0"],
      icon: "pronouns",
      lessons: [
        {
          id: "pron-1", title: "Я, ты, мы",
          words: [
            { en: "I", ru: "я" },
            { en: "you", ru: "ты, вы" },
            { en: "we", ru: "мы" },
            { en: "they", ru: "они" },
            { en: "and", ru: "и" }
          ],
          sentences: [
            { en: "You and I", ru: "Ты и я", alt: ["You and me"] },
            { en: "We are friends", ru: "Мы друзья" },
            { en: "They are here", ru: "Они здесь" }
          ]
        },
        {
          id: "pron-2", title: "Он, она, оно",
          words: [
            { en: "he", ru: "он" },
            { en: "she", ru: "она" },
            { en: "it", ru: "оно, это" },
            { en: "boy", ru: "мальчик", pic: "boy" },
            { en: "girl", ru: "девочка", pic: "girl" },
            { en: "man", ru: "мужчина", pic: "man" },
            { en: "woman", ru: "женщина", pic: "woman" }
          ],
          sentences: [
            { en: "He is a boy", ru: "Он мальчик" },
            { en: "She is a girl", ru: "Она девочка" },
            { en: "It is a cat", ru: "Это кошка" }
          ]
        },
        {
          id: "pron-3", title: "Мой, твой, его",
          words: [
            { en: "my", ru: "мой, моя" },
            { en: "your", ru: "твой, ваш" },
            { en: "his", ru: "его" },
            { en: "her", ru: "её" },
            { en: "our", ru: "наш" },
            { en: "their", ru: "их" }
          ],
          sentences: [
            { en: "This is my book", ru: "Это моя книга" },
            { en: "Her name is Kate", ru: "Её зовут Кейт" },
            { en: "His dog is big", ru: "Его собака большая" },
            { en: "Our house is small", ru: "Наш дом маленький" }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "tobe",
      title: "Глагол to be",
      desc: "am, is, are: быть, являться",
      colors: ["#ff9a3d", "#ffc83d", "#d8701a"],
      icon: "tobe",
      lessons: [
        {
          id: "be-1", title: "am, is, are",
          words: [
            { en: "am", ru: "есть (с I)" },
            { en: "is", ru: "есть (с he, she, it)" },
            { en: "are", ru: "есть (с you, we, they)" },
            { en: "happy", ru: "счастливый" },
            { en: "tired", ru: "уставший" },
            { en: "student", ru: "студент", pic: "student" }
          ],
          sentences: [
            { en: "I am happy", ru: "Я счастлив" },
            { en: "She is tired", ru: "Она устала" },
            { en: "We are students", ru: "Мы студенты" }
          ],
          gaps: [
            { text: "I ___ happy.", options: ["am", "is", "are"], answer: "am", ru: "Я счастлив." },
            { text: "He ___ a student.", options: ["am", "is", "are"], answer: "is", ru: "Он студент." },
            { text: "They ___ tired.", options: ["am", "is", "are"], answer: "are", ru: "Они устали." },
            { text: "You ___ my friend.", options: ["am", "is", "are"], answer: "are", ru: "Ты мой друг." }
          ]
        },
        {
          id: "be-2", title: "Отрицание: not",
          words: [
            { en: "not", ru: "не" },
            { en: "teacher", ru: "учитель", pic: "teacher" },
            { en: "doctor", ru: "врач", pic: "doctor" },
            { en: "hungry", ru: "голодный" },
            { en: "cold", ru: "холодный" },
            { en: "hot", ru: "горячий, жаркий" }
          ],
          sentences: [
            { en: "I am not a teacher", ru: "Я не учитель" },
            { en: "He is not hungry", ru: "Он не голоден" },
            { en: "It is not cold", ru: "Не холодно" },
            { en: "They are not doctors", ru: "Они не врачи" }
          ],
          gaps: [
            { text: "She ___ not a doctor.", options: ["am", "is", "are"], answer: "is", ru: "Она не врач." },
            { text: "We ___ not hungry.", options: ["am", "is", "are"], answer: "are", ru: "Мы не голодны." },
            { text: "I ___ not cold.", options: ["am", "is", "are"], answer: "am", ru: "Мне не холодно." }
          ]
        },
        {
          id: "be-3", title: "Вопросы с to be",
          words: [
            { en: "where", ru: "где" },
            { en: "home", ru: "дом (жилище)" },
            { en: "school", ru: "школа", pic: "school" },
            { en: "ready", ru: "готовый" },
            { en: "here", ru: "здесь" },
            { en: "there", ru: "там" }
          ],
          sentences: [
            { en: "Are you ready?", ru: "Ты готов?" },
            { en: "Is she at home?", ru: "Она дома?" },
            { en: "Where is the school?", ru: "Где школа?" },
            { en: "Is it hot there?", ru: "Там жарко?" }
          ],
          gaps: [
            { text: "___ you a student?", options: ["Am", "Is", "Are"], answer: "Are", ru: "Ты студент?" },
            { text: "___ he at school?", options: ["Am", "Is", "Are"], answer: "Is", ru: "Он в школе?" },
            { text: "Where ___ they?", options: ["am", "is", "are"], answer: "are", ru: "Где они?" }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "numbers",
      title: "Числа",
      desc: "Считаем от 1 до 100",
      colors: ["#ff6b81", "#ff8fa3", "#d63c57"],
      icon: "numbers",
      lessons: [
        {
          id: "num-1", title: "От 1 до 5",
          words: [
            { en: "one", ru: "один", pic: "n1" },
            { en: "two", ru: "два", pic: "n2" },
            { en: "three", ru: "три", pic: "n3" },
            { en: "four", ru: "четыре", pic: "n4" },
            { en: "five", ru: "пять", pic: "n5" },
            { en: "zero", ru: "ноль", pic: "n0" }
          ],
          sentences: [
            { en: "I have two cats", ru: "У меня две кошки" },
            { en: "One apple, please", ru: "Одно яблоко, пожалуйста" }
          ]
        },
        {
          id: "num-2", title: "От 6 до 12",
          words: [
            { en: "six", ru: "шесть", pic: "n6" },
            { en: "seven", ru: "семь", pic: "n7" },
            { en: "eight", ru: "восемь", pic: "n8" },
            { en: "nine", ru: "девять", pic: "n9" },
            { en: "ten", ru: "десять", pic: "n10" },
            { en: "eleven", ru: "одиннадцать", pic: "n11" },
            { en: "twelve", ru: "двенадцать", pic: "n12" }
          ],
          sentences: [
            { en: "I am ten", ru: "Мне десять лет" },
            { en: "She has seven books", ru: "У неё семь книг" }
          ]
        },
        {
          id: "num-3", title: "Десятки и сто",
          words: [
            { en: "twenty", ru: "двадцать", pic: "n20" },
            { en: "thirty", ru: "тридцать", pic: "n30" },
            { en: "forty", ru: "сорок", pic: "n40" },
            { en: "fifty", ru: "пятьдесят", pic: "n50" },
            { en: "a hundred", ru: "сто", pic: "n100", alt: ["one hundred", "hundred"] },
            { en: "how many", ru: "сколько" }
          ],
          sentences: [
            { en: "How many books?", ru: "Сколько книг?" },
            { en: "He is thirty", ru: "Ему тридцать лет" },
            { en: "My mother is fifty", ru: "Моей маме пятьдесят лет" }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "colors",
      title: "Цвета",
      desc: "Описываем мир в цвете",
      colors: ["#ff7ac8", "#9b7bff", "#c94a96"],
      icon: "colors",
      lessons: [
        {
          id: "col-1", title: "Основные цвета",
          words: [
            { en: "red", ru: "красный", pic: "c-red" },
            { en: "blue", ru: "синий", pic: "c-blue" },
            { en: "green", ru: "зелёный", pic: "c-green" },
            { en: "yellow", ru: "жёлтый", pic: "c-yellow" },
            { en: "black", ru: "чёрный", pic: "c-black" },
            { en: "white", ru: "белый", pic: "c-white" }
          ],
          sentences: [
            { en: "The sun is yellow", ru: "Солнце жёлтое" },
            { en: "My car is red", ru: "Моя машина красная" },
            { en: "The cat is black", ru: "Кошка чёрная" }
          ]
        },
        {
          id: "col-2", title: "Ещё цвета",
          words: [
            { en: "orange", ru: "оранжевый", pic: "c-orange" },
            { en: "pink", ru: "розовый", pic: "c-pink" },
            { en: "purple", ru: "фиолетовый", pic: "c-purple" },
            { en: "brown", ru: "коричневый", pic: "c-brown" },
            { en: "grey", ru: "серый", pic: "c-grey", alt: ["gray"] },
            { en: "color", ru: "цвет", alt: ["colour"] }
          ],
          sentences: [
            { en: "The dog is brown", ru: "Собака коричневая" },
            { en: "I like pink", ru: "Мне нравится розовый" },
            { en: "What color is it?", ru: "Какого это цвета?", alt: ["What colour is it?"] }
          ]
        },
        {
          id: "col-3", title: "Цвет и предметы",
          words: [
            { en: "sky", ru: "небо" },
            { en: "grass", ru: "трава" },
            { en: "flower", ru: "цветок", pic: "flower" },
            { en: "dark", ru: "тёмный" },
            { en: "light", ru: "светлый" },
            { en: "beautiful", ru: "красивый" }
          ],
          sentences: [
            { en: "The sky is blue", ru: "Небо голубое" },
            { en: "The grass is green", ru: "Трава зелёная" },
            { en: "A beautiful red flower", ru: "Красивый красный цветок" },
            { en: "Her bag is dark blue", ru: "Её сумка тёмно-синяя" }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "family",
      title: "Семья",
      desc: "Мама, папа и все родные",
      colors: ["#2dd4bf", "#3bb7f6", "#119e8c"],
      icon: "family",
      lessons: [
        {
          id: "fam-1", title: "Родители",
          words: [
            { en: "mother", ru: "мама", pic: "mother", alt: ["mom", "mum"] },
            { en: "father", ru: "папа", pic: "father", alt: ["dad"] },
            { en: "parents", ru: "родители" },
            { en: "family", ru: "семья", pic: "family" },
            { en: "baby", ru: "малыш", pic: "baby" },
            { en: "love", ru: "любить", pic: "love" }
          ],
          sentences: [
            { en: "This is my mother", ru: "Это моя мама" },
            { en: "My father is a doctor", ru: "Мой папа врач" },
            { en: "I love my family", ru: "Я люблю свою семью" }
          ]
        },
        {
          id: "fam-2", title: "Братья и сёстры",
          words: [
            { en: "brother", ru: "брат", pic: "boy" },
            { en: "sister", ru: "сестра", pic: "girl" },
            { en: "son", ru: "сын" },
            { en: "daughter", ru: "дочь" },
            { en: "children", ru: "дети" },
            { en: "old", ru: "старый, старший" },
            { en: "young", ru: "молодой, младший" }
          ],
          sentences: [
            { en: "I have a sister", ru: "У меня есть сестра" },
            { en: "My brother is young", ru: "Мой брат молодой" },
            { en: "They have two children", ru: "У них двое детей" }
          ]
        },
        {
          id: "fam-3", title: "Бабушки и дедушки",
          words: [
            { en: "grandmother", ru: "бабушка", pic: "grandmother", alt: ["grandma", "granny"] },
            { en: "grandfather", ru: "дедушка", pic: "grandfather", alt: ["grandpa"] },
            { en: "wife", ru: "жена" },
            { en: "husband", ru: "муж" },
            { en: "uncle", ru: "дядя" },
            { en: "aunt", ru: "тётя" }
          ],
          sentences: [
            { en: "My grandmother is kind", ru: "Моя бабушка добрая" },
            { en: "Her husband is a teacher", ru: "Её муж учитель" },
            { en: "We visit our grandfather", ru: "Мы навещаем нашего дедушку" }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "food",
      title: "Еда и напитки",
      desc: "Заказываем и угощаем",
      colors: ["#ff9a3d", "#ff6b81", "#d8701a"],
      icon: "food",
      lessons: [
        {
          id: "food-1", title: "Фрукты и хлеб",
          words: [
            { en: "apple", ru: "яблоко", pic: "apple" },
            { en: "banana", ru: "банан", pic: "banana" },
            { en: "bread", ru: "хлеб", pic: "bread" },
            { en: "cheese", ru: "сыр", pic: "cheese" },
            { en: "egg", ru: "яйцо", pic: "egg" },
            { en: "cake", ru: "торт", pic: "cake" }
          ],
          sentences: [
            { en: "I eat an apple", ru: "Я ем яблоко" },
            { en: "Bread and cheese", ru: "Хлеб и сыр" },
            { en: "The cake is sweet", ru: "Торт сладкий" }
          ]
        },
        {
          id: "food-2", title: "Напитки",
          words: [
            { en: "water", ru: "вода", pic: "water" },
            { en: "milk", ru: "молоко", pic: "milk" },
            { en: "coffee", ru: "кофе", pic: "coffee" },
            { en: "tea", ru: "чай", pic: "tea" },
            { en: "juice", ru: "сок", pic: "juice" },
            { en: "drink", ru: "пить" }
          ],
          sentences: [
            { en: "I drink coffee", ru: "Я пью кофе" },
            { en: "She drinks tea with milk", ru: "Она пьёт чай с молоком" },
            { en: "A glass of water, please", ru: "Стакан воды, пожалуйста" }
          ]
        },
        {
          id: "food-3", title: "Обед",
          words: [
            { en: "fish", ru: "рыба", pic: "fish" },
            { en: "meat", ru: "мясо", pic: "meat" },
            { en: "soup", ru: "суп", pic: "soup" },
            { en: "rice", ru: "рис", pic: "rice" },
            { en: "salad", ru: "салат", pic: "salad" },
            { en: "delicious", ru: "вкусный", alt: ["tasty"] }
          ],
          sentences: [
            { en: "The soup is hot", ru: "Суп горячий" },
            { en: "I like fish and rice", ru: "Я люблю рыбу и рис", alt: ["I love fish and rice"] },
            { en: "This salad is delicious", ru: "Этот салат вкусный", alt: ["This salad is tasty"] }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "time",
      title: "Время и даты",
      desc: "Дни недели, месяцы, часы",
      colors: ["#5b8cff", "#9b7bff", "#3a62d6"],
      icon: "time",
      lessons: [
        {
          id: "time-1", title: "Дни недели",
          words: [
            { en: "Monday", ru: "понедельник" },
            { en: "Tuesday", ru: "вторник" },
            { en: "Wednesday", ru: "среда" },
            { en: "Thursday", ru: "четверг" },
            { en: "Friday", ru: "пятница" },
            { en: "Saturday", ru: "суббота" },
            { en: "Sunday", ru: "воскресенье" }
          ],
          sentences: [
            { en: "Today is Monday", ru: "Сегодня понедельник" },
            { en: "I work on Friday", ru: "Я работаю в пятницу" }
          ]
        },
        {
          id: "time-2", title: "Сегодня и завтра",
          words: [
            { en: "today", ru: "сегодня" },
            { en: "tomorrow", ru: "завтра" },
            { en: "yesterday", ru: "вчера" },
            { en: "morning", ru: "утро" },
            { en: "evening", ru: "вечер" },
            { en: "week", ru: "неделя", pic: "schedule" },
            { en: "day", ru: "день" }
          ],
          sentences: [
            { en: "See you tomorrow", ru: "Увидимся завтра" },
            { en: "I am busy today", ru: "Я сегодня занят" },
            { en: "Every day", ru: "Каждый день" }
          ]
        },
        {
          id: "time-3", title: "Который час?",
          words: [
            { en: "time", ru: "время" },
            { en: "hour", ru: "час" },
            { en: "minute", ru: "минута" },
            { en: "o'clock", ru: "ровно (о времени)", pic: "clock3", alt: ["oclock"] },
            { en: "month", ru: "месяц", pic: "schedule" },
            { en: "year", ru: "год", pic: "schedule" }
          ],
          sentences: [
            { en: "What time is it?", ru: "Который час?" },
            { en: "It is three o'clock", ru: "Три часа" },
            { en: "I have ten minutes", ru: "У меня есть десять минут" }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "verbs",
      title: "Глаголы действия",
      desc: "Present Simple: я делаю",
      colors: ["#2ec4a6", "#5b8cff", "#16917a"],
      icon: "verbs",
      lessons: [
        {
          id: "verb-1", title: "Я делаю",
          words: [
            { en: "eat", ru: "есть (кушать)" },
            { en: "read", ru: "читать" },
            { en: "write", ru: "писать" },
            { en: "sleep", ru: "спать" },
            { en: "work", ru: "работать" },
            { en: "play", ru: "играть" }
          ],
          sentences: [
            { en: "I read books", ru: "Я читаю книги" },
            { en: "We play football", ru: "Мы играем в футбол" },
            { en: "They work every day", ru: "Они работают каждый день" }
          ]
        },
        {
          id: "verb-2", title: "Он делает: -s",
          words: [
            { en: "go", ru: "идти, ехать" },
            { en: "like", ru: "нравиться" },
            { en: "speak", ru: "говорить" },
            { en: "live", ru: "жить" },
            { en: "watch", ru: "смотреть" },
            { en: "every", ru: "каждый" }
          ],
          sentences: [
            { en: "She speaks English", ru: "Она говорит по-английски" },
            { en: "He lives in London", ru: "Он живёт в Лондоне" },
            { en: "My sister likes cats", ru: "Моя сестра любит кошек" }
          ],
          gaps: [
            { text: "She ___ English.", options: ["speak", "speaks", "speaking"], answer: "speaks", ru: "Она говорит по-английски." },
            { text: "I ___ in Moscow.", options: ["live", "lives", "living"], answer: "live", ru: "Я живу в Москве." },
            { text: "He ___ TV every evening.", options: ["watch", "watches", "watchs"], answer: "watches", ru: "Он смотрит телевизор каждый вечер." },
            { text: "They ___ to school.", options: ["go", "goes", "gos"], answer: "go", ru: "Они ходят в школу." }
          ]
        },
        {
          id: "verb-3", title: "Не делаю: don't",
          words: [
            { en: "don't", ru: "не (с I, you, we, they)", alt: ["do not"] },
            { en: "doesn't", ru: "не (с he, she, it)", alt: ["does not"] },
            { en: "music", ru: "музыка", pic: "music" },
            { en: "sport", ru: "спорт" },
            { en: "often", ru: "часто" },
            { en: "never", ru: "никогда" }
          ],
          sentences: [
            { en: "I don't like coffee", ru: "Я не люблю кофе" },
            { en: "He doesn't play sport", ru: "Он не занимается спортом" },
            { en: "We often listen to music", ru: "Мы часто слушаем музыку" }
          ],
          gaps: [
            { text: "I ___ eat meat.", options: ["don't", "doesn't", "not"], answer: "don't", ru: "Я не ем мясо." },
            { text: "She ___ like milk.", options: ["don't", "doesn't", "isn't"], answer: "doesn't", ru: "Она не любит молоко." },
            { text: "They ___ work on Sunday.", options: ["don't", "doesn't", "aren't"], answer: "don't", ru: "Они не работают в воскресенье." }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "questions",
      title: "Простые вопросы",
      desc: "Кто, что, где, когда",
      colors: ["#ffc83d", "#ff9a3d", "#d99a0b"],
      icon: "questions",
      lessons: [
        {
          id: "q-1", title: "Вопросительные слова",
          words: [
            { en: "what", ru: "что" },
            { en: "who", ru: "кто" },
            { en: "when", ru: "когда" },
            { en: "why", ru: "почему" },
            { en: "which", ru: "который, какой" },
            { en: "how old", ru: "сколько лет" }
          ],
          sentences: [
            { en: "What is your name?", ru: "Как тебя зовут?" },
            { en: "Who is she?", ru: "Кто она?" },
            { en: "How old are you?", ru: "Сколько тебе лет?" },
            { en: "Why are you sad?", ru: "Почему ты грустный?" }
          ]
        },
        {
          id: "q-2", title: "Do и does",
          words: [
            { en: "do", ru: "вспомогательный глагол (I, you, we, they)" },
            { en: "does", ru: "вспомогательный глагол (he, she, it)" },
            { en: "want", ru: "хотеть" },
            { en: "know", ru: "знать" },
            { en: "understand", ru: "понимать" },
            { en: "need", ru: "нуждаться" }
          ],
          sentences: [
            { en: "Do you speak English?", ru: "Ты говоришь по-английски?" },
            { en: "Does he like tea?", ru: "Он любит чай?" },
            { en: "Do you understand?", ru: "Ты понимаешь?" }
          ],
          gaps: [
            { text: "___ you want coffee?", options: ["Do", "Does", "Are"], answer: "Do", ru: "Ты хочешь кофе?" },
            { text: "___ she live here?", options: ["Do", "Does", "Is"], answer: "Does", ru: "Она живёт здесь?" },
            { text: "Where ___ they work?", options: ["do", "does", "are"], answer: "do", ru: "Где они работают?" }
          ]
        },
        {
          id: "q-3", title: "Короткие ответы",
          words: [
            { en: "yes, I do", ru: "да, люблю (на вопрос «Ты любишь кофе?»)" },
            { en: "no, I don't", ru: "нет, не люблю (на вопрос «Ты любишь кофе?»)", alt: ["no, i do not"] },
            { en: "maybe", ru: "может быть" },
            { en: "of course", ru: "конечно" },
            { en: "right", ru: "правильно, верно" },
            { en: "wrong", ru: "неправильно" }
          ],
          sentences: [
            { en: "Yes, she does", ru: "Да, любит (на вопрос «Она любит чай?»)" },
            { en: "No, he isn't", ru: "Нет, не устал (на вопрос «Он устал?»)", alt: ["No, he is not"] },
            { en: "Of course, I know", ru: "Конечно, я знаю" }
          ],
          gaps: [
            { text: "Do you like cats? Yes, I ___.", options: ["do", "does", "am"], answer: "do", ru: "Ты любишь кошек? Да." },
            { text: "Is he a doctor? No, he ___.", options: ["isn't", "doesn't", "don't"], answer: "isn't", ru: "Он врач? Нет." },
            { text: "Does she speak French? No, she ___.", options: ["doesn't", "don't", "isn't"], answer: "doesn't", ru: "Она говорит по-французски? Нет." }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "continuous",
      title: "Прямо сейчас",
      desc: "Present Continuous: я делаю сейчас",
      colors: ["#3bb7f6", "#2dd4bf", "#1b86c9"],
      icon: "continuous",
      lessons: [
        {
          id: "cont-1", title: "Я сейчас читаю",
          words: [
            { en: "now", ru: "сейчас" },
            { en: "reading", ru: "читаю (сейчас)" },
            { en: "cooking", ru: "готовлю (сейчас)" },
            { en: "running", ru: "бегу (сейчас)" },
            { en: "listening", ru: "слушаю (сейчас)" },
            { en: "at the moment", ru: "в данный момент" }
          ],
          sentences: [
            { en: "I am reading now", ru: "Я сейчас читаю" },
            { en: "She is cooking dinner", ru: "Она готовит ужин" },
            { en: "They are running in the park", ru: "Они бегают в парке" }
          ],
          gaps: [
            { text: "I am ___ a book now.", options: ["read", "reads", "reading"], answer: "reading", ru: "Я сейчас читаю книгу." },
            { text: "He ___ sleeping.", options: ["am", "is", "are"], answer: "is", ru: "Он спит." },
            { text: "We are ___ to music.", options: ["listen", "listening", "listens"], answer: "listening", ru: "Мы слушаем музыку." }
          ]
        },
        {
          id: "cont-2", title: "Что ты делаешь?",
          words: [
            { en: "doing", ru: "делаю (сейчас)" },
            { en: "waiting", ru: "жду (сейчас)" },
            { en: "studying", ru: "учусь (сейчас)" },
            { en: "wearing", ru: "ношу, одет в" },
            { en: "raining", ru: "идёт дождь" }
          ],
          sentences: [
            { en: "What are you doing?", ru: "Что ты делаешь?" },
            { en: "I am waiting for you", ru: "Я жду тебя" },
            { en: "It is raining", ru: "Идёт дождь" }
          ],
          gaps: [
            { text: "What ___ you doing?", options: ["is", "are", "do"], answer: "are", ru: "Что ты делаешь?" },
            { text: "It is ___ today.", options: ["rain", "rains", "raining"], answer: "raining", ru: "Сегодня идёт дождь." },
            { text: "She ___ studying English.", options: ["is", "are", "does"], answer: "is", ru: "Она изучает английский." }
          ]
        },
        {
          id: "cont-3", title: "Обычно или сейчас",
          words: [
            { en: "usually", ru: "обычно" },
            { en: "always", ru: "всегда" },
            { en: "sometimes", ru: "иногда" },
            { en: "right now", ru: "прямо сейчас" },
            { en: "today", ru: "сегодня" }
          ],
          sentences: [
            { en: "I usually drink tea", ru: "Я обычно пью чай" },
            { en: "Today I am drinking coffee", ru: "Сегодня я пью кофе" },
            { en: "He always walks to work", ru: "Он всегда ходит на работу пешком" }
          ],
          gaps: [
            { text: "She usually ___ at home.", options: ["work", "works", "is working"], answer: "works", ru: "Обычно она работает дома." },
            { text: "Look! The baby ___.", options: ["sleeps", "is sleeping", "sleep"], answer: "is sleeping", ru: "Смотри! Малыш спит." },
            { text: "I ___ TV right now.", options: ["watch", "am watching", "watches"], answer: "am watching", ru: "Я прямо сейчас смотрю телевизор." }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "past",
      title: "Прошедшее время",
      desc: "Past Simple: был, сделал",
      colors: ["#9b7bff", "#5b8cff", "#6c4ee0"],
      icon: "past",
      lessons: [
        {
          id: "past-1", title: "was и were",
          words: [
            { en: "was", ru: "был (I, he, she, it)" },
            { en: "were", ru: "были (you, we, they)" },
            { en: "last", ru: "прошлый" },
            { en: "ago", ru: "назад" },
            { en: "busy", ru: "занятый, занят" },
            { en: "sick", ru: "больной", alt: ["ill"] }
          ],
          sentences: [
            { en: "I was at home yesterday", ru: "Вчера я был дома" },
            { en: "They were busy", ru: "Они были заняты" },
            { en: "She was sick last week", ru: "Она болела на прошлой неделе" }
          ],
          gaps: [
            { text: "I ___ tired yesterday.", options: ["was", "were", "am"], answer: "was", ru: "Вчера я устал." },
            { text: "We ___ at school.", options: ["was", "were", "is"], answer: "were", ru: "Мы были в школе." },
            { text: "He ___ here two days ago.", options: ["was", "were", "is"], answer: "was", ru: "Он был здесь два дня назад." }
          ]
        },
        {
          id: "past-2", title: "Правильные глаголы: -ed",
          words: [
            { en: "played", ru: "играл" },
            { en: "worked", ru: "работал" },
            { en: "watched", ru: "смотрел" },
            { en: "cooked", ru: "готовил" },
            { en: "visited", ru: "навещал" },
            { en: "walked", ru: "гулял" }
          ],
          sentences: [
            { en: "I watched a film", ru: "Я посмотрел фильм" },
            { en: "We played tennis yesterday", ru: "Вчера мы играли в теннис" },
            { en: "She cooked dinner", ru: "Она приготовила ужин" }
          ],
          gaps: [
            { text: "Yesterday I ___ in the park.", options: ["walk", "walked", "walking"], answer: "walked", ru: "Вчера я гулял в парке." },
            { text: "They ___ their grandmother last week.", options: ["visit", "visited", "visits"], answer: "visited", ru: "Они навестили бабушку на прошлой неделе." },
            { text: "He ___ late last night.", options: ["work", "works", "worked"], answer: "worked", ru: "Он работал допоздна вчера вечером." }
          ]
        },
        {
          id: "past-3", title: "Неправильные глаголы",
          words: [
            { en: "went", ru: "пошёл, поехал" },
            { en: "saw", ru: "увидел" },
            { en: "ate", ru: "съел" },
            { en: "had", ru: "имел" },
            { en: "bought", ru: "купил" },
            { en: "did", ru: "сделал" }
          ],
          sentences: [
            { en: "I went to London", ru: "Я поехал в Лондон" },
            { en: "We saw a big dog", ru: "Мы видели большую собаку" },
            { en: "Did you eat breakfast?", ru: "Ты завтракал?", alt: ["Did you have breakfast?"] }
          ],
          gaps: [
            { text: "She ___ a new bag.", options: ["buyed", "bought", "buy"], answer: "bought", ru: "Она купила новую сумку." },
            { text: "We ___ to the sea last year.", options: ["go", "goed", "went"], answer: "went", ru: "В прошлом году мы ездили на море." },
            { text: "___ you see the film yesterday?", options: ["Do", "Did", "Was"], answer: "Did", ru: "Ты видел фильм вчера?" }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "phrases",
      title: "Повседневные фразы",
      desc: "Магазин, город, кафе",
      colors: ["#ff6b81", "#ff9a3d", "#d63c57"],
      icon: "phrases",
      lessons: [
        {
          id: "ph-1", title: "В кафе",
          words: [
            { en: "menu", ru: "меню", pic: "menu" },
            { en: "bill", ru: "счёт", pic: "bill", alt: ["check"] },
            { en: "table", ru: "столик, стол", pic: "table" },
            { en: "can I have", ru: "можно мне" },
            { en: "would like", ru: "хотел бы" }
          ],
          sentences: [
            { en: "Can I have the menu, please?", ru: "Можно мне меню, пожалуйста?" },
            { en: "I would like a coffee", ru: "Я бы хотел кофе" },
            { en: "The bill, please", ru: "Счёт, пожалуйста" }
          ]
        },
        {
          id: "ph-2", title: "В магазине",
          words: [
            { en: "shop", ru: "магазин", alt: ["store"] },
            { en: "price", ru: "цена", pic: "price" },
            { en: "cheap", ru: "дешёвый", pic: "price" },
            { en: "expensive", ru: "дорогой", pic: "price" },
            { en: "money", ru: "деньги", pic: "money" },
            { en: "buy", ru: "покупать" }
          ],
          sentences: [
            { en: "How much is it?", ru: "Сколько это стоит?" },
            { en: "It is too expensive", ru: "Это слишком дорого" },
            { en: "I want to buy this", ru: "Я хочу купить это" }
          ]
        },
        {
          id: "ph-3", title: "В городе",
          words: [
            { en: "station", ru: "вокзал, станция" },
            { en: "street", ru: "улица" },
            { en: "left", ru: "налево" },
            { en: "right", ru: "направо" },
            { en: "near", ru: "рядом" },
            { en: "far", ru: "далеко" }
          ],
          sentences: [
            { en: "Where is the station?", ru: "Где вокзал?" },
            { en: "Turn left", ru: "Поверните налево" },
            { en: "Is it far?", ru: "Это далеко?" },
            { en: "I don't understand", ru: "Я не понимаю" },
            { en: "Can you help me?", ru: "Вы можете мне помочь?" }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "weather",
      title: "Погода и природа",
      desc: "Солнце, дождь и времена года",
      colors: ["#3bb7f6", "#8fd3ff", "#1b86c9"],
      icon: "weather",
      lessons: [
        {
          id: "wea-1", title: "Какая погода?",
          words: [
            { en: "weather", ru: "погода" },
            { en: "sunny", ru: "солнечный", pic: "sun" },
            { en: "rain", ru: "дождь", pic: "rain" },
            { en: "snow", ru: "снег", pic: "snow" },
            { en: "cloud", ru: "облако", pic: "cloud" },
            { en: "wind", ru: "ветер", pic: "wind" },
            { en: "umbrella", ru: "зонт", pic: "umbrella" }
          ],
          sentences: [
            { en: "It is sunny today", ru: "Сегодня солнечно" },
            { en: "It is raining", ru: "Идёт дождь" },
            { en: "Take an umbrella", ru: "Возьми зонт" }
          ]
        },
        {
          id: "wea-2", title: "Тепло и холодно",
          words: [
            { en: "warm", ru: "тёплый" },
            { en: "cold", ru: "холодный" },
            { en: "hot", ru: "жаркий" },
            { en: "cool", ru: "прохладный" },
            { en: "temperature", ru: "температура" },
            { en: "degrees", ru: "градусы" }
          ],
          sentences: [
            { en: "It is cold outside", ru: "На улице холодно" },
            { en: "It is very hot in summer", ru: "Летом очень жарко" },
            { en: "What is the weather like?", ru: "Какая погода?" }
          ],
          gaps: [
            { text: "It ___ windy today.", options: ["is", "are", "am"], answer: "is", ru: "Сегодня ветрено." },
            { text: "It ___ snowing now.", options: ["is", "does", "are"], answer: "is", ru: "Сейчас идёт снег." }
          ]
        },
        {
          id: "wea-3", title: "Времена года",
          words: [
            { en: "spring", ru: "весна", pic: "spring" },
            { en: "summer", ru: "лето", pic: "summer" },
            { en: "autumn", ru: "осень", pic: "autumn", alt: ["fall"] },
            { en: "winter", ru: "зима", pic: "winter" },
            { en: "tree", ru: "дерево", pic: "tree" },
            { en: "sea", ru: "море", pic: "sea" }
          ],
          sentences: [
            { en: "I like summer", ru: "Мне нравится лето" },
            { en: "It snows in winter", ru: "Зимой идёт снег" },
            { en: "We go to the sea in summer", ru: "Летом мы ездим на море" }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "body",
      title: "Тело и здоровье",
      desc: "Части тела и самочувствие",
      colors: ["#ff8f6b", "#ffb547", "#d96a3a"],
      icon: "body",
      lessons: [
        {
          id: "body-1", title: "Лицо",
          words: [
            { en: "head", ru: "голова" },
            { en: "eye", ru: "глаз", pic: "eye" },
            { en: "ear", ru: "ухо", pic: "ear" },
            { en: "nose", ru: "нос" },
            { en: "mouth", ru: "рот", pic: "mouth" },
            { en: "hair", ru: "волосы" }
          ],
          sentences: [
            { en: "She has blue eyes", ru: "У неё голубые глаза" },
            { en: "He has short hair", ru: "У него короткие волосы" }
          ]
        },
        {
          id: "body-2", title: "Руки и ноги",
          words: [
            { en: "hand", ru: "рука (кисть)", pic: "hand" },
            { en: "arm", ru: "рука (от плеча)" },
            { en: "leg", ru: "нога" },
            { en: "foot", ru: "стопа" },
            { en: "finger", ru: "палец" },
            { en: "back", ru: "спина" }
          ],
          sentences: [
            { en: "Wash your hands", ru: "Помой руки" },
            { en: "My back hurts", ru: "У меня болит спина" }
          ],
          gaps: [
            { text: "I have two ___.", options: ["hand", "hands", "handes"], answer: "hands", ru: "У меня две руки." },
            { text: "My leg ___ now.", options: ["hurt", "hurts", "hurting"], answer: "hurts", ru: "У меня сейчас болит нога." }
          ]
        },
        {
          id: "body-3", title: "У врача",
          words: [
            { en: "ill", ru: "больной", alt: ["sick"] },
            { en: "headache", ru: "головная боль" },
            { en: "medicine", ru: "лекарство", pic: "medicine" },
            { en: "hospital", ru: "больница", pic: "hospital" },
            { en: "healthy", ru: "здоровый" },
            { en: "rest", ru: "отдых" }
          ],
          sentences: [
            { en: "I have a headache", ru: "У меня болит голова", alt: ["My head hurts"] },
            { en: "I feel better", ru: "Мне лучше" },
            { en: "You need to rest", ru: "Тебе нужно отдохнуть" }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "clothes",
      title: "Одежда",
      desc: "Что надеть и что купить",
      colors: ["#8f7bff", "#ff7ac8", "#6a55e0"],
      icon: "clothes",
      lessons: [
        {
          id: "clo-1", title: "Мой гардероб",
          words: [
            { en: "shirt", ru: "рубашка", pic: "shirt" },
            { en: "dress", ru: "платье", pic: "dress" },
            { en: "shoes", ru: "обувь", pic: "shoes" },
            { en: "hat", ru: "шляпа, шапка", pic: "hat" },
            { en: "jacket", ru: "куртка", pic: "jacket" },
            { en: "jeans", ru: "джинсы", pic: "jeans" }
          ],
          sentences: [
            { en: "I like your dress", ru: "Мне нравится твоё платье" },
            { en: "These shoes are new", ru: "Эти туфли новые" }
          ]
        },
        {
          id: "clo-2", title: "Что ты носишь?",
          words: [
            { en: "wear", ru: "носить (одежду)" },
            { en: "put on", ru: "надевать" },
            { en: "take off", ru: "снимать" },
            { en: "size", ru: "размер" },
            { en: "big", ru: "большой" },
            { en: "small", ru: "маленький" }
          ],
          sentences: [
            { en: "I am wearing a blue shirt", ru: "На мне синяя рубашка" },
            { en: "Put on your jacket", ru: "Надень куртку" },
            { en: "This hat is too big", ru: "Эта шапка слишком большая" }
          ],
          gaps: [
            { text: "She is ___ a red dress.", options: ["wear", "wears", "wearing"], answer: "wearing", ru: "На ней красное платье." },
            { text: "He usually ___ jeans.", options: ["wear", "wears", "wearing"], answer: "wears", ru: "Он обычно носит джинсы." }
          ]
        },
        {
          id: "clo-3", title: "Примерка",
          words: [
            { en: "try on", ru: "примерять" },
            { en: "fit", ru: "подходить по размеру" },
            { en: "color", ru: "цвет", alt: ["colour"] },
            { en: "cheap", ru: "дешёвый", pic: "price" },
            { en: "beautiful", ru: "красивый" }
          ],
          sentences: [
            { en: "Can I try it on?", ru: "Можно примерить?" },
            { en: "Do you have a bigger size?", ru: "У вас есть размер побольше?" },
            { en: "It fits well", ru: "Хорошо сидит" }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "home",
      title: "Дом и комната",
      desc: "There is и there are",
      colors: ["#2ec4a6", "#a3e635", "#16917a"],
      icon: "home",
      lessons: [
        {
          id: "home-1", title: "Комнаты",
          words: [
            { en: "kitchen", ru: "кухня", pic: "kitchen" },
            { en: "bedroom", ru: "спальня" },
            { en: "bathroom", ru: "ванная", pic: "bathroom" },
            { en: "living room", ru: "гостиная" },
            { en: "door", ru: "дверь", pic: "door" },
            { en: "window", ru: "окно", pic: "window" }
          ],
          sentences: [
            { en: "This is my bedroom", ru: "Это моя спальня" },
            { en: "Close the window, please", ru: "Закрой окно, пожалуйста" }
          ]
        },
        {
          id: "home-2", title: "Мебель",
          words: [
            { en: "bed", ru: "кровать", pic: "bed" },
            { en: "chair", ru: "стул", pic: "chair" },
            { en: "table", ru: "стол", pic: "table" },
            { en: "lamp", ru: "лампа", pic: "lamp" },
            { en: "sofa", ru: "диван", pic: "sofa" },
            { en: "shelf", ru: "полка" }
          ],
          sentences: [
            { en: "There is a lamp on the table", ru: "На столе есть лампа" },
            { en: "There are two chairs in the room", ru: "В комнате два стула" }
          ],
          gaps: [
            { text: "There ___ a bed in the room.", options: ["is", "are", "am"], answer: "is", ru: "В комнате есть кровать." },
            { text: "There ___ three windows.", options: ["is", "are", "be"], answer: "are", ru: "Там три окна." }
          ]
        },
        {
          id: "home-3", title: "Где это?",
          words: [
            { en: "on", ru: "на" },
            { en: "in", ru: "в" },
            { en: "under", ru: "под" },
            { en: "next to", ru: "рядом с" },
            { en: "behind", ru: "за, позади" },
            { en: "between", ru: "между" }
          ],
          sentences: [
            { en: "The cat is under the bed", ru: "Кошка под кроватью" },
            { en: "My bag is on the chair", ru: "Моя сумка на стуле" },
            { en: "Is there a shop near here?", ru: "Здесь рядом есть магазин?" }
          ],
          gaps: [
            { text: "The book is ___ the table.", options: ["on", "at", "of"], answer: "on", ru: "Книга на столе." },
            { text: "___ there a park near here?", options: ["Is", "Are", "Do"], answer: "Is", ru: "Здесь рядом есть парк?" }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "skills",
      title: "Работа и умения",
      desc: "Профессии и глагол can",
      colors: ["#5b8cff", "#2ec4a6", "#3a62d6"],
      icon: "skills",
      lessons: [
        {
          id: "job-1", title: "Профессии",
          words: [
            { en: "job", ru: "работа" },
            { en: "driver", ru: "водитель", pic: "driver" },
            { en: "cook", ru: "повар", pic: "cook" },
            { en: "nurse", ru: "медсестра", pic: "nurse" },
            { en: "engineer", ru: "инженер", pic: "engineer" },
            { en: "artist", ru: "художник", pic: "artist" }
          ],
          sentences: [
            { en: "What is your job?", ru: "Кем ты работаешь?", alt: ["What do you do?"] },
            { en: "My mother is a nurse", ru: "Моя мама медсестра" },
            { en: "I want to be an engineer", ru: "Я хочу быть инженером" }
          ]
        },
        {
          id: "job-2", title: "Я умею: can",
          words: [
            { en: "can", ru: "уметь, мочь" },
            { en: "can't", ru: "не уметь, не мочь", alt: ["cannot"] },
            { en: "swim", ru: "плавать" },
            { en: "sing", ru: "петь", pic: "sing" },
            { en: "dance", ru: "танцевать" },
            { en: "drive", ru: "водить машину" }
          ],
          sentences: [
            { en: "I can swim", ru: "Я умею плавать" },
            { en: "She can't drive", ru: "Она не умеет водить" },
            { en: "Can you sing?", ru: "Ты умеешь петь?" }
          ],
          gaps: [
            { text: "He ___ play the guitar.", options: ["can", "cans", "is can"], answer: "can", ru: "Он умеет играть на гитаре." },
            { text: "___ you help me?", options: ["Can", "Do", "Are"], answer: "Can", ru: "Ты можешь мне помочь?" }
          ]
        },
        {
          id: "job-3", title: "Хобби",
          words: [
            { en: "hobby", ru: "хобби" },
            { en: "free time", ru: "свободное время" },
            { en: "draw", ru: "рисовать", pic: "draw" },
            { en: "cook", ru: "готовить", pic: "cook" },
            { en: "travel", ru: "путешествовать" },
            { en: "photo", ru: "фотография", pic: "photo" }
          ],
          sentences: [
            { en: "What do you do in your free time?", ru: "Чем ты занимаешься в свободное время?" },
            { en: "I like to draw", ru: "Я люблю рисовать" },
            { en: "My hobby is cooking", ru: "Моё хобби - готовка" }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "future",
      title: "Планы на будущее",
      desc: "will и going to",
      colors: ["#ff6b4a", "#ffb547", "#d94a2a"],
      icon: "future",
      lessons: [
        {
          id: "fut-1", title: "Я сделаю: will",
          words: [
            { en: "will", ru: "буду (будущее время)" },
            { en: "won't", ru: "не буду", alt: ["will not"] },
            { en: "soon", ru: "скоро" },
            { en: "later", ru: "позже" },
            { en: "next", ru: "следующий" },
            { en: "call", ru: "звонить", pic: "call" }
          ],
          sentences: [
            { en: "I will call you later", ru: "Я позвоню тебе позже" },
            { en: "It will be sunny tomorrow", ru: "Завтра будет солнечно" },
            { en: "She won't come", ru: "Она не придёт" }
          ],
          gaps: [
            { text: "I ___ help you.", options: ["will", "am", "was"], answer: "will", ru: "Я помогу тебе." },
            { text: "They ___ come today, they are busy.", options: ["will", "won't", "don't"], answer: "won't", ru: "Они не придут сегодня, они заняты." }
          ]
        },
        {
          id: "fut-2", title: "Мои планы: going to",
          words: [
            { en: "going to", ru: "собираюсь" },
            { en: "travel", ru: "путешествовать" },
            { en: "learn", ru: "учить, изучать" },
            { en: "plan", ru: "план" },
            { en: "holiday", ru: "отпуск, каникулы", alt: ["vacation"] },
            { en: "summer", ru: "лето", pic: "summer" }
          ],
          sentences: [
            { en: "I am going to learn English", ru: "Я собираюсь учить английский" },
            { en: "We are going to travel next summer", ru: "Мы собираемся путешествовать следующим летом" },
            { en: "What are you going to do?", ru: "Что ты собираешься делать?" }
          ],
          gaps: [
            { text: "She is ___ to visit Paris.", options: ["go", "going", "goes"], answer: "going", ru: "Она собирается посетить Париж." },
            { text: "We ___ going to buy a car.", options: ["is", "are", "am"], answer: "are", ru: "Мы собираемся купить машину." }
          ]
        },
        {
          id: "fut-3", title: "Итоговое повторение",
          words: [
            { en: "dream", ru: "мечта" },
            { en: "world", ru: "мир", pic: "world" },
            { en: "English", ru: "английский язык" },
            { en: "practice", ru: "практика", alt: ["practise"] },
            { en: "every day", ru: "каждый день" },
            { en: "proud", ru: "гордый" }
          ],
          sentences: [
            { en: "I speak English every day", ru: "Я говорю по-английски каждый день" },
            { en: "Yesterday I was tired", ru: "Вчера я был уставшим" },
            { en: "Now I am learning", ru: "Сейчас я учусь" },
            { en: "Tomorrow I will travel", ru: "Завтра я буду путешествовать" }
          ],
          gaps: [
            { text: "Yesterday she ___ a cake.", options: ["bakes", "baked", "will bake"], answer: "baked", ru: "Вчера она испекла торт." },
            { text: "Every day he ___ to work.", options: ["goes", "gone", "is going"], answer: "goes", ru: "Каждый день он ходит на работу." },
            { text: "Next year I ___ in London.", options: ["live", "lived", "will live"], answer: "will live", ru: "В следующем году я буду жить в Лондоне." }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "compare",
      title: "Сравнения",
      desc: "bigger, more beautiful, the best",
      colors: ["#ff9a3d", "#ff6b81", "#d8701a"],
      icon: "compare",
      lessons: [
        {
          id: "cmp-1", title: "Больше и меньше",
          words: [
            { en: "bigger", ru: "больше" },
            { en: "smaller", ru: "меньше" },
            { en: "taller", ru: "выше (ростом)" },
            { en: "faster", ru: "быстрее" },
            { en: "older", ru: "старше" },
            { en: "than", ru: "чем" }
          ],
          sentences: [
            { en: "My brother is taller than me", ru: "Мой брат выше меня" },
            { en: "A car is faster than a bike", ru: "Машина быстрее велосипеда" },
            { en: "This house is bigger than that one", ru: "Этот дом больше, чем тот" }
          ],
          gaps: [
            { text: "The sun is ___ than the moon.", options: ["big", "bigger", "biggest"], answer: "bigger", ru: "Солнце больше Луны." },
            { text: "Tom is older ___ Anna.", options: ["than", "then", "that"], answer: "than", ru: "Том старше Анны." }
          ]
        },
        {
          id: "cmp-2", title: "More и less",
          words: [
            { en: "more", ru: "более, больше" },
            { en: "less", ru: "менее, меньше" },
            { en: "interesting", ru: "интересный" },
            { en: "expensive", ru: "дорогой", pic: "price" },
            { en: "difficult", ru: "трудный" },
            { en: "important", ru: "важный" }
          ],
          sentences: [
            { en: "This book is more interesting", ru: "Эта книга интереснее" },
            { en: "English is less difficult than Chinese", ru: "Английский менее трудный, чем китайский" },
            { en: "Health is more important than money", ru: "Здоровье важнее денег" }
          ],
          gaps: [
            { text: "This bag is ___ expensive than that one.", options: ["more", "most", "much"], answer: "more", ru: "Эта сумка дороже той." },
            { text: "Math is ___ than music for me.", options: ["more difficult", "difficulter", "most difficult"], answer: "more difficult", ru: "Для меня математика труднее музыки." }
          ]
        },
        {
          id: "cmp-3", title: "Самый лучший",
          words: [
            { en: "the best", ru: "самый лучший" },
            { en: "the worst", ru: "самый худший" },
            { en: "better", ru: "лучше" },
            { en: "worse", ru: "хуже" },
            { en: "the biggest", ru: "самый большой" },
            { en: "favorite", ru: "любимый", alt: ["favourite"] }
          ],
          sentences: [
            { en: "This is the best day", ru: "Это самый лучший день" },
            { en: "Today is better than yesterday", ru: "Сегодня лучше, чем вчера" },
            { en: "What is your favorite color?", ru: "Какой твой любимый цвет?", alt: ["What is your favourite colour?"] }
          ],
          gaps: [
            { text: "She is the ___ student in the class.", options: ["good", "better", "best"], answer: "best", ru: "Она лучшая ученица в классе." },
            { text: "My cold is ___ today than yesterday.", options: ["bad", "worse", "worst"], answer: "worse", ru: "Сегодня моя простуда хуже, чем вчера." }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "modals",
      title: "Нужно и следует",
      desc: "must, have to, should",
      colors: ["#8f7bff", "#5b8cff", "#6a55e0"],
      icon: "modals",
      lessons: [
        {
          id: "mod-1", title: "Must и mustn't",
          words: [
            { en: "must", ru: "должен (обязан)" },
            { en: "mustn't", ru: "нельзя", alt: ["must not"] },
            { en: "rule", ru: "правило" },
            { en: "quiet", ru: "тихий" },
            { en: "smoke", ru: "курить" },
            { en: "wear", ru: "носить" }
          ],
          sentences: [
            { en: "You must be quiet", ru: "Ты должен вести себя тихо" },
            { en: "You mustn't smoke here", ru: "Здесь нельзя курить" },
            { en: "I must go now", ru: "Мне нужно идти сейчас", alt: ["I have to go now"] }
          ],
          gaps: [
            { text: "You ___ stop at a red light.", options: ["must", "mustn't", "can't"], answer: "must", ru: "Ты обязан остановиться на красный свет." },
            { text: "Children ___ play with fire.", options: ["must", "mustn't", "should"], answer: "mustn't", ru: "Детям нельзя играть с огнём." }
          ]
        },
        {
          id: "mod-2", title: "Have to",
          words: [
            { en: "have to", ru: "приходится, нужно" },
            { en: "has to", ru: "приходится (он, она)" },
            { en: "don't have to", ru: "не нужно", alt: ["do not have to"] },
            { en: "early", ru: "рано" },
            { en: "uniform", ru: "форма (одежда)" },
            { en: "homework", ru: "домашнее задание", pic: "homework" }
          ],
          sentences: [
            { en: "I have to get up early", ru: "Мне приходится рано вставать" },
            { en: "She has to work on Saturday", ru: "Ей приходится работать в субботу" },
            { en: "You don't have to pay", ru: "Тебе не нужно платить" }
          ],
          gaps: [
            { text: "He ___ to wear a uniform.", options: ["have", "has", "having"], answer: "has", ru: "Ему нужно носить форму." },
            { text: "We ___ have to hurry, we have time.", options: ["don't", "doesn't", "mustn't"], answer: "don't", ru: "Нам не нужно спешить, у нас есть время." }
          ]
        },
        {
          id: "mod-3", title: "Should: советы",
          words: [
            { en: "should", ru: "следует, стоит" },
            { en: "shouldn't", ru: "не следует", alt: ["should not"] },
            { en: "advice", ru: "совет" },
            { en: "doctor", ru: "врач", pic: "doctor" },
            { en: "sleep", ru: "спать" },
            { en: "sugar", ru: "сахар", pic: "sugar" }
          ],
          sentences: [
            { en: "You should see a doctor", ru: "Тебе стоит сходить к врачу" },
            { en: "You shouldn't eat so much sugar", ru: "Тебе не стоит есть так много сахара" },
            { en: "What should I do?", ru: "Что мне делать?" }
          ],
          gaps: [
            { text: "You look tired. You ___ sleep more.", options: ["should", "shouldn't", "mustn't"], answer: "should", ru: "Ты выглядишь уставшим. Тебе стоит больше спать." },
            { text: "It's cold. You ___ go out without a jacket.", options: ["should", "shouldn't", "have to"], answer: "shouldn't", ru: "Холодно. Не стоит выходить без куртки." }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "pastcont",
      title: "Что ты делал тогда?",
      desc: "Past Continuous: я делал",
      colors: ["#2ec4a6", "#5b8cff", "#16917a"],
      icon: "pastcont",
      lessons: [
        {
          id: "pc-1", title: "Я делал в тот момент",
          words: [
            { en: "was reading", ru: "читал (в тот момент)" },
            { en: "were playing", ru: "играли (в тот момент)" },
            { en: "at that time", ru: "в то время" },
            { en: "at 5 o'clock", ru: "в 5 часов", alt: ["at five o'clock"] },
            { en: "all evening", ru: "весь вечер" }
          ],
          sentences: [
            { en: "I was reading at 5 o'clock", ru: "В 5 часов я читал" },
            { en: "They were playing football", ru: "Они играли в футбол" },
            { en: "She was cooking all evening", ru: "Она готовила весь вечер" }
          ],
          gaps: [
            { text: "I ___ watching TV at 8 o'clock.", options: ["was", "were", "am"], answer: "was", ru: "В 8 часов я смотрел телевизор." },
            { text: "We ___ sleeping when you called.", options: ["was", "were", "are"], answer: "were", ru: "Мы спали, когда ты позвонил." }
          ]
        },
        {
          id: "pc-2", title: "Когда вдруг...",
          words: [
            { en: "when", ru: "когда" },
            { en: "while", ru: "пока, в то время как" },
            { en: "suddenly", ru: "вдруг" },
            { en: "rang", ru: "зазвонил" },
            { en: "fell", ru: "упал" },
            { en: "met", ru: "встретил" }
          ],
          sentences: [
            { en: "I was walking when it started to rain", ru: "Я гулял, когда начался дождь" },
            { en: "The phone rang while I was sleeping", ru: "Телефон зазвонил, пока я спал" },
            { en: "I met him while I was shopping", ru: "Я встретил его, пока ходил по магазинам" }
          ],
          gaps: [
            { text: "She was cooking when the phone ___.", options: ["rang", "ringed", "rings"], answer: "rang", ru: "Она готовила, когда зазвонил телефон." },
            { text: "While I ___ driving, I saw a deer.", options: ["was", "were", "did"], answer: "was", ru: "Пока я вёл машину, я увидел оленя." }
          ]
        },
        {
          id: "pc-3", title: "Рассказ о вчера",
          words: [
            { en: "yesterday evening", ru: "вчера вечером" },
            { en: "shining", ru: "светило (о солнце)" },
            { en: "laughing", ru: "смеялись" },
            { en: "waiting for", ru: "ждал (кого-то)" },
            { en: "bus stop", ru: "остановка" }
          ],
          sentences: [
            { en: "The sun was shining", ru: "Светило солнце" },
            { en: "Everyone was laughing", ru: "Все смеялись" },
            { en: "I was waiting for the bus", ru: "Я ждал автобус" }
          ],
          story: {
            en: "Yesterday evening I was waiting for the bus. It was raining and everyone was cold. Suddenly my friend Max called me. He was driving home and he took me with him.",
            ru: "Вчера вечером я ждал автобус. Шёл дождь, и всем было холодно. Вдруг мне позвонил мой друг Макс. Он ехал домой и подвёз меня.",
            questions: [
              { q: "Что делал рассказчик вчера вечером?", options: ["Ждал автобус", "Ехал домой", "Гулял в парке"], answer: "Ждал автобус" },
              { q: "Какая была погода?", options: ["Шёл дождь", "Светило солнце", "Шёл снег"], answer: "Шёл дождь" },
              { q: "Кто позвонил?", options: ["Друг Макс", "Мама", "Водитель автобуса"], answer: "Друг Макс" }
            ]
          }
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "perfect",
      title: "Уже сделал",
      desc: "Present Perfect: have done",
      colors: ["#ff6b4a", "#8f7bff", "#d94a2a"],
      icon: "perfect",
      lessons: [
        {
          id: "pp-1", title: "Я уже сделал",
          words: [
            { en: "have done", ru: "сделал (уже)" },
            { en: "has finished", ru: "закончил (уже, он)" },
            { en: "already", ru: "уже" },
            { en: "just", ru: "только что" },
            { en: "lost", ru: "потерял" },
            { en: "found", ru: "нашёл" }
          ],
          sentences: [
            { en: "I have already done my homework", ru: "Я уже сделал домашнее задание" },
            { en: "She has just finished work", ru: "Она только что закончила работу" },
            { en: "I have lost my keys", ru: "Я потерял ключи" }
          ],
          gaps: [
            { text: "I ___ just eaten.", options: ["have", "has", "am"], answer: "have", ru: "Я только что поел." },
            { text: "He ___ already left.", options: ["have", "has", "is"], answer: "has", ru: "Он уже ушёл." }
          ]
        },
        {
          id: "pp-2", title: "Ты когда-нибудь...?",
          words: [
            { en: "ever", ru: "когда-нибудь" },
            { en: "never", ru: "никогда" },
            { en: "been to", ru: "бывал в" },
            { en: "seen", ru: "видел" },
            { en: "tried", ru: "пробовал" },
            { en: "abroad", ru: "за границей", pic: "world" }
          ],
          sentences: [
            { en: "Have you ever been to London?", ru: "Ты когда-нибудь был в Лондоне?" },
            { en: "I have never seen snow", ru: "Я никогда не видел снег" },
            { en: "Have you tried sushi?", ru: "Ты пробовал суши?", alt: ["Have you ever tried sushi?"] }
          ],
          gaps: [
            { text: "Have you ___ been to Paris?", options: ["ever", "since", "yet"], answer: "ever", ru: "Ты когда-нибудь был в Париже?" },
            { text: "She has ___ flown on a plane.", options: ["ever", "never", "already ever"], answer: "never", ru: "Она никогда не летала на самолёте." }
          ]
        },
        {
          id: "pp-3", title: "Yet, for и since",
          words: [
            { en: "yet", ru: "ещё (в вопросах и отрицаниях)" },
            { en: "for", ru: "в течение" },
            { en: "since", ru: "с (какого-то момента)" },
            { en: "known", ru: "знал, знаком" },
            { en: "lived", ru: "жил" },
            { en: "years", ru: "годы, лет" }
          ],
          sentences: [
            { en: "I haven't finished yet", ru: "Я ещё не закончил" },
            { en: "I have known him for ten years", ru: "Я знаю его десять лет" },
            { en: "We have lived here since 2020", ru: "Мы живём здесь с 2020 года" }
          ],
          gaps: [
            { text: "Have you finished ___?", options: ["yet", "for", "since"], answer: "yet", ru: "Ты уже закончил?" },
            { text: "She has worked here ___ 2019.", options: ["for", "since", "yet"], answer: "since", ru: "Она работает здесь с 2019 года." }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "travel",
      title: "Путешествия",
      desc: "Аэропорт, отель, дорога",
      colors: ["#3bb7f6", "#2ec4a6", "#1b86c9"],
      icon: "travel",
      lessons: [
        {
          id: "tr-1", title: "В аэропорту",
          words: [
            { en: "airport", ru: "аэропорт", pic: "airport" },
            { en: "passport", ru: "паспорт", pic: "passport" },
            { en: "ticket", ru: "билет", pic: "ticket" },
            { en: "flight", ru: "рейс, полёт", pic: "airport" },
            { en: "luggage", ru: "багаж", pic: "luggage" },
            { en: "gate", ru: "выход на посадку" }
          ],
          sentences: [
            { en: "Here is my passport", ru: "Вот мой паспорт" },
            { en: "My flight is at six", ru: "Мой рейс в шесть" },
            { en: "Where is gate five?", ru: "Где выход номер пять?" }
          ],
          dialogs: [
            {
              title: "Регистрация на рейс",
              lines: [
                { who: "Сотрудник", en: "Good morning! Can I see your passport, please?", ru: "Доброе утро! Можно ваш паспорт?" },
                { me: true, en: "Yes, here it is.", ru: "Да, вот он.", wrong: ["Yes, here is it.", "No, I don't have any luggage."] },
                { who: "Сотрудник", en: "Do you have any luggage?", ru: "У вас есть багаж?" },
                { me: true, en: "Yes, one bag.", ru: "Да, одна сумка.", wrong: ["Yes, one bags.", "Gate number five, please."] },
                { who: "Сотрудник", en: "Your gate is number five. Have a nice flight!", ru: "Ваш выход номер пять. Хорошего полёта!" },
                { me: true, en: "Thank you very much!", ru: "Большое спасибо!", wrong: ["You're welcome!", "Nice to meet you!"] }
              ]
            }
          ]
        },
        {
          id: "tr-2", title: "В отеле",
          words: [
            { en: "hotel", ru: "отель", pic: "hotel" },
            { en: "room", ru: "номер, комната" },
            { en: "reservation", ru: "бронь", alt: ["booking"] },
            { en: "key", ru: "ключ", pic: "key" },
            { en: "floor", ru: "этаж" },
            { en: "breakfast", ru: "завтрак", pic: "breakfast" }
          ],
          sentences: [
            { en: "I have a reservation", ru: "У меня есть бронь" },
            { en: "Your room is on the third floor", ru: "Ваш номер на третьем этаже" },
            { en: "What time is breakfast?", ru: "Во сколько завтрак?" }
          ],
          dialogs: [
            {
              title: "Заселение в отель",
              lines: [
                { who: "Администратор", en: "Hello! How can I help you?", ru: "Здравствуйте! Чем могу помочь?" },
                { me: true, en: "Hi! I have a reservation.", ru: "Здравствуйте! У меня есть бронь.", wrong: ["Hi! I has a reservation.", "I'm fine, thank you."] },
                { who: "Администратор", en: "What is your name?", ru: "Как вас зовут?" },
                { me: true, en: "My name is Alex Smirnov.", ru: "Меня зовут Алекс Смирнов.", wrong: ["I am from Russia.", "My name are Alex Smirnov."] },
                { who: "Администратор", en: "Here is your key. Room 305.", ru: "Вот ваш ключ. Номер 305." },
                { me: true, en: "What time is breakfast?", ru: "Во сколько завтрак?", wrong: ["What time breakfast is?", "Where is my key?"] }
              ]
            }
          ]
        },
        {
          id: "tr-3", title: "Как пройти?",
          words: [
            { en: "map", ru: "карта", pic: "map" },
            { en: "straight on", ru: "прямо", alt: ["straight ahead"] },
            { en: "corner", ru: "угол" },
            { en: "bridge", ru: "мост", pic: "bridge" },
            { en: "museum", ru: "музей", pic: "museum" },
            { en: "lost", ru: "потерявшийся" }
          ],
          sentences: [
            { en: "How do I get to the museum?", ru: "Как добраться до музея?" },
            { en: "Go straight on", ru: "Идите прямо" },
            { en: "I am lost", ru: "Я заблудился" }
          ],
          story: {
            en: "Anna is in Rome for the first time. She wants to see a museum, but she is lost. She asks a man for help. He says: go straight on, then turn left at the corner. The museum is next to a small bridge.",
            ru: "Анна впервые в Риме. Она хочет посмотреть музей, но заблудилась. Она просит мужчину о помощи. Он говорит: идите прямо, потом поверните налево на углу. Музей рядом с маленьким мостом.",
            questions: [
              { q: "Что хочет посмотреть Анна?", options: ["Музей", "Мост", "Отель"], answer: "Музей" },
              { q: "Куда нужно повернуть на углу?", options: ["Налево", "Направо", "Никуда"], answer: "Налево" },
              { q: "Что рядом с музеем?", options: ["Маленький мост", "Вокзал", "Парк"], answer: "Маленький мост" }
            ]
          }
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "talk",
      title: "Разговоры",
      desc: "Ресторан, телефон, приглашения",
      colors: ["#ff7ac8", "#ffb547", "#c94a96"],
      icon: "talk",
      lessons: [
        {
          id: "tk-1", title: "В ресторане",
          words: [
            { en: "waiter", ru: "официант" },
            { en: "order", ru: "заказывать" },
            { en: "dessert", ru: "десерт", pic: "dessert" },
            { en: "spicy", ru: "острый" },
            { en: "tip", ru: "чаевые" },
            { en: "vegetarian", ru: "вегетарианский" }
          ],
          sentences: [
            { en: "Are you ready to order?", ru: "Вы готовы сделать заказ?" },
            { en: "Is it spicy?", ru: "Это острое?" },
            { en: "Can we have the bill, please?", ru: "Можно счёт, пожалуйста?" }
          ],
          dialogs: [
            {
              title: "Заказ в ресторане",
              lines: [
                { who: "Официант", en: "Good evening! Are you ready to order?", ru: "Добрый вечер! Готовы сделать заказ?" },
                { me: true, en: "Yes, I would like the fish, please.", ru: "Да, я бы хотел рыбу, пожалуйста.", wrong: ["Yes, I like fish, please.", "No, I'd like the bill, please."] },
                { who: "Официант", en: "Anything to drink?", ru: "Что-нибудь выпить?" },
                { me: true, en: "A glass of water, please.", ru: "Стакан воды, пожалуйста.", wrong: ["A piece of water, please.", "Some fish, please."] },
                { who: "Официант", en: "Would you like a dessert?", ru: "Хотите десерт?" },
                { me: true, en: "No, thank you. Can I have the bill?", ru: "Нет, спасибо. Можно счёт?", wrong: ["No, thanks. Can I has the bill?", "Yes, a glass of water, please."] }
              ]
            }
          ]
        },
        {
          id: "tk-2", title: "По телефону",
          words: [
            { en: "call back", ru: "перезвонить", pic: "call" },
            { en: "speaking", ru: "у телефона (я)" },
            { en: "message", ru: "сообщение", pic: "call" },
            { en: "hold on", ru: "подождите (на линии)" },
            { en: "busy", ru: "занят" },
            { en: "number", ru: "номер", pic: "call" }
          ],
          sentences: [
            { en: "Can I speak to Mary, please?", ru: "Можно поговорить с Мэри?" },
            { en: "Hold on, please", ru: "Подождите, пожалуйста" },
            { en: "Can I leave a message?", ru: "Можно оставить сообщение?" }
          ],
          dialogs: [
            {
              title: "Звонок другу",
              lines: [
                { who: "Голос", en: "Hello, this is Mary speaking.", ru: "Алло, это Мэри." },
                { me: true, en: "Hi Mary! It's Tom. How are you?", ru: "Привет, Мэри! Это Том. Как дела?", wrong: ["Hi Mary! I am is Tom. How are you?", "Hello! Who is speaking?"] },
                { who: "Мэри", en: "I'm fine, but I'm busy now. Can I call you back?", ru: "Нормально, но я сейчас занята. Можно я перезвоню?" },
                { me: true, en: "Sure, no problem. Talk later!", ru: "Конечно, без проблем. Поговорим позже!", wrong: ["Sure, no problem. Talk yesterday!", "Great, let's talk now then!"] }
              ]
            }
          ]
        },
        {
          id: "tk-3", title: "Приглашения",
          words: [
            { en: "invite", ru: "приглашать" },
            { en: "party", ru: "вечеринка", pic: "party" },
            { en: "birthday", ru: "день рождения", pic: "birthday" },
            { en: "would you like", ru: "не хотите ли" },
            { en: "I'd love to", ru: "с удовольствием", alt: ["i would love to"] },
            { en: "maybe next time", ru: "может, в другой раз" }
          ],
          sentences: [
            { en: "Would you like to come to my party?", ru: "Хочешь прийти на мою вечеринку?" },
            { en: "I'd love to!", ru: "С удовольствием!" },
            { en: "Sorry, I can't. Maybe next time", ru: "Извини, не могу. Может, в другой раз" }
          ],
          dialogs: [
            {
              title: "Приглашение на день рождения",
              lines: [
                { who: "Кейт", en: "Hi! It's my birthday on Saturday.", ru: "Привет! В субботу мой день рождения." },
                { me: true, en: "Happy birthday! How old will you be?", ru: "С днём рождения! Сколько тебе исполнится?", wrong: ["Happy birthday! How old are you be?", "Merry Christmas! See you on Saturday."] },
                { who: "Кейт", en: "Twenty! Would you like to come to my party?", ru: "Двадцать! Хочешь прийти на мою вечеринку?" },
                { me: true, en: "I'd love to! What time?", ru: "С удовольствием! Во сколько?", wrong: ["I'd love! What time?", "Yes, I'm twenty too."] }
              ]
            }
          ],
          story: {
            en: "Kate invited all her friends to her birthday party. Tom brought a big cake and Mary brought flowers. They danced and sang until midnight. Kate said it was the best birthday ever.",
            ru: "Кейт пригласила всех друзей на свой день рождения. Том принёс большой торт, а Мэри принесла цветы. Они танцевали и пели до полуночи. Кейт сказала, что это был лучший день рождения в её жизни.",
            questions: [
              { q: "Что принёс Том?", options: ["Большой торт", "Цветы", "Подарок"], answer: "Большой торт" },
              { q: "До какого времени длилась вечеринка?", options: ["До полуночи", "До утра", "До шести вечера"], answer: "До полуночи" },
              { q: "Как Кейт назвала этот день?", options: ["Лучший день рождения", "Скучный вечер", "Обычный день"], answer: "Лучший день рождения" }
            ]
          }
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "cond",
      title: "Если бы...",
      desc: "Условные предложения с if",
      colors: ["#5b8cff", "#ff8f6b", "#3a62d6"],
      icon: "cond",
      lessons: [
        {
          id: "if-1", title: "Если пойдёт дождь",
          words: [
            { en: "if", ru: "если" },
            { en: "unless", ru: "если не" },
            { en: "stay at home", ru: "остаться дома", alt: ["stay home"] },
            { en: "be late", ru: "опоздать" },
            { en: "miss the bus", ru: "не успеть на автобус" },
            { en: "hurry", ru: "спешить" }
          ],
          sentences: [
            { en: "If it rains, I will stay at home", ru: "Если пойдёт дождь, я останусь дома", alt: ["If it rains, I will stay home", "If it rains, I'll stay at home", "If it rains, I'll stay home"] },
            { en: "If you hurry, you will catch the bus", ru: "Если поспешишь, успеешь на автобус" },
            { en: "We will be late unless we leave now", ru: "Мы опоздаем, если не выйдем сейчас" }
          ],
          gaps: [
            { text: "If it ___ tomorrow, we will go to the beach.", options: ["is sunny", "will be sunny", "was sunny"], answer: "is sunny", ru: "Если завтра будет солнечно, мы пойдём на пляж." },
            { text: "If you study, you ___ the exam.", options: ["pass", "will pass", "passed"], answer: "will pass", ru: "Если будешь заниматься, сдашь экзамен." }
          ]
        },
        {
          id: "if-2", title: "Если бы я был...",
          words: [
            { en: "would", ru: "бы" },
            { en: "rich", ru: "богатый" },
            { en: "if I were you", ru: "на твоём месте" },
            { en: "lottery", ru: "лотерея" },
            { en: "world", ru: "мир", pic: "world" },
            { en: "fly", ru: "летать" }
          ],
          sentences: [
            { en: "If I were rich, I would travel the world", ru: "Если бы я был богатым, я бы путешествовал по миру" },
            { en: "If I were you, I would call her", ru: "На твоём месте я бы ей позвонил" },
            { en: "What would you do if you won the lottery?", ru: "Что бы ты сделал, если бы выиграл в лотерею?" }
          ],
          gaps: [
            { text: "If I ___ a bird, I would fly.", options: ["am", "were", "will be"], answer: "were", ru: "Если бы я был птицей, я бы летал." },
            { text: "If she had time, she ___ learn Spanish.", options: ["will", "would", "is"], answer: "would", ru: "Если бы у неё было время, она бы учила испанский." }
          ]
        },
        {
          id: "if-3", title: "Мечты и советы",
          words: [
            { en: "wish", ru: "желать, жаль что" },
            { en: "dream", ru: "мечта" },
            { en: "advice", ru: "совет" },
            { en: "choose", ru: "выбирать" },
            { en: "chance", ru: "шанс" }
          ],
          sentences: [
            { en: "I wish I had more time", ru: "Жаль, что у меня мало времени" },
            { en: "If you need help, call me", ru: "Если нужна помощь, звони мне" },
            { en: "I would choose the red one", ru: "Я бы выбрал красный" }
          ],
          story: {
            en: "Mark often dreams about his future. If he had a lot of money, he would buy a small house by the sea. He would wake up early and swim every morning. But first he must finish university.",
            ru: "Марк часто мечтает о будущем. Если бы у него было много денег, он купил бы маленький дом у моря. Он бы рано просыпался и плавал каждое утро. Но сначала ему нужно окончить университет.",
            questions: [
              { q: "Что бы купил Марк, если бы у него были деньги?", options: ["Дом у моря", "Машину", "Самолёт"], answer: "Дом у моря" },
              { q: "Что он делал бы каждое утро?", options: ["Плавал", "Бегал", "Читал"], answer: "Плавал" },
              { q: "Что Марку нужно сделать сначала?", options: ["Окончить университет", "Найти работу", "Выиграть в лотерею"], answer: "Окончить университет" }
            ]
          }
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "passive",
      title: "Страдательный залог",
      desc: "Сделано, построено, написано",
      colors: ["#2ec4a6", "#8f7bff", "#16917a"],
      icon: "passive",
      lessons: [
        {
          id: "pas-1", title: "Это делается так",
          words: [
            { en: "is made", ru: "делается, сделан" },
            { en: "is spoken", ru: "говорят (на языке)" },
            { en: "is grown", ru: "выращивается" },
            { en: "is sold", ru: "продаётся" },
            { en: "glass", ru: "стекло", pic: "glass" },
            { en: "coffee beans", ru: "кофейные зёрна" }
          ],
          sentences: [
            { en: "Glass is made from sand", ru: "Стекло делают из песка" },
            { en: "English is spoken all over the world", ru: "На английском говорят по всему миру" },
            { en: "Coffee is grown in Brazil", ru: "Кофе выращивают в Бразилии" }
          ],
          gaps: [
            { text: "Cheese is ___ from milk.", options: ["make", "made", "making"], answer: "made", ru: "Сыр делают из молока." },
            { text: "These phones ___ in China.", options: ["is made", "are made", "made"], answer: "are made", ru: "Эти телефоны производят в Китае." }
          ]
        },
        {
          id: "pas-2", title: "Это было сделано",
          words: [
            { en: "was built", ru: "был построен" },
            { en: "was written", ru: "был написан" },
            { en: "was invented", ru: "был изобретён" },
            { en: "was painted", ru: "был нарисован" },
            { en: "century", ru: "век" },
            { en: "bridge", ru: "мост", pic: "bridge" }
          ],
          sentences: [
            { en: "This bridge was built in 1890", ru: "Этот мост построили в 1890 году" },
            { en: "The book was written by a young girl", ru: "Книгу написала молодая девушка" },
            { en: "The telephone was invented in the 19th century", ru: "Телефон изобрели в 19 веке" }
          ],
          gaps: [
            { text: "The Mona Lisa ___ painted by Leonardo.", options: ["is", "was", "were"], answer: "was", ru: "Мону Лизу написал Леонардо." },
            { text: "These houses were ___ last year.", options: ["build", "built", "building"], answer: "built", ru: "Эти дома построили в прошлом году." }
          ]
        },
        {
          id: "pas-3", title: "Это будет сделано",
          words: [
            { en: "will be done", ru: "будет сделано" },
            { en: "has been sent", ru: "было отправлено" },
            { en: "delivered", ru: "доставлен" },
            { en: "repaired", ru: "отремонтирован" },
            { en: "package", ru: "посылка", pic: "package" },
            { en: "invited", ru: "приглашён" }
          ],
          sentences: [
            { en: "Your package will be delivered tomorrow", ru: "Ваша посылка будет доставлена завтра" },
            { en: "The car has been repaired", ru: "Машину отремонтировали" },
            { en: "All my friends were invited", ru: "Все мои друзья были приглашены" }
          ],
          gaps: [
            { text: "The work will ___ done by Friday.", options: ["be", "is", "been"], answer: "be", ru: "Работа будет сделана к пятнице." },
            { text: "The letter has been ___.", options: ["send", "sent", "sending"], answer: "sent", ru: "Письмо отправлено." }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "reported",
      title: "Он сказал, что...",
      desc: "Косвенная речь",
      colors: ["#ff7ac8", "#5b8cff", "#c94a96"],
      icon: "reported",
      lessons: [
        {
          id: "rep-1", title: "Said и told",
          words: [
            { en: "said", ru: "сказал" },
            { en: "told", ru: "сказал (кому-то)" },
            { en: "that", ru: "что (союз)" },
            { en: "tired", ru: "уставший" },
            { en: "hungry", ru: "голодный" },
            { en: "true", ru: "правда, верный" }
          ],
          sentences: [
            { en: "She said that she was tired", ru: "Она сказала, что устала", alt: ["She said she was tired"] },
            { en: "He told me that he was hungry", ru: "Он сказал мне, что голоден", alt: ["He told me he was hungry"] },
            { en: "They said it was true", ru: "Они сказали, что это правда", alt: ["They said that it was true"] }
          ],
          gaps: [
            { text: "Tom ___ me that he liked jazz.", options: ["said", "told", "say"], answer: "told", ru: "Том сказал мне, что любит джаз." },
            { text: "She said that she ___ busy.", options: ["was", "were", "be"], answer: "was", ru: "Она сказала, что занята." }
          ]
        },
        {
          id: "rep-2", title: "Он спросил, ...",
          words: [
            { en: "asked", ru: "спросил" },
            { en: "if", ru: "ли" },
            { en: "whether", ru: "ли (официально)" },
            { en: "wanted", ru: "хотел" },
            { en: "knew", ru: "знал" }
          ],
          sentences: [
            { en: "She asked if I was hungry", ru: "Она спросила, голоден ли я" },
            { en: "He asked where I lived", ru: "Он спросил, где я живу" },
            { en: "They asked what I wanted", ru: "Они спросили, чего я хочу" }
          ],
          gaps: [
            { text: "He asked ___ I liked coffee.", options: ["if", "that", "what if"], answer: "if", ru: "Он спросил, люблю ли я кофе." },
            { text: "She asked where I ___.", options: ["lived", "living", "did live"], answer: "lived", ru: "Она спросила, где я живу." }
          ]
        },
        {
          id: "rep-3", title: "Просьбы и обещания",
          words: [
            { en: "asked me to", ru: "попросил меня" },
            { en: "promised", ru: "пообещал" },
            { en: "would", ru: "будет (будущее в косвенной речи)" },
            { en: "call", ru: "позвонить", pic: "call" },
            { en: "help", ru: "помогать" }
          ],
          sentences: [
            { en: "She asked me to help her", ru: "Она попросила меня помочь ей" },
            { en: "He promised that he would call", ru: "Он пообещал, что позвонит", alt: ["He promised he would call"] },
            { en: "My boss told me to come early", ru: "Начальник велел мне прийти пораньше" }
          ],
          gaps: [
            { text: "Mom asked me ___ clean my room.", options: ["to", "that", "for"], answer: "to", ru: "Мама попросила меня убрать комнату." },
            { text: "He said he ___ come the next day.", options: ["will", "would", "is"], answer: "would", ru: "Он сказал, что придёт на следующий день." }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "phrasal",
      title: "Фразовые глаголы",
      desc: "get up, look for, give up",
      colors: ["#ffb547", "#2ec4a6", "#d99a0b"],
      icon: "phrasal",
      lessons: [
        {
          id: "phr-1", title: "Каждый день",
          words: [
            { en: "get up", ru: "вставать" },
            { en: "wake up", ru: "просыпаться" },
            { en: "turn on", ru: "включать" },
            { en: "turn off", ru: "выключать" },
            { en: "put on", ru: "надевать" },
            { en: "go out", ru: "выходить (из дома)" }
          ],
          sentences: [
            { en: "I get up at seven", ru: "Я встаю в семь" },
            { en: "Turn off the light, please", ru: "Выключи свет, пожалуйста" },
            { en: "We go out on Friday evening", ru: "В пятницу вечером мы идём гулять", alt: ["On Friday evening we go out", "On Friday evening, we go out"] }
          ],
          gaps: [
            { text: "Please turn ___ the TV, I want to sleep.", options: ["off", "on", "up"], answer: "off", ru: "Выключи, пожалуйста, телевизор, я хочу спать." },
            { text: "I usually wake ___ at six.", options: ["up", "on", "out"], answer: "up", ru: "Я обычно просыпаюсь в шесть." }
          ]
        },
        {
          id: "phr-2", title: "Поиск и находки",
          words: [
            { en: "look for", ru: "искать" },
            { en: "find out", ru: "узнавать, выяснять" },
            { en: "look after", ru: "присматривать" },
            { en: "pick up", ru: "подобрать, забрать" },
            { en: "come back", ru: "возвращаться" },
            { en: "give back", ru: "возвращать (вещь)" }
          ],
          sentences: [
            { en: "I am looking for my keys", ru: "Я ищу свои ключи" },
            { en: "Can you pick me up at six?", ru: "Можешь забрать меня в шесть?" },
            { en: "She looks after her little brother", ru: "Она присматривает за младшим братом" }
          ],
          gaps: [
            { text: "I need to find ___ what time the train leaves.", options: ["out", "up", "on"], answer: "out", ru: "Мне нужно выяснить, во сколько уходит поезд." },
            { text: "Please give ___ my book tomorrow.", options: ["back", "up", "off"], answer: "back", ru: "Пожалуйста, верни мою книгу завтра." }
          ]
        },
        {
          id: "phr-3", title: "Не сдавайся",
          words: [
            { en: "give up", ru: "сдаваться, бросать" },
            { en: "carry on", ru: "продолжать" },
            { en: "work out", ru: "тренироваться; разобраться" },
            { en: "run out of", ru: "закончиться (о запасах)" },
            { en: "get on with", ru: "ладить с" },
            { en: "set up", ru: "основать, настроить" }
          ],
          sentences: [
            { en: "Never give up", ru: "Никогда не сдавайся" },
            { en: "We have run out of milk", ru: "У нас закончилось молоко" },
            { en: "I get on well with my sister", ru: "Я хорошо лажу с сестрой" }
          ],
          gaps: [
            { text: "Don't give ___! You can do it.", options: ["up", "out", "off"], answer: "up", ru: "Не сдавайся! У тебя получится." },
            { text: "Carry ___, you are doing great.", options: ["on", "up", "out"], answer: "on", ru: "Продолжай, у тебя отлично получается." }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "career",
      title: "Работа и карьера",
      desc: "Резюме, собеседование, офис",
      colors: ["#3a62d6", "#2ec4a6", "#283f99"],
      icon: "career",
      lessons: [
        {
          id: "car-1", title: "Поиск работы",
          words: [
            { en: "CV", ru: "резюме", alt: ["resume"] },
            { en: "apply for", ru: "подавать заявку на" },
            { en: "salary", ru: "зарплата", pic: "money" },
            { en: "experience", ru: "опыт" },
            { en: "skills", ru: "навыки" },
            { en: "company", ru: "компания", pic: "company" }
          ],
          sentences: [
            { en: "I want to apply for this job", ru: "Я хочу откликнуться на эту вакансию" },
            { en: "I have three years of experience", ru: "У меня три года опыта" },
            { en: "What is the salary?", ru: "Какая зарплата?" }
          ]
        },
        {
          id: "car-2", title: "Собеседование",
          words: [
            { en: "interview", ru: "собеседование" },
            { en: "strengths", ru: "сильные стороны" },
            { en: "team", ru: "команда" },
            { en: "responsible", ru: "ответственный" },
            { en: "goal", ru: "цель" },
            { en: "hire", ru: "нанимать" }
          ],
          sentences: [
            { en: "Tell me about yourself", ru: "Расскажите о себе" },
            { en: "I work well in a team", ru: "Я хорошо работаю в команде" },
            { en: "Why do you want this job?", ru: "Почему вы хотите эту работу?" }
          ],
          dialogs: [
            {
              title: "Собеседование",
              lines: [
                { who: "Менеджер", en: "Good morning! Please tell me about yourself.", ru: "Доброе утро! Расскажите о себе." },
                { me: true, en: "I am a designer with three years of experience.", ru: "Я дизайнер с трёхлетним опытом.", wrong: ["I am designer with three years experience.", "I'm fine, thank you. And you?"] },
                { who: "Менеджер", en: "What are your strengths?", ru: "Какие у вас сильные стороны?" },
                { me: true, en: "I am responsible and I work well in a team.", ru: "Я ответственный и хорошо работаю в команде.", wrong: ["I am responsible and I works well in a team.", "I want a higher salary."] },
                { who: "Менеджер", en: "Why do you want to work for our company?", ru: "Почему вы хотите работать в нашей компании?" },
                { me: true, en: "Because I want to grow and learn new skills.", ru: "Потому что хочу расти и учиться новому.", wrong: ["Because of I want to grow.", "I worked there for three years."] }
              ]
            }
          ]
        },
        {
          id: "car-3", title: "В офисе",
          words: [
            { en: "meeting", ru: "встреча, совещание" },
            { en: "deadline", ru: "срок сдачи", pic: "deadline" },
            { en: "colleague", ru: "коллега" },
            { en: "email", ru: "электронное письмо", pic: "email" },
            { en: "report", ru: "отчёт", pic: "report" },
            { en: "schedule", ru: "расписание", pic: "schedule" }
          ],
          sentences: [
            { en: "The meeting starts at ten", ru: "Совещание начинается в десять" },
            { en: "I will send you an email", ru: "Я отправлю вам письмо" },
            { en: "The deadline is on Friday", ru: "Срок сдачи в пятницу" }
          ],
          story: {
            en: "Lisa started a new job last month. Her colleagues are friendly and her boss is fair. Every Monday they have a team meeting. Lisa likes her job, but sometimes the deadlines are very tight.",
            ru: "Лиза начала работать на новом месте в прошлом месяце. Коллеги дружелюбные, а начальник справедливый. Каждый понедельник у них совещание команды. Лизе нравится работа, но иногда сроки очень сжатые.",
            questions: [
              { q: "Когда Лиза начала новую работу?", options: ["В прошлом месяце", "Вчера", "Год назад"], answer: "В прошлом месяце" },
              { q: "Когда у команды совещание?", options: ["Каждый понедельник", "Каждую пятницу", "Раз в месяц"], answer: "Каждый понедельник" },
              { q: "Что иногда трудно для Лизы?", options: ["Сжатые сроки", "Коллеги", "Начальник"], answer: "Сжатые сроки" }
            ]
          }
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "narrative",
      title: "Истории о прошлом",
      desc: "Past Perfect и used to",
      colors: ["#8f7bff", "#ff6b4a", "#6a55e0"],
      icon: "narrative",
      lessons: [
        {
          id: "nar-1", title: "Уже успел: Past Perfect",
          words: [
            { en: "had left", ru: "уже ушёл (к тому моменту)" },
            { en: "had finished", ru: "уже закончил" },
            { en: "by the time", ru: "к тому времени как" },
            { en: "before", ru: "до того как" },
            { en: "arrived", ru: "прибыл" },
            { en: "realised", ru: "понял, осознал", alt: ["realized"] }
          ],
          sentences: [
            { en: "When I arrived, the train had left", ru: "Когда я приехал, поезд уже ушёл" },
            { en: "She had finished her work before lunch", ru: "Она закончила работу до обеда" },
            { en: "By the time we got there, the film had started", ru: "К тому времени, как мы пришли, фильм уже начался" }
          ],
          gaps: [
            { text: "When we arrived, the party ___ already ended.", options: ["has", "had", "was"], answer: "had", ru: "Когда мы пришли, вечеринка уже закончилась." },
            { text: "I realised I ___ my keys at home.", options: ["had left", "have left", "leave"], answer: "had left", ru: "Я понял, что оставил ключи дома." }
          ]
        },
        {
          id: "nar-2", title: "Раньше я: used to",
          words: [
            { en: "used to", ru: "раньше (бывало)" },
            { en: "didn't use to", ru: "раньше не", alt: ["did not use to"] },
            { en: "childhood", ru: "детство" },
            { en: "village", ru: "деревня", pic: "village" },
            { en: "be used to", ru: "быть привыкшим (к)" },
            { en: "get used to", ru: "привыкать" }
          ],
          sentences: [
            { en: "I used to live in a small village", ru: "Раньше я жил в маленькой деревне" },
            { en: "She didn't use to like coffee", ru: "Раньше она не любила кофе" },
            { en: "I am used to getting up early", ru: "Я привык рано вставать" }
          ],
          gaps: [
            { text: "When I was a child, I ___ to play outside every day.", options: ["used", "use", "was used"], answer: "used", ru: "В детстве я каждый день играл на улице." },
            { text: "It took me a month to get used to ___ on the left.", options: ["drive", "driving", "drove"], answer: "driving", ru: "Мне понадобился месяц, чтобы привыкнуть к левостороннему движению." }
          ]
        },
        {
          id: "nar-3", title: "Рассказываем историю",
          words: [
            { en: "at first", ru: "сначала" },
            { en: "eventually", ru: "в конце концов (спустя время)" },
            { en: "meanwhile", ru: "тем временем" },
            { en: "afterwards", ru: "впоследствии, потом" },
            { en: "unexpectedly", ru: "неожиданно" },
            { en: "in the end", ru: "в итоге" }
          ],
          sentences: [
            { en: "At first I was nervous, but eventually I relaxed", ru: "Сначала я нервничал, но в конце концов расслабился" },
            { en: "Meanwhile, my friends were waiting outside", ru: "Тем временем мои друзья ждали на улице" },
            { en: "In the end, everything was fine", ru: "В итоге всё было хорошо" }
          ],
          story: {
            en: "Last summer I went hiking in the mountains. At first the weather was perfect. Unexpectedly, it started to snow and we got lost. Eventually, a local farmer found us and took us to his house. In the end, it was the best trip I had ever had.",
            ru: "Прошлым летом я пошёл в поход в горы. Сначала погода была отличной. Неожиданно пошёл снег, и мы заблудились. В конце концов нас нашёл местный фермер и отвёл к себе домой. В итоге это было лучшее путешествие в моей жизни.",
            questions: [
              { q: "Что неожиданно произошло?", options: ["Пошёл снег", "Начался дождь", "Сломалась машина"], answer: "Пошёл снег" },
              { q: "Кто помог путешественникам?", options: ["Местный фермер", "Спасатели", "Другие туристы"], answer: "Местный фермер" },
              { q: "Как автор оценивает поездку?", options: ["Лучшая поездка", "Ужасная поездка", "Скучная поездка"], answer: "Лучшая поездка" }
            ]
          }
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "deduction",
      title: "Догадки и вероятность",
      desc: "must be, might, can't be",
      colors: ["#2ec4a6", "#ffb547", "#16917a"],
      icon: "deduction",
      lessons: [
        {
          id: "ded-1", title: "Наверное и вряд ли",
          words: [
            { en: "must be", ru: "наверняка (является)" },
            { en: "might be", ru: "возможно (является)" },
            { en: "can't be", ru: "не может быть" },
            { en: "probably", ru: "вероятно" },
            { en: "certainly", ru: "безусловно" },
            { en: "perhaps", ru: "пожалуй, может быть" }
          ],
          sentences: [
            { en: "He must be at work", ru: "Он, должно быть, на работе" },
            { en: "She might be ill", ru: "Возможно, она заболела" },
            { en: "That can't be true", ru: "Не может быть, чтобы это было правдой" }
          ],
          gaps: [
            { text: "The lights are on. They ___ be at home.", options: ["must", "can't", "mustn't"], answer: "must", ru: "Свет горит. Они, должно быть, дома." },
            { text: "He has just eaten. He ___ be hungry.", options: ["must", "can't", "might"], answer: "can't", ru: "Он только что поел. Не может быть, чтобы он был голоден." }
          ]
        },
        {
          id: "ded-2", title: "Догадки о прошлом",
          words: [
            { en: "must have", ru: "наверняка (сделал)" },
            { en: "might have", ru: "возможно (сделал)" },
            { en: "can't have", ru: "не мог (сделать)" },
            { en: "should have", ru: "следовало бы (сделать)" },
            { en: "forgotten", ru: "забыл (3-я форма)" },
            { en: "missed", ru: "пропустил, опоздал" }
          ],
          sentences: [
            { en: "She must have forgotten", ru: "Она, должно быть, забыла" },
            { en: "They might have missed the train", ru: "Возможно, они опоздали на поезд" },
            { en: "You should have told me", ru: "Тебе следовало мне сказать" }
          ],
          gaps: [
            { text: "The ground is wet. It must ___ rained.", options: ["have", "has", "had"], answer: "have", ru: "Земля мокрая. Должно быть, шёл дождь." },
            { text: "He can't have ___ it, he was with me all day.", options: ["do", "did", "done"], answer: "done", ru: "Он не мог этого сделать, он весь день был со мной." }
          ]
        },
        {
          id: "ded-3", title: "Говорим осторожно",
          words: [
            { en: "it seems", ru: "кажется" },
            { en: "apparently", ru: "по-видимому" },
            { en: "it is likely", ru: "вероятно" },
            { en: "it is unlikely", ru: "маловероятно" },
            { en: "no doubt", ru: "без сомнения" },
            { en: "I suppose", ru: "полагаю" }
          ],
          sentences: [
            { en: "It seems that he is right", ru: "Кажется, он прав", alt: ["It seems he is right"] },
            { en: "It is unlikely to rain today", ru: "Сегодня вряд ли будет дождь" },
            { en: "Apparently, the shop is closed", ru: "По-видимому, магазин закрыт" }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "relative",
      title: "Который, где, чей",
      desc: "Придаточные предложения",
      colors: ["#5b8cff", "#2ec4a6", "#3a62d6"],
      icon: "relative",
      lessons: [
        {
          id: "rel-1", title: "Who, which, that",
          words: [
            { en: "who", ru: "который (о людях)" },
            { en: "which", ru: "который (о предметах)" },
            { en: "that", ru: "который (обо всём)" },
            { en: "neighbour", ru: "сосед", alt: ["neighbor"] },
            { en: "recommend", ru: "рекомендовать" }
          ],
          sentences: [
            { en: "The woman who lives next door is a doctor", ru: "Женщина, которая живёт по соседству, врач", alt: ["The woman that lives next door is a doctor"] },
            { en: "This is the book which I recommended", ru: "Это книга, которую я советовал", alt: ["This is the book that I recommended", "This is the book I recommended"] },
            { en: "I like films that make me laugh", ru: "Мне нравятся фильмы, которые меня смешат", alt: ["I like films which make me laugh"] }
          ],
          gaps: [
            { text: "The man ___ called you is my uncle.", options: ["who", "which", "where"], answer: "who", ru: "Мужчина, который тебе звонил, мой дядя." },
            { text: "The car ___ I bought is red.", options: ["who", "which", "whose"], answer: "which", ru: "Машина, которую я купил, красная." }
          ]
        },
        {
          id: "rel-2", title: "Where, whose, when",
          words: [
            { en: "where", ru: "где (в котором)" },
            { en: "whose", ru: "чей" },
            { en: "when", ru: "когда (в который)" },
            { en: "grew up", ru: "вырос" },
            { en: "owner", ru: "владелец" }
          ],
          sentences: [
            { en: "This is the town where I grew up", ru: "Это город, где я вырос" },
            { en: "That is the girl whose dog bit me", ru: "Это та девушка, чья собака меня укусила" },
            { en: "I remember the day when we met", ru: "Я помню день, когда мы познакомились", alt: ["I remember the day we met"] }
          ],
          gaps: [
            { text: "The hotel ___ we stayed was great.", options: ["which", "where", "who"], answer: "where", ru: "Отель, где мы жили, был отличный." },
            { text: "He is the man ___ car was stolen.", options: ["who", "whose", "which"], answer: "whose", ru: "Это тот мужчина, у которого угнали машину." }
          ]
        },
        {
          id: "rel-3", title: "Дополнительная информация",
          words: [
            { en: "which is", ru: "который является" },
            { en: "capital", ru: "столица" },
            { en: "famous", ru: "известный" },
            { en: "population", ru: "население" },
            { en: "located", ru: "расположенный" }
          ],
          sentences: [
            { en: "Paris, which is the capital of France, is beautiful", ru: "Париж, который является столицей Франции, прекрасен" },
            { en: "My brother, who lives in Canada, is a pilot", ru: "Мой брат, который живёт в Канаде, пилот" }
          ],
          gaps: [
            { text: "London, ___ has a population of 9 million, is huge.", options: ["that", "which", "where"], answer: "which", ru: "Лондон, население которого составляет 9 миллионов, огромен." }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "gerund",
      title: "Doing или to do?",
      desc: "Герундий и инфинитив",
      colors: ["#ff8f6b", "#8f7bff", "#d96a3a"],
      icon: "gerund",
      lessons: [
        {
          id: "ger-1", title: "Глаголы + -ing",
          words: [
            { en: "enjoy", ru: "наслаждаться, любить" },
            { en: "avoid", ru: "избегать" },
            { en: "mind", ru: "возражать" },
            { en: "finish", ru: "заканчивать" },
            { en: "suggest", ru: "предлагать" },
            { en: "keep", ru: "продолжать (постоянно)" }
          ],
          sentences: [
            { en: "I enjoy reading in the evening", ru: "Я люблю читать по вечерам" },
            { en: "Do you mind opening the window?", ru: "Ты не против открыть окно?" },
            { en: "She suggested going to the cinema", ru: "Она предложила пойти в кино" }
          ],
          gaps: [
            { text: "He avoids ___ fast food.", options: ["eat", "eating", "to eat"], answer: "eating", ru: "Он избегает фастфуда." },
            { text: "I finished ___ the report.", options: ["write", "writing", "to write"], answer: "writing", ru: "Я закончил писать отчёт." }
          ]
        },
        {
          id: "ger-2", title: "Глаголы + to",
          words: [
            { en: "decide", ru: "решать" },
            { en: "hope", ru: "надеяться" },
            { en: "plan", ru: "планировать" },
            { en: "refuse", ru: "отказываться" },
            { en: "afford", ru: "позволить себе" },
            { en: "manage", ru: "суметь, справиться" }
          ],
          sentences: [
            { en: "We decided to stay at home", ru: "Мы решили остаться дома", alt: ["We decided to stay home"] },
            { en: "I can't afford to buy a new car", ru: "Я не могу позволить себе купить новую машину" },
            { en: "She managed to finish on time", ru: "Ей удалось закончить вовремя" }
          ],
          gaps: [
            { text: "They refused ___ the bill.", options: ["pay", "paying", "to pay"], answer: "to pay", ru: "Они отказались платить по счёту." },
            { text: "I hope ___ you soon.", options: ["see", "seeing", "to see"], answer: "to see", ru: "Надеюсь скоро тебя увидеть." }
          ]
        },
        {
          id: "ger-3", title: "Меняется смысл",
          words: [
            { en: "remember", ru: "помнить" },
            { en: "forget", ru: "забывать" },
            { en: "stop", ru: "прекращать, останавливаться" },
            { en: "try", ru: "пытаться, пробовать" },
            { en: "regret", ru: "сожалеть" }
          ],
          sentences: [
            { en: "Remember to lock the door", ru: "Не забудь запереть дверь" },
            { en: "I remember locking the door", ru: "Я помню, что запер дверь" },
            { en: "He stopped smoking last year", ru: "Он бросил курить в прошлом году" }
          ],
          gaps: [
            { text: "Don't forget ___ milk on your way home.", options: ["buying", "to buy", "buy"], answer: "to buy", ru: "Не забудь купить молоко по дороге домой." },
            { text: "We stopped ___ a coffee on the way.", options: ["having", "to have", "have"], answer: "to have", ru: "Мы остановились по дороге выпить кофе." }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "society",
      title: "Общество и природа",
      desc: "Обсуждаем серьёзные темы",
      colors: ["#2ec4a6", "#5b8cff", "#16917a"],
      icon: "society",
      lessons: [
        {
          id: "soc-1", title: "Экология",
          words: [
            { en: "environment", ru: "окружающая среда", pic: "environment" },
            { en: "pollution", ru: "загрязнение", pic: "pollution" },
            { en: "climate change", ru: "изменение климата" },
            { en: "recycle", ru: "перерабатывать", pic: "recycle" },
            { en: "waste", ru: "отходы; тратить впустую" },
            { en: "renewable energy", ru: "возобновляемая энергия" }
          ],
          sentences: [
            { en: "We should recycle more plastic", ru: "Нам следует больше перерабатывать пластик" },
            { en: "Air pollution is a serious problem", ru: "Загрязнение воздуха - серьёзная проблема" },
            { en: "Climate change affects everyone", ru: "Изменение климата влияет на всех" }
          ]
        },
        {
          id: "soc-2", title: "Технологии",
          words: [
            { en: "device", ru: "устройство", pic: "device" },
            { en: "artificial intelligence", ru: "искусственный интеллект" },
            { en: "privacy", ru: "конфиденциальность", pic: "privacy" },
            { en: "addicted to", ru: "зависимый от" },
            { en: "screen time", ru: "время у экрана", pic: "device" },
            { en: "benefit", ru: "польза" }
          ],
          sentences: [
            { en: "Many teenagers are addicted to their phones", ru: "Многие подростки зависимы от телефонов" },
            { en: "Artificial intelligence is changing our lives", ru: "Искусственный интеллект меняет нашу жизнь" },
            { en: "Online privacy is very important", ru: "Конфиденциальность в интернете очень важна" }
          ]
        },
        {
          id: "soc-3", title: "Своё мнение",
          words: [
            { en: "in my opinion", ru: "по моему мнению" },
            { en: "I strongly believe", ru: "я твёрдо уверен" },
            { en: "on the other hand", ru: "с другой стороны" },
            { en: "I agree", ru: "я согласен" },
            { en: "I disagree", ru: "я не согласен" },
            { en: "it depends", ru: "смотря как, зависит от" }
          ],
          sentences: [
            { en: "In my opinion, cities should have more parks", ru: "По-моему, в городах должно быть больше парков" },
            { en: "On the other hand, it is very expensive", ru: "С другой стороны, это очень дорого" },
            { en: "I see your point, but I disagree", ru: "Я понимаю твою мысль, но не согласен" }
          ],
          dialogs: [
            {
              title: "Спор о технологиях",
              lines: [
                { who: "Анна", en: "I think phones make people less social.", ru: "Мне кажется, телефоны делают людей менее общительными." },
                { me: true, en: "I see your point, but they also help us stay in touch.", ru: "Понимаю твою мысль, но они также помогают нам общаться.", wrong: ["I see your point, but they also help us staying in touch.", "Yes, I have a new phone."] },
                { who: "Анна", en: "That's true. But many teenagers are addicted to them.", ru: "Это правда. Но многие подростки от них зависимы." },
                { me: true, en: "I agree. Parents should limit screen time.", ru: "Согласен. Родителям стоит ограничивать время у экрана.", wrong: ["I agree. Parents should to limit screen time.", "I agree, teenagers should use phones more."] }
              ]
            }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "regrets",
      title: "Если бы тогда...",
      desc: "Третий и смешанный тип условных",
      colors: ["#6a55e0", "#ff6b81", "#4b3aa8"],
      icon: "regrets",
      lessons: [
        {
          id: "reg-1", title: "Если бы я тогда...",
          words: [
            { en: "would have", ru: "бы (о прошлом)" },
            { en: "if I had known", ru: "если бы я знал" },
            { en: "would have come", ru: "пришёл бы" },
            { en: "earlier", ru: "раньше" },
            { en: "on time", ru: "вовремя" }
          ],
          sentences: [
            { en: "If I had known, I would have come earlier", ru: "Если бы я знал, я бы пришёл раньше" },
            { en: "If we had left on time, we wouldn't have missed the flight", ru: "Если бы мы вышли вовремя, мы бы не опоздали на рейс" },
            { en: "She would have passed if she had studied", ru: "Она бы сдала, если бы готовилась" }
          ],
          gaps: [
            { text: "If you had asked me, I ___ have helped.", options: ["will", "would", "had"], answer: "would", ru: "Если бы ты попросил, я бы помог." },
            { text: "If they ___ the map, they wouldn't have got lost.", options: ["had taken", "took", "would take"], answer: "had taken", ru: "Если бы они взяли карту, они бы не заблудились." }
          ]
        },
        {
          id: "reg-2", title: "Сожаления",
          words: [
            { en: "I wish I had", ru: "жаль, что я не (в прошлом)" },
            { en: "if only", ru: "если бы только" },
            { en: "regret", ru: "сожалеть" },
            { en: "opportunity", ru: "возможность" },
            { en: "take advantage of", ru: "воспользоваться" }
          ],
          sentences: [
            { en: "I wish I had studied harder at school", ru: "Жаль, что я плохо учился в школе" },
            { en: "If only I had listened to you", ru: "Если бы только я тебя послушал" },
            { en: "I regret not taking that opportunity", ru: "Жалею, что не воспользовался той возможностью" }
          ],
          gaps: [
            { text: "I wish I ___ that email.", options: ["didn't send", "hadn't sent", "wouldn't send"], answer: "hadn't sent", ru: "Жаль, что я отправил то письмо." }
          ]
        },
        {
          id: "reg-3", title: "Смешанные условия",
          words: [
            { en: "now", ru: "сейчас" },
            { en: "career", ru: "карьера" },
            { en: "abroad", ru: "за границей", pic: "world" },
            { en: "fluent", ru: "свободно говорящий" },
            { en: "different", ru: "другой, иной" }
          ],
          sentences: [
            { en: "If I had taken that job, I would be rich now", ru: "Если бы я тогда взял ту работу, я бы сейчас был богат" },
            { en: "If she had lived abroad, she would be fluent now", ru: "Если бы она пожила за границей, сейчас говорила бы свободно" },
            { en: "My life would be different if I hadn't met you", ru: "Моя жизнь была бы другой, если бы я не встретил тебя" }
          ],
          gaps: [
            { text: "If I had saved money, I ___ a car now.", options: ["would have", "would have had", "will have"], answer: "would have", ru: "Если бы я копил деньги, у меня бы сейчас была машина." }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "emphasis",
      title: "Акценты и инверсия",
      desc: "Never have I... Not only... but also",
      colors: ["#ffb547", "#ff6b4a", "#d99a0b"],
      icon: "emphasis",
      lessons: [
        {
          id: "emp-1", title: "Инверсия",
          words: [
            { en: "never have I", ru: "никогда я не" },
            { en: "rarely", ru: "редко" },
            { en: "not only", ru: "не только" },
            { en: "hardly", ru: "едва" },
            { en: "under no circumstances", ru: "ни при каких обстоятельствах" }
          ],
          sentences: [
            { en: "Never have I seen such a beautiful sunset", ru: "Никогда я не видел такого красивого заката" },
            { en: "Not only is he smart, but he is also kind", ru: "Он не только умный, но и добрый", alt: ["He is not only smart, but he is also kind"] },
            { en: "Under no circumstances should you open this door", ru: "Ни при каких обстоятельствах не открывайте эту дверь" }
          ],
          gaps: [
            { text: "Rarely ___ such talent.", options: ["we see", "do we see", "we do see"], answer: "do we see", ru: "Редко встретишь такой талант." },
            { text: "Hardly ___ I arrived when it started raining.", options: ["had", "have", "did"], answer: "had", ru: "Едва я пришёл, как начался дождь." }
          ]
        },
        {
          id: "emp-2", title: "Выделяем главное",
          words: [
            { en: "what I need is", ru: "что мне нужно, так это" },
            { en: "it was ... that", ru: "именно ... (выделение)" },
            { en: "the thing is", ru: "дело в том, что" },
            { en: "do like", ru: "действительно нравится" },
            { en: "indeed", ru: "в самом деле" }
          ],
          sentences: [
            { en: "What I need is a long holiday", ru: "Что мне нужно, так это долгий отпуск" },
            { en: "It was Tom who broke the window", ru: "Именно Том разбил окно" },
            { en: "I do like your new haircut", ru: "Мне правда нравится твоя новая стрижка" }
          ]
        },
        {
          id: "emp-3", title: "Связки текста",
          words: [
            { en: "although", ru: "хотя" },
            { en: "despite", ru: "несмотря на" },
            { en: "however", ru: "однако" },
            { en: "whereas", ru: "тогда как" },
            { en: "therefore", ru: "следовательно" },
            { en: "moreover", ru: "более того" }
          ],
          sentences: [
            { en: "Although it was raining, we went for a walk", ru: "Хотя шёл дождь, мы пошли гулять" },
            { en: "Despite the rain, we went for a walk", ru: "Несмотря на дождь, мы пошли гулять" },
            { en: "The plan is risky. However, it might work", ru: "План рискованный. Однако он может сработать" }
          ],
          gaps: [
            { text: "___ being tired, she kept working.", options: ["Although", "Despite", "However"], answer: "Despite", ru: "Несмотря на усталость, она продолжала работать." },
            { text: "I like tea, ___ my sister prefers coffee.", options: ["whereas", "despite", "therefore"], answer: "whereas", ru: "Я люблю чай, тогда как сестра предпочитает кофе." }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "idioms",
      title: "Идиомы и устойчивые выражения",
      desc: "Говорим как носители",
      colors: ["#ff7ac8", "#ffb547", "#c94a96"],
      icon: "idioms",
      lessons: [
        {
          id: "idi-1", title: "Повседневные идиомы",
          words: [
            { en: "a piece of cake", ru: "проще простого" },
            { en: "break the ice", ru: "растопить лёд (начать общение)" },
            { en: "under the weather", ru: "неважно себя чувствовать" },
            { en: "cost an arm and a leg", ru: "стоить целое состояние" },
            { en: "hit the sack", ru: "лечь спать" },
            { en: "once in a blue moon", ru: "очень редко" }
          ],
          sentences: [
            { en: "The exam was a piece of cake", ru: "Экзамен был проще простого" },
            { en: "I'm feeling a bit under the weather", ru: "Мне что-то нездоровится" },
            { en: "That car cost an arm and a leg", ru: "Эта машина стоила целое состояние" }
          ]
        },
        {
          id: "idi-2", title: "Работа и учёба",
          words: [
            { en: "get the hang of", ru: "наловчиться" },
            { en: "on the same page", ru: "одинаково понимать ситуацию" },
            { en: "think outside the box", ru: "мыслить нестандартно" },
            { en: "cut corners", ru: "халтурить, срезать углы" },
            { en: "the ball is in your court", ru: "теперь твоя очередь решать" },
            { en: "learn by heart", ru: "выучить наизусть" }
          ],
          sentences: [
            { en: "You'll soon get the hang of it", ru: "Ты скоро наловчишься" },
            { en: "Let's make sure we're on the same page", ru: "Давай убедимся, что мы понимаем друг друга" },
            { en: "We need to think outside the box", ru: "Нам нужно мыслить нестандартно" }
          ]
        },
        {
          id: "idi-3", title: "Устойчивые сочетания",
          words: [
            { en: "make a decision", ru: "принять решение" },
            { en: "do your best", ru: "постараться изо всех сил" },
            { en: "take a risk", ru: "рискнуть" },
            { en: "pay attention", ru: "обращать внимание" },
            { en: "keep in touch", ru: "поддерживать связь" },
            { en: "catch a cold", ru: "простудиться" }
          ],
          sentences: [
            { en: "It's time to make a decision", ru: "Пора принять решение" },
            { en: "Please pay attention to the details", ru: "Пожалуйста, обратите внимание на детали" },
            { en: "Let's keep in touch", ru: "Давай не теряться" }
          ],
          gaps: [
            { text: "I need to ___ a decision today.", options: ["make", "do", "get"], answer: "make", ru: "Мне нужно принять решение сегодня." },
            { text: "Just ___ your best!", options: ["make", "do", "take"], answer: "do", ru: "Просто постарайся изо всех сил!" }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "formal",
      title: "Деловой английский",
      desc: "Письма, встречи, переговоры",
      colors: ["#3a62d6", "#8f7bff", "#283f99"],
      icon: "formal",
      lessons: [
        {
          id: "frm-1", title: "Деловое письмо",
          words: [
            { en: "Dear Sir or Madam", ru: "Уважаемые господа" },
            { en: "I am writing to", ru: "Я пишу, чтобы" },
            { en: "enquire about", ru: "узнать о", alt: ["inquire about"] },
            { en: "attached", ru: "во вложении" },
            { en: "I look forward to", ru: "с нетерпением жду" },
            { en: "Kind regards", ru: "С уважением" }
          ],
          sentences: [
            { en: "I am writing to enquire about the position", ru: "Пишу, чтобы узнать о вакансии" },
            { en: "Please find attached my CV", ru: "Во вложении моё резюме", alt: ["Please find my CV attached"] },
            { en: "I look forward to hearing from you", ru: "С нетерпением жду вашего ответа" }
          ]
        },
        {
          id: "frm-2", title: "Переговоры",
          words: [
            { en: "proposal", ru: "предложение" },
            { en: "compromise", ru: "компромисс" },
            { en: "terms", ru: "условия" },
            { en: "negotiate", ru: "вести переговоры" },
            { en: "agreement", ru: "соглашение" },
            { en: "budget", ru: "бюджет" }
          ],
          sentences: [
            { en: "Could we discuss the terms of the agreement?", ru: "Могли бы мы обсудить условия соглашения?" },
            { en: "I'm afraid that's beyond our budget", ru: "Боюсь, это выходит за рамки нашего бюджета" },
            { en: "Perhaps we could reach a compromise", ru: "Возможно, мы могли бы прийти к компромиссу" }
          ],
          dialogs: [
            {
              title: "Переговоры о цене",
              lines: [
                { who: "Партнёр", en: "Our price for the project is fifty thousand dollars.", ru: "Наша цена за проект - пятьдесят тысяч долларов." },
                { me: true, en: "I'm afraid that's beyond our budget.", ru: "Боюсь, это выходит за рамки нашего бюджета.", wrong: ["I'm afraid that's beyond of our budget.", "You're welcome, it's our pleasure."] },
                { who: "Партнёр", en: "What would you suggest?", ru: "Что бы вы предложили?" },
                { me: true, en: "Perhaps we could reach a compromise at forty thousand.", ru: "Возможно, сойдёмся на сорока тысячах?", wrong: ["Perhaps we could reaching a compromise at forty thousand.", "I suggest sixty thousand."] }
              ]
            }
          ]
        },
        {
          id: "frm-3", title: "Официально или нет",
          words: [
            { en: "purchase", ru: "покупать (официально)" },
            { en: "assist", ru: "помогать (официально)" },
            { en: "require", ru: "требоваться" },
            { en: "commence", ru: "начинать (официально)" },
            { en: "inform", ru: "сообщать" },
            { en: "regarding", ru: "относительно" }
          ],
          sentences: [
            { en: "How may I assist you?", ru: "Чем могу помочь?" },
            { en: "The meeting will commence at nine", ru: "Совещание начнётся в девять" },
            { en: "I am writing to you regarding the changes", ru: "Пишу вам относительно изменений", alt: ["I'm writing to you regarding the changes"] }
          ],
          gaps: [
            { text: "Formal: We ___ further information.", options: ["want", "require", "wanna"], answer: "require", ru: "Нам требуется дополнительная информация." }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "nuance",
      title: "Тонкости смысла",
      desc: "Синонимы и оттенки значений",
      colors: ["#2ec4a6", "#ff8f6b", "#16917a"],
      icon: "nuance",
      lessons: [
        {
          id: "nu-1", title: "Смотреть и видеть",
          words: [
            { en: "glance", ru: "бросить взгляд" },
            { en: "stare", ru: "пристально смотреть" },
            { en: "gaze", ru: "долго смотреть, любоваться" },
            { en: "notice", ru: "замечать" },
            { en: "observe", ru: "наблюдать" },
            { en: "peek", ru: "подглядывать" }
          ],
          sentences: [
            { en: "She glanced at her watch", ru: "Она мельком взглянула на часы" },
            { en: "It's rude to stare at people", ru: "Пялиться на людей невежливо" },
            { en: "They gazed at the stars", ru: "Они любовались звёздами" }
          ],
          gaps: [
            { text: "He ___ at the clock and hurried out.", options: ["glanced", "gazed", "stared"], answer: "glanced", ru: "Он мельком глянул на часы и поспешил выйти." }
          ]
        },
        {
          id: "nu-2", title: "Говорить по-разному",
          words: [
            { en: "whisper", ru: "шептать" },
            { en: "mumble", ru: "бормотать" },
            { en: "shout", ru: "кричать" },
            { en: "claim", ru: "утверждать" },
            { en: "admit", ru: "признавать" },
            { en: "complain", ru: "жаловаться" }
          ],
          sentences: [
            { en: "She whispered the answer to me", ru: "Она шёпотом подсказала мне ответ" },
            { en: "He admitted that he was wrong", ru: "Он признал, что был неправ", alt: ["He admitted he was wrong"] },
            { en: "They complained about the noise", ru: "Они жаловались на шум" }
          ],
          gaps: [
            { text: "Finally, he ___ that he had lied.", options: ["admitted", "whispered", "complained"], answer: "admitted", ru: "В конце концов он признал, что солгал." }
          ]
        },
        {
          id: "nu-3", title: "Сильные прилагательные",
          words: [
            { en: "exhausted", ru: "измотанный" },
            { en: "starving", ru: "умирающий от голода" },
            { en: "furious", ru: "в ярости" },
            { en: "terrified", ru: "в ужасе" },
            { en: "delighted", ru: "в восторге" },
            { en: "freezing", ru: "ледяной, очень холодно" }
          ],
          sentences: [
            { en: "I'm absolutely exhausted after the trip", ru: "Я совершенно вымотан после поездки" },
            { en: "She was furious with him", ru: "Она была на него страшно зла" },
            { en: "We were delighted with the result", ru: "Мы были в восторге от результата" }
          ],
          gaps: [
            { text: "It's ___ outside, take a warm coat.", options: ["freezing", "cold very", "starving"], answer: "freezing", ru: "На улице ледяной холод, возьми тёплое пальто." }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: "academic",
      title: "Аргументы и дискуссии",
      desc: "Академический английский",
      colors: ["#5b8cff", "#ffb547", "#3a62d6"],
      icon: "academic",
      lessons: [
        {
          id: "aca-1", title: "Аргументируем",
          words: [
            { en: "evidence", ru: "доказательства", pic: "evidence" },
            { en: "research suggests", ru: "исследования показывают" },
            { en: "furthermore", ru: "кроме того" },
            { en: "consequently", ru: "вследствие этого" },
            { en: "significant", ru: "значительный" },
            { en: "argue", ru: "утверждать, доказывать" }
          ],
          sentences: [
            { en: "Research suggests that sleep improves memory", ru: "Исследования показывают, что сон улучшает память", alt: ["Research suggests sleep improves memory"] },
            { en: "There is no evidence to support this claim", ru: "Нет доказательств в поддержку этого утверждения" },
            { en: "Consequently, prices have risen significantly", ru: "Вследствие этого цены значительно выросли" }
          ]
        },
        {
          id: "aca-2", title: "Возражаем вежливо",
          words: [
            { en: "with all due respect", ru: "при всём уважении" },
            { en: "that's a valid point", ru: "это справедливое замечание" },
            { en: "I'm not entirely convinced", ru: "я не совсем убеждён" },
            { en: "to some extent", ru: "в некоторой степени" },
            { en: "nevertheless", ru: "тем не менее" }
          ],
          sentences: [
            { en: "With all due respect, I see things differently", ru: "При всём уважении, я смотрю на это иначе" },
            { en: "That's a valid point, but I'm not entirely convinced", ru: "Это справедливое замечание, но я не совсем убеждён" },
            { en: "I agree to some extent", ru: "Я согласен в некоторой степени" }
          ],
          dialogs: [
            {
              title: "Научная дискуссия",
              lines: [
                { who: "Профессор", en: "Social media has made people more isolated.", ru: "Соцсети сделали людей более изолированными." },
                { me: true, en: "With all due respect, I'm not entirely convinced.", ru: "При всём уважении, я не совсем убеждён.", wrong: ["With all due respect, I'm not entirely convincing.", "Thank you, have a nice day."] },
                { who: "Профессор", en: "Do you have any evidence?", ru: "У вас есть доказательства?" },
                { me: true, en: "Research suggests that online communities reduce loneliness.", ru: "Исследования показывают, что онлайн-сообщества уменьшают одиночество.", wrong: ["Research suggest that online communities reduce loneliness.", "Yes, I have a lot of friends online."] }
              ]
            }
          ]
        },
        {
          id: "aca-3", title: "Подводим итоги",
          words: [
            { en: "in conclusion", ru: "в заключение" },
            { en: "to sum up", ru: "подводя итог" },
            { en: "overall", ru: "в целом" },
            { en: "it is worth noting", ru: "стоит отметить" },
            { en: "the key point is", ru: "ключевой момент в том" }
          ],
          sentences: [
            { en: "In conclusion, the benefits outweigh the risks", ru: "В заключение, польза перевешивает риски" },
            { en: "Overall, the project was a success", ru: "В целом проект был успешным" },
            { en: "It is worth noting that costs have fallen", ru: "Стоит отметить, что расходы снизились" }
          ],
          story: {
            en: "Many people believe that working from home reduces productivity. However, recent research suggests the opposite. Employees who work remotely often report fewer distractions and better focus. Nevertheless, it is worth noting that some people miss social contact. Overall, a mix of office and home work seems to be the best solution.",
            ru: "Многие считают, что работа из дома снижает продуктивность. Однако недавние исследования говорят об обратном. Сотрудники на удалёнке часто отмечают меньше отвлечений и лучшую концентрацию. Тем не менее стоит отметить, что некоторым не хватает общения. В целом сочетание офиса и дома кажется лучшим решением.",
            questions: [
              { q: "Что показывают недавние исследования?", options: ["Удалёнка не снижает продуктивность", "Удалёнка снижает продуктивность", "Офис всегда лучше"], answer: "Удалёнка не снижает продуктивность" },
              { q: "Чего не хватает некоторым на удалёнке?", options: ["Общения", "Денег", "Компьютера"], answer: "Общения" },
              { q: "Какой вывод делает автор?", options: ["Лучше сочетать офис и дом", "Лучше только офис", "Лучше только дом"], answer: "Лучше сочетать офис и дом" }
            ]
          }
        }
      ]
    }
  ]
};

/* --------------------------------------------------------------------------
   Достижения. check(state) возвращает текущий прогресс (число),
   goal - сколько нужно для получения бейджа. badge - ключ значка в svg.js
   -------------------------------------------------------------------------- */
const ACHIEVEMENTS = [
  { id: "first-step",  title: "Первый шаг",     desc: "Пройдите первый урок",          goal: 1,    badge: "star",   colors: ["#ff8f6b", "#ff6b4a"], metric: "lessons" },
  { id: "lessons-10",  title: "Ученик",         desc: "Пройдите 10 уроков",            goal: 10,   badge: "book",   colors: ["#3bb7f6", "#1b86c9"], metric: "lessons" },
  { id: "lessons-25",  title: "Знаток",         desc: "Пройдите 25 уроков",            goal: 25,   badge: "cap",    colors: ["#9b7bff", "#6c4ee0"], metric: "lessons" },
  { id: "all-lessons", title: "Покоритель",     desc: "Пройдите весь курс",            goal: 0,    badge: "trophy", colors: ["#ffc83d", "#d99a0b"], metric: "allLessons" },
  { id: "unit-1",      title: "Первая вершина", desc: "Завершите целую главу",        goal: 1,    badge: "flag",   colors: ["#ff9a3d", "#d8701a"], metric: "units" },
  { id: "streak-3",    title: "В ритме",        desc: "Серия 3 дня подряд",            goal: 3,    badge: "spark",  colors: ["#ff9a3d", "#ff6b81"], metric: "bestStreak" },
  { id: "streak-7",    title: "Неделя огня",    desc: "Серия 7 дней подряд",           goal: 7,    badge: "spark",  colors: ["#ff6b81", "#d63c57"], metric: "bestStreak" },
  { id: "streak-30",   title: "Несгораемый",    desc: "Серия 30 дней подряд",          goal: 30,   badge: "spark",  colors: ["#9b7bff", "#ff6b81"], metric: "bestStreak" },
  { id: "xp-100",      title: "Разгон",         desc: "Наберите 100 XP",               goal: 100,  badge: "bolt",   colors: ["#ffc83d", "#ff9a3d"], metric: "xp" },
  { id: "xp-1000",     title: "Молния",         desc: "Наберите 1000 XP",              goal: 1000, badge: "bolt",   colors: ["#3bb7f6", "#9b7bff"], metric: "xp" },
  { id: "perfect-1",   title: "Без ошибок",     desc: "Пройдите урок без единой ошибки", goal: 1,  badge: "target", colors: ["#2dd4bf", "#119e8c"], metric: "perfect" },
  { id: "perfect-10",  title: "Снайпер",        desc: "10 уроков без ошибок",          goal: 10,   badge: "target", colors: ["#ff7ac8", "#c94a96"], metric: "perfect" },
  { id: "words-50",    title: "Словарь",        desc: "Выучите 50 слов",               goal: 50,   badge: "chat",   colors: ["#5b8cff", "#3a62d6"], metric: "words" },
  { id: "words-150",   title: "Полиглот",       desc: "Выучите 150 слов",              goal: 150,  badge: "globe",  colors: ["#2ec4a6", "#5b8cff"], metric: "words" },
  { id: "gems-500",    title: "Копилка",        desc: "Заработайте 500 монет",         goal: 500,  badge: "coin",   colors: ["#ffb547", "#e39b16"], metric: "gemsEarned" },
  { id: "night-owl",   title: "Ночная сова",    desc: "Позанимайтесь после 22:00",     goal: 1,    badge: "moon",   colors: ["#5b8cff", "#6c4ee0"], metric: "night" },
  { id: "early-bird",  title: "Ранняя пташка",  desc: "Позанимайтесь до 8:00",         goal: 1,    badge: "sun",    colors: ["#ffc83d", "#ff9a3d"], metric: "morning" }
];

/* Товары магазина за монеты */
const SHOP_ITEMS = [
  { id: "freeze",  title: "Заморозка серии",       desc: "Сохранит серию, если пропустите один день (до 2 шт.)", price: 200, pic: "freeze" },
  { id: "hat-cap",   title: "Кепка для Лингви",    desc: "Наряд для талисмана", price: 150, pic: "hat-cap",   hat: "cap" },
  { id: "hat-party", title: "Праздничный колпак",  desc: "Наряд для талисмана", price: 250, pic: "hat-party", hat: "party" },
  { id: "hat-crown", title: "Корона",              desc: "Для настоящих чемпионов", price: 600, pic: "hat-crown", hat: "crown" }
];

/* Правила игровой экономики (удобно менять в одном месте) */
const RULES = {
  xpPerCorrect: 2,         // XP за каждое верное упражнение
  xpLessonBonus: 10,       // бонус за завершение урока
  xpPerfectBonus: 5,       // бонус за урок без ошибок
  xpReplayFactor: 0.5,     // множитель XP при повторном прохождении
  gemsPerLesson: 10,
  gemsPerfectBonus: 5,
  exercisesPerLesson: 10,
  dailyGoals: [10, 20, 30, 50]
};

/* --------------------------------------------------------------------------
   Тренировка звуков: пары слов, которые русскоговорящим легко спутать.
   В игре звучит одно слово из пары, нужно выбрать, какое именно.
   -------------------------------------------------------------------------- */
const SOUND_PAIRS = [
  { group: "Короткий и долгий [i]", tip: "В ship звук короткий, в sheep долгий", pairs: [["ship", "корабль", "sheep", "овца"], ["live", "жить", "leave", "уходить"], ["sit", "сидеть", "seat", "место"], ["fill", "наполнять", "feel", "чувствовать"]] },
  { group: "Звук [th]", tip: "Кончик языка между зубами, а не [с] или [ф]", pairs: [["think", "думать", "sink", "раковина"], ["three", "три", "tree", "дерево"], ["thin", "тонкий", "fin", "плавник"], ["mouth", "рот", "mouse", "мышь"]] },
  { group: "Звуки [w] и [v]", tip: "[w] губами трубочкой, [v] зубами по губе", pairs: [["west", "запад", "vest", "жилет"], ["wine", "вино", "vine", "лоза"], ["wet", "мокрый", "vet", "ветеринар"]] },
  { group: "Звуки [æ] и [e]", tip: "В bad рот открыт шире, чем в bed", pairs: [["bad", "плохой", "bed", "кровать"], ["man", "мужчина", "men", "мужчины"], ["pan", "сковорода", "pen", "ручка"], ["sad", "грустный", "said", "сказал"]] },
  { group: "Звуки [ʌ] и [æ]", tip: "cut звучит ближе к русскому [а], cat шире", pairs: [["cut", "резать", "cat", "кошка"], ["cup", "чашка", "cap", "кепка"], ["fun", "веселье", "fan", "вентилятор"]] },
  { group: "Звуки [l] и [r]", tip: "[r] без вибрации, язык не касается нёба", pairs: [["light", "свет", "right", "правый"], ["long", "длинный", "wrong", "неправильный"], ["play", "играть", "pray", "молиться"]] },
  { group: "Короткий и долгий [u]", tip: "full короткий, fool долгий", pairs: [["full", "полный", "fool", "дурак"], ["pull", "тянуть", "pool", "бассейн"], ["look", "смотреть", "Luke", "Люк (имя)"]] }
];
/* --------------------------------------------------------------------------
   Уровни по европейской шкале CEFR. У каждой главы появляется поле level,
   а на маршруте перед первой главой уровня показывается заголовок.
   -------------------------------------------------------------------------- */
const LEVELS = [
  { id: "A1", title: "Начальный", desc: "Алфавит, первые слова и простые фразы", units: ["alphabet", "greetings", "pronouns", "tobe", "numbers", "colors", "family", "food", "time", "verbs", "questions"] },
  { id: "A2", title: "Элементарный", desc: "Прошлое, будущее и повседневное общение", units: ["continuous", "past", "phrases", "weather", "body", "clothes", "home", "skills", "future", "compare", "modals", "pastcont", "perfect", "travel", "talk"] },
  { id: "B1", title: "Средний", desc: "Условия, пассив, косвенная речь, работа", units: ["cond", "passive", "reported", "phrasal", "career"] },
  { id: "B2", title: "Выше среднего", desc: "Истории, догадки, сложные предложения", units: ["narrative", "deduction", "relative", "gerund", "society"] },
  { id: "C1", title: "Продвинутый", desc: "Сожаления, акценты, идиомы, деловой стиль", units: ["regrets", "emphasis", "idioms", "formal"] },
  { id: "C2", title: "Свободное владение", desc: "Тонкости смысла и академическая речь", units: ["nuance", "academic"] }
];
LEVELS.forEach((lv) => lv.units.forEach((id) => {
  const u = COURSE.units.find((x) => x.id === id);
  if (u) u.level = lv.id;
}));