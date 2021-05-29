import {Card, CardSet} from "../card.js";
$(document).ready(function() {
    var flipped = 0;
    var cur = 0;
    //var qbank = new Array;
    var currentCardSet = Object.create(CardSet);
    var studyList = [];
    var frontColor = "#f5a742";
    var backColor = "#428af5";
    document.getElementById("nextButton").onclick = nextButton;
    document.getElementById("prevButton").onclick = prevButton;
    document.getElementById("randomize").onclick = loadRandom;
    document.getElementById("studyIncorrect").onclick = loadIncorrect;
    document.getElementById("isCorrect").onclick = isCorrect;
    document.getElementById("reset").onclick = loadInitial;
    document.getElementById("cardArea").onclick = flipCard;

    loadInitial();

    function loadInitial() {
        var curCardJSON = localStorage.getItem("currentCardSet");
        cur = 0;
        if (curCardJSON == null){
            $("#buttonArea").empty();
            $("#cardArea").empty();
            $("#cardArea").append('<div id="finalMessage">No Card Set Selected</div>');
        }
        else{
            currentCardSet.populateFromJSON(localStorage.getItem("currentCardSet"));
            studyList = currentCardSet.getCards();
            loadCurrentCard();
        }
    }

    function loadRandom() {
        studyList = currentCardSet.shuffleCards();
        cur = 0;
        loadCurrentCard()
    }

    function loadIncorrect() {
        var incorrectStudyList = [];
        for (var i = 0; i < studyList.length; i++){
            if (studyList[i].getCorrect() == false){
                incorrectStudyList.push(studyList[i]);
            }
        }
        studyList = incorrectStudyList;
        cur = 0;
        loadCurrentCard();
    }

    function loadCurrentCard() {
        flipped = 0;
        $("#cardArea").empty();
        $("#cardArea").append('<div id="card1" class="card">' + studyList[cur].front + '</div>');
        $("#cardArea").append('<div id="card2" class="card">' + studyList[cur].back + '</div>');
        $("#card1").css("background-color", frontColor);
        $("#card2").css("background-color", backColor);
        $("#card2").css("top", $("#card2").height());
    }

    function flipCard(){
        if (!flipped){
            $("#card1").animate({top: -$("#card1").height()}, 150);
            $("#card2").animate({top: "0px"}, 150);
        }
        else{
            $("#card1").animate({top: "0px"}, 150);
            $("#card2").animate({top: $("#card2").height()}, 150); 
        }
        flipped = !flipped;
    }

    function nextButton(){
        console.log("next");
        if (cur < studyList.length - 1) {
            cur++;
            loadCurrentCard();
        } else {
            $("#cardArea").empty();
            $("#cardArea").append('<div id="finalMessage">You have finished the activity.</div>');
        }
    }
    
    function prevButton(){
        console.log("prev");
        if (cur > 0) {
            cur--;
            loadCurrentCard();
        }
    }

    function isCorrect(){
        studyList[cur].setCorrect(true);
    }
});


