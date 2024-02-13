console.log("Welcome to Tic Tac Toe");

// game constants
const music = new Audio("audio/music.mp3");
const ting = new Audio("audio/ting.mp3");
const gameOver = new Audio("audio/gameover.mp3");
let turn = "X";     // initial turn is X
let isGameOver = false;

//  game functions

// function to change turn
const changeTurn = () => {
    if (turn === "X") {
        return "0";
    }
    return "X";
}

// function to check win
const checkWin = () => {
    let boxtext = document.getElementsByClassName("box-text");
    // console.log(boxtext);
    // there are total 8 winning possibilities
    let win = [
        [0, 1, 2, 15, -8, 90],
        [3, 4, 5, 15, 2, 90],
        [6, 7, 8, 15, 12, 90],
        [0, 3, 6, 5, 2, 0],
        [1, 4, 7, 15, 5, 0],
        [2, 5, 8, 25, 2,0],
        [2, 4, 6, 15, 1,45],
        [0, 4, 8, 15, 2, -45],
    ];
``
    // for each possibility
    win.forEach((ele) => {
        if ((boxtext[ele[0]].innerText === boxtext[ele[1]].innerText) && (boxtext[ele[1]].innerText === boxtext[ele[2]].innerText) && (boxtext[ele[0]].innerText !== '')) {
            gameOver.play();
            music.pause();
            isGameOver = true;

            document.querySelector(".info").innerText = boxtext[ele[0]].innerText + " Won ";

            let dance = document.getElementById("dance");
            dance.style.width = "200px";

            let stick = document.getElementsByClassName("line")[0];
            stick.style.display = `block`;
            stick.style.width = `7px`;
            stick.style.transform = `translate(${ele[3]}vw,${ele[4]}vw) rotate(${ele[5]}deg)`;
            console.log(ele[3],ele[4], ele[5]);
            //     transform: translate(10px, 10px) rotate(45deg);

        }
    });
    if (gameOver == true) {
        let ele = document.getElementsByClassName("box-text");
        Array.from(ele).forEach((e) => {
            e.innerText = "X";
        });
    }
}

// game logic

// get all the click boxes
// music.play();
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {

    // check for each box text
    let boxText = element.querySelector(".box-text");
    element.addEventListener("click", () => {
        if (boxText.innerText === '') {
            boxText.innerText = turn;
            turn = changeTurn();
            ting.play();
            checkWin();
            if (!isGameOver) {
                document.getElementsByClassName("info")[0].innerText = "Turn For " + turn;
            }
        }
    });
});

// when user clicks to reset button
let reset = document.getElementById("reset");
reset.addEventListener("click", () => {
    let ele = document.getElementsByClassName("box-text");
    Array.from(ele).forEach((e) => {
        e.innerText = "";
    });
    isGameOver = false;
    if (!isGameOver) {
        document.getElementsByClassName("info")[0].innerText = "Turn For " + turn;
    }
    let dance = document.getElementById("dance");
    dance.style.width = "2px";

    document.querySelector(".line").style.width = "0px";
    document.querySelector(".line").style.display = "none";
});