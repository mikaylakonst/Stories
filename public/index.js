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

window.onload = function(){
	database.ref("users").once("value").then(function(snap){
		var users = snap.val();
		var dropdown = document.getElementById("dropdown");
		for (var user in users){
			var option = document.createElement("option");
			option.value = user;
			option.innerHTML = user;
			dropdown.appendChild(option);
		}
	});
}

function logIn(){
	var dropdown = document.getElementById("dropdown");
	var user = dropdown.options[dropdown.selectedIndex].value;
	if (user == ""){
		error("Please select a name from the list");
	} else {
		sessionStorage.setItem("user", user);
		window.location.href = "inbox.html";
	}
}

function error(msg){
	document.getElementById("error").innerHTML = msg;
}