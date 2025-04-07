// ─── Imports de funções utilitárias ─────────────────────────────
import { gerarNomeESobrenome, gerarNomeCompleto, gerarEmail, gerarCelular, gerarCPF, gerarDataNascimentoMaior, gerarDataNascimentoMenor, gerarCep, gerarRG, gerarCNPJ } from "../utils/dataGenerator";
import { encontrarLabelPorTexto, marcarRadioSeExistir, exibirCamposOcultos, selecionarOpcaoPorTexto } from "../utils/formHelpers";

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

describe("Segundo passo da inscrição", () => {
  let dataNascimento: string;
  
  before(() => {
    dataNascimento = maioridadeCandidato
    ? gerarDataNascimentoMaior()
    : gerarDataNascimentoMenor()
  });

  beforeEach(() => {
    cy.intercept({ method: "POST", pathname: "/api/applyment/getApplymentDataByStep/*", }).as("applymentLoading");
  });

  it("Leitura e preenchimento dos campos do segundo passo da inscrição", () => {    
    cy.wait("@applymentLoading");
    cy.wait(2000);

    cy.get('div', { log: false }).then(($elements) => {
      const $Modalidade = $elements.filter((_, el) => el.innerText.includes('Modalidade *'));
      const $Curso = $elements.filter((_, el) => el.innerText.includes('Curso *'));
      const $Serie = $elements.filter((_, el) => el.innerText.includes('Série *'));

      if ($Modalidade.length > 0) {
        selecionarOpcaoPorTexto($Modalidade, 0);
      } else {
        cy.log("A div 'Modalidade *' não existe na página.");
      };

      if ($Curso.length > 0) {
        selecionarOpcaoPorTexto($Curso, 3);
      } else {
        cy.log("A div 'Curso *' não existe na página.");
      };

      if ($Serie.length > 0) {
        selecionarOpcaoPorTexto($Serie, 2);
      } else {
        cy.log("A div 'Série *' não existe na página.");
      };
    });
    
    cy.wait(1000);

    cy.contains('label', 'Data de nascimento *').then(($dataNasc) => {
      if ($dataNasc.length > 0) {
        cy.wrap($dataNasc).should('be.visible').parent().find('input').its('length').should('be.gte', 2).then(() => {
          cy.wrap($dataNasc).parent().find('input').eq(1).type(dataNascimento + "{enter}", { force: true });
        });
      };
    });
  
    cy.document().then((doc) => {
      const labels = [
        { text: "Nome completo *", value: nomeCompletoAleatorio },
        { text: "E-mail *", value: emailAleatorio },
        { text: "Celular *", value: celularAleatorio },
        { text: "Nome completo do estudante *", value: nomeCompletoAleatorio },
        { text: "CPF *", value: cpfAleatorio },
        { text: "Média de notas do ENEM *", value: '900' },
        { text: "Instituição superior de origem", value: 'teste' },
        { text: "Curso de origem *", value: 'teste' },
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
      exibirCamposOcultos();
    });
  }

  it("Conclusão do segundo passo da inscrição", () => {
    cy.contains('button', /Avançar|Concluir/)
      .should("be.visible")
      .click({ force: true }
    );
  });
});
