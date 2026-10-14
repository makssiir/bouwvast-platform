import type { ReactNode } from "react"
import type { Page } from "../lib/routes"
import PageHero from "../components/PageHero"
import { ARTICLE_BY_SLUG, ARTICLES } from "../data/articles"
import { SERVICE_BY_SLUG } from "../data/services"
import { useLang } from "../i18n/LangContext"
import PageLink from "../components/PageLink"
import More from "../components/More"
import Icon from "../components/Icon"
import JsonLd from "../components/JsonLd"
import NotFoundPage from "./NotFoundPage"
import { siteUrl } from "../lib/head"

export default function ArticlePage({
  slug,
  navigate,
}: {
  slug: string
  navigate: (p: Page) => void
}) {
  const { t, lang, pick } = useLang()
  const article = ARTICLE_BY_SLUG[slug]
  if (!article) return <NotFoundPage navigate={navigate} />

  const service = article.relatedServiceSlug ? SERVICE_BY_SLUG[article.relatedServiceSlug] : undefined
  const others = ARTICLES.filter((a) => a.slug !== slug).slice(0, 3)
  const url = siteUrl(`kennisbank/${slug}`)

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.excerpt,
          inLanguage: "nl-NL",
          ...(url ? { mainEntityOfPage: url } : {}),
          ...(siteUrl("") ? { image: siteUrl(article.image.replace(/^\//, "")) } : {}),
          publisher: { "@type": "Organization", name: "Bouwvast" },
        }}
      />

      <PageHero
        navigate={navigate}
        crumbs={[{ label: t("nav_kennisbank"), to: "kennisbank" }, { label: article.title }]}
        eyebrow={
          <>
            {article.category} · {article.readTime}
          </>
        }
        title={article.title}
        lead={article.excerpt}
        image={article.image}
      />

      <section className="section">
        <div className="container article-layout">
          <article className="prose-page" lang="nl">
            {lang !== "nl" && (
              <p className="notice" lang={lang}>
                {t("kb_dutch_only")}
              </p>
            )}

            <ArticleBody paragraphs={article.content} />

            {article.tips && article.tips.length > 0 && (
              <div className="tip-box">
                <h2>{t("kb_tips_title")}</h2>
                <ul>
                  {article.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            <p className="fine-print">{t("kb_disclaimer")}</p>
          </article>

          <aside className="lg:sticky lg:top-28" aria-label={service ? t(service.nameKey) : t("form_title")}>
            <div className="cta-band cta-band--card">
              {service ? (
                <>
                  <p className="eyebrow eyebrow--on-dark">
                    {pick({ nl: "Gerelateerde dienst", en: "Related service", uk: "Пов'язана послуга", ru: "Связанная услуга" })}
                  </p>
                  <h2>{t(service.nameKey)}</h2>
                  <p>{t(service.introKey)}</p>
                  <div className="btn-row">
                    <PageLink to={{ type: "service", slug: service.slug }} navigate={navigate} className="btn btn-white">
                      {t("link_more")}
                      <span className="btn-arrow" aria-hidden="true">
                        <Icon name="arrow-right" size={18} />
                      </span>
                    </PageLink>
                  </div>
                </>
              ) : (
                <>
                  <h2>{t("form_title")}</h2>
                  <p>{t("cta_sub")}</p>
                  <div className="btn-row">
                    <PageLink to="contact" navigate={navigate} className="btn btn-white">
                      {t("cta_btn")}
                      <span className="btn-arrow" aria-hidden="true">
                        <Icon name="arrow-right" size={18} />
                      </span>
                    </PageLink>
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>
      </section>

      {others.length > 0 && (
        <section className="section section--soft">
          <nav className="container" aria-labelledby="more-articles">
            <div className="section-head">
              <div>
                <h2 id="more-articles">{t("kb_more_articles")}</h2>
              </div>
              <PageLink to="kennisbank" navigate={navigate} className="btn btn-outline">
                {t("nav_kennisbank")}
              </PageLink>
            </div>
            <ul className="grid grid-3 m-0 list-none p-0">
              {others.map((other) => (
                <li key={other.slug}>
                  <article className="card article-card">
                    <div className="article-meta">
                      <span className="tag">{other.category}</span>
                      <span className="inline-flex items-center gap-1.5">
                        <Icon name="clock" size={14} />
                        {other.readTime}
                      </span>
                    </div>
                    <h3>
                      <PageLink to={{ type: "article", slug: other.slug }} navigate={navigate}>
                        {other.title}
                      </PageLink>
                    </h3>
                    <p className="line-clamp-3">{other.excerpt}</p>
                    <More hidden>{t("kb_read_article")}</More>
                  </article>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      )}
    </>
  )
}

/**
 * The articles are stored as plain paragraphs. A few conventions in the text
 * get typographic structure: a short question becomes a subheading, "• "
 * lines become a list, and a lead-in such as "Stap 1: …." or "Droogtijd:" is
 * set in bold.
 */
function ArticleBody({ paragraphs }: { paragraphs: string[] }) {
  const blocks: ReactNode[] = []
  let bullets: string[] = []
  const flush = () => {
    if (bullets.length === 0) return
    blocks.push(
      <ul key={`list-${blocks.length}`}>
        {bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>,
    )
    bullets = []
  }

  paragraphs.forEach((text, index) => {
    if (text.startsWith("• ")) {
      bullets.push(text.slice(2))
      return
    }
    flush()
    if (text.length <= 90 && text.endsWith("?")) {
      blocks.push(<h2 key={index}>{text}</h2>)
      return
    }
    const lead = /^(Stap \d+: [^.]+\.)\s(.+)$/.exec(text) ?? /^((?:\d+\.\s)?[^.:]{2,48}:)\s(.+)$/.exec(text)
    blocks.push(
      lead ? (
        <p key={index}>
          <strong>{lead[1]}</strong> {lead[2]}
        </p>
      ) : (
        <p key={index}>{text}</p>
      ),
    )
  })
  flush()

  return <>{blocks}</>
}
