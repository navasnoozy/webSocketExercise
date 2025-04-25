//server side
import { Server } from "socket.io";
import express from "express";

const PORT = process.env.PORT || 3004;

const app = express();

const httpServer = app.listen(PORT, () => {
  console.log("server connected");
});

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  const user = socket.id.substring(0, 5);

  console.log(`User ${user} connected`);

  // Upon connection - to the user
  socket.emit("message", "Welcome to chat app");

  // Upon connection - to other user
  socket.broadcast.emit("message", `${user} joined`);

  //on typing
  socket.on("activity", () => {
    socket.broadcast.emit("activity", `${user}`);
  });
 
  //send message
  socket.on("message", (data) => {
    console.log("The message is ", data);
    io.emit("message", `${user} : ${data}`);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit('message',`${user} left `)
  });
});
