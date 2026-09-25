import type { MouseEvent, ReactNode } from "react"
import { hrefForPage } from "../lib/routes"
import type { Page } from "../lib/routes"

/**
 * An in-app link that is a real anchor: crawlers can follow it, visitors can
 * open it in a new tab, and the address bar stays truthful.
 */
export default function PageLink({
  to,
  navigate,
  className,
  children,
  ariaLabel,
  ariaCurrent,
}: {
  to: Page
  navigate: (page: Page) => void
  className?: string
  children: ReactNode
  ariaLabel?: string
  ariaCurrent?: "page" | undefined
}) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Leave modified clicks to the browser: new tab, new window, download.
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }
    event.preventDefault()
    navigate(to)
  }

  return (
    <a
      href={hrefForPage(to)}
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
    >
      {children}
    </a>
  )
}
