define(["DrawFunctions","Calculations","Ball"],function(drawFunctions,Calculations,Ball) {
	
return function SeekerBall(startx,starty, vx, vy, radius,commonValues) {
	this.target = commonValues.p;
	this.base = new Ball(startx,starty, vx, vy, radius,commonValues);
	this.speed = (Math.abs(this.base.dx) + Math.abs(this.base.dy)) / 2;
	this.maxTurn = 0.1;
	this.currentDirection = 0;
	
	this.move = function() {
		this.determineDirection();
		this.base.x -= this.speed * Math.cos(this.currentDirection);
		this.base.y -= this.speed * Math.sin(this.currentDirection);
	};
	
	this.determineDirection = function() {
		DesiredDirection = Math.atan2((this.target.y - this.base.y) , (this.target.x - this.base.x)) + Math.PI;		
 /*     if (this.currentDirection < 0) {
            this.currentDirection = (2*Math.PI) - this.currentDirection;
        } else if (this.currentDirection > (2*Math.PI)) {
            this.currentDirection %= (2*Math.PI);
        }
 */		
		let change = this.currentDirection-DesiredDirection;
        if (Math.abs(change)<this.maxTurn) {
            this.currentDirection-=change;
        } else {
            this.currentDirection += this.maxTurn*Calculations.shortestDirection(this.currentDirection,DesiredDirection,2*Math.PI);
        }
	}
	
	this.shape = function() {
		return this.base.shape();
	}
	
	this.draw = function(ctx) {
		drawFunctions.drawBall(this.base.x, this.base.y, this.base.radius,ctx,"#98bfc2");
	};
}
})