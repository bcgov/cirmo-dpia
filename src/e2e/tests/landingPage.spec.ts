import { test, expect } from '@playwright/test';

test('Landing Page', async ({ page }) => {
  // Go to the starting URL
  await page.goto('/');
  await page.waitForURL('/');
  await expect(page).toHaveURL('/');

  // Verify the main heading is present
  const mainHeading = page.getByRole('heading', {
    name: 'Complete a Privacy Impact Assessment (PIA) Online',
  });
  await mainHeading.waitFor({ state: 'visible' });
  await expect(mainHeading).toBeVisible();

  // Click on the 'service design findings' link and verify the expected URL
  const serviceDesignFindingsLink = page.getByRole('link', {
    name: 'service design findings',
  });
  await serviceDesignFindingsLink.waitFor({ state: 'visible' });
  const serviceDesignFindingsPromise = page.waitForEvent('popup');
  await serviceDesignFindingsLink.click();
  const serviceDesignFindingsPage = await serviceDesignFindingsPromise;
  const serviceDesignFindingsURL =
    'https://www2.gov.bc.ca/gov/content/governments/services-for-government/service-experience-digital-delivery/service-content-design/case-studies/privacy-as-process';
  await serviceDesignFindingsPage.waitForURL(serviceDesignFindingsURL);
  await expect(serviceDesignFindingsPage).toHaveURL(serviceDesignFindingsURL);

  // Click on the 'this page' link and verify the expected URL
  const thisPageLink = page.getByRole('link', { name: 'this page' });
  await thisPageLink.waitFor({ state: 'visible' });
  const thisPagePromise = page.waitForEvent('popup');
  await thisPageLink.click();
  const thisPage = await thisPagePromise;
  const thisPageURL = 'https://github.com/bcgov/cirmo-dpia/releases';
  await thisPage.waitForURL(thisPageURL);
  await expect(thisPage).toHaveURL(thisPageURL);

  // Click on the 'contact' button and verify the expected URL
  const contactLink = page.getByRole('link', { name: 'Contact', exact: true });
  await expect(contactLink).toBeVisible();
  const href = await contactLink.getAttribute('href');
  await expect(href).toBe('mailto:pia.intake@gov.bc.ca');

  // Click on the 'Learn about the current PIA process' link and verify the expected URL
  const currentPIAProcessLink = page.getByRole('link', {
    name: 'Learn about the current PIA process',
  });
  await currentPIAProcessLink.waitFor({ state: 'visible' });
  const currentPIAProcessPromise = page.waitForEvent('popup');
  await currentPIAProcessLink.click();
  const currentPIAProcessPage = await currentPIAProcessPromise;
  const currentPIAProcessURL =
    'https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/privacy/privacy-impact-assessments';
  await currentPIAProcessPage.waitForURL(currentPIAProcessURL);
  await expect(currentPIAProcessPage).toHaveURL(currentPIAProcessURL);

  // Verify visibility of different sections by their headings
  await expect(page.getByRole('heading', { name: 'Problem' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Hypothesis' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Vision' })).toBeVisible();

  // Click on the 'Home' link and verify the expected URL
  const homeLink = page.getByRole('link', { name: 'Home' });
  await homeLink.waitFor({ state: 'visible' });
  const homePagePromise = page.waitForEvent('popup');
  await homeLink.click();
  const homePage = await homePagePromise;
  const homePageURL = 'https://www2.gov.bc.ca/gov/content/home';
  await homePage.waitForURL(homePageURL);
  await expect(homePage).toHaveURL(homePageURL);

  // Click on the 'About gov.bc.ca' link and verify the expected URL
  const aboutLink = page.getByRole('link', { name: 'About gov.bc.ca' });
  await aboutLink.waitFor({ state: 'visible' });
  const aboutPagePromise = page.waitForEvent('popup');
  await aboutLink.click();
  const aboutPage = await aboutPagePromise;
  const aboutPageURL = 'https://www2.gov.bc.ca/gov/content/about-gov-bc-ca';
  await aboutPage.waitForURL(aboutPageURL);
  await expect(aboutPage).toHaveURL(aboutPageURL);

  // Click on the 'Disclaimer' link and verify the expected URL
  const disclaimerLink = page.getByRole('link', { name: 'Disclaimer' });
  await disclaimerLink.waitFor({ state: 'visible' });
  const disclaimerPagePromise = page.waitForEvent('popup');
  await disclaimerLink.click();
  const disclaimerPage = await disclaimerPagePromise;
  const disclaimerPageURL =
    'https://www2.gov.bc.ca/gov/content/home/disclaimer';
  await disclaimerPage.waitForURL(disclaimerPageURL);
  await expect(disclaimerPage).toHaveURL(disclaimerPageURL);

  // Click on the 'Accessibility' link and verify the expected URL
  const accessibilityLink = page.getByRole('link', { name: 'Accessibility' });
  await accessibilityLink.waitFor({ state: 'visible' });
  const accessibilityPagePromise = page.waitForEvent('popup');
  await accessibilityLink.click();
  const accessibilityPage = await accessibilityPagePromise;
  const accessibilityPageURL =
    'https://www2.gov.bc.ca/gov/content/home/accessible-government';
  await accessibilityPage.waitForURL(accessibilityPageURL);
  await expect(accessibilityPage).toHaveURL(accessibilityPageURL);

  // Click on the 'Copyright' link and verify the expected URL
  const copyrightLink = page.getByRole('link', { name: 'Copyright' });
  await copyrightLink.waitFor({ state: 'visible' });
  const copyrightPagePromise = page.waitForEvent('popup');
  await copyrightLink.click();
  const copyrightPage = await copyrightPagePromise;
  const copyrightPageURL = 'https://www2.gov.bc.ca/gov/content/home/copyright';
  await copyrightPage.waitForURL(copyrightPageURL);
  await expect(copyrightPage).toHaveURL(copyrightPageURL);

  // Click on the 'Contact us' link and verify the expected URL
  const contactUsLink = page.getByRole('link', { name: 'Contact us' });
  await contactUsLink.waitFor({ state: 'visible' });
  const contactUsPagePromise = page.waitForEvent('popup');
  await contactUsLink.click();
  const contactUsPage = await contactUsPagePromise;
  const contactUsPageURL =
    'https://www2.gov.bc.ca/gov/content/home/get-help-with-government-services';
  await contactUsPage.waitForURL(contactUsPageURL);
  await expect(contactUsPage).toHaveURL(contactUsPageURL);
});
