/**
 * Builds the site and writes real HTML for every URL the site serves, plus
 * 404.html, robots.txt and (with SITE_ORIGIN) sitemap.xml.
 *
 *   node scripts/prerender.mjs
 *
 * Without this step the app is a single index.html: /diensten and
 * /werkgebied/amersfoort return whatever the host does for an unknown path,
 * and a crawler sees one empty div for the whole site.
 *
 * Environment:
 *   SITE_ORIGIN=https://www.example.nl  absolute canonicals, sitemap, structured data
 *   SITE_INDEXING=false                  staging/preview: noindex everywhere, robots Disallow
 *   INDEX_CITY_PAGES=true                offer the city pages to search engines
 */
import { build } from "vite"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const distDir = join(root, "dist")
const ssrOutDir = ".ssr-build"

const origin = String(process.env.SITE_ORIGIN ?? process.env.VITE_SITE_ORIGIN ?? "")
  .trim()
  .replace(/\/+$/, "")

if (origin) {
  let parsed
  try {
    parsed = new URL(origin)
  } catch {
    throw new Error(`SITE_ORIGIN is not a valid URL: ${origin}`)
  }
  const local = ["localhost", "127.0.0.1"].includes(parsed.hostname)
  if (parsed.protocol !== "https:" && !local) {
    throw new Error(`SITE_ORIGIN must use https:// (got ${origin})`)
  }
  if (parsed.pathname !== "/" || parsed.search || parsed.hash) {
    throw new Error(`SITE_ORIGIN must be an origin only, without a path (got ${origin})`)
  }
}

const indexing = String(process.env.SITE_INDEXING ?? process.env.VITE_SITE_INDEXING ?? "true") !== "false"
const indexCities =
  String(process.env.INDEX_CITY_PAGES ?? process.env.VITE_INDEX_CITY_PAGES ?? "") === "true"

// The app reads the same settings through import.meta.env, so the client
// bundle, the server bundle and this script cannot disagree.
process.env.VITE_SITE_ORIGIN = origin
process.env.VITE_SITE_INDEXING = indexing ? "true" : "false"
process.env.VITE_INDEX_CITY_PAGES = indexCities ? "true" : "false"

const LANG = "nl"
const OG_LOCALE = "nl_NL"
const SITE_NAME = "Bouwvast"

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

/** Page URLs end in a slash, matching how the files are written (dir/index.html). */
function absoluteUrl(path) {
  if (!origin) return ""
  return path ? `${origin}/${path}/` : `${origin}/`
}

function breadcrumbTrail(path, { pageForPath, metaForPage }) {
  const trail = [{ name: "Home", path: "" }]
  if (!path) return trail

  const accumulated = []
  for (const segment of path.split("/")) {
    accumulated.push(segment)
    const partial = accumulated.join("/")
    const page = pageForPath(`/${partial}`)
    if (page) {
      trail.push({ name: metaForPage(page, LANG).title, path: partial })
    }
  }
  return trail
}

function structuredData({ title, description, path, trail }) {
  if (!origin) return ""

  const url = absoluteUrl(path)
  const graph = [
    {
      "@type": "WebSite",
      "@id": `${origin}/#website`,
      url: `${origin}/`,
      name: SITE_NAME,
      inLanguage: LANG,
    },
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: title,
      description,
      inLanguage: LANG,
      isPartOf: { "@id": `${origin}/#website` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: trail.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })),
    },
  ]

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph })
  // Only "<" needs neutralising inside a JSON-LD script block.
  return `<script type="application/ld+json" data-route>${json.replace(/</g, "\\u003c")}</script>`
}

