//client side
const socket = io("ws://localhost:3004");

const form = document.querySelector("form");
const input = document.querySelector("input");
const p = document.querySelector("p");
const ul = document.querySelector("ul");

function sendMessage(e) {
  e.preventDefault();

  if (input.value) {
    socket.emit("message", input.value);
  }
  input.value = "";
}

form.addEventListener("submit", sendMessage);

// Receive message
socket.on("message", (data) => {
  const li = document.createElement("li");
  li.innerText = data;
  ul.append(li);
  p.textContent = "";
});

// on typing

 

let activityTimer;
socket.on("activity", (userId) => {
  p.textContent = `${userId} is typing...`;

  clearTimeout(activityTimer);
  activityTimer = setTimeout(() => {
    p.textContent = "";
  }, 2000);
});
