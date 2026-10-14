import { LEAD_LIMITS, PHOTO_TYPES, validateLead } from "../src/lib/leadSchema.ts"

const FIELDS = [
  "id", "name", "phone", "email", "city", "service", "description", "estimate",
  "language", "sourcePage", "utm_source", "utm_medium", "utm_campaign", "createdAt", "hp",
]

function json(status, body, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...extraHeaders },
  })
}

/** Identifies the file type from its first bytes; the declared type is not trusted. */
export function sniffImage(bytes) {
  const b = bytes
  if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return { type: "image/jpeg", ext: "jpg" }
  if (b.length >= 8 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return { type: "image/png", ext: "png" }
  if (
    b.length >= 12 &&
    String.fromCharCode(b[0], b[1], b[2], b[3]) === "RIFF" &&
    String.fromCharCode(b[8], b[9], b[10], b[11]) === "WEBP"
  ) {
    return { type: "image/webp", ext: "webp" }
  }
  return null
}

/** Keeps the network part of an address only: enough for abuse handling, less personal. */
export function truncateIp(ip) {
  if (!ip) return ""
  const v4 = ip.replace(/^::ffff:/, "")
  if (/^\d+\.\d+\.\d+\.\d+$/.test(v4)) return v4.replace(/\.\d+$/, ".0")
  const parts = ip.split(":").slice(0, 3)
  return `${parts.join(":")}::`
}

export function createRateLimiter({ max, windowMs }) {
  const hits = new Map()
  return {
    /** True when this key may make another request now. */
    allow(key, now = Date.now()) {
      const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
      if (recent.length >= max) {
        hits.set(key, recent)
        return false
      }
      recent.push(now)
      hits.set(key, recent)
      if (hits.size > 10_000) {
        for (const [k, times] of hits) if (times.every((t) => now - t >= windowMs)) hits.delete(k)
      }
      return true
    },
  }
}

function safeHost(value) {
  try {
    return new URL(value).host
  } catch {
    return ""
  }
}

export function referenceFor(id, date) {
  const d = date.toISOString().slice(2, 10).replace(/-/g, "")
  return `BV-${d}-${id.replace(/-/g, "").slice(0, 5).toUpperCase()}`
}

async function readBody(request) {
  const type = (request.headers.get("content-type") ?? "").toLowerCase()
  if (type.startsWith("application/json")) {
    const raw = await request.json()
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new SyntaxError("not an object")
    return { fields: raw, files: [] }
  }
  if (type.startsWith("multipart/form-data")) {
    const form = await request.formData()
    const fields = {}
    for (const key of FIELDS) {
      const value = form.get(key)
      if (typeof value === "string") fields[key] = value
    }
    const files = form.getAll("photos").filter((value) => typeof value === "object" && value !== null)
    return { fields, files }
  }
  return null
}

/**
 * POST /api/leads
 *
 * Responses:
 *   201 { ok: true, id, reference }           stored (or 200 for a repeated id)
 *   400/413/415/422 { ok: false, errors }     the visitor can fix this
 *   403                                       wrong Origin
 *   429                                       too many requests from this address
 *   500                                       storage failed: the lead was NOT kept
 */
export function createLeadHandler({ config, store, notifier, rateLimiter, log = console, now = () => new Date() }) {
  return async function handleLead(request, { clientIp = "" } = {}) {
    // Browsers always send Origin on a cross-site POST. Accept the configured
    // site origin(s), or — when none is configured — the host being served.
    const origin = request.headers.get("origin")
    if (origin) {
      const allowed =
        config.allowedOrigins.length > 0
          ? config.allowedOrigins.includes(origin)
          : safeHost(origin) === new URL(request.url).host
      if (!allowed) return json(403, { ok: false, error: "origin" })
    }

    const declared = Number(request.headers.get("content-length") ?? 0)
    if (declared > config.maxBodyBytes) return json(413, { ok: false, errors: { photos: "too_long" } })

    if (!rateLimiter.allow(clientIp || "unknown")) {
      return json(429, { ok: false, error: "rate_limited" }, { "retry-after": String(Math.ceil(config.rateLimit.windowMs / 1000)) })
    }

    let body
    try {
      body = await readBody(request)
    } catch (error) {
      if (error?.name === "PayloadTooLargeError" || error?.cause?.name === "PayloadTooLargeError") return json(413, { ok: false, errors: { photos: "too_long" } })
      return json(400, { ok: false, error: "malformed" })
    }
    if (!body) return json(415, { ok: false, error: "unsupported_media_type" })

    const check = validateLead(body.fields)

    // Honeypot filled: answer like a success so bots learn nothing, keep nothing.
    if (check.lead.hp) {
      log.info?.("lead: honeypot triggered, discarded")
      return json(201, { ok: true, id: check.lead.id, reference: referenceFor(check.lead.id || "00000", now()) })
    }

    if (check.errors.id) return json(400, { ok: false, errors: { id: "invalid" } })

    // Same id again (visitor retried after a timeout): hand back the original receipt.
    const existing = await store.get(check.lead.id)
    if (existing) return json(200, { ok: true, id: existing.lead.id, reference: existing.reference })

    if (!check.ok) return json(422, { ok: false, errors: check.errors })

    const { maxFiles, maxFileBytes, maxTotalBytes } = LEAD_LIMITS.photos
    if (body.files.length > maxFiles) return json(422, { ok: false, errors: { photos: "too_long" } })
    const photos = []
    let total = 0
    for (const file of body.files) {
      const bytes = new Uint8Array(await file.arrayBuffer())
      total += bytes.length
      if (bytes.length === 0) continue
      if (bytes.length > maxFileBytes || total > maxTotalBytes) return json(413, { ok: false, errors: { photos: "too_long" } })
      const sniffed = sniffImage(bytes)
      if (!sniffed || !PHOTO_TYPES.includes(sniffed.type)) return json(415, { ok: false, errors: { photos: "invalid" } })
      photos.push({ ...sniffed, bytes, originalName: String(file.name ?? "").slice(0, 120) })
    }

    const receivedAt = now()
    const { hp: _hp, ...lead } = check.lead
    const record = {
      lead,
      reference: referenceFor(lead.id, receivedAt),
      receivedAt: receivedAt.toISOString(),
      ipPrefix: truncateIp(clientIp),
      userAgent: String(request.headers.get("user-agent") ?? "").slice(0, 200),
      notified: false,
      notifiedVia: [],
      notifyAttempts: 0,
    }

    try {
      const created = await store.create(record, photos)
      if (!created) {
        const raced = await store.get(lead.id)
        return json(200, { ok: true, id: lead.id, reference: raced?.reference ?? record.reference })
      }
    } catch (error) {
      log.error?.("lead: storage failed", error)
      return json(500, { ok: false, error: "storage" })
    }

    log.info?.(`lead: stored ${record.reference}`)

    // Notification happens after the receipt; failures are retried in the background.
    queueMicrotask(() => {
      deliver(store, notifier, lead.id, log).catch(() => {})
    })

    return json(201, { ok: true, id: lead.id, reference: record.reference })
  }
}

/** Sends one stored lead to the owner and records the outcome. */
export async function deliver(store, notifier, id, log = console) {
  if (!notifier.configured) return false
  const record = await store.get(id)
  if (!record || record.notified) return true
  try {
    const { done, errors } = await notifier.send(record)
    await store.update(id, {
      notified: errors.length === 0,
      notifiedVia: done,
      notifyAttempts: (record.notifyAttempts ?? 0) + 1,
      lastNotifyError: errors.join("; ") || undefined,
      notifiedAt: new Date().toISOString(),
    })
    return true
  } catch (error) {
    log.warn?.(`lead: notification failed for ${record.reference}: ${error.message}`)
    await store.update(id, {
      notifyAttempts: (record.notifyAttempts ?? 0) + 1,
      lastNotifyError: error.message,
    })
    return false
  }
}

/** Retries every lead that has not reached the owner yet. */
export async function retryPending(store, notifier, log = console) {
  if (!notifier.configured) return 0
  let sent = 0
  for (const record of await store.list()) {
    if (!record.notified && (await deliver(store, notifier, record.lead.id, log))) sent += 1
  }
  return sent
}
