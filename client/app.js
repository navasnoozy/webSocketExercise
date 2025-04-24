const socket = new WebSocket("ws://localhost:8080");

const form = document.querySelector("form");

function sendMessage(e) {
  e.preventDefault();
  const input = document.querySelector("input");
  if (input.value) {
    socket.send(input.value);
  }
  input.value = '';
}

form.addEventListener("submit", sendMessage);

socket.addEventListener("message", ({ data }) => {
  const li = document.createElement("li");
  const ul = document.querySelector("ul");

  li.innerText = data;
  ul.append(li);
});
