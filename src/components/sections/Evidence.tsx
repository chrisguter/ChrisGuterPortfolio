import { useEffect, useLayoutEffect, useMemo, useRef, type CSSProperties } from "react";
import Band from "@/components/primitives/Band";
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

/** The lead figure and the two beside it fill the first row of the ten-column
 *  grid (4 + 3 + 3). The figure after them opens the second row, and is the one
 *  that gets indented, which is what keeps the block from reading as a table. */
const FIRST_ROW = 3;

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
 *  always a visible glyph; the magenta is decoration on top of that, never the
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

  /* Content order is editorial priority: the first published figure is the
     strongest claim, so it is the one set at mega. Hierarchy is carried by
     scale and position — the colour shift only reinforces it. */
  const isLead = index === 0;

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
    <li
      className={[
        isLead ? "sm:col-span-2 lg:col-span-4" : "lg:col-span-3",
        index === FIRST_ROW ? "lg:col-start-2" : "",
      ].join(" ")}
      style={{ "--i": index } as CSSProperties}
    >
      <p
        className={`font-display glow-ember ${
          isLead ? "text-mega text-ember" : "text-display text-cream"
        }`}
      >
        <span className="sr-only">{spoken}</span>
        <span aria-hidden="true" data-numeric>
          {prefix ? <Affix>{prefix}</Affix> : null}
          <span ref={numberRef}>{format(value)}</span>
          {suffix ? <Affix>{suffix}</Affix> : null}
        </span>
      </p>

      <span className="mt-7 block h-px w-16 bg-ember" data-rule aria-hidden="true" />

      <p className="measure-tight mt-6 font-mono text-small text-haze">{label}</p>
      {note ? <p className="meta mt-2">{note}</p> : null}
    </li>
  );
}

export default function Evidence() {
  const { locale, t } = useLocale();

  const figures = t.evidence.figures.filter(isPublished);
  if (figures.length < MIN_FIGURES) return null;

  return (
    <Band id="evidence" label={t.evidence.label} className="isolate">
      {/* The aurora sits on its own layer rather than on the section, so its
          strength can be dialled back to where haze-on-field still clears AA.
          `isolate` on the section is what keeps a negative z-index from falling
          behind the opaque body background. */}
      <div
        className="aurora pointer-events-none absolute inset-0 -z-10 opacity-50"
        aria-hidden="true"
      />

      <ul
        className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-10 lg:items-baseline lg:gap-y-20"
        data-stagger
      >
        {figures.map((figure, index) => (
          <FigureItem key={figure.id} figure={figure} index={index} locale={locale} />
        ))}
      </ul>
    </Band>
  );
}
