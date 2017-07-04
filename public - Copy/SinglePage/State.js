var currentState;


ChangeState(newState) {
	currentState.end();	
	newState.init();
	currentState = newState;
}

function settingsState() {
	this.init = function() {
		
	}
	this.end = function() {
		
	}
	this.keydownHandler = function(e) {
		
	}
}

function gameState() {
	this.init = function() {
		
	}
	this.end = function() {
		canvas.style.display="none";
	}
	this.keydownHandler = function(e) {
		
	}
}

function endgameState() {
	this.init = function() {
		
	}
	this.end = function() {
		
	}
	this.keydownHandler = function(e) {
		
	}
}

