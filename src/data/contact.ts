import { COMPANY, verifiedValue } from "./company"

/**
 * Contact channels derived from confirmed company data only. A channel that
 * has not been confirmed is `undefined`, and every component that offers it
 * must hide the control rather than render a placeholder or `undefined` link.
 */
const phoneTel = verifiedValue(COMPANY.phoneTel)
const phoneDisplay = verifiedValue(COMPANY.phoneDisplay) ?? phoneTel
const whatsappNumber = verifiedValue(COMPANY.whatsapp)?.replace(/\D/g, "")
const email = verifiedValue(COMPANY.email)

export const CONTACT = {
  phoneTel,
  phoneDisplay,
  email,
  address: verifiedValue(COMPANY.address),
  hours: verifiedValue(COMPANY.hours),
  kvk: verifiedValue(COMPANY.kvk),
  btw: verifiedValue(COMPANY.btw),
  legalName: verifiedValue(COMPANY.legalName),
  hasWhatsApp: Boolean(whatsappNumber),
}

export function phoneHref(): string | undefined {
  return phoneTel ? `tel:${phoneTel}` : undefined
}

/** The single WhatsApp URL builder for the whole site. */
export function whatsappHref(message?: string): string | undefined {
  if (!whatsappNumber) return undefined
  const text = message ? `?text=${encodeURIComponent(message)}` : ""
  return `https://wa.me/${whatsappNumber}${text}`
}

export function emailHref(subject?: string, body?: string): string | undefined {
  if (!email) return undefined
  const params = new URLSearchParams()
  if (subject) params.set("subject", subject)
  if (body) params.set("body", body)
  const query = params.toString().replace(/\+/g, "%20")
  return `mailto:${email}${query ? `?${query}` : ""}`
}

export function googleMapsHref(): string | undefined {
  return CONTACT.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`
    : undefined
}

/** True when at least one direct channel besides the form is available. */
export function hasDirectChannel(): boolean {
  return Boolean(phoneTel || email || whatsappNumber)
}
