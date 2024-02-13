// Generating a random image
let a = 1;
let b = 100;
let randomNumber = Math.floor(Math.random() * (b - a) + a);

let burger = document.querySelector(".burger");
let navbar = document.querySelector(".navbar");
let navlist = document.querySelector(".nav-list");
let rightNav = document.querySelector(".right-nav");
burger.addEventListener("click", () => {

    navbar.classList.toggle("h-nav");
    navlist.classList.toggle("v-class");
    rightNav.classList.toggle("v-class");

});