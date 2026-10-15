import { useState, useEffect, useRef } from "react"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import DienstenPage from "./pages/DienstenPage"
import ProjectenPage from "./pages/ProjectenPage"
import WerkgebiedPage from "./pages/WerkgebiedPage"
import ContactPage from "./pages/ContactPage"
import BusinessPage from "./pages/BusinessPage"
import KennisbankPage from "./pages/KennisbankPage"
import ArticlePage from "./pages/ArticlePage"
import ServicePage from "./pages/ServicePage"
import { PrivacyPage, TermsPage } from "./pages/LegalPages"
import NotFoundPage from "./pages/NotFoundPage"
import Footer from "./components/Footer"
import ScrollProgress from "./components/ScrollProgress"
import NudgeWidgets from "./components/NudgeWidgets"
import { useLang } from "./i18n/LangContext"
import Icon from "./components/Icon"
import { CONTACT, phoneHref, whatsappHref } from "./data/contact"
import { applyPageMeta } from "./lib/head"
import { loadLocalPages, loadedLocalPages, needsLocalPages } from "./lib/localPages"
import { QuoteDraftProvider, scrollToQuote } from "./lib/quoteDraft"
import {
  hrefForPage,
  isIndexable,
  metaForPage,
  pageForPath,
  pathForPage,
} from "./lib/routes"
import type { Page } from "./lib/routes"
import type { TranslationKey } from "./i18n/translations"

export type { Page }

export default function App({ initialPage }: { initialPage?: Page } = {}) {
  const [page, navigate] = useRouter(initialPage)
  const local = useLocalPages(page)
  const [menuOpen, setMenuOpen] = useState(false)
  const { t, lang } = useLang()
  const mainRef = useRef<HTMLElement>(null)
  const firstRender = useRef(true)

  // After an in-app navigation: start at the top and move focus to the new
  // content so keyboard and screen-reader users know the page changed.
  useEffect(() => {
    setMenuOpen(false)
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    window.scrollTo({ top: 0, behavior: "auto" })
    mainRef.current?.focus({ preventScroll: true })
    // Prerendered route-specific structured data describes the first URL only.
    document
      .querySelectorAll('script[type="application/ld+json"][data-route]')
      .forEach((node) => node.remove())
  }, [page])

  // Title, description, robots and canonical all follow the active URL.
  useEffect(() => {
    const { title, description } = metaForPage(page, lang)
    applyPageMeta(lang, {
      title,
      description,
      path: page === "notfound" ? "" : pathForPage(page),
      indexable: isIndexable(page),
      canonical: page !== "notfound",
    })
  }, [page, lang])

  const pageKey =
    typeof page === "string"
      ? page
      : page.type === "service"
        ? "diensten"
        : page.type === "article"
          ? "kennisbank"
          : "werkgebied"

  return (
    <QuoteDraftProvider>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] flex flex-col justify-between">
        <a href="#main" className="skip-link">
          {t("skip_link")}
        </a>

        <ScrollProgress />

        <div>
          <Header
            page={pageKey}
            navigate={navigate}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
          <main id="main" ref={mainRef} tabIndex={-1} className="outline-none">
            {page === "home" && <HomePage navigate={navigate} />}
            {page === "diensten" && <DienstenPage navigate={navigate} />}
            {page === "projecten" && <ProjectenPage navigate={navigate} />}
            {page === "werkgebied" && <WerkgebiedPage navigate={navigate} />}
            {page === "contact" && <ContactPage navigate={navigate} />}
            {page === "zakelijk" && <BusinessPage navigate={navigate} />}
            {page === "kennisbank" && <KennisbankPage navigate={navigate} />}
            {page === "privacy" && <PrivacyPage navigate={navigate} />}
            {page === "voorwaarden" && <TermsPage navigate={navigate} />}
            {page === "notfound" && <NotFoundPage navigate={navigate} />}
            {typeof page === "object" && page.type === "service" && (
              <ServicePage slug={page.slug} navigate={navigate} />
            )}
            {typeof page === "object" && page.type === "article" && (
              <ArticlePage slug={page.slug} navigate={navigate} />
            )}
            {typeof page === "object" && page.type === "city" && (
              local ? <local.CityPage city={page.city} navigate={navigate} /> : <PageLoading />
            )}
            {typeof page === "object" && page.type === "serviceCity" && (
              local ? <local.ServiceCityPage slug={page.slug} city={page.city} navigate={navigate} /> : <PageLoading />
            )}
          </main>
        </div>

        <Footer navigate={navigate} />

        <NudgeWidgets
          suppress={page === "contact"}
          onOpenQuote={() => {
            if (!scrollToQuote()) navigate("contact")
          }}
        />

        <MobileContactBar navigate={navigate} t={t} showCta={page !== "contact"} />
      </div>
    </QuoteDraftProvider>
  )
}

