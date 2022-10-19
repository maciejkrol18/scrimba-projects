function getRandomNumber(min, max) {
    min = Math.floor(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

// Game state
let player1Score = 0;
let player2Score = 0;
let player1Turn = true;

// DOM nodes
const player1Dice = document.querySelector("#player1Dice");
const player2Dice = document.querySelector("#player2Dice");
const player1Scoreboard = document.querySelector("#player1Scoreboard");
const player2Scoreboard = document.querySelector("#player2Scoreboard");
const message = document.querySelector("#message");
const rollBtn = document.querySelector("#rollBtn");
const resetBtn = document.querySelector("#resetBtn");
const doubleOrNothingBtn = document.querySelector("#doubleOrNothingBtn");

function showDisplayButton() {
    rollBtn.style.display = "none";
    doubleOrNothingBtn.style.display = "none";
    resetBtn.style.display = "block";
}

// Normal roll
 rollBtn.addEventListener("click", function() {

    const randomNumber = getRandomNumber(1, 6);

    if (player1Turn) {
        player1Score += randomNumber;
        player1Scoreboard.textContent = player1Score;
        player1Dice.textContent = randomNumber;
        player1Dice.classList.remove("active");
        player2Dice.classList.add("active");
        message.textContent = "Player 2 Turn";
    } else {
        player2Score += randomNumber;
        player2Scoreboard.textContent = player2Score;
        player2Dice.textContent = randomNumber;
        player2Dice.classList.remove("active");
        player1Dice.classList.add("active");
        message.textContent = "Player 1 Turn";
    }
    
    checkIfWon();
    
    player1Turn = !player1Turn;
})

// Double or nothing roll
doubleOrNothingBtn.addEventListener("click", () => {
    let randomNumber = getRandomNumber(1, 6);

    if (randomNumber <= 3) {
        randomNumber += randomNumber*2
    } else {
        randomNumber = 0;
    }

    if (player1Turn) {
        player1Score += randomNumber;
        player1Scoreboard.textContent = player1Score;
        player1Dice.textContent = randomNumber;
        player1Dice.classList.remove("active");
        player2Dice.classList.add("active");
        message.textContent = "Player 2 Turn";
    } else {
        player2Score += randomNumber;
        player2Scoreboard.textContent = player2Score;
        player2Dice.textContent = randomNumber;
        player2Dice.classList.remove("active");
        player1Dice.classList.add("active");
        message.textContent = "Player 1 Turn";
    }
    
    checkIfWon();
    
    player1Turn = !player1Turn;
});
 
// 1. Hook a click event listener up with the Reset Button
// 2. Create a reset() function that resets the game
// 3. Invoke the reset() function when the Reset Button is clicked

function checkIfWon() {
    if (player1Score >= 20) {
        message.textContent = "Player 1 has won! 🥳";
        showDisplayButton();
    } else if (player2Score >= 20) {
        message.textContent = "Player 2 has won! 🎉";
        showDisplayButton();
    }
}

resetBtn.addEventListener("click", () => {
    reset();
})

function reset() {
    message.textContent = "Player 1 Turn";

    player1Score = 0;
    player1Scoreboard.textContent = 0;
    player1Turn = true;
    player1Dice.textContent = "";
    
    player2Score = 0;
    player2Scoreboard.textContent = 0;
    player2Dice.textContent = "";
    
    rollBtn.style.display = "block";
    doubleOrNothingBtn.style.display = "block";
    resetBtn.style.display = "none";

    player2Dice.classList.remove("active");
    player1Dice.classList.add("active");
}
 