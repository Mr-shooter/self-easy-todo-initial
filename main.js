const CARD_CLASS = "card"
const CARD_SOLVED_CLASS = "card card-solved"

const CLOSE_ICON_DATA = {
    className: "card__close",
    html: "✘"
}
const SOLVE_ICON_DATA = {
    className: "card__close",
    html: "✓"
}

const ARR_LIMIT = 32
const MESSAGES = {
    errosType: "Неверный тип данных",
    maxLengthExceeded: "Превышен лимит допустимых карточек (макс.32 карточки)."

}

const titleInput = document.querySelector("#text")
const descriptionTextarea = document.querySelector("#fuck")
const addButton = document.querySelector("button")
const cards = document.querySelector(".cards")

const cardsArr = {
    value: [],
    set(newVelue) {
        if (!Array.isArray(newVelue)){
            alert(MESSAGES.errosType)
            return false
        }
        addButton.disabled = newVelue.length === ARR_LIMIT
        if (newVelue.length > ARR_LIMIT){
            alert(MESSAGES.maxLengthExceeded)
            return false
        }
     this.value = newVelue
     localStorage.cards = JSON.stringify(this.value)
      drawCards()
      return true   
    }
}

try{
    if(localStorage.cards && !cardsArr.set(JSON.parse(localStorage.cards))) throw null
}catch{
    localStorage.card = ""
}

function createCard(i,cardObj){
    const now = new Date()

    const card = document.createElement("article")

    card.className = cardObj.solved ? CARD_SOLVED_CLASS : CARD_CLASS

    const h2 = document.createElement("h2")
    const p = document.createElement("p")
    const small = document.createElement("small")

    h2.innerHTML = cardObj.title
    p.innerHTML = cardObj.description
    small.innerHTML= `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`

    const incons = document.createElement("div")

    const closeIcon = document.createElement("i")
    const solvedIcon = document.createElement("i")

    closeIcon.className = CLOSE_ICON_DATA.className
    solvedIcon.className= SOLVE_ICON_DATA.className

    closeIcon.innerHTML = CLOSE_ICON_DATA.html
    solvedIcon.innerHTML =SOLVE_ICON_DATA.html

    closeIcon.addEventListener("click",() =>{
        const cardsTemp = [...cardsArr.value]
        cardsTemp.splice(i, 1)

        cardsArr.set(cardsTemp)
    })
    solvedIcon.addEventListener("click",() =>{
        const cardsTemp = cardsArr.value.splice(i, 1)[0]
        cardsTemp.solved = true

        cardsArr.set([...cardsArr.value,cardsTemp])
    })

    incons.appendChild(closeIcon)
    incons.appendChild(solvedIcon)

    card.append(h2,p,small,incons)

    return card

}

function drawCards() {
    cards.innerHTML= ""

    for( const i in cardsArr.value) {
        const card = cardsArr.value [i]
        cards.appendChild(createCard(i, card))
    }
}

addButton.addEventListener("click", ()=>{
    const title = titleInput.value
    const description = descriptionTextarea.value

    if(title.length === 0 || description.length === 0) return

    cardsArr.set([
        {
            title,
            description,
            solved: false
            
        }, ...cardsArr.value
    ])
    titleInput.value=""
    descriptionTextarea.value=""
})