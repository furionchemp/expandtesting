import { Locator, Page } from '@playwright/test';

export class ForgotPasswordPage {
  readonly page: Page;
  readonly email: Locator;
  readonly errorMessage: Locator;
  readonly retriveButton: Locator;
  readonly alertMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = page.getByLabel('E-mail');
    this.errorMessage = page.locator('.invalid-feedback');
    this.retriveButton = page.getByRole('button', { name: 'Retrieve password' });
    this.alertMessage = page.getByRole('alert');
  }

  async open() {
    await this.page.goto('https://practice.expandtesting.com/forgot-password');
  }

  async retrivePassword(email: string) {
    await this.email.fill(email);
    await this.retriveButton.click();
  }
}
