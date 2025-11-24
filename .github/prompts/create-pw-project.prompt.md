---
mode: agent
description: Create a Playwright project with specific configurations and best practices.
---
# 1. Project Initialization
Create a Playwright project with the following command, complete the installation process by selecting the default settings:
npm init playwright@latest -- --lang=js --quiet
# 2. Dependency Installation
Edit package.json if needed and after that perform npm install.

# Install dotenv to read environment variables
npm install dotenv

# 3. Environment Configuration
# This project must read its configuration from an existing .env file.
# Do NOT create a new .env file.
# The existing .env file is assumed to contain:
# - BASE_URL
# - USERNAME
# - PASSWORD

# 4. POM Generation
Generate Playwright Page Object Model (POM) Code for `https://www.saucedemo.com/`.

# Authentication (Read from .env)
# All authentication logic MUST use environment variables.
# - Use process.env.USERNAME for the username.
# - Use process.env.PASSWORD for the password.
# Do NOT hardcode credentials in any .js files.

# 5. Project Structure Requirements
Project Structure Requirements
- Create a pages/ directory.
- For each web page, generate a corresponding class and save it as a separate file under pages/.
- File name: page-name.page.js
- Class name: PageNamePage (PascalCase)
- Strings must use single quote

# 6. Locators & Selectors
Locators & Selectors
Identify key element locators on each page.
Use Playwright's built-in locator strategies where possible:
- getByTestId()
- getByText()
- getByRole()
- getByLabel()
Use .first() to ensure the correct element is selected when necessary.
Avoid fragile selectors like CSS classes or XPaths unless absolutely necessary.

# 7. Page Methods
Page Methods
Implement common user interactions (e.g., login, add to cart, checkout) as methods inside each page class.
Remember to:
- Use async/await for all methods interacting with the page.
- Leverage Playwright's auto-waiting capabilities.
- Use proper error handling where appropriate.
- Use the .env variables for any sensitive data and URLs in the metods for login or navigation example await this.page.goto('https://www.saucedemo.com/');.
Methods should be:
- Reusable
- Modular
- Free of hardcoded waitForTimeout calls
- Use proper async/await patterns and Playwright’s auto-waiting features.

# 8. Documentation
Documentation
Add JSDoc comments to:
- Every class
- Every method
Include details like:
- Description
- Parameters
- Return values

# 9. Playwright Configuration
# Modify playwright.config.js to load and use the .env variables:
# 1. Add this line at the very top:
import 'dotenv/config';

# 10. Set the baseURL in the `use` object to read from the environment variable:
use: {
  baseURL: process.env.BASE_URL,
  /* ... other 'use' properties ... */
},

# Restrict tests to run only on Chrome (Chromium)
# Enable:
- Screenshots on failure
- Video recording of test sessions
- headless: false
# In the Playwright config file ensure the file ends with only one extra empty line.

# 11. Linting
- Configure ESLint using the eslint-plugin-playwright.
- Include .eslintrc.config.js 

Edit package json if needed and after that perform npm install

In the Playwright config file ensure the file ends with only one extra empty line.
