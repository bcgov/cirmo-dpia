import { Page, expect } from '@playwright/test';

/* 
Test code for Drafter PIA form filling. This function fills out the full PIA Form. It then submits the form and checks if the page redirects to '/intake/view'.
*/
export async function drafterPiaFill(page: Page, uuid: string) {
  //PIA Intake Form Tab
  async function fillPIAIntakeInitiativeDetails() {
    await page
      .getByLabel('Initiative title (required)')
      .waitFor({ state: 'visible' });
    await page.getByLabel('Initiative title (required)').click();
    await page.getByLabel('Initiative title (required)').fill(`TEST_${uuid}`);

    await page.getByLabel('Ministry').waitFor({ state: 'visible' });
    await page.getByLabel('Ministry').selectOption('CITIZENS_SERVICES');

    await page.getByLabel('Branch (required)').waitFor({ state: 'visible' });
    await page.getByLabel('Branch (required)').click();
    await page.getByLabel('Branch (required)').fill('IMB');

    await page.getByLabel('Initiative lead name').waitFor({ state: 'visible' });
    await page.getByLabel('Initiative lead name').click();
    await page.getByLabel('Initiative lead name').fill('Test Tester');

    await page
      .getByLabel('Initiative lead email')
      .waitFor({ state: 'visible' });
    await page.getByLabel('Initiative lead email').click();
    await page.getByLabel('Initiative lead email').fill('tester@email.com');

    await page
      .getByLabel('Initiative lead title')
      .waitFor({ state: 'visible' });
    await page.getByLabel('Initiative lead title').click();
    await page.getByLabel('Initiative lead title').fill('Tester');
  }

  async function fillPIAIntakeInitiativeDescriptionDetails() {
    await page
      .locator('#initiativeDescription div')
      .nth(2)
      .waitFor({ state: 'visible' });
    await page.locator('#initiativeDescription div').nth(2).click();
    await page
      .locator('#initiativeDescription div')
      .nth(2)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
      );
  }

  async function fillPIAIntakeInitiativeScopeDetails() {
    await page
      .locator('#initiativeScope div')
      .nth(2)
      .waitFor({ state: 'visible' });
    await page.locator('#initiativeScope div').nth(2).click();
    await page
      .locator('#initiativeScope div')
      .nth(2)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
      );
  }

  async function fillPIAIntakeDataElementsInvolvedDetails() {
    await page
      .locator('#dataElementsInvolved div')
      .nth(2)
      .waitFor({ state: 'visible' });
    await page.locator('#dataElementsInvolved div').nth(2).click();
    await page
      .locator('#dataElementsInvolved div')
      .nth(2)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
      );
  }

  async function PIAIntakeSubmitDetails() {
    const locator = page
      .locator('div')
      .filter({ hasText: /^Saved at/ })
      .nth(1);
    await locator.waitFor({ state: 'visible' });
    await expect(locator).toHaveText(/^Saved at/);

    await page.getByLabel('Submit Button').waitFor({ state: 'visible' });
    await page.getByLabel('Submit Button').click();
    await page.getByLabel('Yes, submit').waitFor({ state: 'visible' });
    await page.getByLabel('Yes, submit').click();

    await page.getByLabel('Next Button').click();
  }

  // Collection, use and disclosure Tab
  async function fillCollectionUseDisclosureStepDetails() {
    await page.getByLabel('Describe the step').waitFor({ state: 'visible' });
    await page.getByLabel('Describe the step').click();
    await page
      .getByLabel('Describe the step')
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
      );

    await page.getByLabel('Add more steps').waitFor({ state: 'visible' });
    await page.getByLabel('Add more steps').click();

    await page
      .getByLabel('Describe the step')
      .nth(1)
      .waitFor({ state: 'visible' });
    await page.getByLabel('Describe the step').nth(1).click();
    await page
      .getByLabel('Describe the step')
      .nth(1)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
      );

    await page.getByLabel('Add more steps').waitFor({ state: 'visible' });
    await page.getByLabel('Add more steps').click();

    // Wait for the third 'Describe the step' to be ready
    await page
      .getByLabel('Describe the step')
      .nth(2)
      .waitFor({ state: 'visible' });
    await page.getByLabel('Describe the step').nth(2).click();
    await page
      .getByLabel('Describe the step')
      .nth(2)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
      );
  }

  async function fillCollectionUseDisclosureNoticeDetails() {
    await page
      .locator('#drafterDisclosure div')
      .nth(2)
      .waitFor({ state: 'visible' });
    await page.locator('#drafterDisclosure div').nth(2).click();
    await page
      .locator('#drafterDisclosure div')
      .nth(2)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
      );
  }

  async function CollectionUseDisclosureSubmitDetails() {
    await page.getByLabel('Next Button').waitFor({ state: 'visible' });
    await page.getByLabel('Next Button').click();
  }

  // Storing Personal Information Form Tab
  async function fillStoringPersonalInformationDetails() {
    await page
      .locator('#PersonalInformationStorage div')
      .nth(2)
      .waitFor({ state: 'visible' });
    await page.locator('#PersonalInformationStorage div').nth(2).click();
    await page
      .locator('#PersonalInformationStorage div')
      .nth(2)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
      );
  }

  async function fillStoringPersonalInformationSensitiveDetails1() {
    await page
      .getByText('No', { exact: true })
      .nth(2)
      .waitFor({ state: 'visible' });
    await page.getByText('No', { exact: true }).nth(2).click();

    await page
      .getByLabel('Name of service provider')
      .waitFor({ state: 'visible' });
    await page.getByLabel('Name of service provider').click();
    await page.getByLabel('Name of service provider').fill('Telus');

    const cloudProviderLabel =
      'Name of cloud infrastructure and/or platform provider(s) (if applicable)';
    await page.getByLabel(cloudProviderLabel).waitFor({ state: 'visible' });
    await page.getByLabel(cloudProviderLabel).click();
    await page
      .getByLabel(cloudProviderLabel)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    const storageInfoLabel =
      'Where and how is the sensitive personal information stored (including backups)?';
    await page.getByLabel(storageInfoLabel).waitFor({ state: 'visible' });
    await page.getByLabel(storageInfoLabel).click();
    await page
      .getByLabel(storageInfoLabel)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    const addMoreRowsLocator = page
      .locator('div')
      .filter({ hasText: /^Add more rows$/ })
      .first();
    await addMoreRowsLocator
      .getByLabel('Add more rows')
      .first()
      .waitFor({ state: 'visible' });
    await addMoreRowsLocator.getByLabel('Add more rows').first().click();
  }

  async function fillStoringPersonalInformationSensitiveDetails2() {
    await page
      .getByLabel('Name of service provider')
      .nth(1)
      .waitFor({ state: 'visible' });
    await page.getByLabel('Name of service provider').nth(1).click();
    await page.getByLabel('Name of service provider').nth(1).fill('Telus');

    const cloudProviderLabel =
      'Name of cloud infrastructure and/or platform provider(s) (if applicable)';
    await page
      .getByLabel(cloudProviderLabel)
      .nth(1)
      .waitFor({ state: 'visible' });
    await page.getByLabel(cloudProviderLabel).nth(1).click();
    await page
      .getByLabel(cloudProviderLabel)
      .nth(1)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    const storageInfoLabel =
      'Where and how is the sensitive personal information stored (including backups)?';
    await page
      .getByLabel(storageInfoLabel)
      .nth(1)
      .waitFor({ state: 'visible' });
    await page.getByLabel(storageInfoLabel).nth(1).click();
    await page
      .getByLabel(storageInfoLabel)
      .nth(1)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    const addMoreRowsLocator = page
      .locator('div')
      .filter({ hasText: /^Add more rows$/ })
      .first();
    await addMoreRowsLocator
      .getByLabel('Add more rows')
      .first()
      .waitFor({ state: 'visible' });
    await addMoreRowsLocator.getByLabel('Add more rows').first().click();
  }

  async function fillStoringPersonalInformationSensitiveDetails3() {
    await page
      .getByLabel('Name of service provider')
      .nth(2)
      .waitFor({ state: 'visible' });
    await page.getByLabel('Name of service provider').nth(2).click();
    await page.getByLabel('Name of service provider').nth(2).fill('Telus');

    const cloudProviderLabel =
      'Name of cloud infrastructure and/or platform provider(s) (if applicable)';
    await page
      .getByLabel(cloudProviderLabel)
      .nth(2)
      .waitFor({ state: 'visible' });
    await page.getByLabel(cloudProviderLabel).nth(2).click();
    await page
      .getByLabel(cloudProviderLabel)
      .nth(2)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    const storageInfoLabel =
      'Where and how is the sensitive personal information stored (including backups)?';
    await page
      .getByLabel(storageInfoLabel)
      .nth(2)
      .waitFor({ state: 'visible' });
    await page.getByLabel(storageInfoLabel).nth(2).click();
    await page
      .getByLabel(storageInfoLabel)
      .nth(2)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );
  }

  async function fillStoringPersonalInformationContractualDetails() {
    await page
      .locator('#ContractualTerms div')
      .nth(2)
      .waitFor({ state: 'visible' });
    await page.locator('#ContractualTerms div').nth(2).click();
    await page
      .locator('#ContractualTerms div')
      .nth(2)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
      );
  }

  async function fillStoringPersonalInformationAccessDetails() {
    await page
      .locator('#EnterpriseServiceAccess div')
      .nth(2)
      .waitFor({ state: 'visible' });
    await page.locator('#EnterpriseServiceAccess div').nth(2).click();
    await page
      .locator('#EnterpriseServiceAccess div')
      .nth(2)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
      );
  }

  async function fillStoringPersonalInformationAccessComments() {
    const commentsLocator = page.locator('.pt-5 > .d-flex > .bcgovbtn');
    await commentsLocator.waitFor({ state: 'visible' });
    await commentsLocator.click();

    for (let i = 0; i < 4; i++) {
      await page
        .getByPlaceholder('Write a comment...')
        .waitFor({ state: 'visible' });
      await page.getByPlaceholder('Write a comment...').click();
      await page
        .getByPlaceholder('Write a comment...')
        .fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
      await page.getByLabel('Add New Comment Button').click();
    }

    await page
      .getByLabel('Comment Options Button')
      .first()
      .waitFor({ state: 'visible' });
    await page.getByLabel('Comment Options Button').first().click();
    await page
      .getByRole('list', { name: 'Comment Options Menu' })
      .locator('button')
      .waitFor({ state: 'visible' });
    await page
      .getByRole('list', { name: 'Comment Options Menu' })
      .locator('button')
      .click();
    await page
      .getByLabel('Delete', { exact: true })
      .waitFor({ state: 'visible' });
    await page.getByLabel('Delete', { exact: true }).click();
  }

  async function fillStoringPersonalInformationUnauthorizedAccessDetails() {
    await page
      .locator('#UnauthorizedAccessControls div')
      .nth(2)
      .waitFor({ state: 'visible' });
    await page.locator('#UnauthorizedAccessControls div').nth(2).click();
    await page
      .locator('#UnauthorizedAccessControls div')
      .nth(2)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
      );
  }

  async function fillStoringPersonalInformationTrackAccess() {
    await page
      .locator('#TrackAccessDetails div')
      .nth(2)
      .waitFor({ state: 'visible' });
    await page.locator('#TrackAccessDetails div').nth(2).click();
    await page
      .locator('#TrackAccessDetails div')
      .nth(2)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
      );
  }

  async function fillStoringPersonalInformationPrivacyRisksStep1() {
    await page
      .getByLabel('Impact to individuals')
      .waitFor({ state: 'visible' });
    await page.getByLabel('Impact to individuals').click();
    await page
      .getByLabel('Impact to individuals')
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    await page
      .getByLabel('Privacy risk', { exact: true })
      .waitFor({ state: 'visible' });
    await page.getByLabel('Privacy risk', { exact: true }).click();
    await page
      .getByLabel('Privacy risk', { exact: true })
      .fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');

    await page
      .getByLabel(
        'Likelihood of unauthorized collection, use, disclosure or storage of the sensitive PI',
      )
      .waitFor({ state: 'visible' });
    await page
      .getByLabel(
        'Likelihood of unauthorized collection, use, disclosure or storage of the sensitive PI',
      )
      .click();
    await page
      .getByLabel(
        'Likelihood of unauthorized collection, use, disclosure or storage of the sensitive PI',
      )
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    await page
      .getByLabel('Level of privacy risk')
      .waitFor({ state: 'visible' });
    await page.getByLabel('Level of privacy risk').click();
    await page
      .getByLabel('Level of privacy risk')
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    await page
      .getByLabel(
        'Risk response (this may include contractual mitigations, technical controls and/or procedural and policy barriers)',
      )
      .waitFor({ state: 'visible' });
    await page
      .getByLabel(
        'Risk response (this may include contractual mitigations, technical controls and/or procedural and policy barriers)',
      )
      .click();
    await page
      .getByLabel(
        'Risk response (this may include contractual mitigations, technical controls and/or procedural and policy barriers)',
      )
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    await page
      .getByLabel('Is there any outstanding risk? If yes, please describe.')
      .waitFor({ state: 'visible' });
    await page
      .getByLabel('Is there any outstanding risk? If yes, please describe.')
      .click();
    await page
      .getByLabel('Is there any outstanding risk? If yes, please describe.')
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    const addMoreRowsLocator = page.getByLabel('Add more rows').nth(1);
    await addMoreRowsLocator.waitFor({ state: 'visible' });
    await addMoreRowsLocator.click();
  }

  async function fillStoringPersonalInformationPrivacyRisksStep2() {
    // Wait and interact with the second 'Privacy risk'
    await page.getByLabel('Privacy risk').nth(2).waitFor({ state: 'visible' });
    await page.getByLabel('Privacy risk').nth(2).click();
    await page
      .getByLabel('Privacy risk')
      .nth(2)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    // Wait and interact with the first 'Impact to individuals'
    await page
      .getByLabel('Impact to individuals')
      .nth(1)
      .waitFor({ state: 'visible' });
    await page.getByLabel('Impact to individuals').nth(1).click();
    await page
      .getByLabel('Impact to individuals')
      .nth(1)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    // Wait and interact with the first 'Likelihood of unauthorized collection, use, disclosure or storage of the sensitive PI'
    await page
      .getByLabel(
        'Likelihood of unauthorized collection, use, disclosure or storage of the sensitive PI',
      )
      .nth(1)
      .waitFor({ state: 'visible' });
    await page
      .getByLabel(
        'Likelihood of unauthorized collection, use, disclosure or storage of the sensitive PI',
      )
      .nth(1)
      .click();
    await page
      .getByLabel(
        'Likelihood of unauthorized collection, use, disclosure or storage of the sensitive PI',
      )
      .nth(1)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    // Wait and interact with the first 'Level of privacy risk'
    await page
      .getByLabel('Level of privacy risk')
      .nth(1)
      .waitFor({ state: 'visible' });
    await page.getByLabel('Level of privacy risk').nth(1).click();
    await page
      .getByLabel('Level of privacy risk')
      .nth(1)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    // Wait and interact with the first 'Risk response (this may include contractual mitigations, technical controls and/or procedural and policy barriers)'
    await page
      .getByLabel(
        'Risk response (this may include contractual mitigations, technical controls and/or procedural and policy barriers)',
      )
      .nth(1)
      .waitFor({ state: 'visible' });
    await page
      .getByLabel(
        'Risk response (this may include contractual mitigations, technical controls and/or procedural and policy barriers)',
      )
      .nth(1)
      .click();
    await page
      .getByLabel(
        'Risk response (this may include contractual mitigations, technical controls and/or procedural and policy barriers)',
      )
      .nth(1)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    // Wait and interact with the first 'Is there any outstanding risk? If yes, please describe.'
    await page
      .getByLabel('Is there any outstanding risk? If yes, please describe.')
      .nth(1)
      .waitFor({ state: 'visible' });
    await page
      .getByLabel('Is there any outstanding risk? If yes, please describe.')
      .nth(1)
      .click();
    await page
      .getByLabel('Is there any outstanding risk? If yes, please describe.')
      .nth(1)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    // Wait and click 'Add more rows' in a specific section
    const addMoreRowsLocator = page.getByLabel('Add more rows').nth(1);
    await addMoreRowsLocator.waitFor({ state: 'visible' });
    await addMoreRowsLocator.click();
  }

  async function fillStoringPersonalInformationPrivacyRisksStep3() {
    // Wait and interact with the third 'Privacy risk'
    await page
      .getByLabel('Privacy risk', { exact: true })
      .nth(2)
      .waitFor({ state: 'visible' });
    await page.getByLabel('Privacy risk', { exact: true }).nth(2).click();
    await page
      .getByLabel('Privacy risk', { exact: true })
      .nth(2)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    // Wait and interact with the third 'Impact to individuals'
    await page
      .getByLabel('Impact to individuals')
      .nth(2)
      .waitFor({ state: 'visible' });
    await page.getByLabel('Impact to individuals').nth(2).click();
    await page
      .getByLabel('Impact to individuals')
      .nth(2)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    // Wait and interact with the third 'Likelihood of unauthorized collection, use, disclosure or storage of the sensitive PI'
    await page
      .getByLabel(
        'Likelihood of unauthorized collection, use, disclosure or storage of the sensitive PI',
      )
      .nth(2)
      .waitFor({ state: 'visible' });
    await page
      .getByLabel(
        'Likelihood of unauthorized collection, use, disclosure or storage of the sensitive PI',
      )
      .nth(2)
      .click();
    await page
      .getByLabel(
        'Likelihood of unauthorized collection, use, disclosure or storage of the sensitive PI',
      )
      .nth(2)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    // Wait and interact with the third 'Level of privacy risk'
    await page
      .getByLabel('Level of privacy risk')
      .nth(2)
      .waitFor({ state: 'visible' });
    await page.getByLabel('Level of privacy risk').nth(2).click();
    await page
      .getByLabel('Level of privacy risk')
      .nth(2)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    // Wait and interact with the third 'Risk response (this may include contractual mitigations, technical controls and/or procedural and policy barriers)'
    await page
      .getByLabel(
        'Risk response (this may include contractual mitigations, technical controls and/or procedural and policy barriers)',
      )
      .nth(2)
      .waitFor({ state: 'visible' });
    await page
      .getByLabel(
        'Risk response (this may include contractual mitigations, technical controls and/or procedural and policy barriers)',
      )
      .nth(2)
      .click();
    await page
      .getByLabel(
        'Risk response (this may include contractual mitigations, technical controls and/or procedural and policy barriers)',
      )
      .nth(2)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    // Wait and interact with the third 'Is there any outstanding risk? If yes, please describe.'
    await page
      .getByLabel('Is there any outstanding risk? If yes, please describe.')
      .nth(2)
      .waitFor({ state: 'visible' });
    await page
      .getByLabel('Is there any outstanding risk? If yes, please describe.')
      .nth(2)
      .click();
    await page
      .getByLabel('Is there any outstanding risk? If yes, please describe.')
      .nth(2)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    // Wait and interact with the third 'Delete row button'
    await page
      .getByLabel('Delete row button')
      .nth(2)
      .waitFor({ state: 'visible' });
    await page.getByLabel('Delete row button').nth(2).click();
  }

  async function StoringPersonalInformationSubmit() {
    await page.getByLabel('Next Button').waitFor({ state: 'visible' });
    await page.getByLabel('Next Button').click();
  }

  // Security of Personal Information Form Tab
  async function fillSecurityOfPersonalInformationAccessDetails() {
    await page
      .getByLabel(
        'We allow employees in only certain roles access to information',
      )
      .waitFor({ state: 'visible' });
    await page
      .getByLabel(
        'We allow employees in only certain roles access to information',
      )
      .check();

    await page
      .getByLabel('We use audit logs to see who accesses a file and when')
      .waitFor({ state: 'visible' });
    await page
      .getByLabel('We use audit logs to see who accesses a file and when')
      .check();

    await page
      .locator('#PersonalInformationStrategies div')
      .nth(2)
      .waitFor({ state: 'visible' });
    await page.locator('#PersonalInformationStrategies div').nth(2).click();
    await page
      .locator('#PersonalInformationStrategies div')
      .nth(2)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );
  }

  async function fillSecurityOfPersonalInformationAccessComments() {
    await page.getByLabel('View comments').nth(1).waitFor({ state: 'visible' });
    await page.getByLabel('View comments').nth(1).click();

    // Loop for filling comments
    for (let i = 0; i < 3; i++) {
      await page
        .getByPlaceholder('Write a comment...')
        .waitFor({ state: 'visible' });
      await page.getByPlaceholder('Write a comment...').click();
      await page
        .getByPlaceholder('Write a comment...')
        .fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
      await page.getByLabel('Add New Comment Button').click();
    }

    await page
      .getByLabel('Comment Options Button')
      .first()
      .waitFor({ state: 'visible' });
    await page.getByLabel('Comment Options Button').first().click();
    await page
      .getByRole('list', { name: 'Comment Options Menu' })
      .locator('button')
      .waitFor({ state: 'visible' });
    await page
      .getByRole('list', { name: 'Comment Options Menu' })
      .locator('button')
      .click();
    await page
      .getByLabel('Delete', { exact: true })
      .waitFor({ state: 'visible' });
    await page.getByLabel('Delete', { exact: true }).click();
  }

  async function SecurityOfPersonalInformationSubmitDetails() {
    await page
      .locator('.collapsible__header')
      .first()
      .waitFor({ state: 'visible' });
    await page.locator('.collapsible__header').first().click();
    await page.getByLabel('Next Button').waitFor({ state: 'visible' });
    await page.getByLabel('Next Button').click();
  }

  // Accuracy, Correction and Retention Form Tab
  async function fillAccuracyCorrectionRetentionAccuracyDetails() {
    await page
      .locator('#AccuracyDescription div')
      .nth(2)
      .waitFor({ state: 'visible' });
    await page.locator('#AccuracyDescription div').nth(2).click();
    await page
      .locator('#AccuracyDescription div')
      .nth(2)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
      );
  }

  async function fillAccuracyCorrectionRetentionCorrectionDetails() {
    const noProcessLabel =
      'Do you have a process in place to correct personal information? radio button NO';
    await page.getByLabel(noProcessLabel).waitFor({ state: 'visible' });
    await page.getByLabel(noProcessLabel).check();

    const noteCorrectionRequestLabel =
      "If you can't correct personal data, FOIPPA mandates noting the correction request on the record; will you ensure this documentation? radio button NO";
    await page
      .getByLabel(noteCorrectionRequestLabel)
      .waitFor({ state: 'visible' });
    await page.getByLabel(noteCorrectionRequestLabel).check();

    const notifyThirdPartyLabel =
      "If someone requests a correction and you've shared their data in the past year, FOIPPA mandates notifying the third party; will you ensure compliance? radio button NO";
    await page.getByLabel(notifyThirdPartyLabel).waitFor({ state: 'visible' });
    await page.getByLabel(notifyThirdPartyLabel).check();
  }

  async function fillAccuracyCorrectionRetentionPersonalInformationDetails() {
    const infoScheduleLabel =
      'Do you have an approved information schedule in place related to personal information used to make decisions? radio button NO';
    await page.getByLabel(infoScheduleLabel).waitFor({ state: 'visible' });
    await page.getByLabel(infoScheduleLabel).check();

    await page
      .locator('#DescribeRetention div')
      .nth(2)
      .waitFor({ state: 'visible' });
    await page.locator('#DescribeRetention div').nth(2).click();
    await page
      .locator('#DescribeRetention div')
      .nth(2)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
      );
  }

  async function fillAccuracyCorrectionRetentionSubmitDetails() {
    await page.getByLabel('Next Button').waitFor({ state: 'visible' });
    await page.getByLabel('Next Button').click();
  }

  // Agreements and information banks Form Tab
  async function fillAgreementsInformationBanksAgreementsDetails() {
    await page
      .locator('#InformationSharingAgreement div')
      .nth(2)
      .waitFor({ state: 'visible' });
    await page.locator('#InformationSharingAgreement div').nth(2).click();
    await page
      .locator('#InformationSharingAgreement div')
      .nth(2)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
      );
  }

  async function fillAgreementsInformationBanksMainMinistryDetails() {
    // Main ministry or agency involved
    await page
      .getByLabel('Main ministry or agency involved (required)')
      .first()
      .waitFor({ state: 'visible' });
    await page
      .getByLabel('Main ministry or agency involved (required)')
      .first()
      .click();
    await page
      .getByLabel('Main ministry or agency involved (required)')
      .first()
      .fill('Lorem ipsum dolor');

    // Other ministries, agencies, public bodies or organizations involved
    await page
      .getByLabel(
        'Any other ministries, agencies, public bodies or organizations involved (required)',
      )
      .first()
      .waitFor({ state: 'visible' });
    await page
      .getByLabel(
        'Any other ministries, agencies, public bodies or organizations involved (required)',
      )
      .first()
      .click();
    await page
      .getByLabel(
        'Any other ministries, agencies, public bodies or organizations involved (required)',
      )
      .first()
      .fill('Lorem ipsum dolor');

    // Business contact title
    await page
      .getByLabel(
        'Business contact title of person responsible for maintaining the ISA (required)',
      )
      .waitFor({ state: 'visible' });
    await page
      .getByLabel(
        'Business contact title of person responsible for maintaining the ISA (required)',
      )
      .click();
    await page
      .getByLabel(
        'Business contact title of person responsible for maintaining the ISA (required)',
      )
      .fill('Lorem ipsum dolor');

    // Business contact phone number
    await page
      .getByLabel(
        'Business contact phone number of person responsible for maintaining the ISA (required)',
      )
      .waitFor({ state: 'visible' });
    await page
      .getByLabel(
        'Business contact phone number of person responsible for maintaining the ISA (required)',
      )
      .click();
    await page
      .getByLabel(
        'Business contact phone number of person responsible for maintaining the ISA (required)',
      )
      .fill('Lorem ipsum dolor');

    // ISA start date
    await page.getByLabel('ISA start date').waitFor({ state: 'visible' });
    await page.getByLabel('ISA start date').click();
    await page.getByLabel('Choose Friday, December 1st, 2023').click();

    // ISA end date
    await page.getByLabel('ISA end date').waitFor({ state: 'visible' });
    await page.getByLabel('ISA end date').click();
    await page.getByLabel('Choose Friday, December 1st, 2023').click();
  }

  async function fillAgreementsInformationBanksPersonalInformationDetails() {
    await page
      .locator('#PersonalInformationBank div')
      .nth(2)
      .waitFor({ state: 'visible' });
    await page.locator('#PersonalInformationBank div').nth(2).click();
    await page
      .locator('#PersonalInformationBank div')
      .nth(2)
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
      );
  }

  async function fillAgreementsInformationBanksPersonalMainMinistryDetails() {
    // Wait and interact with the 'Main ministry or agency involved'
    await page
      .getByLabel('Main ministry or agency involved (required)')
      .nth(1)
      .waitFor({ state: 'visible' });
    await page
      .getByLabel('Main ministry or agency involved (required)')
      .nth(1)
      .click();
    await page
      .getByLabel('Main ministry or agency involved (required)')
      .nth(1)
      .fill('Lorem ipsum dolor');

    // Wait and interact with 'Any other ministries, agencies, public bodies or organizations involved'
    await page
      .getByLabel(
        'Any other ministries, agencies, public bodies or organizations involved (required)',
      )
      .nth(1)
      .waitFor({ state: 'visible' });
    await page
      .getByLabel(
        'Any other ministries, agencies, public bodies or organizations involved (required)',
      )
      .nth(1)
      .click();
    await page
      .getByLabel(
        'Any other ministries, agencies, public bodies or organizations involved (required)',
      )
      .nth(1)
      .fill('Lorem ipsum dolor');

    // Wait and interact with 'Business contact title of person responsible for maintaining the PIB'
    await page
      .getByLabel(
        'Business contact title of person responsible for maintaining the PIB (required)',
      )
      .waitFor({ state: 'visible' });
    await page
      .getByLabel(
        'Business contact title of person responsible for maintaining the PIB (required)',
      )
      .click();
    await page
      .getByLabel(
        'Business contact title of person responsible for maintaining the PIB (required)',
      )
      .fill('Lorem ipsum dolor');

    // Wait and interact with 'Business contact phone number of person responsible for maintaining the PIB'
    await page
      .getByLabel(
        'Business contact phone number of person responsible for maintaining the PIB (required)',
      )
      .waitFor({ state: 'visible' });
    await page
      .getByLabel(
        'Business contact phone number of person responsible for maintaining the PIB (required)',
      )
      .click();
    await page
      .getByLabel(
        'Business contact phone number of person responsible for maintaining the PIB (required)',
      )
      .fill('Lorem ipsum dolor');
  }

  async function fillAgreementsInformationBanksSubmitDetails() {
    await page.getByLabel('Next Button').waitFor({ state: 'visible' });
    await page.getByLabel('Next Button').click();
  }

  // Additional Risks Form Tab
  async function fillAdditionalRisksDetails1() {
    await page.getByLabel('Possible risk').waitFor({ state: 'visible' });
    await page.getByLabel('Possible risk').click();
    await page
      .getByLabel('Possible risk')
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    await page.getByLabel('Response').waitFor({ state: 'visible' });
    await page.getByLabel('Response').click();
    await page
      .getByLabel('Response')
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    await page.getByLabel('Add more risks').waitFor({ state: 'visible' });
    await page.getByLabel('Add more risks').click();
  }

  async function fillAdditionalRisksDetails2() {
    const risk2Locator = page
      .locator('div')
      .filter({ hasText: /^Risk 2Possible riskResponseDelete$/ });

    await risk2Locator
      .getByLabel('Possible risk')
      .waitFor({ state: 'visible' });
    await risk2Locator.getByLabel('Possible risk').click();
    await risk2Locator
      .getByLabel('Possible risk')
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    await risk2Locator.getByLabel('Response').waitFor({ state: 'visible' });
    await risk2Locator.getByLabel('Response').click();
    await risk2Locator
      .getByLabel('Response')
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    await page.getByLabel('Add more risks').waitFor({ state: 'visible' });
    await page.getByLabel('Add more risks').click();
  }

  async function fillAdditionalRisksDetails3() {
    const risk3Locator = page
      .locator('div')
      .filter({ hasText: /^Risk 3Possible riskResponseDelete$/ });

    await risk3Locator
      .getByLabel('Possible risk')
      .waitFor({ state: 'visible' });
    await risk3Locator.getByLabel('Possible risk').click();
    await risk3Locator
      .getByLabel('Possible risk')
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    await risk3Locator.getByLabel('Response').waitFor({ state: 'visible' });
    await risk3Locator.getByLabel('Response').click();
    await risk3Locator
      .getByLabel('Response')
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    await page.getByLabel('Add more risks').waitFor({ state: 'visible' });
    await page.getByLabel('Add more risks').click();
  }

  async function fillAdditionalRisksDetails4() {
    const risk4Locator = page
      .locator('div')
      .filter({ hasText: /^Risk 4Possible riskResponseDelete$/ });

    await risk4Locator
      .getByLabel('Possible risk')
      .waitFor({ state: 'visible' });
    await risk4Locator.getByLabel('Possible risk').click();
    await risk4Locator
      .getByLabel('Possible risk')
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );

    await risk4Locator.getByLabel('Response').waitFor({ state: 'visible' });
    await risk4Locator.getByLabel('Response').click();
    await risk4Locator
      .getByLabel('Response')
      .fill(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
      );
  }

  async function verifyAutosave() {
    const locator = page
      .locator('div')
      .filter({ hasText: /^Saved at/ })
      .nth(1);
    await locator.waitFor({ state: 'visible' });
    await expect(locator).toHaveText(/^Saved at/);
  }

  async function fillAdditionalRisksSubmitDetails() {
    await page.getByLabel('Submit Button').waitFor({ state: 'visible' });
    await page.getByLabel('Submit Button').click();

    await page.getByLabel('Yes, submit').waitFor({ state: 'visible' });
    await page.getByLabel('Yes, submit').click();

    await expect(page).toHaveURL(/\/intake\/view$/);
  }

  await fillPIAIntakeInitiativeDetails();
  await fillPIAIntakeInitiativeDescriptionDetails();
  await fillPIAIntakeInitiativeScopeDetails();
  await fillPIAIntakeDataElementsInvolvedDetails();
  await PIAIntakeSubmitDetails();
  await fillCollectionUseDisclosureStepDetails();
  await fillCollectionUseDisclosureNoticeDetails();
  await CollectionUseDisclosureSubmitDetails();
  await fillStoringPersonalInformationDetails();
  await fillStoringPersonalInformationSensitiveDetails1();
  await fillStoringPersonalInformationSensitiveDetails2();
  await fillStoringPersonalInformationSensitiveDetails3();
  await fillStoringPersonalInformationContractualDetails();
  await fillStoringPersonalInformationAccessDetails();
  await fillStoringPersonalInformationAccessComments();
  await fillStoringPersonalInformationUnauthorizedAccessDetails();
  await fillStoringPersonalInformationTrackAccess();
  await fillStoringPersonalInformationPrivacyRisksStep1();
  await fillStoringPersonalInformationPrivacyRisksStep2();
  await fillStoringPersonalInformationPrivacyRisksStep3();
  await StoringPersonalInformationSubmit();
  await fillSecurityOfPersonalInformationAccessDetails();
  await fillSecurityOfPersonalInformationAccessComments();
  await SecurityOfPersonalInformationSubmitDetails();
  await fillAccuracyCorrectionRetentionAccuracyDetails();
  await fillAccuracyCorrectionRetentionCorrectionDetails();
  await fillAccuracyCorrectionRetentionPersonalInformationDetails();
  await fillAccuracyCorrectionRetentionSubmitDetails();
  await fillAgreementsInformationBanksAgreementsDetails();
  await fillAgreementsInformationBanksMainMinistryDetails();
  await fillAgreementsInformationBanksPersonalInformationDetails();
  await fillAgreementsInformationBanksPersonalMainMinistryDetails();
  await fillAgreementsInformationBanksSubmitDetails();
  await fillAdditionalRisksDetails1();
  await fillAdditionalRisksDetails2();
  await fillAdditionalRisksDetails3();
  await fillAdditionalRisksDetails4();
  await verifyAutosave();
  await fillAdditionalRisksSubmitDetails();
}
