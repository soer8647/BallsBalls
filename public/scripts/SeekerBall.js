define(["DrawFunctions","Calculations","Ball", "./settings"],function(drawFunctions, Calculations, Ball, settings) {
	
return function SeekerBall(startx,starty, vx, vy, radius,commonValues) {
	this.target = commonValues.p;
	this.base = new Ball(startx,starty, vx, vy, radius,commonValues);
	this.speed = (Math.abs(this.base.dx) + Math.abs(this.base.dy)) / 2;
	this.currentDirection = 0;
	
	this.move = function() {
		this.determineDirection();
		this.base.x -= this.speed * Math.cos(this.currentDirection);
		this.base.y -= this.speed * Math.sin(this.currentDirection);
	};
	
	this.determineDirection = function() {
		DesiredDirection = Math.atan2((this.target.y - this.base.y) , (this.target.x - this.base.x)) + Math.PI;		
		
		let change = this.currentDirection-DesiredDirection;
        if (Math.abs(change)<commonValues.maxTurn) {
            this.currentDirection-=change;
        } else {
            this.currentDirection += commonValues.maxTurn*Calculations.shortestDirection(this.currentDirection,DesiredDirection,2*Math.PI);
        }
	};
	
	this.shape = function() {
		return this.base.shape();
	};
	
	this.draw = function(ctx) {
		drawFunctions.drawBall(this.base.x, this.base.y, this.base.radius,ctx,settings.seekerBallColor);
	};
}
});