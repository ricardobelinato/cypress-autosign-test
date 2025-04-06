import inquirer from "inquirer";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename).replace(/\\/g, "/");

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

  const config = CONFIG(answers.urlBase, answers.ps);
  const candidato = answers.escolherParametrosCandidato
    ? CANDIDATO(
        answers.maioridadeCandidato,
        answers.sexoCandidato,
        answers.nacionalidadeCandidato
      )
    : null;

  console.log("\n🔧 Configuração:");
  console.log("Config:", config);
  if (candidato) console.log("Candidato:", candidato);

  const specPath = `${__dirname}/cypress/e2e/TesteSpec.cy.js`;
  console.log(`\n🚀 Executando: npx cypress run --spec ${specPath}`);

  const processo = spawn("npx", ["cypress", "run", "--spec", `"${specPath}"`], {
    shell: true,
    cwd: __dirname,
  });

  processo.stdout.on("data", (data) => {
    process.stdout.write(data.toString());
  });

  processo.stderr.on("data", (data) => {
    process.stderr.write(data.toString());
  });

  processo.on("close", (code) => {
    if (code !== 0) {
      console.error(`\n❌ Cypress finalizou com código de erro: ${code}`);
    } else {
      console.log("\n✅ Cypress finalizado com sucesso!");
    }
  });
}

start();
