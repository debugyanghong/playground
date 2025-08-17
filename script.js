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
  // Add more questions here
];
let currentQuestionIndex = 0; // Start with the first question

function displayQuestion(index) {
  const question = questions[index];
  document.querySelector(".text-container p:last-child").textContent =
    question.question;
  question.options.forEach((option, optionIndex) => {
    document.getElementById(`option${optionIndex + 1}`).textContent = option;
  });
  // Reset radio buttons and labels here if needed
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
