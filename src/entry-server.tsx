import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { PORTRAIT_SRCSET, PORTRAIT_SIZES } from "./components/sections/Hero";
import { LocaleProvider } from "./lib/i18n";
import {
  canonicalFor,
  content,
  LOCALES,
  ROUTES,
  SITE_ORIGIN,
  pathFor,
  type Locale,
  type Route,
} from "./content";

/** Rendered at build time, once per locale and route, by scripts/prerender.mjs.
 *  This is what makes the site static HTML rather than an empty <div id="root">:
 *  it moves LCP to first paint and gives crawlers real content. */
export function render(
  locale: Locale,
  route: Route,
): { html: string; head: string; path: string } {
  const t = content[locale];

  const html = renderToString(
    <StrictMode>
      <LocaleProvider locale={locale}>
        <App route={route} />
      </LocaleProvider>
    </StrictMode>,
  );

  const meta =
    route === "home"
      ? { title: t.meta.title, description: t.meta.description }
      : route === "imprint"
        ? {
            title: `${t.legal.imprint.title} — ${t.hero.name}`,
            description: t.legal.imprint.description,
          }
        : {
            title: `${t.legal.privacy.title} — ${t.hero.name}`,
            description: t.legal.privacy.description,
          };

  const alternates = LOCALES.map(
    (l) => `<link rel="alternate" hreflang="${l}" href="${canonicalFor(l, route)}" />`,
  ).join("\n    ");

  const head = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<link rel="canonical" href="${canonicalFor(locale, route)}" />`,
    alternates,
    `<link rel="alternate" hreflang="x-default" href="${canonicalFor("en", route)}" />`,
    // The legal pages carry no SEO value and should not compete with the home
    // page in search results, but they stay crawlable so the Impressum is
    // discoverable — which is the entire point of having one.
    route === "home" ? "" : `<meta name="robots" content="noindex,follow" />`,
    // The hero portrait is the LCP element. Preloading with the same
    // srcset/sizes the <img> carries lets the fetch start with the document
    // instead of after the bundle, and guarantees the preloaded candidate is
    // the one the browser actually picks.
    route === "home"
      ? `<link rel="preload" as="image" imagesrcset="${PORTRAIT_SRCSET}" imagesizes="${PORTRAIT_SIZES}" fetchpriority="high" />`
      : "",
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(t.hero.name)}" />`,
    `<meta property="og:locale" content="${locale === "de" ? "de_DE" : "en_GB"}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:url" content="${canonicalFor(locale, route)}" />`,
    `<meta property="og:image" content="${SITE_ORIGIN}/og.png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(t.meta.ogAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:image" content="${SITE_ORIGIN}/og.png" />`,
    route === "home"
      ? `<script type="application/ld+json">${personJsonLd(locale)}</script>`
      : "",
  ]
    .filter(Boolean)
    .join("\n    ");

  return { html, head, path: pathFor(locale, route) };
}

function personJsonLd(locale: Locale): string {
  const t = content[locale];
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: t.hero.name,
    url: canonicalFor(locale),
    jobTitle: t.hero.roles.map((r) => r.title),
    worksFor: t.hero.roles.map((r) => ({ "@type": "Organization", name: r.org })),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bruchsal",
      addressRegion: "Baden-Württemberg",
      addressCountry: "DE",
    },
    email: `mailto:${t.contact.email}`,
    sameAs: t.contact.socials.map((s) => s.href),
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export { LOCALES, ROUTES };
