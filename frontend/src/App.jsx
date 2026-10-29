import { useState } from "react"
import { filmesIniciais, gerarId } from "./data/filmes.js"
import Header from "./components/Header.jsx"
import Filtros from "./components/Filtros.jsx"
import ListaFilmes from "./components/ListaFilmes.jsx"
import ModalFilme from "./components/ModalFilme.jsx"

// Componente raiz: guarda filmes, filtros e modal e calcula os filmes visíveis
export default function App() {
  const [filmes, setFilmes] = useState(filmesIniciais)
  const [status, setStatus] = useState("todos")
  const [busca, setBusca] = useState("")
  const [editando, setEditando] = useState(null)

  const visiveis = filmes
    .filter((filme) =>
      status === "todos" ||
      filme.status === status)
    .filter((filme) =>
      filme.titulo
        .toLowerCase()
        .includes(busca.toLowerCase()))

  // Inclui um filme novo com id gerado, sem mutar a lista
  function adicionar(novoFilme) {
    setFilmes((anteriores) => [
      ...anteriores,
      {
        ...novoFilme,
        id: gerarId(anteriores),
      },
    ])
  }

  // Remove o filme do id informado, mantendo os demais
  function remover(id) {
    setFilmes((anteriores) =>
      anteriores.filter((filme) => filme.id !== id))
  }

  // Troca só o filme do id informado por uma cópia com as alterações
  function editar(id, alteracoes) {
    setFilmes((anteriores) =>
      anteriores.map((filme) =>
        filme.id === id ? { ...filme, ...alteracoes } : filme))
  }

  // Decide entre incluir e editar pelo id do filme aberto e fecha o modal
  function salvar(dados) {
    if (editando.id) {
      editar(editando.id, dados)
    } else {
      adicionar(dados)
    }

    setEditando(null)
  }

  return (
    <>
      <Header
        busca={busca}
        aoBuscar={setBusca}
        aoAdicionar={() => setEditando({})}
      />
      <Filtros ativo={status} aoMudar={setStatus} />
      <p>Exibindo {visiveis.length} de {filmes.length} filmes</p>
      <ListaFilmes
        filmes={visiveis}
        aoEditar={setEditando}
        aoRemover={remover}
      />

      {editando !== null && (
        <ModalFilme
          filme={editando}
          aoSalvar={salvar}
          aoFechar={() => setEditando(null)}
        />
      )}
    </>
  )
}
