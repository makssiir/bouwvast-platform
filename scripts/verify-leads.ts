/**
 * Behavioural proof for the lead delivery chain.
 *
 *   node scripts/verify-leads.ts
 *
 * No test runner and no network: fetch and localStorage are stubbed so every
 * outcome a visitor can hit is exercised deterministically.
 */
import {
  deliverLead,
  flushQueue,
  readQueue,
  QUEUE_KEY,
} from "../src/lib/leads.ts"
import type { Lead, LeadTransport, StorageLike } from "../src/lib/leads.ts"

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

function memoryStorage(initial: Record<string, string> = {}): StorageLike {
  const map = new Map(Object.entries(initial))
  return {
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, value) => void map.set(key, value),
    removeItem: (key) => void map.delete(key),
  }
}

function makeLead(overrides: Partial<Lead> = {}): Lead {
  return {
    id: "lead-1",
    name: "Jan de Vries",
    phone: "0612345678",
    email: "jan@voorbeeld.nl",
    city: "Amersfoort",
    postcode: "",
    service: "Badkamer renovatie",
    description: "Badkamer volledig vernieuwen, 6 m2.",
    photos: "",
    preferredDate: null,
    preferredTime: "all-day",
    language: "nl",
    sourcePage: "test",
    createdAt: "2026-08-28T10:00:00.000Z",
    ...overrides,
  }
}

interface Captured {
  url: string
  init: RequestInit
}

function stubFetch(
  respond: (call: number) => Response | Promise<Response> | never,
): { fetchImpl: typeof fetch; calls: Captured[] } {
  const calls: Captured[] = []
  const fetchImpl = (async (input: RequestInfo | URL, init?: RequestInit) => {
    calls.push({ url: String(input), init: init ?? {} })
    return respond(calls.length)
  }) as typeof fetch
  return { fetchImpl, calls }
}

function transport(
  fetchImpl: typeof fetch,
  storage: StorageLike | null,
  endpoint = "https://example.test/leads",
): LeadTransport {
  return { endpoint, fetchImpl, storage, timeoutMs: 1000 }
}

