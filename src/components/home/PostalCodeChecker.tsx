import React, { useState } from "react"
import Icon from "../Icon"
import { useLang } from "../../i18n/LangContext"
import { whatsappHref } from "../../data/contact"
import { claim } from "../../data/claims"
import { scrollToQuote } from "../../lib/quoteDraft"
import type { Page } from "../../App"

/**
 * The postcode ranges below are the owner's service area and must be
 * confirmed (CLAIMS.serviceArea) before the checker is shown. Anything that
 * does not match is reported as "unknown" — never as covered.
 */
export interface AreaResult {
  serviceRadius: "core" | "extended" | "unknown"
  cityName?: string
}

const POPULAR_QUICK_SEARCHES = [
  { label: "Amersfoort (3811)", query: "3811 Amersfoort", city: "Amersfoort" },
  { label: "Utrecht (3511)", query: "3511 Utrecht", city: "Utrecht" },
  { label: "Hilversum (1211)", query: "1211 Hilversum", city: "Hilversum" },
  { label: "Zeist (3701)", query: "3701 Zeist", city: "Zeist" },
  { label: "Leusden (3831)", query: "3831 Leusden", city: "Leusden" },
  { label: "Soest (3762)", query: "3762 Soest", city: "Soest" },
  { label: "Almere (1315)", query: "1315 Almere", city: "Almere" },
  { label: "Amsterdam (1012)", query: "1012 Amsterdam", city: "Amsterdam" },
]

export function determineServiceArea(locationInput: string): AreaResult {
  if (!locationInput || typeof locationInput !== "string") {
    return { serviceRadius: "unknown" }
  }

  const normalized = locationInput.toLowerCase().trim()

  // 1. Check 4-digit Dutch postal code
  const postalMatch = normalized.match(/\b(\d{4})\b/)
  if (postalMatch) {
    const code = parseInt(postalMatch[1], 10)

    // Core postcodes (Amersfoort, Utrecht, Leusden, Soest, Zeist, Baarn, Hilversum)
    if (code >= 3800 && code <= 3839) return { serviceRadius: "core", cityName: "Amersfoort / Leusden" }
    if (code >= 3760 && code <= 3769) return { serviceRadius: "core", cityName: "Soest" }
    if (code >= 3740 && code <= 3749) return { serviceRadius: "core", cityName: "Baarn" }
    if (code >= 3700 && code <= 3709) return { serviceRadius: "core", cityName: "Zeist" }
    if (code >= 3500 && code <= 3589) return { serviceRadius: "core", cityName: "Utrecht" }
    if (code >= 1200 && code <= 1229) return { serviceRadius: "core", cityName: "Hilversum" }
    if (code >= 1400 && code <= 1419) return { serviceRadius: "core", cityName: "Bussum / Naarden" }

    // Extended postcodes (Amsterdam, Almere, Nijkerk, Barneveld, Ede, Veenendaal)
    if (code >= 1000 && code <= 1109) return { serviceRadius: "extended", cityName: "Amsterdam" }
    if (code >= 1300 && code <= 1379) return { serviceRadius: "extended", cityName: "Almere" }
    if (code >= 3860 && code <= 3869) return { serviceRadius: "core", cityName: "Nijkerk" }
    if (code >= 3770 && code <= 3779) return { serviceRadius: "core", cityName: "Barneveld" }
    if (code >= 3900 && code <= 3909) return { serviceRadius: "extended", cityName: "Veenendaal" }
    if (code >= 6710 && code <= 6719) return { serviceRadius: "extended", cityName: "Ede" }
  }

  // 2. Check city name
  if (normalized.includes("amersfoort") || normalized.includes("leusden")) return { serviceRadius: "core", cityName: "Amersfoort" }
  if (normalized.includes("soest") || normalized.includes("baarn")) return { serviceRadius: "core", cityName: "Soest" }
  if (normalized.includes("zeist") || normalized.includes("driebergen")) return { serviceRadius: "core", cityName: "Zeist" }
  if (normalized.includes("utrecht") || normalized.includes("nieuwegein") || normalized.includes("maarssen")) return { serviceRadius: "core", cityName: "Utrecht" }
  if (normalized.includes("hilversum") || normalized.includes("bussum") || normalized.includes("naarden")) return { serviceRadius: "core", cityName: "Hilversum" }
  if (normalized.includes("amsterdam") || normalized.includes("almere")) return { serviceRadius: "extended", cityName: "Amsterdam / Almere" }
  if (normalized.includes("nijkerk") || normalized.includes("barneveld") || normalized.includes("harderwijk")) return { serviceRadius: "core", cityName: "Nijkerk / Barneveld" }

  return { serviceRadius: "unknown", cityName: locationInput.trim() }
}

