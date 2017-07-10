define(["settings"],function(settings) {	
	var controlMethods = ["Mouse","WASD","Arrow Keys"];

	initiateListeners = function (controller) {
     var confirmButton = document.getElementById("confirm");
	 var cancelButton = document.getElementById("cancel");
	 var aSubmit = document.getElementById("autoSubmit");
	 var input = document.getElementById("inputMethod");
	 var name = document.getElementById("playerName");
	 var sound = document.getElementById("sound");
     addEventListener(confirmButton, "click", function () {
		settings.setSetting("settings",true,100);
	 	settings.setSetting("playerAutoName",name.value,100);
		settings.setSetting("controlMethod",input.value,100);
		settings.setSetting("autoSubmit",aSubmit.checked,100);
		settings.setSetting("soundLevel",sound.value,100);
		controller.changeState("menuState");
     });
     
	 addEventListener(cancelButton, "click", function () {
		controller.changeState("menuState");
     });
	 
	 //load settings
	 if (settings.getSetting("settings")) {
			aSubmit.checked = settings.autoSubmit;
			name.value = settings.playerAutoName;
			sound.value = settings.soundLevel;
			var inputVal = settings.controlMethod;
			var options = input.options;
			for(var i = 0; i < options.length; i++) {
					var option = options[i];
					if (option.value.toLowerCase() == inputVal.toLowerCase()) {
						input.selectedIndex = i;
					}
			}			
	}
 };
 
 function addEventListener(myNode, eventType, myHandlerFunc) {
     if (myNode.addEventListener)
         myNode.addEventListener(eventType, myHandlerFunc, false);
     else
         myNode.attachEvent("on" + eventType,
             function (event) {
                 myHandlerFunc.call(myNode, event);
             });
 }

function setUp() {
	let heading = document.createElement("h1");
	write(heading,"Settings for BallsBalls");
	outerDiv.appendChild(heading);

	heading = document.createElement("h3");
	write(heading,"Made by Søren Oehlenschlæger Hjort");
	outerDiv.appendChild(heading);

	write(outerDiv,"Uses Cookies to save setttings");
	addSpace(outerDiv,2);
	write(outerDiv,"Input Method:");
		
	outerDiv.appendChild(addSelect("inputMethod",controlMethods));
	
	addSpace(outerDiv,2);
	write(outerDiv,"Auto submit score after game:");
	addSpace(outerDiv,1);
	outerDiv.appendChild(addInput("autoSubmit","checkbox",""));
	addSpace(outerDiv,1);
	
	write(outerDiv,"Name for Auto submit: ");
	addSpace(outerDiv,1);
	outerDiv.appendChild(addInput("playerName","text",""));
	addSpace(outerDiv,2);
	write(outerDiv,"sound level:");
	
	addSpace(outerDiv,1);
	let sound = addInput("sound","range","");
	sound.min = 0;
	sound.step = 0.1;
	sound.max = 1;
	outerDiv.appendChild(sound);
	addSpace(outerDiv,2);
	
	outerDiv.appendChild(addInput("cancel","button","Cancel Changes"));
	outerDiv.appendChild(addInput("confirm","button","Confirm Changes"));	
}

function write(container,text) {
		container.appendChild(document.createTextNode(text));
}
	
function addSpace(container,size) {
	for(let i = 0; i < size; i++) {
		container.appendChild(document.createElement("br"));
	}
}

function addInput(id,type,value) {
	let input = document.createElement("input");
	input.setAttribute("id",id);
	input.setAttribute("type",type);	
	input.setAttribute("value",value);	
	return input;
}

function addSelect(id,values) {
	let container = document.createElement("select");
	container.setAttribute("id",id);
	let newOption;
	for(value in values) {
		newOption = document.createElement("option");
		newOption.value = values[value];
		newOption.text = values[value];
		container.add(newOption);
	}
	return container;
}

let outerDiv = document.getElementById("outerDiv");

return function settingsState(controller,canvas) {
	this.init = function() {
	//outerDiv.innerHTML = '<h1>Settings for BallsBalls</h1><h3>Made by Søren Oehlenschlæger Hjort</h3>    Uses Cookies To save     <br/> 	     <br/>          Input Method:     <select id="input method">     <option value="Mouse">Mouse</option>     <option value="WASD">WASD</option>     <option value="Arrow Keys">Arrow Keys</option>     </select>          <br/>     <br/> 	 	Auto submit score after game: 	<br/> 	<input id="autoSubmit" type="checkbox"/> 	<br/> 	Name for Auto submit: 	<br/> 	<input id="playerName" type="text" name="playerName"> 	     <br/>     <br/>          <input type="button" id="cancel" value="Cancel Changes"> 	<input type="button" id="confirm" value="Confirm Changes"> ';
	setUp();
	initiateListeners(controller);
	};
	this.end = function() {
		document.getElementById("outerDiv").innerHTML ="";
	};
	this.keydownHandler = function(e) {
	};
	
	this.keyupHandler = function(e) {		
	}
}
});
