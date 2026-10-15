import Titulo from "./components/Titulo.jsx"

// Componente raiz: compõe o Titulo e mostra o ano atual
export default function App() {
  const ano = new Date().getFullYear()

  return (
    <main>
      <Titulo />
      <p>CineTrack &copy; {ano}</p>
    </main>
  )
}
