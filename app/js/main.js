const learnWordsWrapper = document.querySelector('.wrapper');
let numberSelectedWords = document.querySelector('.check')
const moreWords = document.querySelector('.more')
const checkNeedKnow = document.querySelector('.know')
const checkAlreadyKnow = document.querySelector('.already-know')

let learnWordInner;
let alreadyKnowButton;
let englishWord;
let rusWord;
let learnWord;

let alreadyKnowWordsArr = [];
let needKnowWordsArr = [];

let englishWordsArr = ['able', ' ability', 'about', 'above', ' accept', 'according', 'account', 'across', 'act', 'action', 'activity', 'actually', 'add', 'address', 'administration', 'admit', 'adult', 'affect', 'after', 'again', 'against', 'age', 'agency', 'agent', 'ago', 'agree', 'agreement', 'ahead', 'air', 'all', 'allow', 'almost', 'alone', 'along', 'already', 'also', 'although', 'always', 'American', 'among']
let rusWordsArr = ['способный', 'способность', 'о', 'выше', 'принимать', 'в соответствии', 'учетная запись', 'через', 'действовать', 'действие', 'Мероприятия', 'фактически', 'Добавлять', 'адрес', 'администрация', 'признавать', 'взрослый', 'оказывать воздействие', 'после', 'очередной раз', 'против', ' возраст', 'агентство', ' агент', 'тому назад', 'дать согласие', 'соглашение', 'предстоящий', 'воздуха', 'все', 'позволять', 'почти', 'один', ' вдоль', 'уже', 'также', 'хотя', 'всегда', 'Американец', 'среди']

const updateDOM = () => {
    learnWordInner = Array.from(document.querySelectorAll('.learn-word-inner'))
    alreadyKnowButton = Array.from(document.querySelectorAll('.already'))
    englishWord = document.querySelectorAll('.english-word')
    rusWord = document.querySelectorAll('.rus-word')
    learnWord = document.querySelectorAll('.need-know')
}

// добавляем слова на страницу
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
            addWordInAlreadyKnowList()
            addWordInNeedKnowList()
            return ++accumulator;
        }
        return 10;
    }, 0)
}
//

moreWords.onclick = () => {
    addWords(englishWordsArr, rusWordsArr)
}

// добавления слов в масивы localStorage
const addWordInAlreadyKnowList = () => {
    updateDOM()
    alreadyKnowButton.forEach((item, i) => {
        item.onclick = async () => {
            learnWordInner[i].remove()
            alreadyKnowWordsArr.push([englishWord[i].textContent, rusWord[i].textContent])
            await setCheckDataInStorage(null, checkAlreadyKnow)

        }
    })
}

const addWordInNeedKnowList = () => {
    updateDOM()
    learnWord.forEach((item, i) => {
        item.onclick = async () => {
            learnWordInner[i].remove()
            needKnowWordsArr.push([englishWord[i].textContent, rusWord[i].textContent])
            await setCheckDataInStorage(checkNeedKnow)
            numberSelectedWords.innerHTML = JSON.parse(localStorage.getItem('needKnow')).length
            removeWordThatSelected()
            blockUse()
        }
    })
}
//

// создание стартовых массивов (фильтруем их от слов, которые уже добавлены в массивы localStorage )
const createStartEnglishArr = (receiveData) => {
    let filterEngArrReceiveDataAlrKnow = []
    receiveData.forEach(item => filterEngArrReceiveDataAlrKnow.push(item[0]))
    filterEngArrReceiveDataAlrKnow.reduce((accumulator, item) => {
        let result = accumulator.filter(el => el !== item)
        localStorage.setItem('startEnglishArr', JSON.stringify(result))
        return result
    }, englishWordsArr)
}
const createStartRusArr = (receiveData) => {
    let filterRusArrReceiveDataAlrKnow = []
    receiveData.forEach(item => filterRusArrReceiveDataAlrKnow.push(item[1]))
    filterRusArrReceiveDataAlrKnow.reduce((accumulator, item) => {
        let result = accumulator.filter(el => el !== item)
        localStorage.setItem('startRusArr', JSON.stringify(result))
        return result
    }, rusWordsArr)
}
const assignNewValueStartingArr = () => {
    rusWordsArr = JSON.parse(localStorage.getItem('startRusArr'))
    englishWordsArr = JSON.parse(localStorage.getItem('startEnglishArr'))
}
//

// удаление слов которые с главной страницы, которые уже есть в масивах localStorage
const removeWordThatSelected = () => {
    let receiveDataFromAlreadyKnow = JSON.parse(localStorage.getItem('alreadyKnow'))
    let receiveDataFromNeedKnow = JSON.parse(localStorage.getItem('needKnow'))
    if (receiveDataFromAlreadyKnow) {
        createStartEnglishArr(receiveDataFromAlreadyKnow)
        createStartRusArr(receiveDataFromAlreadyKnow)
        assignNewValueStartingArr()
    }
    if (receiveDataFromNeedKnow) {
        createStartEnglishArr(receiveDataFromNeedKnow)
        createStartRusArr(receiveDataFromNeedKnow)
        assignNewValueStartingArr()
    }
}
//

// даем значения чеккерам(те которые следят за количеством выбранных на изучение и уже изученых слов)
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
        checkAlreadyKnow.innerHTML = localStorage.getItem('checkAlreadyKnow')
    }
    if (checkNeedKnow) {
        await localStorage.setItem('needKnow', JSON.stringify(needKnowWordsArr))
        await localStorage.setItem('checkNeedKnow', JSON.stringify(JSON.parse(localStorage.getItem('needKnow')).length))
        checkNeedKnow.innerHTML = localStorage.getItem('checkNeedKnow')
    }
}
//

// после достижения 10 выбраных слов блокируем слова
const blockUse = (block) => {
    if (block || JSON.parse(localStorage.getItem('needKnow')).length === 10) {
        localStorage.setItem('blockUse', true)
        learnWordsWrapper.innerHTML = `<p>На сегодня все, приходите завтра</p>`
        moreWords.disabled = true
        localStorage.setItem('tomorrow', JSON.stringify(new Date().getDate() + 1))
    } else moreWords.disabled = false
}
//

// тут трэш :)
// Кста, я понатыкал столько async и await, потому что у меня очень много операций с localStorage, а с ними иногда бывают казусы с ассинхроностю
window.onload = async () => {
    removeWordThatSelected()
    await addWords(englishWordsArr, rusWordsArr)
    await setCheckDataInStorage(null, null, true)
    if (new Date().getDate() === JSON.parse(localStorage.getItem('tomorrow'))) {
        localStorage.setItem('blockUse', false)
    }
    if (localStorage.getItem('alreadyKnow')) alreadyKnowWordsArr = JSON.parse(localStorage.getItem('alreadyKnow')) // чтобы в localStorage данные не перетирались
    if (localStorage.getItem('needKnow')) needKnowWordsArr = JSON.parse(localStorage.getItem('needKnow')) // чтобы в localStorage данные не перетирались
    if (JSON.parse(localStorage.getItem('blockUse'))) {
        blockUse(JSON.parse(localStorage.getItem('blockUse')))
    }
}