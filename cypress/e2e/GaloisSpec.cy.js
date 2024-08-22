describe('template spec', () => {
  it('passes', () => {
    cy.visit('portal.apprbs.com.br/galoishmv')

    cy.get('mat-select#mat-select-0').click()
    cy.get('mat-option').eq(0).click()
    // cy.get('.mat-option').contains('Captação 2024: Modelo Rubeus').click()
    // cy.get('mat-select#mat-select-0').should('have.text', 'Captação 2024: Modelo Rubeus')
    

    cy.get('button.mat-raised-button.mat-button-base.mat-primary').should('be.visible').click()
  })
})