import { loadConfig } from "../server/config.mjs"
import { createStore } from "../server/store.mjs"
import { createNotifier } from "../server/notify.mjs"

export default async function handler(req, res) {
  const config = loadConfig(process.env)
  const store = createStore(config.dataDir)
  const writable = await store.isWritable().catch(() => true)
  const notifier = createNotifier(config)

  const body = { ok: writable, storage: writable, notifications: notifier.configured }
  if (res?.setHeader) {
    res.statusCode = writable ? 200 : 503
    res.setHeader("content-type", "application/json")
    res.setHeader("cache-control", "no-store")
    res.end(JSON.stringify(body))
    return
  }
  return Response.json(body, {
    status: writable ? 200 : 503,
    headers: { "cache-control": "no-store" },
  })
}

export async function GET() {
  return handler()
}
