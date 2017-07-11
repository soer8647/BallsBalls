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
        htmlBuilder.write(outerDiv, "Filter:");
        outerDiv.appendChild(htmlBuilder.makeSelect("filter", ["all", "mouse", "keys"]));
        htmlBuilder.addSpace(outerDiv, 2);
        outerDiv.appendChild(htmlBuilder.makeInput("returnToMenu", "button", "Return to menu"));
        htmlBuilder.addSpace(outerDiv, 1);
    }

    function loadDataforTable() {
        let order = document.getElementById("ordering").value;
        let filter = document.getElementById("filter").value;
        if (filter == "all") {
            filter = undefined;
        }
        leaderboard.getandgo(loadTable, 10, order, filter);
    }

    let highscoreState = function (controller, values) {
        this.init = function () {
            setUpPage();
            document.getElementById("returnToMenu").addEventListener("click",
                function () {
                    controller.changeState("menuState");
                });

            document.getElementById("ordering").addEventListener("change", function (e) {
                loadDataforTable();
            });

            document.getElementById("filter").addEventListener("change", function (e) {
                loadDataforTable();
            });

            loadDataforTable();
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