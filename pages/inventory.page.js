/**
 * InventoryPage - Page Object Model for the inventory/products page
 * Handles all product listing and cart interactions
 */
class InventoryPage {
  /**
   * Constructor for InventoryPage
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    this.page = page;
    this.inventoryContainer = page.getByTestId('inventory-container');
    this.inventoryItems = page.getByTestId('inventory-item');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.getByTestId('logout-sidebar-link');
  }

  /**
   * Add a product to cart by name
   * @param {string} productName - Name of the product to add
   * @returns {Promise<void>}
   */
  async addToCartByName(productName) {
    const product = this.page.locator('[data-test="inventory-item"]').filter({ hasText: productName });
    const addButton = product.getByRole('button', { name: 'Add to cart' }).first();
    await addButton.click();
  }

  /**
   * Add a product to cart by index
   * @param {number} index - Index of the product (0-based)
   * @returns {Promise<void>}
   */
  async addToCartByIndex(index) {
    const addButton = this.inventoryItems.nth(index).getByRole('button', { name: 'Add to cart' }).first();
    await addButton.click();
  }

  /**
   * Remove a product from cart by name
   * @param {string} productName - Name of the product to remove
   * @returns {Promise<void>}
   */
  async removeFromCartByName(productName) {
    const product = this.page.locator('[data-test="inventory-item"]').filter({ hasText: productName });
    const removeButton = product.getByRole('button', { name: 'Remove' }).first();
    await removeButton.click();
  }

  /**
   * Get the cart item count
   * @returns {Promise<number>} Number of items in cart
   */
  async getCartCount() {
    try {
      const count = await this.cartBadge.textContent();
      return parseInt(count, 10);
    } catch {
      return 0;
    }
  }

  /**
   * Navigate to cart page
   * @returns {Promise<void>}
   */
  async goToCart() {
    await this.cartLink.click();
  }

  /**
   * Get product name by index
   * @param {number} index - Index of the product (0-based)
   * @returns {Promise<string>} Product name
   */
  async getProductName(index) {
    const productName = this.inventoryItems.nth(index).getByTestId('inventory-item-name').first();
    return await productName.textContent();
  }

  /**
   * Get product price by name
   * @param {string} productName - Name of the product
   * @returns {Promise<string>} Product price
   */
  async getProductPrice(productName) {
    const product = this.page.locator('[data-test="inventory-item"]').filter({ hasText: productName });
    const price = product.getByTestId('inventory-item-price').first();
    return await price.textContent();
  }

  /**
   * Logout from the application
   * @returns {Promise<void>}
   */
  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}

export default InventoryPage;
