

var canvas;
var ctx;
var p;
var pickup;
var objects;
var height;
var width;
var mindist = 4;
var leaderboard;
var squared = true;
var autoSubmit = false;
var playerAutoName = null;
window.onload = function () {

// Initialize canvas
canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");


if (squared) {
	let size = Math.min(window.innerWidth,window.innerHeight);

	ctx.canvas.width = size;
	ctx.canvas.height = size;

	height = size;
	width  = size;
} else {
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;

	height = canvas.width;
	width = canvas.height;
}


if (getCookie("settings")) {
	setControl(getCookie("input"));
	autoSubmit = getCookie("autoSubmit");
	if (autoSubmit) {
		playerAutoName = getCookie("playerName");
	}
} else {
	var setSettings = confirm("Settings not found, want to set them? /n \n (default control is arrow keys)");
	if (setSettings) {
		window.location.href = "settings";
	} else {
		setControl("");
	}
}

mindist = dist(0,0,width,height) / mindist;

restartgame();

}

function restartgame() {
	setControlMode("game");
	setVariables();
	gameState.init();
	p = new Paddle(height/2, width/2, playerlength);
	objects = [];
	addPickUp();	
	music.playMain();
	doTurn();
}
