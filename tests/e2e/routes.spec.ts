import { expect, test } from "@playwright/test";

const publicRoutes = [
  "/",
  "/about",
  "/services",
  "/projects",
  "/projects/sample-slug",
  "/design-ideas",
  "/design-ideas/sample-slug",
  "/products",
  "/products/sample-slug",
  "/blog",
  "/blog/sample-slug",
  "/contact",
  "/quote",
  "/calculator",
  "/cart",
  "/checkout",
  "/orders",
  "/login",
  "/register",
];

for (const path of publicRoutes) {
  test(`renders ${path}`, async ({ page }) => {
    const response = await page.goto(path, { waitUntil: "domcontentloaded" });
    expect(response?.ok()).toBeTruthy();
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.getByRole("link", { name: "Studio Patron" }).first()).toBeVisible();
    await expect(page.locator("#main-content")).toBeVisible();
  });
}

test("account routes redirect unauthenticated visitors to login", async ({ page }) => {
  const response = await page.goto("/account", { waitUntil: "domcontentloaded" });
  expect(response?.ok()).toBeTruthy();
  await expect(page).toHaveURL(/\/login/);
});

test("home page exposes skip link and landmark structure", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#main-content")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
