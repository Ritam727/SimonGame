var sequence = [], uc = [];
var colors = ["red", "blue", "green", "yellow"];
var level = 0, started = false, right = true;

function nextSequence() {
    level++;
    $("#level-title").text("Level "+level);
    var rn = Math.floor(Math.random()*4);
    var rc = colors[rn];
    sequence.push(rc);
    $("#"+rc).fadeOut(100).fadeIn(100);
    playSound(rc);
}

$(".btn").click(function () {
    var cl = $(this).attr("id");
    uc.push(cl);
    animate(cl);
    if(right){
        playSound(cl);
    } else{
        playSound("wrong");
    }
    checkAnswer(0);
});

function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animate(name) {
    $("#"+name).addClass("pressed");
    setTimeout(function () {
        $("#"+name).removeClass("pressed");
    }, 100);
}

function gameOverAnimation() {
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
}

function checkAnswer(lvl) {
    if(lvl < level){
        if(lvl < uc.length){
            if(uc[lvl] == sequence[lvl]){
                checkAnswer(lvl+1);
            } else{
                playSound("wrong");
                $("#start-button").toggle();
                $("#start-button").text("Restart");
                $("#level-title").text("Game Over, Press Restart Button");
                level = 0; started = false;
                sequence = []; uc = [];
                gameOverAnimation();
                return;
            }
        } else{
            return;
        }
    } else{
        uc = [];
        setTimeout(nextSequence, 1000);
    }
}

function start() {
    started = true;
    right = true;
    $("#start-button").toggle();
    nextSequence();
}

function instructions() {
    alert("This is a simple memory game. You have to remember the sequence of colours that are shown. Every time a new level is reached, you have to click on the correct sequence of colours to win the game. If you get it wrong then the game will be over and you will have to restart. For eg: if the first colour is blue, you have to click on the blue button, then the next colour will be shown. Then you will have to click on the blue button and then on the new colour. The game will proceed in the same manner.")
}