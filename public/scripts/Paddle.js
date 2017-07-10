define(["DrawFunctions","Calculations"],function(drawFunctions,Calculations) {
return function Paddle(ax,ay,length,controller,playerSpeed) {
	this.x = ax;
	this.y = ay;
	this.width = length;
	this.height = length;
	this.move = function(nx,ny) {
		controller.playerControl(this,playerSpeed);
	};
	
	this.shape = function(){
		return new Calculations.rectangle(this.x,this.y,this.width,this.height);
	};
	
	this.draw = function(ctx) {
		drawFunctions.drawRect(this.x, this.y, this.width, this.height,ctx,"#0095DD");
	}
}
});