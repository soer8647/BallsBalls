 window.onload = function () {
     var input = document.getElementById("input method");
     addEventListener(input, "change", function () {
     	var select = document.getElementById("input method");
	var inputmethod = select.options[select.selectedIndex].value;
	 setCookie("input",inputmethod,100);
     });

     var diffi = document.getElementById("difficulty");
     addEventListener(diffi,"change", function () {
	 	var select = document.getElementById("difficulty");
	    	var difficulty = select.options[select.selectedIndex].value;
	 setCookie("difficulty",difficulty,100);
     });

	 var saveButton = document.getElementById("save");
	 addEventListener(saveButton, "click", function () {  	    	

	    	select = document.getElementById("y");
	     setCookie("maxY",select.value,100);

	    	setCookie("settings",true,100);
	 });

     var maxX = document.getElementById("x");
     addEventListener(maxX, "input", function () {
	    	select = document.getElementById("x");
	     setCookie("maxX",select.value,100);     
     });   
     
     var maxY = document.getElementById("y");
     addEventListener(maxY, "input", function () {
	    	select = document.getElementById("y");
	     setCookie("maxY",select.value,100);     
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
			
		 
	    	select = document.getElementById("difficulty");
	    	select.selectedIndex = getCookie("difficulty");
	    	
	    	select = document.getElementById("x");
	    	select.value = getCookie("maxX");
	    	select = document.getElementById("y");
	    	select.value = getCookie("maxY");	    
	    
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
