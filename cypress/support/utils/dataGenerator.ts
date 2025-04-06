export type NomeESobrenome = {
    nomeAleatorio: string;
    sobrenomeAleatorio: string;
};

export function gerarNomeESobrenome(): NomeESobrenome {
    const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];
    const sobrenomeAleatorio = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
    return {nomeAleatorio, sobrenomeAleatorio};
};

export function gerarNomeCompleto({nomeAleatorio, sobrenomeAleatorio}: NomeESobrenome): string {
    return `${nomeAleatorio} ${sobrenomeAleatorio} Teste Rubeus`;
};

export function normalizarTexto(texto: string): string {
    if (typeof texto !== "string") return "";
    return texto.normalize("NFD").replace(/[^a-zA-Z]/g, "").toLowerCase();
};

export function gerarEmail({nomeAleatorio, sobrenomeAleatorio}: NomeESobrenome): string {
    const nome = normalizarTexto(nomeAleatorio);
    const sobrenome = normalizarTexto(sobrenomeAleatorio);
    return `${nome}.${sobrenome}.testerubeus@rubeusteste.com.br`;
};

export function gerarCelular(): string {
    const prefixo = Math.floor(Math.random() * 9000) + 1000;
    const sufixo = Math.floor(Math.random() * 9000) + 1000;
    return `329${prefixo}${sufixo}`;
};

const number_random = (max: number): number =>
    Math.round(Math.random() * max);
const create_array = (total: number, max: number): number[] =>
    Array.from({ length: total }, () => number_random(max));
const mod = (dividendo: number, divisor:number): number =>
    Math.round(dividendo - Math.floor(dividendo / divisor) * divisor);

export function gerarCPF(): string {
    const totalArray = 9;
    const maxNumero = 9;
    const [n1, n2, n3, n4, n5, n6, n7, n8, n9] = create_array(totalArray, maxNumero);

    let d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
    d1 = 11 - (mod(d1, 11));
    if (d1 >= 10) d1 = 0;

    let d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
    d2 = 11 - (mod(d2, 11));
    if (d2 >= 10) d2 = 0;

    const cpfNumerico = `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${d1}${d2}`;
    const cpfFormatado = `${cpfNumerico.slice(0, 3)}.${cpfNumerico.slice(3, 6)}.${cpfNumerico.slice(6, 9)}-${cpfNumerico.slice(9, 11)}`;

    return cpfNumerico;
};

export function gerarDataNascimentoMaior(): string {
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();

    const idadeMinima = 18;
    const idadeMaxima = 50;

    const dataFinal = new Date(anoAtual - idadeMinima, hoje.getMonth(), hoje.getDate());
    const dataInicial = new Date(anoAtual - idadeMaxima, hoje.getMonth(), hoje.getDate());

    const timestampAleatorio = Math.floor(Math.random() * (dataFinal.getTime() - dataInicial.getTime())) + dataInicial.getTime();

    const dataNascimento = new Date(timestampAleatorio);
    return dataNascimento.toLocaleDateString('pt-BR');
};

export function gerarDataNascimentoMenor(): string {
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();

    const idadeMinima = 1;
    const idadeMaxima = 17;

    const dataFinal = new Date(anoAtual - idadeMinima, hoje.getMonth(), hoje.getDate());
    const dataInicial = new Date(anoAtual - idadeMaxima, hoje.getMonth(), hoje.getDate());

    const timestampAleatorio = Math.floor(Math.random() * (dataFinal.getTime() - dataInicial.getTime())) + dataInicial.getTime();

    const dataNascimento = new Date(timestampAleatorio);
    return dataNascimento.toLocaleDateString('pt-BR');
}

export function gerarCep(): string {
    const cepAleatorio = ceps[Math.floor(Math.random() * ceps.length)];
    return cepAleatorio;
};

export function gerarRG(): string {
    const RGAleatorio = rg[Math.floor(Math.random() * rg.length)];
    return RGAleatorio;
};

export function gerarCNPJ(): string {
    const CnpjAleatorio = cnpj[Math.floor(Math.random() * cnpj.length)];
    return CnpjAleatorio;
};

const nomes: string[] = [
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

const sobrenomes: string[] = [
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

const ceps: string[] = ['40415265', '69317176', '93280320', '69067801', '49009079', '77825050', '49032280', '78065752',
    '60811296', '68627502', '58429160', '29161828', '72620316', '71610075', '45077056', '59625187', '64003083',
    '39803160', '25908822', '99711210'];

const rg: string[] = ['17.319.565-9', '44.149.591-6', '15.435.024-2', '40.362.489-7', '35.663.382-2'];

const cnpj: string[] = ['49.916.093/0001-98', '02.268.939/0001-67', '26.525.339/0001-03', '07.384.022/0001-41', '96.207.810/0001-92'];
