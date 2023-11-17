import { Page, expect } from '@playwright/test';
import { drafterUsername, drafterPassword } from '../env/env';

// Function to log in as a Drafter user
export async function drafterLogin(page: Page) {
  try {
    // Navigate to the home page
    await page.goto('/');

    // Click on the 'Log in with IDIR' button
    const loginButton = page
      .locator('#main-content')
      .getByRole('button', { name: 'Log in with IDIR' });
    await loginButton.waitFor({ state: 'visible' });
    await loginButton.click();

    // Enter the Drafter username
    const userField = page.locator('#user');
    await userField.waitFor({ state: 'visible' });
    await userField.click();
    await userField.fill(drafterUsername);

    // Enter the Drafter password
    const passwordField = page.getByLabel('Password');
    await passwordField.waitFor({ state: 'visible' });
    await passwordField.click();
    await passwordField.fill(drafterPassword);

    // Click on the 'Continue' button to log in
    const continueButton = page.getByRole('button', { name: 'Continue' });
    await continueButton.waitFor({ state: 'visible' });
    await continueButton.click();

    // Verify that the user is redirected to the PIA list page after logging in
    await expect(page).toHaveURL('/pia/list');

    // Navigate to the home page
    await page.goto('/');

    // Click on the 'Access App' button
    const accessAppLink = page.getByRole('link', { name: 'Access App' });
    await accessAppLink.waitFor({ state: 'visible' });
    await accessAppLink.click();

    // Verify that the user is redirected to the PIA list page after logging in
    await expect(page).toHaveURL('/pia/list');
  } catch (error) {
    // Handle errors that occur during login
    console.error('Login failed', error);
    throw new Error('Login failed'); // Re-throw the error to fail the test
  }
}
