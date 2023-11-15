import { test, expect } from '@playwright/test';
import { drafterLogin, mpoLogin, cpoLogin, logout } from './utils';

// Define an array of user roles and their corresponding login and logout functions
const userRoles = [
  { role: 'Drafter', login: drafterLogin, logout },
  { role: 'MPO', login: mpoLogin, logout },
  { role: 'CPO', login: cpoLogin, logout },
];

// Loop over each user role
for (const user of userRoles) {
  // Define a test for each user role
  test(`Unauthorized page as ${user.role}`, async ({ page }) => {
    // Log in as the current user
    await user.login(page);

    // Verify that the user is redirected to the PIA list page after logging in
    await expect(page).toHaveURL('/pia/list');

    // Verify that the 'Active PIAs' heading is displayed on the PIA list page
    await expect(page.getByRole('heading', { name: 'Active PIAs' })).toHaveText(
      'Active PIAs',
    );

    // Log out as the current user
    await user.logout(page);

    // Verify that the user is redirected to the home page
    await expect(page).toHaveURL('/');

    // try to navigate to the PIA list page
    await page.goto('/pia/list');

    // Verify that the user is redirected to the 'not authorized' page
    await expect(page).toHaveURL('/not-authorized');

    // Verify that the '401: Authorization required' heading is displayed on the 'not authorized' page
    await expect(
      page.getByRole('heading', { name: '401: Authorization required' }),
    ).toHaveText('401: Authorization required');
  });
}
