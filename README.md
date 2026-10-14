# Bouwvast website

Marketing site and quote-request form for Bouwvast (bouw, renovatie, afbouw).
React 19 + Vite 8 + Tailwind v4, prerendered to static HTML per route, served by
a small dependency-free Node server that also receives quote requests.

## Quick start

```bash
npm ci
npm run dev                 # Vite dev server (form posts need the real server)
npm run build && npm start  # production build + server on http://localhost:3000
```

Node ≥ 22.18 (`.nvmrc`). Copy `.env.example` to `.env` for local settings;
`build`, `start` and `check:launch` read it automatically.

## How it fits together

| Part | Where | Notes |
| --- | --- | --- |
| Pages & routes | `src/pages`, `src/lib/routes.ts` | One route table drives navigation, prerendering, sitemap and robots |
| Translations | `src/i18n/translations.ts` | nl (canonical), en, uk, ru; preference stored client-side |
| Owner facts | `src/data/company.ts`, `claims.ts`, `pricing.ts`, `projects.ts`, `legal.ts`, `cities.ts` | Unverified values are never rendered — see `LAUNCH-CHECKLIST.md` |
| Prerender | `scripts/prerender.mjs` | Writes `dist/<route>/index.html`, `404.html`, `robots.txt`, `sitemap.xml` |
| Server | `server/` | Static files with security headers + `POST /api/leads` + `GET /healthz` |
| Lead validation | `src/lib/leadSchema.ts` | Shared by the browser form and the server |

### Quote requests

The browser posts multipart data to `VITE_LEAD_ENDPOINT` (`/api/leads`). The
server validates (same schema as the client), checks the origin, rate-limits,
verifies photo file signatures, stores the lead under
`DATA_DIR/leads/<id>/`, and returns a receipt number. The form only shows
success when it receives that receipt; otherwise the visitor keeps their text
and sees the verified contact channels. Notifications go out by signed webhook
and/or Resend e-mail and are retried until delivered. Leads older than
`LEAD_RETENTION_DAYS` are purged automatically.

## Checks

```bash
npm run typecheck
npm run verify:leads    # client ↔ server lead flow (40 cases)
npm run verify:routes   # every prerendered page: claims, links, SEO, a11y basics
npm run verify:browser  # real browser against the real server (needs Playwright)
npm run check:launch    # owner data, legal approval, production config
npm run release:check   # typecheck + leads + build + routes
```

CI runs the same in `.github/workflows/ci.yml`.

## Deploy

**Docker**

```bash
docker build --build-arg SITE_ORIGIN=https://www.bouwvast.nl -t bouwvast .
docker run -d -p 3000:3000 -v bouwvast-data:/data --env-file .env bouwvast
```

**Any Node host**: `npm ci && npm run build && npm start` with the environment
from `.env.example`, `DATA_DIR` on persistent storage, behind HTTPS.

Static-only hosting is possible for the pages, but then `/api/leads` must be
provided elsewhere (set `VITE_LEAD_ENDPOINT` and `CSP_CONNECT_SRC`), and the
security headers from `server/static.mjs` must be replicated. Do not add a
catch-all rewrite to `index.html`: every URL has its own file and unknown URLs
must return the 404 page.