async function run(): Promise<void> {
  // 1 — a confirmed delivery is reported as delivered, and nothing is queued.
  {
    const storage = memoryStorage()
    const { fetchImpl, calls } = stubFetch(() => new Response("ok", { status: 200 }))
    const result = await deliverLead(makeLead(), [], transport(fetchImpl, storage))

    console.log("\n1. Endpoint accepts the request")
    check("delivered", result.delivered === true)
    check("not queued", result.queued === false)
    check("one POST sent", calls.length === 1 && calls[0].init.method === "POST")
    check("JSON body carries the lead", String(calls[0].init.body).includes("Badkamer renovatie"))
    check("queue stays empty", readQueue(storage).length === 0)
  }

  // 2 — a server error must never read as success, and the lead is kept.
  {
    const storage = memoryStorage()
    const { fetchImpl } = stubFetch(() => new Response("boom", { status: 500 }))
    const result = await deliverLead(makeLead(), [], transport(fetchImpl, storage))

    console.log("\n2. Endpoint answers 500")
    check("not delivered", result.delivered === false)
    check("failure is server", result.failure === "server", String(result.failure))
    check("status kept", result.status === 500)
    check("queued for retry", result.queued === true)
    check("lead is in storage", readQueue(storage).length === 1)
  }

  // 3 — an offline visitor: fetch rejects.
  {
    const storage = memoryStorage()
    const fetchImpl = (async () => {
      throw new TypeError("Failed to fetch")
    }) as typeof fetch
    const result = await deliverLead(makeLead(), [], transport(fetchImpl, storage))

    console.log("\n3. Network is down")
    check("not delivered", result.delivered === false)
    check("failure is network", result.failure === "network", String(result.failure))
    check("queued for retry", result.queued === true)
  }

  // 4 — no endpoint configured: fail loudly, and do not queue what can never send.
  {
    const storage = memoryStorage()
    const { fetchImpl, calls } = stubFetch(() => new Response("ok", { status: 200 }))
    const result = await deliverLead(makeLead(), [], transport(fetchImpl, storage, ""))

    console.log("\n4. VITE_LEAD_ENDPOINT is not set")
    check("not delivered", result.delivered === false)
    check("failure is unconfigured", result.failure === "unconfigured", String(result.failure))
    check("nothing queued", result.queued === false && readQueue(storage).length === 0)
    check("no request attempted", calls.length === 0)
  }

  // 5 — the queue drains on a later visit.
  {
    const queued = [makeLead({ id: "a" }), makeLead({ id: "b" })]
    const storage = memoryStorage({ [QUEUE_KEY]: JSON.stringify(queued) })
    const { fetchImpl } = stubFetch(() => new Response("ok", { status: 200 }))
    const delivered = await flushQueue(transport(fetchImpl, storage))

    console.log("\n5. Queued leads are retried on the next visit")
    check("both delivered", delivered === 2, String(delivered))
    check("queue emptied", readQueue(storage).length === 0)
  }

  // 6 — a partial drain keeps what still has not landed.
  {
    const queued = [makeLead({ id: "a" }), makeLead({ id: "b" })]
    const storage = memoryStorage({ [QUEUE_KEY]: JSON.stringify(queued) })
    const { fetchImpl } = stubFetch((call) =>
      new Response("", { status: call === 1 ? 200 : 503 }),
    )
    const delivered = await flushQueue(transport(fetchImpl, storage))

    console.log("\n6. Retry only partly succeeds")
    check("one delivered", delivered === 1, String(delivered))
    const left = readQueue(storage)
    check("one still queued", left.length === 1 && left[0].id === "b")
  }

  // 7 — retrying the same request must not create a second lead.
  {
    const storage = memoryStorage()
    const { fetchImpl } = stubFetch(() => new Response("", { status: 500 }))
    const lead = makeLead({ id: "same-id" })
    await deliverLead(lead, [], transport(fetchImpl, storage))
    await deliverLead(lead, [], transport(fetchImpl, storage))

    console.log("\n7. Retrying the same request")
    check("stored once, not twice", readQueue(storage).length === 1)
  }

  // 8 — photos within budget travel with the request as multipart.
  {
    const storage = memoryStorage()
    const { fetchImpl, calls } = stubFetch(() => new Response("", { status: 200 }))
    const small = new File([new Uint8Array(1024)], "badkamer.jpg", { type: "image/jpeg" })
    const result = await deliverLead(makeLead(), [small], transport(fetchImpl, storage))

    console.log("\n8. Visitor attaches a photo")
    check("delivered", result.delivered === true)
    check("photos not skipped", result.photosSkipped === false)
    const body = calls[0].init.body
    check("body is multipart", body instanceof FormData)
    check(
      "photo is attached",
      body instanceof FormData && body.get("photo_1") instanceof File,
    )
    check(
      "lead fields ride along",
      body instanceof FormData && body.get("service") === "Badkamer renovatie",
    )
  }

  // 9 — oversized photos must not take the whole request down with them.
  {
    const storage = memoryStorage()
    const { fetchImpl, calls } = stubFetch(() => new Response("", { status: 200 }))
    const huge = new File([new Uint8Array(5 * 1024 * 1024)], "dsc_0001.jpg", {
      type: "image/jpeg",
    })
    const result = await deliverLead(makeLead(), [huge], transport(fetchImpl, storage))

    console.log("\n9. Photos exceed the size budget")
    check("request still delivered", result.delivered === true)
    check("photos reported as skipped", result.photosSkipped === true)
    check("body fell back to JSON", typeof calls[0].init.body === "string")
  }

  // 10 — storage being unavailable must not break the form.
  {
    const { fetchImpl } = stubFetch(() => new Response("", { status: 500 }))
    const result = await deliverLead(makeLead(), [], transport(fetchImpl, null))

    console.log("\n10. Browser storage is blocked")
    check("still reports the failure", result.delivered === false)
    check("honest that nothing was queued", result.queued === false)
  }

  console.log(`\n${passed} passed, ${failed} failed`)
  if (failed > 0) process.exit(1)
}

void run()
