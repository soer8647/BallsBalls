define(["Leaderboard","settings"],function(leaderboard,settings) {
	let localHighScore = 0;
	let localHighestLevel = 0;

	function submitScore(playername,score,level,controlMethod,controller) {
		let data = 	{"name": playername, 
					"score": score, 
					"level": level, 
					"method": controlMethod};
		leaderboard.addandgo(data,function(){
			controller.changeState("menuState");
		});
		
	}
	
	highscoreState = function(controller,globalValues) {
		this.OuterDiv = document.getElementById("outerDiv");
		this.init = function() {
			if (globalValues.extra.score <= localHighScore && globalValues.extra.level <= localHighestLevel) {
                controller.changeState("menuState");
			} else {
                let name = null;
                if(settings.autoSubmit == "true") {
                    name = settings.playerAutoName;
                } else {
                    name = getPlayerName();
                }
                if(name==null) {
                    controller.changeState("menuState");
                } else {
                    this.OuterDiv.innerHTML =
                        "<h1>Submitting score</h1>";

                    localHighScore = globalValues.extra.score;
                    localHighestLevel = globalValues.extra.level;

                    //will perform callback
                    submitScore(name,
                        globalValues.extra.score,
                        globalValues.extra.level,
                        settings.controlMethod,
                        controller);
                }
			}
		};
		this.end = function() {
			this.OuterDiv.innerHTML ="";
		};
		
		this.keydownHandler = function(e) {
		};
		this.keyupHandler = function(e) {
		}
	};
	
	function getPlayerName() {
	//	setWriteMode(); alternative method, not yet implemented
		let playername;
		do {
			playername = prompt("Player name (max " + settings.maxPlayernameLength +" characters)");
		if (playername == null) {
			return null;
		}
		} while ((playername.length <= 0) || (playername.length > settings.maxPlayernameLength));
		// Ask for playername until proper name is given, or cancel is chosen.		
		return playername;
	}

	
	return highscoreState;
});