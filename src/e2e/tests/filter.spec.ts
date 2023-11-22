// create a filter test to make sure filters are working correctly
import { test, expect } from '@playwright/test';
import { drafterLogin, mpoLogin, cpoLogin, logout } from './utils';

test.describe.configure({ mode: 'serial' });
// Test with Drafter role
test('Filter PIAs as Drafter', async ({ page }) => {
  test.slow();
  // Log in as a drafter
  await drafterLogin(page);

  // Verify PIA list URL
  await page.waitForURL('/pia/list');
  await expect(page).toHaveURL('/pia/list');

  // Mapping of status options to their expected URLs
  const statusOptionsToURLs = {
    DRAFTING_IN_PROGRESS: '/pia/list?filterByStatus=DRAFTING_IN_PROGRESS',
    EDIT_IN_PROGRESS: '/pia/list?filterByStatus=EDIT_IN_PROGRESS',
    MPO_REVIEW: '/pia/list?filterByStatus=MPO_REVIEW',
    CPO_REVIEW: '/pia/list?filterByStatus=CPO_REVIEW',
    PENDING_COMPLETION: '/pia/list?filterByStatus=PENDING_COMPLETION',
    FINAL_REVIEW: '/pia/list?filterByStatus=FINAL_REVIEW',
  };

  for (const [status, expectedURL] of Object.entries(statusOptionsToURLs)) {
    const statusSelect = page.getByLabel('pia-status-select');
    await statusSelect.waitFor({ state: 'visible' });
    await statusSelect.selectOption(status);

    await page.waitForURL(expectedURL);
    await expect(page).toHaveURL(expectedURL);
  }

  // Click the 'Clear filters' button and verify the URL
  const clearFiltersButton = page.getByRole('button', {
    name: 'Clear filters',
  });
  await clearFiltersButton.waitFor({ state: 'visible' });
  await clearFiltersButton.click();
  await page.waitForURL('/pia/list');
  await expect(page).toHaveURL('/pia/list');

  // Log out
  await logout(page);
});

