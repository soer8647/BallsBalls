define(["GameFlow","settings", "gameControlHandler"], 
function(gameflow,settings,gameControlHandler) {	

	function gameState(controller,canvas) {
		settings.updateSettings();
		let gameCtrlHandler = new gameControlHandler(canvas.width, canvas.height,canvas.dom.offsetLeft,canvas.dom.offsetTop);
		this.init = function() {
			canvas.dom.style.display = "block";			
			gameflow.initiateGame(canvas,
			function(gameData){controller.changeState("submitScoreState",gameData)}
			,gameCtrlHandler);
		};
		this.end = function() {
			canvas.dom.style.display = "none";
		};
		this.keydownHandler = gameCtrlHandler.keyDown;
		this.keyupHandler = gameCtrlHandler.keyUp;
		this.mouseHandler = gameCtrlHandler.mouseMove;
	}

	return {
		gameState: gameState
	}
});