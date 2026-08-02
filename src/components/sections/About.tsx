import type { CSSProperties } from "react";
import Band from "@/components/primitives/Band";
import { useLocale } from "@/lib/i18n";

/** Splits a paragraph at its first clause break so the emphasised lead-in ends
 *  on a real phrase boundary. Punctuation, not word count: the two locales break
 *  in different places — the German copy opens on a dash or a semicolon where
 *  the English opens on a comma — and a fixed word count would cut mid-thought
 *  in at least one of them. */
function splitLeadIn(paragraph: string): { lead: string; rest: string } {
  const clause = /^[^,;:.!?–—]+[,;:.!?–—]/u.exec(paragraph)?.[0];
  const lead = clause ?? paragraph.split(" ").slice(0, 6).join(" ");
  return { lead, rest: paragraph.slice(lead.length).trimStart() };
}

/* A quotation mark carries a small fraction of the ink of its em box, so these
   sit far above the type scale to read as graphics rather than as punctuation.
   Both are decorative and behind the prose; the opacity is low enough that the
   text still measures against the void it was contrast-checked on. */
const GLYPH =
  "pointer-events-none absolute -z-10 font-display leading-none select-none " +
  "text-[length:clamp(8rem,22vw,20rem)]";

export default function About() {
  const { t } = useLocale();
  const { label, heading, body } = t.about;

  return (
    <Band id="about" index="05" label={label} heading={heading}>
      <div className="measure relative isolate mt-10 md:mt-16">
        <div
          aria-hidden="true"
          className="aurora pointer-events-none absolute -inset-x-16 -inset-y-24 -z-10 opacity-55"
          data-drift
        />

        <span
          aria-hidden="true"
          className={`${GLYPH} top-0 left-0 -translate-x-[0.12em] -translate-y-[0.22em] text-ember/12`}
        >
          &ldquo;
        </span>

        <div className="space-y-10 md:space-y-14" data-stagger>
          {body.map((paragraph, index) => {
            const { lead, rest } = splitLeadIn(paragraph);

            return (
              <p
                key={paragraph}
                className="text-lead"
                style={{ "--i": index } as CSSProperties}
              >
                <span className="font-medium text-cream">{lead}</span>
                {rest ? <span className="text-haze"> {rest}</span> : null}
              </p>
            );
          })}
        </div>

        <span
          aria-hidden="true"
          className={`${GLYPH} right-0 bottom-0 translate-x-[0.1em] translate-y-[0.86em] text-rust/12`}
        >
          &rdquo;
        </span>
      </div>
    </Band>
  );
}
