Feature: UTOPIA-581 Authenticated user access
 
  Scenario Outline: As <role> user, I am able to access app in same browser window

    Given I am on the login page
    And I click on "Log in with IDIR" button
    When I login with user <username> having role <role>
    And I paste landing page URL in same browser
    And I am able to click link "Access App"
    Then I am able to verify title


    Examples:
      | username | role    |
      | DORGALE  | MPO     |
      | DOND     | Drafter |
      | ANDYA    | CPO     |
 
  Scenario Outline: As <role> user, I am able to access app in new browser window

    Given I am on the login page
    And I click on "Log in with IDIR" button
    When I login with user <username> having role <role>
    And I paste landing page URL in new browser
    And I am able to click link "Access App"
    Then I am able to verify title


    Examples:
      | username | role    |
      | DORGALE  | MPO     |
      | DOND     | Drafter |
      | ANDYA    | CPO     |
