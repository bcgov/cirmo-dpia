import { Page, expect } from '@playwright/test';

export async function searchUUID(page: Page, uuid: string) {
  await page.goto('/pia/list');
  await expect(page).toHaveURL('/pia/list');

  await page.getByPlaceholder('Search by title or drafter').click();
  await page
    .getByPlaceholder('Search by title or drafter')
    .fill(`TEST_${uuid}`);
  await page.getByLabel('Search submit button').click();

  await page.getByRole('cell', { name: `TEST_${uuid}` }).click();

  //check for and expect to have the right url
  await expect(page).toHaveURL(/\/intake\/view$/);

  //check for and expect title to have the right name
  await expect(page.getByRole('heading', { name: `TEST_${uuid}` })).toHaveText(
    `TEST_${uuid}`,
  );
}
