function Pickup(x,y,length) {
	this.x = x;
	this.y = y;
	this.width = length;
	this.height = length;
	
	this.shape = function(){
		return new rectangle(this.x,this.y,this.width,this.height);
	}
	
	this.draw = function(ctx) {
		 ctx.beginPath();
		    ctx.rect(this.x, this.y, this.width, this.height);
		    ctx.fillStyle = "#FFA500";
		    ctx.fill();
		    ctx.closePath();
	}
}