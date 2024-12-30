const express = require('express')
const profileRouter = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')
const {userAuth} = require('../middlewares/authAdmin')

profileRouter.get('/profile/view', userAuth, async(req, res)=>{

    try{
    const user = req.user;
  
    res.send(user)
    }
  
    catch(err){
      res.status(404).send(`Error: ${err.message}`)
    }
  
  })

profileRouter.patch('/profile/edit', async(req, res)=>{
  try{
  const { email, firstName, lastName, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.findOneAndUpdate({email: email}, {firstName: firstName,lastName: lastName, password: passwordHash}, {new: true, runValidators: true})
  if(user){
    
    res.send("User updated successfully")
  }
  else{
    res.send("User not found")
  }
}
catch(err){
  res.status(404).send(`Error: ${err.message}`)
}
})

  module.exports = profileRouter;