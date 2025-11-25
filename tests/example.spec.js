// @ts-check
import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login.page.js';
import InventoryPage from '../pages/inventory.page.js';
import CartPage from '../pages/cart.page.js';
import CheckoutPage from '../pages/checkout.page.js';

test.describe('SauceDemo - E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Login - Valid credentials', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await expect(page).toHaveURL(process.env.BASE_URL || 'https://www.saucedemo.com/');
    });

    await test.step('Login with valid credentials', async () => {
      const loginPage = new LoginPage(page);
      await loginPage.login();
    });

    await test.step('Verify successful login', async () => {
      const inventoryPage = new InventoryPage(page);
      await expect(inventoryPage.inventoryContainer).toBeVisible();
    });
  });

  test('Cart - Add item', async ({ page }) => {
    await test.step('Login', async () => {
      const loginPage = new LoginPage(page);
      await loginPage.login();
    });

    await test.step('Add product to cart', async () => {
      const inventoryPage = new InventoryPage(page);
      await inventoryPage.addToCartByName('Sauce Labs Backpack');
    });

    await test.step('Verify cart count', async () => {
      const inventoryPage = new InventoryPage(page);
      const count = await inventoryPage.getCartCount();
      expect(count).toBe(1);
    });
  });

  test('Checkout - Complete purchase', async ({ page }) => {
    await test.step('Login', async () => {
      const loginPage = new LoginPage(page);
      await loginPage.login();
    });

    await test.step('Add product to cart', async () => {
      const inventoryPage = new InventoryPage(page);
      await inventoryPage.addToCartByName('Sauce Labs Backpack');
      await inventoryPage.goToCart();
    });

    await test.step('Verify cart and proceed to checkout', async () => {
      const cartPage = new CartPage(page);
      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBe(1);
      await cartPage.checkout();
    });

    await test.step('Complete checkout', async () => {
      const checkoutPage = new CheckoutPage(page);
      await checkoutPage.completeCheckout('John', 'Doe', '12345');
    });

    await test.step('Verify order completion', async () => {
      const checkoutPage = new CheckoutPage(page);
      const message = await checkoutPage.getCompleteMessage();
      expect(message).toContain('Thank you for your order!');
    });
  });
});
