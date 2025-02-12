import {
  gerarNomeESobrenome,
  gerarNomeCompleto,
  gerarEmail,
  gerarCelular,
  gerarCPF,
  gerarDataNascimentoMaior,
  gerarDataNascimentoMenor,
  gerarCep,
  gerarRG,
  gerarCNPJ,
} from "../dataGenerator";
const { nomeAleatorio, sobrenomeAleatorio } = gerarNomeESobrenome();
const nomeCompletoAleatorio = gerarNomeCompleto(
  nomeAleatorio,
  sobrenomeAleatorio
);
const emailAleatorio = gerarEmail(nomeAleatorio, sobrenomeAleatorio);
const celularAleatorio = gerarCelular();
const CPFAleatorio = gerarCPF();
let dataNascimento;
const cepAleatorio = gerarCep();
const RGAleatorio = gerarRG();
const CNPJAleatorio = gerarCNPJ();

const { CANDIDATO } = require("../../config/configSpec");
const candidato = CANDIDATO();
const maioridadeCandidato = candidato.maioridade;
const SexoCandidato = candidato.sexo;
const NacionalidadeCandidato = candidato.nacionalidade;

describe("Primeiro passo da inscrição", () => {
  it("Valida a política de privacidade", () => {
    cy.contains("strong", "Política de Privacidade")
      .closest("a")
      .invoke("attr", "href")
      .then((href) => {
        expect(href).to.not.eq("https://rbacademy.apprbs.com.br/politica-de-privacidade");
      });
  });
  
  before(() => {
    if (maioridadeCandidato) {
      dataNascimento = gerarDataNascimentoMaior();
    } else {
      dataNascimento = gerarDataNascimentoMenor();
    }
  });

  it("Leitura e preenchimento dos campos do primeiro passo da inscrição", () => {
    cy.document().then((doc) => {
      const labels = [
        { text: "Nome completo *", value: nomeCompletoAleatorio },
        { text: "E-mail *", value: emailAleatorio },
        { text: "Celular *", value: celularAleatorio },
        { text: "CPF *", value: CPFAleatorio },
        { text: "Data de nascimento *", value: dataNascimento },
      ];

      labels.forEach((labelObj) => {
        const label = Array.from(doc.querySelectorAll("label")).find((el) =>
          el.textContent.includes(labelObj.text)
        );
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
    cy.get("body").then(($body) => {
      if (
        $body.find(`input[type="radio"][value="${SexoCandidato}"]`).length > 0
      ) {
        cy.get(`input[type="radio"][value="${SexoCandidato}"]`, { log: false })
          .should("be.visible")
          .check({ force: true });
      }

      if (
        $body.find(`input[type="radio"][value="${NacionalidadeCandidato}"]`)
          .length > 0
      ) {
        cy.get(`input[type="radio"][value="${NacionalidadeCandidato}"]`, {
          log: false,
        })
          .should("be.visible")
          .check({ force: true });
      }
    });

    cy.get('input[type="checkbox"]')
      .eq(1)
      .should("be.visible")
      .check({ force: true });
  });

  it("Exibição de campos ocultos do primeiro passo da inscrição", () => {
    cy.window().then((win) => {
      let i = 0;
      while (i < 10) {
        Array.from(
          win.document.getElementsByClassName("fields-hidden")
        ).forEach((e) => {
          e.classList.remove("fields-hidden");
        });
        Array.from(
          win.document.getElementsByClassName("ps-input-hidden")
        ).forEach((e) => {
          e.classList.remove("ps-input-hidden");
        });

        i++;
      }
    });
  });

  beforeEach(() => {
    cy.intercept({
      method: "POST",
      pathname: "/api/applyment/getApplymentDataByStep/*",
    }).as("applymentLoading");
  });

  it("Conclusão do primeiro passo da inscrição", () => {
    cy.contains("Button", "Avançar").should("be.visible").click();
  });
});