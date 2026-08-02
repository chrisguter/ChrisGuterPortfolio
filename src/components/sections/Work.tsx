import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { flushSync } from "react-dom";
import Band from "@/components/primitives/Band";
import { useLocale } from "@/lib/i18n";
import type { Project } from "@/content/types";
import dropigonGameplay from "@/assets/work/dropigon/gameplay.png";
import dropigonHome from "@/assets/work/dropigon/homescreen.png";
import dropigonLeaderboard from "@/assets/work/dropigon/leaderboard.png";

interface Shot {
  readonly key: string;
  readonly src: string;
  /** The one screen that carries the set's description. The other two show the
   *  same game and would be read out as near-duplicates. */
  readonly lead?: boolean;
  readonly className: string;
  /** Visual only, so the overlapped and turned screens still occupy three plain
   *  columns and the set's width stays a sum the container can bound. */
  readonly transform?: string;
}

/** `Project.media.src` is a key, not a path: content files stay plain data with
 *  no build-tool imports in them, and the bundling happens here. A key with no
 *  entry falls through to the typographic plate rather than breaking. */
const SHOT_SETS: Record<string, readonly Shot[]> = {
  dropigon: [
    {
      key: "home",
      src: dropigonHome,
      className: "z-10 -me-[7%]",
      transform: "translateY(4%) rotate(-8deg) scale(0.94)",
    },
    { key: "gameplay", src: dropigonGameplay, lead: true, className: "z-20" },
    {
      key: "leaderboard",
      src: dropigonLeaderboard,
      className: "z-10 -ms-[7%]",
      transform: "translateY(4%) rotate(8deg) scale(0.94)",
    },
  ],
};

/** One identity colour per project, cycled, so a project is the same colour
 *  everywhere it appears: its number, its wash, its plate, its panel edge.
 *
 *  `field` and `ink` differ because raw violet (3.3:1) and raw azure (4.0:1) do
 *  not clear AA as text on the void — they are fine as light, not as letters. So
 *  the ink for those two is the same hue lifted toward cream, which puts every
 *  coloured character on this section above 5:1 even sitting on its own wash.
 *  Mint and rust already clear it and are used unaltered. */
const TONES = [
  { field: "var(--ember)", ink: "var(--ember)" },
  { field: "var(--rust)", ink: "var(--rust)" },
  {
    field: "var(--violet)",
    ink: "color-mix(in oklch, var(--violet) 58%, var(--cream))",
  },
  {
    field: "var(--azure)",
    ink: "color-mix(in oklch, var(--azure) 58%, var(--cream))",
  },
] as const;

/** `.meta` fixes its own colour at the same specificity as a colour utility and
 *  is declared later in the sheet, so elements that change ink compose the look
 *  from utilities rather than fighting it. */
const META = "font-mono text-meta uppercase";

const NAME_SIZE = "text-[clamp(2rem,5vw,4rem)]";
const NUMBER_SIZE = "text-[clamp(1.5rem,2.6vw,2.25rem)]";

/** The row bleeds past the text column into the shell gutter. The gutter is
 *  `clamp(1.25rem, 0.5rem + 3.5vw, 4.5rem)`, which is wider than the bleed at
 *  every viewport, so nothing ever reaches the edge of the page. */
const BLEED = "-mx-4 sm:-mx-6 lg:-mx-8";
const INSET = "px-4 sm:px-6 lg:px-8";

/* A pool of light at the leading edge rather than a band across the row: a flat
   band at any usable opacity reads as a grey slab over a ground this dark. 16%
   is the ceiling that keeps haze body copy above 4.5:1 on every one of the four
   fields. */
const WASH: CSSProperties = {
  backgroundImage: [
    "linear-gradient(90deg, var(--pc) 0 2px, transparent 2px)",
    "radial-gradient(46% 130% at 0% 50%, color-mix(in oklch, var(--pc) 16%, transparent) 0%, transparent 100%)",
  ].join(", "),
};

/* Topmost layer first: the scrim darkens the lower half so the name stays at
   full contrast no matter where the colour lands. The upper field is capped at
   36% because the client sits in it in cream at label size, and ember — the
   lightest of the four — crosses 4.5:1 shortly after that. */
