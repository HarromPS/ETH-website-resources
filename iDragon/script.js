//  game constants
const music = new Audio("audio/music.mp3");
const gameover = new Audio("audio/gameover copy.mp3");
const ting = new Audio("audio/ting.mp3");
let score = 0;
let cross = true;

music.play();
document.onkeydown = function (e) {
    let code = e.keyCode;
    // 37(left) 38(up) 39(right) 40(down)

    if (code == 38) {
        ting.play();
        let dino = document.querySelector(".dino");
        dino.classList.add("animate-dino");
        setTimeout(() => {
            dino.classList.remove("animate-dino");
        }, 700);

    }

    else if (code == 39) {
        ting.play();
        let dino = document.querySelector(".dino");
        let dinoX = Number.parseInt(window.getComputedStyle(dino).getPropertyValue("left"));
        dino.style.left = dinoX + 112 + "px";

    }

    else if (code == 37) {
        ting.play();
        let dino = document.querySelector(".dino");
        let dinoX = Number.parseInt(window.getComputedStyle(dino).getPropertyValue("left"));
        dino.style.left = dinoX - 112 + "px";
    }
}
setInterval(() => {
    // dino & obstacle collision
    let dino = document.querySelector(".dino");
    let obstacle = document.querySelector(".obstacle");

    // in pixels
    let dx = window.getComputedStyle(dino).getPropertyValue("left");
    dx = Number.parseInt(dx);     // parsed into a number

    let dy = window.getComputedStyle(dino).getPropertyValue("top");
    dy = Number.parseInt(dy);     // parsed into a number

    let ox = window.getComputedStyle(obstacle).getPropertyValue("left");
    ox = Number.parseInt(ox);     // parsed into a number

    let oy = window.getComputedStyle(obstacle).getPropertyValue("top");
    oy = Number.parseInt(oy);

    // finding the collision range
    let offSetX = Math.abs(dx - ox);
    let offSetY = Math.abs(dy - oy);

    if (offSetX < 90 && offSetY < 70) {
        document.querySelector(".score").innerText = "Your Final Score: " + score;

        gameover.play();
        music.pause();
        updateScore(0);

        obstacle.classList.remove("obstacle-animate");
        // obstacle.style.left = offSetX;
        // obstacle.style.top = offSetY;

        document.querySelector(".game-over").style.visibility = "visible";
        document.querySelector(".game-over").innerText = "Game Over: Press Any Key to Restart";

        window.addEventListener("keydown", (e) => {
            if (e.key) {
                document.querySelector(".game-over").innerText = "";
                obstacle.classList.add("obstacle-animate");
                music.play();
                score = 0;
            }
        });
    }

    else if (offSetX < 145 && cross == true) {
        cross = false;
        // generating a delay of 1 sec to get the score updated
        setTimeout(() => {
            score += 1;
            updateScore(score);
            cross = true;
        },800);
    }

    setTimeout(() => {

        let ani_duration = Number.parseFloat(window.getComputedStyle(obstacle).getPropertyValue("left"));

        if (ani_duration > 3) {
            obstacle.style.animation_duration = ani_duration - 0.1;
        }
    }, 500);
});

// function to display the updated score on the screen
function updateScore(score) {
    document.querySelector(".score").innerText = "Your Score: " + score;
}