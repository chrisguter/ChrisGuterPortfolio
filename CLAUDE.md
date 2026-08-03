# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code
in this repository.

## Commands

- `npm run dev` — Vite dev server (unprerendered; not what ships)
- `npm run build` — three steps: client build → SSR build (`dist-ssr/`) → `node scripts/prerender.mjs` writes the static documents into `dist/`
- `npm run typecheck` — `tsc --noEmit`. **A separate, mandatory gate: Vite strips types without checking them**, so a green build proves nothing about types.
- `npm run lint` / `npm run format` / `npm run format:check`
- `npm run test:e2e` — Playwright. Its webServer runs `vite preview` on port 4173 serving `dist/`, so **build first** or you test a stale build.
- Single test: `npx playwright test -g "skills map"` (add `--project=chromium` for one engine). All tests live in `tests/e2e.spec.ts`.
- Manual preview: `npm run build && npx vite preview --port 41XX` (pick a unique port; 4173 belongs to the test suite).

Node 24 (`.nvmrc`); TypeScript is `strict` + `noUncheckedIndexedAccess`. CI (`.github/workflows/ci.yml`) runs format:check → lint → typecheck → build → e2e on chromium+webkit; deploy is a separate workflow using the official Pages artifact flow and fails if `dist/CNAME` is missing.

## What this is

The personal portfolio of Christian Gutermann (chrisguter.com). React 19 + Vite 6 + Tailwind v4, prerendered to static HTML: 2 locales × 3 routes (`/`, `/imprint/`, `/privacy/`, plus `/de/` variants) hydrated by one client bundle. No router library, no i18n runtime, no analytics, no third-party requests.

## Architecture

