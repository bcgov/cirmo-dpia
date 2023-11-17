import { Page, expect } from '@playwright/test';

/* 
Test code for CPO PIA form filling. This function fills out the full PIA Form as a CPO. It then submits the form and continues until full PIA completion.
*/
export async function cpoPiaFill(page: Page, uuid: string) {
  // Collection, use and disclosure Form Tab
  async function fillCollectionUseDisclosureComments() {
    await page
      .getByLabel('Collection, use and disclosure')
      .waitFor({ state: 'visible' });
    await page.getByLabel('Collection, use and disclosure').click();

    await page.getByLabel('View comments').nth(1).waitFor({ state: 'visible' });
    await page.getByLabel('View comments').nth(1).click();

    for (let i = 0; i < 5; i++) {
      await page
        .getByPlaceholder('Write a comment...')
        .waitFor({ state: 'visible' });
      await page.getByPlaceholder('Write a comment...').click();
      await page
        .getByPlaceholder('Write a comment...')
        .fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
      await page.getByLabel('Add New Comment Button').click();
    }

    await page
      .getByLabel('Comment Options Button')
      .first()
      .waitFor({ state: 'visible' });
    await page.getByLabel('Comment Options Button').first().click();
    await page
      .getByRole('list', { name: 'Comment Options Menu' })
      .locator('button')
      .waitFor({ state: 'visible' });
    await page
      .getByRole('list', { name: 'Comment Options Menu' })
      .locator('button')
      .click();
    await page
      .getByLabel('Delete', { exact: true })
      .waitFor({ state: 'visible' });
    await page.getByLabel('Delete', { exact: true }).click();
  }

  async function CollectionUseDisclosureSubmit() {
    await page.getByLabel('Next Button').waitFor({ state: 'visible' });
    await page.getByLabel('Next Button').click();
  }

  // Storing Personal Information Form Tab
  async function fillStoringPersonalInformationComments() {
    // For the first set of comments
    let locator = page.locator('form div').filter({
      hasText:
        'Is any personal information stored outside of Canada?YesWhere are you storing th',
    });
    await locator.getByLabel('View comments').waitFor({ state: 'visible' });
    await locator.getByLabel('View comments').click();

    // Add and delete comments
    for (let i = 0; i < 2; i++) {
      await page
        .getByPlaceholder('Write a comment...')
        .waitFor({ state: 'visible' });
      await page.getByPlaceholder('Write a comment...').click();
      await page
        .getByPlaceholder('Write a comment...')
        .fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
      await page.getByLabel('Add New Comment Button').click();
    }

    await page
      .getByLabel('Comment Options Button')
      .waitFor({ state: 'visible' });
    await page.getByLabel('Comment Options Button').click();
    await page
      .getByRole('list', { name: 'Comment Options Menu' })
      .locator('button')
      .waitFor({ state: 'visible' });
    await page
      .getByRole('list', { name: 'Comment Options Menu' })
      .locator('button')
      .click();
    await page
      .getByLabel('Delete', { exact: true })
      .waitFor({ state: 'visible' });
    await page.getByLabel('Delete', { exact: true }).click();

    // For the second set of comments
    locator = page.locator('form div').filter({
      hasText:
        'Provide details about how you will track access to sensitive personal informatio',
    });
    await locator.getByLabel('View comments').waitFor({ state: 'visible' });
    await locator.getByLabel('View comments').click();

    // Add comments
    for (let i = 0; i < 2; i++) {
      await page
        .getByPlaceholder('Write a comment...')
        .waitFor({ state: 'visible' });
      await page.getByPlaceholder('Write a comment...').click();
      await page
        .getByPlaceholder('Write a comment...')
        .fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
      await page.getByLabel('Add New Comment Button').click();
    }

    await page
      .getByLabel('Comment Options Button')
      .first()
      .waitFor({ state: 'visible' });
    await page.getByLabel('Comment Options Button').first().click();
    await page
      .getByRole('list', { name: 'Comment Options Menu' })
      .locator('button')
      .waitFor({ state: 'visible' });
    await page
      .getByRole('list', { name: 'Comment Options Menu' })
      .locator('button')
      .click();
    await page
      .getByLabel('Delete', { exact: true })
      .waitFor({ state: 'visible' });
    await page.getByLabel('Delete', { exact: true }).click();
  }

  async function StoringPersonalInformationSubmit() {
    await page.getByLabel('Next Button').waitFor({ state: 'visible' });
    await page.getByLabel('Next Button').click();
  }

  // Security of Personal Information Form Tab
  async function fillSecurityOfPersonalInformationComments() {
    await page
      .getByLabel('View comments')
      .first()
      .waitFor({ state: 'visible' });
    await page.getByLabel('View comments').first().click();

    for (let i = 0; i < 2; i++) {
      await page
        .getByPlaceholder('Write a comment...')
        .waitFor({ state: 'visible' });
      await page.getByPlaceholder('Write a comment...').click();
      await page
        .getByPlaceholder('Write a comment...')
        .fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
      await page.getByLabel('Add New Comment Button').click();
    }
  }

  async function SecurityOfPersonalInformationSubmit() {
    await page.getByLabel('Next Button').waitFor({ state: 'visible' });
    await page.getByLabel('Next Button').click();
  }

  // Accuracy, Correction and Retention Form Tab
  async function fillAccuracyCorrectionRetentionComments() {
    const locator = page.locator('form div').filter({
      hasText:
        'Does your initiative use personal information to make decisions that directly af',
    });
    await locator.getByLabel('View comments').waitFor({ state: 'visible' });
    await locator.getByLabel('View comments').click();

    for (let i = 0; i < 2; i++) {
      await page
        .getByPlaceholder('Write a comment...')
        .waitFor({ state: 'visible' });
      await page.getByPlaceholder('Write a comment...').click();
      await page
        .getByPlaceholder('Write a comment...')
        .fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
      await page.getByLabel('Add New Comment Button').click();
    }
  }

  async function AccuracyCorrectionRetentionSubmit() {
    await page.getByLabel('Next Button').waitFor({ state: 'visible' });
    await page.getByLabel('Next Button').click();
  }

  // Agreements and Information Banks Form Tab
  async function fillAgreementsInformationBanksComments() {
    await page.getByLabel('View comments').nth(1).waitFor({ state: 'visible' });
    await page.getByLabel('View comments').nth(1).click();

    for (let i = 0; i < 4; i++) {
      await page
        .getByPlaceholder('Write a comment...')
        .waitFor({ state: 'visible' });
      await page.getByPlaceholder('Write a comment...').click();
      await page
        .getByPlaceholder('Write a comment...')
        .fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
      await page.getByLabel('Add New Comment Button').click();
    }

    await page
      .getByLabel('Comment Options Button')
      .first()
      .waitFor({ state: 'visible' });
    await page.getByLabel('Comment Options Button').first().click();
    await page
      .getByRole('list', { name: 'Comment Options Menu' })
      .locator('button')
      .waitFor({ state: 'visible' });
    await page
      .getByRole('list', { name: 'Comment Options Menu' })
      .locator('button')
      .click();
    await page
      .getByLabel('Delete', { exact: true })
      .waitFor({ state: 'visible' });
    await page.getByLabel('Delete', { exact: true }).click();
  }

  async function AgreementsInformationBanksSubmit() {
    for (let i = 0; i < 3; i++) {
      await page.getByLabel('Next Button').waitFor({ state: 'visible' });
      await page.getByLabel('Next Button').click();
    }
  }

  // Review Form Tab
  async function fillReviewRoles() {
    await page
      .getByRole('button', { name: 'Add a role' })
      .waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Add a role' }).click();

    await page
      .getByLabel('Select a role from the list')
      .waitFor({ state: 'visible' });
    await page
      .getByLabel('Select a role from the list')
      .selectOption('EX_DIRECTOR');

    await page
      .getByRole('button', { name: 'Add' })
      .first()
      .waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Add' }).first().click();

    await page
      .getByLabel('Enter a role not in list')
      .waitFor({ state: 'visible' });
    await page.getByLabel('Enter a role not in list').click();
    await page.getByLabel('Enter a role not in list').fill('Tester 2');

    const addRoleLocator = page
      .locator('div')
      .filter({ hasText: /^Enter a role not in listAdd$/ });
    await addRoleLocator.getByRole('button').waitFor({ state: 'visible' });
    await addRoleLocator.getByRole('button').click();
  }

  async function fillReviewComment() {
    await page
      .getByLabel(
        'I have reviewed this PIA based on the material provided to CPO as of the current date.',
      )
      .waitFor({ state: 'visible' });
    await page
      .getByLabel(
        'I have reviewed this PIA based on the material provided to CPO as of the current date.',
      )
      .check();

    await page.locator('textarea').waitFor({ state: 'visible' });
    await page.locator('textarea').click();
    await page
      .locator('textarea')
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ... Duis in diam dapibus, suscipit massa at, aliquam sapien.',
      );

    await page
      .getByRole('button', { name: 'Confirm' })
      .waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Confirm' }).click();
  }

  async function ReviewSubmit() {
    await page
      .locator('.collapsible__header')
      .first()
      .waitFor({ state: 'visible' });
    await page.locator('.collapsible__header').first().click();

    await page.getByLabel('PIA Intake').waitFor({ state: 'visible' });
    await page.getByLabel('PIA Intake').click();

    await page.getByLabel('Submit Button').waitFor({ state: 'visible' });
    await page.getByLabel('Submit Button').click();

    await page.getByLabel('Yes, finish').waitFor({ state: 'visible' });
    await page.getByLabel('Yes, finish').click();
  }

  // Final Review Form Tab
  // Check for autosave
  async function verifyFinalReviewAutosave() {
    const locator = page
      .locator('div')
      .filter({ hasText: /^Saved at/ })
      .nth(1);
    await locator.waitFor({ state: 'visible', timeout: 80000 });
    await expect(locator).toHaveText(/^Saved at/);
  }

  async function fillFinalReview1() {
    await page.getByLabel('Next Button').waitFor({ state: 'visible' });
    await page.getByLabel('Next Button').click();

    await page
      .getByLabel('Review', { exact: true })
      .waitFor({ state: 'visible' });
    await page.getByLabel('Review', { exact: true }).click();

    const acknowledgmentCheckbox =
      'I acknowledge that this PIA accurately documents the data elements and information flow at the time of this review. If there are any changes to the overall initiative, including to the way personal information is collected, used, stored or disclosed, the program area will engage with their Privacy Office and if necessary, complete a PIA update.';
    await page
      .getByLabel(acknowledgmentCheckbox)
      .first()
      .waitFor({ state: 'visible' });
    await page.getByLabel(acknowledgmentCheckbox).first().check();

    await page.getByRole('textbox').first().waitFor({ state: 'visible' });
    await page.getByRole('textbox').first().click();
    await page
      .getByRole('textbox')
      .first()
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ... Duis in diam dapibus, suscipit massa at, aliquam sapien.',
      );

    await page
      .getByRole('button', { name: 'Confirm' })
      .first()
      .waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Confirm' }).first().click();
  }

  async function fillFinalReview2() {
    const acknowledgmentCheckbox2 =
      'I acknowledge that this PIA accurately documents the data elements and information flow at the time of this review. If there are any changes to the overall initiative, including to the way personal information is collected, used, stored or disclosed, the program area will engage with their Privacy Office and if necessary, complete a PIA update.';
    await page
      .getByLabel(acknowledgmentCheckbox2)
      .nth(1)
      .waitFor({ state: 'visible' });
    await page.getByLabel(acknowledgmentCheckbox2).nth(1).check();

    await page.getByRole('textbox').first().waitFor({ state: 'visible' });
    await page.getByRole('textbox').first().click();
    await page
      .getByRole('textbox')
      .first()
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ... Duis in diam dapibus, suscipit massa at, aliquam sapien.',
      );

    await page
      .getByRole('button', { name: 'Confirm' })
      .first()
      .waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Confirm' }).first().click();
  }

  async function fillFinalReview3() {
    const acknowledgmentCheckbox3 =
      'I acknowledge that this PIA accurately documents the data elements and information flow at the time of this review. If there are any changes to the overall initiative, including to the way personal information is collected, used, stored or disclosed, the program area will engage with their Privacy Office and if necessary, complete a PIA update.';
    await page
      .getByLabel(acknowledgmentCheckbox3)
      .nth(2)
      .waitFor({ state: 'visible' });
    await page.getByLabel(acknowledgmentCheckbox3).nth(2).check();

    await page.getByRole('textbox').first().waitFor({ state: 'visible' });
    await page.getByRole('textbox').first().click();
    await page
      .getByRole('textbox')
      .first()
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ... Duis in diam dapibus, suscipit massa at, aliquam sapien.',
      );

    await page
      .getByRole('button', { name: 'Confirm' })
      .first()
      .waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Confirm' }).first().click();
  }

  async function fillFinalReview4() {
    const acknowledgmentCheckbox4 =
      'I acknowledge that this PIA accurately documents the data elements and information flow at the time of this review. If there are any changes to the overall initiative, including to the way personal information is collected, used, stored or disclosed, the program area will engage with their Privacy Office and if necessary, complete a PIA update.';
    await page
      .getByLabel(acknowledgmentCheckbox4)
      .nth(3)
      .waitFor({ state: 'visible' });
    await page.getByLabel(acknowledgmentCheckbox4).nth(3).check();

    await page.getByRole('textbox').first().waitFor({ state: 'visible' });
    await page.getByRole('textbox').first().click();
    await page
      .getByRole('textbox')
      .first()
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ... Duis in diam dapibus, suscipit massa at, aliquam sapien.',
      );

    await page
      .getByRole('button', { name: 'Confirm' })
      .first()
      .waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Confirm' }).first().click();
  }

  async function fillFinalReview5() {
    const acknowledgmentCheckbox5 =
      'I acknowledge that this PIA accurately documents the data elements and information flow at the time of this review. If there are any changes to the overall initiative, including to the way personal information is collected, used, stored or disclosed, the program area will engage with their Privacy Office and if necessary, complete a PIA update.';
    await page
      .getByLabel(acknowledgmentCheckbox5)
      .nth(4)
      .waitFor({ state: 'visible' });
    await page.getByLabel(acknowledgmentCheckbox5).nth(4).check();

    await page.getByRole('textbox').first().waitFor({ state: 'visible' });
    await page.getByRole('textbox').first().click();
    await page
      .getByRole('textbox')
      .first()
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ... Duis in diam dapibus, suscipit massa at, aliquam sapien.',
      );

    await page
      .getByRole('button', { name: 'Confirm' })
      .first()
      .waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Confirm' }).first().click();
  }

  async function fillFinalReviewSubmit() {
    await page.getByLabel('PIA Intake').waitFor({ state: 'visible' });
    await page.getByLabel('PIA Intake').click();

    await page.getByLabel('Submit Button').waitFor({ state: 'visible' });
    await page.getByLabel('Submit Button').click();

    await page.getByLabel('Yes, submit').waitFor({ state: 'visible' });
    await page.getByLabel('Yes, submit').click();
  }

  // Pending Completion Form Tab
  // Check for autosave
  async function verifyPendingCompletionAutosave() {
    const locator = page
      .locator('div')
      .filter({ hasText: /^Saved at/ })
      .nth(1);
    await locator.waitFor({ state: 'visible', timeout: 80000 });
    await expect(locator).toHaveText(/^Saved at/);
  }

  async function PendingCompletionSubmit() {
    await page
      .getByLabel('Review', { exact: true })
      .waitFor({ state: 'visible' });
    await page.getByLabel('Review', { exact: true }).click();

    await page.getByLabel('Submit Button').waitFor({ state: 'visible' });
    await page.getByLabel('Submit Button').click();

    await page.getByLabel('Yes, complete').waitFor({ state: 'visible' });
    await page.getByLabel('Yes, complete').click();
  }

  // Complete Form Tab
  // Check for autosave
  async function verifyCompleteAutosave() {
    const locator = page
      .locator('div')
      .filter({ hasText: /^Saved at/ })
      .nth(1);
    await locator.waitFor({ state: 'visible', timeout: 80000 });
    await expect(locator).toHaveText(/^Saved at/);
  }

  // Completed PIAs Tab
  async function verifyCompletedPIAs() {
    await page.getByLabel('Completed PIAs').waitFor({ state: 'visible' });
    await page.getByLabel('Completed PIAs').click();

    // Navigate to the specified URL
    await page.goto('/pia/completed?filterByStatus=COMPLETE');

    // Verify that the page URL is as expected
    await expect(page).toHaveURL('/pia/completed?filterByStatus=COMPLETE', {
      timeout: 80000,
    });
  }

  async function verifyPIAIntake() {
    // Click on the search input field
    await page
      .getByPlaceholder('Search by title or drafter')
      .waitFor({ state: 'visible' });
    await page.getByPlaceholder('Search by title or drafter').click();

    // Fill the search input field with the unique identifier
    await page
      .getByPlaceholder('Search by title or drafter')
      .fill(`TEST_${uuid}`);

    // Click the search submit button
    await page.getByLabel('Search submit button').waitFor({ state: 'visible' });
    await page.getByLabel('Search submit button').click();

    // Click on the cell corresponding to the searched PIA
    const cellLocator = page.getByRole('cell', { name: `TEST_${uuid}` });
    await cellLocator.waitFor({ state: 'visible' });
    await cellLocator.click();

    // Check and expect the URL to be on the PIA intake view page
    await expect(page).toHaveURL(/\/intake\/view$/, { timeout: 80000 });

    // Check and expect the heading (title) to match the unique identifier
    const headingLocator = page.getByRole('heading', { name: `TEST_${uuid}` });
    await headingLocator.waitFor({ state: 'visible' });
    await expect(headingLocator).toHaveText(`TEST_${uuid}`);

    // Check status
    const statusLocator = page.getByText('Complete', { exact: true });
    await statusLocator.waitFor({ state: 'visible' });
    await expect(statusLocator).toHaveText('Complete');
  }

  await fillCollectionUseDisclosureComments();
  await CollectionUseDisclosureSubmit();
  await fillStoringPersonalInformationComments();
  await StoringPersonalInformationSubmit();
  await fillSecurityOfPersonalInformationComments();
  await SecurityOfPersonalInformationSubmit();
  await fillAccuracyCorrectionRetentionComments();
  await AccuracyCorrectionRetentionSubmit();
  await fillAgreementsInformationBanksComments();
  await AgreementsInformationBanksSubmit();
  await fillReviewRoles();
  await fillReviewComment();
  await ReviewSubmit();
  await verifyFinalReviewAutosave();
  await fillFinalReview1();
  await fillFinalReview2();
  await fillFinalReview3();
  await fillFinalReview4();
  await fillFinalReview5();
  await fillFinalReviewSubmit();
  await verifyPendingCompletionAutosave();
  await PendingCompletionSubmit();
  await verifyCompleteAutosave();
  await verifyCompletedPIAs();
  await verifyPIAIntake();
}
