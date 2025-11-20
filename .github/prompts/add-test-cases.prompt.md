---
mode: agent
description: Generate Playwright test cases from TC definitions using Page Object Model (POM) structure.
---
You are provided with a .csv file containing structured test case definitions for the website "https://www.saucedemo.com/". Based on this file, generate corresponding Playwright test cases using the Page Object Model (POM) structure.
Use the Playwright MCP Server to first navigate to the URL you are given in the test file.
Take a page snapshot so you can better see the locators and generate tests based on those insights.

Requirements for Test Generation
- Use Existing Page Objects
- Reuse the methods and elements already defined in the /pages directory.
- Do not duplicate logic already encapsulated in page classes.
- Instantiate page objects only as needed per test file.

Test Structure
- Use test.describe() blocks to group related tests (e.g., by tag or feature).
- Use Playwright’s built-in test() syntax (from @playwright/test) for individual tests.
- Use meaningful names from the CSV's Title and Test Case ID.

Fix the import extension warnings or unused variable warning
- Ensure all imports from page objects include the .js extension.
- After generating the test file, add the script to the package json in the script section if not exist.
- If the test fails, analyze the error and iterate on the generated code (e.g., improve locators) until it passes.
- Include appropriate assertions to verify all expected behaviors.