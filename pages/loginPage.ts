import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#loginusername');
    this.passwordInput = page.locator('#loginpassword');
    this.loginButton = page.locator('button[onclick="logIn()"]');
  }

  async login(username: string, password: string) {
    await this.clickLogin(); // Open login modal
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForTimeout(2000);
    await this.page.waitForSelector('#nameofuser', { state: 'visible' }); // Wait for login success
  }

  async getLoginErrorMessage(): Promise<string> {
    const dialogPromise = new Promise<string>(resolve => {
      this.page.once('dialog', async dialog => {
        resolve(dialog.message());
        await dialog.dismiss();
      });
    });
    return dialogPromise;
  }
}