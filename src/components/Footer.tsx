import React from "react";
import type { Page } from "../App";
import { Logo } from "./Logo"; 
import { CONTACT } from "../data/contact";
import { useLang } from "../i18n/LangContext";
import Icon from "./Icon";

const MAJOR_DUTCH_CITIES = [
  "Amsterdam", "Rotterdam", "Den Haag", "Utrecht",
  "Eindhoven", "Groningen", "Tilburg", "Almere",
  "Breda", "Nijmegen", "Apeldoorn", "Arnhem",
  "Haarlem", "Enschede", "Amersfoort", "Zaanstad",
  "'s-Hertogenbosch", "Zwolle", "Leiden", "Leeuwarden",
  "Maastricht", "Dordrecht", "Ede", "Hilversum"
];

export default function Footer({ navigate }: { navigate: (p: Page) => void }) {
  const { t } = useLang();

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
              <li><button onClick={() => navigate("diensten")}>{t("nav_services")}</button></li>
              <li><button onClick={() => navigate("projecten")}>{t("nav_projects")}</button></li>
              <li><button onClick={() => navigate("kennisbank")}>{t("nav_kennisbank")}</button></li>
              <li><button onClick={() => navigate("over-ons")}>{t("nav_about")}</button></li>
              <li><button onClick={() => navigate("werkgebied")}>{t("nav_area")}</button></li>
              <li><button onClick={() => navigate("zakelijk")}>{t("nav_business")}</button></li>
              <li><button onClick={() => navigate("contact")}>{t("nav_contact")}</button></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h3 className="footer-head">{t("footer_services")}</h3>
            <ul className="footer-links">
              <li><button onClick={() => navigate({ type: "service", slug: "renovatie" })}>{t("svc_renovation")}</button></li>
              <li><button onClick={() => navigate({ type: "service", slug: "badkamer-keuken" })}>{t("svc_bathroom")}</button></li>
              <li><button onClick={() => navigate({ type: "service", slug: "afbouw" })}>{t("svc_finishing")}</button></li>
              <li><button onClick={() => navigate({ type: "service", slug: "schilderwerk" })}>{t("svc_painting")}</button></li>
              <li><button onClick={() => navigate({ type: "service", slug: "gevel-buitenwerk" })}>{t("svc_facade")}</button></li>
              <li><button onClick={() => navigate({ type: "service", slug: "montage" })}>{t("svc_assembly")}</button></li>
              <li><button onClick={() => navigate({ type: "service", slug: "loodgieter" })}>{t("svc_maintenance")}</button></li>
            </ul>
          </div>

          {/* Col 4: Grote Steden in Nederland */}
          <div>
            <h3 className="footer-head">{t("footer_cities")}</h3>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
              {MAJOR_DUTCH_CITIES.map((c) => (
                <button
                  key={c}
                  onClick={() => navigate({ type: "city", city: c })}
                  className="text-left text-xs text-[#94a3b8] hover:text-[#4ade80] bg-transparent border-0 p-0 py-0.5 cursor-pointer truncate transition-colors"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="m-0">© {new Date().getFullYear()} Bouwvast. {t("footer_rights")}</p>
          <div className="flex gap-6">
            <a 
              href={CONTACT.googleMapsUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-[#64748b] hover:text-[#4ade80] transition-colors"
            >
              📍 Google Maps
            </a>
            <button onClick={() => navigate("contact")} className="bg-transparent border-0 p-0 text-xs text-[#64748b] hover:text-white cursor-pointer">
              {t("footer_privacy")}
            </button>
            <button onClick={() => navigate("contact")} className="bg-transparent border-0 p-0 text-xs text-[#64748b] hover:text-white cursor-pointer">
              {t("footer_terms")}
            </button>
            <button onClick={() => navigate("zakelijk")} className="bg-transparent border-0 p-0 text-xs text-[#64748b] hover:text-white cursor-pointer">
              {t("footer_partner")}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
