// Algoritmo:

// 1. Pegar os valores
// 2. Calcular a Idade
//       a. Com base no ano
//       b. Com mês (EXTRA)
//       c. Com dia (EXTRA)

// 3. Gerar a faixa etária
   
//     Resultado            Faixa
//     0 à 12                Criança
//     13 à 17                Adolescente
//     18 à 65               Adulto
//     Acima de 65         Idoso
   

// 4. Organizar o objeto pessoa para salvar na lista
// 5. Cadastrar a pessoa na lista
// 6. Função para carregar as pessoas, carrega a lista do localStorage, chamar ao carregar a página
// 7. Renderizar o conteúdo da tabela com as pessoas cadastradas
// 8. Botão para limpar os registros;





//Função principal
function calcularIdade(event) {
  // Previne que a tela se recarregue quando a função for executada
  event.preventDefault() 

  console.log("Funcionante!!!");

  let dadosUsuario = pegarValores();

  let calcularIdade = calcularIdade(dadosUsuario.nome);

  let classificacaoIdade = classificarImc(idade); 

  let usuarioAtualizado = organizarDados(dadosUsuario, idade, classificacaoIdade);

  cadastrarUsuario(usuarioAtualizado);

}

function pegarValores() {
  let nomeRecebido = document.getElementById("nome").value.trim();

  let dadosUsuario = {
    nome: nomeRecebido,
}

console.log(dadosUsuario);

return dadosUsuario;
}

function calcularIdade(anoNascimento) {
  let dataAtual = new Date();
  let anoAtual = dataAtual.getFullYear();
  return anoAtual - anoNascimento;
}

function calcularIdadeComMes(anoNascimento, mesNascimento) {
  let dataAtual = new Date();
  let anoAtual = dataAtual.getFullYear();
  let mesAtual = dataAtual.getMonth() + 1; // O mês retornado pelo getMonth() é baseado em zero, então adicionamos 1 para corresponder ao formato usual.
  let idade = anoAtual - anoNascimento;
  if (mesNascimento > mesAtual) {
    idade--;
  }
  return idade;
}

function calcularIdadeComDia(anoNascimento, mesNascimento, diaNascimento) {
  let dataAtual = new Date();
  let anoAtual = dataAtual.getFullYear();
  let mesAtual = dataAtual.getMonth() + 1;
  let diaAtual = dataAtual.getDate();
  let idade = anoAtual - anoNascimento;

  if (mesNascimento > mesAtual || (mesNascimento === mesAtual && diaNascimento > diaAtual)) {
    idade--;
  }
  return idade;
}

function gerarFaixaEtaria(idade) {
  if (idade >= 0 && idade <= 12) {
    return "Criança";
  } else if (idade >= 13 && idade <= 17) {
    return "Adolescente";
  } else if (idade >= 18 && idade <= 65) {
    return "Adulto";
  } else {
    return "Idoso";
  }
}

function cadastrarPessoa(nome, anoNascimento) {
  let idade = calcularIdade(anoNascimento);
  let faixaEtaria = gerarFaixaEtaria(idade);
  let pessoa = {
    nome: nome,
    anoNascimento: anoNascimento,
    idade: idade,
    faixaEtaria: faixaEtaria,
  }

  pessoas.push(pessoa);
  // Salva a lista no localStorage
  localStorage.setItem("listaPessoas", JSON.stringify(pessoas));
}

function carregarPessoas() {
  let listaArmazenada = localStorage.getItem("listaPessoas");
  if (listaArmazenada !== null) {
    pessoas = JSON.parse(listaArmazenada);
    tabelaPessoas();
  }
}

function tabelaPessoas() {
  let tabela = document.getElementById("tabelaPessoas");
  tabela.innerHTML = ""; // Limpa a tabela antes de renderizar novamente
  pessoas.forEach((pessoa) => {
    let linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${pessoa.nome}</td>
      <td>${pessoa.anoNascimento}</td>
      <td>${pessoa.mesNascimento}</td>
      <td>${pessoa.diaNascimento}</td>
      <td>${pessoa.idade}</td>
      <td>${pessoa.faixaEtaria}</td>
    `;
    tabela.appendChild(linha);
  });
}

function limparRegistros() {
  pessoas = [];
  localStorage.removeItem("listaPessoas");
  renderizarTabela();
}


carregarPessoas();
