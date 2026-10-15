/**
 * Audits the built site.
 *
 *   npm run build && node scripts/verify-routes.mjs
 *
 * A green build says nothing about whether a URL exists, is unique or is
 * readable without JavaScript. This checks the actual files in dist/.
 */
import { readFile } from "node:fs/promises"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const distDir = join(root, "dist")
const serverEntry = join(root, ".ssr-build", "entry-server.js")

// Defaults to the settings of the last build, so `npm run build && npm run verify:routes` just works.
let buildMeta = {}
try {
  buildMeta = JSON.parse(readFileSync(join(root, ".ssr-build", "build-meta.json"), "utf8"))
} catch {}
const origin = String(process.env.SITE_ORIGIN ?? process.env.VITE_SITE_ORIGIN ?? buildMeta.origin ?? "")
  .trim()
  .replace(/\/+$/, "")
const indexing =
  String(process.env.SITE_INDEXING ?? process.env.VITE_SITE_INDEXING ?? buildMeta.indexing ?? "true") !== "false"

let passed = 0
const failures = []

function check(label, condition, detail = "") {
  if (condition) passed += 1
  else failures.push(`${label}${detail ? ` — ${detail}` : ""}`)
}

function decodeEntities(value) {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, "&")
}

function first(html, pattern) {
  const match = html.match(pattern)
  return match ? decodeEntities(match[1].trim()) : ""
}

