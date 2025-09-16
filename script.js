const API_KEY = '5343a50a67cc688d7cbfe9521fb55185';
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`;

const filmesContainer = document.getElementById('filmes');
const listaFavoritos = document.getElementById('lista-favoritos');

let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

// Função para carregar filmes da API
async function carregarFilmes() {
  try {
    const resposta = await fetch(URL);
    const dados = await resposta.json();

    filmesContainer.innerHTML = ''; // Limpa filmes antigos

    dados.results.forEach(filme => {
      const div = document.createElement('div');
      div.classList.add('filme');
      div.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w200${filme.poster_path}" alt="${filme.title}">
        <h3>${filme.title}</h3>
        <button onclick="favoritar(${filme.id}, '${filme.title}', '${filme.poster_path}')">⭐ Favoritar</button>
      `;
      filmesContainer.appendChild(div);
    });
  } catch (erro) {
    console.error('Erro ao carregar filmes:', erro);
  }
}

// Função para favoritar um filme
function favoritar(id, title, poster) {
  if (!favoritos.some(f => f.id === id)) {
    favoritos.push({ id, title, poster });
    salvarFavoritos();
    renderizarFavoritos();
  }
}

// Salva favoritos no LocalStorage
function salvarFavoritos() {
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

// Renderiza a lista de favoritos
function renderizarFavoritos() {
  listaFavoritos.innerHTML = '';
  favoritos.forEach(filme => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w200${filme.poster}" alt="${filme.title}">
      <span>${filme.title}</span>
      <button onclick="removerFavorito(${filme.id})">❌</button>
    `;
    listaFavoritos.appendChild(li);
  });
}

// Remove filme da lista de favoritos
function removerFavorito(id) {
  favoritos = favoritos.filter(f => f.id !== id);
  salvarFavoritos();
  renderizarFavoritos();
}

// Inicialização
carregarFilmes();
renderizarFavoritos();