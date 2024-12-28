const express = require('express')
const userRouter = express.Router();


// Display all the users
userRouter.get('/feed', async(req, res)=>{
    const allUsers = await User.find({});
    try{
      res.send(allUsers)
    }
    catch (err){
      res.status(404).send("Something went wrong")
    }
  })


  userRouter.patch('/user', async(req, res)=>{
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
  })


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