// Test with MPO role
test('Filter PIAs as MPO', async ({ page }) => {
  test.slow();
  // Log in as an MPO
  await mpoLogin(page);

  // Verify PIA list URL
  await page.waitForURL('/pia/list');
  await expect(page).toHaveURL('/pia/list');

  // Define the status options and expected URLs for filtering
  const filterOptions = [
    {
      label: 'EDIT_IN_PROGRESS',
      expectedURL: '/pia/list?filterByStatus=EDIT_IN_PROGRESS',
    },
    {
      label: 'MPO_REVIEW',
      expectedURL: '/pia/list?filterByStatus=MPO_REVIEW',
    },
    {
      label: 'FINAL_REVIEW',
      expectedURL: '/pia/list?filterByStatus=FINAL_REVIEW',
    },
  ];

  for (const option of filterOptions) {
    const statusSelect = page.getByLabel('pia-status-select');
    await statusSelect.waitFor({ state: 'visible' });
    await statusSelect.selectOption(option.label);

    await page.waitForURL(option.expectedURL);
    await expect(page).toHaveURL(option.expectedURL);
  }

  // Click the 'Clear filters' button and verify the URL is reset
  const clearFiltersButton = page.getByRole('button', {
    name: 'Clear filters',
  });
  await clearFiltersButton.waitFor({ state: 'visible' });
  await clearFiltersButton.click();
  await page.waitForURL('/pia/list');
  await expect(page).toHaveURL('/pia/list');

  // Select and verify different ministry filters
  const ministryOptions = [
    {
      label: 'AGRICULTURE_AND_FOOD',
      expectedURL: '/pia/list?filterByMinistry=AGRICULTURE_AND_FOOD',
    },
    {
      label: 'ATTORNEY_GENERAL',
      expectedURL: '/pia/list?filterByMinistry=ATTORNEY_GENERAL',
    },
    {
      label: 'CITIZENS_SERVICES',
      expectedURL: '/pia/list?filterByMinistry=CITIZENS_SERVICES',
    },
  ];

  for (const option of ministryOptions) {
    const ministrySelect = page.getByLabel('ministry-select');
    await ministrySelect.waitFor({ state: 'visible' });
    await ministrySelect.selectOption(option.label);

    await page.waitForURL(option.expectedURL);
    await expect(page).toHaveURL(option.expectedURL);
  }

  // Click the 'Clear filters' button and verify the URL is reset
  await clearFiltersButton.waitFor({ state: 'visible' });
  await clearFiltersButton.click();
  await page.waitForURL('/pia/list');
  await expect(page).toHaveURL('/pia/list');

  // Select and verify different drafter filters
  const drafterOptions = [
    {
      label: 'excludeMyPias',
      expectedURL: '/pia/list?filterPiaDrafterByCurrentUser=excludeMyPias',
    },
    {
      label: 'onlyMyPias',
      expectedURL: '/pia/list?filterPiaDrafterByCurrentUser=onlyMyPias',
    },
  ];

  for (const option of drafterOptions) {
    const drafterSelect = page.getByLabel('drafter-filter-select');
    await drafterSelect.waitFor({ state: 'visible' });
    await drafterSelect.selectOption(option.label);

    await page.waitForURL(option.expectedURL);
    await expect(page).toHaveURL(option.expectedURL);
  }

  // Click the 'Clear filters' button and verify the URL is reset
  await clearFiltersButton.waitFor({ state: 'visible' });
  await clearFiltersButton.click();
  await page.waitForURL('/pia/list');
  await expect(page).toHaveURL('/pia/list');

  // Define filter combinations and their expected URLs
  const filterCombinations = [
    {
      status: 'MPO_REVIEW',
      ministry: 'HEALTH',
      drafter: 'onlyMyPias',
      expectedURL:
        '/pia/list?filterPiaDrafterByCurrentUser=onlyMyPias&filterByStatus=MPO_REVIEW&filterByMinistry=HEALTH',
    },
    {
      status: 'FINAL_REVIEW',
      ministry: 'FORESTS',
      drafter: 'excludeMyPias',
      expectedURL:
        '/pia/list?filterPiaDrafterByCurrentUser=excludeMyPias&filterByStatus=FINAL_REVIEW&filterByMinistry=FORESTS',
    },
  ];

  for (const { status, ministry, drafter, expectedURL } of filterCombinations) {
    await page.getByLabel('pia-status-select').selectOption(status);
    await page.getByLabel('ministry-select').selectOption(ministry);
    await page.getByLabel('drafter-filter-select').selectOption(drafter);

    await page.waitForURL(expectedURL);
    await expect(page).toHaveURL(expectedURL);

    // Clear filters after checking each combination
    await page.getByRole('button', { name: 'Clear filters' }).click();
    await page.waitForURL('/pia/list');
    await expect(page).toHaveURL('/pia/list');
  }

  // Click the 'Clear filters' button and verify the URL is reset
  await clearFiltersButton.waitFor({ state: 'visible' });
  await clearFiltersButton.click();
  await page.waitForURL('/pia/list');
  await expect(page).toHaveURL('/pia/list');

  // Log out
  await logout(page);
});

