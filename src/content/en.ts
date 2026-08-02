import type { Content } from "./types";

/* ============================================================================
 * Everything here is drawn from Christian's own CV and application material
 * (E:\dev\ChrisGuterCV) and from the TumbleTree Studios site. Nothing is
 * invented.
 *
 * TONE RULE — read before editing. This site states FACTS about him. It does
 * not signal that he is looking. No "open to roles", no availability banner,
 * no CV download, no "if you are hiring". His current employer can read this
 * page, and everything on it must be true and unremarkable for them to see.
 *
 * STILL NEEDS HIM:
 *   1. legal.imprint — the postal address is a placeholder. § 5 DDG requires a
 *      real, complete address; a P.O. box is not sufficient. Fill it in before
 *      this goes live, and have both legal pages reviewed by someone qualified.
 *   2. evidence "downloads" — Dropigon download figures, if he wants them public.
 *   3. work.projects[].study — the case studies are accurate but could carry
 *      more specifics on the decisions he personally made.
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
      "I build software, run the process around building it, and stay close enough to the code to talk to developers as a peer. Most of the problems I have been paid to solve as an engineer turned out to be coordination problems wearing a technical disguise.",
    roles: [
      { title: "Scrum Master & Software Engineer", org: "CAS Software AG" },
      { title: "Co-founder & Managing Director", org: "TumbleTree Studios UG" },
    ],
    location: "Bruchsal, Germany",
    cta: "Get in touch",
    portraitAlt: "Christian Gutermann, smiling, in a stylised painted portrait.",
    scrollHint: "Scroll",
  },

  marquee: [
    "Scrum",
    "Angular",
    "AI-assisted development",
    "Java",
    "TypeScript",
    "Team Leadership",
    "React",
    "Docker",
    "Jenkins",
    "Flutter",
    "Roadmapping",
    "Kanban",
  ],

  evidence: {
    label: "By the numbers",
    figures: [
      {
        id: "years",
        value: 10,
        label: "Years building software professionally",
        note: "At CAS Software AG since 2015",
      },
      {
        id: "team",
        value: 11,
        label: "People in the team I run",
        note: "Grown from 4, across Germany and Hungary",
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
      {
        id: "stores",
        value: 2,
        label: "App stores I have shipped to",
        note: "Dropigon, January 2026",
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
        name: "Dropigon",
        year: "2026",
        role: "Concept, development, release",
        stack: ["Flutter", "AI-assisted", "App Store", "Google Play"],
        summary:
          "A mobile puzzle game I built alone, from the first idea to launch on both stores.",
        study: {
          constraint:
            "I built Dropigon in the evenings, alongside a full-time role and a young family. A one-person studio shipping to two app stores has no room for work that never reaches players, so every decision had to be justified by whether it moved the game closer to release.",
          decision:
            "I used AI throughout the build — for code, for graphics, and even for the music — and treated the whole thing as a way to find out where these tools genuinely hold up and where they waste time. I owned the entire lifecycle: concept, prioritisation, development, store submissions and the business side of the studio.",
          outcome:
            "Dropigon went live on the App Store and Google Play in January 2026. Doing a project of that scope alone would not have been realistic two years ago, and it is the clearest evidence I have of how far AI shifts what one person can deliver.",
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
        id: "team",
        client: "CAS Software AG",
        name: "Building the Appfactory team",
        year: "2021–",
        role: "Scrum Master",
        stack: ["Scrum", "Kanban", "Jira", "Roadmapping"],
        summary:
          "Taking a newly formed team from four people to eleven, across two countries.",
        study: {
          constraint:
            "The team was new in 2021. Agile process, working relationships and trust were not there at the start — none of it came for free, and it had to be built while the team was also expected to deliver.",
          decision:
            "I took the Scrum Master role and stayed a software engineer in the same team, which meant I could judge the team's maturity honestly and push the next sensible change rather than the next textbook one. I also kept the roadmap aligned with business goals and presented it regularly to department leadership.",
          outcome:
            "The team grew from four developers to seven developers, three working students and a QA tester, spread across Germany and Hungary, and it delivers. The work is essentially consulting turned inward.",
        },
      },
      {
        id: "smartwe-appstore",
        client: "CAS Software AG",
        name: "SmartWe App Store",
        role: "Main developer",
        stack: ["Java", "Angular", "REST", "Docker"],
        summary:
          "A cloud marketplace where CRM customers find and install applications for their own workspace.",
        study: {
          constraint:
            "SmartWe customers needed to extend their CRM without a developer and without a deployment. Installation had to be self-service, reversible, and safe to run against live customer data.",
          decision:
            "As main developer on the platform, the architecture of the install flow and the shape of the extension surface were mine.",
          outcome:
            "The App Store is now the route through which SmartWe customers extend the product themselves.",
        },
      },
      {
        id: "test-framework",
        client: "CAS Software AG",
        name: "UI test automation framework",
        year: "2015–2018",
        role: "Developer",
        stack: ["Java", "Test automation"],
        summary: "Replacing an expensive licensed tool with something built in-house.",
        study: {
          constraint:
            "The department depended on a commercial UI testing tool whose licence cost several thousand euros a year, and the value it returned did not obviously justify that.",
          decision:
            "I built a replacement framework in-house during my dual studies, designed so the team could actually maintain it after I moved on.",
          outcome:
            "It saved several thousand euros a year and is still in production today, which is the part I am most pleased about — it outlasted the person who wrote it.",
        },
      },
      {
        id: "daimler-cpq",
        client: "Daimler Truck",
        name: "CPQ rollout",
        role: "Software engineer",
        stack: ["Java", "CPQ", "REST"],
        summary:
          "Configure-price-quote for commercial vehicle sales, still in use today.",
      },
      {
        id: "bioland",
        client: "Bioland",
        name: "Mein Bioland",
        role: "Software engineer",
        stack: ["Java", "Angular", "Web"],
        summary:
          "The member platform for Germany's leading organic farming association.",
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
        note: "Daily driver for code. Most of Dropigon was written alongside it.",
      },
      {
        id: "chatgpt",
        label: "ChatGPT",
        group: "ai",
        related: ["java"],
        note: "Exploration and rubber-ducking, less so for production code.",
      },
      {
        id: "copilot",
        label: "GitHub Copilot",
        group: "ai",
        related: ["java", "git"],
        note: "In-editor completion across the Java and Angular work.",
      },
      {
        id: "midjourney",
        label: "Midjourney",
        group: "ai",
        related: ["flutter", "figma"],
        note: "Game art for Dropigon — the graphics were AI-assisted too.",
      },
      {
        id: "lmstudio",
        label: "LM Studio",
        group: "ai",
        related: ["docker"],
        note: "Local models. Came out of supervising a thesis on self-hosted, digitally sovereign LLMs.",
      },

      {
        id: "typescript",
        label: "TypeScript",
        group: "engineering",
        related: ["angular", "react"],
      },
      {
        id: "java",
        label: "Java",
        group: "engineering",
        related: ["vaadin", "jenkins"],
        note: "The backend language across most of the CAS work.",
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
        related: ["claude"],
        note: "Dropigon, and the children's learning app in progress.",
      },
      { id: "sql", label: "SQL", group: "engineering", related: ["java"] },
      { id: "vaadin", label: "Vaadin", group: "engineering", related: ["java"] },

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
        related: ["docker", "java"],
        note: "CI/CD pipelines — making the path to production boring.",
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
    ],
  },

  timeline: {
    label: "Timeline",
    heading: "Engineer, then the person responsible for how engineers work.",
    status: { shipped: "Completed", active: "Ongoing" },
    entries: [
      {
        id: "tumbletree",
        title: "Co-founder & Managing Director",
        org: "TumbleTree Studios UG",
        start: "Oct 2025",
        end: "Now",
        status: "active",
        body: "Founded alongside my day job with Pascal Stäb, mainly as a way to keep developing on real projects. I built and released our first game, Dropigon, on my own. A second product, a learning game for children, is in development.",
      },
      {
        id: "scrum-master",
        title: "Scrum Master & Software Engineer",
        org: "CAS Software AG · Appfactory",
        start: "Apr 2021",
        end: "Now",
        status: "active",
        body: "Took on a newly formed team and grew it from four people to eleven across Germany and Hungary. I own the roadmap, present it to department leadership, keep the direct line to customers, and still write code — which is what lets me talk to developers as a peer rather than about them.",
      },
      {
        id: "engineer-appfactory",
        title: "Software Engineer",
        org: "CAS Software AG · Appfactory",
        start: "May 2020",
        end: "Apr 2021",
        status: "shipped",
        body: "Frontend work, mostly Angular, plus Docker and the CI/CD pipelines. Mentored new joiners and stood in as deputy Scrum Master, which is how the later role started.",
      },
      {
        id: "engineer-education",
        title: "Software Engineer",
        org: "CAS Software AG · Education",
        start: "Oct 2018",
        end: "May 2020",
        status: "shipped",
        body: "Full-stack work on student administration systems for universities — enrolment, grades, and communication with students. Helped modernise the department's technology stack.",
      },
      {
        id: "bachelor",
        title: "BSc Computer Science · Dual studies",
        org: "DHBW Karlsruhe & CAS Software AG",
        start: "Sep 2015",
        end: "Oct 2018",
        status: "shipped",
        body: "Three years of writing production code and sitting exams in the same week. It is the reason I have never thought of theory and shipping as separate activities. Graduated 1.7.",
      },
    ],
  },

  principles: {
    label: "How I work",
    heading: "Four things I believe, that you could argue with.",
    intro: "These are positions, not adjectives. Each one cost me something to learn.",
    items: [
      {
        id: "deploy",
        title: "A team that is afraid to deploy makes worse decisions",
        body: "The CI/CD work I have done — Jenkins, Docker, automating the path to production — was never really a tooling project. When shipping is frightening, people batch changes, avoid refactors, and defer the risky thing until it is riskier. Making deployment boring is the highest-leverage change available to most teams.",
      },
      {
        id: "blockers",
        title: "A standup that reports status is a meeting, not a tool",
        body: 'Getting a team to the point where someone will say "I have been stuck since Monday" in front of everyone took me far longer than learning any framework. It is also the only version of the ceremony that pays for itself.',
      },
      {
        id: "ai",
        title: "You only learn where AI stops helping by shipping with it",
        body: "I did not learn the limits of these tools from slides. I built and released a game with them — code, graphics, even the music — and found out first-hand which parts hold up under real deadlines and which are a waste of an evening. The interesting work now is getting requirements sharp enough that an agent can actually act on them.",
      },
      {
        id: "coordination",
        title: "Most engineering problems are coordination problems",
        body: "This is the throughline of the last ten years, and the reason I moved from writing software to being responsible for how it gets written. The architecture usually reflects how the people building it talk to each other. Fix that and a surprising number of technical problems stop recurring.",
      },
    ],
  },

  about: {
    label: "Off the clock",
    heading: "Away from the keyboard",
    body: [
      "I train and hike with my dog, which is the part of the week that reliably gets me outside.",
      "Our daughter is one, and most of what is left goes to her and my wife. It is a good chapter.",
      "Otherwise: competitive gaming, cooking, and a guitar I am still not as good at as I would like to be.",
    ],
  },

  contact: {
    label: "Contact",
    heading: "Say hello.",
    body: "Always happy to talk about software, teams, or where AI actually earns its keep. Email reaches me fastest.",
    email: "christian.gutermann95@gmail.com",
    emailLabel: "Email",
    socials: [
      { label: "GitHub", href: "https://github.com/ChrisGuter" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/chrisguter" },
    ],
  },

  footer: {
    rights: "All rights reserved.",
    colophon:
      "Set in Bricolage Grotesque and Geist. Colours sampled from the portrait. Built with React and Vite, prerendered to static HTML.",
    source: "Source on GitHub",
  },

  ui: {
    skipToContent: "Skip to content",
    themeToggle: "Toggle colour theme",
    languageLabel: "Language",
    menu: "Menu",
    close: "Close",
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
            { term: "Address", value: "[STREET AND NUMBER] — please complete" },
            { term: "Postcode, city", value: "[POSTCODE] Bruchsal" },
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
            { term: "Address", value: "[STREET AND NUMBER] — please complete" },
            { term: "Postcode, city", value: "[POSTCODE] Bruchsal, Germany" },
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
