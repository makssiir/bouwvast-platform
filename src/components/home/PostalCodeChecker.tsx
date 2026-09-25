import React, { useState } from "react"
import Icon from "../Icon"
import { useLang } from "../../i18n/LangContext"
import { CONTACT } from "../../data/contact"
import type { Page } from "../../App"

interface AreaResult {
  serviceRadius: "core" | "extended" | "out_of_area"
  travelEstimateMinutes: number
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
    return { serviceRadius: "out_of_area", travelEstimateMinutes: 45 }
  }

  const normalized = locationInput.toLowerCase().trim()

  // 1. Check 4-digit Dutch postal code
  const postalMatch = normalized.match(/\b(\d{4})\b/)
  if (postalMatch) {
    const code = parseInt(postalMatch[1], 10)

    // Core postcodes (Amersfoort, Utrecht, Leusden, Soest, Zeist, Baarn, Hilversum)
    if (code >= 3800 && code <= 3839) return { serviceRadius: "core", travelEstimateMinutes: 10, cityName: "Amersfoort / Leusden" }
    if (code >= 3760 && code <= 3769) return { serviceRadius: "core", travelEstimateMinutes: 15, cityName: "Soest" }
    if (code >= 3740 && code <= 3749) return { serviceRadius: "core", travelEstimateMinutes: 15, cityName: "Baarn" }
    if (code >= 3700 && code <= 3709) return { serviceRadius: "core", travelEstimateMinutes: 20, cityName: "Zeist" }
    if (code >= 3500 && code <= 3589) return { serviceRadius: "core", travelEstimateMinutes: 25, cityName: "Utrecht" }
    if (code >= 1200 && code <= 1229) return { serviceRadius: "core", travelEstimateMinutes: 20, cityName: "Hilversum" }
    if (code >= 1400 && code <= 1419) return { serviceRadius: "core", travelEstimateMinutes: 25, cityName: "Bussum / Naarden" }

    // Extended postcodes (Amsterdam, Almere, Nijkerk, Barneveld, Ede, Veenendaal)
    if (code >= 1000 && code <= 1109) return { serviceRadius: "extended", travelEstimateMinutes: 35, cityName: "Amsterdam" }
    if (code >= 1300 && code <= 1379) return { serviceRadius: "extended", travelEstimateMinutes: 30, cityName: "Almere" }
    if (code >= 3860 && code <= 3869) return { serviceRadius: "core", travelEstimateMinutes: 15, cityName: "Nijkerk" }
    if (code >= 3770 && code <= 3779) return { serviceRadius: "core", travelEstimateMinutes: 20, cityName: "Barneveld" }
    if (code >= 3900 && code <= 3909) return { serviceRadius: "extended", travelEstimateMinutes: 30, cityName: "Veenendaal" }
    if (code >= 6710 && code <= 6719) return { serviceRadius: "extended", travelEstimateMinutes: 30, cityName: "Ede" }
  }

  // 2. Check city name
  if (normalized.includes("amersfoort") || normalized.includes("leusden")) return { serviceRadius: "core", travelEstimateMinutes: 10, cityName: "Amersfoort" }
  if (normalized.includes("soest") || normalized.includes("baarn")) return { serviceRadius: "core", travelEstimateMinutes: 15, cityName: "Soest" }
  if (normalized.includes("zeist") || normalized.includes("driebergen")) return { serviceRadius: "core", travelEstimateMinutes: 20, cityName: "Zeist" }
  if (normalized.includes("utrecht") || normalized.includes("nieuwegein") || normalized.includes("maarssen")) return { serviceRadius: "core", travelEstimateMinutes: 25, cityName: "Utrecht" }
  if (normalized.includes("hilversum") || normalized.includes("bussum") || normalized.includes("naarden")) return { serviceRadius: "core", travelEstimateMinutes: 20, cityName: "Hilversum" }
  if (normalized.includes("amsterdam") || normalized.includes("almere")) return { serviceRadius: "extended", travelEstimateMinutes: 35, cityName: "Amsterdam / Almere" }
  if (normalized.includes("nijkerk") || normalized.includes("barneveld") || normalized.includes("harderwijk")) return { serviceRadius: "core", travelEstimateMinutes: 20, cityName: "Nijkerk / Barneveld" }

  return { serviceRadius: "extended", travelEstimateMinutes: 35, cityName: locationInput.trim() }
}

