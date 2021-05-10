import {Card, CardSet} from "./card.js"

var testCardSet = Object.create(CardSet);
var cardButtonList = document.getElementById("cardButtonList");
var frontTextBox = document.getElementById("frontText");
var backTextBox = document.getElementById("backText");
cardButtonList.onclick = cardButtonClicked;
document.getElementById("deleteCard").onclick = deleteCard;
document.getElementById("nextCard").onclick = nextCard;
document.getElementById("previousCard").onclick = previousCard;
document.getElementById("saveSet").onclick = saveSet;

var currentCardSet = testCardSet;
var currentCard = createNewCard();
var currentIndex = 0;
var currentButton = createNewCardButton();

function createNewCard(){
    var newCard = Object.create(Card);
    currentCardSet.addCard(newCard);
    return newCard;
}

function printCards(){
    testCardSet.printCards();
}

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

function previousCard(){
    if (currentIndex > 0){
        saveCard();
        currentIndex -= 1;
        loadCardToInput();
    }
}

function saveCard(){
    currentCard.setFront(document.getElementById("frontText").value);
    currentCard.setBack(document.getElementById("backText").value);
    currentButton.innerText = currentCard.front;
}

function loadCardToInput(){
    currentCard = currentCardSet.cards[currentIndex];
    currentButton = cardButtonList.childNodes[currentIndex + 1];
    frontTextBox.value = currentCard.front;
    backTextBox.value = currentCard.back;
}

function createNewCardButton(){
    var newButton = document.createElement("button");
    cardButtonList.append(newButton);
    newButton.id = String(currentIndex);
    frontTextBox.value = "";
    backTextBox.value = "";
    return newButton;
}

function cardButtonClicked(input){
    saveCard();
    currentIndex = parseInt(input.target.id);
    loadCardToInput();
}

function deleteCard(){
    currentCardSet.removeCard(currentIndex);
    currentButton.remove();
    for (var i = 0; i < cardButtonList.childNodes.length; i++){
        cardButtonList.childNodes[i].id = String(i - 1);
    }
    loadCardToInput();
}

function saveSet(){
    nextCard();
    var name = window.prompt("Card Set Name:");
    currentCardSet.id = name;
    var author = window.prompt("Card Set Author");
    currentCardSet.author = author;
    currentCardSet.saveSet();
}