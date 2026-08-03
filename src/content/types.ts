export const LOCALES = ["en", "de"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** A figure in the evidence band.
 *
 * `value: null` means "not yet cleared for publication". The band renders only
 * the figures that have a value, and hides itself entirely below three — so an
 * unfilled figure is invisible rather than a placeholder shipped to production.
 * Never populate one of these with an estimate: the whole point of the band is
 * that every number on it is defensible. */
export interface Figure {
  readonly id: string;
  readonly value: number | null;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly label: string;
  /** Shown under the figure in mono. Keep it to a few words. */
  readonly note?: string;
}

export interface ProjectLink {
  readonly label: string;
  readonly href: string;
}

export interface Project {
  readonly id: string;
  readonly client: string;
  readonly name: string;
  /** Optional: the index renders the year column only when it is present, so an
   *  unknown date is omitted rather than guessed. */
  readonly year?: string;
  readonly role: string;
  readonly stack: readonly string[];
  /** One line, shown in the collapsed index row. */
  readonly summary: string;
  /** Case-study body. Present on featured projects only; the index rows without
   *  it stay collapsed and are not clickable. */
  readonly study?: {
    readonly constraint: string;
    readonly decision: string;
    readonly outcome: string;
  };
  readonly links?: readonly ProjectLink[];
  /** Key for the client's mark, shown beside the client name in the row. */
  readonly clientLogo?: string;
  /** `src` is a KEY, not a path — the Work component maps it to a bundled
   *  import. Content files stay free of build-tool imports so they remain
   *  plain data that a non-developer can edit. */
  readonly media?: {
    readonly src: string;
    readonly alt: string;
  };
}

export interface TimelineEntry {
  readonly id: string;
  readonly title: string;
  readonly org?: string;
  readonly start: string;
  readonly end: string;
  /** Drives the status glyph. Never encoded by colour alone. */
  readonly status: "shipped" | "active";
  /** Always visible: one paragraph that has to stand on its own, because most
   *  readers will never open the disclosure. */
  readonly body: string;
  /** Revealed on demand. The scannable summary above stays short while the
   *  substance stays reachable — sourced from his CV rather than rewritten. */
  readonly details?: readonly string[];
}

export interface Principle {
  readonly id: string;
  readonly title: string;
  readonly body: string;
}

export type Accent = "ember" | "rust" | "violet" | "azure";

export interface SkillGroup {
  readonly id: string;
  readonly label: string;
  readonly accent: Accent;
}

export interface SkillNode {
  readonly id: string;
  readonly label: string;
  readonly group: string;
  /** Ids of nodes in OTHER groups this one genuinely connects to in his work.
   *  These are the edges that make the map worth looking at — a graph where
   *  every node only links to its own group is just a list with extra steps. */
  readonly related?: readonly string[];
  /** One line explaining where he actually uses it. Shown on selection. */
  readonly note?: string;
}

export interface AboutEntry {
  readonly id: string;
  readonly text: string;
  /** `src` is a KEY resolved to a bundled import by the component, so content
   *  files stay free of build-tool imports. Entries without one are set as
   *  prose alone — not every paragraph needs a photograph. */
  readonly image?: { readonly src: string; readonly alt: string };
}

export interface NowSection {
  readonly heading: string;
  readonly body: readonly string[];
}

export interface NowImage {
  /** KEY resolved to a bundled import by the component. */
  readonly src: string;
  readonly alt: string;
  readonly caption?: string;
}

export interface ArchNode {
  readonly id: string;
  readonly label: string;
  readonly note?: string;
}

/** A cluster of nodes, placed on a coarse 2-column grid by the author — the
 *  same role a Mermaid subgraph plays, but with the layout stated rather than
 *  solved, so the server and client render identically. */
export interface ArchGroup {
  readonly id: string;
  readonly name: string;
  readonly col: 1 | 2;
  readonly row: number;
  readonly nodes: readonly ArchNode[];
}

/** An edge between two node ids. Dashed marks the flows that are conditional
 *  or simulated (sync when online, backtest runs) rather than the live path. */
export interface ArchEdge {
  readonly from: string;
  readonly to: string;
  readonly label?: string;
  readonly dashed?: boolean;
}

/** The expanded detail view: blog-like prose, real screenshots where they
 *  exist, and the architecture as data — the component draws the diagram, so
 *  the labels translate with the rest of the site. */
export interface NowStudy {
  readonly sections: readonly NowSection[];
  readonly gallery?: readonly NowImage[];
  readonly architecture: {
    readonly heading: string;
    /** One line under the diagram for the rule that the picture cannot carry
     *  alone, e.g. the build check that fences the broker. */
    readonly footnote?: string;
    readonly groups: readonly ArchGroup[];
    readonly edges: readonly ArchEdge[];
  };
}

/** A project that is in progress right now. Unlike a Project there is no
 *  outcome to report — the study describes how it is built, not how it went. */
export interface NowItem {
  readonly id: string;
  readonly name: string;
  readonly org?: string;
  /** Short status shown as a chip, e.g. "In development" / "Paper trading". */
  readonly stage: string;
  readonly summary: string;
  readonly detail: string;
  readonly stack: readonly string[];
  readonly media?: { readonly src: string; readonly alt: string };
  readonly study?: NowStudy;
}

/** A third-party mark shown to identify a client or a product. Named, not
 *  decorative: it says who the work was for. */
export interface LogoRef {
  readonly src: string;
  /** The organisation or product name. Doubles as the accessible name. */
  readonly name: string;
}

export interface LegalSection {
  readonly heading: string;
  readonly body?: readonly string[];
  /** Rendered as a definition list — used for the address and contact block. */
  readonly rows?: readonly { readonly term: string; readonly value: string }[];
}

export interface LegalPage {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly intro?: string;
  readonly updated: string;
  readonly sections: readonly LegalSection[];
}

export interface Content {
  readonly meta: {
    readonly title: string;
    readonly description: string;
    readonly ogAlt: string;
  };
  readonly nav: readonly { readonly id: string; readonly label: string }[];
  readonly hero: {
    readonly name: string;
    /** His own CV tagline. Replaces the former `availability` line: a standing
     *  "open to roles" banner reads as an active job search to anyone at his
     *  current employer, and the site is meant to state facts, not intent. */
    readonly tagline: string;
    readonly thesis: string;
    readonly roles: readonly { readonly title: string; readonly org: string }[];
    readonly location: string;
    readonly cta: string;
    readonly portraitAlt: string;
    readonly scrollHint: string;
  };
  /** Short phrases for the scrolling strip under the hero. Kept to single
   *  words or two-word pairs — anything longer reads as a sentence cut in half
   *  as it passes the viewport edge. */
  readonly marquee: readonly string[];
  readonly evidence: {
    readonly label: string;
    readonly figures: readonly Figure[];
  };
  readonly work: {
    readonly label: string;
    readonly heading: string;
    readonly intro: string;
    readonly readMore: string;
    readonly close: string;
    readonly clientsLabel: string;
    readonly clients: readonly LogoRef[];
    readonly headers: {
      readonly client: string;
      readonly role: string;
      readonly year: string;
      readonly stack: string;
      readonly constraint: string;
      readonly decision: string;
      readonly outcome: string;
    };
    readonly projects: readonly Project[];
  };
  readonly now: {
    readonly label: string;
    readonly heading: string;
    readonly intro: string;
    readonly readMore: string;
    readonly close: string;
    readonly items: readonly NowItem[];
  };
  readonly timeline: {
    readonly label: string;
    readonly heading: string;
    readonly status: { readonly shipped: string; readonly active: string };
    readonly entries: readonly TimelineEntry[];
  };
  readonly principles: {
    readonly label: string;
    readonly heading: string;
    readonly intro: string;
    readonly items: readonly Principle[];
  };
  readonly about: {
    readonly label: string;
    readonly heading: string;
    readonly entries: readonly AboutEntry[];
  };
  readonly contact: {
    readonly label: string;
    readonly heading: string;
    readonly body: string;
    readonly email: string;
    readonly emailLabel: string;
    readonly socials: readonly ProjectLink[];
  };
  readonly skills: {
    readonly label: string;
    readonly heading: string;
    readonly intro: string;
    readonly hint: string;
    readonly groups: readonly SkillGroup[];
    readonly nodes: readonly SkillNode[];
  };
  readonly footer: {
    readonly rights: string;
  };
  readonly legal: {
    readonly imprint: LegalPage;
    readonly privacy: LegalPage;
    readonly backToSite: string;
  };
  readonly ui: {
    readonly skipToContent: string;
    readonly languageLabel: string;
    readonly menu: string;
    readonly close: string;
    /** The inverse of a consent banner: a short notice that there is nothing
     *  to consent to. It stores nothing, so it reappears on each visit — the
     *  privacy page says as much. */
    readonly notice: string;
    readonly noticeDetails: string;
  };
}
