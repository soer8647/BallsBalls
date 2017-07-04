// Constants
var playerlength;
var playerSpeed;
var graceperiod;
var pickuplength;
var maxplayernamelength = 10;
// var mindist; //Fraction of average of width+Height // moved to initialization
// Base (might change through levels)
var maxBallspeed;
var minBallspeed;
var maxballRadius;
var minballRadius;
var initialballs; //balls at the start of the level
var levelduration; 
var tickperball; //how often new ball is created
var ballspertick; //how many balls are created at once
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
var level;


function setVariables() {
 playerlength = 18;
 playerSpeed = 7;
 graceperiod = 100;
 pickuplength = 20;
 maxBallspeed = 5;
 minBallspeed = 1;
 maxballRadius = 15;
 minballRadius = 5;
 initialballs = 1;
 levelduration = 30; 
 tickperball = 20;
 ballspertick = 1;
 stealthBallticks = 100;
 countervalue = 0;
 timeLeft = 30;
 gracetimer = 0;
 grace = false;
 playerdead = false;
 scorenotsubmitted = true;
 score = 0;
 level = 1;
 resetmovement();
}