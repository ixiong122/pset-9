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

let win;
let turn = 1;

///////////////////// CACHED ELEMENT REFERENCES /////////////////////
window.onload = init;
document.getElementById("reset-button").onclick = init;
///////////////////// EVENT LISTENERS ///////////////////////////////


///////////////////// FUNCTIONS /////////////////////////////////////
function init() {
  let board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];
	turn = turn;
	win = null;

	render();
}
function render() {
	board.forEach(function (mark, index) {
		squares[index].textContent = mark;
	});

	message.textContent =
		win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;
}
// function selectColumn(col) {
//
//   if (player==1) {
//     grid[5][col]=1;
//     player=2;
//     document.getElementById("colorTurn").innerHTML="Red Turn";
//   } else {
//     grid[5][col]=2;
//     player=1;
//     document.getElementById("colorTurn").innerHTML="Yellow Turn";
//   }
//
//   refreshGrid();
// }
function takeTurn(e) {
	if (!win) {
		let index = squares.findIndex(function (square) {
			return square === e.target;
		});

		if (board[index] === 0) {
			board[index] = turn;
			turn = turn === 0 ? 1 : 0;
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

	return winner ? winner : board.includes(0) ? null : "T";
}
//determine score



// function refreshGrid() {
//   for (var row = 0; row < 6; row++) {
//     for (var col = 0; col < 7; col++) {
//       if (grid[row][col]==0) {
//                 document.getElementById("cell"+row+col).style.backgroundColor="#FFFFFF";
//       } else if (grid[row][col]==1) { //1 for yellow
//                 document.getElementById("cell"+row+col).style.backgroundColor="#FFFF00";
//       } else if (grid[row][col]==2) { //1 for yellow
//                 document.getElementById("cell"+row+col).style.backgroundColor="#FF0000";
//        }
//     }
//   }
// }
//
// function resetGrid() {
//
//
// }
