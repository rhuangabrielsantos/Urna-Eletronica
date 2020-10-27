import { whiteButton, correctsButton, confirmButton } from './buttons.js'

import { profileMayor } from './mayorFields.js'
import { profileCityCouncilor } from './cityCouncilorFields.js'

import { 
    refreshScreen, 
    pushNumberInCorrectArray, 
    setMayorNumber, 
    setCityCouncilorNumber,
    setIsFirstVote,
    getIsFirstVote
} from './screenFunctions.js'

function addNumberInScreen(event) {
    let number = event.target.dataset.number

    pushNumberInCorrectArray(number)
    refreshScreen()
}

function whiteVote() {
    let whiteVoteBox;
    let inputsBox;
    let profile;

    if (getIsFirstVote()) {
        whiteVoteBox = document.querySelector('.white-vote-major')
        inputsBox = document.querySelector('.box-mayor')
        profile = document.querySelector('#mayor .profile')
    } else {
        whiteVoteBox = document.querySelector('.white-vote-city-councilor')
        inputsBox = document.querySelector('.box-city-councilor')
        profile = document.querySelector('#city-councilor .profile')
    }

    profile.classList.add('hidden')
    removeImage()

    whiteVoteBox.classList.add('visible')
    whiteVoteBox.classList.remove('hidden')

    inputsBox.classList.add('hidden')
    inputsBox.classList.remove('visible')

    correctsButton.removeAttribute('disabled')
    confirmButton.removeAttribute('disabled')
}


function cleanScreen() {
    let whiteVoteBox;
    let inputsBox;

    if (getIsFirstVote()) {
        setMayorNumber([])

        whiteVoteBox = document.querySelector('.white-vote-major')
        inputsBox = document.querySelector('.box-mayor')

        profileMayor.classList.add('hidden')
    } else {
        setCityCouncilorNumber([])

        whiteVoteBox = document.querySelector('.white-vote-city-councilor')
        inputsBox = document.querySelector('.box-city-councilor')

        profileCityCouncilor.classList.add('hidden')
    }

    removeImage()

    whiteVoteBox.classList.add('hidden')
    whiteVoteBox.classList.remove('visible')

    inputsBox.classList.add('visible')
    inputsBox.classList.remove('hidden')

    correctsButton.removeAttribute('disabled')
    confirmButton.removeAttribute('disabled')

    refreshScreen()
}


function confirmVote() {
    const mayorVoteScreen = document.querySelector("#mayor")
    const cityConcilorVoteScreen = document.querySelector("#city-councilor")
    const screenEnd = document.querySelector(".screen-end")

    removeImage()

    if (getIsFirstVote()) {
        mayorVoteScreen.remove()
        cityConcilorVoteScreen.setAttribute('style', 'visibility: visible')

        setIsFirstVote(false)

        correctsButton.setAttribute('disabled', true)
        confirmButton.setAttribute('disabled', true)
    } else {
        screenEnd.setAttribute('style', 'display: block')
        cityConcilorVoteScreen.remove()
    
        whiteButton.setAttribute('disabled', true)
        correctsButton.setAttribute('disabled', true)
        confirmButton.setAttribute('disabled', true)
    }
}


export function registerEventInButtons() {
    document.querySelectorAll(".input-number").forEach(field => {
        field.addEventListener("click", addNumberInScreen)
    })
    
    whiteButton.addEventListener("click", whiteVote)
    correctsButton.addEventListener("click", cleanScreen)
    confirmButton.addEventListener("click", confirmVote)
}

function removeImage() {
    const img = document.querySelector('#img-vote')

    if (img) {
        img.remove()
    }
}