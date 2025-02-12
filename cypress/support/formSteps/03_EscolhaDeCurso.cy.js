import {
  gerarCPF,
  gerarDataNascimentoMaior,
  gerarDataNascimentoMenor,
} from "../dataGenerator";

const CPFAleatorio = gerarCPF();
let dataNascimento;
const { CANDIDATO } = require("../../config/configSpec");
const candidato = CANDIDATO();
const maioridadeCandidato = candidato.maioridade;
const deficienciaCandidato = candidato.deficiencia;

describe("Segundo passo da inscrição", () => {
  beforeEach(() => {
    cy.intercept({
      method: "POST",
      pathname: "/api/applyment/getApplymentDataByStep/*",
    }).as("applymentLoading");
  });

  before(() => {
    if (maioridadeCandidato) {
      dataNascimento = gerarDataNascimentoMaior();
    } else {
      dataNascimento = gerarDataNascimentoMenor();
    }
  });

  it("Leitura e preenchimento dos campos do segundo passo da inscrição", () => {
    cy.wait("@applymentLoading");
    cy.wait(1000);

    cy.contains("div", "Modalidade *").then(($div) => {
      if ($div.length > 0) {
        cy.wrap($div)
          .parent()
          .find("input")
          .should("exist")
          .and("be.visible")
          .click();
      } else {
        cy.log("A div Modalidade * não existe na página.");
      }
    });

    cy.get(
      "div.ps-comp-select-container-column.ps-auto-complete-option-container"
    )
      .should("be.visible")
      .find("span.ps-auto-complete-option-item")
      .first()
      .should("be.visible")
      .click();
    
    cy.wait(1000);

    cy.contains('label', 'Data de nascimento *').should('be.visible').parent().find('input').eq(1).type(dataNascimento + "{enter}", { force: true });
  
    cy.document().then((doc) => {
      const labels = [
        { text: "CPF *", value: CPFAleatorio },
        { text: "Média de notas do ENEM *", value: '900' },
        { text: "Instituição superior de origem", value: 'teste' },
        { text: "Curso de origem *", value: 'teste' },
      ];

      labels.forEach((labelObj) => {
        const label = Array.from(doc.querySelectorAll("label")).find((el) =>
          el.textContent.includes(labelObj.text)
        );
        if (label) {
          cy.wrap(label)
            .parent()
            .find("input")
            .filter(":visible")
            .first()
            .then((input) => {
              cy.log(labelObj.value)
              cy.wrap(input).invoke("val", labelObj.value).trigger("input").trigger("change");
            });
        } else {
          cy.log(`O label "${labelObj.text}" não existe no DOM`);
        }
      });
    });

    if (deficienciaCandidato) {
      cy.contains('label', 'Possui alguma deficiência? *').next().find('label').contains('Sim').click();
      cy.contains('span', 'Auditiva').click();
    }
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
    cy.get('button')
      .contains(/Avançar|Concluir/)
      .should("be.visible")
      .click({ force: true }
    );
  });
});
