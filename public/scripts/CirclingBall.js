define(["DrawFunctions", "Calculations", "Ball", "./settings"], function (drawFunctions, Calculations, Ball, settings) {

    return function CirclingBall(startx, starty, vx, vy, radius, commonValues) {
        this.target = commonValues.pickup;
        this.base = new Ball(startx, starty, vx, vy, radius, commonValues);
        this.speed = Math.PI / 70;
        this.angle = Math.random() * Math.PI * 2;
        this.circleRadius = commonValues.height / 15;
        this.currentDirection = 0;

        this.move = function () {
            let target = this.target();
            this.angle += this.speed;
            this.base.x = target.x + target.width / 2 + Math.cos(this.angle) * this.circleRadius;
            this.base.y = target.y + target.height / 2 + Math.sin(this.angle) * this.circleRadius;
            console.log(this.base.x, this.base.y);
        };

        this.shape = function () {
            return this.base.shape();
        };

        this.draw = function (ctx) {
            drawFunctions.drawBall(this.base.x, this.base.y, this.base.radius, ctx, settings.circlingBallColor);
        };
    }
});