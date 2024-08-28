const { URL } = require('../../e2e/UnipamPreSpec.cy');

describe('Escolha de PS', module.exports = () => {
  it('passes', () => {
    cy.visit(URL())

    cy.get('mat-select#mat-select-0').click()
    cy.get('mat-option').eq(0).click()

    cy.get('button.mat-raised-button.mat-button-base.mat-primary').should('be.visible').click()
  })
})