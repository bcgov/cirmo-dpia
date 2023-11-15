import { test, expect } from '@playwright/test';
import {
  drafterLogin,
  mpoLogin,
  cpoLogin,
  logout,
  generateUUID,
} from './utils';
import { basicPiaFill } from './modules';

// Define an array of user roles and their corresponding login and logout functions
const userRoles = [
  { role: 'Drafter', login: drafterLogin, logout },
  { role: 'MPO', login: mpoLogin, logout },
  { role: 'CPO', login: cpoLogin, logout },
];

// Generate a unique identifier for the test run
const uuid = generateUUID();

// Loop over each user role
for (const user of userRoles) {
  // Define a test for each user role
  test(`Add multiple comments as ${user.role}`, async ({ page }) => {
    // Log in as the current user
    await user.login(page);

    // Click on 'Create new' and then 'Start PIA Intake'
    await page.getByLabel('Create new').click();
    await page.getByRole('link', { name: 'Start PIA Intake' }).click();

    // Fill out the basic PIA form using the unique identifier
    await basicPiaFill(page, uuid);
    await page.getByLabel('PIA Intake').click();

    // Click on 'View comments' for section 1
    await page.getByLabel('View comments').first().click();
    // Click on the comment input field and add a comment 10 times
    for (let i = 1; i <= 10; i++) {
      await page.getByPlaceholder('Write a comment...').click();
      await page
        .getByPlaceholder('Write a comment...')
        .fill(`${i} Lorem ipsum dolor sit amet, consectetur adipiscing elit.`);
      await page.getByLabel('Add New Comment Button').click();
    }
    // Check if the last comment was added successfully
    await expect(
      page.locator('div:nth-child(10) > div:nth-child(2)'),
    ).toHaveText('10 Lorem ipsum dolor sit amet, consectetur adipiscing elit.');

    // Click on 'View comments' for section 2
    await page.getByLabel('View comments').nth(1).click();
    // Click on the comment input field and add a comment 9 times
    for (let i = 1; i <= 9; i++) {
      await page.getByPlaceholder('Write a comment...').click();
      await page
        .getByPlaceholder('Write a comment...')
        .fill(`${i} Lorem ipsum dolor sit amet, consectetur adipiscing elit.`);
      await page.getByLabel('Add New Comment Button').click();
    }
    // Check if the last comment was added successfully
    await expect(
      page.locator('div:nth-child(9) > div:nth-child(2)'),
    ).toHaveText('9 Lorem ipsum dolor sit amet, consectetur adipiscing elit.');

    // Click on 'View comments' for section 3
    await page.getByLabel('View comments').nth(2).click();
    // Click on the comment input field and add a comment 8 times
    for (let i = 1; i <= 8; i++) {
      await page.getByPlaceholder('Write a comment...').click();
      await page
        .getByPlaceholder('Write a comment...')
        .fill(`${i} Lorem ipsum dolor sit amet, consectetur adipiscing elit.`);
      await page.getByLabel('Add New Comment Button').click();
    }
    // Check if the last comment was added successfully
    await expect(
      page.locator('div:nth-child(8) > div:nth-child(2)'),
    ).toHaveText('8 Lorem ipsum dolor sit amet, consectetur adipiscing elit.');

    // Click on 'View comments' for section 4
    await page.getByLabel('View comments').nth(3).click();
    // Click on the comment input field and add a comment 7 times
    for (let i = 1; i <= 7; i++) {
      await page.getByPlaceholder('Write a comment...').click();
      await page
        .getByPlaceholder('Write a comment...')
        .fill(`${i} Lorem ipsum dolor sit amet, consectetur adipiscing elit.`);
      await page.getByLabel('Add New Comment Button').click();
    }
    // Check if the last comment was added successfully
    await expect(
      page.locator('div:nth-child(7) > div:nth-child(2)'),
    ).toHaveText('7 Lorem ipsum dolor sit amet, consectetur adipiscing elit.');

    // Click on 'Submit Button' and confirm submission
    await page.getByLabel('Submit Button').click();
    await page.getByLabel('Yes, submit').click();

    // Log out as the current user
    await user.logout(page);
  });
}
