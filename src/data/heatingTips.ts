import type { Localized } from "../i18n/LangContext"
import type { TraitId } from "./localTraits"

/** Heating-specific context instead of reusing bathroom advice on heating pages. */
export const HEATING_TIPS: Partial<Record<TraitId, Localized<string>>> = {
  monuments: {
    nl: "Bij een monument of beschermd stadsgezicht kunnen de plaats van een buitenunit en zichtbare leidingen aan regels gebonden zijn. Controleer dat voordat de installatie wordt ontworpen.",
    en: "For listed buildings and conservation areas, outdoor units and visible pipework may be subject to restrictions. Check this before designing the installation.",
    uk: "Для пам'яток і захищених історичних районів розташування зовнішнього блока та видимих труб може мати обмеження. Це потрібно перевірити до планування системи.",
    ru: "Для памятников и охраняемых исторических районов расположение наружного блока и видимых труб может иметь ограничения. Это нужно проверить до планирования системы.",
  },
  prewar: {
    nl: "Bij oudere woningen bepalen isolatie, kieren en de bestaande radiatoren of verwarmen op lage temperatuur haalbaar is. Laat de warmtevraag en vloeropbouw eerst beoordelen.",
    en: "In older homes, insulation, draughts and existing radiators influence whether low-temperature heating is suitable. Assess heat demand and floor construction first.",
    uk: "У старішому житлі утеплення, протяги та наявні радіатори впливають на можливість низькотемпературного опалення. Спершу оцініть потребу в теплі й конструкцію підлоги.",
    ru: "В старом жилье утепление, сквозняки и имеющиеся радиаторы влияют на возможность низкотемпературного отопления. Сначала оцените потребность в тепле и конструкцию пола.",
  },
  postwar: {
    nl: "In naoorlogse woningen is het zinvol eerst de staat van leidingen, radiatoren en isolatie te controleren. Niet elke bestaande installatie past zonder aanpassing bij een warmtepomp.",
    en: "In post-war homes, check pipes, radiators and insulation first. Not every existing installation is suitable for a heat pump without modification.",
    uk: "У повоєнному житлі варто спершу перевірити труби, радіатори й утеплення. Не кожна наявна система підходить до теплового насоса без змін.",
    ru: "В послевоенном жилье стоит сначала проверить трубы, радиаторы и утепление. Не каждая имеющаяся система подходит к тепловому насосу без изменений.",
  },
  seventies: {
    nl: "Bij woningen uit de jaren zeventig en tachtig verschillen de isolatie en latere verbouwingen sterk. Stem capaciteit, regeling en doorstroming af op de huidige woning, niet alleen op het bouwjaar.",
    en: "Insulation and later alterations vary widely in homes from the 1970s and 1980s. Match capacity, controls and flow to the current home, not just its construction year.",
    uk: "У житлі 1970–1980-х утеплення й пізніші перебудови можуть суттєво відрізнятися. Потужність, керування та циркуляцію слід підбирати під фактичний стан житла.",
    ru: "В жилье 1970–1980-х утепление и последующие перестройки могут существенно различаться. Мощность, управление и циркуляцию следует подбирать под фактическое состояние жилья.",
  },
  newbuild: {
    nl: "Bij een recente woning moeten aanpassingen aansluiten op de bestaande lage-temperatuurinstallatie, ventilatie en regeling. Controleer ook de documentatie en garantievoorwaarden van de installatie.",
    en: "In a recent home, changes should suit the existing low-temperature heating, ventilation and controls. Check the installation documentation and warranty conditions too.",
    uk: "У новішому житлі зміни слід узгоджувати з наявним низькотемпературним опаленням, вентиляцією й керуванням. Перевірте також документацію та гарантійні умови обладнання.",
    ru: "В новом жилье изменения следует согласовывать с имеющимся низкотемпературным отоплением, вентиляцией и управлением. Проверьте также документацию и гарантийные условия оборудования.",
  },
  apartments: {
    nl: "In een appartement kunnen gemeenschappelijke leidingen, geluidseisen en afspraken met de VvE de mogelijkheden beperken. Stem een buitenunit, vloerverwarming of wijziging van de verwarming vooraf af.",
    en: "In apartments, shared pipework, noise requirements and owners' association rules can limit the options. Agree outdoor units, underfloor heating and heating changes beforehand.",
    uk: "У квартирі можливості можуть обмежувати спільні трубопроводи, вимоги до шуму та правила об'єднання власників. Зовнішній блок, теплу підлогу й зміни опалення узгоджуйте заздалегідь.",
    ru: "В квартире возможности могут ограничивать общие трубопроводы, требования к шуму и правила объединения собственников. Наружный блок, тёплый пол и изменения отопления согласуйте заранее.",
  },
  woodenPiles: {
    nl: "Bij oudere panden met kwetsbare funderingen vraagt extra vloergewicht aandacht. Laat beoordelen of een nieuwe dekvloer of vloerverwarmingsopbouw constructief geschikt is.",
    en: "For older buildings with vulnerable foundations, added floor weight needs attention. Have the structural suitability of new screed or underfloor heating assessed.",
    uk: "У старіших будівлях із вразливими фундаментами додаткова вага підлоги потребує уваги. Придатність нової стяжки чи системи теплої підлоги має оцінити фахівець.",
    ru: "В старых зданиях с уязвимыми фундаментами дополнительный вес пола требует внимания. Пригодность новой стяжки или системы тёплого пола должен оценить специалист.",
  },
  busyCentre: {
    nl: "In een drukke binnenstad tellen bereikbaarheid, de plaats voor een buitenunit en geluid naar buren extra mee. Bespreek deze randvoorwaarden vóór de keuze van een installatie.",
    en: "In a busy city centre, access, outdoor-unit space and noise towards neighbours need extra attention. Discuss these constraints before selecting a system.",
    uk: "У жвавому центрі міста особливо важливі доступ, місце для зовнішнього блока й шум для сусідів. Обговоріть ці умови до вибору системи.",
    ru: "В оживлённом центре города особенно важны доступ, место для наружного блока и шум для соседей. Обсудите эти условия до выбора системы.",
  },
  students: {
    nl: "Bij meerdere bewoners of verhuurde kamers verdienen afzonderlijke temperatuurregeling en toegang voor onderhoud aandacht. Stem wijzigingen ook af met de eigenaar of beheerder.",
    en: "For shared homes or rented rooms, consider separate temperature controls and maintenance access. Agree changes with the owner or manager too.",
    uk: "У спільному чи орендованому житлі важливі окреме регулювання температури та доступ для сервісу. Зміни також потрібно погодити з власником або керуючим.",
    ru: "В общем или арендном жилье важны отдельное регулирование температуры и доступ для сервиса. Изменения также нужно согласовать с владельцем или управляющим.",
  },
  coast: {
    nl: "Aan de kust verdienen wind, zout en de opstelling van een buitenunit aandacht. Volg de plaatsings- en onderhoudsvoorschriften van de fabrikant en houd rekening met geluid.",
    en: "Near the coast, wind, salt and outdoor-unit placement need attention. Follow the manufacturer's siting and maintenance requirements and consider noise.",
    uk: "На узбережжі слід враховувати вітер, сіль і розташування зовнішнього блока. Дотримуйтеся вимог виробника до монтажу та обслуговування, зважаючи на шум.",
    ru: "На побережье следует учитывать ветер, соль и расположение наружного блока. Соблюдайте требования производителя к монтажу и обслуживанию, учитывая шум.",
  },
  woodenHouses: {
    nl: "Bij houten vloeren past niet elke natte dekvloer. Laat draagkracht, vochtbelasting en de beschikbare opbouwhoogte beoordelen voordat een vloerverwarmingssysteem wordt gekozen.",
    en: "Not every wet screed suits a timber floor. Assess load capacity, moisture and available floor height before choosing underfloor heating.",
    uk: "Не кожна мокра стяжка підходить до дерев'яної підлоги. До вибору теплої підлоги оцініть несучу здатність, вологісне навантаження та доступну висоту.",
    ru: "Не каждая мокрая стяжка подходит к деревянному полу. До выбора тёплого пола оцените несущую способность, влажностную нагрузку и доступную высоту.",
  },
  industrial: {
    nl: "In een herbestemd pand kunnen hoge ruimtes en een bijzondere vloeropbouw de warmtevraag beïnvloeden. Laat de huidige indeling en isolatie meenemen in de beoordeling.",
    en: "In converted buildings, high ceilings and unusual floor construction can affect heating demand. Include the current layout and insulation in the assessment.",
    uk: "У переобладнаній будівлі високі стелі й нестандартна підлога можуть впливати на потребу в теплі. Оцінка має враховувати фактичне планування й утеплення.",
    ru: "В переоборудованном здании высокие потолки и нестандартный пол могут влиять на потребность в тепле. Оценка должна учитывать фактическую планировку и утепление.",
  },
  newTown: {
    nl: "Controleer bij een bestaande woning welke warmtebron en aansluitvoorwaarden al gelden. Stem nieuwe radiatoren, vloerverwarming en regeling daarop af voordat onderdelen worden vervangen.",
    en: "Check the existing heat source and connection conditions. Match new radiators, underfloor heating and controls to them before replacing components.",
    uk: "Перевірте наявне джерело тепла та умови підключення. Нові радіатори, теплу підлогу й керування потрібно узгодити з ними до заміни компонентів.",
    ru: "Проверьте имеющийся источник тепла и условия подключения. Новые радиаторы, тёплый пол и управление нужно согласовать с ними до замены компонентов.",
  },
  villas: {
    nl: "Bij een grotere woning kan de warmtevraag per ruimte sterk verschillen. Bekijk isolatie, leidinglengtes en regeling per zone voordat de capaciteit wordt bepaald.",
    en: "In larger homes, heating demand can vary substantially between rooms. Review insulation, pipe runs and zone controls before determining capacity.",
    uk: "У більшому будинку потреба в теплі може суттєво різнитися між кімнатами. До визначення потужності оцініть утеплення, довжину труб і зональне керування.",
    ru: "В большом доме потребность в тепле может существенно различаться между комнатами. До определения мощности оцените утепление, длину труб и зональное управление.",
  },
  gasExtraction: {
    nl: "Bij mogelijke schade door bodembeweging moet eerst duidelijk zijn wat constructief veilig is. Plan nieuwe leidingen en vloerverwarming pas na de benodigde beoordeling van vloer en gebouw.",
    en: "Where ground movement may have caused damage, establish structural safety first. Plan new pipework and underfloor heating after the necessary floor and building assessment.",
    uk: "За можливої шкоди від руху ґрунту спершу слід з'ясувати безпечність конструкцій. Нові труби й теплу підлогу планують після потрібної оцінки підлоги та будівлі.",
    ru: "При возможном ущербе от движения грунта сначала следует выяснить безопасность конструкций. Новые трубы и тёплый пол планируют после необходимой оценки пола и здания.",
  },
}