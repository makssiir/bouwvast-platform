import type { ReactNode } from "react"
import type { Page } from "../lib/routes"
import { useLang } from "../i18n/LangContext"
import { CONTACT, emailHref } from "../data/contact"
import { LEGAL } from "../data/legal"
import Breadcrumb from "../components/Breadcrumb"
import PageLink from "../components/PageLink"
import { LEAD_LIMITS } from "../lib/leadSchema"

/**
 * The legal texts are written in Dutch, the language of the agreement. Other
 * languages get a short note that the Dutch text is the one that applies.
 */
function LegalShell({
  title,
  navigate,
  approved,
  lastUpdated,
  children,
}: {
  title: string
  navigate: (p: Page) => void
  approved: boolean
  lastUpdated: string
  children: ReactNode
}) {
  const { t, lang } = useLang()
  return (
    <>
      <section className="hero hero--service">
        <div className="container">
          <Breadcrumb navigate={navigate} items={[{ label: title }]} />
          <h1>{title}</h1>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="prose-page mx-auto" lang="nl">
            {lang !== "nl" && <p className="notice" lang={lang}>{t("legal_dutch_only")}</p>}
            {!approved && (
              <p className="notice" role="note">
                <strong>Concept.</strong> Deze tekst is nog niet definitief vastgesteld door Bouwvast en
                kan nog wijzigen.
              </p>
            )}
            {children}
            {approved && lastUpdated && (
              <p className="text-sm text-[var(--muted)] mt-10">Laatst bijgewerkt: {lastUpdated}</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

function CompanyIdentity() {
  const parts = [
    CONTACT.legalName ?? "Bouwvast",
    CONTACT.address,
    CONTACT.kvk ? `KvK ${CONTACT.kvk}` : undefined,
  ].filter(Boolean)
  return <>{parts.join(", ")}</>
}

function ContactLine() {
  const mail = emailHref()
  if (mail && CONTACT.email) {
    return (
      <>
        per e-mail via <a href={mail}>{CONTACT.email}</a>
      </>
    )
  }
  return <>via het contactformulier op deze website</>
}

export function PrivacyPage({ navigate }: { navigate: (p: Page) => void }) {
  const { t } = useLang()
  const months = LEGAL.leadRetentionMonths
  const maxPhotos = LEAD_LIMITS.photos.maxFiles
  const maxMb = Math.round(LEAD_LIMITS.photos.maxFileBytes / (1024 * 1024))

  return (
    <LegalShell
      title={t("footer_privacy")}
      navigate={navigate}
      approved={LEGAL.privacy.approved}
      lastUpdated={LEGAL.privacy.lastUpdated}
    >
      <p>
        In deze privacyverklaring leggen we uit welke persoonsgegevens deze website verwerkt,
        waarom, en welke rechten u heeft. Verantwoordelijke voor de verwerking is{" "}
        <CompanyIdentity />.
      </p>

      <h2>Welke gegevens we verwerken</h2>
      <p>Als u het offerteformulier invult, ontvangen we:</p>
      <ul>
        <li>uw naam en telefoonnummer;</li>
        <li>uw e-mailadres, als u dat invult (optioneel);</li>
        <li>uw woonplaats of postcode en de soort werkzaamheden;</li>
        <li>de omschrijving van uw project en, als u die toevoegt, de uitkomst van de kostenindicatie;</li>
        <li>
          foto's die u meestuurt (maximaal {maxPhotos}, elk maximaal {maxMb} MB). Foto's kunnen
          locatiegegevens (EXIF) bevatten; verwijder die eventueel voordat u ze uploadt;
        </li>
        <li>de taal van de website, de pagina waarop u het formulier invulde en, als die in de
          link stond, de campagnecode (utm) waarmee u op de site kwam;</li>
        <li>technische gegevens die nodig zijn om misbruik te voorkomen: de datum en tijd van de
          aanvraag en een ingekorte vorm van uw IP-adres.</li>
      </ul>

      <h2>Waarvoor we ze gebruiken</h2>
      <p>
        We gebruiken deze gegevens alleen om uw aanvraag te beoordelen, contact met u op te nemen
        en een offerte te maken. De grondslag is het nemen van precontractuele maatregelen op uw
        verzoek (artikel 6 lid 1 sub b AVG). We gebruiken uw gegevens niet voor nieuwsbrieven of
        reclame en verkopen ze niet.
      </p>

      <h2>Hoe lang we ze bewaren</h2>
      <p>
        Leidt uw aanvraag niet tot een opdracht, dan verwijderen we de aanvraag en de foto's
        uiterlijk {months} maanden na ontvangst. Wordt het een opdracht, dan bewaren we de gegevens
        die nodig zijn voor de uitvoering en de administratie zolang de wet dat vereist (voor de
        belastingdienst in principe 7 jaar).
      </p>

      <h2>Wie de gegevens nog meer ziet</h2>
      {LEGAL.processors.length > 0 ? (
        <>
          <p>We schakelen de volgende dienstverleners in, met wie we verwerkersafspraken hebben:</p>
          <ul>
            {LEGAL.processors.map((processor) => (
              <li key={processor.name}>
                {processor.name}: {processor.purpose} ({processor.location})
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>
          Uw aanvraag wordt opgeslagen bij onze hostingpartij en per e-mail of bericht aan ons
          doorgestuurd. Met deze dienstverleners hebben we verwerkersafspraken.
        </p>
      )}

      <h2>Cookies en lokale opslag</h2>
      <p>
        Deze website plaatst geen tracking- of advertentiecookies en gebruikt geen
        analysediensten. Als u een andere taal kiest, onthoudt uw browser die keuze lokaal
        (localStorage). Die instelling verlaat uw apparaat niet en kunt u wissen via uw
        browserinstellingen. Hiervoor is geen toestemming nodig.
      </p>
      <p>
        Klikt u op een WhatsApp-knop of een link naar Google Maps, dan verlaat u deze website en
        gelden de voorwaarden en het privacybeleid van die dienst.
      </p>

      <h2>Uw rechten</h2>
      <p>
        U kunt ons vragen om inzage, correctie of verwijdering van uw gegevens, of bezwaar maken
        tegen het gebruik ervan. Neem daarvoor contact met ons op <ContactLine />. We reageren
        binnen een maand. Bent u het niet eens met hoe we met uw gegevens omgaan, dan kunt u een
        klacht indienen bij de{" "}
        <a href="https://autoriteitpersoonsgegevens.nl" rel="noopener noreferrer" target="_blank">
          Autoriteit Persoonsgegevens
        </a>
        .
      </p>

      <h2>Beveiliging</h2>
      <p>
        De website werkt uitsluitend via een versleutelde verbinding (HTTPS). Aanvragen en foto's
        worden opgeslagen op een server die alleen toegankelijk is voor Bouwvast.
      </p>
    </LegalShell>
  )
}

export function TermsPage({ navigate }: { navigate: (p: Page) => void }) {
  const { t } = useLang()
  const doc = LEGAL.terms.documentHref

  return (
    <LegalShell
      title={t("footer_terms")}
      navigate={navigate}
      approved={LEGAL.terms.approved}
      lastUpdated={LEGAL.terms.lastUpdated}
    >
      <p>
        Een aanvraag via deze website is vrijblijvend en verplicht u tot niets. Een overeenkomst
        komt pas tot stand als u een offerte van Bouwvast schriftelijk of per e-mail accepteert.
      </p>
      <p>
        Op offertes en opdrachten zijn de algemene voorwaarden van Bouwvast van toepassing. U
        ontvangt die voorwaarden samen met de offerte, zodat u ze kunt lezen voordat u akkoord
        gaat.
      </p>
      {doc && (
        <p>
          <a href={doc}>Download de algemene voorwaarden</a>
        </p>
      )}
      <p>
        Prijsindicaties en artikelen op deze website zijn algemene informatie en geen aanbod. Alleen
        de prijs en voorwaarden in de offerte zijn bindend.
      </p>
      <p>
        Vragen over de voorwaarden? Neem contact met ons op <ContactLine /> of via de{" "}
        <PageLink to="contact" navigate={navigate}>
          contactpagina
        </PageLink>
        .
      </p>
    </LegalShell>
  )
}