/**
 * The URL is the source of truth for which page is shown, so a visitor can
 * link to, bookmark, share and go back to any page on this site. An address
 * we do not serve shows the not-found page instead of silently becoming "/".
 */
function useRouter(initialPage?: Page): [Page, (next: Page) => void] {
  const [page, setPage] = useState<Page>(
    () =>
      initialPage ??
      (typeof window === "undefined"
        ? "home"
        : (pageForPath(window.location.pathname) ?? "notfound")),
  )

  useEffect(() => {
    const onPopState = () => {
      setPage(pageForPath(window.location.pathname) ?? "notfound")
    }
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  const navigate = (next: Page) => {
    const href = hrefForPage(next)
    if (next !== "notfound" && window.location.pathname !== href) {
      window.history.pushState({}, "", href)
    }
    setPage(next)
  }

  return [page, navigate]
}

/**
 * Fixed action bar on small screens. It slides in once the visitor has
 * scrolled past the first screen, so it never doubles up with the hero
 * button, and it drops the quote button on the contact page, where the form
 * is already in view.
 */
function MobileContactBar({
  navigate,
  t,
  showCta,
}: {
  navigate: (p: Page) => void
  t: (key: TranslationKey) => string
  showCta: boolean
}) {
  const wa = whatsappHref()
  const tel = phoneHref()
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const update = () => setRevealed(window.scrollY > Math.min(window.innerHeight * 0.6, 480))
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  if (!showCta && !wa && !tel) return null

  return (
    <div className={`mobile-contact-bar${revealed ? " is-revealed" : ""}`}>
      <div className="mobile-contact-bar-inner">
        {wa && (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-contact-btn mobile-contact-btn--wa"
            aria-label="WhatsApp"
          >
            <Icon name="whatsapp" size={20} color="#ffffff" />
          </a>
        )}

        {tel && (
          <a
            href={tel}
            className="mobile-contact-btn mobile-contact-btn--call"
            aria-label={`${t("nav_call")} ${CONTACT.phoneDisplay ?? ""}`.trim()}
          >
            <Icon name="phone" size={18} color="var(--fg)" />
          </a>
        )}

        {showCta && (
          <a
            href={hrefForPage("contact")}
            onClick={(event) => {
              event.preventDefault()
              navigate("contact")
            }}
            className="mobile-contact-btn mobile-contact-btn--cta no-underline"
          >
            <span>{t("nav_cta")}</span>
            <Icon name="arrow-right" size={17} color="#ffffff" strokeWidth={2} />
          </a>
        )}
      </div>
    </div>
  )
}

/**
 * The place pages come in their own chunk. The first page is loaded before
 * hydration (main.tsx, entry-server.tsx); after an in-app navigation the
 * chunk is fetched here. If that fails, a full page load gets the
 * prerendered HTML instead.
 */
function useLocalPages(page: Page) {
  const [local, setLocal] = useState(loadedLocalPages)
  useEffect(() => {
    if (local || !needsLocalPages(page)) return
    let alive = true
    loadLocalPages().then(
      (module) => alive && setLocal(() => module),
      () => alive && window.location.reload(),
    )
    return () => {
      alive = false
    }
  }, [page, local])
  return local
}

function PageLoading() {
  return <div className="container section min-h-[60vh]" aria-busy="true" />
}
