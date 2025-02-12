function CONFIG(){
    return {
        url: "",
        ps: 0,
    };
}

function CANDIDATO(){
    return {
        sexo: "M", //'M' para masculino ou 'F' para feminino 
        nacionalidade: "0", //'0' para brasileiro ou '1' para estrangeiro
        maioridade: true,
        deficiencia: false,
    }
}

module.exports = {CONFIG, CANDIDATO}