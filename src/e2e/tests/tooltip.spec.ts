import { test, expect } from '@playwright/test';
import {
  drafterLogin,
  mpoLogin,
  cpoLogin,
  logout,
  generateUUID,
  searchUUID,
} from './utils';
import { basicPiaFill } from './modules';

// Define an array of user roles and their corresponding login and logout functions
const userRoles = [
  { role: 'Drafter', login: drafterLogin, logout },
  { role: 'MPO', login: mpoLogin, logout },
  { role: 'CPO', login: cpoLogin, logout },
];

// Loop over each user role
for (const user of userRoles) {
  // Generate a unique identifier for the test run
  const uuid = generateUUID();

  // Define a test for each user role
  test(`Tooltip on active PIA page as ${user.role}`, async ({ page }) => {
    // Log in as the current user
    await user.login(page);

    // Hover over the 'PIA status' SVG to display the tooltip
    await page.getByLabel('PIA status').locator('svg').hover();

    // Verify that the tooltip text is displayed correctly
    await expect(
      page.getByLabel('PIA status').locator('div').nth(2).filter({
        hasText:
          'Incomplete:This PIA has not been submitted and is only visible to its drafter. Submit at any time to get help or a review from the MPO.Edit in progress:This PIA has been shared with the MPO (Ministry Privacy Office) and they are able to view and guide you as you make changes.MPO review:This PIA is ready for a review by the MPO (Ministry Privacy Office).CPO review:This PIA is ready for a review by the CPO (Corporate Privacy Office).Final review:Individuals required to review and accept accountability for the PIA are able to do so at this time.Pending completion:All required individuals have reviewed and accepted accountability. Awaiting upload to the PID (Personal Information Directory) to be finalized.Complete:PIA is complete.',
      }),
    ).toHaveText(
      'Incomplete:This PIA has not been submitted and is only visible to its drafter. Submit at any time to get help or a review from the MPO.Edit in progress:This PIA has been shared with the MPO (Ministry Privacy Office) and they are able to view and guide you as you make changes.MPO review:This PIA is ready for a review by the MPO (Ministry Privacy Office).CPO review:This PIA is ready for a review by the CPO (Corporate Privacy Office).Final review:Individuals required to review and accept accountability for the PIA are able to do so at this time.Pending completion:All required individuals have reviewed and accepted accountability. Awaiting upload to the PID (Personal Information Directory) to be finalized.Complete:PIA is complete.',
    );

    // Log out as the current user
    await user.logout(page);
  });

  // Define a test for each user role
  test(`Tooltip on PIA Intake form as ${user.role}`, async ({ page }) => {
    // Log in as the current user
    await user.login(page);

    // Click on 'Create new' and then 'Start PIA Intake'
    await page.getByLabel('Create new').click();
    await page.getByRole('link', { name: 'Start PIA Intake' }).click();

    // Hover over the SVG to display the tooltip
    await page.locator('div').locator('svg').nth(1).hover();

    // Verify the tooltip text
    await expect(
      page.getByText(
        'This PIA has not been submitted and is only visible to its drafter. Submit at any time to get help or a review from the MPO.',
      ),
    ).toHaveText(
      'This PIA has not been submitted and is only visible to its drafter. Submit at any time to get help or a review from the MPO.',
    );

    // Fill out the basic PIA form using the unique identifier
    await basicPiaFill(page, uuid);

    // Search for the PIA and open it
    await searchUUID(page, uuid);

    // Click on 'Submit Button' and confirm submission
    await page.getByLabel('Submit Button').click();
    await page.getByLabel('Yes, submit').click();
    await page.getByLabel('More options').click();

    // Hover over the SVG to display the tooltip
    await page.locator('div').locator('svg').nth(1).hover();

    // Verify the tooltip text
    await expect(
      page.getByText(
        'This PIA is ready for a review by the MPO (Ministry Privacy Office).',
      ),
    ).toHaveText(
      'This PIA is ready for a review by the MPO (Ministry Privacy Office).',
    );

    // Click on 'More options', 'Edit Button', and confirm continuation
    await page.getByLabel('More options').click();
    await page.getByLabel('Edit Button').click();
    await page.getByLabel('Yes, continue').click();
    await page.getByLabel('More options').click();

    // Hover over the SVG to display the tooltip
    await page.locator('div').locator('svg').nth(1).hover();

    // Verify the tooltip text
    await expect(
      page.getByText(
        'This PIA has been shared with the MPO (Ministry Privacy Office) and they are able to view and guide you as you make changes.',
      ),
    ).toHaveText(
      'This PIA has been shared with the MPO (Ministry Privacy Office) and they are able to view and guide you as you make changes.',
    );

    // Click on 'Submit Button' and confirm submission
    await page.getByLabel('Submit Button').click();
    await page.getByLabel('Yes, submit').click();

    // Log out as the current user
    await user.logout(page);
  });
}
