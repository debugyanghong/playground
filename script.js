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
}

document.addEventListener("DOMContentLoaded", function () {
  displayQuestion(currentQuestionIndex);

  const options = document.querySelectorAll(".input-radio");
  const labels = document.querySelectorAll(".radio-label");

  options.forEach((option, optionIdx) => {
    option.addEventListener("click", function () {
      options.forEach((opt) => {
        opt.disabled = true;
      });
      const currentQuestion = questions[currentQuestionIndex];
      const correctIdx = currentQuestion.correctIndex;
      labels.forEach((label, labelIdx) => {
        const input = document.getElementById(label.getAttribute("for"));
        if (labelIdx === correctIdx) {
          label.classList.add("correct-option");
        } else if (input.checked) {
          label.classList.add("wrong-option");
        }
      });
    });
  });
});

function correct() {
  const soundEffect = new Audio("/trumpet.mp3");
  if (soundEffect) {
    soundEffect.play().catch((error) => {
      console.error("Error playing sound effect:", error);
    });
  } else {
    console.error("Sound effect element not found.");
  }
}

function wrong() {
  const soundEffect = new Audio("/failer.mp3");
  if (soundEffect) {
    soundEffect.play().catch((error) => {
      console.error("Error playing sound effect:", error);
    });
  } else {
    console.error("Sound effect element not found.");
  }
}

document.getElementById("next-btn").addEventListener("click", function (e) {
  e.preventDefault();
  nextQuestion();
});

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);

    // reset options
    const options = document.querySelectorAll(".input-radio");
    const labels = document.querySelectorAll(".radio-label");

    options.forEach((opt) => {
      opt.checked = false;
      opt.disabled = false;
    });

    labels.forEach((label) => {
      label.classList.remove("correct-option", "wrong-option");
    });
  } else {
    alert("Quiz finished!");
  }
}
