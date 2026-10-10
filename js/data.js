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
            { en: "I and you", ru: "Я и ты" },
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
            { en: "student", ru: "студент" }
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
            { en: "teacher", ru: "учитель" },
            { en: "doctor", ru: "врач" },
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
            { en: "school", ru: "школа" },
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
            { en: "love", ru: "любить" }
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
            { en: "My brother is young", ru: "Мой брат младше", alt: ["My brother is young"] },
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
            { en: "I like fish and rice", ru: "Я люблю рыбу и рис" },
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
            { en: "week", ru: "неделя" },
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
            { en: "month", ru: "месяц" },
            { en: "year", ru: "год" }
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
            { en: "music", ru: "музыка" },
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
            { en: "which", ru: "который" },
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
            { en: "yes, I do", ru: "да (я делаю)" },
            { en: "no, I don't", ru: "нет (я не делаю)", alt: ["no, i do not"] },
            { en: "maybe", ru: "может быть" },
            { en: "of course", ru: "конечно" },
            { en: "right", ru: "правильно, верно" },
            { en: "wrong", ru: "неправильно" }
          ],
          sentences: [
            { en: "Yes, she does", ru: "Да, она любит (делает)" },
            { en: "No, he isn't", ru: "Нет, он не такой" },
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
            { en: "busy", ru: "занятой" },
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
            { text: "They ___ their grandmother.", options: ["visit", "visited", "visits"], answer: "visited", ru: "Они навестили бабушку." },
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
            { en: "Did you eat breakfast?", ru: "Ты завтракал?" }
          ],
          gaps: [
            { text: "She ___ a new bag.", options: ["buyed", "bought", "buy"], answer: "bought", ru: "Она купила новую сумку." },
            { text: "We ___ to the sea last year.", options: ["go", "goed", "went"], answer: "went", ru: "В прошлом году мы ездили на море." },
            { text: "___ you see the film?", options: ["Do", "Did", "Was"], answer: "Did", ru: "Ты видел фильм?" }
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
            { en: "menu", ru: "меню" },
            { en: "bill", ru: "счёт", alt: ["check"] },
            { en: "table", ru: "столик, стол" },
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
            { en: "price", ru: "цена" },
            { en: "cheap", ru: "дешёвый" },
            { en: "expensive", ru: "дорогой" },
            { en: "money", ru: "деньги" },
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
            { en: "wind", ru: "ветер" },
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
            { en: "spring", ru: "весна" },
            { en: "summer", ru: "лето" },
            { en: "autumn", ru: "осень", alt: ["fall"] },
            { en: "winter", ru: "зима" },
            { en: "tree", ru: "дерево", pic: "tree" },
            { en: "sea", ru: "море" }
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
            { en: "ear", ru: "ухо" },
            { en: "nose", ru: "нос" },
            { en: "mouth", ru: "рот" },
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
            { en: "arm", ru: "рука" },
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
            { text: "My leg ___.", options: ["hurt", "hurts", "hurting"], answer: "hurts", ru: "У меня болит нога." }
          ]
        },
        {
          id: "body-3", title: "У врача",
          words: [
            { en: "ill", ru: "больной", alt: ["sick"] },
            { en: "headache", ru: "головная боль" },
            { en: "medicine", ru: "лекарство" },
            { en: "hospital", ru: "больница" },
            { en: "healthy", ru: "здоровый" },
            { en: "rest", ru: "отдых" }
          ],
          sentences: [
            { en: "I have a headache", ru: "У меня болит голова" },
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
            { en: "jacket", ru: "куртка" },
            { en: "jeans", ru: "джинсы" }
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
            { en: "cheap", ru: "дешёвый" },
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
            { en: "kitchen", ru: "кухня" },
            { en: "bedroom", ru: "спальня" },
            { en: "bathroom", ru: "ванная" },
            { en: "living room", ru: "гостиная" },
            { en: "door", ru: "дверь" },
            { en: "window", ru: "окно" }
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
            { en: "table", ru: "стол" },
            { en: "lamp", ru: "лампа", pic: "lamp" },
            { en: "sofa", ru: "диван" },
            { en: "shelf", ru: "полка" }
          ],
          sentences: [
            { en: "There is a lamp on the table", ru: "На столе есть лампа" },
            { en: "There are two chairs", ru: "Там два стула" }
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
            { en: "driver", ru: "водитель" },
            { en: "cook", ru: "повар" },
            { en: "nurse", ru: "медсестра" },
            { en: "engineer", ru: "инженер" },
            { en: "artist", ru: "художник" }
          ],
          sentences: [
            { en: "What is your job?", ru: "Кем ты работаешь?" },
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
            { en: "sing", ru: "петь" },
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
            { en: "draw", ru: "рисовать" },
            { en: "cook", ru: "готовить" },
            { en: "travel", ru: "путешествовать" },
            { en: "photo", ru: "фотография" }
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
            { en: "call", ru: "звонить" }
          ],
          sentences: [
            { en: "I will call you later", ru: "Я позвоню тебе позже" },
            { en: "It will be sunny tomorrow", ru: "Завтра будет солнечно" },
            { en: "She won't come", ru: "Она не придёт" }
          ],
          gaps: [
            { text: "I ___ help you.", options: ["will", "am", "did"], answer: "will", ru: "Я помогу тебе." },
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
            { en: "summer", ru: "лето" }
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
            { en: "world", ru: "мир" },
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
            { text: "Every day he ___ to work.", options: ["goes", "went", "is going"], answer: "goes", ru: "Каждый день он ходит на работу." },
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
            { en: "expensive", ru: "дорогой" },
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
            { text: "My cold is ___ today.", options: ["bad", "worse", "worst"], answer: "worse", ru: "Сегодня моя простуда хуже." }
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
            { en: "I must go now", ru: "Мне нужно идти" }
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
            { en: "homework", ru: "домашнее задание" }
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
            { en: "doctor", ru: "врач" },
            { en: "sleep", ru: "спать" },
            { en: "sugar", ru: "сахар" }
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
            { text: "She was cooking when the phone ___.", options: ["rang", "was ringing", "rings"], answer: "rang", ru: "Она готовила, когда зазвонил телефон." },
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
            { en: "abroad", ru: "за границей" }
          ],
          sentences: [
            { en: "Have you ever been to London?", ru: "Ты когда-нибудь был в Лондоне?" },
            { en: "I have never seen snow", ru: "Я никогда не видел снег" },
            { en: "Have you tried sushi?", ru: "Ты пробовал суши?" }
          ],
          gaps: [
            { text: "Have you ___ been to Paris?", options: ["ever", "never", "yet"], answer: "ever", ru: "Ты когда-нибудь был в Париже?" },
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
            { text: "Have you finished ___?", options: ["yet", "already", "since"], answer: "yet", ru: "Ты уже закончил?" },
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
            { en: "airport", ru: "аэропорт" },
            { en: "passport", ru: "паспорт" },
            { en: "ticket", ru: "билет" },
            { en: "flight", ru: "рейс, полёт" },
            { en: "luggage", ru: "багаж" },
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
                { me: true, en: "Yes, here it is.", ru: "Да, вот он.", wrong: ["Yes, I am fine.", "No, I am a passport."] },
                { who: "Сотрудник", en: "Do you have any luggage?", ru: "У вас есть багаж?" },
                { me: true, en: "Yes, one bag.", ru: "Да, одна сумка.", wrong: ["Yes, at six o'clock.", "No, I have a ticket."] },
                { who: "Сотрудник", en: "Your gate is number five. Have a nice flight!", ru: "Ваш выход номер пять. Хорошего полёта!" },
                { me: true, en: "Thank you very much!", ru: "Большое спасибо!", wrong: ["You are welcome to the gate.", "Goodbye, my passport!"] }
              ]
            }
          ]
        },
        {
          id: "tr-2", title: "В отеле",
          words: [
            { en: "hotel", ru: "отель" },
            { en: "room", ru: "номер, комната" },
            { en: "reservation", ru: "бронь", alt: ["booking"] },
            { en: "key", ru: "ключ" },
            { en: "floor", ru: "этаж" },
            { en: "breakfast", ru: "завтрак" }
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
                { me: true, en: "Hi! I have a reservation.", ru: "Здравствуйте! У меня есть бронь.", wrong: ["Hi! I have a breakfast.", "Hi! I am a hotel."] },
                { who: "Администратор", en: "What is your name?", ru: "Как вас зовут?" },
                { me: true, en: "My name is Alex Smirnov.", ru: "Меня зовут Алекс Смирнов.", wrong: ["I am from room five.", "It is on the third floor."] },
                { who: "Администратор", en: "Here is your key. Room 305.", ru: "Вот ваш ключ. Номер 305." },
                { me: true, en: "What time is breakfast?", ru: "Во сколько завтрак?", wrong: ["Where is my passport, please?", "How old is the key?"] }
              ]
            }
          ]
        },
        {
          id: "tr-3", title: "Как пройти?",
          words: [
            { en: "map", ru: "карта" },
            { en: "straight on", ru: "прямо", alt: ["straight ahead"] },
            { en: "corner", ru: "угол" },
            { en: "bridge", ru: "мост" },
            { en: "museum", ru: "музей" },
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
            { en: "dessert", ru: "десерт" },
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
                { me: true, en: "Yes, I would like the fish, please.", ru: "Да, я бы хотел рыбу, пожалуйста.", wrong: ["Yes, I am a fish.", "No, I am ready to order."] },
                { who: "Официант", en: "Anything to drink?", ru: "Что-нибудь выпить?" },
                { me: true, en: "A glass of water, please.", ru: "Стакан воды, пожалуйста.", wrong: ["A plate of bread to drink.", "Yes, I am thirsty fish."] },
                { who: "Официант", en: "Would you like a dessert?", ru: "Хотите десерт?" },
                { me: true, en: "No, thank you. Can I have the bill?", ru: "Нет, спасибо. Можно счёт?", wrong: ["Yes, the bill is spicy.", "I would like a waiter."] }
              ]
            }
          ]
        },
        {
          id: "tk-2", title: "По телефону",
          words: [
            { en: "call back", ru: "перезвонить" },
            { en: "speaking", ru: "у телефона (я)" },
            { en: "message", ru: "сообщение" },
            { en: "hold on", ru: "подождите (на линии)" },
            { en: "busy", ru: "занят" },
            { en: "number", ru: "номер" }
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
                { me: true, en: "Hi Mary! It's Tom. How are you?", ru: "Привет, Мэри! Это Том. Как дела?", wrong: ["Hi Mary! I am a phone.", "Goodbye, Mary speaking."] },
                { who: "Мэри", en: "I'm fine, but I'm busy now. Can I call you back?", ru: "Нормально, но я сейчас занята. Можно я перезвоню?" },
                { me: true, en: "Sure, no problem. Talk later!", ru: "Конечно, без проблем. Поговорим позже!", wrong: ["Sure, I am busy number.", "No, call back yesterday."] }
              ]
            }
          ]
        },
        {
          id: "tk-3", title: "Приглашения",
          words: [
            { en: "invite", ru: "приглашать" },
            { en: "party", ru: "вечеринка" },
            { en: "birthday", ru: "день рождения" },
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
                { me: true, en: "Happy birthday! How old will you be?", ru: "С днём рождения! Сколько тебе исполнится?", wrong: ["Happy Saturday! Where is my cake?", "Good night, birthday!"] },
                { who: "Кейт", en: "Twenty! Would you like to come to my party?", ru: "Двадцать! Хочешь прийти на мою вечеринку?" },
                { me: true, en: "I'd love to! What time?", ru: "С удовольствием! Во сколько?", wrong: ["I'd love to be twenty.", "No, I am a party."] }
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