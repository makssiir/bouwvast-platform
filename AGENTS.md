# figma-make-app

React + Vite + Tailwind CSS project running inside Figma Make.

## Development Server

A Vite development server is **already running** on `$PORT` (default 8443). You don't need to start it manually.

- Preview URL: The user can access the running app through the preview panel
- Hot reload: Changes to source files are reflected immediately

## Project Structure

This is the canonical project structure. Start with task-relevant files below. Only follow imports or inspect other files when required, when a documented path is missing, or when the repository contradicts this guide.

- `src/main.tsx` - React entrypoint; imports `src/index.css` and mounts `src/App.tsx` into the `#root` element
- `src/App.tsx` - Primary application component and the usual starting point for UI work
- `src/index.css` - Global CSS entrypoint and Tailwind CSS v4 import
- `index.html` - Vite HTML shell containing the `#root` element and loading `src/main.tsx`
- `package.json` - Project dependencies and the Vite build, development, preview, and formatting scripts
- `vite.config.ts` - Vite configuration with React, Tailwind CSS v4, and Figma Make plugins plus the `@` alias for `src`
- `.mise.toml` / `.nvmrc` - Node.js version (22.18+, npm)
- `server/` - Production server (static files, security headers, `POST /api/leads`)
- `src/data/` - Owner-supplied facts; unverified values are never rendered

## Dependencies

- Runtime: React 19 and React DOM 19
- Styling: Tailwind CSS v4 with the `@tailwindcss/vite` plugin
- Build tooling: Vite 8, TypeScript 5.7, and `@vitejs/plugin-react`
- Formatting: oxfmt

## Styling

This project uses **Tailwind CSS v4** through the `@tailwindcss/vite` plugin configured in `vite.config.ts`. `src/index.css` imports Tailwind with `@import 'tailwindcss';`. Use Tailwind utility classes directly in JSX and put global CSS or Tailwind v4 theme customization in `src/index.css`. This scaffold does not need a Tailwind config file or PostCSS config.

`src/main.tsx` imports `src/index.css`. Keep CSS `@import` statements first in `src/index.css`.

### Design system

- **Fonts:** Manrope Variable for headings (`font-display`, `--font-display`) and Inter Variable for body text (`font-sans`). Both are self-hosted through `@fontsource-variable/*`, imported in `src/main.tsx`, and include the Cyrillic subset needed for the Ukrainian and Russian pages. Do not add Google Fonts links.
- **Colours:** use the tokens in the `@theme` block of `src/index.css`: `ink` / `muted` / `subtle` for text, `line` / `line-strong` for borders, `sand-50…300` for warm backgrounds, `pine-50…950` for the brand (primary actions are `pine-700`), `night` / `on-night` for dark sections, `amber-*` for notices and `danger` for errors. Do not use raw Tailwind palettes (`emerald-*`, `slate-*`, `gray-*`) or ad-hoc hex values in components (white, the logo and the WhatsApp brand green are the only exceptions).
- **Building blocks:** buttons are `.btn` plus `.btn-primary`, `.btn-outline`, `.btn-white` or `.btn-outline-white` (sizes `.btn-lg`, `.btn-sm`); add a trailing arrow with `<span className="btn-arrow">` and the `arrow-right` icon instead of text arrows. Page tops use `PageHero`, section intros use `.section-head` with an `.eyebrow`, the closing form block is `QuoteSection`, and "read more" links use `More`. Cards are `.card` / `.article-card`, filters are `.chip`, numbered steps are `.mini-steps`.
- **Widgets:** the cost calculator (`components/home/CostEstimator.tsx`, rates in `ESTIMATOR`), area checker (`PostalCodeChecker.tsx`, data from `cities.ts`), before/after slider (`BeforeAfter.tsx`) and desktop pop-up (`NudgeWidgets.tsx`). The calculator and area checker pre-fill the quote form through `useQuoteDraft()` (`setEstimate`, `suggest`) — suggestions only fill empty fields. None of them is a `<form>`: each page keeps a single form. WhatsApp controls render only through `whatsappHref()`, which returns `undefined` without a confirmed number.
- **Request flow:** the shared `QuoteForm` is project → place/details → contact; only the last step sends a lead. Keep all panels mounted to preserve photo selection, validate the visible stage, and reopen the correct stage for server errors. Route presets and explicit widget service choices can skip the first question; never overwrite the visitor's own text. The reassurance bar describes the process, not unsupported credentials.
- **Service scope and VAT:** all 16 services must remain selectable, including through "more services" in the shared form. Heating pages use `heatingTips.ts`, not bathroom tips. Refrigerant/gas work must not imply unverified qualifications; `HEAT_PUMP_SCOPE` is an owner launch gate. Consumer totals include VAT; quote breakdowns distinguish net, VAT by rate and gross total, confirmed per enquiry.
- **Copy:** sentence case for headings, buttons, labels and categories in every language (only the first word and proper names capitalised).
- **Brand assets:** `public/favicon.svg` mirrors `LogoMark` in `src/components/Logo.tsx`; `public/og-image.jpg` (1200×630) and `public/apple-touch-icon.png` (180×180) are rendered from it. Regenerate them together if the logo changes.

## Code quality

- Use double quotes for strings containing apostrophes (`"We're here to help"`), or escape them in single-quoted strings. An unescaped apostrophe in a single-quoted string breaks the build.
- Ensure JSX tags are closed and braces are balanced.
- Export components as default exports.

## Content rules

- Never add business facts, prices, reviews, project photos, certifications or promises that are not in `src/data/` with `verified: true` / an enabled claim with a source. See `LAUNCH-CHECKLIST.md`.
- New pages go in the route table (`src/lib/routes.ts`) so they are prerendered and checked.
- Before finishing a change run `npm run release:check`.
