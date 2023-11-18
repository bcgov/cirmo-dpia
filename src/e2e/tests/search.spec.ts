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

test.describe.serial('Search Test', () => {
  // Loop over each user role
  for (const user of userRoles) {
    // Define a test for each user role
    test(`Search PIAs as ${user.role}`, async ({ page }) => {
      // Generate a unique identifier for the test run
      const uuid = generateUUID();

      // Log in as the current user
      await user.login(page);

      // Click on 'Create new' and then 'Start PIA Intake'
      const createNewButton = page.getByLabel('Create new');
      await createNewButton.waitFor({ state: 'visible' });
      await createNewButton.click();

      const startPiaIntakeLink = page.getByRole('link', {
        name: 'Start PIA Intake',
      });
      await startPiaIntakeLink.waitFor({ state: 'visible' });
      await startPiaIntakeLink.click();

      // Fill out the basic PIA form using the unique identifier
      await basicPiaFill(page, uuid);

      // Navigate to the PIA list page
      await page.goto('/pia/list');
      await page.waitForURL('/pia/list');
      await expect(page).toHaveURL('/pia/list');

      // Click on the search input field
      const searchInput = page.getByPlaceholder('Search by title or drafter');
      await searchInput.waitFor({ state: 'visible' });
      await searchInput.click();

      // Fill the search input field with the unique identifier
      await searchInput.fill(`TEST_${uuid}`);

      // Click the search submit button
      const searchSubmitButton = page.getByLabel('Search submit button');
      await searchSubmitButton.waitFor({ state: 'visible' });
      await searchSubmitButton.click();

      // Find the cell corresponding to the searched PIA
      const searchedCell = page.getByRole('cell', { name: `TEST_${uuid}` });
      await searchedCell.waitFor({ state: 'visible' });
      await expect(searchedCell).toHaveText(`TEST_${uuid}`);

      // Clear the search
      const clearSearchButton = page.getByLabel('Clear search button');
      await clearSearchButton.waitFor({ state: 'visible' });
      await clearSearchButton.click();

      // Click on the search input field again
      await searchInput.click();

      // Fill the search input field with the unique identifier again
      await searchInput.fill(`TEST_${uuid}`);

      // Click the search submit button again
      await searchSubmitButton.click();

      // Click on the cell corresponding to the searched PIA
      const searchedCellClicked = page.getByRole('cell', {
        name: `TEST_${uuid}`,
      });
      await searchedCellClicked.waitFor({ state: 'visible' });
      await searchedCellClicked.click();

      // Check and expect the URL to be on the PIA intake view page
      await page.waitForURL(/\/intake\/view$/);
      await expect(page).toHaveURL(/\/intake\/view$/);

      // Check and expect the heading (title) to match the unique identifier
      const heading = page.getByRole('heading', { name: `TEST_${uuid}` });
      await heading.waitFor({ state: 'visible' });
      await expect(heading).toHaveText(`TEST_${uuid}`);

      // Log out as the current user
      await user.logout(page);
    });
  }
});
