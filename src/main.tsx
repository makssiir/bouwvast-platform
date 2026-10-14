import React from "react"
import ReactDOM from "react-dom/client"
import "@fontsource-variable/plus-jakarta-sans"
import App from "./App"
import "./index.css"
import { LangProvider } from "./i18n/LangContext"

const root = document.getElementById("root")!
const app = (
  <React.StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </React.StrictMode>
)

// Prerendered pages are hydrated in place; the dev server starts empty.
if (root.firstElementChild) ReactDOM.hydrateRoot(root, app)
else ReactDOM.createRoot(root).render(app)
