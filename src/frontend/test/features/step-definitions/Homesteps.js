const { Given, When, Then } = require('@wdio/cucumber-framework');

const homePage = require('../pageobjects/home.page');




Then(/^Check "([^"]*)" tab is displayed$/, async(Links) => {
	await homePage.checkTab(Links)
});

       

