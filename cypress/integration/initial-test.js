/// <reference types="cypress" />
describe('web App testing', () =>{
    // VISIT MAIN PAGE
    before(()=>{
        cy.visit('http://localhost:8100');
    })
    // IPHONE VIEW
    beforeEach(()=>{
        cy.viewport('iphone-8');
    })

    // SELECTING COUNTRY CODE.
    it('Landing Page works', ()=>{

        cy.log('Loaded successfully');
        cy.get('ion-select').click().children().should('contain','+968');
        cy.contains('.alert-radio-label', '+968').click();
        cy.contains('OK').click();
        
    })

    // PHONE NUMBER
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


    // TYPING FIRST NAME
    it('Typing First Name', ()=>{
       cy.get("#firstname").click({force:true}).type('Muhammad')
    })

    // TYPING LAST NAME
    it('Typing Last name', ()=>{
        cy.get('#lastname').click({force:true}).type('Gul')
    })

    //  SELECTING DOB
    it('Selecting DOB', ()=> {
        cy.get('#dob-item').click();
        cy.contains('1').click();
        cy.contains('Jan').click();
        cy.contains('2002').click();
        cy.contains('Confirm').click();
    })

    // SEND OTP 
    it('Send OTP',()=>{
        cy.contains('Send OTP').click();
    })
})