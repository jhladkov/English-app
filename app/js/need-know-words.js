const needKnowWordsList = document.querySelector('.words')
const needKnowList = JSON.parse(localStorage.getItem('needKnow'))
const startTest = document.querySelector('.result-inner-item')

const addHTML = (needKnowTrue, nothing) => {
    if (needKnowTrue) {
        needKnowList.forEach(item => {
            needKnowWordsList.insertAdjacentHTML("afterbegin", `
            <p class="words-item">${item[0]} - ?</p>
    `)
        })
    }
    if (nothing) {
        needKnowWordsList.insertAdjacentHTML("afterbegin", `
            <p class="words-item">Вы ничего не добавили</p>
        `)
        startTest.style.display = 'none'
    }
}

window.onload = () => {
    if (needKnowList && needKnowList.length > 0) addHTML(true)
    else addHTML(false, true)
}