import {Card, CardSet} from "../card.js";
import { writeToFirebase } from "../database.js";

// All html elements that are accessed (excluding card buttons this script creates)
var cardButtonList = document.getElementById("cardButtonList");
var frontTextBox   = document.getElementById("frontText");
var backTextBox    = document.getElementById("backText");
cardButtonList.onclick = cardButtonClicked;
document.getElementById("deleteCard").onclick    = deleteCard;
document.getElementById("nextCard").onclick      = nextCard;
document.getElementById("previousCard").onclick  = previousCard;
document.getElementById("uploadCardSet").onclick = uploadCardSet;
document.getElementById("studyCard").onclick     = studyCardSet;
document.getElementById("clearAll").onclick = clearAll;

// These variables define the current state of the editor
var currentCardSet = Object.create(CardSet);
var currentCard    = null
var currentIndex   = 0;
var currentButton  = createNewCardButton();

$(document).ready(function() {
    loadInitial();
	
	// If a CardSet is to be edited, loads this set into the editor
    function loadInitial(){
        var curCardJSON = JSON.parse(localStorage.getItem("currentCardSet"));
            
        if (curCardJSON != null){
            currentCardSet.parse(curCardJSON);
            for (var i = 0; i < currentCardSet.cards.length - 1; i++){
                currentCard = currentCardSet.cards[i];
                frontTextBox.value = currentCardSet.cards[i].front;
                backTextBox.value = currentCardSet.cards[i].back;
                saveCard();
                currentIndex += 1;
                loadCardToInput();
                currentButton = createNewCardButton();
            }
            frontTextBox.value = currentCardSet.cards[currentCardSet.cards.length - 1].front;
            backTextBox.value = currentCardSet.cards[currentCardSet.cards.length - 1].back;
            document.getElementById("className").value = currentCardSet.class;
            document.getElementById("professorName").value = currentCardSet.professor;
            document.getElementById("subjectName").value = currentCardSet.subject;
        }
        else{
            currentCard = Object.create(Card);
        }
    }
})

// Clears all entries in the editor
function clearAll(){
    for (var i = currentCardSet.cards.length - 1; i > -1; i--){
        currentIndex = i;
        currentCard = currentCardSet.cards[i];
        currentButton = cardButtonList.childNodes[currentIndex + 1];
        deleteCard();
    }

    currentCardSet = Object.create(cardSet);
    currentCard    = createNewCard();
    currentIndex   = 0;
    currentButton  = createNewCardButton();
    loadCardToInput();
}

// Creates a new, blank card and adds it to the current card set
function createNewCard(){
    var newCard = Object.create(Card);
    currentCardSet.addCard(newCard);
    return newCard;
}

// Calls the print cards method of the current card set
function printCards(){
    currentCardSet.printCards();
}

/* Moves current state to the next card if the current card does not have a blank value
 * If the current card is the last card of the set, a new card is made
 */
function nextCard(){
    if (currentIndex < currentCardSet.cards.length - 1){
        saveCard();
        currentIndex += 1;
        loadCardToInput();
    }
    else if (frontTextBox.value != "" && backTextBox.value != ""){
        saveCard();
        currentIndex += 1;
        currentCard = createNewCard();
        currentButton = createNewCardButton();
    }
}

// Moves current state back to previous card if not on the first card
function previousCard(){
    if (currentIndex > 0){
        saveCard();
        currentIndex -= 1;
        loadCardToInput();
    }
}

// Saves the user data in input fields to current card
function saveCard(){
    if (currentCard == null || currentButton == null){
        currentIndex = 0;
        currentCard = currentCardSet.cards[currentIndex];
        currentButton = cardButtonList.childNodes[currentIndex + 1];
    }
    currentCard.setFront(frontTextBox.value);
    currentCard.setBack(backTextBox.value);
    currentButton.innerText = currentCard.front.slice(0, 7);
}

// Loads the values of the current card to the user input fields for editing
function loadCardToInput(){
    currentCard = currentCardSet.cards[currentIndex];
    currentButton = cardButtonList.childNodes[currentIndex + 1];
    frontTextBox.value = currentCard.front;
    backTextBox.value = currentCard.back;
}

// Creates a new button to match a new card
function createNewCardButton(){
    var newButton = document.createElement("button");
    cardButtonList.append(newButton);
    newButton.id = String(currentIndex);
    newButton.className = "listButton";
    frontTextBox.value = "";
    backTextBox.value = "";
    return newButton;
}

/* Called when a card button is clicked
 * Sets the current state to the values of the card that was clicked
 */
function cardButtonClicked(input){
    saveCard();
    currentIndex = parseInt(input.target.id);
    loadCardToInput();
}

// Deletes the current card from the current card set
function deleteCard(){
    if (currentCardSet.cards.length > 1){
        currentCardSet.removeCard(currentIndex);
        currentButton.remove();
        for (var i = 0; i < cardButtonList.childNodes.length; i++){
            cardButtonList.childNodes[i].id = String(i - 1);
        }
        if (currentIndex > currentCardSet.cards.length - 1)
            currentIndex--;
        loadCardToInput();
    }
}

//Uploads card set to database
function uploadCardSet(){
    var className = document.getElementById("className").value;
    var professorName = document.getElementById("professorName").value;
    var subjectName = document.getElementById("subjectName").value;

    if (className == "" || professorName == "" || subjectName == ""){
        window.alert("Pleae fill out Class Name, Professor Name, and Subject Name");
    }
    else{
        currentCardSet.class = className;
        currentCardSet.professor = professorName;
        currentCardSet.subject = subjectName;
        saveCard();
        var filledSet = currentCardSet.saveSet()
        if (filledSet == 0){
            window.alert("Pleae have at least one complete card");
            return false;
        }
        else{
            var author = window.prompt("Please input an author name");
            currentCardSet.author = author;
            var password = window.prompt("Please input a password for editing the card set later")
            currentCardSet.setPassword(password);

            if (password != null && author != null && password != "" && author != ""){
                currentCardSet.createId();
                writeToFirebase(currentCardSet.toDict(), currentCardSet.id);
                localStorage.setItem(currentCardSet.id, JSON.stringify(currentCardSet.toDict()));
                window.alert("Your card set has been uploaded!");
                return true;
            }
            else{
                window.alert("Your card set upload has been cancelled");
                return false;
            }
        }
        
    }
    return false;

}

function studyCardSet(){
    saveCard();
    localStorage.setItem("currentCardSet", JSON.stringify(currentCardSet.toDict()));
    location.href = "../study/study.html";
    
}