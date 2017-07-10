define(["GameValueHandler","Music","Calculations",
"Paddle","Ball","Pickup", "./settings"
],function(GameValueHandler, music, Calculations,
           Paddle, Ball, Pickup, settings) {
var canvas;
var gameState = new GameValueHandler();
var myFont = "Arial";
var fillStyle = settings.gameTextColor;
var ctx;
var p;
var objects;
var endFunc;
var gracetimer = 0;
var grace = false;
var paused = false;
var commonValues;		

	function initiate(aCanvas,endFunction,ctrlHandler) {
		canvas = aCanvas;
		ctx = canvas.ctx;
		endFunc = endFunction;
		gameState.init(canvas.width, canvas.height);	
		gracetimer = 0;
		p = new Paddle(canvas.height/2, canvas.width/2, 
						gameState.playerLength,ctrlHandler, gameState.playerSpeed);
		
		commonValues = {
			width: canvas.width,
			height: canvas.height,
			stealthBallticks: gameState.stealthBallticks,
			p: p,
			maxTurn: gameState.maxTurn
		};

		objects = [];
		
		addPickUp();	
		music.playMain();
		doTurn();
	}

	
function doBasic(thirdMessage) {
	//reset canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	//text drawing
	setFont(40);
    ctx.fillText("Level: "+ gameState.level,  canvas.width/100, 1*canvas.height/40);
	ctx.fillText("Squares Gathered: "+gameState.score, canvas.width/100, 2*canvas.height/40);
	if (thirdMessage!=null) {
		ctx.fillText("Survive for: "+gameState.secondsLeft, canvas.width/100, 3*canvas.height/40);
	}	
	//move player
	p.move();
	p.draw(ctx);
}
	
function doGrace() {
	if (paused) {
		return;
	}
	
	doBasic();
	
	//draw grace text
	setFont(10);
	ctx.fillText("Level Complete", canvas.width/4, canvas.height/4);
		
	//end of grace
	if (gracetimer == 0) {
		grace = false;
		//start Music Again
		music.playMain();
		//add objects:
		addSpecialBall();
		addPickUp();
		for (i = 0; i < gameState.initialballs; i++) {
			addBall();
		}		
		
		nextTurn(doTurn);
	} else {
		//grace countdown	
		gracetimer = gracetimer - 1;
		nextTurn(doGrace);	
	}
}
	
function doTurn() {
	if (gameState.playerdead) {
		endgame();
		return;
	} else if (paused) {
		return;
	}
	
	doBasic("Survive for: "+gameState.secondsLeft);

	// check if pickup has been picked up
	pickup.draw(ctx);
	if (Calculations.RectRectColliding(p.shape(), pickup.shape())) {
		addPickUp();
		gameState.score++;
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
	if (gameState.timeLeft == 0) {
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
		gameState.timeLeft = gameState.levelduration;
		//begin grace:
		nextTurn(doGrace);			
	} else {
		//count countsdown timer
		if (gameState.count()) {
			for (i = 0; i < gameState.ballspertick; i++) {
			addBall();
			}
		} 		
		nextTurn(doTurn);
	}
}
		


function nextTurn(feed) {
	setTimeout(feed,gameState.refreshTime);
}

function setFont(quotent) {
	ctx.font = (canvas.width/quotent)+"px " + myFont;
	ctx.fillStyle = fillStyle;
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

function addSpecialBall() {
	addObject(gameState.specialBall);
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

let pauseGameToggle = function() {
	paused = !paused;
	if (!paused) {
		if (grace) {
			doGrace();
		} else {
			doTurn();			
		}
	}
};


return {
	initiateGame: initiate,
	pauseGameToggle: pauseGameToggle
}

});