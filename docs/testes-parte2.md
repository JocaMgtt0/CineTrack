# Testes da Parte 2

Teste ponta a ponta do CineTrack full stack, feito em 16/11/2026 seguindo o roteiro da ANP 10. Comecei do zero, num clone limpo do repositório (commit `621c488`), no Windows 10 com Node 24.18. Backend e frontend rodaram em terminais separados, e a interface foi usada no navegador, acompanhando as chamadas na aba Network. Para os casos de cadastro foi usado o filme Coringa (2019, Drama, status Quero assistir, nota 4, sem pôster).

## Preparação a partir do zero

| # | Passo | Comando | Resultado |
|---|-------|---------|-----------|
| 1 | Clonar o repositório | `git clone https://github.com/JocaMgtt0/CineTrack.git` | Clone criado, sem `node_modules`, sem `.env` e com o `data/filmes.json` do seed |
| 2 | Instalar o backend | `cd backend` e `npm install` | 73 pacotes instalados |
| 3 | Subir o backend sem o `.env` | `npm run dev` | Não subiu: o Node avisou `.env: not found`. Por isso o README manda copiar o `.env.example` antes |
| 4 | Criar o `.env` | `cp .env.example .env` | Arquivo criado com `PORT=3000` |
| 5 | Gravar o banco inicial | `node seed.js` | `6 filmes gravados em ...\backend\data\filmes.json` |
| 6 | Subir o backend | `npm run dev` | `API na porta 3000` |
| 7 | Instalar o frontend | `cd frontend` e `npm install` | 143 pacotes instalados |
| 8 | Subir o frontend | `npm run dev` | Vite no ar em `http://localhost:5173` |

## Roteiro executado pela interface

| # | Caso | Resultado esperado | Resultado |
|---|------|--------------------|-----------|
| 1 | Abrir `http://localhost:5173` | Os 6 filmes do seed carregam da API | Passou: `GET /filmes` respondeu 200 e a tela mostrou "Exibindo 6 de 6 filmes" |
| 2 | Adicionar o Coringa pelo modal | O card aparece com o id gerado pelo servidor | Passou: `POST /filmes` respondeu 201, o modal fechou, o card do Coringa apareceu com a imagem padrão "Sem poster" e o total foi para 7 |
| 3 | Editar o Coringa: status Assistido, nota 5 e comentário "Visto no teste da parte 2" | Só o card do Coringa muda | Passou: `PUT /filmes/7` respondeu 200 e só esse card mudou, sem duplicar |
| 4 | Remover Parasita | O card some da lista e do banco | Passou: `DELETE /filmes/2` respondeu 204, o card sumiu e o total voltou para 6 |
| 5 | Buscar "a" com o filtro Quero assistir | Os dois critérios se combinam | Passou: ficaram só Interestelar e Cidade de Deus, "Exibindo 2 de 6 filmes" |
| 6 | Parar o backend (Ctrl+C), subir de novo com `npm run dev` e recarregar a página | Os dados continuam como estavam | Passou: com o servidor parado, o `data/filmes.json` já tinha os 6 filmes com o Coringa editado e sem Parasita. Depois de reiniciar, a tela mostrou a mesma lista e o `/stats` respondeu `total` 6, `porStatus` { assistido: 3, assistindo: 1, quero: 2 } e `mediaNotas` 4.7 |

Na aba Network aparece um `OPTIONS` antes de cada chamada. É o preflight do CORS, porque o frontend envia o cabeçalho `Content-Type: application/json`, e o `cors()` do backend responde com 204.

## Validação no servidor

Testada com o curl no mesmo clone, depois de rodar o `node seed.js` de novo:

| # | Requisição | Resultado esperado | Resultado |
|---|------------|--------------------|-----------|
| 1 | `POST /filmes` com nota 7 e status "vi" | 400 com os dois erros | Passou: 400 com `{"erros":["nota deve estar entre 1 e 5","status deve ser assistido, assistindo ou quero"]}` |
| 2 | `POST /filmes` com o Coringa válido | 201 com o filme criado | Passou: 201 e o filme voltou com `id` 7 |
| 3 | `POST /filmes` sem corpo | 400 com todos os erros | Passou: 400 com os quatro erros (título, ano, nota e status) |
| 4 | `POST /filmes` com ano 1800 e sem título | 400 com os dois erros | Passou: 400 com `título é obrigatório` e `ano deve estar entre 1888 e 2030` |
| 5 | `PUT /filmes/7` com nota 0 e status "talvez" | 400, a mesma validação do POST | Passou: 400 com os erros de nota e de status, e o filme não mudou |
| 6 | `PUT /filmes/7` só com `{"nota":5}` | 200 com o filme atualizado | Passou: 200, nota 5 e os outros campos mantidos |
| 7 | `PUT /filmes/99` | 404 | Passou: 404 com `{"erro":"Filme não encontrado"}` |
| 8 | `DELETE /filmes/7` | 204 sem corpo | Passou: 204 |
| 9 | `GET /filmes/99` | 404 | Passou: 404 |
| 10 | `GET /stats` | Com o banco do seed: total 6 e média 4.5 | Passou: `{"total":6,"porStatus":{"assistido":3,"assistindo":1,"quero":2},"mediaNotas":4.5}` |

