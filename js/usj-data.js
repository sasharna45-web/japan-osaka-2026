/* USJ 15 сен 2026 — отдельная страница usj.html.
   Актуальность (аудит авг 2026):
   - Spider-Man закрыт навсегда с 22.01.2024 — не планируем.
   - Terminator 2 / Backdraft закрыты; на месте Backdraft — Villain-Con Minion Blast.
   - 15 сен 2026 = вторник внутри Halloween Horror Nights (11 сен – 8 ноя 2026):
     вечером зомби/ивент, парк обычно до ~21:00–22:00 (смотреть app в день визита).
   - Express Pass 4 «Minions & Hollywood Dream»: Mine Cart + Forbidden Journey +
     Minion Mayhem + (Hollywood Dream ИЛИ JAWS) + timed entry SNW (и часто WWHP).
   - Mario Kart / Yoshi / Flying Dinosaur / Space Fantasy / Backdrop / Villain-Con —
     НЕ в этом Express (standby / Single Rider).
   Имена мест — ориентиры; очереди и закрытия сверять в app USJ в день. */
const USJ_PLAN = {
  date: "15 сентября 2026 · вт · до ~22:00",
  audited: "2026-08-07",
  pass: {
    name: "Universal Express Pass 4 · Minions and Hollywood Dream",
    studio: "Studio Pass 1-day ×2 — куплены",
    slots: [
      { label: "SUPER NINTENDO WORLD", time: "11:50–12:50", note: "вход в зону по Express — не опаздывать" },
      { label: "Mine Cart Madness", time: "11:50–12:20", note: "сразу после входа в SNW · слот жёсткий" }
    ],
    express: [
      { name: "Mine Cart Madness", tip: "слот 11:50–12:20" },
      { name: "Harry Potter and the Forbidden Journey", tip: "Express · 1 раз" },
      { name: "Despicable Me Minion Mayhem", tip: "Express · 1 раз" },
      { name: "Hollywood Dream – The Ride или JAWS", tip: "на выбор один; для макс-дня берите Hollywood Dream" }
    ],
    notIncluded: [
      "Mario Kart: Koopa's Challenge — standby / Single Rider внутри SNW",
      "Yoshi's Adventure — standby",
      "The Flying Dinosaur — standby / Single Rider",
      "Hollywood Dream – Backdrop (назад) — отдельная очередь",
      "Space Fantasy – The Ride (осенью часто horror-оверлей) — standby",
      "Villain-Con Minion Blast — standby",
      "Flight of the Hippogriff, Jurassic Park – The Ride, JAWS (если Express ушёл на HD)"
    ],
    gone: [
      "The Amazing Adventures of Spider-Man — закрыт навсегда с 22.01.2024",
      "Terminator 2: 3-D / Backdraft — закрыты (на месте Backdraft теперь Villain-Con)"
    ]
  },
  rules: [
    { e: "🍄", t: "Жёсткий якорь SNW", d: "К 11:40 у входа. В 11:50 заходите и сразу Mine Cart (до 12:20). Фото и магазин — после вагонетки и Mario Kart." },
    { e: "📱", t: "App USJ = правда дня", d: "Очереди, Single Rider, закрытия, шоу и время закрытия парка — только из app. План ниже — каркас под ваш Express, не догма." },
    { e: "🎃", t: "Halloween Horror Nights", d: "С 18:00 уличные зомби и horror-зоны. Лабиринты Resident Evil / Sadako — 15+ (жёсткий возрастной ценз). Не обязательно: можно только атмосферу + аттракционы." },
    { e: "🎟️", t: "Express не на Mario Kart", d: "В вашем Pass 4 нет Mario Kart и Flying Dinosaur. Их берём standby / Single Rider. Express жжём на пиковые: Mine Cart (слот), Forbidden Journey, Minion Mayhem, Hollywood Dream." },
    { e: "🚫", t: "Не ищите Spider-Man", d: "Аттракциона больше нет. Не тратьте время на старые карты/гайды, где он ещё есть." }
  ],
  variants: [
    {
      key: "max",
      title: "Максимум до закрытия",
      vibe: "Плотнее некуда · цель ~12–14 активностей",
      bestFor: "Вы двое, ноги ок, уходите около 21:30–22:00. Дефолт на 15 сен.",
      score: "Главный сценарий · актуальный каркас под ваш Express",
      timeline: [
        { t: "07:30", what: "У ворот", detail: "Очередь до открытия. Studio Pass + Express на экране. Завтрак дома. Пончо/zip для телефона." },
        { t: "~08:45–09:00", what: "Вход · сразу к Jurassic", detail: "Открытие смотрите в app (часто раньше «официальных» 9:00). Бегом не к SNW (слот только в 11:50), а к The Flying Dinosaur." },
        { t: "~09:05", what: "The Flying Dinosaur", detail: "Standby или Single Rider (можно разделиться на один заезд). Это ваш главный «дорогой» standby утра — Express на него нет." },
        { t: "~09:50", what: "Jurassic Park – The Ride", detail: "Лодочный рядом, если очередь адекватная (<40 мин). Иначе скип без жалости — нужен запас на SNW." },
        { t: "~10:30", what: "Express: Forbidden Journey", detail: "В Хогвартс. Express сейчас: к полудню очередь вырастет. Заодно быстрый круг Hogsmeade / фото. Hippogriff — только если очередь короткая." },
        { t: "11:40", what: "К воротам SNW", detail: "Буфер. Туалет + вода. Не фотографироваться у трубы 20 минут." },
        { t: "11:50–12:20", what: "Mine Cart Madness", detail: "Вход в зону → сразу Donkey Kong Mine Cart по слоту. Это якорь билета." },
        { t: "~12:25–13:20", what: "Mario Kart → Yoshi", detail: "Mario Kart standby / Single Rider. Yoshi — если очередь <25–30 мин. Power-Up Band — только если уже куплен и не ест время." },
        { t: "~13:30", what: "Быстрый обед", detail: "Фудкорт / Minion area. Kinopio's — только очередь <20 мин. Цель: сесть и встать за 25–35 мин." },
        { t: "~14:15", what: "Express: Minion Mayhem", detail: "Закрываете Express №3. Сразу рядом — Villain-Con Minion Blast (standby; это не Express)." },
        { t: "~15:15", what: "Villain-Con Minion Blast", detail: "Интерактивный шутер в Minion Park (на месте старого Backdraft). Если очередь >60 мин — скип и идите к Hollywood Dream." },
        { t: "~16:00", what: "Express: Hollywood Dream", detail: "Берите HD (вперёд), не JAWS — для макс-дня это правильный Express-слот. Soundtrack выберите быстро у панели." },
        { t: "~16:50", what: "Space Fantasy", detail: "Indoor-костер. Осенью 2026 часто horror-оверлей (Sadako и т.п.) — смотрите название в app. Если тошнит после HD — пауза 15 мин." },
        { t: "~17:40", what: "JAWS (standby)", detail: "Express уже ушёл на HD — JAWS обычной очередью / Single Rider. В сезон HHN может быть оверлей «Red Alert»." },
        { t: "~18:30", what: "Backdrop или шоу", detail: "Hollywood Dream – Backdrop (назад) — отдельная очередь, если силы есть. Иначе WaterWorld / расписание шоу в app. С 18:00 — зомби на улицах (атмосфера, не обязательный лабиринт)." },
        { t: "~19:30–21:30", what: "Хвост до закрытия", detail: "По app: повтор с короткой очередью, парад/ночной слот, магазин. Лабиринты HHN (Resident Evil и др.) — только 15+ и только если хотите ужастики вместо ещё одного костера." },
        { t: "~21:30–22:00", what: "Выход", detail: "Закрытие смотрите в app на день. Домой на JR Yumesaki → Osaka Station → метро. Завтра Kuromon — можно не геройствовать до последней минуты." }
      ],
      skip: [
        "Spider-Man — его больше нет",
        "Час в Kinopio's / магазинах до закрытия Express-слотов",
        "Два раза ходить в SNW «на удачу» без слота",
        "Horror-лабиринты, если не хотите HHN — это опция, не обязанность"
      ]
    },
    {
      key: "chill",
      title: "Дождь / усталость",
      vibe: "Только якоря Express + крыша",
      bestFor: "Ливень, нет сил, или «уже тяжело к обеду».",
      score: "Сохранить день, не геройствовать",
      timeline: [
        { t: "07:30–08:30", what: "У ворот по самочувствию", detail: "Лучше до открытия. Пончо у входа." },
        { t: "утро", what: "Express: Forbidden Journey", detail: "Под крышей. Jurassic / Flying Dinosaur в ливень — пропуск." },
        { t: "11:40", what: "SNW якорь", detail: "Mine Cart обязателен. Mario Kart — только если очередь человеческая." },
        { t: "~13:00", what: "Тёплый обед", detail: "Крытое кафе/фудкорт. Сушиться, зарядка." },
        { t: "день", what: "Express: Minion + Hollywood Dream/JAWS", detail: "Только Express. Standby >40 мин — скип." },
        { t: "когда угодно", what: "Домой", detail: "Кайфовый день ≠ до 22:00. Завтра рынок." }
      ],
      skip: ["Flying Dinosaur в ливень", "Чувство вины за ранний выход", "Horror-лабиринты «за компанию»"]
    }
  ]
};
