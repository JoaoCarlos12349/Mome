class Conta {
  constructor(usuario, nome, nasc, email, senha) {
    this.usuario = usuario;
    this.nome = nome;
    this.nasc = nasc;
    this.email = email;
    this.senha = senha;
    this.filmes = [];
  }
}

const formcadastro = document.getElementById("form");

formcadastro.addEventListener("submit", (event) => {
  event.preventDefault();

  // Utilizando destructuring para extrair valores dos inputs
  const { usuario, nome, nasc, email, senha } = {
    usuario: document.getElementById("usuario").value,
    nome: document.getElementById("nome").value,
    nasc: document.getElementById("nasc").value,
    email: document.getElementById("email").value,
    senha: document.getElementById("senha").value,
  };

  if (senha.length < 8) {
    alert("Senha precisa de pelo menos 8 caracteres!");
    formcadastro.reset();
    return;
  }

  const novaConta = new Conta(usuario, nome, nasc, email, senha);
  
  // Utilizando spread operator para adicionar nova conta no array existente
  let contas = JSON.parse(localStorage.getItem("contas")) || [];
  contas = [...contas, novaConta];  // spread operator
  
  // Utilizando método de manipulação de array (forEach) para validação simples de campos (exemplo)
  const camposObrigatorios = [usuario, nome, email, senha];
  camposObrigatorios.forEach(campo => {
    if (!campo) {
      alert("Todos os campos são obrigatórios!");
      formcadastro.reset();
      return;
    }
  });

  localStorage.setItem("contas", JSON.stringify(contas));
  alert("Usuário cadastrado com sucesso!");
  sessionStorage.setItem("usulogado", JSON.stringify(novaConta));
  formcadastro.reset();
  window.location.href = "home.html";
});

//modificações js moderno:
//Substituí as funções tradicionais por arrow functions para uma sintaxe mais concisa. formcadastro.addEventListener("submit", (event) => { ... });
//Utilizei o destructuring para extrair valores dos inputs em uma única linha de código.
//Utilize o spread operator para adicionar a nova conta ao array de contas existente de uma maneira mais limpa.