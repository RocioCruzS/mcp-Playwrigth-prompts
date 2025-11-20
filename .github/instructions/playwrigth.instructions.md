---
description: 'Playwright test generation instructions for MCP project'
applyTo: '**'
---

# Playwright Test Writing Guidelines (MCP Project)

## Code Quality Standards

- **Locators**  
  Prioritize robust locators for resilience and accessibility:
  - Use Playwright’s built-in strategies:  
    `getByRole`, `getByLabel`, `getByText`, `getByTestId`
  - Use `.first()` when multiple matches may occur
  - Avoid fragile selectors like CSS classes or XPath unless necessary

- **Page Methods**  
  - Implement reusable, modular user interactions (e.g., login, add to cart, checkout) inside page object classes
  - Avoid hardcoded `waitForTimeout` — rely on Playwright's auto-wait and `async/await` handling
  - Keep methods clear, maintainable, and decoupled from specific test logic

- **JSDoc Comments**  
  - Document every class and method with:
    - A clear description
    - Parameters
    - Return values

- **Assertions**  
  - Use auto-retrying assertions like:
    - `await expect(locator).toHaveText()`
    - `await expect(locator).toHaveCount(n)`
    - `await expect(locator).toHaveURL(url)`
  - Avoid `expect(locator).toBeVisible()` unless testing visibility toggles

- **Readability & Debugging**  
  - Use `test.step()` blocks to group meaningful interactions
  - Use descriptive titles (e.g., `Login - Valid credentials`)

---

## Test Structure

- **Imports**  
  ```
  import { test, expect } from '@playwright/test';
  ```
  For page objects:
  ```  
  import LoginPage from '../pages/login.page';
  ```

- **Grouping**  
  Use `test.describe()` to organize tests by feature or flow

- **Hooks**  
  Use `beforeEach()` for shared setup (e.g., navigating to a base URL)

- **Naming Convention**  
  Use the format:  
  `Feature - Action or Scenario` (e.g., `Cart - Add item`)

## File Organization

### Tests

- Location: `tests/`
- Naming: `<feature-or-page>.spec.js` (e.g., `login.spec.js`)
- Scope: One file per major feature or screen

### Page Objects

- Location: `pages/`
- File naming: `page-name.page.js`
- Class naming: `PageNamePage` (PascalCase)

## Assertion Best Practices

### Accessibility Snapshots

- Use `toMatchAriaSnapshot()` to validate the accessibility tree
- Prefer structure over static text; use partial text matches or test hierarchy only

### Element Counts

- Use `toHaveCount()` for verifying repeated UI elements

### Text Content

- Use `toHaveText()` for exact matches
- Use `toContainText()` for partial matching

### Navigation

- Use `toHaveURL()` to assert successful navigation

## Test Execution Strategy

1. Run tests:  
   ```bash
   npx playwright test --project=chromium
   ```
2. Debug failures using recorded videos/screenshots  
3. Refine selectors, assertions, or flows as needed  
4. Ensure test reliability and repeatability  
5. Review output, share findings, and file bugs if necessary

---

### Playwright Configuration

In `playwright.config.js`, ensure:

- Restrict to Chromium only
- Enable:
  - `headless: false`
  - Screenshots on failure
  - Video recording
- Remove:
  - `devices` import
- Add where needed:
  ```js
  // eslint-disable-next-line import/no-extraneous-dependencies
  ```
- Ensure file ends with only one extra blank line

### ESLint Configuration

- Use the **Airbnb Style Guide**
- Create a `.eslintrc.js` with proper config

### CI/CD - Jenkins Integration

Create a Jenkins pipeline that:

- Installs dependencies (`npm install`)
- Executes test suite
- Stores test artifacts (video/screenshots)

---

## ✅ Quality Checklist

Before finalizing your test code:

- [ ] All locators are accessible and specific  
- [ ] Tests follow consistent `describe/it` structure  
- [ ] Assertions are meaningful and user-focused  
- [ ] Page methods are reusable and modular  
- [ ] ESLint passes using Airbnb rules  
- [ ] Chromium-only execution is enabled  
- [ ] Screenshots/videos are properly recorded on failure  
