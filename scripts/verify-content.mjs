/**
 * Checks shared source content before building: multilingual service registry,
 * request choices, image references and the agreed VAT / no-obligation copy.
 */
import { existsSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import translations from "../src/i18n/translations.ts"
import { SERVICES, HEAT_PUMP_SCOPE } from "../src/data/services.ts"
import { SERVICES_LIST } from "../src/data/cities.ts"
import { SERVICE_LOCAL } from "../src/data/serviceLocal.ts"
import { HEATING_TIPS } from "../src/data/heatingTips.ts"
import { TRAITS } from "../src/data/localTraits.ts"
import { IMAGE_SIZES } from "../src/data/images.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
let passed = 0
const failures = []
function check(label, ok) {
  if (ok) passed++
  else failures.push(label)
}

const keys = Object.keys(translations.nl).sort()
for (const [lang, dict] of Object.entries(translations)) {
  check(`${lang}: same translation keys`, JSON.stringify(Object.keys(dict).sort()) === JSON.stringify(keys))
  check(`${lang}: no contradictory yes in no-obligation answer`, !/^(?:Ja|Yes|Так|Да)[.!:\s]/i.test(dict.faq_4_a))
  for (const key of ["faq_1_a", "quote_vat_note", "vat_business_note", "vat_estimator_note", "est_vat_basis", "hero_visual_disclosure", "quote_more_services"])
    check(`${lang}: ${key} exists`, typeof dict[key] === "string" && dict[key].trim().length > 5)
  for (const service of SERVICES) {
    for (const key of [service.nameKey, service.descKey, service.introKey, ...service.includesKeys, service.noteKey].filter(Boolean))
      check(`${lang}: ${service.slug} / ${key}`, Boolean(dict[key]?.trim()))
  }
}
check("unique service identifiers", new Set(SERVICES.map((s) => s.slug)).size === SERVICES.length)
check("unique canonical service names", new Set(SERVICES.map((s) => s.name)).size === SERVICES.length)
for (const service of SERVICES) {
  check(`${service.slug}: accepted canonical lead name`, SERVICES_LIST.includes(service.name))
  check(`${service.slug}: localized place-page data`, Boolean(SERVICE_LOCAL[service.slug]))
  check(`${service.slug}: image exists`, existsSync(join(root, "public", service.image)))
  check(`${service.slug}: image dimensions declared`, Boolean(IMAGE_SIZES[service.image]?.width))
}
for (const slug of ["warmtepompen", "vloerverwarming", "verwarming", "demontage-ramen-deuren"])
  check(`${slug}: dedicated service`, SERVICES.some((s) => s.slug === slug && s.noteKey))
for (const slug of ["warmtepompen", "vloerverwarming", "verwarming"])
  check(`${slug}: heating-specific context`, SERVICE_LOCAL[slug]?.group === "heating")
for (const id of Object.keys(TRAITS))
  check(`${id}: heating tip in every language`, ["nl", "en", "uk", "ru"].every((lang) => HEATING_TIPS[id]?.[lang]))
check("heat-pump review cannot be claimed without evidence", !HEAT_PUMP_SCOPE.reviewed || Boolean(HEAT_PUMP_SCOPE.source.trim()))
check("consumer VAT wording is explicit", /particulieren.*inclusief btw/i.test(translations.nl.faq_1_a))
check("business net pricing is explicit", /doorgaans exclusief btw/i.test(translations.nl.vat_business_note))
check("quote contains gross total as well as net amounts", /zonder btw.*totaal inclusief btw/i.test(translations.nl.quote_vat_note))

for (const failure of failures) console.error(`  FAIL  ${failure}`)
console.log(`${passed} content checks passed, ${failures.length} failed (${SERVICES.length} services, ${keys.length} keys per language).`)
process.exit(failures.length ? 1 : 0)