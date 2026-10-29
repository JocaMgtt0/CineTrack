import { useState } from "react"

const VAZIO = {
    titulo: "",
    ano: "",
    genero: "",
    poster: "",
    status: "quero",
    nota: 3,
    comentario: ""
}

// Formulário em modal para adicionar um filme novo ou editar um existente
export default function ModalFilme({ filme, aoSalvar, aoFechar }){
    const [dados, setDados] = useState({
        ...VAZIO,
        ...filme
    })

    // Atualiza um campo do formulário sem mutar o objeto de estado
    function atualizar(campo, valor){
        setDados((anteriores) => ({
            ...anteriores,
            [campo]: valor
        }))
    }

    // Impede a recarga da página e entrega os dados com ano e nota como números
    function submeter(evento){
        evento.preventDefault()
        aoSalvar({
            ...dados,
            ano: Number(dados.ano),
            nota: Number(dados.nota)
        })
    }

    return (
        <div id="modal">
            <div className="modal-conteudo">
                <h2>{filme.id ? "Editar filme" : "Adicionar filme"}</h2>
                <form onSubmit={submeter}>
                    <label htmlFor="titulo">Título</label>
                    <input id="titulo" type="text" required
                        value={dados.titulo}
                        onChange={(e) => atualizar("titulo", e.target.value)} />

                    <label htmlFor="ano">Ano</label>
                    <input id="ano" type="number" min="1888" max="2030" required
                        value={dados.ano}
                        onChange={(e) => atualizar("ano", e.target.value)} />

                    <label htmlFor="genero">Gênero</label>
                    <input id="genero" type="text" required
                        value={dados.genero}
                        onChange={(e) => atualizar("genero", e.target.value)} />

                    <label htmlFor="poster">URL do pôster</label>
                    <input id="poster" type="url"
                        value={dados.poster}
                        onChange={(e) => atualizar("poster", e.target.value)} />

                    <label htmlFor="status">Status</label>
                    <select id="status"
                        value={dados.status}
                        onChange={(e) => atualizar("status", e.target.value)}>
                        <option value="quero">Quero assistir</option>
                        <option value="assistindo">Assistindo</option>
                        <option value="assistido">Assistido</option>
                    </select>

                    <label htmlFor="nota">Nota (1 a 5)</label>
                    <input id="nota" type="number" min="1" max="5" required
                        value={dados.nota}
                        onChange={(e) => atualizar("nota", e.target.value)} />

                    <label htmlFor="comentario">Comentário</label>
                    <textarea id="comentario" rows="4"
                        value={dados.comentario}
                        onChange={(e) => atualizar("comentario", e.target.value)} />

                    <button type="button" id="can" onClick={aoFechar}>Cancelar</button>
                    <button type="submit" id="Salvar">Salvar</button>
                </form>
            </div>
        </div>
    )
}
