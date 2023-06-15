const { Given, When, Then } = require('@wdio/cucumber-framework');

const homePage = require('../pageobjects/home.page');




Then(/^Check "([^"]*)" tab is displayed$/, async(Links) => {
	await homePage.checkTab(Links)
});

When(/^I click on "([^"]*)" tab$/, async(Links) => {
	await homePage.clickTab(Links)
});

Then(/^Verify List of PIA pagination$/, async() => {
	await homePage.verifyPagination()
});
