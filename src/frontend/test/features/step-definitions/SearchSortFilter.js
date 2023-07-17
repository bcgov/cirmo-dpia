const { Given, When, Then } = require('@wdio/cucumber-framework');

const searchSortFilterPage = require('../pageobjects/searchsortfilter.page');



Then(/^I am able to sort "([^"]*)" in "([^"]*)" order$/, async(sort,order) => {
	await searchSortFilterPage.sortdata(sort,order)
});

Then(/^I click on the filter "([^"]*)" and select "([^"]*)"$/, async(filter,status) => {
	await searchSortFilterPage.filterdata(filter,status)
});

Then(/^Verify if the status is only "([^"]*)"$/, async(status) => {
	await searchSortFilterPage.verifyStatus(status)
});

Then(/^I enter "([^"]*)" in searchbar$/, async(search) => {
	await searchSortFilterPage.enterSearch(search)
});

Then(/^Verify if the title is "([^"]*)"$/, async(search) => {
	await searchSortFilterPage.verifySearch(search)
});

Then(/^Verify if the PIAtitle is "([^"]*)"$/, async(search) => {
	await searchSortFilterPage.verifyPIASearch(search)
});

Then(/^Verify the drafter (.+)$/, async(filter) => {
	await searchSortFilterPage.verifyDrafterSearch(filter)
});

Then(/^Verify that (.+) is excluded$/, async(filter) => {
	await searchSortFilterPage.verifyDrafterExcluded(filter)
});
