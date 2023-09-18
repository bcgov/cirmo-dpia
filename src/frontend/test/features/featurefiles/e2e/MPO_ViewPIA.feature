Feature: UTOPIA-631 MPO:View PIA details

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
    And I click on "Active PIAs" tab
    And Search with title
    And Verify if the status is only "Incomplete"
  
    


    Examples:
      | username | role    |
      | DORGALE  | MPO     |
    

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
    And I enter "Personal information as Yes"
    And Await SavedAt function 
    Then I click on "Submit" button
    And I see "Are you sure you want to submit your PIA intake?"
    Then I click on "Yes, submit" button
    Then I click on "Save" button
    Then I click on "Submit" button
    Then I click on "Yes, submit" button
    And I click on "Active PIAs" tab
    And Search with title
    And Verify if the status is only "MPO Review"
  
    


    Examples:
      | username | role    |
      | DORGALE  | MPO     |
    
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
    And I enter "Personal information as Yes"
    And Await SavedAt function 
    Then I click on "Submit" button
    And I see "Are you sure you want to submit your PIA intake?"
    Then I click on "Yes, submit" button
    Then I click on "Save" button
    Then I click on "Submit" button
    Then I click on "Yes, submit" button
    And I am able to click link "Review"
    Then I click on "Add a role" button 
    And I enter "role"
    Then I click on "Add" button
    Then I click on "Edit review" button
    And I click with name "Review Acknowledgement" checkbox
    And I enter "Review Note"
    Then I click on "Confirm" button
    Then I click on "Submit" button
    Then I click on "Yes, submit" button
    And I click on "Active PIAs" tab
    And Search with title
    And Verify if the status is only "CPO Review"
  


    Examples:
      | username | role    |
      | DORGALE  | MPO     |