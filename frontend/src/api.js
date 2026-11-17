const BASE = "http://localhost:3000"

// Faz a requisição na API: falha de rede e erro de HTTP viram exceção com a mensagem pro usuário, e o 204 devolve null
async function pedir(caminho, opcoes = {}) {
  let r
  try {
    r = await fetch(BASE + caminho, {
      headers: { "Content-Type": "application/json" },
      ...opcoes,
    })
  } catch {
    throw new Error("Sem conexão com a API. Confira se o backend está rodando.")
  }
  if (!r.ok) {
    const corpo = await r.json()
    throw new Error(corpo.erros ? corpo.erros.join("\n") : corpo.erro)
  }
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
