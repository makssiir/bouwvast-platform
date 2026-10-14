import Icon from "../components/Icon"
import PageHero from "../components/PageHero"
import QuoteForm from "../components/QuoteForm"
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
      <PageHero
        navigate={navigate}
        crumbs={[{ label: t("nav_contact") }]}
        eyebrow={t("nav_contact")}
        title={pick({ nl: "Neem contact op met Bouwvast", en: "Contact Bouwvast", uk: "Зв'яжіться з Bouwvast", ru: "Свяжитесь с Bouwvast" })}
        lead={pick({
          nl: "Heeft u plannen, een concrete verbouwing of wilt u eerst overleggen? Beschrijf uw situatie en we nemen contact met u op.",
          en: "Have plans, a specific renovation, or want to talk it through first? Describe your situation and we will get in touch.",
          uk: "Маєте плани, конкретний ремонт або хочете спершу порадитися? Опишіть ситуацію, і ми з вами зв'яжемося.",
          ru: "Есть планы, конкретный ремонт или хотите сначала посоветоваться? Опишите ситуацию, и мы с вами свяжемся.",
        })}
      />

      <section className="section">
        <div className="container">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-14">
            <div className="form-card" id="quote">
              <h2 className="mb-2 text-[1.6rem]">{t("form_title")}</h2>
              <p className="mb-7 text-muted">{t("form_sub")}</p>
              <QuoteForm sourcePage="contact" />
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28">
              {channels.length > 0 && (
                <div className="card">
                  <h2 className="mb-4 text-lg">
                    {pick({ nl: "Direct contact", en: "Direct contact", uk: "Прямий зв'язок", ru: "Прямая связь" })}
                  </h2>
                  <ul className="contact-list">
                    {channels.map((channel) => (
                      <li key={channel.label}>
                        <a
                          href={channel.href}
                          target={channel.external ? "_blank" : undefined}
                          rel={channel.external ? "noopener noreferrer" : undefined}
                          className="contact-link"
                        >
                          <span className="icon-tile" aria-hidden="true">
                            <Icon name={channel.icon} size={20} />
                          </span>
                          <span>
                            <small>{channel.label}</small>
                            <strong>{channel.value}</strong>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="card">
                <h2 className="mb-5 text-lg">
                  {pick({ nl: "Wat er daarna gebeurt", en: "What happens next", uk: "Що буде далі", ru: "Что будет дальше" })}
                </h2>
                <ol className="mini-steps">
                  {(["how_2", "how_3", "how_4"] as const).map((key) => (
                    <li key={key}>
                      <strong>{t(`${key}_title`)}</strong>
                      <p>{t(`${key}_desc`)}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="card">
                <h2 className="mb-2 text-lg">{CONTACT.legalName ?? "Bouwvast"}</h2>
                <p className="mb-4 text-[0.9375rem] text-muted">{t("footer_desc")}</p>
                <ul className="info-list">
                  {CONTACT.address && (
                    <li>
                      <Icon name="home" size={16} />
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
                    <li>
                      <Icon name="clock" size={16} />
                      <span>{CONTACT.hours}</span>
                    </li>
                  )}
                  {CONTACT.kvk && (
                    <li>
                      <Icon name="shield" size={16} />
                      <span>KvK {CONTACT.kvk}</span>
                    </li>
                  )}
                  <li>
                    <Icon name="pin" size={16} />
                    <PageLink to="werkgebied" navigate={navigate}>
                      {t("nav_area")}
                    </PageLink>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
