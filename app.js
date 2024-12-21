let Question = [
    {
        'ques': 'Which team won the Cricket World Cup 1992?',
        'a': 'Pakistan',
        'b': 'India',
        'c': 'Australia',
        'd': 'West Indies',
        'correct': 'a',
    },
    {
        'ques': 'Who holds the record for the most goals in FIFA World Cup history?',
        'a': 'Cristiano Ronaldo',
        'b': 'Pele',
        'c': 'Miroslav Klose',
        'd': 'Lionel Messi',
        'correct': 'c',
    },
    {
        'ques': 'Which is the largest planet in our Solar System?',
        'a': 'Earth',
        'b': 'Mars',
        'c': 'Jupiter',
        'd': 'Saturn',
        'correct': 'c',
    },
    {
        'ques': 'Which country is known as the Land of the Rising Sun?',
        'a': 'China',
        'b': 'Japan',
        'c': 'Thailand',
        'd': 'South Korea',
        'correct': 'b',
    },
    {
        'ques': 'What is the chemical symbol for Gold?',
        'a': 'Go',
        'b': 'Au',
        'c': 'Ag',
        'd': 'Pt',
        'correct': 'b',
    },
    {
        'ques': 'Who wrote the play "Hamlet"?',
        'a': 'Charles Dickens',
        'b': 'William Shakespeare',
        'c': 'Mark Twain',
        'd': 'George Orwell',
        'correct': 'b',
    },
    {
        'ques': 'Which year did the Titanic sink?',
        'a': '1905',
        'b': '1912',
        'c': '1918',
        'd': '1923',
        'correct': 'b',
    },
    {
        'ques': 'What is the capital of Australia?',
        'a': 'Sydney',
        'b': 'Melbourne',
        'c': 'Canberra',
        'd': 'Brisbane',
        'correct': 'c',
    },
    {
        'ques': 'Which is the longest river in the world?',
        'a': 'Amazon',
        'b': 'Nile',
        'c': 'Yangtze',
        'd': 'Mississippi',
        'correct': 'b',
    },
    {
        'ques': 'Who discovered penicillin?',
        'a': 'Marie Curie',
        'b': 'Alexander Fleming',
        'c': 'Louis Pasteur',
        'd': 'Gregor Mendel',
        'correct': 'b',
    }
];

let score = 0;
let total = Question.length;
let index = 0;
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
let timerElement = document.getElementById('timer'); // Timer element
nextButton.disabled = true;

let timeRemaining = total * 60; // Total time for 10 questions in seconds (10 minutes)

// Timer function
function startTimer() {
    const timerInterval = setInterval(() => {
        let minutes = Math.floor(timeRemaining / 60);
        let seconds = timeRemaining % 60;
        timerElement.innerText = `Time Left: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        
        timeRemaining--;

        if (timeRemaining < 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

// Function to end quiz when timer runs out
function endQuiz() {
    questionElement.innerHTML = `
        <h1>Time's Up!</h1>
        <h2>Your score: ${score} / ${total}</h2>`;
    optionsElement.innerHTML = "";
    nextButton.style.display = "none";
}

let loadQuestion = () => {
    questionElement.innerText = "";
    const question = Question[index];
    questionElement.innerText = `${index + 1} ) ${question.ques}`;

    for (let key in question) {
        if (key !== "ques" && key !== "correct") {

            let optionInput = document.createElement("input");
            optionInput.type = "radio";
            optionInput.name = "option",
                optionInput.value = key;

            optionInput.addEventListener("change", () => {
                nextButton.disabled = false;
            });

            let Label = document.createElement("label");
            Label.innerText = question[key];

            let optionShow = document.createElement("div");
            optionShow.className = "OptionDisplay";
            optionShow.style.textAlign = "left";
            optionShow.style.marginTop = "10px";

            optionShow.appendChild(optionInput);
            optionShow.appendChild(Label);
            optionsElement.appendChild(optionShow);
        }
    }
    nextButton.disabled = true;
};
loadQuestion();

let checkAnswer = () => {
    let selectOption = document.querySelector(`input[name="option"]:checked`); 
    if (selectOption) {
        const UserAns = selectOption.value;
        const correctAns = Question[index].correct;

        if (UserAns === correctAns) {
            score++;
        }
    } else {
        alert("Select the Option");
    }
};

let moveNext = () => {
    checkAnswer();
    index++;
    optionsElement.innerText = "";

    if (index === total) {
        endQuiz();
        return;
    }

    loadQuestion();
};

startTimer(); // Start the timer when the script runs
