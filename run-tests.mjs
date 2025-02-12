import inquirer from "inquirer";

async function start() {
  console.log("\nBem-vindo ao Cypress AutoSign Project! 🛠️");
  console.log("Vamos configurar os parâmetros do seu teste\n");

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "urlBase",
      message: "Digite a URL base para o teste:",
      validate: (input) => {
        const urlRegex = /^(https?:\/\/)[\w.-]+(\.[a-z]{2,})+.*$/i;
        return urlRegex.test(input) ? true : "Digite uma URL válida!";
      },
    },
    {
      type: "input",
      name: "ps",
      message: "Digite o número do processo seletivo a ser testado:",
      default: "0",
      validate: (input) => {
        return /^\d+$/.test(input) ? true : "Digite um número válido!";
      },
    },
    {
      type: "confirm",
      name: "escolherParametrosCandidato",
      message: "Deseja configurar os parâmetros do candidato teste?",
      default: false,
    },
    {
      type: "list",
      name: "maioridadeCandidato",
      message: "Gerar candidato maior ou menor de idade?",
      choices: ["Maior", "Menor"],
      default: "Maior",
      when: (answers) => answers.escolherParametrosCandidato,
    },
    {
      type: "list",
      name: "sexoCandidato",
      message: "Gerar candidato do sexo",
      choices: ["Masculino", "Feminino"],
      default: "Masculino",
      when: (answers) => answers.escolherParametrosCandidato,
    },
    {
      type: "list",
      name: "nacionalidadeCandidato",
      message: "Gerar candidato de nacionalidade",
      choices: ["Brasileira", "Estrangeiro"],
      default: "Brasileira",
      when: (answers) => answers.escolherParametrosCandidato,
    },
  ]);

}

function CONFIG(urlBase, processoSeletivo) {
  return {
    url: urlBase,
    ps: processoSeletivo,
  };
}

function CANDIDATO(maioridadeCandidato, sexoCandidato, nacionalidadeCandidato) {
  return {
    maioridade: maioridadeCandidato,
    sexo: sexoCandidato,
    nacionalidade: nacionalidadeCandidato,
  };
}

export { CONFIG, CANDIDATO };

start();
