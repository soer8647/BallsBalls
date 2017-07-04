var music = new Music();

function Music() {
	this.audio = new Audio('Retro.wav');
	this.audio.loop = true;
	this.sounds = new Audio();
	this.volume = 1;
	this.muted = false;

	this.playMain = function() {
		this.sounds.pause();
		this.audio.play();	
	}
	
	this.playGameOver = function() {
		this.audio.pause();
		this.sounds.src = 'gameOver2.wav';
		this.sounds.play();
	}
	
	this.playPause = function() {
		this.audio.pause();		
	}
	
	this.pause = function() {
		this.audio.pause();
	}
	
	this.stop = function() {
		this.audio.pause();
	}
	
	this.toggleMute = function() {
		if (this.muted) {
			this.audio.volume = this.volume;
		} else {
			this.audio.volume = 0;
		}
		this.muted = !this.muted;
	}
	
	this.setVolume = function(value) {
		this.audio.volume = value;
	}
	
	this.changeVolume = function(change) {
		this.audio.volume += value;		
	}
	

}
