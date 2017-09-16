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