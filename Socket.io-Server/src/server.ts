import dotenv from "dotenv";
dotenv.config();
import express from "express";
import {Server} from "socket.io";

const app = express();

//Middlewares
// - Static
app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(process.env.PORT || 5000, () => {
  console.log("Server Is Listening ON Port: ", process.env.PORT);
});
const io = new Server(expressServer);


io.on('connect',(socket)=>{
    socket.emit('messageToClient',{data:'Hi Socket is Running!'})
    socket.on('messageToServer',(message)=>{
        console.log('Client says: ',message.data)
    })
})