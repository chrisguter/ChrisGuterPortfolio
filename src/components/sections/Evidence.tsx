import { useEffect, useLayoutEffect, useMemo, useRef, type CSSProperties } from "react";
import Band from "@/components/primitives/Band";
import { sectionIndex } from "@/lib/sections";
import { useLocale } from "@/lib/i18n";
import type { Figure, Locale } from "@/content/types";

/** A figure cleared for publication. `value: null` means the number is not
 *  defensible yet, and an undefended number is worse than no band at all. */
type PublishedFigure = Figure & { readonly value: number };

function isPublished(figure: Figure): figure is PublishedFigure {
  return figure.value !== null;
}

/** Below this the band is not evidence, it is decoration — so it hides. */
const MIN_FIGURES = 3;

/** One row, every figure weighted the same. The count is driven by content
 *  rather than fixed at four, because the locales do not publish the same
 *  figures — de has one the English copy does not — and a hardcoded four would
 *  leave the German page with a single orphan on a second row. Literal class
 *  strings so Tailwind's scanner can see them. */
const ROW_COLUMNS: Record<number, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

const ROLL_MS = 900;
const ROLL_STEP_MS = 70;

/** useLayoutEffect is what keeps the roll from flashing its final value for a
 *  frame before it starts, but it has no meaning during prerender — and React
 *  warns if it is called there. */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function fractionDigitsOf(value: number): number {
  const decimals = String(value).split(".")[1];
  return decimals ? Math.min(decimals.length, 2) : 0;
}

/** Rolls the rendered text from zero to `target` once the node is on screen.
 *  The value in the markup is always the real one, so prerendered HTML and
 *  visitors without JavaScript read correctly; the roll only ever overwrites
 *  the text after mount. */
function useCountUp(target: number, delay: number, format: (value: number) => string) {
  const ref = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    node.textContent = format(0);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        observer.disconnect();

        const started = performance.now();
        const step = (now: number) => {
          const elapsed = now - started - delay;
          const progress = Math.min(Math.max(elapsed / ROLL_MS, 0), 1);
          node.textContent = format(target * (1 - Math.pow(1 - progress, 3)));
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, delay, format]);

  return ref;
}

/** A prefix or suffix — "+", "%". It changes what the number claims, so it is
 *  always a visible glyph; the rust is decoration on top of that, never the
 *  thing carrying the meaning. */
function Affix({ children }: { children: string }) {
  return <span className="text-rust glow-rust">{children}</span>;
}

function FigureItem({
  figure,
  index,
  locale,
}: {
  figure: PublishedFigure;
  index: number;
  locale: Locale;
}) {
  const { value, prefix, suffix, label, note } = figure;

  const fractionDigits = fractionDigitsOf(value);
  const format = useMemo(() => {
    const formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });
    return (n: number) => formatter.format(n);
  }, [locale, fractionDigits]);

  const numberRef = useCountUp(value, index * ROLL_STEP_MS, format);
  const spoken = `${prefix ?? ""}${format(value)}${suffix ?? ""}`;

  return (
    <li style={{ "--i": index } as CSSProperties}>
      <p className="font-display glow-ember text-display text-cream">
        <span className="sr-only">{spoken}</span>
        <span aria-hidden="true" data-numeric>
          {prefix ? <Affix>{prefix}</Affix> : null}
          <span ref={numberRef}>{format(value)}</span>
          {suffix ? <Affix>{suffix}</Affix> : null}
        </span>
      </p>

      <span className="mt-7 block h-px w-16 bg-ember" data-rule aria-hidden="true" />

      {/* At the narrowest desktop the columns are ~200px and mono is wide, so
          German compounds ("Softwareentwicklung", 19 characters) are the thing
          that decides the type size here. Hyphenation resolves them the way a
          German reader expects; the limit keeps it off words short enough to
          wrap cleanly on their own, so the English labels are untouched.
          break-words is only the floor if a browser has no dictionary. */}
      <p className="measure-tight mt-6 font-mono text-small text-haze hyphens-auto break-words [hyphenate-limit-chars:12_6_4]">
        {label}
      </p>
      {note ? <p className="meta mt-2">{note}</p> : null}
    </li>
  );
}

export default function Evidence() {
  const { locale, t } = useLocale();

  const figures = t.evidence.figures.filter(isPublished);
  if (figures.length < MIN_FIGURES) return null;

  const columns = ROW_COLUMNS[figures.length] ?? "lg:grid-cols-4";

  return (
    <Band
      id="evidence"
      index={sectionIndex("evidence")}
      label={t.evidence.label}
      srHeading={t.evidence.label}
      className="isolate"
    >
      {/* The aurora sits on its own layer rather than on the section, so its
          strength can be dialled back to where haze-on-field still clears AA.
          `isolate` on the section is what keeps a negative z-index from falling
          behind the opaque body background. */}
      <div
        className="aurora pointer-events-none absolute inset-0 -z-10 opacity-50"
        aria-hidden="true"
      />

      <ul
        className={`grid gap-x-8 gap-y-16 sm:grid-cols-2 xl:gap-x-12 ${columns}`}
        data-stagger
      >
        {figures.map((figure, index) => (
          <FigureItem key={figure.id} figure={figure} index={index} locale={locale} />
        ))}
      </ul>
    </Band>
  );
}
