import { test, expect } from '@playwright/test';
import { ForgotPasswordPage } from '../pages/forgotpass.page';

test('open page', async ({ page }) => {
  const forgotPasswordPage = new ForgotPasswordPage(page);
  await forgotPasswordPage.open();
  await expect(forgotPasswordPage.email).toBeVisible();
  await expect(forgotPasswordPage.retriveButton).toBeVisible();
});

test('forgot password', async ({ page }) => {
  const forgotPasswordPage = new ForgotPasswordPage(page);
  await forgotPasswordPage.open();
  await forgotPasswordPage.retrivePassword('test@mail.ru');
  await expect(forgotPasswordPage.alertMessage).toContainText(
    'An e-mail has been sent to you which explains how to reset your password',
  );
});

test('submit empty email', async ({ page }) => {
  const forgotPasswordPage = new ForgotPasswordPage(page);
  await forgotPasswordPage.open();
  await forgotPasswordPage.retrivePassword('');
  await expect(forgotPasswordPage.errorMessage).toContainText(
    'Please enter a valid email address.',
  );
});
