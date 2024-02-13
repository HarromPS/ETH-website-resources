// WhatsApp clone

/*
Socket io: JS library used to create a bidirectional & event based communication
between browser & server.

npm i socket.io
*/

// instance of socket.io
const io = require("socket.io")(800);
const user = {};

// HTTPs instance - will listen incoming multiple events e.g user-joined, send
io.on("connection",(socket)=>{
    // when event occur
    socket.on("new-user-joined",(name)=>{
        console.log(name);
        // what actions will occur with a particular connection
        user[socket.id] = name;     // new key is created
        socket.broadcast.emit("user-joined",name);  // it sends message to all other connection with this name
    });

    socket.on("send",(message)=>{
        socket.broadcast.emit("received",{
            message: message,
            name: user[socket.id]
        });
    });

    socket.on("disconnect",(message)=>{
        socket.broadcast.emit("close",user[socket.id]);
        delete user[socket.id];
    });
});