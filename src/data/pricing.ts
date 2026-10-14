import type { Localized } from "../i18n/LangContext"
import type { TranslationKey } from "../i18n/translations"

/**
 * "Vanaf"-prices shown on service cards when CLAIMS.pricing is enabled.
 *
 * Empty on purpose: the prototype's rates were placeholders. Fill in only
 * rates Bouwvast actually charges, stating whether they include VAT, e.g.
 *   afbouw: { nl: "Vanaf €45/m² incl. btw", en: "From €45/m² incl. VAT" },
 */
export const SERVICE_PRICES: Record<string, Localized<string>> = {}

export type EstimatorServiceId = "stucwerk" | "schilderwerk" | "badkamer" | "renovatie"
export type EstimatorTier = "standard" | "premium" | "luxury"

export interface EstimatorService {
  id: EstimatorServiceId
  /** The matching page under /diensten/, where the calculator is preselected. */
  serviceSlug: string
  nameKey: TranslationKey
  hint: Localized<string>
  icon: string
  defaultQty: number
  minQty: number
  maxQty: number
  step: number
  /** € per m² incl. btw for the premium tier, without extras. */
  rateMin: number
  rateMax: number
}

const ESTIMATOR_SERVICES: EstimatorService[] = [
  {
    id: "stucwerk",
    serviceSlug: "afbouw",
    nameKey: "svc_finishing",
    hint: {
      nl: "Wanden en plafonds, sausklaar of behangklaar",
      en: "Walls and ceilings, paint- or wallpaper-ready",
      uk: "Стіни й стелі під фарбування або шпалери",
      ru: "Стены и потолки под покраску или обои",
    },
    icon: "finishing",
    defaultQty: 60,
    minQty: 15,
    maxQty: 250,
    step: 5,
    rateMin: 28,
    rateMax: 42,
  },
  {
    id: "schilderwerk",
    serviceSlug: "schilderwerk",
    nameKey: "svc_painting",
    hint: {
      nl: "Wanden, plafonds, kozijnen en deuren",
      en: "Walls, ceilings, frames and doors",
      uk: "Стіни, стелі, рами та двері",
      ru: "Стены, потолки, рамы и двери",
    },
    icon: "painting",
    defaultQty: 80,
    minQty: 20,
    maxQty: 300,
    step: 10,
    rateMin: 22,
    rateMax: 35,
  },
  {
    id: "badkamer",
    serviceSlug: "badkamer-keuken",
    nameKey: "svc_bathroom",
    hint: {
      nl: "Complete badkamer of keuken, met leidingwerk",
      en: "Complete bathroom or kitchen, with pipework",
      uk: "Ванна або кухня під ключ, із сантехнікою",
      ru: "Ванная или кухня под ключ, с сантехникой",
    },
    icon: "bathroom",
    defaultQty: 7,
    minQty: 3,
    maxQty: 25,
    step: 1,
    rateMin: 950,
    rateMax: 1600,
  },
  {
    id: "renovatie",
    serviceSlug: "renovatie",
    nameKey: "svc_renovation",
    hint: {
      nl: "Hele woning, verdieping of ruimte",
      en: "Whole home, floor or room",
      uk: "Усе житло, поверх або приміщення",
      ru: "Весь дом, этаж или помещение",
    },
    icon: "renovation",
    defaultQty: 50,
    minQty: 20,
    maxQty: 200,
    step: 5,
    rateMin: 180,
    rateMax: 340,
  },
]

/**
 * Everything behind "Bereken direct uw richtprijs".
 *
 * The rates were carried over from the original site and have NOT been
 * checked against Bouwvast's own price list yet. The calculator always
 * presents its result as an indication incl. btw ("geen offerte"), but check
 * the numbers and then set `ratesChecked: true`: until then every build
 * prints a reminder and `npm run check:launch` refuses a launch.
 */
export const ESTIMATOR = {
  ratesChecked: false,
  unit: "m²",
  tiers: { standard: 0.88, premium: 1, luxury: 1.25 } satisfies Record<EstimatorTier, number>,
  /** Multipliers for the optional extras. */
  demolition: 1.15,
  materials: 1.18,
  /** Results are rounded to this many euros. */
  roundTo: 50,
  services: ESTIMATOR_SERVICES,
}

export interface EstimateInput {
  service: EstimatorService
  qty: number
  tier: EstimatorTier
  demolition: boolean
  materials: boolean
}

/** Price range in whole euros, rounded to ESTIMATOR.roundTo. */
export function estimateRange({ service, qty, tier, demolition, materials }: EstimateInput) {
  const factor =
    ESTIMATOR.tiers[tier] * (demolition ? ESTIMATOR.demolition : 1) * (materials ? ESTIMATOR.materials : 1)
  const round = (n: number) => Math.max(ESTIMATOR.roundTo, Math.round(n / ESTIMATOR.roundTo) * ESTIMATOR.roundTo)
  return { min: round(service.rateMin * qty * factor), max: round(service.rateMax * qty * factor) }
}

export function estimatorServiceFor(serviceSlug: string): EstimatorService | undefined {
  return ESTIMATOR.services.find((s) => s.serviceSlug === serviceSlug)
}
