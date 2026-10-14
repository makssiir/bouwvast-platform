import { resolve } from "node:path"

function bool(value, fallback) {
  if (value === undefined || value === "") return fallback
  return ["1", "true", "yes", "on"].includes(String(value).toLowerCase())
}

function int(value, fallback) {
  const n = Number.parseInt(String(value ?? ""), 10)
  return Number.isFinite(n) && n > 0 ? n : fallback
}

/** All server settings come from the environment; see .env.example. */
export function loadConfig(env = process.env) {
  const siteOrigin = String(env.SITE_ORIGIN ?? "").trim().replace(/\/+$/, "")
  return {
    port: int(env.PORT, 3000),
    host: env.HOST || "0.0.0.0",
    distDir: resolve(env.DIST_DIR || "dist"),
    dataDir: resolve(env.DATA_DIR || "data"),
    siteOrigin,
    /** Extra origins allowed to POST leads (comma separated), e.g. a staging domain. */
    allowedOrigins: [siteOrigin, ...String(env.LEAD_ALLOWED_ORIGINS ?? "").split(",")]
      .map((o) => o.trim().replace(/\/+$/, ""))
      .filter(Boolean),
    /** Behind a reverse proxy / load balancer: read the client IP from X-Forwarded-For. */
    trustProxy: bool(env.TRUST_PROXY, false),
    /** Only needed when the lead endpoint lives on another origin. */
    extraConnectSrc: String(env.CSP_CONNECT_SRC ?? "").split(/\s+/).filter(Boolean),
    hsts: bool(env.HSTS, Boolean(siteOrigin.startsWith("https://"))),
    maxBodyBytes: int(env.LEAD_MAX_BODY_BYTES, 14 * 1024 * 1024),
    rateLimit: {
      max: int(env.LEAD_RATE_LIMIT_MAX, 5),
      windowMs: int(env.LEAD_RATE_LIMIT_WINDOW_SECONDS, 600) * 1000,
    },
    retentionDays: int(env.LEAD_RETENTION_DAYS, 365),
    notify: {
      webhookUrl: String(env.LEAD_WEBHOOK_URL ?? "").trim(),
      webhookSecret: String(env.LEAD_WEBHOOK_SECRET ?? ""),
      resendApiKey: String(env.RESEND_API_KEY ?? "").trim(),
      emailTo: String(env.LEAD_NOTIFY_TO ?? "").split(",").map((s) => s.trim()).filter(Boolean),
      emailFrom: String(env.LEAD_NOTIFY_FROM ?? "").trim(),
      retryIntervalMs: int(env.LEAD_NOTIFY_RETRY_SECONDS, 300) * 1000,
    },
  }
}

export function notifierConfigured(config) {
  const n = config.notify
  return Boolean(n.webhookUrl || (n.resendApiKey && n.emailTo.length && n.emailFrom))
}
