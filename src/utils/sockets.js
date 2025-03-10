const socket = require('socket.io')


const intializeSocket = (server) =>{
    const io = socket(server, {
        origin: "http://localhost:5173"
      })
      
      io.on("connection", (socket)=>{
        // Handle Connection
        socket.on("joinChat", ()=>{

        });

        socket.on("sendMessage", ()=>{

        });

        socket.on("disconnect", ()=>{

        })




      })
}

module.exports = intializeSocket;