import { gerarEmail, gerarNome, gerarNome2, numTel, cpf, dataNascimento } from '../dataGenerator';

const { nomeAleatorio, sobrenomeAleatorio } = gerarNome();
const nomeCompleto = gerarNome2(nomeAleatorio, sobrenomeAleatorio);
const emailAleatorio = gerarEmail(nomeAleatorio, sobrenomeAleatorio);
const telefoneAleatorio = numTel();
const cpfAleatorio = cpf();
const dataNascimentoMaior = dataNascimento();
let numCamposPreenchidos = 0;

describe('Varredura de campos', () => {

    it('Primeiro passo da inscrição', () => {
        cy.get('div').each(($div) => {
            if ($div.hasClass('nomeCompleto')) {
                cy.wrap($div).find('input').type(nomeCompleto);
                numCamposPreenchidos += 1;
            }
            if ($div.hasClass('email')) {
                cy.wrap($div).find('input').type(emailAleatorio);
                numCamposPreenchidos += 1;
            }
            if ($div.hasClass('celular')) {
                cy.wrap($div).find('input').type(telefoneAleatorio);
                numCamposPreenchidos += 1;
            }
            if ($div.hasClass('cpfRespInsc') || $div.hasClass('cpfCandidato')) {
                cy.wrap($div).find('input').type(cpfAleatorio);
                numCamposPreenchidos += 1;
            }
            if ($div.hasClass('dataNascimento')) {
                cy.wrap($div).find('input[type="text"]').type(dataNascimentoMaior);
                numCamposPreenchidos += 1;
            }
        });

        // if (numCamposPreenchidos == 0){
        //     cy.get('label').contains('Nome completo *').parent().find('input').type(nomeCompleto);
        //     cy.get('label').contains('E-mail *').parent().find('input').type(emailAleatorio);
        //     cy.get('label').contains('Celular *').parent().find('input').type(telefoneAleatorio);
        //     cy.get('label').contains('CPF *').parent().find('input').type(cpfAleatorio);
        //     cy.get('label').contains('Data de Nascimento *').parent().find('input').type(dataNascimentoMaior);
        // }

        cy.get('.form-check-input').eq(1).check({force:true})
        cy.get('button').contains('Avançar').click();

    });
    it('Segundo passo da inscrição', () => {

    });
});