define([],function() {	
//Thanks http://www.w3schools.com/js/js_cookies.asp
let autoSubmitDefault = false;
let playerAutoNameDefault = "";
let soundLevelDefault = 0.5;

var settings = {
 upKey: 38,
 rightKey: 39,
 leftKey: 37,
 downKey: 40,


    restartKey: 32, //spacebar
    menuChooseKey: 32,
    altMenuChooseKey: 13,
    settingsKey: 73,  // i
 highscoreKey: 72, // h
 SubmitKey: 13, //enter
 muteKey: 77, // m
 pauseKey: 80, // p
 introKey: 71,
 
 controlMethod: "Arrow Keys",
 autoSubmit: false,
 playerAutoName: "",
	soundLevel: 1,
 
 diagonalFactor: 4,
 maxPlayernameLength:10,
	playerColor:"#0095DD",
    standardBallColor:"#008000",
    stealthBallColor: "#ff0000",
    seekerBallColor:"#47b1a2",
    circlingBallColor: "#4f00b1",
    motherBallColor:"#4f00b1",
    TempBallColor:"#47b1a2",
    gameTextColor:"#dd0095",
    menuTextColor:"#00d300",
    pickupColor: "#FFA500",
	canvasBackgroundColor: "#ffffff",
	outsideBackgroundColor: "#4d4bff",

    font: "Arial",


 setSetting: setCookie,
 getSetting: getCookie,
 updateSettings: updateSettings,
 init: updateSettings
};

function setCookie(c_name,c_value,exdays) {
	settings[c_name] = c_value;
	   var exdate=new Date();
	   exdate.setDate(exdate.getDate() + exdays);
	   document.cookie=encodeURIComponent(c_name) 
	     + "=" + encodeURIComponent(c_value)
	     + (!exdays ? "" : "; expires="+exdate.toUTCString());
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return decodeURI(c.substring(name.length,c.length));
    }
    return "";
}

function updateSettings() {
	setControl(getCookie("controlMethod"));
	safeUpdateValue("autoSubmit",autoSubmitDefault);
	safeUpdateValue("playerAutoName",playerAutoNameDefault);
	safeUpdateValue("soundLevel",soundLevelDefault);
}


function safeUpdateValue(name,defaultValue) {
	let value = getCookie(name);
	if (value != null && value != undefined && value !="") {
		settings[name] = value;
	}
	else {
		settings[name] = defaultValue;
	}
}

function setControl(mode) {
	if (mode=="WASD") {
		settings.controlMethod = "WASD";			
		settings.upKey = 87;
		settings.leftKey = 65;
		settings.downKey = 83;
		settings.rightKey = 68;
	} else if (mode=="Mouse") {
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
});
