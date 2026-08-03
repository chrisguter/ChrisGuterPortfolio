/// <reference types="vite/client" />
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import Band from "@/components/primitives/Band";
import { withViewTransition } from "@/lib/view-transition";
import Lightbox, { type LightboxImage } from "@/components/primitives/Lightbox";
import { sectionIndex } from "@/lib/sections";
import { useLocale } from "@/lib/i18n";
import type { NowItem, NowStudy } from "@/content/types";
import tumbletreePlate from "@/assets/work/plates/tumbletree-app.svg";
import tradebotPlate from "@/assets/work/plates/tradebot.svg";
import backtestingShot from "@/assets/now/backtesting.webp";
import papertradingShot from "@/assets/now/papertrading.webp";
import stockanalysisShot from "@/assets/now/stockanalysis.webp";

/** Keyed like the Work media: content stays plain data, bundling happens here.
 *  Both plates share the work-plate canvas, so the frame holds its ratio before
 *  the file arrives. */
const PLATES: Record<string, string> = {
  "tumbletree-app": tumbletreePlate,
  tradebot: tradebotPlate,
};

const PLATE_WIDTH = 800;
const PLATE_HEIGHT = 500;

/** Gallery keys resolved the same way. Intrinsic dimensions ride along so the
 *  figures hold their ratio before the files arrive — the panel opens without
 *  a reflow. */
const SHOTS: Record<string, { src: string; width: number; height: number }> = {
  stockanalysis: { src: stockanalysisShot, width: 1150, height: 897 },
  papertrading: { src: papertradingShot, width: 1150, height: 897 },
  backtesting: { src: backtestingShot, width: 1156, height: 930 },
};

/** One accent per card, matching the plates' own dominant colours: ember for
 *  the TumbleTree app, azure for the tradebot. */
const TONES = ["var(--ember)", "var(--azure)"] as const;

const META = "font-mono text-meta uppercase";

/* The same framed-diagram treatment the Work section gives its plates. */
const FRAME: CSSProperties = {
  backgroundImage: [
    "radial-gradient(64% 96% at 84% 4%, color-mix(in oklch, var(--nc) 16%, transparent) 0%, transparent 74%)",
    "linear-gradient(152deg, var(--surface) 0%, var(--void-deep) 100%)",
  ].join(", "),
  borderColor: "color-mix(in oklch, var(--nc) 40%, transparent)",
  boxShadow: [
    "0 26px 60px -34px rgb(0 0 0 / 0.85)",
    "0 0 80px -44px color-mix(in oklch, var(--nc) 80%, transparent)",
  ].join(", "),
};

/** Same reasoning as Work's reveal: the panel appears mid-scroll, already
 *  inside the viewport, so a `view()` range could hold it at part opacity.
 *  Time-based, and only outside `prefers-reduced-motion`, where the
 *  un-animated rendering is the finished state. */
const REVEAL_CSS = `
@keyframes hl-now-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: no-preference) {
  .hl-now-reveal > * {
    animation: hl-now-in 640ms var(--ease-out) both;
  }
  .hl-now-reveal > *:nth-child(2) { animation-delay: 120ms; }
  .hl-now-reveal > *:nth-child(3) { animation-delay: 200ms; }
}
`;

export default function Now() {
  const { t } = useLocale();
  const { label, heading, intro, items } = t.now;
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Band
      id="now"
      index={sectionIndex("now")}
      label={label}
      heading={heading}
      intro={intro}
    >
      <style>{REVEAL_CSS}</style>

      <ul role="list" className="grid gap-10 md:grid-cols-2 md:gap-8" data-stagger>
        {items.map((item, index) => (
          <NowCard
            key={item.id}
            item={item}
            index={index}
            open={openId === item.id}
            onToggle={() =>
              withViewTransition(() =>
                setOpenId((current) => (current === item.id ? null : item.id)),
              )
            }
          />
        ))}
      </ul>
    </Band>
  );
}

