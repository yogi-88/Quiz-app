const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "The tallest building in the world is located in the which city",
        choice1: 'Dubai',
        choice1: 'New York',
        choice1: 'Shanghai',
        choice1: 'None of the Above',
        answer: 1
    },
    {
        question: "What percentage of Americans adults believe that choclate milk comes from brown cows?",
        choice1: '20%',
        choice1: '18%',
        choice1: '7%',
        choice1: '33%',
        answer: 3
    },
    {
        question: "Approximately what percent of U>S> power outages are caused by squirrels",
        choice1: '10-20%',
        choice1: '5-10%',
        choice1: '15-20%',
        choice1: '30-40%',
        answer: 4
    },

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter= 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
    }

questionCounter++
progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
progressBarFull.getElementsByClassName.width = `$(questiionCounter/MAX_QUESTIONS) * 100%}%`

const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
currentQuestion = availableQuestions[questionsIndex]
question.innerText = currentQuestion.question

choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
})

availableQuestions.splice(questionsIndex, 1)

acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}