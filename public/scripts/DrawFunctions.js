define(["settings"],function(settings) {
function drawBall(x,y,r,ctx,color) {
		ctx.beginPath();
		ctx.arc(x, y, r, 0, Math.PI*2, false);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.closePath();
}
	function setFont(canvas,quotent,fillStyle) {
        canvas.ctx.font = (canvas.width/quotent)+"px " + settings.font;
        canvas.ctx.fillStyle = fillStyle;
    }

function drawRect(x,y,w,h,ctx,color) {
	ctx.beginPath();
	ctx.rect(x,y,w,h);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
}
return {
	drawBall: drawBall,
	drawRect: drawRect,
	setFont: setFont
}	
});