const PLATE: CSSProperties = {
  backgroundImage: [
    "linear-gradient(to top, color-mix(in oklch, var(--void-deep) 88%, transparent) 0%, transparent 58%)",
    "radial-gradient(72% 68% at 80% 8%, color-mix(in oklch, var(--pc) 36%, transparent) 0%, transparent 70%)",
    "radial-gradient(50% 46% at 12% 92%, color-mix(in oklch, var(--pc) 22%, transparent) 0%, transparent 72%)",
    "linear-gradient(152deg, var(--surface) 0%, var(--void-deep) 100%)",
  ].join(", "),
  boxShadow: "0 0 90px -40px color-mix(in oklch, var(--pc) 90%, transparent)",
};

/* The screenshots are near-black themselves, so they need both a cast shadow to
   lift them off a near-black page and the project's own colour behind them to
   belong to the row. Colour-only shadows, so neither costs a layout pass. */
const SHOT_SHADOW: CSSProperties = {
  boxShadow: [
    "0 30px 60px -30px rgb(0 0 0 / 0.9)",
    "0 0 70px -30px color-mix(in oklch, var(--pc) 85%, transparent)",
  ].join(", "),
};

const SET_GLOW: CSSProperties = {
  backgroundImage:
    "radial-gradient(52% 44% at 50% 58%, color-mix(in oklch, var(--pc) 26%, transparent) 0%, transparent 72%)",
};

/** The opening case study is the one place on the page that cannot be animated
 *  on a scroll timeline: it appears mid-scroll, already inside the viewport, so
 *  a `view()` range would resolve to whatever progress the row happens to be at
 *  and could hold the content at part opacity. Time-based, and only outside
 *  `prefers-reduced-motion`, where the un-animated rendering is the finished
 *  state. */
const REVEAL_CSS = `
@keyframes hl-work-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: no-preference) {
  .hl-work-reveal > * {
    animation: hl-work-in 640ms var(--ease-out) both;
  }
  .hl-work-reveal > *:nth-child(2) { animation-delay: 120ms; }
  .hl-work-reveal > *:nth-child(3) { animation-delay: 200ms; }
}
`;

/** Runs the state change inside a view transition where the browser has one, so
 *  the row titles animate to their new positions rather than jumping. `flushSync`
 *  is what makes React commit before the browser takes its "after" snapshot, and
 *  `.call` is needed because the method is bound to the document. */
function withViewTransition(update: () => void): void {
  const doc: Partial<Pick<Document, "startViewTransition">> | undefined =
    typeof document === "undefined" ? undefined : document;
  const start = doc?.startViewTransition;
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!start || reduced) {
    update();
    return;
  }

  start.call(document, () => flushSync(update));
}

export default function Work() {
  const { t } = useLocale();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Band id="work" label={t.work.label} heading={t.work.heading} intro={t.work.intro}>
      <style>{REVEAL_CSS}</style>

      <ol className={`hairline-t ${BLEED}`} data-stagger>
        {t.work.projects.map((project, index) => (
          <WorkRow
            key={project.id}
            project={project}
            index={index}
            open={openId === project.id}
            onToggle={() =>
              withViewTransition(() =>
                setOpenId((current) => (current === project.id ? null : project.id)),
              )
            }
          />
        ))}
      </ol>
    </Band>
  );
}

