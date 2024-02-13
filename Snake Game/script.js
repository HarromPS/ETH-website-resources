/*
 Why should I use requestAnimationFrame rather than setTimeout or setInterval?
 https://stackoverflow.com/questions/38709923/why-is-requestanimationframe-better-than-setinterval-or-settimeout
*/

// game constants

let xGrid = 20, yGrid = 20;   // board size
let inputDirection = { x: 0, y: 0 };   // initial direction (static snake)
const foodSound = new Audio("music/food.mp3");
const gameOver = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const music = new Audio("music/music.mp3");
let lastPaintTime = 0;  // last render time of the screen
let speed = 3;          // speed of the snake to move i.e 2 miliseconds

let snakeArray = [
    { x: 18, y: 4 }   // snake head in current position
];

let foodParticle = { x: 3, y: 7 };   // food particle initially
let score = 0;

// document elements
let board = document.getElementById("board");
let highest = document.getElementById("highest");
highest.innerHTML=localStorage.getItem("Highest_Score");
let current_score = document.getElementById("current");


// game functions

function main(currentTime) {
    window.requestAnimationFrame(main);
    // console.log(currentTime);

    // game loop & here is a delay
    // set a condition for the frames rendering
    if (((currentTime - lastPaintTime) / 1000) < (1 / speed)) {   // if current render is < 0.5 sec then return the function
        return;
    }

    // else again wait for next 0.5 sec to render next frame
    lastPaintTime = currentTime;

    // call gameEngine
    gameEngine();
}

function isCollide(snake) {

    // if snake collides in its own
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // if snake collides into the walls
    if (snake[0].x >= xGrid || snake[0].y >= yGrid || snake[0].x <= 0 || snake[0].y <= 0) {
        return true;
    }

    return false;
}
function gameEngine() {
    // Part 1: Updating the sanke head i.e snake array
    if (isCollide(snakeArray)) {
        gameOver.play();
        music.pause();
        inputDirection = { x: 0, y: 0 };
        alert("Game over ! Press any key to play again");

        // get the highest score
        if(score>localStorage.getItem("Highest_Score")){
            localStorage.setItem("Highest_Score",score);
        }
        score = 0;
        snakeArray = { x: 4, y: 8 };
    }

    // if snake eats the food then increase the snake body & score by one & regenerate the food
    if (snakeArray[0].x === foodParticle.x && snakeArray[0].y === foodParticle.y) {
        foodSound.play();
        score++;

        // score display
        current_score.innerHTML = score;

        // when the snake eats the food it adds the current position & the user input position to the snake array

        snakeArray.unshift({ x: snakeArray[0].x + inputDirection.x, y: snakeArray[0].y + inputDirection.y });

        // regenerate the food randomly on the board
        let a = 1, b = 20;
        foodParticle = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a = (b - a) * Math.random()) };

    }

    // moving the snake
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        // let a= snakeArray[i].x;
        // let b= snakeArray[i].y;
        // snakeArray[i+1]={a,b};
        snakeArray[i + 1] = { ...snakeArray[i] };
    }
    snakeArray[0].x += inputDirection.x;
    snakeArray[0].y += inputDirection.y;


    // Part 2: Display the snake & food
    board.innerHTML = "";     // initially nothing in the element

    snakeArray.forEach((ele, index) => {
        // Display snake
        let snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = ele.y;
        snakeElement.style.gridColumnStart = ele.x;
        if (index === 0) {
            snakeElement.classList.add("head");
        }
        else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });

    // Display foodParticle
    let foodElement = document.createElement("div");
    foodElement.style.gridRowStart = foodParticle.y;
    foodElement.style.gridColumnStart = foodParticle.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

// game logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
    music.play();
    // console.log(e);
    // console.log(e.key);

    inputDirection = { x: 0, y: 1 }; // snake velocity
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log(e.key);
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;

        case "ArrowDown":
            console.log(e.key);
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;

        case "ArrowLeft":
            console.log(e.key);
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;

        case "ArrowRight":
            console.log(e.key);
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;
    }
});


// window.addEventListener("keypress", e => {
//     // console.log(e.key);
//     moveSound.play();
// });