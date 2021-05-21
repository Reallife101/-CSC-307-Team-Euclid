

const firebase = require("firebase/app") //https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js"
require("firebase/analytics") //"https://www.gstatic.com/firebasejs/8.6.1/firebase-analytics.js"
require("firebase/database") //"https://www.gstatic.com/firebasejs/8.6.1/firebase-database.js"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey:        "AIzaSyDl0gkgD1D9usTr8ngnMr5bRVu5Ac2jbmg",
    authDomain:    "euclidean-geometry-61a34.firebaseapp.com",
    databaseURL:   "https://euclidean-geometry-61a34-default-rtdb.firebaseio.com",
    projectId:     "euclidean-geometry-61a34",
    storageBucket: "euclidean-geometry-61a34.appspot.com",
    messagingSenderId: "404877681598",
    appId:         "1:404877681598:web:734231928fc50797ad0fef",
    measurementId: "G-NX9T5ZKKHL"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
get();


function get(){
    firebase.database().ref("User").set({
        name: document.getElementById("front").value,
        age:  document.getElementById("back").value
    });
    readData();
}

function readData(){
    firebase.database().ref('/').once('value', function(snapshot){
        snapshot.forEach(childSnapshot => {
            var childKey  = childSnapshot.key;
            var childData = childSnapshot.val();
            console.log(childKey + ": " + childData['name'] + ", " + childData['age']);
        });
    });
}