"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var configSpec_1 = require("../../config/configSpec");
var config = (0, configSpec_1.CONFIG)();
describe("Escolha de PS", function () {
    before(function () {
        cy.clearLocalStorage();
        cy.clearCookies();
        cy.window().then(function (win) {
            win.sessionStorage.clear();
        });
    });
    beforeEach(function () {
        cy.intercept({
            method: "POST",
            pathname: "/api/applyment/",
        }).as("pageLoading");
        cy.intercept({
            method: "POST",
            pathname: "/api/applyment/getApplymentDataByStep/*",
        }).as("applymentLoading");
        cy.intercept({
            method: "POST",
            pathname: "/api/getOffersAllowed",
        }).as("getOffersAllowedLoading");
    });
    it("Navega para a URL", function () {
        cy.visit(config.url);
        cy.wait("@pageLoading");
        Cypress.on("uncaught:exception", function (err, runnable) {
            if (err.message.includes("Failed to fetch")) {
                return false;
            }
        });
    });
    it("Interação com mat-selector, escolha do processo seletivo", function () {
        cy.get("mat-select#mat-select-0").should("be.visible").click();
        cy.get("mat-option").eq(config.ps).should("be.visible").click();
        cy.contains("span", "Iniciar inscrição").then(function ($spanBtn) {
            if ($spanBtn.length > 0) {
                cy.wrap($spanBtn).should("be.visible").click();
            }
            else {
                cy.get("button.mat-raised-button.mat-button-base.mat-primary")
                    .should("be.visible")
                    .click();
            }
        });
        cy.wait("@applymentLoading", { timeout: 10000 });
    });
});
