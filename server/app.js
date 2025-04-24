const ws = require('ws');

const webSocketServer = new ws.webSocketServer({
    port : 8080,
});

webSocketServer.on('connection',(socket)=>{
    console.log('connection established');
    socket.on('message',(data)=>{
        console.log('The message is ',data);
        
    })
})