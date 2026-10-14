import { readFile, stat } from "node:fs/promises"
import { extname, join, normalize, sep } from "node:path"
import { brotliCompressSync, gzipSync, constants as zlib } from "node:zlib"

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
}
const COMPRESSIBLE = new Set([".html", ".js", ".css", ".json", ".xml", ".txt", ".svg"])

/** Old addresses from the prototype that now live elsewhere. */
const REDIRECTS = new Map([
  ["/over-ons", "/"],
  ["/over-ons/", "/"],
])

export function securityHeaders(config) {
  const connect = ["'self'", ...(config.extraConnectSrc ?? [])]
  const csp = [
    "default-src 'self'",
    "script-src 'self'",
    // React style={{…}} attributes need inline styles; no inline scripts are used.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    `connect-src ${connect.join(" ")}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(config.hsts ? ["upgrade-insecure-requests"] : []),
  ].join("; ")
  const headers = {
    "content-security-policy": csp,
    "x-content-type-options": "nosniff",
    "referrer-policy": "strict-origin-when-cross-origin",
    "permissions-policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
    "cross-origin-opener-policy": "same-origin",
    "x-frame-options": "DENY",
  }
  if (config.hsts) headers["strict-transport-security"] = "max-age=31536000; includeSubDomains"
  return headers
}

function cacheControl(urlPath, ext) {
  if (urlPath.startsWith("/assets/")) return "public, max-age=31536000, immutable"
  if (ext === ".html" || urlPath.endsWith("/")) return "no-cache"
  if ([".xml", ".txt"].includes(ext)) return "public, max-age=3600"
  return "public, max-age=604800"
}

/**
 * Serves the prerendered site from dist/. Directory URLs map to
 * dir/index.html; "/diensten" redirects to "/diensten/"; anything unknown
 * gets 404.html with a real 404 status.
 */
export function createStaticHandler(config) {
  const root = config.distDir
  const cache = new Map()

  async function load(file) {
    const info = await stat(file).catch(() => null)
    if (!info?.isFile()) return null
    const key = `${file}:${info.mtimeMs}`
    let entry = cache.get(key)
    if (!entry) {
      const body = await readFile(file)
      const ext = extname(file).toLowerCase()
      entry = { body, ext, mtime: info.mtime, etag: `W/"${info.size.toString(16)}-${Math.floor(info.mtimeMs).toString(16)}"` }
      if (COMPRESSIBLE.has(ext) && body.length > 1024) {
        entry.br = brotliCompressSync(body, { params: { [zlib.BROTLI_PARAM_QUALITY]: 9 } })
        entry.gzip = gzipSync(body, { level: 9 })
      }
      cache.set(key, entry)
    }
    return entry
  }

  function resolveSafe(urlPath) {
    const target = normalize(join(root, urlPath))
    return target === root || target.startsWith(root + sep) ? target : null
  }

  return async function serveStatic(request) {
    const url = new URL(request.url)
    let path
    try {
      path = decodeURIComponent(url.pathname)
    } catch {
      path = "/"
    }
    if (path.includes("\0")) return new Response("Bad request", { status: 400 })

    const redirect = REDIRECTS.get(path)
    if (redirect) return Response.redirect(new URL(redirect + url.search, url), 301)

    let file = resolveSafe(path)
    let status = 200
    let entry = null

    if (file) {
      if (path.endsWith("/")) {
        entry = await load(join(file, "index.html"))
      } else {
        entry = await load(file)
        if (!entry && !extname(path)) {
          const asDir = await load(join(file, "index.html"))
          if (asDir) return Response.redirect(new URL(`${url.pathname}/${url.search}`, url), 301)
        }
      }
    }

    if (!entry || path.split("/").some((segment) => segment.startsWith(".") && segment !== "")) {
      entry = await load(join(root, "404.html"))
      status = 404
      if (!entry) return new Response("Not found", { status: 404 })
    }

    const headers = new Headers({
      "content-type": TYPES[entry.ext] ?? "application/octet-stream",
      "cache-control": status === 404 ? "no-cache" : cacheControl(path, entry.ext),
      "last-modified": entry.mtime.toUTCString(),
      etag: entry.etag,
      vary: "Accept-Encoding",
    })

    if (status === 200 && request.headers.get("if-none-match") === entry.etag) {
      return new Response(null, { status: 304, headers })
    }

    let body = entry.body
    const accept = request.headers.get("accept-encoding") ?? ""
    if (entry.br && /\bbr\b/.test(accept)) {
      body = entry.br
      headers.set("content-encoding", "br")
    } else if (entry.gzip && /\bgzip\b/.test(accept)) {
      body = entry.gzip
      headers.set("content-encoding", "gzip")
    }
    headers.set("content-length", String(body.length))

    return new Response(request.method === "HEAD" ? null : body, { status, headers })
  }
}