function headBlock({ title, description, path, indexable, trail, type = "website", canonical: withCanonical = true }) {
  const fullTitle = title ? `${title} · ${SITE_NAME}` : SITE_NAME
  const canonical = withCanonical ? absoluteUrl(path) : ""
  const robots = indexing && indexable ? "index, follow" : "noindex, follow"

  const tags = [
    `<title>${escapeHtml(fullTitle)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<meta name="theme-color" content="#16a34a" />`,
    `<link rel="icon" href="/favicon.svg" type="image/svg+xml" />`,
    `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:locale" content="${OG_LOCALE}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ]

  if (origin) {
    tags.push(`<meta property="og:image" content="${origin}/og-image.jpg" />`)
    tags.push(`<meta property="og:image:width" content="1200" />`)
    tags.push(`<meta property="og:image:height" content="630" />`)
  }

  if (canonical) {
    tags.push(`<link rel="canonical" href="${canonical}" />`)
    tags.push(`<meta property="og:url" content="${canonical}" />`)
  }

  if (withCanonical) {
    const jsonLd = structuredData({ title: fullTitle, description, path, trail })
    if (jsonLd) tags.push(jsonLd)
  }

  return tags.map((tag) => `    ${tag}`).join("\n")
}

function composePage(template, head, appHtml) {
  let html = template

  html = html.replace(/<html([^>]*?)\slang="[^"]*"/i, `<html$1 lang="${LANG}"`)
  if (!/<html[^>]*\slang=/i.test(html)) {
    html = html.replace(/<html/i, `<html lang="${LANG}"`)
  }

  // Drop whatever the template shipped; the per-route tags replace it.
  html = html.replace(/[ \t]*<title>[\s\S]*?<\/title>\s*\n?/i, "")
  html = html.replace(/[ \t]*<meta\s+name="description"[^>]*>\s*\n?/gi, "")
  html = html.replace(/[ \t]*<meta\s+property="og:[^"]*"[^>]*>\s*\n?/gi, "")
  html = html.replace(/[ \t]*<meta\s+name="(?:robots|twitter:[^"]*)"[^>]*>\s*\n?/gi, "")
  html = html.replace(/[ \t]*<link\s+rel="icon"[^>]*>\s*\n?/gi, "")

  html = html.replace("</head>", `${head}\n  </head>`)
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

  return html
}

function sitemapXml(routes) {
  const today = new Date().toISOString().slice(0, 10)
  const entries = routes
    .map(
      (route) => `  <url>
    <loc>${absoluteUrl(route.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`,
    )
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`
}

async function main() {
  console.log("→ building the client bundle")
  await build({ root, logLevel: "warn" })

  console.log("→ building the server bundle")
  await build({
    root,
    logLevel: "warn",
    build: {
      ssr: "src/entry-server.tsx",
      outDir: ssrOutDir,
      emptyOutDir: true,
      copyPublicDir: false,
    },
  })

  const serverEntry = pathToFileURL(join(root, ssrOutDir, "entry-server.js")).href
  const { render, allRoutes, indexableRoutes, isIndexable, metaForPage, pageForPath } =
    await import(serverEntry)

  const template = await readFile(join(distDir, "index.html"), "utf8")
  const routes = allRoutes()

  for (const route of routes) {
    const { title, description } = metaForPage(route.page, LANG)
    const trail = breadcrumbTrail(route.path, { pageForPath, metaForPage })
    const head = headBlock({
      title,
      description,
      path: route.path,
      indexable: isIndexable(route.page),
      trail,
      type: typeof route.page === "object" && route.page.type === "article" ? "article" : "website",
    })

    const appHtml = render(route.path ? `/${route.path}/` : "/")
    const html = composePage(template, head, appHtml)

    const target = route.path
      ? join(distDir, route.path, "index.html")
      : join(distDir, "index.html")
    await mkdir(dirname(target), { recursive: true })
    await writeFile(target, html, "utf8")
  }

  console.log(`→ wrote ${routes.length} pages`)

  // Served by the host for any unknown path, with status 404.
  {
    const { title, description } = metaForPage("notfound", LANG)
    const head = headBlock({ title, description, path: "", indexable: false, trail: [], canonical: false })
    await writeFile(join(distDir, "404.html"), composePage(template, head, render("/404")), "utf8")
    console.log("→ wrote 404.html")
  }

  const sitemapRoutes = indexableRoutes()
  let robots
  if (!indexing) {
    robots = "User-agent: *\nDisallow: /\n"
  } else if (origin) {
    robots = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`
  } else {
    robots = "User-agent: *\nAllow: /\n"
  }
  await writeFile(join(distDir, "robots.txt"), robots, "utf8")
  // Build settings for the verification scripts (kept outside dist so it is never served).
  await writeFile(
    join(ssrOutDir, "build-meta.json"),
    JSON.stringify({ origin, indexing, builtAt: new Date().toISOString() }, null, 2),
    "utf8",
  )

  if (origin && indexing) {
    await writeFile(join(distDir, "sitemap.xml"), sitemapXml(sitemapRoutes), "utf8")
    console.log(`→ wrote sitemap.xml with ${sitemapRoutes.length} URLs`)
  } else if (!origin) {
    console.warn(
      "! SITE_ORIGIN is not set: no sitemap, no canonicals and no structured data.\n" +
        "  Set it to the production address, for example SITE_ORIGIN=https://www.bouwvast.nl",
    )
  }
  if (!indexing) console.warn("! SITE_INDEXING=false: every page is noindex and robots.txt disallows crawling.")

  // The server bundle stays: scripts/verify-routes.mjs reads the route table
  // from it, so the audit checks the output against the same source of truth.
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
