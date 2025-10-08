let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#Reset");
let newGameButton = document.querySelector("#new-button");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let timerDisplay = document.querySelector("#timer");

let turnO = true;
let moveCount = 0;
let isWinner = false;
let seconds = 0;
let timerInterval;

const winPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7],
    [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    moveCount = 0;
    isWinner = false;
    msgContainer.classList.add("hide");
    stopTimer();
    seconds = 0;
    timerDisplay.innerText = "Time: 0s";
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "#ecf0f1";
    }
};

const startTimer = () => {
    clearInterval(timerInterval); 
    timerInterval = setInterval(() => {
        seconds++;
        timerDisplay.innerText = `Time: ${seconds}s`;
    }, 1000);
};

const stopTimer = () => {
    clearInterval(timerInterval);
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
            box.style.color = "#3498db"; 
        } else {
            box.innerText = "X";
            turnO = true;
            box.style.color = "#1abc9c";
        }
        box.disabled = true;
        moveCount++;

        if (moveCount === 1) {
            startTimer();
        }

        checkWinner();
    });
});

const disableAllBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const showDraw = () => {
    msg.innerText = `It's a Draw!`;
    msgContainer.classList.remove("hide");
    disableAllBoxes();
    stopTimer();
}

const showWinner = (winner) => {
    isWinner = true;
    msg.innerText = `Congratulations, the Winner is: ${winner}`;
    msgContainer.classList.remove("hide");
    disableAllBoxes();
    stopTimer();
    confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 }
    });
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return;
            }
        }
    }

    if (moveCount === 9 && !isWinner) {
        showDraw();
    }
};

newGameButton.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);