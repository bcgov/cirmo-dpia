import { Page, expect } from '@playwright/test';
import { mpoUsername, mpoPassword } from '../env/env';

// Function to log in as a MPO user
export async function mpoLogin(page: Page) {
  try {
    // Navigate to the home page
    await page.goto('/');

    // Click on the 'Log in with IDIR' button
    await page
      .locator('#main-content')
      .getByRole('button', { name: 'Log in with IDIR' })
      .click();

    // Enter the MPO username
    await page.locator('#user').click();
    await page.locator('#user').fill(mpoUsername);

    // Enter the MPO password
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill(mpoPassword);

    // Click on the 'Continue' button to log in
    await page.getByRole('button', { name: 'Continue' }).click();

    // Verify that the user is redirected to the PIA list page after logging in
    await expect(page).toHaveURL('/pia/list');

    // Navigate to the home page
    await page.goto('/');

    // Click on the 'Access App' button
    await page.getByRole('link', { name: 'Access App' }).click();

    // Verify that the user is redirected to the PIA list page after logging in
    await expect(page).toHaveURL('/pia/list');
  } catch (error) {
    // Handle errors that occur during login
    console.error('Login failed', error);
    throw new Error('Login failed'); // Re-throw the error to fail the test
  }
}
