# chrisguter.com

The personal site of Christian Gutermann — software engineer, Scrum Master and
founder, based in Karlsruhe. One page, two languages, no framework runtime in the
critical path: every route ships as a finished HTML document.

Live at **[chrisguter.com](https://chrisguter.com)**.

---

## The design: Werkstatt

The site is a Swiss editorial monograph rendered in print colours. Warm paper
(`#f4f1ea`), near-black ink, and exactly one signal red. The grid is visible, the
rules are hairlines, the type scale is fixed and small, and a mono metadata layer
runs down the left margin the way a printed spec sheet numbers its plates.

Restraint is the point. The signal colour appears at most twice per viewport and
means one of two things — _this is now_, or _go here_. It is never decorative and
never a gradient. Status is never encoded by colour alone; every state carries a
glyph or a word as well, so the page survives greyscale, low vision and a bad
monitor. There is no shadow, no glass, no accent palette to hide behind. What is
left has to be the typography and the spacing, which is the harder way to do it
and the reason it looks like a design team was involved.

Motion follows the same rule. Reveals are CSS scroll-driven animations — a fade,
a 14px lift, a deblur — so they cost nothing on the main thread and degrade to
nothing under `prefers-reduced-motion`.

---

## Stack

| Layer    | Choice                                                               |
| -------- | -------------------------------------------------------------------- |
| UI       | React 19                                                             |
| Build    | Vite 6                                                               |
| Styling  | Tailwind CSS v4 (CSS-first config, tokens in `src/styles/index.css`) |
| Language | TypeScript, `strict` + `noUncheckedIndexedAccess`                    |
| Type     | Instrument Serif, Geist, Geist Mono — self-hosted via Fontsource     |
| Tests    | Playwright, with `@axe-core/playwright` for accessibility assertions |
| Hosting  | GitHub Pages, custom domain, deployed by GitHub Actions              |

No i18n runtime, no CSS-in-JS, no component library, no analytics, no third-party
requests at all.

---

## How the bilingual prerendering works

The locale lives in the URL, not in client state. `/` is English, `/de/` is
German — two real addresses, two separate static documents.

The build runs three steps (`npm run build`):

1. **Client build.** Vite emits the hydration bundle and `dist/index.html`, which
   still contains the `<!--app-html-->` and `<!--app-head-->` placeholders.
2. **SSR build.** The same app is compiled a second time against
   `src/entry-server.tsx`, which exports `render(locale) → { html, head }`.
3. **Prerender.** `scripts/prerender.mjs` calls `render()` once per locale and
   writes the result into the template — setting `<html lang>` per document and
   injecting the head: title, description, canonical, reciprocal `hreflang`
   alternates (plus `x-default`), Open Graph, Twitter card and `Person`
   JSON-LD. English lands at `dist/index.html`, German at `dist/de/index.html`.
   `dist/404.html` is a copy of the English document, so a mistyped path on
   GitHub Pages lands on the site instead of the Pages 404 — no client router
   needed.

The client picks its locale back up from `window.location.pathname` and hydrates
the markup that is already on screen. The consequence that matters: the largest
contentful paint is the first paint, and a crawler with JavaScript disabled sees
the entire page in both languages.

`public/sitemap.xml` declares the same alternate pairs the documents do, and
`public/CNAME` is committed rather than written by CI, so the custom domain is
reproducible and survives a workflow rewrite.

---

## Content

Every string on the site lives in `src/content/en.ts` and `src/content/de.ts` as
a typed object satisfying the `Content` interface in `src/content/types.ts`.

There is no translation runtime and no key lookup. Components read
`const { t } = useLocale()` and touch `t.work.heading` directly, which means a
missing or misspelled key is a **compile error**, not a raw `work.heading`
rendered to a visitor. Adding a field to the interface breaks both locales until
both are filled in — the type system is the translation checklist.

Two conventions in `types.ts` are worth knowing before editing copy:

- `Figure.value: null` means _not cleared for publication_. The evidence band
  renders only figures that have a value and hides itself entirely below three,
  so an unfilled figure is invisible rather than a placeholder shipped to
  production. Never fill one with an estimate.
- Optional fields such as `Project.year` and `Project.study` are genuinely
  optional in the layout. An index row without a `study` stays collapsed and is
  not clickable; a project without a `year` leaves the column empty rather than
  printing a guess.

---

## Commands

```bash
npm install
npm run dev            # Vite dev server with HMR
npm run build          # client build → SSR build → prerender both locales
npm run preview        # serve the built dist/ locally
npm run typecheck      # tsc --noEmit
npm run lint           # ESLint (flat config, typescript-eslint)
npm run format         # Prettier write  (format:check for CI)
npm run test:e2e       # Playwright end-to-end + axe accessibility checks
```

Node 20 or newer; `.nvmrc` pins the version CI uses.

---

## Architecture

```
index.html                  template with head/body placeholders
scripts/prerender.mjs       build-time renderer, one document per locale
public/                     copied verbatim into dist/ (CNAME, robots, sitemap, manifest, favicon)
src/
  entry-client.tsx          reads locale from the path, hydrates
  entry-server.tsx          render(locale) → { html, head } incl. SEO + JSON-LD
  App.tsx                   skip link, header, the seven sections, footer
  content/
    types.ts                the Content interface — the contract
    en.ts  de.ts            all copy, one module per locale
    index.ts               locale ↔ path helpers, canonical URLs
  components/
    primitives/             Section (band + grid wrapper), Stagger (reveal groups)
    sections/               Thesis · Evidence · Work · Timeline · Principles · About · Contact
    Header.tsx  Footer.tsx
  lib/
    i18n.tsx                LocaleProvider + useLocale()
    theme.ts                theme storage and the inline pre-paint bootstrap
  styles/index.css          design tokens, utility classes, scroll-driven motion
```

Two details that carry more weight than their size suggests. `lib/theme.ts`
exports `THEME_BOOTSTRAP`, a tiny script inlined into `<head>` that applies the
stored theme before first paint — without it every load flashes the system theme.
And the dark palette is authored separately rather than inverted, because
inverted palettes lose chroma at low luminance and the signal stops signalling.

---

## Accessibility

Treated as load-bearing, not as a checklist run at the end.

- Semantic landmarks, a skip link, and one `h1` per document (it lives in
  Thesis; everything below is `h2`/`h3` in order).
- Buttons are buttons and links are links. `aria-current` marks the active nav
  item and the active locale. No positive `tabindex`.
- Focus styling is global and never overridden per component.
- Colour is never the only carrier of meaning; ink, muted ink and the signal are
  all contrast-checked against their own ground, in both themes.
- All motion sits inside `prefers-reduced-motion: no-preference`, including the
  JS-driven counters, which check the media query before starting.
- The Playwright suite runs axe against both locales, so a regression fails the
  build rather than the visitor.

## Performance

- Prerendered HTML: first paint is the finished page, LCP is text, and nothing
  is waiting on JavaScript to become visible.
- Fonts are self-hosted and subset by Fontsource — zero third-party connections,
  so no extra DNS, TLS or privacy footprint.
- Reveal animations are CSS scroll-driven; no animation library is loaded on the
  critical path.
- Build targets ES2022 with LightningCSS minification, and the page ships as one
  document plus one small hydration bundle.

---

## Running it locally

```bash
git clone https://github.com/ChrisGuter/ChrisGuterPortfolio.git
cd ChrisGuterPortfolio
npm install
npm run dev
```

To check what actually deploys, build and preview the static output instead:

```bash
npm run build && npm run preview
```

---

## Deployment

`npm run build` produces a self-contained `dist/`:

```
dist/
  index.html            English document
  de/index.html         German document
  404.html              copy of the English document
  CNAME  robots.txt  sitemap.xml  site.webmanifest  favicon.svg
  assets/…
```

A GitHub Actions workflow in `.github/workflows/` builds that directory and
publishes it to GitHub Pages. The custom domain comes from the committed
`public/CNAME`, so re-running or rewriting the workflow cannot silently drop it.

---

## Known gaps

Binary assets that the markup already references and that still need to be
produced:

- `public/og.png` — 1200×630 social card
- `public/icon-192.png`, `public/icon-512.png`, `public/icon-maskable-512.png` —
  referenced by `site.webmanifest`
- `public/apple-touch-icon.png` — 180×180, referenced by `index.html`
- `public/christian-gutermann-cv.pdf` — target of the CV link in Contact
- Project screenshots for `work.projects[].media`; until they exist the index
  falls back to a typographic plate, which is a deliberate design rather than a
  placeholder

## Licence

MIT — see [LICENSE](LICENSE). That covers the code, which you are welcome to
learn from, fork and reuse. The written copy, the CV and the career history are
personal rather than reusable material: take the implementation, write your own
words.
