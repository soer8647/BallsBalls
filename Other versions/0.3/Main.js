var game = true;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;


var playerlength = 40;
var height = canvas.width;
var width = canvas.height;
var maxBallspeed = 10;
var ballRadius = 40;
var tick = 40;
var newballtick = 20;
var score = 0;
var mindist = 200;

var p = new Paddle(height/2, width/2, playerlength, playerlength);

var mousecontrol = confirm("Use Mouse for Control? \n (Arrow Keys are the alternative) ");
if (mousecontrol) {
	playercontrol = mouseControl;
	mouseX = p.x;
	mouseY = p.y;
} else {
	playercontrol = keyboardControl;
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var countervalue = 0;
function count() {
	countervalue++;
	if (countervalue > newballtick) {
		countervalue = 0;
		score++;
		return true;
	}
	return false;
}

function turn() {
	if (game) {
	if (count()) {
		addBall();
	}
	draw();
	requestAnimationFrame(turn);
	}
}

function randomsign() {
	var i = random(0, 1);
	if (i == 0) {
		return -1;
	} else {
		return 1;
	}

}

function addBall() {
	var currentdist = 0;
	while (currentdist < mindist) {
		startx = random(0, height);
		starty = random(0, width);
		currentdist = dist(startx, starty, p.x, p.y);
	}

	vx = random(maxBallspeed / 4, maxBallspeed);
	vy = random(maxBallspeed / 4, maxBallspeed);
	radius = random(ballRadius / 4, ballRadius);
	objects.push(new Ball(startx, starty, vx, vy, radius));
}

var objects = [ p ];

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (var int = 0; int < objects.length; int++) {
		var object = objects[int];
		object.move();
		object.draw(ctx);

		if (object != p) {
			if (RectCircleColliding(object.shape(), p.shape())) {
				endgame();
			}

		}

	}
}

function endgame() {
	game = false;
	var highscore = document.cookie.replace(
			/(?:(?:^|.*;\s*)ballsballsHighScore\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	var again;
	if (score > highscore) {
		document.cookie = "ballsballsHighScore=" + score;
		again = confirm("game over! \n New HighScore: " + score
				+ " ( Previous HighScore: " + highscore + " ) \n Wanna Play Again?");
	} else {
		again = confirm("game over! \n Score: " + score + " ( HighScore: "
				+ highscore + " ) \n Wanna Play Again?");
	}
	if (again) {
		document.location.reload();
	} else {
		document.location.href = "credits";
	}
	
	
}

turn();