import { defineConfig, devices } from "@playwright/test";

const CI = Boolean(process.env.CI);

/** 4173 is Vite's preview port. The suite runs against `dist/` rather than the
 *  dev server on purpose: the pages under test are the prerendered documents
 *  that actually ship, so a hydration mismatch or a missing prerender step is a
 *  test failure here instead of a production bug. */
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 2 : 0,
  workers: CI ? 1 : undefined,
  reporter: [["html", { open: "never" }], ["list"]],

  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  /* Two engines, because the two things most likely to break here are engine
     specific: the scroll-driven reveals and the `hidden`/disclosure semantics
     the whole page leans on. */
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],

  webServer: {
    command: "npm run preview",
    url: BASE_URL,
    reuseExistingServer: !CI,
    timeout: 120_000,
  },
});
