import { expect, test } from '@playwright/test';
import {
  drafterLogin,
  mpoLogin,
  cpoLogin,
  logout,
  generateUUID,
  searchUUID,
} from './utils';
import { drafterPiaFill, mpoPiaFill, cpoPiaFill } from './modules';

// Generate a unique identifier for the test run
const uuid = generateUUID();

test.describe.serial('Full PIA Form Test', () => {
  // Test with Drafter role
  test('PIA form fill as Drafter', async ({ page }) => {
    // Log in as a Drafter
    await drafterLogin(page);

    await page.getByLabel('Create new').click();
    await page.getByRole('link', { name: 'Start PIA Intake' }).click();

    // Fill out the PIA form
    await drafterPiaFill(page, uuid);

    // Navigate and verify pia list URL
    await page.goto('/pia/list');
    await expect(page).toHaveURL('/pia/list');

    // Log out
    await logout(page);
  });

  // Test with MPO role
  test('PIA form fill as MPO', async ({ page }) => {
    // Log in as an MPO
    await mpoLogin(page);

    // using the unique identifier search for the PIA and open it
    await searchUUID(page, uuid);

    // change to edit in progress
    await page.getByLabel('Edit Button').click();
    await page.getByLabel('Yes, continue').click();
    await expect(page).toHaveURL(/\/intake\/edit$/);

    //fill out the PIA form. expect an autosave and submit the form and expect an intake view url
    await mpoPiaFill(page);

    // Navigate and verify pia list URL
    await page.goto('/pia/list');
    await expect(page).toHaveURL('/pia/list');

    // Log out
    await logout(page);
  });

  // Test with CPO role
  test('PIA form fill as CPO', async ({ page }) => {
    // Log in as a CPO
    await cpoLogin(page);

    // using the unique identifier search for the PIA and open it
    await searchUUID(page, uuid);

    //fill out the PIA form. expect an autosave and submit the form and expect an intake view url
    await cpoPiaFill(page, uuid);

    // Navigate and verify pia list URL
    await page.goto('/pia/list');
    await expect(page).toHaveURL('/pia/list');

    // Log out
    await logout(page);
  });
});
