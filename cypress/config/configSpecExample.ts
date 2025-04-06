export type Config = {
    url: string;
    ps: number;
    validarCamposOcultos: boolean;
    validarPoliticaPrivacidade: boolean;
    urlPoliticaPrivacidadeRubeus: string;
};

export type Candidato = {
    sexo: string;
    nacionalidade: string;
    maioridade: boolean;
    deficiencia: boolean;
};

export type LighthouseAudit = {
    logLevel: string;
    output: string;
    onlyCategories: string[];
    throttlingMethod: string;
    emulatedFormFactor: string;
    disableStorageReset: boolean;
};

export function CONFIG(): Config {
    return {
        url: '',
        ps: 0,
        validarCamposOcultos: false,
        validarPoliticaPrivacidade: false,
        urlPoliticaPrivacidadeRubeus: "https://rbacademy.apprbs.com.br/politica-de-privacidade"
    };
};

export function CANDIDATO(): Candidato {
    return {
        sexo: 'M',
        nacionalidade: '0',
        maioridade: true,
        deficiencia: false,
    }
};

export function LIGHTHOUSEAUDIT(): LighthouseAudit {
    return {
        logLevel: 'info',
        output: 'json',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo', 'pwa'],
        throttlingMethod: 'simulate',
        emulatedFormFactor: 'desktop',
        disableStorageReset: false
    }
};
