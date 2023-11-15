import { Page, expect } from '@playwright/test';

/* 
Test code for MPO PIA form filling. This function fills out the full PIA Form as an MPO. It then submits the form and checks if the page redirects to '/intake/view'.
*/
export async function mpoPiaFill(page: Page) {
  //Collection, use and disclosure Form Tab
  await page.getByLabel('Collection, use and disclosure').click();
  await page
    .getByLabel('Collection, use, disclosure (for MPO use only)')
    .first()
    .click();
  await page
    .getByLabel('Collection, use, disclosure (for MPO use only)')
    .first()
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae.',
    );
  await page.getByLabel('FOIPPA authority (for MPO use only)').first().click();
  await page
    .getByLabel('FOIPPA authority (for MPO use only)')
    .first()
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae.',
    );
  await page
    .getByLabel('Other legal authority (for MPO use only)')
    .first()
    .click();
  await page
    .getByLabel('Other legal authority (for MPO use only)')
    .first()
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae.',
    );
  await page
    .getByLabel('Collection, use, disclosure (for MPO use only)')
    .nth(1)
    .click();
  await page
    .getByLabel('Collection, use, disclosure (for MPO use only)')
    .nth(1)
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae.',
    );
  await page.getByLabel('FOIPPA authority (for MPO use only)').nth(1).click();
  await page
    .getByLabel('FOIPPA authority (for MPO use only)')
    .nth(1)
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae.',
    );
  await page
    .getByLabel('Other legal authority (for MPO use only)')
    .nth(1)
    .click();
  await page
    .getByLabel('Other legal authority (for MPO use only)')
    .nth(1)
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae.',
    );
  await page
    .getByLabel('Collection, use, disclosure (for MPO use only)')
    .nth(2)
    .click();
  await page
    .getByLabel('Collection, use, disclosure (for MPO use only)')
    .nth(2)
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae.',
    );
  await page.getByLabel('FOIPPA authority (for MPO use only)').nth(2).click();
  await page
    .getByLabel('FOIPPA authority (for MPO use only)')
    .nth(2)
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae.',
    );
  await page
    .getByLabel('Other legal authority (for MPO use only)')
    .nth(2)
    .click();
  await page
    .getByLabel('Other legal authority (for MPO use only)')
    .nth(2)
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae.',
    );
  await page
    .getByLabel('Collection Notice MPO Textarea Input')
    .getByRole('textbox')
    .click();
  await page
    .getByLabel('Collection Notice MPO Textarea Input')
    .getByRole('textbox')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae.',
    );

  // Storing Personal Information Form Tab
  await page.getByLabel('Storing personal information').click();
  await page
    .locator('form div')
    .filter({
      hasText:
        'Does your initiative involve sensitive personal information?YesNoIs the sensitiv',
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
  await page.getByLabel('Comment Options Button').first().click();
  await page
    .getByRole('list', { name: 'Comment Options Menu' })
    .locator('button')
    .click();
  await page.getByLabel('Delete', { exact: true }).click();
  await page.getByLabel('Next Button').click();
  await page.getByLabel('Next Button').click();

  // Accuracy, Correction and Retention Form Tab
  await page
    .locator('form div')
    .filter({
      hasText:
        'How will you make sure that the personal information is accurate and complete?FO',
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

  // PIA Pathway Questionnaire (PPQ) Form Tab
  await page.getByLabel('PIA Pathway Questionnaire').click();
  await page.getByLabel('Common or integrated program agreement').check();
  await page
    .getByLabel(
      'Cloud technology (if no corporate PIA has been completed by the CPO)',
    )
    .check();
  await page.getByLabel('Data-linking').check();
  await page
    .getByLabel(
      'BC Services Card and/or other digital identity credential onboarding',
    )
    .check();
  await page
    .getByLabel('Other (Please provide additional details below)')
    .check();
  await page
    .getByLabel('Initiative Other Details Input')
    .getByRole('textbox')
    .click();
  await page
    .getByLabel('Initiative Other Details Input')
    .getByRole('textbox')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae. Suspendisse ullamcorper, diam quis rhoncus semper, urna erat egestas nunc, eget tristique ipsum tortor vitae quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut est ante, congue vel fringilla at, sollicitudin vitae arcu. Mauris velit neque, tempor et arcu non, fermentum mollis massa. Nulla dignissim venenatis risus ac gravida. Fusce bibendum dolor diam, nec semper dolor malesuada ut. Duis in diam dapibus, suscipit massa at, aliquam sapien.',
    );
  await page.getByPlaceholder('yyyy/mm/dd').click();
  await page.getByLabel('Choose Friday, December 1st, 2023').click();
  await page.locator('textarea').nth(1).click();
  await page
    .locator('textarea')
    .nth(1)
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae. Suspendisse ullamcorper, diam quis rhoncus semper, urna erat egestas nunc, eget tristique ipsum tortor vitae quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut est ante, congue vel fringilla at, sollicitudin vitae arcu. Mauris velit neque, tempor et arcu non, fermentum mollis massa. Nulla dignissim venenatis risus ac gravida. Fusce bibendum dolor diam, nec semper dolor malesuada ut. Duis in diam dapibus, suscipit massa at, aliquam sapien.',
    );
  await page
    .getByLabel('Initiative Summary Textarea Input')
    .getByRole('textbox')
    .click();
  await page
    .getByLabel('Initiative Summary Textarea Input')
    .getByRole('textbox')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae. Suspendisse ullamcorper, diam quis rhoncus semper, urna erat egestas nunc, eget tristique ipsum tortor vitae quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut est ante, congue vel fringilla at, sollicitudin vitae arcu. Mauris velit neque, tempor et arcu non, fermentum mollis massa. Nulla dignissim venenatis risus ac gravida.',
    );
  await page.locator('#relatedOperationalPia').click();
  await page.locator('#relatedOperationalPia').fill('Lorem ipsum (12345)');
  await page.getByLabel('Add Operational PIA').click();
  await page.locator('#relatedOperationalPia').click();
  await page.locator('#relatedOperationalPia').fill('Lorem ipsum (12345)');
  await page.getByLabel('Add Operational PIA').click();
  await page.locator('#relatedOperationalPia').click();
  await page.locator('#relatedOperationalPia').fill('Lorem ipsum (12345)');
  await page.getByLabel('Add Operational PIA').click();
  await page.locator('#relatedOperationalPia').click();
  await page.locator('#relatedOperationalPia').fill('Lorem ipsum (12345)');
  await page.getByLabel('Add Operational PIA').click();
  await page.locator('#relatedOperationalPia').click();
  await page.locator('#relatedOperationalPia').fill('Lorem ipsum (12345)');
  await page.getByLabel('Add Operational PIA').click();
  await page.getByLabel('Remove Operational PIA').first().click();
  await page.getByLabel('Remove Operational PIA').first().click();
  await page.locator('#relatedEnactmentPia').click();
  await page.locator('#relatedEnactmentPia').fill('Lorem ipsum (12345)');
  await page.locator('#relatedEnactmentPia').press('ArrowLeft');
  await page.locator('#relatedEnactmentPia').fill('Lorem ipsum (54321)');
  await page.getByLabel('Add Enactment PIA').click();
  await page.locator('#relatedEnactmentPia').click();
  await page.locator('#relatedEnactmentPia').fill('Lorem ipsum (54321)');
  await page.getByLabel('Add Enactment PIA').click();
  await page.locator('#relatedEnactmentPia').click();
  await page.locator('#relatedEnactmentPia').fill('Lorem ipsum (54321)');
  await page.getByLabel('Add Enactment PIA').click();
  await page.locator('#relatedEnactmentPia').click();
  await page.locator('#relatedEnactmentPia').fill('Lorem ipsum (54321)');
  await page.getByLabel('Add Enactment PIA').click();
  await page.locator('#relatedEnactmentPia').click();
  await page.locator('#relatedEnactmentPia').fill('Lorem ipsum (54321)');
  await page.getByLabel('Add Enactment PIA').click();
  await page.getByLabel('Remove Enactment PIA').first().click();
  await page.getByLabel('Remove Enactment PIA').first().click();
  await page
    .getByLabel('Other CPO Consideration Textarea Input')
    .getByRole('textbox')
    .click();
  await page
    .getByLabel('Other CPO Consideration Textarea Input')
    .getByRole('textbox')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae. Suspendisse ullamcorper, diam quis rhoncus semper, urna erat egestas nunc, eget tristique ipsum tortor vitae quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut est ante, congue vel fringilla at, sollicitudin vitae arcu. Mauris velit neque, tempor et arcu non, fermentum mollis massa. Nulla dignissim venenatis risus ac gravida. Fusce bibendum dolor diam, nec semper dolor malesuada ut. Duis in diam dapibus, suscipit massa at, aliquam sapien.',
    );
  await page.getByLabel('Submit Button').click();
  await page.getByLabel('Yes, submit').click();

  // Review Form Tab
  await page.getByLabel('Review', { exact: true }).click();
  await page.getByRole('button', { name: 'Add a role' }).click();
  await page.getByLabel('Select a role from the list').selectOption('DIRECTOR');
  await page.getByRole('button', { name: 'Add' }).first().click();
  await page.getByLabel('Enter a role not in list').click();
  await page.getByLabel('Enter a role not in list').fill('Tester');
  await page
    .locator('div')
    .filter({ hasText: /^Enter a role not in listAdd$/ })
    .getByRole('button')
    .click();
  await page.getByLabel('Enter a role not in list').click();
  await page.getByLabel('Enter a role not in list').fill('Tester 2');
  await page
    .locator('div')
    .filter({ hasText: /^Enter a role not in listAdd$/ })
    .getByRole('button')
    .click();
  await page
    .locator('div')
    .filter({ hasText: /^Tester 2$/ })
    .getByRole('button')
    .click();
  await page
    .getByLabel(
      'I acknowledge that I have participated in the drafting and/or review of this PIA on behalf of my ministry or sector. All privacy risks of which I am aware are documented with acceptable risk mitigations in place and I have no outstanding privacy concerns related to the initiative under review.',
    )
    .check();
  await page.locator('textarea').click();
  await page
    .locator('textarea')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae. Suspendisse ullamcorper, diam quis rhoncus semper, urna erat egestas nunc, eget tristique ipsum tortor vitae quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut est ante, congue vel fringilla at, sollicitudin vitae arcu. Mauris velit neque, tempor et arcu non, fermentum mollis massa. Nulla dignissim venenatis risus ac gravida. Fusce bibendum dolor diam, nec semper dolor malesuada ut. Duis in diam dapibus, suscipit massa at, aliquam sapien.',
    );
  await page.getByRole('button', { name: 'Confirm' }).click();

  // Check for autosave
  const locator = page
    .locator('div')
    .filter({ hasText: /^Saved at/ })
    .nth(1);
  await locator.waitFor({ state: 'visible', timeout: 30000 });
  await expect(locator).toHaveText(/^Saved at/);

  await page.getByLabel('PIA Intake').click();
  await page.getByLabel('Submit Button').click();
  await page.getByLabel('Yes, submit').click();

  // Verify the CPO Review Status
  await expect(page.getByText('CPO Review')).toHaveText('CPO Review');

  // Verify correct URL
  await expect(page).toHaveURL(/\/intake\/view$/);
}
