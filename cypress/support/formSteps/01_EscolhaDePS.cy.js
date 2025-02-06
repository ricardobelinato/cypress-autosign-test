const { CONFIG } = require('../../config/configSpec');
const config = CONFIG();

describe('Escolha de PS', () => {
  before(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
  });

  beforeEach(() => {
    cy.intercept({
      method: 'POST',
      pathname: '/api/applyment/',
    }).as('pageLoading');

    cy.intercept({
      method: 'POST',
      pathname: '/api/applyment/getApplymentDataByStep/*',
    }).as('applymentLoading');

    cy.intercept({
      method: "POST",
      pathname: "/api/getOffersAllowed",
    }).as("getOffersAllowedLoading");
  })

  it('Navega para a URL', () => {
    cy.visit(config.url);
    cy.wait('@pageLoading');
  });

  it('Interação com mat-selector, escolha do processo seletivo', () => {
    cy.get('mat-select#mat-select-0').should('be.visible').click();
    cy.get('mat-option').eq(config.ps).should('be.visible').click();

    cy.get('button.mat-raised-button.mat-button-base.mat-primary').should('be.visible').click();
    cy.wait('@applymentLoading');
  });
});