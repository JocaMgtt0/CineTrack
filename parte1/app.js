function rotuloStatus(status){
    if(status === "assistido") return "Assistido"
    if(status === "assistindo") {
        return "Assistindo"
    }
    if(status === "quero") return "Quero assistir"
    return status
}

const estrelas = (nota) => {
    let notaFinal = ''
    for(let i = 1; i <=5; i++){
        let estrela = i <= nota ? "★" : "☆"
        notaFinal += estrela
    }
    return notaFinal
}
console.log(rotuloStatus("quero"), estrelas(3))

const total = 6

const totalFilme = () => {
    const textoNovo = `- Total de filmes: ${total}`
    document.querySelector(".rodape").textContent += textoNovo

}

const filmesIniciais = [
    {
        id: 1,
        titulo: "Interestelar",
        ano: 2014,
        genero: "Aventura, Drama e Ficção científica",
        poster: "https://media.themoviedb.org/t/p/w600_and_h900_face/6ricSDD83BClJsFdGB6x7cM0MFQ.jpg",
        nota: 5,
        status: "assistido",
        comentario: ""
    },
    {
        id: 2,
        titulo: "O Irlandês",
        ano: 2019,
        genero: "Crime, Drama e História",
        poster: "https://media.themoviedb.org/t/p/w600_and_h900_face/bHJEn8O7eU42Xz2M2cENBsPFHWO.jpg",
        nota: 3,
        status: "assistido",
        comentario: ""
    },
    {
        id: 3,
        titulo: "Homem-Aranha: Um Novo Dia",
        ano: 2026,
        genero: "Ficção científica, Ação e Aventura",
        poster: "https://media.themoviedb.org/t/p/w600_and_h900_face/wZhxtK387ZLFQQ38l1Z3ELdszVa.jpg",
        nota: 3,
        status: "quero",
        comentario: ""
    },
    {
        id: 4,
        titulo: "Maze Runner - Correr ou Morrer",
        ano: 2014,
        genero: "Ação, Mistério, Ficção científica e Thriller",
        poster: "https://www.themoviedb.org/t/p/w1280/orOyVAUxVN1ncz2EcrMDcTd25e8.jpg",
        nota: 3,
        status: "assistindo",
        comentario: ""
    },
    {
        id: 5,
        titulo: "The Hunger Games: Amanhecer na Ceifa",
        ano: 2026,
        genero: "Ficção científica, Ação e Aventura",
        poster: "https://www.themoviedb.org/t/p/w1280/4e2iw4WmfoBK49K9Hy9ATxBzCv6.jpg",
        nota: 3,
        status: "quero",
        comentario: ""
    },
    {
        id: 6,
        titulo: "A Odisseia",
        ano: 2026,
        genero: "Aventura, Ação e Fantasia",
        poster: "https://www.themoviedb.org/t/p/w1280/gppJfoJbJRwjJmMKUTDeNfbrSg8.jpg",
        nota: 3,
        status: "quero",
        comentario: ""
    }
]

const lista = document.querySelector("#lista")

function renderizarCards(filmes){
    const cards = filmes.map((f) => `
        <article class="card" data-id="${f.id}">
            <img src="${f.poster}" alt="Pôster de ${f.titulo}" width="300px">
            <h2>${f.titulo}</h2>
            <p>${f.genero} - ${f.ano}</p>
            <p>
                Nota:
                <span class="nota">${estrelas(f.nota)}</span>
            </p><br>

            <span class="status ${f.status}">${rotuloStatus(f.status)}</span>
            <div class="acoes">
                <button id="Edit">Editar</button>
                <button id="Remove">Remover</button>
            </div>
        </article>`).join("")
    lista.innerHTML = cards
}

totalFilme()
renderizarCards(filmesIniciais)
