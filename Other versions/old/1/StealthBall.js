function StealthBall(startx,starty, vx, vy, radius) {
	this.base = new Ball(startx,starty, vx, vy, radius);
	this.speed = (Math.abs(this.base.dx) + Math.abs(this.base.dy)) / 2;
	this.ticks = stealthBallticks/this.speed;
	this.visible = true;
	this.move = function() {
		this.base.move();
		if (this.ticks <= 0) {
			this.visible = !this.visible;
			this.ticks = stealthBallticks/this.speed;
		} else {
			this.ticks = this.ticks - 1;
		}
	}
	
	this.shape = function() {
		return this.base.shape();
	}
	
	this.draw = function(ctx) {
		if (this.visible) {
			drawBall(this.base.x, this.base.y, this.base.radius,ctx,"red");
		}
	}
}