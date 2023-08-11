const { Given, When, Then } = require('@wdio/cucumber-framework');

const ppqPage = require('../pageobjects/fillPPQ.page');


Then(/^I check "([^"]*)" checkbox$/, async(checkName) => {
	await ppqPage.selectCheckbox(checkName);
});

Then(/^I select random checkbox$/, async() => {
	await ppqPage.clickCheckbox();
});

Then(/^I select a random date$/, async() => {
	await ppqPage.selectData();
});

Then(/^I add data to text Area$/, async() => {
	await ppqPage.AddText();
});
