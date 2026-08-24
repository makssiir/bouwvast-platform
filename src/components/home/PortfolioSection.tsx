import type { Page } from "../../App";
import { useLang } from "../../i18n/LangContext";
import { SectionLabel, H2 } from "../../pages/HomePage";

const PORTFOLIO = [
  {
    photo: "photo-1616594039964-ae9021a400a0",
    title: "Badkamerrenovatie",
    city: "Amersfoort",
    type: "Badkamer & Keuken",
    desc: "Complete renovatie van badkamer inclusief afwerking, tegelwerk en montage.",
  },
  {
    photo: "photo-1600585154340-be6161a56a0c",
    title: "Complete woonhuisrenovatie",
    city: "Utrecht",
    type: "Renovatie",
    desc: "Volledige renovatie van een woning uit 1975, inclusief nieuwe keuken en badkamer.",
  },
  {
    photo: "photo-1558618666-fcd25c85cd64",
    title: "Buitenschilderwerk",
    city: "Soest",
    type: "Schilderwerk",
    desc: "Volledig buitenschilderwerk van een vrijstaande woning, inclusief dakranden.",
  },
  {
    photo: "photo-1484154218962-a197022b5858",
    title: "Keukenplaatsing",
    city: "Hilversum",
    type: "Badkamer & Keuken",
    desc: "Demontage oude keuken, nieuwbouw inclusief tegels en aansluiting.",
  },
  {
    photo: "photo-1503387762-592deb58ef4e",
    title: "Gevelrenovatie",
    city: "Leusden",
    type: "Gevel & Buitenwerk",
    desc: "Herstel en reiniging van gevelstenen, inclusief voegwerk.",
  },
  {
    photo: "photo-1631889993959-41b4e9c6e3c5",
    title: "Afbouw nieuwbouwwoning",
    city: "Zeist",
    type: "Afbouw",
    desc: "Volledige afbouw van een nieuwbouwwoning, wanden, plafonds en vloeren.",
  },
];

const PHOTOS = [
  "/images/kitchen-renovation.webp",
  "/images/carpentry-work.webp", 
  "/images/tile-work.webp", 
  "/images/tools-detail.webp", 
  "/images/site-team.webp", 
  "/images/tools-rack.webp"
];

export default function PortfolioSection({ navigate }: { navigate: (p: Page) => void }) {
  const { t } = useLang();
  
  return (
    <section className="bg-canvas border-y border-border/40">
      <div className="max-w-6xl mx-auto px-6 py-32">
        <SectionLabel>{t("portfolio_label")}</SectionLabel>
      <div className="flex items-end justify-between mb-16">
        <H2>{t("portfolio_title")}</H2>
        <button
          onClick={() => navigate("projecten")}
          className="hidden md:flex items-center gap-2 text-sm font-semibold transition-all hover:opacity-70 text-brand font-body group"
        >
          {t("portfolio_all")}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {PORTFOLIO.map((p, index) => (
          <div
            key={p.title}
            onClick={() => navigate("projecten")}
            className="group rounded-2xl overflow-hidden border cursor-pointer bg-card border-border/60 hover:border-brand/40 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-[fade-in-up_0.6s_ease-out_both]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="overflow-hidden relative" style={{ height: 260 }}>
              <img
                src={PHOTOS[index % PHOTOS.length]}
                alt={p.title}
                width={1200}
                height={800}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand/10 text-brand font-body">
                  {p.type}
                </span>
                <span className="text-xs text-muted font-body flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  {p.city}
                </span>
              </div>
              <h3 className="font-bold text-xl mb-2 font-display text-dark group-hover:text-brand transition-colors">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted font-body">
                {p.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center md:hidden">
        <button
          onClick={() => navigate("projecten")}
          className="px-8 py-3.5 rounded-md border border-brand/30 text-brand font-semibold text-sm hover:bg-brand hover:text-white transition-all duration-300"
        >
          {t("portfolio_all")}
        </button>
        </div>
      </div>
    </section>
  );
}
