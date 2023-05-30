let ReferenceTitle='';
const dropdown = ["POST_SECONDARY_EDUCATION_AND_FUTURE_SKILLS","AGRICULTURE_AND_FOOD",
"ATTORNEY_GENERAL","BC_PUBLIC_SERVICE_AGENCY","CHILDREN_AND_FAMILY_DEVELOPMENT","CITIZENS_SERVICES",
"INDIGENOUS_RELATIONS_AND_RECONCILIATION","EDUCATION_AND_CHILD_CARE","ENERGY_MINES_AND_LOW_CARBON_INNOVATION",
"ENVIRONMENT_AND_CLIMATE_CHANGE_STRATEGY","FINANCE","FORESTS","GOVERNMENT_COMMUNICATIONS_AND_PUBLIC_ENGAGEMENT",
"HEALTH","JOBS_ECONOMIC_DEVELOPMENT_AND_INNOVATION","LABOUR","WATER_LAND_AND_RESOURCE_STEWARDSHIP","LIQUOR_DISTRIBUTION_BRANCH",
"MENTAL_HEALTH_AND_ADDICTIONS","MUNICIPAL_AFFAIRS","OFFICE_OF_THE_PREMIER","PUBLIC_SAFETY_AND_SOLICITOR_GENERAL",
"SOCIAL_DEVELOPMENT_AND_POVERTY_REDUCTION","TOURISM_ARTS_CULTURE_AND_SPORT","TRANSPORTATION_AND_INFRASTRUCTURE",
"HOUSING","EMERGENCY_MANAGEMENT_AND_CLIMATE_READINESS"];

