const socket = require('socket.io')


const intializeSocket = (server) =>{
    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173"
        }       
      })
      
      io.on("connection", (socket)=>{
        // Handle Connection
        socket.on("joinChat", ({firstName, userId, targetUserId})=>{
          const roomId = [userId, targetUserId].sort().join("_")
          console.log(firstName + " Joined Room: "+roomId);         
          socket.join(roomId);
        });

        socket.on("sendMessage", ()=>{

        });

        socket.on("disconnect", ()=>{

        })




      })
}

module.exports = intializeSocket;