describe('web App testing', () =>{
    beforeEach(()=>{
        cy.viewport('iphone-4')
    })
    it('shows the landing page', ()=>{
        cy.visit('http://localhost:8100');
        cy.contains('The Digital Mall');
        cy.wait(500, { log: false })
            cy.get('ion-tab-button').eq(1).click()
            cy.wait(500, { log: false })
        cy.contains('Vehicles').click();
        cy.wait(500, { log: false })
        cy.contains('NEXT').click();
        cy.wait(500,{log:false});
        cy.contains("Toyota").click();
        cy.wait(500,{log:false});
        cy.contains("Camry").click();
        cy.wait(500,{log:false});
        cy.contains("xli").click();
        cy.wait(500,{log:false});
        cy.contains("20001").click();
        cy.wait(500,{log:false});
        cy.contains("Used").click();
        cy.wait(500,{log:false});
        cy.contains("sedan").click();
        cy.wait(500,{log:false});
        cy.contains("EC9900").click();
        cy.wait(500,{log:false});
        cy.contains("1").click();
        cy.wait(500,{log:false});
        cy.contains("big").click();
    })
})