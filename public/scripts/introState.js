define(["GameValueHandler","Paddle","Ball","Pickup", "./settings"],
function(GameValueHandler, Paddle, Ball, Pickup, settings) {
	var myFont = "Arial";
	var fillStyle = settings.menuTextColor;
	let player;
	let pickup;
	
	let lineStart = 10;
	let lineMargin = 10;
	
	function init() {
		let gameValueHandler = new GameValueHandler();
		player = new Paddle(lineStart, lineMargin*1, 
							GameValueHandler.playerLength,null,0);
		pickup = new Pickup(lineStart,lineMargin*2,GameValueHandler.pickupLength);		
	}
	
	function setMenuText(canvas) {
	//reset canvas
	canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
	setFont(canvas,5);
	
	player.draw(canvas.ctx);
	pickup.draw(canvas.ctx);
	
	canvas.ctx.fillText("BallsBalls", canvas.width/15, canvas.height/4);
	
	setFont(canvas,15);
	//text drawing
	let displayWidth = canvas.width/10;
	let displayHeight = canvas.height/2;
	let heightOffset = canvas.width/12;
	
  //  canvas.ctx.fillText("Press Space to Play Game", 	displayWidth, displayHeight);
  //  canvas.ctx.fillText("Press i for settings", 		displayWidth, displayHeight+heightOffset*1);
  //  canvas.ctx.fillText("Press h for Leaderboard", 	displayWidth, displayHeight+heightOffset*2);
	}

	function setFont(canvas,quotent) {
		canvas.ctx.font = (canvas.width/quotent)+"px " + myFont;
		canvas.ctx.fillStyle = fillStyle;	
	}

	function menuState(controller,canvas) {
		
		this.init = function() {
			canvas.dom.style.display = "block";
			init();
			setMenuText(canvas);
			
		};
		this.end = function() {
			canvas.dom.style.display = "none";
		};
		
		this.keydownHandler = function(e) {
			controller.changeState("menuState");	
		};
		this.keyupHandler = function(e) {
		}
	}
	
	return menuState;
	
});






