# E2E Test Suite

## Overview

This directory contains the end-to-end (E2E) tests for our frontend application, implemented using the **Playwright** testing framework.

## Getting Started

### Prerequisites

- Node.js (version **16** or higher)
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

1. ***Imports***: Bring in Playwright's `test` and `expect` from `@playwright/test`, alongside any utility functions or Page Objects for encapsulating common actions and configurations.

2. ***Test Suites***: Define related tests within `test.describe` blocks for better organization and shared setup/teardown operations.

3. ***Individual Tests***: Use `test` blocks within suites to craft descriptive and focused test cases.

4. ***Setup and Teardown***: Employ `test.beforeEach` and `test.afterEach` for consistent test initialization and cleanup actions, including credentials.

5. ***Navigation and URLs***: Stick with `page.goto('/')` for root URL navigation and `page.goto('/path')` for subpaths, leveraging the `BASE_URL` variable for environment-specific URLs.

6. ***Assertions***: Ensure assertions are expressive and detailed with the `expect` library, covering the full range of expected element states and interactions.


### Best Practices

- ***Clear Test Descriptions***: Articulate the intention and expected outcome in your test names.

- ***Error Handling***: Implement tests to handle errors gracefully, with explicit messages aiding debuggability.

- ***Test Isolation***: Maintain test independence to facilitate parallel execution and reduce test flakiness.

- ***Page Object Models***: Encapsulate complex interactions in Page Object models to minimize repetition and improve test clarity.

- ***Async Await***: Ensure all asynchronous operations complete by properly awaiting Playwright's promises.

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
│
├── playwright-report/                      # Generated reports from Playwright test runs
├── test-results/                           # Output of tests, such as logs and result files
│
├── tests/                                  # Main test directory containing all test suites
│   ├── modules/                            # Modular test files for testing specific components
│   │   ├── piaFill/                        # Test suites related to 'piaFill' functionality
│   │   │   ├── basicPiaFill.ts             # Basic test cases for piaFill
│   │   │   ├── cpoPiaFill.ts               # Test cases for 'cpo' role interactions with piaFill
│   │   │   ├── drafterPiaFill.ts           # Test cases for 'drafter' role interactions with piaFill
│   │   │   ├── mpoPiaFill.ts               # Test cases for 'mpo' role interactions with piaFill
│   │   │   └── index.ts                    # Index file to export piaFill test modules
│   │   │
│   │   └── utils/                          # Utility functions and helpers for tests
│   │       ├── auth/                       # Authentication helpers for different user roles
│   │       │   ├── cpoAuth.ts              # Auth functions for 'cpo' role
│   │       │   ├── drafterAuth.ts          # Auth functions for 'drafter' role
│   │       │   └── mpoAuth.ts              # Auth functions for 'mpo' role
│   │       │
│   │       └── uuid/                       # UUID generation and search functions
│   │           ├── uuid.ts                 # Functions for UUID generation
│   │           ├── uuidSearch.ts           # Functions for searching using UUID
│   │           └── index.ts                # Index file to export uuid utilities
│   │
│   ├── authorized.spec.ts                  # Tests for authorized access scenarios
│   ├── autosave.spec.ts                    # Tests for autosave functionality
│   ├── comments.spec.ts                    # Tests for comment functionality
│   ├── filter.spec.ts                      # Tests for filtering capabilities
│   ├── fullPia.spec.ts                     # Comprehensive tests covering the full PIA process
│   ├── keyboard.spec.ts                    # Tests for keyboard navigation and shortcuts
│   ├── landingPage.spec.ts                 # Tests for the landing page
│   ├── orderedList.spec.ts                 # Tests for ordered list features
│   ├── search.spec.ts                      # Tests for search functionality
│   ├── textEditor.spec.ts                  # Tests for text editor interactions
│   └── unauthorized.spec.ts                # Tests for unauthorized access scenarios
│
├── .env                                    # Environment variables for the e2e tests
├── .env-template                           # Template for the environment variables
├── .eslintrc.js                            # ESLint configuration for linting TypeScript files
├── .prettierrc                             # Prettier configuration for code formatting
├── package.json                            # NPM package file with dependencies and scripts
├── playwright.config.ts                    # Playwright configuration for the e2e tests
└── tsconfig.json                           # TypeScript configuration for the e2e tests
