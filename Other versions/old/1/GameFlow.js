var gameState = new GameState();
var myFont = "Arial"
var fillStyle = "#dd0095";

function doTurn() {
	if (playerdead) {
		endgame();
		return;
	}

	//reset canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	//text drawing
	setFont(40);
    ctx.fillText("Level: "+ gameState.level, 20, 20);
	ctx.fillText("Squares Gathered: "+score, 20, 40);
    ctx.fillText("Survive for: "+timeLeft, 20, 60);

	//grace text
	if (grace) {
	setFont(10);
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

		object.move();		
		if (RectCircleColliding(object.shape(), p.shape())) {
			playerdead = true;
			object.visible = true;
		}
		object.draw(ctx);		
	}
	
	//end of level
	if (timeLeft == 0 && !grace) {
			//Pause Music
			music.playPause();
			//tick up level
			gameState.levelup();
			//enter grace period			
			gracetimer = graceperiod;
			grace = true;
			//reset "game board"
			objects = [];
			pickup = null;
			timeLeft = gameState.levelduration;
	}
	
	//end of grace
	if (grace && gracetimer == 0) {
		grace = false;
		//start Music Again
		music.playMain();
		
		addStealthBall();
		addSeekerBall();
		addPickUp();
		for (i = 0; i < gameState.initialballs; i++) {
			addBall();
		}			
	}
	
	//grace countdown	
	else if (grace) {
		gracetimer = gracetimer - 1;
	} 
	
	//level countdown
	else if (count() && !(grace)) {
		for (i = 0; i < gameState.ballspertick; i++) {
			addBall();
		}
		timeLeft--;
	}
		
	requestAnimationFrame(doTurn);
}

function setFont(quotent) {
	ctx.font = (width/quotent)+"px " + myFont;
	ctx.fillStyle = fillStyle;
}


//checks if addBall-tick has come (and counts up)
function count() {
	countervalue++;
	if (countervalue > gameState.tickperball) {
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
	vx = random(gameState.minBallspeed, gameState.maxBallspeed);
	vy = random(gameState.minBallspeed, gameState.maxBallspeed);

	//set size
	radius = random(gameState.minballRadius,gameState.maxballRadius);

	//add to ball list
	let newObject = new object(startx, starty, vx, vy, radius);
	objects.push(newObject);
	return newObject;
}

function addBall() {	
	addObject(Ball);
}

function addStealthBall() {	
	addObject(StealthBall);
}

function addSeekerBall() {	
	let ball = addObject(SeekerBall);
	ball.target = p;
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
	music.playGameOver();
	setControlMode("menu");
	submitscore();
}

function submitscore() {
	let playername = null;
	if (autoSubmit) {
		playername = playerAutoName;
	} else {
		playername = getPlayerName();	
		if (playername == null) {
			DisplayAfterGameMessages("Game Over");
			return;
		}		
	}
	if (leaderboard == null) {
		initializeFirebase();
		leaderboard = new Leaderboard("https://leaderboard-bf98b.firebaseio.com");	
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	setFont(20);
	ctx.fillText("Submitting score", width/2, height/4);
	addandgo({"name": playername, "score": score, "level": gameState.level, "method": controlMethod}, function(){
		scorenotsubmitted = false;
		DisplayAfterGameMessages("Score Submitted");
	});	
}

function validateName(name) {
	
	if(!name || name.length > maxplayernamelength) {
		return "Requires a valid name.";
    } else if(!data.score || isNaN(data.score)) {
         return "Requires a valid score. score: " + data.score;
    }
	return true;
}

function getPlayerName() {
//	setWriteMode(); alternative method, not yet implemented
	let playername;
	do {
		playername = prompt("Player name (max " + maxplayernamelength +" characters)");
	if (playername == null) {
		return null;
	}
	} while ((playername.length <= 0) || (playername.length > maxplayernamelength))
	// Ask for playername until proper name is given, or cancel is chosen.		
	return playername;
}

function DisplayAfterGameMessages(message) {
	//reset canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	setFont(20);
	//text drawing
	let displayWidth = width/5;
	let displayHeight = height/5;
	let heightOffset = width/20;
	
    ctx.fillText(message, 						displayWidth, displayHeight);
    ctx.fillText("Press Space to play again", 	displayWidth, displayHeight+heightOffset);
    ctx.fillText("Press i for settings", 		displayWidth, displayHeight+heightOffset*2);
	ctx.fillText("Press h for Leaderboard", 	displayWidth, displayHeight+heightOffset*3);
}
