define(["GameValueHandler","Paddle","Ball","Pickup", "./settings","DrawFunctions"],
function(GameValueHandler, Paddle, Ball, Pickup, settings,drawFunctions) {
    let fillStyle = "green";

    let menuText = ["You are the blue Square!","Collect yellow Squares!","Avoid the Balls!","","Press Space to return to Menu"];
	
	function setMenuText(canvas) {
	//reset canvas
	canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawFunctions.setFont(canvas,5);

	//Title
	canvas.ctx.fillText("BallsBalls", canvas.width/15, canvas.height/4);

	//Other text
	drawFunctions.setFont(canvas,15);
	//text drawing
	let displayWidth = canvas.width/20;
	let displayHeight = canvas.height/2;
	let heightOffset = canvas.width/12;

	for (i = 0; i < menuText.length; i++) {
            canvas.ctx.fillText(menuText[i], displayWidth, displayHeight+heightOffset*i);
        }
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
			if (e.keyCode == settings.menuChooseKey) {
                controller.changeState("menuState");
            }
		};
		this.keyupHandler = function(e) {
		}
	}
	
	return menuState;
	
});






