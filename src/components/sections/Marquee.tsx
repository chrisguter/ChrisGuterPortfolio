import { useLocale } from "@/lib/i18n";

/** Cycled across the terms. The outlined ones carry their colour in the stroke
 *  rather than the fill, and the stroke is 0.045em because contrast is only
 *  graded from a stroke once it is at least 0.03em wide — under that, what is
 *  being measured, and read, is a transparent fill. */
const TREATMENTS = [
  "text-cream",
  "text-transparent [-webkit-text-stroke:0.045em_var(--ember-dim)]",
  "text-rust",
  "text-transparent [-webkit-text-stroke:0.045em_var(--cream)]",
  "text-ember glow-ember",
] as const;

function treatmentFor(index: number): string {
  return TREATMENTS[index % TREATMENTS.length] ?? "text-cream";
}

/* text-title rather than text-display: at display size a single term is wider
   than the viewport, and a strip you can only ever read one word of is a
   headline on rails, not a marquee. */
const TERM =
  "font-display text-title font-extrabold whitespace-nowrap uppercase motion-reduce:hyphens-auto motion-reduce:text-center motion-reduce:whitespace-normal motion-reduce:break-words";

/** One pass of the terms. The strip renders two of these back to back: the
 *  track translates exactly -50%, so the second pass is what the first one
 *  becomes and the seam never arrives. */
function Run({ terms, duplicate }: { terms: readonly string[]; duplicate: boolean }) {
  return (
    <ul
      // Explicit, because the reset strips the bullets and Safari drops list
      // semantics along with them.
      role={duplicate ? undefined : "list"}
      aria-hidden={duplicate ? true : undefined}
      className={
        duplicate
          ? "flex shrink-0 items-center motion-reduce:hidden"
          : "flex shrink-0 items-center motion-reduce:mx-auto motion-reduce:w-full motion-reduce:max-w-[92rem] motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-4"
      }
    >
      {/* Scrolling, nothing may shrink or the two passes stop matching and the
          loop develops a seam. At rest the row wraps instead, so a term wider
          than a phone has to be allowed to give. */}
      {terms.map((term, index) => (
        <li
          key={`${index}-${term}`}
          className="flex shrink-0 items-center motion-reduce:min-w-0 motion-reduce:shrink"
        >
          <span className={`${TERM} ${treatmentFor(index)}`}>{term}</span>
          <span
            aria-hidden="true"
            className={`pulse mx-5 size-2.5 shrink-0 rotate-45 bg-ember md:mx-9 md:size-4 ${
              // At rest the terms wrap instead of scrolling, and a trailing
              // glyph on the last one reads as a dangling comma.
              index === terms.length - 1 ? "motion-reduce:hidden" : ""
            }`}
            style={{ animationDelay: `${(index % 5) * 300}ms` }}
          />
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  const { t } = useLocale();
  const terms = t.marquee;

  if (terms.length === 0) return null;

  return (
    <div className="group hairline-t hairline-b relative isolate overflow-hidden bg-void-deep py-7 md:py-9 motion-reduce:px-gutter motion-reduce:py-12">
      {/* !important is load-bearing, not laziness: `.marquee-track` sets the
          `animation` shorthand from outside any cascade layer, and an unlayered
          declaration outranks anything in `utilities` no matter how specific.
          An important longhand is the only thing that reaches it. */}
      <div className="marquee-track flex w-max group-hover:[animation-play-state:paused]! motion-reduce:w-full">
        <Run terms={terms} duplicate={false} />
        <Run terms={terms} duplicate />
      </div>

      {/* The strip runs to both edges, so without these a term is guillotined
          mid-letter at the viewport boundary. Dropped at rest, where nothing
          moves and nothing is clipped. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-void-deep to-transparent md:w-40 motion-reduce:hidden"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-void-deep to-transparent md:w-40 motion-reduce:hidden"
      />
    </div>
  );
}
