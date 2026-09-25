import { useLang } from "../../i18n/LangContext"

export default function WhyUsSection() {
  const { t } = useLang()

  const reasons = [
    { title: "Eén vast aanspreekpunt", desc: "Van eerste contact tot oplevering: altijd dezelfde projectcoördinator." },
    { title: "Vaste prijzen vooraf", desc: "Transparante calculaties zonder verrassingen achteraf." },
    { title: "Vakkundige garantie", desc: "Op alle werkzaamheden en materialen bieden wij volledige kwaliteitsgarantie." },
    { title: "25+ jaar ervaring", desc: "Bewezen vakmanschap met meer dan 1.500 succesvol opgeleverde projecten." },
  ]

  return (
    <section className="bg-card relative section">
      <div className="container relative">
        {/* Subtle background decoration */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-brand/5 rounded-full blur-3xl -z-10" />

        <span className="eyebrow">{t("whyus_label")}</span>
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <h2 className="mb-6 leading-tight">{t("whyus_title")}</h2>
            <p className="text-base leading-relaxed text-muted font-body max-w-[44ch]">
              {t("whyus_sub")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12">
            {reasons.map((r, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-brand/20 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-brand/40 bg-brand font-display">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-bold text-lg font-display text-dark mb-2 group-hover:text-brand transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted font-body">
                    {r.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
