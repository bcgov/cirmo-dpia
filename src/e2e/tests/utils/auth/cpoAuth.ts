import { Page, expect } from '@playwright/test';
import { cpoUsername, cpoPassword } from '../env/env';

// Function to log in as a CPO user
export async function cpoLogin(page: Page) {
  try {
    // Navigate to the home page
    await page.goto('/');

    // Click on the 'Log in with IDIR' button
    const loginButton = page
      .locator('#main-content')
      .getByRole('button', { name: 'Log in with IDIR' });
    await loginButton.waitFor({ state: 'visible' });
    await loginButton.click();

    // Enter the CPO username
    const userField = page.locator('#user');
    await userField.waitFor({ state: 'visible' });
    await userField.click();
    await userField.fill(cpoUsername);

    // Enter the CPO password
    const passwordField = page.getByLabel('Password');
    await passwordField.waitFor({ state: 'visible' });
    await passwordField.click();
    await passwordField.fill(cpoPassword);

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

// Function to log out as a CPO user
export async function logout(page: Page) {
  try {
    // Click on the 'Sign Out' button
    const signOutButton = page.getByRole('button', { name: 'Sign Out' });
    await signOutButton.waitFor({ state: 'visible' });
    await signOutButton.click();

    // Confirm sign out
    const confirmSignOutButton = page.getByLabel('Yes, sign out');
    await confirmSignOutButton.waitFor({ state: 'visible' });
    await confirmSignOutButton.click();

    // Verify that the user is redirected to the home page after logging out
    await expect(page).toHaveURL('/');

    // Navigate to the home page
    await page.goto('/');

    // Verify 'Log in with IDIR' button is displayed
    const loginButton = page.locator(
      '#main-content >> role=button[name="Log in with IDIR"]',
    );
    await loginButton.waitFor({ state: 'visible' });
    await expect(loginButton).toHaveText('Log in with IDIR');
  } catch (error) {
    // Handle errors that occur during logout
    console.error('Logout failed', error);
    throw new Error('Logout failed'); // Re-throw the error to fail the test
  }
}
