import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
  readonly categories: Locator;

  constructor(page: Page) {
    super(page);
    this.categories = page.locator('.list-group-item');
  }

  async selectCategory(categoryName: string) {
    await this.categories.filter({ hasText: categoryName }).click();
  }

  async selectProduct(productName: string) {
    await this.page.locator(`.card-title a:has-text("${productName}")`).click();
  }
}