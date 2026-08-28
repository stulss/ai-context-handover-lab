import { expect, test } from "@playwright/test";

const ROUTES = ["/", "/handover", "/models", "/metrics", "/tests"] as const;

test("T09 375px에서 본문 가로 스크롤이 없다", async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(route);

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.clientWidth, `${route} viewport`).toBe(375);
    expect(dimensions.scrollWidth, `${route} horizontal overflow`).toBeLessThanOrEqual(
      dimensions.clientWidth,
    );

    const fileName = route === "/" ? "home" : route.slice(1);
    await page.screenshot({ path: `evidence/ai-b-t09-${fileName}-375px.png`, fullPage: true });
  }
});

test("T09 모델 표만 자체 컨테이너에서 가로 스크롤된다", async ({ page }) => {
  await page.goto("/models");

  const tableScroll = page.getByTestId("model-table-scroll");
  await expect(tableScroll).toHaveCSS("overflow-x", "auto");
  expect(
    await tableScroll.evaluate((element) => element.scrollWidth > element.clientWidth),
  ).toBe(true);
});
