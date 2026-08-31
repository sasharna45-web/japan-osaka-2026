/**
 * Данные трекера поездки: маршрут + исследование цен (авг 2026).
 * Деньги: всего $3225. В трекере считаем РАБОЧИЕ ЙЕНЫ после обмена
 * ($2825 → ≈441–452k ¥ при ~156–160). Резерв $400 долларами — отдельно.
 * Уже оплачено отдельно: жильё, самолёты, USJ, Umeda Sky, Harukas.
 * Осакский замок — башня 1 200 ¥ × 2 (WEB/QR).
 */

const TRACKER = {
  title: "Трекер · Кансай 2026",
  travelers: "Александр и Рита",
  /** Всего на поездку (ещё до обмена). */
  totalUsd: 3225,
  reserveUsd: { min: 400, max: 400 },
  /** Потолок трекера ≈ $2825 × 160. */
  budgetYen: 452000,
  budgetYenMin: 441000,
  budgetYenMax: 452000,
  softDailyYen: 18000,
  spendDays: 17,
  dateFrom: "2026-09-09",
  dateTo: "2026-09-25",
  note: "Трекер считает уже обменянные йены. План: $3225 всего → $400 резерв долларами → в йены ровно $2825 (≈441–452k ¥ при ~156–160). Спокойный темп ≈ 18 000 ¥/день. Крупное сверх плана — из резерва $400.",

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
        { id: "d1-doton", name: "Dotonbori", emoji: "🌃", time: "~18:30" }
      ]
    },
    {
      n: 2, iso: "2026-09-10", date: "10 сентября", weekday: "Чт",
      title: "Киото №1 — классика",
      goal: "Тории, старый Киото, Nintendo (обмен гибко)",
      soft: 20000,
      places: [
        { id: "d2-inari", name: "Fushimi Inari", emoji: "⛩️", time: "рано", est: 0, estNote: "бесплатно" },
        { id: "d2-kiyomizu", name: "Kiyomizu-dera", emoji: "🛕", time: "день", est: 1000, estNote: "500 ¥ × 2" },
        { id: "d2-ninen", name: "Ninenzaka / Sannenzaka", emoji: "🏮" },
        { id: "d2-nintendo", name: "Nintendo Kyoto", emoji: "🎮", time: "вечер" }
      ]
    },
    {
      n: 3, iso: "2026-09-11", date: "11 сентября", weekday: "Пт",
      title: "Осакский залив + Abeno Harukas",
      goal: "Океанариум и закат с высоты",
      soft: 22000,
      places: [
        { id: "d3-kaiyu", name: "Kaiyukan", emoji: "🐋", time: "10:00", est: 6000, estNote: "≈2 700–3 500 ¥ × 2 (динамика; берите онлайн)" },
        { id: "d3-wheel", name: "Колесо Tempozan", emoji: "🎡", time: "≈12:30", est: 2000, estNote: "1 000 ¥ × 2" },
        { id: "d3-harukas", name: "Abeno Harukas 300", emoji: "🏙️", time: "17:00", fixed: true, prepaid: true }
      ]
    },
    {
      n: 4, iso: "2026-09-12", date: "12 сентября", weekday: "Сб",
      title: "Замок Осаки + Den Den Town",
      goal: "Замок утром, игровой район днём",
      soft: 18000,
      places: [
        { id: "d4-castle", name: "Осакский замок", emoji: "🏯", time: "~09:00", est: 2400, estNote: "1 200 ¥ × 2 · на месте (WEB/QR по желанию)" },
        { id: "d4-denden", name: "Den Den Town", emoji: "🎮", time: "день" },
        { id: "d4-potato", name: "Super Potato Osaka", emoji: "🕹️" },
        { id: "d4-shin", name: "Shinsekai + Tsutenkaku", emoji: "🗼", time: "вечер" }
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
      title: "Восстановление · Kuromon + Solaniwa",
      goal: "Kuromon ~12:30 · Solaniwa private · Capcom по силам",
      soft: 22000,
      places: [
        { id: "d8-kuromon", name: "Kuromon Ichiba", emoji: "🐟", time: "~12:30" },
        { id: "d8-solaniwa", name: "Solaniwa · private bath", emoji: "♨️", time: "~15:00", est: 16000, estNote: "private ~8 800 + вход ×2 + налог · будни без онлайн-предоплаты" },
        { id: "d8-capcom", name: "Capcom Store Umeda (опц.)", emoji: "🎮", time: "~18:00+" }
      ]
    },
    {
      n: 9, iso: "2026-09-17", date: "17 сентября", weekday: "Чт",
      title: "Киото №2 — Арасияма",
      goal: "Бамбук, Tenryu-ji, Kinkaku-ji (Ryoan-ji пропускаем)",
      soft: 22000,
      places: [
        { id: "d9-arashi", name: "Arashiyama · бамбук", emoji: "🎋", time: "~08:30", est: 0 },
        { id: "d9-tenryu", name: "Tenryu-ji (сад)", emoji: "🍃", time: "~09:30", est: 1000, estNote: "500 ¥ × 2" },
        { id: "d9-kinkaku", name: "Kinkaku-ji", emoji: "✨", time: "~12:30", est: 1000, estNote: "500 ¥ × 2" }
      ]
    },
    {
      n: 10, iso: "2026-09-18", date: "18 сентября", weekday: "Пт",
      title: "Миноо + Кацуодзи",
      goal: "Водопад и храм Дарум · до Silver Week",
      soft: 18000,
      places: [
        { id: "d10-minoh", name: "Водопад Миноо + Momiji tempura", emoji: "🍁", time: "~10:00", est: 1000, estNote: "кленовые сладости ~500 ¥ × 2 · вход в парк 0 ¥" },
        { id: "d10-katsuo", name: "Храм Дарум (Кацуодзи)", emoji: "🔴", time: "~12:30", est: 2000, estNote: "вход 500 ¥ × 2 + дарумы-омикудзи ~1 000 ¥" }
      ]
    },
    {
      n: 11, iso: "2026-09-19", date: "19 сентября", weekday: "Сб",
      title: "Hard Off Yao + Умеда",
      goal: "Шопинг и каваий · старт Silver Week",
      soft: 25000,
      places: [
        { id: "d11-hardoff", name: "Hard Off Yao", emoji: "💿", time: "~10:30" },
        { id: "d11-yodo", name: "Yodobashi Camera Umeda", emoji: "📷", time: "~14:00" },
        { id: "d11-poke", name: "Pokemon Center Osaka", emoji: "⚡", time: "~16:00" },
        { id: "d11-sylv", name: "Sylvanian Families", emoji: "🐰", time: "~17:00" },
        { id: "d11-hep", name: "HEP Five", emoji: "🎡", time: "~18:00" }
      ]
    },
    {
      n: 12, iso: "2026-09-20", date: "20 сентября", weekday: "Вс",
      title: "Кобе",
      goal: "Обед Steakland + порт",
      soft: 28000,
      places: [
        { id: "d12-beef", name: "Steakland 神戸店 (神戸牛ランチ)", emoji: "🥩", time: "~12:00", est: 8000, estNote: "3 500 ¥ × 2 + напитки · наличные · без брони" },
        { id: "d12-harbor", name: "Harborland + Kobe Tower", emoji: "⚓", time: "~14:30" }
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
        { id: "d14-expo", name: "Expo '70 Park", emoji: "🌳", time: "~11:00" },
        { id: "d14-sun", name: "Tower of the Sun (снаружи)", emoji: "☀️", time: "~12:00" },
        { id: "d14-sky", name: "Umeda Sky Building", emoji: "🌆", time: "~17:30", fixed: true, prepaid: true }
      ]
    },
    {
      n: 15, iso: "2026-09-23", date: "23 сентября", weekday: "Ср",
      title: "Sylvanian Families + море",
      goal: "Harvest Hill ~10:00 · Nishikinohama если ясно",
      soft: 16000,
      places: [
        { id: "d15-harvest", name: "Harvest Hill", emoji: "🐰", time: "~10:00" },
        { id: "d15-beach", name: "Nishikinohama Beach", emoji: "🏖️", time: "~14:00" }
      ]
    },
    {
      n: 16, iso: "2026-09-24", date: "24 сентября", weekday: "Чт",
      title: "Последний день",
      goal: "Donki ~14:00 · якинику ~18:30",
      soft: 20000,
      places: [
        { id: "d16-donki", name: "Don Quijote Dotonbori", emoji: "🛒", time: "~14:00" },
        { id: "d16-dinner", name: "Gyu-Kaku Namba (якинику)", emoji: "🍖", time: "~18:30", est: 10000, estNote: "сет на двоих · без обязательной брони" }
      ]
    },
    {
      n: 17, iso: "2026-09-25", date: "25 сентября", weekday: "Пт",
      title: "В Шанхай",
      goal: "Выезд в KIX · лёгкие траты до рейса",
      soft: 6000,
      places: [
        { id: "d17-depart", name: "Вылет KIX → Шанхай", emoji: "✈️", time: "15:00", fixed: true }
      ]
    }
  ],

  /** Исследование логистики и цен — источники на авг 2026 */
  research: {
    updated: "2026-08-12",
    disclaimer: "Цифры на сентябрь 2026, где официально объявлено. Если на 2026 ещё нет — указана последняя актуальная с пометкой. Перед выездом перепроверьте официальные сайты.",
    items: [
      {
        id: "awaji-shuttle",
        title: "Авадзи · бесплатный шаттл (западное побережье)",
        facts: [
          "Бесплатный shuttle между Awaji IC / Iwaya Port / Nijigen no Mori / Hello Kitty Smile и др. остановками западного побережья.",
          "21 сент 2026 — Respect for the Aged Day (праздник) + Silver Week → смотреть holiday / weekend PDF, не обычный weekday.",
          "Последнее опубликованное weekday-расписание (поправка 2026.4.1): рейсы примерно с ~09:20 до ≈20:00; интервал днём около 20–30 мин; между Nijigen и Hello Kitty Smile — короткий перегон (несколько минут).",
          "Ближе к дате сверьте holiday timetable на сайте Awaji West Coast."
        ],
        source: "Awaji Island West Coast — Access Free Shuttle Bus",
        url: "https://en.awajiisland.pasonagroup.co.jp/access_freebus/",
        asOf: "расписание от 2026-04-01; 21.09.2026 = праздник Silver Week"
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
        id: "hankyu-minoh",
        title: "Поезд в Миноо + Кацуодзи",
        facts: [
          "Hankyu от Osaka-Umeda до Minoo (пересадка на Ishibashi): ≈ 30–35 мин, ≈ 280 ¥/чел в одну сторону (IC/PASMO).",
          "От водопада Миноо до храма Кацуодзи: такси ≈ 10 мин (≈ 1 500–2 000 ¥ за машину).",
          "Обратно: автобус Hankyu от Katsuo-ji до станции Minoh-kayano (конечная красной линии метро Midosuji, ≈ 400 ¥/чел, ~20 мин) или такси к Minoo."
        ],
        source: "Hankyu Railway · Katsuo-ji access",
        url: "https://katsuo-ji-temple.or.jp/access/",
        asOf: "2026-08 (актуальные маршруты Hankyu / Metro Midosuji)"
      },
      {
        id: "tickets",
        title: "Входы · цены и часы",
        facts: [
          "Кацуодзи: 500 ¥ взр. (8:00–17:00, пн-пт); парк и водопад Миноо — бесплатно. Дарума-омикудзи ~500 ¥.",
          "Осакский замок (башня): взрослый 1 200 ¥ (с 1 апр. 2025); 9:00–18:00, вход до 17:30. WEB/QR рекомендован в уикенд.",
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
        source: "Kaiyukan, Tempozan, Todai-ji, Tenryu-ji, Katsuo-ji, Nijigen no Mori",
        url: "https://katsuo-ji-temple.or.jp/",
        asOf: "2026 (актуальные офиц. тарифы на дату проверки)"
      },
      {
        id: "events",
        title: "Фестивали / тайфуны / толпы",
        facts: [
          "Silver Week 2026: 19–23 сентября (сб–ср) — Respect for the Aged Day 21-го, Citizens' Holiday 22-го, Autumnal Equinox 23-го. Толпы на дальних выездах и в ТЦ. Миноо и Кацуодзи в пт 18-го (до каникул в лесу спокойно); Кобе на вс 20-го.",
          "Kishiwada Danjiri Matsuri: 18–20 сентября 2026 (пробный 18-го, основные 19–20). Очень людно в Кишиваде (юг Осаки) — на Hard Off Yao / Умеда влияет слабо, но поезда Nankai/южные линии могут быть плотнее.",
          "Сентябрь — пик сезона тайфунов в Японии. Кансай умеренный риск: возможны дожди, задержки JR/автобусов/паромов на 1–2 дня. Держите зонты и запасной «крытый» день.",
          "Перед Авадзи/выездами сверьте JMA + сайты объектов."
        ],
        source: "Nippon.com holidays / Fest in Japan / JMA",
        url: "https://www.nippon.com/en/japan-data/h02302/",
        asOf: "2026-08"
      },
      {
        id: "food",
        title: "Еда · реалистичные диапазоны",
        facts: [
          "Рамен на человека: обычно 900–1 500 ¥ (простая миска); с топпингами до ≈ 1 800 ¥.",
          "Кайтен-суши (обед/ужин): типично 1 500–3 000 ¥/чел; плотный заход 3 000–4 000 ¥.",
          "Тэппаньяки с кобе-говядиной среднего уровня: ужин ≈ 8 000–15 000 ¥/чел → на двоих ≈ 16 000–30 000 ¥ (без алкоголя). Курсы «премиум» легко уходят за 20 000+/чел.",
          "Kobe beef (Steakland 神戸店 · 神戸牛ランチ ≈ 3 500 ¥/чел, 20 сен) — из рабочих йен; если апгрейд/очередь в более дорогой — из резерва."
        ],
        source: "Tabelog bands / типичные цены Кансая 2025–2026",
        url: "https://tabelog.com/",
        asOf: "2026-08 (меню/цены меняются; бронь ресторанов не обязательна — смотрите меню и курс перед заказом)"
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
      { item: "Kobe teppanyaki обед / чел", range: "≈ 6 000–10 000 ¥ (сет; ужин дороже 8–15k)", source: "Tabelog mid-range / lunch sets" }
    ]
  }
};