## Erros mostrados no frontend

| # | Caso | Resultado esperado | Resultado |
|---|------|--------------------|-----------|
| 1 | Tirar o `max` do campo Nota pelo DevTools e enviar nota 7 | O erro do servidor aparece no modal e nada é salvo | Passou: `POST /filmes` respondeu 400, o modal continuou aberto e mostrou em vermelho "nota deve estar entre 1 e 5" |
| 2 | Desligar o backend e tentar salvar um filme | O modal avisa que a API está fora do ar | Passou: o modal mostrou "Sem conexão com a API. Confira se o backend está rodando." |
| 3 | Desligar o backend e recarregar a página | A tela avisa em vez de ficar vazia | Passou: apareceu "Não foi possível carregar os filmes. Sem conexão com a API. Confira se o backend está rodando." |

O caso 1 precisa do DevTools porque o próprio formulário já bloqueia a nota fora de 1 a 5 (`min` e `max` no campo), igual na Parte 1. A validação do servidor é a segunda camada, para quem chamar a API por fora da interface.

## Correções feitas antes desta rodada

| Problema | Commit |
|----------|--------|
| O servidor aceitava nota 7 e status inventado, e um `POST` sem corpo dava erro 500 | `f637079 feat: validacao no servidor` |
| O erro da API não aparecia para o usuário: o modal não mostrava nada e a tela só dizia "Failed to fetch" | `e862f10 fix: erros da api exibidos no modal` |
| Card do React sem imagem quando o pôster ficava vazio (RF-01), com aviso de `src` vazio no console | `41344ed fix: poster padrao no card` |
| `/stats` devolvia `mediaNotas` `null` quando não havia filmes | `866f6af fix: media das notas sem filmes` |

## Segunda rodada: remoção

Em 17/11/2026, ao conferir o código com a especificação da Parte 2, apareceram dois pontos que faltavam na remoção:

| Problema | Requisito | Commit |
|----------|-----------|--------|
| O botão Remover apagava direto, sem pedir confirmação como na Parte 1 | RF-01 e RF-06 | `d41d389 fix: confirmacao antes de remover` |
| Se a remoção falhasse, o erro ia só para o console, sem mensagem na tela | RF-05 | `9d8c6db fix: aviso quando a remocao falha` |

Depois das correções, a remoção foi testada de novo pela interface. Nesta rodada, as portas 3000 e 5173 estavam ocupadas por outro projeto no Docker. Por isso o backend subiu com `PORT=3001`, o Vite subiu na porta 5174 e o `BASE` do `api.js` apontou para a 3001 só durante o teste, sem ir para o commit. A resposta da confirmação foi controlada pelo console do DevTools, substituindo o `window.confirm`, para testar o Cancelar e o OK.

| # | Caso | Resultado esperado | Resultado |
|---|------|--------------------|-----------|
| 1 | Remover Parasita e cancelar a confirmação | O filme continua e nada é enviado à API | Passou: apareceu a pergunta "Remover este filme?", o card continuou e nenhum `DELETE` foi feito |
| 2 | Remover Parasita e confirmar | O card some | Passou: `DELETE /filmes/2` respondeu 204 e o card sumiu |
| 3 | Remover um filme que já tinha sido apagado por fora (`DELETE /filmes/3` direto na API) | A tela avisa e o card continua | Passou: apareceu em vermelho "Não foi possível remover o filme. Filme não encontrado" |
| 4 | Desligar o backend e remover Duna | A tela avisa e continua funcionando | Passou: apareceu "Não foi possível remover o filme. Sem conexão com a API. Confira se o backend está rodando.", o card continuou e o filtro Assistindo seguiu funcionando |
