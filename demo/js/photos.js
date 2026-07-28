/** Фото мест (Wikimedia Commons). Ключ — точное name из data.js */
const PLACE_PHOTOS = {
  "Прилёт в KIX": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/%E9%96%A2%E8%A5%BF%E5%9B%BD%E9%9A%9B%E7%A9%BA%E6%B8%AF%E5%85%A8%E4%BD%93%E5%86%99%E7%9C%9F20220811.jpg/960px-%E9%96%A2%E8%A5%BF%E5%9B%BD%E9%9A%9B%E7%A9%BA%E6%B8%AF%E5%85%A8%E4%BD%93%E5%86%99%E7%9C%9F20220811.jpg"
  ],
  "Вылет KIX → Шанхай": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/%E9%96%A2%E8%A5%BF%E5%9B%BD%E9%9A%9B%E7%A9%BA%E6%B8%AF%E5%85%A8%E4%BD%93%E5%86%99%E7%9C%9F20220811.jpg/960px-%E9%96%A2%E8%A5%BF%E5%9B%BD%E9%9A%9B%E7%A9%BA%E6%B8%AF%E5%85%A8%E4%BD%93%E5%86%99%E7%9C%9F20220811.jpg"
  ],
  "Dotonbori": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Osaka_Dotonbori_Ebisu_Bridge.jpg/960px-Osaka_Dotonbori_Ebisu_Bridge.jpg"
  ],
  "Осакский замок": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Osaka_Castle_03bs3200.jpg/960px-Osaka_Castle_03bs3200.jpg"
  ],
  "Shinsekai + Tsutenkaku": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Shinsekai_and_Tsutenkaku_Tower.jpg/960px-Shinsekai_and_Tsutenkaku_Tower.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Tsutenkaku_Tower_%40_Shinsekai_%40_Osaka_%2813382286155%29.jpg/960px-Tsutenkaku_Tower_%40_Shinsekai_%40_Osaka_%2813382286155%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Tsutenkaku_Tower_%40_Shinsekai_%40_Osaka_%2813382528863%29.jpg/960px-Tsutenkaku_Tower_%40_Shinsekai_%40_Osaka_%2813382528863%29.jpg"
  ],
  "Океанариум Kaiyukan": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Kaiy%C5%ABkan.jpg/960px-Kaiy%C5%ABkan.jpg"
  ],
  "Колесо обозрения Tempozan": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Grand_ferris_wheel_of_Tempozan_Harbor_Village_2.jpg/960px-Grand_ferris_wheel_of_Tempozan_Harbor_Village_2.jpg"
  ],
  "Abeno Harukas 300": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/%E3%81%82%E3%81%B9%E3%81%AE%E3%83%8F%E3%83%AB%E3%82%AB%E3%82%B9.jpg/960px-%E3%81%82%E3%81%B9%E3%81%AE%E3%83%8F%E3%83%AB%E3%82%AB%E3%82%B9.jpg"
  ],
  "Fushimi Inari": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Torii_path_with_lantern_at_Fushimi_Inari_Taisha_Shrine%2C_Kyoto%2C_Japan.jpg/960px-Torii_path_with_lantern_at_Fushimi_Inari_Taisha_Shrine%2C_Kyoto%2C_Japan.jpg"
  ],
  "Kiyomizu-dera": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Kiyomizu.jpg/960px-Kiyomizu.jpg"
  ],
  "Ninenzaka / Sannenzaka": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Gion_-_Nineizaka_%28Ninenzaka%29%2C_Kyoto%2C_Japan_%2848923272228%29.jpg/960px-Gion_-_Nineizaka_%28Ninenzaka%29%2C_Kyoto%2C_Japan_%2848923272228%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Gion_-_Nineizaka_%28Ninenzaka%29%2C_Kyoto%2C_Japan_%2848923334473%29.jpg/960px-Gion_-_Nineizaka_%28Ninenzaka%29%2C_Kyoto%2C_Japan_%2848923334473%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Pedestrian_road_with_pavements_and_paper_umbrellas%2C_Higashiyama-ku%2C_Kyoto%2C_Japan%2C_early_morning.jpg/960px-Pedestrian_road_with_pavements_and_paper_umbrellas%2C_Higashiyama-ku%2C_Kyoto%2C_Japan%2C_early_morning.jpg"
  ],
  "Парк Нара": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Nara_Park_-_panoramio_%282%29.jpg/960px-Nara_Park_-_panoramio_%282%29.jpg"
  ],
  "Todai-ji": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/T%C5%8Ddai-ji_Kon-d%C5%8D.jpg/960px-T%C5%8Ddai-ji_Kon-d%C5%8D.jpg"
  ],
  "Shinsaibashi": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Shinsaibashi_Osaka_Japan01-r.jpg/960px-Shinsaibashi_Osaka_Japan01-r.jpg"
  ],
  "Universal Studios Japan": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/USJ_5years.JPG/960px-USJ_5years.JPG"
  ],
  "Super Nintendo World": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/USJ_5years.JPG/960px-USJ_5years.JPG"
  ],
  "Arashiyama · бамбуковый лес": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Arashiyama%2C_Part_II_-_Arashiyama7534.jpg/960px-Arashiyama%2C_Part_II_-_Arashiyama7534.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Tenryu-ji%2C_Arashiyama_%283810375075%29.jpg/960px-Tenryu-ji%2C_Arashiyama_%283810375075%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Tenryu-ji%2C_Arashiyama_%283810381291%29.jpg/960px-Tenryu-ji%2C_Arashiyama_%283810381291%29.jpg"
  ],
  "Tenryu-ji": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Tenryu-ji%2C_Arashiyama_%283810375075%29.jpg/960px-Tenryu-ji%2C_Arashiyama_%283810375075%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Tenryu-ji%2C_Arashiyama_%283810381291%29.jpg/960px-Tenryu-ji%2C_Arashiyama_%283810381291%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Tenryu-ji%2C_Arashiyama_%283813363930%29.jpg/960px-Tenryu-ji%2C_Arashiyama_%283813363930%29.jpg"
  ],
  "Kinkaku-ji": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Golden_Pavilion%2C_Kinkaku-ji%2C_Kyoto%2C_20240820_1523_5130.jpg/960px-Golden_Pavilion%2C_Kinkaku-ji%2C_Kyoto%2C_20240820_1523_5130.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Kinkaku-ji_in_November_2016_-02.jpg/960px-Kinkaku-ji_in_November_2016_-02.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Water_reflection_of_Kinkaku-ji_Temple_a_sunny_day%2C_Kyoto%2C_Japan.jpg/960px-Water_reflection_of_Kinkaku-ji_Temple_a_sunny_day%2C_Kyoto%2C_Japan.jpg"
  ],
  "Ryoan-ji": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Ninna-ji_and_Ryoan-ji%2C_Kyoto_-_Ryoanji7753.jpg/960px-Ninna-ji_and_Ryoan-ji%2C_Kyoto_-_Ryoanji7753.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/RyoanJi-Dry_garden.jpg/960px-RyoanJi-Dry_garden.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Ry%C5%8Dan-ji_rock_garden_with_silhouettes_of_tourists%2C_Kyoto%2C_2016.jpg/960px-Ry%C5%8Dan-ji_rock_garden_with_silhouettes_of_tourists%2C_Kyoto%2C_2016.jpg"
  ],
  "Harborland + Kobe Tower": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Kobe_Port_Tower_and_Harborland_at_night_20190202-1.jpg/960px-Kobe_Port_Tower_and_Harborland_at_night_20190202-1.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Kobe_Port_Tower_and_Harborland_at_night_20190202-2.jpg/960px-Kobe_Port_Tower_and_Harborland_at_night_20190202-2.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Kobe_Port_Tower_and_Harborland_at_night_20190202-3.jpg/960px-Kobe_Port_Tower_and_Harborland_at_night_20190202-3.jpg"
  ],
  "Замок Химэдзи": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Ch%C3%A2teau_de_Himeji02.jpg/960px-Ch%C3%A2teau_de_Himeji02.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Himeji_Castle_also_known_as_the_White_Heron_castle_%28%22Shirasagijo%22%29_%2853621201074%29.jpg/960px-Himeji_Castle_also_known_as_the_White_Heron_castle_%28%22Shirasagijo%22%29_%2853621201074%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Himeji_castle_in_may_2015.jpg/960px-Himeji_castle_in_may_2015.jpg"
  ],
  "Umeda Sky Building": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/20100715_Osaka_Umeda_Sky_Building_escalator_1855.jpg/960px-20100715_Osaka_Umeda_Sky_Building_escalator_1855.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Umeda_Sky_Building%2C_Osaka%2C_November_2016_-01.jpg/960px-Umeda_Sky_Building%2C_Osaka%2C_November_2016_-01.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Umeda_Sky_Building%2C_Osaka%2C_November_2016_-02.jpg/960px-Umeda_Sky_Building%2C_Osaka%2C_November_2016_-02.jpg"
  ],
  "Den Den Town (Nipponbashi)": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Den-Den_Town%2C_Nipponbashi%2C_Osaka_-_Jul_12%2C_2023.jpg/960px-Den-Den_Town%2C_Nipponbashi%2C_Osaka_-_Jul_12%2C_2023.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Nipponbashi%2C_Osaka01.JPG/960px-Nipponbashi%2C_Osaka01.JPG"
  ],
  "Super Potato Osaka": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Nipponbashi%2C_Osaka01.JPG/960px-Nipponbashi%2C_Osaka01.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Den-Den_Town%2C_Nipponbashi%2C_Osaka_-_Jul_12%2C_2023.jpg/960px-Den-Den_Town%2C_Nipponbashi%2C_Osaka_-_Jul_12%2C_2023.jpg"
  ],
  "America-mura": [
    "https://upload.wikimedia.org/wikipedia/commons/a/ad/Americamura.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/JP-osaka-amerikamura.jpg/960px-JP-osaka-amerikamura.jpg"
  ],
  "Kuromon Ichiba": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Seafood_in_Kuromon_Market%2C_Osaka_on_June_7th%2C_2017.jpg/960px-Seafood_in_Kuromon_Market%2C_Osaka_on_June_7th%2C_2017.jpg"
  ],
  "Hard Off Yao": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Game_Cube_at_Hard_Off_Kadoma_Shikenjomae.jpg/960px-Game_Cube_at_Hard_Off_Kadoma_Shikenjomae.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/PS2_at_Hard_Off_Kadoma_Shikenjomae.jpg/960px-PS2_at_Hard_Off_Kadoma_Shikenjomae.jpg"
  ],
  "Yodobashi Camera Umeda": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Yodobashi_Camera_Multimedia_Umeda_on_20th_November_2019.jpg/960px-Yodobashi_Camera_Multimedia_Umeda_on_20th_November_2019.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Yodobashi_Camera_multimedia_umeda_-_panoramio.jpg/960px-Yodobashi_Camera_multimedia_umeda_-_panoramio.jpg"
  ],
  "Pokemon Center Osaka": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Osaka_Pok%C3%A9mon_Center.jpg/960px-Osaka_Pok%C3%A9mon_Center.jpg"
  ],
  "HEP Five": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/HEP_FIVE_Ferris_Wheel._Osaka%2C_Kansai_region%2C_Island_of_Honshu%2C_Japan.jpg/960px-HEP_FIVE_Ferris_Wheel._Osaka%2C_Kansai_region%2C_Island_of_Honshu%2C_Japan.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/9/9f/HEP_Five_Ferris_wheel%2C_October_2005.jpg"
  ],
  "Сад Koko-en": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Koko-en%2C_Himeji.jpg/960px-Koko-en%2C_Himeji.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Raised_garden_beds_in_the_Garden_of_Seedlings%2C_K%C5%8Dko-en%2C_Himeji%2C_2016.jpg/960px-Raised_garden_beds_in_the_Garden_of_Seedlings%2C_K%C5%8Dko-en%2C_Himeji%2C_2016.jpg"
  ],
  "Expo '70 Commemorative Park": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/131116_Expo_Commemoration_Park_Suita_Osaka_pref_Japan01s3.jpg/960px-131116_Expo_Commemoration_Park_Suita_Osaka_pref_Japan01s3.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/131116_Expo_Commemoration_Park_Suita_Osaka_pref_Japan04s3.jpg/960px-131116_Expo_Commemoration_Park_Suita_Osaka_pref_Japan04s3.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/131116_Expo_Commemoration_Park_Suita_Osaka_pref_Japan15s5.jpg/960px-131116_Expo_Commemoration_Park_Suita_Osaka_pref_Japan15s5.jpg"
  ],
  "Tower of the Sun": [
    "https://upload.wikimedia.org/wikipedia/en/8/8e/Tower_of_the_Sun_-_frontal_view.jpg",
    "https://upload.wikimedia.org/wikipedia/ja/a/a3/131116_Tower_of_the_Sun_Expo_Commemoration_Park_Suita_Osaka_pref_Japan01s3.jpg",
    "https://upload.wikimedia.org/wikipedia/ja/9/91/131116_Tower_of_the_Sun_Expo_Commemoration_Park_Suita_Osaka_pref_Japan02s3.jpg"
  ],
  "Nishikinohama Beach": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Nishikinohama_Park_%281%29.jpg/960px-Nishikinohama_Park_%281%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Nishikinohama_Park_%282%29.jpg/960px-Nishikinohama_Park_%282%29.jpg"
  ],
  "Don Quijote Dotonbori": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Don_Quijote_Dotonbori_Midosuji_store.JPG/960px-Don_Quijote_Dotonbori_Midosuji_store.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Don_Quijote%2C_Nanba_-_panoramio.jpg/960px-Don_Quijote%2C_Nanba_-_panoramio.jpg"
  ],
  "Nintendo Kyoto": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Nintendo_Museum_Entrance.jpg/960px-Nintendo_Museum_Entrance.jpg"
  ]
};
