import { CONFIG } from "../../config/configSpec";
import { Config } from "../../config/configSpec";
const config: Config = CONFIG();

describe("Escolha de PS", () => {
  before(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
  });

  beforeEach(() => {
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

  it("Navega para a URL", () => {
    cy.visit(config.url);
    cy.wait("@pageLoading");

    Cypress.on("uncaught:exception", (err, runnable) => {
      if (err.message.includes("Failed to fetch")) {
        return false;
      }
    });
  });

  it("Interação com mat-selector, escolha do processo seletivo", () => {
    cy.get("mat-select#mat-select-0").should("be.visible").click();
    cy.get("mat-option").eq(config.ps).should("be.visible").click();

    cy.contains("span", "Iniciar inscrição").then(($spanBtn) => {
      if ($spanBtn.length > 0) {
        cy.wrap($spanBtn).should("be.visible").click();
      } else {
        cy.get("button.mat-raised-button.mat-button-base.mat-primary")
          .should("be.visible")
          .click();
      }
    });

    cy.wait("@applymentLoading", { timeout: 10000 });
  });
});
