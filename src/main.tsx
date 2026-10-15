import React from "react"
import ReactDOM from "react-dom/client"
import "@fontsource-variable/inter"
import "@fontsource-variable/manrope"
import App from "./App"
import "./index.css"
import { LangProvider } from "./i18n/LangContext"
import { loadLocalPages, needsLocalPages } from "./lib/localPages"
import { pageForPath } from "./lib/routes"

const root = document.getElementById("root")!
const app = (
  <React.StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </React.StrictMode>
)

const start = () => {
  // Prerendered pages are hydrated in place; the dev server starts empty.
  if (root.firstElementChild) ReactDOM.hydrateRoot(root, app)
  else ReactDOM.createRoot(root).render(app)
}

// A place page needs its chunk before hydrating, or React would see different
// markup. If the chunk cannot load, the prerendered page stays as plain HTML.
const first = pageForPath(window.location.pathname)
if (first && needsLocalPages(first)) {
  loadLocalPages().then(start, () => {
    if (!root.firstElementChild) start()
  })
} else {
  start()
}
