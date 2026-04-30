import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly alertMessage: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.getByLabel('username');
    this.password = page.getByLabel('password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.alertMessage = page.getByRole('alert');
    this.logoutButton = page.getByRole('link', { name: 'Logout' });
  }

  async open() {
    await this.page.goto('https://practice.expandtesting.com/login');
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
