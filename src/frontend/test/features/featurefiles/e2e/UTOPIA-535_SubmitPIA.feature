Feature: UTOPIA-535 Submit a PIA for MPO review

  Scenario Outline: As <role> user, I am able to submit a valid form with all fields filled

    Given I am on the login page
    And I click on "Log in with IDIR" button
    When I login with user <username> having role <role>
    And I am able to click link "Create new"
    And I am able to click link "Start PIA Intake"
    And Check for createPIA "first" form
    And I set scenario name
    And I enter "Title"
    And I enter "Branch"
    And I enter "Lead Name"
    And I enter "Lead Title"
    And I enter "Lead Email"
    And I enter "Ministry"
    And Await SavedAt function
    And I enter "Initiative Details"
    And I enter "Scope Text"
    And I enter "Data Text"
    And I enter "Personal information as No"
    And Await SavedAt function 
    Then I click on "Submit" button
    And I see "Are you sure you want to submit your PIA intake?"
    


    Examples:
      | username | role    |
      | DORGALE  | MPO     |
      # | DOND     | Drafter |
      # | ANDYA    | CPO     |


 Scenario Outline: As <role> user, I am able to submit a valid form with optional fields empty

    Given I am on the login page
    And I click on "Log in with IDIR" button
    When I login with user <username> having role <role>
    And I am able to click link "Create new"
    And I am able to click link "Start PIA Intake"
    And Check for createPIA "first" form
    And I set scenario name
    And I enter "Title"
    And I enter "Branch"
    And I enter "Ministry"
    And Await SavedAt function
    And I enter "Initiative Details"
    And I enter "Personal information as No"
    And Await SavedAt function 
    Then I click on "Submit" button
    And I see "Are you sure you want to submit your PIA intake?"
    


    Examples:
      | username | role    |
      | DORGALE  | MPO     |
      # | DOND     | Drafter |
      # | ANDYA    | CPO     |


 Scenario Outline: As <role> user, I am not able to submit a form with no fields filled

    Given I am on the login page
    And I click on "Log in with IDIR" button
    When I login with user <username> having role <role>
    And I am able to click link "Create new"
    And I am able to click link "Start PIA Intake"
    And I set scenario name
    And I enter "Title"
    And Await SavedAt function
    Then I click on "Submit" button
    And I see "Error: Please select a ministry."
    And I see "Error: Please describe your initiative."
    
    


    Examples:
      | username | role    |
      | DORGALE  | MPO     |
      # | DOND     | Drafter |
      # | ANDYA    | CPO     |




 Scenario Outline: As <role> user, I am able to click on cancel button

    Given I am on the login page
    And I click on "Log in with IDIR" button
    When I login with user <username> having role <role>
    And I am able to click link "Create new"
    And I am able to click link "Start PIA Intake"
    And Check for createPIA "first" form
    And I set scenario name
    And I enter "Title"
    And I enter "Branch"
    And I enter "Lead Name"
    And I enter "Lead Title"
    And I enter "Lead Email"
    And I enter "Ministry"
    And Await SavedAt function
    And I enter "Initiative Details"
    And I enter "Scope Text"
    And I enter "Data Text"
    And I enter "Personal information as No"
    And Await SavedAt function 
    Then I click on "Submit" button
    Then I click on "cancel" button
    And Check for createPIA "first" form
    
    
    


    Examples:
      | username | role    |
      | DORGALE  | MPO     |
      # | DOND     | Drafter |
      # | ANDYA    | CPO     |