import { test, expect } from '@playwright/test';
import { DropdownPage } from '../pages/dropdown.page';

test('open page', async ({ page }) => {
  const dropdownPage = new DropdownPage(page);
  await dropdownPage.open();
  await expect(dropdownPage.option).toBeVisible();
  await expect(dropdownPage.elements).toBeVisible();
  await expect(dropdownPage.country).toBeVisible();
});

test('select option', async ({ page }) => {
  const dropdownPage = new DropdownPage(page);
  await dropdownPage.open();
  const options = await dropdownPage.option.allTextContents();
  await expect(options).toEqual(['Please select an option', 'Option 1', 'Option 2']);
  await expect(dropdownPage.option).toHaveValue('1');
});

test('select elements', async ({ page }) => {
  const dropdownPage = new DropdownPage(page);
  await dropdownPage.open();
  await dropdownPage.selectElements('20');
  await expect(dropdownPage.elements).toHaveValue('20');
});

test('select country', async ({ page }) => {
  const dropdownPage = new DropdownPage(page);
  await dropdownPage.open();
  await dropdownPage.selectCountry('Aland Islands');
  await expect(dropdownPage.country).toHaveValue('AX');
});
