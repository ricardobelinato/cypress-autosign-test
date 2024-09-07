function CONFIG(){
    return {
        url: "https://matricula.ucb.catolica.edu.br",
        ps: 0
    };
}

module.exports = {CONFIG}

require('../support/formSteps/01_EscolhaDePS.cy');
require('../support/formSteps/02_VarreduraCampos.cy');