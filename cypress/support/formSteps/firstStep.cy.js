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
describe("Primeiro passo da inscrição", function () {
    var dataNascimento;
    before(function () {
        dataNascimento = maioridadeCandidato
            ? (0, dataGenerator_1.gerarDataNascimentoMaior)()
            : (0, dataGenerator_1.gerarDataNascimentoMenor)();
    });
    if (config.validarPoliticaPrivacidade) {
        it("Valida a política de privacidade", function () {
            cy.contains("strong", "Política de Privacidade")
                .closest("a")
                .should('exist')
                .invoke("attr", "href")
                .then(function (href) {
                expect(href).to.not.eq(config.urlPoliticaPrivacidadeRubeus);
            });
        });
    }
    it("Leitura e preenchimento dos campos do primeiro passo da inscrição", function () {
        cy.wait(1000);
        cy.document().then(function (doc) {
            var labels = [
                { text: "Nome completo *", value: nomeCompletoAleatorio },
                { text: "E-mail *", value: emailAleatorio },
                { text: "Celular *", value: celularAleatorio },
                { text: "CPF *", value: cpfAleatorio },
                { text: "Data de nascimento *", value: dataNascimento },
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
                        cy.wrap(input).type(labelObj.value);
                    });
                }
                else {
                    cy.log("O label \"".concat(labelObj.text, "\" n\u00E3o existe no DOM"));
                }
            });
        });
    });
    it("Marcação dos campos radio e checkbox", function () {
        (0, formHelpers_1.marcarRadioSeExistir)(sexoCandidato);
        (0, formHelpers_1.marcarRadioSeExistir)(nacionalidadeCandidato);
        (0, formHelpers_1.aceitarPoliticaPrivacidade)();
    });
    if (config.validarCamposOcultos) {
        it("Exibição de campos ocultos do primeiro passo da inscrição", function () {
            (0, formHelpers_1.exibirCamposOcultos)();
        });
    }
    beforeEach(function () {
        cy.intercept({ method: "POST", pathname: "/api/applyment/getApplymentDataByStep/*", }).as("applymentLoading");
    });
    it("Conclusão do primeiro passo da inscrição", function () {
        cy.contains("Avançar").should("be.visible").click();
    });
});
