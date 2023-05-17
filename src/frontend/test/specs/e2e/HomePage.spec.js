const EC = require('wdio-wait-for');
describe('Test DPIA HomePage', () => {
  beforeEach(async () => {
    await browser.maximizeWindow();
    await browser.url('/');
    const loginButton = await $( "//button/div[contains(text(),'Log in with IDIR')]");
    await loginButton.click();
    const mpoPass= process.env.mpoPass;
    const usernameButton = await $("//input[@name='user']");
    const passwordButton = await $("//input[@name='password']");
    const ContinueButton = await $("//input[@value='Continue']");
    await usernameButton.setValue('DORGALE');
    await passwordButton.setValue(mpoPass);
    await ContinueButton.click();
    
    
  });

  afterEach(async () => {
    const signOutButton = await $("//button/div[contains(text(),'Sign Out')]");
    const YessignOutButton = await $("//div/button[contains(text(),'Yes, sign out')]");
    await signOutButton.click();
    await YessignOutButton.click();
    await browser.pause(2000);
    const loginButton = await $( "//button/div[contains(text(),'Log in with IDIR')]");
    await loginButton.waitForDisplayed({ timeout: 2000 });
    await browser.deleteCookies();
    
  });


  it('Check List of PIA tab', async () => {
    
    const listTab = await $("//a[contains(text(),'List of PIAs')]");
    const listHeader = await $("//h1[contains(text(),'List of PIAs')]");
    await listTab.click();
    await expect(listHeader).toBeDisplayed();
    
  });

  it('Check Create New tab', async () => {
    
    const createTab = await $("//a[contains(text(),'Create new')]");
    const createHeader = await $("//h1[contains(text(),'Create New')]");
    await createTab.click();
    await expect(createHeader).toBeDisplayed();
    
  });

  it('Check List of PIA Pagination', async () => {
    
    const listTab = await $("//a[contains(text(),'List of PIAs')]");
    await listTab.click();
    const Footer = await $("//footer"); 
    await Footer.scrollIntoView();
    const pagination = await $("//div[@class='pagination__container__left__text']");
    await expect(pagination).toBeDisplayed();

    const rows = await $("//div[@class='pagination__container__left']//span[@class='rows-per-page'][contains(text(),'Rows per page')]");
    expect(rows).toHaveText('Rows per page');

  });

  it.skip('Verify page numbers', async () => {
    
    const listTab = await $("//a[contains(text(),'List of PIAs')]");
    await listTab.click();
    const Footer = await $("//footer"); 
    await Footer.scrollIntoView();
    await browser.pause(2000);
    const rows = await $('(//button[@aria-expanded="false"])[1]');
    await rows.moveTo();
    browser.waitUntil(EC.elementToBeSelected(rows));
    browser.execute("arguments[0].click();", rows);
    await rows.click();
    await browser.pause(2000);

  });


});
