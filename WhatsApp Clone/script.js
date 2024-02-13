// A standalone build of client is exposed by default by server at /socket.io/socket.io.js
// Means connecting to client to the server
const socket = io("http://localhost:800");

// when backend server receives an event, it is handled in client side server by name
// i.e after socket broadcast to all (emits to all), then

let chatbox = document.querySelector(".chatbox");
let userInput = document.getElementById("txarea");
let sendBtn = document.getElementById("send-btn");

// when user joins with a name, it is broadcasted to all ask a username
let userName = prompt("Enter your name");

// A callback from the backend is executed by the name
socket.emit("new-user-joined", userName);

let incoming = new Audio("alerts/incoming.mp3");
let outgoing = new Audio("alerts/outgoing.mp3");

// chat when user receives a message
const appendMessage = (name,message,direction) => {
    let li = document.createElement("li");
    li.classList.add("chat");
    li.classList.add(direction);

    let p = document.createElement("p");
    p.innerHTML = `${name}: ${message}`;
    userInput.value="";

    li.appendChild(p);
    chatbox.insertAdjacentElement("beforeend", li);
}

sendBtn.addEventListener("click", (ele) => {
    ele.preventDefault();

    let msg = userInput.value;
    let message = {
        message: msg,
        name: userName
    };
    // when someone sends a message, it is broadcasted to everyone
    socket.emit("send",(message));

    // send a message
    // console.log(msg);
    outgoing.play();
    appendMessage(userName,msg,"outgoing");
});

// listening to the socket events
// userName = name
socket.on("user-joined",(name)=>{
    incoming.play();
    appendMessage(name,"Hey There I joined the chat","incoming");
});

// if server sends a message receive it
socket.on("received",(data)=>{
    incoming.play();
    appendMessage(data.message.name,data.message.message,"incoming");
});

// if someone left the chat
socket.on("close",(name)=>{
    appendMessage(name,`${name} left the chat`,"incoming");
});
