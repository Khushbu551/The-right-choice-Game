document.addEventListener("DOMContentLoaded", () => {
  // Variables and Elements
  let timeLeft = 30,
    score = 100,
    attempts = 5,
    correctAnswer;
  const timerElement = document.getElementById("timer"),
    scoreEl = document.getElementById("score"),
    attemptsEl = document.getElementById("attempts"),
    startBtn = document.querySelector(".start-btn"),
    num1Btn = document.getElementById("num1"),
    num2Btn = document.getElementById("num2"),
    feedback = document.querySelector(".feedback"),
    numberOptions = document.querySelector(".number-options");

  // Functions

  // Make Game Elements Visible
  function showGameElements() {
    numberOptions.classList.remove("hidden");
    feedback.classList.remove("hidden");
  }

  //Start Timer
  let timerInterval;

  function startTimer() {
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--; //Decrease time by 1
        timerElement.textContent = `${timeLeft}s`; //  Update the timer display

        //Add blinking effect for the last 10 second
        if (timeLeft === 10) {
          timerElement.style.color = "red"; // change color to red
          timerElement.style.animation = "blink 0.5 infinite";
        }
      } else {
        //Stop the timer and alert the user when time is up
        clearInterval(timerInterval); //Stop the timer
        alert(`Time is up!`); //Show game-over message
        resetGame();
      }
    }, 1000); // Run the code every 1 second
  }

  //Add the blinking animation using Css
  const style = document.createElement(`style`);
  style.innerHTML = `   
@Keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}
    `;
  document.head.appendChild(style);

  //Generate New Question
  function generateQuestion() {
    correctAnswer = Math.random() > 0.5 ? "num1" : "num2";
    num1Btn.textContent = Math.floor(Math.random() * 50) + 1;
    num2Btn.textContent = Math.floor(Math.random() * 50) + 1;
  }

  //Check Answer
  function checkAnswer(selected) {
    const isCorrect = selected === correctAnswer;
    updateScore(isCorrect ? 10 : -5);
    feedback.textContent = isCorrect
      ? "Correct! \u{1F389}"
      : "Wrong! \u{1F611}";
    generateQuestion();
  }

  // Update Score and Attempts
  function updateScore(points) {
    score += points;
    scoreEl.textContent = score;
    if (points < 0) {
      attempts--;
      attemptsEl.textContent = attempts;

      if (attempts === 0) {
        setTimeout(() => {
          alert(`Game Over! Final Score: ${score}`);
          resetGame();
        }, 100);
        return;
      }
    }
  }

  //Reset Game
  function resetGame() {
    timeLeft = 30;
    score = 100;
    attempts = 5;

    //Reset UI Elements
    timerElement.textContent = `${timeLeft}s`;
    scoreEl.textContent = score;
    attemptsEl.textContent = attempts;

    timerElement.style.color = "White";
    attemptsEl.style.animation = "none";

    //Hide Game Elements
    document.querySelector(".number-options").classList.add("hidden");
    document.querySelector(".feedback").classList.add("hidden");
  }

  //Event Listeners
  startBtn.addEventListener("click", () => {
    console.log("Start Button Clicked!");
    showGameElements();
    startTimer();
    generateQuestion();
  });

  num1Btn.addEventListener("click", () => checkAnswer("num1"));
  num2Btn.addEventListener("click", () => checkAnswer("num2"));
});
