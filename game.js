
let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let started = false;

let level = 0;

let bestScore = 0;


// Element qui déclenche le lancement du jeu, nextSequence s'éxécute pour la premiere fois avec un level qui s'incrémentera de 1 une fois arrivé dans la fonction
$(document).keydown(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        console.log("The game as started")
    }
});




$(".btn").click(function() {

    let userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});



// Partie concernant les fonctions



// fonction qui vérifie d'abord à chaque input que le pattern est le même, puis ensuite vérifie la longueur de l'array
// si c'est bon, on passe au niveau suivant en appelant nextSequence avec un délai mis par setTimeout.
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel] ) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {   // joue et ajoute puis supprime une class CSS de game over + change le h1 en GameOver
        console.log("wrong");
        let wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");

        // partie pour le bestScore
        checkBestScore();

        // relance le jeu
        startOver();
    }   

}






// 
function nextSequence() {

    userClickedPattern = [];   // on reset à chaque niveau le pattern rentré par l'utilisateur pour tout vérifier à chaque fois

    level++;

    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4 );

    let randomChosenColour = buttonColours[randomNumber];
    // détermine la couleur à l'aide d'un nombre aléatoire en index de notre array de possibilités
    
    gamePattern.push(randomChosenColour);
    // itération des "choix aléatoires"

    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    // transition qui fait flasher, par séléction par #id, le bouton choisi

    

    // Jouer le son qui est associé à la couleur en faisant appel à la fonction playSound()
    playSound(randomChosenColour);
        
}







function playSound(name) { 
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}






// fonction qui ajoute la classe CSS pressed et la retire après 100ms. Elle prend en input la valeur #id du btn associé à this
// la fonction est call plus haut
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}




function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


function checkBestScore() {
    if (level > bestScore) {
        bestScore = level;
        $("#bestscore").text("Previous BestScore : " + bestScore);
    }
}

// fonction qui prend en input une couleur (différents moyens d'obtenir cette couleur, id avec html ou par index dans un array)


