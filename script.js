/*HTML IMPORTS*/
const character = document.querySelector("#character");
const characterImage = document.querySelector("#cat");
const startButton = document.querySelector("#start-screen");

/*AUDIO VARIABLES*/
const bounceSound = new Audio("/audio/squeak.mp3");
const mainAudio = new Audio("/audio/main-theme.mp3");
const clickSound = new Audio("/audio/mouse-click.mp3");
const wowSound = new Audio("/audio/anime-wow.mp3");

let characterBottom = 100;
let characterLeft = 25;
let isJumping = false;
let isRunning = false;

function startGame() {
    character.style.bottom = characterBottom + "px";
    character.style.left = characterLeft + "px";
    characterImage.src = "/images/cat-stationary.png";
}
startGame();

function playGame() {
    console.log('Game is playing');
    mainAudio.play();
    clickSound.play();
    isRunning = true;
    characterImage.src = "/images/cat-running.gif";

    function jumpUp() {
        if (!isJumping) {
            isJumping = true;
            let jumpInterval = setInterval(() => {
                if (characterBottom >= 250) {
                    clearInterval(jumpInterval);
                    jumpDown();
                } else {
                    characterBottom += 15; // JUMP HEIGHT
                    character.style.bottom = characterBottom + "px";
                }
                }, 20);
            } characterImage.src = "/images/cat-jump.png";
              bounceSound.play();
    }
    function jumpDown() {
        let fallInterval = setInterval(() => {
            if (characterBottom <= 100) {
                clearInterval(fallInterval);
                isJumping = false;
                characterImage.src = "/images/cat-running.gif";
            } else {
                characterBottom -= 9; //FALL SPEED
                character.style.bottom = characterBottom + "px";
            }
        }, 20);
    } document.addEventListener("keyup", jumpUp);

    function spawnObstacle(){
        
    }

};