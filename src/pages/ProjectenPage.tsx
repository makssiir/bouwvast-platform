import { useState } from "react"
import type { Page } from "../App"
import { useLang } from "../i18n/LangContext"
import ProjectModal, { type ProjectDetail } from "../components/ProjectModal"
import Icon from "../components/Icon"

export default function ProjectenPage({
  navigate,
}: {
  navigate: (p: Page) => void
}) {
  const { t, lang } = useLang()
  const [filter, setFilter] = useState("all")
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null)

  const projectsByLang: Record<string, ProjectDetail[]> = {
    uk: [
      {
        title: "Комплексний ремонт кухні",
        category: "Кухні",
        city: "Амерсфорт Ватгорст",
        image: "/images/kitchen-renovation.webp",
        desc: "Повна заміна труб, електропроводки, укладання плитки та бездоганне оздоблення стін із вбудованим освітленням.",
        duration: "2 тижні",
        materials: "Штукатурка Knauf, змішувачі Grohe, енергоефективне LED-світло",
        serviceSlug: "badkamer-keuken",
      },
      {
        title: "Капітальний ремонт житла та прибудова",
        category: "Реновація",
        city: "Леусден",
        image: "/images/renovation-ladder.webp",
        desc: "Ремонт приватного будинку під ключ, включаючи енергоефективне утеплення, штукатурні роботи та нові міжкімнатні двері.",
        duration: "3.5 тижні",
        materials: "Енергозберігаюче скло, лакофарбові системи Sigma, водяна тепла підлога",
        serviceSlug: "renovatie",
      },
      {
        title: "Індивідуальні столярні роботи та двері",
        category: "Теслярство",
        city: "Суст",
        image: "/images/carpentry-work.webp",
        desc: "Встановлення дерев'яних віконних рам, монтаж дверей та вбудованих шаф за індивідуальними кресленнями.",
        duration: "1 тиждень",
        materials: "Рами з твердих порід деревини, сертифікована FSC деревина",
        serviceSlug: "timmerman",
      },
      {
        title: "Ремонт ванної кімнати та сантехніки",
        category: "Ванні кімнати",
        city: "Утрехт Схід",
        image: "/images/tile-work.webp",
        desc: "Сучасна душова зона, великоформатна кераміка, вбудований зливний трап та елітна сантехніка.",
        duration: "2 тижні",
        materials: "Гідроізоляція Kimband, сантехніка Villeroy & Boch",
        serviceSlug: "badkamer-keuken",
      },
      {
        title: "Внутрішні та зовнішні малярні роботи",
        category: "Малярні роботи",
        city: "Гілверсум",
        image: "/images/tools-detail.webp",
        desc: "Ретельна підготовка поверхонь, дзеркально-гладке фарбування стін та стійке покриття віконних рам.",
        duration: "4 дні",
        materials: "Екологічна матова фарба Sikkens Alphacryl Pure Mat SF",
        serviceSlug: "schilderwerk",
      },
      {
        title: "Чистове оздоблення та перегородки",
        category: "Оздоблення",
        city: "Барн",
        image: "/images/tools-rack.webp",
        desc: "Монтаж гіпсокартонних стін на профілях, багаторівнева стеля зі світильниками та штукатурка під фарбування.",
        duration: "1.5 тижні",
        materials: "Гіпсокартонні плити Gyproc, шумоізоляція Rockwool",
        serviceSlug: "afbouw",
      },
    ],
    en: [
      {
        title: "Complete Kitchen Remodel",
        category: "Kitchens",
        city: "Amersfoort Vathorst",
        image: "/images/kitchen-renovation.webp",
        desc: "Full renewal of plumbing, wiring, tiling, and smooth wall finishing with integrated lighting.",
        duration: "2 weeks",
        materials: "Knauf plaster, Grohe fixtures, premium LED lights",
        serviceSlug: "badkamer-keuken",
      },
      {
        title: "Home Renovation & Extension",
        category: "Renovation",
        city: "Leusden",
        image: "/images/renovation-ladder.webp",
        desc: "Turn-key family house renovation including insulation, plastering, and new interior doors.",
        duration: "3.5 weeks",
        materials: "High-efficiency glazing, Sigma lacquer, underfloor heating",
        serviceSlug: "renovatie",
      },
      {
        title: "Custom Carpentry & Doors",
        category: "Carpentry",
        city: "Soest",
        image: "/images/carpentry-work.webp",
        desc: "Fitting wooden window frames, interior doors, and bespoke built-in closets.",
        duration: "1 week",
        materials: "Hardwood frames, FSC-certified timber",
        serviceSlug: "timmerman",
      },
      {
        title: "Bathroom & Sanitary Remodeling",
        category: "Bathrooms",
        city: "Utrecht East",
        image: "/images/tile-work.webp",
        desc: "Modern walk-in shower, large-format tiling, drain installation, and luxury fixtures.",
        duration: "2 weeks",
        materials: "Kimband waterproofing, Villeroy & Boch sanitary ware",
        serviceSlug: "badkamer-keuken",
      },
      {
        title: "Interior & Exterior Painting",
        category: "Painting",
        city: "Hilversum",
        image: "/images/tools-detail.webp",
        desc: "Meticulous surface preparation, smooth spray painting, and durable window frame coating.",
        duration: "4 days",
        materials: "Sikkens Alphacryl Pure Mat SF",
        serviceSlug: "schilderwerk",
      },
      {
        title: "Drywall & Partition Fitting",
        category: "Finishing",
        city: "Baarn",
        image: "/images/tools-rack.webp",
        desc: "Metal-stud partition walls, suspended ceilings with spotlights, and paint-ready plastering.",
        duration: "1.5 weeks",
        materials: "Gyproc drywall, Rockwool acoustic insulation",
        serviceSlug: "afbouw",
      },
    ],
    nl: [
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
    ],
  }

  const projects = projectsByLang[lang] ?? projectsByLang.uk

  const categoryLabels: Record<string, Record<string, string>> = {
    uk: {
      all: "Всі проєкти",
      Renovatie: "Реновація",
      Keukens: "Кухні",
      Badkamers: "Ванні кімнати",
      Timmerwerk: "Теслярство",
      Schilderwerk: "Малярні роботи",
      Afbouw: "Оздоблення",
    },
    en: {
      all: "All Projects",
      Renovatie: "Renovation",
      Keukens: "Kitchens",
      Badkamers: "Bathrooms",
      Timmerwerk: "Carpentry",
      Schilderwerk: "Painting",
      Afbouw: "Finishing",
    },
    nl: {
      all: "Alle projecten",
      Renovatie: "Renovatie",
      Keukens: "Keukens",
      Badkamers: "Badkamers",
      Timmerwerk: "Timmerwerk",
      Schilderwerk: "Schilderwerk",
      Afbouw: "Afbouw",
    },
  }

  const catMap = categoryLabels[lang] ?? categoryLabels.uk

  const uniqueCats = Array.from(new Set(projects.map((p) => p.category)))
  const categories = [
    { id: "all", label: catMap.all ?? "Alle projecten", count: projects.length },
    ...uniqueCats.map((cat) => ({
      id: cat,
      label: catMap[cat] ?? cat,
      count: projects.filter((p) => p.category === cat).length,
    })),
  ]

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter)

  const heroLead =
    lang === "uk"
      ? "Добірка наших реалізованих ремонтів, реновацій та монтажних робіт у Нідерландах."
      : lang === "ru"
        ? "Подборка наших реализованных ремонтов, реконструкций и отделочных работ в Нидерландах."
        : lang === "en"
          ? "Explore a selection of our completed renovations, remodeling, and carpentry projects across the Netherlands."
          : "Ontdek een selectie van onze gerealiseerde verbouwingen, renovaties en montagewerken in Midden-Nederland."

  return (
    <main>
      <section className="hero hero--projects">
        <div className="container">
          <div className="breadcrumb mb-4 text-[#86efac]">
            <button
              onClick={() => navigate("home")}
              className="bg-transparent border-0 p-0 text-[#86efac] hover:text-white cursor-pointer"
            >
              {t("nav_about")}
            </button>
            <span className="mx-2">›</span>
            <span className="text-white font-semibold">
              {t("nav_projects")}
            </span>
          </div>
          <h1>{t("projects_title")}</h1>
          <p className="lead-xl max-w-2xl">{heroLead}</p>
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
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  filter === cat.id
                    ? "bg-[var(--brand)] text-white shadow-md"
                    : "bg-white border border-[var(--border)] text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--brand)]"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    filter === cat.id
                      ? "bg-white/25 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item, idx) => (
              <article
                key={idx}
                className="card p-0 overflow-hidden group cursor-pointer hover:border-[var(--brand)] hover:shadow-2xl transition-all flex flex-col justify-between rounded-2xl"
                onClick={() => setActiveProject(item)}
              >
                <div>
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-gray-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-[var(--brand)] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                      {item.category}
                    </span>
                    <span className="absolute top-4 right-4 bg-[rgba(15,23,42,0.85)] backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-md">
                      📍 {item.city}
                    </span>
                  </div>
                  <div className="p-6">
                    <h2 className="text-lg font-bold mb-2.5 group-hover:text-[var(--brand)] transition-colors leading-snug">
                      {item.title}
                    </h2>
                    <p className="text-xs text-[var(--muted)] leading-relaxed mb-4 line-clamp-3">
                      {item.desc}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-[var(--muted)] pt-3 border-t border-[var(--border)]">
                      <span>
                        ⏱ <strong>{item.duration}</strong>
                      </span>
                      <span>
                        ✓ <strong>{lang === "uk" ? "Гарантія" : lang === "ru" ? "Гарантия" : lang === "en" ? "Warranty" : "Garantie"}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 flex justify-between items-center">
                  <span className="more text-xs font-bold">
                    {lang === "uk" ? "Деталі проєкту" : lang === "ru" ? "Детали проекта" : lang === "en" ? "View details" : "Bekijk details"} &rarr;
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="cta-band">
              <h2>
                {lang === "uk"
                  ? "Маєте схожий проєкт або ремонт у планах?"
                  : lang === "ru"
                    ? "Планируете похожий проект или ремонт?"
                    : lang === "en"
                      ? "Have a similar project in mind?"
                      : "Heeft u een soortgelijk project in gedachten?"}
              </h2>
              <p>
                {lang === "uk"
                  ? "Поділіться своїми планами з нами та отримайте детальний орієнтир цін і графік виконання."
                  : lang === "ru"
                    ? "Поделитесь своими планами и получите детальный расчет стоимости и сроки."
                    : lang === "en"
                      ? "Share your plans with us and receive a transparent quote and project timeline."
                      : "Leg uw plannen aan ons voor en ontvang een heldere prijsindicatie en planning."}
              </p>
              <button
                onClick={() => navigate("contact")}
                className="btn btn-white btn-lg"
              >
                <Icon name="check" size={20} />
                {t("cta_btn")}
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
  )
}
