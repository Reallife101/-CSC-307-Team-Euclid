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