---
mode: agent
description: Generate a Playwright test suite by parsing a clean CSV file.
---
# 1. Setup
- You are a Playwright test generator.
- Install any necessary dependencies (`npm install`).
- Your primary goal is to generate a test file (e.g., `tests/saucedemo.spec.js`) based on the file `cases.csv`.

# 2. CSV Parsing
- Load and parse the file `cases.csv`.
- Iterate through each row of the CSV (skip the header row).
- Each row represents one test case.

# 3. Test Generation
For each row in the CSV:
1.  Create one `test(...)` block.
2.  Use the `Case` column value for the test title (e.g., `test('User Login', async ({...}) => { ... });`).
3.  **Steps:** Read the `Steps (Step)` column. It contains multiple actions separated by a semicolon (`;`). Translate each action into a Playwright command.
4.  **Assertions:** Read the `Steps (Expected)` column. It contains multiple assertions separated by a semicolon (`;`). Translate each one into a Playwright assertion.

# 4. Best Practices (From Previous Context)
- **Use POM:** Assume Page Object Model classes already exist in the `pages/` directory. Use them.
- **Environment Variables (.env):**
  - **URL:** All tests MUST rely on the `baseURL` from the config (`process.env.BASE_URL`) for navigation (e.g., `page.goto('/')`).
  - **Credentials:** For the 'User Login' test case, you MUST read credentials from `process.env.USERNAME` and `process.env.PASSWORD`.
  - **CRITICAL: DO NOT** hardcode 'standard_user', 'secret_sauce', or la URL base (https://www.saucedemo.com/) anywhere in the test files (`.spec.js`) or page files (`.page.js`).
- **Locators:** Use modern locators (`getByRole`, `getByText`, `getByTestId`). Avoid XPath or fragile CSS selectors.
- **No Timeouts:** Do not add `waitForTimeout`. Rely on Playwright's auto-waiting.

# 5. Execution
- After generating the test file, execute it using `npx playwright test`.
- If the test fails, analyze the error and iterate on the generated code (e.g., improve locators) until it passes.
- Include appropriate assertions to verify all expected behaviors.