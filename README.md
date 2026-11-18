# CineTrack

O CineTrack é um catálogo pessoal de filmes que estou construindo na disciplina de Programação de Sistemas Web. Nele dá pra cadastrar filmes, marcar o status de cada um (assistido, assistindo ou quero assistir), dar uma nota e deixar um comentário. A parte 1 do projeto é só frontend, feita com HTML, CSS e JavaScript puro. Na parte 2 o frontend foi refeito em React e o projeto ganhou uma API construída com Node, que guarda os dados de verdade num arquivo JSON.

## Autor

- Nome: Joaquim Menegotto Vieira
- RA: 139413
- Trabalho feito individualmente

## Como executar a parte 1

A parte 1 não precisa de instalação, de servidor nem de banco de dados.

1. Clone o repositório: `git clone https://github.com/JocaMgtt0/CineTrack.git`
2. Abra o arquivo `parte1/index.html` no navegador (clique duas vezes nele) ou, se preferir, use a extensão Live Server do VS Code.

Os filmes ficam salvos no `localStorage` do navegador, na chave `cinetrack:filmes`. Para voltar aos 6 filmes iniciais, apague essa chave (F12, aba Application, Local Storage) e recarregue a página.

## Como rodar o backend

O backend é uma API feita com Node e Express, que guarda os filmes no arquivo `backend/data/filmes.json`. Precisa do Node 20.6 ou mais novo, por causa da opção `--env-file`.

1. Entre na pasta: `cd backend`
2. Instale as dependências: `npm install`
3. Crie o `.env` a partir do exemplo: `cp .env.example .env` (no Prompt de Comando do Windows: `copy .env.example .env`). Sem esse arquivo o servidor não sobe.
4. Grave os 6 filmes iniciais: `npm run seed`
5. Suba a API: `npm run dev` (ou `npm start`, sem recarga automática)

A API fica em `http://localhost:3000`. Pra conferir, abra `http://localhost:3000/filmes` no navegador.

## Como rodar o frontend

Com a API no ar, abra outro terminal na raiz do repositório:

1. Entre na pasta: `cd frontend`
2. Instale as dependências: `npm install`
3. Suba o Vite: `npm run dev`
4. Abra `http://localhost:5173` no navegador.

Pra gerar a versão de produção, rode `npm run build` dentro de `frontend/`. Os arquivos saem em `frontend/dist/`.

## O que funciona na parte 2

Frontend em React (`frontend/`):

- Lista de filmes carregada da API, com as mensagens de carregando, de erro e de lista vazia.
- Cadastro e edição no mesmo modal, e remoção pelo botão do card, com confirmação. Cada ação chama a API primeiro e só depois atualiza a tela.
- Erros da API aparecem dentro do modal, como a lista de erros de validação do servidor. Se o backend estiver fora do ar ou a remoção falhar, a tela avisa.
- Busca por título e filtro por status combinados, guardados no `localStorage` (continuam iguais depois de recarregar a página).
- Contador "Exibindo X de Y filmes" e o total de filmes no título da aba.
- Pôster padrão quando a URL fica vazia.
- Componentes: `Header`, `Filtros`, `ListaFilmes`, `CardFilme`, `ModalFilme`, `Estrelas` e `Badge`.

API em Node com Express (`backend/`):

- `GET /filmes` com os filtros `?status=` e `?q=` (busca no título), que podem vir juntos.
- `GET /filmes/:id`, `POST /filmes`, `PUT /filmes/:id` e `DELETE /filmes/:id`, com 404 quando o filme não existe.
- `GET /stats` com o total de filmes, a contagem por status e a média das notas.
- Validação no `POST` e no `PUT`: título e ano obrigatórios, nota de 1 a 5 e status válido. O 400 devolve todos os problemas de uma vez.
- Dados gravados em `backend/data/filmes.json`, que continuam lá depois de reiniciar o servidor. O `seed.js` recria os 6 filmes iniciais.
- CORS liberado para o frontend, log das requisições com o morgan e porta configurada pelo `.env`.

A documentação de cada rota está em [docs/api.md](docs/api.md), e o teste ponta a ponta da entrega está em [docs/testes-parte2.md](docs/testes-parte2.md).

## O que funciona na parte 1

- Lista de filmes em uma grade responsiva de cards, gerada pelo JavaScript a partir dos dados em memória.
- Busca por título enquanto se digita, sem diferenciar maiúsculas de minúsculas, com debounce.
- Filtro por status (Todos, Assistido, Assistindo e Quero assistir), combinado com a busca.
- Ordenação por título, ano ou nota, combinada com a busca e com o filtro.
- Cadastro de filme em um modal, com validação nativa do HTML e validação em JavaScript. Os erros aparecem dentro do modal.
- Edição de filme reaproveitando o mesmo modal, já preenchido.
- Remoção com confirmação.
- Persistência no `localStorage`: a lista continua igual depois de recarregar a página.
- Na primeira visita, carrega os 6 filmes de exemplo do enunciado.
- Pôster com texto alternativo e imagem padrão quando a URL fica vazia.
- Tema com variáveis CSS e dark mode automático (`prefers-color-scheme`).
- Acessibilidade: nota 100 no Lighthouse, tanto no desktop quanto no mobile.
- Página Sobre (`parte1/sobre.html`).

O roteiro de testes executado na entrega está em [docs/testes-parte1.md](docs/testes-parte1.md).

## Estrutura

```
CineTrack/
|-- README.md
|-- .gitignore
|-- backend/
|   |-- server.js
|   |-- seed.js
|   |-- package.json
|   |-- .env.example
|   `-- data/
|       `-- filmes.json
|-- frontend/
|   |-- index.html
|   |-- package.json
|   |-- vite.config.js
|   `-- src/
|       |-- main.jsx
|       |-- App.jsx
|       |-- api.js
|       |-- index.css
|       |-- data/
|       |   `-- filmes.js
|       `-- components/
|-- docs/
|   |-- requisitos.md
|   |-- analise-http.md
|   |-- api.md
|   |-- testes-parte1.md
|   |-- testes-parte2.md
|   `-- rascunho-tela.jpg
|-- exercicios/
|   `-- anp05/
`-- parte1/
    |-- index.html
    |-- sobre.html
    |-- adicionar.html
    |-- style.css
    `-- app.js
```

O `backend/.env` não vai para o repositório: cada um cria o seu a partir do `.env.example`. O `frontend/src/data/filmes.js` guarda os filmes que o React usava antes de existir a API e ficou de registro do módulo de React; hoje a lista vem do backend.

`parte1/adicionar.html` é a página de formulário do módulo de HTML e não está ligada ao `app.js`: o cadastro do app é feito pelo modal do `index.html`. A pasta `exercicios/anp05` guarda a atividade de módulos ES6, que usa `type="module"`, e por isso fica separada do `app.js` único da parte 1.

## Tecnologias

- Parte 1: HTML5, CSS3 e JavaScript (ES6+) puro, sem frameworks.
- Parte 2, frontend: React com Vite.
- Parte 2, backend: Node com Express, cors e morgan, e os dados num arquivo JSON.
