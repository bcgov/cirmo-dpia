import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title.
  await expect(page).toHaveTitle('Digital Privacy Impact Assessment (DPIA)');
});

// eslint-disable-next-line playwright/expect-expect
test('Log in with IDIR', async ({ page }) => {
  await page.goto('/');
  await page
    .locator('#main-content')
    .getByRole('button', { name: 'Log in with IDIR' })
    .click();

  page.getByText('IDIR Username');
});
