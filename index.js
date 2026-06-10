const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("create-room", (roomId) => {
    socket.join(roomId);

    console.log(`Room Created: ${roomId}`);
  });

  socket.on("join-room", (roomId) => {
  socket.join(roomId);

  const room = io.sockets.adapter.rooms.get(roomId);

  const count = room ? room.size : 0;

  console.log(`User joined room: ${roomId}`);
  console.log(`Users in room: ${count}`);
});
socket.on("signal", ({ roomId, data }) => {
  socket.to(roomId).emit("signal", data);
});

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});