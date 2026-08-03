import { pathFor, type Locale } from "@/content";
import type { LegalPage as LegalPageContent, LegalSection } from "@/content/types";
import { useLocale } from "@/lib/i18n";

/** The content model carries the date but not the words in front of it, and a
 *  legal document must not mix languages. Keyed by Locale rather than defaulted,
 *  so adding a language is a build error instead of an English label quietly
 *  appearing on a translated page. */
const UPDATED_LABEL: Record<Locale, string> = {
  en: "Last updated",
  de: "Zuletzt aktualisiert",
};

/** Unfilled Impressum fields ship as `[STREET AND NUMBER] — please complete`.
 *  They are rendered verbatim and loudly on purpose: an Impressum with a silently
 *  empty address is the exact liability this page exists to prevent, so the
 *  placeholder has to survive a review nobody is reading closely. The bracket is
 *  the marker — matching the full sentence would miss the German wording. */
function isPlaceholder(value: string): boolean {
  return value.trimStart().startsWith("[");
}

/** A bare address is more useful as a link, and these rows are the one place on
 *  a legal page a reader actually wants to act on. Deliberately strict: anything
 *  with whitespace or a second `@` stays plain text. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function RowValue({ value }: { value: string }) {
  if (isPlaceholder(value)) {
    return (
      /* Not colour alone: the string itself says what is missing, and the mono
         face plus the rule box carry the alarm for anyone who cannot see rust. */
      <span className="inline-flex items-start gap-2.5 border border-rust/40 bg-rust/8 px-3 py-1.5 font-mono text-small text-rust">
        <span aria-hidden="true">&#9888;</span>
        {value}
      </span>
    );
  }

  if (EMAIL.test(value)) {
    return (
      <a
        href={`mailto:${value}`}
        className="font-mono text-small text-ember underline decoration-ember/40 underline-offset-4 transition-colors duration-200 ease-out hover:decoration-ember"
      >
        {value}
      </a>
    );
  }

  return <span className="text-body text-cream">{value}</span>;
}

function Section({ section, id }: { section: LegalSection; id: string }) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className="py-10 first:pt-0" data-rise>
      <h2 id={headingId} className="text-lead measure-tight text-cream">
        {section.heading}
      </h2>

      {section.body ? (
        <div className="measure mt-5 space-y-5">
          {section.body.map((paragraph) => (
            <p key={paragraph} className="text-body leading-[1.85] text-haze">
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}

      {section.rows ? (
        /* A real definition list: the address block is term/value pairs, which is
           what a screen reader is told to expect here. The `div` grouping is the
           HTML-spec-sanctioned way to give each pair its own row box. */
        <dl className="measure hairline-t mt-8">
          {section.rows.map((row) => (
            <div
              key={row.term}
              className="hairline-b grid gap-x-8 gap-y-1.5 py-4 sm:grid-cols-[minmax(0,9rem)_minmax(0,1fr)]"
            >
              <dt className="meta pt-1.5">{row.term}</dt>
              <dd>
                <RowValue value={row.value} />
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </section>
  );
}

export default function LegalPage({ page }: { page: LegalPageContent }) {
  const { locale, t } = useLocale();
  const home = pathFor(locale);

  return (
    /* Clears the 3.5rem fixed bar with room to spare — the title is the first
       thing on the page and should not sit under the chrome. */
    <article className="pt-32 pb-24 sm:pt-40 lg:pt-48">
      <header className="shell relative isolate" data-rise>
        <div
          aria-hidden="true"
          className="aurora pointer-events-none absolute -inset-x-24 -inset-y-32 -z-10 opacity-40"
        />

        <p>
          <a href={home} className="link-ember font-mono text-meta uppercase">
            <span aria-hidden="true">&#8592; </span>
            {t.legal.backToSite}
          </a>
        </p>

        {/* `break-words hyphens-auto` is the safety net, not the layout: the German titles are
            long compounds and the display clamp tops out at 7rem. */}
        <h1 className="font-display text-display mt-8 break-words text-cream">
          {page.title}
        </h1>

        <p className="meta mt-8">
          {UPDATED_LABEL[locale]} &middot; {page.updated}
        </p>

        {page.intro ? (
          <p className="text-lead text-haze measure mt-8">{page.intro}</p>
        ) : null}
      </header>

      <div className="shell mt-16 lg:mt-20">
        <div className="h-px w-full bg-hairline" data-rule aria-hidden="true" />

        <div className="mt-10 divide-y divide-hairline">
          {page.sections.map((section, index) => (
            <Section
              key={section.heading}
              section={section}
              id={`${page.slug}-${index + 1}`}
            />
          ))}
        </div>
      </div>

      <footer className="shell mt-16">
        <div className="hairline-t flex pt-10" data-rise>
          <a
            href={home}
            className="inline-flex items-center gap-3 border border-hairline-strong px-6 py-4 font-mono text-meta text-cream uppercase transition-colors duration-200 ease-out hover:border-ember hover:bg-surface hover:text-ember"
          >
            <span aria-hidden="true">&#8592;</span>
            {t.legal.backToSite}
          </a>
        </div>
      </footer>
    </article>
  );
}
