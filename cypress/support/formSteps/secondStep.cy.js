"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ─── Imports de funções utilitárias ─────────────────────────────
var dataGenerator_1 = require("../utils/dataGenerator");
var formHelpers_1 = require("../utils/formHelpers");
// ─── Configurações e dados do candidato ─────────────────────────
var _a = require("../../config/configSpec"), CANDIDATO = _a.CANDIDATO, CONFIG = _a.CONFIG;
var candidato = CANDIDATO();
var config = CONFIG();
// ─── Geração de dados aleatórios ────────────────────────────────
var _b = (0, dataGenerator_1.gerarNomeESobrenome)(), nomeAleatorio = _b.nomeAleatorio, sobrenomeAleatorio = _b.sobrenomeAleatorio;
var nomeCompletoAleatorio = (0, dataGenerator_1.gerarNomeCompleto)({ nomeAleatorio: nomeAleatorio, sobrenomeAleatorio: sobrenomeAleatorio });
var emailAleatorio = (0, dataGenerator_1.gerarEmail)({ nomeAleatorio: nomeAleatorio, sobrenomeAleatorio: sobrenomeAleatorio });
var celularAleatorio = (0, dataGenerator_1.gerarCelular)();
var cpfAleatorio = (0, dataGenerator_1.gerarCPF)();
var cepAleatorio = (0, dataGenerator_1.gerarCep)();
var rgAleatorio = (0, dataGenerator_1.gerarRG)();
var cnpjAleatorio = (0, dataGenerator_1.gerarCNPJ)();
// ─── Dados derivados de configurações ───────────────────────────
var maioridadeCandidato = candidato.maioridade;
var sexoCandidato = candidato.sexo;
var nacionalidadeCandidato = candidato.nacionalidade;
var deficienciaCandidato = candidato.deficiencia;
describe("Segundo passo da inscrição", function () {
    var dataNascimento;
    before(function () {
        dataNascimento = maioridadeCandidato
            ? (0, dataGenerator_1.gerarDataNascimentoMaior)()
            : (0, dataGenerator_1.gerarDataNascimentoMenor)();
    });
    beforeEach(function () {
        cy.intercept({ method: "POST", pathname: "/api/applyment/getApplymentDataByStep/*", }).as("applymentLoading");
    });
    it("Leitura e preenchimento dos campos do segundo passo da inscrição", function () {
        cy.wait("@applymentLoading");
        cy.wait(2000);
        cy.get('div', { log: false }).then(function ($elements) {
            var $Modalidade = $elements.filter(function (_, el) { return el.innerText.includes('Modalidade *'); });
            var $Curso = $elements.filter(function (_, el) { return el.innerText.includes('Curso *'); });
            var $Serie = $elements.filter(function (_, el) { return el.innerText.includes('Série *'); });
            if ($Modalidade.length > 0) {
                (0, formHelpers_1.selecionarOpcaoPorTexto)($Modalidade, 0);
            }
            else {
                cy.log("A div 'Modalidade *' não existe na página.");
            }
            ;
            if ($Curso.length > 0) {
                (0, formHelpers_1.selecionarOpcaoPorTexto)($Curso, 3);
            }
            else {
                cy.log("A div 'Curso *' não existe na página.");
            }
            ;
            if ($Serie.length > 0) {
                (0, formHelpers_1.selecionarOpcaoPorTexto)($Serie, 2);
            }
            else {
                cy.log("A div 'Série *' não existe na página.");
            }
            ;
        });
        cy.wait(1000);
        cy.contains('label', 'Data de nascimento *').then(function ($dataNasc) {
            if ($dataNasc.length > 0) {
                cy.wrap($dataNasc).should('be.visible').parent().find('input').its('length').should('be.gte', 2).then(function () {
                    cy.wrap($dataNasc).parent().find('input').eq(1).type(dataNascimento + "{enter}", { force: true });
                });
            }
            ;
        });
        cy.document().then(function (doc) {
            var labels = [
                { text: "Nome completo *", value: nomeCompletoAleatorio },
                { text: "E-mail *", value: emailAleatorio },
                { text: "Celular *", value: celularAleatorio },
                { text: "Nome completo do estudante *", value: nomeCompletoAleatorio },
                { text: "CPF *", value: cpfAleatorio },
                { text: "Média de notas do ENEM *", value: '900' },
                { text: "Instituição superior de origem", value: 'teste' },
                { text: "Curso de origem *", value: 'teste' },
            ];
            labels.forEach(function (labelObj) {
                var label = (0, formHelpers_1.encontrarLabelPorTexto)(doc, labelObj.text);
                if (label) {
                    cy.wrap(label)
                        .parent()
                        .find("input")
                        .filter(":visible")
                        .first()
                        .then(function (input) {
                        cy.log(labelObj.value);
                        cy.wrap(input).invoke("val", labelObj.value).trigger("input", { force: true }).trigger("change", { force: true });
                    });
                }
                else {
                    cy.log("O label \"".concat(labelObj.text, "\" n\u00E3o existe no DOM"));
                }
            });
        });
        if (deficienciaCandidato) {
            cy.get('body').then(function ($body) {
                if ($body.find('label:contains("Possui alguma deficiência?")').length > 0) {
                    cy.contains('label', 'Possui alguma deficiência? *')
                        .next().find('label').contains('Sim').click();
                    cy.contains('span', 'Auditiva').click();
                }
                else {
                    cy.log('Não existe o campo de deficiência.');
                }
            });
        }
    });
    if (config.validarCamposOcultos) {
        it("Exibição de campos ocultos do segundo passo da inscrição", function () {
            cy.wait(1000);
            (0, formHelpers_1.exibirCamposOcultos)();
        });
    }
    it("Conclusão do segundo passo da inscrição", function () {
        cy.contains('button', /Avançar|Concluir/)
            .should("be.visible")
            .click({ force: true });
    });
});
