// Constants
var playerlength;
var playerSpeed;
var graceperiod;
var pickuplength;
var maxplayernamelength = 10;
// var mindist; //Fraction of average of width+Height // moved to initialization
// Base (might change through levels)
var stealthBallticks;
// Counter variables:
var countervalue;
var timeLeft;
var gracetimer;
// mode
var grace;
var playerdead;
var scorenotsubmitted;
// progess
var score;


function setVariables() {
 let averageSize = (Math.abs(width) + Math.abs(height)) / 2; 
 playerlength = averageSize / 56;
 playerSpeed = averageSize / 143;
 pickuplength = averageSize / 50;
  
 graceperiod = 100;
 timeLeft = 30;
 stealthBallticks = 100;

 countervalue = 0;
 gracetimer = 0;

 grace = false;
 playerdead = false;
 scorenotsubmitted = true;
 score = 0;
 resetmovement();
}