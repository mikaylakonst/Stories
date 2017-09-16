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
}

function loadStory(){
	story_id = sessionStorage.story_id;
	database.ref("stories/" + story_id).once("value").then(function(snap){
		var storyInfo = snap.val();
		populateFields(storyInfo);
	});
}

function welcome(){
	currentUser = sessionStorage.user;
	document.getElementById("welcome").innerHTML = "Welcome, " + currentUser + "!";
}

function populateFields(storyInfo){
	// populate title field
	var title = storyInfo["title"];
	document.getElementById("title").innerHTML = title;

	// populate list items for parts of the story
	var parts = storyInfo["parts"];
	var contributions = Object.keys(parts).length;
	var div = document.getElementById("parts");
	for (var i = 1; i <= contributions; i++){
		var partInfo = parts["part" + i];
		var author = partInfo["author"];
		var text = partInfo["text"];
		var authorElem = document.createElement("h2");
		authorElem.innerHTML = author;
		authorElem.class = "author";
		var textElem = document.createElement("p");
		textElem.innerHTML = text;
		div.appendChild(authorElem);
		div.appendChild(textElem);
	}
}