import { test, expect } from '@playwright/test';

test('Landing Page', async ({ page }) => {
  // Go to the starting URL
  await page.goto('/');

  // Verify the main heading is present
  await expect(
    page.getByRole('heading', {
      name: 'Complete a Privacy Impact Assessment (PIA) Online',
    }),
  ).toBeVisible();

  // Click on the 'service design findings' link and verify the expected URL
  const serviceDesignFindingsPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'service design findings' }).click();
  const serviceDesignFindingsPage = await serviceDesignFindingsPromise;
  await expect(serviceDesignFindingsPage).toHaveURL(
    'https://www2.gov.bc.ca/gov/content/governments/services-for-government/service-experience-digital-delivery/service-content-design/case-studies/privacy-as-process',
  );

  // Click on the 'this page' link and verify the expected URL
  const thisPagePromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'this page' }).click();
  const thisPage = await thisPagePromise;
  await expect(thisPage).toHaveURL(
    'https://github.com/bcgov/cirmo-dpia/releases',
  );

  // Click on the 'contact' button and verify the expected URL
  const contactLink = page.getByRole('link', { name: 'Contact', exact: true });
  await expect(contactLink).toBeVisible();
  const href = await contactLink.getAttribute('href');
  await expect(href).toBe('mailto:pia.intake@gov.bc.ca');

  // Click on the 'Learn about the current PIA process' link and verify the expected URL
  const currentPIAProcessPromise = page.waitForEvent('popup');
  await page
    .getByRole('link', { name: 'Learn about the current PIA process' })
    .click();
  const currentPIAProcessPage = await currentPIAProcessPromise;
  await expect(currentPIAProcessPage).toHaveURL(
    'https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/privacy/privacy-impact-assessments',
  );

  // Verify visibility of different sections by their headings
  await expect(page.getByRole('heading', { name: 'Problem' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Hypothesis' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Vision' })).toBeVisible();

  // Click on the 'Home' link and verify the expected URL
  const homePagePromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Home' }).click();
  const homePage = await homePagePromise;
  await expect(homePage).toHaveURL('https://www2.gov.bc.ca/gov/content/home');

  // Click on the 'About gov.bc.ca' link and verify the expected URL
  const aboutPagePromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'About gov.bc.ca' }).click();
  const aboutPage = await aboutPagePromise;
  await expect(aboutPage).toHaveURL(
    'https://www2.gov.bc.ca/gov/content/about-gov-bc-ca',
  );

  // Click on the 'Disclaimer' link and verify the expected URL
  const disclaimerPagePromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Disclaimer' }).click();
  const disclaimerPage = await disclaimerPagePromise;
  await expect(disclaimerPage).toHaveURL(
    'https://www2.gov.bc.ca/gov/content/home/disclaimer',
  );

  // Click on the 'Accessibility' link and verify the expected URL
  const accessibilityPagePromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Accessibility' }).click();
  const accessibilityPage = await accessibilityPagePromise;
  await expect(accessibilityPage).toHaveURL(
    'https://www2.gov.bc.ca/gov/content/home/accessible-government',
  );

  // Click on the 'Copyright' link and verify the expected URL
  const copyrightPagePromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Copyright' }).click();
  const copyrightPage = await copyrightPagePromise;
  await expect(copyrightPage).toHaveURL(
    'https://www2.gov.bc.ca/gov/content/home/copyright',
  );

  // Click on the 'Contact us' link and verify the expected URL
  const contactUsPagePromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Contact us' }).click();
  const contactUsPage = await contactUsPagePromise;
  await expect(contactUsPage).toHaveURL(
    'https://www2.gov.bc.ca/gov/content/home/get-help-with-government-services',
  );
});
