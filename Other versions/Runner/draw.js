function drawPanels() {
    var start = rstart;
    var thecurrentpart = level.currentpart;
    console.log("Starting point: " + rstart);
    var part = level.parts[thecurrentpart];
    while(start<rend && part.start<rend) {
    drawpanel(part.start-rstart,part.length);
    thecurrentpart++;
    start = start + part.length + gap;
    part = level.parts[thecurrentpart];    
    }
}

function drawpanel(start,length) {
    console.log("length: "+length);
    graphics.drawRect(start,panelTop,start+length,panelBottom);    
}

function move(speed) {
    if (rend<length){
    rstart += speed;
    rend += speed;
    } else {
        endClock--;
        console.log(endClock);
        if(endClock<0) {
        notover = false;            
        }
    }
    
    if (level.parts[ level.currentpart ].end < rstart) {
        level.currentpart++;
    }
}