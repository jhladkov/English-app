const wordsList = document.querySelector('.words')
const alreadyKnowList = JSON.parse(localStorage.getItem('alreadyKnow'))

const addHTML = (alreadyKnowListTrue,nothing) => {
    if (alreadyKnowListTrue) {
        alreadyKnowList.forEach(item => {
            wordsList.insertAdjacentHTML("afterbegin", `
            <p class="words-item">${item[0]} - ${item[1]}</p>
    `)
        })
    }
    if (nothing) {
        wordsList.insertAdjacentHTML("afterbegin", `
            <p class="words-item">Вы ничего не добавили</p>
         `)
    }
}
window.onload = () => {
    if (alreadyKnowList) addHTML(true)
    else addHTML(false,true)
}