import type { Lang } from "../i18n/translations"

export interface Lead {
  id: string
  name: string
  phone: string
  email: string
  city: string
  postcode: string
  service: string
  description: string
  photos: string
  preferredDate: string | null
  preferredTime: string
  language: Lang
  sourcePage: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  createdAt: string
}

/**
 * Why an attempt failed. The distinction drives what the visitor is told:
 * "unconfigured" can never succeed on a retry, "network" usually can.
 */
export type LeadFailure = "unconfigured" | "network" | "server"

export interface LeadResult {
  /** True only when the endpoint confirmed receipt with a 2xx response. */
  delivered: boolean
  failure?: LeadFailure
  status?: number
  /** True when the lead was stored locally for a later automatic retry. */
  queued: boolean
  /** True when photos were left out because they exceeded the size budget. */
  photosSkipped: boolean
}

export interface StorageLike {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

export interface LeadTransport {
  /** Empty string means no lead endpoint was configured at build time. */
  endpoint: string
  fetchImpl: typeof fetch
  storage: StorageLike | null
  timeoutMs: number
}

export const QUEUE_KEY = "bouwvast.leads.pending"

/** Free form backends reject large bodies; stay well under their limits. */
export const PHOTO_BUDGET_BYTES = 4 * 1024 * 1024

const MAX_QUEUED_LEADS = 20
const DEFAULT_TIMEOUT_MS = 15000

export function photosFitBudget(files: File[]): boolean {
  const total = files.reduce((sum, file) => sum + file.size, 0)
  return total <= PHOTO_BUDGET_BYTES
}

/**
 * Photos force multipart; without them JSON keeps the payload readable for
 * whichever backend is wired up. Field names are identical in both shapes.
 */
function buildRequest(
  lead: Lead,
  files: File[],
): { body: BodyInit; headers: Record<string, string> } {
  if (files.length === 0) {
    return {
      body: JSON.stringify(lead),
      headers: { "Content-Type": "application/json" },
    }
  }

  const form = new FormData()
  for (const [key, value] of Object.entries(lead)) {
    if (value !== undefined && value !== null) form.append(key, String(value))
  }
  files.forEach((file, index) => form.append(`photo_${index + 1}`, file, file.name))

  // No Content-Type header: the browser must set the multipart boundary.
  return { body: form, headers: {} }
}

type PostOutcome =
  | { ok: true }
  | { ok: false; failure: LeadFailure; status?: number }

async function post(
  lead: Lead,
  files: File[],
  transport: LeadTransport,
): Promise<PostOutcome> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), transport.timeoutMs)

  try {
    const { body, headers } = buildRequest(lead, files)
    const response = await transport.fetchImpl(transport.endpoint, {
      method: "POST",
      headers,
      body,
      signal: controller.signal,
    })
    if (!response.ok) {
      return { ok: false, failure: "server", status: response.status }
    }
    return { ok: true }
  } catch {
    // Offline, DNS failure, CORS rejection or our own abort timeout.
    return { ok: false, failure: "network" }
  } finally {
    clearTimeout(timer)
  }
}

export function readQueue(storage: StorageLike | null): Lead[] {
  if (!storage) return []
  try {
    const raw = storage.getItem(QUEUE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? (parsed as Lead[]) : []
  } catch {
    return []
  }
}

function writeQueue(storage: StorageLike | null, leads: Lead[]): boolean {
  if (!storage) return false
  try {
    if (leads.length === 0) storage.removeItem(QUEUE_KEY)
    else storage.setItem(QUEUE_KEY, JSON.stringify(leads.slice(-MAX_QUEUED_LEADS)))
    return true
  } catch {
    // A full or disabled storage must never break the form.
    return false
  }
}

function enqueue(storage: StorageLike | null, lead: Lead): boolean {
  const queue = readQueue(storage).filter((queued) => queued.id !== lead.id)
  queue.push(lead)
  return writeQueue(storage, queue)
}

/**
 * Sends one lead. Resolves with what actually happened — it never throws and
 * never reports success it did not observe.
 */
export async function deliverLead(
  lead: Lead,
  files: File[],
  transport: LeadTransport,
): Promise<LeadResult> {
  const attachments = photosFitBudget(files) ? files : []
  const photosSkipped = files.length > 0 && attachments.length === 0

  if (!transport.endpoint) {
    // Nothing can deliver this, now or later, so do not queue it forever.
    return { delivered: false, failure: "unconfigured", queued: false, photosSkipped }
  }

  const outcome = await post(lead, attachments, transport)
  if (outcome.ok) return { delivered: true, queued: false, photosSkipped }

  // File objects do not survive a reload, so the retry copy is text-only.
  const queued = enqueue(transport.storage, lead)
  return {
    delivered: false,
    failure: outcome.failure,
    status: outcome.status,
    queued,
    photosSkipped,
  }
}

/** Retries leads stored by an earlier failed attempt. Returns how many landed. */
export async function flushQueue(transport: LeadTransport): Promise<number> {
  if (!transport.endpoint) return 0

  const queue = readQueue(transport.storage)
  if (queue.length === 0) return 0

  const remaining: Lead[] = []
  let delivered = 0

  for (const lead of queue) {
    const outcome = await post(lead, [], transport)
    if (outcome.ok) delivered += 1
    else remaining.push(lead)
  }

  writeQueue(transport.storage, remaining)
  return delivered
}

function browserStorage(): StorageLike | null {
  try {
    // Safari private mode and blocked cookies throw on first access.
    return typeof localStorage === "undefined" ? null : localStorage
  } catch {
    return null
  }
}

/**
 * Read as a static `import.meta.env.VITE_*` path so Vite inlines the value at
 * build time. Outside a bundler `import.meta.env` does not exist and throws,
 * which is what the catch is for.
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
    storage: browserStorage(),
    timeoutMs: DEFAULT_TIMEOUT_MS,
  }
}

export function submitLead(lead: Lead, files: File[] = []): Promise<LeadResult> {
  return deliverLead(lead, files, browserTransport())
}

export function retryPendingLeads(): Promise<number> {
  return flushQueue(browserTransport())
}
