import { LEAD_LIMITS, PHOTO_TYPES, validateLead } from "./leadSchema.ts"
import type { LeadField, LeadInput } from "./leadSchema.ts"

export type Lead = LeadInput

/**
 * Why an attempt failed. The distinction drives what the visitor is told and
 * whether retrying can help:
 * - "unconfigured": no endpoint in this build — retrying never helps
 * - "invalid": the server rejected the content — the visitor must edit
 * - "rate_limited": too many attempts — wait, then retry
 * - "network" / "server": transient — retrying may help
 */
export type LeadFailure = "unconfigured" | "invalid" | "rate_limited" | "network" | "server"

export interface LeadResult {
  /** True only when the endpoint returned a receipt for this exact lead id. */
  delivered: boolean
  failure?: LeadFailure
  status?: number
  /** Field-level problems reported by the server (stable codes). */
  fieldErrors?: Partial<Record<LeadField, string>>
  /** Server reference shown to the visitor on success. */
  reference?: string
  /** Photos were left out because they were not acceptable. */
  photosSkipped: boolean
}

export interface LeadTransport {
  /** Empty string means no lead endpoint was configured at build time. */
  endpoint: string
  fetchImpl: typeof fetch
  timeoutMs: number
}

const DEFAULT_TIMEOUT_MS = 30000

/** Keeps only files the endpoint will accept; reports whether any were dropped. */
export function acceptablePhotos(files: File[]): { files: File[]; skipped: boolean } {
  const limits = LEAD_LIMITS.photos
  const kept: File[] = []
  let total = 0
  for (const file of files.slice(0, limits.maxFiles)) {
    const typeOk = (PHOTO_TYPES as readonly string[]).includes(file.type)
    if (!typeOk || file.size > limits.maxFileBytes) continue
    if (total + file.size > limits.maxTotalBytes) continue
    kept.push(file)
    total += file.size
  }
  return { files: kept, skipped: kept.length !== files.length }
}

/** Kept for callers that only need a yes/no before submitting. */
export function photosFitBudget(files: File[]): boolean {
  return !acceptablePhotos(files).skipped
}

/**
 * Photos force multipart; without them JSON keeps the payload readable.
 * Field names are identical in both shapes.
 */
function buildRequest(
  lead: Lead,
  files: File[],
): { body: BodyInit; headers: Record<string, string> } {
  if (files.length === 0) {
    return {
      body: JSON.stringify(lead),
      headers: { "Content-Type": "application/json", Accept: "application/json" },
    }
  }

  const form = new FormData()
  for (const [key, value] of Object.entries(lead)) {
    if (value !== undefined && value !== null) form.append(key, String(value))
  }
  files.forEach((file, index) => form.append("photos", file, file.name || `photo-${index + 1}`))
  // No Content-Type header: the browser must set the multipart boundary.
  return { body: form, headers: { Accept: "application/json" } }
}

interface Receipt {
  ok?: boolean
  id?: string
  reference?: string
  errors?: Partial<Record<LeadField, string>>
}

async function readJson(response: Response): Promise<Receipt | null> {
  try {
    return (await response.json()) as Receipt
  } catch {
    return null
  }
}

/**
 * Sends one lead. Resolves with what actually happened — it never throws and
 * never reports success it did not observe. Re-sending the same lead (same
 * id) is safe: the endpoint answers with the original receipt instead of
 * creating a second record.
 */
export async function deliverLead(
  lead: Lead,
  files: File[],
  transport: LeadTransport,
): Promise<LeadResult> {
  const { files: attachments, skipped: photosSkipped } = acceptablePhotos(files)

  if (!transport.endpoint) {
    return { delivered: false, failure: "unconfigured", photosSkipped }
  }

  const check = validateLead(lead as unknown as Record<string, unknown>)
  if (!check.ok) {
    const { id: _id, ...fieldErrors } = check.errors
    return { delivered: false, failure: "invalid", fieldErrors, photosSkipped }
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), transport.timeoutMs)

  try {
    const { body, headers } = buildRequest(check.lead, attachments)
    const response = await transport.fetchImpl(transport.endpoint, {
      method: "POST",
      headers,
      body,
      signal: controller.signal,
      credentials: "omit",
    })
    const receipt = await readJson(response)

    if (response.ok && receipt?.ok === true && receipt.id === lead.id) {
      return { delivered: true, reference: receipt.reference, photosSkipped }
    }
    if (response.status === 429) {
      return { delivered: false, failure: "rate_limited", status: 429, photosSkipped }
    }
    if ([400, 413, 415, 422].includes(response.status)) {
      return {
        delivered: false,
        failure: "invalid",
        status: response.status,
        fieldErrors: receipt?.errors,
        photosSkipped,
      }
    }
    // Includes a 2xx without a matching receipt: not proof of delivery.
    return { delivered: false, failure: "server", status: response.status, photosSkipped }
  } catch {
    // Offline, DNS failure, CORS rejection or our own abort timeout.
    return { delivered: false, failure: "network", photosSkipped }
  } finally {
    clearTimeout(timer)
  }
}

/**
 * Read as a static `import.meta.env.VITE_*` path so Vite inlines the value at
 * build time. Outside a bundler `import.meta.env` does not exist and throws.
 */
function configuredEndpoint(): string {
  try {
    return String(import.meta.env.VITE_LEAD_ENDPOINT ?? "").trim()
  } catch {
    return ""
  }
}

export function browserTransport(): LeadTransport {
  return {
    endpoint: configuredEndpoint(),
    fetchImpl: (input: RequestInfo | URL, init?: RequestInit) => fetch(input, init),
    timeoutMs: DEFAULT_TIMEOUT_MS,
  }
}

export function submitLead(lead: Lead, files: File[] = []): Promise<LeadResult> {
  return deliverLead(lead, files, browserTransport())
}

/** Builds a fresh lead id. Falls back for browsers without randomUUID. */
export function newLeadId(): string {
  const c = globalThis.crypto
  if (c?.randomUUID) return c.randomUUID()
  const bytes = new Uint8Array(16)
  if (c?.getRandomValues) c.getRandomValues(bytes)
  else for (let i = 0; i < 16; i++) bytes[i] = Math.floor(Math.random() * 256)
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("")
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}
