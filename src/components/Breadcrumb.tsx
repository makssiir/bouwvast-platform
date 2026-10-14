import PageLink from "./PageLink"
import { useLang } from "../i18n/LangContext"
import type { Page } from "../lib/routes"

export interface Crumb {
  label: string
  /** Omit for the current page. */
  to?: Page
}

/** Breadcrumb trail made of real links; the last item is the current page. */
export default function Breadcrumb({
  items,
  navigate,
  className = "",
}: {
  items: Crumb[]
  navigate: (page: Page) => void
  className?: string
}) {
  const { t, pick } = useLang()
  const trail: Crumb[] = [{ label: t("nav_home"), to: "home" }, ...items]

  return (
    <nav
      aria-label={pick({ nl: "Kruimelpad", en: "Breadcrumb", uk: "Навігаційний ланцюжок", ru: "Навигационная цепочка" })}
      className={`breadcrumb mb-4 ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-x-2 list-none p-0 m-0">
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1
          return (
            <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
              {crumb.to && !last ? (
                <PageLink to={crumb.to} navigate={navigate} className="breadcrumb-link">
                  {crumb.label}
                </PageLink>
              ) : (
                <span aria-current="page" className="font-semibold breadcrumb-current">
                  {crumb.label}
                </span>
              )}
              {!last && <span aria-hidden="true">›</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
