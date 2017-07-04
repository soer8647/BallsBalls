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

startMainMenu();
}