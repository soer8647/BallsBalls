define(["DrawFunctions","Ball", "./settings"],function(drawFunctions, Ball, settings) {
	return function StealthBall(startx,starty, vx, vy, radius,commonValues) {
		this.base = new Ball(startx,starty, vx, vy, radius,commonValues);
		this.speed = (Math.abs(this.base.dx) + Math.abs(this.base.dy)) / 2;
		this.ticks = commonValues.stealthBallticks/this.speed;
		this.visible = true;
		this.move = function() {
			this.base.move();
			if (this.ticks <= 0) {
				this.visible = !this.visible;
				this.ticks = commonValues.stealthBallticks/this.speed;
			} else {
				this.ticks = this.ticks - 1;
			}
		};
		
		this.shape = function() {
			return this.base.shape();
		};
		
		this.draw = function(ctx) {
			if (this.visible) {
				drawFunctions.drawBall(this.base.x, this.base.y, this.base.radius,ctx,settings.stealthBallColor);
			}
		}
	}
});