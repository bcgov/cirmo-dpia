import { Page, expect } from '@playwright/test';

/* 
Test code for Drafter PIA form filling. This function fills out the full PIA Form. It then submits the form and checks if the page redirects to '/intake/view'.
*/
export async function drafterPiaFill(page: Page, uuid?: string) {
  //PIA Intake Form Tab
  await page.getByLabel('Initiative title (required)').click();
  await page.getByLabel('Initiative title (required)').fill(`TEST_${uuid}`);
  await page.getByLabel('Ministry').selectOption('CITIZENS_SERVICES');
  await page.getByLabel('Branch (required)').click();
  await page.getByLabel('Branch (required)').fill('IMB');
  await page.getByLabel('Initiative lead name').click();
  await page.getByLabel('Initiative lead name').fill('Test Tester');
  await page.getByLabel('Initiative lead email').click();
  await page.getByLabel('Initiative lead email').fill('tester@email.com');
  await page.getByLabel('Initiative lead title').click();
  await page.getByLabel('Initiative lead title').fill('Tester');
  await page
    .getByLabel('Initiative Description Textarea Input')
    .getByRole('textbox')
    .click();
  await page
    .getByLabel('Initiative Description Textarea Input')
    .getByRole('textbox')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
    );
  await page
    .getByLabel('Initiative Scope Textarea Input')
    .getByRole('textbox')
    .click();
  await page
    .getByLabel('Initiative Scope Textarea Input')
    .getByRole('textbox')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
    );
  await page
    .getByLabel('Data Elements Involved Textarea Input')
    .getByRole('textbox')
    .click();
  await page
    .getByLabel('Data Elements Involved Textarea Input')
    .getByRole('textbox')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
    );
  await page.getByLabel('Submit Button').click();
  await page.getByLabel('Yes, submit').click();

  // Next Steps Tab
  await page.getByLabel('Next Button').click();

  // Collection, use and disclosure Tab
  await page.getByLabel('Describe the step').click();
  await page
    .getByLabel('Describe the step')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
    );
  await page.getByLabel('Add more steps').click();
  await page.getByLabel('Describe the step').nth(1).click();
  await page
    .getByLabel('Describe the step')
    .nth(1)
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
    );
  await page.getByLabel('Add more steps').click();
  await page.getByLabel('Describe the step').nth(2).click();
  await page
    .getByLabel('Describe the step')
    .nth(2)
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
    );
  await page
    .getByLabel('Collection Notice Drafter Textarea Input')
    .getByRole('textbox')
    .click();
  await page
    .getByLabel('Collection Notice Drafter Textarea Input')
    .getByRole('textbox')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
    );
  await page.getByLabel('Next Button').click();

  // Storing Personal Information Form Tab
  await page.getByRole('textbox').click();
  await page
    .getByRole('textbox')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
    );
  await page.getByText('No', { exact: true }).nth(2).click();
  await page.getByLabel('Name of service provider').click();
  await page.getByLabel('Name of service provider').fill('Telus');
  await page
    .getByLabel(
      'Name of cloud infrastructure and/or platform provider(s) (if applicable)',
    )
    .click();
  await page
    .getByLabel(
      'Name of cloud infrastructure and/or platform provider(s) (if applicable)',
    )
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
    );
  await page
    .getByLabel(
      'Name of cloud infrastructure and/or platform provider(s) (if applicable)',
    )
    .click();
  await page
    .getByLabel(
      'Name of cloud infrastructure and/or platform provider(s) (if applicable)',
    )
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
    );
  await page
    .getByLabel(
      'Where and how is the sensitive personal information stored (including backups)?',
    )
    .click();
  await page
    .getByLabel(
      'Where and how is the sensitive personal information stored (including backups)?',
    )
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
    );
  await page
    .locator('form div')
    .filter({
      hasText:
        'Is the sensitive personal information stored by a service provider?YesNoName of ',
    })
    .getByLabel('Add more rows')
    .click();
  await page.getByLabel('Name of service provider').nth(1).click();
  await page.getByLabel('Name of service provider').nth(1).fill('Telus');
  await page
    .getByLabel(
      'Name of cloud infrastructure and/or platform provider(s) (if applicable)',
    )
    .nth(1)
    .click();
  await page
    .getByLabel(
      'Name of cloud infrastructure and/or platform provider(s) (if applicable)',
    )
    .nth(1)
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
    );
  await page
    .getByLabel(
      'Where and how is the sensitive personal information stored (including backups)?',
    )
    .nth(1)
    .click();
  await page
    .getByLabel(
      'Where and how is the sensitive personal information stored (including backups)?',
    )
    .nth(1)
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
    );
  await page
    .locator('form div')
    .filter({
      hasText:
        'Is the sensitive personal information stored by a service provider?YesNoName of ',
    })
    .getByLabel('Add more rows')
    .click();
  await page.getByLabel('Name of service provider').nth(2).click();
  await page.getByLabel('Name of service provider').nth(2).fill('Telus');
  await page
    .getByLabel(
      'Name of cloud infrastructure and/or platform provider(s) (if applicable)',
    )
    .nth(2)
    .click();
  await page
    .getByLabel(
      'Name of cloud infrastructure and/or platform provider(s) (if applicable)',
    )
    .nth(2)
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
    );
  await page
    .getByLabel(
      'Where and how is the sensitive personal information stored (including backups)?',
    )
    .nth(2)
    .click();
  await page
    .getByLabel(
      'Where and how is the sensitive personal information stored (including backups)?',
    )
    .nth(2)
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
    );
  await page
    .getByLabel('Contractual Terms Textarea Input')
    .getByRole('textbox')
    .click();
  await page
    .getByLabel('Contractual Terms Textarea Input')
    .getByRole('textbox')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
    );
  await page
    .getByLabel('Enterprise Service Access Details Textarea Input')
    .getByRole('textbox')
    .click();
  await page
    .getByLabel('Enterprise Service Access Details Textarea Input')
    .getByRole('textbox')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
    );

  await page
    .locator('form div')
    .filter({
      hasText:
        'Are you relying on an existing contract, such as an enterprise offering from the',
    })
    .getByLabel('View comments')
    .click();
  await page.getByPlaceholder('Write a comment...').click();
  await page
    .getByPlaceholder('Write a comment...')
    .fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  await page.getByLabel('Add New Comment Button').click();
  await page.getByPlaceholder('Write a comment...').click();
  await page
    .getByPlaceholder('Write a comment...')
    .fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  await page.getByLabel('Add New Comment Button').click();
  await page.getByPlaceholder('Write a comment...').click();
  await page
    .getByPlaceholder('Write a comment...')
    .fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  await page.getByLabel('Add New Comment Button').click();
  await page.getByPlaceholder('Write a comment...').click();
  await page
    .getByPlaceholder('Write a comment...')
    .fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  await page.getByLabel('Add New Comment Button').click();
  await page.getByLabel('Comment Options Button').first().click();
  await page
    .getByRole('list', { name: 'Comment Options Menu' })
    .locator('button')
    .click();
  await page.getByLabel('Delete', { exact: true }).click();
  await page
    .getByLabel('Unauthorized Access Measures Textarea Input')
    .getByRole('textbox')
    .click();
  await page
    .getByLabel('Unauthorized Access Measures Textarea Input')
    .getByRole('textbox')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
    );
  await page
    .getByLabel('Track Access Details Textarea Input')
    .getByRole('textbox')
    .click();
  await page
    .getByLabel('Track Access Details Textarea Input')
    .getByRole('textbox')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
    );
  await page.getByLabel('Impact to individuals').click();
  await page.getByLabel('Privacy risk', { exact: true }).click();
  await page
    .getByLabel('Privacy risk', { exact: true })
    .fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  await page.getByLabel('Impact to individuals').click();
  await page
    .getByLabel('Impact to individuals')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
    );
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
    .click();
  await page
    .getByLabel('Is there any outstanding risk? If yes, please describe.')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
    );
  await page
    .locator('form div')
    .filter({
      hasText:
        'Describe the privacy risks for disclosure outside of Canada.Use the table below ',
    })
    .getByLabel('Add more rows')
    .click();
  await page.getByLabel('Privacy risk').nth(2).click();
  await page
    .getByLabel('Privacy risk')
    .nth(2)
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
    );
  await page.getByLabel('Impact to individuals').nth(1).click();
  await page
    .getByLabel('Impact to individuals')
    .nth(1)
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
    );
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
  await page.getByLabel('Level of privacy risk').nth(1).click();
  await page
    .getByLabel('Level of privacy risk')
    .nth(1)
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
    );
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
  await page
    .locator('form div')
    .filter({
      hasText:
        'Describe the privacy risks for disclosure outside of Canada.Use the table below ',
    })
    .getByLabel('Add more rows')
    .click();
  await page.getByLabel('Privacy risk', { exact: true }).nth(2).click();
  await page
    .getByLabel('Privacy risk', { exact: true })
    .nth(2)
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
    );
  await page.getByLabel('Impact to individuals').nth(2).click();
  await page
    .getByLabel('Impact to individuals')
    .nth(2)
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
    );
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
  await page.getByLabel('Level of privacy risk').nth(2).click();
  await page
    .getByLabel('Level of privacy risk')
    .nth(2)
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
    );
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
  await page.getByLabel('Delete row button').nth(2).click();
  await page.getByLabel('Next Button').click();

  // Security of Personal Information Form Tab
  await page
    .getByLabel(
      'We allow employees in only certain roles access to information',
    )
    .check();
  await page
    .getByLabel('We use audit logs to see who accesses a file and when')
    .check();
  await page.getByRole('textbox').click();
  await page
    .getByRole('textbox')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
    );
  await page.getByLabel('View comments').nth(1).click();
  await page.getByPlaceholder('Write a comment...').click();
  await page
    .getByPlaceholder('Write a comment...')
    .fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  await page.getByLabel('Add New Comment Button').click();
  await page.getByPlaceholder('Write a comment...').click();
  await page
    .getByPlaceholder('Write a comment...')
    .fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  await page.getByLabel('Add New Comment Button').click();
  await page.getByPlaceholder('Write a comment...').click();
  await page
    .getByPlaceholder('Write a comment...')
    .fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  await page.getByLabel('Add New Comment Button').click();
  await page.getByLabel('Comment Options Button').first().click();
  await page
    .getByRole('list', { name: 'Comment Options Menu' })
    .locator('button')
    .click();
  await page.getByLabel('Delete', { exact: true }).click();
  await page.locator('.collapsible__header').first().click();
  await page.getByLabel('Next Button').click();

  // Accuracy, Correction and Retention Form Tab
  await page.getByRole('textbox').click();
  await page
    .getByRole('textbox')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
    );
  await page
    .getByLabel(
      'Do you have a process in place to correct personal information? radio button NO',
    )
    .check();
  await page
    .getByLabel(
      "If you can't correct personal data, FOIPPA mandates noting the correction request on the record; will you ensure this documentation? radio button NO",
    )
    .check();
  await page
    .getByLabel(
      "If someone requests a correction and you've shared their data in the past year, FOIPPA mandates notifying the third party; will you ensure compliance? radio button NO",
    )
    .check();
  await page
    .getByLabel(
      'Do you have an approved information schedule in place related to personal information used to make decisions? radio button NO',
    )
    .check();
  await page
    .getByLabel('Describe Retention Textarea Input')
    .getByRole('textbox')
    .click();
  await page
    .getByLabel('Describe Retention Textarea Input')
    .getByRole('textbox')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
    );
  await page.getByLabel('Next Button').click();

  // Agreements and information banks Form Tab
  await page
    .getByLabel('Information Sharing Agreement Textarea Input')
    .getByRole('textbox')
    .click();
  await page
    .getByLabel('Information Sharing Agreement Textarea Input')
    .getByRole('textbox')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
    );
  await page
    .getByLabel('Main ministry or agency involved (required)')
    .first()
    .click();
  await page
    .getByLabel('Main ministry or agency involved (required)')
    .first()
    .fill('Lorem ipsum dolor');
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
  await page.getByLabel('ISA start date').click();
  await page.getByLabel('Choose Friday, December 1st, 2023').click();
  await page.getByLabel('ISA end date').click();
  await page.getByLabel('Choose Friday, December 1st, 2023').click();
  await page
    .getByLabel('Personal Information Bank Textarea Input')
    .getByRole('textbox')
    .click();
  await page
    .getByLabel('Personal Information Bank Textarea Input')
    .getByRole('textbox')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi. Etiam a condimentum eros. Quisque dolor diam, hendrerit eget mauris a, fringilla ultrices nulla. Proin at elit et justo pharetra malesuada quis et justo. Sed laoreet nec est sed tincidunt. Donec laoreet odio vitae lorem gravida, vel porta dui eleifend. Integer odio odio, eleifend id tincidunt in, facilisis non velit. Phasellus diam tortor, condimentum sit amet mauris sed, ultricies iaculis magna. Pellentesque at congue nunc, et tincidunt orci. Nulla eget placerat nunc, non dictum nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus nec vehicula nunc. Aliquam erat volutpat. Quisque vehicula purus a libero commodo, vel fringilla nisl iaculis. Pellentesque tellus ligula, rutrum in magna a, mollis ullamcorper tellus.',
    );
  await page
    .getByLabel('Main ministry or agency involved (required)')
    .nth(1)
    .click();
  await page
    .getByLabel('Main ministry or agency involved (required)')
    .nth(1)
    .fill('Lorem ipsum dolor');
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
  await page.getByLabel('Next Button').click();

  // Additional Risks Form Tab
  await page.getByLabel('Possible risk').click();
  await page
    .getByLabel('Possible risk')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
    );
  await page.getByLabel('Response').click();
  await page
    .getByLabel('Response')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
    );
  await page.getByLabel('Add more risks').click();
  await page
    .locator('div')
    .filter({ hasText: /^Risk 2Possible riskResponseDelete$/ })
    .getByLabel('Possible risk')
    .click();
  await page
    .locator('div')
    .filter({ hasText: /^Risk 2Possible riskResponseDelete$/ })
    .getByLabel('Possible risk')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
    );
  await page
    .locator('div')
    .filter({ hasText: /^Risk 2Possible riskResponseDelete$/ })
    .getByLabel('Response')
    .click();
  await page
    .locator('div')
    .filter({ hasText: /^Risk 2Possible riskResponseDelete$/ })
    .getByLabel('Response')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
    );
  await page.getByLabel('Add more risks').click();
  await page
    .locator('div')
    .filter({ hasText: /^Risk 3Possible riskResponseDelete$/ })
    .getByLabel('Possible risk')
    .click();
  await page
    .locator('div')
    .filter({ hasText: /^Risk 3Possible riskResponseDelete$/ })
    .getByLabel('Possible risk')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
    );
  await page
    .locator('div')
    .filter({ hasText: /^Risk 3Possible riskResponseDelete$/ })
    .getByLabel('Response')
    .click();
  await page
    .locator('div')
    .filter({ hasText: /^Risk 3Possible riskResponseDelete$/ })
    .getByLabel('Response')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
    );
  await page.getByLabel('Add more risks').click();
  await page
    .locator('div')
    .filter({ hasText: /^Risk 4Possible riskResponseDelete$/ })
    .getByLabel('Possible risk')
    .click();
  await page
    .locator('div')
    .filter({ hasText: /^Risk 4Possible riskResponseDelete$/ })
    .getByLabel('Possible risk')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
    );
  await page
    .locator('div')
    .filter({ hasText: /^Risk 4Possible riskResponseDelete$/ })
    .getByLabel('Response')
    .click();
  await page
    .locator('div')
    .filter({ hasText: /^Risk 4Possible riskResponseDelete$/ })
    .getByLabel('Response')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec magna sem, pharetra ac dolor et, elementum pellentesque nisi.',
    );

  const locator = page
    .locator('div')
    .filter({ hasText: /^Saved at/ })
    .nth(1);
  await locator.waitFor({ state: 'visible', timeout: 80000 });
  await expect(locator).toHaveText(/^Saved at/);

  await page.getByLabel('Submit Button').click();
  await page.getByLabel('Yes, submit').click();
  await expect(page).toHaveURL(/\/intake\/view$/);
}
