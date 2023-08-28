const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class createPage extends Page {
  /**
   * define selectors using getter methods
   */
  get inputUsername() {
    return $('//input[@name="user"]');
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */

  async intakeForm() {
    console.log('URL is ' + (await browser.getUrl()));

    console.log('URL from Config file is: ' + browser.options.baseUrl);
    if (browser.options.baseUrl?.includes('test')) {
      const ExpUrl = 'https://test.pia.gov.bc.ca/pia/new/intake';
      await expect(browser).toHaveUrl(ExpUrl);
    } else if (browser.options.baseUrl?.includes('dev')) {
      const ExpUrl = 'https://dev.pia.gov.bc.ca/pia/new/intake';
      await expect(browser).toHaveUrl(ExpUrl);
    } else if (browser.options.baseUrl?.includes('local')) {
      const ExpUrl = 'http://localhost:8080/pia/new/intake';
      await expect(browser).toHaveUrl(ExpUrl);
    } else {
      await expect('Intake URL not equal to dev,test or local').toEqual(
        'Intake URL should be dev,test or local',
      );
    }
  }

  async PPQForm() {
    console.log('URL is ' + (await browser.getUrl()));

    console.log('URL from Config file is: ' + browser.options.baseUrl);
    if (browser.options.baseUrl?.includes('test')) {
      const ExpUrl = 'https://test.pia.gov.bc.ca/ppq-form';
      await expect(browser).toHaveUrl(ExpUrl);
    } else if (browser.options.baseUrl?.includes('dev')) {
      const ExpUrl = 'https://dev.pia.gov.bc.ca/ppq-form';
      await expect(browser).toHaveUrl(ExpUrl);
    } else if (browser.options.baseUrl?.includes('local')) {
      const ExpUrl = 'http://localhost:8080/ppq-form';
      await expect(browser).toHaveUrl(ExpUrl);
    } else {
      await expect('PPQ URL not equal to dev,test or local').toEqual(
        'PPQ URL should be dev,test or local',
      );
    }
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open('createPIA');
  }
}

module.exports = new createPage();
