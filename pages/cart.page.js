/**
 * CartPage - Page Object Model for the shopping cart page
 * Handles cart item management and checkout navigation
 */
class CartPage {
  /**
   * Constructor for CartPage
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    this.page = page;
    this.cartItems = page.getByTestId('cart-item');
    this.checkoutButton = page.getByTestId('checkout');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
    this.cartList = page.getByTestId('cart-list');
  }

  /**
   * Get the number of items in cart
   * @returns {Promise<number>} Number of items in cart
   */
  async getCartItemCount() {
    return await this.cartItems.count();
  }

  /**
   * Remove item from cart by name
   * @param {string} productName - Name of the product to remove
   * @returns {Promise<void>}
   */
  async removeItem(productName) {
    const product = this.cartItems.filter({ hasText: productName });
    const removeButton = product.getByRole('button', { name: 'Remove' }).first();
    await removeButton.click();
  }

  /**
   * Proceed to checkout
   * @returns {Promise<void>}
   */
  async checkout() {
    await this.checkoutButton.click();
  }

  /**
   * Continue shopping
   * @returns {Promise<void>}
   */
  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  /**
   * Get item name by index
   * @param {number} index - Index of the cart item (0-based)
   * @returns {Promise<string>} Item name
   */
  async getItemName(index) {
    const itemName = this.cartItems.nth(index).getByTestId('inventory-item-name').first();
    return await itemName.textContent();
  }

  /**
   * Get item price by index
   * @param {number} index - Index of the cart item (0-based)
   * @returns {Promise<string>} Item price
   */
  async getItemPrice(index) {
    const itemPrice = this.cartItems.nth(index).getByTestId('inventory-item-price').first();
    return await itemPrice.textContent();
  }

  /**
   * Check if cart is empty
   * @returns {Promise<boolean>} True if cart is empty
   */
  async isEmpty() {
    const count = await this.getCartItemCount();
    return count === 0;
  }
}

export default CartPage;
