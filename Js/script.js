/// Define constants and Variables................
/// Let //////
let inputDir = {x: 0, y: 0};
let speed = 8;
let lastPaintTime = 0;
let score = 0
///// Snake Array //////////
let snakeArr = [
    {x: 13, y: 15}
]
food = {x: 6, y: 7}
/// Const ///
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3')

/// Game Functions

// Function For main
function main(ctime) {
    window.requestAnimationFrame(main);
   // console.log(ctime)
    if ((ctime - lastPaintTime)/1000 < 1/speed) {
        return;
    }   
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    /// Game Over if snake bump into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    /// Game Over if snake bump into wall
        if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].x <= 0) {
            return true;
            
        }
        
    //}
}

// Function For gameEngine
function gameEngine() {
    // Part 1: Updating the snake array and food
    if (isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press Any Key to Play Agian!");
        snakeArr = [ {x: 13, y: 15} ];
        musicSound.play();
        score = 0;
    }

/// If you have eaten the food, increment the score and regenrate the food
if (snakeArr[0].y === food.y && snakeArr[0].x === food.x){
    foodSound.play();
    score += 2;
    if (score > highScoreval) {
        highScoreval = score;
        localStorage.setItem('highScore', JSON.stringify(highScoreval));
        highScoreBox.innerHTML = "High Score: " + highScoreval;
    }
    scoreBox.innerHTML = 'Score: ' + score
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
    let a = 2;
    let b = 16;
    food = { x: Math.round(a + (b-a) * Math.random()), y: Math.round(a + (b-a) * Math.random()) }
}

// Moving the snake 
for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i+1] = {...snakeArr[i]};
}

snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;

    // Parrt 2: Display the  snake and food
    /// Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    /// Display the food
        foodElement = document.createElement('div')
        foodElement.style.gridRowStart = food.y
        foodElement.style.gridColumnStart = food.x
        foodElement.classList.add('food')
        board.appendChild(foodElement);
    

}

/// Main Logic Starts Here................
let highScore = localStorage.getItem('highScore');
if (highScore === null ) {
    let highScoreval = 0;
    localStorage.setItem('highScore', JSON.stringify(highScoreval))
}
else {
    highScoreval = JSON.parse(highScore);
    highScoreBox.innerHTML = "High Score: " + highScore;
}

window.requestAnimationFrame(main);

/// Event listener
window.addEventListener('keydown', e => {
    inputDir = {x: 0, y: 1}    /// Start the game
    moveSound.play();

    //// switch and case Statement
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        //// case For ArrowDown
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        //// Case for ArrowLeft
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        //// Case for ArrowRight
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});