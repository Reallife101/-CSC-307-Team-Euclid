import {Card, CardSet} from "../card.js";
//import "../database.js";

// All html elements that are accessed (excluding card buttons this script creates)
var testCardSet = Object.create(CardSet);
var cardButtonList = document.getElementById("cardButtonList");
var frontTextBox = document.getElementById("frontText");
var backTextBox = document.getElementById("backText");
cardButtonList.onclick = cardButtonClicked;
document.getElementById("deleteCard").onclick = deleteCard;
document.getElementById("nextCard").onclick = nextCard;
document.getElementById("previousCard").onclick = previousCard;
document.getElementById("uploadCardSet").onclick = uploadCardSet;
document.getElementById("testJSON").onclick = testJSON;
document.getElementById("studyCard").onclick = studyCardSet;
//document.getElementById("1").onclick = read2("1");

// These variables define the current state of the editor
var currentCardSet = testCardSet;
var currentCard = createNewCard();
var currentIndex = 0;
var currentButton = createNewCardButton();

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
    currentCard.setFront(frontTextBox.value);
    currentCard.setBack(backTextBox.value);
    currentButton.innerText = currentCard.front;
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
    currentCardSet.removeCard(currentIndex);
    currentButton.remove();
    for (var i = 0; i < cardButtonList.childNodes.length; i++){
        cardButtonList.childNodes[i].id = String(i - 1);
    }
    loadCardToInput();
}

//Uploads card set to database
function uploadCardSet(){
    var id = window.prompt("Please name your card set.");
    currentCardSet.id = id;
    var author = window.prompt("Please input an author name");
    currentCardSet.author = author;
    var password = window.prompt("Please input a password to edit the card set later.")
    currentCardSet.setPassword(password);

    saveCard();
    currentCardSet.saveSet()

    write(currentCardSet.toJSON(), currentCardSet.id);

}

function studyCardSet(){
    saveCard();
    localStorage.setItem("currentCardSet", currentCardSet.toJSON());
    location.href = "../study/study.html"
}

function testJSON(){
    var jsonCardSet = Object.create(CardSet);
    jsonCardSet.populateFromJSON({"id":"Set 1","author":"N8","password":"123","cards":[{"front":"Hello","back":"Goodbye"},{"front":"1","back":"2"},{"front":"g","back":"h"}]});
    console.log(jsonCardSet.toJSON())
}
/*
function read2(password){
    ref.on(value, snapshot => {
    const data = snapshot.val();
    console.log(data);
  });
}*/