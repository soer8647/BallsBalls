function drawBall(x,y,r,ctx,color) {
		ctx.beginPath();
		ctx.arc(x, y, r, 0, Math.PI*2, false);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.closePath();
}

function drawRect(x,y,w,h,ctx,color) {
	ctx.beginPath();
	ctx.rect(x,y,w,h);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
}