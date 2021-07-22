var sequence = [], uc = [];
var colors = ["red", "blue", "green", "yellow"];
var level = 0, started = false, hide = true;

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
    playSound(cl);
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
    $("#start-button").toggle();
    nextSequence();
}

function instructions() {
    if(hide){
        $("#instructions").slideDown();
        hide = false;
    } else{
        $("#instructions").slideUp();
        hide = true;
    }
}