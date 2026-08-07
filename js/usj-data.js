/* USJ 15 сен 2026 — справочник парка (зоны + аттракционы + ивенты).
   Без готовых маршрутов: выбираете сами по app и силам.
   Актуальность: авг 2026. Очереди/закрытия/слоты шоу — только app USJ в день. */
const USJ_PLAN = {
  date: "Ваш визит: 15 сентября 2026 · вт",
  audited: "2026-08-07",

  idea: {
    title: "Справочник парка · не маршрут",
    lead: "Ниже — актуальные зоны, аттракционы и осенние ивенты. Готовых таймлайнов нет: порядок собираете сами под очереди в app. Ваш Express Pass 4 и слот SNW — в блоке «Билет» как напоминание, что уже куплено.",
    points: [
      "15 сен = вторник внутри Halloween Horror Nights и Extreme Autumn.",
      "Spider-Man / Terminator / Backdraft закрыты навсегда — в списке нет.",
      "Сезонные оверлеи (Sadako, JAWS Red Alert, саундтреки HD) меняют вайб классических райдов — смотрите название в app."
    ]
  },

  /** Напоминание о купленном билете — не маршрут. */
  pass: {
    name: "Universal Express Pass 4 · Minions and Hollywood Dream",
    studio: "Studio Pass 1-day ×2 — куплены",
    slots: [
      { label: "SUPER NINTENDO WORLD", time: "11:50–12:50", note: "вход в зону по Express" },
      { label: "Mine Cart Madness", time: "11:50–12:20", note: "слот внутри SNW · жёсткий" }
    ],
    express: [
      { name: "Mine Cart Madness", tip: "слот 11:50–12:20" },
      { name: "Harry Potter and the Forbidden Journey", tip: "Express · 1 раз" },
      { name: "Despicable Me Minion Mayhem", tip: "Express · 1 раз" },
      { name: "Hollywood Dream – The Ride или JAWS", tip: "на выбор один" }
    ],
    note: "Mario Kart, Yoshi, Flying Dinosaur, Backdrop, Space Fantasy, Villain-Con — не в этом Express (standby / Single Rider)."
  },

  events: {
    title: "Ивенты на 15 сен 2026",
    lead: "Осень 2026 = 25-летие парка (Discover U!!!) + 15-летие Halloween Horror Nights. Днём — сезонная атмосфера Extreme Autumn; с вечера — зомби и horror-зоны.",
    items: [
      {
        name: "Universal Extreme Autumn · Discover U!!!",
        when: "10 сен – 8 ноя 2026",
        kind: "Сезон парка",
        tip: "Зонтик над всей осенью: коллабы, сезонные шоу/саундтреки, декор. HHN — часть этого сезона."
      },
      {
        name: "Halloween Horror Nights (15-летие)",
        when: "11 сен – 8 ноя 2026",
        kind: "Horror-сезон",
        tip: "Ваш день 15 сен внутри. С ~18:00 Street Zombies. Лабиринты и R-18 — отдельно, не обязательны."
      },
      {
        name: "Street Zombies · Zombie de Dance",
        when: "~18:00 → закрытие",
        kind: "Улица",
        tip: "Входит в Studio Pass. Атмосфера и фото без лабиринта. Zombie de Dance — уличный танцевальный слот (часто под King Gnu «SO BAD»)."
      },
      {
        name: "Resident Evil Requiem: The Dive",
        when: "11 сен – 27 дек 2026",
        kind: "Horror · часто 15+",
        tip: "Новый лабиринт/аттракцион HHN. Нужен Timed Entry в app. Гости 14 и младше — нельзя. Не must для райд-дня."
      },
      {
        name: "Lights Out: Nightmare Isolation",
        when: "сезон HHN",
        kind: "Horror · R-18",
        tip: "Первый R-18 опыт USJ, waiver. Только если оба хотите жёсткий ужастик."
      },
      {
        name: "Factory of Fear · Witches of House 18 · HHN Academy",
        when: "сезон HHN",
        kind: "Horror / stage",
        tip: "Лабиринты и юбилейное шоу «15 Years of Screams». Слоты и возрасты — в app."
      },
      {
        name: "SADAKO'S CURSE: Dark Horror Ride",
        when: "11 сен 2026 – ~4 янв 2027",
        kind: "Оверлей на Space Fantasy",
        tip: "Тот же Space Fantasy, horror-режим. В app может отображаться как Sadako, не как обычный Space Fantasy."
      },
      {
        name: "JAWS: Red Alert",
        when: "11 сен 2026 – ~31 янв 2027",
        kind: "Оверлей на JAWS",
        tip: "Сезонный horror-вайб на классическом JAWS. Очередь и эффекты — по app."
      },
      {
        name: "Chainsaw Man: The Chaos 4-D",
        when: "сезон Extreme Autumn",
        kind: "4D · «кино»",
        tip: "Cinema 4-D. Слоты по расписанию. Хорошая пауза для ног."
      },
      {
        name: "Hollywood Dream · сезонные треки",
        when: "осень 2026",
        kind: "Саундтрек на костере",
        tip: "Вперёд: часто King Gnu «SO BAD» и др. Backdrop: Chainsaw Man × «IRIS OUT», Ado «Show», Sandaime J Soul Brothers и т.п. — список в app у панели."
      },
      {
        name: "Jurassic Park – The Ride in the Dark",
        when: "сезон HHN (вечером)",
        kind: "Ночной режим лодочного",
        tip: "Тот же Jurassic Park – The Ride, темнее и страшнее. Если идёт — смотрите в app."
      },
      {
        name: "SUPER NINTENDO WORLD · 5th anniversary",
        when: "2026",
        kind: "Зона",
        tip: "Юбилейный декор/митап/еда. Вход в зону часто по timed entry (у вас — Express-слот 11:50–12:50)."
      }
    ]
  },

  gone: [
    { name: "The Amazing Adventures of Spider-Man", note: "Закрыт навсегда с 22.01.2024" },
    { name: "Terminator 2: 3-D", note: "Закрыт" },
    { name: "Backdraft", note: "Закрыт · на месте — Villain-Con Minion Blast" }
  ],

  /**
   * zones[].attractions[]:
   * kind: ride | show | interactive | food | shop | area
   * thrill: 0..5
   * express: true если бывает в Express (не значит «в вашем Pass»)
   * yourExpress: true если в вашем Pass 4 / слоте
   * seasonal: краткая пометка осеннего оверлея
   */
  zones: [
    {
      key: "snw",
      name: "SUPER NINTENDO WORLD",
      emoji: "🍄",
      blurb: "Mario Land + Donkey Kong Country. Часто timed entry. У вас вход 11:50–12:50 + Mine Cart 11:50–12:20.",
      attractions: [
        { name: "Mine Cart Madness", kind: "ride", thrill: 3, yourExpress: true, tip: "Вагонетка Donkey Kong. Слот Express жёсткий. Может закрываться при дожде/ветре." },
        { name: "Mario Kart: Koopa's Challenge", kind: "ride", thrill: 1, tip: "AR-гонка в замке Боузера. Standby / Single Rider. Первый круг — понять правила, второй — веселее." },
        { name: "Yoshi's Adventure", kind: "ride", thrill: 0, tip: "Спокойный трек, охота за яйцами. Для взрослых — опция, если очередь короткая." },
        { name: "Power-Up Band · Key Challenges", kind: "interactive", thrill: 0, tip: "Платный браслет: мини-игры по зоне. Без браслета зона всё равно ок — фото и райды." },
        { name: "Kinopio's Café · киоски", kind: "food", thrill: 0, tip: "Тема Toad. Очередь часто длинная — не must." }
      ]
    },
    {
      key: "potter",
      name: "The Wizarding World of Harry Potter",
      emoji: "🧙",
      blurb: "Hogsmeade + Хогвартс. Очередь Forbidden Journey — часть атмосферы (кабинет Дамблдора, портреты).",
      attractions: [
        { name: "Harry Potter and the Forbidden Journey", kind: "ride", thrill: 3, yourExpress: true, tip: "Полёт по замку. Сильная укачиваемость у многих — не сразу после еды." },
        { name: "Flight of the Hippogriff", kind: "ride", thrill: 2, tip: "Короткий семейный костер. Хороший бонус, не must." },
        { name: "Ollivanders", kind: "show", thrill: 0, tip: "Короткое шоу выбора палочки. Очередь отдельно." },
        { name: "Wand Magic", kind: "interactive", thrill: 0, tip: "Интерактивные точки по деревне с купленной палочкой." },
        { name: "Three Broomsticks · Butterbeer", kind: "food", thrill: 0, tip: "Атмосферная посадка / сливочное пиво. Дольше фудкорта." },
        { name: "Hogwarts Castle Walk (сезон)", kind: "area", thrill: 0, seasonal: true, tip: "Иногда открывают особый маршрут по замку — смотрите app осенью." }
      ]
    },
    {
      key: "minion",
      name: "Minion Park",
      emoji: "🟡",
      blurb: "Жёлтая зона Illumination. Рядом удобно стыковать Express Minion Mayhem и шутер.",
      attractions: [
        { name: "Despicable Me Minion Mayhem", kind: "ride", thrill: 2, yourExpress: true, tip: "Симулятор 3D. В вашем Express Pass 4." },
        { name: "Villain-Con Minion Blast", kind: "ride", thrill: 1, tip: "Интерактивный шутер (на месте Backdraft). В гидах 2025–26 также как Minion Mayhem Mission. Standby." },
        { name: "Freeze Ray Sliders", kind: "ride", thrill: 1, tip: "Уличный спиннер (Minion Mayhem Ice). Укачивание возможно." },
        { name: "Кафе / мерч Minions", kind: "food", thrill: 0, tip: "Быстрый обед рядом с райдами." }
      ]
    },
    {
      key: "jurassic",
      name: "Jurassic Park",
      emoji: "🦕",
      blurb: "Два разных вайба: жёсткий flying coaster и мокрый лодочный.",
      attractions: [
        { name: "The Flying Dinosaur", kind: "ride", thrill: 5, tip: "Самый жёсткий костер парка (лицом вниз). Нет в вашем Express. Single Rider часто спасает." },
        { name: "Jurassic Park – The Ride", kind: "ride", thrill: 3, tip: "Лодочный со сбросом. Промокнете. Осенью вечером может быть In the Dark." }
      ]
    },
    {
      key: "hollywood",
      name: "Hollywood",
      emoji: "🎬",
      blurb: "У входа: главные костеры «с музыкой» и indoor Space Fantasy.",
      attractions: [
        { name: "Hollywood Dream – The Ride", kind: "ride", thrill: 4, yourExpress: true, tip: "Костер вперёд + свой трек. В Express как один из вариантов 4-го слота (или JAWS)." },
        { name: "Hollywood Dream – Backdrop", kind: "ride", thrill: 5, tip: "Тот же трек назад, отдельная очередь. Не в Express Pass 4. Осенью — сезонные треки (IRIS OUT и др.)." },
        { name: "Space Fantasy – The Ride", kind: "ride", thrill: 3, tip: "Indoor spinning coaster. Осенью часто Sadako's Curse." }
      ]
    },
    {
      key: "amity",
      name: "Amity Village",
      emoji: "🦈",
      blurb: "Зона JAWS. Классика с открытия парка.",
      attractions: [
        { name: "JAWS", kind: "ride", thrill: 2, yourExpress: true, tip: "Лодочный тур + акула. Может обрызгать. В вашем Pass 4 — альтернатива HD. Осенью: Red Alert." }
      ]
    },
    {
      key: "waterworld",
      name: "WaterWorld",
      emoji: "💦",
      blurb: "Сценическое шоу, не райд. Первые ряды мокрые.",
      attractions: [
        { name: "WaterWorld", kind: "show", thrill: 1, tip: "Пиротехника, трюки, вода ~20–25 мин. Слоты в app; приходите заранее." }
      ]
    },
    {
      key: "newyork",
      name: "New York · Stage / 4D",
      emoji: "🏙️",
      blurb: "Театры и сезонные horror/4D. Постоянных «больших» райдов после закрытия Spider-Man почти нет.",
      attractions: [
        { name: "Cinema 4-D (сезонные шоу)", kind: "show", thrill: 1, seasonal: true, tip: "Осенью 2026: Chainsaw Man The Chaos 4-D и др. Расписание в app." },
        { name: "Stage 18 / 22 · HHN atractions", kind: "show", thrill: 4, seasonal: true, tip: "Resident Evil, Lights Out, Factory of Fear, Witches… — сезонные, часто Timed Entry и возрастной ценз." },
        { name: "Gramercy Park · HHN Academy", kind: "show", thrill: 2, seasonal: true, tip: "Юбилейное horror-шоу улицы/сцены в сезон HHN." }
      ]
    },
    {
      key: "wonderland",
      name: "Universal Wonderland",
      emoji: "🎈",
      blurb: "Детская зона: Hello Kitty, Snoopy, Elmo / Curious George. Взрослым без детей — низкий приоритет.",
      attractions: [
        { name: "Hello Kitty's Cupcake Dream", kind: "ride", thrill: 0, tip: "Спиннер Cupcake." },
        { name: "The Flying Snoopy", kind: "ride", thrill: 0, tip: "Мягкий «полёт», высота регулируется." },
        { name: "Snoopy's Flying Ace Adventure", kind: "ride", thrill: 1, tip: "Короткий детский костер." },
        { name: "Elmo / Curious George (зона)", kind: "area", thrill: 0, tip: "Несколько мягких райдов и фотозоны — смотрите app, если идёте с детьми." }
      ]
    },
    {
      key: "sanfran",
      name: "San Francisco · прочее",
      emoji: "🌉",
      blurb: "После закрытий крупных шоу зона тише. Магазины, перекусы, проход к другим районам.",
      attractions: [
        { name: "Прогулка / фото / фуд", kind: "area", thrill: 0, tip: "Не планируйте «главный райд» здесь — их почти не осталось." }
      ]
    }
  ],

  foodGuide: {
    title: "Еда (кратко)",
    lead: "Полный план еды поездки — во вкладке «Еда». В парке: завтрак дома, днём фудкорт/Minions или Three Broomsticks, Kinopio's только при короткой очереди, ужин после выхода (завтра Kuromon).",
    spots: [
      { name: "Завтрак дома", when: "до парка", what: "Плотно. Утренние кассы у входа съедают время.", tip: "" },
      { name: "Фудкорты / Minion", when: "обед", what: "Быстро и сытно.", tip: "Дефолт, если гоняете райды." },
      { name: "Three Broomsticks", when: "обед/вечер", what: "Посадка в Хогвартсе.", tip: "Дольше по времени." },
      { name: "Kinopio's Café", when: "SNW", what: "Тема Mario.", tip: "Только очередь <20 мин." }
    ]
  }
};
