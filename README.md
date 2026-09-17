# Kapnative E2E Testing

End-to-end automated tests for the **Kapnative** application, built with **Playwright** and **TypeScript**.

The repository contains reusable Page Objects, components, test data, and E2E test scenarios covering the main user flows in the Kapnative application.

## Stack

* **Playwright** — End-to-End testing framework
* **TypeScript** — strongly typed test code
* **Node.js**
* **npm**
* **Page Object Model (POM)** — reusable page abstractions

## Project structure

```text
e2e-testing/
│
├── component/
│   └── side-menu.component.ts
│
├── pages/
│   ├── login.page.ts
│   ├── payment.page.ts
│   └── pulpit.page.ts
│
├── test-data/
│   └── login.data.ts
│
├── tests/
│   ├── login.spec.ts
│   ├── payment.spec.ts
│   └── pulpit.spec.ts
│
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md
```

## Prerequisites

Before running the tests, install:

* **Node.js**
* **npm**
* **Git**

Check installed versions:

```bash
node --version
npm --version
git --version
```

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Go to the project directory:

```bash
cd e2e-testing
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Running tests

Run all Playwright tests:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run tests using Playwright UI Mode:

```bash
npx playwright test --ui
```

Run a specific test file:

```bash
npx playwright test tests/login.spec.ts
```

Run tests in debug mode:

```bash
npx playwright test --debug
```

## Test report

After running the tests, open the Playwright HTML report:

```bash
npx playwright show-report
```

The report contains information about:

* passed tests,
* failed tests,
* test execution time,
* screenshots and traces when configured,
* errors and failure details.

## Test architecture

The project uses the **Page Object Model** pattern to keep tests readable and maintainable.

### Pages

Page-specific selectors and actions are stored in:

```text
pages/
```

Examples:

* `login.page.ts` — login page actions
* `payment.page.ts` — payments page actions
* `pulpit.page.ts` — dashboard actions

### Components

Reusable application components are stored in:

```text
component/
```

For example:

```text
side-menu.component.ts
```

contains actions related to the application's side navigation.

### Test data

Reusable test data is stored separately in:

```text
test-data/
```

Example:

```text
login.data.ts
```

This keeps test credentials and test values separate from the test logic.

### Tests

Test scenarios are stored in:

```text
tests/
```

Current areas covered include:

* Login
* Dashboard
* Payments

## Example test structure

```ts
import { test, expect } from '@playwright/test';

test('user can log in', async ({ page }) => {
  // test implementation
});
```

Tests should focus on the business scenario, while selectors and reusable actions should be placed inside Page Objects or Components.

## Useful Playwright commands

```bash
npx playwright test
```

Run all tests.

```bash
npx playwright test --ui
```

Open Playwright UI Mode.

```bash
npx playwright test --headed
```

Run tests with the browser visible.

```bash
npx playwright test --debug
```

Run tests in Playwright Inspector.

```bash
npx playwright show-report
```

Open the latest HTML report.

```bash
npx playwright codegen <url>
```

Open Playwright Codegen for generating and inspecting locators.

## Development guidelines

When adding new tests:

1. Add reusable page actions to the appropriate Page Object.
2. Add reusable UI elements to `component/`.
3. Store reusable test data in `test-data/`.
4. Add the actual test scenario to `tests/`.
5. Prefer Playwright locators such as `getByRole`, `getByLabel`, and `getByTestId`.
6. Avoid unnecessary hard-coded waits.
7. Keep tests independent from each other.
8. Use assertions to verify the expected application state.

## Formatting

The repository contains Prettier configuration.

Format the project with:

```bash
npx prettier --write .
```

Check formatting without changing files:

```bash
npx prettier --check .
```

## Application under test

The tests are created for the **Kapnative** application.

Main application repository:

```text
Kapnative / kapnative-v2
```

Kapnative is a B2B SaaS platform for private markets distribution.

## Current test coverage

The E2E suite currently contains automated scenarios for:

* Authentication / Login
* Dashboard
* Side navigation
* Payments

Additional application areas will be added as the Kapnative platform develops.

## Goal

The goal of this repository is to provide reliable automated regression coverage for the most important Kapnative user journeys and make it easier to detect issues before new versions of the application are released.
