const { Given, When, Then } = require('@wdio/cucumber-framework');

const submitPIApage = require('../pageobjects/submitPIA.page');

When(/^Check for createPIA "([^"]*)" form$/, async (args1) => {
  await submitPIApage.intakeForm(args1);
});

When(/^I enter "([^"]*)"$/, async (title) => {
  await submitPIApage.enterValue(title);
});

When(/^I set scenario name$/, async () => {
  await submitPIApage.setScenario();
});

When(/^Await SavedAt function$/, async () => {
  await submitPIApage.savedAt();
});

Then(/^I see "([^"]*)"$/, async (paragraph) => {
  await submitPIApage.CheckPara(paragraph);
});

When(/^I click with name "([^"]*)" checkbox$/, async (checkboxName) => {
  await submitPIApage.clickCheckboxByName(checkboxName);
});

Then(/^Search with title$/, async () => {
  await submitPIApage.searchTitle();
});
