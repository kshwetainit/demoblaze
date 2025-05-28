import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class CheckoutPage extends BasePage {
  readonly nameInput: Locator;
  readonly countryInput: Locator;
  readonly cityInput: Locator;
  readonly creditCardInput: Locator;
  readonly monthInput: Locator;
  readonly yearInput: Locator;
  readonly purchaseButton: Locator;
  readonly closeButton: Locator;
  readonly purchaseConfirmation: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.locator('#name');
    this.countryInput = page.locator('#country');
    this.cityInput = page.locator('#city');
    this.creditCardInput = page.locator('#card');
    this.monthInput = page.locator('#month');
    this.yearInput = page.locator('#year');
    //this.purchaseButton = page.locator('button[onclick="purchaseOrder()"]');
    this.purchaseButton = page.locator('#orderModal button.btn-primary');
    this.closeButton = page.locator('#orderModal button.btn-secondary');
    this.purchaseConfirmation = page.locator('.sweet-alert h2');
  }

  async fillCheckoutDetails(name: string, country: string, city: string, creditCard: string, month: string, year: string) {
    await this.nameInput.fill(name);
    await this.countryInput.fill(country);
    await this.cityInput.fill(city);
    await this.creditCardInput.fill(creditCard);
    await this.monthInput.fill(month);
    await this.yearInput.fill(year);
  }

  async clickPurchase() {
    await this.purchaseButton.click();
  }

  async getPurchaseConfirmationMessage(): Promise<string | null> {
    return await this.purchaseConfirmation.textContent();
  }

  async closePurchaseConfirmation() {
    await this.closeButton.click();
  }
}