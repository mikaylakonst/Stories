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
	database.ref("stories").once("value").then(function(snap){
		var stories = snap.val();
		for (var story_id in stories){
			var story = stories[story_id];

			if (story.published == true){
				addStory(story_id);
			}
		}
	});
}

function welcome(){
	currentUser = sessionStorage.user;
	document.getElementById("welcome").innerHTML = "Welcome, " + currentUser + "!";
}

function addStory(story_id){
	database.ref("stories/" + story_id).once("value").then(function(s){
		var story_info = s.val();
		var title = story_info["title"];

		var story = document.createElement("li");
		story.innerHTML = title;
		story.onclick = function(){
			sessionStorage.setItem("story_id", story_id);
			window.location.href = "viewStory.html";
		};
		var inbox = document.getElementById("stories");
		inbox.appendChild(story);
	});

}