"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarNomeESobrenome = gerarNomeESobrenome;
exports.gerarNomeCompleto = gerarNomeCompleto;
exports.normalizarTexto = normalizarTexto;
exports.gerarEmail = gerarEmail;
exports.gerarCelular = gerarCelular;
exports.gerarCPF = gerarCPF;
exports.gerarDataNascimentoMaior = gerarDataNascimentoMaior;
exports.gerarDataNascimentoMenor = gerarDataNascimentoMenor;
exports.gerarCep = gerarCep;
exports.gerarRG = gerarRG;
exports.gerarCNPJ = gerarCNPJ;
function gerarNomeESobrenome() {
    var nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];
    var sobrenomeAleatorio = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
    return { nomeAleatorio: nomeAleatorio, sobrenomeAleatorio: sobrenomeAleatorio };
}
;
function gerarNomeCompleto(_a) {
    var nomeAleatorio = _a.nomeAleatorio, sobrenomeAleatorio = _a.sobrenomeAleatorio;
    return "".concat(nomeAleatorio, " ").concat(sobrenomeAleatorio, " Teste Rubeus");
}
;
function normalizarTexto(texto) {
    if (typeof texto !== "string")
        return "";
    return texto.normalize("NFD").replace(/[^a-zA-Z]/g, "").toLowerCase();
}
;
function gerarEmail(_a) {
    var nomeAleatorio = _a.nomeAleatorio, sobrenomeAleatorio = _a.sobrenomeAleatorio;
    var nome = normalizarTexto(nomeAleatorio);
    var sobrenome = normalizarTexto(sobrenomeAleatorio);
    return "".concat(nome, ".").concat(sobrenome, ".testerubeus@rubeusteste.com.br");
}
;
function gerarCelular() {
    var prefixo = Math.floor(Math.random() * 9000) + 1000;
    var sufixo = Math.floor(Math.random() * 9000) + 1000;
    return "329".concat(prefixo).concat(sufixo);
}
;
var number_random = function (max) {
    return Math.round(Math.random() * max);
};
var create_array = function (total, max) {
    return Array.from({ length: total }, function () { return number_random(max); });
};
var mod = function (dividendo, divisor) {
    return Math.round(dividendo - Math.floor(dividendo / divisor) * divisor);
};
function gerarCPF() {
    var totalArray = 9;
    var maxNumero = 9;
    var _a = create_array(totalArray, maxNumero), n1 = _a[0], n2 = _a[1], n3 = _a[2], n4 = _a[3], n5 = _a[4], n6 = _a[5], n7 = _a[6], n8 = _a[7], n9 = _a[8];
    var d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
    d1 = 11 - (mod(d1, 11));
    if (d1 >= 10)
        d1 = 0;
    var d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
    d2 = 11 - (mod(d2, 11));
    if (d2 >= 10)
        d2 = 0;
    var cpfNumerico = "".concat(n1).concat(n2).concat(n3).concat(n4).concat(n5).concat(n6).concat(n7).concat(n8).concat(n9).concat(d1).concat(d2);
    var cpfFormatado = "".concat(cpfNumerico.slice(0, 3), ".").concat(cpfNumerico.slice(3, 6), ".").concat(cpfNumerico.slice(6, 9), "-").concat(cpfNumerico.slice(9, 11));
    return cpfNumerico;
}
;
function gerarDataNascimentoMaior() {
    var hoje = new Date();
    var anoAtual = hoje.getFullYear();
    var idadeMinima = 18;
    var idadeMaxima = 50;
    var dataFinal = new Date(anoAtual - idadeMinima, hoje.getMonth(), hoje.getDate());
    var dataInicial = new Date(anoAtual - idadeMaxima, hoje.getMonth(), hoje.getDate());
    var timestampAleatorio = Math.floor(Math.random() * (dataFinal.getTime() - dataInicial.getTime())) + dataInicial.getTime();
    var dataNascimento = new Date(timestampAleatorio);
    return dataNascimento.toLocaleDateString('pt-BR');
}
;
function gerarDataNascimentoMenor() {
    var hoje = new Date();
    var anoAtual = hoje.getFullYear();
    var idadeMinima = 1;
    var idadeMaxima = 17;
    var dataFinal = new Date(anoAtual - idadeMinima, hoje.getMonth(), hoje.getDate());
    var dataInicial = new Date(anoAtual - idadeMaxima, hoje.getMonth(), hoje.getDate());
    var timestampAleatorio = Math.floor(Math.random() * (dataFinal.getTime() - dataInicial.getTime())) + dataInicial.getTime();
    var dataNascimento = new Date(timestampAleatorio);
    return dataNascimento.toLocaleDateString('pt-BR');
}
function gerarCep() {
    var cepAleatorio = ceps[Math.floor(Math.random() * ceps.length)];
    return cepAleatorio;
}
;
function gerarRG() {
    var RGAleatorio = rg[Math.floor(Math.random() * rg.length)];
    return RGAleatorio;
}
;
function gerarCNPJ() {
    var CnpjAleatorio = cnpj[Math.floor(Math.random() * cnpj.length)];
    return CnpjAleatorio;
}
;
var nomes = [
    "Ana", "João", "Mariana", "Pedro", "Carla", "André", "Isabel", "Rafael", "Sofia", "Gustavo",
    "Larissa", "Ricardo", "Amanda", "Felipe", "Camila", "Lucas", "Bruna", "Marcelo", "Fernanda",
    "Gabriel", "Lúcia", "Matheus", "Rodrigo", "Natália", "Diego", "Vanessa", "Raul",
    "Cristina", "Vitor", "Bianca", "Eduardo", "Letícia", "Alexandre", "Laura", "Daniel", "Patrícia",
    "Guilherme", "Lara", "Tiago", "Carolina", "Renato", "Ana Paula", "Paulo", "Juliana", "Fábio",
    "Tatiana", "Leonardo", "Raquel", "Raphael", "Thaís", "Hugo", "Clarissa", "Davi", "Renata",
    "Caio", "Daniela", "Giovanni", "Beatriz", "Rui", "Sara", "Luciano", "Alice", "Ramon", "Elena",
    "Heloísa", "Adriano", "Clara", "Miguel", "Valentina", "Rafaela", "Gabriela", "Jorge",
    "Vitória", "César", "Isabella", "Humberto", "Sophia", "Maria", "Luis", "Ana Clara",
    "Roberto", "Lívia", "Milena", "Vinicius", "Lorena", "Thiago", "Manuela", "Samuel",
    "Júlia", "Otávio", "Antônia", "Marina", "Laís", "Márcio", "Lavinia", "Roger",
    "Alberto", "Mirella", "Igor", "Débora", "Fernando", "Evelyn", "Breno", "Ilza",
    "Priscila", "Jonas", "Nicole", "Carlos", "Aline", "Vera", "Regina", "Márcia",
    "Cláudia", "Alex", "Elisa", "Caroline", "Cintia", "Valéria", "Catarina",
    "Simone", "Thais", "Olívia", "Danielle", "Arthur", "Wilseny", "Victor", "Cauã",
    "Leo", "Izadora", "Irene", "Katia", "Bernardo", "Livia", "Viviane", "Romero", "Ronaldo",
    "Rogério", "Lavínia", "Mateus", "Álvaro", "Dário", "Silvania", "Thalyta", "Giovanna", "Jean",
    "Moisés", "Weverton", "Francis", "Marcela", "Clandira", "Luciana", "Eliane", "Tales", "Leticia",
    "Fernando", "Walker", "Alyson", "Luciene", "Milenne", "Rayla", "Erica", "Flávia", "Soraya", "Rhuam",
    "Denise", "Eversong", "Nathaly", "Nathan", "Altemisia", "Sydney", "Higor", "Tauane", "Lidiane",
    "Carol", "Izabela", "Kaio", "Betisa", "Antônio", "Heloisa", "Aryelle", "Kertely", "Lidia",
    "Monique", "Andreia", "Nathalia", "Solange", "Kauan", "Almir", "Cristiano", "Kawan", "John"
];
var sobrenomes = [
    "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Almeida", "Lima", "Ferreira", "Pereira",
    "Carvalho", "Gomes", "Martins", "Rocha", "Ribeiro", "Alves", "Monteiro", "Mendes", "Barros",
    "Nascimento", "Cavalcanti", "Araújo", "Cunha", "Miranda", "Costa", "Castro", "Cardoso", "Dias",
    "Pinto", "Borges", "Fernandes", "Moreira", "Sousa", "Nunes", "Pires", "Machado", "Moura",
    "Correia", "Teixeira", "Andrade", "Freitas", "Faria", "Lopes", "Azevedo", "Campos", "Gonçalves",
    "Melo", "Coelho", "Dantas", "Ramos", "Brito", "Lemos", "Marques", "Pinheiro", "Reis", "Franco",
    "Peixoto", "Domingues", "Paula", "Vieira", "Leal", "Barbosa", "Guimarães", "Cruz",
    "Vargas", "Coutinho", "Medeiros", "Câmara", "Lira", "Valente", "Braga", "Dorneles",
    "Mota", "Gusmão", "Nogueira", "Magalhães", "Caldas", "Pimentel", "Tavares", "Fonseca",
    "Albuquerque", "Macedo", "Vasconcelos", "Goulart", "Aragão", "Guerra", "Sales", "Bandeira",
    "Novais", "Xavier", "Mascarenhas", "Rosa", "Muniz", "Pacheco", "Pessoa", "Cavalcante",
    "Vilar", "Assis", "Chaves", "Aguiar", "Salgado", "Veiga", "Valença", "Couto", "Bittencourt",
    "Quaresma", "Paiva", "Peçanha", "Linhares", "Menezes", "Cortês", "Freire",
    "Leite", "Camacho", "Rios", "Moreno", "Amaral", "Maia", "Belinato", "Simão", "Neto", "Duarte",
    "Álvares", "Mendonça", "Gouvea", "Cordeiro", "Caldeira", "Figueiredo", "Lacerda", "Esteves",
    "Batista", "Galvão", "Montenegro", "Ramalho", "Cabral", "Barreto", "Carneiro", "Marinho",
    "Antunes", "Maldonado", "Valentim", "Alencar", "Castelhano", "Limongi", "Amaro", "Netto",
    "Bessa", "Sampaio", "Mello", "Lauriano", "Loureiro", "Fontes", "Rosário", "Drummond", "Soares",
    "Meireles", "Sodré", "Deluca", "Mairink", "Dutra", "Morais", "Abraão", "Scoparo", "Luz", "Albrigo",
    "Santoro", "Melina", "Andreoni", "Vidon", "Teodoro", "Cannizza", "Zanon", "Kaiser", "Vardiero",
    "Gurgel", "Cassiano", "Carmelo", "Cirico", "Elkik", "Manhanini", "Ferraro", "Rabello", "Bizarro",
    "Nolasco", "Tona", "Januário", "Gonzalez", "Alló", "Nery", "Garcia", "Amorim", "Benini", "Montezano",
    "Knauer", "Guedes", "Melato", "Kuhn", "Laviola", "Neves", "Albano", "Vongal", "Marçal", "Varella",
    "Carrarine", "Onofre", "Nobre", "Aredes", "Salvato", "Delgado", "Ventura", "Ciuldin", "Calcagno",
    "Maman"
];
var ceps = ['40415265', '69317176', '93280320', '69067801', '49009079', '77825050', '49032280', '78065752',
    '60811296', '68627502', '58429160', '29161828', '72620316', '71610075', '45077056', '59625187', '64003083',
    '39803160', '25908822', '99711210'];
var rg = ['17.319.565-9', '44.149.591-6', '15.435.024-2', '40.362.489-7', '35.663.382-2'];
var cnpj = ['49.916.093/0001-98', '02.268.939/0001-67', '26.525.339/0001-03', '07.384.022/0001-41', '96.207.810/0001-92'];
