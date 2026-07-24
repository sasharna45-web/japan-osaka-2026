/**
 * Данные путеводителя «Япония 2026 — Осака и Кансай».
 * Всё вынесено в один объект, чтобы UI только отображал данные,
 * а редактировать маршрут можно было в одном месте.
 *
 * Формат места (place):
 *   name    — название
 *   emoji   — иконка
 *   desc    — короткое описание / что делать
 *   lat,lng — координаты (для карты и ссылки Google Maps)
 *   hours   — часы работы (примерные, проверяйте перед визитом)
 *   price   — ориентировочная цена
 *   tips    — совет туриста
 *   food    — что поесть / кафе рядом
 *   tags    — интересы: nintendo, jrpg, games, tech, anime, culture,
 *             photo, cute, hellokitty, sylvanian, shopping, cafe, nature, food
 */

const TRIP = {
  title: "Япония 2026",
  subtitle: "Осака и Кансай",
  travelers: "Александр и Рита",
  base: "Osaka · Tanimachi 6-chome",
  dateFrom: "9 сентября 2026",
  dateTo: "25 сентября 2026",
  days: [
    {
      n: 1, date: "9 сентября", weekday: "Ср",
      title: "Прибытие и первые огни Осаки",
      goal: "Почувствовать Японию после дороги, без жёсткого тайминга",
      load: 4,
      color: "#e63946",
      places: [
        {
          name: "Прилёт в KIX", emoji: "✈️", time: "12:45", fixed: true,
          desc: "QR-коды Visit Japan Web, багаж, обмен валюты, активация eSIM, поезд до города.",
          lat: 34.4342, lng: 135.2441,
          hours: "Прилёт 12:45",
          price: "Nankai/JR до Namba ≈ 970–1200 ¥",
          tips: "Заранее подготовьте QR Visit Japan Web. Возьмите ICOCA — пригодится весь трип.",
          tags: ["culture"]
        },
        {
          name: "Квартира Tanimachi 6-chome", emoji: "🏠",
          desc: "Заселение, отдых, разбор вещей.",
          lat: 34.6752, lng: 135.5192,
          hours: "По брони",
          price: "—",
          tips: "Отличная база: центр, метро Tanimachi и Nagahori линии рядом.",
          tags: ["culture"]
        },
        {
          name: "Dotonbori", emoji: "🌃", time: "вечер",
          desc: "Фото с Glico Man, прогулка вдоль канала, первые такояки и окономияки, разведка в Don Quijote.",
          lat: 34.6686, lng: 135.5010,
          hours: "Улица — всегда; заведения обычно до 23:00–01:00",
          price: "Такояки ≈ 500–700 ¥, окономияки ≈ 900–1300 ¥",
          tips: "Без обязательного тайминга — просто атмосфера. Don Quijote рядом для разведки.",
          food: "Takoyaki Wanaka, Okonomiyaki Mizuno, Kani Doraku",
          tags: ["culture", "photo", "food"]
        }
      ]
    },
    {
      n: 2, date: "10 сентября", weekday: "Чт",
      title: "История + игровой мир",
      goal: "Замок утром, игровой район днём, Синсэкай вечером",
      load: 3,
      color: "#e63946",
      places: [
        {
          name: "Osaka Castle", emoji: "🏯",
          desc: "Замок и парк вокруг, спокойная прогулка, фотографии.",
          lat: 34.6873, lng: 135.5259,
          hours: "09:00–17:00 (вход до 16:30)",
          price: "Замок ≈ 600 ¥, парк бесплатно",
          tips: "Приходите к открытию — меньше людей. Парк красив сам по себе.",
          food: "Кафе в парке, конбини рядом",
          tags: ["culture", "photo", "nature"]
        },
        {
          name: "Den Den Town (Nipponbashi)", emoji: "🎮",
          desc: "Главный игровой район: фигурки, ретро, аниме, поиск Switch 2 и игр Trails/Persona.",
          lat: 34.6614, lng: 135.5064,
          hours: "Большинство магазинов 11:00–20:00",
          price: "—",
          tips: "Прочешите Super Potato, Surugaya, Animate, магазины фигурок. Ищите Switch 2 и JRPG.",
          food: "Кафе и рамен по всему району",
          tags: ["nintendo", "jrpg", "games", "anime", "tech", "shopping"]
        },
        {
          name: "Super Potato Osaka", emoji: "🕹️",
          desc: "Легендарный ретро-магазин: приставки, картриджи, фигурки.",
          lat: 34.6626, lng: 135.5060,
          hours: "11:00–20:00",
          price: "—",
          tips: "Для ретро-игр и раритетных JRPG — обязательный пункт.",
          tags: ["nintendo", "jrpg", "games", "tech"]
        },
        {
          name: "Shinsekai + Tsutenkaku", emoji: "🗼",
          desc: "Ретро-район, башня Цутэнкаку, вечерний неон, кушикацу.",
          lat: 34.6524, lng: 135.5063,
          hours: "Башня 10:00–20:00; заведения до поздна",
          price: "Смотровая ≈ 1000 ¥, кушикацу ≈ 100–200 ¥/шт",
          tips: "Правило кушикацу: не макать во второй раз в общий соус!",
          food: "Kushikatsu Daruma",
          tags: ["culture", "photo", "food"]
        }
      ]
    },
    {
      n: 3, date: "11 сентября", weekday: "Пт",
      title: "Шопинг и панорама города",
      goal: "Тэннодзи, шопинг, закат с Abeno Harukas",
      load: 2,
      color: "#e07a5f",
      places: [
        {
          name: "Tennoji · Q's Mall", emoji: "🛍️",
          desc: "Крупный ТЦ: Uniqlo, GU, косметика, магазины.",
          lat: 34.6459, lng: 135.5137,
          hours: "10:00–21:00",
          price: "—",
          tips: "Uniqlo/GU в Японии дешевле и с эксклюзивными коллекциями.",
          food: "Фудкорт в моле",
          tags: ["shopping", "cafe"]
        },
        {
          name: "Abeno Harukas 300", emoji: "🌆", time: "17:00", fixed: true,
          desc: "Самый высокий небоскрёб — смотровая, Осака на закате, затем ужин в изакае.",
          lat: 34.6459, lng: 135.5138,
          hours: "09:00–22:00 · подъём в 17:00",
          price: "≈ 1500 ¥",
          tips: "Идите к закату — увидите город днём и в огнях сразу.",
          tags: ["photo", "culture"]
        }
      ]
    },
    {
      n: 4, date: "12 сентября", weekday: "Сб",
      title: "Киото: классическая Япония",
      goal: "Тории, старый Киото и Nintendo в одном дне",
      load: 4,
      color: "#e63946",
      places: [
        {
          name: "Fushimi Inari", emoji: "⛩️", time: "рано утром",
          desc: "Тысячи красных тории на склоне горы, знаковые фото.",
          lat: 34.9671, lng: 135.7727,
          hours: "Круглосуточно",
          price: "Бесплатно",
          tips: "Приезжайте рано (до 8:00) — иначе толпы. Полный подъём ≈ 2 часа.",
          food: "Уличная еда у входа: инари-суши, данго",
          tags: ["culture", "photo", "nature"]
        },
        {
          name: "Kiyomizu-dera", emoji: "🏯",
          desc: "Храм на сваях с видом на Киото.",
          lat: 34.9949, lng: 135.7850,
          hours: "06:00–18:00",
          price: "≈ 500 ¥",
          tips: "Совместите с прогулкой по старым улицам ниже.",
          tags: ["culture", "photo"]
        },
        {
          name: "Ninenzaka / Sannenzaka", emoji: "🍡",
          desc: "Старые мощёные улочки, деревянные дома, сувениры, матча.",
          lat: 34.9967, lng: 135.7820,
          hours: "Магазины 10:00–18:00",
          price: "—",
          tips: "Самая атмосферная часть Киото. Загляните в Starbucks в традиционном доме.",
          food: "Матча-мороженое, данго, вагаси",
          tags: ["culture", "photo", "cafe", "shopping"]
        },
        {
          name: "Nintendo Kyoto", emoji: "🎮", time: "вечер",
          desc: "Официальный магазин Nintendo (Kyoto Takashimaya S.C. [T8]).",
          lat: 35.0038, lng: 135.7682,
          hours: "10:00–20:00",
          price: "—",
          tips: "Эксклюзивный мерч Nintendo. Совмещаем традицию и игры в один день.",
          tags: ["nintendo", "games", "shopping"]
        }
      ]
    },
    {
      n: 5, date: "13 сентября", weekday: "Вс",
      title: "Нара",
      goal: "Олени, Тодай-дзи, вечером — возвращение и ужин в Намба",
      load: 3,
      color: "#e07a5f",
      places: [
        {
          name: "Парк Нара", emoji: "🦌",
          desc: "Свободно гуляющие олени, зелёные лужайки, фото.",
          lat: 34.6851, lng: 135.8430,
          hours: "Круглосуточно",
          price: "Бесплатно; крекеры для оленей ≈ 200 ¥",
          tips: "Олени кланяются за печенье. Прячьте карты и билеты — сжуют.",
          tags: ["nature", "photo", "cute", "culture"]
        },
        {
          name: "Todai-ji", emoji: "🛕",
          desc: "Огромный деревянный храм с гигантским Буддой.",
          lat: 34.6890, lng: 135.8398,
          hours: "08:00–17:00",
          price: "≈ 800 ¥",
          tips: "Не спешить — просто наслаждайтесь масштабом.",
          tags: ["culture", "photo"]
        }
      ]
    },
    {
      n: 6, date: "14 сентября", weekday: "Пн",
      title: "День восстановления",
      goal: "Лёгкий день, кафе, магазины, подготовка к USJ",
      load: 1,
      color: "#81b29a",
      places: [
        {
          name: "America-mura", emoji: "🧢",
          desc: "Молодёжный район: винтаж, стритвир, стрит-арт.",
          lat: 34.6717, lng: 135.4985,
          hours: "Магазины 11:00–20:00",
          price: "—",
          tips: "Хорошее место для спонтанных находок и кофе.",
          food: "Кафе, стритфуд",
          tags: ["shopping", "cafe", "photo"]
        },
        {
          name: "Shinsaibashi", emoji: "🛍️",
          desc: "Длинная крытая торговая улица, бренды и сувениры. Вечером — подготовка к USJ.",
          lat: 34.6723, lng: 135.5010,
          hours: "10:00–21:00",
          price: "—",
          tips: "Вечер: зарядить пауэрбанки, проверить билеты USJ, собрать вещи на утро.",
          food: "Много кафе и десертных",
          tags: ["shopping", "cafe", "cute"]
        }
      ]
    },
    {
      n: 7, date: "15 сентября", weekday: "Вт",
      title: "Universal Studios Japan",
      goal: "Главный день: Super Nintendo World и аттракционы",
      load: 5,
      color: "#c1121f",
      places: [
        {
          name: "Universal Studios Japan", emoji: "🎢", time: "07:30", fixed: true,
          desc: "Прибытие в парк к 07:30. Super Nintendo World, Donkey Kong, Harry Potter, Jurassic Park, Minions. Катаемся до закрытия.",
          lat: 34.6654, lng: 135.4323,
          hours: "Прибытие 07:30; парк обычно до 21:00",
          price: "Билет ≈ 8600–10400 ¥; Express Pass отдельно",
          tips: "Купите билеты и Area Timed Entry / Express Pass заранее. Приходите за 30–45 мин до открытия.",
          food: "Внутри парка (тематические кафе)",
          tags: ["nintendo", "games", "photo", "culture"]
        },
        {
          name: "Super Nintendo World", emoji: "🍄",
          desc: "Зона Nintendo: Mario Kart, Yoshi, Power-Up Band, Donkey Kong Country.",
          lat: 34.6689, lng: 135.4310,
          hours: "В часы работы парка",
          price: "Входит в билет; браслет Power-Up Band ≈ 4200 ¥",
          tips: "Сразу берите Timed Entry на вход в зону через приложение USJ.",
          tags: ["nintendo", "games", "photo"]
        }
      ]
    },
    {
      n: 8, date: "16 сентября", weekday: "Ср",
      title: "Отдых + Kuromon Market",
      goal: "Отоспаться после USJ, спокойный гастро-день",
      load: 1,
      color: "#81b29a",
      places: [
        {
          name: "Kuromon Ichiba", emoji: "🍣",
          desc: "Крытый рынок: суши, морепродукты, мясо, японские сладости.",
          lat: 34.6656, lng: 135.5065,
          hours: "09:00–18:00 (многие лавки закрываются раньше)",
          price: "От 300 ¥ за порцию и выше",
          tips: "Приходите голодными и пробуйте понемногу у разных прилавков.",
          food: "Свежие устрицы, тунец, вагю-шашлычки, дыня",
          tags: ["food", "culture", "photo"]
        }
      ]
    },
    {
      n: 9, date: "17 сентября", weekday: "Чт",
      title: "Киото: природа",
      goal: "Арасияма, бамбук, золотой павильон",
      load: 4,
      color: "#e63946",
      places: [
        {
          name: "Arashiyama · бамбуковый лес", emoji: "🎋",
          desc: "Знаменитая бамбуковая роща, река, атмосфера.",
          lat: 35.0170, lng: 135.6716,
          hours: "Круглосуточно",
          price: "Бесплатно",
          tips: "Рано утром — почти пусто и лучший свет для фото.",
          tags: ["nature", "photo", "culture"]
        },
        {
          name: "Tenryu-ji", emoji: "🍃",
          desc: "Дзен-храм с одним из красивейших садов Японии.",
          lat: 35.0159, lng: 135.6737,
          hours: "08:30–17:00",
          price: "Сад ≈ 500 ¥",
          tips: "Выход из сада ведёт прямо в бамбуковую рощу.",
          tags: ["culture", "nature", "photo"]
        },
        {
          name: "Kinkaku-ji", emoji: "🏯",
          desc: "Золотой павильон, отражающийся в пруду.",
          lat: 35.0394, lng: 135.7292,
          hours: "09:00–17:00",
          price: "≈ 500 ¥",
          tips: "Один из самых фотогеничных видов Японии.",
          tags: ["culture", "photo"]
        },
        {
          name: "Ryoan-ji", emoji: "🪨",
          desc: "Знаменитый сад камней (только если есть силы).",
          lat: 35.0345, lng: 135.7183,
          hours: "08:00–17:00",
          price: "≈ 600 ¥",
          tips: "Опционально — идите, только если не устали.",
          tags: ["culture", "nature"]
        }
      ]
    },
    {
      n: 10, date: "18 сентября", weekday: "Пт",
      title: "Кобе",
      goal: "Порт, Харборленд, знаменитая говядина",
      load: 2,
      color: "#e07a5f",
      places: [
        {
          name: "Harborland + Kobe Tower", emoji: "⚓",
          desc: "Порт, набережная, башня Кобе, атмосфера города. Спокойный и красивый день.",
          lat: 34.6795, lng: 135.1810,
          hours: "Магазины 10:00–21:00",
          price: "—",
          tips: "Красиво вечером с подсветкой порта.",
          food: "Кафе и рестораны у воды",
          tags: ["photo", "cafe", "culture"]
        },
        {
          name: "Теппаньяки: говядина Kobe", emoji: "🥩",
          desc: "Главный гастро-опыт города — оригинальная мраморная говядина Кобе на теппане.",
          lat: 34.6900, lng: 135.1955,
          hours: "Обед 11:30–14:00, ужин с 17:00",
          price: "—",
          tips: "Бронируйте столик заранее — популярные теппаньяки забиты.",
          food: "Steakland Kobe, Mouriya",
          tags: ["food", "culture"]
        }
      ]
    },
    {
      n: 11, date: "19 сентября", weekday: "Сб",
      title: "Умеда",
      goal: "Техника, Pokemon Center, свободный шопинг",
      load: 2,
      color: "#e07a5f",
      places: [
        {
          name: "Yodobashi Camera Umeda", emoji: "📷",
          desc: "Огромный магазин техники, гаджетов, игр и хобби.",
          lat: 34.7048, lng: 135.4959,
          hours: "09:30–22:00",
          price: "—",
          tips: "Tax-free по загранпаспорту. Целый этаж игр и фигурок.",
          tags: ["tech", "games", "shopping"]
        },
        {
          name: "Pokemon Center Osaka", emoji: "⚡",
          desc: "Официальный магазин Pokemon (Daimaru Umeda, 13F).",
          lat: 34.7024, lng: 135.4959,
          hours: "10:00–20:00",
          price: "—",
          tips: "Эксклюзивный осакский мерч. Рядом — Pokemon Cafe (по брони).",
          tags: ["games", "cute", "shopping", "anime"]
        },
        {
          name: "HEP Five", emoji: "🎡",
          desc: "ТЦ с красным колесом обозрения на крыше.",
          lat: 34.7043, lng: 135.5000,
          hours: "11:00–21:00; колесо до 22:45",
          price: "Колесо ≈ 600 ¥",
          tips: "Красный круг на фоне города — хорошее фото.",
          tags: ["shopping", "photo", "cute"]
        }
      ]
    },
    {
      n: 12, date: "20 сентября", weekday: "Вс",
      title: "Химэдзи",
      goal: "Самый красивый замок Японии и сад",
      load: 4,
      color: "#e63946",
      places: [
        {
          name: "Замок Химэдзи", emoji: "🏯",
          desc: "«Белая цапля» — лучший сохранившийся замок Японии.",
          lat: 34.8394, lng: 134.6939,
          hours: "09:00–17:00 (вход до 16:00)",
          price: "≈ 1000 ¥ (комбо с садом ≈ 1050 ¥)",
          tips: "Дорога из Осаки ≈ 1 час на JR. Внутри крутые узкие лестницы.",
          tags: ["culture", "photo"]
        },
        {
          name: "Сад Koko-en", emoji: "🌸",
          desc: "Девять традиционных садов рядом с замком.",
          lat: 34.8384, lng: 134.6910,
          hours: "09:00–17:00",
          price: "≈ 310 ¥ (или комбо-билет)",
          tips: "Тихое место после замка, есть чайный домик.",
          food: "Чайная церемония в саду",
          tags: ["nature", "photo", "culture", "cafe"]
        }
      ]
    },
    {
      n: 13, date: "21 сентября", weekday: "Пн",
      title: "Остров Авадзи",
      goal: "Naruto-парк для Александра, Hello Kitty для Риты",
      load: 3,
      color: "#e07a5f",
      places: [
        {
          name: "Nijigen no Mori", emoji: "🍜", time: "10:30–14:00", fixed: true,
          desc: "Naruto Shinobi-Zato, зона Конохи, фотографии, квесты. Утром — переезд через мост Акаси-Кайкё.",
          lat: 34.5417, lng: 134.9838,
          hours: "Ваш слот 10:30–14:00",
          price: "Вход в парк бесплатный; аттракционы платные (≈ 1000–3500 ¥)",
          tips: "Для Александра — зона Naruto обязательна. Билеты лучше заранее.",
          tags: ["anime", "photo", "games", "culture"]
        },
        {
          name: "Hello Kitty Smile", emoji: "🎀", time: "14:30–16:30", fixed: true,
          desc: "Океан, кафе, фото. Вечером — возвращение в Осаку.",
          lat: 34.5980, lng: 134.9960,
          hours: "Ваш слот 14:30–16:30",
          price: "Вход ≈ 1100 ¥; шоу/еда отдельно",
          tips: "Для Риты — море, милые персонажи, идеальные фото.",
          food: "Тематическое кафе Hello Kitty",
          tags: ["hellokitty", "cute", "photo", "cafe"]
        }
      ]
    },
    {
      n: 14, date: "22 сентября", weekday: "Вт",
      title: "Expo Park",
      goal: "Спокойный день в парке, вечер на Umeda Sky",
      load: 3,
      color: "#e07a5f",
      places: [
        {
          name: "Expo '70 Commemorative Park", emoji: "🌳",
          desc: "Огромный парк ЭКСПО-70, сады, простор.",
          lat: 34.8073, lng: 135.5320,
          hours: "09:30–17:00 (ср — выходной)",
          price: "≈ 260 ¥",
          tips: "Много зелени и места для неспешной прогулки.",
          tags: ["nature", "photo", "culture"]
        },
        {
          name: "Tower of the Sun", emoji: "🗿",
          desc: "Культовая скульптура Тэдзо Окамото в центре парка.",
          lat: 34.8080, lng: 135.5323,
          hours: "Внутрь — по брони",
          price: "Внутрь ≈ 930 ¥",
          tips: "Внутренняя экспозиция — по предварительной брони.",
          tags: ["culture", "photo"]
        },
        {
          name: "Umeda Sky Building", emoji: "🌃",
          desc: "Парящий сад-обсерватория, панорама Осаки вечером.",
          lat: 34.7052, lng: 135.4901,
          hours: "09:30–22:30",
          price: "≈ 1500 ¥",
          tips: "Приходите к закату — один из лучших видов города.",
          tags: ["photo", "culture"]
        }
      ]
    },
    {
      n: 15, date: "23 сентября", weekday: "Ср",
      title: "Sylvanian Families + море",
      goal: "Милый парк, капибары и, если повезёт с погодой, пляж",
      load: 2,
      color: "#e07a5f",
      places: [
        {
          name: "Harvest Hill", emoji: "🐹",
          desc: "Ферма-парк с зоной Sylvanian и капибарами.",
          lat: 34.4790, lng: 135.5030,
          hours: "09:30–17:00",
          price: "≈ 1000 ¥",
          tips: "Для Риты — Sylvanian Park и милые животные. Идеальные фото.",
          food: "Кафе на ферме, барбекю",
          tags: ["sylvanian", "cute", "photo", "nature", "cafe"]
        },
        {
          name: "Nishikinohama Beach", emoji: "🏖️",
          desc: "Пляж — если хорошая погода.",
          lat: 34.4130, lng: 135.3160,
          hours: "Круглосуточно",
          price: "Бесплатно",
          tips: "Опционально: только при хорошей погоде.",
          tags: ["nature", "photo"]
        }
      ]
    },
    {
      n: 16, date: "24 сентября", weekday: "Чт",
      title: "Последний день",
      goal: "Сувениры, упаковка, прощальный ужин",
      load: 2,
      color: "#e07a5f",
      places: [
        {
          name: "Don Quijote Dotonbori", emoji: "🛒",
          desc: "Сувениры, снеки, косметика, всё подряд — финальные покупки.",
          lat: 34.6690, lng: 135.5017,
          hours: "Часто круглосуточно",
          price: "—",
          tips: "Tax-free по паспорту. Оставьте место в чемодане!",
          tags: ["shopping", "cute", "food"]
        },
        {
          name: "Прощальный ужин", emoji: "🍖",
          desc: "Якинику или сукияки на финал поездки.",
          lat: 34.6700, lng: 135.5030,
          hours: "Ужин с 17:00",
          price: "≈ 3000–6000 ¥ с человека",
          tips: "Забронируйте столик заранее — популярные места забиты.",
          food: "Якинику, сукияки",
          tags: ["food", "culture"]
        }
      ]
    },
    {
      n: 17, date: "25 сентября", weekday: "Пт",
      title: "Отъезд",
      goal: "Выселение, дорога в аэропорт и вылет в Шанхай",
      load: 3,
      color: "#457b9d",
      places: [
        {
          name: "Вылет из KIX", emoji: "🛫", time: "15:00", fixed: true,
          desc: "Утром — выселение из квартиры. Днём дорога в аэропорт Кансай. Рейс Spring Airlines в Шанхай.",
          lat: 34.4342, lng: 135.2441,
          hours: "Вылет 15:00 (Spring Airlines → Шанхай)",
          price: "Трансфер до KIX ≈ 970–1200 ¥",
          tips: "Будьте в аэропорту за 3 часа. Заранее проверьте терминал (T1) и правила Spring Airlines по багажу.",
          tags: ["culture"]
        }
      ]
    }
  ]
};

// Справочник интересов для фильтров (метка + иконка).
const INTERESTS = [
  { key: "all",       label: "Всё",              emoji: "✨" },
  { key: "nintendo",  label: "Nintendo",         emoji: "🍄" },
  { key: "jrpg",      label: "JRPG / ретро",     emoji: "🐉" },
  { key: "games",     label: "Игры / магазины",  emoji: "🎮" },
  { key: "tech",      label: "Техника",          emoji: "💻" },
  { key: "anime",     label: "Аниме",            emoji: "🌀" },
  { key: "hellokitty",label: "Hello Kitty",      emoji: "🎀" },
  { key: "sylvanian", label: "Sylvanian",        emoji: "🐹" },
  { key: "cute",      label: "Милое",            emoji: "🧸" },
  { key: "photo",     label: "Фото",             emoji: "📸" },
  { key: "culture",   label: "Культура",         emoji: "⛩️" },
  { key: "nature",    label: "Природа",          emoji: "🌿" },
  { key: "food",      label: "Еда",              emoji: "🍜" },
  { key: "cafe",      label: "Кафе",             emoji: "☕" },
  { key: "shopping",  label: "Шопинг",           emoji: "🛍️" }
];
