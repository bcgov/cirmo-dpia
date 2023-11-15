import { Page, expect } from '@playwright/test';

/* 
Test code for CPO PIA form filling. This function fills out the full PIA Form as a CPO. It then submits the form and continues until full PIA completion.
*/
export async function cpoPiaFill(page: Page, uuid: string) {
  // Collection, use and disclosure Form Tab
  await page.getByLabel('Collection, use and disclosure').click();
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

  // Storing Personal Information Form Tab
  await page
    .locator('form div')
    .filter({
      hasText:
        'Is any personal information stored outside of Canada?YesWhere are you storing th',
    })
    .getByLabel('View comments')
    .click();
  await page.getByPlaceholder('Write a comment...').click();
  await page
    .getByPlaceholder('Write a comment...')
    .fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  await page.getByLabel('Add New Comment Button').click();
  await page.getByLabel('Comment Options Button').click();
  await page.getByLabel('Comment Options Menu').getByText('Delete').click();
  await page.getByLabel('Delete', { exact: true }).click();
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
  await page
    .locator('form div')
    .filter({
      hasText:
        'Provide details about how you will track access to sensitive personal informatio',
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
  await page.getByLabel('Comment Options Button').first().click();
  await page
    .getByRole('list', { name: 'Comment Options Menu' })
    .locator('button')
    .click();
  await page.getByLabel('Delete', { exact: true }).click();
  await page.getByLabel('Next Button').click();

  // Security of Personal Information Form Tab
  await page.getByLabel('View comments').first().click();
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
  await page.getByLabel('Next Button').click();

  // Accuracy, Correction and Retention Form Tab
  await page
    .locator('form div')
    .filter({
      hasText:
        'Does your initiative use personal information to make decisions that directly af',
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
  await page.getByLabel('Next Button').click();

  // Agreements and Information Banks Form Tab
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
  await page.getByLabel('Next Button').click();

  // Review Form Tab
  await page.getByRole('button', { name: 'Add a role' }).click();
  await page
    .getByLabel('Select a role from the list')
    .selectOption('EX_DIRECTOR');
  await page.getByRole('button', { name: 'Add' }).first().click();
  await page.getByLabel('Enter a role not in list').click();
  await page.getByLabel('Enter a role not in list').fill('Tester 2');
  await page
    .locator('div')
    .filter({ hasText: /^Enter a role not in listAdd$/ })
    .getByRole('button')
    .click();
  await page
    .getByLabel(
      'I have reviewed this PIA based on the material provided to CPO as of the current date.',
    )
    .check();
  await page.locator('textarea').click();
  await page
    .locator('textarea')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae. Suspendisse ullamcorper, diam quis rhoncus semper, urna erat egestas nunc, eget tristique ipsum tortor vitae quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut est ante, congue vel fringilla at, sollicitudin vitae arcu. Mauris velit neque, tempor et arcu non, fermentum mollis massa. Nulla dignissim venenatis risus ac gravida. Fusce bibendum dolor diam, nec semper dolor malesuada ut. Duis in diam dapibus, suscipit massa at, aliquam sapien.',
    );
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.locator('.collapsible__header').first().click();
  await page.getByLabel('PIA Intake').click();
  await page.getByLabel('Submit Button').click();
  await page.getByLabel('Yes, finish').click();

  // Final Review Form Tab
  // Check for autosave
  const locator = page
    .locator('div')
    .filter({ hasText: /^Saved at/ })
    .nth(1);
  await locator.waitFor({ state: 'visible', timeout: 30000 });
  await expect(locator).toHaveText(/^Saved at/);

  await page.getByLabel('Next Button').click();
  await page.getByLabel('Review', { exact: true }).click();
  await page
    .getByLabel(
      'I acknowledge that this PIA accurately documents the data elements and information flow at the time of this review. If there are any changes to the overall initiative, including to the way personal information is collected, used, stored or disclosed, the program area will engage with their Privacy Office and if necessary, complete a PIA update.',
    )
    .first()
    .check();
  await page.getByRole('textbox').first().click();
  await page
    .getByRole('textbox')
    .first()
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae. Suspendisse ullamcorper, diam quis rhoncus semper, urna erat egestas nunc, eget tristique ipsum tortor vitae quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut est ante, congue vel fringilla at, sollicitudin vitae arcu. Mauris velit neque, tempor et arcu non, fermentum mollis massa. Nulla dignissim venenatis risus ac gravida. Fusce bibendum dolor diam, nec semper dolor malesuada ut. Duis in diam dapibus, suscipit massa at, aliquam sapien.',
    );
  await page.getByRole('button', { name: 'Confirm' }).first().click();
  await page
    .getByLabel(
      'I acknowledge that this PIA accurately documents the data elements and information flow at the time of this review. If there are any changes to the overall initiative, including to the way personal information is collected, used, stored or disclosed, the program area will engage with their Privacy Office and if necessary, complete a PIA update.',
    )
    .nth(1)
    .check();
  await page.getByRole('textbox').first().click();
  await page
    .getByRole('textbox')
    .first()
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae. Suspendisse ullamcorper, diam quis rhoncus semper, urna erat egestas nunc, eget tristique ipsum tortor vitae quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut est ante, congue vel fringilla at, sollicitudin vitae arcu. Mauris velit neque, tempor et arcu non, fermentum mollis massa. Nulla dignissim venenatis risus ac gravida. Fusce bibendum dolor diam, nec semper dolor malesuada ut. Duis in diam dapibus, suscipit massa at, aliquam sapien.',
    );
  await page.getByRole('button', { name: 'Confirm' }).first().click();
  await page
    .getByLabel(
      'I acknowledge that this PIA accurately documents the data elements and information flow at the time of this review. If there are any changes to the overall initiative, including to the way personal information is collected, used, stored or disclosed, the program area will engage with their Privacy Office and if necessary, complete a PIA update.',
    )
    .nth(2)
    .check();
  await page.getByRole('textbox').first().click();
  await page
    .getByRole('textbox')
    .first()
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae. Suspendisse ullamcorper, diam quis rhoncus semper, urna erat egestas nunc, eget tristique ipsum tortor vitae quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut est ante, congue vel fringilla at, sollicitudin vitae arcu. Mauris velit neque, tempor et arcu non, fermentum mollis massa. Nulla dignissim venenatis risus ac gravida. Fusce bibendum dolor diam, nec semper dolor malesuada ut. Duis in diam dapibus, suscipit massa at, aliquam sapien.',
    );
  await page.getByRole('button', { name: 'Confirm' }).first().click();
  await page
    .getByLabel(
      'I acknowledge that this PIA accurately documents the data elements and information flow at the time of this review. If there are any changes to the overall initiative, including to the way personal information is collected, used, stored or disclosed, the program area will engage with their Privacy Office and if necessary, complete a PIA update.',
    )
    .nth(3)
    .check();
  await page.getByRole('textbox').first().click();
  await page
    .getByRole('textbox')
    .first()
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae. Suspendisse ullamcorper, diam quis rhoncus semper, urna erat egestas nunc, eget tristique ipsum tortor vitae quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut est ante, congue vel fringilla at, sollicitudin vitae arcu. Mauris velit neque, tempor et arcu non, fermentum mollis massa. Nulla dignissim venenatis risus ac gravida. Fusce bibendum dolor diam, nec semper dolor malesuada ut. Duis in diam dapibus, suscipit massa at, aliquam sapien.',
    );
  await page.getByRole('button', { name: 'Confirm' }).first().click();
  await page
    .getByLabel(
      'I acknowledge that this PIA accurately documents the data elements and information flow at the time of this review. If there are any changes to the overall initiative, including to the way personal information is collected, used, stored or disclosed, the program area will engage with their Privacy Office and if necessary, complete a PIA update.',
    )
    .nth(4)
    .check();
  await page.getByRole('textbox').click();
  await page
    .getByRole('textbox')
    .fill(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper est ligula, sed viverra lacus sagittis vitae. Suspendisse ullamcorper, diam quis rhoncus semper, urna erat egestas nunc, eget tristique ipsum tortor vitae quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut est ante, congue vel fringilla at, sollicitudin vitae arcu. Mauris velit neque, tempor et arcu non, fermentum mollis massa. Nulla dignissim venenatis risus ac gravida. Fusce bibendum dolor diam, nec semper dolor malesuada ut. Duis in diam dapibus, suscipit massa at, aliquam sapien.',
    );
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByLabel('PIA Intake').click();
  await page.getByLabel('Submit Button').click();
  await page.getByLabel('Yes, submit').click();

  // Pending Completion Form Tab
  // Check for autosave
  await locator.waitFor({ state: 'visible', timeout: 30000 });
  await expect(locator).toHaveText(/^Saved at/);

  await page.getByLabel('Review', { exact: true }).click();
  await page.getByLabel('Submit Button').click();
  await page.getByLabel('Yes, complete').click();

  // Complete Form Tab
  // Check for autosave
  await locator.waitFor({ state: 'visible', timeout: 30000 });
  await expect(locator).toHaveText(/^Saved at/);

  await page.getByLabel('Next steps').click();
  await page.getByLabel('Collection, use and disclosure').click();
  await page.getByLabel('Storing personal information').click();
  await page.getByLabel('Security of personal information').click();
  await page.getByLabel('PIA Pathway Questionnaire').click();
  await page.getByLabel('Review', { exact: true }).click();

  // Completed PIAs Tab
  await page.getByLabel('Completed PIAs').click();

  // Verify correct URL
  await expect(page).toHaveURL('/pia/completed?filterByStatus=COMPLETE');

  // Click on the search input field again
  await page.getByPlaceholder('Search by title or drafter').click();

  // Fill the search input field with the unique identifier again
  await page
    .getByPlaceholder('Search by title or drafter')
    .fill(`TEST_${uuid}`);

  // Click the search submit button again
  await page.getByLabel('Search submit button').click();

  // Click on the cell corresponding to the searched PIA
  await page.getByRole('cell', { name: `TEST_${uuid}` }).click();

  // Check and expect the URL to be on the PIA intake view page
  await expect(page).toHaveURL(/\/intake\/view$/);

  // Check and expect the heading (title) to match the unique identifier
  await expect(page.getByRole('heading', { name: `TEST_${uuid}` })).toHaveText(
    `TEST_${uuid}`,
  );

  // check status
  await expect(page.getByText('Complete', { exact: true })).toHaveText(
    'Complete',
  );
}
