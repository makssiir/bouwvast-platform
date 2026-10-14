import { useState } from "react"
import type { Page } from "../lib/routes"
import { ARTICLES } from "../data/articles"
import { imageSize } from "../data/images"
import { useLang } from "../i18n/LangContext"
import Breadcrumb from "../components/Breadcrumb"
import PageLink from "../components/PageLink"

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
      <section className="hero hero--service">
        <div className="container">
          <Breadcrumb navigate={navigate} items={[{ label: t("nav_kennisbank") }]} />
          <h1>{t("kb_page_title")}</h1>
          <p className="lead-xl max-w-2xl">{t("kb_page_sub")}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {lang !== "nl" && (
            <p className="notice max-w-3xl mx-auto">{t("kb_dutch_only")}</p>
          )}

          <div
            className="flex flex-wrap gap-2 justify-center mb-12"
            role="group"
            aria-label={pick({ nl: "Filter op onderwerp", en: "Filter by topic", uk: "Фільтр за темою", ru: "Фильтр по теме" })}
          >
            {categories.map((c) => (
              <button
                type="button"
                key={c.id}
                aria-pressed={selectedCategory === c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === c.id
                    ? "bg-[var(--brand)] text-white shadow-xs"
                    : "bg-[var(--muted-bg)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--fg)]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filtered.map((article) => (
              <article
                key={article.slug}
                className="card p-0 overflow-hidden hover:border-[var(--brand)] hover:shadow-lg transition-all group flex flex-col relative"
              >
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={article.image}
                    alt=""
                    {...imageSize(article.image)}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[var(--brand)] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {article.category}
                  </span>
                  <span className="absolute top-3 right-3 bg-[rgba(15,23,42,0.85)] text-white text-xs font-medium px-2.5 py-1 rounded-md">
                    {article.readTime}
                  </span>
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <h2 className="text-xl font-bold mb-3 group-hover:text-[var(--brand)] transition-colors">
                      <PageLink
                        to={{ type: "article", slug: article.slug }}
                        navigate={navigate}
                        className="text-inherit no-underline after:absolute after:inset-0 after:content-['']"
                      >
                        {article.title}
                      </PageLink>
                    </h2>
                    <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">{article.excerpt}</p>
                  </div>
                  <span className="more font-bold text-sm" aria-hidden="true">
                    {t("kb_read_article")} &rarr;
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
