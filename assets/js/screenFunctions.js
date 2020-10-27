import { candidatesMayor, candidatesCityCouncilor } from './../../database/candidates.js'
import { correctsButton, confirmButton } from './buttons.js'
import { profileMayor, mayorName, viceMayorName, mayorPartido } from './mayorFields.js'
import { profileCityCouncilor, cityCouncilorName, cityCouncilorPartido } from './cityCouncilorFields.js';

let numbersMayor = []
let numbersCityCouncilor = []

let isFirstVote = true

export function pushNumberInCorrectArray(number) {
    if (isFirstVote) {
        numbersMayor.push(number)
        return
    }

    numbersCityCouncilor.push(number)
}

export function refreshScreen() {
    document.querySelectorAll("#mayor .box").forEach((box, index) => {
        let voteNumber = numbersMayor[index] ? numbersMayor[index] : ''
        box.setAttribute('value', voteNumber)
    })

    document.querySelectorAll("#city-councilor .box").forEach((box, index) => {
        let voteNumber = numbersCityCouncilor[index] ? numbersCityCouncilor[index] : ''
        box.setAttribute('value', voteNumber)
    })

    updateAttributeDisabledCorrectButton()
    updateAttributeDisabledConfirmButton()

    searchCandidates()
}

export function setMayorNumber(numbers) {
    numbersMayor = numbers
}

export function setCityCouncilorNumber(numbers) {
    numbersCityCouncilor = numbers
}

export function setIsFirstVote(value) {
    isFirstVote = value
}

export function getIsFirstVote() {
    return isFirstVote
}

function updateAttributeDisabledCorrectButton() {
    if (numbersMayor.length > 0 || numbersCityCouncilor.length > 0) {
        correctsButton.removeAttribute('disabled')
        return
    }
    correctsButton.setAttribute('disabled', true)
}

function updateAttributeDisabledConfirmButton() {
    const isValidMayorVote = isFirstVote && numbersMayor.length === 2
    const isValidCityCouncilorVote = !isFirstVote && numbersCityCouncilor.length === 5

    if (isValidMayorVote || isValidCityCouncilorVote) {
        confirmButton.removeAttribute('disabled')
        return
    }

    confirmButton.setAttribute('disabled', true)
}

function searchCandidates() {
    if (isFirstVote) {
        candidatesMayor.forEach(candidate => {
            let number = formatVoteNumber(numbersMayor)
            if (candidate.number === number) {
                profileMayor.classList.remove('hidden')

                mayorName.innerHTML = 'Nome: ' + candidate.name
                viceMayorName.innerHTML = 'Vice: ' + candidate.vice
                mayorPartido.innerHTML = 'Partido: ' + candidate.partido

                document.querySelector('#mayor').appendChild(generateImg(candidate.image, candidate.name))
            }
        })
        
        return
    }

    candidatesCityCouncilor.forEach(candidate => {
        let number = formatVoteNumber(numbersCityCouncilor)
        if (candidate.number === number) {
            profileCityCouncilor.classList.remove('hidden')

            cityCouncilorName.innerHTML = 'Nome: ' + candidate.name
            cityCouncilorPartido.innerHTML = 'Partido: ' + candidate.partido

            document.querySelector('#city-councilor').appendChild(generateImg(candidate.image, candidate.name))
        }
    })
}

function formatVoteNumber(voteNumber) {
    return parseInt(voteNumber.toString().replaceAll(',', ''))
}

function generateImg(src, alt) {
    let img = document.createElement('img')
    img.src = src
    img.alt = alt
    img.id = 'img-vote'
    return img
}