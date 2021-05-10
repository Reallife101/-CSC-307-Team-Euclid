$(document).ready(function() {

    var flipped;
    var cur = 0;
    var qbank = new Array;
    var frontColor = "#f5a742";
    var backColor = "#428af5";

    loadDB();

    function loadDB() {
        $.getJSON("set1.json", function(data) {
            for (i = 0; i < data.questionlist.length; i++) {
                qbank[i] = [];
                qbank[i][0] = data.questionlist[i].cardfront;
                qbank[i][1] = data.questionlist[i].cardback;
            }
            beginActivity();
        })
    }

    function beginActivity() {
        flipped = 0;
        $("#cardArea").empty();
        $("#cardArea").append('<div id="card1" class="card">' + qbank[cur][0] + '</div>');
        $("#cardArea").append('<div id="card2" class="card">' + qbank[cur][1] + '</div>');
        $("#card1").css("background-color", frontColor);
        $("#card2").css("background-color", backColor);
        $("#card2").css("top", "200px");
        $("#cardArea").on("click", function() {
            if (flipped != 1) {
                flipped = 1;
                $("#card1").animate({
                    top: "-=200"
                }, 150, function() {
                    flipped = 0;
                    if ($("#card1").position().top == -200) {
                        $("#card1").css("top", "200px");
                    }
                });
                $("#card2").animate({
                    top: "-=200"
                }, 150, function() {
                    if ($("#card2").position().top == -200) {
                        $("#card2").css("top", "200px");
                    }
                });
            }
        });
        cur++;
        $("#buttonArea").empty();
        $("#buttonArea").append('<div id="prevButton">PREV</div>');
        $("#buttonArea").append('<div id="nextButton">NEXT</div>');
        $("#nextButton").on("click", function() {
            if (cur < qbank.length) {
                beginActivity();
            } else {
                $("#buttonArea").empty();
                $("#cardArea").empty();
                $("#cardArea").append('<div id="finalMessage">You have finished the activity.</div>');
            }
        });
        $("#prevButton").on("click", function() {
            if (cur > 1) {
                cur -= 2;
                beginActivity();
            }
        });
    }

});