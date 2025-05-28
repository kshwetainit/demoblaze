import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class CartPage extends BasePage {
  readonly cartTable: Locator;
  readonly deleteButtons: Locator;
  readonly totalPrice: Locator;
  readonly placeOrderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartTable = page.locator('#tbodyid');
    this.deleteButtons = page.locator('td button');
    this.totalPrice = page.locator('#totalp');
    this.placeOrderButton = page.locator('.btn-success');
  }

  async isProductInCart(productName: string): Promise<boolean> {
    return await this.cartTable.locator(`text=${productName}`).first().isVisible();
  }

  async getProductPriceInCart(productName: string): Promise<string | null> {
    // Assuming product name is in the first column, price in the third
    const row = this.cartTable.locator(`tr:has-text("${productName}")`);
    return await row.locator('td').nth(2).textContent();
  }

  async deleteProductFromCart(productName: string) {
    await this.cartTable.locator(`tr:has-text("${productName}")`).locator('text=Delete').first().click();
   // await this.page.waitForLoadState('networkidle'); // Wait for the cart to update
  }

  async getTotalPrice(): Promise<string | null> {
    return await this.totalPrice.textContent();
  }

  async clickPlaceOrder() {
    await this.placeOrderButton.click();
  }
}