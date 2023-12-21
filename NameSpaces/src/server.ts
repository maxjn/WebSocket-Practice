import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Server } from "socket.io";

const app = express();

//Middlewares
// - Static
app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(process.env.PORT || 5000, () => {
  console.log("Server Is Listening ON Port: ", process.env.PORT);
});
const io = new Server(expressServer);

io.on("connection", (socket) => {
  console.log(socket.id, "has connected");
  //in ws we use "send" method, and it socket.io we use the "emit" method
  // socket.emit('messageFromServer',{data:"Welcome to the socket server!"})
  socket.on("MessageToServer", (dataFromClient) => {
    console.log("Data:", dataFromClient.message);
    io.emit("MessageToClients", { message: dataFromClient.message });
  });
});


const adminNamespace = io.of('/admin')


adminNamespace.on("connection", (socket) => {
  console.log(socket.id, " has connected to admin namespace and chat room!");
  socket.join('chat')

  socket.on("MessageToServer", (dataFromClient) => {
    console.log("Data:", dataFromClient.message);
    adminNamespace.emit("MessageToClients", { message: dataFromClient.message });
  });
});
