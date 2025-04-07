// ─── Imports de funções utilitárias ─────────────────────────────
import { data } from "cypress/types/jquery";
import { gerarNomeESobrenome, gerarNomeCompleto, gerarEmail, gerarCelular, gerarCPF, gerarDataNascimentoMaior, gerarDataNascimentoMenor, gerarCep, gerarRG, gerarCNPJ } from "../utils/dataGenerator";
import { encontrarLabelPorTexto, marcarRadioSeExistir, aceitarPoliticaPrivacidade, exibirCamposOcultos, selecionarOpcaoPorTexto } from "../utils/formHelpers";

// ─── Configurações e dados do candidato ─────────────────────────
const { CANDIDATO, CONFIG } = require("../../config/configSpec");
const candidato = CANDIDATO();
const config = CONFIG();

// ─── Geração de dados aleatórios ────────────────────────────────
const cpfAleatorio = gerarCPF();

// ─── Dados derivados de configurações ───────────────────────────
const maioridadeCandidato = candidato.maioridade;
const sexoCandidato = candidato.sexo;
const nacionalidadeCandidato = candidato.nacionalidade;
const deficienciaCandidato = candidato.deficiencia;

describe("Terceiro passo da inscrição", () => {
  let dataNascimento: string;
  
  before(() => {
    dataNascimento = maioridadeCandidato
    ? gerarDataNascimentoMaior()
    : gerarDataNascimentoMenor();
  });

  beforeEach(() => {
    cy.intercept({
      method: "POST",
      pathname: "/api/applyment/getApplymentDataByStep/*",
    }).as("applymentLoading");
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
        { text: "CPF *", value: cpfAleatorio },
      ];

      labels.forEach((labelObj) => {
        const label = Array.from(doc.querySelectorAll("label")).find((el) =>
          el.textContent?.includes(labelObj.text)
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
    marcarRadioSeExistir(sexoCandidato);
  });

  if (config.validarCamposOcultos) {    
    it("Exibição de campos ocultos do terceiro passo da inscrição", () => {
      exibirCamposOcultos();
    });
  };

  it("Conclusão do terceiro passo da inscrição", () => {
    cy.contains('button', 'Concluir')
      // .should("be.visible")
      .click({ force: true }
    );
  });
});
