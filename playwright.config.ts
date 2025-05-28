import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 1,
  reporter: [
    ['html', { outputFolder: 'test-report', open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: 'https://www.demoblaze.com/index.html',
    headless: false,
    viewport: { width: 1480, height: 920 },
    actionTimeout: 10 * 1000,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    /*{
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },*/
  ],
});
