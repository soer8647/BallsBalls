function initializeFirebase(){
  var config = {
    apiKey: "AIzaSyDnQy8gUVUldROZM3hxjg2_M3FE7Yg_cSc",
    authDomain: "leaderboard-bf98b.firebaseapp.com",
    databaseURL: "https://leaderboard-bf98b.firebaseio.com",
    storageBucket: "leaderboard-bf98b.appspot.com",
  };
  firebase.initializeApp(config);
}

class Leaderboard {
    constructor(firebaseURL) {
		this.firebase = firebase.database();
        this.firebase.ref("scores").orderByChild("score").limitToLast(5).on("value", (value) => {
            this.scores = value.val()
        })
    }
    add(data) {
        if(!data.name || data.name.length > maxplayernamelength) {
            throw new Error("Requires a valid name.")
        } else if(!data.score || isNaN(data.score)) {
            throw new Error("Requires a valid score.")
        } else {
            this.firebase.ref("scores").push(data).setPriority(data.score)
        }
    }
	addandgo(data,go) {
        if(!data.name || data.name.length > maxplayernamelength) {
            throw new Error("Requires a valid name.")
        } else if(!data.score || isNaN(data.score)) {
            throw new Error("Requires a valid score.")
        } else {
            this.firebase.ref("scores").push(data).setPriority(data.score).then(go);
        }
    }
	
    get() {
		var list = [];
		var running = true;
		this.firebase.ref("scores").orderByChild("score").once("value").then(
		function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				list.push(childSnapshot.val());
			})
			running = false;
		});
    }
	getandgo(go) {
		var list = [];
		this.firebase.ref("scores").orderByChild("score").once("value").then(
		function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				list.push(childSnapshot.val());
			});
			go(list);
		});
	}
}

function add(data) {
        addandgo(data,function(){});
}
function addandgo(data,go) {
        if(!data.name || data.name.length > maxplayernamelength) {
            throw new Error("Requires a valid name.")
        } else if(!data.score || isNaN(data.score)) {
            throw new Error("Requires a valid score.")
        } else {
            firebase.database().ref("scores").push(data).setPriority(data.score).then(go);
		}
}
function getandgo(go) {
		var list = [];
		firebase.database().ref("scores").orderByChild("score").once("value").then(
		function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				list.push(childSnapshot.val());
			});
			go(list);
		});
}