import { useState } from "react"
import type { Page } from "../lib/routes"
import { useLang } from "../i18n/LangContext"
import ProjectModal from "../components/ProjectModal"
import Breadcrumb from "../components/Breadcrumb"
import PageLink from "../components/PageLink"
import Icon from "../components/Icon"
import { PROJECTS, type Project } from "../data/projects"
import { SERVICES } from "../data/services"
import { claim } from "../data/claims"
import { scrollToQuote } from "../lib/quoteDraft"

/**
 * Shows real, approved projects only. Until there are any, the page says so
 * plainly (and is excluded from the sitemap) instead of showing stock photos
 * labelled as completed work.
 */
export default function ProjectenPage({ navigate }: { navigate: (p: Page) => void }) {
  const { t, pick } = useLang()
  const [filter, setFilter] = useState("all")
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const projects = claim("projects") ? PROJECTS : []
  const categories = Array.from(new Set(projects.map((p) => pick(p.category))))
  const filtered = filter === "all" ? projects : projects.filter((p) => pick(p.category) === filter)

  return (
    <>
      <section className="hero hero--projects">
        <div className="container">
          <Breadcrumb navigate={navigate} items={[{ label: t("nav_projects") }]} />
          <h1>{t("projects_title")}</h1>
          <p className="lead-xl max-w-2xl">{t("projects_sub")}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {projects.length === 0 ? (
            <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
              <img
                src="/projectfoto-volgt.webp"
                alt=""
                width={1200}
                height={800}
                decoding="async"
                className="w-full rounded-2xl border border-[var(--border)]"
              />
              <div>
                <h2>
                  {pick({
                    nl: "Projectfoto's volgen binnenkort",
                    en: "Project photos coming soon",
                    uk: "Фото проєктів незабаром",
                    ru: "Фото проектов скоро появятся",
                  })}
                </h2>
                <p className="text-[var(--muted)] mb-6">
                  {pick({
                    nl: "We publiceren hier alleen eigen projecten, met toestemming van de opdrachtgever. Wilt u weten wat we voor u kunnen doen? Bekijk onze diensten of beschrijf uw project.",
                    en: "We only publish our own projects here, with the client's permission. Want to know what we can do for you? See our services or describe your project.",
                    uk: "Тут ми публікуємо лише власні проєкти — за згодою замовника. Хочете дізнатися, що ми можемо зробити для вас? Перегляньте послуги або опишіть свій проєкт.",
                    ru: "Здесь мы публикуем только собственные проекты — с согласия заказчика. Хотите узнать, что мы можем сделать для вас? Посмотрите услуги или опишите свой проект.",
                  })}
                </p>
                <ul className="flex flex-wrap gap-2 list-none p-0 mb-6">
                  {SERVICES.map((service) => (
                    <li key={service.slug}>
                      <PageLink
                        to={{ type: "service", slug: service.slug }}
                        navigate={navigate}
                        className="inline-block px-3 py-1.5 rounded-full text-xs font-bold border border-[var(--border)] text-[var(--fg)] no-underline hover:border-[var(--brand)]"
                      >
                        {t(service.nameKey)}
                      </PageLink>
                    </li>
                  ))}
                </ul>
                <PageLink to="contact" navigate={navigate} className="btn btn-primary no-underline">
                  <Icon name="check" size={18} />
                  {t("cta_btn")}
                </PageLink>
              </div>
            </div>
          ) : (
            <>
              {categories.length > 1 && (
                <div className="flex flex-wrap gap-2.5 justify-center mb-12" role="group">
                  {["all", ...categories].map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      aria-pressed={filter === cat}
                      onClick={() => setFilter(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        filter === cat
                          ? "bg-[var(--brand)] text-white shadow-md"
                          : "bg-white border border-[var(--border)] text-[var(--muted)] hover:text-[var(--fg)]"
                      }`}
                    >
                      {cat === "all" ? pick({ nl: "Alle", en: "All", uk: "Усі", ru: "Все" }) : cat}
                    </button>
                  ))}
                </div>
              )}

              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none p-0">
                {filtered.map((item) => (
                  <li key={item.id} className="card p-0 overflow-hidden flex flex-col rounded-2xl">
                    <img
                      src={item.image}
                      alt={pick(item.imageAlt)}
                      width={item.imageWidth}
                      height={item.imageHeight}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-xs font-bold text-[var(--brand)] mb-1">
                        {pick(item.category)} · {item.city}
                      </span>
                      <h2 className="text-lg font-bold mb-2.5 leading-snug">{pick(item.title)}</h2>
                      <p className="text-sm text-[var(--muted)] leading-relaxed mb-4 line-clamp-3">
                        {pick(item.description)}
                      </p>
                      <button
                        type="button"
                        onClick={() => setActiveProject(item)}
                        className="more text-sm font-bold bg-transparent border-0 p-0 cursor-pointer text-left mt-auto"
                      >
                        {pick({ nl: "Bekijk details", en: "View details", uk: "Деталі проєкту", ru: "Детали проекта" })} &rarr;
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onRequestQuote={(slug) => {
          navigate({ type: "service", slug })
          setTimeout(() => scrollToQuote(), 0)
        }}
      />
    </>
  )
}