describe('Create a PIA ', () => {
  beforeEach(async () => {
    await browser.maximizeWindow();
    await browser.url('/');
    const loginButton = await $( "//button/div[contains(text(),'Log in with IDIR')]");
    await loginButton.waitForDisplayed();
    await loginButton.waitForClickable();
    await loginButton.click();
    const mpoPass= process.env.mpoPass;
    const usernameButton = await $("//input[@name='user']");
    const passwordButton = await $("//input[@name='password']");
    const ContinueButton = await $("//input[@value='Continue']");
    await usernameButton.setValue('DORGALE');
    await passwordButton.setValue(mpoPass);
    await ContinueButton.waitForDisplayed();
    await ContinueButton.waitForClickable();
    await ContinueButton.click();
    await browser.pause(2000); 
  
  });

  afterEach(async () => {
    const signOutButton = await $("//button/div[contains(text(),'Sign Out')]");
    const YessignOutButton = await $("//div/button[contains(text(),'Yes, sign out')]");
    await signOutButton.waitForDisplayed();
    await signOutButton.waitForClickable();
    await signOutButton.click();
    await YessignOutButton.waitForDisplayed();
    await YessignOutButton.waitForClickable();
    await YessignOutButton.click();
    await browser.pause(2000);
    const loginButton = await $( "//button/div[contains(text(),'Log in with IDIR')]");
    await loginButton.waitForDisplayed({ timeout: 5000 });
    await browser.deleteCookies();

    
  });

  
  it('Check Create New PIA General Info', async () => {
    
    const createTab = await $("//a[contains(text(),'Create new')]");
    const createHeader = await $("//h1[contains(text(),'Create New')]");
    const startPIA = await $("//a[contains(text(),'Start PIA Intake')]");
    await createTab.waitForDisplayed();
    await createTab.waitForClickable();
    await createTab.click();
    await expect(createHeader).toBeDisplayed();
    await startPIA.waitForDisplayed();
    await startPIA.waitForClickable();
    await startPIA.click();
    const labels = await $$("//label");
    const expectedTitles = [
    "Status",
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
    await createTab.waitForDisplayed();
    await createTab.waitForClickable();
    await createTab.click();
    const startPIA = await $("//a[contains(text(),'Start PIA Intake')]");
    await startPIA.waitForDisplayed();
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
    await createTab.waitForDisplayed();
    await createTab.waitForClickable();
    await createTab.click();
    const startPIA = await $("//a[contains(text(),'Start PIA Intake')]");
    await startPIA.waitForDisplayed();
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
    await createTab.waitForDisplayed();
    await createTab.waitForClickable();
    await createTab.click();
    const startPIA = await $("//a[contains(text(),'Start PIA Intake')]");
    await startPIA.waitForDisplayed();
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
    await createTab.waitForDisplayed();
    await createTab.waitForClickable();
    await createTab.click();
    const startPIA = await $("//a[contains(text(),'Start PIA Intake')]");
    await startPIA.waitForDisplayed();
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
    await createTab.waitForDisplayed();
    await createTab.waitForClickable();
    await createTab.click();
    const startPIA = await $("//a[contains(text(),'Start PIA Intake')]");
    await startPIA.waitForDisplayed();
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
    await createTab.waitForDisplayed();
    await createTab.waitForClickable();
    await createTab.click();
    const startPIA = await $("//a[contains(text(),'Start PIA Intake')]");
    await startPIA.waitForDisplayed();
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
    await createTab.waitForDisplayed();
    await createTab.waitForClickable();
    await createTab.click();
    const startPIA = await $("//a[contains(text(),'Start PIA Intake')]");
    await startPIA.waitForDisplayed();
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
    await createTab.waitForDisplayed();
    await createTab.waitForClickable();
    await createTab.click();
    const startPIA = await $("//a[contains(text(),'Start PIA Intake')]");
    await startPIA.waitForDisplayed();
    await startPIA.waitForClickable();
    await startPIA.click();
    
    const Ministrylabel = await $("//label[contains(text(),'Ministry')]/../div/select");
    await Ministrylabel.waitForDisplayed();
    await Ministrylabel.waitForClickable();
    const Titlelabel = await $("//label[contains(text(),'Title')]/following-sibling::input");
    await Titlelabel.waitForDisplayed();
    await Titlelabel.waitForClickable();
    const Branchlabel = await $("//label[contains(text(),'Branch')]/following-sibling::input");
    await Branchlabel.waitForDisplayed();
    await Branchlabel.waitForClickable();
    const LeadNamelabel = await $("//label[contains(text(),'Initiative lead name')]/following-sibling::input");
    await LeadNamelabel.waitForDisplayed();
    await LeadNamelabel.waitForClickable();
    const LeadTitlelabel = await $("//label[contains(text(),'Initiative lead title')]/following-sibling::input");
    await LeadTitlelabel.waitForDisplayed();
    await LeadTitlelabel.waitForClickable();
    const LeadEmaillabel = await $("//label[contains(text(),'Initiative lead email')]/following-sibling::input");
    await LeadEmaillabel.waitForDisplayed();
    await LeadEmaillabel.waitForClickable();
  
   
    var date = new Date(); 
    var scenario = date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2) + ("0" + date.getHours() ).slice(-2) + ("0" + date.getMinutes()).slice(-2) + ("0" + date.getSeconds()).slice(-2)
    var Title= "Title_"+scenario;
    var Branch= "Branch_"+scenario;
    var LeadName= "Lead Name_"+scenario;
    var LeadTitle= "Lead Title_"+scenario;
    var LeadEmail= "Lead Email_"+scenario;
    await Titlelabel.setValue(Title);
    const random = Math.floor(Math.random() * (dropdown.length -1));
    console.log("Random number is: "+random);
    await Branchlabel.setValue(Branch);
    await LeadNamelabel.setValue(LeadName);
    await LeadTitlelabel.setValue(LeadTitle);
    await LeadEmaillabel.setValue(LeadEmail);
    await Ministrylabel.selectByAttribute('value',dropdown[random]);
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
    await createTab.waitForDisplayed();
    await createTab.waitForClickable();
    await createTab.click();
    const startPIA = await $("//a[contains(text(),'Start PIA Intake')]");
    await startPIA.waitForDisplayed();
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
    const random = Math.floor(Math.random() * (dropdown.length -1));
    console.log("Random number is: "+random);
    await Branchlabel.setValue(Branch);
    await LeadNamelabel.setValue(LeadName);
    await LeadTitlelabel.setValue(LeadTitle);
    await LeadEmaillabel.setValue(LeadEmail);
    await Ministrylabel.selectByAttribute('value',dropdown[random]);
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
    await createTab.waitForDisplayed();
    await createTab.waitForClickable();
    await createTab.click();
    const startPIA = await $("//a[contains(text(),'Start PIA Intake')]");
    await startPIA.waitForDisplayed();
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
    const random = Math.floor(Math.random() * (dropdown.length -1));
    console.log("Random number is: "+random);
    await Branchlabel.setValue(Branch);
    await LeadNamelabel.setValue(LeadName);
    await LeadTitlelabel.setValue(LeadTitle);
    await LeadEmaillabel.setValue(LeadEmail);
    await Ministrylabel.selectByAttribute('value',dropdown[random]);
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


  it.skip('Create a Full PIA with Next Steps', async () => {
    
    const createTab = await $("//a[contains(text(),'Create new')]");
    await createTab.waitForDisplayed();
    await createTab.waitForClickable();
    await createTab.click();
    const startPIA = await $("//a[contains(text(),'Start PIA Intake')]");
    await startPIA.waitForDisplayed();
    await startPIA.waitForClickable();
    await startPIA.click();
    
    const Ministrylabel = await $("//label[contains(text(),'Ministry')]/../div/select");
    await Ministrylabel.waitForDisplayed();
    await Ministrylabel.waitForClickable();
    const Titlelabel = await $("//label[contains(text(),'Title')]/following-sibling::input");
    await Titlelabel.waitForDisplayed();
    await Titlelabel.waitForClickable();
    const Branchlabel = await $("//label[contains(text(),'Branch')]/following-sibling::input");
    await Branchlabel.waitForDisplayed();
    await Branchlabel.waitForClickable();
    const LeadNamelabel = await $("//label[contains(text(),'Initiative lead name')]/following-sibling::input");
    await LeadNamelabel.waitForDisplayed();
    await LeadNamelabel.waitForClickable();
    const LeadTitlelabel = await $("//label[contains(text(),'Initiative lead title')]/following-sibling::input");
    await LeadTitlelabel.waitForDisplayed();
    await LeadTitlelabel.waitForClickable();
    const LeadEmaillabel = await $("//label[contains(text(),'Initiative lead email')]/following-sibling::input");
    await LeadEmaillabel.waitForDisplayed();
    await LeadEmaillabel.waitForClickable();
  
   
    var date = new Date(); 
    var scenario = date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2) + ("0" + date.getHours() ).slice(-2) + ("0" + date.getMinutes()).slice(-2) + ("0" + date.getSeconds()).slice(-2)
    var Title= "Title_"+scenario;
    var Branch= "Branch_"+scenario;
    var LeadName= "Lead Name_"+scenario;
    var LeadTitle= "Lead Title_"+scenario;
    var LeadEmail= "Lead Email_"+scenario;
    await Titlelabel.setValue(Title);
    const random = Math.floor(Math.random() * (dropdown.length -1));
    console.log("Random number is: "+random);
    await Branchlabel.setValue(Branch);
    await LeadNamelabel.setValue(LeadName);
    await LeadTitlelabel.setValue(LeadTitle);
    await LeadEmaillabel.setValue(LeadEmail);
    await Ministrylabel.selectByAttribute('value',dropdown[random]);
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
    
    /**************** NEXT STEPS  PAGE **********************/
    const nextSteps = await $("//div[@class='nextSteps']/h2");
    await nextSteps.waitForExist();
    await expect(nextSteps).toBeDisplayed();

    const Incomplete = await $("//button[contains(text(),'Stay in Incomplete status')]");
    await Incomplete.waitForExist();
    await expect(Incomplete).toBeDisplayed();

    const share1 = await $("//button[contains(text(),'Share with my MPO')]");
    await share1.waitForExist();
    await expect(share1).toBeDisplayed();

    

    const FillOut1 = await $$("//h4[contains(text(),'Fill out the full PIA')]/..//p");
    await expect(FillOut1).toBeDisplayed();
    const expectedFill = [
      "As public servants, we must protect any personal information we collect, use, store and share. Doing a PIA can help you protect privacy and build public trust by being clear about what information you're collecting, who has access to it, and where and how it's stored."
      ]; 
    const actualFill = []; 
    for(const lab of FillOut1){
      actualFill.push(await lab.getText());
    }
    expect(expectedFill).toEqual(actualFill);

    const ChooseFollowing = await $$("//h4[contains(text(),'Choose one of the following:')]/..//p");
    await expect(ChooseFollowing).toBeDisplayed();
    const expectedChoose = [
`To continue drafting this PIA without your MPO’s help, select “Stay in Incomplete status”. Your PIA will be visible to only you, the drafter. At any point, if you submit your PIA, your MPO will be able to view it. Your PIA does not have to be complete for you to submit it to your MPO.`,
`To continue drafting with your MPOs help, select “Submit to MPO”. Your PIA will become visible to your MPO and they will be able to help answer questions and make suggestions about your PIA as you go through the process of writing it.`
      ]; 
    const actualChoose = []; 
    for(const lab of ChooseFollowing){
      actualChoose.push(await lab.getText());
    }
    expect(expectedChoose).toEqual(actualChoose);

    const incomplete = await $("//button[contains(text(),'Share with my MPO')]");
    await incomplete.waitForDisplayed();
    await incomplete.waitForClickable();
    await incomplete.click();

    const confirmIncomplete = await $("//button[contains(text(),'Yes, share')]");
    await confirmIncomplete.waitForDisplayed();
    await confirmIncomplete.waitForClickable();
    await confirmIncomplete.click();
    await browser.pause(5000);


    /**************** COLLECTIONS  PAGE **********************/
    const FillOut = await $$("//b[contains(text(),'Collection, use')]/../../span");
    await expect(FillOut).toBeDisplayed();
    const expectedTitles = [
      "This section will help you to identify the legal authority for collecting, using, and disclosing personal information and to confirm that all personal information elements are necessary for the purpose of the initiative."
      ]; 
    const actualTitles = []; 
    for(const lab of FillOut){
      actualTitles.push(await lab.getText());
    }
    expect(expectedTitles).toEqual(actualTitles);

    const OneOfFollowing = await $$("//h3[contains(text(),'Step-by-step walkthrough')]/..//p");
    await expect(OneOfFollowing).toBeDisplayed();
    const expected = [
      "Describe the way personal information moves through your initiative step by step as if you were explaining it to someone who does not know about your initiative."
      ]; 
    const actual = []; 
    for(const lab of OneOfFollowing){
      actual.push(await lab.getText());
    }
    expect(expected).toEqual(actual);

    const Describe_step = await $("//input[@id='describe_the_step']");
    await Describe_step.waitForClickable();
    await Describe_step.setValue("Description123@#&*");

    const Collection_step = await $("//input[@id='collection,_use,_disclosure_(for_mpo_use_only)']");
    await Collection_step.waitForClickable();
    await Collection_step.setValue("Collection123@#&*");

    const FOIPPA_step = await $("//input[@id='foippa_authority_(for_mpo_use_only)']");
    await FOIPPA_step.waitForClickable();
    await FOIPPA_step.setValue("FOIPPA123@#&*");

    const Legal_step = await $("//input[@id='other_legal_authority_(for_mpo_use_only)']");
    await Legal_step.waitForClickable();
    await Legal_step.setValue("Legal123@#&*");

    const Review = await $$("//div[@class='section__question-hint']");
    await expect(Review).toBeDisplayed();
    const expectR = [
      "If you are collecting personal information directly from the individual the information is about, FOIPPA requires that you provide a collection notice (except in limited circumstances). If you believe there is a reason for an exception, contact your MPO."
      ]; 
    const actualreview = []; 
    for(const lab of Review){
      actualreview.push(await lab.getText());
    }
    expect(expectR).toEqual(actualreview);

    const Collectionstep = await $("(//textarea)[1]");
    await Collectionstep.waitForClickable();
    await Collectionstep.setValue("Review123@#&*");

    const MPOstep = await $("(//textarea)[2]");
    await MPOstep.waitForClickable();
    await MPOstep.setValue("MPO123@#&*");
    await browser.pause(5000);

    const nextbutton = await $("//button[contains(text(),'Next')]");
    await nextbutton.waitForExist();
    await expect(nextbutton).toBeDisplayed();
    await nextbutton.click();

    /**************** PERSONAL INFO  PAGE **********************/
    const Personal = await $("//h2[contains(text(),'Storing Personal Information')]");
    await Personal.waitForExist();
  

    const Personal_infor = await $$("//form/p");
    await expect(Personal_infor).toBeDisplayed();
    const expectPersonal = [
      "If you're storing personal information outside of Canada, identify the sensitivity of the personal information and where and how it will be stored."
      ]; 
    const actualPersonal = []; 
    for(const lab of Personal_infor){
      actualPersonal.push(await lab.getText());
    }
    expect(expectPersonal).toEqual(actualPersonal);

    const personalLabels = await $("//p[contains(text(),'Is any personal')]/../label[contains(text(),'No')]");
    await personalLabels.waitForClickable();
    await personalLabels.click();
    await browser.pause(5000);
    await nextbutton.waitForExist();
    await expect(nextbutton).toBeDisplayed();
    await nextbutton.click();

    /**************** SECURITY OF PERSONAL INFO  PAGE **********************/
    const Security = await $("//h2[contains(text(),'Security of Personal Information')]");
    await Security.waitForExist();
  
    const SecurityText = await $$("//div/p");
    await expect(SecurityText).toBeDisplayed();
    const SecurityChoose = [
`Digital Privacy Impact Assessment (DPIA) beta`,
`This part captures information about the privacy aspects of securing personal information. People, organizations, or governments outside of your initiative should not be able to access the personal information you collect, use, store or disclose. You need to make sure that the personal information is safely secured in both physical (e.g., your office building or work environment) and technical (e.g., online cloud service) environments.`,
`Does your initiative involve digital tools, databases or information systems?`,
`You may need to involve your MPO and possibly your Ministry Information Security Officer (MISO). Together you can assess whether your initiative needs a security assessment`,
`Do you or will you have a security assessment to help you ensure the initiative meets the reasonable security requirements of FOIPPA section 30 ?`,
`Controlling and tracking access`,
`Please check each strategy that describes how you limit or restrict who can access personal information and how you keep track of who has accessed personal information in the past. Insert your own strategies if needed.`,
`Describe any additional strategies.`
      ]; 
    const actualSecuritytext = []; 
    for(const lab of SecurityText){
      actualSecuritytext.push(await lab.getText());
    }
    expect(SecurityChoose).toEqual(actualSecuritytext);

    const SecLabelsNo1 = await $("//strong[contains(text(),'Does your initiative')]/../../div/div[contains(text(),'No')]");
    const SecLabelsNo2 = await $("//strong[contains(text(),'Do you')]/../../div/div[contains(text(),'Yes')]");
    await SecLabelsNo1.waitForClickable();
    await SecLabelsNo1.click();
    await SecLabelsNo2.waitForClickable();
    await SecLabelsNo2.click();
    await browser.pause(5000);
    await nextbutton.waitForExist();
    await expect(nextbutton).toBeDisplayed();
    await nextbutton.click();

    /**************** ACCURACY CORRECTION PAGE **********************/
    const Accuracy = await $("//h2[contains(text(),'Accuracy, Correction and Retention')]");
    await Accuracy.waitForExist();
  
    const AccuracyText = await $$("//div/p");
    await expect(AccuracyText).toBeDisplayed();
    const AccuracyChoose = [
`Digital Privacy Impact Assessment (DPIA) beta`,
`How will you make sure that the personal information is accurate and complete?`,
`FOIPPA section 28 states that a public body must make every reasonable effort to ensure that an individual’s personal information is accurate and complete.`,
`Do you have a process in place to correct personal information?`,
`FOIPPA gives an individual the right to request correction of errors or omissions to their personal information. You must have a process in place to respond to these requests.`,
`Sometimes it’s not possible to correct the personal information. FOIPPA requires that you make a note on the record about the request for correction if you’re not able to correct the record itself. Will you document the request to correct or annotate the record?`,
`If you receive a request for correction from an individual and you know you disclosed their personal information in the last year, FOIPPA requires you to notify the other public body or third party recipient of the request for correction. Will you ensure that you conduct these notifications when necessary?`,
`Does your initiative use personal information to make decisions that directly affect an individual?`,
`Do you have an approved information schedule in place related to personal information used to make decisions?`,
`FOIPPA requires that ministries keep personal information for a minimum of one year after it is used to make a decision about an individual. In addition, the Information Management Act requires that you dispose of government information only in accordance with an approved information schedule or with the approval of the Chief Records Officer.`
      ]; 
    const actualAccuracy = []; 
    for(const lab of AccuracyText){
      actualAccuracy.push(await lab.getText());
    }
    expect(AccuracyChoose).toEqual(actualAccuracy);

    const AccuracyLabelsNo1 = await $("(//div[contains(text(),'No')])[1]");
    const AccuracyLabelsNo2 = await $("(//div[contains(text(),'No')])[2]");
    const AccuracyLabelsNo3 = await $("(//div[contains(text(),'No')])[3]");
    const AccuracyLabelsNo4 = await $("(//div[contains(text(),'No')])[4]");
    await AccuracyLabelsNo1.waitForClickable();
    await AccuracyLabelsNo1.click();
    await AccuracyLabelsNo2.waitForClickable();
    await AccuracyLabelsNo2.click();
    await AccuracyLabelsNo3.waitForClickable();
    await AccuracyLabelsNo3.click();
    await AccuracyLabelsNo4.waitForClickable();
    await AccuracyLabelsNo4.click();
    await browser.pause(5000);
    await nextbutton.waitForExist();
    await expect(nextbutton).toBeDisplayed();
    await nextbutton.click();

/**************** AGREEMENTS AND INFO PAGE **********************/
    const Aggrements = await $("//b[contains(text(),'Agreements and information banks')]");
    await Aggrements.waitForExist();
  
    const AggrementsText = await $$("//div/p");
    await expect(AggrementsText).toBeDisplayed();
    const AgreementChoose = [
`Digital Privacy Impact Assessment (DPIA) beta`,
`This individual may change positions– please enter their title, not their name.`,
`A personal information bank (PIB) is a collection of personal information searchable by name or unique identifier.`,
`This individual may change positions– please enter their title, not their name.`
      ]; 
    const actualAgreement = []; 
    for(const lab of AggrementsText){
      actualAgreement.push(await lab.getText());
    }
    expect(AgreementChoose).toEqual(actualAgreement);

    const AgreementLabelsNo1 = await $("(//div[contains(text(),'No')])[1]");
    const AgreementLabelsNo2 = await $("(//div[contains(text(),'No')])[2]");
    
    await AgreementLabelsNo1.waitForClickable();
    await AgreementLabelsNo1.click();
    await AgreementLabelsNo2.waitForClickable();
    await AgreementLabelsNo2.click();
    await browser.pause(5000);
    await nextbutton.waitForExist();
    await expect(nextbutton).toBeDisplayed();
    await nextbutton.click();

     /**************** ADDITIONAL RISKS PAGE **********************/
  const Additional = await $("//b[contains(text(),'Additional')]");
  await Additional.waitForExist();

  await browser.pause(5000);
  await nextbutton.waitForExist();
  await expect(nextbutton).toBeDisplayed();
  await nextbutton.click();


  await submitButton.waitForExist();
  await submitButton.click();
  await confirmButton.waitForExist();
  await confirmButton.click();
  await browser.pause(5000);

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

 



});