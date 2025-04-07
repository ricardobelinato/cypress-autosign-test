// ─── Imports de funções utilitárias ─────────────────────────────
import { gerarNomeESobrenome, gerarNomeCompleto, gerarEmail, gerarCelular, gerarCPF, gerarDataNascimentoMaior, gerarDataNascimentoMenor, gerarCep, gerarRG, gerarCNPJ } from "../utils/dataGenerator";
import { encontrarLabelPorTexto, marcarRadioSeExistir, aceitarPoliticaPrivacidade, exibirCamposOcultos } from "../utils/formHelpers";

// ─── Configurações e dados do candidato ─────────────────────────
const { CANDIDATO, CONFIG } = require("../../config/configSpec");
const candidato = CANDIDATO();
const config = CONFIG();

// ─── Geração de dados aleatórios ────────────────────────────────
const { nomeAleatorio, sobrenomeAleatorio } = gerarNomeESobrenome();
const nomeCompletoAleatorio = gerarNomeCompleto({ nomeAleatorio, sobrenomeAleatorio });
const emailAleatorio = gerarEmail({ nomeAleatorio, sobrenomeAleatorio });
const celularAleatorio = gerarCelular();
const cpfAleatorio = gerarCPF();
const cepAleatorio = gerarCep();
const rgAleatorio = gerarRG();
const cnpjAleatorio = gerarCNPJ();

// ─── Dados derivados de configurações ───────────────────────────
const maioridadeCandidato = candidato.maioridade;
const sexoCandidato = candidato.sexo;
const nacionalidadeCandidato = candidato.nacionalidade;
const deficienciaCandidato = candidato.deficiencia;

describe("Primeiro passo da inscrição", () => {
  let dataNascimento: string;

  before(() => {
    dataNascimento = maioridadeCandidato
    ? gerarDataNascimentoMaior()
    : gerarDataNascimentoMenor();
  });

  if (config.validarPoliticaPrivacidade) {
    it("Valida a política de privacidade", () => {
      cy.contains("strong", "Política de Privacidade")
        .closest("a")
        .should('exist')
        .invoke("attr", "href")
        .then((href) => {
          expect(href).to.not.eq(config.urlPoliticaPrivacidadeRubeus);
        });
    });
  }

  it("Leitura e preenchimento dos campos do primeiro passo da inscrição", () => {
    cy.wait(1000)

    cy.document().then((doc) => {
      const labels = [
        { text: "Nome completo *", value: nomeCompletoAleatorio },
        { text: "E-mail *", value: emailAleatorio },
        { text: "Celular *", value: celularAleatorio },
        { text: "CPF *", value: cpfAleatorio },
        { text: "Data de nascimento *", value: dataNascimento },
      ];

      labels.forEach((labelObj) => {
        const label = encontrarLabelPorTexto(doc, labelObj.text);
        if (label) {
          cy.wrap(label)
            .parent()
            .find("input")
            .filter(":visible")
            .first()
            .then((input) => {
              cy.wrap(input).type(labelObj.value);
            });
        } else {
          cy.log(`O label "${labelObj.text}" não existe no DOM`);
        }
      });
    });
  });

  it("Marcação dos campos radio e checkbox", () => {
    marcarRadioSeExistir(sexoCandidato);
    marcarRadioSeExistir(nacionalidadeCandidato);
    aceitarPoliticaPrivacidade();
  });

  if (config.validarCamposOcultos) {    
    it("Exibição de campos ocultos do primeiro passo da inscrição", () => {
      exibirCamposOcultos();
    });
  }

  beforeEach(() => {
    cy.intercept({ method: "POST", pathname: "/api/applyment/getApplymentDataByStep/*", }).as("applymentLoading");
  });

  it("Conclusão do primeiro passo da inscrição", () => {
    cy.contains("Avançar").should("be.visible").click();
  });
});
