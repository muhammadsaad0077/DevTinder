const express = require('express');
const app = express();
const connectDB = require('./config/database')
const User = require('./models/user')
const Admin = require('./models/admin')


app.post('/signup', async(req, res)=>{
    const user = new User({
      firstName: "Saad",
      lastName: "Khan",
      password: "saad123",
      email: "saad@gmail.com",
      phoneNo: "03169230380",
    })

    try{
      await user.save();
      res.send("User added sucessfully")
    } catch(err){
      res.status(400).send(`Error occured: ${err.message}`)
    }
})


app.post('/admin', async(req, res)=>{
  const admin = new Admin({
      name: "Saad",
      passcode: "saadi1234",
      nickname: "saadiii"
  })

  try{
    await admin.save();
    res.send("Admin added succesfully");
  }
  catch(err){
    res.status(400).send(`Error occured: ${err.message}`)
  }
})




connectDB()
.then(()=>{
    console.log("Database established...");

    app.listen(3001, ()=>{
        console.log("Server is successfully listening on 3000"); 
        })
    
})
.catch((err)=>{
  console.error(`Database can not established... + ${err}`)
})




