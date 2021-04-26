//init
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

//Hardcoded question data
let questions=[
    {
        question:"what is Spring MVC",
        choice1:"Java Frameork",
        choice2:"Node JS library",
        choice3:"FrontEnd Framework",
        choice4:"DataBase technology",
        answer:"1"

    },
    {
        question:"PHP stands for ",
        choice1:"powerful hypertext protocol",
        choice2:"hypertext preprocessing",
        choice3:"preprocessing html plaintext",
        choice4:"past horizontal place",
        answer:"2"

    },
    {
        question:"Which one is a front end library",
        choice1:"React JS",
        choice2:"Express JS",
        choice3:"Quarkus",
        choice4:"Symfony",
        answer:"1"

    },
    {
        question:"CA stands for",
        choice1:"Club Americain",
        choice2:"Cool Asma",
        choice3:"Class A",
        choice4:"Club Africain",
        answer:"4"

    }
]
//Score & Questions config
const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startQuiz= () =>{
    questionCounter = 0
    score = 0
    availableQuestions= [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    //ending test
    if(availableQuestions.length ==0 || questionCounter > MAX_QUESTIONS ){
        localStorage.setItem('mostRecentScore',score)
        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerHTML=`Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`

    //choix de question
    const questionIndex = Math.floor(Math.random()*availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    //iterate through choices and set it for user
    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    //Remove answered question
    availableQuestions.splice(questionIndex, 1)
    acceptingAnswers = true

    //adding event listener and hadnle clicks
    choices.forEach(choice => {
        choice.addEventListener('click', e => {
            if(!acceptingAnswers) return 
            acceptingAnswers = false
            const selectedChoice = e.target
            const selectedAnswer = selectedChoice.dataset['number']

            //select the class according the response
            let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
            
            if(classToApply==='correct'){
                incrementScore(SCORE_POINTS)
            }
            selectedChoice.parentElement.classList.add(classToApply)

            setTimeout(()=>{
                selectedChoice.parentElement.classList.remove(classToApply)
                getNewQuestion()
            },1000)
        })
    })

    incrementScore = num =>{
        score+=num
        scoreText.innerText=score
    }
}



startQuiz()