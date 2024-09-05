import { gerarEmail, gerarNome, gerarNome2, numTel, cpf, dataNascimento } from '../dataGenerator';

const { nomeAleatorio, sobrenomeAleatorio } = gerarNome();
const nomeCompleto = gerarNome2(nomeAleatorio, sobrenomeAleatorio);
const emailAleatorio = gerarEmail(nomeAleatorio, sobrenomeAleatorio);
const telefoneAleatorio = numTel();
const cpfAleatorio = cpf();
const dataNascimentoMaior = dataNascimento();

describe('Varredura de campos', () => {

    it('Primeiro passo da inscrição', () => {
        cy.get('div').each(($div) => {
            if ($div.hasClass('nomeCompleto')) {
                cy.wrap($div).find('input').type(nomeCompleto);
            }
            if ($div.hasClass('email')) {
                cy.wrap($div).find('input').type(emailAleatorio);
            }
            if ($div.hasClass('celular')) {
                cy.wrap($div).find('input').type(telefoneAleatorio);
            }
            if ($div.hasClass('cpfRespInsc') || $div.hasClass('cpfCandidato')) {
                cy.wrap($div).find('input').type(cpfAleatorio);
            }
            if ($div.hasClass('dataNascimento')) {
                cy.wrap($div).find('input[type="text"]').type(dataNascimentoMaior);
            }
        });

        cy.get('.form-check-input').eq(1).check({force:true})

        // cy.get('button.btn-primary').click();
        // .then(() => {
        //     cy.wait(5000);
        //     cy.get('button.btn-primary').click();
        // });
    });
    it('Segundo passo da inscrição', () => {

    });
});

// ps-button btn btn-raised btn btn-primary btn-md
// ps-button btn btn-raised btn btn-primary btn-md

// get each pra buscar cada div
// conferir se tal div tem tal classe atraves do if
// caso tenha, dar um .type pra preencher o valor
// caso seja Selection, selecionar a primeira opção
// caso exista checkbox (politica privacidade) marcar