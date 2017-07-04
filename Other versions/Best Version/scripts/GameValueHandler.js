define(["SeekerBall","StealthBall"],function(SeekerBall, StealthBall) {
	function dist(x1,y1,x2,y2) {
    	return Math.sqrt(Math.pow(Math.abs(x1 - x2),2) + Math.pow(Math.abs(y1 - y2),2));
    }
	
	
return function GameValueHandler() {
	this.level = 1;
	this.maxBallspeed;
	this.minBallspeed;
	this.maxballRadius;
	this.minballRadius;
	this.initialballs; //balls at the start of the level
	this.levelduration; 
	this.tickperball; //how often new ball is created
	this.ballspertick; //how many balls are created at once
	this.basemaxBallspeed;
	this.baseminBallspeed;
	
	this.durationTickUp = 5;
	
	this.baseForDurationIncrease = 0;
	this.baseForSpeedIncrease = 2;
	this.baseForBallsPerTickIncrease = 0;
	this.baseForTicksPerBallDecrease = 3;
	
	this.ticksForDurationIncrease = 3;
	this.ticksForSpeedIncrease = 4;
	this.ticksForBallsPerTickIncrease = 5;
	this.ticksForTicksPerBallDecrease = 5;
	
	this.levelup = function(){
	this.level++;
	this.initialballs++;
	if (this.level % 2 == 0) {
		this.specialBall = StealthBall;
	} else {
		this.specialBall = SeekerBall;	
	}
	
	if ((this.level % this.ticksForDurationIncrease) + this.baseForDurationIncrease == 0) {
		this.levelduration += this.durationTickUp;
	}
	if ((this.level % this.ticksForSpeedIncrease) + this.baseForSpeedIncrease == 0) {
		this.maxBallspeed += this.basemaxBallspeed;
		this.minBallspeed += this.baseminBallspeed;
	}
	if ((this.level % this.baseForBallsPerTickIncrease) + this.baseForBallsPerTickIncrease == 0) {
		this.ballspertick++;
	}
	if ((this.level % this.baseForTicksPerBallDecrease) + this.baseForTicksPerBallDecrease == 0) {
		this.ticksperball--;
	}
	}
	
	
	this.init = function(width,height) {	
		let averageSize = (Math.abs(width) + Math.abs(height)) / 2; 
		
		this.playerLength = averageSize / 56;
		this.playerSpeed = averageSize / 143;
		this.pickupLength = averageSize / 50;
		
		this.minDist = dist(0,0,width,height) / 4;
		  
		this.graceperiod = 100;
		this.stealthBallticks = 100;
		this.maxTurn = 0.03;
		
		this.playerdead = false;
		this.scorenotsubmitted = true;
		this.score = 0;
		 
		this.level = 1;
		this.basemaxBallspeed = averageSize / 200;
		this.baseminBallspeed = averageSize / 1000;
		this.maxBallspeed = this.basemaxBallspeed;
		this.minBallspeed = this.baseminBallspeed;
		this.maxballRadius = averageSize / 70;
		this.minballRadius = averageSize / 200;
		this.initialballs = 1;
		this.levelduration = 30; 
		this.tickperball = 20;
		this.ballspertick = 1;
	}
}
})