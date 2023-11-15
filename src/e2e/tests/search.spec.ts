import { test, expect } from '@playwright/test';
import {
  drafterLogin,
  mpoLogin,
  cpoLogin,
  logout,
  generateUUID,
} from './utils';
import { basicPiaFill } from './modules';

// Define an array of user roles and their corresponding login and logout functions
const userRoles = [
  { role: 'Drafter', login: drafterLogin, logout },
  { role: 'MPO', login: mpoLogin, logout },
  { role: 'CPO', login: cpoLogin, logout },
];

// Generate a unique identifier for the test run
const uuid = generateUUID();

// Loop over each user role
for (const user of userRoles) {
  // Define a test for each user role
  test(`Search PIAs as ${user.role}`, async ({ page }) => {
    // Log in as the current user
    await user.login(page);

    // Click on 'Create new' and then 'Start PIA Intake'
    await page.getByLabel('Create new').click();
    await page.getByRole('link', { name: 'Start PIA Intake' }).click();

    // Fill out the basic PIA form using the unique identifier
    await basicPiaFill(page, uuid);

    // Navigate to the PIA list page
    await page.goto('/pia/list');
    await expect(page).toHaveURL('/pia/list');

    // Click on the search input field
    await page.getByPlaceholder('Search by title or drafter').click();

    // Fill the search input field with the unique identifier
    await page
      .getByPlaceholder('Search by title or drafter')
      .fill(`TEST_${uuid}`);

    // Click the search submit button
    await page.getByLabel('Search submit button').click();

    // Find the cell corresponding to the searched PIA
    await expect(page.getByRole('cell', { name: `TEST_${uuid}` })).toHaveText(
      `TEST_${uuid}`,
    );

    // Clear the search
    await page.getByLabel('Clear search button').click();

    // Click on the search input field again
    await page.getByPlaceholder('Search by title or drafter').click();

    // Fill the search input field with the unique identifier again
    await page
      .getByPlaceholder('Search by title or drafter')
      .fill(`TEST_${uuid}`);

    // Click the search submit button again
    await page.getByLabel('Search submit button').click();

    // Click on the cell corresponding to the searched PIA
    await page.getByRole('cell', { name: `TEST_${uuid}` }).click();

    // Check and expect the URL to be on the PIA intake view page
    await expect(page).toHaveURL(/\/intake\/view$/);

    // Check and expect the heading (title) to match the unique identifier
    await expect(
      page.getByRole('heading', { name: `TEST_${uuid}` }),
    ).toHaveText(`TEST_${uuid}`);

    // Log out as the current user
    await user.logout(page);
  });
}
