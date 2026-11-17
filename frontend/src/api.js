const BASE = "http://localhost:3000"

// Faz a requisição na API: erro de HTTP vira exceção e o 204 devolve null
async function pedir(caminho, opcoes = {}) {
  const r = await fetch(BASE + caminho, {
    headers: { "Content-Type": "application/json" },
    ...opcoes,
  })
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return r.status === 204 ? null : r.json()
}

// Busca a lista de filmes
export const listar = () => pedir("/filmes")

// Cadastra um filme e devolve o filme criado, já com o id gerado pelo servidor
export const criar = (f) =>
  pedir("/filmes", { method: "POST", body: JSON.stringify(f) })

// Atualiza o filme do id informado e devolve a versão salva
export const atualizar = (id, f) =>
  pedir(`/filmes/${id}`, { method: "PUT", body: JSON.stringify(f) })

// Remove o filme do id informado
export const remover = (id) =>
  pedir(`/filmes/${id}`, { method: "DELETE" })
