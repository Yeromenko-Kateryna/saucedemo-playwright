import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory.html/);
});

test('Products Display', async ({ page }) => {
  const products = page.locator('[data-test="inventory-item"]');

  await expect(products).toHaveCount(6);
});

test('Product Sorting A to Z', async ({ page }) => {
  await page.locator('[data-test="product-sort-container"]').selectOption('az');

  const firstProductName = page.locator('[data-test="inventory-item-name"]').first();

  await expect(firstProductName).toHaveText('Sauce Labs Backpack');
});