export default function PostalCodeChecker({
  navigate,
}: {
  navigate?: (p: Page) => void
}) {
  const { pick } = useLang()
  const [query, setQuery] = useState("")
  const [checkedLocation, setCheckedLocation] = useState("")
  const [result, setResult] = useState<AreaResult | null>(null)

  if (!claim("serviceArea")) return null

  const copy = pick({
    nl: {
      eyebrow: "Werkgebied",
      title: "Valt uw woonplaats binnen ons werkgebied?",
      desc: "Vul uw postcode of plaats in voor een eerste indicatie. We bevestigen altijd persoonlijk of we uw project kunnen aannemen.",
      label: "Postcode of plaats",
      placeholder: "Bijv. 3811 of Amersfoort",
      btnCheck: "Controleer",
      quickLabel: "Snel bekijken:",
      coreTitle: "Uw locatie valt binnen ons kernwerkgebied.",
      extendedTitle: "Uw locatie valt binnen ons bredere werkgebied.",
      unknownTitle: "Dit kunnen we niet automatisch bevestigen.",
      knownDesc: "Stuur een vrijblijvende aanvraag; we bevestigen de mogelijkheden persoonlijk.",
      unknownDesc: "Vermeld uw woonplaats in de aanvraag, dan laten we u weten of we uw project kunnen uitvoeren.",
      btnQuote: "Vrijblijvende aanvraag",
      btnWhatsApp: "Vraag het via WhatsApp",
      whatsappMsg: (loc: string) => `Hallo Bouwvast, ik woon in ${loc}. Kunnen jullie daar een project voor mij uitvoeren?`,
    },
    en: {
      eyebrow: "Service area",
      title: "Is your town within our service area?",
      desc: "Enter your postcode or town for a first indication. We always confirm personally whether we can take on your project.",
      label: "Postcode or town",
      placeholder: "E.g. 3811 or Amersfoort",
      btnCheck: "Check",
      quickLabel: "Quick check:",
      coreTitle: "Your location is within our core service area.",
      extendedTitle: "Your location is within our wider service area.",
      unknownTitle: "We cannot confirm this automatically.",
      knownDesc: "Send a no-obligation request; we will confirm the options personally.",
      unknownDesc: "Mention your town in the request and we will let you know whether we can carry out your project.",
      btnQuote: "No-obligation request",
      btnWhatsApp: "Ask via WhatsApp",
      whatsappMsg: (loc: string) => `Hello Bouwvast, I live in ${loc}. Could you carry out a project for me there?`,
    },
    uk: {
      eyebrow: "Зона роботи",
      title: "Чи входить ваше місто в нашу зону роботи?",
      desc: "Введіть поштовий індекс або місто для попередньої перевірки. Ми завжди особисто підтверджуємо, чи можемо взятися за проєкт.",
      label: "Поштовий індекс або місто",
      placeholder: "Напр. 3811 або Amersfoort",
      btnCheck: "Перевірити",
      quickLabel: "Швидка перевірка:",
      coreTitle: "Ваша адреса в нашій основній зоні роботи.",
      extendedTitle: "Ваша адреса в нашій розширеній зоні роботи.",
      unknownTitle: "Ми не можемо підтвердити це автоматично.",
      knownDesc: "Надішліть запит без зобов'язань — ми особисто підтвердимо можливості.",
      unknownDesc: "Вкажіть своє місто в запиті, і ми повідомимо, чи можемо виконати ваш проєкт.",
      btnQuote: "Запит без зобов'язань",
      btnWhatsApp: "Запитати у WhatsApp",
      whatsappMsg: (loc: string) => `Вітаю, Bouwvast! Я живу в ${loc}. Чи можете ви виконати там проєкт для мене?`,
    },
    ru: {
      eyebrow: "Зона работы",
      title: "Входит ли ваш город в нашу зону работы?",
      desc: "Введите почтовый индекс или город для предварительной проверки. Мы всегда лично подтверждаем, можем ли взяться за проект.",
      label: "Почтовый индекс или город",
      placeholder: "Напр. 3811 или Amersfoort",
      btnCheck: "Проверить",
      quickLabel: "Быстрая проверка:",
      coreTitle: "Ваш адрес в нашей основной зоне работы.",
      extendedTitle: "Ваш адрес в нашей расширенной зоне работы.",
      unknownTitle: "Мы не можем подтвердить это автоматически.",
      knownDesc: "Отправьте запрос без обязательств — мы лично подтвердим возможности.",
      unknownDesc: "Укажите свой город в запросе, и мы сообщим, можем ли выполнить ваш проект.",
      btnQuote: "Запрос без обязательств",
      btnWhatsApp: "Спросить в WhatsApp",
      whatsappMsg: (loc: string) => `Здравствуйте, Bouwvast! Я живу в ${loc}. Можете ли вы выполнить там проект для меня?`,
    },
  })

  const check = (loc: string, label?: string) => {
    const trimmed = loc.trim()
    if (!trimmed) return
    setCheckedLocation(label ?? trimmed)
    setResult(determineServiceArea(trimmed))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    check(query)
  }

  const wa = whatsappHref(copy.whatsappMsg(checkedLocation || query))
  const title =
    result?.serviceRadius === "core"
      ? copy.coreTitle
      : result?.serviceRadius === "extended"
        ? copy.extendedTitle
        : copy.unknownTitle

  return (
    <section className="section bg-white border-y border-[var(--border)]" id="werkgebied-check" aria-labelledby="area-check-title">
      <div className="container max-w-4xl">
        <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-b from-emerald-50/40 to-white p-6 sm:p-9 shadow-lg">
          <p className="mb-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">{copy.eyebrow}</p>
          <h2 id="area-check-title" className="text-2xl sm:text-3xl font-extrabold text-[var(--fg)] mb-3 leading-tight">
            {copy.title}
          </h2>
          <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed mb-6">{copy.desc}</p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
            <label htmlFor="area-check-input" className="sr-only">{copy.label}</label>
            <input
              id="area-check-input"
              type="text"
              value={query}
              maxLength={60}
              autoComplete="postal-code"
              onChange={(e) => setQuery(e.target.value)}
              placeholder={copy.placeholder}
              className="flex-1 px-4 py-3.5 rounded-xl border-2 border-slate-300 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-500/15 outline-none font-medium text-slate-800 placeholder-slate-500 text-sm sm:text-base bg-white"
            />
            <button type="submit" className="btn btn-primary whitespace-nowrap py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 text-sm sm:text-base">
              <Icon name="check" size={18} />
              {copy.btnCheck}
            </button>
          </form>

          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600 mb-2">
            <span className="font-semibold text-slate-700 mr-1">{copy.quickLabel}</span>
            {POPULAR_QUICK_SEARCHES.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  setQuery(item.query)
                  check(item.query, item.city)
                }}
                className="px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/60 font-medium transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div aria-live="polite">
            {result && (
              <div className="mt-6 rounded-xl border border-emerald-300 bg-white p-5 sm:p-6 shadow-md">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {result.serviceRadius === "unknown" ? copy.unknownDesc : copy.knownDesc}
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (!scrollToQuote()) navigate?.("contact")
                    }}
                    className="btn btn-primary text-sm py-2.5 px-5 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Icon name="check" size={16} />
                    {copy.btnQuote}
                  </button>
                  {wa && (
                    <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-sm py-2.5 px-5 rounded-lg no-underline">
                      {copy.btnWhatsApp}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
