/* USJ 15 сен 2026 — справочник парка + один рекомендательный маршрут.
   Маршрут без The Flying Dinosaur. Очереди/шоу — app USJ в день.
   Актуальность: авг 2026. */
const USJ_PLAN = {
  date: "Ваш визит: 15 сентября 2026 · вт",
  audited: "2026-08-07",
  truthNote: "Источники: usj.co.jp. ONE PIECE Premier Summer 30 июл–19 ноя 2026. Extreme Autumn 10 сен–8 ноя; HHN 11 сен–8 ноя. Spider-Man закрыт 22.01.2024. Villain-Con с 11.07.2025. Маршрут без Flying Dinosaur.",

  idea: {
    title: "Справочник + маршрут без Flying Dinosaur",
    lead: "Чип «Маршрут» — под Express Pass 4 и слот SNW. Чип «Ивенты» — что реально идёт 15 сен (в т.ч. ONE PIECE и HHN). Зоны — весь парк.",
    points: [
      "15 сен = одновременно Extreme Autumn / HHN и ONE PIECE Premier Summer (до 19 ноя).",
      "ONE PIECE Premier Show в WaterWorld — отдельный платный билет (~18:45); без него не планируем.",
      "Flying Dinosaur сознательно не берём. Очереди и слоты шоу — только app USJ в день."
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
      "ONE PIECE Premier Show — нужен отдельный билет (~18:45 WaterWorld), у вас его нет в чеклисте",
      "Sanji's Pirate Restaurant / Feast — лотерея/отдельный тикет",
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
      { t: "~13:30", what: "Быстрый обед", detail: "Фудкорт / зона Minions 25–35 мин. Kinopio's — только <20 мин. ONE PIECE-меню в парке — по желанию, не якорь." },
      { t: "~14:15", what: "Express: Minion Mayhem", detail: "Express №3. Рядом — Villain-Con Minion Blast (standby)." },
      { t: "~15:00", what: "Villain-Con Minion Blast", detail: "Шутер. Если очередь >60 мин — скип к Hollywood Dream." },
      { t: "~15:45", what: "Express: Hollywood Dream (Track 2)", detail: "Вперёд / Track 2: в сезон ONE PIECE часто Story Ride «Elbaph» (офиц. не на Backdrop). Трек/режим смотрите на панели и в app." },
      { t: "~16:40", what: "Space Fantasy", detail: "Indoor. Осенью часто Sadako-оверлей — смотрите app. Если тошнит после HD — пауза 15 мин." },
      { t: "~17:30", what: "JAWS (standby)", detail: "Express уже на HD. JAWS обычной очередью / Single Rider. Сезон HHN: Red Alert." },
      { t: "~18:00+", what: "Зомби HHN · не One Piece Show", detail: "Street Zombies с ~18:00 — бесплатно со Studio Pass. Premier Show ONE PIECE в WaterWorld ~18:45 — только с отдельным билетом (у вас нет → не идём, не стоим у входа)." },
      { t: "~18:30–20:00", what: "Backdrop / 4D / атмосфера", detail: "Backdrop (отдельная очередь; сезонные треки Chainsaw Man/Ado и др.), Chainsaw Man 4-D по app, или просто улица. Классический WaterWorld вечером занят ONE PIECE Show." },
      { t: "~20:00–21:30", what: "Хвост", detail: "Короткий повтор по app, мерч ONE PIECE/Universal на выход, атмосфера HHN." },
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
    lead: "В ваш день одновременно крутятся несколько сезонов. Главное, что раньше пропускали: ONE PIECE Premier Summer ещё идёт до 19 ноя. Плюс Extreme Autumn / HHN.",
    items: [
      {
        name: "ONE PIECE Premier Summer 2026",
        when: "30 июл – 19 ноя 2026",
        kind: "Крупный ивент · 15 сен внутри",
        tip: "Офиц. usj.co.jp/events/onepiece/summer-2026. Шоу + рестораны + Story Ride + еда/мерч. Не часть HHN — отдельный сезон, который пересекается с осенью."
      },
      {
        name: "ONE PIECE Premier Show 2026",
        when: "30 июл – 19 ноя · не каждый день",
        kind: "Платное шоу · WaterWorld",
        tip: "Двери ~18:15, старт ~18:45, ~80 мин. Нужен отдельный билет (студия Pass не включает). Без билета вечером WaterWorld под шоу не «свободный классический WaterWorld»."
      },
      {
        name: "ONE PIECE × Story Ride (Elbaph)",
        when: "сезон ONE PIECE",
        kind: "Оверлей на Hollywood Dream · Track 2",
        tip: "Офиц.: Hollywood Dream – The Ride (TRACK 2). На Backdrop этот ONE PIECE Story Ride не идёт. У вас Express на HD — с большой вероятностью попадёте на Track 2 / Story Ride; смотрите панель и app."
      },
      {
        name: "Sanji's Pirate Restaurant · Straw Hat Feast",
        when: "сезон ONE PIECE",
        kind: "Еда · отдельно",
        tip: "Платно / часто лотерея. В ваш план еды не заложено — только если купите отдельно. Уличная ONE PIECE-еда в парке — по желанию."
      },
      {
        name: "Universal Extreme Autumn · Discover U!!!",
        when: "10 сен – 8 ноя 2026",
        kind: "Сезон парка",
        tip: "Зонтик осени: HHN, сезонные оверлеи, декор. 25-летие Discover U!!!."
      },
      {
        name: "Halloween Horror Nights (15-летие)",
        when: "11 сен – 8 ноя 2026",
        kind: "Horror-сезон",
        tip: "Ваш день внутри. С ~18:00 Street Zombies. Лабиринты и R-18 — отдельно."
      },
      {
        name: "Street Zombies · Zombie de Dance",
        when: "~18:00 → закрытие",
        kind: "Улица",
        tip: "Входит в Studio Pass. Главная бесплатная вечерняя атмосфера, если нет билета на ONE PIECE Show."
      },
      {
        name: "Resident Evil Requiem: The Dive",
        when: "11 сен – 27 дек 2026",
        kind: "Horror · часто 15+",
        tip: "Timed Entry в app. 14 и младше — нельзя."
      },
      {
        name: "Lights Out: Nightmare Isolation",
        when: "сезон HHN",
        kind: "Horror · R-18",
        tip: "Waiver. Только если оба хотите жёсткий ужастик."
      },
      {
        name: "Factory of Fear · Witches of House 18 · HHN Academy",
        when: "сезон HHN",
        kind: "Horror / stage",
        tip: "Лабиринты и юбилейное шоу. Слоты и возрасты — в app."
      },
      {
        name: "SADAKO'S CURSE · JAWS Red Alert · Jurassic in the Dark",
        when: "сезон HHN / осень",
        kind: "Оверлеи на райдах",
        tip: "Space Fantasy / JAWS / вечерний Jurassic лодочный — смотрите названия в app."
      },
      {
        name: "Chainsaw Man 4-D · сезонные треки HD Backdrop",
        when: "Extreme Autumn",
        kind: "4D / саундтрек",
        tip: "4-D в Cinema. Backdrop: IRIS OUT / Ado / Soul Brothers и др. — у панели. Не путать с ONE PIECE Story Ride (тот на Track 2)."
      },
      {
        name: "Hogwarts Castle Walk",
        when: "1 сен 2026 – 17 янв 2027",
        kind: "Прогулка · Хогвартс",
        tip: "Особый маршрут по замку (сезон). Смотрите app / указатели в зоне."
      },
      {
        name: "Minions Belloween Greeting",
        when: "сезон Extreme Autumn",
        kind: "Улица / митап",
        tip: "Миньоны в хэллоуинских костюмах — коротко и бесплатно."
      },
      {
        name: "SUPER NINTENDO WORLD · 5th anniversary",
        when: "2026",
        kind: "Зона",
        tip: "Юбилейный декор. Вход часто timed entry — у вас Express-слот 11:50–12:50."
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
      blurb: "У входа: Hollywood Dream (Track 2 / Backdrop) и Space Fantasy. 15 сен Track 2 часто под ONE PIECE Story Ride.",
      attractions: [
        { name: "Hollywood Dream – The Ride (Track 2)", kind: "ride", thrill: 4, yourExpress: true, seasonal: true, tip: "В Express. В сезон ONE PIECE — Story Ride «Elbaph» на TRACK 2 (офиц.). Панель + app в день." },
        { name: "Hollywood Dream – Backdrop", kind: "ride", thrill: 5, seasonal: true, tip: "Назад, отдельная очередь. ONE PIECE Story Ride сюда не ставят. Осенью — другие сезонные треки (Chainsaw Man / Ado и др.)." },
        { name: "Space Fantasy – The Ride", kind: "ride", thrill: 3, seasonal: true, tip: "Indoor spinning coaster. Осенью часто Sadako's Curse." }
      ]
    },
    {
      key: "amity",
      name: "Amity Village",
      emoji: "🦈",
      blurb: "Зона JAWS. Классика с открытия парка.",
      attractions: [
        { name: "JAWS", kind: "ride", thrill: 2, yourExpress: true, seasonal: true, tip: "Лодочный тур + акула. Может обрызгать. В Pass 4 — альтернатива HD. Осенью: Red Alert." }
      ]
    },
    {
      key: "waterworld",
      name: "WaterWorld",
      emoji: "💦",
      blurb: "Площадка шоу. 15 сен вечером — ONE PIECE Premier Show (платно). Классический WaterWorld днём — смотрите app.",
      attractions: [
        { name: "ONE PIECE Premier Show 2026", kind: "show", thrill: 1, seasonal: true, tip: "~18:45, ~80 мин, отдельный билет. Без билета не входите в поток зрителей." },
        { name: "WaterWorld (классика)", kind: "show", thrill: 1, tip: "Дневные слоты пиротехники/воды — если идут в день; вечером площадка обычно под ONE PIECE. App = правда." }
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
