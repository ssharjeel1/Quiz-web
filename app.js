const questions = [
    // ... (previous questions)

    {
        question: "What year was Sindh Police established?",
        answers: [
            { text: "1939", correct: false },
            { text: "1947", correct: false },
            { text: "1843", correct: true },
            { text: "1965", correct: false },
        ],
    },
    {
        question: "Which city serves as the headquarters of Sindh Police?",
        answers: [
            { text: "Karachi", correct: true },
            { text: "Hyderabad", correct: false },
            { text: "Sukkur", correct: false },
            { text: "Larkana", correct: false },
        ],
    },
    {
        question: "What is the rank structure of Sindh Police, starting from the highest?",
        answers: [
            { text: "Inspector General", correct: true },
            { text: "Superintendent of Police", correct: false },
            { text: "Deputy Superintendent of Police", correct: false },
            { text: "Station House Officer", correct: false },
        ],
    },
    {
        question: "Which specialized unit of Sindh Police deals with counter-terrorism?",
        answers: [
            { text: "Anti-Vehicle Lifting Cell", correct: false },
            { text: "Criminal Investigation Department", correct: false },
            { text: "Special Security Unit", correct: true },
            { text: "Traffic Police", correct: false },
        ],
    },
    {
        question: "What is the emergency contact number for Sindh Police?",
        answers: [
            { text: "15", correct: false },
            { text: "17", correct: false },
            { text: "1122", correct: false },
            { text: "15 and 115", correct: true },
        ],
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
        // Display the correct answer
        Array.from(answerButton.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
        });
    }

    Array.from(answerButton.children).forEach(button => {
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
