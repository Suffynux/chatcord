const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
const port = process.env.PORT || 3000;

// Run when client connects
io.on("connection", socket => {

    // Welcome current user
    socket.emit("message" , "Welcome to the ChatCord App");
    // Broadcast when user connects
    socket.broadcast.emit("message" , "A user has joined the chat");
    // Listen for chatMessage 
// Listen for chatMessage 
socket.on("chatMessage", msg => {
    io.emit("message", msg); // ✅ Now it matches client-side listener
});

    // message for all when user disconnect
    socket.on("disconnect" , ()=>{
        io.emit("message" ,"A user has left the chat")
    })
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

