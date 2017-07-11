define(["SeekerBall", "StealthBall", "CirclingBall"], function (SeekerBall, StealthBall, CirclingBall) {
	function dist(x1,y1,x2,y2) {
    	return Math.sqrt(Math.pow(Math.abs(x1 - x2),2) + Math.pow(Math.abs(y1 - y2),2));
    }
	
	//checks if addBall-tick has come (and counts up)

	
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
    this.specialBalls = [SeekerBall, StealthBall, CirclingBall];

	this.durationTickUp = 60;
	
	this.baseForDurationIncrease = 0;
	this.baseForSpeedIncrease = 2;
	this.baseForBallsPerTickIncrease = 0;
	this.baseForTicksPerBallDecrease = 3;
	
	this.ticksForDurationIncrease = 2;
	this.ticksForSpeedIncrease = 4;
	this.ticksForBallsPerTickIncrease = 5;
	this.ticksForTicksPerBallDecrease = 5;
	
	this.levelup = function(){
	this.level++;
	this.initialballs++;
        this.specialBall = this.specialBalls[this.level % this.specialBalls.length];
	
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
		this.tickperball--;
	}

	};
	
	let countervalue = 0;
	
	this.count = function () {
		this.timeLeft--;
		this.secondsLeft = Math.floor(this.timeLeft/this.updatesPerSecond);
		countervalue++;
		if (countervalue > this.tickperball) {
			countervalue = 0;
			return true;
		}
		return false;
	};
	
	
		
	this.init = function(width,height) {	
		this.initialballs = 1;
		this.levelduration = 600; 
		this.tickperball = 20;
		this.ballspertick = 1;
		
		
		
		
		this.timeLeft = this.levelduration;	
		this.updatesPerSecond = 60;
		
		
		
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

		this.refreshTime = 1000/this.updatesPerSecond;
	}
}
});