function CONFIG(){
    return {
        url: '',
        ps: 0,
        exibirCamposOcultos: false
    };
}

function CANDIDATO(){
    return {
        sexo: 'M',
        nacionalidade: '0',
        maioridade: true,
        deficiencia: false,
    }
}

function LIGHTHOUSEAUDIT() {
    return {
        logLevel: 'info',
        output: 'json',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo', 'pwa'],
        throttlingMethod: 'simulate',
        emulatedFormFactor: 'desktop',
        disableStorageReset: false
    }
}

module.exports = {CONFIG, CANDIDATO, LIGHTHOUSEAUDIT}