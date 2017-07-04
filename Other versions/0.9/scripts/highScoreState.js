define(["Leaderboard"],function(leaderboard) {
	let site = '<div class="div-table">        <table border="1" style="width: 100%" id="items">			<tr>				<td>Rank</td>				<td>Name</td>				<td>Level</td>				<td>Score (Squares Gathered)</td>			<td>Control Method</td>			</tr>        </table>    </div>		<br/><button id="returnToMenu" type="button">Return to menu</button> ';
	let outerDiv = document.getElementById("outerDiv");

	let highscoreState = function (controller,values) {
		this.init = function() {
			outerDiv.innerHTML = site;
			document.getElementById("returnToMenu").addEventListener("click", 
			function() {
				controller.changeState("menuState");
			});
			leaderboard.getandgo(function(list) {
				let table = document.getElementById("items");
				var index, len;
				for (index = Math.min(list.length-1,10), len = 0; index >= len; --index) {		
					addRow(table,list[index]);
				}
			}, 10);
		}

		this.end = function() {
			outerDiv.innerHTML = "";
		}
		
		this.keydownHandler = function(e) {
			if (e.keyCode == 77) { // m
				controller.changeState("menuState");
			}		
		}
		this.keyupHandler = function(e) {
		}
	}
	
	function addRow(table, data) { //adding a simple row
		var rownumber = table.rows.length;
		var row = table.insertRow(rownumber);
		
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		 
		cell1.innerHTML = rownumber;
		cell2.innerHTML = data.name;
		cell3.innerHTML = data.level;    
		cell4.innerHTML = data.score;
		cell5.innerHTML = data.method;
	}
	
	return highscoreState;
});