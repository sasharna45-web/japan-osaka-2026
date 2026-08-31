/* USJ 15 сен 2026 — идеальный маршрут + Halloween Horror Nights + справочник зон.
   Проверено и оптимизировано под ваш Express Pass 4 и комфортный темп.
   Карточки нажимаются → открывают подробности и лайфхаки. */
const USJ_PLAN = {
  date: "Ваш день: 15 сентября 2026 · Вторник",
  audited: "2026-08-31",
  truthNote: "Проверено по usj.co.jp: HHN 11.09–08.11; ONE PIECE Premier Summer до 19.11; Extreme Autumn 10.09–08.11; Hogwarts Castle Walk открыт. Spider-Man закрыт навсегда с янв 2024. Очереди и онлайн-слоты — в официальном app USJ в день визита.",
  
  idea: {
    title: "Идеальный план дня в USJ",
    lead: "Не превращайте день в военную спецоперацию на 25 пунктов! У вас уже есть 4 топовых Express Pass, фиксированный слот в Super Nintendo World, а с 18:00 парк превращается в грандиозный юбилейный Halloween Horror Nights.",
    points: [
      "🪄 Утро: Волшебный мир Гарри Поттера (Forbidden Journey по Express без очередей + сливочное пиво).",
      "🍄 Полдень (11:50): Super Nintendo World (вагонетка Donkey Kong по строгому слоту + Mario Kart).",
      "🎟️ День: Быстрый обед + закрытие дневных Express (Minion Mayhem + Hollywood Dream).",
      "🧟 Вечер (с 18:00): Halloween Horror Nights — толпы зомби на улицах, танцы ZOMBIE de DANCE, Chainsaw Man 4-D и хорроры по желанию!"
    ]
  },

  route: {
    title: "Главный маршрут · под ваш Express 4",
    vibe: "Гарри Поттер → Nintendo → Экспресс → Отдых → Ночной Хэллоуин",
    bestFor: "Комфортный темп без очередей и без самого жёсткого костера парка (Flying Dinosaur).",
    note: "Каркас дня — это ориентир. Если на второстепенную опцию очередь >45 мин — смело пропускайте и гуляйте в удовольствие.",
    
    blueprint: [
      { phase: "🌅 Утро", time: "07:30–08:45", text: "Вход в USJ без очередей", icon: "🌅" },
      { phase: "🪄 Хогвартс", time: "09:00–11:00", text: "Hippogriff → Forbidden Journey (Express) → Butterbeer → Фото замка", icon: "🪄" },
      { phase: "⏰ Переход", time: "11:20–11:30", text: "Спокойный переход к зеленой трубе Super Nintendo World", icon: "🚶" },
      { phase: "🍄 Nintendo", time: "11:50–14:00", text: "Mine Cart Madness (слот 11:50–12:20) → Mario Kart → Прогулка", icon: "🍄" },
      { phase: "🍜 Обед", time: "14:00–15:00", text: "Вкусный перекус в зоне Миньонов / фудкорт (не терять 2 ч)", icon: "🍜" },
      { phase: "🎟️ Express", time: "15:00–17:30", text: "Minion Mayhem (Express) → Hollywood Dream (Express Track 2)", icon: "🎟️" },
      { phase: "🎃 Пит-стоп", time: "17:30–17:50", text: "Отдых, Powerbank, туалет, сверка расписания HHN в app USJ", icon: "🔋" },
      { phase: "🧟 Хэллоуин", time: "18:00–22:00", text: "Street Zombies → ZOMBIE de DANCE → Chainsaw Man 4-D / Resident Evil → Ночной кайф", icon: "🧟" }
    ],

    skip: [
      { name: "The Flying Dinosaur", reason: "Ультра-жёсткий экстремальный костер с огромными очередями — бережём шею, нервы и силы." },
      { name: "Lights Out: Nightmare Isolation", reason: "R-18 аттракцион, требуется отдельный платный билет и расписка waiver — пропускаем." },
      { name: "ONE PIECE Premier Show", reason: "Платное вечернее шоу в WaterWorld (~18:45) по отдельным билетам — у нас его нет, у входа не стоим." },
      { name: "Sanji's Restaurant & 2-часовые очереди в Kinopio's", reason: "Едим быстро и вкусно на ходу, не тратя драгоценные часы на столики." }
    ],

    phases: [
      {
        id: "morning",
        title: "1. Утро · Прибытие и открытие ворот",
        time: "07:30 – 08:45",
        emoji: "🌅",
        lead: "Спокойный приезд к воротам до официального открытия. Парк почти всегда открывает турникеты на 30–45 минут раньше расписания.",
        badges: ["Вход", "Без паники"],
        steps: [
          "Приезжайте к главному входу USJ примерно к 07:30. Завтрак — заранее дома или онигири/кофе из конбини по дороге.",
          "Приготовьте QR-коды Studio Pass и Express Pass на экране телефона (лучше сделать скриншоты в «Фото» на случай слабого интернета).",
          "Как только ворота откроются (обычно ~08:15–08:30) — спокойно проходим турникеты и сразу идём направо, в волшебный лес к Хогвартсу. Толпа побежит к Flying Dinosaur — нам туда не надо!"
        ],
        tip: "Возьмите с собой компактный пауэрбанк, дождевик/пончо и маленький zip-пакет для телефона."
      },
      {
        id: "potter",
        title: "2. Хогвартс & Мир Гарри Поттера",
        time: "09:00 – 11:00",
        emoji: "🪄",
        lead: "Первый крупный хит дня. Атмосфера старинной деревни Хогсмид и полёт на метле вокруг замка по вашему Express Pass.",
        badges: ["Express Pass №1", "Фотогенично"],
        steps: [
          "🎢 Flight of the Hippogriff: загляните на табло очереди. Если ожидание <25 минут — прокатитесь для разминки (лёгкий семейный костер). Если очередь больше — сразу к замку.",
          "🏰 Harry Potter and the Forbidden Journey (Express Pass №1): заходим через Express-линию без очереди! Полёт на метле с Гарри Поттером сквозь драконов и дементоров внутри замка. Сумки сдаются в бесплатные локеры перед посадкой.",
          "🍺 Деревня Хогсмид: после аттракциона берем знаменитое сливочное пиво (Butterbeer — безалкогольный карамельный напиток с пенкой), фотографируем Хогвартс-экспресс и отражение замка в Черном озере.",
          "🪄 Лавка Олливандера: если интересно посмотреть шоу выбора волшебной палочки — можно заглянуть на 10 минут."
        ],
        tip: "Лучшие кадры Хогвартса получаются с террасы возле паба Three Broomsticks у воды."
      },
      {
        id: "nintendo",
        title: "3. Super Nintendo World (Главный блок дня)",
        time: "11:20 – 14:00",
        emoji: "🍄",
        lead: "Погружение в живую видеоигру Mario Land и джунгли Donkey Kong. Вход в зону по вашему фиксированному Express-слоту.",
        badges: ["Express Pass №2", "Слот 11:50–12:50", "Must See"],
        steps: [
          "⏰ 11:20–11:30: Выходим из Хогвартса и не спеша идём к гигантской зеленой трубе Super Nintendo World. По дороге — туалет и вода.",
          "🍌 11:50–12:20 | Mine Cart Madness (Express Pass №2): Входим в зону и сразу идём в Donkey Kong Country! Слот на вагонетку строго фиксирован (11:50–12:20) — прыгаем по сломанным рельсам без очередей.",
          "🏎️ Mario Kart: Koopa's Challenge: идём в замок Боузера. Если очередь Standby разумная или работает Single Rider — катаемся в AR-шлемах, бросая панцири в соперников.",
          "⭐ Прогулка по зоне: бьём блоки с монетами, смотрим на движущихся йоши и пиранья-растения, делаем яркие фото. Браслет Power-Up Band покупается по желанию на входе в зону."
        ],
        tip: "В Kinopio's Cafe не стойте дольше 20 минут — внутри зоны можно взять тематический перекус в киоске Yoshi's Snack Island (булочка-панцирь)."
      },
      {
        id: "lunch",
        title: "4. Обед и дневная передышка",
        time: "14:00 – 15:00",
        emoji: "🍜",
        lead: "Время восстановить силы, спокойно поесть и обсудить впечатления первой половины дня.",
        badges: ["Еда", "Отдых"],
        steps: [
          "Выходим из Nintendo World в сторону Minion Park или San Francisco.",
          "Обедаем без длинных очередей: отличный вариант — Happiness Cafe в зоне Миньонов (бургеры/карри с напитками без лимита) или фудкорт в зоне Discovery.",
          "Даём ногам отдохнуть 30–40 минут в прохладе, пьем воду и готовимся к дневным Express-хитам."
        ],
        tip: "Не наедайтесь слишком плотно прямо перед костером Hollywood Dream!"
      },
      {
        id: "express_afternoon",
        title: "5. Дневные Express-хиты & Голливуд",
        time: "15:00 – 17:30",
        emoji: "🎟️",
        lead: "Закрываем оставшиеся 2 аттракциона из вашего пакета Express Pass 4 + смотрим парковые локации.",
        badges: ["Express Pass №3", "Express Pass №4"],
        steps: [
          "🍌 Despicable Me Minion Mayhem (Express Pass №3): весёлый 3D-симулятор в доме Грю. Входим по Express без очереди.",
          "🎢 Hollywood Dream – The Ride (Express Pass №4): роскошный плавный костер с выбором музыки прямо в подголовнике сиденья. В сентябре на Track 2 (вперёд) часто играет трек One Piece «Elbaph» или King Gnu!",
          "🔫 Опции по желанию: если есть настроение и очередь <30 мин — можно заглянуть на Villain-Con Minion Blast (интерактивный шутер с бластерами) или лодочный аттракцион JAWS (челюсти акулы)."
        ],
        tip: "На Hollywood Dream перед посадкой выберите номер трека на персональной панели — музыка будет играть прямо в ушах во время полета!"
      },
      {
        id: "pitstop",
        title: "6. Пит-стоп перед ночным Хэллоуином",
        time: "17:30 – 18:00",
        emoji: "🔋",
        lead: "Переходный момент дня. Солнце садится, дневная часть завершена, парк готовится к наступлению темноты.",
        badges: ["Подзарядка", "Подготовка к HHN"],
        steps: [
          "Присядьте на лавочку в районе New York или Hollywood.",
          "Подключите телефоны к Powerbank — вечером будет много фото и видео в темноте.",
          "Откройте приложение USJ и посмотрите вечернее расписание: точное время танцев ZOMBIE de DANCE и текущие очереди в хорроры.",
          "Сходите в туалет, возьмите напиток или десерт."
        ],
        tip: "Ровно в 18:00 по радио прозвучит сирена, освещение в парке сменится на тревожное — начнётся Halloween Horror Nights!"
      },
      {
        id: "halloween_night",
        title: "7. Ночной USJ & Halloween Horror Nights",
        time: "18:00 – 22:00",
        emoji: "🧟",
        lead: "Главная изюминка сентября! 15-летие Horror Nights — крупнейшая орда зомби в истории парка, танцы на улицах и ночной драйв.",
        badges: ["HHN 15th Anniversary", "Зомби", "Chainsaw Man", "До закрытия"],
        steps: [
          "🧟 Street Zombies (на улицах парка): с 18:00 улицы Нью-Йорка и Голливуда заполняют профессиональные актеры в образах зомби разных типов (кибер-панк зомби, клоуны, монстры с бензопилами). Это абсолютно бесплатно со Studio Pass и невероятно атмосферно!",
          "💃 ZOMBIE de DANCE: уличный танцевальный флешмоб, где толпа зомби синхронно танцует под взрывные треки Ado. Смотрим и танцуем вместе со всеми.",
          "🪚 Chainsaw Man: The Chaos 4-D: проверяем очередь в Cinema 4-D. Если ожидание нормальное — обязательно заходим! Это супер-динамичный 4D-фильм со спецэффектами по Человеку-бензопиле.",
          "👻 Другие хорроры по желанию (проверяем время в app): Resident Evil (Biohazard) Requiem (по eTicket), Sadako × Space Fantasy (мистический оверлей на закрытый костер) или лабиринт Chucky.",
          "🎡 Ночные аттракционы и шопинг: после хорроров можно прокатиться на любом понравившемся аттракционе в темноте (очереди к 20:30 падают), сделать ночные фото и зайти в магазины на Голливудском бульваре за подарками.",
          "🌙 Гуляем до самого закрытия парка, насколько хватит сил!"
        ],
        tip: "В безопасных зонах (Universal Wonderland и входной навес) зомби нет — если захотите тишины, можно отдохнуть там."
      }
    ]
  },
  
  halloween: {
    title: "Halloween Horror Nights 2026",
    lead: "15-летний юбилей Horror Nights в USJ! Полный справочник всех вечерних событий и правил.",
    badge: "15th Anniversary HHN",
    items: [
      {
        name: "Street Zombies (Уличные зомби)",
        time: "с 18:00 до закрытия",
        status: "Бесплатно · Входит в билет",
        emoji: "🧟",
        highlight: true,
        desc: "Сотни зомби разных тематических отрядов выходят на улицы зон New York, Hollywood и San Francisco. Пугают, рычат, позируют для фото. Самое весёлое и драйвовое зрелище вечера.",
        advice: "Не трогайте актеров руками. Если страшно — отступите на тротуар или в безопасную зону."
      },
      {
        name: "ZOMBIE de DANCE",
        time: "Несколько раз за вечер (см. app)",
        status: "Бесплатно · Уличные сцены",
        emoji: "💃",
        highlight: true,
        desc: "Масштабный уличный танцевальный флешмоб с актерами-зомби под зажигательную музыку Ado (включая хит «Show»). Площадки: Gramercy Park и главные перекрёстки.",
        advice: "Приходите к сцене за 5–10 минут до начала по расписанию в приложении USJ."
      },
      {
        name: "Chainsaw Man: The Chaos 4-D",
        time: "В течение всего дня и вечера",
        status: "Cinema 4-D · Обычная очередь",
        emoji: "🪚",
        highlight: true,
        desc: "Специальный 4D-аттракцион в кинотеатре: подвижные кресла, брызги воды, ветер, 3D-очки и битва Дэндзи против демонов. Отличный кандидат на вечер!",
        advice: "Идеально зайти, когда очередь спадет до 30–40 минут."
      },
      {
        name: "Resident Evil: Requiem – The Dive",
        time: "По слотам Timed Entry",
        status: "Бесплатный eTicket в app USJ",
        emoji: "☣️",
        highlight: false,
        desc: "Хоррор-лабиринт по вселенной Обители Зла (Biohazard). Проходите через лаборатории и улицы Раккун-Сити среди мутантов и Licker-ов.",
        advice: "Ограничение 15+. Днем в приложении USJ нажмите «Timed Entry eTicket» и возьмите бесплатный слот на вечер."
      },
      {
        name: "Sadako's Curse (Проклятие Садако)",
        time: "Вечером на Space Fantasy",
        status: "Оверлей на костер Space Fantasy",
        emoji: "📼",
        highlight: false,
        desc: "Крытый космический костер Space Fantasy переоборудуется в атмосферу культового звонка «Звонок» в полной темноте.",
        advice: "Для любителей японской мистики — если тошнит на крутящихся костерах, лучше пропустить."
      },
      {
        name: "Chucky's Carnival of Chaos",
        time: "С полудня до вечера",
        status: "Хоррор-лабиринт (Stage 18)",
        emoji: "🔪",
        highlight: false,
        desc: "Безумный лабиринт с куклой-убийцей Чаки в 3D-очках с психоделическими визуальными искажениями.",
        advice: "Ограничение 15+. Очередь обычно 40–60 минут."
      },
      {
        name: "Lights Out: Nightmare Isolation",
        time: "Отдельный платный билет",
        status: "⚠️ R-18 · В план НЕ входит",
        emoji: "🚫",
        highlight: false,
        isWarning: true,
        desc: "Первый в истории USJ аттракцион с категорией R-18. Требуется отдельный билет, подписание расписки (waiver) и строго 18+.",
        advice: "Мы НЕ включаем его в маршрут, чтобы не тратить время и деньги на отдельный платный тикет."
      }
    ]
  },

  pass: {
    name: "Universal Express Pass 4 · Minions and Hollywood Dream",
    studio: "Studio Pass 1-day ×2 (куплены)",
    slots: [
      {
        label: "SUPER NINTENDO WORLD",
        time: "11:50 – 12:50",
        note: "Вход в зону Nintendo по Express Pass"
      },
      {
        label: "Mine Cart Madness (Donkey Kong)",
        time: "11:50 – 12:20",
        note: "Строгий слот на вагонетку Donkey Kong"
      }
    ],
    express: [
      {
        name: "1. Mine Cart Madness (Donkey Kong)",
        tip: "Слот 11:50–12:20 внутри Nintendo World"
      },
      {
        name: "2. Harry Potter and the Forbidden Journey",
        tip: "Express без очереди в Хогвартсе (утро ~09:15)"
      },
      {
        name: "3. Despicable Me Minion Mayhem",
        tip: "Express без очереди в парке Миньонов (день ~15:00)"
      },
      {
        name: "4. Hollywood Dream – The Ride (или JAWS)",
        tip: "Express на выбор (рекомендуем Hollywood Dream вперед Track 2)"
      }
    ],
    note: "Mario Kart, Yoshi, Chainsaw Man 4-D, Space Fantasy, Villain-Con и уличные зомби доступны в порядке обычной очереди (Standby / Single Rider)."
  },

  events: {
    title: "Сезонные ивенты 15 сен 2026",
    lead: "В ваш день одновременно действуют сразу три мощных сезона парка:",
    items: [
      {
        name: "Halloween Horror Nights (15-летие)",
        when: "11 сен – 8 ноя 2026",
        kind: "Главный сезон осени",
        tip: "Street Zombies с 18:00, ZOMBIE de DANCE с Ado, хоррор-лабиринты и оверлеи. Входит в Studio Pass!",
        more: [
          "15-летний юбилей легендарного фестиваля ужасов USJ.",
          "С 18:00 зомби выходят на улицы парка.",
          "Танцевальные шоу ZOMBIE de DANCE на центральных площадях.",
          "Хоррор-аттракционы: Chainsaw Man 4-D, Biohazard Requiem, Sadako."
        ]
      },
      {
        name: "ONE PIECE Premier Summer 2026",
        when: "30 июл – 19 ноя 2026",
        kind: "Аниме-сезон",
        tip: "Специальный оверлей Story Ride «Elbaph» на костере Hollywood Dream Track 2, тематическая еда и мерч по One Piece.",
        more: [
          "Story Ride на Hollywood Dream (Track 2): история гигантов Эльбафа во время полета.",
          "Тематические напитки и закуски в ресторанах парка.",
          "Premier Show в WaterWorld — отдельный платный билет (пропускаем)."
        ]
      },
      {
        name: "Universal Extreme Autumn · Discover U!",
        when: "10 сен – 8 ноя 2026",
        kind: "Осенний декор и музыка",
        tip: "Хэллоуинский декор, миньоны в костюмах летучих мышей и вампиров, специальная музыка в парке.",
        more: [
          "Праздничные фотозоны по всему парку.",
          "Миньоны Belloween Greeting в забавных хэллоуинских нарядах.",
          "Осеннее меню в кафе."
        ]
      }
    ]
  },
  gone: [
    {
      name: "The Amazing Adventures of Spider-Man",
      note: "Закрыт навсегда с 22.01.2024"
    },
    {
      name: "Terminator 2: 3-D",
      note: "Закрыт"
    },
    {
      name: "Backdraft",
      note: "Закрыт · на месте — Villain-Con Minion Blast"
    }
  ],
  zones: [
    {
      key: "snw",
      name: "SUPER NINTENDO WORLD",
      emoji: "🍄",
      blurb: "Mario Land + Donkey Kong Country. Часто timed entry. У вас вход 11:50–12:50 + Mine Cart 11:50–12:20.",
      attractions: [
        {
          name: "Mine Cart Madness",
          kind: "ride",
          thrill: 3,
          yourExpress: true,
          tip: "Вагонетка Donkey Kong. Слот Express жёсткий. Может закрываться при дожде/ветре.",
          more: [
            "Donkey Kong Country. Слот Express 11:50–12:20 — жёсткий.",
            "Может закрываться при дожде/ветре.",
            "После вагонетки — Mario Kart / Yoshi, не магазин на час."
          ]
        },
        {
          name: "Mario Kart: Koopa's Challenge",
          kind: "ride",
          thrill: 1,
          tip: "AR-гонка в замке Боузера. Standby / Single Rider. Первый круг — понять правила, второй — веселее.",
          more: [
            "AR-гонка в замке Боузера.",
            "Не в вашем Express — standby / Single Rider.",
            "Первый круг часто «просто понять правила»."
          ]
        },
        {
          name: "Yoshi's Adventure",
          kind: "ride",
          thrill: 0,
          tip: "Спокойный трек, охота за яйцами. Для взрослых — опция, если очередь короткая.",
          more: [
            "Спокойный трек.",
            "Берите только если очередь короткая после Mario Kart."
          ]
        },
        {
          name: "Power-Up Band · Key Challenges",
          kind: "interactive",
          thrill: 0,
          tip: "Платный браслет: мини-игры по зоне. Без браслета зона всё равно ок — фото и райды.",
          more: [
            "Платный браслет: мини-игры по зоне. Без браслета зона всё равно ок — фото и райды."
          ]
        },
        {
          name: "Kinopio's Café · киоски",
          kind: "food",
          thrill: 0,
          tip: "Тема Toad. Очередь часто длинная — не must.",
          more: [
            "Тема Toad. Очередь часто длинная — не must."
          ]
        }
      ]
    },
    {
      key: "potter",
      name: "The Wizarding World of Harry Potter",
      emoji: "🧙",
      blurb: "Hogsmeade + Хогвартс. Очередь Forbidden Journey — часть атмосферы (кабинет Дамблдора, портреты).",
      attractions: [
        {
          name: "Harry Potter and the Forbidden Journey",
          kind: "ride",
          thrill: 3,
          yourExpress: true,
          tip: "Полёт по замку. Сильная укачиваемость у многих — не сразу после еды.",
          more: [
            "Express у вас есть — жгите рано утром.",
            "Сильная укачиваемость у многих — не сразу после еды.",
            "Очередь-замок стоит увидеть, но без залипания на 40 мин."
          ]
        },
        {
          name: "Flight of the Hippogriff",
          kind: "ride",
          thrill: 2,
          tip: "Короткий семейный костер. Хороший бонус, не must.",
          more: [
            "Короткий семейный костер.",
            "Опция при очереди <25 мин."
          ]
        },
        {
          name: "Ollivanders",
          kind: "show",
          thrill: 0,
          tip: "Короткое шоу выбора палочки. Очередь отдельно.",
          more: [
            "Короткое шоу выбора палочки. Очередь отдельно."
          ]
        },
        {
          name: "Wand Magic",
          kind: "interactive",
          thrill: 0,
          tip: "Интерактивные точки по деревне с купленной палочкой.",
          more: [
            "Интерактивные точки по деревне с купленной палочкой."
          ]
        },
        {
          name: "Three Broomsticks · Butterbeer",
          kind: "food",
          thrill: 0,
          tip: "Атмосферная посадка / сливочное пиво. Дольше фудкорта.",
          more: [
            "Атмосферная посадка / сливочное пиво. Дольше фудкорта."
          ]
        },
        {
          name: "Hogwarts Castle Walk (сезон)",
          kind: "area",
          thrill: 0,
          seasonal: true,
          tip: "Иногда открывают особый маршрут по замку — смотрите app осенью.",
          more: [
            "Иногда открывают особый маршрут по замку — смотрите app осенью."
          ]
        }
      ]
    },
    {
      key: "minion",
      name: "Minion Park",
      emoji: "🟡",
      blurb: "Жёлтая зона Illumination. Рядом удобно стыковать Express Minion Mayhem и шутер.",
      attractions: [
        {
          name: "Despicable Me Minion Mayhem",
          kind: "ride",
          thrill: 2,
          yourExpress: true,
          tip: "Симулятор 3D. В вашем Express Pass 4.",
          more: [
            "Симулятор 3D. В Express Pass 4.",
            "Рядом удобно стыковать Villain-Con и обед."
          ]
        },
        {
          name: "Villain-Con Minion Blast",
          kind: "ride",
          thrill: 1,
          tip: "Офиц. Illumination's Villain-Con Minion Blast (яп. «хачамеча миссия»). Шутер на движущейся дорожке, открыт 2025 на месте Backdraft. Standby.",
          more: [
            "Офиц. Illumination's Villain-Con Minion Blast (открыт 11.07.2025).",
            "Шутер на движущейся дорожке, на месте Backdraft.",
            "Не в Express — standby. Если >60 мин — скип."
          ]
        },
        {
          name: "Freeze Ray Sliders",
          kind: "ride",
          thrill: 1,
          tip: "Уличный спиннер (Minion Mayhem Ice). Укачивание возможно.",
          more: [
            "Уличный спиннер (Minion Mayhem Ice). Укачивание возможно."
          ]
        },
        {
          name: "Кафе / мерч Minions",
          kind: "food",
          thrill: 0,
          tip: "Быстрый обед рядом с райдами.",
          more: [
            "Быстрый обед рядом с райдами."
          ]
        }
      ]
    },
    {
      key: "jurassic",
      name: "Jurassic Park",
      emoji: "🦕",
      blurb: "Два разных вайба: жёсткий flying coaster и мокрый лодочный.",
      attractions: [
        {
          name: "The Flying Dinosaur",
          kind: "ride",
          thrill: 5,
          tip: "Самый жёсткий костер парка (лицом вниз). Нет в вашем Express. Single Rider часто спасает.",
          more: [
            "Самый жёсткий костер парка (лицом вниз).",
            "В рекомендательном маршруте сознательно не берём.",
            "В справочнике оставлен для полноты."
          ]
        },
        {
          name: "Jurassic Park – The Ride",
          kind: "ride",
          thrill: 3,
          tip: "Лодочный со сбросом. Промокнете. Осенью вечером может быть In the Dark.",
          more: [
            "Лодочный со сбросом, промокнете.",
            "В маршруте — опция утром, не Flying Dinosaur.",
            "Вечером возможен режим In the Dark."
          ]
        }
      ]
    },
    {
      key: "hollywood",
      name: "Hollywood",
      emoji: "🎬",
      blurb: "У входа: Hollywood Dream (Track 2 / Backdrop) и Space Fantasy. 15 сен Track 2 часто под ONE PIECE Story Ride.",
      attractions: [
        {
          name: "Hollywood Dream – The Ride (Track 2)",
          kind: "ride",
          thrill: 4,
          yourExpress: true,
          seasonal: true,
          tip: "В Express. В сезон ONE PIECE — Story Ride «Elbaph» на TRACK 2 (офиц.). Панель + app в день.",
          more: [
            "В вашем Express.",
            "В сезон ONE PIECE часто Story Ride Elbaph на TRACK 2.",
            "Смотрите панель и app."
          ]
        },
        {
          name: "Hollywood Dream – Backdrop",
          kind: "ride",
          thrill: 5,
          seasonal: true,
          tip: "Назад, отдельная очередь. ONE PIECE Story Ride сюда не ставят. Осенью — другие сезонные треки (Chainsaw Man / Ado и др.).",
          more: [
            "Отдельная очередь «назад».",
            "ONE PIECE Story Ride сюда не ставят.",
            "Осенью — другие сезонные треки."
          ]
        },
        {
          name: "Space Fantasy – The Ride",
          kind: "ride",
          thrill: 3,
          seasonal: true,
          tip: "Indoor spinning coaster. Осенью часто Sadako's Curse.",
          more: [
            "Indoor spinning coaster.",
            "Осенью часто Sadako's Curse."
          ]
        }
      ]
    },
    {
      key: "amity",
      name: "Amity Village",
      emoji: "🦈",
      blurb: "Зона JAWS. Классика с открытия парка.",
      attractions: [
        {
          name: "JAWS",
          kind: "ride",
          thrill: 2,
          yourExpress: true,
          seasonal: true,
          tip: "Лодочный тур + акула. Может обрызгать. В Pass 4 — альтернатива HD. Осенью: Red Alert.",
          more: [
            "Может быть 4-м Express вместо HD — в маршруте HD предпочтительнее.",
            "Сезон: Red Alert.",
            "Standby / Single Rider после HD."
          ]
        }
      ]
    },
    {
      key: "waterworld",
      name: "WaterWorld",
      emoji: "💦",
      blurb: "Площадка шоу. 15 сен вечером — ONE PIECE Premier Show (платно). Классический WaterWorld днём — смотрите app.",
      attractions: [
        {
          name: "ONE PIECE Premier Show 2026",
          kind: "show",
          thrill: 1,
          seasonal: true,
          tip: "~18:45, ~80 мин, отдельный билет. Без билета не входите в поток зрителей.",
          more: [
            "~18:45, ~80 мин, WaterWorld.",
            "Отдельный билет. Без билета не идём."
          ]
        },
        {
          name: "WaterWorld (классика)",
          kind: "show",
          thrill: 1,
          tip: "Дневные слоты пиротехники/воды — если идут в день; вечером площадка обычно под ONE PIECE. App = правда.",
          more: [
            "Дневные слоты — если есть в app.",
            "Вечером площадка обычно под ONE PIECE Show."
          ]
        }
      ]
    },
    {
      key: "newyork",
      name: "New York · Stage / 4D",
      emoji: "🏙️",
      blurb: "Театры и сезонные horror/4D. Постоянных «больших» райдов после закрытия Spider-Man почти нет.",
      attractions: [
        {
          name: "Cinema 4-D (сезонные шоу)",
          kind: "show",
          thrill: 1,
          seasonal: true,
          tip: "Осенью 2026: Chainsaw Man The Chaos 4-D и др. Расписание в app.",
          more: [
            "Осенью 2026: Chainsaw Man The Chaos 4-D и др. Расписание в app."
          ]
        },
        {
          name: "Stage 18 / 22 · HHN attractions",
          kind: "show",
          thrill: 4,
          seasonal: true,
          tip: "Resident Evil, Lights Out, Factory of Fear, Witches… — сезонные, часто Timed Entry и возрастной ценз.",
          more: [
            "Resident Evil, Lights Out, Factory of Fear, Witches… — сезонные, часто Timed Entry и возрастной ценз."
          ]
        },
        {
          name: "Gramercy Park · HHN Academy",
          kind: "show",
          thrill: 2,
          seasonal: true,
          tip: "Юбилейное horror-шоу улицы/сцены в сезон HHN.",
          more: [
            "Юбилейное horror-шоу улицы/сцены в сезон HHN."
          ]
        }
      ]
    },
    {
      key: "wonderland",
      name: "Universal Wonderland",
      emoji: "🎈",
      blurb: "Детская зона: Hello Kitty, Snoopy, Elmo / Curious George. Взрослым без детей — низкий приоритет.",
      attractions: [
        {
          name: "Hello Kitty's Cupcake Dream",
          kind: "ride",
          thrill: 0,
          tip: "Спиннер Cupcake.",
          more: [
            "Спиннер Cupcake."
          ]
        },
        {
          name: "The Flying Snoopy",
          kind: "ride",
          thrill: 0,
          tip: "Мягкий «полёт», высота регулируется.",
          more: [
            "Мягкий «полёт», высота регулируется."
          ]
        },
        {
          name: "Snoopy's Flying Ace Adventure",
          kind: "ride",
          thrill: 1,
          tip: "Короткий детский костер.",
          more: [
            "Короткий детский костер."
          ]
        },
        {
          name: "Elmo / Curious George (зона)",
          kind: "area",
          thrill: 0,
          tip: "Несколько мягких райдов и фотозоны — смотрите app, если идёте с детьми.",
          more: [
            "Несколько мягких райдов и фотозоны — смотрите app, если идёте с детьми."
          ]
        }
      ]
    },
    {
      key: "sanfran",
      name: "San Francisco · прочее",
      emoji: "🌉",
      blurb: "После закрытий крупных шоу зона тише. Магазины, перекусы, проход к другим районам.",
      attractions: [
        {
          name: "Прогулка / фото / фуд",
          kind: "area",
          thrill: 0,
          tip: "Не планируйте «главный райд» здесь — их почти не осталось.",
          more: [
            "Не планируйте «главный райд» здесь — их почти не осталось."
          ]
        }
      ]
    }
  ],
  foodGuide: {
    title: "Еда (кратко)",
    lead: "Полный план еды поездки — во вкладке «Еда». В парке: завтрак дома, днём фудкорт/Minions или Three Broomsticks, Kinopio's только при короткой очереди, ужин после выхода (завтра Kuromon).",
    spots: [
      {
        name: "Завтрак дома",
        when: "до парка",
        what: "Плотно. Утренние кассы у входа съедают время.",
        tip: ""
      },
      {
        name: "Фудкорты / Minion",
        when: "обед",
        what: "Быстро и сытно.",
        tip: "Дефолт, если гоняете райды."
      },
      {
        name: "Three Broomsticks",
        when: "обед/вечер",
        what: "Посадка в Хогвартсе.",
        tip: "Дольше по времени."
      },
      {
        name: "Kinopio's Café",
        when: "SNW",
        what: "Тема Mario.",
        tip: "Только очередь <20 мин."
      }
    ]
  }
};
