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
var story_id;
var contributions;

function load(){
	welcome();
	loadStory();
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

function loadStory(){
	story_id = sessionStorage.story_id;
	database.ref("stories/" + story_id).once("value").then(function(snap){
		var storyInfo = snap.val();
		var title = storyInfo["title"];
		var parts = storyInfo["parts"];
		contributions = Object.keys(parts).length;
		var latestPart = parts["part" + String(contributions)];
		var author = latestPart["author"];
		var text = latestPart["text"];
		populateFields(title, author, text);
	});
}

function populateFields(title, author, text){
	document.getElementById("title").innerHTML = title;
	document.getElementById("author").innerHTML = "Latest contribution (" + author + "):";
	document.getElementById("text").innerHTML = text;
}

function send(){
	var text = document.getElementById("newtext").value;
	var dropdown = document.getElementById("dropdown");
	var recipient = dropdown.options[dropdown.selectedIndex].value;
	if (text == ""){
		error("Error: text of story cannot be empty!");
	} else if (recipient == ""){
		error("Error: you must choose someone to continue the story!");
	} else if (currentUser == null) {
		error("Error: you must be logged in to continue a story!");
	} else {
		var updates = {};
		updates["stories/" + story_id + "/parts/part" + String(contributions + 1)] = {
			author : currentUser,
			text : text
		};
		
		updates["users/" + currentUser + "/inbox/" + story_id] = null;
		if (recipient == "nobody"){
			updates["stories/" + story_id + "/published"] = true;
		} else {
			updates["users/" + recipient + "/inbox/" + story_id] = true;
		}
		database.ref().update(updates);
		window.location.href = "inbox.html";
	}
}