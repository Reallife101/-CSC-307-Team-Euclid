import {Card, CardSet} from "../card.js";
$(document).ready(function() {
    var flipped;
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
        $("#card2").css("top", "200px");
        $("#cardArea").on("click", function() {
            console.log(flipped);
            console.log($("#card1").position().top)
            if (flipped != 1) {
                flipped = 1;
                $("#card1").animate({
                    top: "-=200"
                }, 150, function() {
                    flipped = 0;
                    if (Math.abs($("#card1").position().top + 200) < 0.1) {
                        $("#card1").css("top", "200px");
                    }
                });
                $("#card2").animate({
                    top: "-=200"
                }, 150, function() {
                    if (Math.abs($("#card2").position().top + 200) < 0.1) {
                        $("#card2").css("top", "200px");
                    }
                });
            }
        });
        
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


