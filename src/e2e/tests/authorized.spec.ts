import { test, expect } from '@playwright/test';
import { drafterLogin, mpoLogin, cpoLogin, logout } from './utils';

// Define an array of user roles and their corresponding login and logout functions
const userRoles = [
  { role: 'Drafter', login: drafterLogin, logout },
  { role: 'MPO', login: mpoLogin, logout },
  { role: 'CPO', login: cpoLogin, logout },
];

test.describe.serial('Authorization Test', () => {
  // Loop over each user role
  for (const user of userRoles) {
    // Define a test for each user role
    test(`Authorized page as ${user.role}`, async ({ page }) => {
      // Log in as the current user
      await user.login(page);

      // Wait for and verify that the user is redirected to the PIA list page after logging in
      await page.waitForURL('/pia/list');
      await expect(page).toHaveURL('/pia/list');

      // Verify that the 'Active PIAs' heading is displayed on the PIA list page
      const activePIAsHeading = page.getByRole('heading', {
        name: 'Active PIAs',
      });
      await activePIAsHeading.waitFor({ state: 'visible' });
      await expect(activePIAsHeading).toHaveText('Active PIAs');

      // Log out as the current user
      await user.logout(page);
    });
  }
});
