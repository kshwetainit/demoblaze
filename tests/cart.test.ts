import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { ProductPage } from '@pages/productPage';
import { CartPage } from '@pages/cartPage';
import { BasePage } from '@pages/basePage';
import { testData } from '@utils/testData';
import { login } from '@utils/helpers';

test.describe('Shopping Cart Operations', () => {
  let homePage: HomePage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    basePage = new BasePage(page);
    await basePage.navigateTo('/');
    await login(page, testData.validUser.username, testData.validUser.password);
  });

  test('should add a product to the cart and verify its presence', async ({ page }) => {
    await homePage.selectCategory(testData.product.category);
    await homePage.selectProduct(testData.product.name);
    await productPage.addProductToCart();

    await basePage.clickCart();
    await page.waitForTimeout(3000);
    //await expect(cartPage.isProductInCart(testData.product.name)).resolves.toBeTruthy();
    await expect(cartPage.getProductPriceInCart(testData.product.name)).resolves.toContain(testData.product.price.replace('$', ''));
  });

  test('should update total price when product is added to cart', async ({ page }) => {
    await homePage.selectCategory(testData.product.category);
    await homePage.selectProduct(testData.product.name);
    await productPage.addProductToCart();

    await basePage.clickCart();
    // Assuming initial cart is empty, so total price should be product price
    const expectedPrice = testData.product.price.replace('$', '');
    await expect(cartPage.totalPrice).toHaveText(expectedPrice);
  });

  test('should remove a product from the cart', async ({ page }) => {
    // Add product first
    //await homePage.selectCategory(testData.product.category);
   // await homePage.selectProduct(testData.product.name);
   // await productPage.addProductToCart();

    await basePage.clickCart();
    await expect(cartPage.cartTable.locator(`tr:has-text("${testData.product.name}")`).first()).toBeVisible({ timeout: 10000 });
    await expect(cartPage.isProductInCart(testData.product.name)).resolves.toBeTruthy();

    await cartPage.deleteProductFromCart(testData.product.name);
    await expect(cartPage.cartTable.locator(`tr:has-text("${testData.product.name}")`).first()).toBeHidden({ timeout: 10000 });
    await expect(cartPage.isProductInCart(testData.product.name)).resolves.toBeFalsy();
    // Verify total price is updated (if there were other items or it becomes 0)
    await expect(cartPage.totalPrice).toHaveText(''); // Expect empty if cart is now empty
  });
  
});