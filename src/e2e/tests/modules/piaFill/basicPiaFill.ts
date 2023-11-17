import { Page, expect } from '@playwright/test';

/* 
Test code for basic PIA form filling. This function fills out the 'Initiative title', 'Ministry', and 'Branch' fields, as well as a description in the 'Initiative Description Textarea Input'. It then submits the form and checks if the page redirects to '/nextSteps/edit'.
*/
export async function basicPiaFill(page: Page, uuid?: string) {
  async function fillInitiativeDetails() {
    await page
      .getByLabel('Initiative title (required)')
      .waitFor({ state: 'visible' });
    await page.getByLabel('Initiative title (required)').click();
    await page.getByLabel('Initiative title (required)').fill(`TEST_${uuid}`);
    await page.getByLabel('Ministry').waitFor({ state: 'visible' });
    await page.getByLabel('Ministry').selectOption('CITIZENS_SERVICES');
    await page.getByLabel('Branch (required)').waitFor({ state: 'visible' });
    await page.getByLabel('Branch (required)').click();
    await page.getByLabel('Branch (required)').fill('IMB');
  }

  async function fillInitiativeLeadDetails() {
    await page.getByLabel('Initiative lead name').waitFor({ state: 'visible' });
    await page.getByLabel('Initiative lead name').click();
    await page.getByLabel('Initiative lead name').fill('Test Tester');
    await page
      .getByLabel('Initiative lead email')
      .waitFor({ state: 'visible' });
    await page.getByLabel('Initiative lead email').click();
    await page.getByLabel('Initiative lead email').fill('tester@email.com');
    await page
      .getByLabel('Initiative lead title')
      .waitFor({ state: 'visible' });
    await page.getByLabel('Initiative lead title').click();
    await page.getByLabel('Initiative lead title').fill('Tester');
  }

  async function fillInitiativeDescriptionDetails() {
    await page
      .getByLabel('Initiative Description Textarea Input')
      .waitFor({ state: 'visible' });
    await page
      .getByLabel('Initiative Description Textarea Input')
      .getByRole('textbox')
      .click();
    await page
      .getByLabel('Initiative Description Textarea Input')
      .getByRole('textbox')
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );
  }

  async function fillInitiativeScopeDetails() {
    await page
      .getByLabel('Initiative Scope Textarea Input')
      .waitFor({ state: 'visible' });
    await page
      .getByLabel('Initiative Scope Textarea Input')
      .getByRole('textbox')
      .click();
    await page
      .getByLabel('Initiative Scope Textarea Input')
      .getByRole('textbox')
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );
  }

  async function fillDataElementsInvolvedDetails() {
    await page
      .getByLabel('Data Elements Involved Textarea Input')
      .waitFor({ state: 'visible' });
    await page
      .getByLabel('Data Elements Involved Textarea Input')
      .getByRole('textbox')
      .click();
    await page
      .getByLabel('Data Elements Involved Textarea Input')
      .getByRole('textbox')
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );
  }

  async function verifyAutosave() {
    const locator = page
      .locator('div')
      .filter({ hasText: /^Saved at/ })
      .nth(1);
    await locator.waitFor({ state: 'visible', timeout: 80000 });
    await expect(locator).toHaveText(/^Saved at/);
  }

  async function verifySubmit() {
    await page.getByLabel('Submit Button').waitFor({ state: 'visible' });
    await page.getByLabel('Submit Button').click();

    await page.getByLabel('Yes, submit').waitFor({ state: 'visible' });
    await page.getByLabel('Yes, submit').click();

    await expect(page).toHaveURL(/\/nextSteps\/edit$/, { timeout: 80000 });
  }

  await fillInitiativeDetails();
  await fillInitiativeLeadDetails();
  await fillInitiativeDescriptionDetails();
  await fillInitiativeScopeDetails();
  await fillDataElementsInvolvedDetails();
  await verifyAutosave();
  await verifySubmit();
}
