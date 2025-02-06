describe("Segundo passo da inscrição", () => {
  beforeEach(() => {
    cy.intercept({
      method: 'POST',
      pathname: '/api/applyment/getApplymentDataByStep/*',
    }).as('applymentLoading');
  });

  it("Leitura e preenchimento dos campos do segundo passo da inscrição", () => {
    cy.wait("@applymentLoading");
    cy.wait(1000)
    
    cy.contains("div", "Curso *")
      .parent()
      .find("input")
      .should('exist')
      .and("be.visible")
      .click();

    cy.get(
      "div.ps-comp-select-container-column.ps-auto-complete-option-container"
    )
      .should("be.visible")
      .find("span.ps-auto-complete-option-item")
      .first()
      .should("be.visible")
      .click();
  });

  it("Exibição de campos ocultos do segundo passo da inscrição", () => {
    cy.window().then((win) => {
      let i = 0;
      while (i < 10) {
        Array.from(
          win.document.getElementsByClassName("fields-hidden")
        ).forEach((e) => {
          e.classList.remove("fields-hidden");
        });
        Array.from(
          win.document.getElementsByClassName("ps-input-hidden")
        ).forEach((e) => {
          e.classList.remove("ps-input-hidden");
        });

        i++;
      }
    });
  });

  it("Conclusão do segundo passo da inscrição", () => {
    cy.contains("button", "Avançar").should("be.visible").click();
  });
});