export default function PostalCodeChecker({
  navigate,
}: {
  navigate?: (p: Page) => void
}) {
  const { lang } = useLang()
  const [query, setQuery] = useState("")
  const [checkedLocation, setCheckedLocation] = useState("")
  const [result, setResult] = useState<AreaResult | null>(null)

  const tCopy = {
    uk: {
      eyebrow: "Перевірка зони обслуговування",
      title: "Перевірте, чи працює Bouwvast у вашому місті",
      desc: "Ми виконуємо ремонтні та будівельні роботи по всій провінції Утрехт, Північній Голландії, регіоні Гой та прилеглих містах без доплати за виїзд майстра на замір.",
      placeholder: "Введіть поштовий індекс або місто (напр. 3811, 3511 чи Utrecht)...",
      btnCheck: "Перевірити",
      quickLabel: "Популярні міста:",
      coreBadge: "✅ Покриття 100% · Основний регіон робіт",
      coreTitle: "Bouwvast щоденно працює у вашому районі!",
      coreDesc: "Наші майстри знаходяться поруч, тому ми можемо оперативно приїхати для безкоштовного огляду, замірів та розрахунку точного кошторису.",
      extendedBadge: "✓ Розширений регіон робіт",
      extendedTitle: "Так, ми виїжджаємо на об'єкти у вашому регіоні!",
      extendedDesc: "Для комплексних ремонтів, санвузлів та оздоблювальних робіт ми із задоволенням виконаємо ваш проєкт.",
      metaTravel: "Орієнтовний час доїзду:",
      metaMinutes: "хв",
      metaCallout: "Виїзд на замір:",
      metaFree: "Безкоштовно (0€)",
      metaWarranty: "Офіційна гарантія:",
      metaWarrantyVal: "від 2 років",
      btnQuote: "Замовити безкоштовний замір",
      btnWhatsApp: "Швидкий зв'язок у WhatsApp →",
      whatsappMsg: (loc: string) =>
        `Вітаю! Я проживаю у ${loc}. Перевірив на сайті доступність ремонту від Bouwvast. Хотів би проконсультуватися щодо мого об'єкта.`,
    },
    nl: {
      eyebrow: "Werkgebied & Beschikbaarheid",
      title: "Controleer direct of Bouwvast in uw regio actief is",
      desc: "Wij voeren complete renovaties, stucwerk en badkamerverbouwingen uit in Midden-Nederland, Regio Utrecht, 't Gooi en omstreken zonder voorrijkosten voor een opname.",
      placeholder: "Vul uw postcode of plaats in (bijv. 3811, 3511 of Utrecht)...",
      btnCheck: "Controleer",
      quickLabel: "Snel bekijken:",
      coreBadge: "✅ 100% Dekking · Kernwerkgebied",
      coreTitle: "Bouwvast is dagelijks actief in uw regio!",
      coreDesc: "Onze vakmensen zijn regelmatig in de buurt voor vakkundige opnames, maatwerk offertes en uitvoering.",
      extendedBadge: "✓ Uitgebreid werkgebied",
      extendedTitle: "Ja, wij voeren projecten uit in uw regio!",
      extendedDesc: "Voor complete verbouwingen, afbouw en badkamers komen we graag bij u langs voor een vrijblijvend adviesgesprek.",
      metaTravel: "Geschatte reistijd:",
      metaMinutes: "min",
      metaCallout: "Opname op locatie:",
      metaFree: "0€ (Geen voorrijkosten)",
      metaWarranty: "Garantie op werk:",
      metaWarrantyVal: "min. 2 jaar",
      btnQuote: "Vrijblijvende opname plannen",
      btnWhatsApp: "Stel uw vraag via WhatsApp →",
      whatsappMsg: (loc: string) =>
        `Hallo Bouwvast, ik woon in ${loc}. Volgens de postcodecheck vallen we binnen jullie werkgebied. Ik wil graag advies of een offerte aanvragen.`,
    },
    en: {
      eyebrow: "Service Area Coverage",
      title: "Check if Bouwvast operates in your postal code",
      desc: "We deliver full-scale home renovations, bathroom remodeling, and plastering across Utrecht, North Holland, 't Gooi, and surrounding cities with 0€ callout charges for quotes.",
      placeholder: "Enter postal code or city (e.g. 3811, 3511 or Utrecht)...",
      btnCheck: "Check Availability",
      quickLabel: "Popular areas:",
      coreBadge: "✅ 100% Covered · Primary Service Hub",
      coreTitle: "Bouwvast is actively working in your area!",
      coreDesc: "Our craftsmen are nearby every week. We can quickly visit your property for a free in-person measurement and accurate quote.",
      extendedBadge: "✓ Extended Service Region",
      extendedTitle: "Yes, we handle projects in your area!",
      extendedDesc: "For full house remodels, bathrooms, and interior finishing, our team will gladly take on your project.",
      metaTravel: "Estimated travel time:",
      metaMinutes: "min",
      metaCallout: "On-site survey:",
      metaFree: "0€ Free of charge",
      metaWarranty: "Work warranty:",
      metaWarrantyVal: "2+ years",
      btnQuote: "Book Free Survey",
      btnWhatsApp: "Chat on WhatsApp →",
      whatsappMsg: (loc: string) =>
        `Hello Bouwvast, I live in ${loc}. Your service check confirmed you cover my area. I would like a quote for my property renovation.`,
    },
    ru: {
      eyebrow: "Проверка зоны обслуживания",
      title: "Проверьте, работает ли Bouwvast в вашем городе",
      desc: "Мы выполняем ремонты и отделочные работы по всей провинции Утрехт, Северной Голландии, региону Гой и близлежащим городам без доплаты за выезд на замер.",
      placeholder: "Введите почтовый индекс или город (напр. 3811, 3511 или Utrecht)...",
      btnCheck: "Проверить",
      quickLabel: "Популярные города:",
      coreBadge: "✅ Покрытие 100% · Основной регион работ",
      coreTitle: "Bouwvast ежедневно работает в вашем районе!",
      coreDesc: "Наши мастера находятся рядом, поэтому мы оперативно выезжаем для бесплатного осмотра, замеров и составления сметы.",
      extendedBadge: "✓ Расширенный регион работ",
      extendedTitle: "Да, мы берем объекты в вашем регионе!",
      extendedDesc: "Для комплексных ремонтов, санузлов и чистовой отделки мы с удовольствием выполним ваш проект.",
      metaTravel: "Время доезда:",
      metaMinutes: "мин",
      metaCallout: "Выезд на замер:",
      metaFree: "Бесплатно (0€)",
      metaWarranty: "Официальная гарантия:",
      metaWarrantyVal: "от 2 лет",
      btnQuote: "Заказать бесплатный замер",
      btnWhatsApp: "Быстрая связь в WhatsApp →",
      whatsappMsg: (loc: string) =>
        `Здравствуйте! Я живу в ${loc}. Проверил на сайте доступность ремонта от Bouwvast. Хочу проконсультироваться по объекту.`,
    },
  }

  const copy = tCopy[lang as keyof typeof tCopy] ?? tCopy.uk

  const handleCheck = (loc: string) => {
    const trimmed = loc.trim()
    if (!trimmed) return
    setCheckedLocation(trimmed)
    const res = determineServiceArea(trimmed)
    setResult(res)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleCheck(query)
  }

  const handlePillClick = (itemQuery: string, cityName: string) => {
    setQuery(itemQuery)
    setCheckedLocation(cityName)
    const res = determineServiceArea(itemQuery)
    setResult(res)
  }

  const handleQuoteClick = () => {
    const quoteEl = document.getElementById("quote")
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: "smooth" })
    } else if (navigate) {
      navigate("contact")
    }
  }

  return (
    <section className="section bg-white border-y border-[var(--border)]" id="werkgebied-check">
      <div className="container max-w-4xl">
        <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-b from-emerald-50/40 to-white p-6 sm:p-9 shadow-lg">
          <div className="flex items-center gap-2.5 mb-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span>{copy.eyebrow}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--fg)] mb-3 leading-tight">
            {copy.title}
          </h2>

          <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed mb-6">
            {copy.desc}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none">
                📍
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={copy.placeholder}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/15 outline-none font-medium text-slate-800 placeholder-slate-400 text-sm sm:text-base transition-all bg-white"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary whitespace-nowrap py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Icon name="check" size={18} />
              {copy.btnCheck}
            </button>
          </form>

          {/* Quick pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mb-2">
            <span className="font-semibold text-slate-700 mr-1">{copy.quickLabel}</span>
            {POPULAR_QUICK_SEARCHES.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handlePillClick(item.query, item.city)}
                className="px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/60 font-medium transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Instant Result Box */}
          {result && (
            <div className="mt-6 rounded-xl border border-emerald-300 bg-white p-5 sm:p-6 shadow-md transition-all animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-3">
                {result.serviceRadius === "core" ? copy.coreBadge : copy.extendedBadge}
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5">
                {result.serviceRadius === "core" ? copy.coreTitle : copy.extendedTitle}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {result.serviceRadius === "core" ? copy.coreDesc : copy.extendedDesc}
              </p>

              {/* Metrics row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-3 border-y border-slate-100 my-4 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-base">⏱</span>
                  <div>
                    <span className="text-slate-500 block text-xs">{copy.metaTravel}</span>
                    <strong className="text-slate-900 font-bold">ca. {result.travelEstimateMinutes} {copy.metaMinutes}</strong>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base">🚗</span>
                  <div>
                    <span className="text-slate-500 block text-xs">{copy.metaCallout}</span>
                    <strong className="text-emerald-700 font-bold">{copy.metaFree}</strong>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base">🛡️</span>
                  <div>
                    <span className="text-slate-500 block text-xs">{copy.metaWarranty}</span>
                    <strong className="text-slate-900 font-bold">{copy.metaWarrantyVal}</strong>
                  </div>
                </div>
              </div>

              {/* Call to action row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleQuoteClick}
                  className="btn btn-primary text-sm py-2.5 px-5 rounded-lg flex items-center justify-center gap-2"
                >
                  <Icon name="check" size={16} />
                  {copy.btnQuote}
                </button>
                <a
                  href={`https://wa.me/${CONTACT.whatsappRaw}?text=${encodeURIComponent(
                    copy.whatsappMsg(checkedLocation || query || "мій регіон")
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline text-sm py-2.5 px-5 rounded-lg text-emerald-700 border-emerald-300 hover:bg-emerald-50 flex items-center justify-center gap-2"
                >
                  <Icon name="whatsapp" size={16} color="#25D366" />
                  {copy.btnWhatsApp}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
