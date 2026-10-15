import Icon from "./Icon"
import { useLang } from "../i18n/LangContext"

/**
 * Reassurance about the existing request process, not badges that imply a
 * licence, insurance policy or warranty the owner has not evidenced.
 */
export default function TrustBar() {
  const { t } = useLang()

  return (
    <div className="trust-bar">
      <ul className="container trust-bar-list">
        {([1, 2, 3] as const).map((n) => (
          <li key={n}>
            <Icon name="check" size={16} strokeWidth={2.4} />
            <span className="trust-bar-full">{t(`hero_trust_${n}`)}</span>
            <span className="trust-bar-short">{t(`trust_short_${n}`)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}