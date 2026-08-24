import { useState } from "react";
import type { Page } from "../App";
import { useLang } from "../i18n/LangContext";
import ProjectModal, { type ProjectDetail } from "../components/ProjectModal";
import Icon from "../components/Icon";

export default function ProjectenPage({ navigate }: { navigate: (p: Page) => void }) {
  const { t } = useLang();
  const [filter, setFilter] = useState("all");
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);

  const projects: ProjectDetail[] = [
    {
      title: "Complete Keukenrenovatie",
      category: "Keukens",
      city: "Amersfoort Vathorst",
      image: "/images/kitchen-renovation.webp",
      desc: "Volledige vernieuwing van leidingwerk, elektra, tegelwerk en strakke wandafwerking met inbouwverlichting.",
      duration: "2 weken",
      materials: "Knauf stucwerk, Grohe kraanwerk, A-merk LED",
      serviceSlug: "badkamer-keuken",
    },
    {
      title: "Woningrenovatie & Uitbouw",
      category: "Renovatie",
      city: "Leusden",
      image: "/images/renovation-ladder.webp",
      desc: "Turn-key renovatie van een gezinswoning inclusief isolatie, stucwerk en nieuwe binnendeuren.",
      duration: "3.5 weken",
      materials: "Hoogrendementsglas, Sigma lakwerk, vloerverwarming",
      serviceSlug: "renovatie",
    },
    {
      title: "Maatwerk Timmerwerk & Deuren",
      category: "Timmerwerk",
      city: "Soest",
      image: "/images/carpentry-work.webp",
      desc: "Plaatsen van houten kozijnen, binnendeuren en op maat gemaakte inbouwkasten.",
      duration: "1 week",
      materials: "Hardhouten kozijnen, FSC gekeurd hout",
      serviceSlug: "timmerman",
    },
    {
      title: "Badkamer & Sanitair Renovatie",
      category: "Badkamers",
      city: "Utrecht Oost",
      image: "/images/tile-work.webp",
      desc: "Moderne inloopdouche, grootformaat tegels, drain en luxe sanitairinstallatie.",
      duration: "2 weken",
      materials: "Kimband waterdichting, Villeroy & Boch sanitair",
      serviceSlug: "badkamer-keuken",
    },
    {
      title: "Binnen- & Buitenschilderwerk",
      category: "Schilderwerk",
      city: "Hilversum",
      image: "/images/tools-detail.webp",
      desc: "Grondige voorbehandeling, strak sauswerk en hoogwaardig lakwerk aan kozijnen.",
      duration: "4 dagen",
      materials: "Sikkens Alphacryl Pure Mat SF",
      serviceSlug: "schilderwerk",
    },
    {
      title: "Afbouw & Wandmontage",
      category: "Afbouw",
      city: "Baarn",
      image: "/images/tools-rack.webp",
      desc: "Metal-stud wanden, verlaagd plafond met inbouwspots en strak sausklaar stucwerk.",
      duration: "1.5 week",
      materials: "Gyproc gipsplaten, Rockwool isolatie",
      serviceSlug: "afbouw",
    },
  ];

  const categories = [
    { id: "all", label: "Alle projecten", count: projects.length },
    { id: "Renovatie", label: "Renovatie", count: projects.filter(p => p.category === "Renovatie").length },
    { id: "Keukens", label: "Keukens", count: projects.filter(p => p.category === "Keukens").length },
    { id: "Badkamers", label: "Badkamers", count: projects.filter(p => p.category === "Badkamers").length },
    { id: "Timmerwerk", label: "Timmerwerk", count: projects.filter(p => p.category === "Timmerwerk").length },
    { id: "Schilderwerk", label: "Schilderwerk", count: projects.filter(p => p.category === "Schilderwerk").length },
  ];

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <main>
      <section className="hero hero--projects">
        <div className="container">
          <div className="breadcrumb mb-4 text-[#86efac]">
            <button onClick={() => navigate("home")} className="bg-transparent border-0 p-0 text-[#86efac] hover:text-white cursor-pointer">Home</button>
            <span className="mx-2">›</span>
            <span className="text-white font-semibold">{t("nav_projects")}</span>
          </div>
          <h1>{t("projects_title")}</h1>
          <p className="lead-xl max-w-2xl">
            Ontdek een selectie van onze gerealiseerde verbouwingen, renovaties en montagewerken in Midden-Nederland.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2.5 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${filter === cat.id ? 'bg-[var(--brand)] text-white shadow-md' : 'bg-white border border-[var(--border)] text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--brand)]'}`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${filter === cat.id ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="grid grid-3">
            {filtered.map((item, idx) => (
              <article 
                key={idx} 
                className="card p-0 overflow-hidden group cursor-pointer hover:border-[var(--brand)] hover:shadow-xl transition-all flex flex-col justify-between"
                onClick={() => setActiveProject(item)}
              >
                <div>
                  <div className="relative h-60 overflow-hidden bg-gray-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[var(--brand)] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      {item.category}
                    </span>
                    <span className="absolute top-3 right-3 bg-[rgba(15,23,42,0.85)] backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-md">
                      📍 {item.city}
                    </span>
                  </div>
                  <div className="p-6">
                    <h2 className="text-lg font-bold mb-2 group-hover:text-[var(--brand)] transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-xs text-[var(--muted)] leading-relaxed mb-4">{item.desc}</p>
                    
                    <div className="flex items-center gap-4 text-[11px] text-[var(--muted)] pt-3 border-t border-[var(--border)]">
                      <span>⏱ <strong>{item.duration}</strong></span>
                      <span>✓ <strong>Garantie</strong></span>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 flex justify-between items-center">
                  <span className="more text-xs font-bold">
                    Bekijk details &rarr;
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="cta-band">
              <h2>Heeft u een soortgelijk project in gedachten?</h2>
              <p>Leg uw plannen aan ons voor en ontvang een heldere prijsindicatie en planning.</p>
              <button 
                onClick={() => navigate("contact")}
                className="btn btn-white btn-lg"
              >
                <Icon name="check" size={20} />
                Vrijblijvende offerte aanvragen
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Project Lightbox Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onRequestQuote={(slug) => navigate({ type: "service", slug })}
      />
    </main>
  );
}
