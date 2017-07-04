var canvas;
var ctx;
var p;
var objects;
var difficulty;
var height;
var width;

window.onload = function () {
console.log("init");

canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

height = canvas.width;
width = canvas.height;

p = new Paddle(height/2, width/2, playerlength, playerlength);

objects = [];

difficulty = 1;

if (getCookie("settings")) {
	console.log(getCookie("input"));
	setKeyBoardControl(getCookie("input"));

	difficulty = getCookie("difficulty");

	if (difficulty > 0) {
		maxBallspeed = maxBallspeed * (difficulty);
		if (difficulty == 4) {
			Ballmin = Ballmin *  2;
		}
		
	}

	var maxX = getCookie("maxX");

	if (maxX < height && maxX != 0) {
		ctx.canvas.height = maxX;
		width = maxX;
	}

	var maxY = getCookie("maxY");

	if (maxY < width && maxY != 0) {
		ctx.canvas.width = maxY;
		height = maxY;
	}

} else {
	var setSettings = confirm("Settings not found, want to set them?");
	if (setSettings) {
		window.location.href = "settings";
	} else {
	}
}

    mindist = dist(0,0,width,height) / mindist;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

draw();

}
