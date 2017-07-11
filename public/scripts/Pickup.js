define(["DrawFunctions", "Calculations", "./settings"], function (drawFunctions, Calculations, settings) {
	return function Pickup(x,y,length) {
		this.x = x;
		this.y = y;
        this.radius = length;
		this.width = length;
		this.height = length;

		this.shape = function(){
            return new Calculations.rectangle(this.x, this.y, this.radius, this.radius);
		};
		
		this.draw = function(ctx) {
            drawFunctions.drawRect(this.x, this.y, this.radius, this.radius, ctx, settings.pickupColor);
		}
	}
});