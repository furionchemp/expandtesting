import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test('open page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await expect(loginPage.username).toBeVisible();
  await expect(loginPage.password).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();
});

test('success login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('practice', 'SuperSecretPassword!');
  await expect(page).toHaveURL('https://practice.expandtesting.com/secure');
  await expect(loginPage.alertMessage).toContainText(/You logged into a secure area!/);
  await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
});

test('logout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('practice', 'SuperSecretPassword!');
  await loginPage.logoutButton.click();
  await expect(page).toHaveURL('https://practice.expandtesting.com/login');
  await expect(loginPage.username).toBeVisible();
  await expect(loginPage.password).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();
  await expect(loginPage.alertMessage).toContainText(/You logged out of the secure area!/);
});

test('login with invalid credentials shows error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('test', 'test!');
  await expect(loginPage.alertMessage).toContainText(/Your (username|password) is invalid!/);
});

test('empty fields login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('', '');
  await expect(loginPage.alertMessage).toContainText(/Your username is invalid!/);
});
