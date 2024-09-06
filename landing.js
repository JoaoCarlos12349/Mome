// Adicionando um evento para quando o documento estiver completamente carregado
document.addEventListener("DOMContentLoaded", function () {
  // Seleciona o botão de Login e altera seu conteúdo de texto
  var loginButton = document.querySelector('button a[href="login.html"]');
  loginButton.innerHTML = "Entre";

  // Seleciona o botão de Cadastro e altera seu conteúdo de texto
  var cadastroButton = document.querySelector('button a[href="cadastro.html"]');
  cadastroButton.innerHTML = "Cadastre-se";

  // Adiciona uma classe "highlight" ao parágrafo principal
  var textPrin = document.getElementById("textPrin");
  textPrin.classList.add("highlight");

  // Altera o conteúdo do parágrafo dentro do footer
  var footerParagrafo = document.querySelector("footer p");
  footerParagrafo.innerHTML += " Desenvolvido com muito carinho!";

  // Cria um novo parágrafo e adiciona ao final do section
  var novoParagrafo = document.createElement("p");
  novoParagrafo.innerHTML = "Aproveite para assistir aos filmes mais recomendados!";
  document.querySelector("section").appendChild(novoParagrafo);

  // Manipulação do dialog
  var dialog = document.getElementById("spam");
  
  // Fechar o dialog após resposta
  dialog.addEventListener("close", function () {
      if (dialog.returnValue === "sim") {
          alert("Ficamos felizes que você está gostando!");
      } else if (dialog.returnValue === "nao") {
          alert("Lamentamos ouvir isso, vamos melhorar!");
      }
  });
});

  //modificações feitas : Uso de var: Substituí const e let por var para garantir compatibilidade com o ES5, que não suporta const e let.