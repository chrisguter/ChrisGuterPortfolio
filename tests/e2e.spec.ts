import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/** Every prerendered document: 3 routes x 2 locales. Locale is carried by the
 *  URL, so these are real pages rather than states of one. */
const DOCUMENTS = [
  { path: "/", lang: "en", home: true },
  { path: "/de/", lang: "de", home: true },
  { path: "/imprint/", lang: "en", home: false },
  { path: "/de/imprint/", lang: "de", home: false },
  { path: "/privacy/", lang: "en", home: false },
  { path: "/de/privacy/", lang: "de", home: false },
] as const;

const NAME = /Christian Gutermann/;

/** The previous version of this site shipped unresolved content keys — literal
 *  strings like "career.bachelor.startDate" — as visible body copy. Neither
 *  locale renders three dot-separated words legitimately, so a hit here is a
 *  leak. The email and abbreviated dates do not match this shape. */
const RAW_CONTENT_KEY = /[a-z]+\.[a-z]+\.[a-z]+/i;

/** The site must state facts about him without signalling that he is looking
 *  for work — his current employer can read it. This is a standing constraint
 *  that is easy to reintroduce by accident in a copy edit, so it is asserted
 *  rather than left to review. */
const JOB_SEEKING = [
  /\bopen to (senior|new|other|work)/i,
  /\bif you are hiring\b/i,
  /\blooking for a new (role|job|position)/i,
  /\bopen for work\b/i,
  /\bdownload cv\b/i,
  /\bhire me\b/i,
  /\bauf jobsuche\b/i,
  /\boffen für (neue|senior)/i,
  /\blebenslauf herunterladen\b/i,
];

/** Reads from the DOM rather than innerText, so the assertion also covers copy
 *  that is present but not displayed: the mobile menu, the closed studies.
 *
 *  Text nodes are joined with a space rather than concatenated. Bare
 *  textContent fuses adjacent elements — "…reaches me fastest." + "Email" +
 *  "christian.gutermann…" becomes one run that looks exactly like a dotted
 *  content key, which is a false positive, not a leak. */
async function documentText(page: Page): Promise<string> {
  return page.evaluate(() => {
    const clone = document.body.cloneNode(true) as HTMLElement;
    for (const node of clone.querySelectorAll("script, style")) node.remove();
    const parts: string[] = [];
    const walker = document.createTreeWalker(clone, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) parts.push(walker.currentNode.nodeValue ?? "");
    return parts.join(" ");
  });
}

for (const { path, lang, home } of DOCUMENTS) {
  test(`${path} renders in ${lang} with one h1 and a clean console`, async ({
    page,
  }) => {
    const problems: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") problems.push(message.text());
    });
    page.on("pageerror", (error) => problems.push(error.message));

    await page.goto(path);

    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toHaveCount(1);
    if (home) await expect(h1).toHaveText(NAME);

    // Hydration mismatches surface here and nowhere else in a prerendered site.
    expect(problems).toEqual([]);
  });

  test(`${path} renders no unresolved content keys`, async ({ page }) => {
    await page.goto(path);
    expect(await documentText(page)).not.toMatch(RAW_CONTENT_KEY);
  });

  test(`${path} carries no job-seeking language`, async ({ page }) => {
    await page.goto(path);
    const text = await documentText(page);
    const hits = JOB_SEEKING.filter((pattern) => pattern.test(text)).map(String);
    expect(hits, `job-seeking copy found on ${path}`).toEqual([]);
  });

  test(`${path} has no WCAG 2 A or AA violations`, async ({ page }) => {
    /* The reveals are scroll-driven and live inside a no-preference query, so
       without this the audit measures whatever opacity the keyframes happen to
       be at — which is flaky, and is not the design's real colours. */
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    // id + selector, so a failure is actionable without opening the report.
    expect(
      violations.map(
        (violation) =>
          `${violation.id}: ${violation.nodes
            .map((node) => node.target.join(" "))
            .join(", ")}`,
      ),
    ).toEqual([]);
  });
}

test("every in-page hash link has a target", async ({ page }) => {
  await page.goto("/");

  const links = await page.getByRole("link").all();
  const hrefs = await Promise.all(links.map((link) => link.getAttribute("href")));
  const ids = hrefs
    // A bare "#" is the top of the document and has no target element.
    .filter(
      (href): href is string =>
        href !== null && href.length > 1 && href.startsWith("#"),
    )
    .map((href) => href.slice(1));

  expect(ids.length).toBeGreaterThan(0);
  for (const id of ids) {
    const exists = await page.evaluate(
      (target) => document.getElementById(target) !== null,
      id,
    );
    expect(exists, `no element with id "${id}"`).toBe(true);
  }
});

/** German law requires the Impressum to be reachable from every page, so this
 *  is a compliance assertion, not a navigation nicety. */
test("both legal pages are reachable from the footer, in both locales", async ({
  page,
}) => {
  for (const [home, imprint, privacy] of [
    ["/", "/imprint/", "/privacy/"],
    ["/de/", "/de/imprint/", "/de/privacy/"],
  ] as const) {
    await page.goto(home);
    const footer = page.locator("footer");
    for (const target of [imprint, privacy]) {
      const link = footer.locator(`a[href="${target}"]`);
      await expect(link, `${home} footer should link to ${target}`).toHaveCount(1);
    }
  }
});

test("the work index expands a case study", async ({ page }) => {
  await page.goto("/");

  const trigger = page.getByRole("button", { name: /SmartWe App Store/ });
  const study = page.getByRole("region", { name: "SmartWe App Store" });
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(study).toBeHidden();

  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(study).toBeVisible();
  await expect(study.getByRole("heading", { name: /stack/i })).toBeVisible();

  // Escape closes the row from inside it and hands focus back to the trigger.
  await trigger.press("Escape");
  await expect(study).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("the skills map exposes every node to the keyboard", async ({ page }) => {
  await page.goto("/");

  const nodes = page.locator("#skills button[aria-pressed]");
  expect(
    await nodes.count(),
    "skills map should render focusable nodes",
  ).toBeGreaterThan(8);

  const first = nodes.first();
  await first.click();
  await expect(first).toHaveAttribute("aria-pressed", "true");

  // Selecting the same node again clears it.
  await first.click();
  await expect(first).toHaveAttribute("aria-pressed", "false");

  // The graph itself is decorative; the screen-reader equivalent is what
  // actually carries the relationships, so assert it ships.
  await expect(page.locator("#skills .sr-only").first()).toBeAttached();
});

test.describe("mobile navigation", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("opens, holds focus, and returns it on Escape", async ({
    page,
    browserName,
  }) => {
    await page.goto("/");

    const trigger = page.getByRole("button", { name: /^(menu|close)$/i });
    const menu = page.getByRole("navigation", { name: "Menu" });
    await expect(menu).toBeHidden();

    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(menu.getByRole("link").first()).toBeFocused();

    // More tabs than the header holds: focus must cycle inside the open menu
    // rather than walking the page behind it.
    //
    // Chromium only. WebKit reproduces Safari's default, where Tab moves between
    // form controls and skips links entirely, so activeElement lands on <body>
    // and the assertion would fail on correct code. Everything else in this test
    // — the menu opening, focus entering it, Escape closing it, focus returning —
    // still runs on both engines.
    if (browserName === "chromium") {
      for (let step = 1; step <= 12; step += 1) {
        await page.keyboard.press("Tab");
        const trapped = await page.evaluate(
          () =>
            document.querySelector("header")?.contains(document.activeElement) ?? false,
        );
        expect(trapped, `focus escaped the menu after ${step} tabs`).toBe(true);
      }
    }

    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();
  });
});
