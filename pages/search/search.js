import {Card, CardSet} from "../card.js";
import { readFromFirebase } from "../database.js";

console.log(firebase);
document.getElementById("searchButton").onclick = () => {
    var getSearchVal = document.getElementById("searchTerm").value;
    if(getSearchVal != null){
        search(getSearchVal);
    }
}

function search(traits){
    readFromFirebase("set-names").then(
        (succ) => {
            succ.forEach((item) => {
                firebase.database().ref().child(item).get().then((snapshot) => {
                    if (snapshot.exists()){
                        var items = snapshot.val();
                        if(traits.includes(items["class"]) || traits.includes(items["professor"]) ||
                             traits.includes(items["subject"]) || traits.includes(items["author"])){
                            console.log(items);
                            //TODO 
                            console.log(CardSet.populateFromJSON(items).id);
                            console.log(item);
                            // adds item to if its not been seen before list of found sets
                            var found = document.getElementById("Found");
                            if(found.value == undefined || !found.value.includes(item)){
                                found.innerHTML = item + '\n'
                            }
                        }
                    }
                }).catch((error) => {
                    console.error(error);
                    });
            });
    },(fail) => {
        console.log("Unable to find: ", fail);
        });
}