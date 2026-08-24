import type { Page } from "../../App";
import { useLang } from "../../i18n/LangContext";
import { SectionLabel, H2 } from "../../pages/HomePage"; 

export default function ProjectTypesSection({ navigate }: { navigate: (p: Page) => void }) {
  const { t } = useLang();
  
  const types = [
    {
      titleKey: "type_small_title",
      descKey: "type_small_desc",
      img: "/images/tools-detail.webp",
      examples: ["Schilderwerk", "Kleine reparaties", "Montagewerk", "Onderhoud"],
    },
    {
      titleKey: "type_reno_title",
      descKey: "type_reno_desc",
      img: "/images/kitchen-renovation.webp",
      examples: ["Badkamer", "Keuken", "Woonkamer", "Slaapkamer"],
    },
    {
      titleKey: "type_large_title",
      descKey: "type_large_desc",
      img: "/images/site-team.webp",
      examples: ["Aanbouw", "Gevelrenovatie", "Complete verbouwing", "Nieuwbouw afbouw"],
    },
  ];

  return (
    <section className="bg-dark py-32 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-dark-2 to-transparent opacity-50" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionLabel white>{t("types_label")}</SectionLabel>
        <H2 white className="mb-16">{t("types_title")}</H2>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {types.map((tp, index) => (
            <div 
              key={tp.titleKey} 
              className="rounded-2xl overflow-hidden relative group cursor-pointer shadow-2xl animate-[fade-in-up_0.6s_ease-out_both]"
              style={{ minHeight: 400, animationDelay: `${index * 150}ms` }}
              onClick={() => navigate("contact")}
            >
              <img
                src={tp.img}
                alt={t(tp.titleKey as Parameters<typeof t>[0])}
                width={1200}
                height={800}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ opacity: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent transition-opacity duration-300 group-hover:from-dark" />
              
              <div className="relative p-8 h-full flex flex-col justify-end transform transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="text-2xl font-bold text-white mb-3 font-display drop-shadow-md">
                  {t(tp.titleKey as Parameters<typeof t>[0])}
                </h3>
                <p className="text-sm mb-6 text-white/70 font-body leading-relaxed group-hover:text-white/90 transition-colors">
                  {t(tp.descKey as Parameters<typeof t>[0])}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tp.examples.map((e) => (
                    <span 
                      key={e} 
                      className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-white/80 font-body border border-white/5 backdrop-blur-sm transition-colors group-hover:bg-brand/20 group-hover:text-brand-light group-hover:border-brand/30"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate("contact")}
            className="px-10 py-4 rounded-md text-white font-semibold text-sm border border-white/20 transition-all duration-300 hover:bg-white hover:text-dark hover:scale-105 font-body shadow-lg"
          >
            {t("types_discuss")}
          </button>
        </div>
      </div>
    </section>
  );
}
