const http = require("http");

const express = require("express");
const socket = require("socket.io");
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(express.static(__dirname + "/public"));

httpServer.listen(3000, () => {
    console.log("server running on port 3000");
});

var users = {};
io.on("connection", (socket) => {
    socket.on("newUser", (id) => {
        socket.join("/");
        socket.broadcast.emit("userJoined", id);
    });
    socket.on("disconnect", (data) => {
        socket.broadcast.emit("userDisconnect");
    });
});
