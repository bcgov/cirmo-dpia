Feature: Login and check the HomePage

  Scenario Outline: As <role> user, I am able to verify if List of PIA exists

    Given I am on the login page
    And I click on "Log in with IDIR" button
    When I login with user <username> having role <role>
    Then Check "List of PIAs" tab is displayed

    Examples:
      | username | role    |
      | DORGALE  | MPO     | 
      | DOND     | Drafter | 
      | ANDYA    | CPO     | 

  Scenario Outline: As <role> user, I am able to verify if Create tab exists

    Given I am on the login page
    And I click on "Log in with IDIR" button
    When I login with user <username> having role <role>
    Then Check "Create new" tab is displayed

    Examples:
      | username | role    |
      | DORGALE  | MPO     | 
      | DOND     | Drafter | 
      | ANDYA    | CPO     |
  
  Scenario Outline: As <role> user, I am able to verify List of PIA pagination

    Given I am on the login page
    And I click on "Log in with IDIR" button
    When I login with user <username> having role <role>
    And I click on "List of PIAs" tab
    Then Verify List of PIA pagination

    Examples:
      | username | role    |
      | DORGALE  | MPO     | 
      | DOND     | Drafter | 
      | ANDYA    | CPO     |
    