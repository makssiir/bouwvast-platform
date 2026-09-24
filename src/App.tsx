import { useState, useEffect } from "react"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import DienstenPage from "./pages/DienstenPage"
import ProjectenPage from "./pages/ProjectenPage"
import WerkgebiedPage from "./pages/WerkgebiedPage"
import ContactPage from "./pages/ContactPage"
import BusinessPage from "./pages/BusinessPage"
import KennisbankPage from "./pages/KennisbankPage"
import CityPage from "./pages/CityPage"
import ServiceCityPage from "./pages/ServiceCityPage"
import ServicePage from "./pages/ServicePage"
import Footer from "./components/Footer"
import ScrollProgress from "./components/ScrollProgress"
import NudgeWidgets from "./components/NudgeWidgets"
import CookieConsent from "./components/CookieConsent"
import { useLang } from "./i18n/LangContext"
import Icon from "./components/Icon"
import { CONTACT } from "./data/contact"
import { applyPageMeta } from "./lib/head"
import { retryPendingLeads } from "./lib/leads"
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
  const [menuOpen, setMenuOpen] = useState(false)
  const [cookieConsentOpen, setCookieConsentOpen] = useState(false)
  const { t, lang } = useLang()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setMenuOpen(false)
  }, [page])

  // A request that failed on an earlier visit gets one more chance, quietly.
  useEffect(() => {
    void retryPendingLeads()
  }, [])

  // Title, description, robots and canonical all follow the active URL.
  useEffect(() => {
    const { title, description } = metaForPage(page, lang)
    applyPageMeta(lang, {
      title,
      description,
      path: pathForPage(page),
      indexable: isIndexable(page),
    })
  }, [page, lang])

  const pageKey =
    typeof page === "string"
      ? page
      : page.type === "service" || page.type === "service_city"
        ? "diensten"
        : "werkgebied"

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] flex flex-col justify-between">
      {/* Skip to Main Content Link (WCAG 2.4.1) */}
      <a href="#main" className="skip-link">
        {t("skip_link")}
      </a>

      <ScrollProgress />

      <div>
        <Header
          page={pageKey as string}
          navigate={navigate}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
        {page === "home" && <HomePage navigate={navigate} />}
        {page === "diensten" && <DienstenPage navigate={navigate} />}
        {page === "projecten" && <ProjectenPage navigate={navigate} />}
        {page === "werkgebied" && <WerkgebiedPage navigate={navigate} />}
        {page === "contact" && <ContactPage />}
        {page === "zakelijk" && <BusinessPage navigate={navigate} />}
        {page === "kennisbank" && <KennisbankPage navigate={navigate} />}
        {typeof page === "object" && page.type === "service" && (
          <ServicePage slug={page.slug} navigate={navigate} />
        )}
        {typeof page === "object" && page.type === "city" && (
          <CityPage
            city={page.city}
            navigate={navigate}
          />
        )}
        {typeof page === "object" && page.type === "service_city" && (
          <ServiceCityPage
            city={page.city}
            serviceSlug={page.serviceSlug}
            navigate={navigate}
          />
        )}
      </div>

      <Footer navigate={navigate} />

      {/* Floating WhatsApp bubble and sticky quote bar */}
      <NudgeWidgets
        onOpenQuoteModal={() => navigate("contact")}
        disabled={cookieConsentOpen}
      />

      <CookieConsent onOpenStateChange={setCookieConsentOpen} />

      <MobileContactBar
        navigate={navigate}
        t={t}
        disabled={cookieConsentOpen}
      />
    </div>
  )
}

/**
 * The URL is the source of truth for which page is shown, so a visitor can
 * link to, bookmark, share and go back to any page on this site.
 */
function useRouter(initialPage?: Page): [Page, (next: Page) => void] {
  const [page, setPage] = useState<Page>(
    () =>
      initialPage ??
      (typeof window === "undefined"
        ? "home"
        : (pageForPath(window.location.pathname) ?? "home")),
  )

  useEffect(() => {
    // An address we do not serve should not leave a made-up path in the bar.
    if (pageForPath(window.location.pathname) === null) {
      window.history.replaceState({}, "", "/")
    }

    const onPopState = () => {
      setPage(pageForPath(window.location.pathname) ?? "home")
    }
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  const navigate = (next: Page) => {
    const href = hrefForPage(next)
    if (window.location.pathname !== href) {
      window.history.pushState({}, "", href)
    }
    setPage(next)
  }

  return [page, navigate]
}

function MobileContactBar({
  navigate,
  t,
  disabled = false,
}: {
  navigate: (p: Page) => void
  t: (key: TranslationKey) => string
  disabled?: boolean
}) {
  return (
    <div
      className={
        disabled ? "mobile-contact-bar pointer-events-none opacity-60" : "mobile-contact-bar"
      }
    >
      <a
        href={CONTACT.whatsappTemplate ?? `tel:${CONTACT.phoneTel}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center bg-[#25D366] hover:bg-[#20bd5a] transition-colors"
        aria-label="WhatsApp"
      >
        <Icon name="whatsapp" size={24} color="#ffffff" />
      </a>
      <a
        href={`tel:${CONTACT.phoneTel}`}
        className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 sm:py-3.5 text-[10px] sm:text-sm font-bold text-[var(--fg)] bg-white border-r border-[var(--border)] no-underline text-center leading-[1.1]"
      >
        <Icon name="phone" size={17} color="var(--brand)" /> 
        <span>{t("nav_call")}</span>
      </a>
      <button
        onClick={() => navigate("contact")}
        className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 sm:py-3.5 text-[10px] sm:text-sm font-bold text-white bg-[var(--brand)] border-0 cursor-pointer text-center leading-[1.1]"
      >
        <Icon name="check" size={17} /> 
        <span>{t("nav_cta")}</span>
      </button>
    </div>
  )
}
