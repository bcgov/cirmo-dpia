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
  test(`Sort PIAs as ${user.role}`, async ({ page }) => {
    // Log in as the current user
    await user.login(page);

    // Navigate to the PIA list page
    await page.goto('/pia/list');
    await expect(page).toHaveURL('/pia/list');

    // check defaults
    await expect(
      page.getByLabel('Last modified sort descending button'),
    ).toBeVisible();
    await expect(page.getByLabel('Drafter sort by button')).toBeVisible();

    // click last modified, expect no sort and excpect drafter default
    await page.getByLabel('Last modified', { exact: true }).click();
    await expect(page.getByLabel('Last modified sort by button')).toBeVisible();
    await expect(page.getByLabel('Drafter sort by button')).toBeVisible();

    // click last modified, expect ascending and excpect drafter default
    await page.getByLabel('Last modified', { exact: true }).click();
    await expect(
      page.getByLabel('Last modified sort ascending button'),
    ).toBeVisible();
    await expect(page.getByLabel('Drafter sort by button')).toBeVisible();

    // click last modified, expect descending and excpect drafter default
    await page.getByLabel('Last modified', { exact: true }).click();
    await expect(
      page.getByLabel('Last modified sort descending button'),
    ).toBeVisible();
    await expect(page.getByLabel('Drafter sort by button')).toBeVisible();

    // click last modified, expect no sort and excpect drafter default
    await page.getByLabel('Last modified', { exact: true }).click();
    await expect(page.getByLabel('Last modified sort by button')).toBeVisible();
    await expect(page.getByLabel('Drafter sort by button')).toBeVisible();

    // Refresh the page
    await page.goto('/pia/list');
    await expect(page).toHaveURL('/pia/list');

    // check defaults
    await expect(
      page.getByLabel('Last modified sort descending button'),
    ).toBeVisible();
    await expect(page.getByLabel('Drafter sort by button')).toBeVisible();

    // click drafter, expect ascending and excpect last modified default
    await page.getByLabel('Drafter', { exact: true }).click();
    await expect(
      page.getByLabel('Drafter sort ascending button'),
    ).toBeVisible();
    await expect(page.getByLabel('Last modified sort by button')).toBeVisible();

    // click drafter, expect descending and excpect last modified default
    await page.getByLabel('Drafter', { exact: true }).click();
    await expect(
      page.getByLabel('Drafter sort descending button'),
    ).toBeVisible();
    await expect(page.getByLabel('Last modified sort by button')).toBeVisible();

    // click drafter, expect no sort and excpect last modified default
    await page.getByLabel('Drafter', { exact: true }).click();
    await expect(page.getByLabel('Drafter sort by button')).toBeVisible();
    await expect(page.getByLabel('Last modified sort by button')).toBeVisible();

    // Refresh the page
    await page.goto('/pia/list');
    await expect(page).toHaveURL('/pia/list');

    // check defaults
    await expect(
      page.getByLabel('Last modified sort descending button'),
    ).toBeVisible();
    await expect(page.getByLabel('Drafter sort by button')).toBeVisible();

    // Log out as the current user
    await user.logout(page);
  });
}
