var countervalue = 0;
var score = 0;
var game = true;
var level = 1;
var timeLeft = 30;
gracetimer = 0;
grace = false;

function doTurn() {
	if (game) {
	//reset canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	//move player
	p.move();
	p.draw(ctx);
	
	//move balls
	for (var int = 0; int < objects.length; int++) {		
		var object = objects[int];

		object.draw(ctx);
		
		if (RectCircleColliding(object.shape(), p.shape())) {
			endgame();
		}
		
		object.move();
	}
	
	//end of level
	if (timeLeft == 0 && !grace) {
			//tick up level
			level = level + 1;
			levelup(level);
			//enter grace period			
			gracetimer = graceperiod;
			grace = true;
			//reset "game board"
			objects = [];
			timeLeft = levelduration;
	}
	
	//end of grace
	if (grace && gracetimer == 0) {
		grace = false;	
		for (i = 0; i < initialballs; i++) {
			addBall();
		}			
	}
	//grace countdown	
	else if (grace) {
		console.log("" + gracetimer);
		gracetimer = gracetimer - 1;
	} 
	//level countdown
	else if (count() && !(grace)) {
		for (i = 0; i < ballspertick; i++) {
			addBall();
		}
		timeLeft--;
	}
	
	//text drawing
    ctx.font = "16px Arial";
    ctx.fillStyle = "#dd0095";
    ctx.fillText("Level: "+ level, 20, 20);
    ctx.fillText("Survive for: "+timeLeft, 20, 40);
	//grace text
	if (grace) {
	ctx.font = "64px Arial";
    ctx.fillText("Level Complete", height/2, width/2);
	}

	
	requestAnimationFrame(doTurn);
	}
}

//Changes when leveling up.
function levelup(newlevel){
	initialballs++;
	if (newlevel % 3 == 0) {
		levelduration = levelduration + 5;
	}
	if ((newlevel % 4) + 2 == 0) {
		maxBallspeed++;
		minBallspeed++;
	}
	if (newlevel % 5 == 0) {
		ballspertick++;
	} else if ((newlevel % 5) + 3 == 0) {
		ticksperball--;
	}
}

//checks if addBall-tick has come (and counts up)
function count() {
	countervalue++;
	if (countervalue > tickperball) {
		countervalue = 0;
		score++;
		return true;
	}
	return false;
}

function addBall() {	
	//set starting position
	var currentdist = 0;
	while (currentdist < mindist) {
		startx = random(0, height);
		starty = random(0, width);
		currentdist = dist(startx, starty, p.x, p.y);
	}

	//set speed
	vx = random(minBallspeed, maxBallspeed);
	vy = random(minBallspeed, maxBallspeed);

	//set size
	radius = random(minballRadius,maxballRadius);

	//add to ball list
	objects.push(new Ball(startx, starty, vx, vy, radius));
}

//ending the game, when player dies
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