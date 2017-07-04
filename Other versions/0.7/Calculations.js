	// Shape objects:
	function circle(x,y,radius) {
    	this.x = x;
    	this.y = y;
    	this.r = radius;
    }
    
    function rectangle(x,y,width,height) {
    	this.x = x;
    	this.y = y;
    	this.w = width;
    	this.h = height;
    }
    
	//distance calculator (between two points)
    function dist(x1,y1,x2,y2) {
    	return Math.sqrt(Math.pow(Math.abs(x1 - x2),2) + Math.pow(Math.abs(y1 - y2),2));
    }
   
    function randomsign() {
    	var i = random(0, 1);
    	if (i == 0) {
    		return -1;
    	} else {
    		return 1;
    	}
    }
	function sign(i) {
		if (i > 0) {
			return 1;
		} else if (i < 0) {
			return -1;
		} else {
			return 0;
		}
	}
	
    function random(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    function CircleCircleColliding(c1,c2) {
    	var dist = dist(c1.x , c1.y , c2.x , c2.y);
    	if (dist < Math.max(c1.r,c2.r)) {
    		return true;
    	}
    		return false;
    }
	
	function RectRectColliding(r1,r2) {
		var distX = Math.abs(r1.x + r1.w/2 - r2.x - r2.w/2);
		var distY = Math.abs(r1.y + r1.h/2 - r2.y - r2.h/2);
		
		if (distX > (r1.w + r2.w)/2) {
			return false;
		} else if (distY > (r1.h + r2.h)/2) {
			return false;
		} else {
			return true;
		}
		
	}
    
	function RectCircleColliding(circle,rect){
	        var distX = Math.abs(circle.x - rect.x-rect.w/2);
	        var distY = Math.abs(circle.y - rect.y-rect.h/2);
	
	        if (distX > (rect.w/2 + circle.r)) { return false; }
	        if (distY > (rect.h/2 + circle.r)) { return false; }
	
	        if (distX <= (rect.w/2)) { return true; } 
	        if (distY <= (rect.h/2)) { return true; }
	
	        var dx=distX-rect.w/2;
	        var dy=distY-rect.h/2;
	        return (dx*dx+dy*dy<=(circle.r*circle.r));
   }