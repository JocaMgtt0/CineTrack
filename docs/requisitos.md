# Requisitos do CineTrack

## Campos de um filme

1. Título
2. Ano
3. Gênero
4. URL do pôster
5. Status
6. Nota
7. Comentário

## Áreas da interface

1. Cabeçalho, com a busca por título e o botão de adicionar filme
2. Navegação de filtros, pra mostrar todos os filmes ou só os de um status
3. Lista de filmes, com os cards de cada filme cadastrado
4. Formulário de cadastro, pra adicionar ou editar um filme

## Ações da API

| Ação | Método | Rota |
| --- | --- | --- |
| Listar | GET | /filmes |
| Buscar | GET | /filmes/:id |
| Cadastrar | POST | /filmes |
| Editar | PUT | /filmes/:id |
| Remover | DELETE | /filmes/:id |
