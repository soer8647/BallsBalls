define(["DrawFunctions","Calculations"],function(drawFunctions,Calculations) {
let Ball = function (startx,starty, vx, vy, radius,commonValues) {
	this.x = startx;
	this.y = starty;
	this.radius = radius;
	this.xd = Calculations.randomsign();
	this.yd = Calculations.randomsign();
	this.dx = vx;
	this.dy = vy;
	this.move = function() {
		if ((this.x > commonValues.height-this.radius && this.xd > 0)|| (this.x < this.radius && this.xd < 0)) {
			this.xd = -this.xd;
		}		
		if ((this.y > commonValues.width-this.radius && this.yd > 0) || (this.y < this.radius && this.yd < 0)) {
			this.yd = -this.yd;
		}
		
		this.x = this.x + this.dx * this.xd;
		this.y = this.y + this.dy * this.yd;
	}
	
	this.shape = function() {
		return new Calculations.circle(this.x,this.y,this.radius);
	}
	
	this.draw = function(ctx) {
		drawFunctions.drawBall(this.x, this.y, this.radius,ctx,"green");
	}
};




return
})