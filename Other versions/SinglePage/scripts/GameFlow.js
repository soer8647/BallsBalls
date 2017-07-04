define(["GameValueHandler","Music","Calculations",
"Paddle","Ball","SeekerBall","StealthBall","Pickup"
],function(GameValueHandler,music,Calculations,
Paddle,Ball,SeekerBall ,StealthBall ,Pickup
) {
var canvas;
var gameState = new GameValueHandler();
var myFont = "Arial"
var fillStyle = "#dd0095";
var ctx
var p;
var objects;
var endFunc;
var timeLeft = 30;
var countervalue = 0;
var gracetimer = 0;
var grace = false;

var commonValues;		

	function initiate(aCanvas,endFunction,ctrlHandler) {
		canvas = aCanvas;
		ctx = canvas.ctx;
		endFunc = endFunction;
		gameState.init(canvas.width, canvas.height);
		timeLeft = 30;
		countervalue = 0;
		gracetimer = 0;
		p = new Paddle(canvas.height/2, canvas.width/2, 
						gameState.playerLength,ctrlHandler, gameState.playerSpeed);
		
		commonValues = {
			width: canvas.width,
			height: canvas.height,
			stealthBallticks: gameState.stealthBallticks,
			p: p
		}

		objects = [];
		
		addPickUp();	
		music.playMain();
		doTurn();
	}

function doTurn() {
	if (gameState.playerdead) {
		endgame();
		return;
	}

	//reset canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	//text drawing
	setFont(40);
    ctx.fillText("Level: "+ gameState.level, 20, 20);
	ctx.fillText("Squares Gathered: "+gameState.score, 20, 40);
    ctx.fillText("Survive for: "+timeLeft, 20, 60);

	//grace text
	if (grace) {
	setFont(10);
    ctx.fillText("Level Complete", canvas.width/4, canvas.height/4);
	}
	
	//move player
	p.move();
	p.draw(ctx);
	
		// check if pickup has been picked up
	if (!grace) {
		pickup.draw(ctx);
		if (Calculations.RectRectColliding(p.shape(), pickup.shape())) {
			addPickUp();
			gameState.score++;
		}
	}
	
	//move balls
	for (var int = 0; int < objects.length; int++) {		
		var object = objects[int];

		object.move();		
		if (Calculations.RectCircleColliding(object.shape(), p.shape())) {
			gameState.playerdead = true;
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
			gracetimer = gameState.graceperiod;
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
	ctx.font = (canvas.width/quotent)+"px " + myFont;
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
	let startx;
	let starty;
	while (currentdist < gameState.minDist) {
		startx = Calculations.random(0, canvas.height);
		starty = Calculations.random(0, canvas.width);
		currentdist = Calculations.dist(startx, starty, p.x, p.y);
	}

	//set speed
	vx = Calculations.random(gameState.minBallspeed, gameState.maxBallspeed);
	vy = Calculations.random(gameState.minBallspeed, gameState.maxBallspeed);

	//set size
	radius = Calculations.random(gameState.minballRadius,gameState.maxballRadius);

	//add to ball list
	let newObject = new object(startx, starty, vx, vy, radius,commonValues);
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
	addObject(SeekerBall);
}

function addPickUp() {
	//set position
	let x;
	let y;
	var currentdist = 0;
	while (currentdist < gameState.minDist) {
		x = Calculations.random(gameState.pickupLength , canvas.height-gameState.pickupLength );
		y = Calculations.random(gameState.pickupLength , canvas.width-gameState.pickupLength );
		currentdist = Calculations.dist(x, y, p.x, p.y);
	}
	//add Pickup
	pickup = new Pickup(x,y,gameState.pickupLength );
}

//ending the game, when player dies
function endgame() {
	music.playGameOver();
	endFunc({score:gameState.score,level:gameState.level});
}


return {
	initiateGame: initiate
}

})