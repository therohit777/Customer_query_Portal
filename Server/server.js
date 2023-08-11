const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ChatMessage = require('./models/message')
const cors = require("cors");
app.use(cors());



const mongoURI = "mongodb+srv://rohit777:rohit1234@cluster0.jb8kcxs.mongodb.net/";
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB Atlas");
})
.catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
});




app.get('/usermessages', async (req, res) => {
    try {
      const userData = await ChatMessage.find();
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
});










const server = require("http").createServer(app);
const io = require("socket.io")(server,{
    cors:{
        origin:"*",
    }
});


io.on("connection",(socket)=>{
    // console.log("what is socket:",socket);
    // console.log("Socket is active to be connect");

    socket.on("joinRoom", (roomName) => {
        //Join room
        socket.join(roomName); 
    });


    // socket.on("chat", async (payload) => {
    //     const message = new Message({
    //       room: payload.room,
    //       user: payload.user,
    //       content: payload.message,
    //     });
    //     await message.save();
    //     io.to(payload.room).emit("chat", message);
    // })

    // socket.on("chat",(payload)=>{
    //     // console.log("What is payload",payload);
    //     io.emit("chat",payload);  
    // })
    socket.on("chat", async (payload) => {
        try {
          // Save the chat message to MongoDB
          console.log(payload);
          const newChatMessage = new ChatMessage({
            sender: payload.username,
            customer_id:payload.room,
            message: payload.message,
            timestamp: new Date()
          });
          await newChatMessage.save();
      
          // Emit the chat message to all clients
          io.emit("chat", payload);
        } catch (error) {
          console.error("Error saving chat message:", error);
        }
      });
      
})

server.listen(8000,()=>{
    console.log(`Server is running on port 8000...`);
})
