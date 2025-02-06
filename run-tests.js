import inquirer from "inquirer";

async function start() {
//   console.log("\n");
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
      type: "input",
      name: "idadeCandidato",
      message: "Gerar candidato maior ou menor de idade?",
      default: false,
      when: (answers) => answers.escolherParametrosCandidato,
    },
    {
      type: "input",
      name: "sexoCandidato",
      message: "Gerar candidato de sexo M ou F? (m/f)",
      default: "m",
      when: (answers) => answers.escolherParametrosCandidato,
    },
    {
      type: "input",
      name: "nacionalidadeCandidato",
      message: "Gerar candidato de nacionalidade brasileira (s/n)?",
      default: "s",
      when: (answers) => answers.escolherParametrosCandidato,
    },
  ]);

  const urlBase = answers.urlBase;
  const processoSeletivo = answers.ps;
  const configurarCandidato = answers.escolherParametrosCandidato;
  const idadeCandidato = answers.idadeCandidato;
  const sexoCandidato = answers.sexoCandidato;
  const nacionalidadeCandidato = answers.nacionalidadeCandidato;
}

start();
