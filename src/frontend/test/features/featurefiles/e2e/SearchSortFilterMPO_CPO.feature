Feature: UTOPIA-591 MPO and CPO: Search, sort, filter list of PIAs

   Scenario Outline: As a <role> user, I am able to verify sort of "Last modified" column in descending order

     Given I am on the login page
     And I click on "Log in with IDIR" button
     When I login with user <username> having role <role>
     Then I am able to sort "Last modified" in "descending" order

     Examples:
      | username | role    |
      | DORGALE  | MPO     |
      | ANDYA    | CPO     |

   Scenario Outline: As a <role> user, I am able to verify sort of "Last modified" column in ascending order

     Given I am on the login page
     And I click on "Log in with IDIR" button
     When I login with user <username> having role <role>
     Then I am able to sort "Last modified" in "ascending" order

     Examples:
      | username | role    |
      | DORGALE  | MPO     |
      | ANDYA    | CPO     |

   Scenario Outline: As a <role> user, I am able to verify sort of "Drafter" column in ascending order 

     Given I am on the login page
     And I click on "Log in with IDIR" button
     When I login with user <username> having role <role>
     Then I am able to sort "Drafter" in "ascending" order

     Examples:
      | username | role    |
      | DORGALE  | MPO     |   
      | ANDYA    | CPO     |

   Scenario Outline: As a <role> user, I am able to verify sort of "Drafter" column in descending order 

     Given I am on the login page
     And I click on "Log in with IDIR" button
     When I login with user <username> having role <role>
     Then I am able to sort "Drafter" in "descending" order

     Examples:
      | username | role    |
      | DORGALE  | MPO     |   
      | ANDYA    | CPO     |

      

   Scenario Outline: As a <role> user, I am able to verify filter 

     Given I am on the login page
     And I click on "Log in with IDIR" button
     When I login with user <username> having role <role>
     Then I click on the filter "Any Status" and select "Drafting in Progress"
     And Verify if the status is only "Drafting in Progress"

     Examples:
      | username | role    |
      | DORGALE  | MPO     |   
      | ANDYA    | CPO     |

   Scenario Outline: As a <role> user, I am able to verify filter by Different ministries

     Given I am on the login page
     And I click on "Log in with IDIR" button
     When I login with user <username> having role <role>
     Then I click on the filter "Any Ministry" and select "Agriculture and Food"
     Then I enter "SearchTestData" in searchbar
     And Verify if the PIAtitle is "SearchTestData"

     Examples:
      | username | role    |
      | DORGALE  | MPO     |   
      | ANDYA    | CPO     |

  
   Scenario Outline: As a <role> user, I am able to verify filter by "Only my PIAs"

     Given I am on the login page
     And I click on "Log in with IDIR" button
     When I login with user <username> having role <role>
     Then I click on the filter "Any drafter" and select "Only my PIAs"
     And Verify the drafter <role>

     Examples:
      | username | role    |
      | DORGALE  | MPO     |   
      | ANDYA    | CPO     |

  
   Scenario Outline: As a <role> user, I am able to verify filter by "Exclude my PIAs"

     Given I am on the login page
     And I click on "Log in with IDIR" button
     When I login with user <username> having role <role>
     Then I click on the filter "Any drafter" and select "Exclude my PIAs"
     And Verify that <role> is excluded

     Examples:
      | username | role    |
      | DORGALE  | MPO     |   
      | ANDYA    | CPO     |

  Scenario Outline: As a <role> user, I am able to verify search 

     Given I am on the login page
     And I click on "Log in with IDIR" button
     When I login with user <username> having role <role>
     Then I enter "SearchTestData" in searchbar
     And Verify if the title is "SearchTestData"

     Examples:
      | username | role    |
      | DORGALE  | MPO     |   
      | ANDYA    | CPO     |

  Scenario Outline: As a <role> user, I am able to verify search with filter

     Given I am on the login page
     And I click on "Log in with IDIR" button
     When I login with user <username> having role <role>
     Then I click on the filter "Any Status" and select "Drafting in Progress"
     Then I enter "SearchTestData" in searchbar
     And Verify if the title is "SearchTestData"

     Examples:
      | username | role    |
      | DORGALE  | MPO     |   
      | ANDYA    | CPO     |


  Scenario Outline: As a <role> user, I am able to verify clear search

     Given I am on the login page
     And I click on "Log in with IDIR" button
     When I login with user <username> having role <role>
     Then I click on the filter "Any Status" and select "Drafting in Progress"
     Then I enter "SearchTestData" in searchbar
     And Verify if the title is "SearchTestData"
     And I click on "Clear search" button
     And Verify if the status is only "Drafting in Progress"


     Examples:
      | username | role    |
      | DORGALE  | MPO     |   
      | ANDYA    | CPO     |
