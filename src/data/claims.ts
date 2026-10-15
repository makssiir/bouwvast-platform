/**
 * Marketing claims that need evidence before they may be shown.
 *
 * Each switch hides a whole section or sentence until the owner can back it
 * up (review platform link, certificate, signed photo permission, price list,
 * warranty terms…). Flip a switch to `true` only together with a `source`.
 * Unsupported claims are a legal risk (oneerlijke handelspraktijken), not a
 * copy problem.
 */
export interface Claim {
  enabled: boolean
  source?: string
}

export const CLAIMS = {
  /** Homepage statistics band: years of experience, project count, VCA, hourly rate. */
  stats: { enabled: false },
  /** Ratings and testimonials. Needs a real, linkable review source. */
  reviews: { enabled: false },
  /**
   * Project gallery, project stories and locations. Until this is on, the
   * before/after slider shows illustrations clearly labelled "Impressie".
   */
  projects: { enabled: false },
  /** Owner/team photo and "own team" statements. */
  team: { enabled: false },
  /**
   * "Vanaf" prices on service cards and any rate table. The calculator keeps
   * its own rates in data/pricing.ts (ESTIMATOR) and always shows them as an
   * indication; `npm run check:launch` asks for those to be checked.
   */
  pricing: { enabled: false },
  /** Any warranty duration or "100% guarantee" statement. */
  warranty: { enabled: false },
  /** "Reply within 24 h / 30 min / 15 min" promises. */
  responseTime: { enabled: false },
  /** "Free survey / no call-out costs". */
  freeSurvey: { enabled: false },
  /** VCA or other certifications. */
  certification: { enabled: false },
} satisfies Record<string, Claim>

export type ClaimKey = keyof typeof CLAIMS

export function claim(key: ClaimKey): boolean {
  const value = CLAIMS[key] as Claim
  return value.enabled === true && Boolean(value.source?.trim())
}
