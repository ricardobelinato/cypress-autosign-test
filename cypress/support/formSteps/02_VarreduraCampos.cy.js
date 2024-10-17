import { gerarNomeESobrenome, gerarNomeCompleto, gerarEmail, gerarCelular, gerarCPF, gerarDataNascimentoMaior, gerarDataNascimentoMenor, gerarCep, gerarRG, gerarCNPJ } from '../dataGenerator';

const { nomeAleatorio, sobrenomeAleatorio } = gerarNomeESobrenome();
const nomeCompletoAleatorio = gerarNomeCompleto(nomeAleatorio, sobrenomeAleatorio);
const emailAleatorio = gerarEmail(nomeAleatorio, sobrenomeAleatorio);
const celularAleatorio = gerarCelular();
const CPFAleatorio = gerarCPF();
const dataNascimentoMaior = gerarDataNascimentoMaior();
const dataNascimentoMenor = gerarDataNascimentoMenor();
const cepAleatorio = gerarCep();
const RGAleatorio = gerarRG();
const CNPJAleatorio = gerarCNPJ();
let numCamposPreenchidos = 0;

//Varredura de campos atráves da classe identificadora da div mãe
describe('Varredura de campos', () => {
    it('Primeiro passo da inscrição', () => {

        cy.get('div').each(($div) => {
            if ($div.hasClass('nomeCompleto')) {
                cy.wrap($div).find('input').type(nomeCompletoAleatorio);
                numCamposPreenchidos += 1;
            }
            if ($div.hasClass('email')) {
                cy.wrap($div).find('input').type(emailAleatorio);
                numCamposPreenchidos += 1;
            }
            if ($div.hasClass('celular')) {
                cy.wrap($div).find('input').type(celularAleatorio);
                numCamposPreenchidos += 1;
            }
            if ($div.hasClass('cpfRespInsc') || $div.hasClass('cpfCandidato')) {
                cy.wrap($div).find('input').type(CPFAleatorio);
                numCamposPreenchidos += 1;
            }
            if ($div.hasClass('dataNascimento')) {
                cy.wrap($div).find('input[type="text"]').type(dataNascimentoMaior);
                // numCamposPreenchidos += 1;
            }
        }).then(() => { //Varredura de campos backup caso não existam classes identificadoras na div mãe, esta pega pelo label do input
            if (numCamposPreenchidos == 0) {
                cy.document().then((doc) => {
                    const labels = [
                        { text: 'Nome completo *', value: nomeCompletoAleatorio },
                        { text: 'E-mail *', value: emailAleatorio },
                        { text: 'Celular *', value: celularAleatorio },
                        { text: 'CPF *', value: CPFAleatorio },
                        { text: 'Data de Nascimento *', value: dataNascimentoMaior }
                    ];

                    labels.forEach(labelObj => {
                        const label = Array.from(doc.querySelectorAll('label')).find(el => el.textContent.includes(labelObj.text));
                        if (label) {
                            cy.wrap(label).parent().find('input').type(labelObj.value);
                        } else {
                            cy.log(`O label "${labelObj.text}" não existe no DOM`);
                        }
                    });
                });
            }
        })

        // .then(() => {
        //     cy.get('input[type="radio"]').each(($inputRadio) => {
        //         cy.wrap($inputRadio).first().check({ force: true });
        //     });
        // });

        // .then(() => {
        //     cy.get('div').each(($div) => {
        //     if ($div.hasClass('generoTOTVS')) {
        //         cy.wrap($div).find('input[value="M"]').check();
        //         numCamposPreenchidos += 1;
        //     }
        // });

        // cy.get('strong').contains('Política de Privacidade').parents('div').prev().find('input[type="checkbox"]').check({ force: true });
        cy.get('input[type="checkbox"]').eq(1).check({ force: true })

        //Exibe campos ocultos
        cy.window().then((win) => {
            let i = 0;
            while (i < 10) {
                Array.from(win.document.getElementsByClassName('fields-hidden')).forEach((e) => {
                    e.classList.remove('fields-hidden');
                });
                Array.from(win.document.getElementsByClassName('ps-input-hidden')).forEach((e) => {
                    e.classList.remove('ps-input-hidden');
                });

                i++;
            }
        });


        // const scriptSrc = 'cypress/support/tracking.service.ts';

        // Cypress.Commands.add('injectScript', (scriptSrc) => {
        //     cy.window().then((win) => {
        //         const script = win.document.createElement('script');
        //         script.type = 'text/javascript';
        //         script.src = scriptSrc;
        //         win.document.head.appendChild(script);
        //     });
        // });


        // cy.intercept('POST', '/api/tracking').as('getTrackingInfo');
        // cy.get('button').contains('Avançar').click();
        // cy.wait('@getTrackingInfo');

    });
    // it('Segundo passo da inscrição', () => {

    // });
});