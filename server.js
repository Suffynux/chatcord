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
    socket.emit("message" , "Welcome to the ChatCord App");
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});