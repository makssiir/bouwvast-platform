import { useState } from "react"
import type { Page } from "../App"
import PageLink from "./PageLink"
import { Logo } from "./Logo"
import { CONTACT, emailHref, googleMapsHref, phoneHref } from "../data/contact"
import { CITIES } from "../data/cities"
import { useLang } from "../i18n/LangContext"
import Icon from "./Icon"
import type { TranslationKey } from "../i18n/translations"

const FOOTER_SERVICES: { slug: string; key: TranslationKey }[] = [
  { slug: "renovatie", key: "svc_renovation" },
  { slug: "badkamer-keuken", key: "svc_bathroom" },
  { slug: "afbouw", key: "svc_finishing" },
  { slug: "schilderwerk", key: "svc_painting" },
  { slug: "gevel-buitenwerk", key: "svc_facade" },
  { slug: "montage", key: "svc_assembly" },
  { slug: "loodgieter", key: "svc_plumber" },
  { slug: "onderhoud-reparatie", key: "svc_maintenance" },
]

export default function Footer({ navigate }: { navigate: (p: Page) => void }) {
  const { t, pick } = useLang()
  const [isCitiesExpanded, setIsCitiesExpanded] = useState(false)
  const tel = phoneHref()
  const mail = emailHref()
  const maps = googleMapsHref()
  const cities = CITIES.map((c) => c.name)
  const visibleCities = isCitiesExpanded ? cities : cities.slice(0, 8)

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="mb-4">
              <Logo white />
            </div>
            <p className="text-sm leading-relaxed text-[#94a3b8] mb-6">
              {t("footer_desc")}
            </p>
            <div className="space-y-3 text-sm text-[#cbd5e1]">
              {CONTACT.address && (
                <a
                  href={maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[#cbd5e1] hover:text-[#4ade80] transition-colors no-underline"
                >
                  <Icon name="pin" size={18} color="#4ade80" />
                  <span className="font-medium">{CONTACT.address}</span>
                </a>
              )}
              {tel && (
                <a
                  href={tel}
                  className="flex items-center gap-2.5 text-[#cbd5e1] hover:text-[#4ade80] transition-colors no-underline"
                >
                  <Icon name="phone" size={18} color="#4ade80" />
                  <span className="font-bold">{CONTACT.phoneDisplay}</span>
                </a>
              )}
              {mail && (
                <a
                  href={mail}
                  className="flex items-center gap-2.5 text-[#cbd5e1] hover:text-[#4ade80] transition-colors no-underline"
                >
                  <Icon name="mail" size={18} color="#4ade80" />
                  <span>{CONTACT.email}</span>
                </a>
              )}
              {!tel && !mail && (
                <PageLink
                  to="contact"
                  navigate={navigate}
                  className="flex items-center gap-2.5 text-[#cbd5e1] hover:text-[#4ade80] transition-colors no-underline"
                >
                  <Icon name="mail" size={18} color="#4ade80" />
                  <span>{t("nav_cta")}</span>
                </PageLink>
              )}
            </div>
          </div>

          <div>
            <h2 className="footer-head">{t("footer_info")}</h2>
            <ul className="footer-links">
              {(
                [
                  ["diensten", "nav_services"],
                  ["projecten", "nav_projects"],
                  ["kennisbank", "nav_kennisbank"],
                  ["werkgebied", "nav_area"],
                  ["zakelijk", "nav_business"],
                  ["contact", "nav_contact"],
                ] as const
              ).map(([to, key]) => (
                <li key={to}>
                  <PageLink to={to} navigate={navigate}>
                    {t(key)}
                  </PageLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer-head">{t("footer_services")}</h2>
            <ul className="footer-links">
              {FOOTER_SERVICES.map((s) => (
                <li key={s.slug}>
                  <PageLink to={{ type: "service", slug: s.slug }} navigate={navigate}>
                    {t(s.key)}
                  </PageLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer-head">{t("footer_cities")}</h2>
            <ul
              id="footer-cities"
              className="grid grid-cols-2 gap-x-3 gap-y-1.5 list-none m-0 p-0"
            >
              {visibleCities.map((c) => (
                <li key={c} className="min-w-0">
                  <PageLink
                    className="block text-left text-xs text-[#94a3b8] hover:text-[#4ade80] py-0.5 truncate transition-colors"
                    to={{ type: "city", city: c }}
                    navigate={navigate}
                  >
                    {c}
                  </PageLink>
                </li>
              ))}
            </ul>
            <button
              type="button"
              aria-expanded={isCitiesExpanded}
              aria-controls="footer-cities"
              onClick={() => setIsCitiesExpanded(!isCitiesExpanded)}
              className="text-xs text-[#4ade80] hover:text-white bg-transparent border-0 p-0 mt-3 cursor-pointer transition-colors flex items-center gap-1 font-semibold"
            >
              {isCitiesExpanded
                ? pick({ nl: "Minder plaatsen ↑", en: "Fewer places ↑", uk: "Згорнути список ↑", ru: "Свернуть список ↑" })
                : pick({ nl: "Alle plaatsen →", en: "All places →", uk: "Усі міста →", ru: "Все города →" })}
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="m-0">
            © {new Date().getFullYear()} {CONTACT.legalName ?? "Bouwvast"}.{" "}
            {t("footer_rights")}
            {CONTACT.kvk && <> · KvK {CONTACT.kvk}</>}
            {CONTACT.btw && <> · btw {CONTACT.btw}</>}
          </p>
          <ul className="flex flex-wrap gap-6 list-none m-0 p-0">
            <li>
              <PageLink className="text-xs text-[#94a3b8] hover:text-white" to="privacy" navigate={navigate}>
                {t("footer_privacy")}
              </PageLink>
            </li>
            <li>
              <PageLink className="text-xs text-[#94a3b8] hover:text-white" to="voorwaarden" navigate={navigate}>
                {t("footer_terms")}
              </PageLink>
            </li>
            <li>
              <PageLink className="text-xs text-[#94a3b8] hover:text-white" to="zakelijk" navigate={navigate}>
                {t("footer_partner")}
              </PageLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
