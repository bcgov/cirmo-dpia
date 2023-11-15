// create a filter test to make sure filters are working correctly
import { test, expect } from '@playwright/test';
import { drafterLogin, mpoLogin, cpoLogin, logout } from './utils';

test.describe.serial('Filter PIAs Test', () => {
  // Test with Drafter role
  test('Filter PIAs as Drafter', async ({ page }) => {
    // Log in as a drafter
    await drafterLogin(page);

    // Verify PIA list URL
    await expect(page).toHaveURL('/pia/list');

    // Select the 'Drafting in Progress' option from the status dropdown
    await page
      .getByLabel('pia-status-select')
      .selectOption('DRAFTING_IN_PROGRESS');
    // Verify that the URL reflects the selected filter
    await expect(page).toHaveURL(
      '/pia/list?filterByStatus=DRAFTING_IN_PROGRESS',
    );

    // Select the 'Edit in Progress' option from the status dropdown
    await page.getByLabel('pia-status-select').selectOption('EDIT_IN_PROGRESS');
    // Verify that the URL reflects the selected filter
    await expect(page).toHaveURL('/pia/list?filterByStatus=EDIT_IN_PROGRESS');

    // Select the 'MPO Review' option from the status dropdown
    await page.getByLabel('pia-status-select').selectOption('MPO_REVIEW');
    // Verify that the URL reflects the selected filter
    await expect(page).toHaveURL('/pia/list?filterByStatus=MPO_REVIEW');

    // Select the 'CPO Review' option from the status dropdown
    await page.getByLabel('pia-status-select').selectOption('CPO_REVIEW');
    // Verify that the URL reflects the selected filter
    await expect(page).toHaveURL('/pia/list?filterByStatus=CPO_REVIEW');

    // Select the 'Pending Completion' option from the status dropdown
    await page
      .getByLabel('pia-status-select')
      .selectOption('PENDING_COMPLETION');
    // Verify that the URL reflects the selected filter
    await expect(page).toHaveURL('/pia/list?filterByStatus=PENDING_COMPLETION');

    // Select the 'Final Review' option from the status dropdown
    await page.getByLabel('pia-status-select').selectOption('FINAL_REVIEW');
    // Verify that the URL reflects the selected filter
    await expect(page).toHaveURL('/pia/list?filterByStatus=FINAL_REVIEW');

    // Select an empty option from the status dropdown
    await page.getByLabel('pia-status-select').selectOption('');
    // Verify that the URL reflects the removal of the filter
    await expect(page).toHaveURL('/pia/list');

    // Select 'Drafting in Progress' again from the status dropdown
    await page
      .getByLabel('pia-status-select')
      .selectOption('DRAFTING_IN_PROGRESS');
    // Verify that the URL reflects the selected filter
    await expect(page).toHaveURL(
      '/pia/list?filterByStatus=DRAFTING_IN_PROGRESS',
    );

    // Click the 'Clear filters' button
    await page.getByRole('button', { name: 'Clear filters' }).click();
    // Verify that the URL reflects the removal of the filter
    await expect(page).toHaveURL('/pia/list');

    // Log out
    await logout(page);
  });

  // Test with MPO role
  test('Filter PIAs as MPO', async ({ page }) => {
    // Log in as an MPO
    await mpoLogin(page);

    // Verify pia list URL
    await expect(page).toHaveURL('/pia/list');

    // Select the 'Drafting in Progress' status option
    await page
      .getByLabel('pia-status-select')
      .selectOption('DRAFTING_IN_PROGRESS');
    // Verify URL update for 'Drafting in Progress' status filter
    await expect(page).toHaveURL(
      '/pia/list?filterByStatus=DRAFTING_IN_PROGRESS',
    );

    // Select the 'Edit in Progress' status option
    await page.getByLabel('pia-status-select').selectOption('EDIT_IN_PROGRESS');
    // Verify URL update for 'Edit in Progress' status filter
    await expect(page).toHaveURL('/pia/list?filterByStatus=EDIT_IN_PROGRESS');

    // Select the 'MPO Review' status option
    await page.getByLabel('pia-status-select').selectOption('MPO_REVIEW');
    // Verify URL update for 'MPO Review' status filter
    await expect(page).toHaveURL('/pia/list?filterByStatus=MPO_REVIEW');

    // Clear all filters
    await page.getByRole('button', { name: 'Clear filters' }).click();
    // Verify URL update reflecting no filters
    await expect(page).toHaveURL('/pia/list');

    // Select 'Agriculture and Food' from Ministry dropdown
    await page
      .getByLabel('ministry-select')
      .selectOption('AGRICULTURE_AND_FOOD');
    // Verify URL update for 'Agriculture and Food' ministry filter
    await expect(page).toHaveURL(
      '/pia/list?filterByMinistry=AGRICULTURE_AND_FOOD',
    );

    // Select 'Attorney General' from Ministry dropdown
    await page.getByLabel('ministry-select').selectOption('ATTORNEY_GENERAL');
    // Verify URL update for 'Attorney General' ministry filter
    await expect(page).toHaveURL('/pia/list?filterByMinistry=ATTORNEY_GENERAL');

    // Select 'Citizens Services' from Ministry dropdown
    await page.getByLabel('ministry-select').selectOption('CITIZENS_SERVICES');
    // Verify URL update for 'Citizens Services' ministry filter
    await expect(page).toHaveURL(
      '/pia/list?filterByMinistry=CITIZENS_SERVICES',
    );

    // Clear all filters
    await page.getByRole('button', { name: 'Clear filters' }).click();
    // Verify URL update reflecting no filters
    await expect(page).toHaveURL('/pia/list');

    // Select 'Exclude my PIAs' from drafter filter
    await page
      .getByLabel('drafter-filter-select')
      .selectOption('excludeMyPias');
    // Verify URL update for 'Exclude my PIAs' drafter filter
    await expect(page).toHaveURL(
      '/pia/list?filterPiaDrafterByCurrentUser=excludeMyPias',
    );

    // Select 'Only my PIAs' from drafter filter
    await page.getByLabel('drafter-filter-select').selectOption('onlyMyPias');
    // Verify URL update for 'Only my PIAs' drafter filter
    await expect(page).toHaveURL(
      '/pia/list?filterPiaDrafterByCurrentUser=onlyMyPias',
    );

    // Clear all filters
    await page.getByRole('button', { name: 'Clear filters' }).click();
    // Verify URL update reflecting no filters
    await expect(page).toHaveURL('/pia/list');

    // Select the 'CPO Review' status option
    await page.getByLabel('pia-status-select').selectOption('CPO_REVIEW');
    // Verify URL update for 'CPO Review' status filter
    await expect(page).toHaveURL('/pia/list?filterByStatus=CPO_REVIEW');

    // Select 'Health' from Ministry dropdown with 'CPO Review' status
    await page.getByLabel('ministry-select').selectOption('HEALTH');
    // Verify URL update for 'Health' ministry and 'CPO Review' status filters
    await expect(page).toHaveURL(
      '/pia/list?filterByMinistry=HEALTH&filterByStatus=CPO_REVIEW',
    );

    // Select 'Only my PIAs' from drafter filter with 'CPO Review' status and 'Health' ministry
    await page.getByLabel('drafter-filter-select').selectOption('onlyMyPias');
    // Verify URL update for combined filters of drafter, status, and ministry
    await expect(page).toHaveURL(
      '/pia/list?filterPiaDrafterByCurrentUser=onlyMyPias&filterByStatus=CPO_REVIEW&filterByMinistry=HEALTH',
    );

    // Click the 'Clear filters' button
    await page.getByRole('button', { name: 'Clear filters' }).click();
    // Verify that the URL reflects the removal of the filter
    await expect(page).toHaveURL('/pia/list');

    // Select the 'Final Review' status option
    await page.getByLabel('pia-status-select').selectOption('FINAL_REVIEW');
    // Verify URL update for 'Final Review' status filter
    await expect(page).toHaveURL('/pia/list?filterByStatus=FINAL_REVIEW');

    // Select 'Forests' from Ministry dropdown with 'Final Review' status
    await page.getByLabel('ministry-select').selectOption('FORESTS');
    // Verify URL update for 'Forests' ministry and 'Final Review' status filters
    await expect(page).toHaveURL(
      '/pia/list?filterByMinistry=FORESTS&filterByStatus=FINAL_REVIEW',
    );

    // Select 'Exclude my PIAs' from drafter filter with 'Final Review' status and 'Forests' ministry
    await page
      .getByLabel('drafter-filter-select')
      .selectOption('excludeMyPias');
    // Verify URL update for combined filters of drafter, status, and ministry
    await expect(page).toHaveURL(
      '/pia/list?filterPiaDrafterByCurrentUser=excludeMyPias&filterByStatus=FINAL_REVIEW&filterByMinistry=FORESTS',
    );

    // Click the 'Clear filters' button
    await page.getByRole('button', { name: 'Clear filters' }).click();
    // Verify that the URL reflects the removal of the filter
    await expect(page).toHaveURL('/pia/list');

    // Log out
    await logout(page);
  });

  // Test with CPO role
  test('Filter PIAs as CPO', async ({ page }) => {
    // Log in as a CPO
    await cpoLogin(page);

    // Verify pia list URL
    await expect(page).toHaveURL('/pia/list');

    // Select the 'Drafting in Progress' status option
    await page
      .getByLabel('pia-status-select')
      .selectOption('DRAFTING_IN_PROGRESS');
    // Verify URL update for 'Drafting in Progress' status filter
    await expect(page).toHaveURL(
      '/pia/list?filterByStatus=DRAFTING_IN_PROGRESS',
    );

    // Select the 'Edit in Progress' status option
    await page.getByLabel('pia-status-select').selectOption('EDIT_IN_PROGRESS');
    // Verify URL update for 'Edit in Progress' status filter
    await expect(page).toHaveURL('/pia/list?filterByStatus=EDIT_IN_PROGRESS');

    // Select the 'MPO Review' status option
    await page.getByLabel('pia-status-select').selectOption('MPO_REVIEW');
    // Verify URL update for 'MPO Review' status filter
    await expect(page).toHaveURL('/pia/list?filterByStatus=MPO_REVIEW');

    // Clear all filters
    await page.getByRole('button', { name: 'Clear filters' }).click();
    // Verify URL update reflecting no filters
    await expect(page).toHaveURL('/pia/list');

    // Select 'Agriculture and Food' from Ministry dropdown
    await page
      .getByLabel('ministry-select')
      .selectOption('AGRICULTURE_AND_FOOD');
    // Verify URL update for 'Agriculture and Food' ministry filter
    await expect(page).toHaveURL(
      '/pia/list?filterByMinistry=AGRICULTURE_AND_FOOD',
    );

    // Select 'Attorney General' from Ministry dropdown
    await page.getByLabel('ministry-select').selectOption('ATTORNEY_GENERAL');
    // Verify URL update for 'Attorney General' ministry filter
    await expect(page).toHaveURL('/pia/list?filterByMinistry=ATTORNEY_GENERAL');

    // Select 'Citizens Services' from Ministry dropdown
    await page.getByLabel('ministry-select').selectOption('CITIZENS_SERVICES');
    // Verify URL update for 'Citizens Services' ministry filter
    await expect(page).toHaveURL(
      '/pia/list?filterByMinistry=CITIZENS_SERVICES',
    );

    // Clear all filters
    await page.getByRole('button', { name: 'Clear filters' }).click();
    // Verify URL update reflecting no filters
    await expect(page).toHaveURL('/pia/list');

    // Select 'Exclude my PIAs' from drafter filter
    await page
      .getByLabel('drafter-filter-select')
      .selectOption('excludeMyPias');
    // Verify URL update for 'Exclude my PIAs' drafter filter
    await expect(page).toHaveURL(
      '/pia/list?filterPiaDrafterByCurrentUser=excludeMyPias',
    );

    // Select 'Only my PIAs' from drafter filter
    await page.getByLabel('drafter-filter-select').selectOption('onlyMyPias');
    // Verify URL update for 'Only my PIAs' drafter filter
    await expect(page).toHaveURL(
      '/pia/list?filterPiaDrafterByCurrentUser=onlyMyPias',
    );

    // Clear all filters
    await page.getByRole('button', { name: 'Clear filters' }).click();
    // Verify URL update reflecting no filters
    await expect(page).toHaveURL('/pia/list');

    // Select the 'CPO Review' status option
    await page.getByLabel('pia-status-select').selectOption('CPO_REVIEW');
    // Verify URL update for 'CPO Review' status filter
    await expect(page).toHaveURL('/pia/list?filterByStatus=CPO_REVIEW');

    // Select 'Health' from Ministry dropdown with 'CPO Review' status
    await page.getByLabel('ministry-select').selectOption('HEALTH');
    // Verify URL update for 'Health' ministry and 'CPO Review' status filters
    await expect(page).toHaveURL(
      '/pia/list?filterByMinistry=HEALTH&filterByStatus=CPO_REVIEW',
    );

    // Select 'Only my PIAs' from drafter filter with 'CPO Review' status and 'Health' ministry
    await page.getByLabel('drafter-filter-select').selectOption('onlyMyPias');
    // Verify URL update for combined filters of drafter, status, and ministry
    await expect(page).toHaveURL(
      '/pia/list?filterPiaDrafterByCurrentUser=onlyMyPias&filterByStatus=CPO_REVIEW&filterByMinistry=HEALTH',
    );

    // Click the 'Clear filters' button
    await page.getByRole('button', { name: 'Clear filters' }).click();
    // Verify that the URL reflects the removal of the filter
    await expect(page).toHaveURL('/pia/list');

    // Select the 'Final Review' status option
    await page.getByLabel('pia-status-select').selectOption('FINAL_REVIEW');
    // Verify URL update for 'Final Review' status filter
    await expect(page).toHaveURL('/pia/list?filterByStatus=FINAL_REVIEW');

    // Select 'Forests' from Ministry dropdown with 'Final Review' status
    await page.getByLabel('ministry-select').selectOption('FORESTS');
    // Verify URL update for 'Forests' ministry and 'Final Review' status filters
    await expect(page).toHaveURL(
      '/pia/list?filterByMinistry=FORESTS&filterByStatus=FINAL_REVIEW',
    );

    // Select 'Exclude my PIAs' from drafter filter with 'Final Review' status and 'Forests' ministry
    await page
      .getByLabel('drafter-filter-select')
      .selectOption('excludeMyPias');
    // Verify URL update for combined filters of drafter, status, and ministry
    await expect(page).toHaveURL(
      '/pia/list?filterPiaDrafterByCurrentUser=excludeMyPias&filterByStatus=FINAL_REVIEW&filterByMinistry=FORESTS',
    );

    // Click the 'Clear filters' button
    await page.getByRole('button', { name: 'Clear filters' }).click();
    // Verify that the URL reflects the removal of the filter
    await expect(page).toHaveURL('/pia/list');

    // Log out
    await logout(page);
  });
});
