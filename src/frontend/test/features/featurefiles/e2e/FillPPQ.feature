Feature: UTOPIA-616 Fill a PPQ

  Scenario Outline: As <role> user, I am able to verify all the checkboxes

    Given I am on the login page
    And I click on "Log in with IDIR" button
    When I login with user <username> having role <role>
    And I am able to click link "Create new"
    And I am able to click link "Start PPQ"
    And I set scenario name
    And I enter "Title"
    And I enter "Ministry"
    And I check "Sensitive personal information" checkbox
    And I check "Common or integrated program agreement" checkbox
    And I check "Disclosure of personal information outside of Canada" checkbox
    And I check "Data-linking" checkbox
    And I check "Vendor or third-party access to personal information" checkbox
    And I check "BC Services Card Onboarding" checkbox
    And I check "Cloud technology" checkbox
    And I check "Artificial intelligence (AI) or machine learning" checkbox
    And I check "Potential public interest in the initiative" checkbox
    And I check "Partnership with non-ministry public bodies or other organizations" checkbox
    And I check "Other (Please provide additional details below)" checkbox

    Examples:
      | username | role    |
      | DORGALE  | MPO     |

       Scenario Outline: As <role> user, I am able to verify all the checkboxes


  Scenario Outline: As <role> user, I am able to verify all the checkboxes
   
    Given I am on the login page
    And I click on "Log in with IDIR" button
    When I login with user <username> having role <role>
    And I am able to click link "Create new"
    And I am able to click link "Start PPQ"
    And I set scenario name
    And I enter "Title"
    And I enter "Ministry"
    And I select random checkbox
    And I select a random date
    And I add data to text Area
    Then I click on "Submit" button
    And I am able to click link "Done"


    Examples:
      | username | role    |
      | DORGALE  | MPO     |
