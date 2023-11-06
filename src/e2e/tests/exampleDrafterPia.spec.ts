import { test } from '@playwright/test';
import { draftUsername, draftPassword } from '../env';

// eslint-disable-next-line playwright/expect-expect
test('test', async ({ page }) => {
  await page.goto('/');
  await page
    .locator('#main-content')
    .getByRole('button', { name: 'Log in with IDIR' })
    .click();
  await page.locator('#user').click();
  await page.locator('#user').fill(draftUsername);
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill(draftPassword);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByLabel('Create new').click();
  await page.getByRole('link', { name: 'Start PIA Intake' }).click();
  await page.getByLabel('Initiative title (required)').click();
  await page.getByLabel('Initiative title (required)').fill('TEST');
  await page.getByLabel('Ministry').selectOption('CITIZENS_SERVICES');
  await page.getByLabel('Branch (required)').click();
  await page.getByLabel('Branch (required)').fill('IMB');
  await page.getByLabel('Initiative lead name').click();
  await page.getByLabel('Initiative lead name').fill('TEST');
  await page.getByLabel('Initiative lead email').click();
  await page.getByLabel('Initiative lead email').fill('TEST');
  await page.getByLabel('Initiative lead title').click();
  await page.getByLabel('Initiative lead title').fill('TEST');
  await page.getByLabel('View comments').first().click();
  await page.getByPlaceholder('Write a comment...').click();
  await page
    .getByPlaceholder('Write a comment...')
    .fill(
      'Maecenas in dolor vel risus blandit mollis sit amet a turpis. Nam quis orci tortor. Sed posuere urna in risus gravida, non pellentesque dui aliquet. Vivamus suscipit nisi libero, at mollis magna euismod sit amet. Aliquam vitae tortor id metus consequat euismod a eu sem. Sed tincidunt vel mi vel congue. Mauris imperdiet sapien est, elementum facilisis lacus rutrum non. Vivamus varius augue non urna varius, vel consectetur risus dapibus. Vestibulum condimentum maximus orci vel tempor. Cras at leo nec tortor tincidunt feugiat.',
    );
  await page.getByLabel('Add New Comment Button').click();
  await page
    .getByLabel('Initiative Description Textarea Input')
    .getByRole('textbox')
    .click();
  await page
    .getByLabel('Initiative Description Textarea Input')
    .getByRole('textbox')
    .fill(
      'Maecenas in dolor vel risus blandit mollis sit amet a turpis. Nam quis orci tortor. Sed posuere urna in risus gravida, non pellentesque dui aliquet. Vivamus suscipit nisi libero, at mollis magna euismod sit amet. Aliquam vitae tortor id metus consequat euismod a eu sem. Sed tincidunt vel mi vel congue. Mauris imperdiet sapien est, elementum facilisis lacus rutrum non. Vivamus varius augue non urna varius, vel consectetur risus dapibus. Vestibulum condimentum maximus orci vel tempor. Cras at leo nec tortor tincidunt feugiat.',
    );
  await page
    .getByLabel('Initiative Scope Textarea Input')
    .getByRole('textbox')
    .click();
  await page
    .getByLabel('Initiative Scope Textarea Input')
    .getByRole('textbox')
    .fill(
      'Maecenas in dolor vel risus blandit mollis sit amet a turpis. Nam quis orci tortor. Sed posuere urna in risus gravida, non pellentesque dui aliquet. Vivamus suscipit nisi libero, at mollis magna euismod sit amet. Aliquam vitae tortor id metus consequat euismod a eu sem. Sed tincidunt vel mi vel congue. Mauris imperdiet sapien est, elementum facilisis lacus rutrum non. Vivamus varius augue non urna varius, vel consectetur risus dapibus. Vestibulum condimentum maximus orci vel tempor. Cras at leo nec tortor tincidunt feugiat.',
    );
  await page
    .getByLabel('Data Elements Involved Textarea Input')
    .getByRole('textbox')
    .click();
  await page
    .getByLabel('Data Elements Involved Textarea Input')
    .getByRole('textbox')
    .fill(
      'Maecenas in dolor vel risus blandit mollis sit amet a turpis. Nam quis orci tortor. Sed posuere urna in risus gravida, non pellentesque dui aliquet. Vivamus suscipit nisi libero, at mollis magna euismod sit amet. Aliquam vitae tortor id metus consequat euismod a eu sem. Sed tincidunt vel mi vel congue. Mauris imperdiet sapien est, elementum facilisis lacus rutrum non. Vivamus varius augue non urna varius, vel consectetur risus dapibus. Vestibulum condimentum maximus orci vel tempor. Cras at leo nec tortor tincidunt feugiat.',
    );
  await page.getByLabel('Submit Button').click();
  await page.getByLabel('Yes, submit').click();
  await page.getByLabel('Next Button').click();
  await page.getByLabel('Describe the step').click();
  await page
    .getByLabel('Describe the step')
    .fill(
      'Maecenas in dolor vel risus blandit mollis sit amet a turpis. Nam quis orci tortor. Sed posuere urna in risus gravida, non pellentesque dui aliquet. Vivamus suscipit nisi libero, at mollis magna euismod sit amet. Aliquam vitae tortor id metus consequat euismod a eu sem. Sed tincidunt vel mi vel congue. Mauris imperdiet sapien est, elementum facilisis lacus rutrum non. Vivamus varius augue non urna varius, vel consectetur risus dapibus. Vestibulum condimentum maximus orci vel tempor. Cras at leo nec tortor tincidunt feugiat.',
    );
  await page
    .getByLabel('Collection Notice Drafter Textarea Input')
    .getByRole('textbox')
    .click();
  await page
    .getByLabel('Collection Notice Drafter Textarea Input')
    .getByRole('textbox')
    .fill(
      'Maecenas in dolor vel risus blandit mollis sit amet a turpis. Nam quis orci tortor. Sed posuere urna in risus gravida, non pellentesque dui aliquet. Vivamus suscipit nisi libero, at mollis magna euismod sit amet. Aliquam vitae tortor id metus consequat euismod a eu sem. Sed tincidunt vel mi vel congue. Mauris imperdiet sapien est, elementum facilisis lacus rutrum non. Vivamus varius augue non urna varius, vel consectetur risus dapibus. Vestibulum condimentum maximus orci vel tempor. Cras at leo nec tortor tincidunt feugiat.',
    );
  await page.getByLabel('Submit Button').click();
  await page.getByLabel('Yes, submit').click();
  await page.getByLabel('Active PIAs').click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByLabel('Yes, sign out').click();
});
