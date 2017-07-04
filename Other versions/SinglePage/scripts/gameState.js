define(["GameFlow","settings", "gameControlHandler"], 
function(gameflow,settings,gameControlHandler) {	

	function gameState(controller,canvas) {
		settings.updateSettings();
		let gameCtrlHandler = new gameControlHandler(canvas.width, canvas.height);
		this.init = function() {
			canvas.dom.style.display = "block";			
			gameflow.initiateGame(canvas,
			function(gameData){controller.changeState("highscoreState",gameData)}
			,gameCtrlHandler);
		}
		this.end = function() {
			canvas.dom.style.display = "none";
		}
		this.keydownHandler = gameCtrlHandler.keyDown;
		this.keyupHandler = gameCtrlHandler.keyUp;
	}

	return {
		gameState: gameState
	}
});