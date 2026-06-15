import { test, expect } from '@playwright/test';

test('Successful Login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');

  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});

test('Failed Login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('wrong_password');

  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="error"]'))
    .toContainText('Username and password do not match any user in this service');
});