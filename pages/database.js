import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { request } = require("express");
const firebase = require("firebase/app") //https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js"
require("firebase/analytics")            //"https://www.gstatic.com/firebasejs/8.6.1/firebase-analytics.js"
require("firebase/database")             //"https://www.gstatic.com/firebasejs/8.6.1/firebase-database.js"

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

// write to database
// read to database
function write(cardSet, password){firebase.database().ref(password).set(cardSet);}
async function read(password){
    return firebase.database().ref().child(password).get().then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        }else{
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

export { read, write };