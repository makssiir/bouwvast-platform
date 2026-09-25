/**
 * Audits the built site.
 *
 *   npm run build && node scripts/verify-routes.mjs
 *
 * A green build says nothing about whether a URL exists, is unique or is
 * readable without JavaScript. This checks the actual files in dist/.
 */
import { readFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const distDir = join(root, "dist")
const serverEntry = join(root, ".ssr-build", "entry-server.js")

const origin = String(process.env.SITE_ORIGIN ?? process.env.VITE_SITE_ORIGIN ?? "")
  .trim()
  .replace(/\/+$/, "")

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

  const { indexableRoutes, metaForPage, pathForPage, pageForPath } = await import(
    pathToFileURL(serverEntry).href
  )
  const routes = indexableRoutes()
  const titles = new Map()

  for (const route of routes) {
    const label = `/${route.path}`
    const file = route.path
      ? join(distDir, route.path, "index.html")
      : join(distDir, "index.html")

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

    check(`${label} has a title`, title.length > 0)
    check(`${label} title is not the scaffold default`, !/Figma Make App/i.test(title), title)
    check(`${label} has a description`, description.length > 0)
    check(`${label} is indexable`, robots.startsWith("index"), robots)
    check(`${label} declares Dutch`, lang === "nl", lang)
    check(`${label} has an h1`, /<h1[\s>]/i.test(html))
    check(`${label} renders content without JS`, text.length > 500, `${text.length} chars`)

    // Never two request forms on one page asking different questions.
    const forms = (html.match(/<form[\s>]/gi) ?? []).length
    check(`${label} has at most one form`, forms <= 1, `${forms} forms`)

    const seen = titles.get(title)
    check(`${label} title is unique`, seen === undefined, seen ? `same as ${seen}` : "")
    if (seen === undefined) titles.set(title, label)

    if (origin) {
      const canonical = first(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i)
      const expected = route.path ? `${origin}/${route.path}` : `${origin}/`
      check(`${label} is self-canonical`, canonical === expected, `${canonical} != ${expected}`)
      check(`${label} carries structured data`, /application\/ld\+json/.test(html))
    }

    // The URL must resolve back to exactly the page it was generated from.
    const resolved = pageForPath(label)
    check(
      `${label} resolves back to itself`,
      resolved !== null && pathForPage(resolved) === route.path,
      resolved === null ? "unroutable" : pathForPage(resolved),
    )

    const meta = metaForPage(route.page, "nl")
    check(`${label} title matches the route table`, title.startsWith(meta.title || "Bouwvast"))
  }

  if (origin) {
    const sitemapPath = join(distDir, "sitemap.xml")
    if (!existsSync(sitemapPath)) {
      failures.push("sitemap.xml is missing")
    } else {
      const sitemap = await readFile(sitemapPath, "utf8")
      const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
      const expected = routes.map((r) => (r.path ? `${origin}/${r.path}` : `${origin}/`))
      check("sitemap lists every route", locs.length === expected.length, `${locs.length} vs ${expected.length}`)
      check("sitemap has no extra URLs", expected.every((url) => locs.includes(url)))
      check("sitemap has no duplicates", new Set(locs).size === locs.length)
    }

    const robotsTxt = await readFile(join(distDir, "robots.txt"), "utf8")
    check("robots.txt points at the sitemap", robotsTxt.includes(`${origin}/sitemap.xml`))
  }

  console.log(`${passed} checks passed across ${routes.length} URLs`)
  if (failures.length > 0) {
    console.log(`\n${failures.length} failed:`)
    for (const failure of failures.slice(0, 40)) console.log(`  ${failure}`)
    process.exit(1)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
