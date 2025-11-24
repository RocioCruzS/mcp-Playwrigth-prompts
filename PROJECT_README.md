# Playwright Test Automation - SauceDemo

This project contains end-to-end tests for [SauceDemo](https://www.saucedemo.com/) using Playwright with the Page Object Model (POM) design pattern.

## Project Structure

```
.
├── pages/                    # Page Object Models
│   ├── login.page.js        # Login page interactions
│   ├── inventory.page.js    # Product listing page
│   ├── cart.page.js         # Shopping cart page
│   └── checkout.page.js     # Checkout process
├── tests/                   # Test specifications
│   └── example.spec.js      # Sample E2E tests
├── .env                     # Environment variables (not committed)
├── eslint.config.js         # ESLint configuration
├── playwright.config.js     # Playwright configuration
└── package.json            # Project dependencies
```

## Prerequisites

- Node.js (v18 or higher)
- npm

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Environment Variables

The project uses a `.env` file for configuration. Ensure it contains:

```env
USERNAME=standard_user
PASSWORD=secret_sauce
BASE_URL=https://www.saucedemo.com/
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode
npm run test:headed

# Run tests on Chromium only
npm run test:chromium

# Run tests in debug mode
npm run test:debug

# Run tests in UI mode
npm run test:ui

# View test report
npm run report

# Run linter
npm run lint
```

## Page Object Models

### LoginPage
Handles login functionality:
- `navigate()` - Navigate to login page
- `login()` - Login with credentials from .env
- `loginWith(username, password)` - Login with custom credentials

### InventoryPage
Manages product listing interactions:
- `addToCartByName(productName)` - Add product to cart
- `addToCartByIndex(index)` - Add product by index
- `getCartCount()` - Get number of items in cart
- `goToCart()` - Navigate to cart

### CartPage
Handles shopping cart operations:
- `getCartItemCount()` - Get number of items
- `removeItem(productName)` - Remove item from cart
- `checkout()` - Proceed to checkout

### CheckoutPage
Manages checkout process:
- `fillCustomerInfo(firstName, lastName, postalCode)` - Fill customer details
- `continue()` - Continue to overview
- `finish()` - Complete checkout
- `completeCheckout(firstName, lastName, postalCode)` - Full checkout flow

## Configuration

### Playwright Configuration
- **Browser**: Chromium only
- **Mode**: Headed (headless: false)
- **Screenshots**: Captured on failure
- **Videos**: Recorded for all tests
- **Base URL**: Loaded from .env

### ESLint Configuration
- Uses `eslint-plugin-playwright`
- Enforces single quotes
- Requires semicolons
- Warns on unused variables
- Prevents `waitForTimeout` usage

## Best Practices

1. **Locators**: Uses Playwright's built-in locator strategies (`getByTestId`, `getByRole`, `getByText`)
2. **Async/Await**: All page methods use proper async/await patterns
3. **Auto-waiting**: Leverages Playwright's auto-waiting capabilities
4. **Documentation**: JSDoc comments on all classes and methods
5. **Environment Variables**: Sensitive data stored in .env
6. **Test Steps**: Tests organized with `test.step()` for better readability

## Contributing

When adding new tests:
1. Follow the POM pattern
2. Add JSDoc comments
3. Use single quotes for strings
4. Run ESLint before committing
5. Ensure tests pass locally

## License

ISC
