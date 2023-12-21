import { test, expect } from "@playwright/test";

test("has title", async ({ page, baseURL }) => {
  await Promise.all([
    page.goto("http://localhost:4040/"),
    page.waitForLoadState("networkidle"),
  ]);
  await page.locator("#react-select-2-input").click();
  await page.getByLabel("dropdown").fill("Mexico");
  await Promise.all([
    page.getByLabel("dropdown").press("Enter"),
    page.waitForLoadState("load"),
    page.waitForLoadState("networkidle"),
  ]);

  await page.waitForSelector("[data-test-id='Mexico']");

  await expect(page.locator('[data-test-id="Mexico"]')).toContainText("Mexico");
});
