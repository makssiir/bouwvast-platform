/**
 * Behavioural proof for the whole lead chain: browser transport → server
 * handler → disk → notification.
 *
 *   node scripts/verify-leads.ts
 *
 * No test runner and no network. The browser side's fetch is wired straight
 * into the real server app, so the client and server are tested against
 * each other rather than against assumptions.
 */
import { mkdtemp, rm, readdir } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { deliverLead, acceptablePhotos, newLeadId } from "../src/lib/leads.ts"
import type { Lead, LeadTransport } from "../src/lib/leads.ts"
import { validateLead, isPlausiblePhone } from "../src/lib/leadSchema.ts"
// @ts-ignore: plain ESM modules without type declarations
import { loadConfig } from "../server/config.mjs"
// @ts-ignore
import { createStore } from "../server/store.mjs"
// @ts-ignore
import { createNotifier } from "../server/notify.mjs"
// @ts-ignore
import { createApp } from "../server/app.mjs"
// @ts-ignore
import { retryPending, sniffImage, truncateIp } from "../server/leads.mjs"

let passed = 0
let failed = 0

function check(label: string, condition: boolean, detail = ""): void {
  if (condition) {
    passed += 1
    console.log(`  PASS  ${label}`)
  } else {
    failed += 1
    console.log(`  FAIL  ${label}${detail ? ` — ${detail}` : ""}`)
  }
}

function makeLead(overrides: Partial<Lead> = {}): Lead {
  return {
    id: newLeadId(),
    name: "Jan de Vries",
    phone: "06 12345678",
    email: "jan@voorbeeld.nl",
    city: "Amersfoort",
    service: "Badkamer & Keuken",
    description: "Badkamer volledig vernieuwen, ongeveer 6 m2.",
    estimate: "",
    language: "nl",
    sourcePage: "test",
    createdAt: new Date().toISOString(),
    hp: "",
    ...overrides,
  }
}

const JPEG = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0, 0x10, 0x4a, 0x46, 0x49, 0x46, 0, 1])
const jpegFile = (name = "badkamer.jpg") => new File([JPEG], name, { type: "image/jpeg" })

async function harness(env: Record<string, string> = {}) {
  const dataDir = await mkdtemp(join(tmpdir(), "bouwvast-leads-"))
  const config = loadConfig({ DIST_DIR: "dist", DATA_DIR: dataDir, LEAD_RATE_LIMIT_MAX: "50", ...env })
  const store = createStore(config.dataDir)
  await store.init()
  const sent: unknown[] = []
  let notifyFails = false
  const notifier = createNotifier(config, {
    fetchImpl: async (_url: string, init: RequestInit) => {
      sent.push(JSON.parse(String(init.body)))
      return new Response(null, { status: notifyFails ? 503 : 200 })
    },
    readPhoto: (id: string, name: string) => store.readPhoto(id, name),
  })
  const quiet = { info() {}, warn() {}, error() {} }
  const app = createApp({ config, store, notifier, log: quiet })
  let calls = 0
  const transport: LeadTransport = {
    endpoint: "http://localhost/api/leads",
    timeoutMs: 5000,
    fetchImpl: (async (input: RequestInfo | URL, init?: RequestInit) => {
      calls += 1
      return app(new Request(String(input), init), { clientIp: "203.0.113.7" })
    }) as typeof fetch,
  }
  return {
    config,
    store,
    notifier,
    app,
    transport,
    sent,
    get calls() {
      return calls
    },
    setNotifyFails(value: boolean) {
      notifyFails = value
    },
    cleanup: () => rm(dataDir, { recursive: true, force: true }),
  }
}

const settle = () => new Promise((resolve) => setTimeout(resolve, 20))

