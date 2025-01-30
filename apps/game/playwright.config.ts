import {defineConfig, devices} from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // Look for test files in the "test/e2e" directory, relative to this configuration file.
  testDir: "./test/playwright",

  // Run all tests in parallel.
  fullyParallel: true,

  // Use half of the number of logical CPU cores for running tests in parallel.
  workers: undefined,

  retries: 0,
  reporter: [["html"], ["list"]],

  use: {
    video: 'retain-on-failure',
    // We are using locally deployed MetaMask Test Dapp.
    baseURL: "https://bartio.yeetit.xyz/",
    // headless: true,
    screenshot: "only-on-failure",
  },

  // Synpress currently only supports Chromium, however, this will change in the future.
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
