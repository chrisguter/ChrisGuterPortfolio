import { en } from "./en";
import { de } from "./de";
import { DEFAULT_LOCALE, LOCALES, type Content, type Locale } from "./types";

export const content: Record<Locale, Content> = { en, de };

export const SITE_ORIGIN = "https://chrisguter.com";

/** The three prerendered documents. Locale is a path prefix on top of these,
 *  so the build emits ROUTES x LOCALES static files. */
export const ROUTES = ["home", "imprint", "privacy"] as const;
export type Route = (typeof ROUTES)[number];

const ROUTE_PATHS: Record<Route, string> = {
  home: "/",
  imprint: "/imprint/",
  privacy: "/privacy/",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

function segments(pathname: string): string[] {
  return pathname.split("/").filter(Boolean);
}

/** Locale is carried by the URL, not by state: `/` is English, `/de/` is
 *  German. Two real URLs per page means correct `hreflang` and a page that is
 *  indexable in both languages. */
export function localeFromPath(pathname: string): Locale {
  const first = segments(pathname)[0] ?? "";
  return isLocale(first) ? first : DEFAULT_LOCALE;
}

export function routeFromPath(pathname: string): Route {
  const parts = segments(pathname);
  const rest = parts[0] !== undefined && isLocale(parts[0]) ? parts.slice(1) : parts;
  const slug = rest[0] ?? "";
  return (ROUTES as readonly string[]).includes(slug) ? (slug as Route) : "home";
}

/** Builds the path for a given locale and route. Used by the language switch,
 *  the footer links and the sitemap, so the three can never drift apart. */
export function pathFor(locale: Locale, route: Route = "home"): string {
  const base = ROUTE_PATHS[route];
  return locale === DEFAULT_LOCALE ? base : `/${locale}${base}`;
}

/** Keeps the current page when switching language. */
export function pathForLocale(locale: Locale, pathname = "/"): string {
  return pathFor(locale, routeFromPath(pathname));
}

export function canonicalFor(locale: Locale, route: Route = "home"): string {
  return `${SITE_ORIGIN}${pathFor(locale, route)}`;
}

export { DEFAULT_LOCALE, LOCALES };
export type { Content, Locale };
