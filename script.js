const questions = [
  {
    question: "What does CSS stand for?",
    options: [
      "Creativityyyy Standard Starter",
      "Canvas Style Standard",
      "Caption Spill Sheet",
      "Cascading Style Sheets",
    ],
    correctIndex: 3,
  },
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
  // Add more questions here
];
document.addEventListener("DOMContentLoaded", function () {
  const options = document.querySelectorAll(".input-radio");
  const labels = document.querySelectorAll(".radio-label");

  questions.forEach((question, index) => {
    question.options.forEach((option, optionIndex) => {
      document.getElementById(`option${optionIndex + 1}`).textContent = option;
    });
  });

  options.forEach((option, optionIdx) => {
    option.addEventListener("click", function () {
      // Disable all radio buttons
      options.forEach((opt) => {
        opt.disabled = true;
      });
      // Enable the clicked radio button
      const currentQuestion = questions[0]; // Assuming only first question for now
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
