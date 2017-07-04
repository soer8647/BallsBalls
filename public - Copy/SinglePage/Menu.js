var myFont = "Arial"
var fillStyle = "#dd0095";

function startMainMenu() {
	setMenuText();
	setControl("menu");
}

function setMenuText() {
	//reset canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	setFont(5);
	
	ctx.fillText("BallsBalls", width/15, height/4);
	
	
	setFont(15);
	//text drawing
	let displayWidth = width/10;
	let displayHeight = height/2;
	let heightOffset = width/12;
	
    ctx.fillText("Press Space to Play Game", 	displayWidth, displayHeight);
    ctx.fillText("Press i for settings", 		displayWidth, displayHeight+heightOffset*1);
	ctx.fillText("Press h for Leaderboard", 	displayWidth, displayHeight+heightOffset*2);
}

function setFont(quotent) {
	ctx.font = (width/quotent)+"px " + myFont;
	ctx.fillStyle = "green";	
}

