define(["DrawFunctions", "Calculations", "Ball", "./settings"], function (drawFunctions, Calculations, Ball, settings) {

    return function MotherBall(startx, starty, vx, vy, radius, commonValues) {
        this.base = new Ball(startx, starty, 0, 0, radius, commonValues);
        let cooldown = 50;
        let heat = 0;

        this.move = function () {
            let vx = 1;
            let vy = 1;
            if (heat===0) {
                commonValues.addObject(this.base.x,this.base.y,0);
                heat = cooldown;
            } else {
                heat--;
            }

        };

        this.shape = function () {
            return this.base.shape();
        };

        this.draw = function (ctx) {
            drawFunctions.drawBall(this.base.x, this.base.y, this.base.radius, ctx, settings.motherBallColor);
        };
    }
});