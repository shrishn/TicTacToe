var stats = document.getElementsByClassName("status")[1];

// Initialize board state as an array of empty strings
let boardState = ["", "", "", "", "", "", "", "", ""];
var player;
stats.innerHTML = stats.innerHTML + " X's turn";
// Function to update the board state and display the current player's mark
function playOnClick(event) {
  const tileIndex = parseInt(event.target.getAttribute("data-index"));

  // If the selected tile is already occupied, do nothing
  if (boardState[tileIndex] !== "") {
    return;
  }

  // Update board state with current player's mark
  const currentPlayer =
    boardState.filter((s) => s !== "").length % 2 === 0 ? "X" : "O";
  boardState[tileIndex] = currentPlayer;

  // Update display of board
  event.target.innerHTML = currentPlayer;
  console.log(currentPlayer);

  if (currentPlayer == "X") {
    player = "O";
  } else {
    player = "X";
  }
  stats.innerHTML = "";
  stats.innerHTML = player + "'s turn";

  // Check for win or tie
  // ...
  const winner = checkWin(boardState);
  if (winner !== null) {
    console.log(winner);
    stats.innerHTML = "";
    stats.innerHTML = winner + " WON!!!!";
    document.body.style.backgroundImage = "url('images/fireworks.gif')";
    document.body.style.backgroundSize = "cover";
    document.body.style.filter = "invert(100%)";
    for (let tile of tiles) {
      tile.removeEventListener("click", playOnClick);
    }
    return;
  }
}

// Attach click event listeners to all tiles
const tiles = document.getElementsByClassName("tile");
for (let i = 0; i < tiles.length; i++) {
  tiles[i].setAttribute("data-index", i);
  tiles[i].addEventListener("click", playOnClick);
}

function checkWin(board) {
  const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // horizontal
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // vertical
    [0, 4, 8],
    [2, 4, 6], // diagonal
  ];

  for (let i = 0; i < winningPositions.length; i++) {
    const [a, b, c] = winningPositions[i];
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      tiles[a].style.backgroundColor = "#30cf7f";
      tiles[b].style.backgroundColor = "#30cf7f";
      tiles[c].style.backgroundColor = "#30cf7f";
      return board[a];
    }
  }

  return null;
}

// should output null, since no player has won yet
