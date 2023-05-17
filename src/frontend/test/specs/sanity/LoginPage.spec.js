const file= require('fs');
let testdata = JSON.parse(file.readFileSync('./test/testdata/userroles.json'));

describe('Test DPIA Login Page', () => {

  testdata.forEach(({user,role}) => {
 
  beforeEach(async () => {
    await browser.maximizeWindow();
    await browser.url('/');
    
  });


  it('Check Log in Title for '+ role + ' role' , async () => {
    const loginButton = await $(
      "//button/div[contains(text(),'Log in with IDIR')]",
    );
    await loginButton.waitForClickable();
    await loginButton.click();
    //const pwd = config.mpoPass;
    const mpoPass= process.env.mpoPass;
    const usernameButton = await $("//input[@name='user']");
    const passwordButton = await $("//input[@name='password']");
    const ContinueButton = await $("//input[@value='Continue']");
    const signOutButton = await $("//button/div[contains(text(),'Sign Out')]");
    const YessignOutButton = await $("//div/button[contains(text(),'Yes, sign out')]");
    await usernameButton.setValue(user);
    await passwordButton.setValue(mpoPass);
    await ContinueButton.waitForClickable();
    await ContinueButton.click();
    console.log('Title is ' + (await browser.getTitle()));
    const ExpTitle = 'Digital Privacy Impact Assessment (DPIA)';
    await expect(browser).toHaveTitle(ExpTitle);
    await signOutButton.waitForClickable();
    await signOutButton.click();
    await YessignOutButton.waitForClickable();
    await YessignOutButton.click();
    await browser.pause(2000);
    await loginButton.waitForDisplayed({ timeout: 2000 });
    await browser.deleteCookies();
    
  });

  it('Check Log in URL for ' + role + ' role', async() => {
  
    const loginButton = await $(
      "//button/div[contains(text(),'Log in with IDIR')]",
    );
    await loginButton.waitForClickable();
    await loginButton.click();
    //const pwd = config.mpoPass;
    const mpoPass= process.env.mpoPass;
    const usernameButton = await $("//input[@name='user']");
    const passwordButton = await $("//input[@name='password']");
    const ContinueButton = await $("//input[@value='Continue']");
    const signOutButton = await $("//button/div[contains(text(),'Sign Out')]");
    const YessignOutButton = await $("//div/button[contains(text(),'Yes, sign out')]");
    await usernameButton.setValue(user);
    await passwordButton.setValue(mpoPass);
    await ContinueButton.waitForClickable();
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
    else if(browser.options.baseUrl?.includes('local'))
    {
      const ExpUrl = 'http://localhost:8080/pia/list';
      await expect(browser).toHaveUrl(ExpUrl);
    }
    else
    {
      await expect("URL not equal to dev or test").toEqual("URL should be dev or test");
    }
    await signOutButton.waitForClickable();
    await signOutButton.click();
    await YessignOutButton.waitForClickable();
    await YessignOutButton.click();
    await browser.pause(2000);
    await loginButton.waitForDisplayed({ timeout: 2000 });
    await browser.deleteCookies();
    
  });

  it('Check BC Logo for ' + role + ' role', async() => {
    const loginButton = await $(
        "//button/div[contains(text(),'Log in with IDIR')]",
      );
      await loginButton.waitForClickable();
      await loginButton.click();
      //const pwd = config.mpoPass;
      const mpoPass= process.env.mpoPass;
      const usernameButton = await $("//input[@name='user']");
      const passwordButton = await $("//input[@name='password']");
      const ContinueButton = await $("//input[@value='Continue']");
      const signOutButton = await $("//button/div[contains(text(),'Sign Out')]");
      const YessignOutButton = await $("//div/button[contains(text(),'Yes, sign out')]");
      
      await usernameButton.setValue(user);
      await passwordButton.setValue(mpoPass);
      await ContinueButton.waitForClickable();
      await ContinueButton.click();
      await browser.pause(2000);
      var BCLogo = await $("//img[@alt='Go to the Government of British Columbia website']").isExisting();
      console.log(BCLogo);
      await signOutButton.waitForClickable();
      await signOutButton.click();
      await YessignOutButton.waitForClickable();
      await YessignOutButton.click();
      await browser.pause(2000);
      await loginButton.waitForDisplayed({ timeout: 2000 });
      await browser.deleteCookies();
    
  });


  it('Log in with Invalid username for ' + role + ' role', async() => {
    const loginButton = await $(
        "//button/div[contains(text(),'Log in with IDIR')]",
      );
      await loginButton.click();
      //const pwd = config.mpoPass;
      const mpoPass= process.env.mpoPass;
      const usernameButton = await $("//input[@name='user']");
      const passwordButton = await $("//input[@name='password']");
      const ContinueButton = await $("//input[@value='Continue']");
      await usernameButton.setValue(user+'ss');
      await passwordButton.setValue(mpoPass);
      await ContinueButton.waitForClickable();
      await ContinueButton.click();
      await browser.pause(2000);
      const IDIR = await $("//span[contains(text(),'The username or password you entered is incorrect')]");
      await expect(IDIR).toBeDisplayed();
      await browser.deleteCookies();
      
  });

  it('Log in with Invalid password for ' + role + ' role', async() => {
    const loginButton = await $(
        "//button/div[contains(text(),'Log in with IDIR')]",
      );
      await loginButton.click();
      const usernameButton = await $("//input[@name='user']");
      const passwordButton = await $("//input[@name='password']");
      const ContinueButton = await $("//input[@value='Continue']");
      await usernameButton.setValue(user);
      await passwordButton.setValue('WrongPass');
      await ContinueButton.waitForClickable();
      await ContinueButton.click();
      await browser.pause(2000);
      const IDIR = await $("//span[contains(text(),'The username or password you entered is incorrect')]");
      await expect(IDIR).toBeDisplayed();
      await browser.deleteCookies();
  });

});

});
