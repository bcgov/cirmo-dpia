Feature: UTOPIA-711 AutoSave

  Scenario Outline: As <role> user, I am able to submit a valid form with all fields filled

    Given I am on the login page
    And I click on "Log in with IDIR" button
    When I login with user <username> having role <role>
    And I am able to click link "Create new"
    And I am able to click link "Start PIA Intake"
    And Check for createPIA "first" form
    And I set scenario name
    And I enter "Title"
    And Await SavedAt function
    


    Examples:
      | username | role    |
      | DORGALE  | MPO     |
      | DOND     | Drafter |
      | ANDYA    | CPO     |

