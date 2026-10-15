import { createHmac } from "node:crypto"

const LABELS = {
  name: "Naam",
  phone: "Telefoon",
  email: "E-mail",
  city: "Plaats / postcode",
  service: "Dienst",
  description: "Omschrijving",
  contactPreference: "Contactvoorkeur",
  estimate: "Kostenindicatie",
  language: "Taal",
  sourcePage: "Pagina",
}

const PREFERENCES = { phone: "Bellen", whatsapp: "WhatsApp", email: "E-mail" }

export function leadSummary(record) {
  const { lead } = record
  const lines = [`Nieuwe aanvraag ${record.reference}`, ""]
  for (const [key, label] of Object.entries(LABELS)) {
    const value = key === "contactPreference" ? PREFERENCES[lead[key]] : lead[key]
    if (value) lines.push(`${label}: ${value}`)
  }
  const utm = [lead.utm_source, lead.utm_medium, lead.utm_campaign].filter(Boolean).join(" / ")
  if (utm) lines.push(`Campagne: ${utm}`)
  lines.push(`Foto's: ${record.photos?.length ?? 0}`)
  lines.push(`Ontvangen: ${record.receivedAt}`)
  return lines.join("\n")
}

/**
 * Sends a stored lead to the owner. Delivery channels:
 *   - LEAD_WEBHOOK_URL: JSON POST (CRM, Zapier/Make, Slack relay…), signed
 *     with HMAC-SHA256 in X-Huisklusdienst-Signature when LEAD_WEBHOOK_SECRET is set
 *   - Resend e-mail: RESEND_API_KEY + LEAD_NOTIFY_TO + LEAD_NOTIFY_FROM,
 *     photos attached
 * Throws when every configured channel failed, so the caller can retry.
 */
export function createNotifier(config, { fetchImpl = fetch, readPhoto } = {}) {
  const n = config.notify

  async function webhook(record) {
    const body = JSON.stringify({
      type: "lead.created",
      reference: record.reference,
      receivedAt: record.receivedAt,
      lead: record.lead,
      photos: (record.photos ?? []).map(({ name, type, size }) => ({ name, type, size })),
    })
    const headers = { "content-type": "application/json" }
    if (n.webhookSecret) {
      headers["x-huisklusdienst-signature"] = `sha256=${createHmac("sha256", n.webhookSecret).update(body).digest("hex")}`
    }
    const response = await fetchImpl(n.webhookUrl, { method: "POST", headers, body, signal: AbortSignal.timeout(10_000) })
    if (!response.ok) throw new Error(`webhook answered ${response.status}`)
  }

  async function email(record) {
    const attachments = []
    for (const photo of record.photos ?? []) {
      const bytes = readPhoto ? await readPhoto(record.lead.id, photo.name) : null
      if (bytes) attachments.push({ filename: photo.name, content: Buffer.from(bytes).toString("base64") })
    }
    const response = await fetchImpl("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${n.resendApiKey}`, "content-type": "application/json", "idempotency-key": record.lead.id },
      body: JSON.stringify({
        from: n.emailFrom,
        to: n.emailTo,
        reply_to: record.lead.email || undefined,
        subject: `Nieuwe aanvraag ${record.reference}: ${record.lead.service || "algemeen"} in ${record.lead.city}`,
        text: leadSummary(record),
        attachments,
      }),
      signal: AbortSignal.timeout(20_000),
    })
    if (!response.ok) throw new Error(`resend answered ${response.status}`)
  }

  const channels = []
  if (n.webhookUrl) channels.push(["webhook", webhook])
  if (n.resendApiKey && n.emailTo.length && n.emailFrom) channels.push(["email", email])

  return {
    configured: channels.length > 0,
    /** Returns the channels that succeeded; throws if none did. */
    async send(record) {
      if (channels.length === 0) throw new Error("no notification channel configured")
      const done = []
      const errors = []
      for (const [name, send] of channels) {
        if (record.notifiedVia?.includes(name)) {
          done.push(name)
          continue
        }
        try {
          await send(record)
          done.push(name)
        } catch (error) {
          errors.push(`${name}: ${error.message}`)
        }
      }
      if (done.length === 0) throw new Error(errors.join("; "))
      return { done, errors }
    },
  }
}
