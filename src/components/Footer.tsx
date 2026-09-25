import React, { useState } from "react"
import type { Page } from "../App"
import PageLink from "./PageLink"
import { Logo } from "./Logo"
import { CONTACT } from "../data/contact"
import { useLang } from "../i18n/LangContext"
import Icon from "./Icon"

const MAJOR_DUTCH_CITIES = [
  "Amsterdam",
  "Rotterdam",
  "Den Haag",
  "Utrecht",
  "Eindhoven",
  "Groningen",
  "Tilburg",
  "Almere",
  "Breda",
  "Nijmegen",
  "Apeldoorn",
  "Arnhem",
  "Haarlem",
  "Enschede",
  "Amersfoort",
  "Zaanstad",
  "'s-Hertogenbosch",
  "Zwolle",
  "Leiden",
  "Leeuwarden",
  "Maastricht",
  "Dordrecht",
  "Ede",
  "Hilversum",
]

export default function Footer({ navigate }: { navigate: (p: Page) => void }) {
  const { t, lang } = useLang()
  const [isCitiesExpanded, setIsCitiesExpanded] = useState(false)

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand & Contact Info */}
          <div>
            <div className="mb-4">
              <Logo white />
            </div>
            <p className="text-sm leading-relaxed text-[#94a3b8] mb-6">
              {t("footer_desc")}
            </p>
            <div className="space-y-3 text-sm text-[#cbd5e1]">
              <a
                href={CONTACT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[#cbd5e1] hover:text-[#4ade80] transition-colors no-underline"
                title="Bekijk onze locatie op Google Maps"
              >
                <Icon name="pin" size={18} color="#4ade80" />
                <span className="font-medium">{CONTACT.address}</span>
              </a>

              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="flex items-center gap-2.5 text-[#cbd5e1] hover:text-[#4ade80] transition-colors no-underline"
              >
                <Icon name="phone" size={18} color="#4ade80" />
                <span className="font-bold">{CONTACT.phoneDisplay}</span>
              </a>

              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2.5 text-[#cbd5e1] hover:text-[#4ade80] transition-colors no-underline"
              >
                <Icon name="mail" size={18} color="#4ade80" />
                <span>{CONTACT.email}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation & Information */}
          <div>
            <h3 className="footer-head">{t("footer_info")}</h3>
            <ul className="footer-links">
              <li>
                <PageLink to="diensten" navigate={navigate}>
                  {t("nav_services")}
                </PageLink>
              </li>
              <li>
                <PageLink to="projecten" navigate={navigate}>
                  {t("nav_projects")}
                </PageLink>
              </li>
              <li>
                <PageLink to="kennisbank" navigate={navigate}>
                  {t("nav_kennisbank")}
                </PageLink>
              </li>
              <li>
                <PageLink to="werkgebied" navigate={navigate}>
                  {t("nav_area")}
                </PageLink>
              </li>
              <li>
                <PageLink to="zakelijk" navigate={navigate}>
                  {t("nav_business")}
                </PageLink>
              </li>
              <li>
                <PageLink to="contact" navigate={navigate}>
                  {t("nav_contact")}
                </PageLink>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h3 className="footer-head">{t("footer_services")}</h3>
            <ul className="footer-links">
              <li>
                <PageLink to={{ type: "service", slug: "renovatie" }} navigate={navigate}>
                  {t("svc_renovation")}
                </PageLink>
              </li>
              <li>
                <PageLink to={{ type: "service", slug: "badkamer-keuken" }} navigate={navigate}>
                  {t("svc_bathroom")}
                </PageLink>
              </li>
              <li>
                <PageLink to={{ type: "service", slug: "afbouw" }} navigate={navigate}>
                  {t("svc_finishing")}
                </PageLink>
              </li>
              <li>
                <PageLink to={{ type: "service", slug: "schilderwerk" }} navigate={navigate}>
                  {t("svc_painting")}
                </PageLink>
              </li>
              <li>
                <PageLink to={{ type: "service", slug: "gevel-buitenwerk" }} navigate={navigate}>
                  {t("svc_facade")}
                </PageLink>
              </li>
              <li>
                <PageLink to={{ type: "service", slug: "montage" }} navigate={navigate}>
                  {t("svc_assembly")}
                </PageLink>
              </li>
              <li>
                <PageLink to={{ type: "service", slug: "loodgieter" }} navigate={navigate}>
                  {t("svc_maintenance")}
                </PageLink>
              </li>
            </ul>
          </div>

          {/* Col 4: Grote Steden in Nederland */}
          <div>
            <h3 className="footer-head">{t("footer_cities")}</h3>
            <div className={`grid grid-cols-2 gap-x-3 gap-y-1.5 transition-all duration-300 ${isCitiesExpanded ? 'mb-2' : ''}`}>
              {(isCitiesExpanded ? MAJOR_DUTCH_CITIES : MAJOR_DUTCH_CITIES.slice(0, 8)).map((c) => (
                <PageLink key={c} className="text-left text-xs text-[#94a3b8] hover:text-[#4ade80] bg-transparent border-0 p-0 py-0.5 cursor-pointer truncate transition-colors" to={{ type: "city", city: c }} navigate={navigate}>
                  {c}
                </PageLink>
              ))}
            </div>
            <button
              onClick={() => setIsCitiesExpanded(!isCitiesExpanded)}
              className="text-xs text-[#4ade80] hover:text-white bg-transparent border-0 p-0 mt-3 cursor-pointer transition-colors flex items-center gap-1 font-semibold"
            >
              {isCitiesExpanded
                ? lang === "uk"
                  ? "Згорнути список ↑"
                  : lang === "ru"
                    ? "Свернуть список ↑"
                    : lang === "en"
                      ? "Fewer cities ↑"
                      : "Minder steden ↑"
                : lang === "uk"
                  ? "Усі міста →"
                  : lang === "ru"
                    ? "Все города →"
                    : lang === "en"
                      ? "All cities →"
                      : "Alle steden →"}
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="m-0">
            © {new Date().getFullYear()} Bouwvast. {t("footer_rights")}
          </p>
          <div className="flex gap-6">
            <a
              href={CONTACT.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#64748b] hover:text-[#4ade80] transition-colors"
            >
              📍 Google Maps
            </a>
            <PageLink className="bg-transparent border-0 p-0 text-xs text-[#64748b] hover:text-white cursor-pointer" to="contact" navigate={navigate}>
              {t("footer_privacy")}
            </PageLink>
            <PageLink className="bg-transparent border-0 p-0 text-xs text-[#64748b] hover:text-white cursor-pointer" to="contact" navigate={navigate}>
              {t("footer_terms")}
            </PageLink>
            <PageLink className="bg-transparent border-0 p-0 text-xs text-[#64748b] hover:text-white cursor-pointer" to="zakelijk" navigate={navigate}>
              {t("footer_partner")}
            </PageLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
