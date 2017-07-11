var fs = require('fs');
var entries = JSON.parse(fs.readFileSync('data.json', 'utf8'));
entries = entries.scores;
var arr = [];
for (var key in entries) {
    if (entries.hasOwnProperty(key)) {
        entries[key].id = key;
        arr.push(entries[key]);
    }
}
let contains = function (array, ele) {
    return array.indexOf(ele) > -1;
};
let sort = function (order) {
    return function (a, b) {
        if (a[order] < b[order])
            return 1;
        if (a[order] > b[order])
            return -1;
        return 0;
    };
};
arr.sort(sort("score"));
var bestScores = arr.slice(0, 10);
arr.sort(sort("level"));
var bestLevels = arr.slice(0, 10);
var finalEntries = {};
for (x in arr) {
    let item = arr[x];
    if (contains(bestScores, item) || contains(bestLevels, item)) {
        finalEntries[item.id] = item;
        delete x.id;
    }
}
let data = {scores: finalEntries};
fs.writeFileSync('./data.json', JSON.stringify(data), 'utf-8'); 
