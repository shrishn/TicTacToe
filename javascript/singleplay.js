// Variables
const player_x = "X";
const aiplayer = "O";
let board_state = ["", "", "", "", "", "", "", "", ""];
const winstate = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const tile = document.getElementsByClassName("tile");
start();
//Functions

// main function
function start() {
  console.log("Gamestarted");
  board_state = ["", "", "", "", "", "", "", "", ""];
  for (let i = 0; i < tile.length; i++) {
    tile[i].innerHTML = "";
    tile[i].style.color = "black";
    tile[i].style.removeProperty("background-color");
    tile[i].setAttribute("id", i);
    tile[i].addEventListener("click", tileclick);
  }
}

// function to check winner
function checkwin(board_state) {
  for (let i = 0; i < winstate.length; i++) {
    const [a, b, c] = winstate[i];
    if (
      board_state[a] !== "" &&
      board_state[a] === board_state[b] &&
      board_state[c] === board_state[b]
    ) {
      tile[a].style.color = "#FCFFE7";
      tile[b].style.color = "#FCFFE7";
      tile[c].style.color = "#FCFFE7";
      if (board_state[a] === "O") {
        tile[a].style.backgroundColor = "#EB455F";
        tile[b].style.backgroundColor = "#EB455F";
        tile[c].style.backgroundColor = "#EB455F";
      } else {
        tile[a].style.backgroundColor = "#2B3467";
        tile[b].style.backgroundColor = "#2B3467";
        tile[c].style.backgroundColor = "#2B3467";
      }

      return board_state[a];
    }
  }
  return null;
}

// to check whether the board is in tie state
function checktie(board_state) {
  for (let i = 0; i < board_state.length; i++) {
    if (board_state[i] === "") {
      return false;
    }
  }
  return true;
}

function tileclick(event) {
  if (board_state[event.target.id] == "") {
    turn(Number(event.target.id), player_x);
    if (!checktie(board_state)) turn(optspot(), aiplayer);
  }
}
function turn(tileid, player) {
  if (board_state[tileid] !== "") {
    return;
  }
  board_state[tileid] = player;
  document.getElementById(tileid).innerHTML = player;
  let gamecheck = checkwin(board_state);
  if (gamecheck === "X" || gamecheck === "O") gameover(gamecheck);
}
function gameover(gamecheck) {
  console.log(gamecheck);

  for (let i = 0; i < tile.length; i++) {
    tile[i].removeEventListener("click", tileclick);
  }
}
function emptytiles() {
  let num = [];
  for (let i = 0; i < board_state.length; i++) {
    if (board_state[i] === "") num.push(i);
  }
  return num;
}
function optspot() {
  console.log("ai");
  return emptytiles()[0];
}
