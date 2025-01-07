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

    const recieverUserName = await User.findById(toUserId);
    console.log(recieverUserName);
    

    const connectionRequest = new ConnectionRequestModel({
      fromUserId: fromUserId,
      toUserId: toUserId,
      status: status
    })

    const data = await connectionRequest.save();
  
    res.json({message: `${user.firstName} sent a request to ${recieverUserName.firstName}`, data});
  }
  catch(err){
    res.status(400).send(`Error: ${err.message}`)
  }
  
  })

  module.exports = connectionRouter;