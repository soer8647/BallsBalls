function Paddle(ax,ay,awidth,aheight) {
	this.x = ax;
	this.y = ay;
	this.width = awidth;
	this.height = aheight;
	this.move = function(nx,ny) {
		playercontrol(this,8);
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