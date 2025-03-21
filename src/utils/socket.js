const socket = require('socket.io')

const intializeSocket = (server) =>{
  const io = socket(server, {
      cors: {
          origin: "*"
      }       
    })

    console.log("🔌 Socket.io initialized... Waiting for connections");
    
    io.on("connection", (socket)=>{
      // Handle Connection
      socket.on("joinChat", ({firstName, userId, targetUserId})=>{
        const roomId = [userId, targetUserId].sort().join("_")
        console.log(firstName + " Joined Room: "+roomId);         
        socket.join(roomId);
      });

      socket.on("sendMessage", ({firstName, userId, targetUserId, text})=>{
        console.log("In send message");
        
        const roomId = [userId, targetUserId].sort().join("_");
        console.log(firstName + " Sent Message: "+text);
        io.to(roomId).emit("meesageReceived", {firstName, text});
        

      });

      socket.on("disconnect", ()=>{
        console.log("User disconnected:", socket.id);
      })




    })
}

module.exports = intializeSocket;