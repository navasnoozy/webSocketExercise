const { Server } = require("socket.io");
const http = require("http");

const httpServer = http.createServer();
httpServer.listen(8080);

const io = new Server(httpServer,{
    cors:{
        origin:'*'
    }
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);
  io.on("message", (data) => {
    console.log("The message is ", data);
    io.emit("message", `${socket.id.substring(0, 5)} : ${data}`);
  });
});
