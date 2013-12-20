 
 Feature: Example of using a URL that has Authentication
 
   Scenario: "I visit url then verify I pass the Authentication popup"
     Given I am on "/tr/home"
     Given I wait for "20" seconds
     Then I should see "Videolar"
     Given I wait
     Given I wait
