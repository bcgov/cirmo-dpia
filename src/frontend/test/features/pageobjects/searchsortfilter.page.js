const Page = require('./page');
const sortImage = "(//th/img)[";
let ind = 0;
let sortThImg="";
let img;


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

 
    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('searchsortfilter');
    }
}

module.exports = new FilterSearchSortPage();
