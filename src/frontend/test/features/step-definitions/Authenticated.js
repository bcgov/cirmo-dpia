const { Given, When, Then } = require('@wdio/cucumber-framework');

const authPage = require('../pageobjects/authenticated.page');

When(/^I paste landing page URL in same browser$/, async() => {
	await authPage.openSameBrowser()
});

When(/^I am able to click link "([^"]*)"$/, async(link) => {
	await authPage.clickhyperLink(link)
});

When(/^I paste retrieved URL in new browser$/, async() => {
	await authPage.openCurrentURL()
});

When(/^I paste landing page URL in new browser$/, async() => {
	await authPage.openNewBrowser()
});

Then(/^I get "([^"]*)" error$/, async(error) => {
	await authPage.authError(error)
});
