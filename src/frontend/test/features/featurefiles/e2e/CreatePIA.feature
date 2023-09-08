Feature: UTOPIA-566 Create new PIA
 
  Scenario Outline: As <role> user, I am able to click Start PIA Intake

    Given I am on the login page
    And I click on "Log in with IDIR" button
    When I login with user <username> having role <role>
    And I am able to click link "Create new"
    And I am able to click link "Start PIA Intake"
    Then I am able to verify intakeURL


    Examples:
      | username | role    |
      | DORGALE  | MPO     |
      | DOND     | Drafter |
      | ANDYA    | CPO     |
 
 Scenario Outline: As <role> user, I am able to click Start PPQ intake

    Given I am on the login page
    And I click on "Log in with IDIR" button
    When I login with user <username> having role <role>
    And I am able to click link "Create new"
    And I am able to click link "Start PPQ"
    Then I am able to verify PPQURL


    Examples:
      | username | role    |
      | DORGALE  | MPO     |
