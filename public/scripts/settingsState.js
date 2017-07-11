define(["settings", "./htmlBuilder"], function (settings, htmlBuilder) {
    var controlMethods = ["Mouse", "WASD", "Arrow Keys"];

    initiateListeners = function (controller) {
        var confirmButton = document.getElementById("confirm");
        var cancelButton = document.getElementById("cancel");
        var aSubmit = document.getElementById("autoSubmit");
        var input = document.getElementById("inputMethod");
        var name = document.getElementById("playerName");
        var sound = document.getElementById("sound");
        addEventListener(confirmButton, "click", function () {
            let playername = name.value;
            if (((playername.length <= 0) || (playername.length > settings.maxPlayernameLength)) && aSubmit.checked){
                alert("invalid name, max length is 10 characters!");
            } else {
                settings.setSetting("settings", true, 100);
                settings.setSetting("playerAutoName", name.value, 100);
                settings.setSetting("controlMethod", input.value, 100);
                settings.setSetting("autoSubmit", aSubmit.checked, 100);
                settings.setSetting("soundLevel", sound.value, 100);
                settings.updateSettings();
                controller.changeState("menuState");
            }
        });

        addEventListener(cancelButton, "click", function () {
            controller.changeState("menuState");
        });

        //load settings
        if (settings.getSetting("settings")) {
            if (settings.autoSubmit == "false") {	 	//fucking js
                aSubmit.checked = false;
            } else {
                aSubmit.checked = true;
            }
            name.value = settings.playerAutoName;
            sound.value = settings.soundLevel;
            var inputVal = settings.controlMethod;
            var options = input.options;
            for (var i = 0; i < options.length; i++) {
                var option = options[i];
                if (option.value.toLowerCase() == inputVal.toLowerCase()) {
                    input.selectedIndex = i;
                }
            }
        }
    };

    function addEventListener(myNode, eventType, myHandlerFunc) {
        if (myNode.addEventListener)
            myNode.addEventListener(eventType, myHandlerFunc, false);
        else
            myNode.attachEvent("on" + eventType,
                function (event) {
                    myHandlerFunc.call(myNode, event);
                });
    }

    function setUpPage() {
        let heading = document.createElement("h1");
        htmlBuilder.write(heading, "Settings for BallsBalls");
        outerDiv.appendChild(heading);

        heading = document.createElement("h3");
        htmlBuilder.write(heading, "Made by Søren Oehlenschlæger Hjort");
        outerDiv.appendChild(heading);

        htmlBuilder.write(outerDiv, "Uses Cookies to save setttings");
        htmlBuilder.addSpace(outerDiv, 2);
        htmlBuilder.write(outerDiv, "Input Method:");

        outerDiv.appendChild(htmlBuilder.makeSelect("inputMethod", controlMethods));

        htmlBuilder.addSpace(outerDiv, 2);
        htmlBuilder.write(outerDiv, "Auto submit score after game:");
        htmlBuilder.addSpace(outerDiv, 1);
        outerDiv.appendChild(htmlBuilder.makeInput("autoSubmit", "checkbox", ""));
        htmlBuilder.addSpace(outerDiv, 1);

        htmlBuilder.write(outerDiv, "Name for Auto submit: ");
        htmlBuilder.addSpace(outerDiv, 1);
        outerDiv.appendChild(htmlBuilder.makeInput("playerName", "text", ""));
        htmlBuilder.addSpace(outerDiv, 2);
        htmlBuilder.write(outerDiv, "sound level:");

        htmlBuilder.addSpace(outerDiv, 1);
        let sound = htmlBuilder.makeInput("sound", "range", "");
        sound.min = 0;
        sound.step = 0.1;
        sound.max = 1;
        outerDiv.appendChild(sound);
        htmlBuilder.addSpace(outerDiv, 2);

        outerDiv.appendChild(htmlBuilder.makeInput("cancel", "button", "Cancel Changes"));
        outerDiv.appendChild(htmlBuilder.makeInput("confirm", "button", "Confirm Changes"));
        htmlBuilder.addSpace(outerDiv, 1);
    }

    let outerDiv = document.getElementById("outerDiv");

    return function settingsState(controller, canvas) {
        this.init = function () {
            //outerDiv.innerHTML = '<h1>Settings for BallsBalls</h1><h3>Made by Søren Oehlenschlæger Hjort</h3>    Uses Cookies To save     <br/> 	     <br/>          Input Method:     <select id="input method">     <option value="Mouse">Mouse</option>     <option value="WASD">WASD</option>     <option value="Arrow Keys">Arrow Keys</option>     </select>          <br/>     <br/> 	 	Auto submit score after game: 	<br/> 	<input id="autoSubmit" type="checkbox"/> 	<br/> 	Name for Auto submit: 	<br/> 	<input id="playerName" type="text" name="playerName"> 	     <br/>     <br/>          <input type="button" id="cancel" value="Cancel Changes"> 	<input type="button" id="confirm" value="Confirm Changes"> ';
            setUpPage();
            initiateListeners(controller);
        };
        this.end = function () {
            document.getElementById("outerDiv").innerHTML = "";
        };
        this.keydownHandler = function (e) {
        };

        this.keyupHandler = function (e) {
        }
    }
});
