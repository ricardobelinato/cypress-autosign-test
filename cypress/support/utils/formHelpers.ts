export function encontrarLabelPorTexto(doc: Document, textoProcurado: string): HTMLLabelElement | undefined {
    return Array.from(doc.querySelectorAll("label")).find((el) =>
      el.textContent?.includes(textoProcurado)
    );
};

export function marcarRadioSeExistir(valor: string) {
    cy.get("body").then(($body) => {
      if ($body.find(`input[type="radio"][value="${valor}"]`).length > 0) {
        cy.get(`input[type="radio"][value="${valor}"]`, { log: false })
          .should("be.visible")
          .check({ force: true });
      }
    });
};

export function aceitarPoliticaPrivacidade() {
    cy.get("strong", { log: false }).then(($elements) => {
      const $politica = $elements.filter((_, el) =>
        el.innerText.includes("Política de Privacidade")
      );
  
      if ($politica.length > 0) {
        cy.wrap($politica)
          .parents("div.form-group")
          .find('input[type="checkbox"]')
          .should("be.visible")
          .check({ force: true });
      } else {
        cy.log("Política de Privacidade não encontrada, seguindo o fluxo normalmente.");
      }
    });
};

export function exibirCamposOcultos() {
    cy.get('.fields-hidden, .ps-input-hidden', { timeout: 5000 }).should('exist');
  
    cy.window().then((win) => {
      const classesParaRemover = ['fields-hidden', 'ps-input-hidden'];
  
      classesParaRemover.forEach((classe) => {
        Array.from(win.document.getElementsByClassName(classe)).forEach((el) =>
          el.classList.remove(classe)
        );
      });
    });
};
  