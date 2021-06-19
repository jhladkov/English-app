const needKnowWordsList = document.querySelector('.words-list')
const needKnowList = JSON.parse(localStorage.getItem('needKnow'))
const startTest = document.querySelector('.words-test-start')

const addHTML = (needKnowTrue, nothing) => {
    if (needKnowTrue) {
        needKnowList.forEach(item => {
            needKnowWordsList.insertAdjacentHTML("afterbegin", `
            <li class="words-list-item">${item[0]} - ?</li>
    `)
        })
    }
    if (nothing) {
        needKnowWordsList.insertAdjacentHTML("afterbegin", `
            <li class="words-list-item">Вы ничего не добавили</li>
        `)
        startTest.style.display = 'none'
    }
}

window.onload = () => {
    if (needKnowList && needKnowList.length > 0) addHTML(true)
    else addHTML(false, true)
}