import { useState } from "react"
import PageHero from "../components/PageHero"
import type { Page } from "../lib/routes"
import { ARTICLES } from "../data/articles"
import { imageSize } from "../data/images"
import { useLang } from "../i18n/LangContext"
import PageLink from "../components/PageLink"
import More from "../components/More"
import Icon from "../components/Icon"

export default function KennisbankPage({ navigate }: { navigate: (p: Page) => void }) {
  const { t, lang, pick } = useLang()
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", label: pick({ nl: "Alle artikelen", en: "All articles", uk: "Усі статті", ru: "Все статьи" }) },
    ...Array.from(new Set(ARTICLES.map((a) => a.category))).map((c) => ({ id: c, label: c })),
  ]

  const filtered =
    selectedCategory === "all" ? ARTICLES : ARTICLES.filter((a) => a.category === selectedCategory)

  return (
    <>
      <PageHero
        navigate={navigate}
        crumbs={[{ label: t("nav_kennisbank") }]}
        eyebrow={pick({ nl: "Advies & tips", en: "Advice & tips", uk: "Поради та рекомендації", ru: "Советы и рекомендации" })}
        title={t("kb_page_title")}
        lead={t("kb_page_sub")}
      />

      <section className="section">
        <div className="container">
          {lang !== "nl" && <p className="notice max-w-3xl">{t("kb_dutch_only")}</p>}

          <div
            className="chip-row"
            role="group"
            aria-label={pick({ nl: "Filter op onderwerp", en: "Filter by topic", uk: "Фільтр за темою", ru: "Фильтр по теме" })}
          >
            {categories.map((c) => (
              <button
                type="button"
                key={c.id}
                aria-pressed={selectedCategory === c.id}
                onClick={() => setSelectedCategory(c.id)}
                className="chip"
              >
                {c.label}
              </button>
            ))}
          </div>

          <ul className="grid grid-2 m-0 list-none p-0">
            {filtered.map((article) => (
              <li key={article.slug}>
                <article className="card article-card article-card--media">
                  <div className="article-card-media">
                    <img src={article.image} alt="" {...imageSize(article.image)} loading="lazy" decoding="async" />
                  </div>
                  <div className="article-card-body">
                    <div className="article-meta">
                      <span className="tag">{article.category}</span>
                      <span className="inline-flex items-center gap-1.5">
                        <Icon name="clock" size={14} />
                        {article.readTime}
                      </span>
                    </div>
                    <h2>
                      <PageLink to={{ type: "article", slug: article.slug }} navigate={navigate}>
                        {article.title}
                      </PageLink>
                    </h2>
                    <p>{article.excerpt}</p>
                    <More hidden>{t("kb_read_article")}</More>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
