/**
 * Drives the built site in a real browser, served by the production server.
 *
 *   npm run build && npm run verify:browser
 *
 * Needs Playwright (npm i -D playwright && npx playwright install chromium),
 * or set PLAYWRIGHT_CHROMIUM to an existing Chromium binary.
 */
import { spawn } from "node:child_process"
import { mkdtemp, readdir, rm } from "node:fs/promises"
import { existsSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { createServer } from "node:net"

let chromium
try {
  ;({ chromium } = await import("playwright"))
} catch {
  console.error("This check needs Playwright:\n  npm i -D playwright && npx playwright install chromium")
  process.exit(1)
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
if (!existsSync(join(root, "dist", "index.html"))) {
  console.error("No build found. Run `npm run build` first.")
  process.exit(1)
}

const freePort = () =>
  new Promise((ok) => {
    const s = createServer().listen(0, () => {
      const { port } = s.address()
      s.close(() => ok(port))
    })
  })

const port = await freePort()
const dataDir = await mkdtemp(join(tmpdir(), "bouwvast-browser-"))
const server = spawn(process.execPath, ["server/index.mjs"], {
  cwd: root,
  env: { ...process.env, PORT: String(port), HOST: "127.0.0.1", DATA_DIR: dataDir, SITE_ORIGIN: "", LEAD_RATE_LIMIT_MAX: "50" },
  stdio: ["ignore", "pipe", "pipe"],
})
await new Promise((ok, fail) => {
  const timer = setTimeout(() => fail(new Error("server did not start")), 10_000)
  server.stdout.on("data", (chunk) => {
    if (String(chunk).includes("listening")) {
      clearTimeout(timer)
      ok()
    }
  })
  server.on("exit", (code) => fail(new Error(`server exited with ${code}`)))
})
const base = `http://127.0.0.1:${port}`

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

/** Collects console errors, page errors and CSP violations. */
function watch(page) {
  const problems = []
  page.on("console", (msg) => {
    if (msg.type() === "error" || /hydrat/i.test(msg.text())) problems.push(msg.text())
  })
  page.on("pageerror", (error) => problems.push(String(error)))
  return problems
}

const pathOf = (page) => new URL(page.url()).pathname

try {
  console.log("\n1. Deep link with JavaScript switched off")
  {
    const ctx = await browser.newContext({ javaScriptEnabled: false })
    const page = await ctx.newPage()
    await page.goto(`${base}/diensten/timmerman/`)
    check("title is this page's", (await page.title()).startsWith("Timmerman"), await page.title())
    check("heading is server-rendered", /Timmerman/i.test((await page.locator("h1").textContent()) ?? ""))
    check("the quote form is present without JS", (await page.locator("form").count()) === 1)
    await ctx.close()
  }

  console.log("\n2. Every page hydrates cleanly")
  {
    const ctx = await browser.newContext()
    const page = await ctx.newPage()
    const problems = watch(page)
    for (const path of ["/", "/diensten/", "/diensten/renovatie/", "/projecten/", "/werkgebied/", "/werkgebied/amersfoort/", "/contact/", "/zakelijk/", "/kennisbank/", "/kennisbank/badkamer-renoveren-stappenplan/", "/privacy/", "/voorwaarden/"]) {
      const response = await page.goto(base + path)
      await page.waitForLoadState("networkidle")
      check(`${path} answers 200`, response?.status() === 200, String(response?.status()))
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      check(`${path} has no horizontal overflow`, overflow <= 1, `${overflow}px`)
    }
    check("no console errors, hydration warnings or CSP violations", problems.length === 0, problems.slice(0, 3).join(" | "))
    await ctx.close()
  }

  console.log("\n3. In-app navigation, history and focus")
  {
    const ctx = await browser.newContext()
    const page = await ctx.newPage()
    await page.goto(`${base}/werkgebied/amersfoort/`)
    await page.waitForLoadState("networkidle")
    await page.locator("footer a[href='/projecten/']").first().click()
    await page.waitForFunction(() => location.pathname === "/projecten/")
    check("address bar followed", pathOf(page) === "/projecten/")
    check("title followed", (await page.title()).startsWith("Projecten"), await page.title())
    check("focus moved to the main content", await page.evaluate(() => document.activeElement?.id === "main"))
    await page.goBack()
    await page.waitForFunction(() => location.pathname === "/werkgebied/amersfoort/")
    check("back button restores the page", /Amersfoort/.test((await page.locator("h1").textContent()) ?? ""))
    await page.goto(`${base}/kennisbank/`)
    await page.locator("main a[href^='/kennisbank/']").first().click()
    await page.waitForFunction(() => /^\/kennisbank\/.+\/$/.test(location.pathname))
    check("articles have their own URL", /^\/kennisbank\/.+\/$/.test(pathOf(page)), pathOf(page))
    await ctx.close()
  }

  console.log("\n4. Unknown address")
  {
    const ctx = await browser.newContext()
    const page = await ctx.newPage()
    const response = await page.goto(`${base}/geen-idee`)
    check("server answers 404", response?.status() === 404, String(response?.status()))
    await page.waitForLoadState("networkidle")
    check("the not-found page is shown", /niet gevonden/i.test((await page.locator("h1").textContent()) ?? ""))
    check("…and is noindex", (await page.locator('meta[name="robots"]').getAttribute("content"))?.startsWith("noindex"))
    const redirect = await page.goto(`${base}/diensten`)
    check("/diensten redirects to /diensten/", pathOf(page) === "/diensten/" && redirect?.status() === 200)
    await ctx.close()
  }

  console.log("\n5. Quote form: validation, delivery, receipt")
  {
    const ctx = await browser.newContext()
    const page = await ctx.newPage()
    await page.goto(`${base}/contact/`)
    await page.waitForLoadState("networkidle")
    const form = page.locator("form")
    await form.locator('button[type="submit"]').click()
    const invalid = await form.locator('[aria-invalid="true"]').count()
    check("empty submit marks the required fields invalid", invalid >= 3, String(invalid))
    check("focus goes to the first invalid field", await page.evaluate(() => document.activeElement?.getAttribute("aria-invalid") === "true"))
    await form.locator("textarea").fill("Badkamer vernieuwen, ongeveer 6 m2, inclusief tegelwerk.")
    await form.locator('input[autocomplete="name"]').fill("Test Bezoeker")
    await form.locator('input[autocomplete="tel"]').fill("06 12345678")
    await form.locator('input[autocomplete="address-level2"]').fill("Leusden")
    await form.locator('button[type="submit"]').click()
    const status = page.locator('[role="status"]', { hasText: /BV-\d{6}-/ })
    await status.waitFor({ timeout: 10_000 }).catch(() => {})
    check("success shows the server's reference", (await status.count()) > 0)
    const stored = await readdir(join(dataDir, "leads")).catch(() => [])
    check("the lead is stored on the server", stored.length === 1, String(stored.length))
    await ctx.close()
  }

  console.log("\n6. Language preference, with and without storage")
  {
    const ctx = await browser.newContext()
    const page = await ctx.newPage()
    await page.goto(`${base}/`)
    await page.waitForLoadState("networkidle")
    await page.locator('button[aria-controls="lang-options"]').click()
    await page.locator("#lang-options button", { hasText: "English" }).click()
    check("switching updates <html lang>", (await page.evaluate(() => document.documentElement.lang)) === "en")
    await page.reload()
    await page.waitForLoadState("networkidle")
    check("the choice survives a reload", (await page.evaluate(() => document.documentElement.lang)) === "en")
    await ctx.close()

    const blocked = await browser.newContext()
    await blocked.addInitScript(() => {
      Object.defineProperty(window, "localStorage", {
        get() {
          throw new DOMException("blocked", "SecurityError")
        },
      })
    })
    const page2 = await blocked.newPage()
    const problems = watch(page2)
    await page2.goto(`${base}/`)
    await page2.waitForLoadState("networkidle")
    await page2.locator('button[aria-controls="lang-options"]').click()
    await page2.locator("#lang-options button", { hasText: "English" }).click()
    check("blocked storage: the site still works and switches language", (await page2.evaluate(() => document.documentElement.lang)) === "en")
    check("blocked storage: no errors", problems.length === 0, problems.join(" | "))
    await blocked.close()
  }

  console.log("\n7. Keyboard and mobile")
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
    const page = await ctx.newPage()
    await page.goto(`${base}/`)
    await page.waitForLoadState("networkidle")
    await page.keyboard.press("Tab")
    check("first Tab reaches the skip link", await page.evaluate(() => document.activeElement?.classList.contains("skip-link")))
    const toggle = page.locator('button[aria-controls="nav-mobile"]')
    await toggle.click()
    check("menu opens", (await toggle.getAttribute("aria-expanded")) === "true")
    await page.keyboard.press("Escape")
    check("Escape closes the menu", (await toggle.getAttribute("aria-expanded")) === "false")
    check("focus returns to the menu button", await page.evaluate(() => document.activeElement?.getAttribute("aria-controls") === "nav-mobile"))
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    check("no horizontal overflow on mobile", overflow <= 1, `${overflow}px`)
    await ctx.close()
  }

  console.log("\n8. Response headers")
  {
    const response = await fetch(`${base}/`)
    check("CSP is sent", (response.headers.get("content-security-policy") ?? "").includes("default-src 'self'"))
    check("framing is refused", (response.headers.get("content-security-policy") ?? "").includes("frame-ancestors 'none'"))
    const asset = (await (await fetch(`${base}/`)).text()).match(/\/assets\/[^"]+\.js/)?.[0]
    const assetResponse = asset ? await fetch(base + asset) : null
    check("hashed assets are cached immutably", assetResponse?.headers.get("cache-control")?.includes("immutable") === true)
  }
} finally {
  console.log(`\n${passed} passed, ${failed} failed`)
  await browser.close()
  server.kill()
  await rm(dataDir, { recursive: true, force: true })
}
process.exit(failed > 0 ? 1 : 0)
