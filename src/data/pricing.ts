import type { Localized } from "../i18n/LangContext"

/**
 * "Vanaf"-prices shown on service cards when CLAIMS.pricing is enabled.
 *
 * Empty on purpose: the prototype's rates were placeholders. Fill in only
 * rates Bouwvast actually charges, stating whether they include VAT, e.g.
 *   afbouw: { nl: "Vanaf €45/m² incl. btw", en: "From €45/m² incl. VAT" },
 * The cost estimator's ranges (components/home/CostEstimator.tsx) must be
 * checked against the same price list before enabling the claim.
 */
export const SERVICE_PRICES: Record<string, Localized<string>> = {}
