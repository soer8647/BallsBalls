 window.onload = function () {
     var input = document.getElementById("input method");
     addEventListener(input, "change", function () {
     	var select = document.getElementById("input method");
	var inputmethod = select.options[select.selectedIndex].value;
	 setCookie("input",inputmethod,100);
     });

	 var saveButton = document.getElementById("save");
	 addEventListener(saveButton, "click", function () {  	    	

	    	select = document.getElementById("y");
	     setCookie("maxY",select.value,100);

	    	setCookie("settings",true,100);
	 });
     
     var playAgain = document.getElementById("play");
     addEventListener(playAgain, "click", function () {
	setCookie("settings",true,100);
	 window.location.href = "index";
     });
 
	 if (getCookie("settings")) {	
		 	var select = document.getElementById("input method");
			var input = getCookie("input");
			var options = select.options;
			for(var i = 0; i < options.length; i++) {
					var option = options[i];
					if (option.value == input) {
						select.selectedIndex = i;
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
