const express = require('express')
const profileRouter = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')
const {userAuth} = require('../middlewares/authAdmin')
const {allowedData} = require('../utils/validation')
const {validateStrongPassword} = require('../utils/validation')

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
   
   Object.keys(req.body).forEach((key)=>{
    user[key] = req.body[key];
   })

   const { email, firstName, lastName, password, age, gender, photo, about, skills, phoneNo } = user;
   
   const passwordHash = await bcrypt.hash(password, 10);
   const updatedUser = await User.findOneAndUpdate({email: email}, {firstName: firstName,lastName: lastName, password: passwordHash, age: age, gender: gender, photo: photo, about: about, skills: skills, phoneNo: phoneNo }, {new: true, runValidators: true})
   
  
  if(updatedUser){
    
    res.send(updatedUser)
  }
  else{
    throw new Error("User not found")
  }
}
catch(err){
  res.status(401).send(`Error: ${err.message}`)
}
})

profileRouter.patch('/profile/forget-password', async(req, res)=>{

  try{
  const {email, password} = req.body;

  !validateStrongPassword(req);

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.updateOne({email: email}, {password: passwordHash}, {runValidators: true, new: true});
  

  if(user){
    res.send(`Password has been Updated`);
  }
  else{
    throw new Error("User not found");
  }
}
catch(err){
  res.status(404).send(`Error: ${err.message}`)
}


})

  module.exports = profileRouter;