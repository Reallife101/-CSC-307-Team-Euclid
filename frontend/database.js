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
function write(cardSet, password){
    firebase.database().ref(password).set(cardSet);
}
function read(password, author=""){
    firebase.database().ref(password).once('value', (snapshot)=>{
        if(!snapshot.exists()){
            console.log("404 : Does not exist");
            return;
        }else{
            snapshot.forEach(childSnapshot => {
                //var childKey  = childSnapshot.key;
                var childData = childSnapshot.val();
                //console.log(childKey + ": " + childData);
                if(author != childData["author"])
                    return;
                return childData;
            });
        }
    });
}

var express = require('express')
var app = express()

// deletes set

// next card
function nextCard(){
    // gets the current card
    var get = getCardHTML();
    // clears current card
    document.getElementById("frontText").innerHTML = "";
    document.getElementById("backText").innerHTML  = "";
    // add to current set
    if (document.getElementById("cardButtonList").innerHTML=="")
        document.getElementById("cardButtonList").innerHTML+= get
    else
        document.getElementById("cardButtonList").innerHTML=get;
    
    // save set
    addCard(get);
    save();
}
// search (read) flashcard set
// returns all sets of the given author
function findSet(author){
    // gets all sets
    // if a set is by an author,
    // add to list of cards by author
    // returns list
    // if empty notify could not find
}

// edit (read/write) their flashcard set
function editSet(password){}

// copy set/card
function copySet(){
    // takes a given set
    // copy card set
    // add to current set
    // save()
}

// save set
function save(password){
    var readSet = read(password);
    if(readSet){
        console.log("Unable to save")
        return;
    }
    write(readSet['uid'], readSet["password"], updateSet(), readSet["author"]);
}

// prompts user to enter password
function enterPassword(getSet){
    var password = prompt("Please enter your password:", "My belts are garbage -Mike Tyson");
    while(password == null || password == ""){ //|| getSet.checkPassword(password)){
        alert("Incorrect Password. Try again");
        password = prompt("Please enter your password:", "Harry Potter");
    }
    return password;
}

// remove (write) card from set
function removeCard(){
    // remove (write) set
    // confirm remove/delete
}
// quiz


// asks to do Delete
function confirmDelete(){
    var asking = "Would you like to do like to delete this card?";
    //notify user
    // if agrees
    // deletes
    // else do nothing
}

function confirmSave(){
    var asking = "Would you like to do like to delete this card?";
    //notify user
    // if agrees
    // deletes
    // else do nothing
}

// get card from HTML page
// NOTE: I dont know how its called, but assumed it will be called somehow
function getCardHTML(){
    var front = document.getElementById("frontText").value;
    var back  = document.getElementById("backText").value;
    return {front: front, back: back};
}
function enterAuthor(){
    var author = prompt("Please enter your name:", "Harry Potter");
    while(password == null || password == ""){
        alert("Your name cannot be empty");
        author = prompt("Please enter your name:", "Harry Potter");
    }
    return author;
}