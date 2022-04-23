/// <reference types="cypress" />
describe('web App testing', () =>{
    before(()=>{
        cy.visit('http://localhost:8100');
    })
    beforeEach(()=>{
        cy.viewport('iphone-8');
    })

    it('Landing Page works', ()=>{

        cy.log('Loaded successfully');
        cy.get('ion-select').click().children().should('contain','+968');
        cy.contains('.alert-radio-label', '+968').click();
        cy.contains('OK').click();
        
    })

    it('Typing phonen number', ()=>{
        
        cy.log('Putting Phone Numnber')
        cy.get('ion-item').should('have.class','item-inner').each(($el)=>{
            //cy.log($el);
            let a = Math.floor(Math.random() * 9);
             cy.get($el).click().type(a);
         })

         /*cy.get('ion-item').should('have.class','item-inner').its('length').then((numberOfItems) => {
            for (var i = numberOfItems-1; i>=0; i--) {
                cy.get('ion-item').eq(i).click({force:true}).type('{backspace}')
            }
          })*/
    })

    it('Typing First Name', ()=>{
       cy.get("#firstname").click({force:true}).type('Muhammad')
    })

    it('Typing Last name', ()=>{
        cy.get('#lastname').click({force:true}).type('Gul')
    })

    it('Selecting DOB', ()=> {
        cy.get('#dob-item').click();
        cy.contains('1').click();
        cy.contains('Jan').click();
        cy.contains('2002').click();
        cy.contains('Confirm').click();
    })
    

    

})