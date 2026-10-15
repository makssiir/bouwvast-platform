import { renderToString } from "react-dom/server"
import App from "./App"
import { LangProvider } from "./i18n/LangContext"
import { pageForPath } from "./lib/routes"
import { loadLocalPages } from "./lib/localPages"

/** Loads the code-split page modules; call once before render(). */
export async function prepare(): Promise<void> {
  await loadLocalPages()
}

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
// Build-time reminders (scripts/prerender.mjs).
export { ESTIMATOR } from "./data/pricing"
export { CONTACT } from "./data/contact"
export { schemaNodes } from "./lib/schema"
export { llmsTxt, llmsFullTxt } from "./lib/llms"

export {
  allRoutes,
  indexableRoutes,
  isIndexable,
  metaForPage,
  pageForPath,
  pathForPage,
} from "./lib/routes"
