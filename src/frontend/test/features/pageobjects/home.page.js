const Page = require('./page');
const listTab = "//a[contains(text(),'";
const listHeader = "//h1[contains(text(),'";



/**
 * sub page containing specific selectors and methods for a specific page
 */
class homePage extends Page {
    /**
     * define selectors using getter methods
     */
    get Footer () {
        return $('//footer');
    }
    get pagination () {
        return $('//div[@class="pagination__container__left__text"]');
    }
    get rows () {
        return $('//div[@class="pagination__container__left"]//span[@class="rows-per-page"][contains(text(),"Rows per page")]"');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */


    async clickTab (Links) {
        const newListTab = listTab + Links + "')]";
        const VarlistTab = await $(newListTab);
        await VarlistTab.waitForClickable();
        await VarlistTab.click();

    }

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

    async verifyPagination () {
        await this.Footer.scrollIntoView();
        console.log("Footer verify");
        await this.pagination.waitForDisplayed();
        console.log("Pagination verify");
        expect(this.rows).toHaveText('Rows per page');
        console.log("Rows verify");
    }

    
}

module.exports = new homePage();


