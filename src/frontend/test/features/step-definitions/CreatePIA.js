const { Given, When, Then } = require('@wdio/cucumber-framework');

const createPIApage = require('../pageobjects/createPIA.page');


Then(/^I am able to verify intakeURL$/, async() => {
	await createPIApage.intakeForm()
});


Then(/^I am able to verify PPQURL$/, async() => {
	await createPIApage.PPQForm()
});
