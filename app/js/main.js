const learnWordsWrapper = document.querySelector('.wrapper');
let numberSelectedWords = document.querySelector('.check')
const moreWords = document.querySelector('.more')
const checkNeedKnow = document.querySelector('.know')
const checkAlreadyKnow = document.querySelector('.already-know')

let alreadyKnowWordsArr = [];
let needKnowWordsArr = [];

let englishWordsArr = ['able', ' ability', 'about', 'above', ' accept', 'according', 'account', 'across', 'act', 'action', 'activity', 'actually', 'add', 'address', 'administration', 'admit', 'adult', 'affect', 'after', 'again', 'against', 'age', 'agency', 'agent', 'ago', 'agree', 'agreement', 'ahead', 'air', 'all', 'allow', 'almost', 'alone', 'along', 'already', 'also', 'although', 'always', 'American', 'among']
let rusWordsArr = ['способный', 'способность', 'о', 'выше', 'принимать', 'в соответствии', 'учетная запись', 'через', 'действовать', 'действие', 'Мероприятия', 'фактически', 'Добавлять', 'адрес', 'администрация', 'признавать', 'взрослый', 'оказывать воздействие', 'после', 'очередной раз', 'против', ' возраст', 'агентство', ' агент', 'тому назад', 'дать согласие', 'соглашение', 'предстоящий', 'воздуха', 'все', 'позволять', 'почти', 'один', ' вдоль', 'уже', 'также', 'хотя', 'всегда', 'Американец', 'среди']

const addWords = (englishWordsArr, rusWordsArr) => {
    rusWordsArr.reduce((accumulator, item, index) => {
        if (accumulator !== 10) {
            learnWordsWrapper.insertAdjacentHTML('afterbegin',
                `
                        <div class="learn-word-inner">
                            <p class="english-word">${englishWordsArr[index]}</p>
                            <hr>
                            <p class="rus-word">${item}</p>
                            <button class="learn-word need-know">Учить слово</button>
                            <button class="learn-word already">Уже знаю</button>
                        </div>
                    `)
            englishWordsArr.splice(index, 1)
            rusWordsArr.splice(index, 1)
            addWordInLearnList()
            addWordInAlreadyList()
            return ++accumulator;
        }
        return accumulator = 10;
    }, 0)
}

const filterEnglishAlreadyKnowArr = (receiveData) => {
    let filterEngArrReceiveDataAlrKnow = []
    receiveData.forEach(item => filterEngArrReceiveDataAlrKnow.push(item[0]))
    filterEngArrReceiveDataAlrKnow.reduce((accumulator,item) => {
        let result = accumulator.filter(el => el !== item)
        localStorage.setItem('startEnglishArr',JSON.stringify(result)) // тут надо шото исправить
        return result
    },englishWordsArr)
}
const filterRusAlreadyKnow = (receiveData) => {
    let filterRusArrReceiveDataAlrKnow = []
    receiveData.forEach(item => filterRusArrReceiveDataAlrKnow.push(item[1]))
    filterRusArrReceiveDataAlrKnow.reduce((accumulator,item) => {
        let result = accumulator.filter(el => el !== item)
        localStorage.setItem('startRusArr',JSON.stringify(result)) // тут надо шото исправить
        return result
    },rusWordsArr)
}
const assignNewValueStartingArr = () => {
    rusWordsArr = JSON.parse(localStorage.getItem('startRusArr'))
    englishWordsArr = JSON.parse(localStorage.getItem('startEnglishArr'))
}

const removeWordThatSelected =  () => {
    let receiveDataFromAlreadyKnow =  JSON.parse(localStorage.getItem('alreadyKnow'))
    let receiveDataFromNeedKnow = JSON.parse(localStorage.getItem('needKnow'))
    if (receiveDataFromAlreadyKnow) {
        filterEnglishAlreadyKnowArr(receiveDataFromAlreadyKnow)
        filterRusAlreadyKnow(receiveDataFromAlreadyKnow)
        assignNewValueStartingArr()
    }
    if (receiveDataFromNeedKnow) {
        filterEnglishAlreadyKnowArr(receiveDataFromNeedKnow)
        filterRusAlreadyKnow(receiveDataFromNeedKnow)
        assignNewValueStartingArr()
    }
}

