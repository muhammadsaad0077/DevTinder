const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://saad:saadi007@backend-learning.fbxi8.mongodb.net/")
};

connectDB()
.then(()=>{
    console.log("Database established...");
    
})
.catch((err)=>{
  console.error(`Database can not established... + ${err}`)
})