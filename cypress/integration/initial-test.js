/// <reference types="cypress" />
describe('web App testing', () =>{
    beforeEach(()=>{
        cy.viewport('iphone-xr')
    })
    it('Landing Page works', ()=>{
        cy.visit('http://localhost:8100');
        
        cy.log('Loaded successfully');
        cy.get('ion-select').click().children().should('contain','+968');
        cy.contains('.alert-radio-label', '+968').click();
        cy.contains('OK').click();
    })

    it('Putting cell phone number', ()=>{
       cy.get('ion-item').should('have.class','item-inner').children('ion-input').first().type(9);
    })

})