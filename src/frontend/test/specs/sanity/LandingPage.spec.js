
describe('Test DPIA Landing Page', () => {
  beforeEach(async () => {
    await browser.maximizeWindow();
    await browser.url('/');
    
  });


  it('Check Landing header', async () => {
    const header = await $(
      "//b[contains(text(),'Digital Privacy Impact Assessment (DPIA) ')]",
    );
    await expect(header).toBeDisplayed();
  
    
  });

  it('Check Login button in landing page', async() => {
  
    const loginButton = await $("//button/div[contains(text(),'Log in with IDIR')]");
    await expect(loginButton).toBeDisplayed();
    
  });

  it('Check Header of landing page', async() => {

    const header = await $("//h1[contains(text(),'Digital Privacy Impact Assessment (DPIA)')]");
    await expect(header).toBeDisplayed();

  });


});
