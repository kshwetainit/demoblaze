import { test, expect } from '@playwright/test';
import { HomePage } from '@pages/homePage';
import { ProductPage } from '@pages/productPage';
import { CartPage } from '@pages/cartPage';
import { CheckoutPage } from '@pages/checkoutPage';
import { BasePage } from '@pages/basePage';
import { testData } from '@utils/testData';
import { login } from '@utils/helpers';

test.describe('Checkout Process', () => {
  let homePage: HomePage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    basePage = new BasePage(page);
    await basePage.navigateTo('/');
    await login(page, testData.validUser.username, testData.validUser.password);

    // Add a product to cart before each checkout test
    
  });

  test('should successfully complete the checkout process', async ({ page }) => {
    await homePage.selectCategory(testData.product.category);
    await homePage.selectProduct(testData.product.name);
    await productPage.addProductToCart();
    await page.waitForTimeout(2000);
    await basePage.clickCart();
    await page.waitForTimeout(2000);
    await cartPage.clickPlaceOrder();
    await page.waitForTimeout(5000);
   // await page.waitForSelector('#orderModal', { state: 'visible', timeout: 10000 });

    await checkoutPage.fillCheckoutDetails(
      testData.checkoutDetails.name,
      testData.checkoutDetails.country,
      testData.checkoutDetails.city,
      testData.checkoutDetails.creditCard,
      testData.checkoutDetails.month,
      testData.checkoutDetails.year
    );
    await page.waitForTimeout(5000); // Wait for any potential animations or transitions
    await checkoutPage.clickPurchase();

    await page.waitForSelector('.sweet-alert h2', { state: 'visible', timeout: 10000 });


    const confirmationMessage = await checkoutPage.getPurchaseConfirmationMessage();
    expect(confirmationMessage).toContain('Thank you for your purchase!');
    const confirmationPopup = page.locator('.lead.text-muted ');
    expect(confirmationPopup, 'Expected "Id:" to be present in confirmation details').toContainText('Id:', { timeout: 10000 });

    const expectedCreditCardNumber = `Card Number: ${testData.checkoutDetails.creditCard}`;
    await expect(page.locator('.lead.text-muted ')).toContainText(expectedCreditCardNumber); // Verify credit card number

    await checkoutPage.closePurchaseConfirmation();
    // After closing the confirmation, it should return to the home page or an empty cart
    await expect(basePage.homeLink).toBeVisible();
  });

  test('should display error when checkout details are incomplete', async ({ page }) => {
    await page.waitForTimeout(2000);
    await basePage.clickCart();
    await page.waitForTimeout(2000);
    await cartPage.clickPlaceOrder();
    await page.waitForTimeout(5000);
    await page.waitForSelector('#orderModal', { state: 'visible', timeout: 10000 });
    // Fill only name, leaving other fields empty
    await checkoutPage.nameInput.fill(testData.checkoutDetails.name);
    await checkoutPage.countryInput.fill(testData.checkoutDetails.country);
    await checkoutPage.cityInput.fill(testData.checkoutDetails.city);
    await page.waitForTimeout(3000);
    await checkoutPage.clickPurchase();
    await page.waitForTimeout(5000);
    const dialogPromise = new Promise<string>(resolve => {
      page.once('dialog', async dialog => {
        resolve(dialog.message());
        await dialog.dismiss();
      });
    });
    await page.waitForTimeout(5000);
    await checkoutPage.clickPurchase();
    const errorMessage = await dialogPromise;
    expect(errorMessage).toContain('Please fill out Name and Creditcard.'); // Example error message
  });

  test('should be able to cancel the checkout process', async ({ page }) => {
    await page.waitForTimeout(2000);
    await basePage.clickCart();
    await page.waitForTimeout(2000);
    await cartPage.clickPlaceOrder();
    await page.waitForTimeout(5000);
    await checkoutPage.closeButton.click(); // Click the close button on the checkout modal
    
    //await expect(cartPage.cartTable).toBeVisible(); // Verify we are back on the cart page
  });
});