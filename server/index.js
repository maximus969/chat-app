const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const router = require('./router');
const { Server } = require("socket.io")

const server = http.createServer(app)

const PORT = process.env.PORT || 3001;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})

app.use(cors())
app.use(router);

io.on("connection", socket => {
  console.log(`User Connected: ${socket.id}`)

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  })

})

server.listen(PORT, (error) => {
  if(error) {
      throw Error(error)
  }
  console.log(`Server is listening on port ${PORT}`) 
})