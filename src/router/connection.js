const express = require('express')
const connectionRouter = express.Router();
const {userAuth} = require('../middlewares/authAdmin');
const ConnectionRequestModel = require('../models/connectionRequest');
const User = require('../models/user')


connectionRouter.post('/connection/send/:status/:toUserId', userAuth, async(req, res)=>{

  try{
    const user = req.user;
    const id = user._id;
    const fromUserId = id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;


    const allowedStatus = ["interested", "ignored"];

    if(!allowedStatus.includes(status)){
      throw new Error("Invalid status type")
    }

    if(fromUserId === toUserId){
      throw new Error("You can't send a request to yourself")
    }

    const recieverUserName = await User.findById(toUserId); 

    if(!recieverUserName){
      throw new Error("User not found");
    }

    

    const existingRequest = await ConnectionRequestModel.findOne({
      $or: [
      {
      fromUserId: fromUserId,
      toUserId: toUserId
      },
      {
        fromUserId: toUserId,
        toUserId: fromUserId
      }
      ]
    })

    if(existingRequest){
      throw new Error("Connection request already exist")
    }

    const connectionRequest = new ConnectionRequestModel({
      fromUserId: fromUserId,
      toUserId: toUserId,
      status: status
    })

    const data = await connectionRequest.save();

    if(status=="interested"){
    res.json({message: `${user.firstName} sent a request to ${recieverUserName.firstName}`, data});
  }
  else{
    res.json({message: `${user.firstName} is not interested in ${recieverUserName.firstName}`, data});
  }
}

  catch(err){
    res.status(400).send(`Error: ${err.message}`)
  }
  
  })


connectionRouter.post('/connection/request/:status/:userId', userAuth, async(req, res)=>{



})

  module.exports = connectionRouter;