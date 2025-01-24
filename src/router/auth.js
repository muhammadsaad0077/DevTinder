const express = require('express')
const authRouter = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')
const {validateUserData} = require('../utils/validation');
const { userAuth } = require('../middlewares/authAdmin');


authRouter.post('/signup', async(req, res)=>{
  
  

    try{

  // Validating Data

    validateUserData(req);

    const {firstName, lastName, email, password, skills, about, photoUrl, age, phoneNo} = req.body; 


  // Hashing a Password
    
    const passwordHash = await bcrypt.hash(password, 10);
    
    



  // creating a new instance of User Model
    const user = new User({
      firstName, lastName, email, password: passwordHash, skills: skills, about: about, photoUrl: photoUrl, age: age, phoneNo: phoneNo
    })


  // Saving Data in database
    
      await user.save();
      res.send(user)
    } catch(err){
      res.status(400).send(`Error occured: ${err.message}`)
    }
})


authRouter.post('/login', async(req, res)=>{
  

    try{
    const {email, password} = req.body;
  
    const user = await User.findOne({email: email});
  
    if(!user){
      throw new Error("Invalid credentials");
    }
  
    const checkPassword = await user.comparePassword(password);
  
    if(!checkPassword){
      throw new Error("Invalid credentials");
    }
  
    else{
  
      // This logic can also be used but the best practice is to use user related things in schema (Topic: Mongoose Schema),
      // this makes our code cleaner and much reusable
     // const token = await jwt.sign({id: user._id}, 'saad@123')
  
     const token = await user.getJWT();
  
      res.cookie('token', token);
      
      res.send(user);
      
    }
  
    }
    catch(err){
      res.status(400).send(`Error: ${err}`);
    }
  })


authRouter.post('/logout', userAuth, (req, res)=>{
  const { email } = req.body;
  res.cookie('token', null, {
    expires:  new Date(Date.now())
  })
  res.send(`${email } logged out`)
})

module.exports = authRouter;

