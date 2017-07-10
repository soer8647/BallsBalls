require.config({
        urlArgs: "bust=v3"
});

require(["menuState","State","settings"], function(menuState,State,settings) {	
	var canvas = {};
	var squared = true;
	
	let init = function () {

	// Initialize canvas
	canvas.dom = document.getElementById("myCanvas");
	document.getElementsByTagName("BODY")[0].style.backgroundColor = settings.outsideBackgroundColor;
	canvas.dom.style.backgroundColor = settings.canvasBackgroundColor;
	canvas.ctx = canvas.dom.getContext("2d");
	
	settings.init();

	if (squared) {
	let size = Math.min(window.innerWidth,window.innerHeight);
		canvas.dom.width = canvas.height = size;
		canvas.dom.height = canvas.width = size;
	} else {
		canvas.dom.width = canvas.width  = window.innerWidth;
		canvas.dom.height = canvas.height= window.innerHeight;
	}	
	var controller = State.stateController(menuState,canvas);
	};
	
	init();
	
});

