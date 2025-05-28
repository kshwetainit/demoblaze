import { test, expect } from '@playwright/test';
import { HomePage } from '@pages/homePage';
import { ProductPage } from '@pages/productPage';
import { BasePage } from '../pages/basePage';
import { testData } from '@utils/testData';

test.describe('Product Navigation Tests', () => {
  let homePage: HomePage;
  let productPage: ProductPage;
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    basePage = new BasePage(page);
    await basePage.navigateTo('/');
  });

  test('should display products for a selected category', async ({ page }) => {
    await homePage.selectCategory(testData.product.category);
    const categoryTitle = page.getByRole('link', { name: 'MacBook air' });
    await expect(categoryTitle).toBeVisible(); // Check if category title is displayed
   // const productTitles = await page.locator('.card-title').allTextContents();
    // Verify that products related to 'Laptops' are displayed
   // expect(productTitles.some(title => title.includes('Laptop'))).toBeTruthy();
  });

  test('should navigate to product details page and display correct information', async ({ page }) => {
    await homePage.selectCategory(testData.product.category);
    await homePage.selectProduct(testData.product.name);
    await page.waitForTimeout(2000); // Wait for product page to load
    await expect(productPage.productName).toHaveText(testData.product.name);
    await expect(productPage.productPrice).toContainText(testData.product.price);
    await page.waitForTimeout(2000); // Wait for any potential animations or transitions
    await expect(productPage.productDescription).toBeVisible(); // Ensure description is present
  });

  test('should be able to add a product to cart from product details page', async ({ page }) => {
    await homePage.selectCategory(testData.product.category);
    await homePage.selectProduct(testData.product.name);
    await page.waitForTimeout(2000); 
    const dialogMessage = await productPage.addProductToCart();
    expect(dialogMessage).toContain('Product added');
  });
});