**Prerender pipeline.** `src/entry-server.tsx` exports `render(locale, route) → { html, head, path }`; `scripts/prerender.mjs` imports the built `dist-ssr/entry-server.js` (via `pathToFileURL` — Node's ESM loader rejects bare Windows drive-letter paths) and stamps each document into `dist/`, plus a `404.html` copy of the English home for GitHub Pages fallback. `head` carries title/description, canonical + hreflang alternates, OG/Twitter tags, Person JSON-LD (home only) and `noindex,follow` on legal pages. `src/entry-client.tsx` hydrates. Locale and route are derived **from the URL only** (`localeFromPath`/`routeFromPath` in `src/content/index.ts`); components must derive paths from props (`pathFor`), never from `window.location` — a location read either crashes the server render or mismatches on hydration.

**Content model.** All copy lives as typed objects in `src/content/en.ts` and `de.ts` conforming to `src/content/types.ts`. The two locales are **structurally locked**: same ids, same array lengths, same order, same non-prose values (years, hrefs, stacks, figure values, media keys). Only prose differs. The type system will not catch a reordering — compare the files by eye when editing.

**Media/logo `src` fields are KEYS, not paths.** Content files contain no build-tool imports; components resolve keys through maps that also hold intrinsic width/height: `MEDIA` in `Work.tsx` and `About.tsx`, screenshot imports in `Now.tsx`, `LOGOS` in `src/lib/logos.ts`. An unknown key falls through to a graceful default (Work renders a typographic card) rather than crashing.

**Sections.** `App.tsx` renders Hero → Marquee → then the numbered bands. Band numbering derives from `SECTION_ORDER` in `src/lib/sections.ts` — insert/reorder there and everything renumbers; never hardcode an index. Every band goes through `src/components/primitives/Band.tsx` (rhythm, index, eyebrow label, `aria-labelledby`).

**i18n.** `LocaleProvider`/`useLocale` (`src/lib/i18n.tsx`) hand components the whole typed `Content` object as `t`. There are no string keys to resolve — and a test greps every rendered document for dotted-key shapes (`foo.bar.baz`) because the previous site shipped unresolved keys as body copy.

**Design tokens** live in `src/styles/index.css` ("HALO": cinematic dark-only, palette sampled from the portrait — ember/rust/violet/azure on near-black `--void`). The file header records measured contrast ratios; all six foreground colours clear WCAG AA against `--void` — keep that table true if you touch the palette, axe will fail otherwise. Cascade gotcha: the `.meta` utility sets its colour through `:where(.meta)` at zero specificity because it is emitted after Tailwind's utilities in the same layer — a plain `.meta { color }` would silently beat `text-ember`.

**Motion** is scroll-driven CSS (`animation-timeline: view()`), zero JS. Every block sits inside `prefers-reduced-motion: no-preference` **and** `@supports (animation-timeline: view())`, and the un-animated rendering is always the finished state — unsupported browsers get a complete page. Hooks are data attributes: `data-rise`, `data-wipe`, `data-rule`, `data-stagger` (with `--i` delay), `data-drift`. The marquee is time-based so it moves at rest.

**Interaction contracts** (tests assert all of this):

- Disclosures use `aria-expanded` + `aria-controls`. Work index rows and Now cards are one-open-at-a-time; Escape closes from inside and returns focus to the trigger. Timeline entries are reference material: multi-open, each with a distinct accessible name.
- The Lightbox is a native `<dialog>` + `showModal()`; the opener element is passed **explicitly** for focus return (Safari does not focus buttons on click, so `document.activeElement` would be `<body>`).
- The mobile menu traps focus in the header, closes on Escape, returns focus, and locks scroll (restoring it if the viewport crosses to desktop).
- Skills map: deterministic geometry — trig via Taylor series (`sinTurns`/`cosTurns`), because `Math.sin` is implementation-approximated and a one-ULP Node/browser disagreement is a hydration mismatch. Nodes are `aria-pressed` buttons; the drawn graph is decorative, an `sr-only` connection list carries the relationships.
- Now architecture diagram: authored 2-column grid of HTML boxes, edges drawn as an SVG overlay from **measured** DOM rects (layout pass + ResizeObserver). The server renders the SVG empty by design; semantics live in a visually-hidden list.

## Standing constraints — do not violate

- **Never add job-seeking copy.** The site states facts; his current employer reads it. No "open to roles", no CV download, no availability signal (nothing animated that reads as "live" in the hero identity line). A test matches forbidden phrases in both locales on every document.
- **Never add cookies or storage of any kind** (localStorage, sessionStorage, IndexedDB…). The privacy page truthfully claims none exist; `NoCookiesNotice` deliberately stores no dismissal flag and simply reappears each visit.
- **German legal pages are legally operative.** `de.ts` imprint/privacy are written as German legal text (§ 5 DDG), not translated from English. The Impressum must stay reachable from every page's footer (a compliance test).
- **en/de structural parity** as described above.
- **Decorative images are `aria-hidden`**; in stacked-image spots only the photograph carries alt text. Client/game logos are nominative use — rendered with the owner's name as accessible name; add no other third-party imagery.
- **No native image tooling.** No sharp/imagemin in the dependency tree; raster assets are committed as WebP, converted outside the build with a browser-based encoder. Keep intrinsic dimensions in the component maps so nothing reflows on decode.

## Testing philosophy

E2E only — no unit tests. 33 specs × (chromium + webkit) = 66, running against the **prerendered `dist/`** so a missing prerender step or hydration mismatch is a test failure, not a production bug. Per document: correct `lang`, exactly one `h1`, clean console (this is where hydration mismatches surface), no raw content keys, no job-seeking language, and axe WCAG 2 A+AA with `reducedMotion: "reduce"` emulated (otherwise the audit measures mid-animation opacity). Assertions read the full DOM text (including closed disclosures), joining text nodes with spaces to avoid false-positive "dotted key" matches.

WebKit quirks already accommodated — don't "fix" them:

- Safari doesn't focus buttons on mouse click → Escape handlers bound at document level (Skills), opener passed explicitly (Lightbox).
- Safari's Tab skips links → the mobile-menu focus-cycle assertion runs on chromium only; the rest of that test runs on both.
- Safari drops list semantics under `list-style: none` → explicit `role="list"` where it matters.

## Gotchas that cost real debugging time

- **UA `dialog { overflow: auto }`**: at fractional display scaling, sub-pixel rounding grows a visible scrollbar. Lightbox sets `overflow-visible` (nothing in it can genuinely overflow).
- **Glows: box-shadow paints only outside the border box** — on a transparent element it punches a dark hole through its own glow. Use a radial gradient (`.bloom`), not a shadow, for area glows.
- **`overflow-x: clip`, never `hidden`, on both `html` and `body`**: `hidden` creates a scroll container, which breaks `position: sticky` and the scroll-driven animations; it is set on both because clip propagation from body is unreliable.
- **`dist-ssr/entry-server.js` doubles as a content backup**: `en.ts` was once fully recovered from it after an accidental `git checkout` reverted the file. If a content file gets clobbered, check the last built SSR bundle before rewriting anything.
- **Windows paths**: `vite.config.ts` normalises the `@` alias to forward slashes (`fileURLToPath` yields backslashes; Rollup fails on mixed separators), and `prerender.mjs` must import via `pathToFileURL` ("Received protocol 'e:'" otherwise). Preserve both when touching config.
- **Timeline collapse**: `grid-template-rows: 0fr → 1fr` (not `height: auto`), hidden state via `visibility: hidden` + `inert` — not `content-visibility: hidden`, which WebKit applies immediately and kills the closing animation; not bare zero-height, which leaves content focusable.
- **README's design section is stale** (it describes the earlier light "Werkstatt" design). `src/styles/index.css` and this file are authoritative for the current HALO design.
