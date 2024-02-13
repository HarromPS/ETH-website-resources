console.log("Welcome to Chatbot");

// DOM elements
let state = 0;
let container = document.querySelector(".container");
let chatbox = document.querySelector(".chatbox");
let enable = document.getElementById("span1");
let disable = document.getElementById("span2");
disable.style.opacity = "0";

let txarea = document.getElementById("txarea");
let send = document.getElementById("send-btn");
let clearBtn = document.getElementById("clear-btn");

// APIs
let apiKey = "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";
// Event Listener toggle chatbot enable disable
let toggleBtn = document.querySelector(".chatbot-toggle-btn");
toggleBtn.addEventListener("click", () => {
    if (state === 0) {
        container.classList.remove("hide");
        enable.style.opacity = "0";
        disable.style.opacity = "1";
        state = 1;
    }
    else {
        container.classList.add("hide");
        enable.style.opacity = "1";
        disable.style.opacity = "0";
        state = 0;
    }
    // console.log(state);
});

// sending query to the chatbot
send.addEventListener("click", () => {
    // outgoing message
    let li_outgoing = document.createElement("li");
    li_outgoing.classList.add("chat", "outgoing");

    let p_outgoing = document.createElement("p");
    p_outgoing.innerText = txarea.value;
    txarea.value = "";

    li_outgoing.appendChild(p_outgoing);
    chatbox.insertAdjacentElement("beforeend", li_outgoing);

    // incoming message
    let li_incoming = document.createElement("li");
    li_incoming.classList.add("chat", "incoming");

    let res=["Thinking","I am thinking hard","Processing","Generating"];
    let ran=Math.round(3*Math.random());
    console.log(ran);
    li_incoming.innerHTML = `<span class="chatbot-icon">&#128126;</span>
        <p class="message">${res[ran]} ...</p>`;

    chatbox.insertAdjacentElement("beforeend", li_incoming);

    // Posting requests i.e chat with the bot
    // setTimeout(() => {
    //     p_incoming.innerText = "Response";
    // }, 800);

    const chat = async () => {

        setTimeout(() => {
            li_incoming.innerHTML = `<span class="chatbot-icon">&#128126;</span>
                <p class="message">This is a generated response</p>`;
        },2000);
        let api_url = "https://api.openai.com/v1/chat/completions";
        let options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [{ "role": "user", "content": `${txarea.value}` }]
            })
        }

        let promise = await fetch(api_url, options);
        let response = await promise.json();
        // console.log(response["error"]["message"]);
        li_incoming.innerHTML = `<span class="chatbot-icon">&#128126;</span>
                <p class="message">${response["error"]["message"]}</p>`;


    }
    chat();
});

// clear all the chats
clearBtn.addEventListener("click",function(){
    chatbox.innerHTML="";
});