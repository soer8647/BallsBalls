define(["menuState","gameState","settingsState","submitScoreState","highScoreState"],
function(menuState,gameState,settingsState,submitScoreState,highscoreState) {
	function StateController(initState,globalValues) {
		var self = this;
		this.currentState = new initState(this,globalValues);
		this.currentState.init();
		this.keyDownHandler = function(e) {
			self.currentState.keydownHandler(e);
		};
		this.keyUpHandler = function(e) {
			self.currentState.keyupHandler(e);
		};
		document.addEventListener("keydown", this.keyDownHandler, false);
		document.addEventListener("keyup", this.keyUpHandler, false);
	
		
		this.states = 
		{
			gameState: gameState.gameState,
			menuState: menuState,
			settingsState: settingsState,
			highscoreState: highscoreState,
			submitScoreState: submitScoreState,
			testState: testState
		};
		
		this.changeState = function(newStateString,extraInput) {
			globalValues.extra = extraInput;
			let newState = new this.states[newStateString](this,globalValues);
			this.currentState.end();	
			this.currentState = newState;
			this.currentState.init();
		}
	}

	function testState(controller) {
		this.init = function() {
			console.log("starting test!");
		}
		this.end = function() {
			console.log("ending test!");
		}
		
		this.keydownHandler = function(e) {
			if (e.keyCode == 77) { // m
				controller.changeState("menuState");
			} else {
				console.log("test!, code: " + e.keyCode);
			}			
		}
		this.keyupHandler = function(e) {
		}
	}
	
	return {
		stateController: StateController
	}
});