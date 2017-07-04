var canvas;
var ctx;
var p;
var pickup;
var objects;
var height;
var width;
var mindist = 4;
var leaderboard;

window.onload = function () {
  
// Initialize canvas
canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

height = canvas.width;
width = canvas.height;

if (getCookie("settings")) {
	setControl(getCookie("input"));
} else {
	var setSettings = confirm("Settings not found, want to set them?");
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
	setVariables();
	p = new Paddle(height/2, width/2, playerlength);
	objects = [];
	addPickUp();	
	doTurn();
}
