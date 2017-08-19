// Initialize Firebase
var config = {
	apiKey: "AIzaSyDVRoOY_co7rwoBNDrv-C8P46CBanGNF_A",
	authDomain: "stories-b94e7.firebaseapp.com",
	databaseURL: "https://stories-b94e7.firebaseio.com",
	projectId: "stories-b94e7",
	storageBucket: "stories-b94e7.appspot.com",
	messagingSenderId: "967741365555"
};
firebase.initializeApp(config);
var database = firebase.database();
var currentUser;

window.onload = load;

function load(){
	welcome();
	database.ref("users").once("value").then(function(snap){
		var users = snap.val();
		var dropdown = document.getElementById("dropdown");
		for (var user in users){
			if (user != currentUser){
				var option = document.createElement("option");
				option.value = user;
				option.innerHTML = user;
				dropdown.appendChild(option);
			}
		}
		// add a "nobody" option
		var option = document.createElement("option");
		option.value = "nobody";
		option.innerHTML = "Nobody! The story is done. Publish it!";
		dropdown.appendChild(option);
	});
}

function welcome(){
	currentUser = sessionStorage.user;
	document.getElementById("welcome").innerHTML = "Welcome, " + currentUser + "!";
}

function randid() {
	var id = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	for (var i = 0; i < 5; i++){
		id += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return id;
}

function send(){
	var title = document.getElementById("title").value;
	var text = document.getElementById("text").value;
	var dropdown = document.getElementById("dropdown");
	var recipient = dropdown.options[dropdown.selectedIndex].value;
	if (title == ""){
		error("Error: title cannot be empty!");
	} else if (text == ""){
		error("Error: text of story cannot be empty!");
	} else if (recipient == ""){
		error("Error: you must choose someone to continue the story!");
	} else if (currentUser == null) {
		error("Error: you must be logged in to start a story!");
	} else {
		var id = randid();
		var updates = {};
		var publish = (recipient == "nobody");
		updates["stories/" + id] = {
			title : title, 
			published : publish,
			parts : {
				part1 : {
					author : currentUser,
					text : text
				}
			}
		};
		if (recipient != "nobody"){
			updates["users/" + recipient + "/inbox/" + id] = true;
		}
		database.ref().update(updates);
	}
}

function error(msg){
	var error = document.getElementById("error");
	error.innerHTML = msg;
}