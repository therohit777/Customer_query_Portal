const express = require("express");
const app = express();


const cors = require("cors");
app.use(cors());


const server = require("http").createServer(app);
const io = require("socket.io")(server,{
    cors:{
        origin:"*",
    }
});


io.on("connection",(socket)=>{
    console.log("what is socket:",socket);
    console.log("Socket is active to be connect");

    socket.on("joinRoom", (roomName) => {
        socket.join(roomName); 
    });

    socket.on("chat",(payload)=>{
        console.log("What is payload",payload);
        io.emit("chat",payload);
    })
})


// app.get("/message", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

// app.listen(8000, () => {
//   console.log(`Server is running on port 8000.`);
// });

server.listen(8000,()=>{
    console.log(`Server is running on port 8000...`);
})
