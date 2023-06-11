const Page = require('./page');
const listTab = "//a[contains(text(),'";
const listHeader = "//h1[contains(text(),'";
const createNew = "//h1[contains(text(),'Create New')]";



/**
 * sub page containing specific selectors and methods for a specific page
 */
class homePage extends Page {
    /**
     * define selectors using getter methods
     */
    

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */


    async checkTab (Links) {
        const newListTab = listTab + Links + "')]";
        let newListHeader = "";
        if(Links == 'Create new')
        {newListHeader = listHeader + "Create New" + "')]";}
        else
        {newListHeader = listHeader + Links + "')]";}
        const VarlistTab = await $(newListTab);
        const VarlistHeader = await $(newListHeader);
        await VarlistTab.waitForClickable();
        await VarlistTab.click();
        await expect(VarlistHeader).toBeDisplayed();

    }

    
}

module.exports = new homePage();


