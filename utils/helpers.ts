import { Page } from '@playwright/test';

export async function login(page: Page, username: string, password: string) {
  await page.locator('#login2').click();
  await page.locator('#loginusername').fill(username);
  await page.locator('#loginpassword').fill(password);
  await page.locator('button[onclick="logIn()"]').click();
  // Wait for the welcome message to appear, indicating successful login
  await page.waitForSelector('#nameofuser', { state: 'visible' });
}

export async function signup(page: Page, username: string, password: string) {
  await page.locator('#signin2').click();
  await page.locator('#sign-username').fill(username);
  await page.locator('#sign-password').fill(password);
  await page.locator('button[onclick="register()"]').click();
}