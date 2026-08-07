/* USJ 15 сен 2026 — отдельные сценарии под купленный Express Pass.
   Не дублирует карточки маршрута: там общий каркас дня, здесь поминутные варианты. */
const USJ_PLAN = {
  date: "15 сентября 2026 · вт",
  pass: {
    name: "Universal Express Pass 4 · Minions and Hollywood Dream",
    studio: "Studio Pass 1-day ×2 — куплены",
    slots: [
      { label: "SUPER NINTENDO WORLD", time: "11:50–12:50", note: "вход в зону по Express" },
      { label: "Mine Cart Madness", time: "11:50–12:20", note: "сразу после входа в SNW — не фото у ворот" }
    ],
    express: [
      { name: "Mine Cart Madness", tip: "слот 11:50–12:20" },
      { name: "Harry Potter and the Forbidden Journey", tip: "Express в любое время дня" },
      { name: "Despicable Me Minion Mayhem", tip: "Express" },
      { name: "Hollywood Dream – The Ride или JAWS", tip: "на выбор один; JAWS часто спокойнее" }
    ],
    notIncluded: [
      "Mario Kart: Koopa's Challenge — обычная очередь внутри SNW",
      "Yoshi's Adventure — обычная очередь",
      "The Flying Dinosaur, Spider-Man и остальное — standby / Single Rider"
    ]
  },
  rules: [
    { e: "🍄", t: "Жёсткий якорь", d: "К 11:40–11:45 у входа в SNW. В 11:50 заходите и сразу на Mine Cart (слот до 12:20). Фото и магазин — после вагонетки." },
    { e: "📱", t: "App USJ", d: "Очереди смотрите в приложении. Express не сжигает время зря: на короткую очередь идите standby, Express оставьте на пик." },
    { e: "⌚", t: "Утро до SNW", d: "Открытие часто ~09:00 (смотрите app). У вас ~2.5 ч до слота — хватает на 2 блока, не на «весь парк»." },
    { e: "🎒", t: "С собой", d: "Вода · пауэрбанк · пончо · zip для телефона · Power-Up Band опционально (~4200 ¥, квесты в SNW)." }
  ],
  variants: [
    {
      key: "default",
      title: "Кайф (дефолт)",
      vibe: "Игры + вайб без выгорания",
      bestFor: "Вам, если хотите Nintendo-кайф и не рвать ноги до закрытия.",
      timeline: [
        { t: "07:30", what: "У ворот", detail: "Очередь до открытия. Завтрак уже дома. Билеты / Express на экране." },
        { t: "~09:00", what: "Вход → Wizarding World", detail: "Сразу в Хогвартс. Forbidden Journey — standby, если очередь <40 мин; иначе Express сейчас, а не вечером." },
        { t: "~10:00", what: "Jurassic Park", detail: "The Flying Dinosaur (если готовы к перегрузкам) или спокойный Jurassic блок / фото. Не зарываться: нужен запас на SNW." },
        { t: "11:40", what: "К воротам SNW", detail: "Буфер 10 мин. Туалет и вода до входа в зону." },
        { t: "11:50", what: "SNW → Mine Cart", detail: "Вход в зону → сразу Mine Cart Madness (слот до 12:20). Потом Mario Kart (standby), Yoshi по желанию, фото, магазин." },
        { t: "~13:30", what: "Выход из SNW · обед", detail: "Фудкорт / зона Minion. Kinopio's — только если очередь <20 мин." },
        { t: "~14:30", what: "Express: Minion Mayhem", detail: "Быстрый проход, пока силы есть." },
        { t: "~15:30", what: "Express: Hollywood Dream или JAWS", detail: "HD — адреналин и вид на парк; JAWS — спокойнее и часто короче по ощущениям." },
        { t: "~16:30+", what: "Свободный хвост", detail: "Spider-Man, шоу, повтор любимого, магазин у выхода. Уходить можно когда кайф кончился — не обязательно до закрытия." }
      ],
      skip: ["Не жечь всё утро на одну очередь Flying Dinosaur", "Не стоять час в Kinopio's"],
      score: "Лучший баланс для вас двоих"
    },
    {
      key: "max",
      title: "Максимум",
      vibe: "Больше аттракционов, меньше прогулок",
      bestFor: "Если энергии много и хочется «закрыть» Express + топ standby.",
      timeline: [
        { t: "07:30", what: "У ворот", detail: "Как в дефолте — раньше лучше." },
        { t: "~09:00", what: "Express: Forbidden Journey", detail: "Сразу Express на Гарри — экономите утро, даже если очередь короткая: потом пик вырастет." },
        { t: "~09:45", what: "Flying Dinosaur", detail: "Пока очереди ещё живые. Single Rider, если готовы разделиться на один заезд." },
        { t: "~10:45", what: "Jurassic / переход", detail: "Короткий блок или сразу движение к SNW с запасом." },
        { t: "11:40–12:20", what: "SNW якорь", detail: "Mine Cart → Mario Kart → быстрые фото. Yoshi — только если очередь короткая." },
        { t: "~13:00", what: "Перекус стоя", detail: "Не полноценный ресторан — 20–30 мин максимум." },
        { t: "~13:45", what: "Express: Minion Mayhem", detail: "Закрываете третий Express." },
        { t: "~14:30", what: "Express: Hollywood Dream", detail: "Берите HD, не JAWS — раз уж режим «максимум»." },
        { t: "~15:30+", what: "Spider-Man + хвост", detail: "Ещё 1–2 standby по app. Магазины — в конце, с лёгкими руками." }
      ],
      skip: ["Долгие обеды", "Повторные круги «просто постоять»"],
      score: "Больше адреналина, выше нагрузка"
    },
    {
      key: "nintendo",
      title: "Nintendo-день",
      vibe: "Зона Mario — главный герой",
      bestFor: "Если SNW важнее остальных Express.",
      timeline: [
        { t: "07:30", what: "У ворот", detail: "Тот же ранний приход." },
        { t: "~09:00", what: "Лёгкое утро", detail: "Только один блок рядом: Хогвартс фото + Forbidden Journey standby ИЛИ короткий Jurassic. Не два тяжёлых." },
        { t: "11:30", what: "Раньше к SNW", detail: "Запас 20 мин. Купите Power-Up Band у входа в зону, если хотите квесты." },
        { t: "11:50", what: "Mine Cart → мир", detail: "Вагонетка сразу. Дальше не бегите: Mario Kart, Yoshi, фото-зоны, квесты браслета, Toad магазин." },
        { t: "~13:30", what: "Kinopio's / обед у SNW", detail: "Если очередь адекватная — можно; иначе фудкорт рядом. Не теряйте весь день на еду." },
        { t: "~15:00", what: "Express хвост", detail: "Minion Mayhem + Hollywood Dream/JAWS — закрываете билет без гонки." },
        { t: "вечер", what: "Спокойный финиш", detail: "Шоу / повтор фото / выход. Гарри и динозавры — уже не обязательны." }
      ],
      skip: ["Режим «успеть всё»", "Долгий Flying Dinosaur утром"],
      score: "Максимум вайба Nintendo"
    },
    {
      key: "chill",
      title: "Дождь / усталость",
      vibe: "Express делает день, не вы",
      bestFor: "Ливень, плохой сон или «уже тяжело к обеду».",
      timeline: [
        { t: "07:30–08:30", what: "У ворот по самочувствию", detail: "Можно чуть позже, но до открытия всё же лучше. Пончо у входа." },
        { t: "утро", what: "Один крытый блок", detail: "Forbidden Journey (Express или standby) — под крышей. Jurassic под дождём пропускаем." },
        { t: "11:40", what: "SNW якорь", detail: "Mine Cart обязателен. Остальное в зоне — по погоде и очередям. Не геройствуйте." },
        { t: "~13:00", what: "Тёплый обед", detail: "Любое крытое кафе/фудкорт. Сушиться и зарядить телефон." },
        { t: "день", what: "Только Express", detail: "Minion Mayhem + Hollywood Dream или JAWS. Standby длиннее 40 мин — пропускаете без вины." },
        { t: "когда угодно", what: "Домой", detail: "Кайфовый день ≠ до закрытия. Завтра Kuromon — можно уйти в 16:00." }
      ],
      skip: ["Flying Dinosaur в ливень", "Чувство вины за ранний выход"],
      score: "Сохранить день, не геройствовать"
    }
  ]
};
