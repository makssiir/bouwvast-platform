import { Readable } from "node:stream"
import { loadConfig } from "../server/config.mjs"
import { createStore } from "../server/store.mjs"
import { createNotifier } from "../server/notify.mjs"
import { createApp } from "../server/app.mjs"

function toWebRequest(req, config) {
  const host = req.headers.host ?? `localhost:${config.port}`
  const proto = config.trustProxy ? String(req.headers["x-forwarded-proto"] ?? "https").split(",")[0] : "https"
  const url = new URL(req.url ?? "/api/leads", `${proto}://${host}`)
  const headers = new Headers()
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) value.forEach((v) => headers.append(key, v))
    else if (value !== undefined) headers.set(key, value)
  }
  const init = { method: req.method, headers }
  if (req.method !== "GET" && req.method !== "HEAD") {
    let seen = 0
    const limited = Readable.from(
      (async function* () {
        for await (const chunk of req) {
          seen += chunk.length
          if (seen > config.maxBodyBytes) throw new Error("body too large")
          yield chunk
        }
      })(),
    )
    init.body = Readable.toWeb(limited)
    init.duplex = "half"
  }
  return new Request(url, init)
}

function clientIp(req, config) {
  if (config.trustProxy) {
    const forwarded = String(req.headers["x-forwarded-for"] ?? "").split(",")[0].trim()
    if (forwarded) return forwarded
  }
  return req.socket?.remoteAddress ?? ""
}

let cachedApp
let cachedConfig

async function getApp() {
  if (cachedApp) return { app: cachedApp, config: cachedConfig }
  const config = loadConfig(process.env)
  const log = console
  const store = createStore(config.dataDir)
  await store.init().catch(() => {})
  const notifier = createNotifier(config, {
    readPhoto: (id, name) => store.readPhoto(id, name),
  })
  cachedApp = createApp({ config, store, notifier, log })
  cachedConfig = config
  return { app: cachedApp, config: cachedConfig }
}

export default async function handler(req, res) {
  // Web Standard Request (e.g. Edge runtime or Next/Vercel standard)
  if (req instanceof Request) {
    const { app } = await getApp()
    return app(req, { clientIp: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "" })
  }

  // Node.js IncomingMessage / ServerResponse
  try {
    const { app, config } = await getApp()
    const webRequest = toWebRequest(req, config)
    const ip = clientIp(req, config)
    const response = await app(webRequest, { clientIp: ip })

    res.statusCode = response.status
    response.headers.forEach((value, key) => res.setHeader(key, value))
    if (response.body) {
      for await (const chunk of response.body) res.write(chunk)
    }
    res.end()
  } catch (error) {
    console.error("api/leads handler error:", error)
    if (!res.headersSent) res.statusCode = 500
    res.end(JSON.stringify({ ok: false, error: "internal_error" }))
  }
}

export async function POST(request) {
  const { app } = await getApp()
  return app(request, { clientIp: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "" })
}

export async function OPTIONS(request) {
  const { app } = await getApp()
  return app(request)
}
