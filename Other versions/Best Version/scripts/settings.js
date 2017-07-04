define([],function() {	
//Thanks http://www.w3schools.com/js/js_cookies.asp
var settings = {
 upKey: 38,
 rightKey: 39,
 leftKey: 37,
 downKey: 40,

 restartKey: 32, //spacebar
 settingsKey: 73,  // i
 highscoreKey: 72, // h
 SubmitKey: 13, //enter
 muteKey: 77, // m
 pauseKey: 80, // m
 
 controlMethod: "Arrow Keys",
 autoSubmit: false,
 playerAutoName: "",
 
 diagonalFactor: 4,
 
 setSetting: setCookie,
 getSetting: getCookie,
 updateSettings: updateSettings,
 init: updateSettings
}

function setCookie(c_name,c_value,exdays) {
	settings[c_name] = c_value;
	   var exdate=new Date();
	   exdate.setDate(exdate.getDate() + exdays);
	   document.cookie=encodeURIComponent(c_name) 
	     + "=" + encodeURIComponent(c_value)
	     + (!exdays ? "" : "; expires="+exdate.toUTCString());
	     ;
	}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function updateSettings() {
	if (getCookie("settings")) {
		setControl(getCookie("input"));
		settings.autoSubmit = getCookie("autoSubmit");
		settings.playerAutoName = getCookie("playerAutoName");
		settings.soundLevel = getCookie("soundLevel");
	}
}

function setControl(mode) {
	if (mode=="wasd") {
		settings.controlMethod = "WASD";			
		settings.upKey = 87;
		settings.leftKey = 65;
		settings.downKey = 83;
		settings.rightKey = 68;
	} else if (mode=="mouse") {
		settings.controlMethod = "Mouse";
	} else {
		settings.controlMethod = "Arrow Keys";
		settings.upKey = 38;
		settings.rightKey = 39;
		settings.leftKey = 37;
		settings.downKey = 40;	
	}
}

return settings;
})