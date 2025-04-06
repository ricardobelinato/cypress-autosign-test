"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = CONFIG;
exports.CANDIDATO = CANDIDATO;
exports.LIGHTHOUSEAUDIT = LIGHTHOUSEAUDIT;
function CONFIG() {
    return {
        url: '',
        ps: 0,
        validarCamposOcultos: false,
        validarPoliticaPrivacidade: false,
        urlPoliticaPrivacidadeRubeus: "https://rbacademy.apprbs.com.br/politica-de-privacidade"
    };
}
;
function CANDIDATO() {
    return {
        sexo: 'M',
        nacionalidade: '0',
        maioridade: true,
        deficiencia: false,
    };
}
;
function LIGHTHOUSEAUDIT() {
    return {
        logLevel: 'info',
        output: 'json',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo', 'pwa'],
        throttlingMethod: 'simulate',
        emulatedFormFactor: 'desktop',
        disableStorageReset: false
    };
}
;
