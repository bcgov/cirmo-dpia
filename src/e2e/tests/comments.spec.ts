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

test.describe.configure({ mode: 'serial' });
// Loop over each user role
for (const user of userRoles) {
  // Define a test for each user role
  test(`Add multiple comments as ${user.role}`, async ({ page }) => {
    test.slow();
    // User logs in
    await user.login(page);

    // Navigate to 'Create new' and initiate 'Start PIA Intake'
    const createNewButton = page.getByLabel('Create new');
    await createNewButton.waitFor({ state: 'visible' });
    await createNewButton.click();

    const startPiaIntakeLink = page.getByRole('link', {
      name: 'Start PIA Intake',
    });
    await startPiaIntakeLink.waitFor({ state: 'visible' });
    await startPiaIntakeLink.click();

    // Fill out the PIA form using a unique identifier
    await basicPiaFill(page, uuid);

    // Navigate to PIA Intake section
    const piaIntakeButton = page.getByLabel('PIA Intake');
    await piaIntakeButton.waitFor({ state: 'visible' });
    await piaIntakeButton.click();

    // Loop to add comments to multiple sections
    for (let section = 0; section < 4; section++) {
      // Open the comment section
      const viewCommentsButton = page.getByLabel('View comments').nth(section);
      await viewCommentsButton.waitFor({ state: 'visible' });
      await viewCommentsButton.click();

      // Add comments in the opened section
      for (let i = 1; i <= 10 - section; i++) {
        const commentInput = page.getByPlaceholder('Write a comment...');
        await commentInput.waitFor({ state: 'visible' });
        await commentInput.click();
        await commentInput.fill(
          `${i} Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        );

        const addCommentButton = page.getByLabel('Add New Comment Button');
        await addCommentButton.waitFor({ state: 'visible' });
        await addCommentButton.click();
      }

      // Verify if the first comment was added successfully
      const firstComment = page.locator('#CommentSidebarComment').nth(0);
      await firstComment.scrollIntoViewIfNeeded();
      await firstComment.waitFor({ state: 'visible' });
      await expect(firstComment).toBeVisible();

      // Verify if the last comment was added successfully
      const lastComment = page
        .locator('#CommentSidebarComment')
        .nth(9 - section);
      await lastComment.scrollIntoViewIfNeeded();
      await lastComment.waitFor({ state: 'visible' });
      await expect(lastComment).toBeVisible();
    }

    // Submit the form and confirm submission
    const submitButton = page.getByLabel('Submit Button');
    await submitButton.waitFor({ state: 'visible' });
    await submitButton.click();

    const confirmSubmitButton = page.getByLabel('Yes, submit');
    await confirmSubmitButton.waitFor({ state: 'visible' });
    await confirmSubmitButton.click();

    // User logs out
    await user.logout(page);
  });
}
