function Level() {
    this.parts  = [];
    this.addpart = function(part) {
        this.parts.push(part);
    }   
    this.currentpart = 0;
}

function Part(start, end) {
    this.start = start;
    this.end = end;
    this.length = end - start;
}


function printLevel(thelevel){
    var parts = thelevel.parts;
    for(var i = 0; i < parts.length; i++){
        var part = parts[i];
        console.log("from " + part.start + " , to " + part.end);
    }
}


function generateLevel(length,mindist,maxdist,gap) {
    var newlevel = new Level();
    var lengthused = 0;
    var partlength;
    var newpart;
    
    while(lengthused+maxdist<length) {
    partlength = random(mindist,maxdist);
    newpart = new Part(lengthused,lengthused+partlength);
    lengthused += partlength+gap;
    newlevel.addpart(newpart);
    }
    newpart = new Part(lengthused,length);
    newlevel.addpart(newpart);    
    return newlevel;
}




    function random(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
    }
