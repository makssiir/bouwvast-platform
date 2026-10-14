import type { ReactNode } from "react"
import type { Page } from "../lib/routes"
import Breadcrumb, { type Crumb } from "./Breadcrumb"
import { imageSize } from "../data/images"

/** Header band for every page except the homepage. */
export default function PageHero({
  navigate,
  crumbs,
  eyebrow,
  title,
  lead,
  image,
  imageAlt = "",
  children,
}: {
  navigate: (p: Page) => void
  crumbs?: Crumb[]
  eyebrow?: ReactNode
  title: ReactNode
  lead?: ReactNode
  image?: string
  imageAlt?: string
  /** Optional actions shown under the lead. */
  children?: ReactNode
}) {
  return (
    <section className={`page-hero ${image ? "page-hero--media" : ""}`}>
      <div className="container page-hero-inner">
        <div>
          {crumbs && <Breadcrumb navigate={navigate} items={crumbs} />}
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1>{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {children && <div className="btn-row page-hero-actions">{children}</div>}
        </div>
        {image && (
          <figure className="page-hero-media">
            <img src={image} alt={imageAlt} {...imageSize(image)} decoding="async" fetchPriority="high" />
          </figure>
        )}
      </div>
    </section>
  )
}
