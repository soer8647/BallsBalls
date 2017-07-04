define(["settings"],function(settings) {
	var myFont = "Arial"
	var fillStyle = "green";
	var keyStateMap = {};
	keyStateMap[settings.restartKey] = "gameState";
	keyStateMap[settings.settingsKey] = "settingsState";
	keyStateMap[settings.highscoreKey] = "highscoreState";
	keyStateMap[settings.introKey] = "introState";
	
	
	
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
			canvas.dom.style.display = "block";
			setMenuText(canvas);
			
		}
		this.end = function() {
			canvas.dom.style.display = "none";
		}
		
		this.keydownHandler = function(e) {
			let change = keyStateMap[e.keyCode];
			if(change!=null) {
				controller.changeState(change);				
			}
		}
		this.keyupHandler = function(e) {
		}
	}
	
	return menuState;
	
});






