const express = require('express')
const profileRouter = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')
const {userAuth} = require('../middlewares/authAdmin')
const allowedData = require('../utils/validation')

profileRouter.get('/profile/view', userAuth, async(req, res)=>{

    try{
    const user = req.user;
  
    res.send(user)
    }
  
    catch(err){
      res.status(404).send(`Error: ${err.message}`)
    }
  
  })

profileRouter.patch('/profile/edit', userAuth, async(req, res)=>{
  try{

   if(!allowedData(req)){
    throw new Error("Invalid field edit")
   }

   const user = req.user;

   const { firstName, lastName, password, age, gender, photo, about, skills, phoneNo } = user;

   console.log(user);
   
   const passwordHash = await bcrypt.hash(password, 10);
   const updatedUser = await User.updateOne({firstName: firstName,lastName: lastName, password: passwordHash, age: age, gender: gender, photo: photo, about: about, skills: skills, phoneNo: phoneNo }, {new: true, runValidators: true})
  
  if(updatedUser){
    
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