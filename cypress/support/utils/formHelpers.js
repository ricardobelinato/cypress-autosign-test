"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encontrarLabelPorTexto = encontrarLabelPorTexto;
exports.marcarRadioSeExistir = marcarRadioSeExistir;
exports.aceitarPoliticaPrivacidade = aceitarPoliticaPrivacidade;
exports.exibirCamposOcultos = exibirCamposOcultos;
function encontrarLabelPorTexto(doc, textoProcurado) {
    return Array.from(doc.querySelectorAll("label")).find(function (el) { var _a; return (_a = el.textContent) === null || _a === void 0 ? void 0 : _a.includes(textoProcurado); });
}
;
function marcarRadioSeExistir(valor) {
    cy.get("body").then(function ($body) {
        if ($body.find("input[type=\"radio\"][value=\"".concat(valor, "\"]")).length > 0) {
            cy.get("input[type=\"radio\"][value=\"".concat(valor, "\"]"), { log: false })
                .should("be.visible")
                .check({ force: true });
        }
    });
}
;
function aceitarPoliticaPrivacidade() {
    cy.get("strong", { log: false }).then(function ($elements) {
        var $politica = $elements.filter(function (_, el) {
            return el.innerText.includes("Política de Privacidade");
        });
        if ($politica.length > 0) {
            cy.wrap($politica)
                .parents("div.form-group")
                .find('input[type="checkbox"]')
                .should("be.visible")
                .check({ force: true });
        }
        else {
            cy.log("Política de Privacidade não encontrada, seguindo o fluxo normalmente.");
        }
    });
}
;
function exibirCamposOcultos() {
    cy.get('.fields-hidden, .ps-input-hidden', { timeout: 5000 }).should('exist');
    cy.window().then(function (win) {
        var classesParaRemover = ['fields-hidden', 'ps-input-hidden'];
        classesParaRemover.forEach(function (classe) {
            Array.from(win.document.getElementsByClassName(classe)).forEach(function (el) {
                return el.classList.remove(classe);
            });
        });
    });
}
;
