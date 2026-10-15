# CineTrack

O CineTrack é um catálogo pessoal de filmes que estou construindo na disciplina de Programação de Sistemas Web. Nele dá pra cadastrar filmes, marcar o status de cada um (assistido, assistindo ou quero assistir), dar uma nota e deixar um comentário. A parte 1 do projeto é só frontend, feita com HTML, CSS e JavaScript puro. Na parte 2 o projeto ganha uma API construída com Node e passa a guardar os dados de verdade.

## Autor

- Nome: Joaquim Menegotto Vieira
- RA: 139413
- Trabalho feito individualmente

## Como executar

A parte 1 não precisa de instalação, de servidor nem de banco de dados.

1. Clone o repositório: `git clone https://github.com/JocaMgtt0/CineTrack.git`
2. Abra o arquivo `parte1/index.html` no navegador (clique duas vezes nele) ou, se preferir, use a extensão Live Server do VS Code.

Os filmes ficam salvos no `localStorage` do navegador, na chave `cinetrack:filmes`. Para voltar aos 6 filmes iniciais, apague essa chave (F12, aba Application, Local Storage) e recarregue a página.

## O que funciona

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
- Página Sobre (`parte1/sobre.html`).

O roteiro de testes executado na entrega está em [docs/testes-parte1.md](docs/testes-parte1.md).

## Estrutura

```
CineTrack/
|-- README.md
|-- .gitignore
|-- docs/
|   |-- requisitos.md
|   |-- analise-http.md
|   |-- testes-parte1.md
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

`parte1/adicionar.html` é a página de formulário do módulo de HTML e não está ligada ao `app.js`: o cadastro do app é feito pelo modal do `index.html`. A pasta `exercicios/anp05` guarda a atividade de módulos ES6, que usa `type="module"`, e por isso fica separada do `app.js` único da parte 1.

## Tecnologias

HTML5, CSS3 e JavaScript (ES6+) puro, sem frameworks.
