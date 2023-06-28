Feature: UTOPIA-584 Drafter: Search, sort, filter list of PIAs

   Scenario Outline: As a <role> user, I am able to verify sort of "Last modified" column in descending order

     Given I am on the login page
     And I click on "Log in with IDIR" button
     When I login with user <username> having role <role>
     Then I am able to sort "Last modified" in "descending" order

     Examples:
      | username | role    |
      | DORGALE  | MPO     |
      | DOND     | Drafter |
      | ANDYA    | CPO     |

   Scenario Outline: As a <role> user, I am able to verify sort of "Last modified" column in ascending order

     Given I am on the login page
     And I click on "Log in with IDIR" button
     When I login with user <username> having role <role>
     Then I am able to sort "Last modified" in "ascending" order

     Examples:
      | username | role    |
      | DORGALE  | MPO     |
      | DOND     | Drafter |
      | ANDYA    | CPO     |

   Scenario Outline: As a <role> user, I am able to verify sort of "Drafter" column in ascending order 

     Given I am on the login page
     And I click on "Log in with IDIR" button
     When I login with user <username> having role <role>
     Then I am able to sort "Drafter" in "ascending" order

     Examples:
      | username | role    |
      | DORGALE  | MPO     |   
      | DOND     | Drafter |
      | ANDYA    | CPO     |

   Scenario Outline: As a <role> user, I am able to verify sort of "Drafter" column in descending order 

     Given I am on the login page
     And I click on "Log in with IDIR" button
     When I login with user <username> having role <role>
     Then I am able to sort "Drafter" in "descending" order

     Examples:
      | username | role    |
      | DORGALE  | MPO     |   
      | DOND     | Drafter |
      | ANDYA    | CPO     |
