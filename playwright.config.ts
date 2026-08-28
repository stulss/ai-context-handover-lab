import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  outputDir: "./test-results",
  use: {
    baseURL: "http://localhost:3000",
    ...devices["Desktop Chrome"],
    viewport: { width: 375, height: 812 },
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
  },
});
