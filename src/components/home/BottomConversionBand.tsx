import Icon from "../Icon"
import { useLang } from "../../i18n/LangContext"
import { whatsappHref } from "../../data/contact"
import { scrollToQuote } from "../../lib/quoteDraft"
import type { Page } from "../../App"

export default function BottomConversionBand({
  navigate,
}: {
  navigate?: (p: Page) => void
}) {
  const { pick } = useLang()

  const copy = pick({
    nl: {
      title: "Klaar om uw verbouwing te bespreken?",
      sub: "Beschrijf uw plannen in het aanvraagformulier. U ontvangt een gespecificeerde offerte voordat er iets wordt afgesproken.",
      waBtn: "Stuur foto's via WhatsApp",
      quoteBtn: "Vrijblijvende offerte aanvragen",
      waMsg: "Hallo Bouwvast, ik wil graag advies of een offerte voor mijn verbouwing.",
    },
    en: {
      title: "Ready to discuss your renovation?",
      sub: "Describe your plans in the request form. You receive an itemised quote before anything is agreed.",
      waBtn: "Send photos via WhatsApp",
      quoteBtn: "Request a no-obligation quote",
      waMsg: "Hello Bouwvast, I would like advice or a quote for my renovation.",
    },
    uk: {
      title: "Готові обговорити свій ремонт?",
      sub: "Опишіть свої плани у формі запиту. Ви отримаєте детальну пропозицію, перш ніж щось буде погоджено.",
      waBtn: "Надіслати фото у WhatsApp",
      quoteBtn: "Замовити пропозицію без зобов'язань",
      waMsg: "Вітаю, Bouwvast! Хочу отримати консультацію або пропозицію щодо ремонту.",
    },
    ru: {
      title: "Готовы обсудить свой ремонт?",
      sub: "Опишите свои планы в форме запроса. Вы получите детальное предложение до того, как что-либо будет согласовано.",
      waBtn: "Отправить фото в WhatsApp",
      quoteBtn: "Запросить предложение без обязательств",
      waMsg: "Здравствуйте, Bouwvast! Хочу получить консультацию или предложение по ремонту.",
    },
  })
  const wa = whatsappHref(copy.waMsg)

  return (
    <section className="section section--muted" aria-labelledby="bottom-cta-title">
      <div className="container">
        <div className="rounded-3xl bg-gradient-to-br from-[#0c2d18] via-[#0f3d22] to-[#0b1c2e] text-white p-8 sm:p-12 text-center shadow-2xl border border-emerald-500/20">
          <div className="max-w-3xl mx-auto">
            <h2 id="bottom-cta-title" className="text-2xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
              {copy.title}
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto">{copy.sub}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={() => {
                  if (!scrollToQuote()) navigate?.("contact")
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-900 bg-white hover:bg-slate-100 transition-colors shadow-md text-sm sm:text-base cursor-pointer border-0"
              >
                <Icon name="check" size={18} color="var(--brand)" />
                <span>{copy.quoteBtn}</span>
              </button>
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-white border-2 border-white/60 hover:bg-white/10 transition-colors text-sm sm:text-base no-underline"
                >
                  <Icon name="whatsapp" size={20} color="#fff" />
                  <span>{copy.waBtn}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
