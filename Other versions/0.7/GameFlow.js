function doTurn() {
	//reset canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	//text drawing
    ctx.font = "16px Arial";
    ctx.fillStyle = "#dd0095";
    ctx.fillText("Level: "+ level, 20, 20);
	ctx.fillText("Squares Gathered: "+score, 20, 40);
    ctx.fillText("Survive for: "+timeLeft, 20, 60);

	//grace text
	if (grace) {
	ctx.font = "64px Arial";
    ctx.fillText("Level Complete", width/4, height/4);
	}

	
	//move player
	p.move();
	p.draw(ctx);
	
		// check if pickup has been picked up
	if (!grace) {
		pickup.draw(ctx);
		if (RectRectColliding(p.shape(), pickup.shape())) {
			addPickUp();
			score++;
		}
	}
	
	//move balls
	for (var int = 0; int < objects.length; int++) {		
		var object = objects[int];

		object.draw(ctx);
		
		if (RectCircleColliding(object.shape(), p.shape())) {
			playerdead = true;
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
			pickup = null;
			timeLeft = levelduration;
	}
	
	//end of grace
	if (grace && gracetimer == 0) {
		grace = false;
		addStealthBall();
		addPickUp();
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
		
	if (playerdead) {
		endgame();
	} else {
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
		return true;
	}
	return false;
}
function addObject(object) {
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
	objects.push(new object(startx, starty, vx, vy, radius));
}


function addBall() {	
	addObject(Ball);
}

function addStealthBall() {	
	addObject(StealthBall);
}

function addPickUp() {
	//set position
	var currentdist = 0;
	while (currentdist < mindist) {
		x = random(pickuplength, height-pickuplength);
		y = random(pickuplength, width-pickuplength);
		currentdist = dist(x, y, p.x, p.y);
	}
	//add Pickup
	pickup = new Pickup(x,y,pickuplength);
}

//ending the game, when player dies
function endgame() {
	submitscore();
}

function submitscore() {
	do {
	var playername = prompt("Player name (max " + maxplayernamelength +" characters)");	
	} while (!(playername == null) && (playername.length > maxplayernamelength))
	if (!(playername==null)) {
		if (leaderboard == null) {
			initializeFirebase();
			leaderboard = new Leaderboard("https://leaderboard-bf98b.firebaseio.com");	
		}
		//reset canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		//text drawing
		ctx.font = "64px Arial";
		ctx.fillStyle = "#dd0095";
		ctx.fillText("Submitting score", width/2, height/4);
		console.log(controlMethod);
		console.log(" dd " + controlMethod);
		console.log("ss");
		addandgo({name: playername, score: score, level: level, method: controlMethod}, function(){
			scorenotsubmitted = false;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillText("Score Submitted", width/2, height/4);
			ctx.fillText("Press Space to play again", width/2, height/4+75);
			ctx.fillText("Press i for settings", width/2, height/4+150);
			ctx.fillText("Press h for Leaderboard", width/2, height/4+225);
		});
	} else {
			
    ctx.fillStyle = "#dd0095";	
	ctx.font = "64px Arial";
    ctx.fillText("Game Over", width/2, height/4);
    ctx.fillText("Press Space to play again", width/2, height/4+75);
    ctx.fillText("Press i for settings", width/2, height/4+150);
	ctx.fillText("Press h for Leaderboard", width/2, height/4+225);
	ctx.fillText("Press Enter to submit Score", width/2, height/4+300);	
	}
}