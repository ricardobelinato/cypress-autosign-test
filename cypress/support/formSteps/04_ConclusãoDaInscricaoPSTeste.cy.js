import {
  gerarCPF,
  gerarDataNascimentoMaior,
  gerarDataNascimentoMenor,
} from "../dataGenerator";

const CPFAleatorio = gerarCPF();
let dataNascimento;
const { CANDIDATO, CONFIG } = require("../../config/configSpec");
const candidato = CANDIDATO(), config = CONFIG();
const maioridadeCandidato = candidato.maioridade;
const deficienciaCandidato = candidato.deficiencia;
const SexoCandidato = candidato.sexo;

describe("Terceiro passo da inscrição", () => {
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
    Cypress.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('RBLib is not defined')) {
        return false;
      }
    });
    
    cy.wait("@applymentLoading");
    cy.wait(1000);

    cy.contains('label', 'Data de nascimento *').should('be.visible').parent().find('input').eq(1).type(dataNascimento + "{enter}", { force: true });
  
    cy.document().then((doc) => {
      const labels = [
        { text: "CPF *", value: CPFAleatorio },
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
              cy.wrap(input).invoke("val", labelObj.value).trigger("input", { force: true }).trigger("change", { force: true });
            });
        } else {
          cy.log(`O label "${labelObj.text}" não existe no DOM`);
        }
      });
    });

    if (deficienciaCandidato) {
      cy.get('body').then(($body) => {
        if ($body.find('label:contains("Possui alguma deficiência?")').length > 0) {
          cy.contains('label', 'Possui alguma deficiência? *')
            .next().find('label').contains('Sim').click();

          cy.contains('span', 'Auditiva').click();
        } else {
          cy.log('Não existe o campo de deficiência.');
        }
      });
    }
  });

  it("Marcação dos campos radio e checkbox", () => {
    cy.get("body").then(($body) => {
      if (
        $body.find(`input[type="radio"][value="${SexoCandidato}"]`).length > 0
      ) {
        cy.get(`input[type="radio"][value="${SexoCandidato}"]`, { log: false })
          .should("be.visible")
          .check({ force: true });
      }
    });
  });

  if (config.validarCamposOcultos) {    
    it("Exibição de campos ocultos do terceiro passo da inscrição", () => {
      cy.wait(1000)
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
  }

  it("Conclusão do terceiro passo da inscrição", () => {
    cy.contains('button', 'Concluir')
      // .should("be.visible")
      .click({ force: true }
    );
  });
});
