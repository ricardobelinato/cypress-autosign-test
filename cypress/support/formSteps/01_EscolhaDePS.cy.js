const { CONFIG } = require('../../config/configSpec');

describe('Escolha de PS', () => {
  before(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
  });

  it('Navega para a URL', () => {
    cy.visit(CONFIG().url);
  })

  it('Remove a tag script duplicada do tracking no body', () => {
    cy.wait(500);
    cy.document().then((doc) => {
      const scriptToRemoveBody = doc.querySelector('body script[src="https://tracking.apprubeus.com.br/libs/RBTracking.min.js?rbclicod=aRqQCldPocOJ4hUr5nno"]');
      if (scriptToRemoveBody) {
        scriptToRemoveBody.remove();
      }
    });
  })

  it('Injeção do Tracking', () => {
    //Método 1
    // cy.window().then((win) => {
    //   const script = win.document.createElement('script');
    //   script.src = `https://tracking.apprubeus.com.br/libs/RBTracking.min.js?rbclicod=${CONFIG().rbclicod}`;
    //   script.async = true;
    //   win.document.head.appendChild(script);
    // });

    // cy.window().then((win) => {
    //   const scripts = Array.from(win.document.head.getElementsByTagName('script'));
    //   const trackingScript = scripts.find(s => s.src.includes('RBTracking.min.js'));
    //   expect(trackingScript).to.exist; // Verifica se o script de tracking está presente
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
  })

  it('Carregamento do loading', () => {
    cy.get('app-client-loader div').should('exist');
    cy.get('app-client-loader div').should('not.exist');
    cy.wait(700);
  })

})