const setCheckDataInStorage = async (checkNeedKnow, checkAlreadyKnow, windowOnload) => {
    if (windowOnload) {
        if (localStorage.getItem('checkAlreadyKnow')) {
            document.querySelector('.already-know').innerHTML = localStorage.getItem('checkAlreadyKnow')
        }
        if (localStorage.getItem('checkNeedKnow')) {
            document.querySelector('.know').innerHTML = localStorage.getItem('checkNeedKnow')
           document.querySelector('.check').innerHTML = JSON.parse(localStorage.getItem('checkNeedKnow'))
        }
    }
    if (checkAlreadyKnow) {
        await localStorage.setItem('alreadyKnow', JSON.stringify(alreadyKnowWordsArr))
        await localStorage.setItem('checkAlreadyKnow', JSON.stringify(JSON.parse(localStorage.getItem('alreadyKnow')).length))
        // await localStorage.setItem('checkAlreadyKnow', JSON.stringify(alreadyKnowWordsArr.length))
        checkAlreadyKnow.innerHTML = localStorage.getItem('checkAlreadyKnow')
    }
    if (checkNeedKnow) {
        await localStorage.setItem('needKnow', JSON.stringify(needKnowWordsArr))
        await localStorage.setItem('checkNeedKnow', JSON.stringify(JSON.parse(localStorage.getItem('needKnow')).length))
        // await localStorage.setItem('checkNeedKnow', JSON.stringify(needKnowWordsArr.length))
        checkNeedKnow.innerHTML = localStorage.getItem('checkNeedKnow')
    }
}

const addWordInAlreadyList = () => {
    let learnWordInner = Array.from(document.querySelectorAll('.learn-word-inner'))
    let alreadyButton = Array.from(document.querySelectorAll('.already'))
    let englishWord = document.querySelectorAll('.english-word')
    let rusWord = document.querySelectorAll('.rus-word')

    alreadyButton.forEach((item, i) => {
        item.onclick = async () => {
            learnWordInner[i].remove()
            alreadyKnowWordsArr.push([englishWord[i].textContent, rusWord[i].textContent])
            await setCheckDataInStorage(null, checkAlreadyKnow)
        }
    })
}
const blockUse = (block) => {
    if ( block || JSON.parse(localStorage.getItem('needKnow')).length === 10) {
        localStorage.setItem('blockUse',true)
        learnWordsWrapper.innerHTML = `<p>На сегодня все, приходите завтра</p>`
        moreWords.disabled = true
        localStorage.setItem('tomorrow',JSON.stringify(new Date().getDate() + 1) )
    }else moreWords.disabled = false
}

const addWordInLearnList = () => {
    let learnWordInner = document.querySelectorAll('.learn-word-inner')
    let learnWord = document.querySelectorAll('.need-know')
    let englishWord = document.querySelectorAll('.english-word')
    let rusWord = document.querySelectorAll('.rus-word')

    learnWord.forEach((item, i) => {
        item.onclick = async () => {
            learnWordInner[i].remove()
            needKnowWordsArr.push([englishWord[i].textContent, rusWord[i].textContent])
            await setCheckDataInStorage(checkNeedKnow)
            numberSelectedWords.innerHTML = JSON.parse(localStorage.getItem('needKnow')).length // fdf
           blockUse()
        }
    })
}

moreWords.onclick = () => {
    addWords(englishWordsArr, rusWordsArr)
}

window.onload = async () => {
    if (new Date().getDate() === JSON.parse(localStorage.getItem('tomorrow'))  ) {
        localStorage.setItem('blockUse',false)
    }
    await removeWordThatSelected()
    addWords(englishWordsArr, rusWordsArr)
    if (localStorage.getItem('alreadyKnow')) alreadyKnowWordsArr = JSON.parse(localStorage.getItem('alreadyKnow')) // чтобы в localStorage данные не перетирались
    if (localStorage.getItem('needKnow')) needKnowWordsArr = JSON.parse(localStorage.getItem('needKnow')) // чтобы в localStorage данные не перетирались
    await setCheckDataInStorage(null, null, true)
    if (JSON.parse(localStorage.getItem('blockUse'))) {
        blockUse(JSON.parse(localStorage.getItem('blockUse')))
    }
}