define(["settings","Music","GameFlow"],function(settings,music,game) {
	let sign = function(x) {
		if (x>0) {
			return 1;	
		} else if (x<0) {
			return -1;
		}	
		return 0;
	}
	
	
	gameControlHandler = function(width,height) {
		var upPressed = false;
		var downPressed = false;
		var rightPressed = false;
		var leftPressed  = false;
		
		function keyboardControl(object, speed) {
			let xChange = 0;
			let yChange = 0;
			
			if(rightPressed) {
				xChange += speed;
			}
			if(leftPressed) {
				xChange -= speed;
			}

			if(downPressed) {
				yChange += speed;
			}

			if(upPressed) {
				yChange -= speed;
			}

			if (xChange!=0 && yChange!=0) {
				xChange = sign(xChange)*Math.sqrt(settings.diagonalFactor*speed);
				yChange = sign(yChange)*Math.sqrt(settings.diagonalFactor*speed);
			}
			
			object.x += xChange;
			object.y += yChange;			
			
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
		
		this.keyDown = function(e) {
			if(e.keyCode == settings.downKey) {
				downPressed = true;
			} else if(e.keyCode == settings.rightKey) {
				rightPressed = true;
			} else if(e.keyCode == settings.upKey) {
				upPressed = true;
			} else if(e.keyCode == settings.leftKey) {
				leftPressed = true;
			} else if(e.keyCode == settings.muteKey) {
				music.toggleMute();
			} else if(e.keyCode == settings.pauseKey) {
				game.pauseGameToggle();
			}
		}
		
		this.keyUp = function(e) {
			if(e.keyCode == settings.downKey) {
				downPressed = false;
			}
			else if(e.keyCode == settings.rightKey) {
				rightPressed = false;
			}
			else if(e.keyCode == settings.upKey) {
				upPressed = false;
			}
			else if(e.keyCode == settings.leftKey) {
				leftPressed = false;
			}
		}
		this.playerControl = keyboardControl;
	}
	return gameControlHandler;
})