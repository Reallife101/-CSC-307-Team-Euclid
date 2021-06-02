import {Card, CardSet} from "../card.js";
import { readFromFirebase } from "../database.js";

loadSets();
/*
document.getElementById("searchButton").onclick = () => {
    var getSearchVal = document.getElementById("searchTerm").value;
    if(getSearchVal != null){
        search(getSearchVal);
    }
}*/

function createEntry(set){
    console.log(set);
    //Container
    var container = document.getElementById("container");
    //Entry
    var newEntry = document.createElement("div");
    newEntry.className = "border4";

    //First Third
    var firstThird = document.createElement("div");
    firstThird.className = "third";
    
    var firstText = document.createElement("div");
    firstText.className = "text1";
    firstText.innerText = set.id;

    firstThird.append(firstText);
    newEntry.append(firstThird);

    //Second Third
    var secondThird = document.createElement("div");
    secondThird.className = "third";

    var secondText = document.createElement("div");
    secondText.className = "text1";
    secondText.innerText = String(set.cards.length) + " Cards";

    secondThird.append(secondText);
    newEntry.append(secondThird);

    //Third Third
    var thirdThird = document.createElement("div");
    thirdThird.className = "third";

    var thirdBorder = document.createElement("div");
    thirdBorder.className = "border3";

    var studyCouple = document.createElement("div");
    studyCouple.className = "couple";

    var editCouple = document.createElement("div");
    editCouple.className = "couple";

    var studyButton = document.createElement("button");
    studyButton.className = "button2";
    studyButton.innerText = "Study";
    studyButton.onclick = function () {
        localStorage.setItem("currentCardSet", JSON.stringify(set));
        location.href = "../study/study.html";
    }

    var editButton = document.createElement("button");
    editButton.className = "button2";
    editButton.innerText = "Edit";
    editButton.onclick = function () {
        localStorage.setItem("currentCardSet", JSON.stringify(set));
        location.href = "../create/create.html";
    }

    studyCouple.append(studyButton);
    editCouple.append(editButton);

    thirdBorder.append(studyCouple);
    thirdBorder.append(editCouple);

    thirdThird.append(thirdBorder);
    newEntry.append(thirdThird);

    container.append(newEntry);
}

function loadSets(){
    readFromFirebase("set-names").then(
        (succ) => {
            succ.forEach((item) => {
                firebase.database().ref().child(item).get().then((snapshot) => {
                    if (snapshot.exists()){
                        var set = snapshot.val();
                        createEntry(set);
                    }
                }).catch((error) => {
                    console.error(error);
                    });
            });
    },(fail) => {
        console.log("Unable to find: ", fail);
        });
}