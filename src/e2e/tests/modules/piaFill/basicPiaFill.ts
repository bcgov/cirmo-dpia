import { Page, expect } from '@playwright/test';

export async function basicPiaFill(page: Page, uuid?: string) {
  await page.getByLabel('Initiative title (required)').click();
  await page.getByLabel('Initiative title (required)').fill(`TEST_${uuid}`);
  await page.getByLabel('Ministry').selectOption('CITIZENS_SERVICES');
  await page.getByLabel('Branch (required)').click();
  await page.getByLabel('Branch (required)').fill('IMB');
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
  await expect(
    page
      .locator('div')
      .filter({ hasText: /^Saved at/ })
      .nth(1),
  ).toHaveText(/^Saved at/);
  await page.getByLabel('Submit Button').click();
  await page.getByLabel('Yes, submit').click();
  await expect(page).toHaveURL(/\/nextSteps\/edit$/);
}
