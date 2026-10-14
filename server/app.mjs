import { createStaticHandler, securityHeaders } from "./static.mjs"
import { createLeadHandler, createRateLimiter } from "./leads.mjs"

/** Routes one web Request. Kept free of node:http so tests can call it directly. */
export function createApp({ config, store, notifier, log = console }) {
  const serveStatic = createStaticHandler(config)
  const handleLead = createLeadHandler({
    config,
    store,
    notifier,
    rateLimiter: createRateLimiter(config.rateLimit),
    log,
  })
  const baseHeaders = securityHeaders(config)

  async function route(request, info) {
    const { pathname } = new URL(request.url)

    if (pathname === "/api/leads" || pathname === "/api/leads/") {
      if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: { allow: "POST" } })
      if (request.method !== "POST") return new Response("Method not allowed", { status: 405, headers: { allow: "POST" } })
      return handleLead(request, info)
    }

    if (pathname === "/healthz") {
      const writable = await store.isWritable()
      return Response.json(
        { ok: writable, storage: writable, notifications: notifier.configured },
        { status: writable ? 200 : 503, headers: { "cache-control": "no-store" } },
      )
    }

    if (pathname.startsWith("/api/")) return Response.json({ ok: false, error: "not_found" }, { status: 404 })

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", { status: 405, headers: { allow: "GET, HEAD" } })
    }
    return serveStatic(request)
  }

  return async function handle(request, info = {}) {
    let response
    try {
      response = await route(request, info)
    } catch (error) {
      log.error?.("request failed", error)
      response = new Response("Internal server error", { status: 500 })
    }
    // Response.redirect() and friends return immutable headers; copy into a new one.
    const headers = new Headers(response.headers)
    for (const [key, value] of Object.entries(baseHeaders)) if (!headers.has(key)) headers.set(key, value)
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers })
  }
}
