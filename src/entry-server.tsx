import { renderToString } from "react-dom/server"
import App from "./App"
import { LangProvider } from "./i18n/LangContext"
import { pageForPath } from "./lib/routes"

/** Renders one URL to HTML at build time. */
export function render(pathname: string): string {
  const page = pageForPath(pathname) ?? "notfound"
  return renderToString(
    <LangProvider>
      <App initialPage={page} />
    </LangProvider>,
  )
}

// Re-exported so the prerender script works from this one bundle and cannot
// drift away from the route table the app itself uses.
export {
  allRoutes,
  indexableRoutes,
  isIndexable,
  metaForPage,
  pageForPath,
  pathForPage,
} from "./lib/routes"
