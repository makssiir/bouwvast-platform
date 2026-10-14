import Icon from "../components/Icon"
import QuoteForm from "../components/QuoteForm"
import Breadcrumb from "../components/Breadcrumb"
import PageLink from "../components/PageLink"
import { CONTACT, emailHref, googleMapsHref, phoneHref, whatsappHref } from "../data/contact"
import { useLang } from "../i18n/LangContext"
import type { Page } from "../lib/routes"

interface Channel {
  icon: string
  label: string
  value: string
  href: string
  external: boolean
}

export default function ContactPage({ navigate }: { navigate: (p: Page) => void }) {
  const { t, pick } = useLang()

  // Only channels the owner has confirmed. Nothing is shown as a placeholder.
  const channels: Channel[] = []
  const wa = whatsappHref()
  if (wa) {
    channels.push({
      icon: "whatsapp",
      label: "WhatsApp",
      value: pick({ nl: "Stuur een bericht met foto's", en: "Send a message with photos", uk: "Надішліть повідомлення з фото", ru: "Отправьте сообщение с фото" }),
      href: wa,
      external: true,
    })
  }
  const tel = phoneHref()
  if (tel && CONTACT.phoneDisplay) {
    channels.push({
      icon: "phone",
      label: pick({ nl: "Telefoon", en: "Phone", uk: "Телефон", ru: "Телефон" }),
      value: CONTACT.phoneDisplay,
      href: tel,
      external: false,
    })
  }
  const mail = emailHref()
  if (mail && CONTACT.email) {
    channels.push({ icon: "mail", label: "E-mail", value: CONTACT.email, href: mail, external: false })
  }

  const maps = googleMapsHref()

  return (
    <>
      <section className="hero hero--contact">
        <div className="container">
          <Breadcrumb navigate={navigate} items={[{ label: t("nav_contact") }]} />
          <h1>
            {pick({ nl: "Neem contact op met Bouwvast", en: "Contact Bouwvast", uk: "Зв'яжіться з Bouwvast", ru: "Свяжитесь с Bouwvast" })}
          </h1>
          <p className="lead-xl max-w-2xl">
            {pick({
              nl: "Heeft u plannen, een concrete verbouwing of wilt u eerst overleggen? Beschrijf uw situatie en we nemen contact met u op.",
              en: "Have plans, a specific renovation, or want to talk it through first? Describe your situation and we will get in touch.",
              uk: "Маєте плани, конкретний ремонт або хочете спершу порадитися? Опишіть ситуацію, і ми з вами зв'яжемося.",
              ru: "Есть планы, конкретный ремонт или хотите сначала посоветоваться? Опишите ситуацию, и мы с вами свяжемся.",
            })}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {channels.length > 0 && (
            <ul className="grid grid-3 mb-16 list-none p-0">
              {channels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noopener noreferrer" : undefined}
                    className="card p-6 flex flex-col items-center text-center hover:border-[var(--brand)] hover:shadow-md transition-all no-underline text-inherit group h-full"
                  >
                    <span className="w-12 h-12 rounded-xl bg-[var(--brand-tint)] flex items-center justify-center mb-4">
                      <Icon name={channel.icon} size={24} color="var(--brand)" />
                    </span>
                    <span className="text-base font-bold mb-1">{channel.label}</span>
                    <span className="text-sm font-semibold text-[var(--fg)]">{channel.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}

          <div className="grid md:grid-cols-[1.3fr_0.9fr] gap-12 items-start">
            <div className="card p-6 md:p-8 shadow-md" id="quote">
              <h2 className="text-2xl font-bold mb-2">{t("form_title")}</h2>
              <p className="text-sm text-[var(--muted)] mb-6">{t("form_sub")}</p>
              <QuoteForm sourcePage="contact" />
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="text-lg font-bold mb-3">{CONTACT.legalName ?? "Bouwvast"}</h2>
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">{t("footer_desc")}</p>
                <ul className="space-y-2 text-sm text-[var(--fg)] list-none p-0 m-0">
                  {CONTACT.address && (
                    <li className="flex items-center gap-2">
                      <Icon name="pin" size={16} color="var(--brand)" />
                      {maps ? (
                        <a href={maps} target="_blank" rel="noopener noreferrer">
                          {CONTACT.address}
                        </a>
                      ) : (
                        <span>{CONTACT.address}</span>
                      )}
                    </li>
                  )}
                  {CONTACT.hours && (
                    <li className="flex items-center gap-2">
                      <Icon name="clock" size={16} color="var(--brand)" />
                      <span>{CONTACT.hours}</span>
                    </li>
                  )}
                  {CONTACT.kvk && <li>KvK {CONTACT.kvk}</li>}
                  <li>
                    <PageLink to="werkgebied" navigate={navigate}>
                      {t("nav_area")}
                    </PageLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
