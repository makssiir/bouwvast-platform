/**
 * The lead contract shared by the browser and the lead endpoint
 * (server/lead-handler.mjs imports this file directly). Keep it dependency-
 * free and limited to erasable TypeScript so Node can run it unbuilt.
 */

export const LEAD_LIMITS = {
  name: { min: 2, max: 100 },
  phone: { max: 32 },
  email: { max: 254 },
  city: { min: 2, max: 100 },
  description: { min: 5, max: 4000 },
  estimate: { max: 600 },
  sourcePage: { max: 200 },
  service: { max: 100 },
  photos: { maxFiles: 5, maxFileBytes: 8 * 1024 * 1024, maxTotalBytes: 12 * 1024 * 1024 },
} as const

export const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"] as const

export type LeadField = "name" | "phone" | "email" | "city" | "description" | "photos"

/** How the visitor would like to be contacted. */
export const CONTACT_PREFERENCES = ["phone", "whatsapp", "email"] as const
export type ContactPreference = (typeof CONTACT_PREFERENCES)[number]

export interface LeadInput {
  id: string
  name: string
  phone: string
  email: string
  city: string
  service: string
  /** Optional when a service was chosen; otherwise the only clue what the job is. */
  description: string
  /** Missing means "no preference" (the quote form does not ask). */
  contactPreference?: ContactPreference
  /** Estimator summary, if the visitor attached one. */
  estimate: string
  language: string
  sourcePage: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  createdAt: string
  /** Honeypot. Real visitors never see or fill it. */
  hp?: string
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** "06-12 34 56 78", "+31 (0)6 1234 5678", "0031612345678" → "+31612345678"-ish digits. */
export function normalizePhone(raw: string): string {
  let value = String(raw ?? "").trim().replace(/\(0\)/g, "")
  const plus = value.startsWith("+") || value.startsWith("00")
  value = value.replace(/^00/, "").replace(/\D/g, "")
  return plus ? `+${value}` : value
}

/** Accepts national (0…) and international (+…) numbers of plausible length. */
export function isPlausiblePhone(raw: string): boolean {
  if (!/^[\d\s()+\-./]+$/.test(String(raw ?? "").trim())) return false
  const normalized = normalizePhone(raw)
  const digits = normalized.replace(/\D/g, "")
  if (normalized.startsWith("+")) return digits.length >= 8 && digits.length <= 15
  return normalized.startsWith("0") && digits.length >= 9 && digits.length <= 12
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

export interface ValidationResult {
  ok: boolean
  errors: Partial<Record<LeadField | "id", string>>
  lead: LeadInput
}

/**
 * Normalises and validates a lead. Error values are stable codes
 * ("required", "too_short", "too_long", "invalid"), never prose, so each side
 * can phrase them in the visitor's language.
 */
export function validateLead(raw: Record<string, unknown>): ValidationResult {
  const lead: LeadInput = {
    id: text(raw.id),
    name: text(raw.name).replace(/\s+/g, " "),
    phone: text(raw.phone),
    email: text(raw.email).toLowerCase(),
    city: text(raw.city).replace(/\s+/g, " "),
    service: text(raw.service).slice(0, LEAD_LIMITS.service.max),
    description: text(raw.description),
    contactPreference: (CONTACT_PREFERENCES as readonly string[]).includes(text(raw.contactPreference))
      ? (text(raw.contactPreference) as ContactPreference)
      : undefined,
    estimate: text(raw.estimate).slice(0, LEAD_LIMITS.estimate.max),
    language: text(raw.language).slice(0, 5) || "nl",
    sourcePage: text(raw.sourcePage).slice(0, LEAD_LIMITS.sourcePage.max),
    utm_source: text(raw.utm_source).slice(0, 100) || undefined,
    utm_medium: text(raw.utm_medium).slice(0, 100) || undefined,
    utm_campaign: text(raw.utm_campaign).slice(0, 100) || undefined,
    createdAt: text(raw.createdAt).slice(0, 40),
    hp: text(raw.hp),
  }

  const errors: ValidationResult["errors"] = {}
  const range = (field: LeadField, value: string, min: number, max: number) => {
    if (!value) errors[field] = "required"
    else if (value.length < min) errors[field] = "too_short"
    else if (value.length > max) errors[field] = "too_long"
  }

  if (!UUID.test(lead.id)) errors.id = "invalid"
  range("name", lead.name, LEAD_LIMITS.name.min, LEAD_LIMITS.name.max)
  range("city", lead.city, LEAD_LIMITS.city.min, LEAD_LIMITS.city.max)
  // A chosen service says what the job is; without one the description must.
  if (lead.description || !lead.service) {
    range("description", lead.description, LEAD_LIMITS.description.min, LEAD_LIMITS.description.max)
  }

  if (!lead.phone) errors.phone = "required"
  else if (lead.phone.length > LEAD_LIMITS.phone.max || !isPlausiblePhone(lead.phone)) errors.phone = "invalid"

  if (lead.email && (lead.email.length > LEAD_LIMITS.email.max || !EMAIL.test(lead.email))) {
    errors.email = "invalid"
  } else if (!lead.email && lead.contactPreference === "email") {
    errors.email = "required"
  }

  return { ok: Object.keys(errors).length === 0, errors, lead }
}
