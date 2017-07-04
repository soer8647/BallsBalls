var length = 2000;
var gap = 500;
var mindistance = 100;
var maxdistance = 100;
var level = generateLevel(length, mindistance, maxdistance, gap);
var width = 400;
var height = 300;
var notover = true;
var endClock = width;

printLevel(level);

var panelTop = height / 2;
var panelBottom = height;
var rstart = 0;
var rend = width;

var container = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(width, height, {
    backgroundColor: 0x65C25D
});
var graphics = new PIXI.Graphics();

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);


// create a texture from an image path
var texture = PIXI.Texture.fromImage("bunny.png");
// create a new Sprite using the texture
var bunny = new PIXI.Sprite(texture);

// center the sprites anchor point
bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;

// move the sprite t the center of the screen
bunny.position.x = 200;
bunny.position.y = 150;

container.addChild(bunny);

graphics.beginFill(0xFFFFF0);
graphics.lineStyle(5, 0xFF0000);

for(var i=0; i<length ; i+=100) {
    graphics.drawRect(i,panelTop+50,i+100,panelBottom);
}
container.addChild(graphics);

requestAnimationFrame(animate);

function animate() {
    if(notover) {
    requestAnimationFrame(animate);

    // just for fun, lets rotate mr rabbit a little
    bunny.rotation += 0.1;
    graphics.clear();
    graphics.beginFill(0xFFFFF0);
        graphics.lineStyle(5, 0xFF0000);

    drawPanels();
    move(1);    
    // render the stage   
    renderer.render(container);
    } else {
        console.log("over");
        window.location.href = "www.google.com";
    }
    
}