async function main() {
  console.log("Schema")
  check("Dutch mobile is plausible", isPlausiblePhone("06-12 34 56 78"))
  check("international number is plausible", isPlausiblePhone("+31 (0)6 1234 5678"))
  check("letters are not a phone number", !isPlausiblePhone("bel me"))
  check("too-short number is rejected", !isPlausiblePhone("0612"))
  const bad = validateLead({ id: "nope", name: "J", phone: "", city: "", description: "" })
  check("validation reports stable codes", bad.errors.name === "too_short" && bad.errors.phone === "required" && bad.errors.id === "invalid")
  check("email is optional", validateLead({ ...makeLead(), email: "" }).ok)
  check("malformed email is rejected", validateLead({ ...makeLead(), email: "jan@" }).errors.email === "invalid")

  console.log("Client without endpoint")
  {
    const result = await deliverLead(makeLead(), [], { endpoint: "", timeoutMs: 1000, fetchImpl: fetch })
    check("no endpoint → unconfigured, never 'sent'", !result.delivered && result.failure === "unconfigured")
  }

  console.log("Photos")
  {
    const big = new File([new Uint8Array(9 * 1024 * 1024)], "big.jpg", { type: "image/jpeg" })
    const pdf = new File([new Uint8Array(10)], "plan.pdf", { type: "application/pdf" })
    const { files, skipped } = acceptablePhotos([jpegFile(), big, pdf])
    check("oversized and non-image files are dropped client-side", files.length === 1 && skipped)
    check("JPEG magic bytes are recognised", sniffImage(JPEG)?.type === "image/jpeg")
    check("text pretending to be JPEG is not", sniffImage(new TextEncoder().encode("hello")) === null)
    check("IPv4 is stored truncated", truncateIp("203.0.113.7") === "203.0.113.0")
  }

  console.log("Client ↔ server")
  {
    const h = await harness({ LEAD_WEBHOOK_URL: "https://hooks.example/lead" })
    const lead = makeLead()
    const result = await deliverLead(lead, [], h.transport)
    check("valid lead is delivered with a receipt", result.delivered && /^BV-\d{6}-[0-9A-F]{5}$/.test(result.reference ?? ""), JSON.stringify(result))
    const stored = await h.store.get(lead.id)
    check("lead is on disk before the receipt", stored?.lead.name === "Jan de Vries")
    check("stored IP is truncated", stored?.ipPrefix === "203.0.113.0")
    await settle()
    check("owner is notified once", h.sent.length === 1)
    check("notification is recorded", (await h.store.get(lead.id))?.notified === true)

    const again = await deliverLead(lead, [], h.transport)
    check("retrying the same lead returns the original reference", again.delivered && again.reference === result.reference)
    const dirs = await readdir(h.store.root)
    check("retry does not create a duplicate", dirs.length === 1)
    await settle()
    check("retry does not notify twice", h.sent.length === 1)

    const withPhoto = makeLead()
    const photoResult = await deliverLead(withPhoto, [jpegFile()], h.transport)
    const photoRecord = await h.store.get(withPhoto.id)
    check("multipart lead with a photo is delivered", photoResult.delivered && photoRecord?.photos.length === 1)

    const fake = makeLead()
    const fakeResult = await deliverLead(fake, [new File([new TextEncoder().encode("not an image")], "x.jpg", { type: "image/jpeg" })], h.transport)
    check("a non-image disguised as JPEG is rejected (415 → invalid)", !fakeResult.delivered && fakeResult.failure === "invalid" && fakeResult.status === 415)
    check("…and nothing was stored for it", (await h.store.get(fake.id)) === null)

    const spam = makeLead({ hp: "http://spam.example" })
    const spamResult = await deliverLead(spam, [], h.transport)
    check("honeypot submission looks accepted to the bot", spamResult.delivered)
    check("…but is not stored", (await h.store.get(spam.id)) === null)

    const invalidRaw = await h.app(
      new Request("http://localhost/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...makeLead(), phone: "abc" }),
      }),
      { clientIp: "203.0.113.8" },
    )
    const invalidBody = await invalidRaw.json()
    check("server rejects invalid fields with 422 + codes", invalidRaw.status === 422 && invalidBody.errors?.phone === "invalid")

    const cross = await h.app(
      new Request("http://localhost/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json", origin: "https://evil.example" },
        body: JSON.stringify(makeLead()),
      }),
      { clientIp: "203.0.113.9" },
    )
    check("cross-site POST is refused", cross.status === 403)

    const textPlain = await h.app(
      new Request("http://localhost/api/leads", { method: "POST", headers: { "content-type": "text/plain" }, body: "hi" }),
      { clientIp: "203.0.113.10" },
    )
    check("unsupported content type → 415", textPlain.status === 415)

    const get = await h.app(new Request("http://localhost/api/leads"), {})
    check("GET on the endpoint → 405", get.status === 405)
    check("API responses carry security headers", get.headers.get("x-content-type-options") === "nosniff")
    await h.cleanup()
  }

  console.log("Server answers that are not success")
  {
    const lead = makeLead()
    const fakeOk: LeadTransport = {
      endpoint: "http://localhost/api/leads",
      timeoutMs: 1000,
      fetchImpl: (async () => new Response("<html>ok</html>", { status: 200 })) as typeof fetch,
    }
    const r1 = await deliverLead(lead, [], fakeOk)
    check("200 without a matching receipt is NOT treated as sent", !r1.delivered && r1.failure === "server")

    const wrongId: LeadTransport = {
      ...fakeOk,
      fetchImpl: (async () => Response.json({ ok: true, id: "someone-else" })) as typeof fetch,
    }
    check("receipt for another id is NOT treated as sent", !(await deliverLead(lead, [], wrongId)).delivered)

    const offline: LeadTransport = {
      ...fakeOk,
      fetchImpl: (async () => {
        throw new TypeError("Failed to fetch")
      }) as typeof fetch,
    }
    const r3 = await deliverLead(lead, [], offline)
    check("network failure → 'network', not sent", !r3.delivered && r3.failure === "network")

    const slow: LeadTransport = {
      endpoint: "http://localhost/api/leads",
      timeoutMs: 30,
      fetchImpl: ((_input: RequestInfo | URL, init?: RequestInit) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => reject(new DOMException("aborted", "AbortError")))
        })) as typeof fetch,
    }
    const r4 = await deliverLead(lead, [], slow)
    check("timeout → 'network', not sent", !r4.delivered && r4.failure === "network")
  }

  console.log("Rate limiting")
  {
    const h = await harness({ LEAD_RATE_LIMIT_MAX: "2" })
    await deliverLead(makeLead(), [], h.transport)
    await deliverLead(makeLead(), [], h.transport)
    const third = await deliverLead(makeLead(), [], h.transport)
    check("third request in the window → rate_limited", !third.delivered && third.failure === "rate_limited")
    await h.cleanup()
  }

  console.log("Notification outage")
  {
    const h = await harness({ LEAD_WEBHOOK_URL: "https://hooks.example/lead" })
    h.setNotifyFails(true)
    const lead = makeLead()
    const result = await deliverLead(lead, [], h.transport)
    check("visitor still gets a receipt when notification is down", result.delivered)
    await settle()
    const pending = await h.store.get(lead.id)
    check("lead is marked as not yet notified", pending?.notified === false && pending?.notifyAttempts === 1)
    h.setNotifyFails(false)
    await retryPending(h.store, h.notifier, { info() {}, warn() {}, error() {} })
    check("background retry delivers it later", (await h.store.get(lead.id))?.notified === true)
    await h.cleanup()
  }

  console.log("Retention")
  {
    const h = await harness()
    const lead = makeLead()
    await deliverLead(lead, [], h.transport)
    const removedNow = await h.store.purgeOlderThan(365)
    const removedLater = await h.store.purgeOlderThan(365, Date.now() + 366 * 24 * 3600 * 1000)
    check("fresh leads are kept", removedNow === 0)
    check("leads past the retention period are deleted", removedLater === 1 && (await h.store.get(lead.id)) === null)
    await h.cleanup()
  }

  console.log(`\n${passed} passed, ${failed} failed`)
  if (failed > 0) process.exit(1)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
