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

test.describe.configure({ mode: 'serial' });
// Test with Drafter role
test('PIA form fill as Drafter', async ({ page }) => {
  test.slow();
  // Log in as a Drafter
  await drafterLogin(page);

  const createNewButton = page.getByLabel('Create new');
  await createNewButton.waitFor({ state: 'visible' });
  await createNewButton.click();

  const startPiaIntakeLink = page.getByRole('link', {
    name: 'Start PIA Intake',
  });
  await startPiaIntakeLink.waitFor({ state: 'visible' });
  await startPiaIntakeLink.click();

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
  test.slow();
  // Log in as an MPO
  await mpoLogin(page);

  // using the unique identifier search for the PIA and open it
  await searchUUID(page, uuid);

  // change to edit in progress
  const editButton = page.getByLabel('Edit Button');
  await editButton.waitFor({ state: 'visible' });
  await editButton.click();

  const continueButton = page.getByLabel('Yes, continue');
  await continueButton.waitFor({ state: 'visible' });
  await continueButton.click();
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
  test.slow();
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
