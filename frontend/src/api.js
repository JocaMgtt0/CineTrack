import { filmesIniciais } from "./data/filmes.js"

// Cria uma Promise que conclui depois de ms milissegundos
function esperar(ms) {
  return new Promise((ok) =>
    setTimeout(ok, ms))
}

// Simula a API: espera a "rede" e devolve a lista de filmes
export async function listar() {
  await esperar(500)
  return filmesIniciais
}
