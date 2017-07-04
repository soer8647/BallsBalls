function SeekerBall(startx,starty, vx, vy, radius, target) {
	this.target;
	this.base = new Ball(startx,starty, vx, vy, radius);
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
            this.currentDirection += this.maxTurn*shortestDirection(this.currentDirection,DesiredDirection,2*Math.PI);
        }
	}
	
	this.shape = function() {
		return this.base.shape();
	}
	
	this.draw = function(ctx) {
		drawBall(this.base.x, this.base.y, this.base.radius,ctx,"#98bfc2");
	};
}

/**
 *
 * @param a the starting position
 * @param b the end position
 * @param max the maximum value (i.e. 360 for degrees in circle
 * @returns {number} in {-1,0,1}, which direction is shortest
 */
function shortestDirection(a, b, max) {
    var ans;
    if (b - a > max / 2) {
        ans = b - a - max;
    } else if (b - a > -max / 2) {
        ans = b - a;
    } else {
        ans = b - a + max;
    }

    if (ans > 0) {
        return 1;
    } else if (ans < 0) {
        return -1;
    } else {
        return 0;
    }

}