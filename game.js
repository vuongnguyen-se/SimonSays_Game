

// array list 
var buttonColors = ["red", "yellow", "blue", "green"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var flag = false;

//step 7: start the game!
$(document).keydown(function() {

    if(!flag){
        $("#level-title").text("Level "+ level);
        nextSequence();  
        flag = true;
    }
});

$(".btn").click( function(){ // users chose their answer
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push( userChosenColor );
    pressAnimation(userChosenColor);
    makeSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1 );
});

function checkAnswer( current_level ){
    if( gamePattern[ current_level ] === userClickedPattern[ current_level ]){
        //console.log("success");
        if( gamePattern.length === userClickedPattern.length){
            setTimeout( function() {
                nextSequence();
            }, 1000);
        }
    }
    else{
        //console.log("wrong");
        makeSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("GameOver, You're Gay Hieu");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver(){
    //reset values
    level = 0;
    flag = false;
    gamePattern = [];
}

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);// create random number
    var randomChosenColor = buttonColors[randomNumber];//convert to equivalent color 
    gamePattern.push(randomChosenColor);//push back the random color to gamePattern array
    //step 3: use jQuery to select button with the same id as the randomChosenColor
    $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
    makeSound(randomChosenColor);
}

    function makeSound(name) {
        var audio = new Audio("./sounds/" + name + ".mp3"); 
        audio.play();
    }

    function pressAnimation( userColor ) {
        $("#" + userColor).addClass("pressed");
        setTimeout(function(){
            $("#" + userColor ).removeClass("pressed");
        }, 100);
    }
