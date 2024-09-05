function CONFIG(){
    return {
        url: "",
        ps: 1
    };
}

module.exports = {CONFIG}

require('../support/formSteps/01_EscolhaDePS.cy');
require('../support/formSteps/02_VarreduraCampos.cy');