
var questions = [
    {
        question: "HTML stands for -",
        options: ["HyperText Markup Language", "HyperText and links Markup Language", "HighText Machine Language", "none of these"],
        correctAnswer: 0,
    },
    {
        question:
            "he correct sequence of HTML tags for starting a webpage is -?",
        options: [
            "HTML, Head, Title, Body",
            "HTML, Body, Title, Head",
            "Head, Title, HTML, body",
            "none of these",
        ],
        correctAnswer: 0,
    },
    {
        question:
            "Which of the following element is responsible for making the text bold in HTML?",
        options: [
            "&lt;a&gt;",
            "&lt;b&gt;",
            "&lt;br&gt;",
            "&lt;pre&gt;",
        ],
        correctAnswer: 1,
    },
    {
        question:
            "Which of the following tag is used for inserting the largest heading in HTML?",
        options: ["&lt;h3&gt;", " &lt;h1&gt;", "&lt;h5&gt;", "&lt;h6&gt;"],
        correctAnswer: 1,
    },
    {
        question:
            "Which of the following tag is used to insert a line-break in HTML?",
        options: [`&lt;br&gt;`, "&lt;i&gt;", "&lt;pre&gt;", "&lt;strong&gt;"],
        correctAnswer: 0,
    },
    {
        question: "Which of the following element is responsible for making the text italic in HTML?",
        options: [" &lt;pre&gt;", "&lt;it&gt;", "&lt;italic&gt;", "&lt;i&gt;"],
        correctAnswer: 3,
    },
  
];
let initial=prompt("initials")

let currentQuestionIndex = 0;
let totalQuestion = questions.length;
let correctAnswers = 0;

const scorePerQuestion = 5;
const penaltyPerQuestion = 5;
let defaultTimeLimit = (questions.length - 2) * scorePerQuestion;

let startQuizButton = document.getElementById("startQuizButton");
let optionsWrapper = document.getElementById("options");
let questionWrapper = document.getElementById("questionWrapper");
let questionHeading = document.getElementById("questionHeading");
let nextQuestionElement = document.getElementById("nextQuestion");
let answersElement = document.getElementById('answers');
let scoreElement = document.getElementById('scoreHeading');
let timerSpan = document.getElementById('timerSpan');

nextQuestionElement.addEventListener("click", (event) => {
    nextQuestion();
});

function getQuestionRefrence() {
    let question = document.getElementById("question");
    let options = document.getElementById("options");

    return { question, options };
}

function getQuestionHtml(question) {
    let optionsHTML = [];

    for (let i in question.options) {
        optionsHTML.push(
            `<li><input type="radio" name="option" value="${i}" class="chkans"> ${question.options[i]}</li>`
        );
    }

    return optionsHTML;
}

startQuizButton.addEventListener("click", (event) => {
    startQuizButton.classList.add("hide");
    questionWrapper.classList.remove("hide");
    buildQuestion(0);
    timerSpan.innerText = defaultTimeLimit;
});

function buildQuestion(index) {
    let question = questions[index];
    questionHeading.innerText = question.question;
    optionsContainer=getQuestionHtml(question).join(" ");
    console.log(optionsContainer)
    optionsWrapper.innerHTML = optionsContainer
    timerSpan.innerText = defaultTimeLimit;
}

function analyseAnswer() {
    let answer = document.querySelector('input[name="option"]:checked');
    console.log('hahha', answer);
    if (answer !== null) {
        return answer.value;
    }
    console.log('iam here')
    return -1;
}

function finishQuiz() {
    let totalScore = questions.length * scorePerQuestion;
    let scored = correctAnswers * scorePerQuestion;
    scoreElement.innerText = `${initial} have scored ${scored} out of ${totalScore}`;
    startQuizButton.classList.add("hide");
    questionWrapper.classList.add("hide");
    answersElement.classList.remove('hide');
}

function nextQuestion() {
    try {
        let answer = analyseAnswer();
        console.log(answer);
        if (answer === -1) {
            alert('No option selected');
            return false;
        }

        console.log(answer, questions[currentQuestionIndex].correctAnswer);
        if (answer == questions[currentQuestionIndex].correctAnswer) {
            correctAnswers += 1;

        } else {
            defaultTimeLimit -= penaltyPerQuestion;
        }
        if (defaultTimeLimit <= 0 || currentQuestionIndex >= questions.length - 1) {
            finishQuiz();
        } else {
            currentQuestionIndex++;
            buildQuestion(currentQuestionIndex);
        }
    } catch (err) {
        console.error(err);
    }
}
//timer
var timeEl = document.querySelector(".time");
var secondsLeft = 1000;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent ="Time Remaining " +secondsLeft;

    if(secondsLeft === 0) {
      
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      sendMessage();
    }

  }, 1000);
}


setTime();