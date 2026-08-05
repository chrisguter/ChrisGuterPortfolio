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
 *
 * timeline.entries[].details are taken from his German CV rather than
 * translated back from the English, so they carry his own wording.
 * ========================================================================== */

export const de: Content = {
  meta: {
    title: "Christian Gutermann – Software Engineer, Scrum Master, AI Enthusiast",
    description:
      "Scrum Master und Software Engineer aus dem Raum Karlsruhe. Zehn Jahre Erfahrung darin, Software zu bauen und Teams aufzubauen. Mitgründer von TumbleTree Studios.",
    ogAlt: "Christian Gutermann – Software Engineer, Scrum Master, AI Enthusiast.",
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
      "Seit über zehn Jahren baue ich Software, erst als Engineer, inzwischen als Scrum Master. Ich bleibe nah an der Technik und schreibe selbst Code. Was mich aber vor allem antreibt: Teams auf ein gemeinsames Ziel auszurichten, Blocker aus dem Weg zu räumen und dafür zu sorgen, dass wir die richtigen Dinge richtig bauen.",
    roles: [
      { title: "Scrum Master & Software Engineer", org: "CAS Software AG" },
      { title: "Mitgründer & CEO", org: "TumbleTree Studios UG" },
    ],
    location: "Bruchsal, Deutschland",
    cta: "Kontakt aufnehmen",
    portraitAlt: "Christian Gutermann, lächelnd, im dunklen Pullover.",
    scrollHint: "Scrollen",
  },

  /* „Produktdesign“ statt „UI/UX“: der Begriff deckt Oberfläche und Erlebnis in
     einem Wort ab und ist das, was jemand beanspruchen würde, der die gesamte
     sichtbare Seite eines Spiels entworfen und ausgeliefert hat. „Moderation“
     ist im Deutschen der etablierte Begriff für das Führen von Workshops und
     Ceremonies — hier ohne den Beiklang von Inhaltsmoderation, den das
     englische Wort mitbrächte. */
  marquee: [
    "Scrum",
    "KI-gestützte Entwicklung",
    "Produktmanagement",
    "Teamführung",
    "Full-Stack-Entwicklung",
    "Moderation",
    "Produktdesign",
    "Kanban",
    "App-Entwicklung",
    "Roadmap-Planung",
    "DevOps",
    "Mentoring",
    "Agile Entwicklung",
    "Stakeholder-Management",
  ],

  evidence: {
    label: "In Zahlen",
    figures: [
      {
        id: "years",
        value: 10,
        suffix: "+",
        label: "Jahre Softwareentwicklung",
        note: "Bei der CAS Software AG seit 2015",
      },
      {
        id: "team",
        value: 11,
        label: "Menschen in meinem Team",
        note: "Von vier auf elf gewachsen, verteilt über Deutschland und Ungarn",
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
    heading: "Produkte, die ich gebaut habe, und was ich daran wirklich gemacht habe.",
    intro:
      "Unternehmenssoftware für deutsche Firmen und Institutionen, dazu ein Mobile Game, das ich mit meinem eigenen Studio von der Idee bis zum Release selbst gebaut habe.",
    readMore: "Fallstudie lesen",
    close: "Schließen",
    clientsLabel: "Organisationen, für die ich Software gebaut habe",
    clients: [
      { src: "tumbletree", name: "TumbleTree Studios" },
      { src: "cas", name: "CAS Software AG" },
      { src: "bioland", name: "Bioland" },
      { src: "daimler", name: "Daimler Truck" },
      { src: "dbe", name: "Deutsche Bahn Energie" },
      { src: "datev", name: "DATEV" },
      { src: "kit", name: "Karlsruher Institut für Technologie" },
    ],
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
        clientLogo: "tumbletree",
        name: "Dropigon",
        year: "2026",
        role: "Konzept, Entwicklung, Release",
        stack: ["Flutter", "Dart", "Flame", "Firebase", "AI-assisted", "Mobile App"],
        summary:
          "Ein Drop-&-Merge-Puzzlespiel, kostenlos im App Store und bei Google Play. Komplett allein entwickelt.",
        study: {
          constraint:
            "Dropigon war zuerst ein Machbarkeitstest: Wie groß ist der Aufwand wirklich, eine App bis in die Stores zu bringen? Und ganz ehrlich: Ich wollte auch einfach schon immer eine eigene App haben, die ich mit Freunden teilen kann. Das Ganze musste abends passieren, neben Vollzeitjob und junger Familie. Was das Spiel nicht Richtung Release bewegt hat, ist rausgeflogen.",
          decision:
            "Flutter mit Flame und der Forge2D-Physik fürs Spiel, Firebase für das globale Leaderboard, Werbung über AdMob und der Ad-Free-Kauf über die Stores. KI steckte in fast jedem Schritt: Copilot als ständiger Begleiter im Code (später Claude Code, nachdem Copilot sein Kontingent über Nacht zusammengestrichen hatte), die Grafiken aus Midjourney von Hand nachbearbeitet, die komplette Musik aus Suno.",
          outcome:
            "Der erste spielbare Prototyp stand nach wenigen Tagen. Der Feinschliff hat deutlich länger gedauert. KI-Vorschläge für Physik-Werte klangen plausibel, fühlten sich im Spiel aber falsch an. Fallgeschwindigkeit und Mergeverhalten habe ich in vielen Testrunden von Hand nachjustiert. Seit Januar 2026 ist das Spiel in beiden Stores live, und ich weiß aus erster Hand, wo diese Werkzeuge tragen und wo sie aufhören.",
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
        id: "bioland",
        client: "Bioland",
        clientLogo: "bioland",
        name: "Mein Bioland",
        role: "Projektleiter, Software Engineer",
        stack: ["Java", "Angular", "REST", "Kubernetes", "Jenkins"],
        summary:
          "Die Mitgliederplattform des größten deutschen Anbauverbands für ökologischen Landbau.",
        study: {
          constraint:
            "Mein Bioland ist eine langlebige Plattform für einen Verband aus Landwirten, Verarbeitern und Händlern. Die meiste Arbeit ist Weiterentwicklung statt Neubau: Jede Änderung muss in einem System landen, auf das sich die Leute im Alltag verlassen.",
          decision:
            "Ich verantworte dieses Projekt komplett, inklusive Budget, und bin der direkte Draht zum Kunden. Wenn Bioland eine technische Frage hat, landet sie nicht in einer Ticket-Warteschlange, sondern direkt bei mir am Telefon. Das heißt auch: Änderungen werden gemeinsam mit dem Kunden zugeschnitten, bevor sie zur Spezifikation werden.",
          outcome:
            "Es ist eines von über zehn aktiven Projekten, die ich verantworte, inklusive Budget.",
        },
        media: {
          src: "bioland",
          alt: "Illustration der Mitgliederplattform Mein Bioland: verknüpfte Datensätze über einem Feldermuster.",
        },
      },
      {
        id: "smartwe-appstore",
        client: "CAS Software AG",
        clientLogo: "cas",
        name: "SmartWe App Store",
        role: "Hauptentwickler",
        stack: ["Angular", "REST", "Docker"],
        summary:
          "Ein Cloud-Marktplatz, auf dem CRM-Kunden Anwendungen für ihren eigenen Arbeitsbereich finden und installieren.",
        study: {
          constraint:
            "SmartWe-Kunden sollten ihr CRM ohne Entwickler und ohne Deployment erweitern können. Die Installation musste in Eigenregie funktionieren, jederzeit umkehrbar sein und sich gefahrlos auf laufende Kundendaten anwenden lassen.",
          decision:
            "Ich war Hauptentwickler der Plattform: Die Architektur des Installationsablaufs und der Zuschnitt der Erweiterungsschnittstelle lagen bei mir.",
          outcome:
            "Der App Store ist heute der Weg, über den SmartWe-Kunden das Produkt selbst erweitern.",
        },
        media: {
          src: "smartwe",
          alt: "Illustration des SmartWe App Store: ein Raster aus installierbaren Anwendungskacheln.",
        },
      },
      {
        id: "samplus",
        client: "Daimler Truck",
        clientLogo: "daimler",
        name: "SAMPlus",
        role: "Software Engineer",
        stack: ["Java", "REST", "React", "Azure DevOps"],
        summary:
          "Configure-Price-Quote für den Nutzfahrzeugvertrieb, bis heute im Einsatz.",
        study: {
          constraint:
            "Einen Lkw zu spezifizieren ist ein kombinatorisches Problem: Optionen schließen einander aus, die gültigen Kombinationen ändern sich laufend, und ein falsches Angebot kostet echtes Geld.",
          decision:
            "Ich habe an der Einführung der CPQ-Lösung mitgearbeitet, die Konfiguration und Preisfindung auf einem System zusammengeführt hat. Damit liegen die Regeln an einer Stelle statt in den Köpfen einzelner Vertriebsmitarbeiter.",
          outcome:
            "Konfiguration und Preisfindung im Vertrieb laufen darüber, und es ist eines der Projekte, für die ich bis heute Verantwortung trage.",
        },
        media: {
          src: "samplus",
          alt: "Illustration eines Lkw-Konfigurators: Optionszeilen, die sich zu einer einzigen bepreisten Konfiguration auflösen.",
        },
      },
      {
        id: "e-invoice",
        client: "CAS Software AG",
        clientLogo: "cas",
        name: "E-Invoice for SmartWe",
        role: "Software Engineer",
        stack: ["Java", "Angular", "XRechnung", "REST"],
        summary:
          "Rechtskonforme elektronische Rechnungen direkt im CRM erstellen, ablegen und versenden.",
        study: {
          constraint:
            "E-Rechnungen folgen in Deutschland einem gesetzlich vorgegebenen Format mit strukturierten Feldern, die das System auf der Gegenseite verarbeiten muss. Ist ein Feld falsch, wird die Rechnung abgelehnt.",
          decision:
            "Wir haben die Rechnungsstellung in SmartWe selbst gebaut, statt einen Export danebenzustellen. Eine Rechnung entsteht, liegt und geht dort raus, wo der Kundendatensatz ohnehin schon liegt.",
          outcome:
            "SmartWe-Kunden stellen rechtskonforme elektronische Rechnungen aus, ohne ihr CRM zu verlassen.",
        },
        media: {
          src: "einvoice",
          alt: "Illustration einer elektronischen Rechnung: ein strukturiertes Dokument mit maschinenlesbaren Feldern.",
        },
      },
      {
        id: "secure-login",
        client: "CAS Software AG",
        clientLogo: "cas",
        name: "Two-factor authentication",
        role: "Software Engineer",
        stack: ["React Native", "Mobile App", "Security", "TOTP"],
        summary:
          "Eine begleitende Authenticator-App und ein zweiter Faktor beim Login ins CRM.",
        study: {
          constraint:
            "In einem CRM liegt die gesamte Kundenbeziehung eines Unternehmens. Ein Passwort allein ist dafür ein Single Point of Failure. Und ein zweiter Faktor beim Login ist eine Änderung, die jeder Nutzer schon beim nächsten Anmelden sieht.",
          decision:
            "Den zweiten Faktor habe ich als plattformübergreifende App für zeitbasierte Einmalcodes gebaut und in den bestehenden Login eingebunden. Der Rollout hat genauso viel Sorgfalt bekommen wie der Code, denn wenn der zweite Faktor nervt, wird er umgangen.",
          outcome:
            "Konten sind heute durch mehr als ein Passwort geschützt, und die Anmeldung ist bedienbar genug geblieben, dass sie keine eigene Support-Last erzeugt.",
        },
        media: {
          src: "twofactor",
          alt: "Illustration der Zwei-Faktor-Authentifizierung: ein Anmeldeschild mit einem sechsstelligen Einmalcode.",
        },
      },
    ],
  },

  skills: {
    label: "Kompetenzen",
    heading: "Womit ich arbeite und wie es zusammenhängt.",
    intro:
      "Gruppiert nach Einsatzzweck, nicht danach, wie gut ich es beherrsche. Die Linien zeigen, was im Alltag tatsächlich zusammenkommt. Wählen Sie einen Knoten, um zu sehen, wo.",
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
        note: "Mein tägliches Werkzeug, seit Copilot sein Kontingent über Nacht zusammengestrichen hat, mitten in Dropigon. Die Lektion sitzt: den Workflow so bauen, dass man jederzeit umziehen kann.",
      },
      {
        id: "chatgpt",
        label: "ChatGPT",
        group: "ai",
        related: ["sql"],
        note: "Recherche, Datenaufbereitung, erste Planskizzen. Der Alltag von KI, lange bevor Code entsteht.",
      },
      {
        id: "copilot",
        label: "GitHub Copilot",
        group: "ai",
        related: ["angular", "git"],
        note: "Ständiger Begleiter durch den Großteil des Dropigon-Codes, und im Job das Autocomplete im Editor.",
      },
      {
        id: "midjourney",
        label: "Midjourney",
        group: "ai",
        related: ["flutter", "figma"],
        note: "Die Dropigon-Grafiken, vom App-Icon bis zu den freischaltbaren Farbschemata, generiert und von Hand nachbearbeitet.",
      },
      {
        id: "lmstudio",
        label: "LM Studio",
        group: "ai",
        related: ["sovereign", "docker"],
        note: "Lokale Modelle, die auf eigener Hardware laufen statt auf der von jemand anderem.",
      },
      {
        id: "sovereign",
        label: "Selbst gehostete LLMs",
        group: "ai",
        related: ["theses", "docker"],
        note: "Digital souveräne Modelle für die Verarbeitung von Dokumentation, Thema einer von mir betreuten Bachelorarbeit.",
      },
      {
        id: "aimusic",
        label: "KI-Musik",
        group: "ai",
        related: ["flutter"],
        note: "Der komplette Dropigon-Soundtrack kommt aus Suno. Einen Komponisten kann ein Solo-Entwickler nicht einstellen, also hat KI den Teil übernommen.",
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
        note: "Der Großteil der Frontend-Arbeit in der Appfactory.",
      },
      { id: "react", label: "React", group: "engineering", related: ["typescript"] },
      {
        id: "flutter",
        label: "Flutter",
        group: "engineering",
        related: ["claude", "release"],
        note: "Dropigon, und die Lern-App für Kinder, die gerade entsteht.",
      },
      { id: "sql", label: "SQL", group: "engineering", related: ["vaadin"] },
      { id: "vaadin", label: "Vaadin", group: "engineering", related: ["sql"] },
      {
        id: "cpq",
        label: "CPQ",
        group: "engineering",
        related: ["stakeholders"],
        note: "Configure-Price-Quote: Regelwerke, bei denen aus einer falschen Antwort ein falsches Angebot wird. SAMPlus von Daimler Truck.",
      },
      {
        id: "einvoicing",
        label: "E-Rechnung",
        group: "engineering",
        related: ["cpq"],
        note: "Strukturierte, rechtskonforme Rechnungsformate, ein Feld, in dem „fast richtig“ abgelehnt heißt.",
      },

      {
        id: "scrum",
        label: "Scrum",
        group: "delivery",
        related: ["facilitation", "jira"],
        note: "Alle Scrum-Meetings, dazu teamübergreifende Formate auf Bereichsebene.",
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
        note: "CI/CD-Pipelines, damit Entwicklung und Deployment schnell bleiben.",
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
        id: "release",
        label: "Store-Releases",
        group: "delivery",
        related: ["flutter"],
        note: "Einreichung, Review und Release-Management bei App Store und Google Play. Allein gemacht, für ein echtes Produkt.",
      },
      {
        id: "conceptboard",
        label: "Conceptboard",
        group: "delivery",
        related: ["facilitation"],
        note: "Der Ort, an dem die Remote-Workshops tatsächlich stattfinden, wenn ein Teil des Teams in Ungarn sitzt.",
      },

      {
        id: "facilitation",
        label: "Moderation",
        group: "leadership",
        related: ["scrum"],
        note: "Dailies, Plannings, Retros, Reviews und teamübergreifende Sessions.",
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
        note: "Die Entwicklung an den Unternehmenszielen ausrichten und das Ergebnis der Bereichsleitung vorstellen.",
      },
      {
        id: "stakeholders",
        label: "Kundenkontakt",
        group: "leadership",
        related: ["roadmapping"],
        note: "Direkter Draht zu den Kunden ab Projektstart.",
      },
      {
        id: "growth",
        label: "Teamaufbau",
        group: "leadership",
        related: ["mentoring"],
        note: "Von vier auf elf Personen, verteilt über zwei Länder.",
      },
      {
        id: "theses",
        label: "Abschlussarbeiten",
        group: "leadership",
        related: ["sovereign"],
        note: "Zwei Bachelorarbeiten an der DHBW Karlsruhe. Forschung begleiten, nicht nur Code gegenlesen.",
      },
      {
        id: "budget",
        label: "Budgetverantwortung",
        group: "leadership",
        related: ["roadmapping"],
        note: "Über zehn aktive Projekte, inklusive Budgets.",
      },
      {
        id: "distributed",
        label: "Verteilte Teams",
        group: "leadership",
        related: ["conceptboard", "growth"],
        note: "Deutschland und Ungarn. Vertrauen auf Distanz baut man bewusst auf.",
      },
    ],
  },

  now: {
    label: "Aktuell",
    heading: "Woran ich gerade baue.",
    intro:
      "Zwei Projekte am Abend: eines mit dem Studio, eines allein. Fertig ist noch keins.",
    readMore: "Mehr dazu",
    close: "Schließen",
    items: [
      {
        id: "tumbletree-app",
        name: "TumbleTree App",
        org: "TumbleTree Studios UG",
        stage: "In Entwicklung",
        summary:
          "Eine kindgerechte Lern-App, aufgebaut auf Spielen und Geschichten, mit einem Schwierigkeitsgrad, der sich dem Kind anpasst. Das zweite TumbleTree-Produkt.",
        detail:
          "Gleicher Ansatz wie bei Dropigon: Flutter, KI für Code und Assets, kleine Schritte am Abend.",
        stack: ["Flutter", "Firebase", "Flame", "AI-assisted"],
        media: {
          src: "tumbletree-app",
          alt: "Schema einer Kinder-Lern-App: ein geometrischer Baum verzweigt sich in Spielkacheln, daneben eine adaptive Schwierigkeitsrampe.",
        },
        study: {
          sections: [
            {
              heading: "Das zweite Produkt",
              body: [
                "Die TumbleTree App ist das zweite Produkt des Studios: eine kindgerechte Lern-App für die ganze Familie, aufgebaut auf Spielen und Geschichten, mit einem Schwierigkeitsgrad, der sich dem Kind anpasst. Gleiches Arbeitsmodell wie bei Dropigon: abends, in kleinen Schritten, mit KI für Code und Assets.",
              ],
            },
            {
              heading: "Offline zuerst",
              body: [
                "Die App ist offline-first: Alles liegt in einer lokalen Datenbank auf dem Gerät, ein Sync-Dienst gleicht mit der Cloud ab, sobald eine Verbindung da ist. Ein Kind auf der Rückbank interessiert sich nicht für Netzabdeckung.",
              ],
            },
            {
              heading: "Gebaut für Feierabend-Sessions",
              body: [
                "Die Entwicklungs-Variante läuft komplett ohne Firebase: Mock-Anmeldung, lokale Daten, kein Cloud-Setup. Eine Abendsession startet in Sekunden. Echte Screenshots folgen, sobald die App nach etwas aussieht. Bis dahin ist die Architektur das ehrliche Bild.",
              ],
            },
          ],
          architecture: {
            heading: "So ist es aufgebaut",
            footnote:
              "Clean Architecture: Abhängigkeiten zeigen nur nach innen, und die dev-Variante läuft ganz ohne Cloud.",
            groups: [
              {
                id: "presentation",
                name: "Presentation",
                col: 1,
                row: 1,
                nodes: [
                  { id: "screens", label: "Screens & Flame-Spiele" },
                  { id: "state", label: "Riverpod-State" },
                ],
              },
              {
                id: "domain",
                name: "Domain",
                col: 1,
                row: 2,
                nodes: [
                  { id: "entities", label: "Entities" },
                  { id: "interfaces", label: "Repository-Interfaces" },
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
                    label: "Drift · lokale Datenbank",
                    note: "Quelle der Wahrheit",
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
              { from: "state", to: "interfaces", label: "nur nach innen" },
              { from: "interfaces", to: "drift", label: "umgesetzt in Data" },
              { from: "drift", to: "sync", label: "gemerkte Änderungen" },
              { from: "sync", to: "firestore", label: "sobald online", dashed: true },
              { from: "auth", to: "screens", label: "Anmeldung", dashed: true },
            ],
          },
        },
      },
      {
        id: "tradebot",
        name: "Tradebot",
        stage: "Paper-Trading",
        summary:
          "Ein Trading-Bot für Interactive Brokers: KI-Modelle fassen Nachrichten und Kennzahlen zusammen, ein deterministischer Scoring-Algorithmus trifft die eigentliche Kauf- oder Verkaufsentscheidung.",
        detail:
          "Nur die Execution-Schicht darf mit dem Broker reden (ein Prüfwerkzeug lässt den Build fehlschlagen, wenn es etwas anderes versucht), und jede Position bekommt eine Verkaufsgrenze direkt beim Broker, damit sie auch greift, wenn der Bot abstürzt. Backtests spielen zehn Jahre Kursdaten in etwa einer Minute durch. Noch Paper-Trading: simuliertes Geld, bis die Ergebnisse echtes rechtfertigen.",
        stack: ["Python", "FastAPI", "React", "TimescaleDB", "Groq", "Gemini"],
        media: {
          src: "tradebot",
          alt: "Schema eines Trading-Bots: ein Candlestick-Chart speist eine Scoring-Engine, der Ausführungspfad läuft durch ein Risiko-Gate zum Broker.",
        },
        study: {
          sections: [
            {
              heading: "Warum es das gibt",
              body: [
                "Ich wollte wissen, ob ein Bot Aktien eigenständig analysieren und auf dieser Basis handeln kann. Jede Entscheidung will ich dabei nachlesen können. KI-Modelle fassen dafür Nachrichten und Kennzahlen zusammen und erklären ihre Einschätzung in natürlicher Sprache. Die Kauf- oder Verkaufsentscheidung selbst trifft ein fester, nachvollziehbarer Algorithmus aus Kurssignalen, Kennzahlen und Nachrichtenstimmung.",
              ],
            },
            {
              heading: "Was funktioniert hat und was nicht",
              body: [
                "Die KI-Anbindung war der schnelle Teil: Daten holen, an die APIs schicken, Antworten einsortieren. Das lief von Anfang an rund. Und weil Analyse und Ausführung strikt getrennt sind, konnte ich auf der KI-Seite frei experimentieren und sogar den Anbieter wechseln, ohne dass die Handelslogik davon je etwas mitbekommen hat.",
                "Die ersten KI-Analysen selbst waren ziemlich schlecht. Sie passten weder zur tatsächlichen Kursentwicklung noch zu dem, was echte Analysten zu denselben Aktien sagten. Nachgebessert habe ich vor allem an der Datenqualität. Der Prompt kam erst an zweiter Stelle.",
              ],
            },
            {
              heading: "Getestet, indem ich den Stecker gezogen habe",
              body: [
                "Die Sicherheitsschichten habe ich mit Chaos-Drills getestet: mitten in einer offenen Position das Ethernet-Kabel ziehen, den Bot mitten in einer Order hart abschießen. Diese Tests haben handfeste Bugs gefunden, bevor echtes Geld im Spiel war.",
                "Würde ich neu anfangen, würde ich zuerst die Möglichkeit bauen, ein Ergebnis gegen etwas Echtes zu prüfen, und erst danach das Feature selbst. Und wo Geld im Spiel ist, bleibt die Regel: Die KI erklärt nur, entscheiden darf sie nie.",
              ],
            },
          ],
          gallery: [
            {
              src: "stockanalysis",
              alt: "Aktienanalyse-Ansicht für AAPL mit Kaufempfehlung, Score-Aufschlüsselung nach Sentiment, Technik und Fundamentaldaten sowie Kursverlauf.",
              caption: "Analyse-Ansicht",
            },
            {
              src: "papertrading",
              alt: "Liste simulierter Paper-Trades mit Symbol, Order-Typ, Status und Zeitstempel.",
              caption: "Paper-Trading",
            },
            {
              src: "backtesting",
              alt: "Backtest-Ergebnis einer Donchian-Breakout-Strategie mit Kennzahlen und Vergleich der Equity-Kurve gegen die Benchmark.",
              caption: "Backtesting",
            },
          ],
          architecture: {
            heading: "So ist es aufgebaut",
            footnote:
              "Nur die Execution-Schicht darf mit dem Broker reden. Ein Prüfwerkzeug lässt den Build fehlschlagen, wenn es etwas anderes versucht.",
            groups: [
              {
                id: "ingest",
                name: "Ingest",
                col: 1,
                row: 1,
                nodes: [
                  { id: "market", label: "Kurse · News · Fundamentaldaten" },
                  { id: "disclosures", label: "Politiker- & Insider-Trades" },
                ],
              },
              {
                id: "ai",
                name: "KI",
                col: 2,
                row: 1,
                nodes: [
                  { id: "llm", label: "Groq & Gemini", note: "Nur Erklärung" },
                  { id: "dashboard", label: "Analyse-Dashboard" },
                ],
              },
              {
                id: "analysis",
                name: "Analysis",
                col: 1,
                row: 2,
                nodes: [
                  { id: "scoring", label: "Scoring-Engine", note: "Deterministisch" },
                  { id: "finbert", label: "FinBERT-Sentiment" },
                ],
              },
              {
                id: "backtest",
                name: "Backtest",
                col: 2,
                row: 2,
                nodes: [
                  { id: "replay", label: "Replay", note: "Zehn Jahre ≈ eine Minute" },
                  { id: "simbroker", label: "Simulierter Broker" },
                ],
              },
              {
                id: "strategy",
                name: "Strategy",
                col: 1,
                row: 3,
                nodes: [{ id: "bot", label: "Handelsstrategien" }],
              },
              {
                id: "execution",
                name: "Execution",
                col: 1,
                row: 4,
                nodes: [
                  { id: "risk", label: "Risk-Engine" },
                  { id: "router", label: "Order-Router" },
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
                    note: "Verkaufsgrenzen liegen hier",
                  },
                ],
              },
            ],
            edges: [
              { from: "market", to: "scoring" },
              { from: "disclosures", to: "scoring" },
              { from: "finbert", to: "scoring" },
              { from: "scoring", to: "llm", label: "Empfehlung" },
              { from: "llm", to: "dashboard" },
              { from: "scoring", to: "dashboard" },
              { from: "scoring", to: "bot", label: "Signal" },
              { from: "replay", to: "bot", label: "gleiche Logik", dashed: true },
              { from: "bot", to: "simbroker", label: "Testlauf", dashed: true },
              { from: "bot", to: "risk", label: "Order-Absicht" },
              { from: "risk", to: "router" },
              { from: "router", to: "broker" },
            ],
          },
        },
      },
    ],
  },

  timeline: {
    label: "Werdegang",
    heading: "Vom Software Engineer zum Scrum Master, immer noch selbst am Code.",
    status: { shipped: "Abgeschlossen", active: "Laufend" },
    entries: [
      {
        id: "tumbletree",
        title: "Mitgründer & CEO",
        org: "TumbleTree Studios UG",
        start: "Okt. 2025",
        end: "Heute",
        status: "active",
        body: "Neben dem Hauptberuf mitgegründet, vor allem um mich an echten Projekten weiterzuentwickeln. Unser erstes Spiel, Dropigon, habe ich allein gebaut und veröffentlicht. Ein zweites Produkt, eine Lern-App für die ganze Familie, ist in Entwicklung.",
        details: [
          "Nebenberufliche Mitgründung von TumbleTree Studios zur fachlichen und persönlichen Weiterentwicklung an eigenen Gaming- und Lern-Apps.",
          "Konzeption, Entwicklung und Veröffentlichung des ersten Spiels „Dropigon“ komplett in Eigenregie, über den gesamten Produktlebenszyklus von der Idee über die Priorisierung bis zum Launch im App Store und bei Google Play im Januar 2026.",
          "KI-Werkzeuge durchgängig in der Entwicklung eingesetzt: für Code, Grafik und sogar die Musik.",
          "Aktuell Entwicklung des zweiten Produkts auf die gleiche Weise: eine Lern-App für die ganze Familie.",
        ],
      },
      {
        id: "scrum-master",
        title: "Scrum Master & Software Engineer",
        org: "CAS Software AG · Appfactory",
        start: "Apr. 2021",
        end: "Heute",
        status: "active",
        body: "Ein neu zusammengestelltes Team übernommen und von vier auf elf Personen in Deutschland und Ungarn aufgebaut. Ich verantworte die Roadmap, stelle sie der Bereichsleitung vor, halte den direkten Draht zu den Kunden und schreibe weiterhin selbst Code. Genau das erlaubt mir, mit Entwicklern auf Augenhöhe zu reden statt über sie.",
        details: [
          "Übernahme der Rolle des Scrum Masters für ein neu formiertes Team, Begleitung bei der Einführung agiler Methoden und Aufbau einer stabilen Grundlage für Zusammenarbeit und Lieferfähigkeit.",
          "Parallel dazu Mitarbeit als Software Engineer, um im täglichen Entwicklungsgeschäft nah an den technischen Bedürfnissen und Herausforderungen des Teams zu bleiben.",
          "Aufbau und Skalierung eines internationalen Teams von vier Entwicklern auf sieben Entwickler, drei Werkstudenten und einen QA-Tester, mit Teammitgliedern in Deutschland und Ungarn.",
          "Zweijährige firmeninterne Leadership-Ausbildung abgeschlossen.",
          "Erstellung und Pflege von Projekt-Roadmaps, die die Entwicklungsarbeit mit den Geschäftszielen verbinden, dazu regelmäßige Vorstellung vor der Bereichsleitung, damit Richtung und Stand transparent bleiben.",
          "Direkter Kundenkontakt von Projektbeginn an: Anforderungen aufnehmen und dafür sorgen, dass die technischen Bedürfnisse wirklich verstanden und umgesetzt werden.",
          "Betreuung von zwei Bachelorarbeiten, unter anderem zur Konfiguration und Evaluation eines selbst gehosteten, digital souveränen Large Language Models für die Verarbeitung von Dokumentation.",
          "Verantwortung für über zehn aktive Projekte inklusive ihrer Budgets, darunter Bioland, Daimler Truck und Deutsche Bahn Energie.",
          "Verantwortung für alle Scrum-Meetings (Daily Stand-ups, Sprint Plannings, Retrospektiven und Reviews), dazu Moderation von Bereichsformaten wie teamübergreifenden Reviews.",
        ],
      },
      {
        id: "engineer-appfactory",
        title: "Software Engineer",
        org: "CAS Software AG · Appfactory",
        start: "Mai 2020",
        end: "Apr. 2021",
        status: "shipped",
        body: "Frontend-Arbeit, überwiegend Angular, dazu Docker und die CI/CD-Pipelines. Ich habe neue Teammitglieder eingearbeitet und als stellvertretender Scrum Master ausgeholfen. So hat die spätere Rolle angefangen.",
        details: [
          "Mitarbeit an einer Vielzahl von Frontend-Projekten, überwiegend mit Angular, mit klarem Fokus auf moderne Webanwendungsentwicklung.",
          "Arbeit mit Docker zur Containerisierung von Umgebungen sowie Pflege der CI/CD-Pipelines, um Entwicklung und Deployment zu beschleunigen.",
          "Mentoring mehrerer neuer Teammitglieder mit Unterstützung bei Onboarding und Wissenstransfer.",
          "Übernahme zusätzlicher Verantwortung als stellvertretender Scrum Master: Moderation agiler Zeremonien und Unterstützung der Teamorganisation in Abwesenheit des regulären Scrum Masters.",
        ],
      },
      {
        id: "engineer-education",
        title: "Software Engineer",
        org: "CAS Software AG · Education",
        start: "Okt. 2018",
        end: "Mai 2020",
        status: "shipped",
        body: "Full-Stack-Arbeit an Verwaltungssystemen für Hochschulen: Immatrikulation, Noten und die Kommunikation mit Studierenden. Dazu die Modernisierung des Technologie-Stacks der Abteilung.",
        details: [
          "Start der beruflichen Laufbahn im Software Engineering mit Fokus auf Full-Stack-Entwicklung: Aufbau und Pflege von Frontend- und Backend-Komponenten für webbasierte Anwendungen.",
          "Spezialisierung auf Studierendenverwaltungssysteme für Hochschulen: Verwaltungsprozesse, Einschreibung, Notenverwaltung und Kommunikation mit Studierenden.",
          "Maßgebliche Mitwirkung an der Modernisierung des Technologie-Stacks der Abteilung: Einführung aktueller Frameworks und Tools für bessere Performance und eine intuitivere Benutzeroberfläche.",
          "Aus eigener Initiative regelmäßige Leitung kleinerer Team-Zeremonien wie Daily Stand-ups und Retrospektiven, was Kommunikation und Abläufe im Team verbessert hat.",
        ],
      },
      {
        id: "bachelor",
        title: "B. Sc. Informatik · Duales Studium",
        org: "DHBW Karlsruhe & CAS Software AG",
        start: "Sep. 2015",
        end: "Okt. 2018",
        status: "shipped",
        body: "Drei Jahre lang produktiven Code schreiben und in derselben Woche Klausuren bestehen. Theorie und Praxis waren für mich nie zwei getrennte Dinge. Abschluss mit 1,7.",
        details: [
          "Dreijähriges duales Informatikstudium mit 210 ECTS und durchgehender praktischer Mitarbeit in der Softwareentwicklung der Abteilung.",
          "Implementierung eines neuen Frameworks zur UI-Testautomatisierung als Ersatz für ein teures Lizenztool. Das spart mehrere Tausend Euro pro Jahr, und die Lösung ist bis heute produktiv im Einsatz.",
          "Verfassen der Bachelorarbeit „Entwicklung eines Framework-Prototyps für in SmartWe eingebettete Angular-Apps“, ein grundlegendes Werkzeug zur Integration von Angular-Komponenten in eine modulare CRM-Cloud-Plattform.",
          "Abschluss mit der Note 1,7.",
        ],
      },
    ],
  },

  principles: {
    label: "Arbeitsweise",
    heading: "Vier Überzeugungen dazu, wie Software entsteht.",
    intro: "Alle vier auf echten Projekten gelernt, auf die harte Tour.",
    items: [
      {
        id: "needs",
        title: "Was ein Kunde will, ist meistens nicht das, was er braucht",
        body: "Diesen Unterschied herauszuarbeiten ist die eigentliche Ingenieursarbeit. Eine Anforderung ist oft schon als fertige Lösung formuliert, und genau das zu bauen ist der bequeme Weg. Das eigentliche Problem bleibt dabei einfach liegen. Also bleibe ich so lange im Gespräch, bis der Bedarf dahinter klar ist. Wenn Bioland oder Daimler Truck eine technische Frage hat, landet sie direkt bei mir, und es ist selten die erste Antwort, die sich am Ende wirklich zu bauen lohnt.",
      },
      {
        id: "blockers",
        title:
          "Ein Standup, in dem Status berichtet wird, ist ein Termin, kein Werkzeug",
        body: "Ein Standup ist für den Tag da, der vor uns liegt: Jeder kennt seinen Plan, der Plan ist wirklich machbar, und was ihm im Weg steht, wird vorab ausgeräumt, egal ob offene Frage oder Impediment. Wer nur den Status von gestern berichtet, lässt genau dieses Ziel fallen. Und beim Vertrauen gilt dasselbe in die andere Richtung: „Ich hänge seit Montag fest“ sollte nie auf ein Standup warten müssen. Das will ich am Montag hören.",
      },
      {
        id: "ai",
        title: "Wo KI aufhört zu helfen, merkt man erst, wenn man damit ausliefert",
        body: "Die Grenzen dieser Werkzeuge habe ich nicht von Folien gelernt. Ich habe ein Spiel damit gebaut und veröffentlicht (Code, Grafik, sogar die Musik) und dabei gesehen, was unter echtem Termindruck trägt und was ein verlorener Abend ist. Die eigentlich spannende Arbeit besteht inzwischen darin, Anforderungen so scharf zu formulieren, dass ein Agent wirklich damit arbeiten kann.",
      },
      {
        id: "coordination",
        title: "Die meisten technischen Probleme sind Abstimmungsprobleme",
        body: "Das ist die Linie durch die letzten zehn Jahre und der Grund, warum ich heute verantworte, wie Software geschrieben wird, statt sie nur selbst zu schreiben. Wenn ein Projekt stockt, liegt es selten daran, dass niemand das technische Problem lösen konnte. Meist haben zwei Leute jeweils die Hälfte gelöst. Oder jemand hat eine Woche auf eine Antwort gewartet, von der der andere gar nicht wusste, dass er sie schuldet. Oder alle sind von Annahmen ausgegangen, die nie jemand ausgesprochen hat. Bringt man die Abstimmung in Ordnung, entstehen erstaunlich viele technische Probleme gar nicht erst.",
      },
    ],
  },

  about: {
    label: "Nach Feierabend",
    heading: "Der Rest der Woche",
    entries: [
      {
        id: "mali",
        text: "Fast jede Woche geht es mit Mali raus, unserer Border-Collie-Hündin, zum Training oder auf eine richtige Wanderung. Die beste Art, gemeinsam aktiv zu bleiben und den Kopf freizubekommen.",
        image: {
          src: "mali",
          alt: "Mali, eine schwarz-weiße Border-Collie-Hündin, sitzt auf einem Baumstumpf auf einer sonnigen Streuobstwiese.",
        },
      },
      {
        id: "family",
        text: "Seit April 2025 sind wir zu dritt. Unsere Tochter hält meine Frau und mich ordentlich auf Trab. Und ehrlich gesagt ist es die schönste Lebensphase überhaupt.",
        image: {
          src: "family",
          alt: "Christian mit seiner Frau und der gemeinsamen Tochter, lächelnd, zwischen tropischen Pflanzen.",
        },
      },
      {
        id: "gaming",
        text: "Beim Gaming schalte ich ab und fordere mich gleichzeitig heraus: Es gibt immer eine Mechanik zu meistern oder eine cleverere Strategie zu finden. Die Hardware gehört für mich dazu: Meinen Gaming-PC plane und baue ich komplett selbst.",
        image: {
          src: "pc",
          alt: "Bauschema eines selbst zusammengestellten Gaming-PCs: offener Tower mit Grafikkarte, Turmkühler, Lüftern und Luftstromlinien.",
        },
      },
    ],
  },

  contact: {
    label: "Kontakt",
    heading: "Melden Sie sich.",
    body: "Ich rede jederzeit gern über Software, über Teams und darüber, wo KI wirklich etwas bringt. Am schnellsten erreichen Sie mich per E-Mail.",
    email: "christian.gutermann95@gmail.com",
    emailLabel: "E-Mail",
    socials: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/chrisguter" }],
  },

  footer: {
    rights: "Alle Rechte vorbehalten.",
  },

  ui: {
    skipToContent: "Zum Inhalt springen",
    languageLabel: "Sprache",
    menu: "Menü",
    close: "Schließen",
    notice: "Keine Cookies, kein Tracking. Diese Seite sammelt nichts.",
    noticeDetails: "Details",
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
            { term: "Anschrift", value: "Gärtenwiesen 61" },
            { term: "PLZ, Ort", value: "76646 Bruchsal" },
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
            { term: "Anschrift", value: "Gärtenwiesen 61" },
            { term: "PLZ, Ort", value: "76646 Bruchsal, Deutschland" },
            { term: "E-Mail", value: "christian.gutermann95@gmail.com" },
          ],
        },
        {
          heading: "Hosting und Server-Logfiles",
          body: [
            "Diese Website wird bei GitHub Pages gehostet, einem Dienst der GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. Beim Aufruf einer Seite übermittelt Ihr Browser zwangsläufig Daten an die Server von GitHub, die sie in Logfiles speichern können. Dazu gehören in der Regel Ihre IP-Adresse, der Zeitpunkt der Anfrage, die aufgerufene Seite, die verweisende Seite sowie Browser und Betriebssystem.",
            "Diese Verarbeitung ist erforderlich, um die Website auszuliefern und sie sicher und stabil zu betreiben. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO: mein berechtigtes Interesse am Betrieb einer funktionsfähigen Website. Ich habe keinen Zugriff auf diese Logfiles und werte sie nicht aus.",
            "Da GitHub seinen Sitz in den Vereinigten Staaten hat, können dabei Daten außerhalb der EU verarbeitet werden. GitHub ist unter dem EU-U.S. Data Privacy Framework zertifiziert. Für die Verarbeitung durch GitHub gilt deren eigene Datenschutzerklärung.",
          ],
        },
        {
          heading: "Cookies, Analyse und Tracking",
          body: [
            "Nichts davon. Diese Website setzt keine Cookies, nutzt weder Local noch Session Storage, betreibt keinerlei Analyse oder Tracking und enthält weder Werbung noch Social-Media-Plugins, eingebettete Videos oder ein Consent-Banner, weil es nichts gibt, worin Sie einwilligen müssten.",
            "Der kleine Hinweis beim Aufruf der Seite ist rein informativ. Er speichert nichts, nicht einmal, dass Sie ihn geschlossen haben. Deshalb kann er Sie beim nächsten Besuch wieder begrüßen.",
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
