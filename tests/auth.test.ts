import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { SignupPage } from '../pages/signupPage';
import { BasePage } from '../pages/basePage';
import { testData } from '../utils/testData';
import { v4 as uuidv4 } from 'uuid'; // For generating unique usernames

test.describe('Authentication Tests', () => {
  let loginPage: LoginPage;
  let signupPage: SignupPage;
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    signupPage = new SignupPage(page);
    basePage = new BasePage(page);
    await basePage.navigateTo('/');
  });

  test('should successfully sign up a new user', async ({ page }) => {
    const uniqueUsername = `user_${uuidv4().substring(0, 8)}`;
    await signupPage.signup(uniqueUsername, testData.validUser.password);
    const successMessage = await signupPage.getSignupSuccessMessage();
    expect(successMessage).toContain('Sign up successful.');
  });

  test('should not sign up with existing username', async ({ page }) => {
    // First, ensure the user exists (or create it if not)
    // This part assumes a cleanup mechanism or unique username for initial signup
    // For this test, we'll try to sign up with a known username (e.g., from testData)
    // In a real scenario, you'd ensure this user already exists or use a dedicated setup.
    await signupPage.signup(testData.validUser.username, testData.validUser.password);
    const errorMessage = await signupPage.getSignupErrorMessage();
    expect(errorMessage).toContain('This user already exist.');
  });

  test('should successfully log in with valid credentials', async ({ page }) => {
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    const welcomeText = await basePage.getWelcomeUserName();
    expect(welcomeText).toContain(`Welcome ${testData.validUser.username}`);
  });

  test('should display an error message for invalid login credentials', async ({ page }) => {
    await loginPage.clickLogin(); // Open login modal
    await loginPage.usernameInput.fill('invaliduser');
    await loginPage.passwordInput.fill('wrongpassword');
    await loginPage.loginButton.click();
    const errorMessage = await loginPage.getLoginErrorMessage();
    expect(errorMessage).toContain('Wrong password.');
  });

  test('should successfully log out', async ({ page }) => {
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await basePage.clickLogout();
    await expect(basePage.loginLink).toBeVisible();
    await expect(basePage.welcomeUser).not.toBeVisible();
  });
});