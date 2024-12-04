const express = require('express');
const app = express();
const connectDB = require('./config/database')
const User = require('./models/user')
const Admin = require('./models/admin')
const bcrypt = require('bcrypt')
const {validateUserData} = require('./utils/validation')

app.use(express.json())

app.post('/signup', async(req, res)=>{
  
  

    try{

  // Validating Data

    validateUserData(req);

    const {firstName, lastName, email, password} = req.body; 


  // Hashing a Password
    
    const passwordHash = await bcrypt(password, 10);
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

app.get('/user', async(req, res)=>{
  const userEmail = req.body.email;
  console.log(userEmail);
  
  try{
  const users = await User.findOne({email: userEmail});
  console.log(users);
  
  if(users){
    res.send(users)
  }
  else{
    res.status(404).send("User not found")
  }
}
catch (err){
  res.status(404).send("Something went wrong")
}
})



app.delete('/user', async(req, res)=>{
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




app.patch('/user', async(req, res)=>{
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



// Display all the users
app.get('/feed', async(req, res)=>{
  const allUsers = await User.find({});
  try{
    res.send(allUsers)
  }
  catch (err){
    res.status(404).send("Something went wrong")
  }
})


app.post('/admin', async(req, res)=>{
  const admin = new Admin({
      name: "Saad",
      passcode: "saadi1234",
      nickname: "saadiii",
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




