/**
 * Builds the site and writes real HTML for every indexable URL.
 *
 *   node scripts/prerender.mjs
 *
 * Without this step the app is a single index.html: /diensten and
 * /werkgebied/amersfoort return whatever the host does for an unknown path,
 * and a crawler sees one empty div for the whole site.
 *
 * Set SITE_ORIGIN (or VITE_SITE_ORIGIN) to the production address to get
 * absolute canonicals, a sitemap and structured data.
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

const LANG = "uk"
const SITE_NAME = "Bouwvast"

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function absoluteUrl(path) {
  if (!origin) return ""
  return path ? `${origin}/${path}` : `${origin}/`
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
  return `<script type="application/ld+json">${json.replace(/</g, "\\u003c")}</script>`
}

function headBlock({ title, description, path, indexable, trail }) {
  const fullTitle = title ? `${title} · ${SITE_NAME}` : SITE_NAME
  const canonical = absoluteUrl(path)

  const tags = [
    `<title>${escapeHtml(fullTitle)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="robots" content="${indexable ? "index, follow" : "noindex, follow"}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:locale" content="${LANG}" />`,
  ]

  if (canonical) {
    tags.push(`<link rel="canonical" href="${canonical}" />`)
    tags.push(`<meta property="og:url" content="${canonical}" />`)
  }

  const jsonLd = structuredData({ title: fullTitle, description, path, trail })
  if (jsonLd) tags.push(jsonLd)

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
  const { render, indexableRoutes, isIndexable, metaForPage, pageForPath } =
    await import(serverEntry)

  const template = await readFile(join(distDir, "index.html"), "utf8")
  const routes = indexableRoutes()

  for (const route of routes) {
    const { title, description } = metaForPage(route.page, LANG)
    const trail = breadcrumbTrail(route.path, { pageForPath, metaForPage })
    const head = headBlock({
      title,
      description,
      path: route.path,
      indexable: isIndexable(route.page),
      trail,
    })

    const appHtml = render(route.path ? `/${route.path}` : "/")
    const html = composePage(template, head, appHtml)

    const target = route.path
      ? join(distDir, route.path, "index.html")
      : join(distDir, "index.html")
    await mkdir(dirname(target), { recursive: true })
    await writeFile(target, html, "utf8")
  }

  console.log(`→ wrote ${routes.length} pages`)

  const robots = origin
    ? `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`
    : `User-agent: *\nAllow: /\n`
  await writeFile(join(distDir, "robots.txt"), robots, "utf8")

  if (origin) {
    await writeFile(join(distDir, "sitemap.xml"), sitemapXml(routes), "utf8")
    console.log(`→ wrote sitemap.xml with ${routes.length} URLs`)
  } else {
    console.warn(
      "! SITE_ORIGIN is not set: no sitemap, no canonicals and no structured data.\n" +
        "  Set it to the production address, for example SITE_ORIGIN=https://www.bouwvast.nl",
    )
  }

  // The server bundle stays: scripts/verify-routes.mjs reads the route table
  // from it, so the audit checks the output against the same source of truth.
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
