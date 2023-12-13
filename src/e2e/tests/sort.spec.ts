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
  // Define a test for each user role
  test(`Sort PIAs as ${user.role}`, async ({ page }) => {
    test.slow();
    // Log in as the current user
    await user.login(page);

    // Navigate to the PIA list page
    await page.goto('/pia/list');
    await page.waitForURL('/pia/list');
    await expect(page).toHaveURL('/pia/list');

    // check defaults
    const lastModifiedSortButton = page.getByLabel(
      'Last modified sort descending button',
    );
    await lastModifiedSortButton.waitFor({ state: 'visible' });
    await expect(lastModifiedSortButton).toBeVisible();

    const defaultDrafterSortButton = page.getByLabel('Drafter sort by button');
    await defaultDrafterSortButton.waitFor({ state: 'visible' });
    await expect(defaultDrafterSortButton).toBeVisible();

    // click last modified, expect ascending and expect drafter default
    await page.getByLabel('Last modified sort descending button').click();
    await expect(
      page.getByLabel('Last modified sort ascending button'),
    ).toBeVisible();
    await expect(defaultDrafterSortButton).toBeVisible();

    // click last modified, expect no sort and expect drafter default
    await page.getByLabel('Last modified sort ascending button').click();
    await expect(page.getByLabel('Last modified sort by button')).toBeVisible();
    await expect(defaultDrafterSortButton).toBeVisible();

    // click last modified, expect descending and expect drafter default
    await page.getByLabel('Last modified sort by button').click();
    await expect(
      page.getByLabel('Last modified sort descending button'),
    ).toBeVisible();
    await expect(defaultDrafterSortButton).toBeVisible();

    // Refresh the page
    await page.goto('/pia/list');
    await page.waitForURL('/pia/list');
    await expect(page).toHaveURL('/pia/list');

    // check defaults
    await expect(lastModifiedSortButton).toBeVisible();
    await expect(defaultDrafterSortButton).toBeVisible();

    // click drafter, expect descending and expect last modified default
    const defaultLastModifiedSortButton = page.getByLabel(
      'Last modified sort by button',
    );
    await page.getByLabel('Drafter sort by button').click();
    await expect(
      page.getByLabel('Drafter sort descending button'),
    ).toBeVisible();
    await expect(defaultLastModifiedSortButton).toBeVisible();

    // click drafter, expect ascending and expect last modified default
    await page.getByLabel('Drafter sort descending button').click();
    await expect(
      page.getByLabel('Drafter sort ascending button'),
    ).toBeVisible();
    await expect(defaultLastModifiedSortButton).toBeVisible();

    // click drafter, expect no sort and expect last modified default
    await page.getByLabel('Drafter sort ascending button').click();
    await expect(page.getByLabel('Drafter sort by button')).toBeVisible();
    await expect(defaultLastModifiedSortButton).toBeVisible();

    // Refresh the page
    await page.goto('/pia/list');
    await page.waitForURL('/pia/list');
    await expect(page).toHaveURL('/pia/list');

    // check defaults
    await expect(lastModifiedSortButton).toBeVisible();
    await expect(defaultDrafterSortButton).toBeVisible();

    // Log out as the current user
    await user.logout(page);
  });
}
