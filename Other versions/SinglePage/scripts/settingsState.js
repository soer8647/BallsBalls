define(["settings"],function(settings) {
	initiateListeners = function (controller) {
	 //input method
	 var input = document.getElementById("input method");
	 //listen to input method
	 addEventListener(input, "change", function () {
	 var inputmethod = input.options[input.selectedIndex].value;
		settings.setSetting("input",inputmethod,100);
     });
	 
	 //auto submit
	 var aSubmit = document.getElementById("autoSubmit");
	 addEventListener(aSubmit, "change", function () {
		settings.setSetting("autoSubmit",aSubmit.checked,100);
	 });
	 
	 //name for auto submit
	 var name = document.getElementById("playerName");
	 addEventListener(name, "change", function () {
		settings.setSetting("playerName",name.value,100);
	 });
	 
	 
	 //save button
	 var saveButton = document.getElementById("save");
	 //listen to save button
	 addEventListener(saveButton, "click", function () {  	    	
	    	settings.setSetting("settings",true,100);
	 });
     
	 //Play again
     var playAgain = document.getElementById("play");
	 //listen to play again
     addEventListener(playAgain, "click", function () {
	 settings.setSetting("settings",true,100);
	 controller.changeState("menuState");
     });
	 
	 //load cookies
	 if (settings.getSetting("settings")) {
			aSubmit.checked = settings.getSetting("autoSubmit");
			name.value = settings.getSetting("playerName");

			var inputVal = settings.getSetting("input");
			var options = input.options;
			for(var i = 0; i < options.length; i++) {
					var option = options[i];
					if (option.value == inputVal) {
						input.selectedIndex = i;
					}
			}
			
	}
 }
 
 function addEventListener(myNode, eventType, myHandlerFunc) {
     if (myNode.addEventListener)
         myNode.addEventListener(eventType, myHandlerFunc, false);
     else
         myNode.attachEvent("on" + eventType,
             function (event) {
                 myHandlerFunc.call(myNode, event);
             });
 }
	
return function settingsState(controller,canvas) {
	this.init = function() {
document.getElementById("outerDiv").innerHTML =
'<h1>Settings for BallsBalls</h1><h3>Made by Søren Oehlenschlæger Hjort</h3>    Uses Cookies To save     <br/> 	     <br/>          Input Method:     <select id="input method">     <option value="mouse">Mouse</option>     <option value="wasd">WASD</option>     <option value="arrows">Arrow Keys</option>     </select>          <br/>     <br/> 	 	Auto submit score after game: 	<br/> 	<input id="autoSubmit" type="checkbox"/> 	<br/> 	Name for Auto submit: 	<br/> 	<input id="playerName" type="text" name="playerName"> 	     <br/>     <br/>          <input type="button" id="save" value="Save Settings"> 	<input type="button" id="play" value="Return to Menu"> '
	;	
	initiateListeners(controller);
	}
	this.end = function() {
		document.getElementById("outerDiv").innerHTML ="";
	}
	this.keydownHandler = function(e) {
		
	}
	this.keyupHandler = function(e) {
		
	}
}
});
