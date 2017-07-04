var highscorePage = "highscore";
var settingsPage  = "settings";

var playercontrol;
var controlMethod;

var mouseX;
var mouseY;
var moving = false;

var upPressed = false;
var downPressed = false;
var rightPressed = false;
var leftPressed  = false;

var upKey = 38;
var rightKey = 39;
var leftKey = 37;
var downKey = 40;

var restartKey = 32; //spacebar
var settingsKey = 73;  // i
var HighscoreKey = 72; // h
var SubmitKey = 13; //enter
var muteKey = 77; // m

//sets the control mode
function setControl(mode) {
	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);
	if (mode=="wasd") {
		controlMethod = "WASD";
		playercontrol = keyboardControl;				
		upKey = 87;
		leftKey = 65;
		downKey = 83;
		rightKey = 68;
	} else if (mode=="mouse") {
		controlMethod = "Mouse";
		document.addEventListener("mousemove", mouseMoveHandler, false);
		playercontrol = mouseControl;
	} else if (mode=="mobile") 
	{	
		controlMethod = "Mobile";
		playercontrol = mobileControl;
		  canvas.addEventListener("touchstart", handleStart, false);
		  canvas.addEventListener("touchend", handleEnd, false);
		  canvas.addEventListener("touchcancel", handleCancel, false);
		  canvas.addEventListener("touchmove", handleMove, false);
	}
	else {
		controlMethod = "Arrow Keys";
		playercontrol = keyboardControl;		
	}
}

function handleStart(e) {
	moving = true;
	mouseX = e.changedTouches[0].clientX - canvas.offsetLeft;
    mouseY = e.changedTouches[0].clientY - canvas.offsetTop;   
}
function handleEnd(e) {
	moving = false;
}
function handleCancel(e) {
	moving = false;
}
function handleMove(e) {
	mouseX = e.changedTouches[0].clientX - canvas.offsetLeft;
    mouseY = e.changedTouches[0].clientY - canvas.offsetTop;   
}

function mobileControl(object, speed) {
	if (moving) {
	object.x = object.x + sign(mouseX-object.x)*speed;
	object.y = object.y + sign(mouseY-object.y)*speed;
	}
}
	
function keyboardControl(object, speed) {
	if(rightPressed) {
	    object.x += speed;
	}
	if(leftPressed) {
		object.x -= speed;
	}

	if(downPressed) {
		object.y += speed;
	}

	if(upPressed) {
		object.y -= speed;
	}
	
	if (object.x < 0) {
		object.x = 0;
	} else if (object.x + object.height > height) {
		object.x = height-object.height;
	}
	
	if (object.y < 0) {
		object.y = 0;
	} else if (object.y + object.width > width) {
		object.y = width-object.width;
	}
}

function mouseControl(object,speed) {
	if (mouseX != null) {
	object.x = mouseX - object.width/2;
	object.y = mouseY - object.height/2;
	}
}

function mouseMoveHandler(e) {
    mouseX = e.clientX - canvas.offsetLeft;
    mouseY = e.clientY - canvas.offsetTop;   
}

var currentKeyDownHandler;

function setControlMode(type) {
	if (type=="menu") {
		currentKeyDownHandler = menuKeyDownHandler;
	} else if (type=="game") {
		currentKeyDownHandler = gameKeyDownHandler;	
	}
}

var gameKeyDownHandler = function(e) {
	if(e.keyCode == downKey) {
        downPressed = true;
    } else if(e.keyCode == rightKey) {
        rightPressed = true;
    } else if(e.keyCode == upKey) {
        upPressed = true;
    } else if(e.keyCode == leftKey) {
        leftPressed = true;
	} else if(e.keyCode == muteKey) {
		music.toggleMute();
    }
}

var menuKeyDownHandler = function(e) {
	 if (e.keyCode == restartKey) {
		restartgame();
	} else if (e.keyCode == settingsKey) {
		document.location.href = settingsPage;
	} else if (e.keyCode == HighscoreKey) {
		document.location.href = highscorePage;
	} else if (e.keyCode == SubmitKey) {
		submitscore();
	}
}

function keyDownHandler(e) {
	currentKeyDownHandler(e);
}

function keyUpHandler(e) {
	if(e.keyCode == downKey) {
        downPressed = false;
    }
    else if(e.keyCode == rightKey) {
        rightPressed = false;
    }
    else if(e.keyCode == upKey) {
        upPressed = false;
    }
    else if(e.keyCode == leftKey) {
        leftPressed = false;
    }
}

function resetmovement() {
	moving = false;
	upPressed = false;
	downPressed = false;
	rightPressed = false;
	leftPressed  = false;
}

function setWriteMode(callback) {
}



