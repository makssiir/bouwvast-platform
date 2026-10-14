/**
 * Every public business fact lives here, next to whether the owner has
 * confirmed it. Unconfirmed values are NEVER rendered: the UI hides the
 * channel or sentence instead of guessing.
 *
 * To publish a value: replace it with the real one, set `verified: true`, and
 * record where the confirmation came from in `source`. `npm run check:launch`
 * fails while required values are still unconfirmed.
 */
export interface CompanyField {
  value: string
  verified: boolean
  /** Who confirmed it and how, e.g. "KvK uittreksel 2026-10-20". */
  source?: string
}

export const COMPANY = {
  /** Trading name shown in copy. The brand name itself is not a claim. */
  brand: { value: "Bouwvast", verified: true, source: "project brief" },
  legalName: { value: "", verified: false },
  /** Display form, e.g. "033 - 123 45 67". */
  phoneDisplay: { value: "", verified: false },
  /** E.164, e.g. "+31331234567". */
  phoneTel: { value: "", verified: false },
  /** E.164 without spaces, e.g. "+31612345678". */
  whatsapp: { value: "", verified: false },
  email: { value: "", verified: false },
  address: { value: "", verified: false },
  hours: { value: "", verified: false },
  kvk: { value: "", verified: false },
  btw: { value: "", verified: false },
} satisfies Record<string, CompanyField>

export type CompanyKey = keyof typeof COMPANY

/** Returns the value only when the owner has confirmed it. */
export function verifiedValue(field: CompanyField): string | undefined {
  const value = field.value.trim()
  return field.verified && value ? value : undefined
}

/** Fields the site cannot launch without (checked by scripts/check-launch.mjs). */
export const REQUIRED_FOR_LAUNCH: CompanyKey[] = [
  "legalName",
  "phoneTel",
  "phoneDisplay",
  "email",
  "kvk",
]
