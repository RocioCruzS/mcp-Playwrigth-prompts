import 'dotenv/config';

/**
 * LoginPage - Page Object Model for the login page
 * Handles all login-related interactions on saucedemo.com
 */
class LoginPage {
  /**
   * Constructor for LoginPage
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');
  }

  /**
   * Navigate to the login page
   * @returns {Promise<void>}
   */
  async navigate() {
    await this.page.goto(process.env.BASE_URL);
  }

  /**
   * Perform login with credentials from environment variables
   * @returns {Promise<void>}
   */
  async login() {
    await this.usernameInput.fill(process.env.USERNAME);
    await this.passwordInput.fill(process.env.PASSWORD);
    await this.loginButton.click();
  }

  /**
   * Perform login with custom credentials
   * @param {string} username - Username to login with
   * @param {string} password - Password to login with
   * @returns {Promise<void>}
   */
  async loginWith(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
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
    return await this.errorMessage.isVisible();
  }
}

export default LoginPage;
