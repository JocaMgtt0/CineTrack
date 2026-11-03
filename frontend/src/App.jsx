import { useState, useEffect } from "react"
import { gerarId } from "./data/filmes.js"
import { listar } from "./api.js"
import Header from "./components/Header.jsx"
import Filtros from "./components/Filtros.jsx"
import ListaFilmes from "./components/ListaFilmes.jsx"
import ModalFilme from "./components/ModalFilme.jsx"

const CHAVE_FILTROS = "cinetrack:filtros"

// Lê os filtros salvos; se a chave faltar ou o JSON estiver corrompido, devolve os padrões
function lerFiltros() {
  const padroes = { busca: "", status: "todos" }
  try {
    return { ...padroes, ...JSON.parse(localStorage.getItem(CHAVE_FILTROS)) }
  } catch (e) {
    console.error(e)
    return padroes
  }
}

// Componente raiz: guarda filmes, filtros e modal e calcula os filmes visíveis
export default function App() {
  const [filmes, setFilmes] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [status, setStatus] = useState(() => lerFiltros().status)
  const [busca, setBusca] = useState(() => lerFiltros().busca)
  const [editando, setEditando] = useState(null)

  // Carrega os filmes da API uma vez, depois do primeiro render
  useEffect(() => {
    listar()
      .then((dados) => setFilmes(dados))
      .catch((erro) => setErro(erro.message))
      .finally(() => setCarregando(false))
  }, [])

  // Mantém o título da aba sincronizado com o total de filmes
  useEffect(() => {
    document.title = `CineTrack (${filmes.length})`
  }, [filmes.length])

  // Salva a busca e o status no localStorage sempre que um dos dois mudar
  useEffect(() => {
    localStorage.setItem(CHAVE_FILTROS, JSON.stringify({ busca, status }))
  }, [busca, status])

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

  let conteudo
  if (carregando) {
    conteudo = <p>Carregando...</p>
  } else if (erro) {
    conteudo = <p className="erro">Erro: {erro}</p>
  } else {
    conteudo = (
      <ListaFilmes
        filmes={visiveis}
        aoEditar={setEditando}
        aoRemover={remover}
      />
    )
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
      <main>{conteudo}</main>

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
