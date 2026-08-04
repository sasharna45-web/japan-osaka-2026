/**
 * Данные трекера поездки: маршрут + исследование цен (авг 2026).
 * Деньги: всего $3225. В трекере считаем РАБОЧИЕ ЙЕНЫ после обмена
 * (~$2225–2525 → ≈356–404k ¥ при ~160). Резерв $700–1000 долларами — отдельно.
 * Уже оплачено отдельно: жильё, самолёты, USJ, Umeda Sky, Harukas, Osaka Castle.
 */

const TRACKER = {
  title: "Трекер · Кансай 2026",
  travelers: "Александр и Рита",
  /** Всего на поездку (ещё до обмена). */
  totalUsd: 3225,
  reserveUsd: { min: 700, max: 1000 },
  /** Потолок трекера = середина рабочего йенового конверта ($2375 × 160). */
  budgetYen: 380000,
  budgetYenMin: 356000,
  budgetYenMax: 404000,
  softDailyYen: 18000,
  spendDays: 16,
  dateFrom: "2026-09-09",
  dateTo: "2026-09-24",
  note: "Трекер считает уже обменянные йены. План: $3225 всего → $700–1000 оставить долларами → в йены ~$2225–2525 (≈356–404k ¥). Спокойный темп ≈ 18 000 ¥/день. Крупное — из долларового резерва.",

  categories: [
    { id: "food", label: "Еда", emoji: "🍱" },
    { id: "transport", label: "Транспорт", emoji: "🚃" },
    { id: "ticket", label: "Входы", emoji: "🎟️" },
    { id: "shopping", label: "Шопинг", emoji: "🛍️" },
    { id: "other", label: "Другое", emoji: "📦" }
  ],

  days: [
    {
      n: 1, iso: "2026-09-09", date: "9 сентября", weekday: "Ср",
      title: "Прибытие и первые огни Осаки",
      goal: "Мягкая адаптация, без дальних поездок",
      soft: 14000,
      places: [
        { id: "d1-kix", name: "Прилёт в KIX", emoji: "✈️", time: "12:45", fixed: true },
        { id: "d1-home", name: "Квартира Tanimachi 6-chome", emoji: "🏠", time: "16:00" },
        { id: "d1-doton", name: "Dotonbori", emoji: "🌃", time: "вечер" }
      ]
    },
    {
      n: 2, iso: "2026-09-10", date: "10 сентября", weekday: "Чт",
      title: "Замок Осаки + Den Den Town",
      goal: "Замок утром, игровой район днём",
      soft: 18000,
      places: [
        { id: "d2-castle", name: "Осакский замок", emoji: "🏯", time: "утро", fixed: true, prepaid: true },
        { id: "d2-denden", name: "Den Den Town", emoji: "🎮", time: "день" },
        { id: "d2-potato", name: "Super Potato Osaka", emoji: "🕹️" },
        { id: "d2-shin", name: "Shinsekai + Tsutenkaku", emoji: "🗼", time: "вечер" }
      ]
    },
    {
      n: 3, iso: "2026-09-11", date: "11 сентября", weekday: "Пт",
      title: "Залив + Abeno Harukas",
      goal: "Океанариум и закат с высоты",
      soft: 22000,
      places: [
        { id: "d3-kaiyu", name: "Kaiyukan", emoji: "🐋", time: "10:00", est: 5400, estNote: "≈2 700 ¥ × 2" },
        { id: "d3-wheel", name: "Колесо Tempozan", emoji: "🎡", time: "≈12:30", est: 2000, estNote: "≈1 000 ¥ × 2" },
        { id: "d3-harukas", name: "Abeno Harukas 300", emoji: "🏙️", time: "17:00", fixed: true, prepaid: true }
      ]
    },
    {
      n: 4, iso: "2026-09-12", date: "12 сентября", weekday: "Сб",
      title: "Киото №1 — классика",
      goal: "Тории, старый Киото, Nintendo",
      soft: 20000,
      places: [
        { id: "d4-inari", name: "Fushimi Inari", emoji: "⛩️", time: "рано", est: 0, estNote: "бесплатно" },
        { id: "d4-kiyomizu", name: "Kiyomizu-dera", emoji: "🛕", time: "день", est: 1000, estNote: "500 ¥ × 2" },
        { id: "d4-ninen", name: "Ninenzaka / Sannenzaka", emoji: "🏮" },
        { id: "d4-nintendo", name: "Nintendo Kyoto", emoji: "🎮", time: "вечер" }
      ]
    },
    {
      n: 5, iso: "2026-09-13", date: "13 сентября", weekday: "Вс",
      title: "Нара",
      goal: "Олени и Большой Будда",
      soft: 20000,
      places: [
        { id: "d5-park", name: "Парк Нара", emoji: "🦌", est: 0, estNote: "бесплатно" },
        { id: "d5-todai", name: "Todai-ji (Daibutsuden)", emoji: "🛕", time: "день", est: 1600, estNote: "800 ¥ × 2" }
      ]
    },
    {
      n: 6, iso: "2026-09-14", date: "14 сентября", weekday: "Пн",
      title: "Лёгкий день перед USJ",
      goal: "Беречь силы",
      soft: 16000,
      places: [
        { id: "d6-america", name: "America-mura", emoji: "🛹", time: "день" },
        { id: "d6-shin", name: "Shinsaibashi", emoji: "🛍️" }
      ]
    },
    {
      n: 7, iso: "2026-09-15", date: "15 сентября", weekday: "Вт",
      title: "Universal Studios Japan",
      goal: "Nintendo World и аттракционы",
      soft: 16000,
      places: [
        { id: "d7-usj", name: "Universal Studios Japan", emoji: "🎢", time: "07:30", fixed: true, prepaid: true },
        { id: "d7-snw", name: "Super Nintendo World", emoji: "🍄", time: "11:50–12:50", fixed: true, prepaid: true }
      ]
    },
    {
      n: 8, iso: "2026-09-16", date: "16 сентября", weekday: "Ср",
      title: "Восстановление + Kuromon + Capcom",
      goal: "Рынок днём, лёгкий Capcom вечером",
      soft: 16000,
      places: [
        { id: "d8-kuromon", name: "Kuromon Ichiba", emoji: "🐟", time: "день" },
        { id: "d8-capcom", name: "Capcom Store Umeda", emoji: "🎮", time: "вечер" }
      ]
    },
    {
      n: 9, iso: "2026-09-17", date: "17 сентября", weekday: "Чт",
      title: "Киото №2 — Арасияма",
      goal: "Бамбук, дзен, Золотой павильон",
      soft: 22000,
      places: [
        { id: "d9-arashi", name: "Arashiyama · бамбук", emoji: "🎋", est: 0 },
        { id: "d9-tenryu", name: "Tenryu-ji (сад)", emoji: "🏯", est: 1000, estNote: "500 ¥ × 2" },
        { id: "d9-kinkaku", name: "Kinkaku-ji", emoji: "✨", est: 1000, estNote: "500 ¥ × 2" },
        { id: "d9-ryoan", name: "Ryoan-ji", emoji: "🪨", est: 1200, estNote: "600 ¥ × 2" }
      ]
    },
    {
      n: 10, iso: "2026-09-18", date: "18 сентября", weekday: "Пт",
      title: "Кобе",
      goal: "Порт и теппаньяки",
      soft: 28000,
      places: [
        { id: "d10-harbor", name: "Harborland + Kobe Tower", emoji: "⚓", time: "день" },
        { id: "d10-beef", name: "Тэппаньяки: Kobe beef", emoji: "🥩", time: "вечер", est: 20000, estNote: "средний ресторан ≈ 8–15 тыс ¥/чел" }
      ]
    },
    {
      n: 11, iso: "2026-09-19", date: "19 сентября", weekday: "Сб",
      title: "Hard Off Yao + Умеда",
      goal: "Шопинг и каваий",
      soft: 25000,
      places: [
        { id: "d11-hardoff", name: "Hard Off Yao", emoji: "💿", time: "утро" },
        { id: "d11-yodo", name: "Yodobashi Camera Umeda", emoji: "📷" },
        { id: "d11-poke", name: "Pokemon Center Osaka", emoji: "⚡" },
        { id: "d11-sylv", name: "Sylvanian Families", emoji: "🐰" },
        { id: "d11-hep", name: "HEP Five", emoji: "🎡" }
      ]
    },
    {
      n: 12, iso: "2026-09-20", date: "20 сентября", weekday: "Вс",
      title: "Химэдзи",
      goal: "Замок и сад",
      soft: 22000,
      places: [
        { id: "d12-castle", name: "Замок Химэдзи + сад Koko-en", emoji: "🦢", time: "день", fixed: true, est: 5200, estNote: "комбо 2 600 ¥ × 2" }
      ]
    },
    {
      n: 13, iso: "2026-09-21", date: "21 сентября", weekday: "Пн",
      title: "Остров Авадзи",
      goal: "Nijigen + Hello Kitty Smile",
      soft: 25000,
      places: [
        { id: "d13-nijigen", name: "Nijigen no Mori", emoji: "🦖", time: "10:30–14:00", est: 0, estNote: "вход на территорию бесплатно" },
        { id: "d13-kitty", name: "Hello Kitty Smile", emoji: "🎀", time: "14:30–16:30", est: 4000, estNote: "общий билет ≈ 2 000 ¥ × 2" }
      ]
    },
    {
      n: 14, iso: "2026-09-22", date: "22 сентября", weekday: "Вт",
      title: "Expo '70 + Umeda Sky",
      goal: "Парк и панорама",
      soft: 16000,
      places: [
        { id: "d14-expo", name: "Expo '70 Park", emoji: "🌳", time: "день" },
        { id: "d14-sun", name: "Tower of the Sun", emoji: "☀️" },
        { id: "d14-sky", name: "Umeda Sky Building", emoji: "🌆", time: "вечер", fixed: true, prepaid: true }
      ]
    },
    {
      n: 15, iso: "2026-09-23", date: "23 сентября", weekday: "Ср",
      title: "Sylvanian + море",
      goal: "Лёгкий день",
      soft: 16000,
      places: [
        { id: "d15-harvest", name: "Harvest Hill", emoji: "🐰", time: "утро" },
        { id: "d15-beach", name: "Nishikinohama Beach", emoji: "🏖️" }
      ]
    },
    {
      n: 16, iso: "2026-09-24", date: "24 сентября", weekday: "Чт",
      title: "Последний день",
      goal: "Сувениры и прощальный ужин",
      soft: 20000,
      places: [
        { id: "d16-donki", name: "Don Quijote Dotonbori", emoji: "🛒", time: "день" },
        { id: "d16-dinner", name: "Прощальный ужин", emoji: "🍖", time: "вечер" }
      ]
    }
  ],

  /** Исследование логистики и цен — источники на авг 2026 */
  research: {
    updated: "2026-08-02",
    disclaimer: "Цифры на сентябрь 2026, где официально объявлено. Если на 2026 ещё нет — указана последняя актуальная с пометкой. Перед выездом перепроверьте официальные сайты.",
    items: [
      {
        id: "awaji-shuttle",
        title: "Авадзи · бесплатный шаттл (западное побережье)",
        facts: [
          "Бесплатный shuttle между Awaji IC / Iwaya Port / Nijigen no Mori / Hello Kitty Smile и др. остановками западного побережья.",
          "21 сент 2026 — понедельник → смотреть расписание Weekdays (не weekend/holiday).",
          "Последнее опубликованное weekday-расписание (поправка 2026.4.1): рейсы примерно с ~09:20 до ≈20:00; интервал днём около 20–30 мин; между Nijigen и Hello Kitty Smile — короткий перегон (несколько минут).",
          "Отдельного PDF именно на 21.09.2026 нет — ближе к дате сверьте weekday timetable на сайте. Если попадёт японский праздник — тогда holiday PDF."
        ],
        source: "Awaji Island West Coast — Access Free Shuttle Bus",
        url: "https://en.awajishima-resort.com/access_freebus/",
        asOf: "расписание от 2026-04-01 (weekday PDF); 21.09.2026 = пн"
      },
      {
        id: "awaji-bus",
        title: "Автобус Осака/Санномия → Awaji IC",
        facts: [
          "Рекомендуемый хаб: Kobe-Sannomiya (из Осаки — JR/Hankyu/Hanshin до Санномии).",
          "Minato Kanko: Санномия → Awaji IC ≈ 33 мин; взрослый 670 ¥ в одну сторону; 2-билета туда-обратно со скидкой 1 210 ¥/чел.",
          "Shinki Bus / общие линии: Санномия → Awaji IC от ≈ 780 ¥/чел в одну сторону; дальше бесплатный шаттл до Nijigen (~3 мин).",
          "Прямые линии к Nijigen / West Coast тоже есть (дороже, от ≈780–1 200 ¥)."
        ],
        source: "Minato Kanko Bus · Shinki Bus Nijigen directions",
        url: "https://minatokankobus.com/express/",
        asOf: "проверено 2026-08 (официальные тарифы на сайте)"
      },
      {
        id: "jr-himeji",
        title: "JR Осака → Химэдзи",
        facts: [
          "JR Special Rapid (新快速) Osaka → Himeji: ≈ 60–65 мин, IC-тариф около 1 460–1 490 ¥ в одну сторону → туда-обратно ≈ 2 920–2 980 ¥/чел.",
          "Синкансен Shin-Osaka → Himeji быстрее (~25–35 мин), но дороже (свободное место ≈ 3 220 ¥+).",
          "Для дневной поездки обычно выгоднее Special Rapid с Osaka Station."
        ],
        source: "Ekitan / Visit Himeji travel notes (IC fare)",
        url: "https://ekitan.com/en/article/osaka-to-himeji-shinkansen",
        asOf: "2026 (IC ≈1 460–1 490 ¥; точную сумму покажет автомат/ICOCA в день поездки)"
      },
      {
        id: "tickets",
        title: "Входы · цены и часы",
        facts: [
          "Химэдзи + Koko-en комбо: 2 600 ¥ взрослый (с 1 марта 2026); дети до 18 бесплатно. Часы обычно 9:00–17:00 (замок last entry −1 ч).",
          "Kaiyukan: динамическая цена взр. 2 700–3 500 ¥; обычно 10:00–20:00, last entry 19:00. На 11.09 смотрите календарь на kaiyukan.com.",
          "Tempozan Ferris Wheel: ≈ 1 000 ¥/чел (офиц. сайт), часто 10:00–22:00 (продажи до −15 мин).",
          "Fushimi Inari: бесплатно, территория открыта круглосуточно.",
          "Kiyomizu-dera: 500 ¥ взр.; обычно с 6:00 до 18:00.",
          "Kinkaku-ji: 500 ¥; 9:00–17:00.",
          "Ryoan-ji: 600 ¥; ≈ 8:00–17:00 (зимой короче).",
          "Tenryu-ji сад: 500 ¥ (+300 ¥ здания по желанию); ≈ 8:30–17:00.",
          "Парк Нара: бесплатно. Todai-ji Daibutsuden: 800 ¥ взр.; апр–окт 7:30–17:30.",
          "Nijigen no Mori: вход на территорию парка бесплатно; платные только аттракционы (если берёте).",
          "Hello Kitty Smile: общий билет Smile+Apple House+Show Box shop ≈ 2 000 ¥ взр. (по обзорам/планам 2025–2026); уточните на месте/офиц. странице."
        ],
        source: "Visit Himeji, Kaiyukan, Tempozan, Todai-ji, Tenryu-ji, Nijigen no Mori",
        url: "https://visit-himeji.com/en/travel-info/himeji-castle-koko-en-garden-ticket-set/",
        asOf: "2026 (Himeji с 2026-03-01; остальное — актуальные офиц. тарифы на дату проверки)"
      },
      {
        id: "events",
        title: "Фестивали / тайфуны / толпы",
        facts: [
          "Kishiwada Danjiri Matsuri: 18–20 сентября 2026 (пробный 18-го, основные 19–20). Очень людно в Кишиваде (юг Осаки) — на ваш маршрут Hard Off Yao / Умеда влияет слабо, но поезда Nankai/южные линии могут быть плотнее.",
          "Сентябрь — пик сезона тайфунов в Японии. Кансай умеренный риск: возможны дожди, задержки JR/автобусов/паромов на 1–2 дня. Держите зонты и запасной «крытый» день.",
          "Крупных паломничеств, закрывающих ваши объекты на 9–25 сент, не видно. Перед Авадзи/Химэдзи сверьте JMA + сайты объектов."
        ],
        source: "Fest in Japan / Timeout Osaka / JMA typhoon season notes",
        url: "https://festinjapan.jp/festivals/kishiwada-danjiri",
        asOf: "2026-08"
      },
      {
        id: "food",
        title: "Еда · реалистичные диапазоны",
        facts: [
          "Рамен на человека: обычно 900–1 500 ¥ (простая миска); с топпингами до ≈ 1 800 ¥.",
          "Кайтен-суши (обед/ужин): типично 1 500–3 000 ¥/чел; плотный заход 3 000–4 000 ¥.",
          "Тэппаньяки с кобе-говядиной среднего уровня: ужин ≈ 8 000–15 000 ¥/чел → на двоих ≈ 16 000–30 000 ¥ (без алкоголя). Курсы «премиум» легко уходят за 20 000+/чел.",
          "Для бюджета 500k: Kobe beef лучше планировать как одну «дорогую» статью из запаса, не из дневных 18k."
        ],
        source: "Tabelog bands / типичные цены Кансая 2025–2026",
        url: "https://tabelog.com/",
        asOf: "2026-08 (меню ресторанов меняются; бронируйте и смотрите курс заранее)"
      }
    ],
    table: [
      { item: "Шаттл Nijigen ↔ Hello Kitty Smile", range: "0 ¥ (бесплатно)", source: "Awaji West Coast shuttle" },
      { item: "Санномия ↔ Awaji IC туда-обратно / чел", range: "1 210 ¥ (скидка Minato) или ≈1 560 ¥ (780×2)", source: "Minato / Shinki" },
      { item: "JR Osaka ↔ Himeji туда-обратно / чел", range: "≈ 2 920–2 980 ¥ (Special Rapid)", source: "JR IC / Ekitan" },
      { item: "Himeji + Koko-en комбо / чел", range: "2 600 ¥ (с 2026-03-01)", source: "Visit Himeji" },
      { item: "Kaiyukan / чел", range: "2 700–3 500 ¥", source: "kaiyukan.com" },
      { item: "Tempozan колесо / чел", range: "≈ 1 000 ¥", source: "tempozan-kanransya.com" },
      { item: "Fushimi Inari", range: "0 ¥", source: "храм" },
      { item: "Kiyomizu-dera / чел", range: "500 ¥", source: "kiyomizudera.or.jp" },
      { item: "Kinkaku-ji / чел", range: "500 ¥", source: "офиц. тариф" },
      { item: "Ryoan-ji / чел", range: "600 ¥", source: "офиц. тариф" },
      { item: "Tenryu-ji сад / чел", range: "500 ¥ (+300 здания)", source: "tenryuji.com" },
      { item: "Todai-ji Daibutsuden / чел", range: "800 ¥ (парк бесплатно)", source: "todaiji.or.jp" },
      { item: "Nijigen территория", range: "0 ¥ (аттракционы отдельно)", source: "nijigennomori.com" },
      { item: "Hello Kitty Smile общий / чел", range: "≈ 2 000 ¥", source: "планы/обзоры 2025–26" },
      { item: "Рамен / чел", range: "900–1 500 ¥", source: "типичные цены Кансая" },
      { item: "Кайтен-суши / чел", range: "1 500–3 000 ¥", source: "типичные цены Кансая" },
      { item: "Kobe teppanyaki ужин / чел", range: "8 000–15 000 ¥ (средний)", source: "Tabelog mid-range" }
    ]
  }
};
