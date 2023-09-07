/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
let retrieveURL = '';
const buttonDiv = "//button/div[contains(text(),'";
const buttonNorm = "//button[contains(text(),'";
const divButton = "//div/button[contains(text(),'";
const hyperlinkNorm = "//a[contains(text(),'";
const div = "//div[contains(text(),'";
module.exports = class Page {
  /**
   * Opens a sub page of the page
   * @param path path of the sub page (e.g. /path/to/page.html)
   */
  open(path) {
    // return browser.url(`https://the-internet.herokuapp.com/${path}`)
    return browser.url('/');
  }

  maximize(path) {
    // return browser.url(`https://the-internet.herokuapp.com/${path}`)
    return browser.maximizeWindow();
  }

  async clickButton(button) {
    if (button == 'cancel') {
      var newbuttondiv = '(' + buttonNorm + 'Cancel' + "')])[2]";
    } else if (button == 'Confirm') {
      const confirmBt = await $('//button[contains(text(),"Confirm")]');
      await confirmBt.scrollIntoView();
      await confirmBt.waitForClickable({ timeout: 20000 });
      await confirmBt.click();
    } else {
      var newbuttondiv = buttonNorm + button + "')]";
      const buttonElement = await $(newbuttondiv);
      await buttonElement.scrollIntoView();
      await buttonElement.waitForClickable({ timeout: 20000 });
      await buttonElement.click();
      await browser.pause(2000);
    }
  }
  async clickButtonDiv(button) {
    const newbuttondiv = buttonDiv + button + "')]";
    const buttonElement = await $(newbuttondiv);
    await buttonElement.waitForClickable();
    await buttonElement.click();
    //await browser.pause(2000);
  }
  async clickdivButton(button) {
    const newbuttondiv = divButton + button + "')]";
    const buttonElement = await $(newbuttondiv);
    await buttonElement.waitForClickable();
    await buttonElement.click();
    //await browser.pause(2000);
  }

  async seeButtonDiv(button) {
    const newbuttondiv = buttonDiv + button + "')]";
    const buttonElement = await $(newbuttondiv);
    await buttonElement.waitForDisplayed({ timeout: 2000 });
  }

  async seehyperLink(link) {
    const newLink = hyperlinkNorm + link + "')]";
    const hyperElement = await $(newLink);
    await hyperElement.waitForDisplayed({ timeout: 2000 });
  }

  async clickhyperLink(link) {
    const newLink = hyperlinkNorm + link + "')]";
    const hyperElement = await $(newLink);
    await hyperElement.waitForClickable();
    await hyperElement.click();
    await browser.pause(1000);
  }

  async getURL() {
    await browser.pause(2000);
    retrieveURL = await browser.getUrl();
    console.log('Current URL is: ' + retrieveURL);
  }

  async openCurrentURL() {
    if (browser.options.baseUrl?.includes('test')) {
      retrieveURL = 'https://test.pia.gov.bc.ca/pia/list';
    } else if (browser.options.baseUrl?.includes('dev')) {
      retrieveURL = 'https://dev.pia.gov.bc.ca/pia/list';
    } else if (browser.options.baseUrl?.includes('local')) {
      retrieveURL = 'http://localhost:8080/pia/list';
    } else {
      await expect('URL not equal to dev or test').toEqual(
        'URL should be dev or test',
      );
    }
    console.log('CurrentURL is: ' + retrieveURL);
    await browser.url(retrieveURL);
  }

  async checkURL(url) {
    if (url == 'Learn about the current PIA process') {
      const ExpUrl =
        'https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/privacy/privacy-impact-assessments';
      await expect(browser).toHaveUrl(ExpUrl);
    } else if (url == 'something else') {
      const ExpUrl = 'something';
      await expect(browser).toHaveUrl(ExpUrl);
    }
  }

  async validateDiv(actualdiv) {
    const divVar = div + actualdiv + "')]";
    const divElement = await $(divVar);
    await divElement.waitForDisplayed({ timeout: 2000 });
  }
};
