let ReferenceTitle='';

describe('Create a PIA ', () => {
  beforeEach(async () => {
    await browser.maximizeWindow();
    await browser.url('/');
    const loginButton = await $( "//button/div[contains(text(),'Log in with IDIR')]");
    await loginButton.waitForClickable();
    await loginButton.click();
    const mpoPass= process.env.mpoPass;
    const usernameButton = await $("//input[@name='user']");
    const passwordButton = await $("//input[@name='password']");
    const ContinueButton = await $("//input[@value='Continue']");
    await usernameButton.setValue('DORGALE');
    await passwordButton.setValue(mpoPass);
    await ContinueButton.waitForClickable();
    await ContinueButton.click();
    await browser.pause(2000); 
  
  });

  afterEach(async () => {
    const signOutButton = await $("//button/div[contains(text(),'Sign Out')]");
    const YessignOutButton = await $("//div/button[contains(text(),'Yes, sign out')]");
    await signOutButton.waitForClickable();
    await signOutButton.click();
    await YessignOutButton.waitForClickable();
    await YessignOutButton.click();
    await browser.pause(2000);
    const loginButton = await $( "//button/div[contains(text(),'Log in with IDIR')]");
    await loginButton.waitForDisplayed({ timeout: 2000 });
    await browser.deleteCookies();

    
  });

  
  it('Check Create New PIA General Info', async () => {
    
    const createTab = await $("//a[contains(text(),'Create new')]");
    const createHeader = await $("//h1[contains(text(),'Create New')]");
    await createTab.waitForClickable();
    await createTab.click();
    await expect(createHeader).toBeDisplayed();
    const startPIA = await $("//a[contains(text(),'Start PIA Intake')]");
    await startPIA.waitForClickable();
    await startPIA.click();
    const labels = await $$("//label");
    const expectedTitles = [
    "Title (required)",
    "Ministry (required)",
    "Branch (required)",
    "Initiative lead name",
    "Initiative lead email",
    "Initiative lead title",
    "Yes",
    "No",
    "I'm not sure"
    ]; 
    const actualTitles = []; 
    for(const lab of labels){
      actualTitles.push(await lab.getText());
    }
    expect(expectedTitles).toEqual(actualTitles);
  
});

  it('Check New PIA intake details', async () => {
   
    const createTab = await $("//a[contains(text(),'Create new')]");
    await createTab.waitForClickable();
    await createTab.click();
    const startPIA = await $("//a[contains(text(),'Start PIA Intake')]");
    await startPIA.waitForClickable();
    await startPIA.click();
    const intakeHeader = await $("//h2").getText();
    expect(intakeHeader).toEqual('PIA Intake');
    const labels = await $$("//h3[contains(text(),'Before you start')]/../ul/li");
    const expectedTitles = [
    "Fill out this form if you work or are a service provider to a ministry in the Government of B.C. and are starting a new initiative or significantly changing an existing initiative",
    "Do your best to fill out the fields below, but know that you can return to this section and edit your answers in the future",
    "Until you click “Submit”, this form is only visible to you",
    "After you submit this form, your MPO will be able to see it and help you with any questions you might have"
    ]; 
    const actualTitles = []; 
    for(const lab of labels){
      actualTitles.push(await lab.getText());
    }
    expect(expectedTitles).toEqual(actualTitles);
  
  });

  it('Check New PIA initiative details', async () => {
  
    const createTab = await $("//a[contains(text(),'Create new')]");
    await createTab.waitForClickable();
    await createTab.click();
    const startPIA = await $("//a[contains(text(),'Start PIA Intake')]");
    await startPIA.waitForClickable();
    await startPIA.click();
    const initiativeHeader = await $("//h3[contains(text(),'Initiative Details')]").getText();
    expect(initiativeHeader).toEqual('Initiative Details');
    const labels = await $$("//h3[contains(text(),'Initiative Details')]/../div/p");
    const expectedTitles = [
    "What is the initiative? (required)",
    "Describe your initiative in enough detail that a reader who knows nothing about your work will understand the purpose of your initiative and who your partners and other stakeholders are. Describe what you’re doing, how it works, who is involved and when or how long your initiative runs."
    ]; 
    const actualTitles = []; 
    for(const lab of labels){
      actualTitles.push(await lab.getText());
    }
    expect(expectedTitles).toEqual(actualTitles);
   
  });
 
  it('Check New PIA scope', async () => {
    
    const createTab = await $("//a[contains(text(),'Create new')]");
    await createTab.waitForClickable();
    await createTab.click();
    const startPIA = await $("//a[contains(text(),'Start PIA Intake')]");
    await startPIA.waitForClickable();
    await startPIA.click();
    const labels = await $$("//section/div/p/strong[contains(text(),'What is the scope of the PIA?')]/../../p");
    const expectedTitles = [
    "What is the scope of the PIA?",
    "Your initiative might be part of a larger one or might be rolled out in phases. What part of the initiative is covered by this PIA? What is out of scope of this PIA?"
    ]; 
    const actualTitles = []; 
    for(const lab of labels){
      actualTitles.push(await lab.getText());
    }
    expect(expectedTitles).toEqual(actualTitles);
    
  });

  it('Check PIA Data elements', async () => {
  
    const createTab = await $("//a[contains(text(),'Create new')]");
    await createTab.waitForClickable();
    await createTab.click();
    const startPIA = await $("//a[contains(text(),'Start PIA Intake')]");
    await startPIA.waitForClickable();
    await startPIA.click();
    const labels = await $$("//section/div/p/strong[contains(text(),'What are the data or information elements involved in your initiative?')]/../../p");
    const expectedTitles = [
    "What are the data or information elements involved in your initiative?",
    "Please list all the elements of information or data that you might collect, use, store, disclose, or access as part of your initiative. If your initiative involves large quantities of information or datasets, you can list categories or other groupings of personal information in a table below or in an appendix."
    ]; 
    const actualTitles = []; 
    for(const lab of labels){
      actualTitles.push(await lab.getText());
    }
    expect(expectedTitles).toEqual(actualTitles);
  
  });

  it('Check PIA Personal Information', async () => {
   
    const createTab = await $("//a[contains(text(),'Create new')]");
    await createTab.waitForClickable();
    await createTab.click();
    const startPIA = await $("//a[contains(text(),'Start PIA Intake')]");
    await startPIA.waitForClickable();
    await startPIA.click();
    const labels = await $$("//h3[contains(text(),'Personal Information')]/../div/p");
    const expectedTitles = [
    "Did you list personal information in the last question?",
    "Personal information  is any recorded information about an identifiable individual, other than business contact information. Personal information includes information that can be used to identify an individual through association or reference."
    ]; 
    const actualTitles = []; 
    for(const lab of labels){
      actualTitles.push(await lab.getText());
    }
    expect(expectedTitles).toEqual(actualTitles);
   
  });

  
  it('Select "No" as Personal Information', async () => {
    
    const createTab = await $("//a[contains(text(),'Create new')]");
    await createTab.waitForClickable();
    await createTab.click();
    const startPIA = await $("//a[contains(text(),'Start PIA Intake')]");
    await startPIA.waitForClickable();
    await startPIA.click();
    const labels = await $("//label[contains(text(),'No')]");
    await labels.click();
    const risk = await $$("//label[contains(text(),'No')]/../div/p");
    const expectedTitles = [
      "How will you reduce the risk of unintentionally collecting personal information?",
      "Some initiatives that do not require personal information are at risk of collecting personal information inadvertently, which could result in an information incident or privacy breach."
      ]; 
    const actualTitles = []; 
    for(const lab of risk){
      actualTitles.push(await lab.getText());
    }
    expect(expectedTitles).toEqual(actualTitles);
    await browser.pause(5000);
    const savedAtButton = await $( "//span[contains(text(),'Saved at')]");
    await savedAtButton.waitForDisplayed({ timeout: 2000 });
    
    
  });

  it('Check "view comments" for each Intake Question', async () => {
    
    const createTab = await $("//a[contains(text(),'Create new')]");
    await createTab.waitForClickable();
    await createTab.click();
    const startPIA = await $("//a[contains(text(),'Start PIA Intake')]");
    await startPIA.waitForClickable();
    await startPIA.click();
    
    
    const comments = await $$("//button[contains(text(),'View comments')]");
    var i =0;
    for(const lab of comments){
      i = i +1
    }
    expect(i).toEqual(5);
      
    
  });


  it('Create a simple PIA', async () => {
    
    const createTab = await $("//a[contains(text(),'Create new')]");
    await createTab.waitForClickable();
    await createTab.click();
    const startPIA = await $("//a[contains(text(),'Start PIA Intake')]");
    await startPIA.waitForClickable();
    await startPIA.click();
    
    const Ministrylabel = await $("//label[contains(text(),'Ministry')]/../div/select");
    await Ministrylabel.waitForClickable();
    const Titlelabel = await $("//label[contains(text(),'Title')]/following-sibling::input");
    await Titlelabel.waitForClickable();
    const Branchlabel = await $("//label[contains(text(),'Branch')]/following-sibling::input");
    await Branchlabel.waitForClickable();
    const LeadNamelabel = await $("//label[contains(text(),'Initiative lead name')]/following-sibling::input");
    await LeadNamelabel.waitForClickable();
    const LeadTitlelabel = await $("//label[contains(text(),'Initiative lead title')]/following-sibling::input");
    await LeadTitlelabel.waitForClickable();
    const LeadEmaillabel = await $("//label[contains(text(),'Initiative lead email')]/following-sibling::input");
    await LeadEmaillabel.waitForClickable();
  
   
    var date = new Date(); 
    var scenario = date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2) + ("0" + date.getHours() ).slice(-2) + ("0" + date.getMinutes()).slice(-2) + ("0" + date.getSeconds()).slice(-2)
    var Title= "Title_"+scenario;
    var Branch= "Branch_"+scenario;
    var LeadName= "Lead Name_"+scenario;
    var LeadTitle= "Lead Title_"+scenario;
    var LeadEmail= "Lead Email_"+scenario;
    await Titlelabel.setValue(Title);
    var index = Math.random() * 28 | 0;
    console.log("Random number is: "+index);
    await Ministrylabel.selectByIndex(index);
    await Branchlabel.setValue(Branch);
    await LeadNamelabel.setValue(LeadName);
    await LeadTitlelabel.setValue(LeadTitle);
    await LeadEmaillabel.setValue(LeadEmail);
    await browser.pause(5000);
    const savedAtButton = await $( "//span[contains(text(),'Saved at')]");
    await savedAtButton.waitForDisplayed({ timeout: 2000 });

    const initiativeText = await $("//h3[contains(text(),'Initiative Details')]/../div//textarea");
    await initiativeText.waitForExist();
    await initiativeText.setValue("Describe your initiative in enough detail that a reader who knows nothing about your work will understand the purpose of your initiative and who your partners and other stakeholders are. Describe what you’re doing, how it works, who is involved and when or how long your initiative runs.");
    

    const scopeText = await $("//section/div/p/strong[contains(text(),'What is the scope of the PIA?')]/../..//textarea");
    await scopeText.waitForExist();
    await scopeText.setValue("Your initiative might be part of a larger one or might be rolled out in phases. What part of the initiative is covered by this PIA? What is out of scope of this PIA?");
    
    const dataText = await $("//section/div/p/strong[contains(text(),'What are the data or information elements involved in your initiative?')]/../..//textarea");
    await dataText.waitForExist();
    await dataText.setValue("Please list all the elements of information or data that you might collect, use, store, disclose, or access as part of your initiative. If your initiative involves large quantities of information or datasets, you can list categories or other groupings of personal information in a table below or in an appendix.");

    const labels = await $("//label[contains(text(),'No')]");
    await labels.click();
    await browser.pause(5000);
    await savedAtButton.waitForDisplayed({ timeout: 2000 });


    const submitButton = await $("//button[contains(text(),'Submit')]");
    await submitButton.waitForExist();
    await submitButton.click();
    const confirmButton = await $("//button[contains(text(),'Yes, submit')]");
    await confirmButton.waitForExist();
    await confirmButton.click();
    await browser.pause(5000);
    
    const nextSteps = await $("//div[@class='nextSteps']/h2");
    await nextSteps.waitForExist();
    await expect(nextSteps).toBeDisplayed();

    const notify = await $("//h3[contains(text(),'Notify your MPO')]");
    await notify.waitForExist();
    await expect(notify).toBeDisplayed();

    const share = await $$("//div[@class='nextSteps']/h2/..//p");
    await expect(share).toBeDisplayed();
    const expectedTitles = [
      "The next step is to send an email to your ministry privacy officer and let them know you have completed the PIA intake. Find your MPO here. Your MPO will make sure your answers are complete, and they may ask for more information.",
`Can't find what you're looking for? Contact the Privacy Helpline.
250 356-1851
Privacy.Helpline@gov.bc.ca`
      ]; 
    const actualTitles = []; 
    for(const lab of share){
      actualTitles.push(await lab.getText());
    }
    const status = await $("//div[contains(text(),'MPO REVIEW')]");
    await status.waitForExist();
    await expect(status).toBeDisplayed();
    
    expect(expectedTitles).toEqual(actualTitles);

    
    const ListTab = await $("//a[contains(text(),'List of PIAs')]");
    await ListTab.waitForClickable();
    await ListTab.click();

    const Search = await $("//input[@placeholder='Search by title or drafter']");
    await Search.waitForExist();
    await Search.setValue(Title);

    const Searchbutton = await $("//button[@class='search-icon-container bcgovbtn bcgovbtn__primary bcgovbtn__primary-search search-icon-container']");
    await Searchbutton.waitForClickable();
    await Searchbutton.click();
    const mpostatus = await $("//div[contains(text(),'MPO REVIEW')]");
    await mpostatus.waitForExist();
    await expect(mpostatus).toBeDisplayed();
    
  });

  it ('Create a Full PIA and stay in incomplete status', async () => {
    
    const createTab = await $("//a[contains(text(),'Create new')]");
    await createTab.waitForClickable();
    await createTab.click();
    const startPIA = await $("//a[contains(text(),'Start PIA Intake')]");
    await startPIA.waitForClickable();
    await startPIA.click();
    
    const Ministrylabel = await $("//label[contains(text(),'Ministry')]/../div/select");
    await Ministrylabel.waitForClickable();
    const Titlelabel = await $("//label[contains(text(),'Title')]/following-sibling::input");
    await Titlelabel.waitForClickable();
    const Branchlabel = await $("//label[contains(text(),'Branch')]/following-sibling::input");
    await Branchlabel.waitForClickable();
    const LeadNamelabel = await $("//label[contains(text(),'Initiative lead name')]/following-sibling::input");
    await LeadNamelabel.waitForClickable();
    const LeadTitlelabel = await $("//label[contains(text(),'Initiative lead title')]/following-sibling::input");
    await LeadTitlelabel.waitForClickable();
    const LeadEmaillabel = await $("//label[contains(text(),'Initiative lead email')]/following-sibling::input");
    await LeadEmaillabel.waitForClickable();
  
   
    var date = new Date(); 
    var scenario = date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2) + ("0" + date.getHours() ).slice(-2) + ("0" + date.getMinutes()).slice(-2) + ("0" + date.getSeconds()).slice(-2)
    var Title= "Title_"+scenario;
    var Branch= "Branch_"+scenario;
    var LeadName= "Lead Name_"+scenario;
    var LeadTitle= "Lead Title_"+scenario;
    var LeadEmail= "Lead Email_"+scenario;
    await Titlelabel.setValue(Title);
    var index = Math.random() * 28 | 0;
    console.log("Random number is: "+index);
    await Ministrylabel.selectByIndex(index);
    await Branchlabel.setValue(Branch);
    await LeadNamelabel.setValue(LeadName);
    await LeadTitlelabel.setValue(LeadTitle);
    await LeadEmaillabel.setValue(LeadEmail);
    await browser.pause(5000);
    const savedAtButton = await $( "//span[contains(text(),'Saved at')]");
    await savedAtButton.waitForDisplayed({ timeout: 2000 });

    const initiativeText = await $("//h3[contains(text(),'Initiative Details')]/../div//textarea");
    await initiativeText.waitForExist();
    await initiativeText.setValue("Describe your initiative in enough detail that a reader who knows nothing about your work will understand the purpose of your initiative and who your partners and other stakeholders are. Describe what you’re doing, how it works, who is involved and when or how long your initiative runs.");
    

    const scopeText = await $("//section/div/p/strong[contains(text(),'What is the scope of the PIA?')]/../..//textarea");
    await scopeText.waitForExist();
    await scopeText.setValue("Your initiative might be part of a larger one or might be rolled out in phases. What part of the initiative is covered by this PIA? What is out of scope of this PIA?");
    
    const dataText = await $("//section/div/p/strong[contains(text(),'What are the data or information elements involved in your initiative?')]/../..//textarea");
    await dataText.waitForExist();
    await dataText.setValue("Please list all the elements of information or data that you might collect, use, store, disclose, or access as part of your initiative. If your initiative involves large quantities of information or datasets, you can list categories or other groupings of personal information in a table below or in an appendix.");

    const labels = await $("//label[contains(text(),'Yes')]");
    await labels.click();
    await browser.pause(5000);
    await savedAtButton.waitForDisplayed({ timeout: 2000 });


    const submitButton = await $("//button[contains(text(),'Submit')]");
    await submitButton.waitForClickable();
    await submitButton.click();
    const confirmButton = await $("//button[contains(text(),'Yes, submit')]");
    await confirmButton.waitForClickable();
    await confirmButton.click();
    await browser.pause(5000);
    
    const nextSteps = await $("//div[@class='nextSteps']/h2");
    await nextSteps.waitForExist();
    await expect(nextSteps).toBeDisplayed();

    const Incomplete = await $("//button[contains(text(),'Stay in Incomplete status')]");
    await Incomplete.waitForExist();
    await expect(Incomplete).toBeDisplayed();

    const share = await $("//button[contains(text(),'Share with my MPO')]");
    await share.waitForExist();
    await expect(share).toBeDisplayed();

    

    const FillOut = await $$("//h4[contains(text(),'Fill out the full PIA')]/..//p");
    await expect(FillOut).toBeDisplayed();
    const expectedTitles = [
      "As public servants, we must protect any personal information we collect, use, store and share. Doing a PIA can help you protect privacy and build public trust by being clear about what information you're collecting, who has access to it, and where and how it's stored."
      ]; 
    const actualTitles = []; 
    for(const lab of FillOut){
      actualTitles.push(await lab.getText());
    }
    expect(expectedTitles).toEqual(actualTitles);

    const OneOfFollowing = await $$("//h4[contains(text(),'Choose one of the following:')]/..//p");
    await expect(OneOfFollowing).toBeDisplayed();
    const expected = [
`To continue drafting this PIA without your MPO’s help, select “Stay in Incomplete status”. Your PIA will be visible to only you, the drafter. At any point, if you submit your PIA, your MPO will be able to view it. Your PIA does not have to be complete for you to submit it to your MPO.`,
`To continue drafting with your MPOs help, select “Submit to MPO”. Your PIA will become visible to your MPO and they will be able to help answer questions and make suggestions about your PIA as you go through the process of writing it.`
      ]; 
    const actual = []; 
    for(const lab of OneOfFollowing){
      actual.push(await lab.getText());
      console.log("CHECK CONSOLE " + await lab.getText())
    }
    expect(expected).toEqual(actual);

    const incomplete = await $("//button[contains(text(),'Stay in Incomplete status')]");
    await incomplete.waitForClickable();
    await incomplete.click();

    const confirmIncomplete = await $("//button[contains(text(),'Yes, stay in incomplete')]");
    await confirmIncomplete.waitForClickable();
    await confirmIncomplete.click();

    const ListTab = await $("//a[contains(text(),'List of PIAs')]");
    await ListTab.waitForClickable();
    await ListTab.click();

    const Search = await $("//input[@placeholder='Search by title or drafter']");
    await Search.waitForExist();
    await Search.setValue(Title);

    const Searchbutton = await $("//button[@class='search-icon-container bcgovbtn bcgovbtn__primary bcgovbtn__primary-search search-icon-container']");
    await Searchbutton.waitForClickable();
    await Searchbutton.click();
    const mpostatus = await $("//div[contains(text(),'INCOMPLETE')]");
    await mpostatus.waitForExist();
    await expect(mpostatus).toBeDisplayed();
  
  });



  it ('Create a Full PIA and Share with my MPO', async () => {
    
    const createTab = await $("//a[contains(text(),'Create new')]");
    await createTab.waitForClickable();
    await createTab.click();
    const startPIA = await $("//a[contains(text(),'Start PIA Intake')]");
    await startPIA.waitForClickable();
    await startPIA.click();
    
    const Ministrylabel = await $("//label[contains(text(),'Ministry')]/../div/select");
    await Ministrylabel.waitForClickable();
    const Titlelabel = await $("//label[contains(text(),'Title')]/following-sibling::input");
    await Titlelabel.waitForClickable();
    const Branchlabel = await $("//label[contains(text(),'Branch')]/following-sibling::input");
    await Branchlabel.waitForClickable();
    const LeadNamelabel = await $("//label[contains(text(),'Initiative lead name')]/following-sibling::input");
    await LeadNamelabel.waitForClickable();
    const LeadTitlelabel = await $("//label[contains(text(),'Initiative lead title')]/following-sibling::input");
    await LeadTitlelabel.waitForClickable();
    const LeadEmaillabel = await $("//label[contains(text(),'Initiative lead email')]/following-sibling::input");
    await LeadEmaillabel.waitForClickable();
  
   
    var date = new Date(); 
    var scenario = date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2) + ("0" + date.getHours() ).slice(-2) + ("0" + date.getMinutes()).slice(-2) + ("0" + date.getSeconds()).slice(-2)
    var Title= "Title_"+scenario;
    var Branch= "Branch_"+scenario;
    var LeadName= "Lead Name_"+scenario;
    var LeadTitle= "Lead Title_"+scenario;
    var LeadEmail= "Lead Email_"+scenario;
    await Titlelabel.setValue(Title);
    var index = Math.random() * 28 | 0;
    console.log("Random number is: "+index);
    await Ministrylabel.selectByIndex(index);
    await Branchlabel.setValue(Branch);
    await LeadNamelabel.setValue(LeadName);
    await LeadTitlelabel.setValue(LeadTitle);
    await LeadEmaillabel.setValue(LeadEmail);
    await browser.pause(5000);
    const savedAtButton = await $( "//span[contains(text(),'Saved at')]");
    await savedAtButton.waitForDisplayed({ timeout: 2000 });

    const initiativeText = await $("//h3[contains(text(),'Initiative Details')]/../div//textarea");
    await initiativeText.waitForExist();
    await initiativeText.setValue("Describe your initiative in enough detail that a reader who knows nothing about your work will understand the purpose of your initiative and who your partners and other stakeholders are. Describe what you’re doing, how it works, who is involved and when or how long your initiative runs.");
    

    const scopeText = await $("//section/div/p/strong[contains(text(),'What is the scope of the PIA?')]/../..//textarea");
    await scopeText.waitForExist();
    await scopeText.setValue("Your initiative might be part of a larger one or might be rolled out in phases. What part of the initiative is covered by this PIA? What is out of scope of this PIA?");
    
    const dataText = await $("//section/div/p/strong[contains(text(),'What are the data or information elements involved in your initiative?')]/../..//textarea");
    await dataText.waitForExist();
    await dataText.setValue("Please list all the elements of information or data that you might collect, use, store, disclose, or access as part of your initiative. If your initiative involves large quantities of information or datasets, you can list categories or other groupings of personal information in a table below or in an appendix.");

    const labels = await $("//label[contains(text(),'Yes')]");
    await labels.click();
    await browser.pause(5000);
    await savedAtButton.waitForDisplayed({ timeout: 2000 });


    const submitButton = await $("//button[contains(text(),'Submit')]");
    await submitButton.waitForExist();
    await submitButton.click();
    const confirmButton = await $("//button[contains(text(),'Yes, submit')]");
    await confirmButton.waitForExist();
    await confirmButton.click();
    await browser.pause(5000);
    
    const nextSteps = await $("//div[@class='nextSteps']/h2");
    await nextSteps.waitForExist();
    await expect(nextSteps).toBeDisplayed();

    const Incomplete = await $("//button[contains(text(),'Stay in Incomplete status')]");
    await Incomplete.waitForExist();
    await expect(Incomplete).toBeDisplayed();

    const share = await $("//button[contains(text(),'Share with my MPO')]");
    await share.waitForExist();
    await expect(share).toBeDisplayed();

    

    const FillOut = await $$("//h4[contains(text(),'Fill out the full PIA')]/..//p");
    await expect(FillOut).toBeDisplayed();
    const expectedTitles = [
      "As public servants, we must protect any personal information we collect, use, store and share. Doing a PIA can help you protect privacy and build public trust by being clear about what information you're collecting, who has access to it, and where and how it's stored."
      ]; 
    const actualTitles = []; 
    for(const lab of FillOut){
      actualTitles.push(await lab.getText());
    }
    expect(expectedTitles).toEqual(actualTitles);

    const OneOfFollowing = await $$("//h4[contains(text(),'Choose one of the following:')]/..//p");
    await expect(OneOfFollowing).toBeDisplayed();
    const expected = [
`To continue drafting this PIA without your MPO’s help, select “Stay in Incomplete status”. Your PIA will be visible to only you, the drafter. At any point, if you submit your PIA, your MPO will be able to view it. Your PIA does not have to be complete for you to submit it to your MPO.`,
`To continue drafting with your MPOs help, select “Submit to MPO”. Your PIA will become visible to your MPO and they will be able to help answer questions and make suggestions about your PIA as you go through the process of writing it.`
      ]; 
    const actual = []; 
    for(const lab of OneOfFollowing){
      actual.push(await lab.getText());
    }
    expect(expected).toEqual(actual);

    const incomplete = await $("//button[contains(text(),'Share with my MPO')]");
    await incomplete.waitForClickable();
    await incomplete.click();

    const confirmIncomplete = await $("//button[contains(text(),'Yes, share')]");
    await confirmIncomplete.waitForClickable();
    await confirmIncomplete.click();

    const ListTab = await $("//a[contains(text(),'List of PIAs')]");
    await ListTab.waitForClickable();
    await ListTab.click();

    const Search = await $("//input[@placeholder='Search by title or drafter']");
    await Search.waitForExist();
    await Search.setValue(Title);

    const Searchbutton = await $("//button[@class='search-icon-container bcgovbtn bcgovbtn__primary bcgovbtn__primary-search search-icon-container']");
    await Searchbutton.waitForClickable();
    await Searchbutton.click();
    const mpostatus = await $("//div[contains(text(),'INCOMPLETE')]");
    await mpostatus.waitForExist();
    await expect(mpostatus).toBeDisplayed();
  
  });




});