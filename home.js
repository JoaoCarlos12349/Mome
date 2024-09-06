class Filme {
  constructor(nome, link, nota) {
    this.nome = nome;
    this.link = link;
    this.nota = nota;
  }
}

// Função para remover o usuário logado ao clicar em "Sair"
document.getElementById("logout").addEventListener("click", function () {
  salvaConta();
  sessionStorage.removeItem("usulogado");
});

const salvaConta = () => {
  let usuariolog = JSON.parse(sessionStorage.getItem("usulogado"));

  const contas = JSON.parse(localStorage.getItem("contas"));
  const index = contas.findIndex(({ usuario: u }) => u === usuariolog.usuario);

  contas[index] = usuariolog;

  localStorage.setItem("contas", JSON.stringify(contas));
};

// Espera o DOM ser carregado completamente
document.addEventListener("DOMContentLoaded", function () {
  let usuariolog = JSON.parse(sessionStorage.getItem("usulogado"));
  const listfilmes = document.getElementById("listafilmes");

  if (usuariolog.filmes.length == 0) {
    listfilmes.classList.remove("onfilmes");
    listfilmes.classList.add("offfilmes");
  } else {
    listfilmes.classList.remove("offfilmes");
    listfilmes.classList.add("onfilmes");
  }

  carregaFilmes();
  // Função para adicionar uma classe a um elemento
  const alteraClasse = (item, classe) => {
    document.getElementById(item).classList.add(classe);
  };

  // Seleciona todos os botões "Detalhar", "Editar", e "Excluir"
  const detalharButtons = document.querySelectorAll(
    "#listafilmes li button:nth-of-type(1)"
  );
  const editarButtons = document.querySelectorAll(
    "#listafilmes li button:nth-of-type(2)"
  );
  const excluirButtons = document.querySelectorAll(
    "#listafilmes li button:nth-of-type(3)"
  );
  const notaRange = document.querySelectorAll("#listafilmes li input");

  // Função para detalhar um filme
  detalharButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      const filmeTitulo =
        document.querySelectorAll("#listafilmes h2")[index].innerText;
      const nota = document.querySelectorAll("#listafilmes input")[index].value;
      alert(`Detalhando o filme: ${filmeTitulo} /n Nota : ${nota}`);
    });
  });

  notaRange.forEach((input, index) => {
    input.addEventListener("input", function () {
      const filmeTitulo = document.querySelectorAll("#listafilmes h2")[index];
      const filmesel = filmeTitulo.innerText;
      const valor = input.value;

      let usuariolog = JSON.parse(sessionStorage.getItem("usulogado"));

      const index1 = usuariolog.filmes.findIndex(
        ({ filmes: filmesel }) => filmesel === usuariolog.filmes.nome
      );

      usuariolog.filmes[index1].nota = valor;
      sessionStorage.setItem("usulogado", JSON.stringify(usuariolog));
    });
  });

  // Função para editar um filme
  editarButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      const filmeTitulo = document.querySelectorAll("#listafilmes h2")[index];
      const novoTitulo = prompt(
        "Edite o título do filme:",
        filmeTitulo.innerText
      );
      if (novoTitulo) {
        filmeTitulo.innerText = novoTitulo;

        let usuariolog = JSON.parse(sessionStorage.getItem("usulogado"));

        const index1 = usuariolog.filmes.findIndex(
          ({ filmes: nomeAnt }) => nomeAnt === usuariolog.filmes.nome
        );
        console.log(index1);

        usuariolog.filmes[index1].nome = novoTitulo;

        sessionStorage.setItem("usulogado", JSON.stringify(usuariolog));
      }
    });
  });

  // Função para excluir um filme
  excluirButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      const filme = document.querySelectorAll("#listafilmes li")[index];
      const nomees = filme.querySelector("h2").textContent;
      console.log(nomees);
      const confirmacao = confirm("Tem certeza que deseja excluir este filme?");
      if (confirmacao) {
        filme.remove();

        let usuariolog = JSON.parse(sessionStorage.getItem("usulogado"));
        let index1 = usuariolog.filmes.findIndex(
          (filme) => filme.nome === nomees
        );
        console.log(index1);
        usuariolog.filmes.splice(index1, 1);

        sessionStorage.setItem("usulogado", JSON.stringify(usuariolog));
        window.location.reload();
      }
    });
  });

  // Função para registrar um novo filme
  document.getElementById("registrar").addEventListener("click", function () {
    const novoFilmeTitulo = prompt("Digite o título do novo filme:");
    const novoFilmeURL = prompt("Digite o URL do trailer do novo filme:");
    const novoFilmenota = prompt("Digite uma nota para novo filme (Entre 1 a 5):");

    if (novoFilmeTitulo && novoFilmeURL && novoFilmenota) {
      const novoFilme = document.createElement("li");

      // Define o conteúdo HTML do novo filme usando innerHTML
      novoFilme.innerHTML = `
                <h2 class ="nomefilme">${novoFilmeTitulo}</h2>
                <iframe
                    src="${novoFilmeURL}"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                ></iframe>
                <input type="range" value="${novoFilmenota}" min="1" max="5" />
                <button>Detalhar</button>
                <button>Editar</button>
                <button>Excluir</button>
            `;
      const filmecriado = new Filme(
        novoFilmeTitulo,
        novoFilmeURL,
        novoFilmenota
      );
      salvaFilme(filmecriado);

      // Adiciona o novo filme à lista de filmes usando appendChild
      document.getElementById("listafilmes").appendChild(novoFilme);

      // Reaplica os eventos nos botões do novo filme
      novoFilme
        .querySelector("button:nth-of-type(1)")
        .addEventListener("click", function () {
          alert(`Detalhando o filme: ${novoFilmeTitulo}`);
        });

      novoFilme
        .querySelector("button:nth-of-type(2)")
        .addEventListener("click", function () {
          const filmeTitulo =
            document.querySelectorAll("#listafilmes h2")[index];
          const nomeAnt = filmeTitulo.innerText;
          const novoTitulo = prompt(
            "Edite o título do filme:",
            filmeTitulo.innerText
          );
          if (novoTitulo) {
            filmeTitulo.innerText = novoTitulo;

            let usuariolog = JSON.parse(sessionStorage.getItem("usulogado"));

            const index1 = usuariolog.filmes.findIndex(
              ({ filmes: nomeAnt }) => nomeAnt === usuariolog.filmes.nome
            );
            console.log(index1);

            usuariolog.filmes[index1].nome = novoTitulo;

            sessionStorage.setItem("usulogado", JSON.stringify(usuariolog));
          }
        });

      novoFilme
        .querySelector("button:nth-of-type(3)")
        .addEventListener("click", function () {
          const filme = document.querySelectorAll("#listafilmes li")[index];
          const nomees = filme.querySelector("h2").textContent;
          console.log(nomees);
          const confirmacao = confirm(
            "Tem certeza que deseja excluir este filme?"
          );
          if (confirmacao) {
            filme.remove();

            let usuariolog = JSON.parse(sessionStorage.getItem("usulogado"));
            let index1 = usuariolog.filmes.findIndex(
              (filme) => filme.nome === nomees
            );
            console.log(index1);
            usuariolog.filmes.splice(index1, 1);

            sessionStorage.setItem("usulogado", JSON.stringify(usuariolog));
          }
        });
    }
    window.location.reload();
  });
});

const salvaFilme = (filme) => {
  let usuario = JSON.parse(sessionStorage.getItem("usulogado"));
  usuario.filmes.push(filme);
  sessionStorage.setItem("usulogado", JSON.stringify(usuario));
};

const carregaFilmes = () => {
  let usuario = JSON.parse(sessionStorage.getItem("usulogado"));

  usuario.filmes.forEach((filmecar) => {
    const novoFilme = document.createElement("li");

    // Define o conteúdo HTML do novo filme usando innerHTML
    novoFilme.innerHTML = `
                <h2 class ="nomefilme">${filmecar.nome}</h2>
                <iframe
                    src="${filmecar.link}"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                ></iframe>
                <input type="range" value="${filmecar.nota}" min="1" max="5" />
                <button>Detalhar</button>
                <button>Editar</button>
                <button>Excluir</button>
            `;

    // Adiciona o novo filme à lista de filmes usando appendChild
    document.getElementById("listafilmes").appendChild(novoFilme);
  });
};
