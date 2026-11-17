# API do CineTrack

A API do CineTrack é feita com Node e Express e guarda os filmes no arquivo `backend/data/filmes.json`. O endereço padrão é `http://localhost:3000`, e a porta vem da variável `PORT` do `backend/.env`. O CORS está liberado para qualquer origem, então o frontend em `http://localhost:5173` consegue chamar todas as rotas. As rotas que recebem corpo esperam JSON, com o cabeçalho `Content-Type: application/json`.

Como rodar a API está explicado no [README](../README.md#como-rodar-o-backend).

## Formato de um filme

| Campo | Tipo | Regra |
|-------|------|-------|
| `id` | número | Gerado pelo servidor: o maior id da lista mais 1. Não muda depois de criado |
| `titulo` | texto | Obrigatório |
| `ano` | número | Obrigatório, entre 1888 e 2030 |
| `genero` | texto | Opcional |
| `poster` | texto (URL) | Opcional. Quando fica vazio, o frontend mostra uma imagem padrão |
| `status` | texto | Obrigatório: `assistido`, `assistindo` ou `quero` |
| `nota` | número | Obrigatório, de 1 a 5 |
| `comentario` | texto | Opcional |

Exemplo:

```json
{
  "id": 4,
  "titulo": "Duna: Parte Dois",
  "ano": 2024,
  "genero": "Ficção científica",
  "nota": 4,
  "status": "assistindo",
  "comentario": "",
  "poster": "https://media.themoviedb.org/t/p/w600_and_h900_face/VMy4UGsI2u3f4fALGeCqCdsQBb.jpg"
}
```

## Respostas de erro

- **400 Bad Request:** o filme enviado tem algum problema. A resposta traz todos os problemas de uma vez:
  ```json
  { "erros": ["nota deve estar entre 1 e 5", "status deve ser assistido, assistindo ou quero"] }
  ```
  As mensagens possíveis são `título é obrigatório`, `ano deve estar entre 1888 e 2030`, `nota deve estar entre 1 e 5` e `status deve ser assistido, assistindo ou quero`.
- **404 Not Found:** não existe filme com o id da URL:
  ```json
  { "erro": "Filme não encontrado" }
  ```

## GET /filmes

| | |
|---|---|
| Método | `GET` |
| Caminho | `/filmes` |
| Parâmetros | `status` (opcional): só os filmes desse status. `q` (opcional): só os filmes cujo título contém o texto, sem diferenciar maiúsculas de minúsculas. Os dois podem vir juntos e aí valem os dois critérios |
| Corpo | Nenhum |
| Respostas | `200`: lista de filmes (vazia se nenhum filme combinar com os filtros) |

Exemplos: `GET /filmes?status=quero`, `GET /filmes?q=du` e `GET /filmes?q=a&status=quero`.

## GET /filmes/:id

| | |
|---|---|
| Método | `GET` |
| Caminho | `/filmes/:id` |
| Parâmetros | `id` na URL: o id do filme |
| Corpo | Nenhum |
| Respostas | `200`: o filme. `404`: não existe filme com esse id |

## GET /stats

| | |
|---|---|
| Método | `GET` |
| Caminho | `/stats` |
| Parâmetros | Nenhum |
| Corpo | Nenhum |
| Respostas | `200`: resumo da coleção com `total` (número de filmes), `porStatus` (quantos filmes há em cada status) e `mediaNotas` (média das notas com 1 casa decimal, ou 0 quando não há filmes) |

Com o banco do seed, a resposta é:

```json
{ "total": 6, "porStatus": { "assistido": 3, "assistindo": 1, "quero": 2 }, "mediaNotas": 4.5 }
```

## POST /filmes

| | |
|---|---|
| Método | `POST` |
| Caminho | `/filmes` |
| Parâmetros | Nenhum |
| Corpo | O filme em JSON, sem `id`. Se o corpo trouxer um `id`, ele é ignorado e o servidor gera outro |
| Respostas | `201`: o filme criado, já com o `id`. `400`: lista de erros de validação, e nada é gravado |

Exemplo de corpo:

```json
{ "titulo": "Coringa", "ano": 2019, "genero": "Drama", "nota": 4, "status": "quero", "comentario": "", "poster": "" }
```

## PUT /filmes/:id

| | |
|---|---|
| Método | `PUT` |
| Caminho | `/filmes/:id` |
| Parâmetros | `id` na URL: o id do filme a alterar |
| Corpo | Os campos que mudam, em JSON. Eles são juntados ao filme atual, e o resultado passa pela mesma validação do `POST`. O `id` da URL é mantido, mesmo que o corpo traga outro |
| Respostas | `200`: o filme atualizado. `400`: lista de erros de validação, e nada é gravado. `404`: não existe filme com esse id |

Exemplo: `PUT /filmes/7` com o corpo `{ "nota": 5, "status": "assistido" }`.

## DELETE /filmes/:id

| | |
|---|---|
| Método | `DELETE` |
| Caminho | `/filmes/:id` |
| Parâmetros | `id` na URL: o id do filme a remover |
| Corpo | Nenhum |
| Respostas | `204`: filme removido, resposta sem corpo. `404`: não existe filme com esse id |
