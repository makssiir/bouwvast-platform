/**
 * Drives the built site in a real browser, served by the production server.
 *
 *   npm run build && npm run verify:browser
 *
 * Needs Playwright (npm i -D playwright && npx playwright install chromium),
 * or set PLAYWRIGHT_CHROMIUM to an existing Chromium binary.
 */
import { spawn } from "node:child_process"
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises"
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

  console.log("\n9. Widgets: calculator, area checker, before/after, pop-up")
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
    // The pop-up has its own checks below; keep it out of the way here.
    await ctx.addInitScript(() => {
      try {
        sessionStorage.setItem("bv-nudge-seen", "1")
      } catch {}
    })
    const page = await ctx.newPage()
    const problems = watch(page)
    await page.goto(`${base}/`)
    await page.waitForLoadState("networkidle")

    const calc = page.locator("#calculator")
    const price = calc.locator('[data-testid="estimate-price"]')
    const first = await price.textContent()
    await calc.getByRole("button", { name: /Badkamer & keuken/ }).click()
    check("calculator: choosing the type of work updates the price", (await price.textContent()) !== first)
    await calc.getByRole("button", { name: "Volgende stap" }).click()
    const slider = calc.locator('input[type="range"]')
    const area0 = Number(await slider.inputValue())
    await calc.getByRole("button", { name: "Meer", exact: true }).click()
    check("calculator: + raises the floor area", Number(await slider.inputValue()) > area0)
    await slider.focus()
    await page.keyboard.press("ArrowRight")
    check("calculator: the slider works with the keyboard", Number(await slider.inputValue()) > area0 + 1)
    await calc.getByRole("button", { name: "Volgende stap" }).click()
    await calc.getByRole("button", { name: /Luxe/ }).click()
    const range = (await price.textContent()) ?? ""
    check("calculator: shows a euro range", /€\s?[\d.]+\s?–\s?€\s?[\d.]+/.test(range), range)
    check("calculator: says it is an indication, not a quote", /geen offerte/i.test((await calc.textContent()) ?? ""))
    await calc.getByRole("button", { name: /Offerte aanvragen voor deze berekening/ }).click()
    const attached = page.locator('#quote [data-testid="estimate-attached"]')
    await attached.waitFor({ timeout: 3000 }).catch(() => {})
    check("calculator: the calculation is attached to the quote form", await attached.isVisible())
    const description = await page.locator("#quote textarea").inputValue()
    check("calculator: the description is pre-filled", /badkamer/i.test(description), description)

    const areaCheck = page.locator("#werkgebied-check")
    const input = areaCheck.getByRole("textbox")
    const result = areaCheck.locator('[data-testid="area-result"]')
    await input.fill("3811")
    await input.press("Enter")
    check(
      "area checker: 3811 is in the service area (Amersfoort)",
      (await result.getAttribute("data-status")) === "covered" && /Amersfoort/.test((await result.textContent()) ?? ""),
    )
    await result.getByRole("button", { name: /Offerte aanvragen/ }).click()
    const cityField = page.locator('#quote input[autocomplete="address-level2"]')
    await page
      .waitForFunction(
        () => /Amersfoort/.test(document.querySelector('#quote input[autocomplete="address-level2"]')?.value ?? ""),
        null,
        { timeout: 3000 },
      )
      .catch(() => {})
    check("area checker: the place is pre-filled in the form", /Amersfoort/.test(await cityField.inputValue()), await cityField.inputValue())
    await input.fill("9711")
    await input.press("Enter")
    check("area checker: an unknown postcode gets 'we check', not 'no'", (await result.getAttribute("data-status")) === "unknown")
    await input.fill("??")
    await areaCheck.getByRole("button", { name: "Controleer" }).click()
    check("area checker: nonsense input is flagged", (await input.getAttribute("aria-invalid")) === "true")
    await areaCheck.getByRole("button", { name: /Utrecht \(3511\)/ }).click()
    check("area checker: quick picks work", /Utrecht/.test((await result.textContent()) ?? ""))

    const quote = page.locator("#quote form")
    await quote.locator('input[autocomplete="name"]').fill("Widget Test")
    await quote.locator('input[autocomplete="tel"]').fill("06 12345678")
    await quote.locator('button[type="submit"]').click()
    const status = page.locator('[role="status"]', { hasText: /BV-\d{6}-/ })
    await status.waitFor({ timeout: 10_000 }).catch(() => {})
    const ids = await readdir(join(dataDir, "leads")).catch(() => [])
    let estimate = ""
    for (const id of ids) {
      const lead = JSON.parse(await readFile(join(dataDir, "leads", id, "lead.json"), "utf8").catch(() => "{}"))
      if (lead.lead?.name === "Widget Test" || lead.name === "Widget Test") estimate = lead.lead?.estimate ?? lead.estimate ?? ""
    }
    check("the lead arrives with the calculation", /Badkamer/.test(estimate) && /€/.test(estimate), estimate || `${ids.length} lead(s)`)

    const handle = page.locator('#voor-na [role="slider"]')
    await handle.scrollIntoViewIfNeeded()
    const start = Number(await handle.getAttribute("aria-valuenow"))
    await handle.focus()
    await page.keyboard.press("ArrowLeft")
    check("before/after: arrow keys move the divider", Number(await handle.getAttribute("aria-valuenow")) < start)
    const box = await page.locator("#voor-na .ba-frame").boundingBox()
    if (box) await page.mouse.click(box.x + box.width * 0.25, box.y + box.height / 2)
    const clicked = Number(await handle.getAttribute("aria-valuenow"))
    check("before/after: clicking the photo moves the divider", Math.abs(clicked - 25) <= 3, String(clicked))
    check("before/after: illustrations are labelled as such", (await page.locator("#voor-na .ba-impression").count()) > 0)
    check("no WhatsApp links without a confirmed number", (await page.locator('a[href*="wa.me"]').count()) === 0)
    check("widgets: no console errors", problems.length === 0, problems.slice(0, 3).join(" | "))
    await ctx.close()
  }
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
    const page = await ctx.newPage()
    await page.clock.install()
    await page.goto(`${base}/`)
    await page.waitForLoadState("networkidle")
    const nudge = page.locator('[data-testid="nudge"]')
    check("pop-up: not there straight away", (await nudge.count()) === 0)
    await page.clock.runFor(10_000)
    check("pop-up: appears after a little while", await nudge.isVisible())
    check("pop-up: points to the quote form without a WhatsApp number", /Offerte aanvragen/.test((await nudge.textContent()) ?? ""))
    await nudge.getByRole("button", { name: "Sluiten" }).click()
    check("pop-up: closes", (await nudge.count()) === 0)
    await page.reload()
    await page.waitForLoadState("networkidle")
    await page.clock.runFor(15_000)
    check("pop-up: only once per visit", (await nudge.count()) === 0)
    await ctx.close()

    const contact = await browser.newContext({ viewport: { width: 1280, height: 900 } })
    const page2 = await contact.newPage()
    await page2.clock.install()
    await page2.goto(`${base}/contact/`)
    await page2.waitForLoadState("networkidle")
    await page2.clock.runFor(15_000)
    check("pop-up: never on the contact page", (await page2.locator('[data-testid="nudge"]').count()) === 0)
    await contact.close()

    const phone = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
    const page3 = await phone.newPage()
    await page3.clock.install()
    await page3.goto(`${base}/`)
    await page3.waitForLoadState("networkidle")
    await page3.clock.runFor(15_000)
    check("pop-up: not on phones (the contact bar covers it)", (await page3.locator('[data-testid="nudge"]').count()) === 0)
    const calc3 = page3.locator("#calculator")
    await calc3.getByRole("button", { name: "Volgende stap" }).click()
    await calc3.getByRole("button", { name: "Volgende stap" }).click()
    await calc3.getByRole("button", { name: "Bekijk uw richtprijs" }).click()
    check(
      "calculator on phones: the last step leads to the price",
      await page3.evaluate(() => document.activeElement?.classList.contains("estimator-result") === true),
    )
    await phone.close()
  }
} finally {
  console.log(`\n${passed} passed, ${failed} failed`)
  await browser.close()
  server.kill()
  await rm(dataDir, { recursive: true, force: true })
}
process.exit(failed > 0 ? 1 : 0)
