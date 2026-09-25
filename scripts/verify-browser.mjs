/**
 * Proves the routing works in a real browser.
 *
 *   npm run build
 *   npm i -D playwright && npx playwright install chromium
 *   node scripts/verify-browser.mjs
 *
 * verify-routes.mjs reads the built files; this one drives them: deep links,
 * the address bar, the back button and a 404 for an address we do not serve.
 * Set PLAYWRIGHT_CHROMIUM to point at an existing Chromium binary.
 */
import http from "node:http"
import { readFile, stat } from "node:fs/promises"
import { dirname, extname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

let chromium
try {
  ;({ chromium } = await import("playwright"))
} catch {
  console.error("This check needs Playwright:\n  npm i -D playwright && npx playwright install chromium")
  process.exit(1)
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const dist = join(root, "dist")

const CONTENT_TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
}

// Behaves like a static host: /diensten serves /diensten/index.html, and an
// address with no file behind it is a real 404.
const server = http.createServer(async (request, response) => {
  const url = decodeURIComponent(request.url.split("?")[0])
  let file = join(dist, url)
  try {
    const stats = await stat(file)
    if (stats.isDirectory()) file = join(file, "index.html")
  } catch {
    response.writeHead(404)
    return response.end("Not found")
  }
  try {
    const body = await readFile(file)
    response.writeHead(200, {
      "Content-Type": CONTENT_TYPES[extname(file)] ?? "application/octet-stream",
    })
    response.end(body)
  } catch {
    response.writeHead(404)
    response.end("Not found")
  }
})

await new Promise((resolveListen) => server.listen(0, resolveListen))
const base = `http://127.0.0.1:${server.address().port}`

let passed = 0
let failed = 0
function check(label, condition, detail = "") {
  if (condition) {
    passed += 1
    console.log(`  PASS  ${label}`)
  } else {
    failed += 1
    console.log(`  FAIL  ${label}${detail ? ` — ${detail}` : ""}`)
  }
}

const browser = await chromium.launch(
  process.env.PLAYWRIGHT_CHROMIUM ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM } : {},
)

console.log("\n1. Deep link with JavaScript switched off")
const noScript = await browser.newContext({ javaScriptEnabled: false, locale: "nl-NL" })
const bare = await noScript.newPage()
await bare.goto(`${base}/diensten/timmerman`)
const bareTitle = await bare.title()
const bareHeading = (await bare.locator("h1").first().textContent())?.trim() ?? ""
check("the title is this page's title", bareTitle.startsWith("Timmerman"), bareTitle)
check("the heading is rendered server-side", /Timmerman/i.test(bareHeading), bareHeading)
await noScript.close()

const context = await browser.newContext({ locale: "nl-NL" })
const page = await context.newPage()

console.log("\n2. Deep link with the app running")
await page.goto(`${base}/werkgebied/s-hertogenbosch`)
await page.waitForLoadState("networkidle")
check("a city with an apostrophe resolves", /Hertogenbosch/i.test(await page.title()), await page.title())
check(
  "the city page is what renders",
  /Hertogenbosch/i.test((await page.locator("h1").first().textContent()) ?? ""),
)

console.log("\n3. Navigating inside the app writes real history")
await page.locator("footer a", { hasText: "Projecten" }).first().click()
await page.waitForFunction(() => location.pathname === "/projecten")
check("the address bar followed", new URL(page.url()).pathname === "/projecten", page.url())
check("the title followed", (await page.title()).startsWith("Projecten"), await page.title())

console.log("\n4. Back button")
await page.goBack()
await page.waitForFunction(
  () => location.pathname.replace(/\/$/, "") === "/werkgebied/s-hertogenbosch",
)
check("the address is restored", true)
check(
  "the page is restored",
  /Hertogenbosch/i.test((await page.locator("h1").first().textContent()) ?? ""),
)

console.log("\n5. Navigation is made of real links")
const navHref = await page.locator("header nav a").first().getAttribute("href")
check("header navigation has an href", typeof navHref === "string" && navHref.startsWith("/"), String(navHref))
const cityLinks = await page.locator("footer a[href^='/werkgebied/']").count()
check("the footer links cities by URL", cityLinks > 0, String(cityLinks))

console.log("\n6. An address we do not serve")
const missing = await page.goto(`${base}/geen-idee`)
check("the host answers 404", missing?.status() === 404, String(missing?.status()))

console.log(`\n${passed} passed, ${failed} failed`)

await browser.close()
server.close()
process.exit(failed > 0 ? 1 : 0)
