/**
 * CheckoutPage - Page Object Model for the checkout process
 * Handles customer information and checkout completion
 */
class CheckoutPage {
  /**
   * Constructor for CheckoutPage
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.cancelButton = page.getByTestId('cancel');
    this.finishButton = page.getByTestId('finish');
    this.backButton = page.getByTestId('back-to-products');
    this.completeHeader = page.getByTestId('complete-header');
    this.completeText = page.getByTestId('complete-text');
    this.errorMessage = page.getByTestId('error');
  }

  /**
   * Fill in customer information
   * @param {string} firstName - Customer's first name
   * @param {string} lastName - Customer's last name
   * @param {string} postalCode - Customer's postal code
   * @returns {Promise<void>}
   */
  async fillCustomerInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  /**
   * Continue to checkout overview
   * @returns {Promise<void>}
   */
  async continue() {
    await this.continueButton.click();
  }

  /**
   * Cancel checkout
   * @returns {Promise<void>}
   */
  async cancel() {
    await this.cancelButton.click();
  }

  /**
   * Complete the checkout process
   * @returns {Promise<void>}
   */
  async finish() {
    await this.finishButton.click();
  }

  /**
   * Return to products page
   * @returns {Promise<void>}
   */
  async backToProducts() {
    await this.backButton.click();
  }

  /**
   * Get the completion message
   * @returns {Promise<string>} Completion message
   */
  async getCompleteMessage() {
    return await this.completeHeader.textContent();
  }

  /**
   * Get the completion text
   * @returns {Promise<string>} Completion text
   */
  async getCompleteText() {
    return await this.completeText.textContent();
  }

  /**
   * Get error message text
   * @returns {Promise<string>} Error message text
   */
  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  /**
   * Check if error message is visible
   * @returns {Promise<boolean>} True if error message is visible
   */
  async isErrorVisible() {
    try {
      return await this.errorMessage.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Complete full checkout flow
   * @param {string} firstName - Customer's first name
   * @param {string} lastName - Customer's last name
   * @param {string} postalCode - Customer's postal code
   * @returns {Promise<void>}
   */
  async completeCheckout(firstName, lastName, postalCode) {
    await this.fillCustomerInfo(firstName, lastName, postalCode);
    await this.continue();
    await this.finish();
  }
}

export default CheckoutPage;
