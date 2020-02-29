///////////////////// CONSTANTS /////////////////////////////////////
///////////////////// APP STATE (VARIABLES) /////////////////////////

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let ballRadius = 10;
let x = canvas.width/2;
let y = canvas.height-30;
let movedX = 2;
let movedY = -2;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth)/2;
let rightPressed = false;
let leftPressed = false;
let interval = setInterval(draw, 10);
let brickRowNumber = 3;
let brickColumnNumber = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

///////////////////// CACHED ELEMENT REFERENCES /////////////////////
///////////////////// EVENT LISTENERS ///////////////////////////////
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

///////////////////// FUNCTIONS /////////////////////////////////////


function keyDownHandler(e) {
    if(e.key == "right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if(e.key == "left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if(e.key == "left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if(x + movedX > canvas.width-ballRadius || x + movedX < ballRadius) {
        movedX = -movedX;
    }
    if(y + movedY < ballRadius) {
        movedY = -movedY;
    } else if(y + movedY > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            movedY = -movedY;
        } else {
            alert("Game over!");
            document.location.reload();
            clearInterval(interval);
        }
    }

    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += movedX;
    y += movedY;
}
