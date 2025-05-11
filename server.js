const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const formatMessgae = require("./utils/message.js")
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
const port = process.env.PORT || 3000;

// Run when client connects
io.on("connection", socket => {

    // Welcome current user
    socket.emit("message" , formatMessgae("Chat Cord Bot" , "Welcome to the ChatCord App"));
    // Broadcast when user connects
    // Listen for chatMessage 
// Listen for chatMessage 
socket.on("chatMessage", msg => {
    io.emit("message", formatMessgae("Sufiyan",msg)); // ✅ Now it matches client-side listener
});

    // message for all when user disconnect
    socket.on("disconnect" , ()=>{
        io.emit("message" , formatMessgae("Chat Cord Bot" , "A user has left the chat" ))
    })
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

