import { Locator, Page } from '@playwright/test';

export class DropdownPage {
  readonly page: Page;
  readonly option: Locator;
  readonly elements: Locator;
  readonly country: Locator;
  readonly alertMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.option = page.locator('#dropdown');
    this.elements = page.getByLabel('Elements per Page:');
    this.country = page.locator('#country');
    this.alertMessage = page.getByRole('alert');
  }

  async open() {
    await this.page.goto('https://practice.expandtesting.com/dropdown');
  }

  async selectOption(value: string) {
    await this.option.selectOption(value);
  }

  async selectElements(value: string) {
    await this.elements.selectOption(value);
  }

  async selectCountry(value: string) {
    await this.country.selectOption(value);
  }
}
