@login
Feature: login

  Background:
    Given Open "Google Chrome" browser with "http://localhost:4200" url

  Scenario Outline: Login
    When Fill "<filed1>" element with "<value1>" value
    When Fill "<filed2>" element with "<value2>" value
    Then Click on "<button>" button
    Then Verify "<url>"

    Examples:
      | filed1    | value1                 | filed2 | value2       | button  | url                                   |
      | username  | rubenghalayan@mail.ru  | pass   | qwerty7      | login   | http://localhost:4200/home            |
      | username  | rubenghalaya1@mail.ru  | pass   | qweqty7      | login   | http://localhost:4200/login-register  |

  Scenario Outline: Register
    When Click on "<button>" button
    When Fill "<filed3>" element with "<value3>" value
    When Fill "<filed4>" element with "<value4>" value
    When Fill "<filed5>" element with "<value5>" value
    When Fill "<filed6>" element with "<value6>" value
    Then Click on "<button1>" button
    Then Verify "<url1>"

    Examples:
      | filed3    | value3    | filed4  | value4        | filed5  | value5  |  filed6  | value6  | button1  | url1                                   | button      | 
      | regname   | name      | email   | email@mail.ru | regPass | qwerty7 |  repeat  | qwerty7 | next     | http://localhost:4200/login-register   | register    |
      | regname   | name      | email   | rmaql@mail.ru | regPass | qwerty7 |  repeat  | qwerty7 | next     | http://localhost:4200/home             | register    |
  

