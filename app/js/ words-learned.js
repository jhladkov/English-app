const wordsList = document.querySelector('.words')
const alreadyList = JSON.parse(localStorage.getItem('alreadyKnow'))

const addHTML = (alreadyListTrue,nothing) => {
    if (alreadyListTrue) {
        alreadyList.forEach(item => {
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
    if (alreadyList) addHTML(true)
    else addHTML(false,true)
}