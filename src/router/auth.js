const express = require('express')
const authRouter = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')
const {validateUserData} = require('../utils/validation')


authRouter.post('/signup', async(req, res)=>{
  
  

    try{

  // Validating Data

    validateUserData(req);

    const {firstName, lastName, email, password} = req.body; 


  // Hashing a Password
    
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    



  // creating a new instance of User Model
    const user = new User({
      firstName, lastName, email, password: passwordHash
    })


  // Saving Data in database
    
      await user.save();
      res.send("User added sucessfully")
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
  
      console.log(token);
  
     
      
      
  
      res.cookie('token', token);
      console.log(`${user.firstName} Sucessfully Logged In`);
      
      res.send(`${user.firstName} Sucessfully Logged In`);
      
    }
  
    }
    catch(err){
      res.status(400).send(`Error: ${err}`);
    }
  })

module.exports = authRouter;

