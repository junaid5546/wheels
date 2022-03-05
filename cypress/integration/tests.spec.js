describe('web App testing', () =>{
    beforeEach(()=>{
        cy.viewport('iphone-4')
    })
    it('shows the landing page', ()=>{
        cy.visit('http://localhost:8100');
        cy.contains('The Digital Mall');
        cy.wait(1000, { log: false })
            cy.get('ion-tab-button').eq(1).click()
            cy.wait(1000, { log: false })
        cy.contains('Vehicles').click();
        cy.wait(1000, { log: false })
        cy.contains('NEXT').click();
        cy.wait(1000,{log:false});
    })
})