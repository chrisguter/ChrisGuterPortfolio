import type { CSSProperties } from "react";
import Band from "@/components/primitives/Band";
import { useLocale } from "@/lib/i18n";

/* Scoped to `halo-tl-*` and kept out of the global sheet because none of it is
   reusable — it is the geometry of one rail. Four things here are load-bearing.

   1. The fill declares its FINISHED state (no transform) in the base rule and
      only opts into the scroll-driven animation behind @supports, so a browser
      without scroll-driven animations renders a complete rail rather than an
      empty one.

   2. The named `view-timeline` lives on the track, not on the fill, because the
      fill is the element being scaled and a transformed subject would be
      measuring itself. A named timeline is referenceable by the declaring
      element and its descendants, which is exactly the relationship here.

   3. The bottom fade is a mask on the TRACK, not a transparent stop in the
      fill's own gradient: the fill is scaleY'd, so any gradient painted on it
      compresses with it and its leading edge would fade out mid-scroll. Masking
      the parent keeps the head bright at every scroll position and still lets
      the rail dissolve at the foot of the section.

   4. Status differs in SHAPE as well as colour — a filled square for completed,
      an open ring for ongoing — and the text label beside it carries the actual
      meaning. Colour is the third cue, never the only one. */
const RAIL_CSS = `
.halo-tl {
  --rail-x: 0.4375rem;
  --pad: 2.25rem;
  --node-y: 0.58rem;
  position: relative;
  isolation: isolate;
}

.halo-tl-rail {
  position: absolute;
  top: var(--node-y);
  bottom: 0;
  left: calc(var(--rail-x) - 1px);
  width: 2px;
  z-index: 0;
  background: linear-gradient(
    to bottom,
    color-mix(in oklch, var(--ember) 30%, transparent) 0%,
    color-mix(in oklch, var(--violet) 34%, transparent) 48%,
    color-mix(in oklch, var(--violet) 10%, transparent) 100%
  );
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 70%, transparent 100%);
  mask-image: linear-gradient(to bottom, #000 0%, #000 70%, transparent 100%);
}

.halo-tl-fill {
  position: absolute;
  inset: 0;
  transform-origin: top center;
  background: linear-gradient(
    to bottom,
    var(--ember) 0%,
    color-mix(in oklch, var(--ember) 45%, var(--violet)) 38%,
    var(--violet) 100%
  );
  box-shadow:
    0 0 12px 1px color-mix(in oklch, var(--ember) 50%, transparent),
    0 0 36px 5px color-mix(in oklch, var(--violet) 45%, transparent);
}

@keyframes halo-tl-fill {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}

@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .halo-tl-rail {
      view-timeline: --halo-rail block;
    }

    .halo-tl-fill {
      animation-name: halo-tl-fill;
      animation-timing-function: linear;
      animation-fill-mode: both;
      animation-timeline: --halo-rail;
      /* Percentage-only fallback first: correct, but the fill head tracks the
         viewport foot. The length form below pins the head 58% down the screen
         at every scroll position, so the rail is visibly drawing itself. */
      animation-range: entry 0% entry 100%;
      animation-range: entry 42vh entry calc(100% + 42vh);
    }
  }
}

.halo-tl-list {
  position: relative;
  z-index: 1;
}

.halo-tl-item {
  position: relative;
  padding-left: var(--pad);
  padding-bottom: 3.25rem;
}
.halo-tl-item:last-child { padding-bottom: 0; }

.halo-tl-node {
  position: absolute;
  left: var(--rail-x);
  top: var(--node-y);
  width: 0.6875rem;
  height: 0.6875rem;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: var(--haze);
  box-shadow:
    0 0 0 5px var(--void),
    0 0 14px 2px color-mix(in oklch, var(--haze) 40%, transparent);
}
.halo-tl-node[data-status="active"] {
  background: var(--ember);
  box-shadow:
    0 0 0 5px var(--void),
    0 0 16px 3px color-mix(in oklch, var(--ember) 80%, transparent),
    0 0 44px 9px color-mix(in oklch, var(--ember) 32%, transparent);
}

.halo-tl-halo {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 2.25rem;
  height: 2.25rem;
  margin: -1.125rem 0 0 -1.125rem;
  border-radius: 50%;
  border: 1px solid color-mix(in oklch, var(--ember) 50%, transparent);
}

.halo-tl-tick {
  display: none;
  position: absolute;
  top: var(--node-y);
  left: calc(var(--rail-x) + 0.6rem);
  height: 1px;
  width: calc(var(--pad) + var(--offset, 0rem) - var(--rail-x) - 1.2rem);
  background: var(--hairline-strong);
}

.halo-tl-title {
  font-size: clamp(1.5rem, 1.05rem + 1.55vw, 2.5rem);
  line-height: 1.04;
  letter-spacing: -0.02em;
  overflow-wrap: break-word;
  hyphens: auto;
}

.halo-tl-status[data-status="active"] { color: var(--ember); }
.halo-tl-status[data-status="shipped"] { color: var(--haze); }

.halo-tl-glyph {
  box-sizing: border-box;
  flex: none;
  width: 0.5rem;
  height: 0.5rem;
}
.halo-tl-glyph[data-status="shipped"] { background: currentColor; }
.halo-tl-glyph[data-status="active"] {
  border: 1.5px solid currentColor;
  border-radius: 50%;
}

@media (min-width: 48rem) {
  .halo-tl { --pad: 3.5rem; }
  .halo-tl-item { padding-bottom: 4.5rem; }
  .halo-tl-tick { display: block; }
}

@media (min-width: 64rem) {
  .halo-tl { --pad: 4.5rem; }
  .halo-tl-item { padding-bottom: 5.5rem; }
  /* Rhythm only: the rail stays one line and the order stays strictly
     vertical — it is the card that steps sideways, not the entry. */
  .halo-tl-item:nth-child(even) { --offset: 3.5rem; }
  .halo-tl-card {
    display: grid;
    grid-template-columns: 11rem minmax(0, 1fr);
    gap: 0 2.5rem;
    margin-left: var(--offset, 0rem);
  }
}
`;

