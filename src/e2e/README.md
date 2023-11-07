# E2E Test Suite

## Overview

This directory contains the end-to-end (E2E) tests for our frontend application, implemented using the **Playwright** testing framework.

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- Ensure `.env` file has been properly created using the `.env-template` file

### Installation

1. To install the dependencies for the E2E tests, run the following command from the `e2e` directory:

```bash
npm install
```

2. To Install browsers required by Playwright (if they haven't been installed already):

```bash
npx playwright install
```

## Writing Tests

Place new test files in the appropriate folder within the `tests` directory. Follow our naming convention: `[feature-name].spec.ts`.

### Test File Structure

Craft your test files for clarity and efficiency using these guidelines:

1. **Imports**: Bring in Playwright's `test` and `expect` from `@playwright/test`, alongside any utility functions or Page Objects for encapsulating common actions and configurations.

2. **Environment Setup**: Directly import environment variables, like credentials, from `env.ts` to keep tests dynamic and secure.

3. **Test Suites**: Define related tests within `test.describe` blocks for better organization and shared setup/teardown operations.

4. **Individual Tests**: Use `test` blocks within suites to craft descriptive and focused test cases.

5. **Setup and Teardown**: Employ `test.beforeEach` and `test.afterEach` for consistent test initialization and cleanup actions.

6. **Navigation and URLs**: Stick with `page.goto('/')` for root URL navigation and `page.goto('/path')` for subpaths, leveraging the `BASE_URL` variable for environment-specific URLs.

7. **Assertions**: Ensure assertions are expressive and detailed with the `expect` library, covering the full range of expected element states and interactions.


### Best Practices

- **Clear Test Descriptions**: Articulate the intention and expected outcome in your test names.

- **Error Handling**: Implement tests to handle errors gracefully, with explicit messages aiding debuggability.

- **Test Isolation**: Maintain test independence to facilitate parallel execution and reduce test flakiness.

- **Page Object Models**: Encapsulate complex interactions in Page Object models to minimize repetition and improve test clarity.

- **Async Await**: Ensure all asynchronous operations complete by properly awaiting Playwright's promises.

For more detailed options and implementations, refer to the Playwright [Writing tests](https://playwright.dev/docs/writing-tests) and [Generating tests](https://playwright.dev/docs/codegen-intro) documentation.

## Running Tests

To run tests, use one of the following npm scripts:

### Local Environment

- Headless test:
```bash
npm run playwright-local
```

- Test with UI:
```bash
npm run playwright-local-ui
```

- Test in debug mode:
```bash
npm run playwright-local-debug
```

### Dev Environment

- Headless test:
```bash
npm run playwright-dev
```

- Test with UI:
```bash
npm run playwright-dev-ui
```

- Test in debug mode:
```bash
npm run playwright-dev-debug
```

### Test Environment

- Headless test:
```bash
npm run playwright-test
```

- Test with UI:
```bash
npm run playwright-test-ui
```

- Test in debug mode:
```bash
npm run playwright-test-debug
```

### Linting

- For linting test files, run:
```bash
npm run lint
```

For more detailed CLI usage and other options, refer to the Playwright [Running and debugging tests](https://playwright.dev/docs/running-tests) documentation.

## Structure

The following is the structure of the E2E tests in this directory:

```plaintext
e2e/
├── playwright-report/         # Generated reports from Playwright runs
├── test-results/              # Results from tests (may include screenshots and videos)
├── tests/                     # Test specification files
│   └── exampleDrafterPia.spec.ts # Test for the Example Drafter PIA feature
├── .env                       # Environment variables for the tests
├── .env-template              # Template for .env file
├── .eslintrc.js               # ESLint configuration
├── .eslintignore              # Files and folders to be ignored by ESLint
├── .prettierrc                # Prettier code formatting configuration
├── .prettierignore            # Files and folders to be ignored by Prettier
├── env.ts                     # TypeScript file for managing environment variables
├── package.json               # NPM package configuration for the project
├── package-lock.json          # Locked versions of the npm dependencies
├── playwright.config.ts       # Configuration file for Playwright
├── README.md                  # This documentation
├── tsconfig.json              # TypeScript configuration for the tests
├── tsconfig.eslint.json       # TypeScript configuration for ESLint
└── tsconfig.node.json         # TypeScript configuration for Node.js specific files
