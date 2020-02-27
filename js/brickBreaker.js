// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();
//
// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();
//
// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
// ctx.stroke();
// ctx.closePath();
///////////////////// CONSTANTS /////////////////////////////////////


///////////////////// APP STATE (VARIABLES) /////////////////////////
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let x = canvas.width / 2;
let y = canvas.height - 30;
let movedX = 2;
let movedY = -2;
let ballRadius = 10;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
///////////////////// CACHED ELEMENT REFERENCES /////////////////////

///////////////////// EVENT LISTENERS ///////////////////////////////
document.addEventListener("keydown",keyDown, false);
document.addEventListener("keyup",keyUp, false);
///////////////////// FUNCTIONS /////////////////////////////////////
function keyDown(e) {
  if (e.key == "right" || e.key == "arrowRight") {
    rightPressed = true;
  } else if (e.key == "left" || e.key == "arrowLeft") {
    leftPressed = true;
  }
}
function keyUp(e) {
  if (e.key == "right" || e.key == "arrowRight") {
    rightPressed = false;
  } else if (e.key == "left" || e.key == "arrowLeft") {
    leftPressed = false;
  }
}
function drawBall() {
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD"
  ctx.fill();
  ctx.closePath();
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  if(x + movedX > canvas.width - ballRadius || x + movedX < ballRadius) {
       movedX = -movedX;
   }
   if(y + movedY > canvas.height - ballRadius || y + movedY < ballRadius) {
       movedY = -movedY;
   }
   if (rightPressed) {
     paddleX += 7;
     if (paddleX + paddleWidth > canvas.width) {
       paddleX = canvas.width - paddleWidth;
     }
   } else if (leftPressed) {
     paddleX -= 7;
     if (paddleX < 0) {
       paddleX = 0;
     }
   }
  x += movedX;
  y += movedY;
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.width - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

setInterval(draw, 10);
