Feature: UTOPIA-580 Log out of DPIA
  
  Scenario Outline: As <role> user, I am able to sign out successfully

    Given I am on the login page
    And I click on "Log in with IDIR" button
    When I login with user <username> having role <role>
    And I click on "Sign Out" Button
    And I click on "Cancel" button
    Then I see "Sign Out" Button


    Examples:
      | username | role    |
      | DORGALE  | MPO     |
      | DOND     | Drafter |
      | ANDYA    | CPO     |

  Scenario Outline: As <role> user, I am able to sign out successfully

    Given I am on the login page
    And I click on "Log in with IDIR" button
    When I login with user <username> having role <role>
    Then I sign out successfully

    Examples:
      | username | role    |
      | DORGALE  | MPO     |
      | DOND     | Drafter |
      | ANDYA    | CPO     |
