///////////////////// CONSTANTS /////////////////////////////////////

///////////////////// APP STATE (VARIABLES) /////////////////////////
let turn = "red";
let win;

///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const square = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");

///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
document.getElementById("reset-button").onclick = init;
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
