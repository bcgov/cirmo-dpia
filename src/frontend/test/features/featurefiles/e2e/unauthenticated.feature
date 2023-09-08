Feature: UTOPIA-582 Unauthenticated user access
 
  Scenario Outline: As <role> user, I am able to access app in same browser window

    Given I am on the login page
    And I click on "Log in with IDIR" button
    When I login with user <username> having role <role>
    And I get the currentURL of the page
    And I sign out successfully
    And I paste retrieved URL in new browser
    Then I get "401: Authorization required" error


    Examples:
      | username | role    |
      | DORGALE  | MPO     |
      | DOND     | Drafter |
      | ANDYA    | CPO     |