export default function Timeline() {
  const { t } = useLocale();
  const { label, heading, status, entries } = t.timeline;

  return (
    <Band id="timeline" index="03" label={label} heading={heading}>
      <style>{RAIL_CSS}</style>

      <div className="halo-tl mt-14">
        <div className="halo-tl-rail" aria-hidden="true">
          <span className="halo-tl-fill" />
        </div>

        {/* Preflight strips the markers, which costs Safari/VoiceOver the list
            semantics; the explicit role puts them back. */}
        <ol className="halo-tl-list" role="list" data-stagger>
          {entries.map((entry, index) => {
            const headingId = `timeline-${entry.id}`;
            const isActive = entry.status === "active";

            return (
              <li
                key={entry.id}
                className="halo-tl-item"
                style={{ "--i": index } as CSSProperties}
              >
                <span
                  className="halo-tl-node"
                  data-status={entry.status}
                  aria-hidden="true"
                >
                  {isActive ? <span className="halo-tl-halo pulse" /> : null}
                </span>

                <span className="halo-tl-tick" data-rule aria-hidden="true" />

                <article className="halo-tl-card" aria-labelledby={headingId}>
                  <div className="mb-4 lg:mb-0">
                    {/* Dates are locale display strings ("Okt. 2025", "Heute"),
                        so there is no honest machine-readable value for <time>;
                        data-numeric buys the tabular figures without lying. */}
                    <p className="meta">
                      <span data-numeric>{entry.start}</span> —{" "}
                      <span data-numeric>{entry.end}</span>
                    </p>

                    <p
                      className="meta mt-2 flex items-center gap-2 halo-tl-status"
                      data-status={entry.status}
                    >
                      <span
                        className="halo-tl-glyph"
                        data-status={entry.status}
                        aria-hidden="true"
                      />
                      {status[entry.status]}
                    </p>
                  </div>

                  <div>
                    <h3
                      id={headingId}
                      className="halo-tl-title font-display text-cream"
                    >
                      {entry.title}
                    </h3>

                    {entry.org ? (
                      <p className="mt-2 font-mono text-small text-ember">
                        {entry.org}
                      </p>
                    ) : null}

                    <p className="text-body text-haze measure mt-5">{entry.body}</p>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </Band>
  );
}