function WorkRow({
  project,
  index,
  open,
  onToggle,
}: {
  project: Project;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const { t } = useLocale();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const study = project.study;
  const number = String(index + 1).padStart(2, "0");
  const tone = TONES[index % TONES.length] ?? TONES[0];
  const titleId = `work-${project.id}-title`;
  const actionId = `work-${project.id}-action`;
  const panelId = `work-${project.id}-panel`;

  const facts = [
    { key: "client", value: project.client, numeric: false },
    { key: "role", value: project.role, numeric: false },
    { key: "year", value: project.year, numeric: true },
  ] as const;

  function handleKeyDown(event: KeyboardEvent<HTMLLIElement>) {
    if (event.key !== "Escape" || !open) return;
    onToggle();
    triggerRef.current?.focus();
  }

  return (
    <li
      className="hairline-b"
      onKeyDown={study ? handleKeyDown : undefined}
      style={
        {
          "--i": index,
          "--pc": tone.field,
          "--pc-ink": tone.ink,
          /* The stagger runs on a `view()` timeline, and an open case study is
             routinely taller than the viewport — a subject that tall reaches
             the end of its entry range only after the row itself has scrolled
             off the top. Dropping the animation on an opened row renders it at
             the keyframes' finished state, which is the plain layout. */
          animationName: open ? "none" : undefined,
        } as CSSProperties
      }
    >
      <div className={`relative isolate ${study ? "group" : ""}`}>
        {study ? (
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 -z-10 origin-left transition-[transform,opacity] duration-500 ease-out ${
              open
                ? "scale-x-100 opacity-100"
                : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 group-focus-within:scale-x-100 group-focus-within:opacity-100"
            }`}
            style={WASH}
          />
        ) : null}

        <div
          className={`relative ${INSET} py-10 transition-transform duration-500 ease-out lg:py-16 ${
            study ? "group-hover:-translate-y-1 group-focus-within:-translate-y-1" : ""
          }`}
        >
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-5 gap-y-7 sm:gap-x-8 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-x-14">
            <span
              aria-hidden="true"
              className={`${NUMBER_SIZE} font-display font-bold leading-none text-[color:var(--pc-ink)]`}
              data-numeric
            >
              {number}
            </span>

            <div>
              {/* The rule runs the name out to the action, so a short title
                  still occupies the full band instead of stranding it. */}
              <div className="flex items-center gap-8">
                <h3
                  id={titleId}
                  className={`${NAME_SIZE} font-display leading-[0.95] transition-colors duration-300 ${
                    open
                      ? "text-[color:var(--pc-ink)]"
                      : "text-cream group-hover:text-[color:var(--pc-ink)] group-focus-within:text-[color:var(--pc-ink)]"
                  }`}
                  style={{ viewTransitionName: `work-${project.id}` }}
                >
                  {project.name}
                </h3>

                <span
                  aria-hidden="true"
                  className={`hidden h-px flex-1 transition-colors duration-300 lg:block ${
                    open
                      ? "bg-[var(--pc)]"
                      : "bg-hairline group-hover:bg-[var(--pc)] group-focus-within:bg-[var(--pc)]"
                  }`}
                />
              </div>

              <dl className="mt-6 flex flex-wrap items-baseline gap-x-8 gap-y-2">
                {facts.map((fact) =>
                  fact.value ? (
                    <div key={fact.key} className="flex items-baseline gap-2.5">
                      <dt className="meta">{t.work.headers[fact.key]}</dt>
                      <dd
                        className={`${META} text-cream`}
                        data-numeric={fact.numeric || undefined}
                      >
                        {fact.value}
                      </dd>
                    </div>
                  ) : null,
                )}
              </dl>

              <p className="measure mt-5 text-body text-haze">{project.summary}</p>
            </div>

            {study ? (
              <div className="col-start-2 flex items-center gap-4 lg:col-start-3 lg:row-start-1 lg:pt-2">
                <span id={actionId} className={`${META} whitespace-nowrap text-cream`}>
                  {open ? t.work.close : t.work.readMore}
                </span>
                <span
                  aria-hidden="true"
                  className={`flex size-11 flex-none items-center justify-center border text-lead leading-none text-cream transition-colors duration-300 ${
                    open
                      ? "border-[color:var(--pc)]"
                      : "border-hairline-strong group-hover:border-[color:var(--pc)] group-focus-within:border-[color:var(--pc)]"
                  }`}
                >
                  {open ? "−" : "+"}
                </span>
              </div>
            ) : null}
          </div>

          {/* The trigger covers the whole row so the hit target matches what
              reads as one unit, while the row itself keeps heading and
              paragraph semantics that are not valid inside a button. */}
          {study ? (
            <button
              ref={triggerRef}
              type="button"
              className="absolute inset-0 cursor-pointer"
              aria-expanded={open}
              aria-controls={panelId}
              aria-labelledby={`${titleId} ${actionId}`}
              onClick={onToggle}
            />
          ) : null}
        </div>
      </div>

      {study ? (
        /* No display utility on this element: `hidden` is what closes the panel,
           and any `grid`/`flex` class here would out-rank it. */
        <div
          id={panelId}
          role="region"
          aria-labelledby={titleId}
          hidden={!open}
          className={`hl-work-reveal ${INSET} border-s-2 pb-14`}
          style={{ borderInlineStartColor: "var(--pc)" }}
        >
          <div className="grid gap-10 pb-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
            <Plate project={project} number={number} open={open} />

            <dl className="grid gap-9">
              {(
                [
                  { key: "constraint", body: study.constraint },
                  { key: "decision", body: study.decision },
                  { key: "outcome", body: study.outcome },
                ] as const
              ).map((block) => (
                <div key={block.key}>
                  <dt className="mb-3 flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="block h-0.5 w-8 flex-none bg-[var(--pc)]"
                    />
                    <span className={`${META} text-cream`}>
                      {t.work.headers[block.key]}
                    </span>
                  </dt>
                  <dd className="measure text-body text-haze">{block.body}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hairline-t flex flex-col gap-8 pt-8 sm:flex-row sm:items-start sm:justify-between sm:gap-12">
            <div>
              <h4 className={`${META} mb-4 text-cream`}>{t.work.headers.stack}</h4>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <li
                    key={item}
                    className={`${META} border border-hairline-strong bg-surface px-3 py-2 text-cream`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* A project can ship to more than one store, so this is a row of
                equal controls rather than a single call to action. `justify-end`
                keeps a wrapped second control aligned to the block it sits in
                once the parent has pushed the list to the right. */}
            {project.links && project.links.length > 0 ? (
              <ul className="flex flex-wrap gap-3 sm:justify-end">
                {project.links.map((link) => {
                  const external = /^https?:/i.test(link.href);
                  return (
                    <li key={`${link.label}-${link.href}`}>
                      <a
                        className={`${META} inline-flex items-center gap-2 border border-ember px-5 py-3 text-ember transition-colors duration-200 hover:bg-ember hover:text-void`}
                        href={link.href}
                        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                      >
                        {link.label}
                        {external ? <span aria-hidden="true">↗</span> : null}
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </div>
      ) : null}
    </li>
  );
}

/** Real screenshots where the project has them, and the typographic plate where
 *  it does not — five of the six projects still rely on the plate, where it is
 *  the artwork rather than a placeholder for one. The plate restates the row's
 *  own text, so it is hidden from assistive technology instead of read twice. */
function Plate({
  project,
  number,
  open,
}: {
  project: Project;
  number: string;
  open: boolean;
}) {
  const media = project.media;
  const shots = media ? SHOT_SETS[media.src] : undefined;

  if (media && shots) {
    /* Mounted only while the study is open. These are 1080x2400 sources, and
       three of them have no business sitting in the collapsed index — not in
       the layout, and not as requests. */
    return open ? <Screens shots={shots} alt={media.alt} /> : null;
  }

  return (
    <div
      aria-hidden="true"
      className="aspect-4/3 flex w-full flex-col justify-between overflow-hidden border border-[color:var(--pc)] p-7 sm:p-9"
      style={PLATE}
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className={`${META} text-cream`} data-numeric>
          {number}
        </span>
        <span className={`${META} text-cream`}>{project.client}</span>
      </div>

      <div>
        <span className="mb-5 block h-1 w-12 bg-[var(--pc)]" />
        <p className="text-title font-display leading-[0.95] font-bold text-cream">
          {project.name}
        </p>
      </div>
    </div>
  );
}

/** Three phone screens, overlapped and turned, rather than one flat screenshot.
 *  This is the only genuine product imagery on the site, and a single 1080x2400
 *  frame either towers over the panel or shrinks to a strip.
 *
 *  Every dimension derives from the container's width: each screen is a share of
 *  it, so the tallest the set can ever be is `max-w` x 2400/1080 x 0.36 — about
 *  22rem — and it scales down with the column with no media queries. The
 *  intrinsic width and height on each image hold that ratio before the files
 *  arrive, so opening a study reflows nothing. */
function Screens({ shots, alt }: { shots: readonly Shot[]; alt: string }) {
  return (
    <div className="relative isolate mx-auto flex w-full max-w-[32rem] items-center justify-center">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-8 -inset-y-10 -z-10"
        style={SET_GLOW}
      />

      {shots.map((shot) => (
        <img
          key={shot.key}
          src={shot.src}
          /* One description for the set. The other screens are the same game
             from the same phone and would only be read out as near-duplicates
             of it, so they are decorative. */
          alt={shot.lead ? alt : ""}
          aria-hidden={shot.lead ? undefined : true}
          width={1080}
          height={2400}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={`w-[36%] flex-none border border-hairline-strong ${shot.className}`}
          style={
            shot.transform ? { ...SHOT_SHADOW, transform: shot.transform } : SHOT_SHADOW
          }
        />
      ))}
    </div>
  );
}
