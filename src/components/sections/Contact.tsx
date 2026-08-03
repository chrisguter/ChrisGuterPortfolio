import type { CSSProperties } from "react";
import type { Locale } from "@/content";
import Band from "@/components/primitives/Band";
import { sectionIndex } from "@/lib/sections";
import { useLocale } from "@/lib/i18n";

/** Keyed by Locale rather than hardcoded, so adding a language fails the build
 *  instead of quietly shipping an English phrase inside a translated name. */
const OPENS_EXTERNALLY: Record<Locale, string> = {
  en: "opens in a new tab",
  de: "öffnet in einem neuen Tab",
};

/** With the CV button gone these two are the only controls left in the closing
 *  row, so they take over its weight — same padding and fill — rather than
 *  trailing off as small chips against a wide empty rule. They fill their grid
 *  track instead of shrink-wrapping, which is what makes a pair read as a
 *  deliberate pair. */
const CHIP =
  "flex w-full items-center justify-between gap-6 border border-hairline-strong bg-surface/60 px-7 py-5 font-mono text-meta text-cream uppercase transition-colors duration-200 ease-out hover:border-ember hover:bg-surface-raised hover:text-ember";

export default function Contact() {
  const { t, locale } = useLocale();
  const externally = OPENS_EXTERNALLY[locale];

  return (
    <Band
      id="contact"
      index={sectionIndex("contact")}
      label={t.contact.label}
      heading={t.contact.heading}
      className="isolate overflow-clip"
    >
      {/* On its own masked layer rather than on the section: painted straight
          onto the band, the colour field starts as a hard edge at the top
          hairline. The mask breathes it in over the first third and lets it go
          before the footer, so the section fades out of the page instead of
          switching on. */}
      <div
        aria-hidden="true"
        data-drift
        className="aurora pointer-events-none absolute inset-x-0 -inset-y-10 -z-10"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 34%, black 72%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 34%, black 72%, transparent 100%)",
        }}
      />

      <p className="measure-tight text-lead text-haze" data-rise>
        {t.contact.body}
      </p>

      <div className="mt-14 h-px bg-hairline" data-rule aria-hidden="true" />

      {/* The glow is a text-shadow, so this block must never carry data-wipe:
          its finished clip-path would crop the bloom to the border box. */}
      <div className="py-10 sm:py-16" data-rise>
        <p className="meta flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="pulse size-1.5 shrink-0 rounded-full bg-ember"
          />
          {t.contact.emailLabel}
        </p>

        <p className="mt-5">
          <a
            href={`mailto:${t.contact.email}`}
            /* Sized against the string, not the type scale: the address is 31
               characters, and at text-display it overruns the shell and clips.
               The clamp keeps it the largest thing in the band while still
               fitting, and break-words lets it wrap rather than overflow if a
               longer address is ever swapped in. */
            className="glow-ember font-display inline-block max-w-full text-[clamp(1.2rem,5vw,3.75rem)] leading-[1.15] break-words text-ember underline decoration-ember/40 decoration-2 underline-offset-8 transition duration-300 ease-out hover:decoration-ember hover:brightness-125 sm:decoration-4"
          >
            {t.contact.email}
          </a>
        </p>
      </div>

      <div className="h-px bg-hairline" data-rule aria-hidden="true" />

      {/* `role="list"` is explicit: Safari drops list semantics from a `ul`
          whose markers are removed, and preflight removes them. */}
      <ul
        role="list"
        className="mt-12 grid gap-3 sm:max-w-lg sm:grid-cols-2 sm:gap-4"
        data-stagger
      >
        {t.contact.socials.map((social, index) => (
          <li key={social.href} style={{ "--i": index } as CSSProperties}>
            <a
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${social.label} (${externally})`}
              className={CHIP}
            >
              {social.label}
              <span aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </Band>
  );
}
