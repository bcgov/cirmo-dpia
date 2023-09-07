const Page = require('./page');
let Title = '';
let Branch = '';
let LeadName = '';
let LeadTitle = '';
let LeadEmail = '';
let scenario = '';
const paraNorm = "//p[contains(text(),'";
const dropdown = [
  'POST_SECONDARY_EDUCATION_AND_FUTURE_SKILLS',
  'AGRICULTURE_AND_FOOD',
  'ATTORNEY_GENERAL',
  'BC_PUBLIC_SERVICE_AGENCY',
  'CHILDREN_AND_FAMILY_DEVELOPMENT',
  'CITIZENS_SERVICES',
  'INDIGENOUS_RELATIONS_AND_RECONCILIATION',
  'EDUCATION_AND_CHILD_CARE',
  'ENERGY_MINES_AND_LOW_CARBON_INNOVATION',
  'ENVIRONMENT_AND_CLIMATE_CHANGE_STRATEGY',
  'FINANCE',
  'FORESTS',
  'GOVERNMENT_COMMUNICATIONS_AND_PUBLIC_ENGAGEMENT',
  'HEALTH',
  'JOBS_ECONOMIC_DEVELOPMENT_AND_INNOVATION',
  'LABOUR',
  'WATER_LAND_AND_RESOURCE_STEWARDSHIP',
  'LIQUOR_DISTRIBUTION_BRANCH',
  'MENTAL_HEALTH_AND_ADDICTIONS',
  'MUNICIPAL_AFFAIRS',
  'OFFICE_OF_THE_PREMIER',
  'PUBLIC_SAFETY_AND_SOLICITOR_GENERAL',
  'SOCIAL_DEVELOPMENT_AND_POVERTY_REDUCTION',
  'TOURISM_ARTS_CULTURE_AND_SPORT',
  'TRANSPORTATION_AND_INFRASTRUCTURE',
  'HOUSING',
  'EMERGENCY_MANAGEMENT_AND_CLIMATE_READINESS',
];
const roleDropdownOptions = [
  'PROGRAM_MANAGER',
  'DIRECTOR',
  'EX_DIRECTOR',
  'MCIO',
  'ADM',
];

/**
 * sub page containing specific selectors and methods for a specific page
 */
