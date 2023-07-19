const Page = require('./page');
const sortImage = "(//th/img)[";
let ind = 0;
let sortThImg="";
let img;
let stat;
let verify=0;


/**
 * sub page containing specific selectors and methods for a specific page
 */
class FilterSearchSortPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername () {
        return $('//input[@name="user"]');
    }

    get AnyStatus () {
      return $('//select[@id="pia-status-select"]');
    }

    get AnyMinistry () {
      return $('//select[@id="ministry-select"]');
    }

    get AnyDrafter () {
      return $('//select[@id="drafter-filter-select"]');
    }


    get searchBar () {
    return $('//input[@placeholder="Search by title or drafter"]');
    }

    get searchBtn () {
      return $('//button[@class="search-icon-container bcgovbtn bcgovbtn__primary bcgovbtn__primary-search search-icon-container"]');
    }

    
    

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */

    
    async sortdata (sort,order) {
        console.log("Sort Element is: " + sort)
          if(sort == 'Last modified') 
          {ind=1;
           sortThImg = sortImage + ind + "]";
          }
          else if(sort == 'Drafter')
          {ind=2;
           sortThImg = sortImage + ind + "]";
          }
          const VarImg = await $(sortThImg);
          
          if(ind == 1)
          {
            img = await $$("//tr/td[2]"); 
          } 
          else if(ind == 2)
          {
            img = await $$("//tr/td[3]"); 
          } 
          if(order=="ascending")
          { 
            await VarImg.click();
            await browser.pause(2000); 
          };
          await VarImg.waitForClickable();
          await VarImg.click(); 
          await browser.pause(2000); 
          const actualValues = [];
          const sortedTitles = []; 
          for(const lab of img){
            
            actualValues.push(await lab.getText());
            sortedTitles.push(await lab.getText());
          }
          console.log("Actual array is: "+actualValues);
          function compareAscending(a,b) {
            if (a.toLowerCase() < b.toLowerCase()) {
              return -1; 
            } else { 
              return 1;
            }
          }

          function compareDescending(a,b) {
            if (a.toLowerCase() > b.toLowerCase()) {
              return -1; 
            } else { 
              return 1;
            }
          }
          if(order=="ascending")
          {sortedTitles.sort(compareAscending);}
          if(order=="decsending")
          {sortedTitles.sort(compareDescending);}
          
          console.log("Sorted array is: "+sortedTitles);
          expect(actualValues).toEqual(sortedTitles);
    }


    async filterdata (filter,status) {
      console.log("Filter Element is: " + filter);
      console.log("Status is: " + status);
      if(filter == 'Any Status') 
          {
          await this.AnyStatus.waitForClickable();
          await this.AnyStatus.click(); 
          await this.AnyStatus.selectByVisibleText(status);
          await browser.pause(2000); 
          }
      if(filter == 'Any Ministry') 
          {
          await this.AnyMinistry.waitForClickable();
          await this.AnyMinistry.click(); 
          await this.AnyMinistry.selectByVisibleText(status);
          await browser.pause(2000); 
          }
      if(filter == 'Any drafter') 
          {
          await this.AnyDrafter.waitForClickable();
          await this.AnyDrafter.click(); 
          await this.AnyDrafter.selectByVisibleText(status);
          await browser.pause(2000); 
          }
  }

  async verifyStatus (status) {
    
          stat = await $$("//tr/td[4]"); 
          for(const lab of stat){ 
            console.log("Lab status is: " + await lab.getText());
            expect(await lab.getText()).toEqual(status);
          }
}

  async enterSearch (search) {
    
        await this.searchBar.waitForExist();
        await this.searchBar.setValue(search);
        await this.searchBtn.waitForClickable();
        await this.searchBtn.click();
        await browser.pause(2000); 
}

async verifySearch (search) {
    
       stat = await $("//tr/td[1]"); 
       expect(await stat.getText()).toEqual(search);
}

async verifyPIASearch (search) {
    
  stat = await $$("//tr/td[1]"); 
  for(const lab of stat){
    if (await lab.getText()==search)
    {verify=1}
  }
  expect(verify).toEqual(1);
}

async verifyDrafterSearch (search) {
    
  stat = await $$("//tr/td[3]"); 
  for(const lab of stat){
    if (search=='MPO')
    {
      expect(await lab.getText()).toEqual("Gale, Dorothy CITZ:EX");
    }
    else if(search=='CPO')
    {
      expect(await lab.getText()).toEqual("Anyone, Andy (ANDYA) CITZ:EX");
    }
}
}

async verifyDrafterExcluded (search) {
    
  stat = await $$("//tr/td[3]"); 
  for(const lab of stat){
    if (search=='MPO')
    {
      expect(await lab.getText()).not.toEqual("Gale, Dorothy CITZ:EX");
    }
    else if(search=='CPO')
    {
      expect(await lab.getText()).not.toEqual("Anyone, Andy (ANDYA) CITZ:EX");
    }
}
}

 
    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('searchsortfilter');
    }
}

module.exports = new FilterSearchSortPage();
