import type { Content } from "./types";

/* ============================================================================
 * The German file is structurally locked to en.ts: same keys, same array
 * lengths, same order, same ids, and the same non-prose values — figure values
 * and affixes, project clients, names, years, stacks and hrefs, media keys,
 * skill groups and edges, legal slugs. Only human-visible prose differs. If you
 * add a field to one locale, add it to the other in the same position: the type
 * will not catch a reordering, but a reader comparing the two files will.
 *
 * TONE RULE — read before editing. This site states FACTS about him. Nothing
 * on it may read as an active job search: no line about being open to roles,
 * no CV download.
 *
 * German is the legally operative language for the two legal pages, so those
 * are written as German legal text rather than translated from the English.
 * Both still need a real postal address (§ 5 DDG) and a qualified review.
 * ========================================================================== */

export const de: Content = {
  meta: {
    title: "Christian Gutermann — Softwareentwickler, Scrum Master, KI-Enthusiast",
    description:
      "Scrum Master und Softwareentwickler bei Karlsruhe. Zehn Jahre Erfahrung im Bauen von Software und im Aufbau von Teams. Mitgründer von TumbleTree Studios.",
    ogAlt: "Christian Gutermann — Softwareentwickler, Scrum Master, KI-Enthusiast.",
  },

  nav: [
    { id: "work", label: "Arbeiten" },
    { id: "skills", label: "Kompetenzen" },
    { id: "timeline", label: "Werdegang" },
    { id: "contact", label: "Kontakt" },
  ],

  hero: {
    name: "Christian Gutermann",
    tagline: "Software Engineer · Scrum Master · AI Enthusiast",
    thesis:
      "Ich baue Software, verantworte den Prozess drumherum und bleibe nah genug am Code, um mit Entwicklern auf Augenhöhe zu sprechen. Die meisten Probleme, für deren Lösung ich als Entwickler bezahlt wurde, waren am Ende Abstimmungsprobleme in technischer Verkleidung.",
    roles: [
      { title: "Scrum Master & Softwareentwickler", org: "CAS Software AG" },
      { title: "Mitgründer & Geschäftsführer", org: "TumbleTree Studios UG" },
    ],
    location: "Bruchsal, Deutschland",
    cta: "Kontakt aufnehmen",
    portraitAlt:
      "Christian Gutermann, lächelnd, in einem stilisierten gemalten Porträt.",
    scrollHint: "Scrollen",
  },

  marquee: [
    "Scrum",
    "Angular",
    "KI-gestützte Entwicklung",
    "Java",
    "TypeScript",
    "Teamführung",
    "React",
    "Docker",
    "Jenkins",
    "Flutter",
    "Roadmap-Planung",
    "Kanban",
  ],

  evidence: {
    label: "In Zahlen",
    figures: [
      {
        id: "years",
        value: 10,
        label: "Jahre professionelle Softwareentwicklung",
        note: "Bei der CAS Software AG seit 2015",
      },
      {
        id: "team",
        value: 11,
        label: "Menschen im Team, das ich führe",
        note: "Aus vier gewachsen, in Deutschland und Ungarn",
      },
      {
        id: "projects",
        value: 10,
        prefix: "",
        suffix: "+",
        label: "Aktive Projekte in meiner Verantwortung",
        note: "Inklusive ihrer Budgets",
      },
      {
        id: "theses",
        value: 2,
        label: "Betreute Bachelorarbeiten",
        note: "DHBW Karlsruhe, 2023 und 2024",
      },
      {
        id: "stores",
        value: 2,
        label: "App Stores, in denen ich veröffentlicht habe",
        note: "Dropigon, Januar 2026",
      },
      // Nur ausfüllen, wenn die Zahl öffentlich sein soll.
      {
        id: "downloads",
        value: null,
        label: "Dropigon-Downloads",
        note: "App Store und Google Play",
      },
    ],
  },

  work: {
    label: "Ausgewählte Arbeiten",
    heading: "Produkte, die ich gebaut habe – und was ich daran wirklich getan habe.",
    intro:
      "Unternehmenssoftware für deutsche Firmen und Institutionen, dazu ein Mobile Game, das ich über mein eigenes Studio von der Idee bis zum Release selbst gebaut habe.",
    readMore: "Fallstudie lesen",
    close: "Schließen",
    headers: {
      client: "Kunde",
      role: "Rolle",
      year: "Jahr",
      stack: "Stack",
      constraint: "Die Rahmenbedingung",
      decision: "Meine Entscheidung",
      outcome: "Was sich geändert hat",
    },
    projects: [
      {
        id: "dropigon",
        client: "TumbleTree Studios UG",
        name: "Dropigon",
        year: "2026",
        role: "Konzept, Entwicklung, Release",
        stack: ["Flutter", "AI-assisted", "App Store", "Google Play"],
        summary:
          "Ein mobiles Puzzlespiel, das ich allein gebaut habe – von der ersten Idee bis zur Veröffentlichung in beiden Stores.",
        study: {
          constraint:
            "Dropigon ist abends entstanden, neben einer Vollzeitstelle und einer jungen Familie. Ein Ein-Personen-Studio, das in zwei App Stores veröffentlicht, hat keinen Spielraum für Arbeit, die nie bei Spielern ankommt: Jede Entscheidung musste sich daran messen lassen, ob sie das Spiel näher an den Release bringt.",
          decision:
            "Ich habe durchgehend mit KI gearbeitet – für den Code, für die Grafik und sogar für die Musik – und das Projekt zugleich als Prüfstand benutzt, um herauszufinden, wo diese Werkzeuge wirklich tragen und wo sie Zeit verbrennen. Der gesamte Lebenszyklus lag bei mir: Konzept, Priorisierung, Entwicklung, Store-Einreichungen und die kaufmännische Seite des Studios.",
          outcome:
            "Dropigon ist im Januar 2026 im App Store und bei Google Play erschienen. Ein Projekt dieser Größe allein zu stemmen wäre vor zwei Jahren nicht realistisch gewesen – es ist der deutlichste Beleg dafür, wie stark KI verschiebt, was eine einzelne Person liefern kann.",
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
          alt: "Dropigon-Spielszene: farbige Polygone stapeln sich auf einem dunklen Spielfeld, dazu Punktestand und Highscore.",
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
          "Ein frisch zusammengestelltes Team von vier auf elf Personen bringen, verteilt über zwei Länder.",
        study: {
          constraint:
            "Das Team war 2021 neu. Agiler Prozess, Zusammenarbeit und Vertrauen waren am Anfang nicht da – nichts davon gab es geschenkt, und aufgebaut werden musste es, während das Team gleichzeitig liefern sollte.",
          decision:
            "Ich habe die Rolle des Scrum Masters übernommen und bin im selben Team Softwareentwickler geblieben. Dadurch konnte ich den Reifegrad des Teams ehrlich einschätzen und jeweils die nächste sinnvolle Veränderung anstoßen statt der nächsten aus dem Lehrbuch. Parallel halte ich die Roadmap an den Unternehmenszielen ausgerichtet und stelle sie regelmäßig der Abteilungsleitung vor.",
          outcome:
            "Aus vier Entwicklern sind sieben Entwickler, drei Werkstudenten und ein QA-Tester geworden, verteilt auf Deutschland und Ungarn – und das Team liefert. Im Kern ist die Arbeit Beratung, nur nach innen gerichtet.",
        },
      },
      {
        id: "smartwe-appstore",
        client: "CAS Software AG",
        name: "SmartWe App Store",
        role: "Hauptentwickler",
        stack: ["Java", "Angular", "REST", "Docker"],
        summary:
          "Ein Cloud-Marktplatz, auf dem CRM-Kunden Anwendungen für ihren eigenen Arbeitsbereich finden und installieren.",
        study: {
          constraint:
            "SmartWe-Kunden sollten ihr CRM erweitern können – ohne Entwickler und ohne Deployment. Die Installation musste in Eigenregie funktionieren, jederzeit umkehrbar sein und sich gefahrlos auf laufende Kundendaten anwenden lassen.",
          decision:
            "Als Hauptentwickler der Plattform lagen die Architektur des Installationsablaufs und der Zuschnitt der Erweiterungsschnittstelle bei mir.",
          outcome:
            "Der App Store ist heute der Weg, über den SmartWe-Kunden das Produkt selbst erweitern.",
        },
      },
      {
        id: "test-framework",
        client: "CAS Software AG",
        name: "UI test automation framework",
        year: "2015–2018",
        role: "Entwickler",
        stack: ["Java", "Test automation"],
        summary: "Ein teures Lizenzwerkzeug durch eine selbst gebaute Lösung ersetzen.",
        study: {
          constraint:
            "Die Abteilung hing an einem kommerziellen Werkzeug für UI-Tests, dessen Lizenz mehrere tausend Euro im Jahr kostete – und der Gegenwert rechtfertigte diesen Preis erkennbar nicht.",
          decision:
            "Ich habe während meines dualen Studiums ein eigenes Framework als Ersatz gebaut, bewusst so geschnitten, dass das Team es nach meinem Weggang auch tatsächlich warten konnte.",
          outcome:
            "Es spart mehrere tausend Euro im Jahr und läuft bis heute in Produktion. Das ist der Teil, über den ich mich am meisten freue: Es hat denjenigen überdauert, der es geschrieben hat.",
        },
      },
      {
        id: "daimler-cpq",
        client: "Daimler Truck",
        name: "CPQ rollout",
        role: "Softwareentwickler",
        stack: ["Java", "CPQ", "REST"],
        summary:
          "Configure-Price-Quote für den Nutzfahrzeugvertrieb, bis heute im Einsatz.",
      },
      {
        id: "bioland",
        client: "Bioland",
        name: "Mein Bioland",
        role: "Softwareentwickler",
        stack: ["Java", "Angular", "Web"],
        summary:
          "Die Mitgliederplattform des führenden deutschen Anbauverbands für ökologischen Landbau.",
      },
    ],
  },

  skills: {
    label: "Kompetenzen",
    heading: "Womit ich arbeite – und wie es zusammenhängt.",
    intro:
      "Gruppiert nach Einsatzzweck, nicht danach, wie gut ich es beherrsche. Die Linien zeigen, was im Alltag tatsächlich zusammenkommt – wählen Sie einen Knoten, um zu sehen, wo.",
    hint: "Knoten auswählen, um seine Verbindungen zu verfolgen",
    groups: [
      { id: "ai", label: "KI", accent: "ember" },
      { id: "engineering", label: "Entwicklung", accent: "azure" },
      { id: "delivery", label: "Delivery", accent: "violet" },
      { id: "leadership", label: "Führung", accent: "rust" },
    ],
    nodes: [
      {
        id: "claude",
        label: "Claude",
        group: "ai",
        related: ["typescript", "flutter"],
        note: "Tägliches Werkzeug beim Programmieren. Dropigon ist größtenteils damit zusammen entstanden.",
      },
      {
        id: "chatgpt",
        label: "ChatGPT",
        group: "ai",
        related: ["java"],
        note: "Zum Ausprobieren und lauten Denken, weniger für Produktivcode.",
      },
      {
        id: "copilot",
        label: "GitHub Copilot",
        group: "ai",
        related: ["java", "git"],
        note: "Vervollständigung direkt im Editor, quer durch die Java- und Angular-Arbeit.",
      },
      {
        id: "midjourney",
        label: "Midjourney",
        group: "ai",
        related: ["flutter", "figma"],
        note: "Spielgrafik für Dropigon – auch die Artworks sind KI-gestützt entstanden.",
      },
      {
        id: "lmstudio",
        label: "LM Studio",
        group: "ai",
        related: ["docker"],
        note: "Lokale Modelle. Entstanden aus der Betreuung einer Bachelorarbeit über selbst gehostete, digital souveräne LLMs.",
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
        note: "Die Backend-Sprache in nahezu der gesamten Arbeit bei CAS.",
      },
      {
        id: "angular",
        label: "Angular",
        group: "engineering",
        related: ["typescript"],
        note: "Der Großteil der Frontend-Arbeit in der Appfactory.",
      },
      { id: "react", label: "React", group: "engineering", related: ["typescript"] },
      {
        id: "flutter",
        label: "Flutter",
        group: "engineering",
        related: ["claude"],
        note: "Dropigon – und die Lern-App für Kinder, die gerade entsteht.",
      },
      { id: "sql", label: "SQL", group: "engineering", related: ["java"] },
      { id: "vaadin", label: "Vaadin", group: "engineering", related: ["java"] },

      {
        id: "scrum",
        label: "Scrum",
        group: "delivery",
        related: ["facilitation", "jira"],
        note: "Alle Ceremonies, dazu teamübergreifende Formate auf Abteilungsebene.",
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
        note: "CI/CD-Pipelines – den Weg in die Produktion langweilig machen.",
      },
      {
        id: "docker",
        label: "Docker",
        group: "delivery",
        related: ["jenkins"],
        note: "Containerisierte Umgebungen quer durch die Projekte der Appfactory.",
      },
      { id: "git", label: "Git", group: "delivery", related: ["jenkins"] },
      { id: "figma", label: "Figma", group: "delivery", related: ["midjourney"] },

      {
        id: "facilitation",
        label: "Moderation",
        group: "leadership",
        related: ["scrum"],
        note: "Dailies, Plannings, Retros, Reviews – und teamübergreifende Sessions.",
      },
      {
        id: "mentoring",
        label: "Mentoring",
        group: "leadership",
        related: ["scrum"],
        note: "Einarbeitung neuer Teammitglieder und die Betreuung von zwei Bachelorarbeiten.",
      },
      {
        id: "roadmapping",
        label: "Roadmap-Planung",
        group: "leadership",
        related: ["jira"],
        note: "Die Entwicklung an den Unternehmenszielen ausrichten und das Ergebnis der Abteilungsleitung vorstellen.",
      },
      {
        id: "stakeholders",
        label: "Kundenkontakt",
        group: "leadership",
        related: ["roadmapping"],
        note: "Direkter Draht zu den Kunden ab Projektstart – wenn Daimler Truck oder Bioland eine technische Frage hat, klingelt mein Telefon.",
      },
      {
        id: "growth",
        label: "Teamaufbau",
        group: "leadership",
        related: ["mentoring"],
        note: "Von vier auf elf Personen, verteilt über zwei Länder.",
      },
    ],
  },

  timeline: {
    label: "Werdegang",
    heading: "Erst Entwickler, dann verantwortlich dafür, wie Entwickler arbeiten.",
    status: { shipped: "Abgeschlossen", active: "Laufend" },
    entries: [
      {
        id: "tumbletree",
        title: "Mitgründer & Geschäftsführer",
        org: "TumbleTree Studios UG",
        start: "Okt. 2025",
        end: "Heute",
        status: "active",
        body: "Neben dem Hauptberuf gemeinsam mit Pascal Stäb gegründet, vor allem, um an echten Projekten weiterzuentwickeln. Unser erstes Spiel, Dropigon, habe ich allein gebaut und veröffentlicht. Ein zweites Produkt, ein Lernspiel für Kinder, ist in Entwicklung.",
      },
      {
        id: "scrum-master",
        title: "Scrum Master & Softwareentwickler",
        org: "CAS Software AG · Appfactory",
        start: "Apr. 2021",
        end: "Heute",
        status: "active",
        body: "Ein neu zusammengestelltes Team übernommen und von vier auf elf Personen in Deutschland und Ungarn aufgebaut. Ich verantworte die Roadmap, stelle sie der Abteilungsleitung vor, halte den direkten Draht zu den Kunden – und schreibe weiterhin selbst Code. Genau das erlaubt mir, mit Entwicklern auf Augenhöhe zu reden statt über sie.",
      },
      {
        id: "engineer-appfactory",
        title: "Softwareentwickler",
        org: "CAS Software AG · Appfactory",
        start: "Mai 2020",
        end: "Apr. 2021",
        status: "shipped",
        body: "Frontend-Arbeit, überwiegend Angular, dazu Docker und die CI/CD-Pipelines. Ich habe neue Kolleginnen und Kollegen eingearbeitet und als stellvertretender Scrum Master ausgeholfen – so hat die spätere Rolle angefangen.",
      },
      {
        id: "engineer-education",
        title: "Softwareentwickler",
        org: "CAS Software AG · Education",
        start: "Okt. 2018",
        end: "Mai 2020",
        status: "shipped",
        body: "Full-Stack-Arbeit an Verwaltungssystemen für Hochschulen – Immatrikulation, Noten und die Kommunikation mit Studierenden. Dazu die Modernisierung des Technologie-Stacks der Abteilung.",
      },
      {
        id: "bachelor",
        title: "B. Sc. Informatik · Duales Studium",
        org: "DHBW Karlsruhe & CAS Software AG",
        start: "Sep. 2015",
        end: "Okt. 2018",
        status: "shipped",
        body: "Drei Jahre lang Code für die Produktion schreiben und in derselben Woche Klausuren bestehen. Deshalb waren Theorie und Auslieferung für mich nie zwei getrennte Dinge. Abschluss mit 1,7.",
      },
    ],
  },

  principles: {
    label: "Arbeitsweise",
    heading: "Vier Überzeugungen, über die man streiten kann.",
    intro:
      "Das sind Positionen, keine Adjektive. Jede einzelne hat mich etwas gekostet.",
    items: [
      {
        id: "deploy",
        title: "Ein Team, das Angst vor dem Deployment hat, entscheidet schlechter",
        body: "Bei der ganzen CI/CD-Arbeit – Jenkins, Docker, den Weg in die Produktion automatisieren – ging es nie wirklich um Werkzeuge. Wenn das Ausliefern Angst macht, sammeln Leute Änderungen an, vermeiden Refactorings und schieben das Riskante so lange auf, bis es noch riskanter ist. Deployments langweilig zu machen ist die wirksamste Veränderung, die den meisten Teams offensteht.",
      },
      {
        id: "blockers",
        title:
          "Ein Standup, in dem Status berichtet wird, ist ein Termin, kein Werkzeug",
        body: "Ein Team so weit zu bringen, dass jemand vor allen anderen sagt „Ich komme seit Montag nicht weiter“, hat mich deutlich länger gekostet als jedes Framework, das ich je gelernt habe. Es ist zugleich die einzige Variante dieses Rituals, die sich rechnet.",
      },
      {
        id: "ai",
        title: "Wo KI aufhört zu helfen, merkt man erst, wenn man damit ausliefert",
        body: "Die Grenzen dieser Werkzeuge habe ich nicht von Folien gelernt. Ich habe ein Spiel damit gebaut und veröffentlicht – Code, Grafik, sogar die Musik – und dabei aus erster Hand gesehen, was unter echten Terminen trägt und was ein verlorener Abend ist. Die eigentlich spannende Arbeit besteht inzwischen darin, Anforderungen so scharf zu formulieren, dass ein Agent wirklich damit arbeiten kann.",
      },
      {
        id: "coordination",
        title: "Die meisten technischen Probleme sind Abstimmungsprobleme",
        body: "Das ist die Linie durch die letzten zehn Jahre und der Grund, warum ich vom Schreiben von Software dazu gewechselt bin, dafür verantwortlich zu sein, wie sie geschrieben wird. Die Architektur bildet meistens ab, wie die Menschen dahinter miteinander reden. Bringt man das in Ordnung, hören erstaunlich viele technische Probleme auf, wiederzukehren.",
      },
    ],
  },

  about: {
    label: "Nach Feierabend",
    heading: "Abseits der Tastatur",
    body: [
      "Ich trainiere und wandere mit meinem Hund – der Teil der Woche, der mich zuverlässig nach draußen bringt.",
      "Unsere Tochter ist ein Jahr alt, und der größte Teil der übrigen Zeit gehört ihr und meiner Frau. Ein gutes Kapitel.",
      "Ansonsten: kompetitives Gaming, Kochen und eine Gitarre, auf der ich immer noch nicht so gut bin, wie ich gern wäre.",
    ],
  },

  contact: {
    label: "Kontakt",
    heading: "Melden Sie sich.",
    body: "Ich rede jederzeit gern über Software, über Teams und darüber, wo KI wirklich etwas einbringt. Am schnellsten erreichen Sie mich per E-Mail.",
    email: "christian.gutermann95@gmail.com",
    emailLabel: "E-Mail",
    socials: [
      { label: "GitHub", href: "https://github.com/ChrisGuter" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/chrisguter" },
    ],
  },

  footer: {
    rights: "Alle Rechte vorbehalten.",
    colophon:
      "Gesetzt in Bricolage Grotesque und Geist. Farben aus dem Porträt entnommen. Gebaut mit React und Vite, als statisches HTML vorgerendert.",
    source: "Quellcode auf GitHub",
  },

  ui: {
    skipToContent: "Zum Inhalt springen",
    themeToggle: "Farbschema wechseln",
    languageLabel: "Sprache",
    menu: "Menü",
    close: "Schließen",
  },

  legal: {
    backToSite: "Zurück zur Website",

    imprint: {
      slug: "imprint",
      title: "Impressum",
      description: "Impressum gemäß § 5 DDG für chrisguter.com.",
      updated: "August 2026",
      intro: "Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz).",
      sections: [
        {
          heading: "Verantwortlich für den Inhalt",
          rows: [
            { term: "Name", value: "Christian Gutermann" },
            { term: "Anschrift", value: "[STRASSE UND HAUSNUMMER] — bitte ergänzen" },
            { term: "PLZ, Ort", value: "[PLZ] Bruchsal" },
            { term: "Land", value: "Deutschland" },
          ],
        },
        {
          heading: "Kontakt",
          rows: [{ term: "E-Mail", value: "christian.gutermann95@gmail.com" }],
        },
        {
          heading: "Charakter dieser Website",
          body: [
            "Dies ist eine private Website. Sie stellt meinen beruflichen Werdegang und meine eigenen Projekte dar. Sie wird nicht im Auftrag meines Arbeitgebers betrieben, und nichts auf ihr ist als Äußerung eines Unternehmens zu verstehen, für das oder mit dem ich arbeite.",
            "Firmen- und Produktnamen stehen den jeweiligen Rechteinhabern zu und werden hier ausschließlich genannt, um Arbeiten zu beschreiben, an denen ich beteiligt war.",
          ],
        },
        {
          heading: "Haftung für Links",
          body: [
            "Diese Website verweist auf externe Websites, auf deren Inhalte ich keinen Einfluss habe. Für die Inhalte einer verlinkten Seite ist stets deren Anbieter oder Betreiber verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft; rechtswidrige Inhalte waren nicht erkennbar. Eine dauerhafte inhaltliche Kontrolle ist ohne konkrete Anhaltspunkte für eine Rechtsverletzung nicht zumutbar. Werde ich auf eine Rechtsverletzung aufmerksam, entferne ich den betreffenden Link umgehend.",
          ],
        },
        {
          heading: "Urheberrecht",
          body: [
            "Die von mir erstellten Inhalte und Werke auf dieser Website unterliegen dem deutschen Urheberrecht. Der Quellcode dieser Website ist gesondert unter der MIT-Lizenz veröffentlicht; diese Lizenz erfasst den Code, nicht jedoch die Texte, die Fotografien oder Material Dritter.",
          ],
        },
      ],
    },

    privacy: {
      slug: "privacy",
      title: "Datenschutzerklärung",
      description:
        "Wie diese Website mit personenbezogenen Daten umgeht: keine Cookies, keine Analyse, kein Tracking.",
      updated: "August 2026",
      intro:
        "Kurz gefasst: Diese Website setzt keine Cookies, betreibt keine Analyse, bindet nichts von Dritten ein und fragt Sie nach nichts. Was sich technisch dennoch nicht vermeiden lässt, steht im Einzelnen darunter.",
      sections: [
        {
          heading: "Verantwortlicher",
          body: [
            "Verantwortlicher im Sinne der DSGVO für die Datenverarbeitung auf dieser Website ist:",
          ],
          rows: [
            { term: "Name", value: "Christian Gutermann" },
            { term: "Anschrift", value: "[STRASSE UND HAUSNUMMER] — bitte ergänzen" },
            { term: "PLZ, Ort", value: "[PLZ] Bruchsal, Deutschland" },
            { term: "E-Mail", value: "christian.gutermann95@gmail.com" },
          ],
        },
        {
          heading: "Hosting und Server-Logfiles",
          body: [
            "Diese Website wird bei GitHub Pages gehostet, einem Dienst der GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. Beim Aufruf einer Seite übermittelt Ihr Browser zwangsläufig Daten an die Server von GitHub, die sie in Logfiles speichern können. Dazu gehören in der Regel Ihre IP-Adresse, der Zeitpunkt der Anfrage, die aufgerufene Seite, die verweisende Seite sowie Browser und Betriebssystem.",
            "Diese Verarbeitung ist erforderlich, um die Website auszuliefern und sie sicher und stabil zu betreiben. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO – mein berechtigtes Interesse am Betrieb einer funktionsfähigen Website. Ich habe keinen Zugriff auf diese Logfiles und werte sie nicht aus.",
            "Da GitHub seinen Sitz in den Vereinigten Staaten hat, können dabei Daten außerhalb der EU verarbeitet werden. GitHub ist unter dem EU-U.S. Data Privacy Framework zertifiziert. Für die Verarbeitung durch GitHub gilt deren eigene Datenschutzerklärung.",
          ],
        },
        {
          heading: "Cookies, Analyse und Tracking",
          body: [
            "Nichts davon. Diese Website setzt keine Cookies, nutzt weder Local noch Session Storage, betreibt keinerlei Analyse oder Tracking und enthält weder Werbung noch Social-Media-Plugins, eingebettete Videos oder ein Consent-Banner – weil es nichts gibt, worin Sie einwilligen müssten.",
          ],
        },
        {
          heading: "Schriften und eingebundene Dateien",
          body: [
            "Sämtliche Schriften, Bilder und Skripte werden von der eigenen Domain dieser Website ausgeliefert. Es wird nichts von einem externen Content Delivery Network nachgeladen. Insbesondere werden beim Seitenaufruf keine Google Fonts angefordert, sodass Ihre IP-Adresse nicht an Google übermittelt wird.",
          ],
        },
        {
          heading: "Kontaktaufnahme",
          body: [
            "Wenn Sie mir schreiben, verarbeite ich Ihre Nachricht und Ihre Adresse ausschließlich zur Bearbeitung Ihres Anliegens, auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO, und speichere sie nicht länger als nötig. Ein Kontaktformular gibt es auf dieser Website nicht, hier werden also keine Daten erhoben.",
          ],
        },
        {
          heading: "Ihre Rechte",
          body: [
            "Nach der DSGVO haben Sie das Recht auf Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15), auf Berichtigung (Art. 16) und Löschung (Art. 17), auf Einschränkung der Verarbeitung (Art. 18), auf Datenübertragbarkeit (Art. 20) sowie auf Widerspruch gegen eine Verarbeitung, die auf berechtigten Interessen beruht (Art. 21). Für die Ausübung dieser Rechte genügt eine E-Mail an die oben genannte Adresse.",
            "Darüber hinaus steht Ihnen ein Beschwerderecht bei einer Aufsichtsbehörde zu. Zuständig ist der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg.",
          ],
        },
      ],
    },
  },
};
