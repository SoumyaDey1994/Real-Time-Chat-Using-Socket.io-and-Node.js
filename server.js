const express= require("express");
const socket = require("socket.io");

const app = express();

app.use(express.static('public'));

const port = 9000;
const server = app.listen(port, ()=>{
    console.log(`Server is listening to port ${port}`);
})

const io = socket(server);
io.on('connection', (socket)=>{
    console.log(`Server is connected with client via websocket ${socket.id}`);
    /*
    *   Catch message from client & emit to all clients via websocket
    */
    socket.on('chat', (data)=>{
        io.sockets.emit('chat',data)
    })
    /*
    *   Catch typing event & broadcast to other clients
    */
   socket.on('typing', (handler)=>{
       socket.broadcast.emit('typing', handler);
   })
})