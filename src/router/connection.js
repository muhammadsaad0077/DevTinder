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

    if(fromUserId == toUserId){
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


connectionRouter.post('/connection/review/:status/:requestId', userAuth, async(req, res)=>{

  // status => valid
  // requestId => valid
  // loggedInUser => toUserId
  // accept or reject

  try{

  const user = req.user;
  const userId = user._id;
  const status = req.params.status;
  const requestId = req.params.requestId;

  // user login - requestId provide - request exist - if exist then options -> accept | reject

  if(requestId == userId){
    throw new Error("You can't accept or reject request of yourself!")
  }

  const allowedStatus = ["accepted", "rejected"];

  if(!allowedStatus.includes(status)){
    throw new Error("Invalid status type");
  }

  const recieverUserName = await User.findById(requestId);

  if(!recieverUserName){
    throw new Error("User not found")
  }

  

  

  const requestExist = await ConnectionRequestModel.findOne({
    fromUserId: requestId,
    toUserId: userId,
    status: "interested"
  })
  

  if(!requestExist){
    throw new Error("Request does not exist")
  }

  requestExist.status = status;
  const data = await requestExist.save();

  if(status=="accepted"){
    
    res.json({message: `${user.firstName} accepted request of ${recieverUserName.firstName}`, data});
    
  }
  else{
    
    res.json({message: `${user.firstName} is rejected request of ${recieverUserName.firstName}`, data});
    
  }



}

catch(err){
  res.status(400).send(`Error: ${err.message}`)
}


})

  module.exports = connectionRouter;