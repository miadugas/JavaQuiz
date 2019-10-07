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
  "Black Sabbath's original band name was?",
    choice1: "Air",
    choice2: "Fire",
    choice3: "Earth",
    choice4: "Wind",
    answer: 3
  },
  {
  question: 
    "What was the band name before Lemmy changed it to Motörhead?",
    choice1: "The Pink Fairies",
    choice2: "Bastard",
    choice3: "Escalator",
    choice4: "Brütal Legend",
    answer: 2
  },
  {
  question: 
  "What song did Megadeth perform at a concert in Northern Ireland that famously started a riot??",
    choice1: "Sympathy for the Devil",
    choice2: "Peace Sells (But Who's Buying)",
    choice3: "I Wanna Be Sedated",
    choice4: "Anarchy in Ireland",
    answer: 4
  },
  {
    question:
      "Which Metallica album was the last to feature a writing credit to Megadeth frontman Dave Mustaine?",
    choice1: "Ride the Lightning",
    choice2: "Megaforce (Demo)",
    choice3: "Kill Em' All",
    choice4: "No Life til' Leather (Demo)",
    answer: 1
  },
  {
    question: 
    "'Angels fighting aimlessly still dying by the sword' - In what Slayer song can these words be found?",
    choice1: "Angel Of Death",
    choice2: "War Ensemble",
    choice3: "Hell Awaits",
    choice4: "Die By The Sword",
    answer: 3
  },
  {
    question: "Overkill, Anthrax and Nuclear Assault are bands which are part of what area's thrash scene?",
    choice1: "New York City",
    choice2: "The Bay Area",
    choice3: "Texas",
    choice4: "Germany",
    answer: 1
  },
  {
    question: "Venom guitarist Tony Dolan was previously from which of these bands?",
    choice1: "Angel Witch",
    choice2: "Atomkraft",
    choice3: "Anvil",
    choice4: "Razor",
    answer: 2
  },
  {
    question: "Which thrash band played 'spandex metal' music before they changed their style to thrash?",
    choice1: "Anthrax",
    choice2: "Lamb of God",
    choice3: "Slayer",
    choice4: "Pantera",
    answer: 4
  },
  {
    question: "Sepultura, originally from Brazil, is translated into 'grave' from which language?",
    choice1: "Portuguese",
    choice2: "Swedish",
    choice3: "Dutch",
    choice4: "Italian",
    answer: 1
  },
  {
    question: "Who was the vocalist on Iron Maiden's first two albums?",
    choice1: "Bruce Dickinson",
    choice2: "Steve Harris",
    choice3: "Paul Di'Anno",
    choice4: "Rob Halford",
    answer: 3
  }
];


// Not really happy with my timer, 
//its functional but not exactly what I would like
timer = 80;

//Time to make the constants, set max questions & bonus for getting question correct
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
if (timer < 80) {
  count.innerHTML = timer;
} 

else {
  window.clearInterval(update);
  timer = "-";
  message001.innerHTML = "End of Quiz";
}

if (timer < 1) {
  windown.clearInterval(update);
  message001.innerHTML = "Time's up";

}
}




update = setInterval("secondsCounter()", 1000);








startGame();