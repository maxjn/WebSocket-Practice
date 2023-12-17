const http = require('http')
const WebSocket = require('ws')

const server = http.createServer((req,res)=>{
res.end("I'm Connected")
})

const wss = new WebSocket.WebSocketServer({server})

// Before Connection
wss.on('headers',(headers,req)=>{
    console.log("WSS Headers: ", headers)
})

// After Connection
wss.on('connection',(ws,req)=>{
    ws.send('Hellow this is my first message from WS!!')
    ws.on('message',(data)=>{
        console.log("Client says: ",data.toString())
    })
})

server.listen(8000)