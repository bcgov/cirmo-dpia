import { Page, expect } from '@playwright/test';

/* 
Test code for MPO PIA form filling. This function fills out the full PIA Form as an MPO. It then submits the form and checks if the page redirects to '/intake/view'.
*/
export async function mpoPiaFill(page: Page) {
  //Collection, use and disclosure Form Tab
  async function fillCollectionUseDisclosureMPO1() {
    await page
      .getByLabel('Collection, use and disclosure')
      .waitFor({ state: 'visible' });
    await page.getByLabel('Collection, use and disclosure').click();

    const mpoLabel = 'Collection, use, disclosure (for MPO use only)';
    await page.getByLabel(mpoLabel).first().waitFor({ state: 'visible' });
    await page.getByLabel(mpoLabel).first().click();
    await page
      .getByLabel(mpoLabel)
      .first()
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae.',
      );
  }

  async function fillCollectionUseDisclosureFOIPPA1() {
    const foippaLabel = 'FOIPPA authority (for MPO use only)';
    await page.getByLabel(foippaLabel).first().waitFor({ state: 'visible' });
    await page.getByLabel(foippaLabel).first().click();
    await page
      .getByLabel(foippaLabel)
      .first()
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae.',
      );
  }

  async function fillCollectionUseDisclosureLegal1() {
    const legalLabel = 'Other legal authority (for MPO use only)';
    await page.getByLabel(legalLabel).first().waitFor({ state: 'visible' });
    await page.getByLabel(legalLabel).first().click();
    await page
      .getByLabel(legalLabel)
      .first()
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae.',
      );
  }

  async function fillCollectionUseDisclosureMPO2() {
    const mpoLabel2 = 'Collection, use, disclosure (for MPO use only)';
    await page.getByLabel(mpoLabel2).nth(1).waitFor({ state: 'visible' });
    await page.getByLabel(mpoLabel2).nth(1).click();
    await page
      .getByLabel(mpoLabel2)
      .nth(1)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae.',
      );
  }

  async function fillCollectionUseDisclosureFOIPPA2() {
    const foippaLabel2 = 'FOIPPA authority (for MPO use only)';
    await page.getByLabel(foippaLabel2).nth(1).waitFor({ state: 'visible' });
    await page.getByLabel(foippaLabel2).nth(1).click();
    await page
      .getByLabel(foippaLabel2)
      .nth(1)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae.',
      );
  }

  async function fillCollectionUseDisclosureLegal2() {
    const legalLabel2 = 'Other legal authority (for MPO use only)';
    await page.getByLabel(legalLabel2).nth(1).waitFor({ state: 'visible' });
    await page.getByLabel(legalLabel2).nth(1).click();
    await page
      .getByLabel(legalLabel2)
      .nth(1)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae.',
      );
  }

  async function fillCollectionUseDisclosureMPO3() {
    const mpoLabel3 = 'Collection, use, disclosure (for MPO use only)';
    await page.getByLabel(mpoLabel3).nth(2).waitFor({ state: 'visible' });
    await page.getByLabel(mpoLabel3).nth(2).click();
    await page
      .getByLabel(mpoLabel3)
      .nth(2)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae.',
      );
  }

  async function fillCollectionUseDisclosureFOIPPA3() {
    const foippaLabel3 = 'FOIPPA authority (for MPO use only)';
    await page.getByLabel(foippaLabel3).nth(2).waitFor({ state: 'visible' });
    await page.getByLabel(foippaLabel3).nth(2).click();
    await page
      .getByLabel(foippaLabel3)
      .nth(2)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae.',
      );
  }

  async function fillCollectionUseDisclosureLegal3() {
    const legalLabel3 = 'Other legal authority (for MPO use only)';
    await page.getByLabel(legalLabel3).nth(2).waitFor({ state: 'visible' });
    await page.getByLabel(legalLabel3).nth(2).click();
    await page
      .getByLabel(legalLabel3)
      .nth(2)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae.',
      );
  }

  async function fillCollectionUseDisclosureMPOTextArea() {
    const textArea = page.locator('#MPOCommentsDisclosure div').nth(2);
    await textArea.waitFor({ state: 'visible' });
    await textArea.click();
    await textArea.fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae.',
    );
  }

  // Storing Personal Information Form Tab
  async function fillStoringPersonalInformationComments() {
    const commentInputPlaceholder = 'Write a comment...';
    const addNewCommentButtonLabel = 'Add New Comment Button';
    const commentOptionsButtonLabel = 'Comment Options Button';
    const deleteButtonLabel = 'Delete';

    await page.getByLabel('Storing personal information').click();

    const commentsLocator = page.locator(
      'section:nth-child(4) > .drop-shadow > .d-flex > .bcgovbtn',
    );
    await commentsLocator.waitFor({ state: 'visible' });
    await commentsLocator.click();

    for (let i = 0; i < 3; i++) {
      const commentInput = page.getByPlaceholder(commentInputPlaceholder);
      await commentInput.waitFor({ state: 'visible' });
      await commentInput.click();
      await commentInput.fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      );
      const addNewCommentButton = page.getByLabel(addNewCommentButtonLabel);
      await addNewCommentButton.waitFor({ state: 'visible' });
      await addNewCommentButton.click();
    }

    const firstCommentOptionsButton = page
      .getByLabel(commentOptionsButtonLabel)
      .first();
    await firstCommentOptionsButton.waitFor({ state: 'visible' });
    await firstCommentOptionsButton.click();

    const commentOptionsMenu = page.getByRole('list', {
      name: 'Comment Options Menu',
    });
    await commentOptionsMenu.locator('button').click();

    const deleteButton = page.getByLabel(deleteButtonLabel, { exact: true });
    await deleteButton.waitFor({ state: 'visible' });
    await deleteButton.click();
  }

  async function storingPersonalInformationSubmit() {
    for (let i = 0; i < 2; i++) {
      await page.getByLabel('Next Button').waitFor({ state: 'visible' });
      await page.getByLabel('Next Button').click();
    }
  }

  // Accuracy, Correction and Retention Form Tab
  async function fillAccuracyCorrectionRetentionComments() {
    const commentInputPlaceholder = 'Write a comment...';
    const addNewCommentButtonLabel = 'Add New Comment Button';
    const commentOptionsButtonLabel = 'Comment Options Button';
    const deleteButtonLabel = 'Delete';

    const commentsLocator = page.getByLabel('View comments').first();
    await commentsLocator.waitFor({ state: 'visible' });
    await commentsLocator.click();

    for (let i = 0; i < 5; i++) {
      const commentInput = page.getByPlaceholder(commentInputPlaceholder);
      await commentInput.waitFor({ state: 'visible' });
      await commentInput.click();
      await commentInput.fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      );
      const addNewCommentButton = page.getByLabel(addNewCommentButtonLabel);
      await addNewCommentButton.waitFor({ state: 'visible' });
      await addNewCommentButton.click();
    }

    const firstCommentOptionsButton = page
      .getByLabel(commentOptionsButtonLabel)
      .first();
    await firstCommentOptionsButton.waitFor({ state: 'visible' });
    await firstCommentOptionsButton.click();

    const commentOptionsMenu = page.getByRole('list', {
      name: 'Comment Options Menu',
    });
    await commentOptionsMenu.locator('button').click();

    const deleteButton = page.getByLabel(deleteButtonLabel, { exact: true });
    await deleteButton.waitFor({ state: 'visible' });
    await deleteButton.click();

    const collapsibleHeader = page.locator('.collapsible__header').first();
    await collapsibleHeader.waitFor({ state: 'visible' });
    await collapsibleHeader.click();
  }

  // PIA Pathway Questionnaire (PPQ) Form Tab
  async function accuracyCorrectionRetentionSubmit() {
    const questionnaireLabel = 'PIA Pathway Questionnaire';
    const questionnaireButton = page.getByLabel(questionnaireLabel);
    await questionnaireButton.waitFor({ state: 'visible' });
    await questionnaireButton.click();
  }

  async function fillPpqChecks() {
    const labelsToCheck = [
      'Common or integrated program agreement',
      'Cloud technology (if no corporate PIA has been completed by the CPO)',
      'Data-linking',
      'BC Services Card and/or other digital identity credential onboarding',
      'Other (Please provide additional details below)',
    ];

    for (const label of labelsToCheck) {
      const checkbox = page.getByLabel(label);
      await checkbox.waitFor({ state: 'visible' });
      await checkbox.check();
    }
  }

  async function fillPpqOther() {
    const otherDetailsTextbox = page.locator('.rt-content').first();
    await otherDetailsTextbox.waitFor({ state: 'visible' });
    await otherDetailsTextbox.click();
    await otherDetailsTextbox.fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae. Suspendisse ullamcorper, diam quis rhoncus semper, urna erat egestas nunc, eget tristique ipsum tortor vitae quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut est ante, congue vel fringilla at, sollicitudin vitae arcu. Mauris velit neque, tempor et arcu non, fermentum mollis massa. Nulla dignissim venenatis risus ac gravida. Fusce bibendum dolor diam, nec semper dolor malesuada ut. Duis in diam dapibus, suscipit massa at, aliquam sapien.',
    );
  }

  async function fillPpqDates() {
    const datePickerPlaceholder = 'yyyy/mm/dd';
    const datePicker = page.getByPlaceholder(datePickerPlaceholder);

    await datePicker.waitFor({ state: 'visible' });
    await datePicker.click();

    await datePicker.fill('2025/10/10');
    await datePicker.press('Enter');
  }

  async function fillPpqReasonDeadline() {
    const reasonDeadlineTextarea = page
      .locator('#ProposedDeadlineReason div')
      .nth(2);
    await reasonDeadlineTextarea.waitFor({ state: 'visible' });
    await reasonDeadlineTextarea.click();
    await reasonDeadlineTextarea.fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae. Suspendisse ullamcorper, diam quis rhoncus semper, urna erat egestas nunc, eget tristique ipsum tortor vitae quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut est ante, congue vel fringilla at, sollicitudin vitae arcu. Mauris velit neque, tempor et arcu non, fermentum mollis massa. Nulla dignissim venenatis risus ac gravida. Fusce bibendum dolor diam, nec semper dolor malesuada ut. Duis in diam dapibus, suscipit massa at, aliquam sapien.',
    );
  }

  async function fillPpqReasonInitiativeSummary() {
    const initiativeSummaryTextbox = page
      .locator('#InitiativeSummary div')
      .nth(2);
    await initiativeSummaryTextbox.waitFor({ state: 'visible' });
    await initiativeSummaryTextbox.click();
    await initiativeSummaryTextbox.fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae. Suspendisse ullamcorper, diam quis rhoncus semper, urna erat egestas nunc, eget tristique ipsum tortor vitae quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut est ante, congue vel fringilla at, sollicitudin vitae arcu. Mauris velit neque, tempor et arcu non, fermentum mollis massa. Nulla dignissim venenatis risus ac gravida.',
    );
  }

  async function fillPpqRelatedOperationalPia() {
    const operationalPiaInputId = '#relatedOperationalPia';
    const addOperationalPiaLabel = 'Add Operational PIA';
    const removeOperationalPiaLabel = 'Remove Operational PIA';

    for (let i = 0; i < 6; i++) {
      const operationalPiaInput = page.locator(operationalPiaInputId);
      await operationalPiaInput.waitFor({ state: 'visible' });
      await operationalPiaInput.click();
      await operationalPiaInput.fill('Lorem ipsum (12345)');

      const addOperationalPiaButton = page.getByLabel(addOperationalPiaLabel);
      await addOperationalPiaButton.waitFor({ state: 'visible' });
      await addOperationalPiaButton.click();
    }

    for (let i = 0; i < 2; i++) {
      const removeOperationalPiaButton = page
        .getByLabel(removeOperationalPiaLabel)
        .first();
      await removeOperationalPiaButton.waitFor({ state: 'visible' });
      await removeOperationalPiaButton.click();
    }
  }

  async function fillPpqRelatedEnactmentPia() {
    const enactmentPiaInputId = '#relatedEnactmentPia';
    const addEnactmentPiaLabel = 'Add Enactment PIA';
    const removeEnactmentPiaLabel = 'Remove Enactment PIA';

    for (let i = 0; i < 5; i++) {
      const enactmentPiaInput = page.locator(enactmentPiaInputId);
      await enactmentPiaInput.waitFor({ state: 'visible' });
      await enactmentPiaInput.click();
      await enactmentPiaInput.fill('Lorem ipsum (54321)');

      const addEnactmentPiaButton = page.getByLabel(addEnactmentPiaLabel);
      await addEnactmentPiaButton.waitFor({ state: 'visible' });
      await addEnactmentPiaButton.click();
    }

    for (let i = 0; i < 2; i++) {
      const removeEnactmentPiaButton = page
        .getByLabel(removeEnactmentPiaLabel)
        .first();
      await removeEnactmentPiaButton.waitFor({ state: 'visible' });
      await removeEnactmentPiaButton.click();
    }
  }

  async function fillPpqRelatedOtherPia() {
    const otherPiaTextbox = page.locator('#OtherCPOConsideration div').nth(2);
    await otherPiaTextbox.waitFor({ state: 'visible' });
    await otherPiaTextbox.click();
    await otherPiaTextbox.fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae. Suspendisse ullamcorper, diam quis rhoncus semper, urna erat egestas nunc, eget tristique ipsum tortor vitae quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut est ante, congue vel fringilla at, sollicitudin vitae arcu. Mauris velit neque, tempor et arcu non, fermentum mollis massa. Nulla dignissim venenatis risus ac gravida. Fusce bibendum dolor diam, nec semper dolor malesuada ut. Duis in diam dapibus, suscipit massa at, aliquam sapien.',
    );
  }

  async function ppqSubmit() {
    const submitButton = page.getByLabel('Submit Button');
    await submitButton.waitFor({ state: 'visible' });
    await submitButton.click();

    const confirmSubmitButton = page.getByLabel('Yes, submit');
    await confirmSubmitButton.waitFor({ state: 'visible' });
    await confirmSubmitButton.click();
  }

  // Review Form Tab
  async function fillReviewRoles() {
    const reviewTab = page.getByLabel('Review', { exact: true });
    await reviewTab.waitFor({ state: 'visible', timeout: 60000 });
    await reviewTab.click();

    const addButton = page.getByRole('button', { name: 'Add a role' });
    await addButton.waitFor({ state: 'visible', timeout: 60000 });
    await addButton.click();

    const roleSelector = page.getByLabel('Select a role from the list');
    await roleSelector.waitFor({ state: 'visible', timeout: 60000 });
    await roleSelector.selectOption('DIRECTOR');

    const addRoleButton = page.getByRole('button', { name: 'Add' }).first();
    await addRoleButton.waitFor({ state: 'visible', timeout: 60000 });
    await addRoleButton.click();

    const enterRoleInput = page.getByLabel('Enter a role not in list');
    await enterRoleInput.waitFor({ state: 'visible', timeout: 60000 });
    await enterRoleInput.click();
    await enterRoleInput.fill('Tester');

    const addTesterButton = page
      .locator('div')
      .filter({ hasText: /^Enter a role not in listAdd$/ })
      .getByRole('button');
    await addTesterButton.waitFor({ state: 'visible', timeout: 60000 });
    await addTesterButton.click();
    await enterRoleInput.fill('Tester 2');

    const addTester2Button = page
      .locator('div')
      .filter({ hasText: /^Enter a role not in listAdd$/ })
      .getByRole('button');
    await addTester2Button.waitFor({ state: 'visible', timeout: 60000 });
    await addTester2Button.click();

    const removeTester2Button = page
      .locator('div')
      .filter({ hasText: /^Tester 2$/ })
      .getByRole('button');
    await removeTester2Button.waitFor({ state: 'visible', timeout: 60000 });
    await removeTester2Button.click();
  }

  async function fillReviewComment() {
    const acknowledgmentCheckbox = page.getByLabel(
      'I acknowledge that I have participated in the drafting and/or review of this PIA on behalf of my ministry or sector. All privacy risks of which I am aware are documented with acceptable risk mitigations in place and I have no outstanding privacy concerns related to the initiative under review.',
    );
    await acknowledgmentCheckbox.waitFor({ state: 'visible' });
    await acknowledgmentCheckbox.check();

    const commentTextarea = page.locator('textarea');
    await commentTextarea.waitFor({ state: 'visible' });
    await commentTextarea.click();
    await commentTextarea.fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae. Suspendisse ullamcorper, diam quis rhoncus semper, urna erat egestas nunc, eget tristique ipsum tortor vitae quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut est ante, congue vel fringilla at, sollicitudin vitae arcu. Mauris velit neque, tempor et arcu non, fermentum mollis massa. Nulla dignissim venenatis risus ac gravida. Fusce bibendum dolor diam, nec semper dolor malesuada ut. Duis in diam dapibus, suscipit massa at, aliquam sapien.',
    );

    const confirmButton = page.getByRole('button', { name: 'Confirm' });
    await confirmButton.waitFor({ state: 'visible' });
    await confirmButton.click();
  }

  // Check for autosave
  async function verifyAutosave() {
    const autosaveLocator = page
      .locator('div')
      .filter({ hasText: /^Saved at/ })
      .nth(1);
    await autosaveLocator.waitFor({ state: 'visible', timeout: 80000 });
    await expect(autosaveLocator).toHaveText(/^Saved at/);
  }

  async function verifySubmit() {
    const intakeLabel = 'PIA Intake';
    const submitButtonLabel = 'Submit Button';
    const confirmSubmitLabel = 'Yes, submit';

    const intakeButton = page.getByLabel(intakeLabel);
    await intakeButton.waitFor({ state: 'visible' });
    await intakeButton.click();

    const submitButton = page.getByLabel(submitButtonLabel);
    await submitButton.waitFor({ state: 'visible' });
    await submitButton.click();

    const confirmSubmitButton = page.getByLabel(confirmSubmitLabel);
    await confirmSubmitButton.waitFor({ state: 'visible' });
    await confirmSubmitButton.click();
  }

  async function verifyCpoReviewStatus() {
    // Verify the CPO Review Status
    await expect(page.getByText('CPO Review')).toHaveText('CPO Review');

    // Verify correct URL
    await expect(page).toHaveURL(/\/intake\/view$/);
  }

  await fillCollectionUseDisclosureMPO1();
  await fillCollectionUseDisclosureFOIPPA1();
  await fillCollectionUseDisclosureLegal1();
  await fillCollectionUseDisclosureMPO2();
  await fillCollectionUseDisclosureFOIPPA2();
  await fillCollectionUseDisclosureLegal2();
  await fillCollectionUseDisclosureMPO3();
  await fillCollectionUseDisclosureFOIPPA3();
  await fillCollectionUseDisclosureLegal3();
  await fillCollectionUseDisclosureMPOTextArea();
  await fillStoringPersonalInformationComments();
  await storingPersonalInformationSubmit();
  await fillAccuracyCorrectionRetentionComments();
  await accuracyCorrectionRetentionSubmit();
  await fillPpqChecks();
  await fillPpqOther();
  await fillPpqDates();
  await fillPpqReasonDeadline();
  await fillPpqReasonInitiativeSummary();
  await fillPpqRelatedOperationalPia();
  await fillPpqRelatedEnactmentPia();
  await fillPpqRelatedOtherPia();
  await ppqSubmit();
  await fillReviewRoles();
  await fillReviewComment();
  await verifyAutosave();
  await verifySubmit();
  await verifyCpoReviewStatus();
}
