import type { Localized } from "../i18n/LangContext"

/**
 * What a place's housing stock means for a job there. Each city in
 * data/cities.ts lists the traits that apply to it; the city page explains
 * them and every service page for that city shows the tip that fits the
 * service. General, checkable facts only: no figures, no promises.
 */
export type ServiceGroup = "wet" | "build" | "outside" | "heating"

export type TraitId =
  | "monuments"
  | "prewar"
  | "postwar"
  | "seventies"
  | "newbuild"
  | "apartments"
  | "woodenPiles"
  | "busyCentre"
  | "students"
  | "coast"
  | "woodenHouses"
  | "industrial"
  | "newTown"
  | "villas"
  | "gasExtraction"

export interface Trait {
  title: Localized<string>
  text: Localized<string>
  /** One tip per kind of work; a missing group simply shows nothing. */
  tips: Partial<Record<ServiceGroup, Localized<string>>>
}

export const TRAITS: Record<TraitId, Trait> = {
  monuments: {
    title: {
      nl: "Monumenten en beschermd stadsgezicht",
      en: "Listed buildings and conservation areas",
      uk: "Пам'ятки та захищені історичні квартали",
      ru: "Памятники и охраняемые исторические кварталы",
    },
    text: {
      nl: "In de historische kern staan veel rijks- en gemeentelijke monumenten, vaak binnen een beschermd stadsgezicht. Voor veranderingen aan zo'n pand is regelmatig een omgevingsvergunning nodig.",
      en: "The historic centre has many national and municipal listed buildings, often within a protected conservation area. Changes to such a building regularly require an environmental permit (omgevingsvergunning).",
      uk: "В історичному центрі багато пам'яток державного та муніципального значення, часто в межах захищеного міського ландшафту. Для змін у такій будівлі часто потрібен дозвіл (omgevingsvergunning).",
      ru: "В историческом центре много памятников государственного и муниципального значения, часто в границах охраняемого городского ландшафта. Для изменений в таком здании часто требуется разрешение (omgevingsvergunning).",
    },
    tips: {
      wet: {
        nl: "Een nieuwe badkamer of keuken in een monument? Leidingen en afvoeren door historische vloeren en balken vragen overleg vooraf, en soms een vergunning.",
        en: "A new bathroom or kitchen in a listed building? Running pipes and drains through historic floors and beams needs to be agreed in advance and sometimes requires a permit.",
        uk: "Нова ванна чи кухня в пам'ятці архітектури? Прокладання труб і каналізації через історичні підлоги та балки потрібно погодити заздалегідь, іноді — з дозволом.",
        ru: "Новая ванная или кухня в памятнике архитектуры? Прокладку труб и канализации через исторические полы и балки нужно согласовать заранее, иногда — с разрешением.",
      },
      build: {
        nl: "Bij een rijksmonument geldt de vergunningplicht ook voor delen van het interieur, zoals historische wanden, plafonds en trappen. Dat brengen we vóór de start met u in kaart.",
        en: "For a national monument, the permit requirement also covers parts of the interior, such as historic walls, ceilings and staircases. We map this out with you before work starts.",
        uk: "Для пам'ятки державного значення дозвіл потрібен і для частини інтер'єру — історичних стін, стель, сходів. Ми з'ясуємо це разом з вами до початку робіт.",
        ru: "Для памятника государственного значения разрешение нужно и для части интерьера — исторических стен, потолков, лестниц. Мы выясним это вместе с вами до начала работ.",
      },
      outside: {
        nl: "Kozijnen, kleuren en gevelmaterialen zijn bij monumenten en in een beschermd stadsgezicht aan regels gebonden. We stemmen materiaal en kleur af voordat er wordt begonnen.",
        en: "Window frames, colours and facade materials of listed buildings and in conservation areas are subject to rules. We agree on materials and colours before any work begins.",
        uk: "Віконні рами, кольори та фасадні матеріали пам'яток і будинків у захищених кварталах регулюються правилами. Ми погоджуємо матеріали й кольори до початку робіт.",
        ru: "Оконные рамы, цвета и фасадные материалы памятников и домов в охраняемых кварталах регулируются правилами. Мы согласуем материалы и цвета до начала работ.",
      },
    },
  },
  prewar: {
    title: { nl: "Vooroorlogse woningen", en: "Pre-war homes", uk: "Довоєнні будинки", ru: "Довоенные дома" },
    text: {
      nl: "Veel straten stammen uit de periode 1900–1940: woningen met houten vloeren, hoge plafonds, erkers en houten kozijnen. Karaktervol, maar vaak matig geïsoleerd.",
      en: "Many streets date from 1900–1940: homes with timber floors, high ceilings, bay windows and wooden frames. Full of character, but often poorly insulated.",
      uk: "Багато вулиць забудовано у 1900–1940 роках: будинки з дерев'яними перекриттями, високими стелями, еркерами та дерев'яними рамами. Колоритні, але часто погано утеплені.",
      ru: "Многие улицы застроены в 1900–1940 годах: дома с деревянными перекрытиями, высокими потолками, эркерами и деревянными рамами. Колоритные, но часто плохо утеплённые.",
    },
    tips: {
      wet: {
        nl: "In woningen van vóór 1960 kunnen nog loden waterleidingen zitten. Die vervangen we bij voorkeur meteen als de badkamer of keuken toch open ligt.",
        en: "Homes built before 1960 may still have lead water pipes. Ideally we replace them while the bathroom or kitchen is opened up anyway.",
        uk: "У будинках, збудованих до 1960 року, ще можуть бути свинцеві водогінні труби. Найкраще замінити їх одразу, коли ванна чи кухня все одно розкрита.",
        ru: "В домах, построенных до 1960 года, ещё могут быть свинцовые водопроводные трубы. Лучше заменить их сразу, пока ванная или кухня всё равно вскрыта.",
      },
      build: {
        nl: "Houten balklagen zijn zelden helemaal vlak of waterpas. Bij nieuwe wanden, vloeren of een badkamer op de verdieping houden we daar in de opbouw rekening mee.",
        en: "Timber joists are rarely perfectly flat or level. We allow for this in the build-up of new walls, floors or an upstairs bathroom.",
        uk: "Дерев'яні балкові перекриття рідко бувають ідеально рівними. Ми враховуємо це під час монтажу нових стін, підлог чи ванної на поверсі.",
        ru: "Деревянные балочные перекрытия редко бывают идеально ровными. Мы учитываем это при монтаже новых стен, полов или ванной на этаже.",
      },
      outside: {
        nl: "Houten kozijnen, erkers en dakgoten vragen regelmatig onderhoud; buitenschilderwerk is gemiddeld om de vijf tot zeven jaar aan de beurt.",
        en: "Wooden frames, bay windows and gutters need regular maintenance; exterior paintwork is typically due every five to seven years.",
        uk: "Дерев'яні рами, еркери та ринви потребують регулярного догляду; зовнішнє фарбування зазвичай потрібне раз на п'ять–сім років.",
        ru: "Деревянные рамы, эркеры и водостоки требуют регулярного ухода; наружная покраска обычно нужна раз в пять–семь лет.",
      },
    },
  },
  postwar: {
    title: { nl: "Naoorlogse wijken", en: "Post-war neighbourhoods", uk: "Повоєнні квартали", ru: "Послевоенные кварталы" },
    text: {
      nl: "Na de oorlog verrezen hele wijken met portiekflats, galerijflats en rijtjeshuizen. Badkamers en keukens zijn daar vaak klein of gedateerd, en veel woningen zijn nooit goed geïsoleerd.",
      en: "After the war, entire neighbourhoods of walk-up flats, gallery flats and terraced houses were built. Bathrooms and kitchens there are often small or dated, and many homes were never properly insulated.",
      uk: "Після війни з'явилися цілі квартали з під'їздними та галерейними будинками й рядовою забудовою. Ванні й кухні там часто маленькі чи застарілі, а багато будинків так і не утеплили як слід.",
      ru: "После войны появились целые кварталы с подъездными и галерейными домами и рядовой застройкой. Ванные и кухни там часто маленькие или устаревшие, а многие дома так и не утеплили как следует.",
    },
    tips: {
      wet: {
        nl: "Badkamers in portiekwoningen zijn vaak compact. Met een inloopdouche, een hangtoilet en slimme opbergruimte haalt u er meer uit; afvoeren in gedeelde leidingschachten bekijken we vooraf.",
        en: "Bathrooms in walk-up flats are often compact. A walk-in shower, wall-hung toilet and smart storage make more of the space; we check drains in shared shafts in advance.",
        uk: "Ванні кімнати в під'їздних будинках часто компактні. Душ без піддону, підвісний унітаз і продумане зберігання допоможуть виграти простір; каналізацію в спільних шахтах ми перевіряємо заздалегідь.",
        ru: "Ванные в подъездных домах часто компактные. Душ без поддона, подвесной унитаз и продуманное хранение помогут выиграть пространство; канализацию в общих шахтах мы проверяем заранее.",
      },
      build: {
        nl: "In woningen die vóór 1994 zijn gebouwd kan asbest zitten, bijvoorbeeld in plaatmateriaal of oude vloerbedekking. Bij twijfel laten we dat eerst onderzoeken voordat er wordt gesloopt.",
        en: "Homes built before 1994 may contain asbestos, for example in sheet material or old floor coverings. If in doubt, we have it inspected before anything is demolished.",
        uk: "У будинках, збудованих до 1994 року, може бути азбест — наприклад, у листових матеріалах чи старому покритті підлоги. За найменшого сумніву ми спершу замовляємо перевірку, а потім демонтуємо.",
        ru: "В домах, построенных до 1994 года, может быть асбест — например, в листовых материалах или старом напольном покрытии. При малейшем сомнении мы сначала заказываем проверку, а потом демонтируем.",
      },
      outside: {
        nl: "Betonnen galerijen, balkons en stalen kozijnen uit deze periode vragen ander onderhoud dan hout. Roest en scheurtjes pakken we aan voordat er wordt geschilderd.",
        en: "Concrete galleries, balconies and steel frames from this period need different maintenance from timber. We deal with rust and cracks before painting.",
        uk: "Бетонні галереї, балкони та сталеві рами того періоду потребують іншого догляду, ніж дерево. Іржу й тріщини ми усуваємо до фарбування.",
        ru: "Бетонные галереи, балконы и стальные рамы того периода требуют иного ухода, чем дерево. Ржавчину и трещины мы устраняем до покраски.",
      },
    },
  },
  seventies: {
    title: {
      nl: "Rijtjeshuizen uit de jaren 70 en 80",
      en: "Terraced houses from the 1970s and 80s",
      uk: "Рядові будинки 1970–80-х",
      ru: "Рядовые дома 1970–80-х",
    },
    text: {
      nl: "In de wijken uit de jaren 70 en 80 staan vooral rijtjeshuizen en woonerven. Veel van deze woningen zijn inmiddels toe aan een nieuwe keuken, badkamer of betere isolatie.",
      en: "Neighbourhoods from the 1970s and 80s consist mainly of terraced houses and shared residential courts (woonerven). Many of these homes are now ready for a new kitchen, bathroom or better insulation.",
      uk: "Квартали 1970–80-х — це переважно рядові будинки та житлові двори (woonerven). Багатьом із цих будинків уже потрібні нова кухня, ванна чи краще утеплення.",
      ru: "Кварталы 1970–80-х — это в основном рядовые дома и жилые дворы (woonerven). Многим из этих домов уже нужны новая кухня, ванная или лучшее утепление.",
    },
    tips: {
      wet: {
        nl: "Veel woningen uit deze periode hebben een kruipruimte. Leidingen en afvoeren zijn daardoor vaak goed bereikbaar als de keuken of badkamer verplaatst wordt.",
        en: "Many homes from this period have a crawl space, so pipes and drains are often easy to reach when the kitchen or bathroom is moved.",
        uk: "Багато будинків того періоду мають технічне підпілля (kruipruimte), тож труби й каналізація зазвичай доступні, якщо кухню чи ванну переносять.",
        ru: "Во многих домах того периода есть техническое подполье (kruipruimte), поэтому трубы и канализация обычно доступны, если кухню или ванную переносят.",
      },
      build: {
        nl: "Een open keuken of een doorbraak tussen twee kamers? Binnenmuren in rijtjeshuizen kunnen dragend zijn. Voordat we een muur weghalen, laten we een constructeur meerekenen.",
        en: "An open kitchen or knocking two rooms together? Interior walls in terraced houses can be load-bearing. Before removing a wall, we have a structural engineer do the calculations.",
        uk: "Відкрита кухня чи об'єднання двох кімнат? Внутрішні стіни рядових будинків можуть бути несучими. Перш ніж зносити стіну, ми залучаємо інженера-конструктора для розрахунку.",
        ru: "Открытая кухня или объединение двух комнат? Внутренние стены рядовых домов могут быть несущими. Прежде чем сносить стену, мы привлекаем инженера-конструктора для расчёта.",
      },
      outside: {
        nl: "Houten boeidelen, kozijnen en gevelbetimmering uit deze periode zijn vaak toe aan een flinke opknapbeurt. We bekijken per onderdeel wat hersteld kan worden en wat vervangen moet worden.",
        en: "Wooden fascias, frames and cladding from this period often need a thorough overhaul. We assess each part to see what can be repaired and what needs replacing.",
        uk: "Дерев'яні лобові дошки, рами та обшивка фасаду того періоду часто потребують серйозного оновлення. Ми оцінюємо кожен елемент: що можна відремонтувати, а що треба замінити.",
        ru: "Деревянные лобовые доски, рамы и обшивка фасада того периода часто требуют серьёзного обновления. Мы оцениваем каждый элемент: что можно отремонтировать, а что нужно заменить.",
      },
    },
  },
  newbuild: {
    title: {
      nl: "Vinex- en nieuwbouwwijken",
      en: "Newer housing estates",
      uk: "Нові житлові квартали",
      ru: "Новые жилые кварталы",
    },
    text: {
      nl: "Sinds de jaren 90 zijn er grote nieuwbouwwijken bijgekomen. Nieuwe woningen worden vaak opgeleverd zonder vloerafwerking en met wanden die nog niet klaar zijn voor verf of behang.",
      en: "Large new housing estates have been added since the 1990s. New homes are often handed over without floor finishes and with walls that are not yet ready for paint or wallpaper.",
      uk: "З 1990-х з'явилися великі квартали новобудов. Нове житло часто здають без фінішного покриття підлоги й зі стінами, ще не готовими до фарбування чи шпалер.",
      ru: "С 1990-х появились большие кварталы новостроек. Новое жильё часто сдают без финишного покрытия пола и со стенами, ещё не готовыми к покраске или обоям.",
    },
    tips: {
      wet: {
        nl: "Heeft uw woning nog nieuwbouwgarantie, bijvoorbeeld via Woningborg of SWK? Bekijk dan eerst de voorwaarden voordat er aan leidingen of afvoeren wordt gewerkt.",
        en: "Does your home still have a new-build guarantee, for example through Woningborg or SWK? Check its conditions before any work is done on pipes or drains.",
        uk: "Ваше житло ще має гарантію новобудови, наприклад через Woningborg чи SWK? Тоді спершу перевірте її умови, перш ніж хтось торкатиметься труб чи каналізації.",
        ru: "У вашего жилья ещё есть гарантия новостройки, например через Woningborg или SWK? Тогда сначала проверьте её условия, прежде чем кто-то будет трогать трубы или канализацию.",
      },
      build: {
        nl: "Net opgeleverd? Wanden sausklaar of behangklaar maken, plafonds, vloeren en plinten: het afbouwwerk kan in één aaneengesloten planning.",
        en: "Just handed over? Getting walls ready for paint or wallpaper, ceilings, floors and skirting boards: the finishing work can be done in one continuous schedule.",
        uk: "Щойно отримали ключі? Підготовка стін під фарбування чи шпалери, стелі, підлоги й плінтуси — усі оздоблювальні роботи можна виконати за один безперервний графік.",
        ru: "Только получили ключи? Подготовка стен под покраску или обои, потолки, полы и плинтусы — все отделочные работы можно выполнить по одному непрерывному графику.",
      },
      outside: {
        nl: "Nieuwbouwgevels vragen weinig onderhoud, maar kitnaden, houten delen en schuttingen na een aantal jaar wel. Die nemen we mee in één onderhoudsronde.",
        en: "New-build facades need little maintenance, but sealant joints, timber parts and fences do after a few years. We handle them in a single maintenance round.",
        uk: "Фасади новобудов потребують мало догляду, але герметичні шви, дерев'яні елементи та паркани через кілька років — так. Ми робимо все це за один захід.",
        ru: "Фасады новостроек требуют мало ухода, но герметичные швы, деревянные элементы и заборы через несколько лет — да. Мы делаем всё это за один заход.",
      },
    },
  },
  apartments: {
    title: {
      nl: "Appartementen en VvE's",
      en: "Apartments and owners' associations",
      uk: "Квартири та об'єднання власників (VvE)",
      ru: "Квартиры и объединения собственников (VvE)",
    },
    text: {
      nl: "Een groot deel van de woningen is een appartement. Werk aan gemeenschappelijke delen, zoals de gevel, het dak of leidingen in de schacht, loopt via de Vereniging van Eigenaars (VvE).",
      en: "A large share of homes are apartments. Work on shared parts, such as the facade, the roof or pipes in the shaft, goes through the owners' association (VvE).",
      uk: "Значна частина житла — квартири. Роботи на спільних частинах будинку — фасаді, даху чи трубах у шахті — погоджуються через об'єднання власників (VvE).",
      ru: "Значительная часть жилья — квартиры. Работы на общих частях дома — фасаде, крыше или трубах в шахте — согласуются через объединение собственников (VvE).",
    },
    tips: {
      wet: {
        nl: "Afvoeren en standleidingen lopen vaak door gedeelde schachten. Bij een nieuwe badkamer of keuken zoeken we vooraf uit wat van u is en wat van de VvE.",
        en: "Drains and risers often run through shared shafts. For a new bathroom or kitchen, we first establish what belongs to you and what belongs to the VvE.",
        uk: "Каналізація та стояки часто проходять через спільні шахти. Перед новою ванною чи кухнею ми з'ясовуємо, що належить вам, а що — VvE.",
        ru: "Канализация и стояки часто проходят через общие шахты. Перед новой ванной или кухней мы выясняем, что принадлежит вам, а что — VvE.",
      },
      build: {
        nl: "Een harde vloer in een appartement? Veel VvE's eisen een geluidsisolerende ondervloer. We kijken vooraf in het huishoudelijk reglement, ook naar de tijden waarop er geluid gemaakt mag worden.",
        en: "A hard floor in an apartment? Many VvEs require a sound-insulating underlay. We check the house rules in advance, including the hours when noisy work is allowed.",
        uk: "Тверда підлога в квартирі? Багато VvE вимагають звукоізоляційну підкладку. Ми заздалегідь перевіряємо внутрішній регламент, зокрема години, коли дозволено шумні роботи.",
        ru: "Твёрдый пол в квартире? Многие VvE требуют звукоизолирующую подложку. Мы заранее проверяем внутренний регламент, в том числе часы, когда разрешены шумные работы.",
      },
      outside: {
        nl: "Balkons, kozijnen en gevels zijn bij appartementen vaak gemeenschappelijk eigendom. Voor schilder- of timmerwerk aan de buitenkant is meestal toestemming van de VvE nodig.",
        en: "Balconies, window frames and facades of apartments are often shared property. Exterior painting or carpentry usually needs the VvE's approval.",
        uk: "Балкони, вікна та фасади в багатоквартирних будинках часто є спільною власністю. Для зовнішніх малярних чи теслярських робіт зазвичай потрібна згода VvE.",
        ru: "Балконы, окна и фасады в многоквартирных домах часто являются общей собственностью. Для наружных малярных или плотницких работ обычно нужно согласие VvE.",
      },
    },
  },
  woodenPiles: {
    title: {
      nl: "Funderingen op houten palen",
      en: "Wooden pile foundations",
      uk: "Фундаменти на дерев'яних палях",
      ru: "Фундаменты на деревянных сваях",
    },
    text: {
      nl: "In de oudere wijken staan veel woningen op houten palen in slappe veen- of kleigrond. Als de grondwaterstand daalt, kunnen die palen gaan rotten.",
      en: "In the older districts many homes stand on wooden piles in soft peat or clay. When the groundwater level drops, those piles can start to rot.",
      uk: "У старих районах багато будинків стоїть на дерев'яних палях у м'якому торф'яному чи глинистому ґрунті. Коли рівень ґрунтових вод падає, палі можуть почати гнити.",
      ru: "В старых районах многие дома стоят на деревянных сваях в мягком торфяном или глинистом грунте. Когда уровень грунтовых вод падает, сваи могут начать гнить.",
    },
    tips: {
      wet: {
        nl: "Een badkamer met natuursteen of een zwaar ligbad legt extra gewicht op vloer en fundering. Bij oudere panden bekijken we dat vooraf, zo nodig met een constructeur.",
        en: "A bathroom with natural stone or a heavy bathtub puts extra weight on the floor and foundation. In older buildings we check this in advance, with a structural engineer if needed.",
        uk: "Ванна кімната з натуральним каменем чи важкою ванною додає навантаження на перекриття й фундамент. У старих будинках ми перевіряємо це заздалегідь, за потреби — з конструктором.",
        ru: "Ванная с натуральным камнем или тяжёлой ванной добавляет нагрузку на перекрытие и фундамент. В старых домах мы проверяем это заранее, при необходимости — с конструктором.",
      },
      build: {
        nl: "Scheuren in muren of deuren die gaan klemmen kunnen wijzen op funderingsproblemen. Daar laten we eerst een specialist naar kijken voordat we gaan verbouwen.",
        en: "Cracks in walls or doors that start to stick can point to foundation problems. We have a specialist look at that before we start renovating.",
        uk: "Тріщини в стінах чи двері, що почали заїдати, можуть свідчити про проблеми з фундаментом. Перед ремонтом ми спершу запрошуємо фахівця.",
        ru: "Трещины в стенах или двери, которые начали заедать, могут указывать на проблемы с фундаментом. Перед ремонтом мы сначала приглашаем специалиста.",
      },
      outside: {
        nl: "Scheve kozijnen en scheuren in het metselwerk komen in deze wijken vaker voor. We herstellen ze graag, maar kijken eerst of er een funderingsprobleem achter zit.",
        en: "Crooked frames and cracks in brickwork are more common in these districts. We are happy to repair them, but first check whether a foundation problem is behind them.",
        uk: "Перекошені рами й тріщини в цегляній кладці тут трапляються частіше. Ми охоче їх відремонтуємо, але спершу перевіримо, чи не стоїть за ними проблема з фундаментом.",
        ru: "Перекошенные рамы и трещины в кирпичной кладке здесь встречаются чаще. Мы охотно их отремонтируем, но сначала проверим, не стоит ли за ними проблема с фундаментом.",
      },
    },
  },
  busyCentre: {
    title: { nl: "Drukke binnenstad", en: "Busy city centre", uk: "Щільний центр міста", ru: "Плотный центр города" },
    text: {
      nl: "Smalle straten, betaald parkeren en weinig ruimte voor een container: in het centrum moeten aanvoer en afvoer van materiaal goed gepland worden.",
      en: "Narrow streets, paid parking and little room for a skip: in the centre, deliveries and waste removal have to be planned carefully.",
      uk: "Вузькі вулиці, платне паркування й мало місця для контейнера: у центрі доставку матеріалів і вивезення сміття треба ретельно планувати.",
      ru: "Узкие улицы, платная парковка и мало места для контейнера: в центре доставку материалов и вывоз мусора нужно тщательно планировать.",
    },
    tips: {
      wet: {
        nl: "Een keuken of badkamer bestaat uit veel grote onderdelen. We laten alles zoveel mogelijk in één keer leveren en stemmen vooraf af waar de bus kan staan.",
        en: "A kitchen or bathroom consists of many large parts. We have everything delivered in one go where possible and agree in advance where the van can park.",
        uk: "Кухня чи ванна — це багато великих елементів. Ми намагаємося привезти все за один раз і заздалегідь домовляємося, де стане бус.",
        ru: "Кухня или ванная — это много крупных элементов. Мы стараемся привезти всё за один раз и заранее договариваемся, где встанет фургон.",
      },
      build: {
        nl: "Voor een container of bouwmaterialen op straat is vaak een vergunning van de gemeente nodig. Dat nemen we mee in de planning, zodat het werk op tijd kan beginnen.",
        en: "A skip or building materials on the street often need a municipal permit. We include that in the planning so work can start on time.",
        uk: "Для контейнера чи будматеріалів на вулиці часто потрібен дозвіл муніципалітету. Ми враховуємо це в плані, щоб роботи почалися вчасно.",
        ru: "Для контейнера или стройматериалов на улице часто нужно разрешение муниципалитета. Мы учитываем это в плане, чтобы работы начались вовремя.",
      },
      outside: {
        nl: "Voor een steiger of hoogwerker op de stoep is vaak toestemming van de gemeente nodig. Ook dat nemen we ruim voor de startdatum mee in de planning.",
        en: "Scaffolding or an aerial platform on the pavement often needs municipal permission. We build that into the planning well before the start date as well.",
        uk: "Для риштування чи автовишки на тротуарі часто потрібна згода муніципалітету. Це ми теж закладаємо в план задовго до старту.",
        ru: "Для строительных лесов или автовышки на тротуаре часто нужно согласие муниципалитета. Это мы тоже закладываем в план задолго до старта.",
      },
    },
  },
  students: {
    title: {
      nl: "Studentenstad met veel huurwoningen",
      en: "Student city with many rentals",
      uk: "Студентське місто з великою кількістю оренди",
      ru: "Студенческий город с большим количеством аренды",
    },
    text: {
      nl: "Er zijn veel verhuurde kamers en appartementen, en dus veel wisselingen van huurders. Klein onderhoud en snelle reparaties zijn hier voor verhuurders en VvE's aan de orde van de dag.",
      en: "There are many rented rooms and apartments, and therefore frequent tenant changes. Minor maintenance and quick repairs are everyday business for landlords and VvEs here.",
      uk: "Тут багато кімнат і квартир в оренді, а отже, часта зміна орендарів. Дрібне обслуговування й швидкий ремонт — щоденна справа для орендодавців і VvE.",
      ru: "Здесь много комнат и квартир в аренде, а значит, частая смена арендаторов. Мелкое обслуживание и быстрый ремонт — ежедневное дело для арендодателей и VvE.",
    },
    tips: {
      wet: {
        nl: "Een lekkende kraan, een verstopte afvoer of een versleten douche in een verhuurde woning? Kleine reparaties plannen we in overleg met verhuurder en huurder.",
        en: "A dripping tap, blocked drain or worn-out shower in a rental property? We schedule small repairs in consultation with landlord and tenant.",
        uk: "Кран тече, злив засмітився чи душ зносився в орендованому житлі? Дрібний ремонт ми плануємо за погодженням з орендодавцем і орендарем.",
        ru: "Кран течёт, слив засорился или душ износился в арендованном жилье? Мелкий ремонт мы планируем по согласованию с арендодателем и арендатором.",
      },
      build: {
        nl: "Tussen twee huurders in is er vaak maar kort tijd voor schilderwerk, reparaties of een nieuwe vloer. Geef het tijdig door, dan plannen we het werk in die periode.",
        en: "Between two tenants there is often little time for painting, repairs or a new floor. Let us know in good time and we will schedule the work in that window.",
        uk: "Між двома орендарями часто дуже мало часу на фарбування, ремонт чи нову підлогу. Повідомте нас заздалегідь, і ми заплануємо роботи саме на цей період.",
        ru: "Между двумя арендаторами часто очень мало времени на покраску, ремонт или новый пол. Сообщите нам заранее, и мы запланируем работы именно на этот период.",
      },
      outside: {
        nl: "Verhuurt u meerdere panden? Buitenschilderwerk en kleine reparaties kunnen we combineren in één onderhoudsplanning.",
        en: "Do you rent out several properties? We can combine exterior painting and small repairs in a single maintenance schedule.",
        uk: "Здаєте кілька об'єктів? Зовнішнє фарбування й дрібний ремонт можна поєднати в одному графіку обслуговування.",
        ru: "Сдаёте несколько объектов? Наружную покраску и мелкий ремонт можно объединить в одном графике обслуживания.",
      },
    },
  },
  coast: {
    title: { nl: "Zeeklimaat", en: "Coastal climate", uk: "Морський клімат", ru: "Морской климат" },
    text: {
      nl: "Dicht bij de kust zorgen zout, zand en wind ervoor dat gevels, kozijnen en metalen onderdelen sneller verweren.",
      en: "Close to the coast, salt, sand and wind make facades, window frames and metal parts weather faster.",
      uk: "Біля узбережжя сіль, пісок і вітер пришвидшують зношення фасадів, віконних рам і металевих деталей.",
      ru: "У побережья соль, песок и ветер ускоряют износ фасадов, оконных рам и металлических деталей.",
    },
    tips: {
      outside: {
        nl: "Door zout en wind slijt buitenschilderwerk sneller. Een goede voorbehandeling, de juiste verf en tijdig bijwerken verlengen de levensduur van kozijnen en gevels.",
        en: "Salt and wind wear down exterior paintwork faster. Good preparation, the right paint and timely touch-ups extend the life of frames and facades.",
        uk: "Через сіль і вітер зовнішнє фарбування зношується швидше. Якісна підготовка, правильна фарба й вчасне підфарбовування подовжують життя рам і фасадів.",
        ru: "Из-за соли и ветра наружная покраска изнашивается быстрее. Качественная подготовка, правильная краска и своевременная подкраска продлевают жизнь рам и фасадов.",
      },
    },
  },
  woodenHouses: {
    title: {
      nl: "Houten Zaanse huizen",
      en: "Wooden Zaan houses",
      uk: "Дерев'яні будинки регіону Заан",
      ru: "Деревянные дома региона Заан",
    },
    text: {
      nl: "In de Zaanstreek staan veel karakteristieke houten huizen, vaak groen geschilderd met witte accenten. Hout vraagt om regelmatig en vakkundig onderhoud.",
      en: "The Zaan region has many characteristic wooden houses, often painted green with white accents. Timber needs regular, skilled maintenance.",
      uk: "У регіоні Заан багато характерних дерев'яних будинків, часто зелених з білими акцентами. Дерево потребує регулярного й фахового догляду.",
      ru: "В регионе Заан много характерных деревянных домов, часто зелёных с белыми акцентами. Дерево требует регулярного и профессионального ухода.",
    },
    tips: {
      wet: {
        nl: "Een badkamer in een houten huis vraagt een extra zorgvuldige waterdichte afwerking, zodat vocht het hout niet kan aantasten.",
        en: "A bathroom in a wooden house needs especially careful waterproofing so moisture cannot damage the timber.",
        uk: "Ванна кімната в дерев'яному будинку потребує особливо ретельної гідроізоляції, щоб волога не пошкодила дерево.",
        ru: "Ванная в деревянном доме требует особенно тщательной гидроизоляции, чтобы влага не повредила дерево.",
      },
      build: {
        nl: "Houten huizen werken meer dan stenen huizen. Bij nieuwe wanden, tegelwerk of een vloer houden we rekening met die beweging.",
        en: "Wooden houses move more than brick ones. We allow for that movement with new walls, tiling or flooring.",
        uk: "Дерев'яні будинки «грають» більше, ніж цегляні. Ми враховуємо цей рух під час монтажу стін, плитки чи підлоги.",
        ru: "Деревянные дома «играют» больше, чем кирпичные. Мы учитываем это движение при монтаже стен, плитки или пола.",
      },
      outside: {
        nl: "Houten gevels en kozijnen vragen elke paar jaar aandacht. Houtrot herstellen we eerst; daarna volgt het schilderwerk, in kleuren die bij de straat passen.",
        en: "Wooden facades and frames need attention every few years. We repair wood rot first, then paint in colours that suit the street.",
        uk: "Дерев'яні фасади й рами потребують уваги кожні кілька років. Спершу ми усуваємо гниль, потім фарбуємо в кольори, що пасують вулиці.",
        ru: "Деревянные фасады и рамы требуют внимания каждые несколько лет. Сначала мы устраняем гниль, затем красим в цвета, подходящие улице.",
      },
    },
  },
  industrial: {
    title: {
      nl: "Arbeiderswoningen en industrieel erfgoed",
      en: "Workers' housing and industrial heritage",
      uk: "Робітничі будинки та промислова спадщина",
      ru: "Рабочие дома и промышленное наследие",
    },
    text: {
      nl: "Rond de oude fabrieken staan rijen compacte arbeiderswoningen, en voormalige fabrieksgebouwen zijn omgebouwd tot woningen en bedrijfsruimtes.",
      en: "Around the old factories are rows of compact workers' houses, and former factory buildings have been converted into homes and business premises.",
      uk: "Навколо старих фабрик тягнуться ряди компактних робітничих будинків, а колишні фабричні корпуси перетворено на житло й офіси.",
      ru: "Вокруг старых фабрик тянутся ряды компактных рабочих домов, а бывшие фабричные корпуса превращены в жильё и офисы.",
    },
    tips: {
      wet: {
        nl: "Arbeiderswoningen zijn vaak smal en diep. Een compacte badkamer op de verdieping of onder het dak is met een goede indeling prima mogelijk.",
        en: "Workers' houses are often narrow and deep. A compact bathroom upstairs or under the roof works well with a good layout.",
        uk: "Робітничі будинки часто вузькі та глибокі. Компактна ванна на поверсі чи під дахом цілком можлива за правильного планування.",
        ru: "Рабочие дома часто узкие и глубокие. Компактная ванная на этаже или под крышей вполне возможна при правильной планировке.",
      },
      build: {
        nl: "Een kleine woning voelt groter met een slimme indeling: een open keuken, ingebouwde kasten of meer daglicht. We denken mee over wat binnen de constructie kan.",
        en: "A small home feels bigger with a smart layout: an open kitchen, built-in storage or more daylight. We help work out what the structure allows.",
        uk: "Маленьке житло здається більшим завдяки розумному плануванню: відкрита кухня, вбудовані шафи чи більше денного світла. Ми підкажемо, що дозволяє конструкція.",
        ru: "Маленькое жильё кажется больше благодаря умной планировке: открытая кухня, встроенные шкафы или больше дневного света. Мы подскажем, что позволяет конструкция.",
      },
      outside: {
        nl: "Bij rijen gelijke arbeiderswoningen hoort vaak een vast gevelbeeld. Bij nieuwe kozijnen of schilderwerk kijken we of er regels voor kleur en materiaal gelden.",
        en: "Rows of identical workers' houses often have a fixed street elevation. With new frames or paintwork we check whether rules apply to colour and materials.",
        uk: "Ряди однакових робітничих будинків часто мають єдиний вигляд фасаду. Для нових рам чи фарбування ми перевіряємо, чи діють правила щодо кольору та матеріалів.",
        ru: "Ряды одинаковых рабочих домов часто имеют единый облик фасада. Для новых рам или покраски мы проверяем, действуют ли правила по цвету и материалам.",
      },
    },
  },
  newTown: {
    title: {
      nl: "Jonge stad, in korte tijd gebouwd",
      en: "A young town, built in a short time",
      uk: "Молоде місто, збудоване за короткий час",
      ru: "Молодой город, построенный за короткое время",
    },
    text: {
      nl: "Hele wijken zijn binnen een paar jaar gebouwd. Daardoor is onderhoud in veel straten tegelijk aan de beurt: kozijnen, badkamers, keukens en isolatie.",
      en: "Entire neighbourhoods were built within a few years. As a result, maintenance is due in many streets at the same time: frames, bathrooms, kitchens and insulation.",
      uk: "Цілі квартали збудовано за кілька років. Тому на багатьох вулицях обслуговування потрібне одночасно: рами, ванні, кухні та утеплення.",
      ru: "Целые кварталы построены за несколько лет. Поэтому на многих улицах обслуживание требуется одновременно: рамы, ванные, кухни и утепление.",
    },
    tips: {
      wet: {
        nl: "Een badkamer of keuken van zo'n dertig jaar oud is meestal aan vervanging toe. Een goed moment om ook leidingen, afvoeren en ventilatie te vernieuwen.",
        en: "A bathroom or kitchen around thirty years old is usually due for replacement. A good moment to renew pipes, drains and ventilation too.",
        uk: "Ванна чи кухня, якій близько тридцяти років, зазвичай потребує заміни. Слушний момент оновити й труби, каналізацію та вентиляцію.",
        ru: "Ванная или кухня, которой около тридцати лет, обычно требует замены. Подходящий момент обновить и трубы, канализацию и вентиляцию.",
      },
      build: {
        nl: "Combineer klussen die toch tegelijk aan de beurt zijn, zoals binnendeuren, plafonds en vloeren, in één planning. Dat scheelt opbouwtijd en overlast.",
        en: "Combine jobs that are due at the same time anyway, such as interior doors, ceilings and floors, in one schedule. That saves set-up time and disruption.",
        uk: "Поєднайте роботи, які все одно назріли одночасно, — міжкімнатні двері, стелі, підлоги — в одному графіку. Це заощадить час на підготовку й зменшить незручності.",
        ru: "Объедините работы, которые всё равно назрели одновременно, — межкомнатные двери, потолки, полы — в одном графике. Это сэкономит время на подготовку и уменьшит неудобства.",
      },
      outside: {
        nl: "Houten kozijnen en boeidelen uit de jaren 80 en 90 zijn vaak toe aan een grote onderhoudsbeurt of aan vervanging door hardhout of kunststof.",
        en: "Wooden frames and fascias from the 1980s and 90s are often due for major maintenance or replacement with hardwood or uPVC.",
        uk: "Дерев'яні рами й лобові дошки 1980–90-х часто потребують капітального обслуговування або заміни на тверді породи дерева чи ПВХ.",
        ru: "Деревянные рамы и лобовые доски 1980–90-х часто требуют капитального обслуживания или замены на твёрдые породы дерева или ПВХ.",
      },
    },
  },
  villas: {
    title: {
      nl: "Villawijken en vrijstaande huizen",
      en: "Villa districts and detached houses",
      uk: "Віллові квартали та окремі будинки",
      ru: "Районы вилл и отдельные дома",
    },
    text: {
      nl: "In de villawijken staan ruime vrijstaande huizen en twee-onder-een-kappers, vaak uit het begin van de twintigste eeuw en soms binnen een beschermd dorps- of stadsgezicht.",
      en: "The villa districts have spacious detached and semi-detached houses, often from the early twentieth century and sometimes within a protected conservation area.",
      uk: "У віллових кварталах стоять просторі окремі будинки та дуплекси, часто початку XX століття, іноді — в межах захищеного історичного ландшафту.",
      ru: "В районах вилл стоят просторные отдельные дома и дуплексы, часто начала XX века, иногда — в границах охраняемого исторического ландшафта.",
    },
    tips: {
      wet: {
        nl: "Een tweede badkamer of een badkamer bij de slaapkamer? Waar de afvoer naartoe kan, bepaalt veel van de mogelijkheden. Dat bekijken we tijdens de opname.",
        en: "A second bathroom or an en-suite? Where the drain can go determines much of what is possible. We look at that during the site visit.",
        uk: "Друга ванна чи ванна біля спальні? Багато що залежить від того, куди можна вивести каналізацію. Це ми оцінюємо під час огляду.",
        ru: "Вторая ванная или ванная при спальне? Многое зависит от того, куда можно вывести канализацию. Это мы оцениваем во время осмотра.",
      },
      build: {
        nl: "Een grote verbouwing in een vrijstaand huis kan in fases, zodat u zoveel mogelijk in huis kunt blijven wonen. Die volgorde spreken we vooraf met u af.",
        en: "A large renovation in a detached house can be done in phases so you can stay in your home as much as possible. We agree the sequence with you in advance.",
        uk: "Великий ремонт в окремому будинку можна робити поетапно, щоб ви якомога довше могли жити вдома. Порядок робіт ми погоджуємо заздалегідь.",
        ru: "Большой ремонт в отдельном доме можно делать поэтапно, чтобы вы как можно дольше могли жить дома. Порядок работ мы согласуем заранее.",
      },
      outside: {
        nl: "Houten gevels, luiken en grote kozijnen vragen regelmatig onderhoud. In een beschermd dorpsgezicht zijn wijzigingen aan de voorkant vaak vergunningplichtig.",
        en: "Wooden facades, shutters and large window frames need regular maintenance. In a protected conservation area, changes to the front often require a permit.",
        uk: "Дерев'яні фасади, віконниці й великі рами потребують регулярного догляду. У захищеному історичному ландшафті зміни фасаду часто потребують дозволу.",
        ru: "Деревянные фасады, ставни и большие рамы требуют регулярного ухода. В охраняемом историческом ландшафте изменения фасада часто требуют разрешения.",
      },
    },
  },
  gasExtraction: {
    title: {
      nl: "Schade door gaswinning",
      en: "Damage from gas extraction",
      uk: "Пошкодження через видобуток газу",
      ru: "Повреждения из-за добычи газа",
    },
    text: {
      nl: "In de provincie Groningen kunnen woningen schade oplopen door bodembeweging als gevolg van gaswinning. Melden en beoordelen van die schade loopt via het Instituut Mijnbouwschade Groningen (IMG).",
      en: "In the province of Groningen, homes can be damaged by ground movement caused by gas extraction. Reporting and assessing that damage goes through the Instituut Mijnbouwschade Groningen (IMG).",
      uk: "У провінції Гронінген будинки можуть зазнавати пошкоджень через рух ґрунту внаслідок видобутку газу. Заявки на такі пошкодження та їх оцінку розглядає Instituut Mijnbouwschade Groningen (IMG).",
      ru: "В провинции Гронинген дома могут получать повреждения из-за движения грунта вследствие добычи газа. Заявки на такие повреждения и их оценку рассматривает Instituut Mijnbouwschade Groningen (IMG).",
    },
    tips: {
      build: {
        nl: "Vermoedt u schade door gaswinning? Meld die eerst bij het IMG. Zelf beoordelen we geen mijnbouwschade, maar herstelwerk na hun besluit bespreken we graag.",
        en: "Suspect damage from gas extraction? Report it to the IMG first. We do not assess mining damage ourselves, but we are happy to discuss repairs after their decision.",
        uk: "Підозрюєте пошкодження через видобуток газу? Спершу повідомте IMG. Ми самі таких пошкоджень не оцінюємо, але охоче обговоримо ремонт після їхнього рішення.",
        ru: "Подозреваете повреждения из-за добычи газа? Сначала сообщите в IMG. Сами мы такие повреждения не оцениваем, но охотно обсудим ремонт после их решения.",
      },
      outside: {
        nl: "Scheuren in het metselwerk? Laat eerst vaststellen wat de oorzaak is, bij een vermoeden van mijnbouwschade via het IMG, voordat er wordt gevoegd of geschilderd.",
        en: "Cracks in the brickwork? Have the cause established first, through the IMG if mining damage is suspected, before repointing or painting.",
        uk: "Тріщини в кладці? Спершу з'ясуйте причину — за підозри на шкоду від видобутку через IMG, — і лише потім розшивайте шви чи фарбуйте.",
        ru: "Трещины в кладке? Сначала выясните причину — при подозрении на ущерб от добычи через IMG, — и только потом расшивайте швы или красьте.",
      },
    },
  },
}
