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

// Cria o card de um filme com createElement e textContent, sem interpretar HTML
function criarCard(f){
    const card = document.createElement("article")
    card.className = "card"
    card.dataset.id = f.id

    const poster = document.createElement("img")
    poster.src = f.poster
    poster.alt = `Pôster de ${f.titulo}`
    poster.width = 300

    const titulo = document.createElement("h2")
    titulo.textContent = f.titulo

    const info = document.createElement("p")
    info.textContent = `${f.genero} - ${f.ano}`

    const notaLinha = document.createElement("p")
    const nota = document.createElement("span")
    nota.className = "nota"
    nota.textContent = estrelas(f.nota)
    notaLinha.append("Nota: ", nota)

    const status = document.createElement("span")
    status.className = `status ${f.status}`
    status.textContent = rotuloStatus(f.status)

    const acoes = document.createElement("div")
    acoes.className = "acoes"
    const editar = document.createElement("button")
    editar.className = "btn-editar"
    editar.textContent = "Editar"
    const remover = document.createElement("button")
    remover.className = "btn-remover"
    remover.textContent = "Remover"
    acoes.append(editar, remover)

    card.append(poster, titulo, info, notaLinha, document.createElement("br"), status, acoes)
    return card
}

// Monta todos os cards num DocumentFragment e troca o conteúdo da lista de uma vez
function renderizarCards(filmes){
    const frag = document.createDocumentFragment()
    filmes.forEach((f) =>
        frag.appendChild(criarCard(f)))
    lista.replaceChildren(frag)
}

// Valida titulo e ano do filme sem tocar no DOM e devolve { valido, erros }
function validarFilme(filme){
    const erros = []
    if(!filme.titulo)
        erros.push("Título obrigatório")
    if(filme.ano < 1888 || filme.ano > 2030)
        erros.push("Ano inválido")
    return { valido: erros.length === 0, erros }
}

// Gera um id novo: o maior id da lista mais 1
const gerarId = (lista) =>
    Math.max(0, ...lista.map((f) => f.id)) + 1

let filmes = [...filmesIniciais]

lista.addEventListener("click", (e) => {
    const botao = e.target.closest(".btn-remover")
    if(!botao) return
    if(!confirm("Remover este filme?")) return
    const card = botao.closest(".card")
    const id = Number(card.dataset.id)
    filmes = filmes.filter((f) => f.id !== id)
    renderizarCards(filmes)
})

const nav = document.querySelector("nav")

nav.addEventListener("click", (e) => {
    const botao = e.target.closest("button")
    if(!botao) return
    nav.querySelector(".ativo").classList.remove("ativo")
    botao.classList.add("ativo")
    const status = botao.dataset.status
    renderizarCards(filmes.filter((f) =>
        status === "todos" || f.status === status))
})

// Abre modal de adicionar filme clicando em 'Adicionar'
let editandoID = null 
const modal = document.querySelector('#modal')
const form = document.querySelector('#form-filme')
const abrir = () => modal.hidden = false
const fechar = () => modal.hidden = true
document.querySelector("header button")
    .addEventListener("click", ()=> {
        editandoID = null
        form.reset()
        abrir()
    })

// Fecha modal de adicionar filme clicando em "esc" no teclado
document.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && !modal.hidden){
        fechar()
    }
})

//Fecha o modal de adicionar filme

document.addEventListener("click", (e) => {
    const botao = e.target.closest("#can")
    if(!botao) return
    fechar()
})









// Preenche o formulário com o filme do card clicado e abre o modal em modo de edição
lista.addEventListener("click", (e) => {
    const botao = e.target.closest(".btn-editar")
    if(!botao) return
    const card = botao.closest(".card")
    editandoID = Number(card.dataset.id)
    const f = filmes.find((x) => x.id === editandoID)
    form.elements.titulo.value = f.titulo
    form.elements.ano.value = f.ano
    form.elements.genero.value = f.genero
    form.elements.poster.value = f.poster
    form.elements.status.value = f.status
    form.elements.nota.value = f.nota
    form.elements.comentario.value = f.comentario
    abrir()
})

// Valida o formulário e salva o filme novo ou editado, depois re-renderiza e fecha o modal
form.addEventListener("submit", (e) => {
    e.preventDefault()
    const dados = Object.fromEntries(new FormData(form))
    dados.ano = Number(dados.ano)
    dados.nota = Number(dados.nota)
    const { valido, erros } = validarFilme(dados)
    if(!valido){
        alert(erros.join("\n"))
        return
    }
    if(editandoID !== null){
        filmes = filmes.map((f) =>
            f.id === editandoID ? { ...f, ...dados } : f)
    } else {
        filmes = [...filmes, { id: gerarId(filmes), ...dados }]
    }
    renderizarCards(filmes)
    fechar()
})

totalFilme()
renderizarCards(filmes)
