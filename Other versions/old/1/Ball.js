function Ball(startx,starty, vx, vy, radius) {
	this.x = startx;
	this.y = starty;
	this.radius = radius;
	this.xd = randomsign();
	this.yd = randomsign();
	this.dx = vx;
	this.dy = vy;
	this.move = function() {
		if ((this.x > height-this.radius && this.xd > 0)|| (this.x < this.radius && this.xd < 0)) {
			this.xd = -this.xd;
		}		
		if ((this.y > width-this.radius && this.yd > 0) || (this.y < this.radius && this.yd < 0)) {
			this.yd = -this.yd;
		}
		
		this.x = this.x + this.dx * this.xd;
		this.y = this.y + this.dy * this.yd;
	}
	
	this.shape = function() {
		return new circle(this.x,this.y,this.radius);
	}
	
	this.draw = function(ctx) {
		drawBall(this.x, this.y, this.radius,ctx,"green");
	}
}