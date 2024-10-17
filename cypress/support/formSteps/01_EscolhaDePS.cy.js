const { CONFIG } = require('../../config/configSpec');

describe('Escolha de PS', module.exports = () => {
  it('Navega para a URL', () => {
    cy.visit(CONFIG().url);
  })

  it('Injeção do Tracking', () => {
    //Método 1
    // cy.window().then((win) => {
    //   const script = win.document.createElement('script');
    //   script.src = 'https://tracking.apprubeus.com.br/libs/RBTracking.min.js?rbclicod=aRqQCldPocOJ4hUr5nno';
    //   script.async = true;
    //   win.document.head.appendChild(script);
    // });

    //Método 2
    // cy.get('head').then(($head) => {
    //   const script = document.createElement('script');

    //   script.type = 'text/javascript';
    //   script.src = "https://tracking.apprubeus.com.br/libs/RBTracking.min.js?rbclicod=aRqQCldPocOJ4hUr5nno";
    //   script.async = true;

    //   $head[0].appendChild(script);
    //   document.head.appendChild(script);

    //   console.log($head[0]);
    //   console.log(document.head);
    // });
  })

  it('Interação com mat-selector, escolha do processo seletivo', () => {
    cy.get('mat-select#mat-select-0').click();
    cy.get('mat-option').eq(CONFIG().ps).click();

    cy.get('button.mat-raised-button.mat-button-base.mat-primary').should('be.visible').click();

    cy.get('app-client-loader div').should('exist');
    cy.get('app-client-loader div').should('not.exist');
    cy.wait(700);
  })
})