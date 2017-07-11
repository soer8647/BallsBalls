define(["Leaderboard", "./htmlBuilder"], function (leaderboard, htmlBuilder) {


    function setUpPage() {
        let outerDiv = document.getElementById("outerDiv");
        let table = '<div class="div-table" >        ' +
            '<table border="1" style="width: 100%">			' +
            '<thead>' +
            '<tr>				' +
            '<td>Rank</td>				' +
            '<td>Name</td>				' +
            '<td>Level</td>				' +
            '<td>Score (Squares Gathered)</td>			' +
            '<td>Control Method</td>			' +
            '</tr>' +
            '</thead><tbody id="items">' +
            '</tbody>        ' +
            '</table>    ' +
            '</div>		';
        outerDiv.innerHTML = table;
        htmlBuilder.addSpace(outerDiv, 1);
        htmlBuilder.write(outerDiv, "Sort after:");
        outerDiv.appendChild(htmlBuilder.makeSelect("ordering", ["score", "level"]));
        htmlBuilder.addSpace(outerDiv, 2);
        outerDiv.appendChild(htmlBuilder.makeInput("returnToMenu", "button", "Return to menu"));
    }

    let highscoreState = function (controller, values) {
        this.init = function () {
            setUpPage();
            document.getElementById("returnToMenu").addEventListener("click",
                function () {
                    controller.changeState("menuState");
                });

            let order = document.getElementById("ordering").value;
            document.getElementById("ordering").addEventListener("change", function (e) {
                order = document.getElementById("ordering").value;
                leaderboard.getandgo(loadTable, 10, order);
            });

            leaderboard.getandgo(loadTable, 10, order);
        };

        this.end = function () {
            outerDiv.innerHTML = "";
        };

        this.keydownHandler = function (e) {
            if (e.keyCode == 77) { // m
                controller.changeState("menuState");
            }
        };
        this.keyupHandler = function (e) {
        }
    };

    let loadTable = function (list) {
        let table = document.getElementById("items");
        table.innerHTML = "";
        table.remo;
        var index, len;
        for (index = Math.min(list.length - 1, 10), len = 0; index >= len; --index) {
            addRow(table, list[index]);
        }
    };

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