import type { Content } from "./types";

/* ============================================================================
 * Recovered from the SSR bundle after an accidental `git checkout` reverted
 * this file; content is byte-identical to the last verified build. Original
 * authoring comments were lost in bundling — the load-bearing one is restated:
 *
 * TONE RULE — this site states FACTS about him. It does not signal that he is
 * looking. No "open to roles", no availability banner, no CV download. His
 * current employer can read this page. A test enforces this.
 *
 * STILL NEEDS HIM: the legal.imprint postal address placeholders, and the
 * "downloads" evidence figure (null until he wants it public).
 * ========================================================================== */

export const en: Content = {
  meta: {
    title: "Christian Gutermann — Software Engineer, Scrum Master, AI Enthusiast",
    description:
      "Scrum Master and software engineer near Karlsruhe with ten years of building software and growing teams. Co-founder of TumbleTree Studios.",
    ogAlt: "Christian Gutermann — software engineer, Scrum Master, AI enthusiast.",
  },
  nav: [
    { id: "work", label: "Work" },
    { id: "skills", label: "Skills" },
    { id: "timeline", label: "Timeline" },
    { id: "contact", label: "Contact" },
  ],
  hero: {
    name: "Christian Gutermann",
    tagline: "Software Engineer · Scrum Master · AI Enthusiast",
    thesis:
      "Ten-plus years of building software, from engineer to Scrum Master. I stay close to the tech and still write code myself — but what really drives me is getting a team behind one goal, clearing blockers out of the way, and making sure we build the right things right.",
    roles: [
      { title: "Scrum Master & Software Engineer", org: "CAS Software AG" },
      { title: "Co-founder & CEO", org: "TumbleTree Studios UG" },
    ],
    location: "Bruchsal, Germany",
    cta: "Get in touch",
    portraitAlt: "Christian Gutermann, smiling, in a dark sweater.",
    scrollHint: "Scroll",
  },
  /* Disciplines, not tools. Named frameworks belong in the skills map and the
       per-project stacks, where they carry context; in a strip that passes the eye
       in a second they just read as a keyword dump, and they date the site the
       moment the stack moves on.
  
       "Product Design" rather than "UI/UX": it covers interface and experience in
       one term and is what someone who designed and shipped a game's whole surface
       would actually claim. "Facilitation" is the English for Moderation in this
       sense — running workshops and ceremonies; "Moderation" alone would be read
       as content moderation. */
  marquee: [
    "Scrum",
    "AI-assisted Development",
    "Product Management",
    "Team Leadership",
    "Full-Stack Development",
    "Facilitation",
    "Product Design",
    "Kanban",
    "Mobile Development",
    "Roadmapping",
    "DevOps",
    "Mentoring",
    "Agile Delivery",
    "Stakeholder Management",
  ],
  evidence: {
    label: "By the numbers",
    figures: [
      {
        id: "years",
        value: 10,
        suffix: "+",
        label: "Years of software engineering",
        note: "At CAS Software AG since 2015",
      },
      {
        id: "team",
        value: 11,
        label: "People in my team",
        note: "Grown from four as Scrum Master, across Germany and Hungary",
      },
      {
        id: "projects",
        value: 10,
        prefix: "",
        suffix: "+",
        label: "Active projects I am responsible for",
        note: "Including their budgets",
      },
      {
        id: "theses",
        value: 2,
        label: "Bachelor theses supervised",
        note: "DHBW Karlsruhe, 2023 and 2024",
      },
      // Fill in only if he wants the figure public.
      {
        id: "downloads",
        value: null,
        label: "Dropigon downloads",
        note: "App Store and Google Play",
      },
    ],
  },
  work: {
    label: "Selected work",
    heading: "Products I have built, and what I actually did on them.",
    intro:
      "Enterprise software for German companies and institutions, and a mobile game I built end to end through my own studio.",
    readMore: "Read the case study",
    close: "Close",
    clientsLabel: "Organisations I have built software for",
    clients: [
      { src: "tumbletree", name: "TumbleTree Studios" },
      { src: "cas", name: "CAS Software AG" },
      { src: "bioland", name: "Bioland" },
      { src: "daimler", name: "Daimler Truck" },
      { src: "dbe", name: "Deutsche Bahn Energie" },
      { src: "datev", name: "DATEV" },
      { src: "kit", name: "Karlsruhe Institute of Technology" },
    ],
    headers: {
      client: "Client",
      role: "Role",
      year: "Year",
      stack: "Stack",
      constraint: "The constraint",
      decision: "What I decided",
      outcome: "What changed",
    },
    projects: [
      {
        id: "dropigon",
        client: "TumbleTree Studios UG",
        clientLogo: "tumbletree",
        name: "Dropigon",
        year: "2026",
        role: "Concept, development, release",
        stack: ["Flutter", "Dart", "Flame", "Firebase", "AI-assisted", "Mobile App"],
        summary:
          "A drop-and-merge puzzle game, free on the App Store and Google Play — built entirely on my own.",
        study: {
          constraint:
            "Dropigon started as a feasibility test: how much work is it really, taking an app all the way into the stores? And honestly — I had simply always wanted an app of my own to share with friends. All of it had to happen in the evenings, next to a full-time job and a young family, so anything that did not move the game toward release was cut.",
          decision:
            "Flutter with Flame and its Forge2D physics for the game, Firebase for the global leaderboard, ads through AdMob and an ad-free purchase through the stores. AI sat in almost every step: Copilot as the constant companion in the code — later Claude Code, after Copilot cut its quota overnight — graphics from Midjourney with manual rework, and the entire soundtrack from Suno.",
          outcome:
            "The first playable prototype took a few days; the finish took far longer. AI-suggested physics values sounded plausible and felt wrong in play, so drop speed and merge behaviour were tuned by hand, test round after test round. The game has been live on both stores since January 2026 — and I know first-hand where these tools carry and where they stop.",
        },
        links: [
          {
            label: "App Store",
            href: "https://apps.apple.com/de/app/dropigon/id6755251910",
          },
          {
            label: "Google Play",
            href: "https://play.google.com/store/apps/details?id=com.tumbletreestudios.dropigon",
          },
        ],
        media: {
          src: "dropigon",
          alt: "Dropigon gameplay: coloured polygons stacking up on a dark board, with score and high score.",
        },
      },
      {
        id: "bioland",
        client: "Bioland",
        clientLogo: "bioland",
        name: "Mein Bioland",
        role: "Project lead, software engineer",
        stack: ["Java", "Angular", "REST", "Kubernetes", "Jenkins"],
        summary:
          "The member platform for Germany's largest organic farming association.",
        study: {
          constraint:
            "Mein Bioland is a long-lived platform serving an association of farmers, processors and retailers. Most of the work is evolution rather than greenfield: every change has to land in a system people already rely on for their daily work.",
          decision:
            "I own this project end to end, including its budget, and I am the direct line for the customer — when Bioland has a technical question, my phone rings rather than a ticket queue. That means scoping changes with them before they become specifications.",
          outcome:
            "It is one of the ten-plus active projects I am responsible for, budget included.",
        },
        media: {
          src: "bioland",
          alt: "Illustration of the Mein Bioland member platform: linked records over a field pattern.",
        },
      },
      {
        id: "smartwe-appstore",
        client: "CAS Software AG",
        clientLogo: "cas",
        name: "SmartWe App Store",
        role: "Main developer",
        stack: ["Angular", "REST", "Docker"],
        summary:
          "A cloud marketplace where CRM customers find and install applications for their own workspace.",
        study: {
          constraint:
            "SmartWe customers needed to extend their CRM without a developer and without a deployment. Installation had to be self-service, reversible, and safe to run against live customer data.",
          decision:
            "As main developer I designed the install flow and how extensions plug into the platform.",
          outcome:
            "The App Store is now the route through which SmartWe customers extend the product themselves.",
        },
        media: {
          src: "smartwe",
          alt: "Illustration of the SmartWe App Store: a grid of installable application tiles.",
        },
      },
      {
        id: "samplus",
        client: "Daimler Truck",
        clientLogo: "daimler",
        name: "SAMPlus",
        role: "Software engineer",
        stack: ["Java", "REST", "React", "Azure DevOps"],
        summary:
          "Configure, price and quote for commercial vehicle sales, still in use today.",
        study: {
          constraint:
            "Specifying a commercial truck is a combinatorial problem: options constrain one another, the valid combinations keep changing, and a wrong quote costs real money.",
          decision:
            "I worked on introducing the CPQ solution that brought configuration and pricing onto one system, so the rules live in one place rather than in the experience of individual salespeople.",
          outcome:
            "Sales configuration and pricing run through it, and it is one of the projects I still carry responsibility for.",
        },
        media: {
          src: "samplus",
          alt: "Illustration of a truck configurator: option rows resolving into a single priced specification.",
        },
      },
      {
        id: "e-invoice",
        client: "CAS Software AG",
        clientLogo: "cas",
        name: "E-Invoice for SmartWe",
        role: "Software engineer",
        stack: ["Java", "Angular", "XRechnung", "REST"],
        summary:
          "Creating, storing and sending legally compliant electronic invoices from inside the CRM.",
        study: {
          constraint:
            "E-invoices in Germany follow a legally mandated format with structured fields that the system on the other end has to parse. Get a field wrong and the invoice is rejected.",
          decision:
            "We built invoicing into SmartWe itself rather than bolting on an export, so an invoice is created, stored and sent from the same place the customer record already lives.",
          outcome:
            "SmartWe customers can issue compliant electronic invoices without leaving their CRM.",
        },
        media: {
          src: "einvoice",
          alt: "Illustration of an electronic invoice: a structured document with machine-readable fields.",
        },
      },
      {
        id: "secure-login",
        client: "CAS Software AG",
        clientLogo: "cas",
        name: "Two-factor authentication",
        role: "Software engineer",
        stack: ["React Native", "Mobile App", "Security", "TOTP"],
        summary: "A companion authenticator app and a second factor on the CRM login.",
        study: {
          constraint:
            "A CRM holds a company's entire customer relationship. A password alone is a single point of failure for all of it, and a second factor on the login path is a change every user sees at their next sign-in.",
          decision:
            "I built the second factor as a cross-platform mobile app issuing time-based one-time codes, and wired it into the existing login flow. The rollout got as much care as the code — if the second factor annoys people, they work around it.",
          outcome:
            "Accounts are protected by something beyond a password, and the login path stayed usable enough that it did not generate its own support load.",
        },
        media: {
          src: "twofactor",
          alt: "Illustration of two-factor authentication: a login shield with a six-digit one-time code.",
        },
      },
    ],
  },
  skills: {
    label: "Skills",
    heading: "What I work with, and how it connects.",
    intro:
      "Grouped by what it is for, not by how well I know it. The lines are the parts that genuinely meet in day-to-day work — select a node to see where.",
    hint: "Select a node to trace its connections",
    groups: [
      { id: "ai", label: "AI", accent: "ember" },
      { id: "engineering", label: "Engineering", accent: "azure" },
      { id: "delivery", label: "Delivery", accent: "violet" },
      { id: "leadership", label: "Leadership", accent: "rust" },
    ],
    nodes: [
      {
        id: "claude",
        label: "Claude",
        group: "ai",
        related: ["typescript", "flutter"],
        note: "My daily driver since Copilot cut its quota overnight, mid-Dropigon. The lesson stuck: build your workflow so you can switch tools at any time.",
      },
      {
        id: "chatgpt",
        label: "ChatGPT",
        group: "ai",
        related: ["sql"],
        note: "Research, data preparation, first sketches — the everyday end of AI, well before any code.",
      },
      {
        id: "copilot",
        label: "GitHub Copilot",
        group: "ai",
        related: ["angular", "git"],
        note: "Constant companion through most of Dropigon's code, and completion in the editor at work.",
      },
      {
        id: "midjourney",
        label: "Midjourney",
        group: "ai",
        related: ["flutter", "figma"],
        note: "Dropigon's graphics, from the app icon to the unlockable colour schemes — generated, then reworked by hand.",
      },
      {
        id: "lmstudio",
        label: "LM Studio",
        group: "ai",
        related: ["sovereign", "docker"],
        note: "Local models, run on my own hardware rather than someone else's.",
      },
      {
        id: "sovereign",
        label: "Self-hosted LLMs",
        group: "ai",
        related: ["theses", "docker"],
        note: "Digitally sovereign models for processing documentation — the subject of a bachelor thesis I supervised.",
      },
      {
        id: "aimusic",
        label: "AI music",
        group: "ai",
        related: ["flutter"],
        note: "Dropigon's entire soundtrack comes from Suno. Music is a role a solo developer simply cannot staff — AI filled it.",
      },
      {
        id: "typescript",
        label: "TypeScript",
        group: "engineering",
        related: ["angular", "react"],
      },
      {
        id: "angular",
        label: "Angular",
        group: "engineering",
        related: ["typescript"],
        note: "The bulk of the frontend work in the Appfactory.",
      },
      { id: "react", label: "React", group: "engineering", related: ["typescript"] },
      {
        id: "flutter",
        label: "Flutter",
        group: "engineering",
        related: ["claude", "release"],
        note: "Dropigon, and the children's learning app in progress.",
      },
      { id: "sql", label: "SQL", group: "engineering", related: ["vaadin"] },
      { id: "vaadin", label: "Vaadin", group: "engineering", related: ["sql"] },
      {
        id: "cpq",
        label: "CPQ",
        group: "engineering",
        related: ["stakeholders"],
        note: "Configure-price-quote: rule engines where the wrong answer costs real money. Daimler Truck's SAMPlus.",
      },
      {
        id: "einvoicing",
        label: "E-invoicing",
        group: "engineering",
        related: ["cpq"],
        note: "Structured, legally compliant invoice formats — a domain where 'nearly correct' means rejected.",
      },
      {
        id: "scrum",
        label: "Scrum",
        group: "delivery",
        related: ["facilitation", "jira"],
        note: "Every ceremony, plus cross-team formats at department level.",
      },
      { id: "kanban", label: "Kanban", group: "delivery", related: ["scrum"] },
      {
        id: "jira",
        label: "Jira",
        group: "delivery",
        related: ["roadmapping"],
      },
      {
        id: "jenkins",
        label: "Jenkins",
        group: "delivery",
        related: ["docker"],
        note: "CI/CD pipelines that keep development and deployment fast.",
      },
      {
        id: "docker",
        label: "Docker",
        group: "delivery",
        related: ["jenkins"],
        note: "Containerised environments across the Appfactory projects.",
      },
      { id: "git", label: "Git", group: "delivery", related: ["jenkins"] },
      { id: "figma", label: "Figma", group: "delivery", related: ["midjourney"] },
      {
        id: "release",
        label: "Store releases",
        group: "delivery",
        related: ["flutter"],
        note: "App Store and Google Play submission, review and release management — done alone, for a real product.",
      },
      {
        id: "conceptboard",
        label: "Conceptboard",
        group: "delivery",
        related: ["facilitation"],
        note: "Where the remote workshops actually happen, with part of the team in Hungary.",
      },
      {
        id: "facilitation",
        label: "Facilitation",
        group: "leadership",
        related: ["scrum"],
        note: "Dailies, plannings, retros, reviews — and cross-team sessions.",
      },
      {
        id: "mentoring",
        label: "Mentoring",
        group: "leadership",
        related: ["scrum"],
        note: "Onboarding new team members, and supervising two bachelor theses.",
      },
      {
        id: "roadmapping",
        label: "Roadmapping",
        group: "leadership",
        related: ["jira"],
        note: "Keeping development aligned with business goals, presented to department leadership.",
      },
      {
        id: "stakeholders",
        label: "Client contact",
        group: "leadership",
        related: ["roadmapping"],
        note: "Direct line to customers from project start — when Daimler Truck or Bioland has a technical question, my phone rings.",
      },
      {
        id: "growth",
        label: "Team growth",
        group: "leadership",
        related: ["mentoring"],
        note: "Four people to eleven, across two countries.",
      },
      {
        id: "theses",
        label: "Thesis supervision",
        group: "leadership",
        related: ["sovereign"],
        note: "Two bachelor theses at DHBW Karlsruhe — supervising research, not just reviewing code.",
      },
      {
        id: "budget",
        label: "Budget ownership",
        group: "leadership",
        related: ["roadmapping"],
        note: "Ten-plus active projects, budgets included.",
      },
      {
        id: "distributed",
        label: "Distributed teams",
        group: "leadership",
        related: ["conceptboard", "growth"],
        note: "Germany and Hungary. Trust at a distance takes deliberate work.",
      },
    ],
  },
  now: {
    label: "Currently",
    heading: "What I am building right now.",
    intro:
      "Two projects in the evenings — one with the studio, one on my own. Both unfinished, both moving.",
    readMore: "More about this",
    close: "Close",
    items: [
      {
        id: "tumbletree-app",
        name: "TumbleTree App",
        org: "TumbleTree Studios UG",
        stage: "In development",
        summary:
          "A kid-safe learning app built around games and stories, with difficulty that adapts to the child — the second TumbleTree product.",
        detail:
          "Same approach as Dropigon: Flutter, AI in the loop for code and assets, and small evening increments.",
        stack: ["Flutter", "Firebase", "Flame", "AI-assisted"],
        media: {
          src: "tumbletree-app",
          alt: "Schematic of a children's learning app: a geometric tree branching into game tiles, next to an adaptive difficulty ramp.",
        },
        study: {
          sections: [
            {
              heading: "The second product",
              body: [
                "The TumbleTree App is the studio's second product: a kid-safe learning app for the whole family, built around games and stories, with difficulty that adapts to the child. Same working model as Dropigon — evenings, small increments, AI in the loop for code and assets.",
              ],
            },
            {
              heading: "Built to work offline",
              body: [
                "The app is offline-first: everything lives in a local database on the device, and a sync service reconciles with the cloud when a connection is there. A kid on the back seat of a car does not care about coverage.",
              ],
            },
            {
              heading: "Built to fit into evenings",
              body: [
                "The development flavour runs entirely without Firebase — mock sign-in, local data, no cloud setup — so an evening session starts in seconds. Real screenshots will follow once the app looks like something; until then the architecture is the honest picture.",
              ],
            },
          ],
          architecture: {
            heading: "How it is put together",
            footnote:
              "Clean Architecture — dependencies only point inward, and the dev flavour runs without any cloud at all.",
            groups: [
              {
                id: "presentation",
                name: "Presentation",
                col: 1,
                row: 1,
                nodes: [
                  { id: "screens", label: "Screens & Flame games" },
                  { id: "state", label: "Riverpod state" },
                ],
              },
              {
                id: "domain",
                name: "Domain",
                col: 1,
                row: 2,
                nodes: [
                  { id: "entities", label: "Entities" },
                  { id: "interfaces", label: "Repository interfaces" },
                ],
              },
              {
                id: "data",
                name: "Data",
                col: 1,
                row: 3,
                nodes: [
                  {
                    id: "drift",
                    label: "Drift — local database",
                    note: "Source of truth",
                  },
                  { id: "sync", label: "SyncService" },
                ],
              },
              {
                id: "cloud",
                name: "Firebase",
                col: 2,
                row: 3,
                nodes: [
                  { id: "auth", label: "Auth" },
                  { id: "firestore", label: "Firestore" },
                  { id: "appcheck", label: "App Check" },
                ],
              },
            ],
            edges: [
              { from: "screens", to: "state" },
              { from: "state", to: "interfaces", label: "inward only" },
              { from: "interfaces", to: "drift", label: "implemented in data" },
              { from: "drift", to: "sync", label: "queued changes" },
              { from: "sync", to: "firestore", label: "when online", dashed: true },
              { from: "auth", to: "screens", label: "sign-in", dashed: true },
            ],
          },
        },
      },
      {
        id: "tradebot",
        name: "Tradebot",
        stage: "Paper trading",
        summary:
          "A trading bot for Interactive Brokers: AI models summarise news and fundamentals, a deterministic scoring algorithm makes the actual buy or sell decision.",
        detail:
          "The AI explains, it never decides. Only the execution layer may talk to the broker — a check fails the build if anything else tries — and every position gets a stop order at the broker, so it holds even if the bot crashes. Backtests replay ten years of prices in about a minute. Still paper trading: simulated money until the numbers earn real ones.",
        stack: ["Python", "FastAPI", "React", "TimescaleDB", "Groq", "Gemini"],
        media: {
          src: "tradebot",
          alt: "Schematic of a trading bot: a candlestick chart feeding a scoring engine, with an execution path through a risk gate to the broker.",
        },
        study: {
          sections: [
            {
              heading: "Why this exists",
              body: [
                "I wanted to know whether a bot can analyse stocks on its own and trade on the result — with decision-making I can actually read. So AI models summarise news and figures and explain their view in plain language, but the buy or sell itself comes from a fixed, traceable algorithm that adds up price signals, fundamentals and news sentiment.",
              ],
            },
            {
              heading: "What worked — and what didn't",
              body: [
                "The AI wiring was the fast part: fetching data, sending it to the APIs, sorting the answers ran smoothly from the start. And because analysis and execution are strictly separated, I could experiment freely on the AI side — even switch providers — without the trading logic ever noticing.",
                "The first AI analyses themselves were poor. They matched neither the actual price action nor what real analysts said about the same stocks. Most of the fix was better input data; the prompt came second.",
              ],
            },
            {
              heading: "Tested by pulling the plug",
              body: [
                "The safety layers were tested with chaos drills — pulling the ethernet cable mid-position, killing the bot mid-order. Those drills found real bugs before real money could.",
                "If I started again, I would build the way to verify a result against something real before building the feature itself. And with money involved, the rule stands: AI explains, it never decides.",
              ],
            },
          ],
          gallery: [
            {
              src: "stockanalysis",
              alt: "Stock analysis view for AAPL: a buy recommendation with the score broken down into sentiment, technicals and fundamentals, next to the price history.",
              caption: "Analysis view",
            },
            {
              src: "papertrading",
              alt: "List of simulated paper trades with symbol, order type, status and timestamp.",
              caption: "Paper trading",
            },
            {
              src: "backtesting",
              alt: "Backtest result of a Donchian breakout strategy with key figures and the equity curve compared against the benchmark.",
              caption: "Backtesting",
            },
          ],
          architecture: {
            heading: "How it is put together",
            footnote:
              "Only the execution layer may talk to the broker — a check fails the build if anything else tries.",
            groups: [
              {
                id: "ingest",
                name: "Ingest",
                col: 1,
                row: 1,
                nodes: [
                  { id: "market", label: "Prices · News · Fundamentals" },
                  { id: "disclosures", label: "Politician & insider trades" },
                ],
              },
              {
                id: "ai",
                name: "AI",
                col: 2,
                row: 1,
                nodes: [
                  { id: "llm", label: "Groq & Gemini", note: "Explanation only" },
                  { id: "dashboard", label: "Analysis dashboard" },
                ],
              },
              {
                id: "analysis",
                name: "Analysis",
                col: 1,
                row: 2,
                nodes: [
                  { id: "scoring", label: "Scoring engine", note: "Deterministic" },
                  { id: "finbert", label: "FinBERT sentiment" },
                ],
              },
              {
                id: "backtest",
                name: "Backtest",
                col: 2,
                row: 2,
                nodes: [
                  { id: "replay", label: "Replay", note: "Ten years ≈ one minute" },
                  { id: "simbroker", label: "Simulated broker" },
                ],
              },
              {
                id: "strategy",
                name: "Strategy",
                col: 1,
                row: 3,
                nodes: [{ id: "bot", label: "Trading strategies" }],
              },
              {
                id: "execution",
                name: "Execution",
                col: 1,
                row: 4,
                nodes: [
                  { id: "risk", label: "Risk engine" },
                  { id: "router", label: "Order router" },
                ],
              },
              {
                id: "brokerage",
                name: "Broker",
                col: 2,
                row: 4,
                nodes: [
                  {
                    id: "broker",
                    label: "Interactive Brokers",
                    note: "Stop orders live here",
                  },
                ],
              },
            ],
            edges: [
              { from: "market", to: "scoring" },
              { from: "disclosures", to: "scoring" },
              { from: "finbert", to: "scoring" },
              { from: "scoring", to: "llm", label: "recommendation" },
              { from: "llm", to: "dashboard" },
              { from: "scoring", to: "dashboard" },
              { from: "scoring", to: "bot", label: "signal" },
              { from: "replay", to: "bot", label: "same logic", dashed: true },
              { from: "bot", to: "simbroker", label: "test run", dashed: true },
              { from: "bot", to: "risk", label: "order intent" },
              { from: "risk", to: "router" },
              { from: "router", to: "broker" },
            ],
          },
        },
      },
    ],
  },

  timeline: {
    label: "Timeline",
    heading: "From software engineer to Scrum Master, still writing code.",
    status: { shipped: "Completed", active: "Ongoing" },
    entries: [
      {
        id: "tumbletree",
        title: "Co-founder & CEO",
        org: "TumbleTree Studios UG",
        start: "Oct 2025",
        end: "Now",
        status: "active",
        body: "Co-founded alongside my day job, mainly as a way to keep developing on real projects. I built and released our first game, Dropigon, on my own. A second product, a learning app for the whole family, is in development.",
        details: [
          "Co-founded the studio as a side venture, to keep growing on our own gaming and learning apps rather than only on someone else's roadmap.",
          "Took Dropigon through the entire product lifecycle single-handed — concept, prioritisation, development, and launch on the App Store and Google Play in January 2026.",
          "Used AI throughout the build: code, graphics, and the soundtrack.",
          "Currently building the second product the same way: a learning app for the whole family.",
        ],
      },
      {
        id: "scrum-master",
        title: "Scrum Master & Software Engineer",
        org: "CAS Software AG · Appfactory",
        start: "Apr 2021",
        end: "Now",
        status: "active",
        body: "Took on a newly formed team and grew it from four people to eleven across Germany and Hungary. I own the roadmap, present it to department leadership, keep the direct line to customers, and still write code — which is what lets me talk to developers as a peer.",
        details: [
          "Took the Scrum Master role for a newly formed team, introduced agile practice, and built a working foundation for collaboration and delivery.",
          "Stayed a software engineer in the same team, to keep close to the technical realities rather than managing them from a distance.",
          "Grew and scaled an international team from four developers to seven developers, three working students and a QA tester, across Germany and Hungary.",
          "Completed a two-year internal leadership programme alongside the role.",
          "Own project roadmaps that tie development to business goals, and present them regularly to department leadership.",
          "Direct customer contact from project start — gathering requirements and making sure the technical need is genuinely understood.",
          "Supervised two bachelor theses, including one on configuring and evaluating a self-hosted, digitally sovereign large language model for processing documentation.",
          "Responsible for more than ten active projects and their budgets, among them Bioland, Daimler Truck and Deutsche Bahn Energie.",
          "Run every Scrum ceremony, and facilitate department formats such as cross-team reviews.",
        ],
      },
      {
        id: "engineer-appfactory",
        title: "Software Engineer",
        org: "CAS Software AG · Appfactory",
        start: "May 2020",
        end: "Apr 2021",
        status: "shipped",
        body: "Frontend work, mostly Angular, plus Docker and the CI/CD pipelines. Mentored new joiners and stood in as deputy Scrum Master, which is how the later role started.",
        details: [
          "Worked across a range of frontend projects, predominantly Angular, with a clear focus on modern web application development.",
          "Containerised environments with Docker and maintained the CI/CD pipelines to speed up development and deployment.",
          "Mentored several new team members through onboarding and knowledge transfer.",
          "Took on deputy Scrum Master duties — facilitating ceremonies and holding the team's organisation together in the Scrum Master's absence.",
        ],
      },
      {
        id: "engineer-education",
        title: "Software Engineer",
        org: "CAS Software AG · Education",
        start: "Oct 2018",
        end: "May 2020",
        status: "shipped",
        body: "Full-stack work on student administration systems for universities — enrolment, grades, and communication with students. Helped modernise the department's technology stack.",
        details: [
          "Started my engineering career in full-stack work, building and maintaining frontend and backend components for web applications.",
          "Specialised in student administration systems for universities: administrative processes, enrolment, grade management and student communication.",
          "Contributed substantially to modernising the department's technology stack, introducing current frameworks and tooling for better performance and a more intuitive interface.",
          "Started running smaller team ceremonies — dailies and retrospectives — on my own initiative, which improved how the team communicated.",
        ],
      },
      {
        id: "bachelor",
        title: "BSc Computer Science · Dual studies",
        org: "DHBW Karlsruhe & CAS Software AG",
        start: "Sep 2015",
        end: "Oct 2018",
        status: "shipped",
        body: "Three years of writing production code and sitting exams in the same week — theory and practice were never separate things for me. Graduated 1.7.",
        details: [
          "Three-year dual degree, 210 ECTS, with continuous hands-on development work in the department throughout.",
          "Built a UI test automation framework to replace an expensive licensed tool — saving several thousand euros a year, and still in production today.",
          "Wrote my bachelor thesis on a framework prototype for Angular apps embedded in SmartWe, a modular CRM cloud platform.",
          "Graduated with 1.7.",
        ],
      },
    ],
  },
  principles: {
    label: "How I work",
    heading: "Four things I believe about how software gets built.",
    intro: "All four learned the hard way, on real projects.",
    items: [
      {
        id: "needs",
        title: "What a customer wants is mostly not what they need",
        body: "Working out the difference is the actual engineering. A request arrives already shaped as a solution, and building exactly that is the easy path — it just leaves the real problem where it was. So I stay in the conversation until the need underneath it is clear. When Bioland or Daimler Truck has a technical question it comes to me directly, and it is rarely the first answer that turns out to be the one worth building.",
      },
      {
        id: "blockers",
        title: "A standup that reports status is a meeting, not a tool",
        body: "A standup is for the day ahead: everyone knows their plan, the plan is actually good to go, and whatever stands in its way — an open question, an impediment — gets cleared up front. Reporting yesterday's status just dismisses that goal. And trust cuts the other way too: “I have been stuck since Monday” should never have to wait for a standup. I want to hear it on Monday — the standup is where we make sure the day works, not where problems finally surface.",
      },
      {
        id: "ai",
        title: "You only learn where AI stops helping by shipping with it",
        body: "I did not learn the limits of these tools from slides. I built and released a game with them — code, graphics, even the music — and found out first-hand which parts hold up under real deadlines and which are a waste of an evening. The interesting work now is getting requirements sharp enough that an agent can actually act on them.",
      },
      {
        id: "coordination",
        title: "Most engineering problems are coordination problems",
        body: "This is what the last ten years keep coming back to, and the reason I moved from writing software to being responsible for how it gets written. When a project stalls, it is rarely because nobody could solve the technical problem. It is because two people each solved half of it, or spent a week waiting on an answer no one knew they were supposed to give, or were working from assumptions that had never been said out loud. Fix how the work is coordinated and a surprising number of technical problems stop happening in the first place.",
      },
    ],
  },
  about: {
    label: "Off the clock",
    heading: "The rest of the week",
    entries: [
      {
        id: "mali",
        text: "Most weeks it's out with Mali, our border collie — training, or a proper hike. The best way I know to stay active together and clear my head.",
        image: {
          src: "mali",
          alt: "Mali, a black and white border collie, sitting on a tree stump in a sunlit orchard meadow.",
        },
      },
      {
        id: "family",
        text: "Since April 2025 we are a family of three. Our daughter keeps my wife and me properly on our toes — and honestly, it is the best chapter of my life so far.",
        image: {
          src: "family",
          alt: "Christian with his wife and their young daughter, smiling, among tropical plants.",
        },
      },
      {
        id: "gaming",
        text: "Gaming is where I switch off and push myself at the same time: there is always one more mechanic to master or a smarter strategy to find. The hardware is part of it — I plan and build my gaming PC myself.",
        image: {
          src: "pc",
          alt: "Build schematic of a self-assembled gaming PC: open tower with GPU, tower cooler, fans and airflow lines.",
        },
      },
    ],
  },
  contact: {
    label: "Contact",
    heading: "Say hello.",
    body: "Always happy to talk about software, teams, or what AI is actually good for. Email reaches me fastest.",
    email: "christian.gutermann95@gmail.com",
    emailLabel: "Email",
    socials: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/chrisguter" }],
  },
  footer: {
    rights: "All rights reserved.",
  },
  ui: {
    skipToContent: "Skip to content",
    languageLabel: "Language",
    menu: "Menu",
    close: "Close",
    notice: "No cookies, no tracking — this site collects nothing.",
    noticeDetails: "Details",
  },
  legal: {
    backToSite: "Back to the site",
    imprint: {
      slug: "imprint",
      title: "Legal notice",
      description: "Legal notice under § 5 DDG for chrisguter.com.",
      updated: "August 2026",
      intro: "Information required under § 5 of the German Digital Services Act (DDG).",
      sections: [
        {
          heading: "Responsible for content",
          rows: [
            { term: "Name", value: "Christian Gutermann" },
            { term: "Address", value: "Gärtenwiesen 61" },
            { term: "Postcode, city", value: "76646 Bruchsal" },
            { term: "Country", value: "Germany" },
          ],
        },
        {
          heading: "Contact",
          rows: [{ term: "Email", value: "christian.gutermann95@gmail.com" }],
        },
        {
          heading: "Nature of this site",
          body: [
            "This is a personal website. It presents my professional background and personal projects. It is not operated on behalf of my employer, and nothing on it should be read as a statement by any company I work for or with.",
            "Company and product names belong to their respective owners and are named here only to describe work I was involved in.",
          ],
        },
        {
          heading: "Liability for links",
          body: [
            "This site links to external websites over whose content I have no control. Responsibility for the content of a linked page always rests with its provider or operator. Linked pages were checked for legal issues at the time of linking; no unlawful content was apparent. Continuous monitoring without concrete evidence of an infringement is not reasonable, and I will remove any such link promptly once I become aware of a problem.",
          ],
        },
        {
          heading: "Copyright",
          body: [
            "The content and works created by me on this site are subject to German copyright law. The source code of this website is published separately under the MIT licence; that licence covers the code, not the written content, the photographs, or third-party material.",
          ],
        },
      ],
    },
    privacy: {
      slug: "privacy",
      title: "Privacy",
      description:
        "How this site handles personal data. No cookies, no analytics, no tracking.",
      updated: "August 2026",
      intro:
        "The short version: this site sets no cookies, runs no analytics, embeds nothing from third parties, and asks you for nothing. The detail below explains what unavoidably still happens.",
      sections: [
        {
          heading: "Controller",
          body: [
            "The controller responsible for data processing on this website, within the meaning of the GDPR, is:",
          ],
          rows: [
            { term: "Name", value: "Christian Gutermann" },
            { term: "Address", value: "Gärtenwiesen 61" },
            { term: "Postcode, city", value: "76646 Bruchsal, Germany" },
            { term: "Email", value: "christian.gutermann95@gmail.com" },
          ],
        },
        {
          heading: "Hosting and server logs",
          body: [
            "This site is hosted on GitHub Pages, a service of GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. When you open a page, your browser necessarily transmits data to GitHub's servers, which may record it in log files. This typically includes your IP address, the time of the request, the page requested, the referring page, and your browser and operating system.",
            "This processing is necessary to deliver the site and to keep it secure and stable. The legal basis is Article 6(1)(f) GDPR — my legitimate interest in operating a functioning website. I have no access to these logs and do not evaluate them.",
            "Because GitHub is based in the United States, data may be transferred outside the EU. GitHub is certified under the EU-U.S. Data Privacy Framework. GitHub's own privacy statement applies to their processing.",
          ],
        },
        {
          heading: "Cookies, analytics and tracking",
          body: [
            "None. This site sets no cookies, uses no local or session storage, runs no analytics or tracking of any kind, and contains no advertising, no social media plugins, no embedded videos, and no consent banner — because there is nothing to consent to.",
            "The small notice shown when you arrive is purely informational. It stores nothing — not even the fact that you dismissed it, which is why it may greet you again on your next visit.",
          ],
        },
        {
          heading: "Fonts and assets",
          body: [
            "All fonts, images and scripts are served from this site's own domain. Nothing is loaded from an external content delivery network. In particular, no Google Fonts are requested at page load, so your IP address is not transmitted to Google when you visit.",
          ],
        },
        {
          heading: "Contacting me",
          body: [
            "If you email me, your message and address are processed only to handle your enquiry, on the basis of Article 6(1)(f) GDPR, and are kept no longer than necessary. There is no contact form on this site, so no data is collected here.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "Under the GDPR you have the right to obtain information about the personal data held about you (Art. 15), to have it corrected (Art. 16) or erased (Art. 17), to restrict its processing (Art. 18), to data portability (Art. 20), and to object to processing based on legitimate interests (Art. 21). To exercise any of these, email the address above.",
            "You also have the right to complain to a data protection supervisory authority. The competent authority for Baden-Württemberg is the Landesbeauftragter für den Datenschutz und die Informationsfreiheit Baden-Württemberg.",
          ],
        },
      ],
    },
  },
};
