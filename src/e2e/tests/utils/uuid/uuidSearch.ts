import { Page, expect } from '@playwright/test';

// Function to search for a PIA using a unique identifier (UUID)
export async function searchUUID(page: Page, uuid: string) {
  // Navigate to the PIA list page
  await Promise.all([page.goto('/pia/list'), page.waitForURL('/pia/list')]);
  await expect(page).toHaveURL('/pia/list');

  // Click on the search input field
  const searchInput = page.getByPlaceholder('Search by title or drafter');
  await searchInput.waitFor({ state: 'visible' });
  await searchInput.click();

  // Fill the search input field with the unique identifier
  await searchInput.fill(`TEST_${uuid}`);

  // Click the search submit button
  const searchSubmitButton = page.getByLabel('Search submit button');
  await searchSubmitButton.waitFor({ state: 'visible' });
  await searchSubmitButton.click();

  // Click on the cell corresponding to the searched PIA
  const searchedPIACell = page.getByRole('cell', { name: `TEST_${uuid}` });
  await searchedPIACell.waitFor({ state: 'visible' });
  await searchedPIACell.click();

  // Check and expect the URL to be on the PIA intake view page
  await page.waitForURL(/\/intake\/view$/);
  await expect(page).toHaveURL(/\/intake\/view$/);

  // Check and expect the heading (title) to match the unique identifier
  const piaTitleHeading = page.getByRole('heading', { name: `TEST_${uuid}` });
  await piaTitleHeading.waitFor({ state: 'visible' });
  await expect(piaTitleHeading).toHaveText(`TEST_${uuid}`);
}
