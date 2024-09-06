const formlogin = document.getElementById("forml");

formlogin.addEventListener("submit", (event) => {
  event.preventDefault();

  // Obtém as contas armazenadas no localStorage
  const contas = JSON.parse(localStorage.getItem("contas")) || [];

  // Obtém o valor do usuário do input
  const usuario = document.getElementById("user").value;
  
  // Utilizando destructuring para criar variável conta e comparar com o usuario
  const conta = contas.find(({ usuario: u }) => u === usuario);

  // Armazena o usuário logado no sessionStorage
  sessionStorage.setItem("usulogado", JSON.stringify(conta));

  // Obtém o valor da senha do input
  const senhaes = document.getElementById("senha").value;

  // Verifica se a conta existe e se a senha está correta
  if (!conta || conta.senha !== senhaes) {
    alert("Usuário ou senha incorretos.");
    return;
  }

  // Redireciona para a página "home.html" se o login for bem-sucedido
  window.location.href = "home.html";
});




//implementações js moderno:
//Arrow Functions: usamos arrow functions para simplificar a sintaxe.
//Destructuring: usamos destructuring para extrair propriedades dos objetos.
//Métodos de Manipulação de Arrays: usamos métodos de array como find.