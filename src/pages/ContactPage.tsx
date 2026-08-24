import Icon from "../components/Icon";
import QuoteForm from "../components/QuoteForm";
import { CONTACT } from "../data/contact";
import { useLang } from "../i18n/LangContext";

export default function ContactPage() {
  const { t, lang } = useLang();

  const details = [
    {
      icon: "whatsapp",
      label: "WhatsApp",
      value: "Stuur foto's & vraag",
      desc: "Snelste reactie",
      href: CONTACT.whatsappTemplate ?? `tel:${CONTACT.phoneTel}`,
      isExternal: true,
    },
    {
      icon: "phone",
      label: "Telefoon",
      value: CONTACT.phoneDisplay,
      desc: "Ma t/m Za 07:30 — 17:00",
      href: `tel:${CONTACT.phoneTel}`,
      isExternal: false,
    },
    {
      icon: "mail",
      label: "E-mail",
      value: CONTACT.email,
      desc: "Binnen 24 uur antwoord",
      href: `mailto:${CONTACT.email}`,
      isExternal: false,
    },
  ];

  return (
    <main>
      <section className="hero hero--contact">
        <div className="container">
          <div className="breadcrumb mb-4 text-[#86efac]">
            <a href="/" className="text-[#86efac] hover:text-white">Home</a>
            <span className="mx-2">›</span>
            <span className="text-white font-semibold">{t("nav_contact")}</span>
          </div>
          <h1>Neem contact op met Bouwvast</h1>
          <p className="lead-xl max-w-2xl">
            Heeft u plannen, een concrete verbouwing of wilt u eerst even overleggen? Wij denken graag met u mee.
          </p>
        </div>
      </section>

      {/* Direct Contact Cards */}
      <section className="section">
        <div className="container">
          <div className="grid grid-3 mb-16">
            {details.map((d) => (
              <a
                key={d.label}
                href={d.href}
                target={d.isExternal ? "_blank" : undefined}
                rel={d.isExternal ? "noreferrer" : undefined}
                className="card p-6 flex flex-col items-center text-center hover:border-[var(--brand)] hover:shadow-md transition-all no-underline text-inherit group"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--brand-tint)] text-[var(--brand)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon name={d.icon} size={24} color="var(--brand)" />
                </div>
                <h3 className="text-base font-bold mb-1">{d.label}</h3>
                <p className="text-sm font-semibold text-[var(--fg)] m-0 mb-1">{d.value}</p>
                <span className="text-xs text-[var(--muted)]">{d.desc}</span>
              </a>
            ))}
          </div>

          {/* Form & Company details */}
          <div className="grid md:grid-cols-[1.3fr_0.9fr] gap-12 items-start">
            <div className="card p-6 md:p-8 shadow-md">
              <span className="eyebrow">Aanvraagformulier</span>
              <h2 className="text-2xl font-bold mb-2">Vraag een vrijblijvende offerte aan</h2>
              <p className="text-sm text-[var(--muted)] mb-6">
                Vul uw gegevens in en beschrijf uw wensen. We nemen binnen 24 uur contact met u op.
              </p>
              <QuoteForm sourcePage="contact" />
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="text-lg font-bold mb-3">Bouwvast Amersfoort</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
                  Uw all-round bouw- en renovatiebedrijf in de regio Amersfoort, Utrecht en Het Gooi.
                </p>
                <div className="space-y-2 text-sm text-[var(--fg)]">
                  <div className="flex items-center gap-2">
                    <Icon name="pin" size={16} color="var(--brand)" />
                    <span>Regio Amersfoort (+ 35 km)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="clock" size={16} color="var(--brand)" />
                    <span>Ma t/m Za · 07:30 — 17:00</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="shield" size={16} color="var(--brand)" />
                    <span>VCA Gecertificeerd</span>
                  </div>
                </div>
              </div>

              <div className="card p-6 bg-[var(--brand-subtle)] border-[var(--brand-tint)]">
                <h3 className="text-base font-bold text-[var(--brand-dark)] mb-2">Directe bereikbaarheid</h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed m-0">
                  Wilt u snel schakelen voor een acute klus of spoedklus? Bel ons direct op <strong>{CONTACT.phoneDisplay}</strong> of stuur een foto via WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
