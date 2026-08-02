# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — production build to `dist/`
- `npm run lint` — ESLint (flat config in `eslint.config.js`)
- `npm run preview` — serve the production build locally

There is no test suite.

## What this is

A single-page React 19 + Vite portfolio site (chrisguter.com), deployed to GitHub Pages via `.github/workflows/build.yml` on every push to `main` (builds with Node 18, writes a `CNAME` file, publishes `dist/`).

## Architecture

**Single page, no routes.** `src/App.jsx` renders all sections in order: `Header → Home → RecentWork → Expertise → Knowledge → Career → About → Contact → Footer`. Navigation is anchor-based (`#projects`, `#career`, …); `Header.jsx` uses an IntersectionObserver to highlight the active section. `react-router-dom` only provides the `BrowserRouter` wrapper in `main.jsx` — there are no route definitions.

**Content flows through three layers, all of which must change together when adding/editing content:**

1. `src/locales/en.json` and `src/locales/de.json` — all user-facing text lives here (i18next, configured in `src/i18n.js`, default/fallback `en`). Every string must exist in **both** files.
2. `src/constants/index.js` — data arrays (`navigation`, `career`, `expertiseList`, `knowledgeContent`, …) that store **i18n keys, not text** (e.g. `title: "career.ceo.title"`), plus image imports. Components map over these arrays and call `t(item.title)` at render time.
3. `src/assets/index.js` — barrel file re-exporting every image; constants and components import images from here, never directly from asset files.

**Component conventions:**

- Every page section wraps its content in `Section.jsx` (handles vertical padding, the decorative side strokes, and optional `crosses`), then a `.container` div, and usually a `Heading` with `tag`/`title` from `t()`.
- `src/components/design/` holds purely decorative background elements (gradients, curves, backdrops). These files keep names from the original design template (`Roadmap.jsx`, `Pricing.jsx`, `Services.jsx`, `Collaboration.jsx`) and are reused by differently-named sections — e.g. `Career.jsx` imports `Gradient` from `design/Roadmap`, `About.jsx` sections build on `design/Services`/`design/Collaboration`. Many asset names (`brainwave*.svg`, `pricing/`, `recentWork-card-*`) are similarly legacy; don't assume a name maps to a current section.
- Reusable SVGs are React components in `src/assets/svg/`.

**Styling:** Tailwind only. `tailwind.config.js` defines the design system — the neutral palette `n-1` (white) through `n-14` (near-black), accent colors `color-1`…`color-6`, and typography component classes (`.h1`–`.h6`, `.body-1`, `.body-2`, `.tagline`, `.quote`, `.button`, `.container`) added via a plugin. Use these classes rather than raw values so new UI matches the existing sections. The site is dark-theme only (`bg-n-8` base).
