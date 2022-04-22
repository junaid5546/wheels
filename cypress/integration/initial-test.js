/// <reference types="cypress" />
describe('web App testing', () =>{
    beforeEach(()=>{
        cy.viewport('iphone-4')
    })
    it('Landing Page works', ()=>{
        cy.visit('http://localhost:8100');
    })
})