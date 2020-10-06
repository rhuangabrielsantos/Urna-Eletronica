const fields = document.querySelectorAll(".input-number")
const allBoxes = document.querySelectorAll(".box")

const whiteButton = document.querySelector(".white")
const correctsButton = document.querySelector(".corrects")
const confirmButton = document.querySelector(".confirm")

const imgProfile = document.querySelector(".screen-vote img")
const descriptionProfile = document.querySelector(".profile")

let numbersInScreen = []
const myNumber = ['5' , '5', '8', '5', '2'];

fields.forEach(field => {
    field.addEventListener("click", addNumberInScreen)
})

correctsButton.addEventListener("click", cleanNumbers)
confirmButton.addEventListener("click", confirmVote)

function addNumberInScreen(event) {
    let number = event.target.dataset.number

    numbersInScreen.push(number)
    refreshScreen()
}

function refreshScreen() {
    allBoxes.forEach((box, index) => {
        if (numbersInScreen[index]) {
            box.setAttribute('value', numbersInScreen[index])
        } else {
            box.setAttribute('value', '')
        }
    })

    if (numbersInScreen.length > 0) {
        correctsButton.removeAttribute('disabled')
    } else {
        correctsButton.setAttribute('disabled', true)
    }

    if (numbersInScreen.length === 5) {
        confirmButton.removeAttribute('disabled')
    } else {
        confirmButton.setAttribute('disabled', true)
    }

    if (numbersInScreen.length === 5) {
        imgProfile.setAttribute('style', 'visibility: visible')
        descriptionProfile.setAttribute('style', 'visibility: visible')
    }
}

function cleanNumbers() {
    numbersInScreen = []

    imgProfile.setAttribute('style', 'visibility: hidden')
    descriptionProfile.setAttribute('style', 'visibility: hidden')

    refreshScreen()
}

function confirmVote() {
    const screenVote = document.querySelector(".screen-vote")
    const screenEnd = document.querySelector(".screen-end")

    screenVote.setAttribute('style', 'display: none')
    screenEnd.setAttribute('style', 'display: block')
    
    whiteButton.setAttribute('disabled', true)
    correctsButton.setAttribute('disabled', true)
    confirmButton.setAttribute('disabled', true)
}