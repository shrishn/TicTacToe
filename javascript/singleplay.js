// constants for player symbols
const PLAYER_X = "X";
const PLAYER_O = "O";

// initialize game state
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = PLAYER_X;
let gameOver = false;

// DOM elements
const tiles = document.querySelectorAll(".tile");
const statusText = document.querySelector(".status div");
const undoButton = document.querySelector("#undo");
const resetButton = document.querySelector("#reset");

// helper function to update status text
function setStatusText(text) {
  statusText.innerText = text;
}

// helper function to update board state
function updateBoard(index) {
  gameBoard[index] = currentPlayer;
  tiles[index].innerText = currentPlayer;
}

// helper function to check for win or draw
function checkWin() {
  // check rows
  for (let i = 0; i < 9; i += 3) {
    if (
      gameBoard[i] !== "" &&
      gameBoard[i] === gameBoard[i + 1] &&
      gameBoard[i] === gameBoard[i + 2]
    ) {
      return true;
    }
  }
  // check columns
  for (let i = 0; i < 3; i++) {
    if (
      gameBoard[i] !== "" &&
      gameBoard[i] === gameBoard[i + 3] &&
      gameBoard[i] === gameBoard[i + 6]
    ) {
      return true;
    }
  }
  // check diagonals
  if (
    gameBoard[0] !== "" &&
    gameBoard[0] === gameBoard[4] &&
    gameBoard[0] === gameBoard[8]
  ) {
    return true;
  }
  if (
    gameBoard[2] !== "" &&
    gameBoard[2] === gameBoard[4] &&
    gameBoard[2] === gameBoard[6]
  ) {
    return true;
  }
  // check for draw
  if (!gameBoard.includes("")) {
    setStatusText("Draw!");
    gameOver = true;
  }
  return false;
}

// handle tile click event
function handleTileClick(index) {
  if (gameBoard[index] !== "" || gameOver) {
    return;
  }
  updateBoard(index);
  if (checkWin()) {
    setStatusText(`${currentPlayer} wins!`);
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
    setStatusText(`Player ${currentPlayer}`);
  }
}

// handle undo button click event
function handleUndoClick() {
  if (gameOver) {
    return;
  }
  let lastMove = gameBoard.lastIndexOf(currentPlayer);
  if (lastMove !== -1) {
    gameBoard[lastMove] = "";
    tiles[lastMove].innerText = "";
    currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
    setStatusText(`Player ${currentPlayer}`);
  }
}

// handle reset button click event
function handleResetClick() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  tiles.forEach((tile) => (tile.innerText = ""));
  currentPlayer = PLAYER_X;
  gameOver = false;
  setStatusText(`Player ${currentPlayer}`);
}

// add event listeners
tiles.forEach((tile, index) =>
  tile.addEventListener("click", () => handleTileClick(index))
);
undoButton.addEventListener("click", handleUndoClick);
resetButton.addEventListener("click", handleResetClick);

// initialize status text
setStatusText(`Player ${currentPlayer}`);
