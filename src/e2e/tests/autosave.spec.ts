import { test, expect } from '@playwright/test';
import { drafterLogin, mpoLogin, cpoLogin, logout } from './utils';
import { basicPiaFill } from './modules';

// Define an array of user roles and their corresponding login and logout functions
const userRoles = [
  { role: 'Drafter', login: drafterLogin, logout },
  { role: 'MPO', login: mpoLogin, logout },
  { role: 'CPO', login: cpoLogin, logout },
];

test.describe.serial('Autosave Test', () => {
  // Loop over each user role
  for (const user of userRoles) {
    // Define a test for each user role
    test(`Autosave on PIA Intake form as ${user.role}`, async ({ page }) => {
      // Log in as the current user
      await user.login(page);

      // Ensure 'Create new' button is visible and clickable
      const createNewButton = page.getByLabel('Create new');
      await createNewButton.waitFor({ state: 'visible' });
      await createNewButton.click();

      // Click 'Start PIA Intake' and wait for the URL to change
      await Promise.all([
        page.waitForURL('/ppq'),
        page.getByRole('link', { name: 'Start PIA Intake' }).click(),
        page.waitForURL('/pia/new/intake'),
      ]);

      // Fill out the basic PIA form
      await basicPiaFill(page);

      // Wait for the URL to update to the next steps page
      await expect(page).toHaveURL(/\/nextSteps\/edit$/);

      // Log out as the current user
      await user.logout(page);
    });
  }
});
