var countervalue = 0;
var score = 0;
function count() {
	countervalue++;
	if (countervalue > newballtick) {
		countervalue = 0;
		score++;
		return true;
	}
	return false;
}


var game = true;

function addBall() {
	var currentdist = 0;
	while (currentdist < mindist) {
		startx = random(0, height);
		starty = random(0, width);
		currentdist = dist(startx, starty, p.x, p.y);
	}

	vx = random(maxBallspeed / Ballmin, maxBallspeed);
	vy = random(maxBallspeed / Ballmin, maxBallspeed);
	radius = random(ballRadius / Ballmin, ballRadius);
	objects.push(new Ball(startx, starty, vx, vy, radius));
}

function draw() {
	if (game) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	p.move();
	p.draw(ctx);

	for (var int = 0; int < objects.length; int++) {		
		var object = objects[int];

		object.draw(ctx);

		object.move();
		
		if (RectCircleColliding(object.shape(), p.shape())) {
			endgame();
		}

	}
	
	if (count()) {
		addBall();
	}
	requestAnimationFrame(draw);
	}
}

function endgame() {
	game = false;
	var highscore = getCookie("ballsballsHighScore");
	var again;
	if (score > highscore) {
		setCookie("ballsballsHighScore",score,100);
		again = confirm("game over! \n New HighScore: " + score
				+ " ( Previous HighScore: " + highscore
				+ " ) \n Wanna Play Again?");
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