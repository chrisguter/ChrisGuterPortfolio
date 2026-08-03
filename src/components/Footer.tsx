import { pathFor } from "@/content";
import { useLocale } from "@/lib/i18n";

export default function Footer() {
  const { locale, t } = useLocale();

  /* The page is prerendered, so this year is stamped into the HTML at build
     time and only moves when the site is rebuilt. That is the correct trade
     here: a hydration-safe constant beats a client-only date. */
  const year = String(new Date().getFullYear());

  /* German law wants the Impressum reachable from every page, so these are
     footer links at full weight rather than small print. */
  const links = [
    { href: pathFor(locale, "imprint"), label: t.legal.imprint.title },
    { href: pathFor(locale, "privacy"), label: t.legal.privacy.title },
  ];

  return (
    <footer className="hairline-t">
      <div
        className="shell flex flex-col gap-x-12 gap-y-6 py-16 lg:flex-row lg:items-baseline lg:justify-between lg:py-20"
        data-rise
      >
        <p className="meta">
          &copy; <time dateTime={year}>{year}</time> {t.hero.name}. {t.footer.rights}
        </p>

        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {links.map((link, index) => (
            <li key={link.href} className="flex items-center gap-5">
              {index > 0 ? (
                <span aria-hidden="true" className="h-3 w-px bg-hairline-strong" />
              ) : null}
              <a
                href={link.href}
                className="link-ember font-mono text-meta whitespace-nowrap uppercase"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
