/**
 * Production server: serves dist/ and accepts quote requests.
 *
 *   npm run build && npm start
 *
 * Zero dependencies beyond Node (>= 22.18, which runs the shared
 * src/lib/leadSchema.ts directly). Configure with environment variables;
 * see .env.example.
 */
import { createServer } from "node:http"
import { Readable } from "node:stream"
import { loadConfig, notifierConfigured } from "./config.mjs"
import { createStore } from "./store.mjs"
import { createNotifier } from "./notify.mjs"
import { createApp } from "./app.mjs"
import { retryPending } from "./leads.mjs"

class PayloadTooLargeError extends Error {
  name = "PayloadTooLargeError"
}

/** node:http request → web Request, with a hard cap on the body size. */
function toWebRequest(req, config) {
  const host = req.headers.host ?? `localhost:${config.port}`
  const proto = config.trustProxy ? String(req.headers["x-forwarded-proto"] ?? "http").split(",")[0] : "http"
  const url = new URL(req.url ?? "/", `${proto}://${host}`)
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
          if (seen > config.maxBodyBytes) throw new PayloadTooLargeError("body too large")
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
  return req.socket.remoteAddress ?? ""
}

async function main() {
  const config = loadConfig()
  const log = console
  const store = createStore(config.dataDir)
  await store.init()
  const notifier = createNotifier(config, { readPhoto: (id, name) => store.readPhoto(id, name) })

  if (!notifierConfigured(config)) {
    log.warn("! No lead notification configured (LEAD_WEBHOOK_URL or RESEND_API_KEY + LEAD_NOTIFY_TO + LEAD_NOTIFY_FROM).")
    log.warn(`  Leads are stored in ${store.root} but nobody is told about them.`)
  }

  const app = createApp({ config, store, notifier, log })

  const server = createServer(async (req, res) => {
    try {
      const response = await app(toWebRequest(req, config), { clientIp: clientIp(req, config) })
      res.statusCode = response.status
      response.headers.forEach((value, key) => res.setHeader(key, value))
      if (response.body) {
        for await (const chunk of response.body) res.write(chunk)
      }
      res.end()
    } catch (error) {
      log.error("response failed", error)
      if (!res.headersSent) res.statusCode = 500
      res.end()
    }
  })
  server.requestTimeout = 60_000
  server.headersTimeout = 20_000

  const maintenance = async () => {
    try {
      await retryPending(store, notifier, log)
      const removed = await store.purgeOlderThan(config.retentionDays)
      if (removed) log.info(`leads: removed ${removed} past the ${config.retentionDays}-day retention period`)
    } catch (error) {
      log.error("maintenance failed", error)
    }
  }
  const timer = setInterval(maintenance, config.notify.retryIntervalMs)
  timer.unref()
  maintenance()

  server.listen(config.port, config.host, () => {
    log.info(`Huisklusdienst listening on http://${config.host}:${config.port} (serving ${config.distDir})`)
  })

  const shutdown = () => {
    log.info("shutting down")
    clearInterval(timer)
    server.close(() => process.exit(0))
    setTimeout(() => process.exit(1), 10_000).unref()
  }
  process.on("SIGTERM", shutdown)
  process.on("SIGINT", shutdown)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
