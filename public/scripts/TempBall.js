define(["DrawFunctions", "Calculations", "Ball", "./settings"], function (drawFunctions, Calculations, Ball, settings) {

    return function TempBall(startx, starty, vx, vy, radius, commonValues) {
        this.base = new Ball(startx, starty, vx, vy, radius, commonValues);

        this.move = function () {
            if ((this.x > commonValues.height-radius && this.base.dx > 0)|| (this.base.x < radius && this.base.dx < 0)
            || (this.y > commonValues.width-radius && this.base.dy > 0) || (this.base.y < radius && this.base.dy < 0))
            {
                commonValues.removeObject(this);
            }

            this.base.x = this.base.x + this.base.dx;
            this.base.y = this.base.y + this.base.dy;
        };

        this.shape = function () {
            return this.base.shape();
        };

        this.draw = function (ctx) {
            drawFunctions.drawBall(this.base.x, this.base.y, this.base.radius, ctx, settings.TempBallColor);
        };
    }
});