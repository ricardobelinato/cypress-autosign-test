"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dataGenerator_1 = require("../utils/dataGenerator");
var formHelpers_1 = require("../utils/formHelpers");
// ─── Configurações e dados do candidato ─────────────────────────
var _a = require("../../config/configSpec"), CANDIDATO = _a.CANDIDATO, CONFIG = _a.CONFIG;
var candidato = CANDIDATO();
var config = CONFIG();
// ─── Geração de dados aleatórios ────────────────────────────────
var cpfAleatorio = (0, dataGenerator_1.gerarCPF)();
// ─── Dados derivados de configurações ───────────────────────────
var maioridadeCandidato = candidato.maioridade;
var sexoCandidato = candidato.sexo;
var nacionalidadeCandidato = candidato.nacionalidade;
var deficienciaCandidato = candidato.deficiencia;
describe("Terceiro passo da inscrição", function () {
    var dataNascimento;
    before(function () {
        dataNascimento = maioridadeCandidato
            ? (0, dataGenerator_1.gerarDataNascimentoMaior)()
            : (0, dataGenerator_1.gerarDataNascimentoMenor)();
    });
    beforeEach(function () {
        cy.intercept({
            method: "POST",
            pathname: "/api/applyment/getApplymentDataByStep/*",
        }).as("applymentLoading");
    });
    it("Leitura e preenchimento dos campos do segundo passo da inscrição", function () {
        Cypress.on('uncaught:exception', function (err, runnable) {
            if (err.message.includes('RBLib is not defined')) {
                return false;
            }
        });
        cy.wait("@applymentLoading");
        cy.wait(1000);
        cy.contains('label', 'Data de nascimento *').should('be.visible').parent().find('input').eq(1).type(dataNascimento + "{enter}", { force: true });
        cy.document().then(function (doc) {
            var labels = [
                { text: "CPF *", value: cpfAleatorio },
            ];
            labels.forEach(function (labelObj) {
                var label = Array.from(doc.querySelectorAll("label")).find(function (el) { var _a; return (_a = el.textContent) === null || _a === void 0 ? void 0 : _a.includes(labelObj.text); });
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
    it("Marcação dos campos radio e checkbox", function () {
        (0, formHelpers_1.marcarRadioSeExistir)(sexoCandidato);
    });
    if (config.validarCamposOcultos) {
        it("Exibição de campos ocultos do terceiro passo da inscrição", function () {
            (0, formHelpers_1.exibirCamposOcultos)();
        });
    }
    ;
    it("Conclusão do terceiro passo da inscrição", function () {
        cy.contains('button', 'Concluir')
            // .should("be.visible")
            .click({ force: true });
    });
});
