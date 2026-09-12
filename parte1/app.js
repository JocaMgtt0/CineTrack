function rotuloStatus(status){
    if(status === "assistido") return "Assistido"
    if(status === "assistindo") {
        return "Assistindo"
    }
    if(status === "quero") return "Quero assistir"
    return status
}

const alvo = 
    document.querySelector(".card .status")
alvo.textContent = rotuloStatus("assistido")

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

const aplicaTodos = () => {
    for(const card of document.querySelectorAll(".card")){
        const badge = card.querySelector(".status")
        const status = badge.classList[1]
        badge.textContent = rotuloStatus(status)

        const nota = card.querySelector(".nota")
        const notaTexto = nota.classList[1]
        const notaNova = Number(notaTexto.split("-")[1])
        nota.textContent = estrelas(notaNova)
    }
}

totalFilme()
aplicaTodos()