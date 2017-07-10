define(["DrawFunctions","Calculations","settings"],function(drawFunctions,Calculations,settings) {
let Ball = function (startx,starty, vx, vy, radius,commonValues) {
	this.x = startx;
	this.y = starty;
	this.radius = radius;
	this.dx = vx * Calculations.randomsign();
	this.dy = vy * Calculations.randomsign();
	this.commonValues = commonValues;
};

Ball.prototype.move = function() {
		if ((this.x > this.commonValues.height-this.radius && this.dx > 0)|| (this.x < this.radius && this.dx < 0)) {
			this.dx = -this.dx;
		}		
		if ((this.y > this.commonValues.width-this.radius && this.dy > 0) || (this.y < this.radius && this.dy < 0)) {
			this.dy = -this.dy;
		}
		
		this.x = this.x + this.dx;
		this.y = this.y + this.dy;
};

Ball.prototype.shape = function() {
		return new Calculations.circle(this.x,this.y,this.radius);
};

Ball.prototype.draw = function(ctx) {
		drawFunctions.drawBall(this.x, this.y, this.radius,ctx,settings.standardBallColor);
};

return Ball;
});