// Devolve o rótulo de exibição de um status, ou o próprio valor se for desconhecido
function rotuloStatus(status){
    if(status === "assistido") return "Assistido"
    if(status === "assistindo") {
        return "Assistindo"
    }
    if(status === "quero") return "Quero assistir"
    return status
}

// Devolve a nota como 5 estrelas, cheias até a nota e vazias no resto
const estrelas = (nota) => {
    let notaFinal = ''
    for(let i = 1; i <=5; i++){
        let estrela = i <= nota ? "★" : "☆"
        notaFinal += estrela
    }
    return notaFinal
}
console.log(rotuloStatus("quero"), estrelas(3))

const POSTER_PADRAO = "https://placehold.co/200x300?text=Sem+poster"

// Atualiza o rodapé com o total de filmes da lista
const totalFilme = () => {
    document.querySelector(".rodape small").textContent =
        `CineTrack - UEM - Total de filmes: ${filmes.length}`
}

const filmesIniciais = [
    {
        id: 1,
        titulo: "A Origem",
        ano: 2010,
        genero: "Ficção científica",
        poster: "https://media.themoviedb.org/t/p/w600_and_h900_face/9e3Dz7aCANy5aRUQF745IlNloJ1.jpg",
        nota: 5,
        status: "assistido",
        comentario: "Revejo sempre."
    },
    {
        id: 2,
        titulo: "Parasita",
        ano: 2019,
        genero: "Suspense",
        poster: "https://media.themoviedb.org/t/p/w600_and_h900_face/bNGW8zYA91VqTZfV3jnKHPEKKvB.jpg",
        nota: 4,
        status: "assistido",
        comentario: ""
    },
    {
        id: 3,
        titulo: "O Auto da Compadecida",
        ano: 2000,
        genero: "Comédia",
        poster: "https://media.themoviedb.org/t/p/w600_and_h900_face/y3IhuITELtprMhUd7bccu629rba.jpg",
        nota: 5,
        status: "assistido",
        comentario: "Classico nacional."
    },
    {
        id: 4,
        titulo: "Duna: Parte Dois",
        ano: 2024,
        genero: "Ficção científica",
        poster: "https://media.themoviedb.org/t/p/w600_and_h900_face/VMy4UGsI2u3f4fALGeCqCdsQBb.jpg",
        nota: 4,
        status: "assistindo",
        comentario: ""
    },
    {
        id: 5,
        titulo: "Interestelar",
        ano: 2014,
        genero: "Ficção científica",
        poster: "https://media.themoviedb.org/t/p/w600_and_h900_face/6ricSDD83BClJsFdGB6x7cM0MFQ.jpg",
        nota: 5,
        status: "quero",
        comentario: ""
    },
    {
        id: 6,
        titulo: "Cidade de Deus",
        ano: 2002,
        genero: "Drama",
        poster: "https://media.themoviedb.org/t/p/w600_and_h900_face/gfnXixcGC060QcG6JPxN6AMdVsq.jpg",
        nota: 4,
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
    poster.src = f.poster || POSTER_PADRAO
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
    if(filme.nota < 1 || filme.nota > 5)
        erros.push("Nota deve estar entre 1 e 5")
    return { valido: erros.length === 0, erros }
}

// Gera um id novo: o maior id da lista mais 1
const gerarId = (lista) =>
    Math.max(0, ...lista.map((f) => f.id)) + 1

const CHAVE = "cinetrack:filmes"

// Grava a lista de filmes no localStorage como JSON
const salvar = () =>
    localStorage.setItem(CHAVE,
        JSON.stringify(filmes))

// Lê a lista salva no localStorage ou devolve os filmes iniciais na primeira visita
function carregar(){
    const txt = localStorage.getItem(CHAVE)
    return txt
        ? JSON.parse(txt)
        : [...filmesIniciais]
}

let filmes = carregar()

let termoAtual = ""
let statusAtual = "todos"

// Filtra a lista pelo título digitado e pelo status escolhido, sem mutar a original
function aplicarFiltros(lista, opcoes){
    const termo = opcoes.termo.toLowerCase()
    return lista
        .filter((f) =>
            f.titulo.toLowerCase().includes(termo))
        .filter((f) => opcoes.status === "todos"
            || f.status === opcoes.status)
}

// Aplica busca e filtro de status e renderiza o resultado na tela
function atualizar(){
    const visiveis = aplicarFiltros(filmes,
        { termo: termoAtual, status: statusAtual })
    renderizarCards(visiveis)
    totalFilme()
}

// Adia a execução de fn até o usuário parar de digitar por ms milissegundos
function debounce(fn, ms = 300){
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => fn(...args), ms)
    }
}

lista.addEventListener("click", (e) => {
    const botao = e.target.closest(".btn-remover")
    if(!botao) return
    if(!confirm("Remover este filme?")) return
    const card = botao.closest(".card")
    const id = Number(card.dataset.id)
    filmes = filmes.filter((f) => f.id !== id)
    salvar()
    atualizar()
})

const nav = document.querySelector("nav")

nav.addEventListener("click", (e) => {
    const botao = e.target.closest("button")
    if(!botao) return
    nav.querySelector(".ativo").classList.remove("ativo")
    botao.classList.add("ativo")
    statusAtual = botao.dataset.status
    atualizar()
})

const busca = document.querySelector("header input")

const aoDigitar = (e) => {
    termoAtual = e.target.value
    atualizar()
}

busca.addEventListener("input",
    debounce(aoDigitar, 300))

// Abre modal de adicionar filme clicando em 'Adicionar'
let editandoID = null 
const modal = document.querySelector('#modal')
const form = document.querySelector('#form-filme')
const msgErros = document.querySelector('#erros-form')
const abrir = () => {
    msgErros.textContent = ""
    modal.hidden = false
}
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
        msgErros.textContent = erros.join("\n")
        return
    }
    if(editandoID !== null){
        filmes = filmes.map((f) =>
            f.id === editandoID ? { ...f, ...dados } : f)
    } else {
        filmes = [...filmes, { id: gerarId(filmes), ...dados }]
    }
    salvar()
    atualizar()
    fechar()
})

atualizar()
