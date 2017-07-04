require.config({
        urlArgs: "bust=v2"
});

require(["menuState","State","settings"], function(menuState,State,settings) {	
	var canvas = {};
	var ctx;
	var p;
	var pickup;
	var objects;
	var height;
	var width;
	var mindist = 4;
	var leaderboard;
	var squared = true;
	
	init = function () {

	// Initialize canvas
	canvas.dom = document.getElementById("myCanvas");
	canvas.ctx = canvas.dom.getContext("2d");
	
	settings.init();

	if (squared) {
	let size = Math.min(window.innerWidth,window.innerHeight);
		canvas.dom.width = canvas.height = size;
		canvas.dom.height = canvas.width = size;
	} else {
		canvas.dom.width = canvas.height = window.innerWidth;
		canvas.dom.height = canvas.width = window.innerHeight;
	}	
	var controller = State.stateController(menuState,canvas);
	};
	
	init();
	
});

