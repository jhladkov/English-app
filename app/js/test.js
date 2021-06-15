const listAnswer = document.querySelector('.wrapper-list')
const receiveDataNeedKnow = JSON.parse(localStorage.getItem('needKnow'))

let startRusArr = JSON.parse(localStorage.getItem('startRusArr'))

const randomRusValue = (startRusArr) => {
    return startRusArr.splice(Math.floor(Math.random() * startRusArr.length), 1);
}

const addHTML = (receiveDataNeedKnow) => {
    receiveDataNeedKnow.forEach(item => {
        const elementsHTML = [`<div class="card-answer win">
                <p>${item[1]}</p>
              </div>`, `<div class="card-answer">
    <p>${randomRusValue(startRusArr)}</p>
</div>`, `<div class="card-answer">
                <p>${randomRusValue(startRusArr)}</p>
              </div>`, `<div class="card-answer">
                <p>${randomRusValue(startRusArr)}</p>
              </div>`]

        listAnswer.insertAdjacentHTML("beforeend", `
        
            <div class="inner">
              <div class="wrapper-title">${item[0]}</div>
              ${elementsHTML.splice(Math.floor(Math.random() * elementsHTML.length), 1)}  
              ${elementsHTML.splice(Math.floor(Math.random() * elementsHTML.length), 1)}     
              ${elementsHTML.splice(Math.floor(Math.random() * elementsHTML.length), 1)}   
              ${elementsHTML.splice(Math.floor(Math.random() * elementsHTML.length), 1)}                               
            </div>
    `)
        clickHandler()
    })
}


const test = (receiveDataNeedKnow, parent) => {
    let testV = document.querySelectorAll('.inner')
    testV.forEach((item2, i) => {
        if (item2 === parent) {
            item2.remove()
            let receiveValue = JSON.parse(localStorage.getItem('alreadyKnow'))
            localStorage.setItem('alreadyKnow',JSON.stringify(receiveValue.concat(receiveDataNeedKnow.splice(i, 1))))
            localStorage.setItem('needKnow', JSON.stringify(receiveDataNeedKnow))
            localStorage.setItem('checkNeedKnow', JSON.stringify(JSON.parse(localStorage.getItem('needKnow')).length))
            localStorage.setItem('checkAlreadyKnow', JSON.stringify(JSON.parse(localStorage.getItem('alreadyKnow')).length))
        }
    })
}

const clickHandler = () => {
    const correctOption = document.querySelectorAll('.win')
    correctOption.forEach(item => {
        item.onclick = () => {
            test(receiveDataNeedKnow, item.parentNode)
        }
    })
}

window.onload = () => {
    addHTML(receiveDataNeedKnow)
}
