# chrisguter.com

The personal site of Christian Gutermann — software engineer, Scrum Master and
founder. Live at **[chrisguter.com](https://chrisguter.com)**: English at `/`,
German at `/de/`, each a real URL with its own static document.

The site doubles as a work sample. There is no CMS, no framework runtime in the
critical path and no third-party request anywhere — every route ships as
finished HTML, and the repo is meant to be read the way the site is meant to be
seen. If you landed here from the site or a CV, this page tells you what you
are looking at.

## The design: HALO

Cinematic dark, built around the portrait rather than around type. Every colour
is sampled from the photograph itself — the near-black ground comes from the
sweater, the ember accent is the skin's own warmth pushed to full chroma — so
the light on the page and the light on his face agree. Four accents (ember,
rust, violet, azure) sit on a near-black void; all of them are contrast-checked
and clear WCAG AA as body text, which is why the site is dark-only by design.
The scroll-driven reveals are pure CSS (`animation-timeline: view()`) — no
scroll listeners, no animation library — and every string on the site is typed
data, not markup. The sampled values and measured contrast ratios are
documented at the top of `src/styles/index.css`.

## Where to look

The parts of the codebase that are worth a reader's time, in rough order:

- **The typed content model** — `src/content/types.ts` defines a `Content`
  interface; `en.ts` and `de.ts` each satisfy it in full. There is no
  translation runtime and no key lookup: components read `t.work.heading`
  directly, so a missing or misspelled translation is a **compile error**, not
  a raw key rendered to a visitor. Adding a field breaks both locales until
  both are filled in.
- **The prerender pipeline** — `npm run build` runs a client build, an SSR
  build of `src/entry-server.tsx`, and `scripts/prerender.mjs`, which renders
  2 locales × 3 routes into six static documents (`/`, `/de/`, `/imprint/`,
  `/privacy/` and variants). Each gets its own `<html lang>`, canonical URL,
  reciprocal `hreflang` alternates plus `x-default`, Open Graph tags and — on
  the home documents — `Person` JSON-LD. `404.html` is a copy of the English
  home, so a mistyped path on GitHub Pages still lands on the site.
- **The architecture diagrams** — the "Currently" section
  (`src/components/sections/Now.tsx`) draws each project's architecture from
  typed data (`ArchGroup`/`ArchEdge` in the content files), so the labels
  translate with the rest of the site. The boxes are real DOM; the edges are an
  SVG overlay computed from measured element positions, kept in sync by a
  `ResizeObserver`.
- **The skills map** — `src/components/sections/Skills.tsx`. The graph is
  decorative; the nodes are real HTML buttons laid over it, and the same
  buttons reflow into a grouped chip list on small screens. Because the page is
  prerendered, the geometry must come out bit-for-bit identical in Node,
  Chromium and WebKit — which rules out `Math.sin`/`Math.cos` (only
  implementation-approximated in the spec), so the angles are computed with a
  deterministic Taylor series. A screen-reader equivalent of the relationships
  ships alongside the drawing.
- **The accessibility story** — `tests/e2e.spec.ts` runs axe (WCAG 2 A + AA)
  against all six documents, on both Chromium and WebKit, so a regression fails
  CI rather than a visitor. Beyond the audit: one `h1` per document, a skip
  link, focus that returns to its trigger when a case study, lightbox or the
  mobile menu closes with Escape, and every animation gated behind
  `prefers-reduced-motion`.
- **The no-cookies stance** — the privacy page claims this site sets no
  cookies and uses no storage, and the code keeps that true: nothing in `src/`
  touches `localStorage`, `sessionStorage` or `document.cookie`. The notice in
  `src/components/NoCookiesNotice.tsx` is the inverse of a consent banner — it
  deliberately stores no "seen it" flag, because that flag would make the
  privacy page false.

## Stack

| Layer    | Choice                                                              |
| -------- | ------------------------------------------------------------------- |
| UI       | React 19, hydrating prerendered markup                              |
| Build    | Vite 6 (client + SSR build) and a small prerender script            |
| Styling  | Tailwind CSS v4, CSS-first config; tokens in `src/styles/index.css` |
| Language | TypeScript, `strict`                                                |
| Type     | Bricolage Grotesque, Geist, Geist Mono — self-hosted via Fontsource |
| Tests    | Playwright on Chromium + WebKit, with `@axe-core/playwright`        |
| Hosting  | GitHub Pages, custom domain, deployed by GitHub Actions             |

No i18n runtime, no CSS-in-JS, no component library, no analytics, no
third-party requests.

## Commands

| Command             | What it does                                           |
| ------------------- | ------------------------------------------------------ |
| `npm run dev`       | Vite dev server with HMR                               |
| `npm run build`     | Client build → SSR build → prerender all six documents |
| `npm run preview`   | Serve the built `dist/` locally                        |
| `npm run typecheck` | `tsc --noEmit`                                         |
| `npm run lint`      | ESLint (flat config, typescript-eslint)                |
| `npm run format`    | Prettier write (`format:check` is what CI runs)        |
| `npm run test:e2e`  | Playwright suite against the built `dist/`             |

Node 20 or newer; `.nvmrc` pins the version CI uses. The e2e suite tests the
prerendered output, not the dev server — run `npm run build` first.

## CI/CD

Every pull request and push to `main` runs the full gate in
`.github/workflows/ci.yml`: format check, lint, typecheck, build, then the
Playwright suite on Chromium and WebKit. A separate workflow
(`.github/workflows/deploy.yml`) builds on `main` and publishes `dist/` through
the official GitHub Pages artifact flow, refusing to deploy if the committed
`CNAME` is missing so the custom domain cannot be silently dropped.

## Licence

The code is MIT — see [LICENSE](LICENSE); learn from it, fork it, reuse it.
The written copy, the photographs and the client and product marks are not
covered by that licence: they identify a real person and real work. Take the
implementation, bring your own words and pictures.
