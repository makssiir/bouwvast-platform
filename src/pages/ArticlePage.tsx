import type { Page } from "../lib/routes"
import { ARTICLE_BY_SLUG, ARTICLES } from "../data/articles"
import { SERVICE_BY_SLUG } from "../data/services"
import { imageSize } from "../data/images"
import { useLang } from "../i18n/LangContext"
import Breadcrumb from "../components/Breadcrumb"
import PageLink from "../components/PageLink"
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
  const { t, lang } = useLang()
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

      <section className="hero hero--service">
        <div className="container">
          <Breadcrumb
            navigate={navigate}
            items={[{ label: t("nav_kennisbank"), to: "kennisbank" }, { label: article.title }]}
          />
          <span className="eyebrow text-white/80">
            {article.category} · {article.readTime}
          </span>
          <h1>{article.title}</h1>
          <p className="lead-xl max-w-2xl">{article.excerpt}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <article className="prose-page mx-auto" lang="nl">
            {lang !== "nl" && <p className="notice">{t("kb_dutch_only")}</p>}

            <img
              src={article.image}
              alt=""
              {...imageSize(article.image)}
              decoding="async"
              className="w-full h-72 md:h-96 object-cover rounded-2xl mb-8"
            />

            {article.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            {article.tips && article.tips.length > 0 && (
              <div className="card p-6 mt-8 bg-[var(--muted-bg)]">
                <h2 className="mt-0">{t("kb_tips_title")}</h2>
                <ul>
                  {article.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-sm text-[var(--muted)] mt-8">{t("kb_disclaimer")}</p>

            {service && (
              <div className="cta-band mt-10">
                <h2>{t(service.nameKey)}</h2>
                <p>{t(service.introKey)}</p>
                <div className="btn-row justify-center">
                  <PageLink
                    to={{ type: "service", slug: service.slug }}
                    navigate={navigate}
                    className="btn btn-white btn-lg no-underline"
                  >
                    {t("link_more")} &rarr;
                  </PageLink>
                </div>
              </div>
            )}
          </article>

          {others.length > 0 && (
            <nav className="max-w-5xl mx-auto mt-16" aria-labelledby="more-articles">
              <h2 id="more-articles" className="text-center mb-6">
                {t("kb_more_articles")}
              </h2>
              <ul className="grid md:grid-cols-3 gap-6 list-none p-0 m-0">
                {others.map((other) => (
                  <li key={other.slug} className="card p-6">
                    <span className="text-xs font-bold text-[var(--brand)] block mb-2">{other.category}</span>
                    <PageLink
                      to={{ type: "article", slug: other.slug }}
                      navigate={navigate}
                      className="font-bold text-[var(--fg)] hover:text-[var(--brand)]"
                    >
                      {other.title}
                    </PageLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </section>
    </>
  )
}
