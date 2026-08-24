import React from "react";
import type { Page } from "../App";
import { Logo } from "./Logo"; 
import { CONTACT } from "../data/contact";
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
              Hét betrouwbare bouw- en renovatieplatform van Nederland. Vakkundige uitvoering, transparante prijzen en heldere communicatie voor elke verbouwing.
            </p>
            <div className="space-y-3 text-sm text-[#cbd5e1]">
              <a 
                href={CONTACT.googleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2.5 text-[#cbd5e1] hover:text-[#4ade80] transition-colors no-underline"
                title="Bekijk onze hoofdlocatie op Google Maps"
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
            <h3 className="footer-head">Informatie</h3>
            <ul className="footer-links">
              <li><button onClick={() => navigate("diensten")}>Alle diensten</button></li>
              <li><button onClick={() => navigate("projecten")}>Projecten & Portfolio</button></li>
              <li><button onClick={() => navigate("kennisbank")}>Kennisbank & Gidsen</button></li>
              <li><button onClick={() => navigate("over-ons")}>Over Bouwvast</button></li>
              <li><button onClick={() => navigate("werkgebied")}>Werkgebied</button></li>
              <li><button onClick={() => navigate("zakelijk")}>Zakelijk & Partners</button></li>
              <li><button onClick={() => navigate("contact")}>Contact & Offerte</button></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h3 className="footer-head">Diensten</h3>
            <ul className="footer-links">
              <li><button onClick={() => navigate({ type: "service", slug: "renovatie" })}>Woningrenovatie</button></li>
              <li><button onClick={() => navigate({ type: "service", slug: "badkamer-keuken" })}>Badkamer & Keuken</button></li>
              <li><button onClick={() => navigate({ type: "service", slug: "afbouw" })}>Afbouw & Stucwerk</button></li>
              <li><button onClick={() => navigate({ type: "service", slug: "schilderwerk" })}>Binnen- & Buitenschilderwerk</button></li>
              <li><button onClick={() => navigate({ type: "service", slug: "timmerman" })}>Timmerwerk op maat</button></li>
              <li><button onClick={() => navigate({ type: "service", slug: "loodgieter" })}>Loodgieter & Sanitair</button></li>
              <li><button onClick={() => navigate({ type: "service", slug: "elektricien" })}>Elektricien & Groepenkast</button></li>
            </ul>
          </div>

          {/* Col 4: Grote Steden in Nederland */}
          <div>
            <h3 className="footer-head">Grote Steden</h3>
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
          <p className="m-0">© {new Date().getFullYear()} Bouwvast. Alle rechten voorbehouden.</p>
          <div className="flex gap-6">
            <a 
              href={CONTACT.googleMapsUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-[#64748b] hover:text-[#4ade80] transition-colors"
            >
              📍 Google Maps Locatie
            </a>
            <button onClick={() => navigate("contact")} className="bg-transparent border-0 p-0 text-xs text-[#64748b] hover:text-white cursor-pointer">
              Privacybeleid
            </button>
            <button onClick={() => navigate("contact")} className="bg-transparent border-0 p-0 text-xs text-[#64748b] hover:text-white cursor-pointer">
              Algemene voorwaarden
            </button>
            <button onClick={() => navigate("zakelijk")} className="bg-transparent border-0 p-0 text-xs text-[#64748b] hover:text-white cursor-pointer">
              Vakman worden
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
