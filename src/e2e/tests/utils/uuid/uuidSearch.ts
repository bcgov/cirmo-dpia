import { Page, expect } from '@playwright/test';

// Function to search for a PIA using a unique identifier (UUID)
export async function searchUUID(page: Page, uuid: string) {
  // Navigate to the PIA list page
  await page.goto('/pia/list');
  await expect(page).toHaveURL('/pia/list');

  // Click on the search input field
  await page.getByPlaceholder('Search by title or drafter').click();

  // Fill the search input field with the unique identifier
  await page
    .getByPlaceholder('Search by title or drafter')
    .fill(`TEST_${uuid}`);

  // Click the search submit button
  await page.getByLabel('Search submit button').click();

  // Click on the cell corresponding to the searched PIA
  await page.getByRole('cell', { name: `TEST_${uuid}` }).click();

  // Check and expect the URL to be on the PIA intake view page
  await expect(page).toHaveURL(/\/intake\/view$/);

  // Check and expect the heading (title) to match the unique identifier
  await expect(page.getByRole('heading', { name: `TEST_${uuid}` })).toHaveText(
    `TEST_${uuid}`,
  );
}
