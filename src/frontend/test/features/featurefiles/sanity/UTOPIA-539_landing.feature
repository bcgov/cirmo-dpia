Feature: UTOPIA-539 Public DPIA Page

  Scenario: As a user, I am able to verify Generic header

    Given I am on the login page
    Then I am able to verify Landing page generic header

  Scenario: As a user, I am able to verify Login buttons

    Given I am on the login page
    Then I am able to verify Login buttons

  Scenario: As a user, I am able to verify Landing Page header

    Given I am on the login page
    Then I am able to verify Landing page header

  Scenario: As a user, I am able to verify learn PIA process link

    Given I am on the login page
    When I am able to click link "Learn about the current PIA process"
    Then I am able to verify the URL "Learn about the current PIA process"

  Scenario: As a user, I am able to verify Contact link

    Given I am on the login page
    Then I am able to click link "Contact " 
    

  Scenario: As a user, I am able to verify IDIR login page

    Given I am on the login page
    And I click on "Log in with IDIR" button
    Then I am able to verify the div "Log in to sfstest7.gov.bc.ca" 
    
      
  
  Scenario Outline: As a user, I am able to verify all details

    Given I am on the login page
    Then I am able to validate <questions>

    Examples:
      | questions                           |
      | What is a Privacy Impact Assessment |
      | Problem                             |
      | Hypothesis                          |
      | Vision                              |
