const express = require('express');
const { userAuth } = require('../middlewares/authAdmin');
const ConnectionRequestModel = require('../models/connectionRequest');
const userRouter = express.Router();
const User = require('../models/user')


// Display all the users
userRouter.get('/user/feed', userAuth, async(req, res)=>{
    
    try{
    
      // Saad => Logged in => should not see his profile => should not see the users who are already connections
      // ignored, interested

      const loggedInUser = req.user;

      const requestedUsers = await ConnectionRequestModel.find({
        $or: [
          {
            fromUserId: loggedInUser._id
          }, 
          {
            toUserId: loggedInUser._id
          }
        ]
      });

      const hideUsersFromFeed = new Set(); // set is a data structure which works same as the array but
      // the difference is it not store duplicate data

      requestedUsers.forEach(connection => {
        hideUsersFromFeed.add(connection.fromUserId.toString());
        hideUsersFromFeed.add(connection.toUserId.toString());
      });

      

    /*  const allUfilteredUserssers = await User.find({
        $not: {
          fromU
        }
      })*/

      const allUsers = await User.find({});

      const filteredUsers = allUsers.filter(user => {
        return !hideUsersFromFeed.has(user._id.toString())
      })

      console.log(filteredUsers);
      
      

      
  
      res.json({message: "All requested users fetched", hideUsersFromFeed})

    }
    catch (err){
      res.status(404).send("Something went wrong " + err.message)
    }
  })

userRouter.get('/user/request', userAuth, async(req, res) => {

  try{
  const user = req.user;

  const pendingRequests = await ConnectionRequestModel.find(
    {toUserId: user._id, status: "interested"}).populate("fromUserId", ["firstName", "lastName", "photo", "skills", "about"]);
    // populate can also be written as populate("fromUserId", "firstName lastName photo skills aboutl")

  if(pendingRequests == 0){
    res.json({message: `No Pending Requests Found `})
  }

  res.json({message: `${user.firstName} Your All Pending Requests Here `, pendingRequests})

  }
  catch(err){
    res.status(400).send(`Error: ${err.message}`);
  }

})

userRouter.get('/user/connections', userAuth, async(req, res) =>{

  try{
  const user = req.user;
  const connections = await ConnectionRequestModel.find({
    $or: [
      {
        fromUserId: user._id,
        status: "accepted"
      },
      {
        toUserId: user._id,
        status: "accepted"
      }
    ]
  }).populate("fromUserId", ["firstName", "lastName", "photo", "skills", "about"]).populate("toUserId", ["firstName", "lastName", "photo", "skills", "about"])

  console.log(connections);

  const data = connections.map((row)=>{
    if(row.fromUserId._id.toString() === user._id.toString()){
      return row.toUserId;
    }
    else{
      return row.fromUserId;
    }
  })

  
  


  if(connections == 0){
    res.json({message: `${user.firstName} You Don't Have Any Connections`})
  }

  res.json({message: `${user.firstName} here is your all connections `, data})

  }

  catch(err){
    res.status(400).send(`Error: ${err.message}`)
  }

})


  /*userRouter.patch('/user', async(req, res)=>{
    const userId = req.body.userId;
    const data = req.body;
  
    const isAllowed = ["userId", "firstName", "lastName", "age"];
  
    const isUpdateAllowed = Object.keys(data).every((k)=>{
        isAllowed.includes(k);
    })
  
    if(!isAllowed){
      throw new Error("Update not allowed ")
    }
    
  
    try{
      await User.findByIdAndUpdate({_id: userId}, data, {
        returnDocument: 'after',
        runValidators: true
      })
      res.send("User Updated Sucessfully")
    }
    catch (err){
      res.status(404).send(`Something went wrong: ${err.message}`)
    }
  })

  userRouter.delete('/user', async(req, res)=>{
    const userEmail = req.body.email;
    console.log(userEmail);
    
    try{
    const users = await User.findOneAndDelete({email: userEmail});
    console.log(users);
    
    if(users){
      res.send("User Deleted Successfully")
    }
    else{
      res.status(404).send("User not found")
    }
  }
  catch (err){
    res.status(404).send("Something went wrong")
  }
  })*/


  // app.patch('/user', async(req, res)=>{
//   const query = req.body;

//   try{
//     await User.findOneAndUpdate(query, { email: "saad123@gmail.com"});
//     res.send("User updated sucessfully")
//   }
//   catch (err){
//     res.status(404).send(`Something went wrong: ${err.message}`)
//   }
// })

module.exports = userRouter;