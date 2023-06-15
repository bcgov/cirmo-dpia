const { Given, When, Then } = require('@wdio/cucumber-framework');

const searchSortFilterPage = require('../pageobjects/searchsortfilter.page');



Then(/^I am able to sort "([^"]*)"$/, async(sort) => {
	await searchSortFilterPage.sortdata(sort)
});
