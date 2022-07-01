import {Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
Given('User navigates in google', function () {
  cy.visit('https://www.google.es/')
  cy.get('button[id="L2AGLb"]').click()
});
When('User fills out the searcher', function () {
  cy.get('input[name="q"]')
  .should('be.visible')
  .type('Orange Bank')
  .should('have.value','Orange Bank')
  .type('{enter}')
});
Then('User sees the results', function () {
  cy.screenshot().get('div[id="result-stats"]').invoke('text').then(($div) => {
    var number = $div.match( /(\d.)*\d/g)
    if(number!=null){
      return parseInt(number[0].replaceAll(".",""))
    }
  }).then(($numb)=>{    
    if($numb>100000){
      return true
    }
    if($numb<10000){
      return false
    }
  }).should('equal', true)
});