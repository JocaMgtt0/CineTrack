import { useState, useEffect } from "react"
import { listar, criar, atualizar, remover } from "./api.js"
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

  // Cadastra o filme na API e inclui na lista o filme devolvido, já com id
  async function adicionar(novoFilme) {
    const novo = await criar(novoFilme)
    setFilmes((anteriores) => [...anteriores, novo])
  }

  // Pede confirmação, remove o filme na API e só depois tira ele da lista
  async function removerFilme(id) {
    if (!confirm("Remover este filme?")) return
    await remover(id)
    setFilmes((anteriores) =>
      anteriores.filter((filme) => filme.id !== id))
  }

  // Atualiza o filme na API e troca na lista pela versão devolvida
  async function editar(id, alteracoes) {
    const atualizado = await atualizar(id, alteracoes)
    setFilmes((anteriores) =>
      anteriores.map((filme) =>
        filme.id === id ? atualizado : filme))
  }

  // Decide entre incluir e editar pelo id do filme aberto e fecha o modal
  async function salvar(dados) {
    if (editando.id) {
      await editar(editando.id, dados)
    } else {
      await adicionar(dados)
    }

    setEditando(null)
  }

  let conteudo
  if (carregando) {
    conteudo = <p>Carregando...</p>
  } else if (erro) {
    conteudo = <p className="erro">Não foi possível carregar os filmes. {erro}</p>
  } else {
    conteudo = (
      <ListaFilmes
        filmes={visiveis}
        aoEditar={setEditando}
        aoRemover={removerFilme}
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
