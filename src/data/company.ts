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
  /** Current website branding; this does not establish a registered trade name. */
  brand: { value: "Huisklusdienst", verified: true, source: "owner: domain huisklusdienst.nl" },
  /** Trademark owner confirmed by the owner. */
  brandOwner: { value: "Slim-Team Bouw B.V.", verified: true, source: "Owner-confirmed trademark owner in chat; KvK 97996939." },
  /** Keep the trade-name relationship hidden until the exact name is confirmed. */
  tradeName: { value: "", verified: false },
  legalName: { value: "Slim-Team Bouw B.V.", verified: true, source: "Owner-provided company details in chat." },
  contactPerson: { value: "Maksym Usyk", verified: true, source: "Owner-provided company details in chat." },
  /** Display form, e.g. "033 - 123 45 67". */
  phoneDisplay: { value: "06 17 55 25 58", verified: true, source: "Owner-provided company details in chat." },
  /** E.164, e.g. "+31331234567". */
  phoneTel: { value: "+31617552558", verified: true, source: "Owner-provided phone number, normalized to E.164." },
  /** E.164 without spaces, e.g. "+31612345678". */
  whatsapp: { value: "", verified: false },
  email: { value: "", verified: false },
  /** Public location is limited to the town; no street or postal address is published. */
  locality: { value: "Baarn", verified: true, source: "Owner-confirmed public location preference." },
  hours: { value: "", verified: false },
  kvk: { value: "97996939", verified: true, source: "Owner-provided company details in chat; not independently registry-checked." },
  btw: { value: "NL828110670B01", verified: true, source: "Owner-provided company details in chat; not independently registry-checked." },
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
