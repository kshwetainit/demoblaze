import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly contactLink: Locator;
  readonly aboutUsLink: Locator;
  readonly cartLink: Locator;
  readonly loginLink: Locator;
  readonly signupLink: Locator;
  readonly welcomeUser: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.locator('.nav-item a.nav-link[href="index.html"]');
    this.contactLink = page.locator('.nav-item a.nav-link[data-target="#exampleModal"]');
    this.aboutUsLink = page.locator('.nav-item a.nav-link[data-target="#videoModal"]');
    this.cartLink = page.locator('#cartur');
    this.loginLink = page.locator('#login2');
    this.signupLink = page.locator('#signin2');
    this.welcomeUser = page.locator('#nameofuser');
    this.logoutLink = page.locator('#logout2');
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async clickHome() {
    await this.homeLink.click();
  }

  async clickContact() {
    await this.contactLink.click();
  }

  async clickAboutUs() {
    await this.aboutUsLink.click();
  }

  async clickCart() {
    await this.cartLink.click();
  }

  async clickLogin() {
    await this.loginLink.click();
  }

  async clickSignup() {
    await this.signupLink.click();
  }

  async getWelcomeUserName(): Promise<string | null> {
    return this.welcomeUser.textContent();
  }

  async clickLogout() {
    await this.logoutLink.click();
    await this.page.waitForSelector('#login2', { state: 'visible' }); // Wait for login button to reappear
  }
}