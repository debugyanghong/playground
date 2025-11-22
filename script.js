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
  // {
  //   question:
  //     "Which flies a green, white, and orange (in that order) tricolor flag?",
  //   options: ["Ireland", "Ivory Coast", "Italy", "India"],
  //   correctIndex: 0,
  // },
  // {
  //   question: "Which planet is known as the Red Planet?",
  //   options: ["Earth", "Mars", "Jupiter", "Venus"],
  //   correctIndex: 1,
  // },
  // {
  //   question: "What is the capital of Japan?",
  //   options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
  //   correctIndex: 2,
  // },
];
let lastQuestionIndex = questions.length - 1;
let currentQuestionIndex = 0;
let userAnswers = Array(questions.length).fill(null);
let originalQuizHTML = null;
const backBtn = document.getElementById("back-btn");
// -------------------- DISPLAY QUESTION --------------------
function displayQuestion(index) {
  const question = questions[index];
  if (index === 0) {
    backBtn.style.visibility = "hidden";
  } else {
    backBtn.style.visibility = "visible";
  }

  const nextBtn = document.getElementById("next-btn");
  if (index === questions.length - 1) {
    nextBtn.style.visibility = "hidden";
  } else {
    nextBtn.style.visibility = "visible";
  }

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
  originalQuizHTML = document.querySelector("main").innerHTML;
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

      // If this is the last question AND all answered → show final score
      if (userAnswers.every((ans) => ans !== null)) {
        showFinalScore();
      }
    });
  });
});

// -------------------- NAVIGATION --------------------
function clickNextButton(e) {
  e.preventDefault();
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
  }
}

function clickBackButton(ev) {
  ev.preventDefault();
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion(currentQuestionIndex);
  }
}

// -------------------- SCOREBOARD --------------------

const scoreElement = document.getElementById("score");
scoreElement.textContent = `SCORE 0 / ${questions.length}`;

function updateScoreboard() {
  const score = userAnswers.reduce((acc, answer, idx) => {
    return acc + (answer === questions[idx].correctIndex ? 1 : 0);
  }, 0);
  document.getElementById(
    "score"
  ).textContent = `SCORE ${score} / ${questions.length}`;
}

// -------------------- FINAL SCORE SCREEN --------------------
function showFinalScore() {
  const score = userAnswers.reduce((acc, answer, idx) => {
    return acc + (answer === questions[idx].correctIndex ? 1 : 0);
  }, 0);

  const main = document.querySelector("main");
  main.innerHTML = `
    <div class="finalScore">
      <h2>Quiz Finished!</h2>
      <p>Your final score is:</p>
      <h3>${score} / ${questions.length}</h3>
      <button id="restart-btn">Restart Quiz</button>
      <button id="back-to-quiz-btn" class="back-button" onClick="">Go Back to Previous Quiz</button>
  `;

  document.getElementById("restart-btn").addEventListener("click", restartQuiz);

  document
    .getElementById("back-to-quiz-btn")
    .addEventListener("click", function (ev) {
      ev.preventDefault();
      main.innerHTML = originalQuizHTML;
      currentQuestionIndex = lastQuestionIndex;
      displayQuestion(lastQuestionIndex); // Show the last question
      updateScoreboard(); // <-- Add this line to sync the score
      reattachEventListeners();
    });

  function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers = Array(questions.length).fill(null);
    location.reload(); // simple reset
  }
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

// -------------------- REATTACH EVENT LISTENERS --------------------
function reattachEventListeners() {
  const options = document.querySelectorAll(".input-radio");
  const labels = document.querySelectorAll(".radio-label");

  options.forEach((option, optionIdx) => {
    option.addEventListener("click", function () {
      userAnswers[currentQuestionIndex] = optionIdx;
      options.forEach((opt) => (opt.disabled = true));
      const currentQuestion = questions[currentQuestionIndex];
      const correctIdx = currentQuestion.correctIndex;
      labels.forEach((label, labelIdx) => {
        const input = document.getElementById(label.getAttribute("for"));
        label.classList.remove("correct-option", "wrong-option");
        if (labelIdx === correctIdx) {
          label.classList.add("correct-option");
          if (optionIdx === correctIdx) correct();
        } else if (input.checked) {
          label.classList.add("wrong-option");
          if (optionIdx !== correctIdx) wrong();
        }
      });
      updateScoreboard();
      if (userAnswers.every((ans) => ans !== null)) {
        showFinalScore();
      }
    });
  });
}
