import { CONTACT } from "../data/contact"
import { useLang } from "../i18n/LangContext"

/** Keep the legal operator distinct from the public website branding. */
export default function CompanyNotice({
  className = "",
}: {
  className?: string
}) {
  const { pick } = useLang()
  if (!CONTACT.legalName) return null

  if (CONTACT.brand && CONTACT.brandOwner) {
    return (
      <p className={className} data-company-notice>
        <strong>{CONTACT.brand}</strong>{" "}
        {pick({
          nl: "is een merk van",
          en: "is a trademark owned by",
          uk: "є торговельною маркою, що належить",
          ru: "является товарным знаком, принадлежащим",
        })}{" "}
        <strong>{CONTACT.brandOwner}</strong>
        {CONTACT.kvk && <> (KvK {CONTACT.kvk})</>}.{" "}
        {pick({
          nl: "De diensten op deze website worden aangeboden door",
          en: "Services on this website are provided by",
          uk: "Послуги на цьому сайті надає",
          ru: "Услуги на этом сайте предоставляет",
        })}{" "}
        <strong>{CONTACT.legalName}</strong>.
      </p>
    )
  }

  return (
    <p className={className} data-company-notice>
      {CONTACT.tradeName ? (
        <>
          {CONTACT.tradeName}{" "}
          {pick({
            nl: "is een handelsnaam van",
            en: "is a trading name of",
            uk: "— комерційне найменування компанії",
            ru: "— коммерческое наименование компании",
          })}{" "}
        </>
      ) : (
        <>
          {pick({
            nl: "Deze website wordt geëxploiteerd door",
            en: "This website is operated by",
            uk: "Оператор цього сайту —",
            ru: "Оператор этого сайта —",
          })}{" "}
        </>
      )}
      <strong>{CONTACT.legalName}</strong>
      {/[.!?]$/.test(CONTACT.legalName) ? "" : "."}
    </p>
  )
}
