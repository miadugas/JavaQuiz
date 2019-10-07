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
  "Who played Inspector Dan Clay in Plan 9 From Outer Space?",
    choice1: "Tor Johnson",
    choice2: "Béla Lagosi",
    choice3: "Gregory Walcott",
    choice4: "Lyle Talbot",
    answer: 1
  },
  {
  question: 
    "In Frankenstein Meets the Space Monster(1965), who is the main antagonist?",
    choice1: "Nadir",
    choice2: "Dr. Adam Steele",
    choice3: "Princess Markuzan",
    choice4: "Col. Frank Saunder",
    answer: 3
  },
  {
  question: 
  "In It Came from Outer Space (1953), where does a spaceship crash to start the movies plot?",
    choice1: "Washington DC",
    choice2: "The Arizona desert",
    choice3: "The Pacific Nothwest",
    choice4: "Hollywood CA",
    answer: 2
  },
  {
    question:
      "In Rocketship X-M (1950), who plays Col. Floyd Graham? ",
    choice1: "Peter Graves",
    choice2: "Hugh Beaumont",
    choice3: "Dabbs Greer",
    choice4: "Lloyd Bridges",
    answer: 4
  },
  {
    question: "What was the working title of Bride of Frankenstein?",
    choice1: "Frankenstein Creates Woman",
    choice2: " Frankenstein Returns",
    choice3: "Frankenstein Makes a Mate",
    choice4: "The Return of Frankenstein",
    answer: 4
  },
  {
    question: "Which movie DID NOT cast Bela Lugosi?",
    choice1: "Son of Dracula (1943)",
    choice2: "The Corpse Vanishes (1942)",
    choice3: "Glen or Glenda (1953)",
    choice4: "Return of the Ape Man (1944)",
    answer: 1
  },
  {
    question: "In The Giant Spider Invasion (1975), where do the Giant Spiders invade?",
    choice1: "New Mexico",
    choice2: "Wisconsin",
    choice3: "South Dakota",
    choice4: "West Virginia",
    answer: 2
  },
  {
    question: "In Evil Brain from Outer Space (1965), who is the hero that must rescue Earth from the menace of the evil brain?",
    choice1: "Ultraman",
    choice2: "Vampirella",
    choice3: "Octaman",
    choice4: "Starman",
    answer: 4
  },
  {
    question: "In Attack of the 50 Foot Woman (1958), Allison Hayes plays the title character. What is her name?",
    choice1: "Nancy Archer",
    choice2: "Eileene Stevens",
    choice3: "Yvette Von Loeb",
    choice4: "Honey Parker",
    answer: 1
  },
  {
    question: "In Re-Animator (1985) How long does Dr. Carl Hill say a brain survive after the head is open?",
    choice1: "1-3 minutes",
    choice2: "4-8 minutes",
    choice3: "6-12 minutes",
    choice4: "It dies right away",
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
  window.location.href = "HoH.html";
  
}

if (timer < 1) {
  window.clearInterval(update);
  window.location.href = "HoH.html";
  

}
}




update = setInterval("secondsCounter()", 1000);








startGame();
