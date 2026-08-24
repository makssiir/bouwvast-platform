import { useState, useEffect } from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import DienstenPage from "./pages/DienstenPage";
import ProjectenPage from "./pages/ProjectenPage";
import WerkgebiedPage from "./pages/WerkgebiedPage";
import ContactPage from "./pages/ContactPage";
import OverOnsPage from "./pages/OverOnsPage";
import BusinessPage from "./pages/BusinessPage";
import KennisbankPage from "./pages/KennisbankPage";
import CityPage from "./pages/CityPage";
import ServicePage from "./pages/ServicePage";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import SocialProofToast from "./components/SocialProofToast";
import CookieConsent from "./components/CookieConsent";
import QuoteModal from "./components/QuoteModal";
import NudgeWidgets from "./components/NudgeWidgets";
import { SERVICE_BY_SLUG } from "./data/services";
import { useLang } from "./i18n/LangContext";
import Icon from "./components/Icon";
import { CONTACT } from "./data/contact";
import { applyPageMeta } from "./lib/head";
import type { TranslationKey } from "./i18n/translations";

export type Page =
  | "home"
  | "diensten"
  | "projecten"
  | "werkgebied"
  | "contact"
  | "over-ons"
  | "zakelijk"
  | "kennisbank"
  | { type: "service"; slug: string }
  | { type: "city"; city: string; serviceSlug?: string };

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [modalService, setModalService] = useState("");
  const { t, lang } = useLang();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  }, [page]);

  // Keep <title>, meta description and canonical in sync with active page
  useEffect(() => {
    const cityName = typeof page === "object" && page.type === "city" ? page.city : "";
    const meta: Record<string, { titleKey: TranslationKey; descKey: TranslationKey; path: string }> = {
      home: { titleKey: "hero_title", descKey: "hero_sub", path: "" },
      diensten: { titleKey: "nav_services", descKey: "services_title", path: "diensten" },
      projecten: { titleKey: "nav_projects", descKey: "portfolio_title", path: "projecten" },
      werkgebied: { titleKey: "nav_area", descKey: "area_sub", path: "werkgebied" },
      contact: { titleKey: "nav_contact", descKey: "final_sub", path: "contact" },
      "over-ons": { titleKey: "nav_about", descKey: "whyus_sub", path: "over-ons" },
      zakelijk: { titleKey: "nav_business", descKey: "b2b_sub", path: "zakelijk" },
      kennisbank: { titleKey: "nav_services", descKey: "services_title", path: "kennisbank" },
    };

    if (typeof page === "object" && page.type === "service") {
      const svc = SERVICE_BY_SLUG[page.slug];
      if (svc) {
        applyPageMeta(lang, {
          title: `${t(svc.nameKey)} in regio Amersfoort`,
          description: svc.intro,
          path: `diensten/${svc.slug}`,
        });
        return;
      }
    }

    if (typeof page === "object" && page.type === "city") {
      const svc = page.serviceSlug ? SERVICE_BY_SLUG[page.serviceSlug] : undefined;
      applyPageMeta(lang, {
        title: svc ? `${t(svc.nameKey)} in ${cityName}` : `${t("city_seo_title")} ${cityName}`,
        description: `${t("city_seo_1_1")} ${cityName} ${t("city_seo_1_2")}`,
        path: svc ? `diensten/${svc.slug}/${cityName.toLowerCase()}` : `werkgebied/${cityName.toLowerCase()}`,
      });
      return;
    }

    const m = meta[page as string] ?? meta.home;
    applyPageMeta(lang, { title: t(m.titleKey), description: t(m.descKey), path: m.path });
  }, [page, lang, t]);

  const navigate = (p: Page) => setPage(p);

  const openQuoteModal = (serviceName?: string) => {
    setModalService(serviceName || "");
    setQuoteModalOpen(true);
  };

  const pageKey = typeof page === "string" ? page : "city";

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] flex flex-col justify-between">
      {/* Skip to Main Content Link (WCAG 2.4.1) */}
      <a href="#main" className="skip-link">
        Direct naar hoofdinhoud
      </a>

      {/* Scroll Progress Bar & Back to Top */}
      <ScrollProgress />

      <div>
        <Header page={pageKey as string} navigate={navigate} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        {page === "home" && <HomePage navigate={navigate} />}
        {page === "diensten" && <DienstenPage navigate={navigate} />}
        {page === "projecten" && <ProjectenPage navigate={navigate} />}
        {page === "werkgebied" && <WerkgebiedPage navigate={navigate} />}
        {page === "contact" && <ContactPage />}
        {page === "over-ons" && <OverOnsPage navigate={navigate} />}
        {page === "zakelijk" && <BusinessPage navigate={navigate} />}
        {page === "kennisbank" && <KennisbankPage navigate={navigate} />}
        {typeof page === "object" && page.type === "service" && (
          <ServicePage slug={page.slug} navigate={navigate} />
        )}
        {typeof page === "object" && page.type === "city" && (
          <CityPage city={page.city} serviceSlug={page.serviceSlug} navigate={navigate} />
        )}
      </div>

      <Footer navigate={navigate} />

      {/* Conversion Nudges (Floating WhatsApp Bubble & Sticky Quote Bar) */}
      <NudgeWidgets onOpenQuoteModal={() => openQuoteModal()} />

      {/* Live Social Proof Toast */}
      <SocialProofToast />

      {/* Cookie Consent Banner */}
      <CookieConsent />

      {/* Interactive 3-Step Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialService={modalService}
      />

      {/* Mobile Contact Bar */}
      <MobileContactBar navigate={navigate} onOpenQuote={() => openQuoteModal()} />
    </div>
  );
}

function MobileContactBar({
  navigate,
  onOpenQuote,
}: {
  navigate: (p: Page) => void;
  onOpenQuote: () => void;
}) {
  return (
    <div className="mobile-contact-bar">
      <button 
        onClick={onOpenQuote} 
        className="flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-white bg-[var(--brand)] border-0 cursor-pointer"
      >
        <Icon name="check" size={17} /> Offerte aanvragen
      </button>
      <a 
        href={`tel:${CONTACT.phoneTel}`} 
        className="flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-[var(--fg)] bg-white border-l border-[var(--border)] no-underline"
      >
        <Icon name="phone" size={17} color="var(--brand)" /> Bellen
      </a>
    </div>
  );
}
