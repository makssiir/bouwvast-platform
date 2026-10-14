import React from "react"
import Icon from "../Icon"
import { useLang } from "../../i18n/LangContext"
import { CONTACT } from "../../data/contact"
import type { Page } from "../../App"

export default function BottomConversionBand({
  navigate,
}: {
  navigate?: (p: Page) => void
}) {
  const { lang } = useLang()

  const copy = {
    uk: {
      eyebrow: "Швидкий початок ремонту",
      title: "Готові до прозорого та якісного ремонту без сюрпризів?",
      sub: "Надішліть фото приміщення або план у WhatsApp для швидкої оцінки за 30 хвилин, або замовте детальний прорахунок кошторису на сайті.",
      waBtn: "Надіслати фото у WhatsApp",
      quoteBtn: "Замовити детальний розрахунок",
      badge1: "🛡️ Офіційна гарантія від 2 років",
      badge2: "⚡ Фіксований кошторис без доплат",
      badge3: "💬 Відповідь у WhatsApp за 30 хвилин",
      waMsg: "Вітаю, Bouwvast! Хочу проконсультуватися щодо вартості ремонту та надіслати фото об'єкта.",
    },
    nl: {
      eyebrow: "Snel & Zorgeloos Starten",
      title: "Klaar voor een strakke verbouwing zonder verrassingen?",
      sub: "Deel een foto van uw werksituatie via WhatsApp voor snel advies en een richtprijs binnen 30 minuten, of vraag online een gedetailleerde offerte aan.",
      waBtn: "Stuur foto’s via WhatsApp",
      quoteBtn: "Vrijblijvende offerte aanvragen",
      badge1: "🛡️ Minimaal 2 jaar garantie op werk",
      badge2: "⚡ 100% Vaste prijsafspraak vooraf",
      badge3: "💬 Reactie via WhatsApp binnen 30 min",
      waMsg: "Hallo Bouwvast, ik wil graag advies of een offerte voor mijn verbouwing. Ik stuur hierbij foto’s van de situatie.",
    },
    en: {
      eyebrow: "Fast & Reliable Start",
      title: "Ready for a seamless renovation without unexpected costs?",
      sub: "Send photos of your current space or floor plan via WhatsApp for a quick estimate within 30 minutes, or request a detailed quote online.",
      waBtn: "Send photos via WhatsApp",
      quoteBtn: "Request detailed quote",
      badge1: "🛡️ Minimum 2-year formal warranty",
      badge2: "⚡ 100% Fixed upfront price quotes",
      badge3: "💬 Fast WhatsApp reply in 30 mins",
      waMsg: "Hello Bouwvast, I would like advice or a quote for my renovation project. Here are photos of the current space.",
    },
    ru: {
      eyebrow: "Быстрый старт ремонта",
      title: "Готовы к качественному ремонту без непредвиденных расходов?",
      sub: "Отправьте фото объекта или план в WhatsApp для быстрой оценки за 30 минут, или закажите подробный сметный расчет онлайн.",
      waBtn: "Отправить фото в WhatsApp",
      quoteBtn: "Заказать подробный расчет",
      badge1: "🛡️ Официальная гарантия от 2 лет",
      badge2: "⚡ Фиксированная смета без доплат",
      badge3: "💬 Ответ в WhatsApp за 30 минут",
      waMsg: "Здравствуйте, Bouwvast! Хочу проконсультироваться по стоимости ремонта и прислать фото объекта.",
    },
  }[lang] ?? {
    eyebrow: "Швидкий початок ремонту",
    title: "Готові до прозорого та якісного ремонту без сюрпризів?",
    sub: "Надішліть фото приміщення у WhatsApp для оцінки за 30 хвилин або замовте детальний прорахунок.",
    waBtn: "Надіслати фото у WhatsApp",
    quoteBtn: "Замовити детальний розрахунок",
    badge1: "🛡️ Офіційна гарантія від 2 років",
    badge2: "⚡ Фіксований кошторис без доплат",
    badge3: "💬 Відповідь у WhatsApp за 30 хвилин",
    waMsg: "Вітаю, Bouwvast! Хочу проконсультуватися щодо ремонту.",
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
    <section className="section section--muted">
      <div className="container">
        <div className="rounded-3xl bg-gradient-to-br from-[#0c2d18] via-[#0f3d22] to-[#0b1c2e] text-white p-8 sm:p-12 text-center shadow-2xl border border-emerald-500/20 relative overflow-hidden">
          {/* Subtle glow background */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30">
              {copy.eyebrow}
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
              {copy.title}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              {copy.sub}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
              <a
                href={`https://wa.me/${CONTACT.whatsappRaw}?text=${encodeURIComponent(copy.waMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-white bg-[#25D366] hover:bg-[#20ba59] transition-all shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <Icon name="whatsapp" size={20} color="#fff" />
                <span>{copy.waBtn}</span>
              </a>

              <button
                type="button"
                onClick={handleQuoteClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-md hover:-translate-y-0.5 text-sm sm:text-base cursor-pointer"
              >
                <Icon name="check" size={18} color="var(--brand)" />
                <span>{copy.quoteBtn}</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-6 border-t border-emerald-500/20 text-xs sm:text-sm text-slate-300">
              <span>{copy.badge1}</span>
              <span>{copy.badge2}</span>
              <span>{copy.badge3}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
