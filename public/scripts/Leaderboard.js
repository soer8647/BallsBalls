define(function() {
let firebaseURI = "https://leaderboard-bf98b.firebaseio.com";
	
  var config = {
    apiKey: "AIzaSyDnQy8gUVUldROZM3hxjg2_M3FE7Yg_cSc",
    authDomain: "leaderboard-bf98b.firebaseapp.com",
    databaseURL: "https://leaderboard-bf98b.firebaseio.com",
    storageBucket: "leaderboard-bf98b.appspot.com"
  };
  firebase.initializeApp(config);

let Leaderboard = function(){
	this.firebase = firebase.database();
//     this.firebase.ref("scores").orderByChild("score").limitToLast(5).on("value", (value) => {
//         this.scores = value.val()
// });
    this.add = function(data) {
        this.firebase.ref("scores").push(data).setPriority(data.score)
    };

	/*
	* assumed that data is valid
	*/
	this.addandgo = function(data,go) {
         this.firebase.ref("scores").push(data).setPriority(data.score).then(go, function(){
			 console.log("fail");
		 });		
    };
	
    this.get = function() {
		throw new Error("this shouldn't happen");
		var list = [];
		var running = true;
		this.firebase.ref("scores").orderByChild("score").once("value").then(
		function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				list.push(childSnapshot.val());
			});
			running = false;
		});
    };

    this.getandgo = function (go, limit, ordering) {
        let query = this.firebase.ref("scores").orderByChild(ordering);
		if (limit!=null) {
			query = query.limitToLast(limit);
		}
		query.once("value").then(
		function(snapshot) {
			let list = [];
			snapshot.forEach(function(childSnapshot) {
				list.push(childSnapshot.val());
			});
			go(list);
		});
	};
};

return new Leaderboard();
});