const { Given, When, Then } = require('@wdio/cucumber-framework');

const landingPage = require('../pageobjects/landing.page');


Then(/^I am able to verify Landing page header$/, async() => {
	await landingPage.header()
});

Then(/^I am able to verify Login buttons$/, async() => {
	await landingPage.landing()
});

Then(/^I am able to verify Landing page generic header$/, async() => {
	await landingPage.header()
});


Then(/^I am able to validate (.+)$/, async(questions) => {
	await landingPage.details(questions)
});

Then(/^I am able to verify the URL "([^"]*)"$/, async(url) => {
	await landingPage.checkURL(url)
});

Then(/^I am able to verify the div "([^"]*)"$/, async(div) => {
	await landingPage.validateDiv(div)
});
