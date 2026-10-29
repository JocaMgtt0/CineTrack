// Mostra a nota como 5 estrelas, cheias até a nota e vazias no resto
export default function Estrelas({ nota }){
    return (
        <span className="nota">
            {"★".repeat(nota) + "✩".repeat(5 - nota)}
        </span>
    )
}
