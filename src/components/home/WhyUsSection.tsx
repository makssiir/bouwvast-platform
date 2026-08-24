import { useLang } from "../../i18n/LangContext";
import { SectionLabel, H2 } from "../../pages/HomePage";

export default function WhyUsSection() {
  const { t } = useLang();
  
  const reasons = [
    { titleKey: "whyus_1_title", descKey: "whyus_1_desc" },
    { titleKey: "whyus_2_title", descKey: "whyus_2_desc" },
    { titleKey: "whyus_3_title", descKey: "whyus_3_desc" },
    { titleKey: "whyus_4_title", descKey: "whyus_4_desc" },
  ];

  return (
    <section className="bg-card relative">
      <div className="max-w-6xl mx-auto px-6 py-32 relative">
      {/* Subtle background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-brand/5 rounded-full blur-3xl -z-10" />
      
      <SectionLabel>{t("whyus_label")}</SectionLabel>
      <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
        <div className="animate-[fade-in-up_0.6s_ease-out_both]">
          <H2 className="mb-6 leading-tight">{t("whyus_title")}</H2>
          <p className="text-base leading-relaxed text-muted font-body max-w-[44ch]">
            {t("whyus_sub")}
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12">
          {reasons.map((r, i) => (
            <div 
              key={r.titleKey} 
              className="flex flex-col gap-4 group animate-[fade-in-up_0.6s_ease-out_both]"
              style={{ animationDelay: `${(i + 1) * 150}ms` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-brand/20 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-brand/40 bg-brand font-display"
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="font-bold text-lg font-display text-dark mb-2 group-hover:text-brand transition-colors">
                  {t(r.titleKey as Parameters<typeof t>[0])}
                </h3>
                <p className="text-sm leading-relaxed text-muted font-body">
                  {t(r.descKey as Parameters<typeof t>[0])}
                </p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
