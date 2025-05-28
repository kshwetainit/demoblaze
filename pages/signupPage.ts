import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class SignupPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signupButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#sign-username');
    this.passwordInput = page.locator('#sign-password');
    this.signupButton = page.locator('button[onclick="register()"]');
  }

  async signup(username: string, password: string) {
    await this.clickSignup(); // Open signup modal
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signupButton.click();
  }

  async getSignupSuccessMessage(): Promise<string> {
    const dialogPromise = new Promise<string>(resolve => {
      this.page.once('dialog', async dialog => {
        resolve(dialog.message());
        await dialog.accept();
      });
    });
    return dialogPromise;
  }

  async getSignupErrorMessage(): Promise<string> {
    const dialogPromise = new Promise<string>(resolve => {
      this.page.once('dialog', async dialog => {
        resolve(dialog.message());
        await dialog.dismiss();
      });
    });
    return dialogPromise;
  }
}