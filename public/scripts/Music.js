define(["settings"],function(settings) {
var music = new Music();

function Music() {
	this.audio = new Audio('soundFiles/Retro.wav');
	this.audio.loop = true;
	this.sounds = new Audio();
	this.muted = false;

	this.playMain = function() {
	    if (!this.muted) {
			this.audio.volume = settings.soundLevel;			
		}
		this.sounds.pause();		
		this.audio.play();	
	}
	
	this.playGameOver = function() {
		this.audio.pause();
		this.sounds.src = 'soundFiles/gameOver2.wav';
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
			this.audio.volume = settings.soundLevel;
		} else {
			this.audio.volume = 0;
		}
		this.muted = !this.muted;
	}
	
//	this.setVolume = function(value) {
//		this.audio.volume = value;
//	}
	
	this.changeVolume = function(change) {
		this.audio.volume += value;		
	}
}

return music;	
})
