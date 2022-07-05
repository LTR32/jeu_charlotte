const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const headerContainer = document.getElementById('header')
const scoreContainer = document.getElementById('score')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
var vid = document.getElementById("video")
var vid_cont = document.getElementById("video_container")
var returnMenu = document.getElementById("return-menu")
var videoEntree = document.getElementById('video_entree')

var score = 0;

let shuffledQuestions, currentQuestionIndex

videoEntree.play()

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

returnMenu.addEventListener('click', ()=>{
  vid_cont.classList.add('hide')
  questionContainerElement.classList.add('hide')
  returnMenu.classList.add('hide')
  headerContainer.classList.remove('hide')
  startButton.classList.remove('hide')
  videoEntree.classList.remove('hide')
  score = 0
  videoEntree.currentTime = 0
  videoEntree.load()
  scoreContainer.innerHTML = '\xa0' + score.toString();
  startButton.innerText = 'Start'
})

function startGame() {
  startButton.classList.add('hide')
  headerContainer.classList.add('hide')
  videoEntree.classList.add('hide')
  vid_cont.classList.remove('hide')
  returnMenu.classList.remove('hide')
  //shuffledQuestions = questions.sort(() => Math.random() - .5)
  shuffledQuestions = questions
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(questions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    button.classList.add('btn-answer')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    startButton.addEventListener('click', event => {
        vid.currentTime = 0
        vid.load()
        score = 0
        scoreContainer.innerHTML = '\xa0' + score.toString();
    })
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
    if(element.classList == 'correct'){
      score++;
      scoreContainer.innerHTML = '\xa0' + score.toString() ;
      playVid()
    }
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false }
    ]
  },
  {
    question: 'Who is the best YouTuber?',
    answers: [
      { text: 'Web Dev Simplified', correct: true },
      { text: 'Traversy Media', correct: true },
      { text: 'Dev Ed', correct: true },
      { text: 'Fun Fun Function', correct: true }
    ]
  },
  {
    question: 'Is web development fun?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'What is 4 * 2?',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: true }
    ]
  },
  {
    question: "4 + 4 ?",
    answers: [
        { text: 'Kinda', correct: false },
        { text: 'YES!!!', correct: true },
        { text: 'Um no', correct: false },
    ]
  }
]


// GESTION VIDÉO
function play_base() {
    vid.play();
}

function play_base_entree(){
  videoEntree.play();
}

function pauseVid(){
    vid.pause();
}

function pauseVidEntree(){
  videoEntree.pause();
}

function playVid() {
    play_base();
    setTimeout(pauseVid, 3000);
}

function playVicEntree(){
  play_base_entree();
}