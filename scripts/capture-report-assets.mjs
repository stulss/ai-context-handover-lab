import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const baseUrl = "https://ai-context-handover-lab.vercel.app";
const routes = ["home:/", "handover:/handover", "experiment:/experiment", "tests:/tests"];

await mkdir("reports/assets", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

for (const item of routes) {
  const [name, route] = item.split(":");
  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  if (!response?.ok()) throw new Error(`${route} returned ${response?.status() ?? "no response"}`);
  await page.screenshot({ path: `reports/assets/live-${name}-desktop.png`, fullPage: true });
}

await browser.close();
