const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
      "Hyper Text Markup Language",
      "Hyper Tool Markup Language",
    ],
    correctIndex: 2,
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creativity Standard Starter",
      "Canvas Style Standard",
      "Caption Spill Sheet",
      "Cascading Style Sheets",
    ],
    correctIndex: 3,
  },
  {
    question: "In which country did the cheese Emmental originate?",
    options: ["Brazil", "France", "Switzerland", "Germany"],
    correctIndex: 2,
  },
  {
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    correctIndex: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctIndex: 1,
  },
];

let currentQuestionIndex = 0;
let userAnswers = Array(questions.length).fill(null);

// -------------------- DISPLAY QUESTION --------------------
function displayQuestion(index) {
  const question = questions[index];

  // update question counter
  document.querySelector(
    ".text-container p:first-of-type"
  ).textContent = `QUESTION ${index + 1} OF ${questions.length}`;

  // update question text
  document.querySelector(".text-container p:last-of-type").textContent =
    question.question;

  // update options
  question.options.forEach((option, optionIndex) => {
    document.getElementById(`option${optionIndex + 1}`).textContent = option;
  });

  // reset radio buttons and labels
  const options = document.querySelectorAll(".input-radio");
  const labels = document.querySelectorAll(".radio-label");
  options.forEach((opt) => {
    opt.checked = false;
    opt.disabled = false;
  });
  labels.forEach((label) => {
    label.classList.remove("correct-option", "wrong-option");
  });

  // restore user selection if exists
  const savedAnswer = userAnswers[index];
  if (savedAnswer !== null) {
    options[savedAnswer].checked = true;
    options.forEach((opt) => (opt.disabled = true));

    // reapply correct/wrong colors
    const correctIdx = question.correctIndex;
    labels.forEach((label, labelIdx) => {
      const input = document.getElementById(label.getAttribute("for"));
      if (labelIdx === correctIdx) {
        label.classList.add("correct-option");
      } else if (input.checked) {
        label.classList.add("wrong-option");
      }
    });
  }
}

// -------------------- HANDLE ANSWERS --------------------
document.addEventListener("DOMContentLoaded", function () {
  displayQuestion(currentQuestionIndex);

  const options = document.querySelectorAll(".input-radio");
  const labels = document.querySelectorAll(".radio-label");

  options.forEach((option, optionIdx) => {
    option.addEventListener("click", function () {
      // Save answer
      userAnswers[currentQuestionIndex] = optionIdx;

      // Disable options after selection
      options.forEach((opt) => (opt.disabled = true));

      // Apply colors
      const currentQuestion = questions[currentQuestionIndex];
      const correctIdx = currentQuestion.correctIndex;

      labels.forEach((label, labelIdx) => {
        const input = document.getElementById(label.getAttribute("for"));
        label.classList.remove("correct-option", "wrong-option");
        if (labelIdx === correctIdx) {
          label.classList.add("correct-option");
          if (optionIdx === correctIdx) correct(); // play correct sound
        } else if (input.checked) {
          label.classList.add("wrong-option");
          if (optionIdx !== correctIdx) wrong(); // play wrong sound
        }
      });

      updateScoreboard();
    });
  });
});

// -------------------- NAVIGATION --------------------
document.getElementById("next-btn").addEventListener("click", function (e) {
  e.preventDefault();
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
  } else {
    showFinalScore();
  }
});

document.getElementById("back-btn").addEventListener("click", function (e) {
  e.preventDefault();
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion(currentQuestionIndex);
  }
});

// -------------------- SCOREBOARD --------------------
function updateScoreboard() {
  const score = userAnswers.reduce((acc, answer, idx) => {
    return acc + (answer === questions[idx].correctIndex ? 1 : 0);
  }, 0);
  document.getElementById(
    "score"
  ).textContent = `SCORE ${score} / ${questions.length}`;
}

function showFinalScore() {
  const score = userAnswers.reduce((acc, answer, idx) => {
    return acc + (answer === questions[idx].correctIndex ? 1 : 0);
  }, 0);

  const main = document.querySelector("main");
  main.innerHTML = `
    <div class="final-score">
      <h2>Quiz Finished!</h2>
      <p>Your final score is:</p>
      <h3>${score} / ${questions.length}</h3>
      <button id="restart-btn">Restart Quiz</button>
    </div>
  `;

  document.getElementById("restart-btn").addEventListener("click", restartQuiz);
}

function restartQuiz() {
  currentQuestionIndex = 0;
  userAnswers = Array(questions.length).fill(null);
  location.reload(); // simple reset
}

// -------------------- SOUNDS --------------------
function correct() {
  const soundEffect = new Audio("/trumpet.mp3");
  soundEffect.play().catch(() => {});
}

function wrong() {
  const soundEffect = new Audio("/failer.mp3");
  soundEffect.play().catch(() => {});
}
