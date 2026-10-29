const ROTULOS = {
    assistido: "Assistido",
    assistindo: "Assistindo",
    quero: "Quero Assistir"
}

// Mostra o selo do status com a classe da cor e o rótulo correto
export default function Badge({ status }){
    return (
        <span className={`status ${status}`}>
            {ROTULOS[status]}
        </span>
    )
}
