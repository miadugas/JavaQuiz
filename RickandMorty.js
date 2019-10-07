// select all my elements
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
// create my questions
let questions = [
  {
  question: 
  "What Universe Is The Main Rick From?",
    choice1: "A-434",
    choice2: "B-244",
    choice3: "C-137",
    choice4: "D-808",
    answer: 3
  },
  {
  question: 
    "What Does 'Wubba Lubba Dub Dub' Mean?",
    choice1: "I your face, yo!",
    choice2: "How does that profit me?",
    choice3: "I am in great pain. Please help me.",
    choice4: "Life is completely meaningless",
    answer: 3
  },
  {
  question: 
  "Complete the Rick quote: 'School is not a place...'",
    choice1: "...for smart people",
    choice2: "...for geniuses",
    choice3: "...for Ricks",
    choice4: "...for learning",
    answer: 1
  },
  {
    question:
      "What was Jerry’s apple-based ad slogan?",
    choice1: "Where are the apples?",
    choice2: "Apples: they're great",
    choice3: "Got Apples?",
    choice4: "Hungry for apples?",
    answer: 4
  },
  {
    question: "Which of these was a ride at Anatomy Park?",
    choice1: "Spleen Mountain",
    choice2: "Kidney Safari",
    choice3: "The Tower of Tibia",
    choice4: "Pirates of the Pancreas",
    answer: 4
  },
  {
    question: "What does the wind whisper to Jerry?",
    choice1: "Loser",
    choice2: "Jerk",
    choice3: "A$$hole",
    choice4: "Pathetic",
    answer: 1
  },
  {
    question: "Which undercover agent did Birdperson marry?",
    choice1: "Becky",
    choice2: "Tammy",
    choice3: "Sarah",
    choice4: "Karen",
    answer: 2
  },
  {
    question: "How old is Morty?",
    choice1: "12",
    choice2: "18",
    choice3: "16",
    choice4: "14",
    answer: 4
  },
  {
    question: "On what matriarchal planet do people live with arms on their heads?",
    choice1: "Gazorpazorp",
    choice2: "Birdworld",
    choice3: "YNebulon",
    choice4: "The Citadel",
    answer: 1
  },
  {
    question: "What did Rick’s love potion turn Earth’s people into?",
    choice1: "Cravens",
    choice2: "Carpenters",
    choice3: "Cronenbergs",
    choice4: "Hitchcocks",
    answer: 3
  }
];

// Not really happy with my timer, 
//its functional but not exactly what I would like
var timer = 80;

//Time to make the constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};
// grab some questions based on whats left
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("endGame.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};
// validate the answers
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);
//timeout
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});
//keep score 
incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

//timer function
function secondsCounter () {
timer = timer - 1;
if (timer < 140) {
  count.innerHTML = timer;
} 

if (timer < 1) {
  windown.clearInterval(update);

}
}

update = setInterval("secondsCounter()", 1000);





startGame();