function visibleText(html) {
  const body = html.slice(html.indexOf("<body"))
  return body
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

async function main() {
  if (!existsSync(serverEntry)) {
    console.error("No build found. Run `npm run build` first.")
    process.exit(1)
  }

  const { allRoutes, indexableRoutes, isIndexable, metaForPage, pathForPage, pageForPath } =
    await import(pathToFileURL(serverEntry).href)
  const routes = allRoutes()
  const sitemapRoutes = indexableRoutes()
  const knownPaths = new Set(routes.map((r) => (r.path ? `/${r.path}/` : "/")))
  const titles = new Map()

  // Copy that must never reach a page until the owner can prove it.
  const BANNED = [
    [/\bVCA\b/i, "VCA certification"],
    [/\d+\s*(?:jaar|years?|роки|років|лет|года)\s*(?:garantie|warranty|гарант)|(?:oplever|kwaliteits|schriftelijke |volledige )garantie|(?:written|formal|full) warranty|100% ?garantie/i, "warranty promise"],
    [/1[.,]500\+|25\+ jaar|25\+ years/i, "unverified statistics"],
    [/★|⭐/, "star ratings"],
    [/binnen 24 uur|within 24 hours|binnen 1 werkdag/i, "response-time promise"],
    [/gratis|free (?:quote|survey|inspection)|безкоштовн|бесплатн/i, "free-of-charge promise"],
    [/\bundefined\b|\bNaN\b|\[object Object\]/, "rendering artefact"],
    [/tel:(?:"|undefined)|mailto:(?:"|undefined)|wa\.me\/(?:"|undefined)/, "empty contact link"],
    [/Figma Make App/i, "scaffold default"],
  ]

  for (const route of routes) {
    const label = route.path ? `/${route.path}/` : "/"
    const file = route.path ? join(distDir, route.path, "index.html") : join(distDir, "index.html")

    if (!existsSync(file)) {
      failures.push(`${label} — no HTML file was written`)
      continue
    }

    const html = await readFile(file, "utf8")
    const title = first(html, /<title>([\s\S]*?)<\/title>/i)
    const description = first(html, /<meta\s+name="description"\s+content="([^"]*)"/i)
    const robots = first(html, /<meta\s+name="robots"\s+content="([^"]*)"/i)
    const lang = first(html, /<html[^>]*\slang="([^"]*)"/i)
    const text = visibleText(html)
    const indexable = isIndexable(route.page)

    check(`${label} has a title`, title.length > 0)
    check(`${label} has a description`, description.length > 20, description)
    check(
      `${label} robots matches the route table`,
      indexable ? robots.startsWith("index") : robots.startsWith("noindex"),
      robots,
    )
    check(`${label} declares Dutch`, lang === "nl", lang)
    check(`${label} has exactly one h1`, (html.match(/<h1[\s>]/gi) ?? []).length === 1)
    check(`${label} has exactly one main landmark`, (html.match(/<main[\s>]/gi) ?? []).length === 1)
    check(`${label} renders content without JS`, text.length > 400, `${text.length} chars`)

    const forms = (html.match(/<form[\s>]/gi) ?? []).length
    check(`${label} has at most one form`, forms <= 1, `${forms} forms`)

    for (const [pattern, what] of BANNED) {
      const hit = text.match(pattern) ?? html.match(pattern)
      check(`${label} contains no ${what}`, !hit, hit ? hit[0] : "")
    }

    // Every <img> carries alt text (empty for decorative) and dimensions.
    for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
      check(`${label} image has alt`, /\salt="/i.test(tag), tag.slice(0, 80))
      check(`${label} image has width/height`, /\swidth="/i.test(tag) && /\sheight="/i.test(tag), tag.slice(0, 80))
    }

    // Internal links point at pages that exist.
    for (const match of html.matchAll(/<a\b[^>]*\shref="([^"]*)"/gi)) {
      const href = decodeEntities(match[1])
      check(`${label} has no empty link`, href !== "" && href !== "#", href)
      if (!href.startsWith("/") || href.startsWith("//")) continue
      const path = href.split(/[?#]/)[0]
      const isFile = /\.[a-z0-9]+$/i.test(path)
      check(
        `${label} link ${path} resolves`,
        isFile ? existsSync(join(distDir, path)) : knownPaths.has(path),
      )
    }

    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
    check(`${label} has unique ids`, dupes.length === 0, [...new Set(dupes)].join(", "))

    const seen = titles.get(title)
    check(`${label} title is unique`, seen === undefined, seen ? `same as ${seen}` : "")
    if (seen === undefined) titles.set(title, label)

    const canonical = first(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i)
    if (origin) {
      const expected = route.path ? `${origin}/${route.path}/` : `${origin}/`
      check(`${label} is self-canonical`, canonical === expected, `${canonical} != ${expected}`)
      check(`${label} carries structured data`, /application\/ld\+json/.test(html))
      check(`${label} has an absolute og:image`, html.includes(`content="${origin}/og-image.jpg"`))
    } else {
      check(`${label} has no canonical without SITE_ORIGIN`, canonical === "", canonical)
    }

    const resolved = pageForPath(label)
    check(
      `${label} resolves back to itself`,
      resolved !== null && pathForPage(resolved) === route.path,
      resolved === null ? "unroutable" : pathForPage(resolved),
    )

    const meta = metaForPage(route.page, "nl")
    check(`${label} title matches the route table`, title.startsWith(meta.title || "Huisklusdienst"))
  }

  // 404 page: exists, not indexable, no canonical, no structured data.
  const notFoundFile = join(distDir, "404.html")
  check("404.html exists", existsSync(notFoundFile))
  if (existsSync(notFoundFile)) {
    const html = await readFile(notFoundFile, "utf8")
    check("404.html is noindex", /<meta\s+name="robots"\s+content="noindex/i.test(html))
    check("404.html has no canonical", !/rel="canonical"/i.test(html))
    check("404.html has an h1", /<h1[\s>]/i.test(html))
  }

  check("unknown URLs do not resolve", pageForPath("/bestaat-niet") === null && pageForPath("/diensten/onbekend") === null)
  const serviceCity = pageForPath("/werkgebied/amsterdam/loodgieter/")
  check(
    "service × major place URLs resolve",
    serviceCity?.type === "serviceCity" && serviceCity.city === "Amsterdam" && serviceCity.slug === "loodgieter",
  )
  check("service × smaller place URLs do not resolve", pageForPath("/werkgebied/soest/loodgieter") === null)
  check("unknown services in a place do not resolve", pageForPath("/werkgebied/amsterdam/onbekend") === null)

  // Structured data on a service × place page: valid JSON with the business and the local service.
  {
    const file = join(distDir, "werkgebied", "amsterdam", "loodgieter", "index.html")
    if (existsSync(file)) {
      const html = await readFile(file, "utf8")
      const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
      let parsed = []
      try {
        parsed = blocks.map((m) => JSON.parse(m[1]))
      } catch {
        parsed = null
      }
      check("service × place JSON-LD parses", Array.isArray(parsed) && parsed.length > 0)
      const types = JSON.stringify(parsed ?? [])
      check("service × place page has FAQPage markup", types.includes('"FAQPage"'))
      if (origin) {
        check("service × place page describes the local service", types.includes('"Service"') && types.includes('"City"'))
        check("service × place page names the business", types.includes('"HomeAndConstructionBusiness"'))
      }
    }
  }

  const robotsTxt = await readFile(join(distDir, "robots.txt"), "utf8")
  if (indexing) {
    check("robots.txt allows crawling", /Allow: \//.test(robotsTxt) && !/Disallow: \/\s/.test(robotsTxt))
    check("robots.txt names the AI crawlers", ["GPTBot", "OAI-SearchBot", "ClaudeBot", "PerplexityBot"].every((a) => robotsTxt.includes(`User-agent: ${a}`)))
    for (const name of ["llms.txt", "llms-full.txt"]) {
      const path = join(distDir, name)
      const body = existsSync(path) ? await readFile(path, "utf8") : ""
      check(`${name} exists`, body.startsWith("# Huisklusdienst"))
      for (const [pattern, what] of BANNED) {
        const hit = body.match(pattern)
        check(`${name} contains no ${what}`, !hit, hit ? hit[0] : "")
      }
    }
  } else {
    check("robots.txt blocks crawling on staging", /Disallow: \//.test(robotsTxt))
  }

  if (origin && indexing) {
    const sitemapPath = join(distDir, "sitemap.xml")
    if (!existsSync(sitemapPath)) {
      failures.push("sitemap.xml is missing")
    } else {
      const sitemap = await readFile(sitemapPath, "utf8")
      const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
      const expected = sitemapRoutes.map((r) => (r.path ? `${origin}/${r.path}/` : `${origin}/`))
      check("sitemap lists every indexable route", locs.length === expected.length, `${locs.length} vs ${expected.length}`)
      check("sitemap has no extra URLs", expected.every((url) => locs.includes(url)))
      check("sitemap has no duplicates", new Set(locs).size === locs.length)
      check("sitemap has no noindex pages", sitemapRoutes.every((r) => isIndexable(r.page)))
    }
    check("robots.txt points at the sitemap", robotsTxt.includes(`${origin}/sitemap.xml`))
  }

  console.log(`${passed} checks passed across ${routes.length} URLs`)
  if (failures.length > 0) {
    console.log(`\n${failures.length} failed:`)
    for (const failure of failures.slice(0, 60)) console.log(`  ${failure}`)
    process.exit(1)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
