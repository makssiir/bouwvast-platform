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
import { SERVICES, SERVICE_GROUPS } from "../src/data/services.ts"

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
const dataDir = await mkdtemp(join(tmpdir(), "huisklusdienst-browser-"))
const server = spawn(process.execPath, ["server/index.mjs"], {
  cwd: root,
  env: {
    ...process.env,
    PORT: String(port),
    HOST: "127.0.0.1",
    DATA_DIR: dataDir,
    SITE_ORIGIN: "",
    LEAD_RATE_LIMIT_MAX: "50",
    // Tests must never notify a real recipient, even in a configured shell.
    LEAD_WEBHOOK_URL: "",
    RESEND_API_KEY: "",
    LEAD_NOTIFY_TO: "",
    LEAD_NOTIFY_FROM: "",
  },
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
    check("the no-JS form explains how to enable the interactive steps", /JavaScript/.test((await page.locator("noscript").textContent()) ?? ""))
    await ctx.close()
  }

  console.log("\n2. Every page hydrates cleanly")
  {
    const ctx = await browser.newContext()
    const page = await ctx.newPage()
    const problems = watch(page)
    for (const path of ["/", "/diensten/", "/diensten/renovatie/", "/diensten/warmtepompen/", "/diensten/vloerverwarming/", "/diensten/verwarming/", "/diensten/ramen-deuren/", "/diensten/demontage-ramen-deuren/", "/projecten/", "/werkgebied/", "/werkgebied/amersfoort/", "/werkgebied/amsterdam/loodgieter/", "/werkgebied/soest/", "/contact/", "/zakelijk/", "/kennisbank/", "/kennisbank/badkamer-renoveren-stappenplan/", "/privacy/", "/voorwaarden/"]) {
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
    // Place pages come in their own chunk: it must load on an in-app navigation too.
    await page.goto(`${base}/werkgebied/`)
    await page.waitForLoadState("networkidle")
    await page.locator("main a[href='/werkgebied/amsterdam/']").first().click()
    await page.waitForFunction(() => location.pathname === "/werkgebied/amsterdam/")
    await page.locator("h1", { hasText: "Amsterdam" }).waitFor({ timeout: 5000 }).catch(() => {})
    check("in-app navigation renders a place page", /Klusbedrijf in Amsterdam/.test((await page.locator("h1").textContent()) ?? ""))
    await page.locator("main a[href='/werkgebied/amsterdam/loodgieter/']").first().click()
    await page.waitForFunction(() => location.pathname === "/werkgebied/amsterdam/loodgieter/")
    check("place page links to the service in that place", /Loodgieter in Amsterdam/.test((await page.locator("h1").textContent()) ?? ""))
    check("title follows to the service × place page", (await page.title()).startsWith("Loodgieter in Amsterdam"), await page.title())
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

  console.log("\n5. Project-first quote form: validation, preservation, delivery")
  {
    const ctx = await browser.newContext()
    const page = await ctx.newPage()
    await page.goto(`${base}/contact/`)
    await page.waitForLoadState("networkidle")
    const form = page.locator("form")
    let posts = 0
    page.on("request", (request) => {
      if (request.method() === "POST" && new URL(request.url()).pathname === "/api/leads") posts += 1
    })
    check("starts with a project choice, not personal details", (await form.getAttribute("data-step")) === "1" && !(await form.locator('input[autocomplete="name"]').isVisible()))
    check("later steps cannot be skipped", (await form.locator(".quote-progress button:disabled").count()) === 2)
    await form.locator('[data-service="other"]').click()
    check("one project click opens details without sending anything", (await form.getAttribute("data-step")) === "2" && posts === 0)
    await form.locator('button[type="submit"]').click()
    const invalid = await form.locator('[aria-invalid="true"]:visible').count()
    check("other work needs a place and description, but no contacts yet", invalid === 2, String(invalid))
    await page.waitForFunction(() => document.activeElement?.getAttribute("aria-invalid") === "true", null, { timeout: 2000 }).catch(() => {})
    check("focus goes to the first invalid field", await page.evaluate(() => document.activeElement?.getAttribute("aria-invalid") === "true"))
    await form.locator("textarea").fill("Badkamer vernieuwen, ongeveer 6 m2, inclusief tegelwerk.")
    await form.locator('input[autocomplete="address-level2"]').fill("Leusden")
    await form.locator(".quote-photo-details summary").click()
    await form.locator('input[type="file"]').setInputFiles(join(root, "public/images/bath-after.webp"))
    await form.locator('button[type="submit"]').click()
    check("contacts are requested only in the last step", (await form.getAttribute("data-step")) === "3" && posts === 0)
    check("last step shows the project summary", /Leusden/.test((await form.locator(".quote-review").textContent()) ?? ""))
    await form.locator('button[type="submit"]').click()
    check("empty final step marks only name and phone", (await form.locator('[aria-invalid="true"]:visible').count()) === 2)
    await form.locator('input[autocomplete="name"]').fill("Test Bezoeker")
    await form.locator('input[autocomplete="tel"]').fill("123")
    await form.locator('button[type="submit"]').click()
    check("a bad phone stays on the contact step", (await form.locator('input[type="tel"]').getAttribute("aria-invalid")) === "true" && posts === 0)
    await form.locator('input[autocomplete="tel"]').fill("06 12345678")
    await form.locator('input[type="email"]').fill("not-an-email")
    await form.locator('button[type="submit"]').click()
    check("an invalid optional email is explained before anything is sent", (await form.locator('input[type="email"]').getAttribute("aria-invalid")) === "true" && posts === 0)
    await form.locator('input[type="email"]').fill("")
    await form.locator(".quote-actions").getByRole("button", { name: "Terug", exact: true }).click()
    check("going back keeps the place and description", (await form.locator("textarea").inputValue()).includes("6 m2") && (await form.locator('input[autocomplete="address-level2"]').inputValue()) === "Leusden")
    check("going back keeps the actual photo selection", await form.locator('input[type="file"]').evaluate((input) => input.files.length === 1))
    await form.locator('button[type="submit"]').click()
    check("returning to contact keeps the typed name and phone", (await form.locator('input[autocomplete="name"]').inputValue()) === "Test Bezoeker" && (await form.locator('input[autocomplete="tel"]').inputValue()) === "06 12345678")
    await form.locator('button[type="submit"]').click()
    const status = page.locator('[role="status"]', { hasText: /HK-\d{6}-/ })
    await status.waitFor({ timeout: 10_000 }).catch(() => {})
    check("success shows the server's reference", (await status.count()) > 0)
    const stored = await readdir(join(dataDir, "leads")).catch(() => [])
    check("the lead is stored on the server", stored.length === 1, String(stored.length))
    const record = JSON.parse(await readFile(join(dataDir, "leads", stored[0], "lead.json"), "utf8"))
    check("step navigation never submits a partial lead", posts === 1, String(posts))
    check("photos and project data reach the server", record.photos?.length === 1 && record.lead?.city === "Leusden" && record.lead?.description?.includes("6 m2"))
    await page.getByRole("button", { name: "Nog een aanvraag doen" }).click()
    check("a new request starts clean", (await form.getAttribute("data-step")) === "1" && (await form.locator("textarea").inputValue()) === "" && (await form.locator('input[autocomplete="name"]').inputValue()) === "")
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
        sessionStorage.setItem("hk-nudge-seen", "1")
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
    const dialog = page.locator('[data-testid="area-dialog"]')
    await input.fill("??")
    await areaCheck.getByRole("button", { name: "Verder" }).click()
    check("area checker: nonsense input is flagged", (await input.getAttribute("aria-invalid")) === "true")
    check("area checker: nonsense input opens nothing", (await dialog.count()) === 0)

    await input.fill("3811ab")
    await input.press("Enter")
    await dialog.waitFor({ timeout: 3000 }).catch(() => {})
    check("area checker: a postcode opens the lead dialog", await dialog.isVisible())
    check("area dialog: is a modal dialog", (await dialog.getAttribute("role")) === "dialog" && (await dialog.getAttribute("aria-modal")) === "true")
    check("area dialog: never claims the place is covered", /persoonlijk/.test((await dialog.textContent()) ?? ""))
    const placeField = dialog.locator('input[autocomplete="postal-code"]')
    check("area dialog: the postcode is pre-filled and tidied", (await placeField.inputValue()) === "3811 AB", await placeField.inputValue())
    check("area dialog: focus moves into the dialog", await dialog.evaluate((node) => node.contains(document.activeElement)))
    await page.keyboard.press("Escape")
    check("area dialog: Escape closes it", (await dialog.count()) === 0)

    await input.fill("9711")
    await input.press("Enter")
    await dialog.waitFor({ timeout: 3000 }).catch(() => {})
    await dialog.getByRole("button", { name: "Klus doorgeven" }).click()
    check("area dialog: asks what the job is", (await dialog.getByText("Kies een klus of beschrijf kort").count()) > 0)
    check("area dialog: name and phone are required", (await dialog.locator('[aria-invalid="true"]').count()) >= 3)
    check("area dialog: every service is present in the grouped choices", await dialog.locator('input[type="radio"][name$="-service"]').count() === SERVICES.length + 1)
    check("area dialog: the new window installation service is available", await dialog.locator('label.choice:has(input[value="ramen-deuren"])').isVisible())
    check("area dialog: every service choice has a full-size touch target", await dialog.locator(".choice").evaluateAll((labels) => labels.every((label) => label.getBoundingClientRect().height >= 44 && label.getBoundingClientRect().width >= 44)))
    const areaCloseBox = await dialog.getByRole("button", { name: "Sluiten", exact: true }).boundingBox()
    check("area dialog: the close control is at least 44 pixels", areaCloseBox && areaCloseBox.width >= 44 && areaCloseBox.height >= 44)
    await dialog.getByText("Loodgieterswerk & sanitair", { exact: true }).click()
    check("area dialog: a chosen job makes the description optional", (await dialog.getByText("Kies een klus of beschrijf kort").count()) === 0)
    await dialog.locator('input[autocomplete="name"]').fill("Dialoog Test")
    await dialog.locator('input[autocomplete="tel"]').fill("06 12345678")
    await dialog.getByText("E-mail", { exact: true }).click()
    await dialog.getByRole("button", { name: "Klus doorgeven" }).click()
    check("area dialog: asks for an email address when contact is by email", (await dialog.locator('input[type="email"][aria-invalid="true"]').count()) === 1)
    await dialog.getByText("WhatsApp", { exact: true }).click()
    await dialog.getByRole("button", { name: "Klus doorgeven" }).click()
    const done = dialog.locator('[data-testid="area-lead-success"]')
    await done.waitFor({ timeout: 10_000 }).catch(() => {})
    check("area dialog: a job, name and phone are enough", /HK-\d{6}-/.test((await done.textContent()) ?? ""))
    let quick = null
    for (const id of await readdir(join(dataDir, "leads")).catch(() => [])) {
      const record = JSON.parse(await readFile(join(dataDir, "leads", id, "lead.json"), "utf8").catch(() => "{}"))
      if (record.lead?.name === "Dialoog Test") quick = record.lead
    }
    check(
      "area dialog: the lead arrives with job, place, preference and source",
      quick?.service === "Loodgieter" &&
        quick?.city === "9711" &&
        quick?.contactPreference === "whatsapp" &&
        quick?.sourcePage === "area-check:home",
      JSON.stringify(quick),
    )
    await done.getByRole("button", { name: "Sluiten" }).click()
    check("area dialog: closes after sending", (await dialog.count()) === 0)
    check(
      "area checker: the place is also offered to the quote form",
      (await page.locator('#quote input[autocomplete="address-level2"]').inputValue()) === "9711",
    )

    const quote = page.locator("#quote form")
    await quote.locator('button[type="submit"]').click()
    await quote.locator('input[autocomplete="name"]').fill("Widget Test")
    await quote.locator('input[autocomplete="tel"]').fill("06 12345678")
    await quote.locator('button[type="submit"]').click()
    const status = page.locator('[role="status"]', { hasText: /HK-\d{6}-/ })
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
    await page.locator(".ba-controls").getByRole("button", { name: "Na", exact: true }).click()
    check("before/after: a button shows the complete after image", Number(await handle.getAttribute("aria-valuenow")) === 0)
    const fullBox = await page.locator("#voor-na .ba-frame").boundingBox()
    const handleBox = await handle.boundingBox()
    check("before/after: the handle stays fully inside the photo at an endpoint", fullBox && handleBox && handleBox.x >= fullBox.x && handleBox.x + handleBox.width <= fullBox.x + fullBox.width)
    await page.locator(".ba-controls").getByRole("button", { name: "Voor", exact: true }).click()
    check("before/after: a button shows the complete before image", Number(await handle.getAttribute("aria-valuenow")) === 100)
    await page.locator(".ba-controls").getByRole("button", { name: "Vergelijk", exact: true }).click()
    check("before/after: comparison can be reset without dragging", Number(await handle.getAttribute("aria-valuenow")) === 50)
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

  console.log("\n10. CRO entry points and route-specific context")
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" })
    await ctx.addInitScript(() => { sessionStorage.setItem("hk-nudge-seen", "1") })
    const page = await ctx.newPage()
    await page.goto(base + "/")
    await page.waitForLoadState("networkidle")
    check("trust bar contains process reassurance, not invented credentials", (await page.locator(".trust-bar li").count()) === 3 && !/licensed|fully insured|bonded|VCA/i.test((await page.locator(".trust-bar").textContent()) ?? ""))
    await page.locator(".home-hero").getByRole("button", { name: "Bespreek uw project" }).click()
    await page.waitForFunction(() => document.activeElement?.classList.contains("quote-step-title"))
    check("hero CTA focuses the first project step", (await page.locator("#quote form").getAttribute("data-step")) === "1")
    await page.locator("#voor-na").getByRole("button", { name: "Badkamerrenovatie", exact: true }).click()
    await page.locator("#voor-na").getByRole("button", { name: "Bespreek mijn project" }).click()
    const form = page.locator("#quote form")
    await page.waitForFunction(() => document.querySelector("#quote form")?.getAttribute("data-step") === "2")
    check("inspiration CTA preselects the matching service", /Badkamer & keuken/.test((await form.locator(".quote-selection").textContent()) ?? ""))
    check("inspiration never invents the visitor's description", (await form.locator("textarea").inputValue()) === "")
    await form.locator("textarea").fill("Mijn eigen projectomschrijving blijft bewaard.")
    await page.locator("#calculator").getByRole("button", { name: "Offerte aanvragen voor deze berekening" }).click()
    check("calculator does not overwrite a visitor's own description", (await form.locator("textarea").inputValue()) === "Mijn eigen projectomschrijving blijft bewaard.")
    await form.locator(".quote-selection button").click()
    await form.locator('[data-service="uitbouw-aanbouw"]').click()
    check("changing to unrelated work removes the stale estimate", (await form.locator('[data-testid="estimate-attached"]').count()) === 0)
    check("changing work still preserves the visitor's own text", (await form.locator("textarea").inputValue()) === "Mijn eigen projectomschrijving blijft bewaard.")

    await page.goto(base + "/diensten/timmerman/")
    await page.waitForLoadState("networkidle")
    check("a service page skips a question already answered by the route", (await page.locator("#quote form").getAttribute("data-step")) === "2" && /Timmerman/.test((await page.locator("#quote .quote-selection").textContent()) ?? ""))
    await page.locator('main a[href="/diensten/renovatie/"]').first().click()
    await page.waitForFunction(() => location.pathname === "/diensten/renovatie/")
    check("in-app service navigation refreshes the form's service", /Woningrenovatie/.test((await page.locator("#quote .quote-selection").textContent()) ?? ""))
    await page.goto(base + "/werkgebied/amsterdam/loodgieter/")
    await page.waitForLoadState("networkidle")
    check("service × place page carries both route defaults", /Loodgieter/.test((await page.locator("#quote .quote-selection").textContent()) ?? "") && (await page.locator('#quote input[autocomplete="address-level2"]').inputValue()) === "Amsterdam")
    await page.locator('#quote button[type="submit"]').click()
    check("a known service does not force a long description", (await page.locator("#quote form").getAttribute("data-step")) === "3")
    await ctx.close()
  }

  console.log("\n11. Error recovery across steps")
  {
    const ctx = await browser.newContext({ reducedMotion: "reduce" })
    const page = await ctx.newPage()
    let attempts = 0
    await page.route("**/api/leads", async (route) => {
      attempts += 1
      if (attempts === 1) return route.fulfill({ status: 503, contentType: "application/json", body: '{"ok":false}' })
      if (attempts === 2) return route.fulfill({ status: 422, contentType: "application/json", body: '{"ok":false,"errors":{"city":"invalid","photos":"invalid"}}' })
      return route.continue()
    })
    await page.goto(base + "/contact/")
    await page.waitForLoadState("networkidle")
    const form = page.locator("form")
    await form.locator('[data-service="renovatie"]').click()
    await form.locator('input[autocomplete="address-level2"]').fill("Utrecht")
    await form.locator("textarea").fill("Renovatie van woonkamer en keuken.")
    await form.locator(".quote-photo-details summary").click()
    await form.locator('input[type="file"]').setInputFiles(join(root, "public/images/bath-after.webp"))
    await form.locator('button[type="submit"]').click()
    await form.locator('input[autocomplete="name"]').fill("Recovery Test")
    await form.locator('input[autocomplete="tel"]').fill("06 12345678")
    await form.locator('button[type="submit"]').click()
    await page.getByRole("button", { name: "Aanvraag aanpassen" }).waitFor()
    check("a server failure is not presented as success", (await page.locator('[role="status"]', { hasText: /HK-\d{6}-/ }).count()) === 0)
    await page.getByRole("button", { name: "Aanvraag aanpassen" }).click()
    check("editing after failure restores the filled contact step", (await form.getAttribute("data-step")) === "3" && (await form.locator('input[autocomplete="name"]').inputValue()) === "Recovery Test")
    await form.locator('button[type="submit"]').click()
    await page.waitForFunction(() => document.querySelector("form")?.getAttribute("data-step") === "2")
    check("a server-side project error reopens the correct step", (await form.locator('input[autocomplete="address-level2"]').getAttribute("aria-invalid")) === "true")
    check("server validation preserves the project and contacts", (await form.locator("textarea").inputValue()).includes("woonkamer") && (await form.locator('input[autocomplete="name"]').inputValue()) === "Recovery Test")
    await form.locator('input[autocomplete="address-level2"]').fill("Utrecht centrum")
    await form.locator('button[type="submit"]').click()
    await form.locator(".quote-photo-details[open]").waitFor()
    check("a rejected photo reopens its upload panel", (await form.getAttribute("data-step")) === "2" && (await form.locator(".quote-photo-details").getAttribute("open")) !== null)
    check("a rejected photo has an actionable error message", /konden niet worden verwerkt/.test((await form.locator('.quote-photo-details [role="alert"]').textContent()) ?? ""))
    await form.getByRole("button", { name: "Foto's verwijderen", exact: true }).click()
    check("removing photos clears the actual selection and its error", await form.locator('input[type="file"]').evaluate((input) => input.files.length === 0 && input.getAttribute("aria-invalid") !== "true"))
    await form.locator('button[type="submit"]').click()
    await form.locator('button[type="submit"]').click()
    const receipt = page.locator('[role="status"]', { hasText: /HK-\d{6}-/ })
    await receipt.waitFor({ timeout: 10_000 })
    check("a corrected request still reaches the real server", await receipt.isVisible())
    await ctx.close()
  }

  console.log("\n12. Every new step on small screens and in every language")
  for (const [language, width] of [["nl", 320], ["en", 360], ["uk", 390], ["ru", 320]]) {
    const ctx = await browser.newContext({
      viewport: { width, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: "reduce",
    })
    await ctx.addInitScript((lang) => { localStorage.setItem("huisklusdienst.lang", lang) }, language)
    const page = await ctx.newPage()
    await page.goto(base + "/")
    await page.waitForLoadState("networkidle")
    const hasNoOverflow = () => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)
    check(`${language} at ${width}px: header, trust bar and hero fit`, await hasNoOverflow())
    const photoBox = await page.locator(".hero-media-main img").boundingBox()
    const captionBox = await page.locator(".hero-media-caption").boundingBox()
    check(`${language}: mobile caption does not cover the hero photo`, photoBox && captionBox && captionBox.y >= photoBox.y + photoBox.height - 1)
    const primary = await page.locator(".home-hero .btn-primary").boundingBox()
    check(`${language}: primary CTA is visible in the first phone viewport`, primary && primary.y + primary.height <= 844)
    const form = page.locator("#quote form")
    check(`${language}: personal details are hidden in step one`, !(await form.locator('input[autocomplete="name"]').isVisible()))
    const kitchenTerm = { nl: "keuken", en: "kitchen", uk: "кух", ru: "кух" }[language]
    check(`${language}: the combined service visibly includes kitchens`, (await form.locator('[data-service="badkamer-keuken"]').innerText()).toLowerCase().includes(kitchenTerm))
    await form.locator('[data-service="uitbouw-aanbouw"]').click()
    check(`${language}: project step fits`, await hasNoOverflow())
    await form.locator('input[autocomplete="address-level2"]').fill("Amsterdam")
    await form.locator('button[type="submit"]').click()
    check(`${language}: contact step fits`, await hasNoOverflow())
    check(`${language}: new copy is translated, without raw keys`, !/quote_|trust_short_|ba_project_/.test((await page.locator("body").innerText()) ?? ""))
    await page.locator(".mobile-contact-btn--cta").click()
    check(`${language}: mobile CTA keeps the visitor on the current page`, pathOf(page) === "/" && (await form.getAttribute("data-step")) === "3")
    await ctx.close()
  }

  console.log("\n13. A real malformed image is rejected and can be removed")
  {
    const ctx = await browser.newContext({ reducedMotion: "reduce" })
    const page = await ctx.newPage()
    await page.goto(base + "/contact/")
    await page.waitForLoadState("networkidle")
    const form = page.locator("form")
    await form.locator('[data-service="renovatie"]').click()
    await form.locator('input[autocomplete="address-level2"]').fill("Amersfoort")
    await form.locator(".quote-photo-details summary").click()
    await form.locator('input[type="file"]').setInputFiles({
      name: "broken.webp", mimeType: "image/webp", buffer: Buffer.from("This is not an image."),
    })
    await form.locator('button[type="submit"]').click()
    await form.locator('input[autocomplete="name"]').fill("Photo Validation Test")
    await form.locator('input[autocomplete="tel"]').fill("06 12345678")
    await form.locator('button[type="submit"]').click()
    await page.waitForFunction(() => document.querySelector("form")?.getAttribute("data-step") === "2")
    check("real server signature validation returns to the photo step", (await form.locator('input[type="file"]').getAttribute("aria-invalid")) === "true")
    check("photo errors open the upload controls automatically", (await form.locator(".quote-photo-details").getAttribute("open")) !== null && await form.getByRole("button", { name: "Foto's verwijderen", exact: true }).isVisible())
    const removeBox = await form.getByRole("button", { name: "Foto's verwijderen", exact: true }).boundingBox()
    check("the photo removal control has a full-size touch target", removeBox && removeBox.height >= 44)
    await form.getByRole("button", { name: "Foto's verwijderen", exact: true }).click()
    await form.locator('button[type="submit"]').click()
    check("removing a broken image does not lose the contact details", (await form.locator('input[autocomplete="name"]').inputValue()) === "Photo Validation Test")
    await form.locator('button[type="submit"]').click()
    const receipt = page.locator('[role="status"]', { hasText: /HK-\d{6}-/ })
    await receipt.waitFor({ timeout: 10_000 })
    check("the request can be delivered without the broken image", await receipt.isVisible())
    await ctx.close()
  }
  console.log("\n14. Expanded services, honest hero image and explicit VAT")
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" })
    const page = await ctx.newPage()
    await page.goto(base + "/")
    await page.waitForLoadState("networkidle")
    check("hero uses one strong image, without the old worker inset", await page.locator(".hero-media-main img").count() === 1 && await page.locator(".hero-media-sub").count() === 0)
    check("hero image loads and has responsive sources", await page.locator(".hero-media-main img").evaluate((img) => img.complete && img.naturalWidth > 0 && img.src.includes("hero-craftsmanship") && Boolean(img.srcset)))
    check("hero does not pretend the illustration is the real team", /geen eigen project of teamfoto/.test(await page.locator(".hero-media-disclosure").innerText()))
    const obligation = page.locator("#faq details").filter({ hasText: "Verplicht een offerteaanvraag mij tot iets?" })
    await obligation.locator("summary").click()
    check("the no-obligation answer no longer begins with yes", (await obligation.locator(".answer").innerText()).startsWith("Een aanvraag"))
    check("the calculator labels its gross total explicitly", /inclusief btw/.test(await page.locator(".estimator-vat-basis").innerText()))
    await page.locator(".estimator-vat summary").click()
    check("VAT explanation does not invent a uniform tax split", /geen afzonderlijke belastingberekening/.test(await page.locator(".estimator-vat p").innerText()))
    const vatContrast = await page.evaluate(() => {
      const luminance = (rgb) => rgb.map((x) => x / 255).map((x) => x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4).reduce((sum, x, i) => sum + x * [0.2126, 0.7152, 0.0722][i], 0)
      const backgrounds = [[15, 29, 22], [29, 72, 48]]
      return [".estimator-vat-basis", ".estimator-vat summary", ".estimator-vat p"].every((selector) => {
        const rgb = getComputedStyle(document.querySelector(selector)).color.match(/\d+(?:\.\d+)?/g).slice(0, 3).map(Number)
        const foreground = luminance(rgb)
        return backgrounds.every((background) => (Math.max(foreground, luminance(background)) + 0.05) / (Math.min(foreground, luminance(background)) + 0.05) >= 4.5)
      })
    })
    check("VAT labels and expanded explanation meet normal-text contrast on the dark result", vatContrast)
    await page.goto(base + "/zakelijk/")
    check("business quotes explicitly distinguish net pricing", /doorgaans exclusief btw/.test(await page.locator(".business-vat-note").innerText()))
    await ctx.close()
  }

  for (const [language, width] of [["nl", 320], ["en", 360], ["uk", 390], ["ru", 320]]) {
    const ctx = await browser.newContext({ viewport: { width, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: "reduce" })
    await ctx.addInitScript((lang) => localStorage.setItem("huisklusdienst.lang", lang), language)
    const page = await ctx.newPage()
    const problems = watch(page)
    await page.goto(base + "/contact/")
    const form = page.locator("#quote form")
    const serviceChoices = form.locator(".project-choice:not([data-service=other])")
    check(`${language}: all ${SERVICES.length} services are selectable immediately`, await serviceChoices.count() === SERVICES.length)
    check(`${language}: no service choices are hidden in a disclosure`, await serviceChoices.evaluateAll((choices) => choices.every((choice) => choice.getClientRects().length > 0 && !choice.closest("details:not([open])"))))
    check(`${language}: all category headings are present`, await form.locator(".quote-service-group h4").count() === SERVICE_GROUPS.length)
    check(`${language}: window installation is visible without expanding anything`, await form.locator('[data-service="ramen-deuren"]').isVisible())
    check(`${language}: expanded choices fit on the phone`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1))
    await form.locator('[data-service="warmtepompen"]').click()
    check(`${language}: heat-pump choice starts the details step`, await form.getAttribute("data-step") === "2")
    await form.locator('input[autocomplete="address-level2"]').fill("Amsterdam")
    await form.locator('button[type="submit"]').click()
    check(`${language}: VAT note appears before sending a request`, await form.getAttribute("data-step") === "3" && await form.locator(".quote-vat-note").isVisible())
    check(`${language}: final contact step still fits`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1))
    if (language === "nl") {
      await form.locator('input[autocomplete="name"]').fill("Heat Pump Enquiry Test")
      await form.locator('input[autocomplete="tel"]').fill("06 12345678")
      await form.locator('button[type="submit"]').click()
      await page.locator('[role="status"]', { hasText: /HK-\d{6}-/ }).waitFor({ timeout: 10_000 })
      let saved
      for (const id of await readdir(join(dataDir, "leads"))) {
        const record = JSON.parse(await readFile(join(dataDir, "leads", id, "lead.json"), "utf8"))
        if (record.lead?.name === "Heat Pump Enquiry Test") saved = record.lead
      }
      check("heat-pump request reaches the real server with its canonical service", saved?.service === "Warmtepompen" && saved?.city === "Amsterdam")
    }
    check(`${language}: new controls hydrate without console errors`, problems.length === 0, problems.join("; "))
    await ctx.close()
  }

  for (const slug of ["warmtepompen", "vloerverwarming", "verwarming", "ramen-deuren", "demontage-ramen-deuren"]) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: "reduce" })
    const page = await ctx.newPage()
    const problems = watch(page)
    const response = await page.goto(`${base}/werkgebied/amsterdam/${slug}/`)
    await page.waitForLoadState("networkidle")
    check(`${slug}: local page answers 200 with its own title`, response?.status() === 200 && /Amsterdam/.test(await page.locator("h1").innerText()))
    check(`${slug}: city and service are preset without another question`, await page.locator("#quote form").getAttribute("data-step") === "2" && await page.locator('#quote input[autocomplete="address-level2"]').inputValue() === "Amsterdam")
    check(`${slug}: scope conditions are visible`, await page.locator(".service-scope-note").isVisible())
    check(`${slug}: phone layout fits`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1))
    check(`${slug}: hydrates without errors`, problems.length === 0, problems.join("; "))
    await ctx.close()
  }

  console.log("\n15. Grouped catalogue and window installation request")
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" })
    const page = await ctx.newPage()
    const problems = watch(page)
    await page.goto(base + "/diensten/")
    check("catalogue groups cover all service pages", await page.locator(".service-category .service-card-link").count() === SERVICES.length && await page.locator(".service-category").count() === SERVICE_GROUPS.length)
    check("catalogue offers all four category jump links", await page.locator(".service-category-nav a").count() === SERVICE_GROUPS.length)
    check("service photos are not passed off as completed client projects", /geen portfolio/.test(await page.locator(".service-images-note").innerText()))
    check("photo presentation has no AI badges", !/\bAI[- ](?:impressie|illustration)/i.test(await page.locator("main").innerText()))
    await page.goto(base + "/diensten/ramen-deuren/")
    const form = page.locator("#quote form")
    check("window installation service is preset in its request form", await form.getAttribute("data-step") === "2" && /Ramen & deuren plaatsen/.test(await form.locator(".quote-selection").innerText()))
    await form.locator('input[autocomplete="address-level2"]').fill("Utrecht")
    await form.locator('button[type="submit"]').click()
    await form.locator('input[autocomplete="name"]').fill("Window Door Enquiry Test")
    await form.locator('input[autocomplete="tel"]').fill("06 12345678")
    await form.locator('button[type="submit"]').click()
    await page.locator('[role="status"]', { hasText: /HK-\d{6}-/ }).waitFor({ timeout: 10_000 })
    let saved
    for (const id of await readdir(join(dataDir, "leads"))) {
      const record = JSON.parse(await readFile(join(dataDir, "leads", id, "lead.json"), "utf8"))
      if (record.lead?.name === "Window Door Enquiry Test") saved = record.lead
    }
    check("window installation reaches the real server with the canonical service and place", saved?.service === "Ramen & Deuren" && saved?.city === "Utrecht")
    check("window page and catalogue hydrate without errors", problems.length === 0, problems.join("; "))
    await ctx.close()
  }
} finally {
  console.log(`\n${passed} passed, ${failed} failed`)
  await browser.close()
  server.kill()
  await rm(dataDir, { recursive: true, force: true })
}
process.exit(failed > 0 ? 1 : 0)
