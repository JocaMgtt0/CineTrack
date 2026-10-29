import Estrelas from "./Estrelas.jsx"
import Badge from "./Badge.jsx"

//Cria o filme dentro do card
export default function CardFilme({filme}){
    return (
        <article className="card">
            <img src={filme.poster} alt={`Pôster de ${filme.titulo}`}/>
            <h2>{filme.titulo}</h2>
            <p>{filme.ano} {filme.genero}</p>
            <p><Estrelas nota={filme.nota} /></p>
            <Badge status={filme.status} />
            <p>{filme.comentario}</p>
        </article>
    )
}
