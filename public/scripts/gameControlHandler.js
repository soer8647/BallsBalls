define(["settings","Music","GameFlow"],function(settings,music,game) {
	let sign = function(x) {
		if (x>0) {
			return 1;	
		} else if (x<0) {
			return -1;
		}	
		return 0;
	};
	
	
	gameControlHandler = function(width,height,offsetX,offsetY) {
		var upPressed = false;
		var downPressed = false;
		var rightPressed = false;
		var leftPressed  = false;
		var mouse = {x: width/2,
        y: height/2};
		var offset = {x:offsetX,y:offsetY};
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
			
			containOnCanvas(object);
		}

		function containOnCanvas(object) {
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

		function mouseControl(object, speed) {
			let distx = mouse.x - object.x;
            let disty = mouse.y - object.y;

            let dist = Math.sqrt(Math.pow(distx, 2) + Math.pow(disty, 2));
            if (dist == 0) {
            	return;
			}
            if (dist>speed) {
            	let scaling = dist/speed;
                distx /= scaling;
                disty /= scaling;
            }

            object.x += distx;
            object.y += disty;

            containOnCanvas(object);
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
			} else if(e.keyCode == 32) {
			    game.spaceBar();
			}
		};
		
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
		};

		this.mouseMove = function (e) {
		//	console.log(offset.x,offset.y);
            mouse.x = e.clientX-offset.x;
            mouse.y = e.clientY-offset.y;
        };

		if (settings.controlMethod == "Mouse") {
			this.playerControl = mouseControl;
		} else {
            this.playerControl = keyboardControl;
		}
	};
	return gameControlHandler;
});