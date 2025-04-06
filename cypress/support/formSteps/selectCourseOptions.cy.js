import {
  gerarNomeESobrenome,
  gerarNomeCompleto,
  gerarEmail,
  gerarCelular,
  gerarCPF,
  gerarDataNascimentoMaior,
  gerarDataNascimentoMenor,
} from "../utils/dataGenerator";

const { nomeAleatorio, sobrenomeAleatorio } = gerarNomeESobrenome();
const nomeCompletoAleatorio = gerarNomeCompleto(
  nomeAleatorio,
  sobrenomeAleatorio
);

const emailAleatorio = gerarEmail(nomeAleatorio, sobrenomeAleatorio);
const celularAleatorio = gerarCelular();
const CPFAleatorio = gerarCPF();
let dataNascimento;
const { CANDIDATO, CONFIG } = require("../../config/configSpec");
const candidato = CANDIDATO(), config = CONFIG();
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
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    
    cy.wait("@applymentLoading");
    cy.wait(2000);

    cy.get('div', { log: false }).then(($elements) => {
      const $Modalidade = $elements.filter((_, el) => el.innerText.includes('Modalidade *'));
      const $Curso = $elements.filter((_, el) => el.innerText.includes('Curso *'));
      const $Serie = $elements.filter((_, el) => el.innerText.includes('Série *'));

      if ($Modalidade.length > 0) {
        cy.wrap($Modalidade[$Modalidade.length-2])
          .should("exist")
          .parent()
          .find("input")
          .should("exist")
          .and("be.visible")
          .click();
        cy.get("div.ps-comp-select-container-column.ps-auto-complete-option-container")
          .should("be.visible")
          .find("span.ps-auto-complete-option-item")
          .first()
          .should("be.visible")
          .click();
      } else {
        cy.log("A div 'Modalidade *' não existe na página.");
      }

      if ($Curso.length > 0) {
        cy.wrap($Curso[$Curso.length-2])
          .should('exist')
          .and('be.visible')
          .parent()
          .find("input")
          .should('exist')
          .and('be.visible')
          .click();
        cy.get("div.ps-comp-select-container-column.ps-auto-complete-option-container")
          .should("be.visible")
          .find("span.ps-auto-complete-option-item")
          // .first()
          .eq(3)
          .should("be.visible")
          .click();
      } else {
        cy.log("A div 'Curso *' não existe na página.");
      }

      if ($Serie.length > 0) {
        cy.wrap($Serie[$Serie.length-2])
          .should("exist")
          .and("be.visible")
          .parent()
          .find("input")
          .should("exist")
          .and("be.visible")
          .click();
        cy.get("div.ps-comp-select-container-column.ps-auto-complete-option-container")
          .should("be.visible")
          .find("span.ps-auto-complete-option-item")
          // .and("be.visible")
          .eq(2)
          .click({force: true});
      } else {
        cy.log("A div 'Série *' não existe na página.");
      }
    });
    //   const $Serie = $elements.filter((_, el) => el.innerText.includes('Série *'));

    //   if ($Serie.length > 0) {
    //     cy.wrap($Serie)
    //       .parent()
    //       .find("input")
    //       .should("exist")
    //       .and("be.visible")
    //       .click();
    //     cy.get("div.ps-comp-select-container-column.ps-auto-complete-option-container")
    //       .should("be.visible")
    //       .find("span.ps-auto-complete-option-item")
    //       // .and("be.visible")
    //       .eq(2)
    //       .click({force: true});
    //   } else {
    //     cy.log("A div 'Série *' não existe na página.");
    //   }
    // });
    
    cy.wait(1000);

    cy.contains('label', 'Data de nascimento *').then(($dataNasc) => {
      if ($dataNasc.length > 0) {
        cy.wrap($dataNasc).should('be.visible').parent().find('input').eq(1).type(dataNascimento + "{enter}", { force: true });
      }
    })
  
    cy.document().then((doc) => {
      const labels = [
        { text: "Nome completo *", value: nomeCompletoAleatorio },
        { text: "E-mail *", value: emailAleatorio },
        { text: "Celular *", value: celularAleatorio },
        { text: "Nome completo do estudante *", value: nomeCompletoAleatorio },
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

  if (config.validarCamposOcultos) {    
    it("Exibição de campos ocultos do segundo passo da inscrição", () => {
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

  it("Conclusão do segundo passo da inscrição", () => {
    cy.contains('button', /Avançar|Concluir/)
      // .should("be.visible")
      .click({ force: true }
    );
  });
});
