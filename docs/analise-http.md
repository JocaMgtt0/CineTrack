# Análise de tráfego HTTP

## 1. Primeira requisição de um site real

Abri o developer.mozilla.org com o DevTools já na aba Rede e recarreguei a página. A primeira requisição da lista foi:

Método: GET
URL: https://developer.mozilla.org/pt-BR/
Status: 304 Not Modified

Esse 304 significa que o navegador perguntou pro servidor se a página tinha mudado desde a última vez, e o servidor respondeu que não, então ele usou a cópia que já estava guardada no cache em vez de baixar tudo de novo.

## 2. Recursos estáticos

Filtrando por tipo de arquivo na mesma página, peguei um exemplo de cada:

CSS: status 200 OK, Content-Type text/css
JS: status 200 OK, Content-Type text/javascript
Imagem: status 200 OK, Content-Type image/png

## 3. Provocando um 404

Troquei a URL pra um caminho que não existe (developer.mozilla.org/pt-BR/pagina-que-nao-existe-123) e recarreguei. O documento principal da página voltou com status 404 Not Found, e na tela apareceu um aviso de página não encontrada, em vez do conteúdo normal.

O interessante é que o CSS, o JS e a imagem continuaram voltando 200. Isso acontece porque esses arquivos são o layout do site inteiro, e existem independente da rota que a gente tentou acessar. Só o documento daquela rota específica é que não existe, então só ele retorna 404.

## 4. Requisição de API (Fetch/XHR)

Fui na busca do YouTube, filtrei por Fetch/XHR no DevTools e digitei "teste" na busca. Apareceram várias requisições, entre elas:

A busca em si:
Método: POST
URL: https://www.youtube.com/youtubei/v1/search?prettyPrint=false
Status: 200 OK
Content-Type: application/json

E também uma chamada de sugestão automática (enquanto eu digitava):
Método: GET
URL: https://suggestqueries-clients6.youtube.com/complete/search (com o termo digitado na query)
Status: 200 OK

Comparando com a tabela do meu docs/requisitos.md, reparei que o YouTube usa POST pra fazer a busca principal, mesmo sendo uma operação de leitura, diferente do padrão REST mais puro que segui no CineTrack, onde listar e buscar usam GET. Já a chamada de sugestão automática usa GET, que faz mais sentido com o método expressando a intenção de só ler dados. Ou seja, nem toda API segue o REST à risca, às vezes a escolha do método depende de outras coisas do sistema interno.

## 5. E o CineTrack?

Pra listar os filmes, o CineTrack vai usar GET /filmes. Faz sentido porque é uma operação de leitura, sem efeito colateral, e a URL já identifica o recurso (a coleção de filmes) sem precisar de verbo no caminho. O corpo da resposta deve vir um array em JSON, com cada filme tendo os campos que já defini no requisitos.md: título, ano, gênero, url do pôster, status, nota e comentário.
