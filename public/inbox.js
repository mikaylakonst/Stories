// Initialize Firebase
var config = {
    apiKey: "AIzaSyBd1iX35JTMk5rCeyit5tZJvRFAVlZRVF4",
    authDomain: "storiescss.firebaseapp.com",
    databaseURL: "https://storiescss.firebaseio.com",
    projectId: "storiescss",
    storageBucket: "storiescss.appspot.com",
    messagingSenderId: "703100346548"
  };
firebase.initializeApp(config);
var database = firebase.database();
var currentUser;
window.onload = load;

function load(){
	welcome();
	database.ref("users/" + currentUser + "/inbox/").once("value").then(function(snap){
		var inbox = snap.val();
		for (var story_id in inbox){
			if (story_id != "hack"){
				addStory(story_id);
			}
		}
		var inboxCount = Object.keys(inbox).length - 1; // minus 1 for the hack
		if (inboxCount == 0){
			emptyMessage();
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
			window.location.href = "addToStory.html";
		};
		var inbox = document.getElementById("inbox");
		inbox.appendChild(story);
	});
}

function emptyMessage(){
	var msg = document.createElement("p");
	msg.innerHTML = "Looks like nobody has sent you anything yet!";
	var body = document.getElementById("body");
	body.appendChild(msg);
}