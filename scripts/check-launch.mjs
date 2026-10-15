#!/usr/bin/env node
/**
 * Pre-launch gate: refuses a production launch while owner-supplied facts,
 * legal approval or server configuration are missing.
 *
 *   npm run check:launch          (reads .env when present)
 *
 * Exit code 1 = blocking problems. Warnings are printed but do not fail.
 */
import { existsSync, readFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const { COMPANY, REQUIRED_FOR_LAUNCH } = await import("../src/data/company.ts")
const { CLAIMS } = await import("../src/data/claims.ts")
const { LEGAL } = await import("../src/data/legal.ts")
const { SERVICE_PRICES, ESTIMATOR } = await import("../src/data/pricing.ts")
const { PROJECTS } = await import("../src/data/projects.ts")
const { CITIES } = await import("../src/data/cities.ts")
const { loadConfig, notifierConfigured } = await import("../server/config.mjs")

const errors = []
const warnings = []
const env = process.env

// --- Company data -----------------------------------------------------------
for (const key of REQUIRED_FOR_LAUNCH) {
  const field = COMPANY[key]
  if (!field.verified || !String(field.value).trim())
    errors.push(`Company field "${key}" is missing or unverified (src/data/company.ts).`)
  else if (!field.source) warnings.push(`Company field "${key}" has no source noted.`)
}
for (const [key, field] of Object.entries(COMPANY)) {
  if (field.verified && !String(field.value).trim()) errors.push(`Company field "${key}" is verified but empty.`)
}

// --- Claims -----------------------------------------------------------------
for (const [key, c] of Object.entries(CLAIMS)) {
  if (c.enabled && !c.source?.trim())
    errors.push(`Claim "${key}" is enabled without a source/evidence (src/data/claims.ts).`)
}
if (CLAIMS.pricing.enabled && Object.keys(SERVICE_PRICES).length === 0)
  errors.push("CLAIMS.pricing is enabled but SERVICE_PRICES is empty (src/data/pricing.ts).")
if (!ESTIMATOR.ratesChecked)
  errors.push(
    "Calculator rates are unchecked (ESTIMATOR in src/data/pricing.ts): compare them with the real price list, then set ratesChecked: true.",
  )
if (CLAIMS.projects.enabled && PROJECTS.length === 0)
  warnings.push("CLAIMS.projects is enabled but PROJECTS is empty: the project sections stay hidden.")
if (!CLAIMS.projects.enabled || !PROJECTS.some((p) => p.beforeImage))
  warnings.push(
    'Before/after slider shows illustrations labelled "Impressie": add real projects with beforeImage (src/data/projects.ts) to replace them.',
  )
if (!COMPANY.whatsapp.verified)
  warnings.push("No confirmed WhatsApp number: WhatsApp buttons stay hidden and the pop-up points to the quote form.")

// --- Legal ------------------------------------------------------------------
if (!LEGAL.privacy.approved) errors.push("Privacy statement not approved (LEGAL.privacy.approved in src/data/legal.ts).")
else if (!LEGAL.privacy.lastUpdated) errors.push("Privacy statement approved but LEGAL.privacy.lastUpdated is empty.")
if (!LEGAL.terms.approved) errors.push("General terms not approved (LEGAL.terms.approved in src/data/legal.ts).")
if (LEGAL.processors.length === 0)
  errors.push("No processors listed (LEGAL.processors): name at least the hosting and e-mail/webhook provider.")

// --- Build configuration ----------------------------------------------------
const origin = String(env.SITE_ORIGIN ?? "").trim().replace(/\/+$/, "")
if (!origin) errors.push("SITE_ORIGIN is not set (e.g. https://huisklusdienst.nl).")
else if (!origin.startsWith("https://")) errors.push(`SITE_ORIGIN must be https: ${origin}`)
if (String(env.SITE_INDEXING ?? "true") === "false") warnings.push("SITE_INDEXING=false: the site will be noindex.")
if (String(env.INDEX_CITY_PAGES ?? "true") !== "false")
  warnings.push(
    "Place and service × place pages are indexed: every /werkgebied/<plaats>/ page tells visitors you work there. " +
      "Remove places you cannot serve from src/data/cities.ts (or build with INDEX_CITY_PAGES=false).",
  )

let leadEndpoint = String(env.VITE_LEAD_ENDPOINT ?? "").trim()
const prodEnv = join(root, ".env.production")
if (!leadEndpoint && existsSync(prodEnv)) {
  leadEndpoint = readFileSync(prodEnv, "utf8").match(/^VITE_LEAD_ENDPOINT=(.*)$/m)?.[1]?.trim() ?? ""
}
if (!leadEndpoint) errors.push("VITE_LEAD_ENDPOINT is not set: the quote form cannot deliver leads.")

const metaFile = join(root, ".ssr-build", "build-meta.json")
if (existsSync(metaFile)) {
  const meta = JSON.parse(readFileSync(metaFile, "utf8"))
  if (origin && meta.origin !== origin)
    warnings.push(`dist/ was built for "${meta.origin || "(no origin)"}", not ${origin}: rebuild before deploying.`)
} else warnings.push("No build found: run npm run build.")

// --- Server -----------------------------------------------------------------
const config = loadConfig(env)
if (!notifierConfigured(config))
  errors.push("No lead notification configured: set LEAD_WEBHOOK_URL or RESEND_API_KEY + LEAD_NOTIFY_TO + LEAD_NOTIFY_FROM.")
if (config.notify.webhookUrl && !config.notify.webhookSecret)
  errors.push("LEAD_WEBHOOK_URL is set without LEAD_WEBHOOK_SECRET (payloads would be unsigned).")
if (config.notify.webhookUrl && !config.notify.webhookUrl.startsWith("https://"))
  errors.push("LEAD_WEBHOOK_URL must be https.")
if (!env.DATA_DIR) warnings.push("DATA_DIR not set: leads go to ./data. Use a persistent, backed-up volume.")
const retentionDays = config.retentionDays
const expectedDays = Math.round(LEGAL.leadRetentionMonths * 30.44)
if (Math.abs(retentionDays - expectedDays) > 31)
  errors.push(
    `LEAD_RETENTION_DAYS=${retentionDays} does not match the privacy statement (${LEGAL.leadRetentionMonths} months).`,
  )

// --- Reminders --------------------------------------------------------------
warnings.push(`Service area lists ${CITIES.length} places (src/data/cities.ts): confirm with the owner.`)
if (!COMPANY.address.verified) warnings.push("No verified address: LocalBusiness structured data stays minimal.")

// --- Report -----------------------------------------------------------------
for (const w of warnings) console.log(`  warn  ${w}`)
for (const e of errors) console.log(`  FAIL  ${e}`)
console.log(
  errors.length
    ? `\n${errors.length} blocking issue(s): not ready for launch. See LAUNCH-CHECKLIST.md.`
    : "\nReady for launch (review the warnings above).",
)
process.exit(errors.length ? 1 : 0)
