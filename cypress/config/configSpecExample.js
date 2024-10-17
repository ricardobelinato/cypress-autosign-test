function CONFIG(){
    return {
        url: "",
        rbclicod: "",
        ps: 0,
    };
}

function CANDIDATO(){
    return {
        idade: "-", //'+' para maior ou igual a 18 anos ou '-' para menor de 18 anos
        sexo: "M", //'M' para masculino ou 'F' para feminino
        nacionalidade: "0", //'0' para brasileiro ou '1' para estrangeiro
    }
}

module.exports = {CONFIG, CANDIDATO}