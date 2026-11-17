const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const fs = require("fs")
const path = require("path")

const app = express()

const ARQUIVO = path.join(__dirname, "data", "filmes.json")

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

// Lê a lista de filmes do arquivo JSON
function lerFilmes() {
  return JSON.parse(fs.readFileSync(ARQUIVO, "utf8"))
}

// Grava a lista inteira de filmes no arquivo JSON
function salvarFilmes(lista) {
  fs.writeFileSync(ARQUIVO, JSON.stringify(lista, null, 2))
}

// Gera um id novo: o maior id da lista mais 1
function gerarId(lista) {
  const ids = lista.map((filme) => filme.id)
  return Math.max(0, ...ids) + 1
}

const STATUS = ["assistido", "assistindo", "quero"]

// Confere os campos do filme e devolve a lista com todos os problemas encontrados
function validarFilme(filme) {
  const erros = []
  if (!filme.titulo)
    erros.push("título é obrigatório")
  if (!filme.ano || filme.ano < 1888 || filme.ano > 2030)
    erros.push("ano deve estar entre 1888 e 2030")
  if (!filme.nota || filme.nota < 1 || filme.nota > 5)
    erros.push("nota deve estar entre 1 e 5")
  if (!STATUS.includes(filme.status))
    erros.push("status deve ser assistido, assistindo ou quero")
  return erros
}

app.get("/filmes", (req, res) => {
  let lista = lerFilmes()
  if (req.query.status)
    lista = lista.filter((f) => f.status === req.query.status)
  if (req.query.q) {
    const termo = req.query.q.toLowerCase()
    lista = lista.filter((f) => f.titulo.toLowerCase().includes(termo))
  }
  res.json(lista)
})

app.get("/filmes/:id", (req, res) => {
  const id = Number(req.params.id)
  const filme = lerFilmes().find((f) => f.id === id)
  if (!filme) return res.status(404).json({ erro: "Filme não encontrado" })
  res.json(filme)
})

app.post("/filmes", (req, res) => {
  const dados = req.body || {}
  const erros = validarFilme(dados)
  if (erros.length > 0) return res.status(400).json({ erros })
  const lista = lerFilmes()
  const novo = { ...dados, id: gerarId(lista) }
  lista.push(novo)
  salvarFilmes(lista)
  res.status(201).json(novo)
})

app.put("/filmes/:id", (req, res) => {
  const id = Number(req.params.id)
  const lista = lerFilmes()
  const i = lista.findIndex((f) => f.id === id)
  if (i === -1) return res.status(404).json({ erro: "Filme não encontrado" })
  const atualizado = { ...lista[i], ...req.body, id }
  const erros = validarFilme(atualizado)
  if (erros.length > 0) return res.status(400).json({ erros })
  lista[i] = atualizado
  salvarFilmes(lista)
  res.json(lista[i])
})

app.delete("/filmes/:id", (req, res) => {
  const id = Number(req.params.id)
  const lista = lerFilmes()
  if (!lista.some((f) => f.id === id))
    return res.status(404).json({ erro: "Filme não encontrado" })
  salvarFilmes(lista.filter((f) => f.id !== id))
  res.sendStatus(204)
})

// Conta quantos filmes existem em cada status
function contagemPorStatus(lista) {
  return lista.reduce((contagem, filme) => {
    contagem[filme.status] = (contagem[filme.status] || 0) + 1
    return contagem
  }, {})
}

// Calcula a média das notas com uma casa decimal; sem filmes, a média é 0
function mediaNotas(lista) {
  if (lista.length === 0) return 0
  const soma = lista.reduce((total, filme) => total + filme.nota, 0)
  return Math.round((soma / lista.length) * 10) / 10
}

app.get("/stats", (req, res) => {
  const lista = lerFilmes()
  res.json({
    total: lista.length,
    porStatus: contagemPorStatus(lista),
    mediaNotas: mediaNotas(lista)
  })
})

const porta = process.env.PORT || 3000
app.listen(porta, () => console.log(`API na porta ${porta}`))
