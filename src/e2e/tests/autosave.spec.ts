import { test, expect } from '@playwright/test';
import { drafterLogin, mpoLogin, cpoLogin, logout } from './utils';
import { basicPiaFill } from './modules';

// Define an array of user roles and their corresponding login and logout functions
const userRoles = [
  { role: 'Drafter', login: drafterLogin, logout },
  { role: 'MPO', login: mpoLogin, logout },
  { role: 'CPO', login: cpoLogin, logout },
];

// Loop over each user role
for (const user of userRoles) {
  // Define a test for each user role
  test(`Autosave on PIA Intake form as ${user.role}`, async ({ page }) => {
    // Log in as the current user
    await user.login(page);

    // Click on the 'Create new' button
    await page.getByLabel('Create new').click();

    // Click on the 'Start PIA Intake' link
    await page.getByRole('link', { name: 'Start PIA Intake' }).click();

    // Fill out the basic PIA form
    await basicPiaFill(page);

    // Navigate to the next steps page
    await expect(page).toHaveURL(/\/nextSteps\/edit$/);

    // Log out as the current user
    await user.logout(page);
  });
}
