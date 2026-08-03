/// <reference types="vite/client" />
import type { CSSProperties } from "react";
import Band from "@/components/primitives/Band";
import { sectionIndex } from "@/lib/sections";
import { useLocale } from "@/lib/i18n";
import maliSrc from "@/assets/life/mali.webp";
import familySrc from "@/assets/life/family.webp";
import pcPlate from "@/assets/life/pc.svg";

/** Keyed rather than pathed, so the content files stay plain data. Intrinsic
 *  dimensions live here too — they belong with the file, not with the copy, and
 *  they are what keeps the section from shifting as the media decodes. The pc
 *  entry is a drawn plate, not a photograph; at exactly 4:3 it fills the same
 *  window the photos get and the object-cover crop touches nothing. */
const MEDIA: Record<string, { src: string; width: number; height: number }> = {
  mali: { src: maliSrc, width: 1200, height: 1594 },
  family: { src: familySrc, width: 1200, height: 900 },
  pc: { src: pcPlate, width: 800, height: 600 },
};

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

export default function About() {
  const { t } = useLocale();
  const { label, heading, entries } = t.about;

  return (
    <Band id="about" index={sectionIndex("about")} label={label} heading={heading}>
      <div className="relative isolate mt-10 md:mt-14">
        <div
          aria-hidden="true"
          className="aurora pointer-events-none absolute -inset-x-16 -inset-y-24 -z-10 opacity-50"
          data-drift
        />

        <div className="space-y-16 md:space-y-24" data-stagger>
          {entries.map((entry, index) => {
            const { lead, rest } = splitLeadIn(entry.text);
            const media = entry.image ? MEDIA[entry.image.src] : undefined;

            return (
              <div
                key={entry.id}
                style={{ "--i": index } as CSSProperties}
                /* Alternating sides give the section a rhythm rather than a
                   column of stacked cards. Entries without media run at the
                   reading measure instead of half width, so a short note does
                   not look like a cell with its image missing. */
                className={
                  media
                    ? "flex flex-col gap-8 md:flex-row md:items-center md:gap-14" +
                      (index % 2 === 1 ? " md:flex-row-reverse" : "")
                    : "measure"
                }
              >
                {media && entry.image ? (
                  <figure className="relative shrink-0 md:w-[46%]">
                    <img
                      src={media.src}
                      alt={entry.image.alt}
                      width={media.width}
                      height={media.height}
                      loading="lazy"
                      decoding="async"
                      /* A fixed 4:3 window across all three: one source is
                         portrait, one landscape, one drawn to fit — letting
                         each keep its own ratio makes the rows lurch. */
                      className="aspect-4/3 w-full rounded-[2px] object-cover"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-[2px] border border-hairline-strong"
                    />
                  </figure>
                ) : null}

                <div className={media ? "md:flex-1" : ""}>
                  <p className="text-lead">
                    <span className="font-medium text-cream">{lead}</span>
                    {rest ? <span className="text-haze"> {rest}</span> : null}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Band>
  );
}
