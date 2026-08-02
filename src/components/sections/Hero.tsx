/// <reference types="vite/client" />
import type { CSSProperties } from "react";
/* WebP, not the source PNG: the cut-out is 2.9 MB as PNG and it is the LCP
   element. WebP keeps the alpha channel and lands at 394 kB. */
import portraitSrc from "@/assets/portrait/chris.webp";
import { useLocale } from "@/lib/i18n";

/* `.meta` is declared after Tailwind's utilities and would win the cascade on
   colour, so the ember and cream labels spell the treatment out instead. */
const MONO = "font-mono text-meta uppercase";

/* Pitched one step above `.meta` — big enough to read as a statement of what he
   does, still mono so it belongs to the name block. Sized in an arbitrary value
   so no token line-height or tracking can win against the pairing set here. */
const TAGLINE =
  "font-mono text-ember text-[0.8125rem] leading-[1.6] tracking-[0.14em] uppercase";

/* The source is a cut-out with a real alpha channel, so there is no rectangle
   to hide and none of the side masking the previous photograph needed. Only the
   lower edge is faded, so the torso dissolves into the page instead of ending on
   a hard crop line. */
const FOOT_FADE =
  "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 62%, rgba(0,0,0,0.72) 78%, rgba(0,0,0,0.28) 91%, rgba(0,0,0,0) 100%)";

const footMask: CSSProperties = { WebkitMaskImage: FOOT_FADE, maskImage: FOOT_FADE };

const cue = (index: number) => ({ "--i": index }) as CSSProperties;

export default function Hero() {
  const { t } = useLocale();

  /* The name is one string in the content model; each word gets its own line so
     the display size has somewhere to go. */
  const words = t.hero.name.split(" ").filter(Boolean);

  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="hero-name">
      <div className="shell relative flex min-h-svh flex-col justify-center pt-24 pb-20 lg:pt-20 lg:pb-14">
        <figure
          data-drift
          className="aurora relative isolate mx-auto w-[74%] max-w-[17rem] sm:max-w-[20rem] lg:absolute lg:top-1/2 lg:right-0 lg:mx-0 lg:w-[44%] lg:max-w-[34rem] lg:-translate-y-1/2"
        >
          {/* The glow lives on an unmasked sibling: a mask clips a descendant's
              box-shadow away, so it cannot sit on the image itself. */}
          <div
            aria-hidden="true"
            className="bloom pointer-events-none absolute inset-[16%] rounded-[50%]"
          />
          <img
            src={portraitSrc}
            alt={t.hero.portraitAlt}
            width={1024}
            height={1536}
            fetchPriority="high"
            decoding="sync"
            draggable={false}
            /* Cropped to head and shoulders on small screens, where the full
               figure would push the name and thesis below the fold; shown in
               full from lg, where there is height for it. */
            className="relative z-10 aspect-[3/4] w-full object-cover object-top lg:aspect-auto lg:object-fill"
            style={footMask}
          />
        </figure>

        {/* Holds the copy clear of the portrait and keeps the type legible where
            the two overlap at narrower desktop widths. */}
        <div
          aria-hidden="true"
          className="from-void via-void/80 pointer-events-none absolute inset-0 hidden bg-linear-100 to-transparent to-72% lg:block"
        />

        <div className="relative z-10 lg:max-w-[56%]">
          <h1
            id="hero-name"
            data-wipe
            className="ink-spectrum font-display text-mega -mt-[14vw] sm:-mt-[10vw] lg:mt-0"
          >
            {words.map((word, index) => (
              /* The separator stays in the markup: block spans would otherwise
                 leave the accessible name as one run-on word. */
              <span key={`${word}-${index}`} className="block">
                {word}
                {index < words.length - 1 ? " " : null}
              </span>
            ))}
          </h1>

          {/* An identity line, not a status line. There is deliberately no dot
              and nothing animated here: anything that reads as "live" turns a
              statement of what he does into a signal that he is looking. */}
          <div
            data-stagger
            className="mt-6 flex flex-wrap items-baseline gap-x-8 gap-y-2"
          >
            <p className={TAGLINE} style={cue(0)}>
              {t.hero.tagline}
            </p>

            <p className="meta" style={cue(1)}>
              {t.hero.location}
            </p>
          </div>

          <div data-stagger className="mt-9 flex flex-col items-start gap-6">
            <p className="text-lead text-haze measure" style={cue(0)}>
              {t.hero.thesis}
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-4" style={cue(1)}>
              <ul className="flex flex-wrap gap-2">
                {t.hero.roles.map((role) => (
                  <li
                    key={`${role.title}-${role.org}`}
                    className="border-hairline-strong border px-4 py-2.5"
                  >
                    <span className={`${MONO} text-cream block`}>{role.title}</span>
                    <span className="meta mt-1 block">{role.org}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="group border-ember/45 bg-ember/10 text-ember hover:border-ember hover:bg-ember/20 inline-flex items-center gap-3 border px-7 py-4 transition-colors duration-200 ease-out"
              >
                <span className={MONO}>{t.hero.cta}</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </a>
            </div>
          </div>
        </div>

        <p
          className="relative z-10 mt-12 flex items-center gap-3 lg:absolute lg:bottom-8 lg:left-gutter lg:mt-0"
          data-rise
        >
          <span aria-hidden="true" className="pulse text-ember leading-none">
            &darr;
          </span>
          <span className="meta">{t.hero.scrollHint}</span>
        </p>
      </div>
    </section>
  );
}
