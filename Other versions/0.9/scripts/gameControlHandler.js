define(["settings","Music","GameFlow"],function(settings,music,game) {
	gameControlHandler = function(width,height) {
		var upPressed = false;
		var downPressed = false;
		var rightPressed = false;
		var leftPressed  = false;
		
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