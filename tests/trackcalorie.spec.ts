import { test, expect } from '@playwright/test';
import { TrackcaloriePage } from '../pages/trackcalorie.page';

test.describe('trackcalorie', () => {
  test.beforeEach(async ({ page }) => {
    const trackcaloriePage = new TrackcaloriePage(page);
    await trackcaloriePage.open();
  });

  test('open page', async ({ page }) => {
    const trackcaloriePage = new TrackcaloriePage(page);
    await expect(trackcaloriePage.additem).toBeVisible();
    await expect(trackcaloriePage.addmeal).toBeVisible();
    await expect(trackcaloriePage.addcalories).toBeVisible();
    await expect(trackcaloriePage.totalCalories).toBeVisible();
  });

  test('add meal', async ({ page }) => {
    const trackcaloriePage = new TrackcaloriePage(page);
    await trackcaloriePage.addMealItem('egg', '45');
    const item0 = trackcaloriePage.getItemByIndex(0);
    await expect(item0).toContainText('egg: 45 Calories');
  });

  test('add few meals', async ({ page }) => {
    const trackcaloriePage = new TrackcaloriePage(page);
    await trackcaloriePage.addMealItem('egg', '45');
    await trackcaloriePage.addMealItem('pancake', '245');
    await trackcaloriePage.addMealItem('caramel latte', '145');
    const item0 = trackcaloriePage.getItemByIndex(0);
    const item1 = trackcaloriePage.getItemByIndex(1);
    const item2 = trackcaloriePage.getItemByIndex(2);
    await expect(item0).toContainText('egg: 45 Calories');
    await expect(item1).toContainText('pancake: 245 Calories');
    await expect(item2).toContainText('caramel latte: 145 Calories');
  });

  test('edit meal', async ({ page }) => {
    const trackcaloriePage = new TrackcaloriePage(page);
    await trackcaloriePage.addMealItem('egg', '45');
    await trackcaloriePage.updateMeal('boiled egg', '75');
    await expect(trackcaloriePage.item).toContainText('boiled egg: 75 Calories');
  });

  test('cancel edit meal', async ({ page }) => {
    const trackcaloriePage = new TrackcaloriePage(page);
    await trackcaloriePage.addMealItem('egg', '45');
    const item0 = trackcaloriePage.getItemByIndex(0);
    await trackcaloriePage.cancelEdit();
    await expect(item0).toContainText('egg 45 Calories');
  });

  test('delete meal', async ({ page }) => {
    const trackcaloriePage = new TrackcaloriePage(page);
    await trackcaloriePage.addMealItem('egg', '45');
    await trackcaloriePage.deleteMeal(0);
    await expect(trackcaloriePage.itemlist).toBeEmpty();
    await expect(trackcaloriePage.totalCalories).toHaveText('0');
  });

  test('delete few meals', async ({ page }) => {
    const trackcaloriePage = new TrackcaloriePage(page);
    await trackcaloriePage.addMealItem('egg', '45');
    await trackcaloriePage.addMealItem('pancake', '245');
    await trackcaloriePage.addMealItem('caramel latte', '145');
    const item2 = trackcaloriePage.getItemByIndex(2);
    await trackcaloriePage.deleteMeals([0, 1]);
    const count = await trackcaloriePage.itemlist.count();
    await expect(trackcaloriePage.totalCalories).toContainText('145');
    await expect(count).toBe(1);
    await expect(item2).toContainText('caramel latte: 145 Calories');
  });

  test('calculate calories', async ({ page }) => {
    const trackcaloriePage = new TrackcaloriePage(page);
    await trackcaloriePage.addMealItem('egg', '45');
    await trackcaloriePage.addMealItem('pancake', '210');
    await trackcaloriePage.addMealItem('latte', '119');
    const totalCaloriesNumeric = await trackcaloriePage.getDisplayedTotalCalories();
    const total = await trackcaloriePage.calculateTotalCalories();
    await expect(totalCaloriesNumeric).toBe(total);
  });

  test.fixme('clear all - BUG-1: button does not clear list', async ({ page }) => {
    const trackcaloriePage = new TrackcaloriePage(page);
    await trackcaloriePage.addMealItem('egg', '45');
    await trackcaloriePage.addMealItem('pancake', '210');
    await trackcaloriePage.addMealItem('latte', '119');
    await trackcaloriePage.clearallbutton.click();
    await expect(trackcaloriePage.itemlist).toBeEmpty();
    await expect(trackcaloriePage.totalCalories).toHaveText('0');
  });

  //negative tests
  test('not allow empty input', async ({ page }) => {
    const trackcaloriePage = new TrackcaloriePage(page);
    await trackcaloriePage.addMealItem('', '');
    await trackcaloriePage.addMealItem('egg', '');
    await trackcaloriePage.addMealItem('', '123');
    await expect(trackcaloriePage.itemlist).toBeEmpty();
    await expect(trackcaloriePage.totalCalories).toHaveText('0');
  });

  test('+ will be cut', async ({ page }) => {
    const trackcaloriePage = new TrackcaloriePage(page);
    await trackcaloriePage.addMealItem('egg', '+45');
    await expect(trackcaloriePage.item).toHaveText('egg: 45 Calories');
  });

  test('truncate calories after decimal separator', async ({ page }) => {
    const trackcaloriePage = new TrackcaloriePage(page);
    await trackcaloriePage.addMealItem('egg', '45.01');
    await trackcaloriePage.addMealItem('egg', '45.99999999');
    const item0 = trackcaloriePage.getItemByIndex(0);
    const item1 = trackcaloriePage.getItemByIndex(1);
    await expect(item0).toContainText('egg: 45 Calories');
    await expect(item1).toContainText('egg: 45 Calories');
  });
});
