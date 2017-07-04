function Paddle(ax,ay,length) {
	this.x = ax;
	this.y = ay;
	this.width = length;
	this.height = length;
	this.move = function(nx,ny) {
		playercontrol(this,playerSpeed);
	}
	
	this.shape = function(){
		return new rectangle(this.x,this.y,this.width,this.height);
	}
	
	this.draw = function(ctx) {
		 ctx.beginPath();
		    ctx.rect(this.x, this.y, this.width, this.height);
		    ctx.fillStyle = "#0095DD";
		    ctx.fill();
		    ctx.closePath();
	}
}