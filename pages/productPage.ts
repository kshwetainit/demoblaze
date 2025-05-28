import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class ProductPage extends BasePage {
  waitForLoad() {
    throw new Error('Method not implemented.');
  }
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly productDescription: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    //this.productName = page.locator('.product-container .name');
    this.productName = page.getByRole('heading', { name: 'MacBook air' });
    this.productPrice = page.locator('h3.price-container');
    this.productDescription = page.locator('#more-information');
    this.addToCartButton = page.locator('.btn-success');
  }

  async getProductName(): Promise<string | null> {
    return this.productName.textContent();
  }

  async getProductPrice(): Promise<string | null> {
    return this.productPrice.textContent();
  }

  async getProductDescription(): Promise<string | null> {
    return this.productDescription.textContent();
  }

  async addProductToCart() {
    await this.addToCartButton.click();
    const dialogPromise = new Promise<string>(resolve => {
      this.page.once('dialog', async dialog => {
        resolve(dialog.message());
        await dialog.accept();
      });
    });
    return dialogPromise;
  }
}