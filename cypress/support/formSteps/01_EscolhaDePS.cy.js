const { CONFIG } = require('../../config/configSpec');

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
  })

  it('Navega para a URL', () => {
    cy.visit(CONFIG().url);
    cy.wait('@pageLoading');
  });

  it('Remove a tag script duplicada do tracking no body', () => {
    cy.document().then((doc) => {
      const scriptToRemoveBody = doc.querySelector('body script[src="https://tracking.apprubeus.com.br/libs/RBTracking.min.js?rbclicod=aRqQCldPocOJ4hUr5nno"]');
      if (scriptToRemoveBody) {
        scriptToRemoveBody.remove();
      }
    });
  });

  it('Interação com mat-selector, escolha do processo seletivo', () => {
    cy.get('mat-select#mat-select-0').should('be.visible').click();
    cy.get('mat-option').eq(CONFIG().ps).should('be.visible').click();

    cy.get('button.mat-raised-button.mat-button-base.mat-primary').should('be.visible').click();
    cy.wait('@applymentLoading');
  });
});