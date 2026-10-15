# Testes da Parte 1

Teste de mesa do CineTrack (`parte1/`), feito no navegador Chrome abrindo o `parte1/index.html`, em 15/10/2026, seguindo o roteiro da ANP 06. Para os casos de cadastro foi usado o filme Matrix (1999, Ficção científica, status Assistido, nota 5).

## Roteiro executado

| # | Caso | Resultado esperado | Resultado | Correção feita |
|---|------|--------------------|-----------|----------------|
| 1 | Adicionar um filme válido | O card aparece na lista sem recarregar a página | Passou: o card do Matrix apareceu na lista sem recarregar | Nenhuma nesta rodada |
| 2 | Enviar ano fora da faixa (1800) | O erro aparece na interface e nada é salvo | Passou: o navegador exibiu "O valor deve ser maior ou igual a 1888." no campo Ano e o filme não foi salvo | Nenhuma nesta rodada |
| 3 | Editar um filme | O card certo muda, sem duplicar | Passou: o título de Cidade de Deus foi alterado para "deus da cidade" e só esse card mudou, sem duplicar | Nenhuma nesta rodada |
| 4 | Remover e cancelar a confirmação | O filme continua na lista | Passou: ao cancelar a confirmação o filme continuou | Nenhuma nesta rodada |
| 5 | Busca e filtro de status juntos | Os dois critérios se combinam | Passou: a lista mostrou só os filmes que atendem à busca e ao status escolhido | Nenhuma nesta rodada |
| 6 | Recarregar a página | A lista persiste | Passou: depois do F5 a lista continuou como estava | Nenhuma nesta rodada |
| 7 | Esc e Cancelar fecham o modal | O modal fecha pelas duas formas | Passou: o modal fechou com a tecla Esc e com o botão Cancelar | Nenhuma nesta rodada |
| 8 | Primeira visita (chave `cinetrack:filmes` apagada na aba Application) | Os 6 filmes canônicos carregam | Passou: os 6 filmes do enunciado carregaram | Nenhuma nesta rodada |

Caso extra, fora do roteiro: a ordenação por título, ano e nota funcionou no navegador, e a ordem escolhida continuou valendo ao trocar de filtro e ao digitar na busca.

## Observação sobre o caso 2

O campo Ano tem `min="1888"` e `max="2030"`, então a validação nativa do HTML bloqueia o envio antes de o JavaScript rodar. A função `validarFilme` continua como segunda camada: se algum erro chegar ao JavaScript, as mensagens aparecem dentro do modal, no elemento `#erros-form`, e o filme não é salvo.

## Correções feitas antes desta rodada

Estes problemas foram encontrados ao comparar o código com a especificação da Parte 1, antes de executar o roteiro, e cada um tem o próprio commit:

| Problema | Commit |
|----------|--------|
| Nota aceitava 0 e não era obrigatória (RF-04) | `fde8468 fix: nota de 1 a 5 obrigatoria` |
| Card sem imagem quando o pôster estava vazio (RF-01) | `b28f2b3 fix: poster padrao quando a url do poster esta vazia` |
| Total de filmes do rodapé ficava fixo | `c2341cc fix: total de filmes do rodape acompanha a lista` |
| Filmes iniciais diferentes dos da Seção 5 (RF-09) | `e7e91dd fix: filmes iniciais do enunciado com posteres reais` |
| Erros do formulário usavam `alert()` (RF-05) | `7d541ff fix: erros do formulario exibidos no modal` |
| `aria-label` da busca escrito "Bucar filmes" | `e2df007 fix: aria-label da busca` |
