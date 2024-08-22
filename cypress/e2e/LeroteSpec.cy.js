import { gerarNome, gerarNome2, gerarEmail, gerarCep, cpf, numTel, dataNascimento} from '../support/dataGenerator';

describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://portal.apprbs.com.br/colegio-lerote-ajustes')

    cy.get('mat-select#mat-select-0').click()
    cy.get('mat-option').eq(0).click()
    // cy.get('.mat-option').contains('Captação 2024: Modelo Rubeus').click()
    // cy.get('mat-select#mat-select-0').should('have.text', 'Captação 2024: Modelo Rubeus')
    

    cy.get('button.mat-raised-button.mat-button-base.mat-primary').should('be.visible').click()

    const { nomeAleatorio, sobrenomeAleatorio } = gerarNome();
    const nomeCompleto = gerarNome2(nomeAleatorio, sobrenomeAleatorio);
    const cpfAleatorio = cpf();
    const dataNascimentoMaior = dataNascimento();
    const emailAleatorio = gerarEmail(nomeAleatorio, sobrenomeAleatorio);
    const telefoneAleatorio = numTel();

    cy.get('.nomeCompleto').find('input').type(nomeCompleto);
    cy.get('div.grauParentesco').find('input').click()
    cy.get('div.ps-auto-complete-option-container').find('span.ps-auto-complete-option-item').first().click();
    cy.get('.cpfRespInsc').find('input').type(cpfAleatorio);
    cy.get('.dataNascimento').find('input.form-control.form-control.input').type(dataNascimentoMaior);
    cy.get('.email').find('input').type(emailAleatorio);
    cy.get('div.celular').find('input').type(telefoneAleatorio);
    cy.get('.form-check-input').eq(1).check({force:true});
  })
})


"#id aqui"
". class"
"nomeElemento"