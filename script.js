/*HTML IMPORTS*/
const gameContainer = document.querySelector("#game-container")
const character = document.querySelector("#character")
const characterImage = document.querySelector("#cat")

/*AUDIO VARIABLES*/
const bounceSound = new Audio("./audio/squeak.mp3")
const mainAudio = new Audio("./audio/main-theme.mp3")
const clickSound = new Audio("./audio/mouse-click.mp3")
const wowSound = new Audio("./audio/anime-wow.mp3")
const fart = new Audio("./audio/fart.mp3")

let characterBottom = 100
let characterLeft = 25
let isJumping = false
let isRunning = false
let isGameOver = false

function startGame() {
     character.style.bottom = characterBottom + "px"
     character.style.left = characterLeft + "px"
     characterImage.src = "./images/cat-stationary.png"
     document.querySelector("#replay-screen").style.display="none"
     document.querySelector("#instructions").style.display="none"
}
startGame()

function playGame() {
    console.log('Game is playing')
    mainAudio.play()
    clickSound.play()
    isRunning = true
    characterImage.src = "./images/cat-running.gif"
    document.addEventListener("keydown", control)
    document.querySelector("#instructions").style.display="flex"
    document.querySelector("#start-screen").style.display="none"
    generateObstacle()
}

function gameLose() {
    isGameOver = true
    characterImage.src = "./images/cat-collision.png"
    document.removeEventListener("keydown", control)
    console.log('Game lost')
    mainAudio.pause()
    mainAudio.currentTime = 0;
    fart.play()
    document.querySelector("#replay-screen").style.display="flex"
    document.querySelector("#instructions").style.display="none"
}

function replay() {
    isGameOver = false
    startGame()
    playGame()
}

/*JUMP MECHANICS*/
function control(e) {
    if (e.keyCode === 32) {
        jumpUp()
    }
}
function jumpUp() {
    if (!isJumping) {
        isJumping = true
        let jumpInterval = setInterval(() => {
            if (characterBottom >= 275) {
                clearInterval(jumpInterval)
                jumpDown()
            } else {
                characterBottom += 14 // JUMP HEIGHT
                character.style.bottom = characterBottom + "px"
            }
        }, 20)
    } characterImage.src = "./images/cat-jump.png"
      bounceSound.play()
}
function jumpDown() {
    let fallInterval = setInterval(() => {
        if (characterBottom <= 100) {
            clearInterval(fallInterval)
            isJumping = false
            characterBottom = 100
            character.style.bottom = characterBottom + "px"
            characterImage.src = "./images/cat-running.gif"
        } else {
            characterBottom -= 9 //FALL SPEED
            character.style.bottom = characterBottom + "px"
        }
    }, 20)
}

/*OBSTACLE CREATION*/
function generateObstacle(){
    let obstacleLeft = 800
    let obstacleBottom = 98
    let randomInterval = Math.floor(Math.random() * 3000 + 1000)
    const obstacle = document.createElement("div")
    obstacle.classList.add("obstacle")
    gameContainer.appendChild(obstacle)
    obstacle.style.left = obstacleLeft + "px"
    obstacle.style.bottom = obstacleBottom + "px"
    /*OBSTACLE MOVEMENT AND COLLISION*/
    if (!isGameOver){
        let timerId = setInterval(moveObstacle, 1)
        setTimeout(generateObstacle, randomInterval)
        function moveObstacle() {
                obstacleLeft -= 5
                obstacle.style.left = obstacleLeft + "px"
            if (obstacleLeft === -170){
                clearInterval(timerId)
                gameContainer.removeChild(obstacle)
            }
            if (obstacleLeft <= 125 && obstacleLeft > 0 && characterBottom < 105 ){
                gameLose()
                clearInterval(timerId)
                isGameOver = true
                gameContainer.removeChild(obstacle)
                obstacle.classList.remove("obstacle")
            }
       }
    }
    /*OBSTACLE RANDOM IMAGE ASSIGNMENT*/
    const furniture = document.createElement("img")
    obstacle.appendChild(furniture)
    let randomChoice = Math.floor(Math.random() * 3)
    console.log(randomChoice)
    switch(randomChoice){
        case 0:
            furniture.src = "./images/dresser.png";
            break;
        case 1:
            furniture.src = "./images/sofa.png";
            break;
        case 2:
            furniture.src = "./images/large-table.png";
            break;
    }
} 