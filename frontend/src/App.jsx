import { filmesIniciais } from "./data/filmes.js"  
import Header from "./components/Header.jsx"
import Filtros from "./components/Filtros.jsx"
import ListaFilmes from "./components/ListaFilmes.jsx"

// Componente raiz: gera os componentes iniciais do projeto
export default function App() {
  return (
    <>
      <Header />
      <Filtros />
      <ListaFilmes filmes={filmesIniciais} />

    </>
  )
}
