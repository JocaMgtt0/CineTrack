const express = require("express")
const morgan = require("morgan")
const fs = require("fs")
const path = require("path")

const app = express()

const ARQUIVO = path.join(__dirname, "data", "filmes.json")

app.use(morgan("dev"))
app.use(express.json())

// Lê a lista de filmes do arquivo JSON
function lerFilmes() {
  return JSON.parse(fs.readFileSync(ARQUIVO, "utf8"))
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

// Conta quantos filmes existem em cada status
function contagemPorStatus(lista) {
  return lista.reduce((contagem, filme) => {
    contagem[filme.status] = (contagem[filme.status] || 0) + 1
    return contagem
  }, {})
}

// Calcula a média das notas com uma casa decimal
function mediaNotas(lista) {
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

app.listen(3000, () => console.log("API na porta 3000"))