// Test with CPO role
test('Filter PIAs as CPO', async ({ page }) => {
  test.slow();
  // Log in as an CPO
  await cpoLogin(page);

  // Verify PIA list URL
  await page.waitForURL('/pia/list');
  await expect(page).toHaveURL('/pia/list');

  // Define the status options and expected URLs for filtering
  const filterOptions = [
    {
      label: 'EDIT_IN_PROGRESS',
      expectedURL: '/pia/list?filterByStatus=EDIT_IN_PROGRESS',
    },
    {
      label: 'CPO_REVIEW',
      expectedURL: '/pia/list?filterByStatus=CPO_REVIEW',
    },
    {
      label: 'FINAL_REVIEW',
      expectedURL: '/pia/list?filterByStatus=FINAL_REVIEW',
    },
  ];

  for (const option of filterOptions) {
    const statusSelect = page.getByLabel('pia-status-select');
    await statusSelect.waitFor({ state: 'visible' });
    await statusSelect.selectOption(option.label);

    await page.waitForURL(option.expectedURL);
    await expect(page).toHaveURL(option.expectedURL);
  }

  // Click the 'Clear filters' button and verify the URL is reset
  const clearFiltersButton = page.getByRole('button', {
    name: 'Clear filters',
  });
  await clearFiltersButton.waitFor({ state: 'visible' });
  await clearFiltersButton.click();
  await page.waitForURL('/pia/list');
  await expect(page).toHaveURL('/pia/list');

  // Select and verify different ministry filters
  const ministryOptions = [
    {
      label: 'AGRICULTURE_AND_FOOD',
      expectedURL: '/pia/list?filterByMinistry=AGRICULTURE_AND_FOOD',
    },
    {
      label: 'ATTORNEY_GENERAL',
      expectedURL: '/pia/list?filterByMinistry=ATTORNEY_GENERAL',
    },
    {
      label: 'CITIZENS_SERVICES',
      expectedURL: '/pia/list?filterByMinistry=CITIZENS_SERVICES',
    },
  ];

  for (const option of ministryOptions) {
    const ministrySelect = page.getByLabel('ministry-select');
    await ministrySelect.waitFor({ state: 'visible' });
    await ministrySelect.selectOption(option.label);

    await page.waitForURL(option.expectedURL);
    await expect(page).toHaveURL(option.expectedURL);
  }

  // Click the 'Clear filters' button and verify the URL is reset
  await clearFiltersButton.waitFor({ state: 'visible' });
  await clearFiltersButton.click();
  await page.waitForURL('/pia/list');
  await expect(page).toHaveURL('/pia/list');

  // Select and verify different drafter filters
  const drafterOptions = [
    {
      label: 'excludeMyPias',
      expectedURL: '/pia/list?filterPiaDrafterByCurrentUser=excludeMyPias',
    },
    {
      label: 'onlyMyPias',
      expectedURL: '/pia/list?filterPiaDrafterByCurrentUser=onlyMyPias',
    },
  ];

  for (const option of drafterOptions) {
    const drafterSelect = page.getByLabel('drafter-filter-select');
    await drafterSelect.waitFor({ state: 'visible' });
    await drafterSelect.selectOption(option.label);

    await page.waitForURL(option.expectedURL);
    await expect(page).toHaveURL(option.expectedURL);
  }

  // Click the 'Clear filters' button and verify the URL is reset
  await clearFiltersButton.waitFor({ state: 'visible' });
  await clearFiltersButton.click();
  await page.waitForURL('/pia/list');
  await expect(page).toHaveURL('/pia/list');

  // Define filter combinations and their expected URLs
  const filterCombinations = [
    {
      status: 'CPO_REVIEW',
      ministry: 'HEALTH',
      drafter: 'onlyMyPias',
      expectedURL:
        '/pia/list?filterPiaDrafterByCurrentUser=onlyMyPias&filterByStatus=CPO_REVIEW&filterByMinistry=HEALTH',
    },
    {
      status: 'FINAL_REVIEW',
      ministry: 'FORESTS',
      drafter: 'excludeMyPias',
      expectedURL:
        '/pia/list?filterPiaDrafterByCurrentUser=excludeMyPias&filterByStatus=FINAL_REVIEW&filterByMinistry=FORESTS',
    },
  ];

  for (const { status, ministry, drafter, expectedURL } of filterCombinations) {
    await page.getByLabel('pia-status-select').selectOption(status);
    await page.getByLabel('ministry-select').selectOption(ministry);
    await page.getByLabel('drafter-filter-select').selectOption(drafter);

    await page.waitForURL(expectedURL);
    await expect(page).toHaveURL(expectedURL);

    // Clear filters after checking each combination
    await page.getByRole('button', { name: 'Clear filters' }).click();
    await page.waitForURL('/pia/list');
    await expect(page).toHaveURL('/pia/list');
  }

  // Click the 'Clear filters' button and verify the URL is reset
  await clearFiltersButton.waitFor({ state: 'visible' });
  await clearFiltersButton.click();
  await page.waitForURL('/pia/list');
  await expect(page).toHaveURL('/pia/list');

  // Log out
  await logout(page);
});
