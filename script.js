document.addEventListener("DOMContentLoaded", function () {
  const options = document.querySelectorAll(".input-radio");
  const labels = document.querySelectorAll(".radio-label");

  options.forEach((option) => {
    option.addEventListener("change", function () {
      options.forEach((opt) => (opt.disabled = true));

      const selectedId = this.id;

      labels.forEach((label) => {
        const input = document.getElementById(label.getAttribute("for"));
        if (label.getAttribute("for") === "one-d") {
          label.style.backgroundColor = "green";
          label.style.color = "white";
          label.style.border = "2px solid white";
        } else if (input.checked) {
          label.style.backgroundColor = "red";
          label.style.color = "white";
          label.style.border = "2px solid white";
        } else {
          label.style.backgroundColor = "#4a4a6a";
          label.style.color = "white";
          label.style.border = "2px solid white";
        }
      });
    });
  });
});
