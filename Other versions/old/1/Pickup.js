function Pickup(x,y,length) {
	this.x = x;
	this.y = y;
	this.width = length;
	this.height = length;
	
	this.shape = function(){
		return new rectangle(this.x,this.y,this.width,this.height);
	}
	
	this.draw = function(ctx) {
		drawRect(this.x, this.y, this.width, this.height,ctx,"#FFA500");
	}
}