function NowCard({
  item,
  index,
  open,
  onToggle,
}: {
  item: NowItem;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const { t } = useLocale();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const study = item.study;
  const plate = item.media ? PLATES[item.media.src] : undefined;
  const titleId = `now-${item.id}-title`;
  const actionId = `now-${item.id}-action`;
  const panelId = `now-${item.id}-panel`;

  /* Opening the first card spans it to full width, which reflows the grid and
     can carry the card's own header — trigger included — out of the viewport.
     After the layout settles, keep the trigger where the user can see what
     they just pressed. "nearest" makes this a no-op when it is already
     visible, so the second card's open never causes a jump. */
  useEffect(() => {
    if (!open) return;
    triggerRef.current?.scrollIntoView({ block: "nearest" });
  }, [open]);

  function handleKeyDown(event: KeyboardEvent<HTMLLIElement>) {
    if (event.key !== "Escape" || !open) return;
    /* An Escape aimed at the open lightbox: the native dialog is about to
       close itself, and the keydown still bubbles up here through the DOM. One
       press must close one layer, not both. */
    if (event.target instanceof Element && event.target.closest("dialog[open]")) {
      return;
    }
    onToggle();
    triggerRef.current?.focus();
  }

  return (
    <li
      className={`flex flex-col ${open ? "md:col-span-2" : ""}`}
      onKeyDown={study ? handleKeyDown : undefined}
      style={
        {
          "--i": index,
          "--nc": TONES[index % TONES.length] ?? TONES[0],
          /* Same constraint as Work's rows: the stagger runs on a `view()`
             timeline, and an open card is routinely taller than the viewport,
             so it would never reach the end of its entry range. Dropping the
             animation renders the keyframes' finished state. */
          animationName: open ? "none" : undefined,
        } as CSSProperties
      }
    >
      {/* Open on md+, the plate moves beside the text: a card twice as wide
          with an 800px diagram stretched across it would be all artwork. */}
      <div
        className={
          open
            ? "md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-start md:gap-x-10"
            : ""
        }
      >
        {plate && item.media ? (
          <div className="border p-3 sm:p-4" style={FRAME}>
            <img
              src={plate}
              alt={item.media.alt}
              width={PLATE_WIDTH}
              height={PLATE_HEIGHT}
              loading="lazy"
              decoding="async"
              className="w-full"
            />
          </div>
        ) : null}

        <div className={`mt-7 ${open ? "md:mt-0" : ""}`}>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <h3
              id={titleId}
              className="font-display text-[clamp(1.375rem,2.4vw,1.875rem)] leading-tight font-bold text-cream"
              style={{ viewTransitionName: `now-${item.id}` }}
            >
              {item.name}
            </h3>
            {/* Status chip: pulse glyph plus label, never colour alone. */}
            <p className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="pulse size-1.5 shrink-0 rounded-full"
                style={{ background: "var(--nc)" }}
              />
              <span className={`${META} text-haze`}>{item.stage}</span>
            </p>

            {study ? (
              <button
                ref={triggerRef}
                type="button"
                className="group ms-auto flex cursor-pointer items-center gap-4"
                aria-expanded={open}
                aria-controls={panelId}
                aria-labelledby={`${titleId} ${actionId}`}
                onClick={onToggle}
              >
                <span id={actionId} className={`${META} whitespace-nowrap text-cream`}>
                  {open ? t.now.close : t.now.readMore}
                </span>
                <span
                  aria-hidden="true"
                  className={`flex size-11 flex-none items-center justify-center border text-lead leading-none text-cream transition-colors duration-300 ${
                    open
                      ? "border-[color:var(--nc)]"
                      : "border-hairline-strong group-hover:border-[color:var(--nc)] group-focus-visible:border-[color:var(--nc)]"
                  }`}
                >
                  {open ? "−" : "+"}
                </span>
              </button>
            ) : null}
          </div>

          {item.org ? <p className="meta mt-1.5">{item.org}</p> : null}

          <p className="measure mt-4 text-body text-cream">{item.summary}</p>
          <p className="measure mt-3 text-body text-haze">{item.detail}</p>

          <ul role="list" className="mt-6 flex flex-wrap gap-2">
            {item.stack.map((tech) => (
              <li
                key={tech}
                className={`${META} border-hairline-strong border px-3 py-1.5 text-haze`}
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {study ? (
        /* No display utility on this element: `hidden` is what closes the
           panel, and any `grid`/`flex` class here would out-rank it. */
        <div
          id={panelId}
          role="region"
          aria-labelledby={titleId}
          hidden={!open}
          className="hl-now-reveal mt-10 border-s-2 ps-5 sm:ps-8"
          style={{ borderInlineStartColor: "var(--nc)" }}
        >
          <div className="grid max-w-[68rem] gap-9">
            {study.sections.map((section) => (
              <div key={section.heading}>
                <h4 className="mb-3 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="block h-0.5 w-8 flex-none bg-[var(--nc)]"
                  />
                  <span className={`${META} text-cream`}>{section.heading}</span>
                </h4>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="measure mt-3 text-body text-haze">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <Gallery study={study} />
          <Architecture study={study} />
        </div>
      ) : null}
    </li>
  );
}

/** Light-UI dashboard shots on a dark page: each sits on a raised surface with
 *  a hairline border so the white does not glare against the void. Two abreast
 *  on md+ and the rest full column — never three across, which would shrink
 *  dashboard text below reading size. */
function Gallery({ study }: { study: NowStudy }) {
  const { t } = useLocale();
  const [selected, setSelected] = useState<LightboxImage | null>(null);
  /* The opener is captured from the click, not from document.activeElement:
     Safari does not focus a button on mouse click, so at open time the active
     element there is <body> and focus return would silently go nowhere. */
  const openerRef = useRef<HTMLElement | null>(null);

  const shots = (study.gallery ?? []).flatMap((image) => {
    const file = SHOTS[image.src];
    return file ? [{ image, file }] : [];
  });
  if (shots.length === 0) return null;

  return (
    <>
      <ul role="list" className="mt-12 grid max-w-[68rem] gap-6 md:grid-cols-2">
        {shots.map(({ image, file }) => (
          <li key={image.src}>
            <figure>
              {/* The image is its own accessible name: a button's name comes
                  from its content, and the content is the img's alt. */}
              <button
                type="button"
                className="block w-full cursor-zoom-in border border-hairline-strong bg-surface-raised p-2 transition-colors duration-300 hover:border-[color:var(--nc)] focus-visible:border-[color:var(--nc)] sm:p-3"
                onClick={(event) => {
                  openerRef.current = event.currentTarget;
                  setSelected({
                    src: file.src,
                    alt: image.alt,
                    caption: image.caption,
                    width: file.width,
                    height: file.height,
                  });
                }}
              >
                <img
                  src={file.src}
                  alt={image.alt}
                  width={file.width}
                  height={file.height}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />
              </button>
              {image.caption ? (
                <figcaption className="meta mt-3">{image.caption}</figcaption>
              ) : null}
            </figure>
          </li>
        ))}
      </ul>

      <Lightbox
        image={selected}
        opener={openerRef.current}
        closeLabel={t.ui.close}
        onClose={() => setSelected(null)}
      />
    </>
  );
}

/* ---------------------------------------------------------------------------
 * Architecture diagram
 * -------------------------------------------------------------------------*/

/* Scoped like Skills' MAP_CSS: the one thing this block does is switch the
   cluster grid between one column (data order) and the authored 2-column
   placement at `md`, which inline styles cannot do. The custom properties are
   set per group in JSX. */
const ARCH_CSS = `
.hl-arch {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.5rem;
}

@media (min-width: 48rem) {
  .hl-arch {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem 3rem;
    align-items: start;
  }
  .hl-arch-group {
    grid-column: var(--gc);
    grid-row: var(--gr);
  }
}
`;

/** A side midpoint of a node box plus that side's outward normal, in pixels
 *  relative to the diagram container. The normal is what turns a chord into a
 *  curve that leaves the box perpendicular to its border, the way a graph
 *  layout engine would draw it. */
interface Anchor {
  x: number;
  y: number;
  nx: number;
  ny: number;
}

interface EdgeLine {
  key: string;
  d: string;
  /** Curve midpoint (t = 0.5), where the label chip sits. */
  x: number;
  y: number;
  label?: string;
  dashed?: boolean;
}

/* Anchor order matters below: TOP / BOTTOM / LEFT / RIGHT, so a detour can ask
   for "the same side of both boxes" by index. */
const BOTTOM = 1;
const LEFT = 2;
const RIGHT = 3;

function anchorsOf(rect: DOMRect, host: DOMRect): Anchor[] {
  const x = rect.left - host.left;
  const y = rect.top - host.top;
  return [
    { x: x + rect.width / 2, y, nx: 0, ny: -1 },
    { x: x + rect.width / 2, y: y + rect.height, nx: 0, ny: 1 },
    { x, y: y + rect.height / 2, nx: -1, ny: 0 },
    { x: x + rect.width, y: y + rect.height / 2, nx: 1, ny: 0 },
  ];
}

function px(value: number): number {
  return Math.round(value * 10) / 10;
}

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

function boxOf(rect: DOMRect, host: DOMRect, height?: number): Box {
  return {
    x: rect.left - host.left,
    y: rect.top - host.top,
    w: rect.width,
    h: height ?? rect.height,
  };
}

/** Overlapped area in px², with a 2px comfort margin — 0 means clear. */
function overlap(a: Box, b: Box): number {
  const w = Math.min(a.x + a.w, b.x + b.w + 2) - Math.max(a.x, b.x - 2);
  const h = Math.min(a.y + a.h, b.y + b.h + 2) - Math.max(a.y, b.y - 2);
  return w > 0 && h > 0 ? w * h : 0;
}

interface Point {
  x: number;
  y: number;
}

function cubicAt(t: number, p0: Point, c1: Point, c2: Point, p1: Point): Point {
  const u = 1 - t;
  return {
    x:
      u * u * u * p0.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * p1.x,
    y:
      u * u * u * p0.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * p1.y,
  };
}

/** Unit normal of the curve at t — the direction a label steps aside in when
 *  every spot on the curve itself is taken. */
function cubicNormalAt(t: number, p0: Point, c1: Point, c2: Point, p1: Point): Point {
  const u = 1 - t;
  const dx =
    3 * u * u * (c1.x - p0.x) + 6 * u * t * (c2.x - c1.x) + 3 * t * t * (p1.x - c2.x);
  const dy =
    3 * u * u * (c1.y - p0.y) + 6 * u * t * (c2.y - c1.y) + 3 * t * t * (p1.y - c2.y);
  const length = Math.hypot(dx, dy) || 1;
  return { x: -dy / length, y: dx / length };
}

/** Midpoint first, then symmetric steps outward: the label sits at the middle
 *  of its curve unless something readable is already there. Dense on purpose —
 *  on a phone the free space is a 24px gap between group boxes, and a coarse
 *  walk steps clean over it. */
const LABEL_STOPS = Array.from({ length: 29 }, (_, i) => {
  const step = Math.ceil(i / 2) * 0.03;
  return 0.5 + (i % 2 === 0 ? -step : step);
});

/* useLayoutEffect never runs during prerendering, but React warns when it so
   much as mounts in a server render. The empty-SVG server output is the design
   here, not an accident, so the warning is silenced by aliasing to useEffect
   on the server — where neither runs. */
const useBrowserLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/** The architecture drawn in HTML rather than shipped as an image, because the
 *  labels are content and translate with the locale. Groups are cluster boxes
 *  on an authored 2-column grid — the same role a Mermaid subgraph plays, with
 *  the layout stated rather than solved — and the edges between nodes are an
 *  SVG overlay drawn from measured DOM positions.
 *
 *  Measured, deliberately: one layout pass after paint plus a ResizeObserver,
 *  so the same code holds at any viewport, either column count, and both
 *  locales' label lengths. The server renders the SVG empty — the prerendered
 *  page shows the boxes alone for the instant before hydration — and the
 *  relationships are carried at all times by the visually-hidden connection
 *  list, so the drawing itself can stay aria-hidden. */
function Architecture({ study }: { study: NowStudy }) {
  const { locale } = useLocale();
  const { heading, footnote, groups, edges } = study.architecture;

  /* Colons are legal in a fragment but not worth betting `url(#…)` on. */
  const arrowId = `hl-arch-arrow-${useId().replace(/:/g, "")}`;
  const hostRef = useRef<HTMLDivElement>(null);
  const nodeEls = useRef(new Map<string, HTMLElement>());
  const groupEls = useRef(new Map<string, HTMLElement>());
  const [lines, setLines] = useState<readonly EdgeLine[]>([]);

  const nodeLabels = new Map<string, string>();
  for (const group of groups) {
    for (const node of group.nodes) nodeLabels.set(node.id, node.label);
  }

  useBrowserLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    function measure() {
      if (!host) return;
      const hostRect = host.getBoundingClientRect();
      /* Zero width means the panel is closed (`hidden`): nothing to measure,
         and the observer fires again the moment it opens. */
      if (hostRect.width < 1) return;

      /* Everything a label chip must not cover: every node box, plus each
         group's name — the text alone, estimated from its length, so the rest
         of the heading row stays available as parking space. */
      const avoid: Box[] = [];
      for (const el of nodeEls.current.values()) {
        avoid.push(boxOf(el.getBoundingClientRect(), hostRect));
      }
      for (const group of groups) {
        const el = groupEls.current.get(group.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        avoid.push({
          x: rect.left - hostRect.left + 12,
          y: rect.top - hostRect.top + 10,
          w: group.name.length * 9 + 12,
          h: 32,
        });
      }

      const next: EdgeLine[] = [];
      for (const edge of edges) {
        const fromEl = nodeEls.current.get(edge.from);
        const toEl = nodeEls.current.get(edge.to);
        if (!fromEl || !toEl) continue;

        /* Nearest pair of side midpoints, checked exhaustively — sixteen
           pairs. This is what routes a stacked edge top-to-bottom and a
           cross-column edge side-to-side without a special case for either. */
        const fromAnchors = anchorsOf(fromEl.getBoundingClientRect(), hostRect);
        const toAnchors = anchorsOf(toEl.getBoundingClientRect(), hostRect);
        let start: Anchor | undefined;
        let end: Anchor | undefined;
        let best = Infinity;
        for (const a of fromAnchors) {
          for (const b of toAnchors) {
            const gap = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
            if (gap < best) {
              best = gap;
              start = a;
              end = b;
            }
          }
        }
        if (!start || !end) continue;

        /* A labelled edge between two near-adjacent boxes has no room for its
           label in the sliver between them, so it detours: out of the same
           side of both boxes and around, which parks the label in open space
           beside the pair instead of on top of their text. */
        let reach = Math.min(72, Math.max(20, Math.sqrt(best) * 0.35));
        if (edge.label && Math.sqrt(best) < 56) {
          const side =
            start.nx !== 0
              ? BOTTOM
              : hostRect.width -
                    Math.max(
                      ...fromAnchors.map((a) => a.x),
                      ...toAnchors.map((a) => a.x),
                    ) >=
                  Math.min(...fromAnchors.map((a) => a.x), ...toAnchors.map((a) => a.x))
                ? RIGHT
                : LEFT;
          const detourStart = fromAnchors[side];
          const detourEnd = toAnchors[side];
          if (detourStart && detourEnd) {
            start = detourStart;
            end = detourEnd;
            reach = 26;
          }
        }

        /* Cubic, with each control point pushed out along its side's normal:
           short hops stay gently bowed, long runs do not overshoot. */
        const c1 = { x: start.x + start.nx * reach, y: start.y + start.ny * reach };
        const c2 = { x: end.x + end.nx * reach, y: end.y + end.ny * reach };

        /* The label starts at the curve midpoint and slides along the curve
           to wherever it covers the least — ideally nothing. Crossings are
           inherent in a graph this connected; a label sitting on someone's
           text is not, and an already-placed label counts as someone's text
           (it joins `avoid` below). */
        let at = cubicAt(0.5, start, c1, c2, end);
        if (edge.label) {
          const chipW = edge.label.length * 8 + 14;
          const chipH = 22;
          let leastCovered = Infinity;
          search: for (const t of LABEL_STOPS) {
            const base = cubicAt(t, start, c1, c2, end);
            const normal = cubicNormalAt(t, start, c1, c2, end);
            /* On the curve first; stepping sideways only as far as it takes
               to find open ground. A phone squeezes three labels through one
               24px corridor between group boxes, which is why the ladder goes
               as wide as it does. Candidates are clamped into the container
               BEFORE scoring, so "free" can never mean "hanging off the
               edge". */
            for (const aside of [0, 18, -18, 34, -34, 52, -52, 72, -72, 96, -96]) {
              const candidate = {
                x: Math.min(
                  Math.max(base.x + normal.x * aside, chipW / 2),
                  hostRect.width - chipW / 2,
                ),
                y: Math.min(
                  Math.max(base.y + normal.y * aside, chipH / 2),
                  hostRect.height - chipH / 2,
                ),
              };
              const chip: Box = {
                x: candidate.x - chipW / 2,
                y: candidate.y - chipH / 2,
                w: chipW,
                h: chipH,
              };
              let covered = 0;
              for (const box of avoid) covered += overlap(chip, box);
              if (covered < leastCovered) {
                leastCovered = covered;
                at = candidate;
              }
              if (covered === 0) break search;
            }
          }
          /* Placed chips become obstacles themselves, so two labels whose
             curves cross cannot land on each other. */
          avoid.push({ x: at.x - chipW / 2, y: at.y - chipH / 2, w: chipW, h: chipH });
        }

        next.push({
          key: `${edge.from}--${edge.to}`,
          d: `M ${px(start.x)} ${px(start.y)} C ${px(c1.x)} ${px(c1.y)} ${px(c2.x)} ${px(c2.y)} ${px(end.x)} ${px(end.y)}`,
          x: px(at.x),
          y: px(at.y),
          label: edge.label,
          dashed: edge.dashed,
        });
      }
      setLines(next);
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    /* A late font swap changes node widths without changing the container's,
       which the observer cannot see. */
    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (!cancelled) measure();
    });
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [groups, edges]);

  return (
    <div className="mt-12">
      <style>{ARCH_CSS}</style>

      <h4 className="mb-6 flex items-center gap-3">
        <span aria-hidden="true" className="block h-0.5 w-8 flex-none bg-[var(--nc)]" />
        <span className={`${META} text-cream`}>{heading}</span>
      </h4>

      <div ref={hostRef} className="hl-arch max-w-[68rem]">
        {groups.map((group) => (
          <div
            key={group.id}
            ref={(element) => {
              if (element) groupEls.current.set(group.id, element);
              else groupEls.current.delete(group.id);
            }}
            className="hl-arch-group border border-hairline bg-surface/60 p-4 sm:p-5"
            style={{ "--gc": group.col, "--gr": group.row } as CSSProperties}
          >
            <p className={`${META} text-cream`}>{group.name}</p>
            <ul role="list" className="mt-3.5 flex flex-wrap gap-2.5">
              {group.nodes.map((node) => (
                <li
                  key={node.id}
                  ref={(element) => {
                    if (element) nodeEls.current.set(node.id, element);
                    else nodeEls.current.delete(node.id);
                  }}
                  className="border border-hairline-strong bg-surface-raised px-3 py-2"
                >
                  <p className="text-small leading-snug text-cream">{node.label}</p>
                  {node.note ? <p className="meta mt-1">{node.note}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Decorative by construction: every curve restates a relation the
            visually-hidden list below already carries. Painted after the
            groups so the arrowheads sit over the cluster borders. */}
        <svg
          aria-hidden="true"
          focusable="false"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <defs>
            <marker
              id={arrowId}
              viewBox="0 0 10 10"
              refX="8.5"
              refY="5"
              markerWidth="9"
              markerHeight="9"
              markerUnits="userSpaceOnUse"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--nc)" />
            </marker>
          </defs>
          <g fill="none" stroke="var(--nc)" opacity="0.55">
            {lines.map((line) => (
              <path
                key={line.key}
                d={line.d}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeDasharray={line.dashed ? "5 5" : undefined}
                markerEnd={`url(#${arrowId})`}
              />
            ))}
          </g>
        </svg>

        {lines.map((line) =>
          line.label ? (
            <span
              key={line.key}
              aria-hidden="true"
              className={`${META} pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 bg-surface px-1.5 py-0.5 whitespace-nowrap text-haze`}
              style={{ left: line.x, top: line.y }}
            >
              {line.label}
            </span>
          ) : null,
        )}
      </div>

      {footnote ? <p className="meta measure mt-5">{footnote}</p> : null}

      {/* The drawing is aria-hidden and the group order already tells the
          top-to-bottom story, so this is where the cross links exist as text
          — one entry per edge, node labels rather than ids. */}
      <div className="sr-only">
        <p>{locale === "de" ? "Verbindungen" : "Connections"}</p>
        <ul role="list">
          {edges.map((edge) => (
            <li key={`${edge.from}--${edge.to}`}>
              {`${nodeLabels.get(edge.from) ?? edge.from} → ${
                nodeLabels.get(edge.to) ?? edge.to
              }${edge.label ? ` (${edge.label})` : ""}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
