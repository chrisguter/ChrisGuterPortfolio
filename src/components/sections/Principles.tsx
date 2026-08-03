import type { CSSProperties } from "react";
import Band from "@/components/primitives/Band";
import { sectionIndex } from "@/lib/sections";
import { useLocale } from "@/lib/i18n";

/** One hue per position, cycling in the same order as the Work index so the
 *  colour already means something by the time a reader gets here. Held as token
 *  names rather than values, so the palette stays defined in one file. */
const ACCENTS = ["--ember", "--rust", "--violet", "--azure"] as const;

export default function Principles() {
  const { t } = useLocale();
  const { label, heading, intro, items } = t.principles;

  return (
    <Band
      id="principles"
      index={sectionIndex("principles")}
      label={label}
      heading={heading}
      intro={intro}
    >
      {/* `role="list"` survives the `list-style: none` that Safari reads as a cue
          to drop list semantics — these four are numbered, and the order is the
          only place that number is available to a screen reader. */}
      <ol role="list" data-stagger>
        {items.map((principle, index) => {
          const token = ACCENTS[index % ACCENTS.length] ?? "--ember";
          const flipped = index % 2 === 1;
          const titleId = `principle-${principle.id}`;

          return (
            <li
              key={principle.id}
              style={
                {
                  "--i": index,
                  "--halo-accent": `var(${token})`,
                  "--halo-glow": `color-mix(in oklch, var(${token}) 46%, transparent)`,
                } as CSSProperties
              }
            >
              {/* Nested rather than a sibling of the item: `[data-stagger] > *`
                  sets its own animation and would replace the rule's draw. */}
              <div
                className={`flex h-px w-full ${flipped ? "lg:flex-row-reverse" : ""}`}
                data-rule
                aria-hidden="true"
              >
                <span className="w-14 shrink-0 [background-color:var(--halo-accent)]" />
                <span className="flex-1 bg-hairline" />
              </div>

              <article
                aria-labelledby={titleId}
                className={`group grid items-center gap-x-12 gap-y-8 py-14 lg:py-24 ${
                  flipped
                    ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,15rem)]"
                    : "lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]"
                }`}
              >
                {/* Drawn, not read: the ordered list already carries the position,
                    so the glyph is hidden rather than announced twice. The stroke
                    stays at full strength — it is the only thing rendering the
                    number, so it is what has to clear contrast, not the fill. */}
                <p
                  aria-hidden="true"
                  data-numeric
                  data-drift
                  className={`font-display text-display font-extrabold select-none [color:transparent] [-webkit-text-stroke:0.035em_var(--halo-accent)] transition-[color,text-shadow] duration-500 ease-out group-hover:[color:var(--halo-accent)] group-hover:[text-shadow:0_0_70px_var(--halo-glow)] ${
                    flipped ? "lg:order-2 lg:justify-self-end" : "lg:justify-self-start"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </p>

                <div className={flipped ? "lg:order-1" : ""}>
                  <h3 id={titleId} className="text-title measure-tight text-cream">
                    {principle.title}
                  </h3>
                  <p className="text-body text-haze measure mt-5">{principle.body}</p>
                </div>
              </article>
            </li>
          );
        })}
      </ol>

      <div className="h-px w-full bg-hairline" data-rule aria-hidden="true" />
    </Band>
  );
}
