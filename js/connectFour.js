///////////////////// CONSTANTS /////////////////////////////////////
const winningConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];
///////////////////// APP STATE (VARIABLES) /////////////////////////
let turn = "red";
let win;
// let mark;
let mark = turn.style.color;
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
// const square = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");
var playerTurn = document.querySelector('.player-turn');

const square = document.querySelectorAll('.square');

///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
document.getElementById("reset-button").onclick = init;
document.getElementById("board").onclick = takeTurn;
///////////////////// FUNCTIONS /////////////////////////////////////
function init() {
	board = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
	turn = turn;
	win = null;

	render();
}
function render() {
	board.forEach(function (mark, index) {
		square[index].textContent = mark;

	});

	message.textContent =
		win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;
}
function takeTurn(e) {
	if (!win) {
		let index = square.findIndex(function (square) {
			return square === e.target;
		});

		if (board[index] === "") {
			board[index] = turn;
			turn = turn === "red" ? "yellow" : "red";
			win = getWinner();

			render();
		}
		// if (win === "T") {
		// 	tieScore++;
		// 	document.getElementById("thirdList").innerHTML = tieScore;
		// }
	}
}

function getWinner() {
	let winner = null;

	winningConditions.forEach(function (condition, index) {
		if (
			board[condition[0]] &&
			board[condition[0]] === board[condition[1]] &&
			board[condition[1]] === board[condition[2]]
		) {
			winner = board[condition[0]];

			// if (winner === "X") {
			// 	xScore++;
			// 	document.getElementById("firstList").innerHTML = xScore;
			// }
			// if (winner === "O") {
			// 	oScore++;
			// 	document.getElementById("secondList").innerHTML = oScore;
			// }
		}
	});

	return winner ? winner : board.includes("") ? null : "T";
}
