 window.onload = function () {
	 //input method
	 var input = document.getElementById("input method");
	 //listen to input method
	 addEventListener(input, "change", function () {
	 var inputmethod = input.options[input.selectedIndex].value;
		setCookie("input",inputmethod,100);
     });
	 
	 //auto submit
	 var aSubmit = document.getElementById("autoSubmit");
	 addEventListener(aSubmit, "change", function () {
		setCookie("autoSubmit",aSubmit.checked,100);
	 });
	 
	 //name for auto submit
	 var name = document.getElementById("playerName");
	 addEventListener(name, "change", function () {
		setCookie("playerName",name.value,100);
	 });
	 
	 
	 //save button
	 var saveButton = document.getElementById("save");
	 //listen to save button
	 addEventListener(saveButton, "click", function () {  	    	
	    	setCookie("settings",true,100);
	 });
     
	 //Play again
     var playAgain = document.getElementById("play");
	 //listen to play again
     addEventListener(playAgain, "click", function () {
	 setCookie("settings",true,100);
	 window.location.href = "index";
     });
	 
	 //load cookies
	 if (getCookie("settings")) {
			aSubmit.checked = getCookie("autoSubmit");
			name.value = getCookie("playerName");

			var inputVal = getCookie("input");
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
