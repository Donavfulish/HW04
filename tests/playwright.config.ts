import { defineConfig, devices } from '@playwright/test';

/**
 * HTML reporter output dir is configurable via PLAYWRIGHT_HTML_OUTPUT_DIR
 * (e.g. ../reports/fr04/chromium). Every report should show Run by metadata
 * from helpers/report-meta.ts (reportTitle / STUDENT_ID) — inject into test
 * titles, page annotations, or a custom fixture header/footer.
 *
 * Default local SUT:
 *   API   http://localhost:3000
 *   Web   http://localhost:5173
 *   Admin http://localhost:5174
 */
const htmlOutputDir =
  process.env.PLAYWRIGHT_HTML_OUTPUT_DIR ?? '../reports/default';

export default defineConfig({
  testDir: './specs',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: htmlOutputDir,
        open: 'never',
      },
    ],
  ],
  use: {
    baseURL: process.env.WEB_BASE_URL ?? 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