class submitPage extends Page {
  /**
   * define selectors using getter methods
   */
  get Ministrylabel() {
    return $("//label[contains(text(),'Ministry')]/../div/select");
  }
  get Titlelabel() {
    return $("//label[contains(text(),'Title')]/following-sibling::input");
  }
  get Branchlabel() {
    return $("//label[contains(text(),'Branch')]/following-sibling::input");
  }
  get LeadNamelabel() {
    return $(
      "//label[contains(text(),'Initiative lead name')]/following-sibling::input",
    );
  }
  get LeadTitlelabel() {
    return $(
      "//label[contains(text(),'Initiative lead title')]/following-sibling::input",
    );
  }
  get LeadEmaillabel() {
    return $(
      "//label[contains(text(),'Initiative lead email')]/following-sibling::input",
    );
  }
  get initiativeText() {
    return $("//h3[contains(text(),'Initiative Details')]/../div//textarea");
  }
  get scopeText() {
    return $(
      "//section/div/p/strong[contains(text(),'What is the scope of the PIA?')]/../..//textarea",
    );
  }
  get dataText() {
    return $(
      "//section/div/p/strong[contains(text(),'What are the data or information elements involved in your initiative?')]/../..//textarea",
    );
  }
  get labelsNo() {
    return $("//label[contains(text(),'No')]");
  }
  get labelsYes() {
    return $("//label[contains(text(),'Yes')]");
  }
  get searchBar() {
    return $('//input[@placeholder="Search by title or drafter"]');
  }
  get searchBtn() {
    return $(
      '//button[@class="search-icon-container bcgovbtn bcgovbtn__primary bcgovbtn__primary-search search-icon-container"]',
    );
  }
  get reviewText() {
    return $(
      "//textarea[contains(@class, 'w-50') and contains(@class, 'h-100')]",
    );
  }
  get roleLabel() {
    return $(
      "//label[contains(text(),'Select a role from the list')]/../div/select",
    );
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */

  async intakeForm(form) {
    console.log('Check the elements availability ');
    if (form == 'first') {
      await this.Ministrylabel.waitForDisplayed();
      await this.Ministrylabel.waitForClickable();
      await this.Titlelabel.waitForDisplayed();
      await this.Titlelabel.waitForClickable();
      await this.Branchlabel.waitForDisplayed();
      await this.Branchlabel.waitForClickable();
      await this.LeadNamelabel.waitForDisplayed();
      await this.LeadNamelabel.waitForClickable();
      await this.LeadTitlelabel.waitForDisplayed();
      await this.LeadTitlelabel.waitForClickable();
      await this.LeadEmaillabel.waitForDisplayed();
      await this.LeadEmaillabel.waitForClickable();
    }
  }

  async setScenario() {
    console.log('Set Scenario variable ');
    var date = new Date();
    scenario =
      date.getFullYear() +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      ('0' + date.getDate()).slice(-2) +
      ('0' + date.getHours()).slice(-2) +
      ('0' + date.getMinutes()).slice(-2) +
      ('0' + date.getSeconds()).slice(-2);
  }

  async savedAt() {
    console.log('Check Saved At functionality ');
    await browser.pause(5000);
    const savedAtButton = await $("//span[contains(text(),'Saved at')]");
    await savedAtButton.waitForDisplayed({ timeout: 2000 });
  }

  async CheckPara(paragraph) {
    const newParaClass = paraNorm + paragraph + "')]";
    const nextSteps = await $(newParaClass);
    await browser.pause(2000);
    await nextSteps.waitForExist();
    await expect(nextSteps).toBeDisplayed();
  }

  async searchTitle() {
    console.log('Latest Title ' + Title);
    await this.searchBar.waitForExist();
    await this.searchBar.setValue(Title);
    await this.searchBtn.waitForClickable();
    await this.searchBtn.click();
    await browser.pause(2000);
  }

  async enterValue(value) {
    console.log('Enter value ' + value);
    if (value == 'Title') {
      Title = 'Title_' + scenario;
      await this.Titlelabel.setValue(Title);
    }
    if (value == 'Branch') {
      Branch = 'Branch123#$%_' + scenario;
      await this.Branchlabel.setValue(Branch);
    }
    if (value == 'Lead Name') {
      LeadName = 'Lead Name123#$%_' + scenario;
      await this.LeadNamelabel.scrollIntoView();
      await this.LeadNamelabel.setValue(LeadName);
    }
    if (value == 'Lead Title') {
      LeadTitle = 'Lead Title123#$%_' + scenario;
      await this.LeadTitlelabel.setValue(LeadTitle);
    }
    if (value == 'Lead Email') {
      LeadEmail = 'Lead Email123#$%_' + scenario;
      await this.LeadEmaillabel.setValue(LeadEmail);
    }
    if (value == 'Ministry') {
      const random = Math.floor(Math.random() * (dropdown.length - 1));
      await this.Ministrylabel.selectByAttribute('value', dropdown[random]);
    }
    if (value == 'Initiative Details') {
      await this.initiativeText.waitForDisplayed();
      await this.initiativeText.scrollIntoView();
      await browser.setWindowSize(940, 180);
      await this.initiativeText.waitForExist();
      await this.initiativeText.setValue(
        'Describe your initiative in enough detail that a reader who knows nothing about your work will understand the purpose of your initiative and who your partners and other stakeholders are. Describe what you’re doing, how it works, who is involved and when or how long your initiative runs.123#$%',
      );
    }
    if (value == 'Scope Text') {
      await this.scopeText.scrollIntoView();
      await browser.setWindowSize(940, 180);
      await this.scopeText.waitForExist();
      await this.scopeText.setValue(
        'Your initiative might be part of a larger one or might be rolled out in phases. What part of the initiative is covered by this PIA? What is out of scope of this PIA?123#$%',
      );
    }
    if (value == 'Data Text') {
      await this.dataText.scrollIntoView();
      await browser.setWindowSize(940, 500);
      await this.dataText.waitForExist();
      await this.dataText.setValue(
        'Please list all the elements of information or data that you might collect, use, store, disclose, or access as part of your initiative. If your initiative involves large quantities of information or datasets, you can list categories or other groupings of personal information in a table below or in an appendix.123#$%',
      );
    }
    if (value == 'Personal information as No') {
      await this.labelsNo.scrollIntoView();
      await browser.setWindowSize(940, 700);
      await this.labelsNo.waitForExist();
      await this.labelsNo.click();
    }
    if (value == 'Personal information as Yes') {
      await this.labelsYes.scrollIntoView();
      await browser.setWindowSize(940, 800);
      await this.labelsYes.waitForExist();
      await this.labelsYes.click();
    }
    if (value == 'Review Note') {
      await this.reviewText.scrollIntoView();
      await this.reviewText.waitForExist();
      await this.reviewText.setValue('MPO Review Confirmed');
    }
    if (value == 'role') {
      const random = Math.floor(
        Math.random() * (roleDropdownOptions.length - 1),
      );
      await this.roleLabel.scrollIntoView();
      await this.roleLabel.selectByAttribute(
        'value',
        roleDropdownOptions[random],
      );
    }
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open('submitPIA');
  }
}

module.exports = new submitPage();
