define(["settings"],function(settings) {
	var myFont = "Arial"
	var fillStyle = "green";
	
	function setMenuText(canvas) {
	//reset canvas
	canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
	setFont(canvas,5);
	
	canvas.ctx.fillText("BallsBalls", canvas.width/15, canvas.height/4);
	
	setFont(canvas,15);
	//text drawing
	let displayWidth = canvas.width/10;
	let displayHeight = canvas.height/2;
	let heightOffset = canvas.width/12;
	
    canvas.ctx.fillText("Press Space to Play Game", 	displayWidth, displayHeight);
    canvas.ctx.fillText("Press i for settings", 		displayWidth, displayHeight+heightOffset*1);
	canvas.ctx.fillText("Press h for Leaderboard", 	displayWidth, displayHeight+heightOffset*2);
	}

	function setFont(canvas,quotent) {
		canvas.ctx.font = (canvas.width/quotent)+"px " + myFont;
		canvas.ctx.fillStyle = fillStyle;	
	}

	function menuState(controller,canvas) {
		
		this.init = function() {
			console.log("starting Menu!");
			canvas.dom.style.display = "block";
			setMenuText(canvas);
			
		}
		this.end = function() {
			console.log("ending Menu!");
			canvas.dom.style.display = "none";
		}
		
		this.keydownHandler = function(e) {
			 if (e.keyCode == settings.restartKey) {
				controller.changeState("gameState");
			} else if (e.keyCode == settings.settingsKey) {
				controller.changeState("settingsState");
			} else if (e.keyCode == settings.HighscoreKey) {
				controller.changeState("highscoreState");
			}
		}
		this.keyupHandler = function(e) {
		}
	}
	
	return menuState;
	
});






