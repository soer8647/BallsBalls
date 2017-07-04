var playercontrol;

var mouseX;
var mouseY;

var upPressed = false;
var downPressed = false;
var rightPressed = false;
var leftPressed  = false;

var upKey = 38;
var rightKey = 39;
var leftKey = 37;
var downKey = 40;

function setKeyBoardControl(mode) {
	if (mode=="wasd") {
		playercontrol = keyboardControl;				
		upKey = 87;
		leftKey = 65;
		downKey = 83;
		rightKey = 68;
	} else if (mode=="mouse") {
		playercontrol = mouseControl;
		mouseX = p.x;
		mouseY = p.y;
	} else {
		playercontrol = keyboardControl;		
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
	} else if (object.x > height) {
		object.x = height;
	}
	
	if (object.y < 0) {
		object.y = 0;
	} else if (object.y > width) {
		object.y = width;
	}
}

function keyDownHandler(e) {
	if(e.keyCode == downKey) {
        downPressed = true;
    }
    if(e.keyCode == rightKey) {
        rightPressed = true;
    }
    if(e.keyCode == upKey) {
        upPressed = true;
    }
    else if(e.keyCode == leftKey) {
        leftPressed = true;
    }
}


function mouseControl(object,speed) {
	object.x = mouseX - object.width/2;
	object.y = mouseY - object.height/2;
}

function mouseMoveHandler(e) {
    mouseX = e.clientX - canvas.offsetLeft;
    mouseY = e.clientY - canvas.offsetTop;   
}

function keyUpHandler(e) {
	if(e.keyCode == downKey) {
        downPressed = false;
    }
    if(e.keyCode == rightKey) {
        rightPressed = false;
    }
    if(e.keyCode == upKey) {
        upPressed = false;
    }
    else if(e.keyCode == leftKey) {
        leftPressed = false;
    }
}