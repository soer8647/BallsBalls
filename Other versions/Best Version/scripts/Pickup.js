define(["DrawFunctions","Calculations"],function(drawFunctions,Calculations) {
	return function Pickup(x,y,length) {
		this.x = x;
		this.y = y;
		this.width = length;
		this.height = length;
		
		this.shape = function(){
			return new Calculations.rectangle(this.x,this.y,this.width,this.height);
		}
		
		this.draw = function(ctx) {
			drawFunctions.drawRect(this.x, this.y, this.width, this.height,ctx,"#FFA500");
		}
	}
})