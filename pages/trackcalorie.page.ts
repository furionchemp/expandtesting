import { Locator, Page } from '@playwright/test';

export class TrackcaloriePage {
  readonly page: Page;
  readonly additem: Locator;
  readonly addmeal: Locator;
  readonly addcalories: Locator;
  readonly totalCalories: Locator;
  readonly itemlist: Locator;
  readonly item: Locator;
  readonly allCaloriesitems: Locator;
  readonly edititem: Locator;
  readonly updatebutton: Locator;
  readonly deletebutton: Locator;
  readonly backbutton: Locator;
  readonly clearallbutton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.additem = page.locator('#item-name');
    this.addmeal = page.getByRole('button', { name: 'Add Meal' });
    this.addcalories = page.locator('#item-calories');
    this.totalCalories = page.locator('.total-calories');
    this.itemlist = page.locator('#item-list');
    this.item = page.locator('.collection-item');
    this.allCaloriesitems = this.itemlist.locator('em');
    this.edititem = page.locator('.secondary-content');
    this.updatebutton = page.getByRole('button', { name: ' Update Meal' });
    this.deletebutton = page.getByRole('button', { name: ' Delete Meal' });
    this.backbutton = page.getByRole('button', { name: ' Back' });
    this.clearallbutton = page.getByRole('button', { name: ' Clear All' });
  }
  getItemByIndex(index: number) {
    return this.page.locator(`#item-${index}`);
  }
  async open() {
    await this.page.goto('https://practice.expandtesting.com/tracalorie/');
  }

  async addMealItem(food: string, calories: string) {
    await this.additem.fill(food);
    await this.addcalories.fill(calories);
    await this.addmeal.click();
  }

  async calculateTotalCalories() {
    const countCaloriesitems = await this.allCaloriesitems.count();
    let total = 0;
    for (let i = 0; i < countCaloriesitems; i++) {
      const calorieitem = this.allCaloriesitems.nth(i);
      const calorieitemtext = await calorieitem.textContent();
      const safeText = calorieitemtext ?? '';
      const parts = safeText.trim().split(' ');
      const caloriesresult = Number(parts[0] ?? 0);
      total += caloriesresult;
    }
    return total;
  }

  async getDisplayedTotalCalories() {
    const totalcalorie = await this.totalCalories.textContent();
    return Number(totalcalorie);
  }

  async updateMeal(newfood: string, newcalories: string) {
    await this.edititem.click();
    await this.additem.fill(newfood);
    await this.addcalories.fill(newcalories);
    await this.updatebutton.click();
  }
  async deleteMeal(index: number) {
    const item = this.getItemByIndex(index);
    const editInItem = item.locator('.secondary-content');
    await editInItem.click();
    await this.deletebutton.click();
  }

  async deleteMeals(indexes: number[]) {
    for (let i = 0; i < indexes.length; i++) {
      const idx = indexes[i];
      const item = this.getItemByIndex(idx);
      const editInItem = item.locator('.secondary-content');
      await editInItem.click();
      await this.deletebutton.click();
    }
  }

  async cancelEdit() {
    await this.edititem.click();
    await this.backbutton.click();
  }
}
