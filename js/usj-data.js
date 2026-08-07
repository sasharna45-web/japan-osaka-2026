/* USJ 15 сен 2026 — справочник парка + один рекомендательный маршрут.
   Маршрут без The Flying Dinosaur. Очереди/шоу — app USJ в день.
   Актуальность: авг 2026. */
const USJ_PLAN = {
  date: "Ваш визит: 15 сентября 2026 · вт",
  audited: "2026-08-07",
  truthNote: "HHN 11 сен–8 ноя 2026 (офиц. USJ). Spider-Man закрыт 22.01.2024. Villain-Con открыт 11.07.2025. Маршрут без Flying Dinosaur.",

  idea: {
    title: "Справочник + один маршрут без Flying Dinosaur",
    lead: "Чип «Маршрут» — рекомендация под ваш Express Pass 4 и слот SNW, без The Flying Dinosaur. Остальные чипы — зоны, аттракционы и ивенты, если захотите отойти от плана.",
    points: [
      "Flying Dinosaur сознательно не берём (жёстко / укачивание / не must под ваш билет).",
      "Утро: Express Forbidden Journey → буфер к SNW 11:50.",
      "15 сен внутри HHN: с ~18:00 зомби на улицах — атмосфера без лабиринтов ок."
    ]
  },

  /** Рекомендательный день · без Flying Dinosaur. */
  route: {
    title: "Рекомендация · без Flying Dinosaur",
    vibe: "Express + SNW + костеры полегче · до вечера",
    bestFor: "Плотный день под ваш Pass 4, без самого жёсткого костера парка.",
    note: "Каркас, не догма. Если очередь >60 мин на опции — скип и смотрите app. Jurassic лодочный — только если утро свободное и очередь короткая.",
    skip: [
      "The Flying Dinosaur — не планируем",
      "Spider-Man — закрыт навсегда",
      "Час в Kinopio's ради фото",
      "Horror-лабиринты, если не хотите ужастики"
    ],
    timeline: [
      { t: "07:30", what: "У ворот", detail: "Очередь до открытия. Studio Pass + Express на экране. Завтрак дома. Пончо / zip для телефона." },
      { t: "~08:45–09:00", what: "Вход · к Хогвартсу", detail: "Открытие смотрите в app. Не к Flying Dinosaur — сразу в Wizarding World на Express." },
      { t: "~09:05–09:50", what: "Express: Forbidden Journey", detail: "Закрываете Express №2 рано, пока очередь не выросла. Очередь-замок — часть атмосферы, но не стойте у каждого портрета по 10 мин." },
      { t: "~10:00", what: "Hippogriff или Hogsmeade", detail: "Hippogriff — только если очередь <25 мин. Иначе фото + Butterbeer навынос / туалет / вода. Three Broomsticks на посадку — не сейчас." },
      { t: "~10:30–11:20", what: "Опция: Jurassic лодочный", detail: "Jurassic Park – The Ride (не Flying Dinosaur), если путь удобный и очередь <40 мин. Иначе спокойный переход к SNW с запасом." },
      { t: "11:40", what: "К воротам SNW", detail: "Буфер до слота. Туалет + вода. Не фото у трубы на 20 мин." },
      { t: "11:50–12:20", what: "Mine Cart Madness", detail: "Вход в зону → сразу Donkey Kong по слоту. Якорь билета." },
      { t: "~12:25–13:20", what: "Mario Kart → Yoshi", detail: "Mario Kart standby / Single Rider. Yoshi — если очередь <25–30 мин. Магазин SNW — быстрый взгляд, пакеты не на весь день." },
      { t: "~13:30", what: "Быстрый обед", detail: "Фудкорт / зона Minions 25–35 мин. Kinopio's — только <20 мин." },
      { t: "~14:15", what: "Express: Minion Mayhem", detail: "Express №3. Рядом — Villain-Con Minion Blast (standby)." },
      { t: "~15:00", what: "Villain-Con Minion Blast", detail: "Шутер. Если очередь >60 мин — скип к Hollywood Dream." },
      { t: "~15:45", what: "Express: Hollywood Dream", detail: "Берите HD вперёд (не JAWS) — лучший 4-й Express на этот день. Трек выберите быстро у панели." },
      { t: "~16:40", what: "Space Fantasy", detail: "Indoor. Осенью часто Sadako-оверлей — смотрите app. Если тошнит после HD — пауза 15 мин." },
      { t: "~17:30", what: "JAWS (standby)", detail: "Express уже на HD. JAWS обычной очередью / Single Rider. Сезон: Red Alert." },
      { t: "~18:30", what: "Backdrop · шоу · зомби", detail: "По силам: Backdrop, WaterWorld/4D по app, или просто Street Zombies с ~18:00. Лабиринты — только если хотите." },
      { t: "~19:30–21:30", what: "Хвост", detail: "Короткий повтор по app, магазин на выход, атмосфера HHN." },
      { t: "~21:30–22:00", what: "Выход", detail: "Закрытие — только в app. JR Yumesaki → Osaka → метро. Завтра Kuromon." }
    ]
  },

  /** Напоминание о купленном билете. */
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
        { name: "Villain-Con Minion Blast", kind: "ride", thrill: 1, tip: "Офиц. Illumination's Villain-Con Minion Blast (яп. «хачамеча миссия»). Шутер на движущейся дорожке, открыт 2025 на месте Backdraft. Standby." },
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
        { name: "Stage 18 / 22 · HHN attractions", kind: "show", thrill: 4, seasonal: true, tip: "Resident Evil, Lights Out, Factory of Fear, Witches… — сезонные, часто Timed Entry и возрастной ценз." },
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
