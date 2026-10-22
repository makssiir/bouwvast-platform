import type { Page } from "../App"
import PageLink from "./PageLink"
import { Logo } from "./Logo"
import { CONTACT, emailHref, phoneHref } from "../data/contact"
import { MAJOR_CITIES } from "../data/cities"
import { SERVICES } from "../data/services"
import { useLang } from "../i18n/LangContext"
import Icon from "./Icon"
import CompanyNotice from "./CompanyNotice"

/** The larger jobs first, as in data/services.ts. */
const FOOTER_SERVICES = SERVICES.slice(0, 8)
const FOOTER_CITIES = MAJOR_CITIES.slice(0, 12).map((c) => c.name)

export default function Footer({ navigate }: { navigate: (p: Page) => void }) {
  const { t, pick } = useLang()
  const tel = phoneHref()
  const mail = emailHref()

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="mb-4">
              <Logo white />
            </div>
            <CompanyNotice className="mb-3 max-w-xs text-[0.9375rem] leading-relaxed" />
            <p className="text-[0.95rem] leading-relaxed text-on-night-muted mb-6 max-w-xs">
              {t("footer_desc")}
            </p>
            <div className="space-y-3 text-[0.95rem]">
              {CONTACT.locality && (
                <div className="flex items-start gap-2.5 [&>svg]:shrink-0">
                  <Icon name="pin" size={18} color="var(--color-pine-300)" />
                  <span className="font-medium">{CONTACT.locality}</span>
                </div>
              )}
              {tel && (
                <a
                  href={tel}
                  className="flex items-center gap-2.5"
                >
                  <Icon name="phone" size={18} color="var(--color-pine-300)" />
                  <span className="font-bold">{CONTACT.phoneDisplay}</span>
                </a>
              )}
              {mail && (
                <a
                  href={mail}
                  className="flex items-center gap-2.5"
                >
                  <Icon name="mail" size={18} color="var(--color-pine-300)" />
                  <span>{CONTACT.email}</span>
                </a>
              )}
              {!tel && !mail && (
                <PageLink
                  to="contact"
                  navigate={navigate}
                  className="flex items-center gap-2.5"
                >
                  <Icon name="mail" size={18} color="var(--color-pine-300)" />
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
                    {t(s.nameKey)}
                  </PageLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer-head">{t("footer_cities")}</h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 list-none m-0 p-0">
              {FOOTER_CITIES.map((c) => (
                <li key={c} className="min-w-0">
                  <PageLink className="block truncate py-0.5 text-[0.95rem]" to={{ type: "city", city: c }} navigate={navigate}>
                    {c}
                  </PageLink>
                </li>
              ))}
            </ul>
            <PageLink
              to="werkgebied"
              navigate={navigate}
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-pine-300 transition-colors hover:text-white"
            >
              {pick({ nl: "Alle plaatsen", en: "All places", uk: "Усі міста", ru: "Все города" })}
              <span aria-hidden="true" className="inline-flex">
                <Icon name="arrow-right" size={16} />
              </span>
            </PageLink>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="m-0">
            © {new Date().getFullYear()} {CONTACT.legalName ?? "Huisklusdienst"}.{" "}
            {t("footer_rights")}
            {CONTACT.kvk && <> · KvK {CONTACT.kvk}</>}
            {CONTACT.btw && <> · btw {CONTACT.btw}</>}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 list-none m-0 p-0">
            <li>
              <PageLink className="text-sm" to="privacy" navigate={navigate}>
                {t("footer_privacy")}
              </PageLink>
            </li>
            <li>
              <PageLink className="text-sm" to="voorwaarden" navigate={navigate}>
                {t("footer_terms")}
              </PageLink>
            </li>
            <li>
              <PageLink className="text-sm" to="zakelijk" navigate={navigate}>
                {t("footer_partner")}
              </PageLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
