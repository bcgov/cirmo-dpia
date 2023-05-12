
describe('Test DPIA Login Page', () => {
  beforeEach(async () => {
    await browser.maximizeWindow();
    await browser.url('/');
    
  });


  it('Check Log in Title', async () => {
    const loginButton = await $(
      "//button/div[contains(text(),'Log in with IDIR')]",
    );
    await loginButton.click();
    //const pwd = config.mpoPass;
    const mpoPass= process.env.mpoPass;
    const usernameButton = await $("//input[@name='user']");
    const passwordButton = await $("//input[@name='password']");
    const ContinueButton = await $("//input[@value='Continue']");
    const signOutButton = await $("//button/div[contains(text(),'Sign Out')]");
    const YessignOutButton = await $("//div/button[contains(text(),'Yes, sign out')]");
    await usernameButton.setValue('DORGALE');
    await passwordButton.setValue(mpoPass);
    await ContinueButton.click();
    console.log('Title is ' + (await browser.getTitle()));
    const ExpTitle = 'Digital Privacy Impact Assessment (DPIA)';
    await expect(browser).toHaveTitle(ExpTitle);
    await signOutButton.click();
    await YessignOutButton.click();
    await browser.pause(2000);
    await loginButton.waitForDisplayed({ timeout: 2000 });
    
  });

  it('Check Log in URL', async() => {
  
    const loginButton = await $(
      "//button/div[contains(text(),'Log in with IDIR')]",
    );
    await loginButton.click();
    //const pwd = config.mpoPass;
    const mpoPass= process.env.mpoPass;
    const usernameButton = await $("//input[@name='user']");
    const passwordButton = await $("//input[@name='password']");
    const ContinueButton = await $("//input[@value='Continue']");
    const signOutButton = await $("//button/div[contains(text(),'Sign Out')]");
    const YessignOutButton = await $("//div/button[contains(text(),'Yes, sign out')]");
    await usernameButton.setValue('DORGALE');
    await passwordButton.setValue(mpoPass);
    await ContinueButton.click();
    await browser.pause(2000);
    console.log('URL is ' + (await browser.getUrl()));

    console.log('URL from Config file is: ' + browser.options.baseUrl);
    if(browser.options.baseUrl?.includes('test'))
    {
      const ExpUrl = 'https://test.pia.gov.bc.ca/pia/list';
      await expect(browser).toHaveUrl(ExpUrl);
    }
    else if(browser.options.baseUrl?.includes('dev'))
    {
      const ExpUrl = 'https://dev.pia.gov.bc.ca/pia/list';
      await expect(browser).toHaveUrl(ExpUrl);
    }
    else
    {
      await expect("URL not equal to dev or test").toEqual("URL should be dev or test");
    }
    await signOutButton.click();
    await YessignOutButton.click();
    await browser.pause(2000);
    await loginButton.waitForDisplayed({ timeout: 2000 });
    
  });

  it('Check BC Logo', async() => {
    const loginButton = await $(
        "//button/div[contains(text(),'Log in with IDIR')]",
      );
      await loginButton.click();
      //const pwd = config.mpoPass;
      const mpoPass= process.env.mpoPass;
      const usernameButton = await $("//input[@name='user']");
      const passwordButton = await $("//input[@name='password']");
      const ContinueButton = await $("//input[@value='Continue']");
      const signOutButton = await $("//button/div[contains(text(),'Sign Out')]");
      const YessignOutButton = await $("//div/button[contains(text(),'Yes, sign out')]");
      
      await usernameButton.setValue('DORGALE');
      await passwordButton.setValue(mpoPass);
      await ContinueButton.click();
      await browser.pause(2000);
      var BCLogo = await $("//img[@alt='Go to the Government of British Columbia website']").isExisting();
      console.log(BCLogo);
      await signOutButton.click();
      await YessignOutButton.click();
      await browser.pause(2000);
      await loginButton.waitForDisplayed({ timeout: 2000 });
    
  });


  it('Log in with Invalid username', async() => {
    const loginButton = await $(
        "//button/div[contains(text(),'Log in with IDIR')]",
      );
      await loginButton.click();
      //const pwd = config.mpoPass;
      const mpoPass= process.env.mpoPass;
      const usernameButton = await $("//input[@name='user']");
      const passwordButton = await $("//input[@name='password']");
      const ContinueButton = await $("//input[@value='Continue']");
      await usernameButton.setValue('DORGALEs');
      await passwordButton.setValue(mpoPass);
      await ContinueButton.click();
      await browser.pause(2000);
      const IDIR = await $("//span[contains(text(),'The username or password you entered is incorrect')]");
      await expect(IDIR).toBeDisplayed();
      
  });

  it('Log in with Invalid password', async() => {
    const loginButton = await $(
        "//button/div[contains(text(),'Log in with IDIR')]",
      );
      await loginButton.click();
      const usernameButton = await $("//input[@name='user']");
      const passwordButton = await $("//input[@name='password']");
      const ContinueButton = await $("//input[@value='Continue']");
      await usernameButton.setValue('DORGALE');
      await passwordButton.setValue('WrongPass');
      await ContinueButton.click();
      await browser.pause(2000);
      const IDIR = await $("//span[contains(text(),'The username or password you entered is incorrect')]");
      await expect(IDIR).toBeDisplayed();
  });


});
