const Page = require('./page');
let mpoPass='';
let cpoPass='';
let drafterPass='';


/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername () {
        return $('//input[@name="user"]');
    }
    get inputPassword () {
        return $('//input[@name="password"]');
    }
    get btnSubmit () {
        return $('//input[@value="Continue"]');
    }
    get loginButton () {
        return $('//button/div[contains(text(),"Log in with IDIR")]');
    }
    get signOutButton () {
        return $('//button/div[contains(text(),"Sign Out")]');
    }
    get YessignOutButton () {
        return $('//div/button[contains(text(),"Yes, sign out")]');
    }
    get ExceptionMessage () {
        return $('//span[contains(text(),"The username or password you entered is incorrect")]');
    }
    get BCLogo () {
        return $('//img[@alt="Go to the Government of British Columbia website"]');
    }
    

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */

    async login (username,role) {
        await this.inputUsername.setValue(username);
        if(role=='MPO')
        {
        mpoPass= process.env.mpoPass;
        await this.inputPassword.setValue(mpoPass);
        }
        else if (role=='CPO')
        {
        cpoPass= process.env.cpoPass;
        await this.inputPassword.setValue(cpoPass);
        }
        else if (role=='Drafter')
        {
        drafterPass= process.env.drafterPass;
        await this.inputPassword.setValue(drafterPass);
        }
        await this.btnSubmit.waitForClickable();
        await this.btnSubmit.click();
        await browser.pause(3000);     
    }

    async title () {
        console.log('Title is ' + (await browser.getTitle()));
        const ExpTitle = "Active PIA's- Digital Privacy Impact Assessment (DPIA)";
        await expect(browser).toHaveTitle(ExpTitle);

    }

    async verifyBCLogo () {
        await this.BCLogo.waitForDisplayed();
        await browser.pause(2000);  
        await browser.deleteCookies();
    }

    async InvalidUsernamePassword () {
        await this.ExceptionMessage.waitForDisplayed();
        await browser.deleteCookies();
        await browser.reloadSession();
    }

    async InvalidPassword (username,password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.waitForClickable();
        await this.btnSubmit.click();
        await browser.pause(2000);     
    }

    async URL () {
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

    }

    async signout () {
        await this.signOutButton.waitForClickable();
        await this.signOutButton.click();
        await this.YessignOutButton.waitForClickable();
        await this.YessignOutButton.click();
        await browser.pause(2000);
        await this.loginButton.waitForDisplayed({ timeout: 2000 });
        
    }

    
    
    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('login');
    }
}

module.exports = new LoginPage();
