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
const column1 [
 [0, 7, 14, 21, 28, 35];
]


///////////////////// APP STATE (VARIABLES) /////////////////////////

let board;
let turn = "red";
let win;


///////////////////// CACHED ELEMENT REFERENCES /////////////////////

const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");

///////////////////// EVENT LISTENERS ///////////////////////////////

window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;

///////////////////// FUNCTIONS /////////////////////////////////////
function init() {
	board = ["", "", "", "", "", "", "", "", "","", "", "", "", "", "", "", "", "","", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "","", "", "", "", "", "", "", ""];
	turn = turn;
	win = null;

	render();
}

// write a function that checks the indexes, make sure you group all of the columns together

function render() {
	board.forEach(function (mark, index) {
		if (squares[index].style.backgroundColor == "" && index >= 35) {
			squares[index].style.backgroundColor = mark;
	} else if (squares[index].style.backgroundColor != "" && index <= 35) {
			squares[index].style.backgroundColor = mark;
	}
	});
}

// 	message.textContent =
// 		win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;
// }

function takeTurn(e) {
	console.log(e.target);

	if (!win) {
		let index = squares.findIndex(function (square) {
			return square === e.target;
		});
		console.log(index);

		if (board[index] === "") {
			board[index] = turn;

			turn = turn === "red" ? "yellow" : "red";
			win = getWinner();

			render();
		}

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

		}
	});

	return winner ? winner : board.includes("") ? null : "T";
}
//determine score
