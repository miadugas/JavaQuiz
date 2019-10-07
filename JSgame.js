
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
  "The _______ method of an Array object adds and/or removes elements from an array.",
    choice1: "Reverse",
    choice2: "Splice",
    choice3: "Shift",
    choice4: "Slice",
    answer: 2
  },
  {
  question: 
    "Which of the following can't be done with client-side JavaScript?",
    choice1: "Validating a form",
    choice2: "Sending a form's contents by email",
    choice3: "Storing the form's contents to a database file on the server",
    choice4: "None of the above",
    answer: 3
  },
  {
  question: 
  "What are variables used for in JavaScript Programs?",
    choice1: "Storing numbers, dates, or other values",
    choice2: "Varying randomly",
    choice3: "Causing high-school algebra flashbacks",
    choice4: "Accept parameters and Return a value",
    answer: 1
  },
  {
    question:
      "Which built-in method returns the string representation of the number's value?",
    choice1: "toValue()",
    choice2: "toNumber()",
    choice3: "toString()",
    choice4: "None of the above.",
    answer: 3
  },
  {
    question: "Which of the following code creates an object?",
    choice1: "var cello = Object();",
    choice2: "var lute = new Object();",
    choice3: "var viola = new OBJECT();",
    choice4: "var harpsichord = new Book();",
    answer: 2
  },
  {
    question: "Which of the following function of String object returns a number indicating the Unicode value of the character at the given index?",
    choice1: "charAt()",
    choice2: "concat()",
    choice3: "indexOf()",
    choice4: "charCodeAt()",
    answer: 4
  },
  {
    question: "Which of the following function of Array object returns the last (greatest) index of an element within the array equal to the specified value, or -1 if none is found?",
    choice1: "indexOf()",
    choice2: "lastIndexOf()",
    choice3: "join()",
    choice4: "map()",
    answer: 2
  },
  {
    question: "Choose the server-side JavaScript object?",
    choice1: "FileUpLoad",
    choice2: "ParseFloat",
    choice3: "Function",
    choice4: "File",
    answer: 4
  },
  {
    question: "How do you find the number with the highest value of x and y",
    choice1: "Math.max(x, y)",
    choice2: "top(x, y)",
    choice3: "Math.ceil(x, y)",
    choice4: "ceil(x, y)",
    answer: 1
  },
  {
    question: "How would you write an IF statement in JavaScript?",
    choice1: "if i = 5",
    choice2: "if i = 5",
    choice3: "if (i == 5)",
    choice4: "if i = 5 then",
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