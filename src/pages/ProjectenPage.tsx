import { useState } from "react"
import PageHero from "../components/PageHero"
import type { Page } from "../lib/routes"
import { useLang } from "../i18n/LangContext"
import ProjectModal from "../components/ProjectModal"
import PageLink from "../components/PageLink"
import Icon from "../components/Icon"
import More from "../components/More"
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
      <PageHero
        navigate={navigate}
        crumbs={[{ label: t("nav_projects") }]}
        eyebrow={t("nav_projects")}
        title={t("projects_title")}
        lead={t("projects_sub")}
      />

      <section className="section">
        <div className="container">
          {projects.length === 0 ? (
            <div className="empty-state">
              <img src="/projectfoto-volgt.webp" alt="" width={1200} height={800} decoding="async" />
              <div>
                <h2>
                  {pick({
                    nl: "Projectfoto's volgen binnenkort",
                    en: "Project photos coming soon",
                    uk: "Фото проєктів незабаром",
                    ru: "Фото проектов скоро появятся",
                  })}
                </h2>
                <p className="mb-6 text-[1.0625rem] text-muted">
                  {pick({
                    nl: "We publiceren hier alleen eigen projecten, met toestemming van de opdrachtgever. Wilt u weten wat we voor u kunnen doen? Bekijk onze diensten of beschrijf uw project.",
                    en: "We only publish our own projects here, with the client's permission. Want to know what we can do for you? See our services or describe your project.",
                    uk: "Тут ми публікуємо лише власні проєкти — за згодою замовника. Хочете дізнатися, що ми можемо зробити для вас? Перегляньте послуги або опишіть свій проєкт.",
                    ru: "Здесь мы публикуем только собственные проекты — с согласия заказчика. Хотите узнать, что мы можем сделать для вас? Посмотрите услуги или опишите свой проект.",
                  })}
                </p>
                <ul className="chip-row mb-8">
                  {SERVICES.map((service) => (
                    <li key={service.slug}>
                      <PageLink to={{ type: "service", slug: service.slug }} navigate={navigate} className="chip">
                        {t(service.nameKey)}
                      </PageLink>
                    </li>
                  ))}
                </ul>
                <PageLink to="contact" navigate={navigate} className="btn btn-primary">
                  {t("cta_btn")}
                  <span className="btn-arrow" aria-hidden="true">
                    <Icon name="arrow-right" size={18} />
                  </span>
                </PageLink>
              </div>
            </div>
          ) : (
            <>
              {categories.length > 1 && (
                <div
                  className="chip-row"
                  role="group"
                  aria-label={pick({ nl: "Filter op soort werk", en: "Filter by type of work", uk: "Фільтр за видом робіт", ru: "Фильтр по виду работ" })}
                >
                  {["all", ...categories].map((cat) => (
                    <button type="button" key={cat} aria-pressed={filter === cat} onClick={() => setFilter(cat)} className="chip">
                      {cat === "all" ? pick({ nl: "Alle", en: "All", uk: "Усі", ru: "Все" }) : cat}
                    </button>
                  ))}
                </div>
              )}

              <ul className="grid grid-3 m-0 list-none p-0">
                {filtered.map((item) => (
                  <li key={item.id} className="card article-card article-card--media">
                    <div className="article-card-media">
                      <img
                        src={item.image}
                        alt={pick(item.imageAlt)}
                        width={item.imageWidth}
                        height={item.imageHeight}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="article-card-body">
                      <div className="article-meta">
                        <span className="tag">{pick(item.category)}</span>
                        <span className="inline-flex items-center gap-1.5">
                          <Icon name="pin" size={14} />
                          {item.city}
                        </span>
                      </div>
                      <h2>{pick(item.title)}</h2>
                      <p className="line-clamp-3">{pick(item.description)}</p>
                      <button
                        type="button"
                        onClick={() => setActiveProject(item)}
                        className="mt-auto cursor-pointer self-start border-0 bg-transparent p-0 text-left"
                      >
                        <More>{pick({ nl: "Bekijk details", en: "View details", uk: "Деталі проєкту", ru: "Детали проекта" })}</More>
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
