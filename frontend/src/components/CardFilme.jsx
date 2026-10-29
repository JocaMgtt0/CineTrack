// Gera estrelas para as notas
function estrelas(nota){
    return "★".repeat(nota) + 
        "✩".repeat(5- nota);
}

const ROTULOS = {
    assistido: "Assistido",
    assistindo: "Assistindo",
    quero: "Quero Assistir" 
}

//Cria o filme dentro do card
export default function CardFilme({filme}){
    return (
        <article className="card">
            <img src={filme.poster} alt={`Pôster de ${filme.titulo}`}/>
            <h2>{filme.titulo}</h2>
            <p>{filme.ano} {filme.genero}</p>
            <p>{estrelas(filme.nota)}</p>
            <p>{ROTULOS[filme.status]}</p>
            <p>{filme.comentario}</p>
        </article>
    )
}