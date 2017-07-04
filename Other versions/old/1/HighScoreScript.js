window.onload = function() {
    var table = document.getElementById("items");
	initializeFirebase();
	var leaderboard = new Leaderboard("https://leaderboard-bf98b.firebaseio.com");
	leaderboard.getandgo(function(list) {
	var index, len;
	for (index = Math.min(list.length-1,10), len = 0; index >= len; --index) {		
		addRow(table,list[index]);
		}
	}, 10
	);

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