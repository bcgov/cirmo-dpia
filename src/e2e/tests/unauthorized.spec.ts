import { test, expect } from '@playwright/test';
import { drafterLogin, mpoLogin, cpoLogin, logout } from './utils';

// Define an array of user roles and their corresponding login and logout functions
const userRoles = [
  { role: 'Drafter', login: drafterLogin, logout },
  { role: 'MPO', login: mpoLogin, logout },
  { role: 'CPO', login: cpoLogin, logout },
];

test.describe.configure({ mode: 'serial' });
// Loop over each user role
for (const user of userRoles) {
  test(`Unauthorized page as ${user.role}`, async ({ page }) => {
    test.slow();
    // Log in as the current user
    await user.login(page);

    // Wait for and verify redirection to the PIA list page after logging in
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

    // Wait for and verify redirection to the home page
    await page.waitForURL('/');
    await expect(page).toHaveURL('/');

    // Navigate to the PIA list page
    await page.goto('/pia/list');

    // Wait for and verify redirection to the 'not authorized' page
    await page.waitForURL('/not-authorized');
    await expect(page).toHaveURL('/not-authorized');

    // Verify that the '401: Authorization required' heading is displayed
    const authorizationRequiredHeading = page.getByRole('heading', {
      name: '401: Authorization required',
    });
    await authorizationRequiredHeading.waitFor({ state: 'visible' });
    await expect(authorizationRequiredHeading).toHaveText(
      '401: Authorization required',
    );
  });
}
