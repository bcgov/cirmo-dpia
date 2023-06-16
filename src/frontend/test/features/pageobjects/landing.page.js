const Page = require('./page');
let ques = 0;

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LandingPage extends Page {
    /**
     * define selectors using getter methods
     */
    get head () {
        return $("//h1[contains(text(),'Digital Privacy Impact Assessment (DPIA)')]");
    }
    get headlanding () {
        return $("//b[contains(text(),'Digital Privacy Impact Assessment (DPIA) ')]");
    }
    get loginButton1 () {
        return $("//button/div[contains(text(),'Log in with IDIR')]");
    }
    get loginButton2 () {
        return $("//button[contains(text(),'Log in with IDIR')]");
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */


    async landingheader () {
          await expect(this.headlanding).toBeDisplayed();

    }

    async header () {
        await expect(this.head).toBeDisplayed();

    }

    async landing ()
    {
          await expect(this.loginButton1).toBeDisplayed();
          await expect(this.loginButton2).toBeDisplayed();
    }

    async details (questions)
    {     console.log("Question is: " + questions)
          if(questions == 'What is a Privacy Impact Assessment') 
          {ques=1;
            console.log("Index is: " + ques);}
          else if(questions == 'Problem')
          {ques=2;
            console.log("Index is: " + ques);}
          else if(questions == 'Hypothesis')
          {ques=3;
            console.log("Index is: " + ques);}
          else
          {ques=4;
            console.log("Index is: " + ques);}
          const question = '(//h2)['+ ques + ']';
          console.log("Paragraph is: " + question);
          const Varques = await $(question);
          await expect(Varques).toBeDisplayed();
          const paragraph= '(//h2)[' + ques +']/../p';
          const para = await $(paragraph);
          if(ques==1) 
          { 
            const expected='A PIA is a step-by-step review process to make sure you protect the personal information you collect, use or disclose in your project. Doing a PIA can help protect privacy and build public trust by being clear about what information government is collecting, who has access to it, and where and how it’s stored.';
            const actual=await para.getText();
            await expect(actual).toEqual(expected);
          }
          else if(ques==2)
          {
            const expected='The Corporate Privacy Office (CPO) has the mandate to review all PIAs for BC government ministries. The CPO has seen a 686% increase in PIAs submitted for review in within a 10 year period. While the increase in volume is exponential, the statistics do not reflect the pressures that result from increased complexity of PIA submissions.';
            const actual=await para.getText();
            expect(actual).toEqual(expected);
          }
          else if(ques==3)
          {
            const expected='The DPIA will alleviate unsustainable workload pressures, connect siloed information, support innovation, reduce repetition in the PIA process and enable compliance with legislated PIA requirements.';
            const actual=await para.getText();
            expect(actual).toEqual(expected);
          }
          else if(ques==4)
          {
            const expected='The DPIA will be an integrated, guided, online tool for the for anyone working in a BC ministry that needs to complete a PIA. Digitizing the PIA will create a streamlined experience that enables a culture of privacy and innovation.';
            const actual=await para.getText();
            expect(actual).toEqual(expected);
          }
          else{console.log('The index is not correct')}
          
    }


    
    
    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('landing');
    }
}

module.exports = new LandingPage();
