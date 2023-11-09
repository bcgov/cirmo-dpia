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
  test(`test autosave on PIA Intake form as ${user.role}`, async ({ page }) => {
    // Log in as the current user
    await user.login(page);

    // Click on the 'Create new' button
    await page.getByLabel('Create new').click();

    // Click on the 'Start PIA Intake' link
    await page.getByRole('link', { name: 'Start PIA Intake' }).click();

    // Click on the 'Initiative title (required)' field
    await page.getByLabel('Initiative title (required)').click();

    // Fill in the 'Initiative title (required)' field with 'TEST'
    await page.getByLabel('Initiative title (required)').fill('TEST');

    // Verify that the form was saved
    await expect(
      page
        .locator('div')
        .filter({ hasText: /^Saved at/ })
        .nth(1),
    ).toHaveText(/^Saved at/);

    // Log out as the current user
    await user.logout(page);
  });
}
