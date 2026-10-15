import type { Localized } from "../i18n/LangContext"

/**
 * Before/after pairs for the comparison slider.
 *
 * These are illustrations, not Huisklusdienst projects, so the slider labels them
 * "Impressie" and they carry no town, client or date. As soon as real
 * projects with a `beforeImage` exist in data/projects.ts (and
 * CLAIMS.projects is on) the slider shows those instead.
 */
export interface Comparison {
  id: string
  title: Localized<string>
  description: Localized<string>
  /** Short list of the work visible in the pair. */
  scope: Localized<string[]>
  before: string
  after: string
  beforeAlt: Localized<string>
  afterAlt: Localized<string>
  width: number
  height: number
  serviceSlug: string
  /** Town of a real project; impressions have none. */
  city?: string
  impression: boolean
}

export const IMPRESSIONS: Comparison[] = [
  {
    id: "keuken",
    title: { nl: "Keukenrenovatie", en: "Kitchen renovation", uk: "Ремонт кухні", ru: "Ремонт кухни" },
    description: {
      nl: "Van gedateerde eikenhouten kasten naar een moderne keuken met mat-antraciet fronten, inductie en een visgraatvloer.",
      en: "From dated oak cabinets to a modern kitchen with matt anthracite fronts, induction hob and a herringbone floor.",
      uk: "Від застарілих дубових шаф до сучасної кухні з матовими антрацитовими фасадами, індукцією та підлогою ялинкою.",
      ru: "От устаревших дубовых шкафов к современной кухне с матовыми антрацитовыми фасадами, индукцией и полом ёлочкой.",
    },
    scope: {
      nl: ["Nieuwe keukenkasten", "Leidingwerk & elektra", "Visgraatvloer"],
      en: ["New kitchen units", "Plumbing & wiring", "Herringbone floor"],
      uk: ["Нові кухонні шафи", "Сантехніка й електрика", "Підлога ялинкою"],
      ru: ["Новые кухонные шкафы", "Сантехника и электрика", "Пол ёлочкой"],
    },
    before: "/images/kitchen-before.webp",
    after: "/images/kitchen-after.webp",
    beforeAlt: {
      nl: "Keuken vóór de renovatie, met eikenhouten kasten en een witte tegelwand",
      en: "Kitchen before the renovation, with oak cabinets and a white tiled wall",
      uk: "Кухня до ремонту: дубові шафи та біла плитка",
      ru: "Кухня до ремонта: дубовые шкафы и белая плитка",
    },
    afterAlt: {
      nl: "Dezelfde keuken na de renovatie, met antraciet kasten en een visgraatvloer",
      en: "The same kitchen after the renovation, with anthracite units and a herringbone floor",
      uk: "Та сама кухня після ремонту: антрацитові шафи та підлога ялинкою",
      ru: "Та же кухня после ремонта: антрацитовые шкафы и пол ёлочкой",
    },
    width: 1376,
    height: 768,
    serviceSlug: "badkamer-keuken",
    impression: true,
  },
  {
    id: "woonkamer",
    title: {
      nl: "Woningrenovatie & stucwerk",
      en: "Home renovation & plastering",
      uk: "Ремонт житла та штукатурка",
      ru: "Ремонт дома и штукатурка",
    },
    description: {
      nl: "Ruwe wanden strak sausklaar gestuct, nieuwe elektra en een eiken visgraatvloer door de hele ruimte.",
      en: "Bare walls plastered smooth and paint-ready, new wiring and an oak herringbone floor throughout.",
      uk: "Необроблені стіни вирівняні під фарбування, нова електрика та дубова підлога ялинкою по всьому приміщенню.",
      ru: "Голые стены выровнены под покраску, новая электрика и дубовый пол ёлочкой по всему помещению.",
    },
    scope: {
      nl: ["Wanden sausklaar gestuct", "Nieuwe elektra", "Eiken visgraatvloer"],
      en: ["Walls plastered paint-ready", "New wiring", "Oak herringbone floor"],
      uk: ["Стіни під фарбування", "Нова електрика", "Дубова підлога ялинкою"],
      ru: ["Стены под покраску", "Новая электрика", "Дубовый пол ёлочкой"],
    },
    before: "/images/living-before.webp",
    after: "/images/living-after.webp",
    beforeAlt: {
      nl: "Woonkamer tijdens de verbouwing, met kale muren en open vloer",
      en: "Living room during the renovation, with bare walls and an open floor",
      uk: "Вітальня під час ремонту: голі стіни та відкрита підлога",
      ru: "Гостиная во время ремонта: голые стены и вскрытый пол",
    },
    afterAlt: {
      nl: "Dezelfde woonkamer na de renovatie, met strakke wanden en een eiken visgraatvloer",
      en: "The same living room after the renovation, with smooth walls and an oak herringbone floor",
      uk: "Та сама вітальня після ремонту: рівні стіни та дубова підлога ялинкою",
      ru: "Та же гостиная после ремонта: ровные стены и дубовый пол ёлочкой",
    },
    width: 1376,
    height: 768,
    serviceSlug: "renovatie",
    impression: true,
  },
  {
    id: "badkamer",
    title: { nl: "Badkamerrenovatie", en: "Bathroom renovation", uk: "Ремонт ванної кімнати", ru: "Ремонт ванной комнаты" },
    description: {
      nl: "Van gedateerd tegelwerk naar een inloopdouche met grootformaat betonlook tegels en een eiken badmeubel.",
      en: "From dated tiling to a walk-in shower with large-format concrete-look tiles and an oak vanity unit.",
      uk: "Від застарілої плитки до душової без піддону з великоформатною плиткою під бетон і дубовою тумбою.",
      ru: "От устаревшей плитки к душу без поддона с крупноформатной плиткой под бетон и дубовой тумбой.",
    },
    scope: {
      nl: ["Inloopdouche", "Grootformaat tegels", "Nieuw sanitair"],
      en: ["Walk-in shower", "Large-format tiles", "New sanitary ware"],
      uk: ["Душова без піддону", "Великоформатна плитка", "Нова сантехніка"],
      ru: ["Душ без поддона", "Крупноформатная плитка", "Новая сантехника"],
    },
    before: "/images/bath-before.webp",
    after: "/images/bath-after.webp",
    beforeAlt: {
      nl: "Badkamer vóór de renovatie, met witte wandtegels en een douchegordijn",
      en: "Bathroom before the renovation, with white wall tiles and a shower curtain",
      uk: "Ванна кімната до ремонту: біла плитка та шторка для душу",
      ru: "Ванная до ремонта: белая плитка и шторка для душа",
    },
    afterAlt: {
      nl: "Dezelfde badkamer na de renovatie, met inloopdouche en grootformaat tegels",
      en: "The same bathroom after the renovation, with a walk-in shower and large-format tiles",
      uk: "Та сама ванна кімната після ремонту: душова без піддону та великоформатна плитка",
      ru: "Та же ванная после ремонта: душ без поддона и крупноформатная плитка",
    },
    width: 1376,
    height: 768,
    serviceSlug: "badkamer-keuken",
    impression: true,
  },
]
