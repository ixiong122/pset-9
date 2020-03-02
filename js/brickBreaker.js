///////////////////// CONSTANTS /////////////////////////////////////
///////////////////// APP STATE (VARIABLES) /////////////////////////
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let movedX = 3;
let movedY = -3;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let brickRowNumber = 5;
let brickColumnNumber = 3;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let score = 0;
let lives = 3;
let bricks = [];

///////////////////// LOOPS /////////////////////
for (let c = 0; c < brickColumnNumber; c++) {
	bricks[c] = [];
	for (let r = 0; r < brickRowNumber; r++) {
		bricks[c][r] = {
			x: 0,
			y: 0,
			status: 1
		};
	}
}
///////////////////// EVENT LISTENERS ///////////////////////////////
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.getElementById("restart").onclick = restart;
///////////////////// FUNCTIONS /////////////////////////////////////
function restart() {
document.location.reload();
}
function keyDownHandler(e) {
	if (e.key == "right" || e.key == "ArrowRight") {
		rightPressed = true;
	} else if (e.key == "left" || e.key == "ArrowLeft") {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if (e.key == "right" || e.key == "ArrowRight") {
		rightPressed = false;
	} else if (e.key == "left" || e.key == "ArrowLeft") {
		leftPressed = false;
	}
}

function mouseMoveHandler(e) {
	let relativeX = e.clientX - canvas.offsetLeft;
	if (relativeX > 0 && relativeX < canvas.width) {
		paddleX = relativeX - paddleWidth / 2;
	}
}

function collision() {
	for (let c = 0; c < brickColumnNumber; c++) {
		for (let r = 0; r < brickRowNumber; r++) {
			let brick2 = bricks[c][r];
			if (brick2.status == 1) {
				if (x > brick2.x && x < brick2.x + brickWidth && y > brick2.y && y < brick2.y + brickHeight) {
					movedY = -movedY;
					brick2.status = 0;
					score++;
					if (score == brickRowNumber * brickColumnNumber) {
						

						alert("Congratulations! You won!");
						document.location.reload();
					}
				}
			}
		}
	}
}


function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = "#000000";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#000000";
	ctx.fill();
	ctx.closePath();
}

function drawBricks() {
	for (let c = 0; c < brickColumnNumber; c++) {
		for (let r = 0; r < brickRowNumber; r++) {
			if (bricks[c][r].status == 1) {
				let brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
				let brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#000000";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

function drawScore() {
	ctx.font = "16px Serif";
	ctx.fillStyle = "#000000";
	ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
	ctx.font = "16px Serif";
	ctx.fillStyle = "#000000";
	ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	collision();

	if (x + movedX > canvas.width - ballRadius || x + movedX < ballRadius) {
		movedX = -movedX;
	}
	if (y + movedY < ballRadius) {
		movedY = -movedY;
	} else if (y + movedY > canvas.height - ballRadius) {
		if (x > paddleX && x < paddleX + paddleWidth) {
			movedY = -movedY;
		} else {
			lives--;
			if (!lives) {
				alert("Game Over!");
				document.location.reload();
			} else {
				x = canvas.width / 2;
				y = canvas.height - 30;
				movedX = 3;
				movedY = -3;
				paddleX = (canvas.width - paddleWidth) / 2;
			}
		}
	}

	if (rightPressed && paddleX < canvas.width - paddleWidth) {
		paddleX += 7;
	} else if (leftPressed && paddleX > 0) {
		paddleX -= 7;
	}

	x += movedX;
	y += movedY;
	requestAnimationFrame(draw);
}
draw();
