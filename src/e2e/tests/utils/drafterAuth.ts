import { Page, expect } from '@playwright/test';
import { drafterUsername, drafterPassword } from '../../env';

// Function to log in as a Drafter user
export async function drafterLogin(page: Page) {
  try {
    // Navigate to the home page
    await page.goto('/');

    // Click on the 'Log in with IDIR' button
    await page
      .locator('#main-content')
      .getByRole('button', { name: 'Log in with IDIR' })
      .click();

    // Enter the Drafter username
    await page.locator('#user').click();
    await page.locator('#user').fill(drafterUsername);

    // Enter the Drafter password
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill(drafterPassword);

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

// Function to log out as a Drafter user
export async function drafterLogout(page: Page) {
  try {
    // Click on the 'Sign Out' button
    await page.getByRole('button', { name: 'Sign Out' }).click();

    // Confirm sign out
    await page.getByLabel('Yes, sign out').click();

    // Verify that the user is redirected to the home page after logging out
    await expect(page).toHaveURL('/');

    // Navigate to the home page
    await page.goto('/');

    // Verify 'Log in with IDIR' button is displayed
    await expect(
      page.locator('#main-content >> role=button[name="Log in with IDIR"]'),
    ).toHaveText('Log in with IDIR');
  } catch (error) {
    // Handle errors that occur during logout
    console.error('Logout failed', error);
    throw new Error('Logout failed'); // Re-throw the error to fail the test
  }
}
