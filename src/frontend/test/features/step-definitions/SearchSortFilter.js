const { Given, When, Then } = require('@wdio/cucumber-framework');

const searchSortFilterPage = require('../pageobjects/searchsortfilter.page');



Then(/^I am able to sort "([^"]*)" in "([^"]*)" order$/, async(sort,order) => {
	await searchSortFilterPage.sortdata(sort,order)
});
