define(["settings","DrawFunctions"],function(settings,drawFunction) {
	var fillStyle = "green";
	let currentPosition = 0;
	let menuText = [
		"Play",
		"Settings",
		"Leaderboard",
		"Help"
	];
	let menuItems = ["gameState","settingsState","highscoreState","introState"];
    let menuCount = menuItems.length -1;
	
	
	function setMenuText(canvas) {
	//reset canvas
	canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawFunction.setFont(canvas,5,fillStyle);
	
	canvas.ctx.fillText("BallsBalls", canvas.width/15, canvas.height/4);

	drawFunction.setFont(canvas,15,fillStyle);
	//text drawing
	let displayWidth = canvas.width/10;
	let displayHeight = canvas.height/2;
	let heightOffset = canvas.width/12;
	let ballRadius = canvas.height/40;
	// draw pointer
	drawFunction.drawBall(displayWidth/2,displayHeight+(heightOffset*currentPosition)-ballRadius,ballRadius,canvas.ctx,fillStyle);
	// draw text
	for (i = 0; i < menuItems.length; i++) {
        canvas.ctx.fillText(menuText[i], displayWidth, displayHeight+heightOffset*i);
	}
	}

	function menuState(controller,canvas) {
		
		this.init = function() {
			canvas.dom.style.display = "block";
			setMenuText(canvas);
			
		};
		this.end = function() {
			canvas.dom.style.display = "none";
		};
		
		this.keydownHandler = function(e) {
			if (e.keyCode == settings.upKey) {
                currentPosition--;
                if (currentPosition<0) {
                	currentPosition=menuCount	;
				}
                setMenuText(canvas);
            } else if (e.keyCode == settings.downKey) {
                currentPosition++;
                if (currentPosition>menuCount) {
                    currentPosition=0;
                }
                setMenuText(canvas);
            } else if (e.keyCode == settings.menuChooseKey || e.keyCode == settings.altMenuChooseKey) {
                controller.changeState(menuItems[currentPosition]);
			}
		};
		this.keyupHandler = function(e) {
		}
	}
	
	return menuState;
	
});






