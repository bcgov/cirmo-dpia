const Page = require('./page');
const sortImage = "(//th/img)[";
let ind = 0;
let sortThImg="";


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

    
    async sortdata (sort) {
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
          await VarImg.waitForClickable();
          await VarImg.click(); 
        //   for await (const img of $$('//tr/td[1]')) {
        //     console.log("Text is: "+ img.getText());
        //   }

          $$('//tr/td[2]').forEach(element => {
            console.log("Text is: " +element.getText());})

    }

    
    

    
    
    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('searchsortfilter');
    }
}

module.exports = new FilterSearchSortPage();
